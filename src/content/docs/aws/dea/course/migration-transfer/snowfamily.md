---
title: AWS Snow Family
description: Udemy
sidebar:
  order: 4
---

- Highly-secure, portable devices to collect and process data
  at the edge, and migrate data into and out of AWS

![Snow Family](/img/udemy/snow-family.png)

## Data Migrations with AWS Snow Family

### Challenges

- Limited connectivity
- Limited bandwidth
- High network cost
- Shared bandwidth (can't maximize the line)
- Connection stability

**AWS Snow Family**: offline devices to perform data migrations
If it takes more than a week to transfer over the network, use Snowball
devices!

![Snow Family](/img/udemy/with-snow-family.png)

### Usage process

1. Request Snowball devices from the AWS console for delivery
2. Install the snowball client / AWS OpsHub on your servers
3. Connect the snowball to your servers and copy files using the client
4. Ship back the device when you're done (goes to the right AWS facility)
5. Data will be loaded into an S3 bucket
6. Snowball is completely wiped

### What is Edge Computing?

- Process data while it's being created on an edge location
- A truck on the road, a ship on the sea, a mining station underground...
- These locations may have limited internet and no access to computing power
- We setup a Snowball Edge / Snowcone device to do edge computing
- Snowcone: 2 CPUs, 4 GB of memory, wired or wireless access
- Snowball Edge Compute Optimized (dedicated for that use case) & Storage Optimized
- Run EC2 Instances or Lambda functions at the edge
- Use cases: preprocess data, machine learning, transcoding media

### AWS Transfer Family

- A fully-managed service for file transfers into and out of Amazon S3 or Amazon EFS using the FTP protocol
- Supported Protocols
- AWS Transfer for FTP (File Transfer Protocol (FTP))
- AWS Transfer for FTPS (File Transfer Protocol over SSL (FTPS))
- AWS Transfer for SFTP (Secure File Transfer Protocol (SFTP))
- Managed infrastructure, Scalable, Reliable, Highly Available (multi-AZ)
- Pay per provisioned endpoint per hour + data transfers in GB
- Store and manage users' credentials within the service
- Integrate with existing authentication systems (Microsoft Active Directory, LDAP, Okta, Amazon Cognito, custom)
- Usage: sharing files, public datasets, CRM, ERP, …

![Transfer Family](/img/udemy/transfer-family.png)
