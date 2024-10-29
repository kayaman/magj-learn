---
title: Kubernetes
description: LinuxFoundation
sidebar:
  order: 4
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 4
---

## Introduction

In this chapter, we describe Kubernetes, its features, and the reasons why you should use it. We will explore the evolution of Kubernetes from Borg, Google's very own distributed workload manager.

We will also learn about the Cloud Native Computing Foundation (CNCF), which currently hosts the Kubernetes project, along with other popular cloud native projects, such as Argo, Cilium, Prometheus, Fluentd, etcd, CoreDNS, cri-o, containerd, Helm, Envoy, Istio, and Linkerd, just to name a few.

What Is Kubernetes?

According to the [Kubernetes website](https://kubernetes.io/),

> "Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications".

Kubernetes comes from the Greek word **κυβερνήτης**, which means *helmsman* or *ship pilot*. With this analogy in mind, we can think of Kubernetes as the pilot on a ship of containers.

![k8s](/img/edx/kubernetes.png)

Kubernetes is also referred to as **k8s** (pronounced Kate's), as there are 8 characters between k and s.

Kubernetes is highly inspired by the Google Borg system, a container and workload orchestrator for its global operations, Google has been using for more than a decade. It is an open source project written in the Go language and licensed under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).

Kubernetes was started by Google and, with its v1.0 release in July 2015, Google donated it to the [Cloud Native Computing Foundation](https://www.cncf.io/) (CNCF), one of the largest sub-foundations of the [Linux Foundation](https://www.linuxfoundation.org/).

New Kubernetes versions are released in 4 month cycles. The current stable version is 1.31 (as of October 2024).

## From Borg to Kubernetes

According to the abstract of Google's Borg paper, published in 2015,

> "Google's Borg system is a cluster manager that runs hundreds of thousands of jobs, from many thousands of different applications, across a number of clusters each with up to tens of thousands of machines".

For more than a decade, Borg has been Google's secret, running its worldwide containerized workloads in production. Services we use from Google, such as Gmail, Drive, Maps, Docs, etc., are all serviced using Borg.

Among the initial authors of Kubernetes were Google employees who have used Borg and developed it in the past. They poured in their valuable knowledge and experience while designing Kubernetes. Several features/objects of Kubernetes that can be traced back to Borg, or to lessons learned from it, are:

- API servers
- Pods
- IP-per-Pod
- Services
- Labels.

## Kubernetes Features

Kubernetes offers a very rich set of features for container orchestration. Some of its fully supported features are:

- **Automatic bin packing**

    Kubernetes automatically schedules containers based on resource needs and constraints, to maximize utilization without sacrificing availability.

- **Designed for extensibility**

    A Kubernetes cluster can be extended with new custom features without modifying the upstream source code.

- **Self-healing**

    Kubernetes automatically replaces and reschedules containers from failed nodes. It terminates and then restarts containers that become unresponsive to health checks, based on existing rules/policy. It also prevents traffic from being routed to unresponsive containers.

- **Horizontal scaling**

    Kubernetes scales applications manually or automatically based on CPU or custom metrics utilization.

- **Service discovery and load balancing**

    Containers receive IP addresses from Kubernetes, while it assigns a single Domain Name System (DNS) name to a set of containers to aid in load-balancing requests across the containers of the set.

Additional fully supported Kubernetes features are:

- **Automated rollouts and rollbacks**

    Kubernetes seamlessly rolls out and rolls back application updates and configuration changes, constantly monitoring the application's health to prevent any downtime.

- **Secret and configuration management**

    Kubernetes manages sensitive data and configuration details for an application separately from the container image, in order to avoid a rebuild of the respective image. Secrets consist of sensitive/confidential information passed to the application without revealing the sensitive content to the stack configuration, like on GitHub.

- **Storage orchestration**

    Kubernetes automatically mounts software-defined storage (SDS) solutions to containers from local storage, external cloud providers, distributed storage, or network storage systems.

- **Batch execution**

    Kubernetes supports batch execution, long-running jobs, and replaces failed containers.

- **IPv4/IPv6 dual-stack**

    Kubernetes supports both IPv4 and IPv6 addresses.
Kubernetes supports common Platform as a Service specific features such as application deployment, scaling, and load balancing, but allows users to integrate their desired monitoring, logging and alerting solutions through optional plugins.

## Why Use Kubernetes?

Another one of Kubernetes' strengths is portability. It can be deployed in many environments such as local or remote Virtual Machines, bare metal, or in public/private/hybrid/multi-cloud setups.

Kubernetes extensibility allows it to support and to be supported by many 3rd party open source tools which enhance Kubernetes' capabilities and provide a feature-rich experience to its users. It's architecture is modular and pluggable. Not only does it orchestrate modular, decoupled microservices type applications, but also its architecture follows decoupled microservices patterns. Kubernetes' functionality can be extended by writing custom resources, operators, custom APIs, scheduling rules or plugins.

For a successful open source project, the community is as important as having great code. Kubernetes is supported by a thriving community across the world. It has more than 3,500 contributors, who, over time, have pushed over 120,000 commits. There are meet-up groups in different cities and countries which meet regularly to discuss Kubernetes and its ecosystem. The community is divided into Special Interest Groups (SIGs), groups which focus on special topics, such as scaling, bare metal, networking, storage, etc. We will learn more about them in our last chapter, Kubernetes Community.

## Kubernetes Users

In less than a decade since its debut Kubernetes has become the platform of choice for many enterprises of various sizes to run their workloads. It is a solution for workload management in banking, education, finance and investments, gaming, information technology, media and streaming, online retail, ridesharing, telecommunications, nuclear research, and many other industries. There are numerous user [case studies](https://kubernetes.io/case-studies/) and success stories on the Kubernetes website.

## Cloud Native Computing Foundation (CNCF)

The [Cloud Native Computing Foundation](https://www.cncf.io/) (CNCF) is one of the largest sub-projects hosted by the [Linux Foundation](https://www.linuxfoundation.org/). CNCF aims to accelerate the adoption of containers, microservices, and cloud-native applications.

![CNCF](/img/edx/cncf.png)

CNCF hosts a multitude of projects, with more to be added in the future. CNCF provides resources to each of the projects, but, at the same time, each project continues to operate independently under its pre-existing governance structure and with its existing maintainers. Projects within CNCF are categorized based on their maturity levels: Sandbox, Incubating, and Graduated. At the time of this writing, over a dozen projects had reached Graduated status with many more Incubating and in the Sandbox.

CNCF hosts a multitude of projects, with more to be added in the future. CNCF provides resources to each of the projects, but, at the same time, each project continues to operate independently under its pre-existing governance structure and with its existing maintainers. Projects within CNCF are categorized based on their maturity levels: Sandbox, Incubating, and Graduated. At the time of this writing, over a dozen projects had reached Graduated status with many more Incubating and in the Sandbox.

Popular graduated projects (as of October 2024):

- [Kubernetes](https://kubernetes.io/) container orchestrator
- [Argo](https://www.cncf.io/projects/argo/) workflow engine for Kubernetes
- [cert-manager](https://www.cncf.io/projects/cert-manager/) Security & Compliance
- [cilium](https://www.cncf.io/projects/cilium/) cloud native network
- [cloudevents](https://www.cncf.io/projects/cloudevents/) streaming & messaging
- [containerd](https://www.cncf.io/projects/containerd/) container runtime
- [CoreDNS](https://www.cncf.io/projects/coredns/) DNS server
- [CRI-O](https://www.cncf.io/projects/cri-o/) container runtime
- [Envoy](https://www.cncf.io/projects/envoy/) cloud native proxy
- [etcd](https://www.cncf.io/projects/etcd/) distributed key-value store
- [Falco](https://www.cncf.io/projects/falco/) security & compliance
- [Fluentd](https://www.cncf.io/projects/fluentd/) for unified logging
- [Flux](https://www.cncf.io/projects/flux/) continuous delivery for Kubernetes
- [Harbor](https://www.cncf.io/projects/harbor/) registry
- [Helm](https://www.cncf.io/projects/helm/) package management for Kubernetes
- [Istio](https://www.cncf.io/projects/istio/) service mesh
- [Jaeger](https://www.cncf.io/projects/jaeger/) observability
- [Keda](https://www.cncf.io/projects/keda/) scheduling & orchestration
- [KubeEdge](https://www.cncf.io/projects/kubeedge/) automation & configuration
- [Linkerd](https://www.cncf.io/projects/linkerd/) service mesh for Kubernetes
- [Open Policy Agent](https://www.cncf.io/projects/open-policy-agent-opa/) policy engine
- [Prometheus](https://www.cncf.io/projects/prometheus/) monitoring system and time series DB
- [Rook](https://www.cncf.io/projects/rook/) cloud native storage orchestrator for Kubernetes
- [Spiffe](https://www.cncf.io/projects/spiffe/) key management
- [Spire](https://www.cncf.io/projects/spire/) key management
- [TUF](https://www.cncf.io/projects/the-update-framework-tuf/) security & compliance
- [TiKV](https://www.cncf.io/projects/tikv/) database
- [Vitess](https://www.cncf.io/projects/vitess/) database

Check [cncf.io/projects](https://www.cncf.io/projects/) for the up-to-date list and the current incubating projects. And, also, the [sandbox projects](https://www.cncf.io/sandbox-projects/).
