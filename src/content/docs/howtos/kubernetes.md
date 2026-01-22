---
title: Kubernetes cheat sheet
description: Common commands and tricks.
---
### Connect kubectl to an EKS cluster by creating a kubeconfig file

```sh
aws sts get-caller-identity
```

```sh
aws eks update-kubeconfig --region region-code --name my-cluster
```

### Restart a pod

1. Rolling Restart of Deployment

```sh
kubectl rollout restart deployment <deployment_name>
```

2. Scaling the Replica Count (Temporary scale to zero)

Scale down to zero

```sh
kubectl scale deployment <deployment_name> --replicas=0
```

Scale back up to the original number of replicas

```sh
kubectl scale deployment <deployment_name> --replicas=<original_number>
```

