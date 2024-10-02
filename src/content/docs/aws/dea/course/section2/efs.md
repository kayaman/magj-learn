---
title: Elastic File System (EFS)
description: Udemy
sidebar:
    order: 3
    tableOfContents:
        minHeadingLevel: 2
        maxHeadingLevel: 4
---

## About

- Managed NFS (network file system) that can be mounted on many EC2
- EFS works with EC2 instances in multi-AZ
- Highly available, scalable, expensive (3x gp2), pay-per-use
- Uses NFSv4.1 protocol
- Uses security group to control access to EFS
- Compatible with Linux based AMI (not Windows)
- Encryption at rest using KMS
- POSIX file system (~Linux) that has a standard file API
- File system scales automatically, pay-per-use, no capacity planning

## Performance & Storage classes

- EFS Scale
  - 1000s of concurrent NFS clients, 10 GB+/s throughput
  - Grow to Petabyte-scale network file system automatically
- Performance Mode (set at EFS creation time)
  - General Purpose (default): latency-sensitive use cases (web server, CMS, ...)
  - Max I/O: higher latency, throughput, highly parallel (big data, media processing, ...)
- Throughput Mode