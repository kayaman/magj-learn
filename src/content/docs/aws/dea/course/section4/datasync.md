---
title: AWS DataSync
description: Udemy
sidebar:
  order: 3
---

- Move large amount of data to and from
  - On-premises / other cloud to AWS (NFS,  SMB, HDFS, S3, ...) - needs agent
  - AWS to AWS (different storage services) - no agent needed
- Can synchronize to:
  - Amazon S3 (any storage classes, including Glacier)
  - Amazon EFS
  - Amazon FSx
- Replication tasks can be scheduled hourly, daily, weekly - not continuous
- File permissions and metadata are preserved (NFS POSIX, SMB, ...)
- One agent task can use 10 Gbps, can setup a bandwidth limit

## NFS / SMB to AWS (S3, EFS, FSx, ...)

![DataSync](/img/udemy/datasync-onprem-aws.png)

Notice the usage of Snowcone if needed.

## AWS to AWS

![DataSync](/img/udemy/datasync-aws-aws.png)

