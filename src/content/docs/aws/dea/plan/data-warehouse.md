---
title: A Data Warehouse Solution
sidebar:
  order: 3
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 5
---

## Indroduction

### Amazon Redshift features

Amazon Redshift is a powerful, fully managed, petabyte-scale cloud data warehouse service that can significantly enhance your data analytics capabilities. The following are some key features of Amazon Redshift that you will find valuable.

- MPP architecture

    Amazon Redshift uses a massively parallel processing (MPP) architecture that distributes computational workloads across multiple nodes. This provides efficient parallel processing of complex queries against large datasets.

- Columnar data storage

    Amazon Redshift stores data in a columnar format, which is optimized for analytical workloads involving large datasets with complex queries. This storage format reduces I/O operations and improves query performance.

- Advanced compression

    Amazon Redshift employs advanced compression techniques, including columnar and row-level compression, which can significantly reduce storage requirements and improve query performance.

- Automatic workload management

    Amazon Redshift automatically manages and provisions resources based on your workload requirements. This provides optimal performance and cost-efficiency without the need for manual intervention.

- Integration with AWS Services

    Amazon Redshift seamlessly integrates with other AWS services. It integrates with Amazon Simple Storage Service (Amazon S3) for data loading and unloading and with AWS Glue for data preparation and extract, transform, and load (ETL) operations. It also integrates with Amazon Athena for querying data in Amazon S3 and with Amazon QuickSight for data visualization.

- Data encryption

    Amazon Redshift supports encryption at rest and in transit. This ensures that your data is secure. You can also integrate Amazon Redshift with AWS Key Management Service (AWS KMS) for enhanced key management.

- Federated queries

    Amazon Redshift supports federated queries. You can query data across multiple data sources, including other Redshift clusters, Amazon Relational Database Service (Amazon RDS) databases, Amazon Aurora databases, and Amazon DynamoDB, without the need to move or duplicate data.

- Concurrency scaling

    With Amazon Redshift, you can scale out your cluster by adding additional nodes to handle increased concurrency and workload demands without disrupting ongoing operations.  

- Backup and restore

    Amazon Redshift provides automated backup and restore capabilities. This provides data durability and point-in-time recovery in case of accidental data loss or corruption.

- SQL compatibility

    Amazon Redshift uses a SQL-based querying language that is compatible with PostgreSQL to make it easier for developers and analysts familiar with PostgreSQL to work with Amazon Redshift.

### Amazon Redshift benefits

- Scale

    Amazon Redshift uses custom-designed hardware and machine learning (ML) to deliver price performance at any scale.

- Multiple sources

    Load and query structured or semi-structured data from multiple sources.

- Security

    Configure built-in data security features such as encryption and network isolation. Audit Amazon Redshift API calls by using AWS CloudTrail. Third-party auditors assess the security and compliance of Amazon Redshift as part of multiple AWS compliance programs.

- Decoupling (RA3 nodes)

    Size your cluster based on consistent compute requirements. Scale compute separately when needed and pay only for the managed storage that you use. You can choose between tightly coupled or decoupled configurations to best support workload and organizational requirements.

- Integrations

    Query data and write data back to your data lake in open formats. Use integration with other AWS analytics services to streamline end-to-end analytics workflows.

- Reduced Total cost of ownership (TCO)

    Amazon Redshift automates common maintenance tasks so that you can focus on your data insights. Reduce costs by scaling compute and storage separately, pausing unused clusters, or using Reserved Instances for long-running clusters.

## Designing the Data Warehouse Solution

### Goals of a data warehouse

- **Online transaction processing (OLTP)** systems capture and maintain transaction data in a database.
- **Businesses use enterprise resource planning (ERP)** software or systems to plan and manage daily activities. ERP systems can support supply chain, manufacturing, services, financials, and other business processes.
- **Customer resource management (CRM)** systems compile data from a range of different communication channels. CRM data sources can include a company's website, telephone, email, live chat, and marketing materials.
- **Line of business (LOB)** applications are large programs with integrations to databases and database management systems.

