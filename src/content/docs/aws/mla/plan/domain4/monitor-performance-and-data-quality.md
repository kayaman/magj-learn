---
title: Monitor Model Performance and Data Quality 
description: Skill Builder
sidebar:
  order: 1
---
:::note
**Domain 4: ML Solution Monitoring, Maintenance, and Security**
:::

## Monitoring Machine Learning Solutions

#### The importance of monitoring ML solutions

![importance](/img/monit-imp.png)

- Meeting business requirements
  
    Monitoring plays a vital role in aligning ML solutions with an organization's business objectives. It helps answer the question: Are we achieving the desired outcomes?  
    By analyzing comprehensive system performance metrics, businesses can evaluate the return on investment (ROI) and make data-driven decisions regarding resource allocation and strategic adjustments.  
    For example, consider a recommendation engine that suggests products to customers on an ecommerce platform. The company's primary goals are to increase customer satisfaction and boost sales through personalized recommendations. Monitoring key performance indicators (KPIs) such as click-through rates, conversion rates, and average order values for recommended products provides valuable insights into the engine's effectiveness. This supports the company to optimize its recommendation strategies continuously.

- Monitoring infrastructure performance

    ML solutions often require significant computational resources, and monitoring infrastructure performance to ensure that the system operates efficiently and scales properly with demand. This process involves monitoring key infrastructure metrics, such as CPU and GPU utilization, memory consumption, and network throughput.
    Consider a scenario where a cloud-based ML application experiences a sudden surge in user requests, leading to high CPU usage and slow response times. In such cases, monitoring tools can alert teams to scale resources as needed, avoiding service disruptions.

- Evaluating model performance

    Model monitoring is a critical process that evaluates a machine learning model's performance in real-world scenarios. It assesses the model's accuracy, efficiency, and overall effectiveness by measuring how well it generalizes to unseen data using relevant metrics. The specific metrics used vary depending on the problem type, such as regression or classification. For example, in classification tasks, key metrics might include precision, recall, F1-score, and inference time. Additionally, monitoring should evaluate the model's performance on edge cases and potential failure modes. Detecting potential issues early through monitoring facilitates timely interventions to address any concerns and maintain optimal performance.  
    A practical example is a spam filter model that starts performing poorly because of changes in spamming techniques. By monitoring the model's performance metrics, such as the false positive and false negative rates, administrators can identify the decline in accuracy. Then, they can initiate the retraining process with updated data. This proactive approach helps restore the system's efficiency and ensures it remains effective against evolving spam tactics.

- Facilitating model retraining

    As data evolves and external factors shift, models can become outdated and less reliable if not retrained. By tracking key metrics like data distribution changes and prediction performance, organizations can schedule timely retraining to keep their models effective.  
    For instance, a customer churn prediction model trained on historical customer data requires periodic retraining to adapt to evolving market conditions and customer behavior. Continuous monitoring of the model's predictive accuracy prompts the marketing team to initiate retraining cycles, keeping predictions reliable and reflective of the current customer base.

- Ensuring compliance with regulations and industry standards

    ML solutions must adhere to applicable rules and regulations. Monitoring processes protect user privacy, security, and fairness. This is important in industries like healthcare and finance, where AI and ML must follow strict rules and oversight.  
    Organizations must have monitoring frameworks that protect user data. These frameworks prevent unauthorized access or misuse of sensitive information. They follow data protection and ethical AI and ML principles. By being accountable and building trust, organizations can use AI and ML technologies responsibly.

#### The Machine Learning Lens: AWS Well-Architected Framework

**Best practices and design principles**

![lens](/img/well-arch.png)

To learn more about the Machine Learning Lens: AWS Well-Architected Framework design principles, visit [Machine Learning Lens](https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/machine-learning-lens.html).

