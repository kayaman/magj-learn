---
title: A Batch Pipeline Solution
sidebar:
  order: 4
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 5
---

## Introduction

### Uses cases of batch processing systems

Batch data processing is widely used in various industries and scenarios, including the following:

- Data warehousing

  This process involves loading and transforming data from operational systems into a data warehouse for reporting and analysis. With Amazon Redshift, a data warehouse service from AWS, you can store and query large volumes of data.

- ETL processes

  This involves extracting data from multiple sources, transforming it into a common format, and loading it into a data store or data lake. AWS Glue is a managed service that uses automated extract, transform, and load (ETL) processes to prepare data for analysis.

- Log processing

  In this process, you analyze and process log files from web servers, applications, or IoT devices to gain insights and detect anomalies. With Amazon CloudWatch Logs, you can centralize the logs from all your systems, applications, and AWS services.

- Financial reports

  This process involves processing financial transactions and generating reports on a daily, weekly, or monthly basis. Use Amazon EMR for financial reporting and use Apache Spark as the distributed processing engine.

With a batch data pipeline solution, you can process financial transactions, customer data, and market data feeds for generating reports and performing analytics. 

### Solution benefits

Running batch data pipelines on AWS offers the following advantages.

- Scalability

  With AWS services like Amazon EMR and AWS Glue, you can scale compute resources up or down based on workload demands. This ensures efficient resource utilization and cost optimization. 

- Managed services

  With AWS managed services like AWS Glue and Amazon EMR Serverless, you can reduce the operational overhead of managing and maintaining the underlying infrastructure and focus on your data processing logic. 

- Integration with other AWS services

  The AWS batch data pipeline solution seamlessly integrates with other AWS services, such as Amazon S3 for data storage, Amazon Redshift for data warehousing, Athena for querying, and QuickSight for data visualization. Additionally, you can use AWS Lake Formation for data governance and security.

- Cost optimization

  AWS offers pay-as-you-go pricing model so you can optimize costs by only paying for the resources you consume. 

- Security and compliance

  AWS provides robust security features and compliance certifications to ensure the protection of your data and adherence to industry standards. 

Serve processed data to various analytics tools and custom reporting applications for further analysis and decision-making. The choice of the data serving option depends on the specific requirements of your use case, such as the type of analysis needed, the target audience, and the desired level of interactivity.

### Resources

