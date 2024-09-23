---
title: Automate Deployment
description: Skill Builder
sidebar:
  order: 3
---
:::note
**Domain 3: Deployment and Orchestration of ML Workflows**
:::

## Continuous Integration and Continuous Delivery

### Introduction to MLOps

MLOps applies DevOps principles like automation, monitoring, and collaboration to ML systems. However, MLOps requires tailored processes and procedures to manage the ML model lifecycle from development through deployment.  
A key aspect of MLOps is applying continuous integration (CI) and continuous deployment (CD). 

![Ci/CD](/img/ci-cd.png)

---

#### Teams in the ML process

![teams](/img/teams.png)

1. Data engineers

    Data engineers are responsible for data sourcing, data cleaning, and data processing. They transform data into a consumable format for ML and data scientist analysis.

2. Data scientists

    Data scientists are responsible for model development including model training, evaluation, and monitoring to drive insights from data.

3. ML engineers

    ML Engineers are responsible for model deployment, production integration, and monitoring. They standardize ML systems development (Dev) and ML systems deployment (Ops) for continuous delivery of high-performing production ML models.

---

#### Independent data and ML code

Data and ML code are separate components that are both critical for developing an effective machine learning system. Although the data and code are independent, they must work together effectively for the system to provide useful outputs. Thoughtful design of both components is essential in machine learning.

![data/model](/img/data-model.png)

1. Data component

    Data engineers build and maintain the core infrastructure needed to feed accurate, consistent data to downstream data scientists and machine learning systems. Their foundational data work enables advanced analytics and models.

2. Model building and deployment code

    Data scientists own the model build portion of the ML lifecycle. The ML engineer or MLOps engineer creates and manages model deployment code that is part of a model deployment workflow.

#### Nonfunctional requirements in ML

![Non Func Reqs](/img/non-func-reqs.png)

- **Consistency**: Ensures minimal variance between different environments, such as development, staging, production, to maintain model performance.

- **Flexibility**: Accommodates a wide range of ML frameworks and technologies to adapt to changing requirements.

- **Reproducibility**: Recreates past experiments and training processes to ensure model reliability and traceability.

- **Reusability**: Designs components that can be reused across different ML projects to improve efficiency and reduce development time.

- **Scalability**: Ensures the scaling of resources, such as compute, storage, memory, to handle increased demand and data volumes.

- **Auditability**: Provides comprehensive logs, versioning, and dependency tracking of all ML artifacts for transparency and compliance.
  
- **Explainability**: Incorporates techniques that promote decision transparency and model interpretability.

#### Comparing the ML workflow with DevOps

Machine learning projects have unique complexities compared to traditional software development.

| Feature | DevOps | MLOps |
|---------|--------|-------|
| Code versioning  | ✔️  | ✔️  |
| Compute environment  | ✔️  | ✔️  |
| CI/CD  | ✔️  | ✔️  |
| Monitoring in production  | ✔️  | ✔️  |
| Data provenance  |   | ✔️  |
| Datasets  |   | ✔️  |
| Models  |   | ✔️  |
| Model building with workflows  |   | ✔️  |
| Model deployment with workflows  |   | ✔️  |

### Automating Testing in CI/CD Pipelines

#### Types of automated tests

Automated testing is an essential part of maintaining quality in machine learning model development and deployment. Applying automated tests to a CI/CD pipeline helps to catch issues early, reduce bugs, and maintain model performance over time.

1. Unit tests

    Validate smaller components like individual functions or methods.

2. Integration tests

    Can check that pipeline stages, including data ingestion, training, and deployment, work together correctly. Other types of integration tests depend on your system or architecture.

3. Regression tests

    In practice, regression testing is re-running the same tests to make sure something that used to work was not broken by a change. Regression tests are not only for models.

#### SageMaker Projects

For more information about creating a real project using SageMaker Projects, refer to the following templates: 

- To use the [MLOps template for model building, training, and deployment](https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-projects-templates-sm.html#sagemaker-projects-templates-code-commit), refer to [SageMaker MLOps Project Walkthrough](https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-projects-walkthrough.html).
- To use the [MLOps template for model building, training, and deployment with third-party Git repositories using CodePipeline](https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-projects-templates-sm.html#sagemaker-projects-templates-git-code-pipeline), refer to [SageMaker MLOps Project Walkthrough Using Third-party Git Repos](https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-projects-walkthrough-3rdgit.html).
- To use the [MLOps template for model building, training, and deployment with third-party Git repositories using Jenkins](https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-projects-templates-sm.html#sagemaker-projects-templates-git-jenkins), refer to [Create Amazon SageMaker projects using third-party source control and Jenkins](https://aws.amazon.com/blogs/machine-learning/create-amazon-sagemaker-projects-using-third-party-source-control-and-jenkins/).

## AWS Software Release Process

## Automating Orchestration

## Retraining Models