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

- Parameters

    Parameters are values to pass to your template when you create or update a stack. You can refer to parameters from the Resources and Outputs sections of the template.

    ```json
    "Parameters" : {
     "InstanceTypeParameter" : {
     "Type" : "String",
     "Default" : "t2.micro",
     "AllowedValues" : ["t2.micro", "m1.small", "m1.large"],
     "Description" : "Enter t2.micro, m1.small, or m1.large. Default is t2.micro."
     }
    }
    ```

- Rules

    Rules validate parameter values passed to a template during a stack creation or stack update.

    ```json
    "Rules" : {
     "Rule01": {
          "RuleCondition": {
               ...
          },
          "Assertions": [
               ...
          ]
     }
    } 
    ```

- Mappings

    These are map keys and associated values that you can use to specify conditional parameter values. This is similar to a lookup table.

    ```json
    "Mappings" : {
     "Mapping01" : {
          "Key01" : {
               "Name" : "Value01"
          },
          ...
     }
    }
    ```

- Conditions

    Conditions control whether certain resources are created, or whether certain resource properties are assigned a value during stack creation or an update. For example, you could conditionally create a resource that depends on whether the stack is for a production or test environment.

    ```json
    "Conditions" : {
     "MyLogicalID" : {Intrinsic function}
    }
    ```

- Transform

    For serverless applications, transform specifies the version of the AWS Serverless Application Model (AWS SAM) to use.  
    You can also use AWS::Include transforms to work with template snippets that are stored separately from the main AWS CloudFormation template. For more information, reference [AWS::Include transform](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/create-reusable-transform-function-snippets-and-add-to-your-template-with-aws-include-transform.html).

    ```json
    "Transform" : {
     set of transforms
    }
    ```

- Resources

    This section specifies the stack resources, and their properties that you would like to provision. You can refer to resources in the Resources and Outputs sections of the template.  
    Note: This is the only required section of the template.

    ```json
    "Resources" : {
     "Logical ID of resource" : {
          "Type" : "Resource type",
          "Properties" : {
               Set of properties
          }
     }
    }
    ```

- Outputs

    Outputs describe the values that are returned whenever you view your stack's properties. For example, you can declare an output for an Amazon S3 bucket name and then call the `aws cloudformation describe-stacks` AWS CLI command to view the name.

    ```json
    "Outputs" : {
     "Logical ID of resource" : {
          "Description" : "Information about the value",
          "Value" : "Value to return",
          "Export" : {
          "Name" : "Name of resource to export"
          }
     }
    }
    ```

#### SageMaker Endpoint Example

The following example creates an endpoint configuration from a trained model, and then creates an endpoint.

    ```json
    {
        "Description": "Basic Hosting entities test.  We need models to create endpoint configs.",
        "Mappings": {
            "RegionMap": {
            "us-west-2": {
                "NullTransformer": "12345678901.dkr.ecr.us-west-2.amazonaws.com/mymodel:latest"
            },
            "us-east-2": {
                "NullTransformer": "12345678901.dkr.ecr.us-east-2.amazonaws.com/mymodel:latest"
            },
            "us-east-1": {
                "NullTransformer": "12345678901.dkr.ecr.us-east-1.amazonaws.com/mymodel:latest"
            },
            "eu-west-1": {
                "NullTransformer": "12345678901.dkr.ecr.eu-west-1.amazonaws.com/mymodel:latest"
            },
            "ap-northeast-1": {
                "NullTransformer": "12345678901.dkr.ecr.ap-northeast-1.amazonaws.com/mymodel:latest"
            },
            "ap-northeast-2": {
                "NullTransformer": "12345678901.dkr.ecr.ap-northeast-2.amazonaws.com/mymodel:latest"
            },
            "ap-southeast-2": {
                "NullTransformer": "12345678901.dkr.ecr.ap-southeast-2.amazonaws.com/mymodel:latest"
            },
            "eu-central-1": {
                "NullTransformer": "12345678901.dkr.ecr.eu-central-1.amazonaws.com/mymodel:latest"
            }
            }
        },
        "Resources": {
            "Endpoint": {
            "Type": "AWS::SageMaker::Endpoint",
            "Properties": {
                "EndpointConfigName": { "Fn::GetAtt" : ["EndpointConfig", "EndpointConfigName" ] }
            }
            },
            "EndpointConfig": {
            "Type": "AWS::SageMaker::EndpointConfig",
            "Properties": {
                "ProductionVariants": [
                {
                    "InitialInstanceCount": 1,
                    "InitialVariantWeight": 1,
                    "InstanceType": "ml.t2.large",
                    "ModelName": { "Fn::GetAtt" : ["Model", "ModelName" ] },
                    "VariantName": { "Fn::GetAtt" : ["Model", "ModelName" ] }
                }
                ]
            }
            },
            "Model": {
            "Type": "AWS::SageMaker::Model",
            "Properties": {
                "PrimaryContainer": {
                "Image": { "Fn::FindInMap" : [ "AWS::Region", "NullTransformer"] }
                },
                "ExecutionRoleArn": { "Fn::GetAtt" : [ "ExecutionRole", "Arn" ] }
            }
            },
            "ExecutionRole": {
            "Type": "AWS::IAM::Role",
            "Properties": {
                "AssumeRolePolicyDocument": {
                "Version": "2012-10-17",
                "Statement": [
                    {
                    "Effect": "Allow",
                    "Principal": {
                        "Service": [
                        "sagemaker.amazonaws.com"
                        ]
                    },
                    "Action": [
                        "sts:AssumeRole"
                    ]
                    }
                ]
                },
                "Path": "/",
                "Policies": [
                {
                    "PolicyName": "root",
                    "PolicyDocument": {
                    "Version": "2012-10-17",
                    "Statement": [
                        {
                        "Effect": "Allow",
                        "Action": "*",
                        "Resource": "*"
                        }
                    ]
                    }
                }
                ]
            }
            }
        },
        "Outputs": {
            "EndpointId": {
            "Value": { "Ref" : "Endpoint" }
            },
            "EndpointName": {
            "Value": { "Fn::GetAtt" : [ "Endpoint", "EndpointName" ] }
            }
            
        }
    }
    ```
To learn more about CloudFormation templates, reference [Working with CloudFormation Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-guide.html).

### Working with the AWS CDK


### Comparing AWS CloudFormation and AWS CDK

## Deploying and Hosting Models