To learn more about the AWS batch data pipeline solution, refer to this AWS [Well-Architected Framework document](https://docs.aws.amazon.com/wellarchitected/latest/analytics-lens/batch-data-processing.html).

To learn more about AWS Glue, refer to the [AWS Glue documentation](https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html).

To learn more about Amazon EMR, refer to the [Amazon EMR documentation](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html).

## Designing the Batch Data Pipeline

### AWS services for batch data processing

|   |   |   |
|---|---|---|
| ![S3](/img/s3.png) | ![Glue](/img/glue.png) | ![EMR](/img/emr.png) |
| **Amazon S3** | **AWS Glue** | **Amazon EMR** |
| A highly scalable and durable object storage service that serves as the central data lake for storing raw and processed data | A fully managed ETL service that streamlines the process of preparing and loading data for analytics | A cloud-based big data platform that you can use to run open source frameworks like Apache Spark, Hive, and Presto for distributed data processing |

- **Amazon S3**

  Amazon S3 is designed to store and retrieve any amount of data from anywhere on the internet.  
  Amazon S3 is an object storage system, which means that data is stored as objects with metadata and unique identifiers. Objects are organized into buckets, which are similar to folders in a file system. Amazon S3 provides a simple web services interface that developers use to store and retrieve data from anywhere on the web. It is highly scalable with virtually unlimited storage capacity and can automatically scale up or down based on demand.  
  Amazon S3 is designed for high durability with data replicated across multiple facilities and devices within the AWS infrastructure. It also offers robust security features, including access control, encryption, and versioning. Amazon S3 is widely used for a variety of use cases, such as backup and archiving, content delivery, data lakes, and big data analytics.

- **AWS Glue**

  AWS Glue is a fully managed ETL service that automates the time-consuming tasks of data discovery and data preparation.  
  AWS Glue automatically crawls your data sources, such as Amazon S3, Amazon Relational Database Service (Amazon RDS), Amazon Redshift, to infer schema information and create a metadata repository called the AWS Glue Data Catalog. This Data Catalog acts as a centralized repository for all your data assets, making it easier to discover and understand your data. AWS Glue can even detect schema changes and update the Data Catalog automatically to ensure that your metadata is always up to date.  
  AWS Glue provides a visual interface called the AWS Glue Studio, which you use to create, edit, and run ETL jobs without writing code. You can visually define data transformations, such as filtering, joining, and aggregating data, using a drag-and-drop interface. AWS Glue also supports Apache Spark, which you use to write custom transformations in Python or Scala. Additionally, AWS Glue automatically generates Python scripts for your ETL jobs, which you can further customize or integrate into your existing workflows.

- **Amazon EMR**

  Amazon EMR is a cloud-based big data platform provided by AWS. It is designed to help organizations process and analyze large amounts of data using a managed Hadoop framework and other distributed computing technologies.  
  With Amazon EMR, you can set up and manage Hadoop clusters to quickly provision and configure the necessary resources for running big data applications. It supports various data processing engines like Apache Spark, Apache Hive, Apache HBase, and Presto so you can perform tasks such as data mining, log analysis, machine learning, and real-time analytics. Amazon EMR also integrates seamlessly with other AWS services to move data between different components of AWS.  
  One of the key advantages of Amazon EMR is its elasticity, which dynamically scales computing resources up or down based on their workload requirements. This feature helps organizations optimize costs and ensure efficient resource utilization. Additionally, Amazon EMR offers features like automatic cluster scaling, security configurations, and integration with AWS data services like Amazon S3, Amazon DynamoDB, and Amazon Kinesis. These features create a comprehensive solution for big data processing and analytics in the cloud.  
  Amazon EMR Serverless is a new deployment option for Amazon EMR that you can use to run analytics workloads without managing and provisioning clusters. With EMR Serverless, you can run applications and process data directly against data sources without configuring and managing the underlying compute resources.  
  EMR Serverless automatically provisions and manages the compute resources required to run your analytics workloads, scaling capacity up or down based on workload demand. This serverless architecture streamlines analytics workload deployment and management so you can focus on writing and running your applications without worrying about infrastructure provisioning and cluster management tasks.

The batch data pipeline solution uses Amazon S3 for storing financial data, AWS Glue for data integration and transformation tasks, and Amazon EMR for processing large volumes of data using Apache Spark. The choice of services depends on factors such as the complexity of your data processing requirements, the volume of data, and the level of control and customization needed. 

### Configuring Amazon EMR



1. Choose release version

  ![Version](/img/emr-choose-version.png)

  You first need to choose the release version of Amazon EMR that includes a specific set of software frameworks and applications. You can choose from a variety of releases. Each option is optimized for a different type of workload.

2. Choose bundle

  ![Bundle](/img/emr-choose-bundle.png)

  The next configuration choice is the application bundle. This is where you choose to add options such as Spark, Hadoop, Hive, Presto, or others.

3. Configure cluster

  ![Cluster](/img/emr-configure-cluster.png)

  After you have chosen a release and the application bundle, you need to configure your cluster. This includes setting the number of nodes, the type of nodes, and the storage options. You can also configure other options, such as security and networking.

**Summary**

After your cluster is configured, you can launch it. Amazon EMR will take care of provisioning the cluster and installing the necessary software. After the cluster is launched, you can start submitting jobs.

You will walk through some of these options in the following sections.

### Amazon EMR cost considerations

Consider the following opportunities to manage costs for your Amazon EMR clusters:

- Using cluster lifecycles

  Optimize cluster billing and options for cluster termination.
  
- Choosing compute

  Optimize how Amazon Elastic Compute Cloud (Amazon EC2) instance choices, Amazon EC2 
  pricing options, and Amazon EMR features affect cluster costs.

- Scaling clusters

  Optimize how automated and managed scaling features can minimize overprovisioning 
  and underprovisioning.

- Designing storage

  Optimize options for distributed storage and best practices for storage.
  
### Distributed file systems (HDFS and EMRFS)

**Hadoop Distributed File System (HDFS)**  
HDFS is a distributed, scalable, and portable file system for Hadoop. An advantage of HDFS is data awareness between the Hadoop cluster nodes managing the clusters and the Hadoop cluster nodes managing the individual steps.

**EMR File System (EMRFS)**  
EMRFS is an implementation of HDFS used for reading and writing regular files from Amazon EMR directly to Amazon S3.

![HDFS](/img/emr-hdfs.png)

**Hadoop Distributed File System (HDFS)** is used by the primary and core nodes. One advantage is that it's fast. A disadvantage is that it's ephemeral storage that is reclaimed when the cluster ends. It's best used for caching the results produced by intermediate job-flow steps.

![EMRFS](/img/emr-emrfs.png)

**EMRFS** makes Amazon S3 look like the local file system, or HDFS, and it provides features like data encryption and persistent data storage. EMRFS adds strong consistency to Amazon S3, which helps extend Hadoop to allow users to directly access data stored in Amazon S3 as if it were a file system like HDFS. 

### Data Partitioning

Partitioning and bucketing can improve performance and lower costs by reducing the amount of data that a query needs to scan. Partitioning organizes similar types of data into groups based on a particular column. Bucketing groups data within a partition into equal groups or files. Partitioning is best for low cardinality columns, and bucketing is best for high cardinality columns.

![Partitioning](/img/partitioning.png)

1. Amazon EMR uses a date-based partitioning scheme to identify the relevant partitions for a query and avoid scanning larger amounts of data.

2. Bucketing is a form of data partitioning that can divide data into a set number of files within each partition. Bucketing works well when bucketing on columns with high cardinality and uniform distribution. Bucketing can be a powerful tool to increase performance of big data operations.

3. For the purposes of sorting, Apache Hive supports bucketing that can be created from high cardinality key columns such as user-id or, as in this example, country code. Each query can optimally scan a certain amount of data thanks to partitioning, which is possible with any key. A common practice is to partition data based on time, which can lead to a multi-level partitioning scheme.

Combining partitioning and bucketing can further improve query performance because queries can narrow down the data being scanned even further.

### Choosing the appropriate batch processing technology

|   |   |   |
|---|---|---|
| ![EMR](/img/emr.png) | ![Glue](/img/glue.png) | ![EMR Serverless](/img/emr-serverless.png) |
| **Amazon EMR** | **AWS Glue** | **Amazon EMR Serverless** |

