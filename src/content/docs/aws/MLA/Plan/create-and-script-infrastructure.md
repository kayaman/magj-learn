---
title: Create and Script Infrastructure
description: Skill Builder
sidebar:
  order: 12
---

## Methods for Provisioning Resources

### Infrastructure as Code

1. Infrastructure definitions: These definitions specify the components of your infrastructure, their configurations, and their integrations. They are often written as template files using JSON or YAML, which you then process with a provisioning tool, such as CloudFormation. These definitions can also be written using different SDKs, like the AWS CDK, which support common programming languages, such as Python or Typescript.

2. Shell scripts: When provisioning resources such as EC2 instances, your IaC processes can use shell scripts for automating infrastructure tasks. They can be used to install software, configure settings, and manage needed resources.

3. Application code: A core purpose of your infrastructure is hosting your application code. Your IaC solution typically interacts with the repository where you are storing your code and your workflows for code building and deployment.

#### Machine learning infrastructure types

- Model Building and Deployment

    Your ML pipelines orchestrate various workflows, such as data preparation and model deployment. These workflows require the provisioning of compute resources to perform necessary tasks, such as container hosting and parallel processing. They require a mechanism for accessing a container image registry and deploying containers. Your pipelines need scalable and secure storage for handling large data sets and storing model outputs. You also need to deploy and configure resources, such as AWS Identity and Access Management (IAM) users, groups, and roles, for authenticating and authorizing access.  
    Completed workflows also require a mechanism to deprovision resources where possible to save costs.

- Inference

    Models hosted on SageMaker require underlying compute resources for hosting the inference containers. This compute infrastructure can be Amazon Elastic Compute Cloud (Amazon EC2) instances or AWS Lambda, depending on the type of endpoint being deployed. The deployed models also require storage resources to support the ingestion of requests and generation of responses. Potential supporting resources include Amazon Simple Storage Service (Amazon S3), Amazon Elastic Block Store (Amazon EBS), and Amazon Elastic File Store (Amazon EFS).

- Application

    Application infrastructure can encompass everything from model endpoints to virtual private cloud (VPC) configurations, web servers, databases, caching layers, and other required services. Deployment of these resources also needs to support secure networking, monitoring, and logging capabilities.

#### Automating resource provisioning

- Reduces human error

    With automated provisioning, your intended infrastructure configurations are applied every time. This also streamlines troubleshooting by limiting the opportunities for error.

- Reduces release times

    Automated resource provisioning can deploy new environments or scale resources faster than humans can. This helps your ML applications to quickly adapt to changing demands.

- Maintains compliance

    Automatically provisioned resources are always deployed with the same configurations. This ensures your defined security and compliance requirements are included with each deployment.

#### Approaches to IaC

- Declarative

    With declarative IaC, you can describe resources and settings that make up the end state of a desired system. The IaC solution then creates this system from the infrastructure code. This method is convenient to use as long as you know which components and settings you need to run your application.


- Imperative

    With imperative IaC, you describe all the steps to set up your resources and get to the desired system and running state. Although imperative IaC isn't as convenient as declarative IaC, the imperative approach is necessary in complex infrastructure deployments. This is especially true when the order of events is critical.  
    For example, if you are provisioning a SageMaker model endpoint, you need to first create the Amazon Elastic Container Registry (Amazon ECR) repository for the following:

    1. Container image
    2. Amazon S3 bucket and model artifacts
    3. Compute resources for hosting the inference containers

#### Key Benefits of IaC

- Code management

    Using infrastructure definitions as code applies traditional software development benefits to infrastructure management. This includes version control practices and collaboration and code reviews.

- Repeatable provisioning

    With IaC, you can reliably create, destroy, and recreate infrastructure resources for staging and development. You can even redeploy your entire infrastructure quickly in the event of a catastrophic outage.

- Testing or experimentation

    IaC helps you quickly provision and remove infrastructure resources as needed for model testing and benchmarking. You can also verify the functionality of infrastructure updates.

#### IaC Tools

- AWS CloudFormation

    You can use CloudFormation to model, provision, and manage AWS and third-party resources. You can define and provision AWS resources using templates written in JSON or YAML.

- AWS CDK

    The AWS CDK is an open-source software development framework that you use to define and provision AWS resources using familiar programming languages like TypeScript, Python, Java, and C#. It serves as an abstraction layer to efficiently produce CloudFormation templates.

- Terraform

    Terraform is a popular IaC tool that supports a wide range of cloud providers and services. You can use Terraform to manage infrastructure across multiple platforms using a consistent workflow and language.

- Pulumi

    Pulumi is an open source IaC tool that supports common programming languages, such as TypeScript, JavaScript, Python, Go, .NET, Java, and YAML. You can provision, update, and manage cloud infrastructure using a downloadable command line interface (CLI), runtime, libraries, and a hosted service.

### Working with AWS CloudFormation

Getting started with CloudFormation is straightforward. First, you create a CloudFormation template that describes your infrastructure. CloudFormation uses this template to provision the resources. These resources are then managed as a CloudFormation stack. 

![CF Stack](/img/cf-stack.png)

This CloudFormation template defines the database layer of an application that includes an Amazon DynamoDB database and an Amazon Relational Database Service (Amazon RDS) database. CloudFormation provisions these resources and manages them as a stack. All resources in a stack must be provisioned completely before CloudFormation reports the build as successful.

#### CloudFormation templates

A CloudFormation template is a text file written in either JSON or YAML that defines the resources that CloudFormation will provision as part of a stack. For instance, examine the following CloudFormation template written in JSON.

- Format version

    This first section identifies the AWS CloudFormation template version to which the template conforms.

    ```json
    "AWSTemplateFormatVersion" : "2010-09-09"
    ```
- Description

    This text string describes the template.

    ```json
    "Description" : "Here are some details about the template."
    ```
- Metadata

    These objects provide additional information about the template.

    ```json
    "Metadata" : {
     "Instances" : {"Description" : "Information about the instances"},
     "Databases" : {"Description" : "Information about the databases"}
    }
    ```
### Working with the AWS CDK


### Comparing AWS CloudFormation and AWS CDK

## Deploying and Hosting Models