---
title: Container Orchestration
description: LinuxFoundation
sidebar:
  order: 3
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 4
---

## Introduction

Container images allow us to confine the application code, its runtime, and all of its dependencies in a pre-defined format. The container runtimes like **runC**, **containerd**, or **cri-o** can use pre-packaged images as a source to create and run one or more containers. These runtimes are capable of running containers on a single host, however, in practice, we would like to have a fault-tolerant and scalable solution, achieved by building a single **controller**/**management unit**, a collection of multiple hosts connected together. This controller/management unit is generally referred to as a **container orchestrator**.

## What Are Containers?

Before we dive into container orchestration, let's review first what containers are.

**Containers** are an application-centric method to deliver high-performing, scalable applications on any infrastructure of your choice. Containers are best suited to deliver microservices by providing portable, isolated virtual environments for applications to run without interference from other running applications.

![Containers](/img/edx/containers.png)

**Microservices** are lightweight applications written in various modern programming languages, with specific dependencies, libraries and environmental requirements. To ensure that an application has everything it needs to run successfully it is packaged together with its dependencies.

Containers encapsulate microservices and their dependencies but do not run them directly. Containers run container images.

A **container image** bundles the application along with its runtime, libraries, and dependencies, and it represents the source of a container deployed to offer an isolated executable environment for the application. Containers can be deployed from a specific image on many platforms, such as workstations, Virtual Machines, public cloud, etc.

