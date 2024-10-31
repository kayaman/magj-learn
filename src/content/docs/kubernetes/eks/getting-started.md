---
title: Getting started
description: https://docs.aws.amazon.com/eks
sidebar:
   order: 2
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 4
---

## Set up to use Amazon EKS

To prepare for the command-line management of your Amazon EKS clusters, you need to install several tools. Use the following to set up credentials, create and modify clusters, and work with clusters once they are running:

- [Set up AWS CLI](https://docs.aws.amazon.com/eks/latest/userguide/install-awscli.html): Get the AWS CLI to set up and manage the services you need to work with Amazon EKS clusters. In particular, you need AWS CLI to configure credentials, but you also need it with other AWS services.

- [Set up kubectl and eksctl](https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html): The [`eksctl`](https://eksctl.io/installation/) CLI interacts with AWS to create, modify, and delete Amazon EKS clusters. Once a cluster is up, use the open source `kubectl` command to manage Kubernetes objects within your Amazon EKS clusters.

- Set up a development environment (optional): Consider adding the following tools:

  - **Local deployment tool**: If you're new to Kubernetes, consider installing a local deployment tool like [minikube](https://minikube.sigs.k8s.io/docs/) or [kind](https://kind.sigs.k8s.io/). These tools allow you to have an Amazon EKS cluster on your local machine for testing applications.

  - **Package manager**: [Helm](https://helm.sh/docs/intro/install/) is a popular package manager for Kubernetes that simplifies the installation and management of complex packages. With Helm, it's easier to install and manage packages like the AWS Load Balancer Controller on your Amazon EKS cluster.
