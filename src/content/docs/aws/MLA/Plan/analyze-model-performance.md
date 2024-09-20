---
title: Analyze Model Performance
description: Skill Builder
sidebar:
  order: 10
---

This final course of the model development domain provides instructions to analyze ML model performance. You will learn about key concepts and techniques for model evaluation including classification and regression problem metrics. You will also learn how to identify convergence issues. Finally, you will use AWS services such as Amazon SageMaker Clarify and Amazon SageMaker Debugger to gain insight into ML training data and model issues.

## Performance Baselines

Best practices for building performance baselines

- Establish evaluation metrics

    When building a performance baseline, it is essential to establish appropriate evaluation metrics that align with the specific problem and business objectives. Common metrics include accuracy, precision, recall, F1-score, mean squared error, and area under the receiver operating characteristic curve (AUC-ROC) depending on the task such as classification, regression, or ranking.

- Start with a simple model

    To create a robust baseline, we recommend that you to start with a simple model, such as a linear regression, and evaluate its performance on the validation and test datasets. This initial baseline serves as a reference point and provides insights into the complexity of the problem. Subsequently, more sophisticated models can be explored, and their performance can be compared against the baseline to quantify the improvements.

- Ensure real-world data

    It is crucial to ensure that the evaluation datasets are representative of the real-world data distribution and do not contain any leakage or bias. Proper data preprocessing, handling of missing values, and feature engineering should be applied consistently across the training, validation, and test datasets to maintain the integrity of the evaluation process.

## Assessing trade-offs

Balance model performance, training time, and cost

Striking the right balance between model performance, training time, and cost when working with machine learning workloads is important. These three factors are interconnected. If you optimize one, you might impact the others. In this section, you will explore the trade-offs.  

![Trade-offs](/img/trade-offs.png)

