---
title: Hello Minikube
description: https://kubernetes.io/docs/tutorials
sidebar:
  order: 1
---

This tutorial shows you how to run a sample app on Kubernetes using minikube. The tutorial provides a container image that uses NGINX to echo back all the requests.

Objectives

- Deploy a sample application to minikube.
- Run the app.
- View application logs.

## Before you begin

This tutorial assumes that you have already set up `minikube`. See **Step 1** in [minikube start](https://minikube.sigs.k8s.io/docs/start/) for installation instructions.

:::note

Only execute the instructions in **Step 1, Installation**. The rest is covered on this page.

:::

You also need to install `kubectl`. See [Install tools](https://kubernetes.io/docs/tasks/tools/#kubectl) for installation instructions.

## Create a minikube cluster

```sh
minikube start
```

## Open the Dashboard

Open the Kubernetes dashboard. You can do this two different ways:

- Launch a browser

Open a new terminal, and run:

```sh
# Start a new terminal, and leave this running.
minikube dashboard
```

Now, switch back to the terminal where you ran minikube start.

- URL copy and paste

If you don't want minikube to open a web browser for you, run the dashboard subcommand with the --url flag. minikube outputs a URL that you can open in the browser you prefer.

Open a new terminal, and run:

```sh
# Start a new terminal, and leave this running.
minikube dashboard --url
```

Now, you can use this URL and switch back to the terminal where you ran minikube start.

## Create a Deployment

A Kubernetes [Pod](https://kubernetes.io/docs/concepts/workloads/pods/) is a group of one or more Containers, tied together for the purposes of administration and networking. The Pod in this tutorial has only one Container. A Kubernetes [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) checks on the health of your Pod and restarts the Pod's Container if it terminates. Deployments are the recommended way to manage the creation and scaling of Pods.

1. Use the `kubectl create` command to create a Deployment that manages a Pod. The Pod runs a Container based on the provided Docker image.

```sh
# Run a test container image that includes a webserver
kubectl create deployment hello-node --image=registry.k8s.io/e2e-test-images/agnhost:2.39 -- /agnhost netexec --http-port=8080
```

2. View the Deployment:

```sh
kubectl get deployments
```

3. View the Pod:

```sh
kubectl get pods
```

4. View cluster events:

```sh
kubectl get events
```

5. View the `kubectl` configuration:

```sh
kubectl config view
```

6. View application logs for a container in a pod (replace pod name with the one you got from `kubectl get pods`).

:::note

Replace hello-node-5f76cf6ccf-br9b5 in the kubectl logs command with the name of the pod from the kubectl get pods command output.

:::

```sh
kubectl logs hello-node-5f76cf6ccf-br9b5
```

The output is similar to:

```sh
I0911 09:19:26.677397       1 log.go:195] Started HTTP server on port 8080
I0911 09:19:26.677586       1 log.go:195] Started UDP server on port  8081
```

:::note

For more information about kubectl commands, see the [kubectl overview](https://kubernetes.io/docs/reference/kubectl/).

:::

## Create a Service

By default, the Pod is only accessible by its internal IP address within the Kubernetes cluster. To make the `hello-node` Container accessible from outside the Kubernetes virtual network, you have to expose the Pod as a Kubernetes Service.

:::danger

The agnhost container has a `/shell` endpoint, which is useful for debugging, but dangerous to expose to the public internet. Do not run this on an internet-facing cluster, or a production cluster.

:::

1. Expose the Pod to the public internet using the kubectl expose command:

```sh
kubectl expose deployment hello-node --type=LoadBalancer --port=8080
```

The `--type=LoadBalancer` flag indicates that you want to expose your Service outside of the cluster.

The application code inside the test image only listens on TCP port 8080. If you used `kubectl expose` to expose a different port, clients could not connect to that other port.

2. View the Service you created:

```sh
kubectl get services
```

On cloud providers that support load balancers, an external IP address would be provisioned to access the Service. On minikube, the `LoadBalancer` type makes the Service accessible through the `minikube service` command.

3. Run the following command:

```sh
minikube service hello-node
```

This opens up a browser window that serves your app and shows the app's response.

## Enable addons

The minikube tool includes a set of built-in addons that can be enabled, disabled and opened in the local Kubernetes environment.

1. List the currently supported addons:

```sh
minikube addons list
```

2. Enable an addon, for example, metrics-server:

```sh
minikube addons enable metrics-server
```

3. View the Pod and Service you created by installing that addon:

```sh
kubectl get pod,svc -n kube-system
```

4. Check the output from metrics-server:

```sh
kubectl top pods
```

5. Disable metrics-server:

```sh
minikube addons disable metrics-server
```

## Clean up

Now you can clean up the resources you created in your cluster:

```sh
kubectl delete service hello-node
kubectl delete deployment hello-node
```

Stop the Minikube cluster

```sh
minikube stop
```

Optionally, delete the Minikube VM:

```sh
# Optional
minikube delete
```

If you want to use minikube again to learn more about Kubernetes, you don't need to delete it.

## Conclusion

This page covered the basic aspects to get a minikube cluster up and running. You are now ready to deploy applications.
