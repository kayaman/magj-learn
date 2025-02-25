---
title: Last minute notes
description: Skill Builder
sidebar:
  order: 1
---

## Notes

### Database Encryption

The AWS Database Encryption SDK provides end-to-end protection for your data in transit and at rest. You can encrypt selected items or attribute values in a table.

For more information about DynamoDB client-side and server-side encryption, see [Client-Side and Server-Side Encryption.](https://docs.aws.amazon.com/database-encryption-sdk/latest/devguide/client-server-side.html)

For more information about the AWS Database Encryption SDK, see [What Is the AWS Database Encryption SDK?](https://docs.aws.amazon.com/database-encryption-sdk/latest/devguide/what-is-database-encryption-sdk.html)

For more information about how the AWS Database Encryption SDK works, see [How the AWS Database Encryption SDK Works.](https://docs.aws.amazon.com/database-encryption-sdk/latest/devguide/how-it-works.html)

### X-Ray

X-Ray creates a map of services used by your application with trace data. You can use the trace data to drill into specific services or issues. This data provides a view of connections between services in your application and aggregated data for each service, including average latency and failure rates.

For more information about X-Ray, see [AWS X-Ray features.](https://aws.amazon.com/xray/features/)

### ElastiCache

An ElastiCache cluster with a write-through strategy will allow for the read requests to be redirected to ElastiCache efficiently. The strategy will allow for the most up-to-date data to be retrieved.

For more information about the ElastiCache write-through caching strategy, see [Caching strategies.](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Strategies.html)

---

ElastiCache for Redis is a fast in-memory data store that provides sub-millisecond latency to power internet-scale applications in real time. The data will not be stored on the instance itself. This choice is ideal for ensuring that the session state information persists across devices.

For more information about Well-Architected Framework principles, see [Design interactions in a distributed system to mitigate or withstand failures](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/design-interactions-in-a-distributed-system-to-mitigate-or-withstand-failures.html).

For more information about using ElastiCache for Redis for session states, see [Getting Started tutorial, Building a fast session store for your online applications](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Tutorials.html).

### Investigate services

Unlike metrics or logs, X-Ray can help users quickly identify services by their relative response times. X-Ray can identify a poorly performing service from within a web of interacting services. Once identified, CloudWatch provides the context, including the logs and metrics necessary to study specific issues.

For more information about CloudWatch metrics, see Using [Amazon CloudWatch metrics.](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/working_with_metrics.html)

For more information about CloudWatch Logs, see [What is Amazon CloudWatch Logs?](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html)

For more informmation bout X-Ray, see [What is AWS X-Ray?](https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html)

### Fanout architecture

Each service can subscribe to an individual Amazon SQS queue, which receives an event notification from the Amazon SNS topic. This is a fanout architectural implementation.

For more information about Amazon SNS fanout architecture, see [Common Amazon SNS scenarios.](https://docs.aws.amazon.com/sns/latest/dg/welcome.html)

### Lambda

#### stages and aliases

To add "stageVariable" to the Lambda ARN, you should use the following format: ${stageVariable.stageVariableName}.

For more information about API Gateway stage variables, see [Using Amazon API Gateway Stage Variables.](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-set-stage-variables-aws-console.html)

#### handler method

The Lambda environment can reuse the same database connection for subsequent invocations when defining the database connection details in the code but outside the handler method.

For more information about reusing the[ Lambda execution environment](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html), see AWS Lambda execution environment.

### Step Functions

The activity worker must first call the CreateActivity API action to obtain the activity Amazon Resource Name (ARN). The GetActivityTask API action then retrieves a scheduled task. The SendTaskHeartbeat API action periodically reports on task progress. The SendTaskFailure or SendTaskSuccess API actions report success or failure.

For more information about the CreateActivity API action, see [CreateActivity](https://docs.aws.amazon.com/step-functions/latest/apireference/API_CreateActivity.html).

For more information about the GetActivityTask API action, see [GetActivityTask](https://docs.aws.amazon.com/step-functions/latest/apireference/API_GetActivityTask.html).

For more information about the SendTaskHeartbeat API action, see [SendTaskHeartbeat](https://docs.aws.amazon.com/step-functions/latest/apireference/API_SendTaskHeartbeat.html).

For more information about the SendTaskSuccess API action, see [SendTaskSuccess](https://docs.aws.amazon.com/step-functions/latest/apireference/API_SendTaskSuccess.html).

For more information about the SendTaskFailure API action, see [SendTaskFailure](https://docs.aws.amazon.com/step-functions/latest/apireference/API_SendTaskFailure.html).

### RDS read replicas

An RDS read replica is replicated asynchronously from the primary RDS database. It is possible that the RDS read replica might not contain the latest data requested by the read requests.

For more information about RDS read replicas, see [Working with read replicas](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html).

Amazon Elastic Container Service (Amazon ECS) on Fargate - Amazon Elastic Container Service (Amazon ECS) is a highly scalable, fast, container management service that makes it easy to run, stop, and manage Docker containers on a cluster. You can host your cluster on a serverless infrastructure that is managed by Amazon ECS by launching your services or tasks using the Fargate launch type.

AWS Fargate is a serverless compute engine for containers that works with both Amazon Elastic Container Service (ECS) and Amazon Elastic Kubernetes Service (EKS). Fargate makes it easy for you to focus on building your applications. Fargate removes the need to provision and manage servers, lets you specify and pay for resources per application, and improves security through application isolation by design.

### Monitoring

Correct option:

`aws ec2 monitor-instances --instance-ids i-1234567890abcdef0` - This enables detailed monitoring for a running instance.

https://docs.aws.amazon.com/cli/latest/reference/ec2/monitor-instances.html

### Update stage variable value from the stage name of test to that of prod

After creating your API, you must deploy it to make it callable by your users. To deploy an API, you create an API deployment and associate it with a stage. A stage is a logical reference to a lifecycle state of your API (for example, dev, prod, beta, v2). API stages are identified by the API ID and stage name. They're included in the URL that you use to invoke the API. Each stage is a named reference to a deployment of the API and is made available for client applications to call.

Stages enable robust version control of your API. In our current use-case, after the updates pass the test, you can promote the test stage to the prod stage. The promotion can be done by redeploying the API to the prod stage or updating a stage variable value from the stage name of test to that of prod.

### Use SSM Parameter Store

AWS Systems Manager Parameter Store provides secure, hierarchical storage for configuration data management and secrets management. You can store data such as passwords, database strings, and license codes as parameter values. For the given use-case, as the DevOps team does not want to re-deploy the application every time there are configuration changes, so they can use the SSM Parameter Store to store the configuration externally.

###

Move the Amazon S3 client initialization, out of your function handler - AWS best practices for Lambda suggest taking advantage of execution context reuse to improve the performance of your functions. Initialize SDK clients and database connections outside of the function handler, and cache static assets locally in the /tmp directory. Subsequent invocations processed by the same instance of your function can reuse these resources. This saves execution time and cost. To avoid potential data leaks across invocations, don’t use the execution context to store user data, events, or other information with security implications.


### Use ElastiCache to maintain user sessions

Amazon ElastiCache allows you to seamlessly set up, run, and scale popular open-Source compatible in-memory data stores in the cloud. Build data-intensive apps or boost the performance of your existing databases by retrieving data from high throughput and low latency in-memory data stores. Amazon ElastiCache is a popular choice for real-time use cases like Caching, Session Stores, Gaming, Geospatial Services, Real-Time Analytics, and Queuing.

To address scalability and to provide a shared data storage for sessions that can be accessed from any individual web server, you can abstract the HTTP sessions from the web servers themselves. A common solution to for this is to leverage an In-Memory Key/Value store such as Redis and Memcached via ElastiCache

###

The account A administrator creates an IAM role and attaches a permissions policy

The account A administrator attaches a trust policy to the role that identifies account B as the principal who can assume the role

The account B administrator delegates the permission to assume the role to any users in account B

To grant cross-account permissions, you need to attach an identity-based permissions policy to an IAM role. For example, the AWS account A administrator can create a role to grant cross-account permissions to AWS account B as follows:

The account A administrator creates an IAM role and attaches a permissions policy—that grants permissions on resources in account A—to the role.

The account A administrator attaches a trust policy to the role that identifies account B as the principal who can assume the role.

The account B administrator delegates the permission to assume the role to any users in account B. This allows users in account B to create or access queues in account A.

###

Use the AWS::Region pseudo parameter

Pseudo parameters are parameters that are predefined by AWS CloudFormation. You don't declare them in your template. Use them the same way as you would a parameter, as the argument for the Ref function.

You can access pseudo parameters in a CloudFormation template like so:

````yaml
Outputs:
  MyStacksRegion:
    Value: !Ref "AWS::Region"
````

The AWS::Region pseudo parameter returns a string representing the Region in which the encompassing resource is being created, such as us-west-2.

Incorrect options:

Create a CloudFormation parameter for Region and let the desired value be populated at the time of deployment - Although it is certainly possible to use a CloudFormation parameter to populate the desired value of the Region at the time of deployment, however, this is not operationally efficient, as you can directly use the AWS::Region pseudo parameter for this.

Set up a mapping containing the key and the named values for all AWS Regions and then have the CloudFormation template auto-select the desired value - The Mappings section matches a key to a corresponding set of named values. For example, if you want to set values based on a Region, you can create a mapping that uses the Region name as a key and contains the values you want to specify for each specific Region. You use the Fn::FindInMap intrinsic function to retrieve values in a map. This option is incorrect as the CloudFormation template cannot auto-select the desired value of the Region from a mapping.

Create an AWS Lambda-backed custom resource for Region and let the desired value be populated at the time of deployment by the Lambda - Custom resources enable you to write custom provisioning logic in templates that AWS CloudFormation runs anytime you create, update (if you changed the custom resource), or delete stacks. When you associate a Lambda function with a custom resource, the function is invoked whenever the custom resource is created, updated, or deleted. This option is a distractor, as Region is not a custom resource that needs to be provisioned.

### Cache dependencies on S3

AWS CodeBuild is a fully managed continuous integration service that compiles source code, runs tests, and produces software packages that are ready to deploy. With CodeBuild, you don’t need to provision, manage, and scale your build servers.

Downloading dependencies is a critical phase in the build process. These dependent files can range in size from a few KBs to multiple MBs. Because most of the dependent files do not change frequently between builds, you can noticeably reduce your build time by caching dependencies in S3.

See [Best Practices for Caching Dependencies](https://aws.amazon.com/blogs/devops/how-to-enable-caching-for-aws-codebuild/).
