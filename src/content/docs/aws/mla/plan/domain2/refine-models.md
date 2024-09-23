---
title: Refine Models
description: Skill Builder
sidebar:
  order: 3
---
:::note
**Domain 2: Model Development**
:::

### Evaluating Model Performance

## Model Fit

### Model Overfitting and Underfitting

### Model Overfitting and Underfitting Prevention

### Model Combination for Improved Performance

**Ensembling**  

Ensembling is the process of combining the predictions or outputs of multiple machine learning models to create a more accurate and robust final prediction. The idea behind ensembling is that by combining the strengths of different models, the weaknesses of individual models can be mitigated. This leads to improved overall performance.

The following are commonly used ensembling methods:

1. Boosting

    Boosting is an ensemble learning technique that trains different machine learning models sequentially, with each new model attempting to correct the errors of the previous one. The final prediction is obtained by combining the outputs of all the models. Boosting can help mitigate both underfitting and overfitting by creating a strong ensemble model that captures diverse aspects of the data, even if individual models are weak or prone to bias or variance.

    **Algorithms**

    - Adaptive Boosting (AdaBoost)
        
        AdaBoost is a boosting algorithm that is suitable for classification problems. It works by training a sequence of weak learners, or decision trees, on the training data. At each iteration, AdaBoost assigns weights to each instance in the training data. AdaBoost then adjusts these weights after each iteration, giving more emphasis to instances that were misclassified by the previous learner.


    - Gradient Boosting (GB)
        
        Gradient Boosting builds an ensemble of weak learners, with each new learner being trained to minimize the remaining errors from the previous ensemble. Unlike AdaBoost, which adjusts the weights of data samples, GB instead optimizes the loss function in each iteration. The result is that the most recent model is always the best performer. Gradient Boosting can help with both classification and regression-based problems.


    - Extreme Gradient Boosting (XGBoost)
        
        XGBoost is an optimized implementation of Gradient Boosting. XGBoost uses multiple cores on the CPU so that learning can occur in parallel during training. It also features parallelization, distributed computing, cache optimization, and out-of-core processing. This increased performance makes XGBoost a good choice for large datasets and big data applications.

2. Bagging

    Bagging, or bootstrap aggregation, is an ensemble learning method that combines multiple models trained on different datasets to improve overall prediction accuracy and reduce overfitting.

    **Random forests bagging algorithm**

    One popular implementation of bagging is random forests, which combines bagging with random feature selection. In this method, your training dataset is split into random samples to train a collection of decision tree models. Each training job randomly chooses a subset of features for splitting at each node of the decision trees.

3. Stacking

    Stacking, also known as stacked generalization, is an ensemble learning technique that combines multiple levels of machine learning models to improve overall predictive performance.  
    In this method, predictions are generated by multiple base models, known as level-0 models. These predictions are fed to a level-1 model, called a meta-model, which has been trained on how to best combine the predictions.  
    By combining heterogeneous models, stacking can capture more complex patterns in the data. Stacking is particularly beneficial when dealing with diverse or heterogeneous datasets, where no single model may be the best fit.  

## Hyperparameter Tuning

### Benefits of Hyperparameter Tuning

Hyperparameters are the settings or knobs that you can adjust before training a machine learning algorithm. Hyperparameter tuning is a crucial step in machine learning to optimize model performance. It involves systematically trying various combinations of hyperparameter values to find the best-performing model.  
Tuning hyperparameters can have a significant impact on training time, model convergence, and, most importantly, model performance.  
Hyperparameters define the characteristics of the model. This can include defining the number of layers in a neural network or the number of trees in a random forest.  
They optimize the efficiency and performance of training jobs to achieve a balanced model fit. Examples include the learning rate, batch size, and regularization parameters.  

**Hyperparameter effects on common algorithms**

- Gradient Descent
  
  - Learning rate

    The learning rate determines the step size taken by the algorithm during each iteration. This controls the rate at which the training job updates model parameters. If the learning rate is too low, the algorithm might converge too slowly, taking a long time to reach the optimal solution. If the learning rate is too high, the algorithm might overshoot the optimal solution and fail to converge.

  - Batch size

    The batch size is the number of examples used in each iteration of gradient descent before the model parameters are updated. A larger batch size can lead to faster convergence but might require more computational resources.

  - Epochs
  
    Epochs are the number of passes through the entire training dataset that a training job should complete. You want to have enough epochs to capture the underlying relationships in the model and prevent model underfitting. However, too many epochs can result in model overfitting.

- Neural Networks

  - Number of layers

    The more layers a neural network has, the more complex it becomes. It also becomes more capable of modeling complex relationships between inputs and outputs. However, increasing the depth of a network also increases the risk of overfitting.

  - Number of neurons in each layer

    The more neurons a layer has, the more processing power it has to capture and interpret the input data. However, increasing the number of neurons can also lead to overfitting and make the network more susceptible to noise in the data.

  - Choice of activation functions

    Activation functions introduce non-linearity into the neural network, helping it to model complex, non-linear relationships in the data. The choice of activation function depends on the type of layer and the desired outcome.  
    Common activation functions include:

    - Sigmoid function
    - Rectified Linear Unit (ReLU)
    - Hyperbolic Tangent (Tanh)
    - Softmax function

  - Regularizations techniques

    Regularization helps prevent overfitting by introducing constraints or penalties on the model's complexity. Common regularization techniques for neural networks include:

    - L1 and L2 regularization
    - Dropout
    - Early stopping

