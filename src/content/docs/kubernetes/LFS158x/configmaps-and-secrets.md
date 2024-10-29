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

### Demo: Using ConfigMaps as Volumes

<video src="https://edx-video.net/395ec262-ccac-47ba-af98-fcc60f7b2f6d-mp4_720p.mp4" width="320" height="240" controls></video>

## Secrets

Let's assume that we have a Wordpress blog application, in which our wordpress frontend connects to the MySQL database backend using a password. While creating the Deployment for wordpress, we can include the MySQL password in the Deployment's YAML definition manifest, but the password would not be protected. The password would be available to anyone who has access to the definition manifest.

In this scenario, the [Secret](https://kubernetes.io/docs/concepts/configuration/secret/) object can help by allowing us to encode in base 64the sensitive information before sharing it. We can share sensitive information like passwords, tokens, or keys in the form of key-value pairs, similar to ConfigMaps; thus, we can control how the information in a Secret is used, reducing the risk for accidental exposures. In Deployments or other resources, the Secret object is referenced, without exposing its content.

It is important to keep in mind that by default, the Secret data is stored as plain text inside **etcd**, therefore administrators must limit access to the API server and **etcd**. However, Secret data can be encrypted at rest while it is stored in **etcd**, but this feature needs to be enabled at the API server level by the Kubernetes cluster administrator. 

### Create a Secret from Literal Values

To create a Secret, we can use the imperative `kubectl create secret` command:

```sh
kubectl create secret generic my-password \
  --from-literal=password=mysqlpassword
```

The above command would create a secret called `my-password`, which has the value of the password key set to `mysqlpassword`.

After successfully creating a secret we can analyze it with the `get` and `describe` commands. They do not reveal the content of the Secret. The type is listed as `Opaque`.

```sh
kubectl get secret my-password
```

```sh
NAME          TYPE     DATA   AGE
my-password   Opaque   1      8m
```

```sh
kubectl describe secret my-password
```

```sh
Name:          my-password
Namespace:     default
Labels:        <none>
Annotations:   <none>

Type Opaque

Data
====
password: 13 bytes
```

### Create a Secret from a Definition Manifest

We can create a Secret manually from a YAML definition manifest. The example manifest below is named `mypass.yaml`. There are two types of maps for sensitive information inside a Secret: `data` and `stringData`.

With `data` maps, each value of a sensitive information field must be encoded using base64. If we want to have a definition manifest for our Secret, we must first create the base64 encoding of our password:

```sh
echo mysqlpassword | base64
````

```sh
bXlzcWxwYXNzd29yZAo=
```

and then use it in the definition manifest:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-password
type: Opaque
data:
  password: bXlzcWxwYXNzd29yZAo=
```

Please note that base64 encoding does not mean encryption, and anyone can easily decode our encoded data:

```sh
echo "bXlzcWxwYXNzd29yZAo=" | base64 --decode
```

```sh
mysqlpassword
```

Therefore, make sure you do not commit a Secret's definition file in the source code.

With `stringData` maps, there is no need to encode the value of each sensitive information field. The value of the sensitive field will be encoded when the my-password Secret is created:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-password
type: Opaque
stringData:
  password: mysqlpassword
```

Using the `mypass.yaml` definition file we can now create a secret with `kubectl create` command: 

```sh
kubectl create -f mypass.yaml
```

### Create a Secret from a File

To create a Secret from a File, we can use the `kubectl create secret` command. 

First, we encode the sensitive data and then we write the encoded data to a text file:

```sh
$ echo mysqlpassword | base64
```

```sh
bXlzcWxwYXNzd29yZAo=
```

```sh
$ echo -n 'bXlzcWxwYXNzd29yZAo=' > password.txt
```

Now we can create the Secret from the `password.txt` file:

```sh
$ kubectl create secret generic my-file-password \
  --from-file=password.txt
```

```sh
secret/my-file-password created
```

After successfully creating a secret we can analyze it with the `get` and `describe` commands. They do not reveal the content of the Secret. The type is listed as Opaque.

```sh
kubectl get secret my-file-password
```

```sh
NAME               TYPE     DATA   AGE 
my-file-password   Opaque   1      8m
```

```sh
kubectl describe secret my-file-password
```

```sh
Name:          my-file-password
Namespace:     default
Labels:        <none>
Annotations:   <none>

Type  Opaque

Data
====
password.txt:  13 bytes 
```

### Use Secrets Inside Pods: As Environment Variables

Secrets are consumed by Containers in Pods as mounted data volumes, or as environment variables, and are referenced in their entirety (using the `envFrom` heading) or specific key-values (using the `env` heading).

Below we reference only the `password` key of the `my-password` Secret and assign its value to the `WORDPRESS_DB_PASSWORD` environment variable:

```yaml
spec:
  containers:
  - image: wordpress:4.7.3-apache
    name: wordpress
    env:
    - name: WORDPRESS_DB_PASSWORD
      valueFrom:
        secretKeyRef:
          name: my-password
          key: password
```

### Use Secrets Inside Pods: As Volumes

We can also mount a Secret as a Volume inside a Pod. The `secret` Volume plugin converts the Secret object into a mountable resource. The following example creates a file for each `my-password` Secret key (where the files are named after the names of the keys), the files containing the values of the respective Secret keys:

```yaml
spec:
  containers:
  - image: wordpress:4.7.3-apache
    name: wordpress
    volumeMounts:
    - name: secret-volume
      mountPath: "/etc/secret-data"
      readOnly: true
  volumes:
  - name: secret-volume
    secret:
      secretName: my-password
```

For more details, you can explore the documentation on managing [Secrets](https://kubernetes.io/docs/tasks/configmap-secret/).
