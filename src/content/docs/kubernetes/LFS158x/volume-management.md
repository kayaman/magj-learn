---
title: Kubernetes Volume Management
description: LinuxFoundation
sidebar:
  order: 13
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 4
---

## Introduction

As we know, containers running in Pods are ephemeral in nature. All data stored inside a container is deleted if the container crashes. However, the `kubelet` will restart it with a clean slate, which means that it will not have any of the old data.

To overcome this problem, Kubernetes uses ephemeral [Volumes](https://kubernetes.io/docs/concepts/storage/volumes/), storage abstractions that allow various storage technologies to be used by Kubernetes and offered to containers in Pods as storage media. An ephemeral Volume is essentially a mount point on the container's file system backed by a storage medium. The storage medium, content and access mode are determined by the Volume Type.

![Shared Volume](/img/edx/shared-volume.png)

In Kubernetes, an ephemeral Volume is linked to a Pod and can be shared among the containers of that Pod. Although the ephemeral Volume has the same life span as the Pod, meaning that it is deleted together with the Pod, the ephemeral Volume outlives the containers of the Pod - this allows data to be preserved across container restarts.

## Container Storage Interface (CSI)

Container orchestrators like Kubernetes, Mesos, Docker or Cloud Foundry used to have their own methods of managing external storage using Volumes. For storage vendors, it was challenging to manage different Volume plugins for different orchestrators. A maintainability challenge for Kubernetes as well, it involved in-tree storage plugins integrated into the orchestrator's source code. Storage vendors and community members from different orchestrators started working together to standardize the Volume interface - a volume plugin built using a standardized [Container Storage Interface](https://kubernetes.io/docs/concepts/storage/volumes/#csi) (CSI) designed to work on different container orchestrators with a variety of storage providers. Explore the CSI specifications for more details.

Between Kubernetes releases v1.9 and v1.13 CSI matured from alpha to [stable support](https://kubernetes.io/blog/2019/01/15/container-storage-interface-ga/), which makes installing new CSI-compliant Volume drivers very easy. CSI allows third-party storage providers to [develop solutions](https://kubernetes-csi.github.io/docs/) without the need to add them into the core Kubernetes codebase. These solutions are CSI drivers installed only when required by cluster administrators.

## Volume Types

A directory which is mounted inside a Pod is backed by the underlying Volume Type. A Volume Type decides the properties of the directory, like size, content, default access modes, etc. Some examples of Volume Types that support ephemeral Volumes are:

- **emptyDir**

  An `empty` Volume is created for the Pod as soon as it is scheduled on the worker node. The Volume's life is tightly coupled with the Pod. If the Pod is terminated, the content of `emptyDir` is deleted forever.  

- **hostPath**

  The `hostPath` Volume Type shares a directory between the host and the Pod. If the Pod is terminated, the content of the Volume is still available on the host.

- **gcePersistentDisk**

  The `gcePersistentDisk` Volume Type mounts a [Google Compute Engine (GCE) persistent disk](https://cloud.google.com/compute/docs/disks/) into a Pod.

- **awsElasticBlockStore**

  The `awsElasticBlockStore` Volume Type mounts an [AWS EBS Volume](https://aws.amazon.com/ebs/) into a Pod.

- **azureDisk**

  The `azureDisk` mounts a [Microsoft Azure Data Disk](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/managed-disks-overview) into a Pod.

- **azureFile**

  The `azureFile` mounts a [Microsoft Azure File Volume](https://github.com/kubernetes/examples/tree/master/staging/volumes/azure_file) into a Pod.

- **cephfs**

  The `cephfs` allows for an existing [CephFS](https://ceph.io/ceph-storage/) volume to be mounted into a Pod. When a Pod terminates, the volume is unmounted and the contents of the volume are preserved.

- **nfs**

  The `nfs` mounts an [NFS](https://github.com/kubernetes/examples/tree/master/staging/volumes/nfs) share into a Pod.

- **iscsi**

  The `iscsi` mouns an [iSCSI](https://github.com/kubernetes/examples/tree/master/volumes/iscsi) share into a Pod.

- **secret**

  The [secret](https://kubernetes.io/docs/concepts/configuration/secret/) Volume Type facilitates the supply of sensitive information, such as passwords, certificates, keys, or tokens to Pods.

- **configMap**

  The [configMap](https://kubernetes.io/docs/concepts/configuration/configmap/) objects facilitate the supply of configuration data, or shell commands and arguments into a Pod.

- **persistentVolumeClaim**

  A [PersistentVolume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) is consumed by a Pod using a [persistentVolumeClaim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims).

You can learn more details about Volume Types from the documentation. However, do not be alarmed by the "deprecated" and "removed" notices. They have been added as means of tracking the original in-tree plugins which eventually migrated to the CSI driver implementation. Kubernetes native plugins do not show such a notice.

## PersistentVolumes

In a typical IT environment, storage is managed by the storage/system administrators. The end user will just receive instructions to use the storage but is not involved with the underlying storage management.

In the containerized world, we would like to follow similar rules, but it becomes challenging, given the many Volume Types we have seen earlier. Kubernetes resolves this problem with the [PersistentVolume (PV)](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) subsystem, which provides APIs for users and administrators to manage and consume persistent storage. To manage the Volume, it uses the PersistentVolume API resource type, and to consume it, it uses the PersistentVolumeClaim API resource type.

A Persistent Volume is a storage abstraction backed by several storage technologies, which could be local to the host where the Pod is deployed with its application container(s), network attached storage, cloud storage, or a distributed storage solution. A Persistent Volume is statically provisioned by the cluster administrator.

![PV](/img/edx/pv.png)

PersistentVolumes can be dynamically provisioned based on the StorageClass resource. A StorageClass contains predefined provisioners and parameters to create a PersistentVolume. Using PersistentVolumeClaims, a user sends the request for dynamic PV creation, which gets wired to the StorageClass resource.

Some of the Volume Types that support managing storage using PersistentVolumes are:

- GCEPersistentDisk
- AWSElasticBlockStore
- AzureFile
- AzureDisk
- CephFS
- NFS
- iSCSI

For a complete list, as well as more details, you can check out the [types of Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#types-of-persistent-volumes). The Persistent Volume types use the same CSI driver implementations as ephemeral Volumes.

## PersistentVolumeClaims

A [PersistentVolumeClaim (PVC)](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims) is a request for storage by a user. Users request for PersistentVolume resources based on storage class, [access mode](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes), size, and optionally volume mode. There are four access modes: ReadWriteOnce (read-write by a single node), ReadOnlyMany (read-only by many nodes), ReadWriteMany (read-write by many nodes), and ReadWriteOncePod (read-write by a single pod). The optional volume modes, filesystem or block device, allow volumes to be mounted into a pod's directory or as a raw block device respectively. By design Kubernetes does not support object storage, but it can be implemented with the help of custom resource types. Once a suitable PersistentVolume is found, it is bound to a PersistentVolumeClaim.

![PVC](/img/edx/pvc.png)

After a successful bound, the PersistentVolumeClaim resource can be used by the containers of the Pod.

![PVC](/img/edx/pvc2.png)

Once a user finishes its work, the attached PersistentVolumes can be released. The underlying PersistentVolumes can then be reclaimed (for an admin to verify and/or aggregate data), deleted (both data and volume are deleted), or recycled for future usage (only data is deleted), based on the configured `persistentVolumeReclaimPolicy` property.

To learn more, you can check out the [PersistentVolumeClaims](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims).

## Demo

This exercise guide was prepared for the video demonstration available at the end of this chapter. It includes a Deployment definition manifest that can be used as a template to define other similar objects as needed. In addition to the ephemeral volume and the volume mounts specified for each container, a command stanza allows us to define a series of desired commands expected to run in one of the containers. The debian container's shell command line interpreter (sh) is invoked to run the `echo` and `sleep` commands (`-c`).

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: blue-app
  name: blue-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: blue-app
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: blue-app
        type: canary
    spec:
      volumes:
      - name: host-volume
        hostPath:
          path: /home/docker/blue-shared-volume
      containers:
      - image: nginx
        name: nginx
        ports:
        - containerPort: 80
        volumeMounts:
        - mountPath: /usr/share/nginx/html
          name: host-volume
      - image: debian
        name: debian
        volumeMounts:
        - mountPath: /host-vol
          name: host-volume
        command: ["/bin/sh", "-c", "echo Welcome to BLUE App! > /host-vol/index.html ; sleep infinity"]
status: {}
```

<video src="https://edx-video.net/c1920e47-8972-41a8-802f-2fa5557c27af-mp4_720p.mp4" width="480" height="320" controls></video>