- Decision Trees

  - Maximum depth of the tree

    This hyperparameter limits the maximum number of levels in the decision tree. It helps to manage the complexity of the model and prevent model overfitting.

  - Minimum samples required to split a node

    This hyperparameter sets a threshold that the data must meet before splitting a node. This prevents the tree from creating too many branches. This also helps to prevent overfitting.

  - Criterion

    The following are criterion options you can select for how you want the algorithm to evaluate node splits:

    - Gini impurity 
        
        This measures the purity of data and the likelihood that data could be misclassified. It indicates whether the data has a homogenous distribution or a heterogenous distribution. These are sometimes referred to as pure or impure.
        In hyperparameter tuning, you use Gini impurity to validate a node split by comparing the impurity of the parent node to the impurities of its child nodes. You can set an impurity threshold that a node must meet before it can split.
    
    - Entropy 
  
        Entropy also evaluates a node split. Entropy measures the randomness of data. You measure the entropy for the data at each node and then the change in entropy for candidate child nodes based on the parameters they use for their decisions. The child node that reduces entropy the most is the split that should be used.

To learn more about hyperparameter tuning, reference the following AWS documentation: [What is hyperparameter tuning](https://aws.amazon.com/what-is/hyperparameter-tuning/)?.

### Hyperparameter Tuning Techniques

- Manual selection

    Manual selection involves selecting hyperparameter values based on your intuition, domain knowledge, and prior experience with similar problems or datasets.

- Grid Search

    Grid search is a systematic and exhaustive approach to hyperparameter tuning. It involves defining all possible hyperparameter values and training and evaluating the model for every combination of these values.

- Random Search

    Random search is a more efficient alternative to grid search. Instead of evaluating every possible combination of hyperparameters, random search randomly selects sets of hyperparameter values.

- Bayesian optimization

    Bayesian optimization uses the performance of previous hyperparameter selections to predict which of the subsequent values are likely to yield the best results.

- Hyperband

    Hyperband is a hyperparameter tuning technique that dynamically allocates resources to well-performing configurations and stops underperforming ones early.  
    Hyperband can train multiple models in parallel, making it suitable for distributed computing environments. This can improve the time to convergence.  
    Hyperband also focuses resources on higher-performing hyperparameter configurations. This can be a more efficient allocation of compute resources than grid search or random search.

## Refining Pre-trained models

### Fine-Tuning Pre-trained Models with Custom Datasets on AWS

SageMaker JumpStart Studio and Amazon Bedrock both offer pre-trained models for fine-tuning with custom datasets.  
In the following sections, you will explore two typical fine-tuning scenarios. Notice how efficiently SageMaker JumpStart Studio and Amazon Bedrock are used to fine-tune pre-trained models to accomplish domain-specific tasks.

### Catastrophic Forgetting Prevention

Fine-tuning pre-trained models can be a highly efficient method for developing your machine learning solutions. However, it's important to monitor for catastrophic forgetting when using this method.  
Catastrophic forgetting occurs when a model is trained on a new task or data, and it forgets previously learned knowledge. When patterns in the new training data deviate from earlier patterns, the model forgets the features or patterns that are still relevant. As a result, the model's performance on older tasks can decrease significantly.

For more information about Renate, visit [Automatically Retrain Neural Networks with Renate](https://aws.amazon.com/blogs/machine-learning/automatically-retrain-neural-networks-with-renate/) on the AWS Machine Learning Blog.

## Model Versioning

### Benefits of Amazon SageMaker Model Registry

**SageMaker Model Registry**

SageMaker Model Registry is a centralized repository for managing your machine learning models.  
One of the key features of SageMaker Model Registry is the ability to register and deploy model versions. You can create a new model version every time you train or fine-tune your model. This ensures that each version is uniquely identified and tracked.

### Registering and Deploying Models with SageMaker Model Registry

demo

## Resources

[What Is Overfitting?](https://aws.amazon.com/what-is/overfitting/)  
For more information about model overfitting and underfitting, choose the following button.

[Efficiently Train, Tune, and Deploy Custom Ensembles Using Amazon SageMaker](https://aws.amazon.com/blogs/machine-learning/efficiently-train-tune-and-deploy-custom-ensembles-using-amazon-sagemaker/)  
To explore more information about ensemble models, choose the following button.

[Perform Automatic Model Tuning with SageMaker](https://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning.html)  
To learn more about the automated model tuning process using SageMaker, choose the following button.

[Deploy Large Models at High Performance Using FasterTransformer on Amazon SageMaker](https://aws.amazon.com/blogs/machine-learning/deploy-large-models-at-high-performance-using-fastertransformer-on-amazon-sagemaker/)  
For more information about strategies for deploying a large machine learning model, choose the following button.

[Domain Adaptation Fine-Tuning](https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-foundation-models-fine-tuning-domain-adaptation.html)  
For more information about using domain adaptation fine-tuning with models in SageMaker JumpStart, choose the following button.

[Instruction-Based Fine-Tuning](https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-foundation-models-fine-tuning-instruction-based.html)  
For more information about using instruction-based fine-tuning with models in SageMaker JumpStart, choose the following button.

[Automatically Re-Train Neural Networks with Renate](https://aws.amazon.com/blogs/machine-learning/automatically-retrain-neural-networks-with-renate/)  
To learn how to use Renate for model re-training and catastrophic forgetting prevention, choose the following button.
