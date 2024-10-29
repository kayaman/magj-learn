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
