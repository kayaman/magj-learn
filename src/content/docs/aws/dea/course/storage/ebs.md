---
title: Elastic Block Store (EBS)
description: Udemy
sidebar:
  order: 2
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 4
---

## EBS Volumes

- It's a network drive (there might be a bit of latency)
- It's locked to an Availability Zone (AZ)
- Have a provisioned capacity (size in GBs, and IOPS)
  - You get billed for all the provisioned capacity
  - You can increase the capacity of the drive over time
- Delete on Termination attribute
  - Controls the EBS behaviour when an EC2 instance terminates
- You don't have to detach a volume or restart the instance to change it
- Increase volume size (you can only increase, not decrease)
- Change volume type
  - GP2 -> GP3
  - Specify desired IOPS or throughput performance (or it will guess)
- Adjust performance (increase or decrease)