- Optimize Resources

    The Machine Learning Lens helps efficiently use cloud resources, such as compute, storage, and networking, to meet the performance and scalability requirements of ML workloads while minimizing waste and over-provisioning. Effective resource management techniques are fundamental for ensuring the efficient and cost-effective operation of ML workloads on Amazon Web Services (AWS), with some best practices including the following: 

    - Resource pooling: Sharing compute, storage, and networking resources across multiple workloads can improve resource utilization and reduce costs.
    - Caching: Implementing caching strategies for frequently accessed data or intermediate results can reduce computational overhead and improve performance.
    - Data management: Implementing efficient data management practices, such as data compression, partitioning, and lifecycle management, can optimize storage and processing costs.

- Scale ML workloads based on demand

    ML workloads often experience fluctuations in demand, making it essential to scale resources up or down accordingly. AWS provides various services and tools to enable scalable ML deployments: 

    - AWS Auto Scaling can automatically adjust compute resources based on predefined scaling policies, ensuring that resources are provisioned or deprovisioned based on demand.
    - SageMaker, a fully managed AWS ML service, provides built-in scaling capabilities for training and inference workloads so that resources can be scaled up or down as needed.
    - Lambda, a serverless computing service, can be used for scaling ML inference workloads based on demand, eliminating the requirement to manage underlying compute resources.

- Reduce Cost

    Monitoring ML workloads can help you identify opportunities to optimize resource usage, use cost-effective services, and continuously manage costs for efficient and cost-effective ML workloads. One key best practice is to monitor usage and costs by ML activity using resource tagging. Associate tags like "training" or "inference" with your resources to conveniently track and optimize costs in each phase of the ML lifecycle.  
    It's also important to monitor the return on investment (ROI) for your deployed ML models. Use dashboards to report on key business metrics with and without the model to quantify its value. If ROI is negative, you might want to optimize further by reducing latency, streamlining the model, or implementing triage. The following are examples of questions that can help uncover the return on investment (ROI):  

    - If a model is used to support customer acquisition: How many new customers are acquired and what is their spend when the model’s advice is used compared with a baseline?
    - If a model is used to predict when maintenance is required: What savings are being made by optimizing the maintenance cycle?  
  
    For hosted endpoints, continuously monitor resource utilization metrics like CPU, GPU, and memory usage. Use this data to right-size your instance types and take advantage of automatic scaling to provision just enough capacity. Scaling up during peaks and down during lulls can significantly reduce hosting costs.
  
- Enable Continuous Improvement

    Continuous improvement is a key component to help your models remain accurate and effective over time. This involves implementing feedback loops, monitoring performance, and automating processes for rapid iteration. 

    - Establish Feedback Loops: Gather feedback from stakeholders, subject matter experts, and end-users throughout the ML lifecycle. Analyze successes, failures, and operational activities to identify areas for improvement. Experiment with data augmentation, different algorithms, and training approaches until optimal outcomes are achieved. Document your findings to refine processes iteratively. 
    - Monitor Performance: Implement SageMaker Model Monitor to continually assess your models for concept drift and model drift, which can degrade accuracy over time. Configure Amazon CloudWatch to receive alerts on any deviations, aiding prompt remediation. Use the Amazon SageMaker Model Dashboard to centrally track performance metrics and historical behavior. 
    - Automate Retraining: Create Amazon EventBridge rules to activate an automated retraining pipeline when SageMaker Model Monitor detects anomalies or drifts. This facilitates rapid iteration and deployment of updated models to production environments, ensuring your ML solutions remain cutting-edge and high-performing.

To learn more about how to run a Machine Learning Lens review in your AWS account, see [Run a Machine Learning Lens review in your AWS account](https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/ml-lens-review.html).

### Detecting Drift in Monitoring

### SageMaker Model Monitor

### Monitoring for Data Quality Drift

### Monitoring for Model Quality Using SageMaker Model Monitor

### Monitoring for Statistical Bias Drift with SageMaker Clarify

### Monitoring for Feature Attribution Drift

### Monitoring Model Performance Using A/B Testing

### Introduction to SageMaker Model Dashboard

### Choosing Your Monitoring Approach

## Remediating Problems Identified by Monitoring

### Automated Remediation and Troubleshooting