---
title: Kubernetes Building Blocks
description: LinuxFoundation
sidebar:
  order: 9
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 4
---

## Kubernetes Object Model

Kubernetes became popular due to its advanced application lifecycle management capabilities, implemented through a rich object model, representing different persistent entities in the Kubernetes cluster. Those entities describe:

- What containerized applications we are running
- The nodes where the containerized applications are deployed
- Application resource consumption
- Policies attached to applications, like restart/upgrade policies, fault tolerance, ingress/egress, access control, etc.

With each object, we declare our intent, or the desired state of the object, in the spec section. The Kubernetes system manages the `status` section for objects, where it records the actual state of the object. At any given point in time, the Kubernetes Control Plane tries to match the object's actual state to the object's desired state. An object definition manifest must include other fields that specify the version of the API we are referencing as the `apiVersion`, the object type as `kind`, and additional data helpful to the cluster or users for accounting purposes - the `metadata`. In certain object definitions, however, we find different sections that replace `spec`, they are `data` and `stringData`. Both data and stringData sections facilitate the declaration of information that should be stored by their respective objects.

Examples of Kubernetes object types are Nodes, Namespaces, Pods, ReplicaSets, Deployments, DaemonSets, etc. We will explore them next.

When creating an object, the object's configuration data section from below the spec field has to be submitted to the Kubernetes API Server. The API request to create an object must have the spec section, describing the desired state, as well as other details. Although the API Server accepts object definitions in a JSON format, most often we provide such definition manifests in a YAML format which is converted by `kubectl` in a JSON payload and sent to the API Server.

### Nodes

Nodes are virtual identities assigned by Kubernetes to the systems part of the cluster - whether Virtual Machines, bare-metal, Containers, etc. These identities are unique to each system, and are used by the cluster for resources accounting and monitoring purposes, which helps with workload management throughout the cluster.

Each node is managed with the help of two Kubernetes node agents - kubelet and kube-proxy, while it also hosts a container runtime. The container runtime is required to run all containerized workload on the node - control plane agents and user workloads. The kubelet and kube-proxy node agents are responsible for executing all local workload management related tasks - interact with the runtime to run containers, monitor containers and node health, report any issues and node state to the API Server, and manage network traffic to containers.

Based on their predetermined functions, there are two distinct types of nodes - control plane and worker. A typical Kubernetes cluster includes at least one control plane node, but it may include multiple control plane nodes for the High Availability (HA) of the control plane. In addition, the cluster includes one or more worker nodes to provide resource redundancy in the cluster. There are cases when a single all-in-one cluster is bootstrapped as a single node on a single VM, bare-metal, or Container, when high availability and resource redundancy are not of importance. These are hybrid or mixed nodes hosting both control plane agents and user workload on the same system. Minikube allows us to bootstrap multi-node clusters with distinct, dedicated control plane nodes, however, if our host system has a limited amount of physical resources (CPU, RAM, disk), we can easily bootstrap a single all-in-one cluster as a single node on a single VM or Container, and still be able to explore most of the topics covered in this course, with the exception of features specific to multi-node clusters, such as DaemonSets, multi node networking, etc.

Node identities are created and assigned during the cluster bootstrapping process by the tool responsible to initialize the cluster agents. Minikube is using the default `kubeadm` bootstrapping tool, to initialize the control plane node during the `init` phase and grow the cluster by adding worker or control plane nodes with the `join` phase.

The control plane nodes run the control plane agents, such as the API Server, Scheduler, Controller Managers, and etcd in addition to the kubelet and kube-proxy node agents, the container runtime, and add-ons for container networking, monitoring, logging, DNS, etc.

Worker nodes run the kubelet and kube-proxy node agents, the container runtime, and add-ons for container networking, monitoring, logging, DNS, etc.

Collectively, the control plane node(s) and the worker node(s) represent the Kubernetes cluster. A cluster's nodes are systems distributed either on the same private network, across different networks, even across different cloud networks.

### Namespaces

If multiple users and teams use the same Kubernetes cluster we can partition the cluster into virtual sub-clusters using Namespaces. The names of the resources/objects created inside a Namespace are unique, but not across Namespaces in the cluster.

To list all the Namespaces, we can run the following command:

```sh
kubectl get namespaces
```

```sh frame="none"
NAME              STATUS       AGE
default           Active       11h
kube-node-lease   Active       11h
kube-public       Active       11h
kube-system       Active       11h
```

Generally, Kubernetes creates four Namespaces out of the box: **kube-system**, **kube-public**, **kube-node-lease**, and **default**. The **kube-system** Namespace contains the objects created by the Kubernetes system, mostly the control plane agents. The **default** Namespace contains the objects and resources created by administrators and developers, and objects are assigned to it by default unless another Namespace name is provided by the user. **kube-public** is a special Namespace, which is unsecured and readable by anyone, used for special purposes such as exposing public (non-sensitive) information about the cluster. The newest Namespace is **kube-node-lease** which holds node lease objects used for node heartbeat data. Good practice, however, is to create additional Namespaces, as desired, to virtualize the cluster and isolate users, developer teams, applications, or tiers:

```sh
kubectl create namespace new-namespace-name 
```

Namespaces are one of the most desired features of Kubernetes, securing its lead against competitors, as it provides a solution to the multi-tenancy requirement of today's enterprise development teams. 

