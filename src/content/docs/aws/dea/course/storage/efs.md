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

## Performance

- EFS Scale
  - 1000s of concurrent NFS clients, 10 GB+/s throughput
  - Grow to Petabyte-scale network file system automatically
- Performance Mode (set at EFS creation time)
  - General Purpose (default): latency-sensitive use cases (web server, CMS, ...)
  - Max I/O: higher latency, throughput, highly parallel (big data, media processing, ...)
- Throughput Mode
  - Bursting: 1 TB = 50 MiB/s + burst of up to 100 MiB/s
  - Provisioned: set your throughput regardless of storage size (ex: 1 GiB/s for 1 TB storage)
  - Elastic: automatically scales throughput up or down based on your workloads
    - Up to 3GiB/s for reads and 1 GiB/s for writes
    - Used for unpredictable workloads

## Storage Classes

- Storage Tiers (lifecycle management feature: move file after n days)
  - Standard: for frequently accessed files
  - Infrequently access (EFS-IA): cost to retrieve files, lower price to store
  - Archive: rarely accessed data (few times each year), 50% cheaper
  - Implement lifecycle policies to move files between storage tiers
- Availability and durability
  - Standard Multi-AZ, great for prod
  - One Zone: one AZ, great for dev, backup enabled by default. compatible with IA (EFS One Zone-IA)
- By using the right EFS storage classes, you can do up to 90% in cost savings