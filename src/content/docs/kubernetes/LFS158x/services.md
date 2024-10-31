---
title: Services
description: LinuxFoundation
sidebar:
  order: 11
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 4
---

## Introoduction

Although the microservices driven architecture aims to decouple the components of an application, microservices still need agents to logically tie or group them together for management purposes, or to load balance traffic to the ones that are part of such a logical set.

In this chapter, we will learn about [Service](https://kubernetes.io/docs/concepts/services-networking/service/) objects used to abstract the communication between cluster internal microservices, or with the external world. A Service offers a single DNS entry for a stateless containerized application managed by the Kubernetes cluster, regardless of the number of its replicas, by providing a common load balancing access point to a set of pods logically grouped and managed by a controller such as a Deployment, ReplicaSet, or DaemonSet.

We will also learn about the **kube-proxy** daemon, which runs on each control plane and worker node to implement the services' configuration and to provide access to services. In addition we will discuss **service discovery** and **service types**, which decide the access scope of a service.

## Accessing Application Pods

To access the application, a user or another application needs to connect to a Pod running the target application. As Pods are ephemeral in nature, resources like IP addresses allocated to them cannot be static. Pods could be terminated abruptly or be rescheduled based on existing requirements.

Let's take, for example, a scenario where an operator manages a set of Pods and a user/client is accessing the Pods directly by using their individual IP addresses. This access method requires the client to retrieve the target Pods' IP addresses in advance, introducing an unnecessary overhead for the client.

![IPs](/img/edx/access-via-ips.png)

Unexpectedly, one of the Pods the user/client is accessing is terminated, and a new Pod is created by the controller. The new Pod will be assigned a new IP address that will not be immediately known by the user/client. If the client tries to watch the target Pods' IP addresses for any changes and updates, this will result in an inefficient approach that will only increase the client's overhead.

![pod terminated](/img/edx/pod-terminated.png)

To overcome this situation, Kubernetes provides a higher-level abstraction called Service, which logically groups Pods and defines a policy to access them. This grouping is achieved via Labels and Selectors. This logical grouping strategy is used by Pod controllers, such as ReplicaSets, Deployments, and even DaemonSets. Below is a Deployment definition manifest for the frontend app, to aid with the correlation of Labels, Selectors, and port values between the Deployment controller, its Pod replicas, and the Service definition manifest presented in an upcoming section.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: frontend
  name: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
    template:
      metadata:
        labels:
          app: frontend
      spec:
        containers:
        - image: frontend-application
        name: frontend-application
        ports:
        - containerPort: 5000
```

## Services

Labels and Selectors use a **key-value** pair format. In the following graphical representation, `app` is the Label **key**, `frontend` and `db` are Label **values** for different Pods.

![Services](/img/edx/services.png)

Using the selectors `app==frontend` and `app==db`, we group Pods into two logical sets: one set with 3 Pods, and one set with a single Pod.

We assign a name to the logical grouping, referred to as a **Service**. The Service name is also registered with the cluster's internal DNS service. In our example, we create two Services, `frontend-svc`, and `db-svc`, and they have the `app==frontend` and the `app==db` Selectors, respectively.

Services can expose single Pods, ReplicaSets, Deployments, DaemonSets, and StatefulSets. When exposing the Pods managed by an operator, the Service's Selector may use the same label(s) as the operator. A clear benefit of a Service is that it watches application Pods for any changes in count and their respective IP addresses while automatically updating the list of corresponding endpoints. Even for a single-replica application, run by a single Pod, the Service is beneficial during self-healing (replacement of a failed Pod) as it immediately directs traffic to the newly deployed healthy Pod.

## Service Object Example

The following is an example of a Service object definition. This represents the declarative method to define an object, and can serve as a template for a much more complex Service definition manifest if desired. By omitting the Service type from the definition manifest, we create the default service type, the ClusterIP type (the ClusterIP Service type will be covered in an upcoming lesson).

```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend-svc
spec:
  selector:
    app: frontend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 5000
```

The above definition manifest, if stored by a `frontend-svc.yaml` file, is loaded into the cluster to set up the necessary routes and rules to send traffic to the Pod replicas of the earlier defined `frontend` Deployment. While create is exemplified below, advanced Kubernetes practitioners may opt to use `apply` instead:

```sh
kubectl create -f frontend-svc.yaml
```

Imperatively, we can use a direct method to expose the Deploymen's Pods.

```sh
kubectl expose deploy frontend --name=frontend-svc --port=80 --target-port=5000
```

The `expose` command parses the referenced Deployment object to extract valuable pairing details such as Name, Label, Selector, and containerPort to populate these values in the Service object. However, especially in cases when the Service `port` and Service `targetPort` values are expected to be distinct (`80` and `5000` respectively), it is best to explicitly supply these values with the `expose` command. In addition, we decided to change the name of the Service with the `name` option (the default behavior is for the Service object to inherit the exposed Deployment's name `frontend`).

Another imperative method to set up the same Service from above is through the `create service` command. The rather complex command below first sets up a `frontend` Service with `frontend` Label and `frontend` Selector in `dry-run` mode, it updates the Service name to `frontend-svc` and then loads the definition in the cluster.

```sh
kubectl create service clusterip frontend \
--tcp=80:5000 --dry-run=client -o yaml \
| sed 's/name: frontend/name: frontend-svc/g' \
| kubectl apply -f -
```

In this example, we are creating a `frontend-svc` Service by selecting all the Pods that have the Label key=`app` set to value=`frontend`. By default, each Service receives an IP address routable only inside the cluster, known as `ClusterIP`. In our example, we have `172.17.0.4` and `172.17.0.5` as ClusterIPs assigned to our `frontend-svc` and `db-svc` Services, respectively.

![Service Object](/img/edx/service-object.png)

The user/client now connects to a Service via its ClusterIP, which forwards traffic to one of the Pods attached to it. A Service provides load balancing by default while selecting the Pods for traffic forwarding.

While the Service forwards traffic to Pods, we can select the `targetPort` on the Pod which receives the traffic. In our example, the `frontend-svc` Service receives requests from the user/client on `port: 80` and then forwards these requests to one of the attached Pods on the `targetPort: 5000`. If the `targetPort` is not defined explicitly, then traffic will be forwarded to Pods on the `port` on which the Service receives traffic - in this case the `targetPort` implicitly is assigned the value of the `port`. It is very important to ensure that the value of the `targetPort`, which is `5000` in this example, matches the value of the `containerPort` property of the Pod `spec` section.

A logical set of a Pod's IP address, along with the `targetPort` is referred to as a `Service endpoint`. In our example, the `frontend-svc` Service has 3 endpoints: `10.0.1.3:5000`, `10.0.1.4:5000`, and `10.0.1.5:5000` respectively. Endpoints are created and managed automatically by the Service, not by the Kubernetes cluster administrators or developers.

The Service and associated endpoints can be listed with:

```sh
kubectl get service,endpoints frontend-svc
kubectl get svc,ep frontend-svc
```

## kube-proxy

Each cluster node runs a daemon called [kube-proxy](https://kubernetes.io/docs/concepts/services-networking/service-traffic-policy/), a node agent that watches the API server on the control plane node for the addition, updates, and removal of Services and endpoints. `kube-proxy` is responsible for implementing the Service configuration on behalf of an administrator or developer, in order to enable traffic routing to an exposed application running in Pods. In the example below, for each new Service, on each node, `kube-proxy` configures `iptables` rules to capture the traffic for its ClusterIP and forwards it to one of the Service's endpoints. Therefore any node can receive the external traffic and then route it internally in the cluster based on the iptables rules. When the Service is removed, kube-proxy removes the corresponding iptables rules on all nodes as well.

Just as the `kube-proxy` node agent runs redundantly on each cluster node, the `iptables` are populated in a redundant fashion by their respective node agents so that each `iptables` instance stores complete routing rules for the entire cluster. This helps with the Service objects implementation to reproduce a distributed load balancing mechanism.

![kube-proxy](/img/edx/kube-proxy.png)

## Traffic Policies

The kube-proxy node agent together with the iptables implement the load-balancing mechanism of the Service when traffic is being routed to the application Endpoints. Due to restricting characteristics of the iptables this load-balancing is random by default. This means that the Endpoint Pod to receive the request forwarded by the Service will be randomly selected out of many replicas. This mechanism does not guarantee that the selected receiving Pod is the closest or even on the same node as the requester, therefore not the most efficient mechanism. Since this is the iptables supported load-balancing mechanism, if we desire better outcomes, we would need to take advantage of traffic policies. 

[Traffic policies](https://kubernetes.io/docs/reference/networking/virtual-ips/#traffic-policies) allow users to instruct the kube-proxy on the context of the traffic routing. The two options are Cluster and Local:

- The **Cluster** option allows kube-proxy to target all ready Endpoints of the Service in the load-balancing process. This is the default behavior of the Service even when the traffic policy property is not explicitly declared.

- The **Local** option, however, isolates the load-balancing process to only include the Endpoints of the Service located on the same node as the requester Pod, or perhaps the node that captured inbound external traffic on its NodePort (the NodePort Service type will be covered in an upcoming lesson). While this sounds like an ideal option, it does have a shortcoming - if the Service does not have a ready Endpoint on the node where the requester Pod is running, the Service will not route the request to Endpoints on other nodes to satisfy the request because it will be dropped by kube-proxy.

Both the Cluster and Local options are available for requests generated internally from within the cluster, or externally from applications and clients running outside the cluster. The Service definition manifest below defines both internal and external Local traffic policies. Both are optional settings, and can be used independent of each other, where one can be defined without the other (either internal or external policy).

```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend-svc
spec:
  selector:
    app: frontend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 5000
  internalTrafficPolicy: Local
  externalTrafficPolicy: Local
```

## Service Discovery

