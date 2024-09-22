---
title: Create and Script Infrastructure
description: Skill Builder
sidebar:
  order: 2
---
:::note
**Domain 3: Deployment and Orchestration of ML Workflows**
:::

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

#### Layered Architecture

![cf-layered](/img/cf-layered.png)

1. Identity layer

    Your identity layer can define your IAM users, groups, and roles.

2. Base network layer

    Your base network layer can include VPCs, internet gateways, virtual private networks (VPNs), and NAT gateways.

3. Shared resources layer

    Your shared resources layer can include databases, common monitoring or alarms, subnets, and security groups. It can also include storage for your model artifacts, and training, validation and test data sets.

4. Back-end layer

    Your back-end layer can include model endpoints, Lambda functions, and application servers.

5. Front-end layer

    Your front-end layer can include the web interface, admin interface, or analytics dashboard.

### Working with the AWS CDK

#### CDK Constructs

- Lower-level constructs, such as L1 constructs, can represent a single resource from a single AWS service.

- Higher-level constructs, such as L2 constructs and L3 constructs, can represent a more complex component consisting of multiple preconfigured AWS resources.

---

- L1 constructs

    Low-level, or L1, constructs directly represent all resources available in CloudFormation. They are sometimes called CFN resources. You use L1 constructs when you need to explicitly configure all resource properties to the same level of granularity as a CloudFormation template.

- L2 constructs

    L2 constructs are the next level of constructs. Like L1, they represent AWS individual resources, but they also provide a level of abstraction. L2 constructs incorporate the defaults, boilerplate, and glue logic you would be writing yourself with a CFN Resource construct. They reduce the need to know all the details about the AWS resources they represent. L2 constructs also provide convenient methods to help you to work with the resource.

- L3 constructs (Patterns)

    The AWS Construct Library includes even higher-level, L3 constructs, called patterns. AWS CDK patterns declare multiple resources to create entire AWS architectures for specific use cases.

To explore the constructs available for different AWS services, consult the [AWS Construct Library](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-construct-library.html).

