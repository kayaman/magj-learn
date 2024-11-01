---
title: Acessing Minikube
description: LinuxFoundation
sidebar:
  order: 8
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 4
---

## Introduction

We can use a variety of external clients or custom scripts to access our cluster for administration purposes. We will explore `kubectl` as a CLI tool to access the Minikube Kubernetes cluster, the **Kubernetes Dashboard** as a web-based user interface to interact with the cluster, and the curl command with proper credentials to access the cluster via APIs.

## Accessing Minikube

Any healthy running Kubernetes cluster can be accessed via any one of the following methods:

- Command Line Interface (CLI) tools and scripts
- Web-based User Interface (Web UI) from a web browser
- APIs from CLI or programmatically

These methods are applicable to all Kubernetes clusters.

### Command Line Interface (CLI)

[kubectl](https://kubernetes.io/docs/reference/kubectl/overview/) is the Kubernetes Command Line Interface (CLI) client to manage cluster resources and applications. It is very flexible and easy to integrate with other systems, therefore it can be used standalone, or part of scripts and automation tools. Once all required credentials and cluster access points have been configured for `kubectl`, it can be used remotely from anywhere to access a cluster.

We will be using `kubectl` extensively to deploy applications, manage and configure Kubernetes resources.

### Web-based User Interface (Web UI)

The [Kubernetes Dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/) provides a Web-based User Interface (Web UI) to interact with a Kubernetes cluster to manage resources and containerized applications. While not as flexible as the kubectl CLI client tool, it is still a preferred tool to users who are not as proficient with the CLI.

![KD](/img/edx/kd.png)

### APIs

The main component of the Kubernetes control plane is the API Server, responsible for exposing the Kubernetes APIs. The APIs allow operators and users to directly interact with the cluster. Using both CLI tools and the Dashboard UI, we can access the API server running on the control plane node to perform various operations to modify the cluster's state. The API Server is accessible through its endpoints by agents and users possessing the required credentials.

Below, we can see the representation of the HTTP API directory tree of Kubernetes:

![API Server](/img/edx/api-server.png)

HTTP API directory tree of Kubernetes can be divided into three independent group types:

- Core group `(/api/v1)`
  This group includes objects such as Pods, Services, Nodes, Namespaces, ConfigMaps, Secrets, etc.

- Named group
  This group includes objects in `/apis/$NAME/$VERSION` format. These different API versions imply different levels of stability and support:
  - *Alpha level*: it may be dropped at any point in time, without notice. For example, `/apis/batch/v2alpha1`.
  - *Beta level*: it is well-tested, but the semantics of objects may change in incompatible ways in a subsequent beta or stable release. For example, `/apis/certificates.k8s.io/v1beta1`.
  - *Stable level*: appears in released software for many subsequent versions. For example, `/apis/networking.k8s.io/v1`.
- System-wide
  This group consists of system-wide API endpoints, like `/healthz`, `/logs`, `/metrics`, `/ui`, etc.

We can access an API Server either directly by calling the respective API endpoints, using the CLI tools, or the Dashboard UI.

## #TODO