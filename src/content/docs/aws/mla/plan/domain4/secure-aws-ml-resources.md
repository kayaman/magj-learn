---
title: Secure AWS ML Resources
description: Skill Builder
sidebar:
  order: 3
---
:::note
**Domain 4: ML Solution Monitoring, Maintenance, and Security**
:::

## Securing ML Resources

### Securing AWS Resources in Your ML Solution

### Shared Responsibility Model

### Access Control Capabilities Using IAM

### Principle of Least Privilege

### Network Access Controls for ML Resources

#### Isolate ML resources

![VPC](/img/vpc-sec.png)

1. VPC endpoints

    With VPC endpoints, you can privately connect your VPC to supported AWS services without requiring an internet gateway, NAT device, or VPN connection. You can further limit access to these services by using endpoint policies, which act as a secure entry point for accessing resources within your VPC.

2. SageMaker Studio

    SageMaker Studio runs in a service VPC by default. When notebooks in your studio environment access AWS resources, such as Amazon S3 buckets, the VPC routes this traffic over the internet by default. You can instead route traffic over the AWS network by launching your SageMaker Studio and SageMaker notebook instances in an Amazon VPC of your choice.

3. Elastic Network Interfaces

    When you launch SageMaker Studio instances with a VPC of your choice, they communicate with the domain through the Elastic Network Interface (ENI) in a private subnet. The ENI is protected by a security group. You then create interface VPC endpoints for the AWS services and resources that SageMaker Studio will access through their own elastic network interfaces in the same subnet.

4. VPC endpoints

    These endpoints could connect to the SageMaker runtime, SageMaker API, CloudWatch Logs, and Amazon S3. You can then route traffic to these endpoints. You can also use VPC endpoint policies (and Amazon S3 access point policies) to limit access to SageMaker resources further.

#### Use NAT Gateways for Egress Traffic

VPC endpoints provide secure access to supported AWS services from within the VPC. However, your ML system might still require access to some services or the internet. In such cases, you can use a NAT Gateway to enable instances in your private subnets to connect to the internet or other AWS services, but prevent the internet from initiating connections with those instances.

![nat](/img/nat.png)

1. NAT Gateway

  Your ML model running in private subnets must download updates or dependencies from a public software repository. You can configure a NAT Gateway in a public subnet to allow outbound internet access for your private ML instances. This setup still prevents the internet from initiating connections with those instances. For example, you enable ML instances in private subnets to download dependencies or docker images from public repositories through a NAT Gateway.

### Demo: Securing ML Resources

## Amazon SageMaker Compliance and Governance

### Security and Compliance Features

### Compliance and Governance Features

## Security Best Practices for CI/CD Pipelines

### Security Considerations for CI/CD Pipelines

## Implement Security and Compliance Through Monitoring, Auditing and Logging

### Implementing Security and Compliance through Monitoring and Logging

## Resources
