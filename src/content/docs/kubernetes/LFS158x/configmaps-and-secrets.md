---
title: ConfigMaps & Secrets
description: LinuxFoundation
sidebar:
  order: 14
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 4
---

## ConfigMaps

[ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) allow us to decouple the configuration details from the container image. Using ConfigMaps, we pass configuration data as key-value pairs, which are consumed by Pods or any other system components and controllers, in the form of environment variables, sets of commands and arguments, or volumes. We can create ConfigMaps from literal values, from configuration files, from one or more files or directories.

### Create a ConfigMap from Literal Values

A ConfigMap can be created with the imperative `kubectl create configmap` command, and we can display its details using the `kubectl get` or `kubectl describe` commands.

Create the ConfigMap:

```sh
kubectl create configmap my-config \
  --from-literal=key1=value1 \
  --from-literal=key2=value2
```

Display the ConfigMap details in YAML for my-config:

```sh
kubectl get configmaps my-config -o yaml
```

```yaml
apiVersion: v1
data:
  key1: value1
  key2: value2
kind: ConfigMap
metadata:
  creationTimestamp: 2024-03-02T07:21:55Z
  name: my-config
  namespace: default
  resourceVersion: "241345"
  selfLink: /api/v1/namespaces/default/configmaps/my-config
  uid: d35f0a3d-45d1-11e7-9e62-080027a46057
```

With the `-o yaml` option, we are requesting the `kubectl` command to produce the output in the YAML format. The object has the `ConfigMap kind`, and it has the key-value pairs listed under the `data` field. The name of `ConfigMap` and other details are part of the `metadata` field.

### Create a ConfigMap from a Definition Manifest

For a declarative approach, first we need to create a definition file with the following content:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: customer1
data:
  TEXT1: Customer1_Company
  TEXT2: Welcomes You
  COMPANY: Customer1 Company Technology Pct. Ltd.
```

where we specify the `kind`, `metadata`, and `data` fields, targeting the v1 endpoint of the API server.

If we name the file with the definition above as `customer1-configmap.yaml`, we can then create the ConfigMap with the following command:

```sh
kubectl create -f customer1-configmap.yaml
```

### Create a ConfigMap from a File

First, we need to create a file `permission-reset.properties` with the following configuration data stored as key-value pairs:

```dotenv
permission=read-only
allowed="true"
resetCount=3
```

We can then create the ConfigMap with the following command:

```sh
kubectl create configmap permission-config \
  --from-file=<path/to/>permission-reset.properties
```

### Use ConfigMaps Inside Pods: As Environment Variables

Inside a Container, we can retrieve the key-value data of an entire ConfigMap or the values of specific ConfigMap keys as environment variables.

In the following example all the `myapp-full-container` Container's environment variables receive the values of the `full-config-map` ConfigMap keys:

```yaml
containers:
  - name: myapp-full-container
    image: myapp
    envFrom:
    - configMapRef:
      name: full-config-map
```

In the following example the `myapp-specific-container` Container's environment variables receive their values from specific key-value pairs from two separate ConfigMaps, `config-map-1` and `config-map-2` respectively:

```yaml
containers:
  - name: myapp-specific-container
    image: myapp
    env:
    - name: SPECIFIC_ENV_VAR1
      valueFrom:
        configMapKeyRef:
          name: config-map-1
          key: SPECIFIC_DATA
    - name: SPECIFIC_ENV_VAR2
      valueFrom:
        configMapKeyRef:
          name: config-map-2
          key: SPECIFIC_INFO
```

With the configuration presented above, we will get the `SPECIFIC_ENV_VAR1` environment variable set to the value of `SPECIFIC_DATA` key from `config-map-1` ConfigMap, and `SPECIFIC_ENV_VAR2` environment variable set to the value of `SPECIFIC_INFO` key from `config-map-2` ConfigMap.

### Use ConfigMaps Inside Pods: As Volumes

We can mount a `vol-config-map` ConfigMap as a Volume inside a Pod. The `configMap` Volume plugin converts the ConfigMap object into a mountable resource. For each key in the ConfigMap, a file gets created in the mount path (where the file is named with the key name) and the respective key's value becomes the content of the file:

```yaml
  containers:
  - name: myapp-vol-container
    image: myapp
    volumeMounts:
    - name: config-volume
      mountPath: /etc/config
  volumes:
  - name: config-volume
    configMap:
      name: vol-config-map
```

For more details, please explore the documentation on using [ConfigMaps](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/).

### Using ConfigMaps as Volumes Demo Guide

This exercise guide was prepared for the video demonstration available in this chapter. It includes an `index.html` file and a Deployment definition manifest that can be used as templates to define other similar objects as needed. The goal of the demo is to store the custom webserver `index.html` file in a ConfigMap object, which is mounted by the nginx container specified by the Pod template nested in the Deployment definition manifest.

The webserver index file:

```html
<!DOCTYPE html>
<html>
<head>
<title>Welcome to GREEN App!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
        background-color: GREEN;
    }
</style>
</head>
<body>
<h1 style=\"text-align: center;\">Welcome to GREEN App!</h1>
</body>
</html>
```

The Deployment definition manifest:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: green-web
  name: green-web
spec:
  replicas: 1
  selector:
    matchLabels:
      app: green-web
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: green-web
    spec:
      volumes:
      - name: web-config
        configMap:
          name: green-web-cm
      containers:
      - image: nginx
        name: nginx
        ports:
        - containerPort: 80
        volumeMounts:
        - mountPath: /usr/share/nginx/html
          name: web-config
status: {}
```

<video src="https://edx-video.net/395ec262-ccac-47ba-af98-fcc60f7b2f6d-mp4_720p.mp4" width="320" height="240" controls></video>
