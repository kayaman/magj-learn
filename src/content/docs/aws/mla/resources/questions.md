---
title: Sample Questions
description: questions
sidebar:
  order: 3
tableOfContents: false
---

An ML engineer wants to use Amazon SageMaker to create a model that predicts whether a student will pass an exam. The ML engineer is developing a logistic regression model and needs to find an optimal model with the most accurate classification threshold. The ML engineer must select a model evaluation technique to analyze the performance of the model based on the defined threshold. The dataset contains an equal amount of observations for passed and failed exam attempts.  
Which model evaluation technique meets the requirements?

*Receiver operating characteristic (ROC) curve. The ROC curve is a graphical plot that is used in ML to illustrate the performance of a model at all classification thresholds. The ROC curve meets the requirements because the engineer wants to compare the model's performance against threshold values.*

Learn more about [metrics and validation](https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-metrics-validation.html).

---

A company built a deep learning model for climate modeling by using Amazon SageMaker. In each invocation, the model processes 400 MB of data for 30 minutes to return a prediction. The climate model is invoked automatically when a new climate event is detected. The company needs a deployment strategy to move the deep learning model to production. A cold start can be tolerated.  
What is the MOST cost-effective solution?

*Deploy the model by using an asynchronous endpoint. SageMaker Asynchronous Inference is the capability to queue incoming requests to process the requests asynchronously. SageMaker Asynchronous Inference is suitable for requests with large inference request dataset sizes and long processing times when a cold start is tolerated.*

~~SageMaker Serverless Inference is another option when a cold start is tolerated. However, serverless inference is not a suitable deployment method for large inference request dataset sizes and long processing times. In this scenario, serverless inference would time out.~~

