---
title: Minikube
description: LinuxFoundation
sidebar:
  order: 7
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 4
---

## What is Minikube?

Minikube is one of the easiest, most flexible and popular methods to run an all-in-one or a multi-node local Kubernetes cluster directly on our local workstations. It installs and runs on any native OS such as Linux, macOS, or Windows. However, in order to fully take advantage of all the features Minikube has to offer, a [Type-2 Hypervisor](https://en.wikipedia.org/wiki/Hypervisor) or a Container Runtime should be installed on the local workstation, to run in conjunction with Minikube. The role of the hypervisor or container runtime is to offer an isolated infrastructure for the Minikube Kubernetes cluster components, that is easily reproducible, easy to use and tear down. This isolation of the cluster components from our daily environment ensures that once no longer needed, the Minikube components can be safely removed leaving behind no configuration changes to our workstation, thus no traces of their existence. This does not mean, however, that we are responsible for the provisioning of any VMs or containers with guest operating systems with the help of the hypervisor or container runtime. Minikube includes the necessary adapters to interact directly with the isolation software of choice to build all its infrastructure as long as the Type-2 Hypervisor or Container Runtime is installed on our workstation.

Minikube is built on the capabilities of the [libmachine](https://github.com/docker/machine/tree/master/libmachine) library originally designed by Docker to build [Virtual Machine container hosts](https://github.com/docker/machine) on any physical infrastructure. In time Minikube became very flexible, supporting several hypervisors and container runtimes, depending on the host workstation's native OS.

For those who feel more adventurous, Minikube can be installed without an isolation software, on bare-metal, which may result in permanent configuration changes to the host OS. To prevent such permanent configuration changes, a second form of isolation can be achieved by installing Minikube inside a Virtual Machine provisioned with a Type-2 Hypervisor of choice, and a desktop guest OS of choice (with enabled GUI). As a result, when installed inside a VM, Minikube will end up making configuration changes to the guest environment, still isolated from the host workstation. Therefore, now we have two distinct methods to isolate the Minikube environment from our host workstation.

The isolation software can be specified by the user with the --driver option, otherwise Minikube will try to find a preferred method for the host OS of the workstation.

Once decided on the isolation method, the next step is to determine the required number of Kubernetes cluster nodes, and their sizes in terms of CPU, memory, and disk space. Minikube invokes the hypervisor of choice to provision the infrastructure VM(s) which will host the Kubernetes cluster node(s), or the runtime of choice to run infrastructure container(s) that host the cluster node(s). Keep in mind that Minikube now supports all-in-one single-node and multi-node clusters. Regardless of the isolation method and the expected cluster and node sizes, a local Minikube Kubernetes cluster will ultimately be impacted and/or limited by the physical resources of the host workstation. We have to be mindful of the needs of the host OS and any utilities it may be running, then the needs of the hypervisor or the container runtime, and finally the remaining resources that can be allocated to our Kubernetes cluster. For a learning environment the recommendations are that a Kubernetes node has 2 CPU cores (or virtual CPUs) at a minimum, at least 2 GB of RAM memory (with 4 - 8 GB of RAM recommended for optimal usage), and 20+ GB of disk storage space. When migrating towards a larger, more dynamic, production grade cluster, these resource values should be adjusted accordingly. The Kubernetes nodes are expected to access the internet as well, for software updates, container image downloads, and for client accessibility.

Following the node(s)' provisioning phase, Minikube invokes [kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/), to bootstrap the Kubernetes cluster components inside the previously provisioned node(s). We need to ensure that we have the necessary hardware and software required by Minikube to build our environment.

## Requirements

Below we outline the requirements to run Minikube on our local workstation:

- VT-x/AMD-v virtualization may need to be enabled on the local workstation for certain hypervisors.
- kubectl
  `kubectl` command line client (CLI) is a binary used to access and manage any Kubernetes cluster. It is installed through Minikube and accessed through the `minikube` `kubectl` command, or it can be installed separately and run as a standalone tool. We will explore `kubectl` installation and usage in future chapters.
- Type-2 Hypervisor or Container Runtime
  Without a specified driver, Minikube will try to find an installed hypervisor or a runtime, in the following order of preference (on a Linux host): docker, kvm2, podman, vmware, and virtualbox. If multiple isolation software installations are found, such as docker and virtualbox, Minikube will pick docker over virtualbox if no desired driver is specified by the user. Hypervisors and Container Runtimes supported by various native workstation OSes:
  - On Linux [VirtualBox](https://www.virtualbox.org/wiki/Downloads), [KVM2](https://www.linux-kvm.org/page/Main_Page), and [QEMU](https://www.qemu.org/) hypervisors, or [Docker](https://docs.docker.com/engine/install/) and [Podman](https://podman.io/getting-started/installation.html) runtimes
  - On macOS [VirtualBox](https://www.virtualbox.org/wiki/Downloads), [HyperKit](https://github.com/moby/hyperkit), [VMware Fusion](http://www.vmware.com/products/fusion.html), [Parallels](https://www.parallels.com/), and [QEMU](https://www.qemu.org/) hypervisors, or [Docker](https://docs.docker.com/desktop/windows/install/) and [Podman](https://podman.io/getting-started/installation.html) runtimes
  - On Windows [VirtualBox](https://www.virtualbox.org/wiki/Downloads), [Hyper-V](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v), [VMware Workstation](https://www.vmware.com/in/products/workstation-pro/workstation-pro-evaluation.html), and [QEMU](https://www.qemu.org/) hypervisors, or [Docker](https://docs.docker.com/desktop/windows/install/) and [Podman](https://podman.io/getting-started/installation.html) runtimes.

:::note

Minikube supports a [--driver=none](https://minikube.sigs.k8s.io/docs/drivers/none/) (on Linux) option that runs the Kubernetes components bare-metal, directly on the host OS and not inside a VM. With this option a Docker installation is required and a Linux OS on the local workstation, but no hypervisor installation. **This driver is recommended for advanced users**.

:::

- Internet connection on the first Minikube run - to download packages, dependencies, updates and pull images needed to initialize the Minikube Kubernetes cluster components. Subsequent Minikube runs will require an Internet connection only when new container images need to be pulled from a public container registry or when deployed containerized applications need it for client accessibility. Once a container image has been pulled, it can be reused from the local container runtime image cache without an Internet connection.
In this chapter, we use one of the most robust and stable isolation methods as a driver, the VirtualBox hypervisor, to provision the VM(s) which host the components of the Kubernetes cluster. While no longer the preferred driver due to slower startup times when compared with other methods, it is still one of the most stable drivers for Minikube on Linux and Windows. However, the VirtualBox hypervisor is no longer compatible with macOS on ARM chipset (M1, M2, and M3), therefore Docker will be used instead.

Read more about Minikube from the official [Minikube documentation](https://minikube.sigs.k8s.io/docs/), the official [Kubernetes documentation](https://kubernetes.io/docs/tasks/tools/#minikube), or [GitHub](https://github.com/kubernetes/minikube).

## Advanced Features

Now that we have familiarized ourselves with the default `minikube start` command, let's dive deeper into Minikube to understand some of its more advanced features.

The `minikube start` by default selects a driver isolation software, such as a hypervisor or a container runtime, if one (VitualBox) or multiple are installed on the host workstation. In addition it downloads the latest Kubernetes version components. With the selected driver software it provisions a single VM named minikube (with hardware profile of CPUs=2, Memory=6GB, Disk=20GB) or container (Docker) to host the default single-node all-in-one Kubernetes cluster. Once the node is provisioned, it bootstraps the Kubernetes control plane (with the default kubeadm tool), and it installs the latest version of the default container runtime, Docker, that will serve as a running environment for the containerized applications we will deploy to the Kubernetes cluster. The `minikube start` command generates a default `minikube` cluster with the specifications described above and it will store these specs so that we can restart the default cluster whenever desired. The object that stores the specifications of our cluster is called a `profile`.

As Minikube matures, so do its features and capabilities. With the introduction of profiles, Minikube allows users to create custom reusable clusters that can all be managed from a single command line client.

The `minikube profile` command allows us to view the status of all our clusters in a table formatted output. Assuming we have created only the default `minikube` cluster, we could list the properties that define the default profile with:

```sh
minikube profile list
```

This table presents the columns associated with the default properties such as the profile name: minikube, the isolation driver: VirtualBox, the container runtime: Docker, the Kubernetes version: v1.28.3, the status of the cluster - running or stopped. The table also displays the number of nodes: 1 by default, the private IP address of the minikube cluster's control plane VirtualBox VM, and the secure port that exposes the API Server to cluster control plane components, agents and clients: 8443. 

What if we desire to create several reusable clusters instead, with other drivers (Docker or Podman - still experimental on Linux) for node isolation, or different Kubernetes versions (v1.27.10 or v1.28.1), another runtime (cri-o or containerd), and possibly 2, 3, or more nodes (if permitted by the resources of our host system)? What if we desire to further customize the cluster with a specific networking option or plugin? The `minikube start`  command allows us to create such custom profiles with the `--profile` or `-p` flags. Several of the isolation drivers support creation of node VMs or node containers of custom sizes as well, features that we will not explore in this course as not all are very stable at the time of this writing.

Below are a few examples of more complex `start` commands that allow custom clusters to be created with Minikube. They assume that the desired driver software (Docker and/or Podman) has been installed on the host workstation. There is no need to download the desired CNI (network plugin) or the container runtime, they will be set up and enabled by Minikube on our behalf:

```sh
minikube start --kubernetes-version=v1.27.10 --driver=podman --profile minipod
```

```sh
minikube start --nodes=2 --kubernetes-version=v1.28.1 --driver=docker --profile doubledocker
```

```sh
minikube start --driver=virtualbox --nodes=3 --disk-size=10g --cpus=2 --memory=6g --kubernetes-version=v1.27.12 --cni=calico --container-runtime=cri-o -p multivbox
```

```sh
minikube start --driver=docker --cpus=6 --memory=8g --kubernetes-version="1.27.12" -p largedock
```

```sh
minikube start --driver=virtualbox -n 3 --container-runtime=containerd --cni=calico -p minibox
```

Once multiple cluster profiles are available (the default `minikube` and custom `minibox`), the profiles table will look like this:

```sh
minikube profile list
```

The `active` marker indicates the target cluster profile of the minikube command line tool, also known as its context. The target cluster can be set to `minibox` with the following command:

```sh
minikube profile minibox
```

The target cluster can be set to the default `minikube` with one of the following commands:

```sh
minikube profile minikube
```

```sh
minikube profile default
```

Most `minikube` commands, such as start, stop, node, etc. are profile aware, meaning that the user is required to explicitly specify the target cluster of the command, through its profile name. The default minikube cluster, however, can be managed implicitly without specifying its profile name. Stopping and re-starting the two clusters listed above, the `minibox` cluster (explicitly) and the default `minikube` cluster (implicitly):

```sh
minikube stop -p minibox
```

```sh
minikube start -p minibox
```

```sh
minikube stop
```

```sh
minikube start
```

Additional helpful `minikube` commands:

To display the version of the current Minikube installation:

```sh
minikube version
```

Completion is a helpful post installation configuration to enable the `minikube` command to respond to typical auto-completion mechanisms, such as completing a command in the terminal by pressing the TAB key. To enable completion for the bash shell on Ubuntu:

```sh
sudo apt install bash-completion
```

```sh
source /etc/bash_completion
```

```sh
source <(minikube completion bash)
```

If needed, also run the following command:

```sh
minikube completion bash
```

A command that allows users to list the nodes of a cluster, add new control plane or worker nodes, delete existing cluster nodes, start or stop individual nodes of a cluster:

```sh
minikube node list
```

```sh
minikube node list -p minibox
```

To display the cluster control plane node's IP address, or another node's IP with the `--node` or `-n` flags:

```sh
minikube ip
```

```sh
minikube -p minibox ip
```

```sh
minikube -p minibox ip -n minibox-m02
```

When a cluster configuration is no longer of use, the cluster's profile can be deleted. It is also a profile aware command - it deletes the default `minikube` cluster if no profile is specified, or a custom cluster if its profile is specified:

```sh
minikube delete
```

```sh
minikube delete -p minibox
```

For additional commands and usage options please visit the [Minikube command line reference](https://minikube.sigs.k8s.io/docs/commands/).

### Demo

<video src="https://edx-video.net/a6337faf-38bd-45b3-9733-9ad15a10c217-mp4_720p.mp4" width="480" height="320" controls></video>
