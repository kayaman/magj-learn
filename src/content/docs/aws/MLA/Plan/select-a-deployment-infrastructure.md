---
title: Select a Deployment Infrastructure 
description: Skill Builder
sidebar:
  order: 11
---

## Fundamentals of Model Deployment

**Model building and deployment infrastructure involves the following:**

- Handling training and optimizing the machine learning models
- Data processing, feature engineering, model training, validation, and optimization
- Requires compute resources like GPUs for quickly training complex models
- Outputing the final trained model artifacts that will be used for inference

**Inference infrastructure involves the following:**

- Hosting the deployed trained models and handles running inference
- Receiving new unseen data, runs it through the models, and returns predictions and results
- Focusing on low latency, high throughput inference serving and scales to handle high query volumes without affecting latency
- Can be hosted on the cloud, on-premises, or at edge locations

## Model Building and Deployment Infrastructure

### Building a Repeatable Framework

### Workflow Orchestration Options

1. **SageMaker Pipelines**: SageMaker provides a model building pipeline through the SageMaker Pipelines SDK. With SageMaker Pipelines, you can create, automate, and manage end-to-end ML workflows at scale.

2. **AWS Step Functions**: AWS Step Functions provides a serverless way to orchestrate pipelines, including ML-based pipelines. 

For more information, see [Manage SageMaker with Step Functions](https://docs.aws.amazon.com/step-functions/latest/dg/connect-sagemaker.html).

3. **Amazon MWAA**: Amazon MWAA orchestrates your workflows by using Directed Acyclic Graphs (DAGs) written in Python. SageMaker APIs are used to export configurations for creating and managing Apache Airflow workflows. 

4. **Third-party tools**: You can also use third-party tools, such as MLflow and Kubernetes to orchestrate your workflows.  
   
For more information about using MLflow, navigate to [Managing Your Machine Learning Lifecycle with MLflow and Amazon SageMaker](https://aws.amazon.com/blogs/machine-learning/managing-your-machine-learning-lifecycle-with-mlflow-and-amazon-sagemaker).  
For more information about using Kubernetes for workflow orchestration, navigate to [Kubernetes Orchestration](https://docs.aws.amazon.com/sagemaker/latest/dg/kubernetes-workflows.html).

For more information about creating SageMaker Pipelines, navigate to [Create and manage SageMaker Pipelines](https://docs.aws.amazon.com/sagemaker/latest/dg/pipelines-build.html).

**SageMaker Pipeline step types**

SageMaker Pipelines provides different types of steps that specifically support machine learning workflows. Amazon SageMaker Pipelines includes, but is not limited to, the following steps:

- Processing: Data processing and model evaluation
- Training: Model training by using SageMaker Training Jobs
- Conditional: Evaluate condition and branch to next steps
- CreateModel: Packaging the model for deployment
- RegisterModel: Creation of a model package resource
- Fail: Marking the pipeline’s execution as failed

For more information about SageMaker Pipeline step types, navigate to the following AWS website: [Step types](https://docs.aws.amazon.com/sagemaker/latest/dg/build-and-manage-steps.html#build-and-manage-steps-types).

## Inference Infrastructure

### Deployment Considerations and Target Options

**Deployment inference infrastructure considerations**

- Performance

    You want to ensure that the model predictions do not degrade over time. Performance involves optimizing your model architecture and hyperparameters to ensure efficient computation and inference. 

- Availability

    You want to design your system with redundancy and failover mechanisms to ensure continuous service availability. Availability involves implementing load balancing and horizontal scaling to distribute the workload across multiple instances.

- Scalability

    You want to design your system with a modular and distributed architecture to accommodate increasing workloads. Scalability involves using auto-scaling capabilities. It also involves implementing asynchronous and event-driven processing to decouple components and improve scalability. 

- Resiliency

    You want to incorporate data redundancy and backup mechanisms to protect against data loss. Resiliency involves designing your system to gracefully handle partial failures and degrade functionality instead of complete outages. It also involves ensuring your system can automatically recover from failures without manual intervention.

- Fault tolerance

    You want to implement robust error handling and logging mechanisms to quickly identify and diagnose issues. Fault tolerance involves implementing self-healing capabilities, such as automatic scaling, restarts, or failovers, to recover from failures. Fault tolerance also ensures your system can automatically recover from failures without manual intervention.

#### Deployment targets

- Amazon SageMaker endpoints

    SageMaker is a fully managed service that you can use to build, train, and deploy ML models at scale. 

- Amazon EKS

    Amazon EKS is a powerful container orchestration platform that you can use to deploy and manage ML models as containerized applications.

- Amazon ECS

    ECS is a fully managed container orchestration service that makes it easy to deploy and manage Docker containers.

- AWS Lambda

    AWS Lambda is a serverless computing service that helps you to run your ML model code without provisioning or managing servers. 

For more information about deployment best practices, navigate to: [Best practices for deploying models on SageMaker Hosting Services](https://docs.aws.amazon.com/sagemaker/latest/dg/deployment-best-practices.html). 

### Choosing a Model Inference Strategy

**Amazon SageMaker inference options**

- Real-time: This inference option is for low latency, high throughput requests.
Real-time inference is ideal for inference workloads where you have real-time, interactive, low latency requirements. You can deploy your model to SageMaker hosting services and get an endpoint that can be used for inference. These endpoints are fully managed and support auto scaling. 

- Serverless: This inference option handles intermittent traffic without managing infrastructure. 
With serverless inference, you can deploy and scale ML models without configuring or managing the underlying infrastructure. You don’t need to define an instance type to host your model. Instead, you specify the amount of memory and number of concurrent requests that you want your model to serve. SageMaker automatically provisions the required resources. You can integrate serverless Inference with your MLOps pipelines to streamline your ML workflow. 

  - On-demand Amazon SageMaker Serverless Inference
  - Provisioned Concurrency with Serverless Inference

- Asynchronous: This inference option queues requests and handles large payloads.
Asynchronous inference queues incoming requests and processes them asynchronously.
This option is ideal for requests with the following:

  - Large payload sizes (up to 1 GB)
  - Long processing times (up to 1 hour) 
  
- Batch transform: This inference option processes large offline datasets.
Batch transform provides offline inference for large datasets. Batch transform is helpful for preprocessing datasets or gaining inference from large datasets. It is also useful when running inference if a persistent endpoint is not required, or associating input records with inference to support interpretation of the results.

**Choosing an inference option for your use case**

![options](/img/deployment-options.png)

1. Does your workload need to return an inference for each request to your model? If yes, proceed to question two. If no, the best instance choice for this use case is batch transform.

2. Batch transform. The batch transform feature is well-suited for offline data processing when you have large amounts of data available upfront and don't need a persistent endpoint. You can also use batch transform to pre-process datasets. It supports large datasets in the gigabyte range and with processing times of multiple days.

3. Would it be helpful to queue requests due to longer processing times or larger payloads? If no, proceed to question five. If yes, the best inference choice for this use case is Asynchronous Inference.

4. Asynchornous inference. Using asynchronous inference is best when you need to queue multiple requests or when you have large inputs that take a long time to process. Asynchronous inference allows payloads up to 1 GB in size and processing times up to 1 hour. It can also help you save costs because you can scale the endpoint down to zero when there are no requests waiting.

5. Does your workload have sustained traffic and need lower and consistent latency? If no, progress to question four. If yes, the best inference option for your use case is Serverless Inference.

**Multi-model and multi-container deployments**

###