Learn more about [SageMaker Asynchronous Inference](https://docs.aws.amazon.com/sagemaker/latest/dg/async-inference.html).  
Learn more about [SageMaker Serverless Inference](https://docs.aws.amazon.com/sagemaker/latest/dg/serverless-endpoints.html).

---

An ML engineer must implement a solution that processes hundreds of thousands of text inputs once every 24 hours. Each of the inputs is inserted into a prompt and sent to a large language model (LLM) for inference. The LLM response must be stored in an Amazon S3 bucket.  
Which solution will meet these requirements with the LEAST operational overhead?

*Create a batch inference job in Amazon Bedrock. Store the input file in an S3 bucket and specify the stored file as an input to a CreateModelInvocationJob request. Specify the output location for the request as the target S3 bucket.*

To create a batch inference job, you need to send a CreateModelInvocationJob request in Amazon Bedrock. You can configure the CreateModelInvocationJob request to read input data from an S3 bucket and store the output to an S3 bucket. The CreateModelInvocationJob request will read the inputs from a location in an S3 bucket. The file needs to be in JSONL format and should have one input request on each line. The output will be stored in an S3 bucket in JSONL format with one response on each line.  
Learn more about [how to create a batch inference job in Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/batch-inference-create.html).  
Learn more about [how to format and upload input data](https://docs.aws.amazon.com/bedrock/latest/userguide/batch-inference-data.html).

---

A data scientist is training a deep learning neural network by using Amazon SageMaker. The data scientist wants to debug the model to identify and address model convergence issues. The data scientist wants to use real-time monitoring to determine if there is a sampling imbalance between classes.  
Which solution will meet these requirements with the LEAST operational overhead?


*Set up a SageMaker training job that is configured to include SageMaker Debugger. Start the training job and monitor for sampling imbalance by using SageMaker Debugger built-in rules.*

SageMaker Debugger provides a suite of tools to debug training jobs in real time and to monitor training jobs. ClassImbalance is a SageMaker Debugger built-in rule. The rule measures sampling imbalances between the prediction classes and alerts if the imbalance is above a threshold. You can call the built-in rules through the SageMaker API. Therefore, this solution requires the least operational overhead.  
Learn more about [how to debug training jobs in SageMaker by using SageMaker Debugger](https://docs.aws.amazon.com/sagemaker/latest/dg/train-debugger.html).  
Learn more about [SageMaker Debugger built-in rules](https://docs.aws.amazon.com/sagemaker/latest/dg/debugger-built-in-rules.html).  

---

A retail company wants to use an Amazon Elastic File System (Amazon EFS) file server for their machine learning (ML) workload. The Amazon EFS file server will be used to store data for model training that will be accessed from a fleet of training instances.
Which AWS service would best be used for efficiently extracting a large dataset from a file system hosted on Amazon EC2 to an Amazon EFS file server?
  
*AWS DataSync is designed for efficient transferring of large amounts of data between on-premises storage and AWS, or between AWS storage services.*

---

A data science team has been tasked with building a machine learning (ML) model for detecting disease outbreaks. The data will be trained on a large dataset of medical records, including lab results, treatment histories, medication data, and more. The team needs to decide on a storage solution for hosting and training the ML model.  
Which storage services are the best choices for this project? (Select TWO.)

*Amazon S3 and Amazon EFS would be the best choices for this solution. Amazon S3 would be the best choice for storing the initial dataset and for copying and loading the data to Amazon EFS. Amazon EFS would serve as the storage for model training because the file system provides distributed and concurrent access for higher performance.*

---

A machine learning (ML) workload has the following requirements: shared storage to train a machine learning model simultaneously on a massive amount of storage, extremely low latency, and high throughput.  
Which storage service would be the most effective choice?  
  
*Amazon FSx for Lustre provides high performance and concurrent access to a file system that is suitable for ML training and requires the highest performance requirements.*

---

Raw click-stream data has been ingested into a centralized data store that will ultimately be used for training a machine learning (ML) algorithm to personalize recommendations. The raw data consists of user IDs, time stamps, session duration, geolocation, and more.  
Which data format should the data be transformed to for efficient storing and processing?
  
*Parquet provides a columnar data structure that is efficient for storing click-stream data. Parquet's columnar storage and compression makes it a good choice for machine learning.*

---

You are working on a machine learning (ML) project that requires ingesting and processing large volumes of data from various sources. As the data is ingested with Amazon Kinesis Data Streams and stored in Amazon S3, you have been experiencing performance issues. High latency, slow data transfer, and capacity limitations have all been occurring.  
How could you mitigate these issues?
  
*Performance issues can occur with high amounts of data being sent to a single storage destination (Amazon S3). This can lead to latency and slow data transfer. Compressing data prior to sending it to Amazon S3 and using Amazon S3 multi-part uploads can reduce the bandwidth requirements and speed up data transfer times. Using dynamic partitioning with Amazon Data Firehose can distribute data load and alleviate capacity issues of sending data to a single storage location.*

---

A recommendation model during training needs access to a redundant and highly available data store. It must securely store images and serve the images during training.  
Which of the AWS storage options best meets these requirements?
  
*Amazon S3 provides durable object storage with high availability. Amazon S3 is well-suited for read-only data, like training data.*

---

A data scientist at a financial institution is in the early stages of the machine learning (ML) lifecycle. They are deciding which data to collect for an ML algorithm to predict loan defaults.  
Which dataset should the data scientist exclude due to poor data quality?
  
*A dataset that consists of only loan applicants who currently hold a loan with the institution (The dataset is non-representative and does not reflect the overall portion of applicants that are applying for loans.)*

---

You are a member of a machine learning (ML) team that is tasked with building a real-time product recommendation engine for an e-commerce website. The data used for recommendations will consist of unstructured data, such as purchases, browsing history, customer details, and more. The team needs to decide on a file format that provides efficient parsing and analysis of the dataset as it is streamed in real time.  
Which file format should the team use?
  
*When using JSON Lines, there are separate JSON objects for each line, which helps you to efficiently parse the format as it is streamed in real-time. JSON is also a better-suited data format for the unstructured dataset.*

---

A large language model (LLM) for natural language processing (NLP) will be deployed. The model requires fast Network File System (NFS) access to a large dataset from multiple instances.  
Which AWS storage option is best suited for storing the data during training?
  
*Amazon EFS provides a scalable, elastic NFS file system that can be mounted to multiple Amazon EC2 instances. It is ideal for sharing large datasets across multiple instances that train a machine learning model in parallel.*

---

A data analyst is examining a dataset intended for future use in a machine learning (ML) model and is performing exploratory data analysis. The dataset contains information about customer age, income, and spending data.  
Which type of visualization would help the data analyst determine relationships between customer age and income?
  
*Scatterplots can visualize relationships between two different numeric variables. With this visualization method, you can view patterns between multiple variables.*

---

A data engineer is working on a machine learning (ML) project that requires real-time data processing for model inference. The data team needs to ingest and process large volumes of streaming data from various sources, such as social media and application clickstream data.  
Which AWS streaming services would be best suited for processing real-time streaming data for the ML inference with minimal management overhead?
  
*Kinesis Data Streams provides durable real-time data streaming that can capture and store data from many different sources. Amazon Managed Service for Apache Flink can query, analyze, and run computations on streaming data. Using a combination of both of these services, you can ingest real-time data using Kinesis Data Streams. Then, you can process it with Apache Flink for suitable use for ML inference.*

---

You are a machine learning engineer for a cybersecurity company and planning to train your own model to detect security threats. You want to train your model using deep learning and SageMaker.  
Which of the AI/ML stack would you choose to accomplish your goal?

*AWS ML frameworks and infrastructure helps you train your model with a deep learning framework.*

---

You are training your machine learning (ML) model for a classification problem. You provide answers in the example data during training. Which algorithm can be used for a binary classification, a multi-class classification, and a regression ML task?  

*XGBoost This implements a gradient-boosted trees algorithm that combines an ensemble of estimates from a set of simpler and weaker models. It can be used for binary classification, multi-class classification, and regression problems.*

---

Which hyperparameter tuning method is best for finding optimum hyperparameter values with limited compute resources?
  
*Hyperband dynamically allocates resources to promising configurations and quickly discards poor-performing ones. This results in efficient usage of compute resources.*

---

How does iterative model pruning reduce the size of a machine learning (ML) model?

*It removes the least important parameters or nodes from a model.*

---

A machine learning engineer has been tasked with fine-tuning a pre-trained text generation model. The text generation model needs to be able to answer to industry-specific terminology and acronyms but is otherwise effective in the business solution.

*Use a custom dataset to fine-tune the model with domain-specific data.*

Domain adaption fine-tuning is useful for industry jargon and technical terms. As long as the model supports this type of fine-tuning, this approach should work.

---

A machine learning engineer must make sure that catastrophic forgetting doesn’t occur during model fine-tuning.  
Which technique would help them identify catastrophic forgetting because of a drop in model performance?

*Plot the model’s performance over time, and then look for significant decreases in performance on specific tasks after fine-tuning with new data.*

This approach helps the engineer detect when catastrophic forgetting might have occurred by identifying drops in performance after fine-tuning events.

---

A machine learning engineer is working on a project that involves training multiple versions of a model for sentiment analysis. Her team wants to maintain a clear record of all model versions, track their performance metrics, and ensure only approved models are deployed to production.  
Which approach should the team use to achieve these goals?

*Use Amazon SageMaker Model Registry to register and manage different versions of the sentiment analysis model within a Model Group.*

The SageMaker Model Registry is designed specifically for managing model versions, tracking metadata and performance metrics, and controlling the approval and deployment process.

---

You are a data scientist working on a project that involves training a machine learning (ML) model to forecast customer demand. You and other members of your team need to re-train the model in Amazon SageMaker frequently as new data becomes available. Which method should you use to manage and track model versions? 

*Manage this model using Amazon SageMaker Model Registry in a Model Group.*

Model Groups in SageMaker Model Registry are designed to contain different versions of a model trained for a particular problem. This feature would be most useful for grouping and tracking all the versions of your model under one umbrella. 

---

You are training a random forest model and trying to identify hyperparameter values. You are working on the hyperparameters that define the characteristics of the decision trees in the model. Which changes to the hyperparameters would help reduce overfitting?

*Increase the number of samples required to split a node.*

Increasing the number of samples required to split a node prevents the tree from creating too many branches. This helps prevent trees from creating overly specific rules that can result in overfitting.

---

You are experimenting with different ensemble methods and want to train an ensemble model using the bagging method. Which model types can you consider?

*Random forest*

Random forests are ensembles of decision tree models. They combine bagging with random feature selection.

---

You are a data scientist troubleshooting a model re-training job for a neural network. Model performance on specific tasks has decreased and you have identified the issue as catastrophic forgetting. Which changes might you consider?

*Use a rehearsal strategy in your training job and include older samples in your training set.*

The rehearsal approach involves including samples from the original training set during the re-training process. The model rehearses the previous task, which helps it retain the learned knowledge.

---

You are a data scientist who needs to create a model that will be deployed for an edge computing use case. The model must be small to make efficient use of compute and storage resources. What should you consider to manage model size?

*Only use as many features as needed to achieve the required accuracy.*

Models trained on fewer features have fewer patterns in the data to learn. This results in a smaller model.

---

You are training a neural network and observe that the model performs well on training data but fails to generalize to new, unseen data. Which technique can help improve model performance?

*Use dropout.*

Dropout randomly drops out (sets to 0) a number of neurons in each layer of the neural network during each epoch. This forces the network to not overemphasize specific neurons and develop multiple methods of arriving at a result.

---

You are a data scientist working with a model for performing text summarization on customer feedback. You observe that the model does not perform well when processing industry-specific jargon and technical terms. You do not have access to the original training data but have a collection of text samples with this terminology. What is the best approach for improving the performance of this model? 

*Domain adaptation fine-tuning* 

Domain adaptation fine-tuning is a suitable approach for adapting models to specific tasks using limited domain-specific data, such as industry jargon or technical terms.

---

You are a machine learning (ML) engineer trying to decide between hyperparameter tuning techniques. You need a technique that prioritizes speed and scalability for data with a larger search space. What is the best choice?

*Hyperband*

Hyperband can train multiple models in parallel, which increases speed. It also focuses resources on higher performing hyperparameter configurations and uses early stopping. This can be a more efficient allocation of compute resources.

---

You are a data scientist who needs to reduce the size of a machine learning (ML) model. You decide to use iterative model pruning. What would impact how much smaller your model becomes?

*After ranking weights by their importance in making correct permissions, setting a higher percentage of bottom-ranked weights to remove from the model*

Iterative model pruning reduces the number of weights in a neural network by ranking their importance in making correct predictions. It then removes the weights that rank lowest.

---

You are experimenting with reducing training time for your models to reduce compute costs. Which model characteristic INCREASES as you decrease the number of training epochs?

*Model bias*

Decreasing the number of epochs reduces training time, giving the model less time to capture the patterns in the training data.

---

For the case study income eligibility model, the business goals need a quality model that balances minimizing both false positive (FP) and false negative (FN).  
Which metrics would best be used to evaluate these models?

*F1 Score*

F1 score balances out Precision (FP) and Recall (FN).

---

Nikki, a machine learning engineer, is evaluating a classification model for a business problem where it is critical to identify all positive cases correctly, even if it means having a higher number of false positives (FPs)?  
Which metric would be best for this example?  

*Precision*

Precision measures the proportion of positive predictions that are actually correct.

---

Martha, a machine learning engineer, is building a binary classification model to predict whether an email is spam or not spam.  
Which evaluation metric would be most appropriate to use if falsely classifying a non-spam email as spam is highly undesirable?

*Precision*

Precision measures the proportion of positive predictions (spam emails) that are actually correct. If falsely classifying non-spam as spam is highly undesirable, Martha wants to minimize false positives, which precision directly accounts for. 

---

Which of the following is a key benefit of using Amazon SageMaker Debugger?

*Improved model performance*

Amazon SageMaker Debugger helps identify and resolve issues such as overfitting, underfitting, or data quality problems during model training and deployment. By addressing these issues, Model Debugger enables you to improve the model's performance and accuracy.

---

A machine learning engineer is working on an ML project that involves predicting loan approval decisions based on various applicant features. They want to use SageMaker Clarify to ensure that your model is fair and unbiased across different demographic groups.  
Which of the following SageMaker Clarify metrics would be most useful for identifying potential biases in the model's predictions?

*Differential prediction bias*

Differential prediction bias measures the difference in predicted outcomes or probabilities for different facet groups (such as demographic groups), given the same input features. This metric is particularly useful for identifying potential biases in your model's predictions across different demographic groups, which is the primary concern in this scenario.

---

A machine learning engineer is using SageMaker Clarify to evaluate the fairness and explainability of a machine learning model used for loan approval decisions.  
Which of the following metrics would they use to understand the contribution of each input feature, (income, credit score, employment status) to the model's predictions?

*SHAP (SHapley Additive exPlanations)*

SHAP is a game-theoretic approach that calculates the contribution of each input feature to the model's prediction, providing a local explanation for individual predictions. This would be useful for understanding how different features like income, credit score, and employment status influence the loan approval decisions made by the model.

---

A newly trained machine learning engineer is working on a project that involves extensive experimentation with different algorithms, hyperparameters, and data configurations. Alex wants to ensure that the experimentation process is organized, reproducible, and scalable.  
Which of the following AWS services would be most suitable to streamline the machine learning experimentation workflow?

*Amazon SageMaker Experiments*

Amazon SageMaker Experiments is a tool designed specifically for organizing, tracking, and analyzing machine learning experiments. It allows you to automatically track inputs, parameters, configurations, and results of your iterations as runs. You can group and organize these runs into experiments, making it easier to manage and analyze your ML experiments.

---

Your company is trying to decide between using on-demand or provisioned resources for their machine learning (ML) workloads.  
What is the main difference between the two, in terms of performance and scaling?

*On-demand resources are more cost-effective for short-term, unpredictable workloads, whereas provisioned resources are better for long-term, predictable workloads.*

On-demand resources can scale up and down instantly to meet the changing needs of the workload, but this flexibility comes at a higher cost. Provisioned resources, on the other hand, have a fixed capacity that is reserved in advance, which makes them more cost-effective for long-term, predictable workloads. However, provisioned resources might take time to scale up or down, because the capacity needs to be provisioned ahead of time.

---

Your company operates a network of Internet of Things (IoT) devices that collect sensor data from remote locations.  
Which benefit of edge computing would be the MOST relevant in this scenario?

*Reduced latency*

In this scenario, the IoT devices are located in remote locations. This means the data they collect needs to be transmitted over a network to a central cloud for processing. By performing some of the data processing and analysis at the edge (on the IoT devices themselves), the latency between data collection and action can be significantly reduced. This is because the data does not need to be sent back and forth over the network.

---

An MLOps engineer is creating a CloudFormation template that will be used in multiple AWS Regions. The template will provision EC2 instances, but it needs to provide a different Amazon Machine Image (AMI), depending on which Region the template is being used in.  
Which section of the CloudFormation template would be used to provide the AMI ID values for each Region?

*Mappings*

The Mappings section is a mapping of keys and associated values used to specify conditional parameter values, similar to a lookup table. You can associate a Region identifier with a corresponding AMI ID.

---

An MLOps engineer is using the AWS Cloud Development Kit (AWS CDK) to deploy infrastructure for a machine learning (ML) application. They have an inference container and model artifacts, but need to provision an entire architecture to support the application. They do not need to manage every resource at a granular level and they have limited available time to specify the infrastructure in its entirety.  
Which level of AWS CDK construct should they consider?

*L3 constructs*

L3 constructs, also called patterns, contain a collection of resources configured to work together to accomplish a specific task or service within your application. These can include entire architectures.

---

A machine learning engineer is using the Amazon SageMaker Python SDK to create a model training job.  
Which class and class method would the engineer use to define, and then start, a training job?

*Instantiate an Estimator class and use the fit() method.*

The Estimator class defines a training job, and the fit() method runs the training job.

---

An MLOps engineer is configuring a SageMaker endpoint. They expect traffic to the endpoint to fluctuate significantly throughout the day.  
Which of the following describes the BEST approach to making sure that their model performance will meet performance benchmarks while remaining cost effective?

*Conduct load testing on the application. Using different metrics, identify which metric value reliably corresponds to occurrences of model latency. Create a target tracking policy and use this metric as the target metric. Set the target value to a value lower than the value at which model latency occurs.*

Load testing is used to identify the scaling metric. The target value is set below the point at which latency occurs. This will make sure the endpoint scales the compute capacity out to support increased demand. It will also scale capacity in to control costs when the capacity is no longer needed.

---

A machine learning (ML) engineer is building a custom model training container. Where in the directory structure will the container store the hyperparameters during the training job?

*opt/ml/input/config*

This directory holds the JSON files that configure the hyperparameters for the training algorithm and the resources used for distributed training.

---

Which AWS container service provides version control and access management features for container images?

*Amazon Elastic Container Registry (Amazon ECR)*

Amazon ECR is a container registry that performs version control. It can also be used to configure who has access to your container images.

---

Which of the following most accurately describes the infrastructure as code (IaC) approaches of AWS CloudFormation and AWS Cloud Development Kit (AWS CDK)?

*CloudFormation supports a declarative approach to IaC and AWS CDK supports an imperative approach.*

CloudFormation works from a CloudFormation template that describes the end state of the infrastructure. This is the declarative approach to IaC. With AWS CDK, you can include logic that adjusts the final state of your infrastructure and the sequencing of provisioning activities. This is the imperative approach to IaC.

---

Which AWS Cloud Development Kit (AWS CDK) Command Line Interface (CLI) command is used to generate AWS CloudFormation templates of the stacks defined in an app?

*cdk synth*

The **cdk synth** command compiles an AWS CDK application into CloudFormation templates.

---

A machine learning (ML) engineer is using the Amazon SageMaker Python SDK to create an automated model training pipeline. How would they define a data processing step in their pipeline?

*Instantiate a Processor class and use the run() method. Use this as input to a ProcessingStep().*

The Processor class is used for data processing jobs and the run() method runs data processing jobs. A data processing step is defined in a SageMaker Pipeline using ProcessingStep(). 

---

An MLOps engineer needs to deploy an Amazon EC2 instance using the AWS Cloud Development Kit (AWS CDK). They need to explicitly configure all of the properties available in AWS CloudFormation. Which type of AWS CDK construct should you use?

*L1 construct*

L1 constructs, also known as CFN resources, are the lowest-level construct and offer no abstraction. Each L1 construct maps directly to a single CloudFormation resource and requires you to explicitly configure properties.

---

An MLOps engineer is troubleshooting an application that includes a SageMaker endpoint. Users have been reporting occasional performance issues. The engineer notices that these reports correspond to increased latency in model predictions. Further research shows that model prediction latency increases when CPUUtilizaton of the Amazon EC2 instances hosting the inference containers reaches 95 percent. The MLOps engineer also notices that this saturation sometimes occurs during invocations metric spikes.  
How should the engineer address this issue in an operationally efficient and cost-effective manner?

*Implement a target tracking policy on the SageMaker endpoint and set the target metric to CPUUtilization.*

Because the performance issues correspond to CPU saturation, scaling capacity to keep CPUUtilization at a specific target is the correct choice. In addition to scaling out to provide additional capacity, a target tracking policy will also scale resources in to avoid paying for underutilized resources. 

---

An MLOps engineer is creating an AWS CloudFormation template. They need the template to provision an Amazon EC2 instance. Which section of the CloudFormation template would they use to specify the instance and its properties?

*Resources*

The Resources section specifies the stack resources, such as EC2 instances, that you would like to provision.

---

Which of the following is a benefit of using infrastructure as code (IaC)?

*You can deploy the same infrastructure for developer and test environments.*

One of the benefits of IaC is repeatable provisioning, where you can use the same templates to provision infrastructure into different environments.

---

A team is making changes to the feature engineering part of their machine learning pipeline.  
Which kind of test should you implement to ensure these changes do not negatively impact model accuracy?

*Regression testing*

Regression testing checks for changes in system behavior due to code changes. Re-running models with new feature engineering on holdout tests datasets. Checking for degradation in accuracy is a form of regression testing.

---

After deploying a new version, the MLOps engineer notices issues arising in production. It is necessary to quickly rollback to the previous version.  
Which AWS service provides straightforward rollback capabilities? 

*AWS CodeDeploy*

CodeDeploy is a deployment service that provides automated in-place deployments and straightforward rollback to previous versions. 

---

The Machine Learning Lens: AWS Well-Architected Framework design principle, continuous improvement, is a key component to help your models remain accurate and effective over time.  
Which best practices can be used to help with continuous improvement?

*Establish feedback loops, monitor performance, and automate retraining.*

To enable continuous improvement you should establish feedback loops and monitor performance using Amazon SageMaker Model Monitor for concept drift and model drift. To automate retraining, you should use Amazon EventBridge.

---

A machine learning engineer has noticed a change in the production data for his ML model. The training dataset had a balanced distribution of the two groups of data. However, over time, the production dataset has a third group, which was not represented in the original training dataset.  
Which type of drift has the machine learning engineer identified?

*Model bias drift*

Bias drift represents an increase in the bias that affects predictions that the model makes over time. Bias drift can be introduced by changes in the live data distribution.

---

A machine learning engineer has noticed some model quality drift. Specifically, they noticed predictions that their model made that differed from the actual ground truth labels that the model attempted to predict.  
Which steps for monitoring will work best for model quality issues?

*Calculate relevant evaluation metrics, implement confidence thresholds, flag predictions, and monitor the model on different datasets.*

These are the steps to help with model quality monitoring and would solve the model quality issues.

---

A machine learning engineer working on a fraud detection model for a financial institution. The model is currently deployed and receiving real-time transaction data for inference. To monitor the data quality of the incoming transactions, the engineer has set up Amazon SageMaker Model Monitor.  
Which steps should they take to create a baseline for data quality monitoring?

*Use the training dataset to generate baseline constraints and statistics using the suggest_baseline method of the ModelQualityMonitor object.*

The correct step to create a baseline for data quality monitoring is to use the training dataset to generate baseline constraints and statistics using the suggest_baseline method of the ModelQualityMonitor object. According to the lesson, to create the baseline, you start a baseline processing job with the suggest_baseline method using the Amazon SageMaker Python SDK. The baseline job analyzes the training dataset stored in Amazon S3 and generates constraints.json and statistics.json files. These files contain the suggested constraints and descriptive statistics that characterize the training data, which serve as the baseline for comparison against the captured inference data.

---

A company has deployed a binary classification model to predict customer churn based on customer behavior data. They want to monitor the model's quality over time using SageMaker Model Monitor. The company has a dataset of labeled customer data, including the ground truth labels for churn, stored in Amazon Simple Storage Service (Amazon S3).  
Which inputs are required for Amazon SageMaker Model Monitor to monitor the model's quality effectively?

*Baseline data, inference input data, and Amazon SageMaker Ground Truth labels*

To monitor model quality, SageMaker Model Monitor requires these three inputs: (1) Baseline data from the initial model training, (2) Inference input data and predictions made by the deployed model, and (3) SageMaker Ground Truth labels associated with the inference inputs. Model Monitor compares the model's predictions with the Ground Truth labels to measure the quality and detect any drift from the baseline performance.

---

A financial institution has developed a machine learning model to predict loan default risk. The model is based on various customer attributes such as income, credit history, and employment status. The model is currently in production, and the institution wants to monitor for potential statistical bias drift to ensure fair and accurate predictions.  
Which approach would require the least amount of effort for this scenario?

*Use Amazon SageMaker Model Monitor, which integrates with Amazon SageMaker Clarify, to monitor the deployed model's predictions for bias drift.*

Using SageMaker Model Monitor, which integrates with SageMaker Clarify, is the most suitable approach for monitoring the deployed model's predictions for statistical bias drift. SageMaker Model Monitor automates the process of merging prediction data with ground truth labels, computing baseline statistics and constraints, inspecting data for bias metrics and violations, and generating reports and alerts for bias drift detection.

---

A financial institution has developed a credit risk assessment model to evaluate loan applications. The model's predictions are influenced by various features, such as the applicant's income, credit history, and employment status. The institution wants to ensure that the model's feature attributions remain consistent and fair over time.  
Which benefit of SageMaker Clarify attribution monitoring would be most relevant in this scenario?

*Inspect merged data and generate quality metrics and violations related to feature attribution drift.*

In this scenario, where the financial institution wants to ensure consistent and fair feature attributions for the credit risk assessment model, the ability to inspect merged data and generate quality metrics and violations related to feature attribution drift would be most relevant. This would allow the institution to identify any potential biases or unfair attributions in the model's predictions and take appropriate actions.

---

A financial institution has developed a new fraud detection model. Because of the high-stakes nature of the application, they want to thoroughly evaluate the model's performance and impact before fully deploying it.  
Which benefit of A/B testing would be most relevant in this scenario?

*Realistic performance evaluation in a production-like environment*

In this high-stakes scenario, the most relevant benefit of A/B testing is realistic performance evaluation in a production-like environment. By exposing the new fraud detection model to real-world data and user interactions, A/B testing can provide a more accurate assessment of its performance and identify potential issues or biases that may not be apparent during offline testing.

---

A company wants to ensure that their ML models are compliant with regulatory requirements and can provide evidence of the data sources used for training.  
Which feature of the Amazon SageMaker Model Dashboard would be MOST useful for this scenario?

*Model lineage graphs*

The model lineage graphs in the SageMaker Model Dashboard record the S3 URL of input data sources used for each job. This facilitates further analysis and verification of the data sources for compliance purposes. The graph also stores information about each step, helping you to recreate any step or track model and dataset lineage.

---

A machine learning engineer is responsible for monitoring the security and compliance of their organization's AWS resources. Which AWS service would the engineer use to track and record all API calls made to their AWS account, including changes made to AWS resources?

*AWS CloudTrail*

CloudTrail is the service the engineer should use to track and record all API calls made to the AWS account, including changes made to AWS resources. This provides the detailed logging and auditing required for security and compliance monitoring.

---

As a machine learning engineer, you have deployed a model using Amazon SageMaker and received reports of unauthorized access attempts. Which of the following SageMaker features would you leverage to investigate the security issue?

*AWS CloudTrail Logs*

CloudTrail Logs capture information about the caller's identity, the caller's time, and other details. Use this information to audit and investigate potential security breaches in SageMaker.

---

Who is responsible for securing the data in an Amazon Simple Storage Service (Amazon S3) bucket, according to the shared responsibility model?

*Both AWS and the customer share responsibility for securing the data in an Amazon S3 bucket.*

According to the shared responsibility model, AWS is responsible for securing the underlying infrastructure and services. The customer is responsible for securing their data, applications, and configurations within AWS services like Amazon S3.

---

A machine learning engineer is working on a project that involves sensitive financial data. Which security policy would be MOST appropriate to restrict access to the training data stored in an Amazon Simple Storage Service (Amazon S3) bucket?

*Amazon S3 bucket policy*

S3 bucket policies are designed to control access to objects within an S3 bucket, making them the ideal choice for restricting access to your sensitive training data stored in the bucket.

---