AWS Solutions Constructs is an open-source extension of the AWS CDK and provides additional experimental patterns. To view the available patterns, explore the [Github Repository](https://github.com/awslabs/aws-solutions-constructs/tree/main/source/patterns/%40aws-solutions-constructs).

#### Deploying resources with the AWS CDK Toolkit

Developers interact with their CDK app using the AWS CDK Toolkit, also referred to as the AWS CDK Command Line Interface (AWS CDK CLI). By using this command line tool, developers can do the following:

- Synthesize artifacts, such as AWS CloudFormation templates.
- Deploy stacks to development AWS accounts.
- Compare against a deployed stack to understand the impact of a code change.
- Destroy stacks to delete the resources when no longer needed. This saves on unnecessary costs.

1. `cdk init`

When you begin your CDK project, you create a directory for it, run cdk init, and specify the programming language used:

```sh
mkdir my-cdk-app
cd my-cdk-app
cdk init app --language typescript
```

2. `cdk bootstrap`

You then run `cdk bootstrap` to prepare the environments into which the stacks will be deployed. This creates the special dedicated AWS CDK resources for the environments.

3. `cdk synth`

Next, you synthesize the CloudFormation templates using the `cdk synth` command. When updating existing stacks, you can run `cdk diff` to compare the resources defined in your app with the already-deployed version of the stack.

4. `cdk deploy`

Finally, you can run the `cdk deploy` command to have CloudFormation provision resources defined in the synthesized templates.

### Comparing AWS CloudFormation and AWS CDK

|  | AWS CloudFormation | AWS CDK |
|--|--------------------|---------|
| Authoring experience | CloudFormation only uses JSON or YAML templates to define your infrastructure resources. These are more convenient to write than many programming languages. However, these templates can become verbose and complex as your infrastructure grows, making them more challenging to maintain and modify. | With AWS CDK, you can define your infrastructure using modern programming languages, like Python, TypeScript, Java, C#, and Go. This approach provides a familiar and expressive coding experience. You can also use standard software development practices to write modular and reusable infrastructure components. |
| IaC approach | CloudFormation templates are declarative. You define the desired state of your infrastructure and CloudFormation handles the provisioning and updates. | AWS CDK provides an imperative approach to generating CloudFormation templates, which are declarative. Working with programming languages, instead of templates means you can introduce logic and conditions that determine the resources to provision in your infrastructure. |
| Debugging and troubleshooting | Troubleshooting CloudFormation templates requires learning specific CloudFormation error handling and messages. | With the CDK, you can use the debugging capabilities of your chosen programming language, making it more convenient to identify and fix issues in your infrastructure code. |
| Reusability and modularity | With CloudFormation, you can create nested stacks and cross-stack references, resulting in modular and reusable infrastructure designs. However, this approach can become complex and difficult to manage as your infrastructure grows. | AWS CDK supports programming languages that you can use to apply object-oriented programming principles. This makes it more convenient to create modular and reusable IaC code blocks for your infrastructure, which are managed as part of an application. |
| Community support | CloudFormation has been around for a longer time and has a larger community for support. It also has a variety of third-party tools and resources. |AWS CDK is a newer offering than AWS CloudFormation, but it is rapidly gaining adoption. It has an active community that shares best practices and contributes to its development. This includes collections of code samples and access to libraries in development. |
| Learning curve | AWS CloudFormation has a steeper learning curve for developers who are used to a more programmatic approach over a template-driven approach. However, AWS CloudFormation has become a standard method for IaC in the AWS Cloud, and your organization might have existing expertise. | If you're already familiar with programming languages like Python or TypeScript, AWS CDK will have a gentler learning curve. Your existing knowledge of application design and interacting with software libraries and APIs will help you learn AWS CDK. |

## Deploying and Hosting Models

### Amazon SageMaker Python SDK

The SageMaker Python SDK provides classes and methods for configuring and running tasks in your model building and deployment workflows. Consider the following SageMaker Pipeline example. In this example, the SageMaker Python SDK orchestrates many of the tasks in the machine learning lifecycle, including data processing and model development tasks.

![SageMaker SDK](/img/sagemaker-sdk.png)

**Creating pipelines with the SageMaker Python SDK to orchestrate workflows**

```python
pipeline = Pipeline(
     name=pipeline_name,
     parameters=[input_data, processing_instance_type,
                    processing_instance_count, training_instance_type,
                    mse_threshold, model_approval_status],
     steps = [step_process, step_train, step_evaluate, step_conditional]
)
```

**Defining steps**

```python
step_process = ProcessingStep(...),
step_train = TrainingStep(…),
```

To learn more about using the SageMaker SDK to create different step types supported by Amazon SageMaker Pipelines, explore the [Steps class](https://sagemaker.readthedocs.io/en/stable/workflows/pipelines/sagemaker.workflow.pipelines.html#steps) documentation.

**Automating your pipeline**

Defining your pipelines as code is essential when taking an IaC approach to deploying your model building and deployment infrastructure.

1. Access stored pipeline code

    Your SageMaker Python SDK pipeline code is accessed from a code repository.

2. Provision model building pipeline infrastructure

    Your continuous integration and continuous deployment (CI/CD) tools receive an automated notification to start the pipeline. The tools pull this code, while passing in input parameters for this particular job. The code is then run to build the pipeline and necessary infrastructure.

3. Train model

    The pipeline uses the parameters to complete steps of the pipeline. This includes the location of the training data, the training instance type, and the model approval threshold.

4. Register model

    If the trained model meets the approval threshold, it is registered in your model registry. It can then be accessed by your deployment pipeline.

5. Deprovision pipeline resources

    After the pipeline completes, your CI/CD tools de-provision the resources that are no longer in use. This helps you to avoid paying for idle resources.

### Building and Maintaining Containers

**SageMaker containers**

Training and inference containers in SageMaker must adhere to certain requirements. For instance, you must follow a specific folder structure. Containers provided by SageMaker already have this folder structure in place. Any container that you extend or build new must also follow this structure.

#### Training containers

![FS](/img/container-fs.png)

1. **/opt/ml**

    This is the top level of the directory.

2. **/opt/ml/code/**

    This directory holds the scripts that the container will run, such as custom training algorithms in script mode in **/opt/ml/code/**.

3. **/opt/ml/input/**

    This directory holds the folders that receive inputs for the training job:
    **/opt/ml/input/config/** holds the JSON files that configure the hyperparameters for the training algorithm and the resources used for distributed training.
    **/opt/ml/input/data/** holds each channel of training data accessed from Amazon S3.

4. **/opt/ml/checkpoints/**

    If you use checkpointing, Amazon SageMaker saves checkpoints locally in this directory and then synchs them to the specified location in Amazon S3.

5. **/opt/ml/output/**

    This directory holds the folders that store files output by the training job:
    **/opt/ml/output/data/** holds the output data, which the training job sends to Amazon S3 as **output.tar.gz**.

6. **/opt/ml/model/**

    The model artifact created by the training job is stored here. When training is finished, the final model artifact in this folder is written to Amazon S3 as **model.tar.gz**.

SageMaker training uses environment variables to define storage paths for training datasets, model artifacts, checkpoints, and outputs between AWS Cloud storage and training jobs. For more information, refer to [SageMaker Environment Variables and Default Paths for Training Storage Locations](https://docs.aws.amazon.com/sagemaker/latest/dg/model-train-storage.html#model-train-storage-env-var-summary).

#### Inference containers

- Your container must include the path **/opt/ml/model**. When the inference container starts, it will import the model artifact and store it in this directory.
    Note: This is the same directory that a training container uses to store the newly trained model artifact.

- Your container must be configured to run as an executable. Your Dockerfile should include an ENTRYPOINT instruction that defines an executable to run when the container starts, as in the following example:
    
    ```docker
    ENTRYPOINT ["python", "serve.py"]
    ```
- Your container must have a web server listening on **port 8080**.

- Your container must accept **POST** requests to the **/invocations** and **/ping** real-time endpoints. The requests that you send to these endpoints must be returned with 60 seconds and have a maximum size of 6 MB.

![Inf Container](/img/container-inf.png)

1. **serve.py**

    **serve.py** runs when the container is started for hosting. It starts the inference server, including the nginx web server and Gunicorn as a Python web server gateway interface.

2. **predictor.py**

    This Python script contains the logic to load and perform inference with your model. It uses Flask to provide the **/ping** and **/invocations** endpoints.

3. **wsgi.py**

    This is a wrapper for the Gunicorn server.

4. **nginx.conf**

    This is a script to configure a web server, including listening on **port 8080**. It forwards requests containing either **/ping** or **/invocations** paths to the Gunicorn server.


### Auto Scaling Inference Infrastructure