The main goal for a data warehouse is to **consolidate data from various sources, such as transactional systems, operational databases, and external sources, into a centralized repository**. Through this integration, organizations can have a single source of truth for analytical purposes.

![warehousing](/img/warehouse-full-picture.png)

A modern data architecture combines the benefits of a data lake and data warehouse architectures. It provides a strategic vision of combining AWS data and analytics services into a multi-purpose data processing and analytics environment.

### Provisioned or Serverless

When it comes to provisioning Amazon Redshift, you have two main options: provisioned and serverless. The following are some of the key factors that distinguish them:

- Compute Resources
- Cost
- Storage Options

#### Amazon Redshift provisioned

Amazon Redshift provisioned is the traditional deployment model for Amazon Redshift. In this model, you provision a cluster with a specific number of nodes, and each node has a fixed amount of compute resources (CPU and RAM) and storage capacity.  
The following diagram provides a conceptual look at the components of a data warehouse architecture and how they are connected to each other.

![provisioned](/img/redshift-provisioned.png)

1. Client applications

    Redshift is based on open standard PostgreSQL, so most existing SQL client applications will work with only minimal changes. For information about important differences between Amazon Redshift SQL and PostgreSQL, see [Amazon Redshift and PostgreSQL](https://docs.aws.amazon.com/redshift/latest/dg/c_redshift-and-postgres-sql.html).

2. Cluster

    The core infrastructure component of an Amazon Redshift data warehouse is a cluster.

3. Internal network

    Amazon Redshift takes advantage of high-bandwidth connections, close proximity, and custom communication protocols to provide private, very high-speed network communication between the leader node and compute nodes. The compute nodes run on a separate, isolated network that client applications never access directly.

4. Compute nodes

    These nodes perform the actual data processing and storage operations. The data is distributed across these nodes using various distribution styles, such as KEY, EVEN, and ALL.

5. Leader node

    This node manages the cluster, receives queries, and distributes the workload across the compute nodes.

6. Node slices

    A compute node is partitioned into slices. Each slice is allocated a portion of the node's memory and disk space where it processes a portion of the workload assigned to the node.

The architecture of an Amazon Redshift provisioned cluster consists of the following nodes. 

- Leader node

    The leader node manages distributing data to the slices. It also apportions the workload for any queries or other database operations to the slices.  
    The slices then work in parallel to complete the operation. The number of slices per node is determined by the node size of the cluster.  
    The leader node compiles code for individual elements of the query plan and assigns the code to individual compute nodes.   
    The leader node manages communications with client programs and all communication with compute nodes. It parses and develops query plans to carry out database operations, in particular, the series of steps necessary to obtain results for complex queries.
    Based on the query plan, the leader node compiles code, distributes the compiled code to the compute nodes, and assigns a portion of the data to each compute node.  
    The leader node distributes SQL statements to the compute nodes only when a query references tables that are stored on the compute nodes. All other queries run exclusively on the leader node. Amazon Redshift is designed to implement certain SQL functions only on the leader node.   
    A query that uses any of these functions will return an error if it references tables that reside on the compute nodes. For more information, see [SQL Functions Supported on the Leader Node](https://docs.aws.amazon.com/redshift/latest/dg/c_sql-functions-leader-node.html).

- Compute nodes
    
    The compute nodes run the compiled code and send intermediate results back to the leader node for final aggregation.   
    Each compute node has its own dedicated CPU and memory, which are determined by the node type. As your workload grows, you can increase the compute capacity of a cluster by increasing the number of nodes, upgrading the node type, or both.  
    Amazon Redshift provides several node types for your compute needs. For details of each node type, see [Amazon Redshift provisioned clusters overview](https://docs.aws.amazon.com/redshift/latest/mgmt/overview.html) in the Amazon Redshift Management Guide.

#### Amazon Redshift Serverless

With Amazon Redshift Serverless, you can access and analyze data without having to provision and manage data warehouses. It automatically provisions and scales data warehouse capacity to deliver fast performance for demanding and unpredictable workloads. The following are some of the key benefits:

- Amazon Redshift Serverless assists with basic operations.
- Amazon Redshift Serverless provides consistent high performance.
- You only pay for the capacity used

![serverless](/img/redshift-serverless.png)

- Client applications

    Amazon Redshift is based on open-standard PostgreSQL, so most existing SQL client applications will work with only minimal changes.

- Serverless resources

    When you submit a query to your Amazon Redshift Serverless data warehouse, Amazon Redshift automatically provisions the necessary compute resources to run the query. These resources are scaled up or down based on the workload so you can handle variable or unpredictable loads without manually managing the cluster size.

- Redshift managed storage

    Data warehouse data is stored in a separate storage tier Redshift Managed Storage (RMS). With RMS, you can scale your storage to petabytes using Amazon S3 storage. You can scale and pay for computing and storage independently. It automatically uses high-performance SSD-based local storage as tier-1 cache.  
    It also takes advantage of optimizations, such as data block temperature, data block age, and workload patterns to deliver high performance while scaling storage automatically to Amazon S3 when needed without requiring any action.

You can organize your compute resources and data using workgroups and namespaces for granular cost controls. With **Workgroups**, you can separate users and their queries from each other. Namespaces help in organizing schemas, tables, and other database objects for each workgroup.

Amazon Redshift Serverless can integrate with the same SQL clients and business intelligence tools as Amazon Redshift provisioned. It also takes advantage of Redshift Managed Storage. The main difference between provisioned and serverless is that Amazon Redshift Serverless doesn't have the concept of a cluster or node.

Amazon Redshift Serverless automatically provisions and manages capacity for you. You can optionally specify the base data warehouse capacity to select the right balance of price and performance for your workloads. You can also specify maximum Redshift Processing Units (RPU) hours to set cost controls to make sure that costs are predictable. You’ll discuss RPUs in more detail later in this module. 

The architecture of Amazon Redshift Serverless is different from the provisioned model in the following ways:

-**Data warehouse**. This is a logical construct that represents your data warehouse environment. It manages the underlying compute resources and handles queries.

- **Compute resources**. Instead of fixed compute nodes, Amazon Redshift Serverless automatically provisions and scales compute resources based on your workload demands. These resources are ephemeral and are spun up or down as needed.

- **Persistent storage**. Your data is stored in a persistent storage layer, separate from the compute resources.

The advantage of Amazon Redshift Serverless is that you don't need to provision and manage the cluster resources manually. You pay for the compute resources based on your actual usage. This makes it cost-effective for workloads with variable or unpredictable demands. However, the performance can vary based on the available resources, and there can be some latency in scaling up resources for sudden spikes in workload.

To learn more about the benefits of a serverless solution, choose each of the following flashcards.

- **Automatic provisioning**: With the serverless option, AWS automatically provisions and manages the underlying compute resources for your Redshift cluster. You don't need to worry about configuring
- **Pricing model**: Redshift Serverless clusters follow a pay-per-use billing model. You're charged for the compute resources used based on the duration of your queries and the amount of data processed.
- **Scaling**: Redshift Serverless clusters automatically scale up or down based on your workload demands so you can handle spikes in query traffic without manual intervention.
- **Pause and resume**: You can pause a Redshift Serverless cluster when it's not in use and resume it later, potentially saving costs when the cluster is idle.
- **Data persistence**: Data stored in a Redshift Serverless cluster is transient by default, which means it's deleted when the cluster is paused or resized. However, you can configure data persistence using Redshift Managed Storage.

When choosing between Amazon Redshift provisioned and Amazon Redshift Serverless, consider factors such as your workload patterns, cost optimization needs, and the level of control you require over cluster management. Although provisioned clusters offer more control and advanced features, Redshift Serverless clusters provide automatic scaling and a pay-per-use pricing model. This makes the Redshift Serverless clusters well-suited for unpredictable or intermittent workloads.

## Ingesting Data

### Ingesting data in Amazon Redshift

In today's data-driven world, organizations are constantly generating and collecting vast amounts of data from various sources, such as transactional systems, IoT devices, and web applications. However, simply having data is not enough. It needs to be effectively stored, processed, and analyzed to gather valuable insights that can drive business decisions and strategies.

Amazon Redshift is designed to handle large-scale data analytics workloads efficiently and cost-effectively. By ingesting data into an Amazon Redshift warehouse, organizations can begin to understand their data and gain a competitive edge.

The value of moving data into an Amazon Redshift warehouse lies in the following key benefits.

- Scalability

    Amazon Redshift can scale up or down seamlessly so organizations can handle growing data volumes and fluctuating workloads without compromising performance.

- Performance

    With its columnar data storage and advanced query optimization techniques, Amazon Redshift delivers lightning-fast query performance. Organizations can analyze vast amounts of data in near real time.

- Cost-effectiveness

    Amazon Redshift eliminates the need for upfront hardware investments and ongoing maintenance costs. This makes it a cost-effective solution for data warehousing.

- Integration

    Amazon Redshift seamlessly integrates with other AWS services, such as Amazon S3, AWS Glue, and AWS Lambda. This provides efficient data ingestion, transformation, and analysis pipelines.

- Security

    Amazon Redshift provides robust security features, including data encryption at rest and in transit, access control, and auditing capabilities to ensure that sensitive data is protected.

### Using data migration tools

Many businesses find that their on-premises data warehouses become unwieldy and expensive to maintain as they scale. Amazon Redshift is a cloud-based data warehouse that can easily and cost-effectively scale to petabytes of data and tens of thousands of queries per second.

If you decide to migrate from an existing data warehouse to Amazon Redshift, the migration strategy you choose depends on the following factors: 

- The size of the database and its tables and objects
- Network bandwidth between the source server and AWS 
- Whether the migration and switchover to AWS will be done in one step or a sequence of steps over time 
- The data change rate in the source system 
- Transformations during migration 
- The tool that you plan to use for migration and ETL

#### AWS DMS

You can use AWS Database Migration Service (AWS DMS) to migrate data to Amazon Redshift. AWS DMS migrates data to and from most commercial and open-source databases, such as Oracle, PostgreSQL, and Microsoft SQL Server.  
When using AWS DMS to migrate your data, the source database remains fully operational during the migration. Thus, it minimizes downtime to applications that rely on the database. 

You can use AWS DMS to migrate data to Amazon Redshift by using Amazon Redshift as a target endpoint for AWS DMS. The Amazon Redshift target endpoint provides full automation for the following processes:

- Schema generation and data type mapping
- Full load of source database tables
- Incremental load of changes made to source tables
- Application of schema changes in data definition language (DDL) made to the source tables
- Synchronization between full load and change data capture (CDC) processes

#### Zero-ETL integration

Zero-ETL is a no-code, cloud-native data integration platform that can seamlessly integrate with AWS DMS to provide a comprehensive data processing solution. This can help you streamline your data migration and transformation processes, reduce the risk of manual errors, and gain greater visibility and control over your data processing workflows.

- Automated AWS DMS task creation
  
    Zero-ETL can automatically create and configure AWS DMS tasks based on your data integration requirements. This eliminates the need for manual setup.

- Data transformation and enrichment

    With Zero-ETL's visual, no-code interface, you can define complex data transformation and enrichment rules, which can be applied during the data migration process.

- Orchestration and scheduling

    Zero-ETL can orchestrate the entire data processing workflow, including the AWS DMS migration task, and schedule it to run at regular intervals or in response to specific events.

- Hybrid and multi-cloud support 

    Zero-ETL can connect to a wide range of data sources, both on-premises and in the cloud. This streamlines the integration of AWS DMS into your existing data processing system.

- Monitoring and alerting

    Zero-ETL provides comprehensive monitoring and alerting capabilities to track the status of your DMS tasks and receive notifications in case of any issues.

#### Amazon EMR

You can use Amazon EMR to extract, transform, and load data from various sources, including Amazon S3, into Amazon Redshift. Amazon EMR processes and transforms large datasets stored in Amazon S3 using Apache Spark or Hadoop before loading into Amazon Redshift.

Amazon EMR supports a wide range of data formats and can handle complex data processing tasks.

#### AWS Glue

AWS Glue is a serverless data integration service. Analytics users can use AWS Glue to discover, prepare, move, and integrate data from multiple sources. 

An AWS Glue connection is an AWS Glue Data Catalog object that stores login credentials, URI strings, virtual private cloud (VPC) information, and more for a particular data store.

![Glue Redshift](/img/glue-redshift.png)

AWS Glue crawlers, jobs, and development endpoints use connections to access certain types of data stores. You can use connections for both sources and targets, and you can reuse the same connection across multiple crawlers or ETL jobs. AWS Glue provides built-in connectors that you can use to connect to Amazon Redshift from AWS Glue jobs and crawlers. You can do the following with a Redshift connector:

- Read data directly from Redshift tables inside AWS Glue jobs written in Python, Scala, or Java to migrate or transform data from Amazon Redshift to other data stores.
- Configure Amazon Redshift as both a source and target in ETL jobs created visually using AWS Glue Studio. You can add Redshift nodes to extract and load data. 
- Crawl Redshift databases and tables using AWS Glue crawlers. Crawlers discover and catalog metadata that can then be used for further processing.
- Specify the Redshift database, schema, and table details when creating a Redshift connection in AWS Glue. 
- Provide an AWS Identity and Access Management (IAM) role with necessary permissions to access Amazon Redshift on behalf of AWS Glue jobs and crawlers.
- Use features of AWS Glue like scheduling, monitoring and integration with other AWS services when working with Amazon Redshift.

### Ingesting streaming data into Amazon Redshift

As businesses modernize, they are constantly looking for ways to see their data in real time or near real time. This situation is where streaming ingestion fits in and can be beneficial to those use cases. AWS has multiple ways to gather your streaming data into Amazon Redshift. This section discusses Amazon Kinesis and Amazon Managed Streaming for Apache Kafka (Amazon MSK).  
Amazon Kinesis has a suite of applications that you can use to collect, process, and transform streaming data.

- Kinesis Data Streams

    Amazon Redshift supports streaming ingestion from Amazon Kinesis Data Streams directly into Amazon Redshift materialized views.  
    This provides a low-latency way to ingest real-time streaming data from Kinesis into Amazon Redshift for analysis. The streaming data bypasses the need to stage in Amazon S3.  
    Lambda functions can also be used to retrieve data records from Kinesis and load them into Amazon Redshift. Lambda provides a serverless way to ingest data on a schedule or based on Kinesis events.  
    Some key points to note about getting data from Kinesis into Amazon Redshift are batching records for efficiency and using appropriate partition keys for distribution.

- Amazon Data Firehose

    Amazon Data Firehose integrates with Amazon S3 and Amazon Redshift to load massive volumes of streaming data directly into them. Firehose provides an interface to capture and deliver streaming data continuously to Amazon Redshift without requiring you to write applications or manage infrastructure.   
    It seamlessly scales to match the throughput of your streaming data without requiring your intervention. Firehose manages the batching, compression, logging, and encryption of streaming data for delivery to data destinations in as little as 60 seconds.  
    Firehose issues synchronous COPY commands to load data into the Redshift cluster. It includes a path to a manifest file that specifies the files to load. After a load completes and Amazon Redshift returns an acknowledgement to Firehose, another COPY command starts to load the next set of data.

![Firehose-BI](/img/firehose-bi.png)

- Amazon MSK

    Amazon MSK is a fully managed service that you can use to build and run applications that use Apache Kafka to process streaming data.  
    Setting up Amazon MSK service can happen in a few steps:

    1. Write a Lambda function that reads data from Amazon MSK topics and loads it into Amazon Redshift using the COPY command. Lambda provides a serverless way to ingest data on a schedule or based on Kafka events. 
    2. Use an EMR cluster to read data from Amazon MSK topics using tools like Spark Streaming. The EMR cluster can then load the processed data into Redshift for analysis. This allows joining streaming and batch data sources.
    3. Set up a Firehose delivery stream to deliver Amazon MSK data to Amazon S3. Then configure a Lambda trigger on new Amazon S3 objects to load data into Amazon Redshift. Firehose handles the real-time data ingestion from Amazon MSK and delivery to Amazon S3.

For near real-time analytics use cases, where you want to query data in low latency scenarios, you can use the Amazon Redshift streaming ingestion feature. With Redshift streaming ingestion, you can connect to Kinesis Data Streams or Amazon MSK directly. You won’t have the latency and complexity associated with staging the data in Amazon S3 and loading it into the cluster. 

#### Materialized view

Amazon Redshift streaming ingestion works by acting as a stream consumer. A materialized view is the landing area for data that is consumed from the stream. When the materialized view is refreshed, Amazon Redshift compute nodes allocate each data shard to a compute slice. Each slice consumes data from the allocated shards until the materialized view attains parity with the stream. 

The materialized views can also include SQL transformations as part of your ELT pipeline. You can manually refresh defined materialized views to query the most recent stream data. As a result, you can perform downstream processing and transformations of streaming data by using SQL at no additional cost. You can use your existing business intelligence (BI) and analytics tools for real-time analytics. 

**Amazon Redshift streaming ingestion** To learn more, see [Streaming Ingestion](https://docs.aws.amazon.com/redshift/latest/dg/materialized-view-streaming-ingestion.html).

### Ingesting batch data in Amazon Redshift

When ingesting data from batch sources into Amazon Redshift, it's essential to consider factors such as data volume, data format, transformation requirements, and the frequency of data ingestion. Based on these factors, you can choose the most suitable option or combine multiple options to create an efficient and scalable data ingestion pipeline. 

- Amazon S3

    You can load data directly from Amazon S3 into Amazon Redshift using the COPY command. This command supports various file formats, such as CSV, JSON, Avro, and Parquet. You can also use AWS Glue or Amazon EMR to process and transform data stored in Amazon S3 before loading it into Amazon Redshift.

- AWS Glue

    AWS Glue is a fully managed ETL service that can be used to prepare and load data from various sources, including Amazon S3, into Amazon Redshift.

- AWS EMR

    Amazon EMR is a big data platform that can be used to process and transform large datasets using Apache Spark, Hadoop, or other frameworks. It can be used to preprocess and transform data before loading it into Amazon Redshift.


- AWS DMS.

    With AWS DMS, you can migrate data from on-premises databases or other cloud data stores into Amazon Redshift. AWS DMS supports continuous data replication, which ensures that your Redshift cluster remains up-to-date with the latest changes in the source database.


- AWS Lambda

    You can use Lambda functions to process and transform data stored in Amazon S3 or other sources, and then load it into Amazon Redshift. Lambda functions can be initiated by events, such as new data arriving in Amazon S3 or a scheduled event. This makes it a flexible and scalable option for data ingestion.

#### Common use cases

To learn more about common use cases of batch data ingestion, choose the arrow buttons to display each of the following five cases.  
Different use cases involve different data volume, data format, transformation requirements, and the frequency of data ingestion. Here are some typical use cases solved by AWS services to ingest batch data.

- Amazon S3

    ![S3](/img/uc-s3.png)

    Amazon S3 is the recommended choice for the following:

    - Loading large datasets from CSV, JSON, or Parquet files stored in Amazon S3 into Amazon Redshift for analytics or reporting purposes
    - Ingesting log files or clickstream data from various applications or services into Amazon Redshift for analysis

- AWS Glue

    ![Glue](/img/uc-glue.png)

    Think of AWS Glue for performing complex data transformations, such as joining data from multiple sources, applying business rules, or cleaning and enriching data before loading into Amazon Redshift.

- Amazon EMR

    ![EMR](/img/uc-emr.png)

    Rely on Amazon EMR when processing and transforming large datasets in Amazon S3 using Apache Spark or Hadoop before loading into Amazon Redshift.

- AWS DMS

    ![DMS](/img/uc-dms.png)

    Use AWS DMS for migrating data from on-premises databases or other cloud databases into Amazon Redshift for data consolidation or analytics purposes.

- AWS Lambda

    ![Lambda](/img/uc-lambda.png)

    Lambda is great solution for the following:
    - Invoking data ingestion into Amazon Redshift based on events, such as new data arriving in Amazon S3 or a scheduled event
    - Automating the ingestion of data from various sources, such as APIs, IoT devices, or streaming sources, into Amazon Redshift

### Moving data between Amazon S3 and Amazon Redshift

There are multiple ways to move data between Amazon S3 and Amazon Redshift.

#### Load data from Amazon S3

![load](/img/load.png)

The **COPY** command uses Amazon Redshift to read and load data in parallel from a file or multiple files in an Amazon S3 bucket. You can take maximum advantage of parallel processing in cases where the files are compressed by splitting your data into multiple files.

Data is loaded into the target table, one line per row. The fields in the data file are matched to table columns in order, left to right. Fields in the data files can be fixed width or character delimited. The default delimiter is a pipe (|). By default, all the table columns are loaded, but you can optionally define a comma-separated list of columns.

 Here is the basic structure of the **COPY** command.

 ```sql
copy <table_name> from 's3://<bucket_name>/<object_prefix>' authorization;
 ```

#### Unload data from Amazon S3

![load](/img/unload.png)

Amazon Redshift splits the results of a select statement across a set of files, one or more files per node slice, to simplify parallel reloading of the data. Alternatively, you can specify that **UNLOAD** should write the results serially to one or more files by adding the PARALLEL OFF option. 

The **UNLOAD** command is designed to use parallel processing. We recommend leaving PARALLEL enabled for most cases, especially if the files will be used to load tables using a COPY command.

Here is a code snippet using the UNLOAD command.

```sql
unload ('select * from venue') to 's3://mybucket/tickit/unload/venue_'
iam_role 'arn:aws:iam::0123456789012:role/MyRedshiftRole';
```

After you complete an **UNLOAD** operation, confirm that the data was unloaded correctly by navigating to the S3 bucket where **UNLOAD** wrote the files. You will see one or more numbered files per slice, starting with the number zero. If you specified the MANIFEST option, you will also see a file ending with manifest.

### Consuming APIs for data collection

![APIs](/img/consuming-apis.png)

For certain use cases, you might want Amazon Redshift to load data with an API endpoint, without having to manage persistent connections. With Amazon Redshift Data API, you can interact with Amazon Redshift without having to configure Java Database Connectivity (JDBC) or Open Database Connectivity (ODBC). You can use the Amazon Redshift Data API to connect to Amazon Redshift with other services, such as Amazon EventBridge and Amazon SageMaker notebooks.   
The Data API doesn't require a persistent connection to the cluster. Instead, it provides a secure HTTP endpoint, which you can use to run SQL statements without managing connections. Calls to the Data API are asynchronous. The Data API uses either credentials stored in AWS Secrets Manager or temporary database credentials. You are not required to pass passwords in the API calls with either method.   
To use the Data API, a user must be authorized. You can authorize a user to access the Data API by adding the IAM AmazonRedshiftDataFullAccess managed policy. This policy provides full access to Amazon Redshift Data API operations.  
The Amazon Redshift Data API allows applications to securely access data in Amazon Redshift clusters and run SQL statements without needing to manage database connections. It supports running queries, data definition language (DDL) commands like CREATE/DROP, and data manipulation language (DML) commands like INSERT/UPDATE/DELETE.   
You can use the Data API for the following:

- List databases, schemas, and tables and get table metadata in a cluster
- Run SQL SELECT, DML, DDL, COPY, and UNLOAD commands 
- Run statements with parameters
- Run a batch of multiple statements in a single transaction
- Cancel running queries
- Fetch query results

The Data API supports authentication using IAM credentials or secrets stored in Secrets Manager. It provides SDK support for languages like Java, Python, and JavaScript.  
Some key use cases of the Data API are accessing Amazon Redshift from serverless applications, supporting ETL and ELT workflows, running one-time queries from notebooks or integrated development environment (IDE), and building reporting systems on top of Amazon Redshift. The "execute-statement", "batch-execute-statement", "describe-statement" APIs allow running queries and managing results programmatically.