[Resource quotas](https://kubernetes.io/docs/concepts/policy/resource-quotas/) help users limit the overall resources consumed within Namespaces, while [LimitRanges](https://kubernetes.io/docs/concepts/policy/limit-range/) help limit the resources consumed by individual Containers and their enclosing objects in a Namespace. We will briefly cover quota management in a later chapter.

### Pods

A [Pod](https://kubernetes.io/docs/concepts/workloads/pods/) is the smallest Kubernetes workload object. It is the unit of deployment in Kubernetes, which represents a single instance of the application. A Pod is a logical collection of one or more containers, enclosing and isolating them to ensure that they:

- Are scheduled together on the same host with the Pod.
- Share the same network namespace, meaning that they share a single IP address originally assigned to the Pod.
- Have access to mount the same external storage (volumes) and other common dependencies.
 
![Single- and Multi-Container Pods](/img/edx/sm-pods.png)

Pods are ephemeral in nature, and they do not have the capability to self-heal themselves. That is the reason they are used with controllers, or operators (controllers/operators are used interchangeably), which handle Pods' replication, fault tolerance, self-healing, etc. Examples of controllers are Deployments, ReplicaSets, DaemonSets, Jobs, etc. When an operator is used to manage an application, the Pod's specification is nested in the controller's definition using the Pod Template.

Below is an example of a stand-alone Pod object's definition manifest in YAML format, without an operator. This represents the declarative method to define an object, and can serve as a template for a much more complex Pod definition manifest if desired:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    run: nginx-pod
spec:
  containers:
  - name: nginx-pod
    image: nginx:1.22.1
    ports:
    - containerPort: 80
```

The `apiVersion` field must specify `v1` for the Pod object definition. The second required field is `kind` specifying the Pod object type. The third required field `metadata`, holds the object's name and optional labels and annotations. The fourth required field `spec` marks the beginning of the block defining the desired state of the Pod object - also named the `PodSpec`. Our Pod creates a single container running the `nginx:1.22.1` image pulled from a container image registry, in this case from [Docker Hub](https://hub.docker.com/_/nginx). The `containerPort` field specifies the container port to be exposed by Kubernetes resources for inter-application access or external client access - to be explored in the Services chapter. The contents of `spec` are evaluated for scheduling purposes, then the `kubelet` of the selected node becomes responsible for running the container image with the help of the container runtime of the node. The Pod's name and labels are used for workload accounting purposes.

The above definition manifest, if stored by a `def-pod.yaml` file, is loaded into the cluster to run the desired Pod and its associated container image. While `create` is exemplified below, advanced Kubernetes practitioners may opt to use `apply` instead:

```sh
kubectl create -f def-pod.yaml
```

Writing up definition manifests, especially complex ones, may prove to be quite time consuming and troublesome because YAML is extremely sensitive to indentation. When eventually editing such definition manifests keep in mind that each indent is two blank spaces wide, and `TAB` should be omitted.

Imperatively, we can simply run the Pod defined above without the definition manifest as such:

```sh
kubectl run nginx-pod --image=nginx:1.22.1 --port=80
```

However, when in need of a starter definition manifest, knowing how to generate one can be a life-saver. The imperative command with additional key flags such as `dry-run` and the `yaml output`, can generate the definition template instead of running the Pod, while the template is then stored in the `nginx-pod.yaml` file. The following is a multi-line command that should be selected in its entirety for copy/paste (including the backslash character "\"):

```sh
kubectl run nginx-pod --image=nginx:1.22.1 --port=80 \
--dry-run=client -o yaml > nginx-pod.yaml
```

The command above generates a definition manifest in YAML, but we can generate a JSON definition file just as easily with:

```sh
kubectl run nginx-pod --image=nginx:1.22.1 --port=80 \
--dry-run=client -o json > nginx-pod.json
```

Both the YAML and JSON definition files can serve as templates or can be loaded into the cluster respectively as such:

```sh
kubectl create -f nginx-pod.yaml
kubectl create -f nginx-pod.json
```

Before advancing to more complex application deployment and management methods, become familiar with Pod operations with additional commands such as:

```sh
kubectl apply -f nginx-pod.yaml
kubectl get pods
kubectl get pod nginx-pod -o yaml
kubectl get pod nginx-pod -o json
kubectl describe pod nginx-pod
kubectl delete pod nginx-pod
```

## Demo: How to Run Applications with Pods

<video src="https://edx-video.net/61a5fb9c-6ebc-4d4e-9a16-22481e975246-mp4_720p.mp4" width="480" height="320" controls></video>

## Labels

[Labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/) are **key-value pairs** attached to Kubernetes objects such as Pods, ReplicaSets, Nodes, Namespaces, and Persistent Volumes. Labels are used to organize and select a subset of objects, based on the requirements in place. Many objects can have the same Label(s). Labels do not provide uniqueness to objects. Controllers use Labels to logically group together decoupled objects, rather than using objects' names or IDs.

![labels](/img/edx/labels.png)

In the image above, we have used two Label keys: `app` and `env`. Based on our requirements, we have given different values to our four Pods. The Label `env=dev` logically selects and groups the top two Pods, while the Label `app=frontend` logically selects and groups the left two Pods. We can select one of the four Pods - bottom left, by selecting two Labels: `app=frontend AND env=qa`.

## Label Selectors

Controllers, or operators, and Services, use [label selectors](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors) to select a subset of objects. Kubernetes supports two types of Selectors:

- **Equality-Based Selectors**

  Equality-Based Selectors allow filtering of objects based on Label keys and values. Matching is achieved using the `=`, `==` (equals, used interchangeably), or `!=` (not equals) operators. For example, with `env==dev` or `env=dev` we are selecting the objects where the `env` Label key is set to value `dev`.

- **Set-Based Selectors**

  Set-Based Selectors allow filtering of objects based on a set of values. We can use in, notin operators for Label values, and `exist/does not exist` operators for Label keys. For example, with `env in (dev,qa)` we are selecting objects where the `env` Label is set to either `dev` or `qa`; with `!app` we select objects with no Label key `app`.

  ![selectors](/img/edx/selectors.png)

  ## 
