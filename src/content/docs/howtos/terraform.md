---
title: Terraform
description: Terraform snippets
---

## Generating a SSH pem file

```sh
terraform output -raw private_key_pem > private-key.pem
chmod 0600 private-key.pem
```
