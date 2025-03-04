---
title: Sample Questions
description: Skill Builder
sidebar:
  order: 2
tableOfContents: false
---

**Which option describes the responsibility of the data engineer and the data analyst?**

_The data engineer builds the system that delivers usable data to the data analyst, who analyzes the data to gain business insights._

The data engineer builds a system that will deliver process and curated data for the data analyst. During the data discovery process, the data engineer can gather requirements from the data analyst so the system can deliver usable data.

---

**What are some key functions of the data engineer?**

- _They build and manage data infrastructure platforms._
- _They catalog and document datasets._
- _They ensure security and compliance._

Some of the key data engineer functions are to build and manage data platforms, catalog datasets, and ensure security and compliance. Analyzing data, building visualization dashboards, and training ML models are typically the focus of the data scientist and data analyst.

---

**What is the best definition of data discovery?**

_The process of finding and understanding relevant data sources within an organization and the relationships between them_

Data discovery involves interactive sessions to identify key data sources and stakeholders, understand data, and determine how to maximize value from data through appropriate analysis and use cases. The other options describe parts of data discovery, but not the overall definition.

---

**What are the steps in the data discovery process?**

- _Identify key stakeholders and data sources across the organization._
- _Discover existing data types and formats._
- _Ingest and explore sample data to understand data types and structures._

The data discovery process focuses on what data exists, how it can be accessed and transformed, and the ways to use it before defining implementation details.  
Establishing and testing disaster recovery routines is typically done after the discovery process when more information is known about the data landscape and requirements.  
Although reviewing documentation can provide useful background information, the data discovery process is more hands-on and involves interactive sessions with stakeholders.  
Ingesting, processing, and delivering data is the main function of the data analytics system itself, but not part of the discovery process.

---

**Which questions are typically asked during the data discovery process?**

- _Who are the key stakeholders and data owners?_
- _Which formats and types of data are available?_
- _How will the data be secured and accessed?_

Some typical data discovery questions focus on understanding the available data sources, formats, and volumes and establishing the high-level processing needs to maximize the value from data. Identifying the technical requirements for machine learning, which models are used, and which reference architectures are used come later in the process after the initial data discovery.

---

**What is meant by the term data silos?**

_Independent data stores that are optimized for specific uses and are difficult to combine or access by other systems_

Data silos refer to isolated and incompatible data stores that are optimized for departmental or individual use cases. They make it challenging to develop a unified view of organizational data. This siloed approach inhibits data sharing and prevents using data for new insights.

---

**Which option best describes a basic data analytics workflow?**

_Ingest → Store → Catalog → Process → Deliver_

Data analytics workflows vary to suit business needs, however most workflows follow the pattern of Ingest → Store → Catalog → Process → Deliver. Some of these stages are performed cyclically or iteratively.

---

**Why is a data catalog important in a data analytics system?**

_A data catalog acts as a single source of truth for metadata, and tracks data location and quality._

The data catalog provides transparency into the data landscape by tracking data assets, where they are located, their quality, and how they are being used. This acts as a single source of truth for metadata.

---

**Which options are correct uses of AWS Step Functions in a data analytics workflow?**

- _Coordinating multiple AWS Glue extract, transform, and load (ETL) jobs that process data from different sources and load it into a data warehouse_
- _Orchestrating a machine learning workflow that involves data preprocessing, model training, evaluation, and deployment_
- _Performing batch processing jobs on data stored in Amazon S3 using AWS Batch_

Step Functions is used to coordinate and orchestrate the components of a data analytics workflow, but it does not store any metadata itself. Step Functions workflows can invoke other AWS services like AWS Glue for ETL, AWS Batch for job processing, and AWS Lambda for tasks. But services like DynamoDB are used independently to store metadata, not as part of the Step Functions workflow definition.

---

**Which options are benefits of using zero-ETL approaches on AWS?**

- _It streamlines data architecture and reduces data engineering efforts by automating custom extract, transform, and load (ETL) processes._
- _It provides real-time insights through real-time or near real-time data access._
- _It optimizes costs for organizations because it is based on actual usage and data processing needs._

Zero-ETL aims to eliminate the need for custom ETL pipelines by using integrations and automation between AWS data and analytics services.

---

**Which option best describes a benefit of using serverless architectures for data analytics workloads on AWS?**

_Organizations can optimize costs by paying only for the resources consumed. Serverless services are billed based on actual usage rather than provisioned capacity._

Serverless architectures are designed specifically to avoid provisioning and managing fleets of EC2 instances. Data encryption is always necessary, whether an architecture is serverless or server-based. With Serverless architectures, you do not directly deploy EC2 instances. Batch and scheduled workloads often use serverless architectures. One of the primary advantages of serverless architectures is cost optimization.

---

**What are typical considerations for securing data in AWS analytics environments?**

- _Implementing least privilege access and preventing unintended access to analytics infrastructure and data._
- _Encrypting data at rest and in transit to protect sensitive information._
- _Monitoring infrastructure for changes and user activity with alerts for abnormal behavior._

Securing data in AWS analytics environments include implementing least privilege access controls, encrypting data, monitoring infrastructure security threats and anomalies, and auditing access. Automating the monitoring of changes helps maintain ongoing visibility and control over an environment subject to evolving analytics requirements. Referring to the AWS documentation on security best practices can provide more details about optimally configuring and managing security.

---

**What are some recommended monitoring best practices?**

- _Test and validate jobs. _
- _Integrate monitoring with visualization tools._
- _Set up alerts for critical failures._

It is important to test and validate transformation jobs on an ongoing basis to ensure quality is being maintained. Setting up alerts for failures is critical to catch problems early. Visualization of data can improve insights and make monitoring results more meaningful.  
Many users besides data scientists may need to access logs.  
Cost optimization and automation are not parts of monitoring workflows.

---

**Which options are areas or activities of data analytics systems that should be monitored?**

- _Job submission and completion times for batch jobs using services like AWS Step Functions_
- _Resource utilization of Amazon EC2 instances running analytics jobs to ensure they are not overused_
- _Application performance metrics like request latency and error rates using services like Amazon CloudWatch_

Some key areas and activities to be monitored include application performance, resource utilization, job statuses, data pipelines, streaming data, and application logs.  
Monitoring internal email and calendars, storage naming conventions, and Availability Zone locations are not required to ensure reliability, performance, and availability of the system. The AWS services like CloudWatch, AWS CloudTrail, and Step Functions are useful for monitoring various operational aspects of analytics workloads on AWS.

---

**Which metrics would be most useful to monitor when analyzing the performance of extract, transform, and load (ETL) jobs running on AWS Glue?**

- _Resource utilization of the Amazon EC2 instances running the ETL code_
- _ETL job durations_
- _ETL job failure and retry rates_

Resource utilization, job durations, and the rate of failures and retries are all important metrics to monitor. Inventory levels, open support cases, and warehouse capacity are important, but not critical measures of ETL processes.

---

**A data engineer is working for a startup that collects data from various sources and needs to build out a data pipeline on AWS. The pipeline will ingest raw data from Amazon S3 buckets, process and transform the data, and load it into a data warehouse hosted on Amazon Redshift. Which tasks would typically be the responsibility of the data engineer?**

_Writing extract, transform, and load (ETL) jobs to extract data from the raw files, transform it, and load it into the data warehouse_

The data engineer's core responsibilities would be building and maintaining the data pipelines to ingest and process data for analytical use. Designing schemas, creating dashboards, and defining KPI metrics relate more closely to the roles of data analyst, business analyst, or data scientist.

---

**A data engineer at a startup is building out the company's data infrastructure on AWS. The company has limited engineering resources and budget. They asked the data engineer to design a data processing pipeline that minimizes cost. Which option should the engineer prioritize to meet this requirement?**

_Building a serverless architecture using AWS Lambda, Amazon S3, and Amazon Athena instead of using provisioned services_

To optimize for cost with limited budget and engineering resources, a serverless architecture using Amazon S3, Athena, and Lambda could be the most cost-efficient approach. Using on-demand clusters rather than reserved instances and storing all data in Amazon S3 without optimization might incur higher and unnecessary costs. Provisioning high-capacity EMR clusters could also increase cost.

---

**A data engineer at a financial services company has been asked to build an analytics platform on AWS that will process sensitive customer financial data. Compliance and information security leaders have mandated the platform meet strict regulatory and security requirements. What should be the data engineer's top priority?**

_Implementing security controls like encryption, access controls, and data masking to protect sensitive data_

When working with regulated, sensitive data, implementing proper security controls should be the data engineer's top priority. Optimizing performance, building data pipelines, and using open source to reduce costs are important but secondary to security.

---

**A data engineer at a large e-commerce company has built various data processing pipelines on AWS that need to run on daily, weekly, and monthly schedules. They want to implement an orchestration layer to automate the scheduling and operation of these pipelines. Which tools would BEST fit this requirement?**

_AWS Step Functions with AWS Lambda and AWS Glue to schedule and automate data-driven workflows_

Step Functions, along with Lambda and AWS Glue, is designed to automate the scheduling, orchestrating, and monitoring of data processing workflows and pipelines. OpsWorks, CodeDeploy, and AWS Config are unrelated to orchestration of data pipelines.

---

**A large retail company wants to gain insights from customer purchase data to improve their marketing strategies. Which role would a data engineer play in the data discovery process?**

_Work with business stakeholders to understand their goals and define key metrics. Analyze data sources and processing requirements. Recommend modern data architecture_

The best choice is that the data engineer would work with stakeholders to understand requirements, analyze existing data landscape, and recommend the best modern analytics solution. Owning data access policies, building machine learning models, and deploying a data mesh represent important ongoing activities. However, they are not the primary focus during the initial data discovery process.

---

**A data analyst is working for a large ecommerce company. Their team needs to store and analyze sales data from the past 5 years, which amounts to approximately 10 TB of data. They will access this data frequently for reporting and analysis purposes. Additionally, the data analyst has a smaller amount of archived sales data from the past 10 years (about 2 TB) that is rarely accessed but must be retained for compliance purposes.**  
**Which combination of Amazon S3 storage classes is the most appropriate and cost-effective for storing and accessing this data?**

_Store the 10 TB of frequently accessed data in S3 Standard and the 2 TB of archived data in S3 Glacier Deep Archive._

S3 Standard is the most suitable storage class for frequently accessed data because it provides low-latency and high-throughput access. For the archived data that is rarely accessed, S3 Glacier Deep Archive is the most cost-effective option, offering the lowest storage costs for long-term archival data.  
S3 Standard-IA is designed for data that is infrequently accessed but requires rapid access when needed. Because the 10 TB of data is frequently accessed, S3 Standard is a better choice. Additionally, S3 Glacier Flexible Retrieval might not be the most cost-effective option for the archived data because S3 Glacier Deep Archive offers lower storage costs for long-term archival data.  
S3 One Zone-IA is designed for data that is infrequently accessed and can tolerate a higher level of risk by storing data in a single Availability Zone. However, because the 10 TB of data is frequently accessed, S3 Standard is a better choice. Additionally, S3 Intelligent-Tiering is designed for data with unknown or changing access patterns. It might not be the most cost-effective option for the archived data that is rarely accessed.  
S3 Standard is a suitable choice for the frequently accessed data. However, S3 Glacier Flexible Retrieval is designed for archives with unpredictable retrieval needs. It might not be the most cost-effective option for the archived data that is rarely accessed. S3 Glacier Deep Archive is a more cost-effective choice for long-term archival data.

---

**Which AWS service is the best option to migrate data from on-premises or cloud-based relational databases to Amazon S3?**

_AWS Database Migration Service (AWS DMS)_

AWS DMS is a cloud service that can be used to migrate data from on-premises or cloud-based relational databases to Amazon S3 to build a data lake.  
DataSync is used for transferring data between on-premises storage and Amazon S3, Amazon Elastic File System (Amazon EFS), or Amazon FSx. It is not used for migrating data from databases to Amazon S3.  
AWS Glue is a fully managed extract, transform, and load (ETL) service that can be used for data integration tasks. While you can use AWS Glue to connect to relational databases and read data from tables, it is not used to handle database migrations tasks. DMS is purpose built for this task.  
Lake Formation is a service that helps to build, secure, and manage data lakes, but it does not perform data migration from databases to Amazon S3.

---

**Which AWS service can be used to efficiently transfer large amounts of file-based data from on-premises or cloud-based storage to Amazon S3 in a continuous fashion?**

_AWS DataSync_

AWS DataSync is a data transfer service that can be used to efficiently transfer large amounts of file-based data from on-premises or cloud-based storage systems to Amazon S3. This makes it suitable for ingesting data into a data lake.  
AWS DMS is used for migrating data from databases, not for transferring data from storage systems to Amazon S3.  
AWS Snowball is a data migration solution that involves physically shipping storage devices, which might not be as efficient for regular data ingestion into a data lake.  
Firehose is used for ingesting and delivering streaming data, but it is not optimized for transferring large amounts of static data from storage systems to Amazon S3.

---

**Which of these are DMS capabilities?**

- _Perform a full load of existing tables and replicating change data capture events (inserts, deletes, updates) in a continuous mode._
- _Automatic population of Glue Data Catalog with tables definitions during migration tasks._

DMS can perform full load replication tasks in a continuous mode.  
DMS can be configured to automatically populate the Glue Data catalog while performing a migration task.  
DMS supports writing both in CSV as well as Parquet format.  
DMS does not support replicating CDC on a schedule.

---

**What is the primary purpose of AWS Glue Data Catalog?**

_To store and manage metadata (for example location and schema) about data sets_

AWS Glue Data Catalog is a centralized metadata repository that stores information about data sources like locations, partitions and schemas, . Use it to discover, access, and manage data across various data stores and analytics applications.  
AWS Glue Data Catalog does not provide compute processing capabilities. For real-time data streaming and analytics use AWS Glue ETL streaming jobs or Spark Structured Streaming Jobs in Amazon EMR or Amazon Managed Service for Apache Flink.  
AWS Glue Data Catalog is not a Hadoop cluster. For managed Hadoop clusters, use Amazon EMR.  
AWS Glue Data Catalog is not a data warehousing or querying service. For serverless data warehousing and querying, use Amazon Athena or Amazon Redshift.

---

**Which statement about AWS Glue Data Catalog is true?**

_It integrates seamlessly with other AWS analytics services, like Amazon Athena and Amazon EMR._

Data Catalog is designed to work seamlessly with other AWS analytics services like Amazon Athena, Amazon EMR, and AWS Glue extract, transform, and load (ETL) jobs. With Data Catalog, these services can access and process data from various sources using the centralized metadata.  
Data Catalog supports metadata for data stored in various data sources, including Amazon S3, Amazon RDS and on-premises databases.  
Data Catalog does not automatically discover and catalog data sources. Manually define data sources or use AWS Glue crawlers to automatically scan and infer metadata from data sources.  
Although metadata can be manually defined in the AWS Glue Data Catalog, there are also automated tools, like AWS Glue crawlers, to extract and populate metadata from data sources.

---

**Which statement about using AWS Glue Data Catalog in a data analytics workflow is correct?**

_It makes it possible to discover, access, and combine data from multiple sources for analysis and reporting._

Data Catalog makes it possible to discover, access, and combine data from various sources for analysis and reporting within the data analytics workflow.  
Although Data Catalog is commonly used in batch data processing workflows, it can also support real-time analytics. It provides metadata about streaming data sources and integrating with services like Amazon Kinesis.  
Data Catalog does not provide data transformation capabilities. For data transformation and extract, transform, and load (ETL) jobs, use AWS Glue ETL or other services, like AWS Lambda or Amazon EMR.  
Data Catalog is a metadata repository not a fully managed data lake solution. It works with various data storage services, like Amazon S3 (for data lake) and Amazon RDS and Amazon Redshift (for data warehousing).

---

**Which AWS service is used to extract, transform, and load (ETL) data in a data analytics system?**

_AWS Glue_

AWS Glue is the correct answer because it is a serverless data integration service that provides ETL capabilities for preparing and loading data into data stores for analytics.

---

**What is the primary benefit of using AWS Glue Studio Visual extract, transform, and load (ETL) for data transformation?**

_Automatic code generation_

AWS Glue Studio Visual ETL automatically generates the code to invoke data transformations based on the specifications provided, eliminating the need for manual coding.

---

**What are features of AWS Glue?**

- _Job scheduling_
- _Real-time or batch data processing_
- _Data cataloging_

AWS Glue is primarily designed for streaming or batch-based extract, transform, and load (ETL) processes. AWS Glue can be used to schedule ETL jobs. With AWS Glue it is also possible to achieve Real-time streaming analytics.  
AWS Glue does not perform image recognition or manage users, and is not used for cost optimization.

---

**Which statement best describes the benefit of using Amazon Athena and Amazon QuickSight together?**

_Athena and QuickSight provide a cost-effective and scalable solution for querying and visualizing data Amazon S3 without the need to provision or manage any infrastructure._

Together, Athena and QuickSight provide a serverless and scalable solution without the need to provision or manage any infrastructure. With Athena, you can use SQL to query data stored in Amazon S3. With QuickSight, you can create interactive dashboards and visualizations from that data.  
Athena is more suitable for impromptu, batch-oriented SQL queries on data stored in Amazon S3, which may not be ideal for real-time monitoring use cases. For a real-time monitoring dashboard, Amazon OpenSearch Service and its dashboarding capabilities may be a better choice compared to Amazon Athena and Amazon QuickSight.  
You can build Quicksight dashboards using queries on Athena tables as sources.  
Together, Athena and QuickSight provide a way to query and visualize data, but they do not constitute a complete, fully managed data warehouse solution. They are separate AWS services that integrate well, but each has its own distinct purpose and capabilities.

---

**Which term represents an AWS Glue Data Catalog object that stores login credentials, URI strings, virtual private cloud (VPC) information, and more for a particular data store?**

_An AWS Glue connection_

An AWS Glue connection is a Data Catalog object that stores login credentials, URI strings, virtual private cloud (VPC) information, and more for a particular data store.

---

**You are working on an ETL pipeline that involves extracting data from multiple sources, transforming it using complex computations and aggregations, and then loading it into Amazon Redshift. Which AWS service would be most suitable for the transformation step of this pipeline?**

_Amazon EMR_

For complex or computationally intensive transformations, **Amazon EMR (Elastic MapReduce)** is the most suitable choice. Amazon EMR provides a managed Hadoop system that includes tools like Apache Spark, Apache Hive, and Apache Pig, which can be used for data transformation tasks involving complex computations, aggregations, and joining data from multiple sources. AWS Glue is suitable for simpler transformations, while Lambda is more suitable for event-driven processing and not recommended for computationally intensive tasks.

---

**What is a SPICE query?**

_An in-memory data store that Amazon QuickSight uses to accelerate query performance_

SPICE is an **in-memory data store that Amazon QuickSight uses to accelerate query performance**. When you load data into SPICE, QuickSight automatically optimizes the data for fast queries. SPICE is optimized for aggregations, filtering, and grouping operations, which means that it is ideal for interactive data exploration and dashboards.

---

**What is the name for clusters that you want to share data from?**

_Datashare producers_

Datashare producers (also known as data sharing producers or datashare producers) are clusters that you want to share data from. Producer cluster administrators and database owners can create datashares using the CREATE DATASHARE command.

---

**How does Amazon Redshift Spectrum integrate with the AWS data lake?**

_Redshift Spectrum integrates seamlessly with the AWS data lake stored in Amazon S3. It can query structured and semi-structured data formats directly._

Redshift Spectrum integrates seamlessly with the AWS data lake stored in Amazon S3. It can query structured and semi-structured data formats directly. Amazon Redshift Spectrum resides on dedicated Amazon Redshift servers that are independent of your cluster. Redshift Spectrum queries employ massive parallelism to run very fast against large datasets.

---

**Which services can be used to ingest batch data into Amazon Redshift?**

- _AWS Glue_
- _Amazon EMR_

AWS Glue and Amazon EMR are the services used to ingest batch data into Amazon Redshift. When ingesting data from batch sources into Amazon Redshift, it's essential to consider factors such as data volume, data format, transformation requirements, and the frequency of data ingestion.

---

**What is the name for pre-computed views that store the result of a complex queries on large tables for faster access in Amazon Redshift?**

_Materialized views_

Materialized views in Amazon Redshift are pre-computed views that store the result of a complex queries on large tables for faster access. They provide improved query performance by minimizing the need to recalculate the underlying queries when the same or similar queries are performed repeatedly.

---

**In Amazon QuickSight, what is the difference between using Super-fast, Parallel, In-memory Calculation Engine (SPICE) and a direct query when connecting to Amazon Redshift?**

_SPICE is an in-memory data store optimized for fast queries, whereas direct query connects directly to Amazon Redshift for real-time data access._

SPICE is an in-memory data store optimized for fast queries, whereas direct query connects directly to Amazon Redshift for real-time data access. QuickSight uses SPICE to accelerate query performance. When data is loaded data into SPICE, QuickSight automatically optimizes the data for fast queries. SPICE is optimized for aggregations, filtering, and grouping operations, which means that it is ideal for interactive data exploration and dashboards.

---

**A data analyst needs to access the latest data across operational databases and combine it with historical data in Amazon Redshift for real-time reporting. Which Amazon Redshift feature should they use?**

_Federated queries_

They should use federated queries. By using federated queries in Amazon Redshift, the analyst can query and analyze data across operational databases, data warehouses, and data lakes. They can integrate queries from Amazon Redshift on live data in external databases with queries across the Amazon Redshift and Amazon S3 environments. Federated queries can work with external databases in Amazon RDS for PostgreSQL, Amazon Aurora PostgreSQL-Compatible Edition, Amazon RDS for MySQL, and Amazon Aurora MySQL-Compatible Edition.

---

**What is the purpose of the GROUPING SETS, ROLLUP, and CUBE extensions in Amazon Redshift?**

_To perform multiple GROUP BY operations in a single statement_

Amazon Redshift supports aggregation extensions to do the work of multiple GROUP BY. Use GROUPING SETS, ROLLUP, and CUBE extensions in Amazon Redshift to perform multiple GROUP BY operations in a single statement.

---

**Which Amazon Redshift feature can be used to scale compute resources independently from storage to accommodate growing data volumes?**

_Redshift Managed Storage (RMS)_

The feature is Redshift Managed Storage (RMS). Data warehouse data is stored in a separate storage tier. RMS provides the ability to scale your storage to petabytes using Amazon S3 storage. With RMS, organizations can scale and pay for computing and storage independently. It automatically uses high-performance SSD-based local storage as tier-1 cache.

---

**A data analyst wants to implement a data transformation pipeline that can handle large volumes of data and complex transformations. Which combination of AWS services would be most suitable for this task?**

_AWS Step Functions and AWS Glue_

Throughout the entire extract, transform, and load (ETL) workflow, Step Functions orchestrates running AWS Glue jobs. Step Functions provides monitoring and logging capabilities to track the progress of the workflow and troubleshoot any issues that might arise. The combination of services is AWS Step Functions and AWS Glue.

---

**AnyCompany Financials needs to process and transform financial data stored in Amazon S3 using Apache Spark. Which AWS service would be most suitable for this requirement?**

_Amazon EMR_

Amazon EMR (Elastic MapReduce) is a cloud-based big data platform that supports open-source frameworks like Apache Spark, Hadoop, and Presto. It is designed for distributed data processing and is a suitable choice for running Apache Spark workloads on the financial data stored in Amazon S3.

---

**A financial services company needs to process and analyze large volumes of transaction data, customer information, and market data to generate reports and gain insights. Which AWS service would be most suitable for building the batch data pipeline in this scenario?**

_AWS Glue_

AWS Glue is the most suitable service for building the batch data pipeline in this scenario. AWS Glue is a fully managed extract, transform, and load (ETL) service that makes it easy to prepare and load data for analytics. It can handle the key requirements of the financial services company, such as:

- Data Ingestion: AWS Glue can ingest data from various sources, including databases, data warehouses, and data lakes, into Amazon S3.
- Data Transformation: AWS Glue provides a visual interface and a code-free ETL tool to transform and enrich the data, ensuring data quality and consistency.
- Data Cataloging: AWS Glue Data Catalog can be used to create a centralized metadata repository for the processed data, enabling data discovery and lineage tracking.
- Data Serving: The processed data can be served for consumption by various analytics tools, such as Amazon Athena, Amazon QuickSight, or custom applications.

---

**AnyCompany Financials needs to ingest only the new or updated data from their financial transaction database since the last ingestion process. Which data ingestion technique would be most appropriate in this scenario?**

_Incremental ingestion_

Incremental Ingestion is the most appropriate technique in this scenario, as it involves ingesting only the new or updated data since the last ingestion process, reducing redundancy and improving efficiency.

---

**AnyCompany Financials needs to configure the ingestion process for their financial data sources stored in Amazon S3. Which of the following configuration options would be most relevant for improving query performance and optimizing storage utilization?**

_Partitioning_

Partitioning is a configuration option that can significantly improve query performance and optimize storage utilization by dividing the data into logical partitions based on specific criteria, such as date or location.

---

**AnyCompany Financials wants to set up a scheduled ingestion process to ingest financial data from various sources on a daily basis. Which AWS service or tool would be most suitable for this task?**

_Amazon EventBridge_

Amazon EventBridge is the most suitable service for setting up scheduled ingestion processes. EventBridge allows you to create scheduled rules that trigger AWS Lambda functions or other AWS services to initiate the ingestion process at predefined intervals, such as daily.

---

**AnyCompany Financials needs to process a large volume of financial data from various sources, including databases and file-based sources. They have complex data transformation requirements and need a high degree of control and customization over the data processing environment. Which AWS service would be the most suitable for their batch data processing needs?**

_Amazon EMR_

Amazon EMR provides a flexible and customizable environment for running big data processing frameworks like Apache Spark, Hive, and Presto. It is suitable for scenarios where you need more control over the cluster configuration, advanced tuning, or the ability to run custom code and applications. Given AnyCompany Financials' complex data transformation requirements and the need for a high degree of control, Amazon EMR would be the most suitable choice.

---

**A financial services company has a large volume of financial transaction data stored in Amazon S3 in CSV format. The data engineering team needs to transform this data into Apache Parquet format for efficient querying and analysis. Which AWS service or tool would be the most suitable for this data transformation?**

_AWS Glue ETL Jobs_

AWS Glue ETL Jobs are designed for performing data transformation tasks, such as converting data formats. AWS Glue ETL Jobs can leverage Apache Spark to efficiently process and transform large volumes of data, making it the most suitable choice for converting the financial transaction data from CSV to Apache Parquet format.

---

**AnyCompany Financials wants to process financial transaction data stored in Amazon S3 using Apache Spark on Amazon EMR. Which file system should they use to access and process the data directly from S3?**

_EMRFS (EMR File System)_

EMRFS is a file system layer built on top of Amazon S3, allowing you to seamlessly access and process data stored in S3 as if it were a local file system. EMRFS provides features like consistent view, data encryption, and performance optimizations, making it a suitable choice for processing data directly from S3 using Apache Spark on Amazon EMR.

---

**A retail company has a large dataset of sales transactions stored in a relational database. They want to ingest this data into their batch data pipeline on AWS for further processing and analysis. Which technique would be most suitable for ingesting the data from the database?**

_Apache Spark on Amazon EMR_

Apache Spark on Amazon EMR provides built-in connectors and APIs for reading data from various sources, including relational databases. By using Spark on Amazon EMR, the retail company can efficiently ingest and process the sales transaction data from their database into the batch data pipeline.

---

**A financial analytics company has a large dataset of stock market data stored in a relational database. They want to ingest this data into their batch data pipeline on AWS for further analysis and reporting. Which AWS service would be most suitable for automatically discovering and cataloging the database as a data source?**

_AWS Glue Crawlers_

AWS Glue Crawlers are designed to automatically discover and catalog data sources, including relational databases, NoSQL databases, and file-based sources. In this scenario, the financial analytics company can use AWS Glue Crawlers to automatically discover and catalog the relational database containing the stock market data, making it easier to ingest and process the data in their batch data pipeline.

---

**What is a uniquely identified sequence of data records in a stream?**

_Shard_

A stream is composed of one or more shards, each of which provides a fixed unit of capacity. Increasing the capacity of a stream involves increasing the number of shards. In Amazon Managed Streaming for Apache Kafka (Amazon MSK), a shard is known as a topic.

---

**Which Kafka API is used to subscribe to topics and process their streams of records?**

_Consumer API_

With Amazon Managed Streaming for Apache Kafka (Amazon MSK), you can deploy production-ready applications by using native AWS integrations, and you can connect other applications using the Kafka APIs.

---

**Which AWS service is suitable for short-term storage of streaming data when real-time analytics is required?**

_Amazon Kinesis Data Streams_

Amazon Kinesis Data Streams is a service that allows you to collect and process large amounts of streaming data in real time. It can be used as a short-term storage solution for a streaming data pipeline, acting as a buffer or temporary storage for data before it is processed or loaded into a more permanent storage solution. This makes it suitable for scenarios where real-time analytics on streaming data is required.

---

**What is a benefit of using short-term storage services like Amazon Kinesis Data Streams or Amazon Managed Streaming for Apache Kafka (Amazon MSK) in a streaming data pipeline?**

- _Provide a buffer against network issues or downstream system outages._
- _Decouple data ingestion from processing for improved flexibility._

Services like Amazon Kinesis Data Streams and Amazon MSK are designed to provide short-term storage for streaming data. This storage acts as a buffer, allowing the data to be temporarily stored in case of network issues or downstream system outages. If there is a disruption in the downstream processing systems or network connectivity issues, the streaming data can be retained in the short-term storage until the issue is resolved, preventing data loss.  
By using short-term storage services like Kinesis Data Streams or Amazon MSK, the data ingestion process is decoupled from the processing or consumption of the data. This decoupling provides flexibility in the architecture, as the data producers (ingestion) and consumers (processing) can operate independently.

---

**A data engineering team is building a streaming data pipeline to ingest clickstream data from various sources. They plan to use Amazon Kinesis Data Streams for short-term storage and Amazon Redshift for long-term storage and analytics. Which statement best describes the zero-ETL capabilities of Amazon Redshift in this scenario?**

_Amazon Redshift supports streaming ingestion directly from Kinesis Data Streams, eliminating the need for an extract, transform, load (ETL) pipeline to stage data in Amazon S3._

Amazon Redshift, a cloud data warehousing service, supports streaming ingestion directly from Amazon Kinesis Data Streams. This feature, known as the Redshift Streaming Ingestion, allows data to be loaded directly from Kinesis Data Streams into Redshift without the need for an intermediate ETL (Extract, Transform, Load) pipeline or staging in Amazon S3. This zero-ETL capability simplifies the data pipeline and reduces latency by eliminating the need for additional data movement and processing steps.

---

**Which AWS service can capture, transform, and store streaming data in real-time to deliver data from Amazon Kinesis Data Streams to common destinations and perform record-level transformations?**

_Amazon Data Firehose_

Amazon Data Firehose is a fully managed service that can capture, transform, and load streaming data into the storage of your choice for near real-time analytics with existing business intelligence tools. It can perform record-level transformations using AWS Lambda functions.

---

**What is the purpose of checkpointing in Spark Streaming applications running on Amazon EMR clusters?**

_To enable the application to recover from failures and maintain exactly-once semantics_

According to the content, Spark Streaming provides built-in support for checkpointing. This enables the application to recover from failures and maintain exactly-once semantics. The EMR cluster can be used to store the checkpoint data, which ensures that the Spark Streaming application can resume processing from the last checkpoint in the event of a failure.

---

**What is an interactive query service in which you can use standard SQL to query and analyze data?**

_Amazon Athena_

You can use Athena to query data in place and combine data sources. This functionality is helpful for data analysts to perform one-time queries.

---

**Which service can business analysts use for real-time threat detection and incident management?**

_Amazon OpenSearch Service_

OpenSearch Service integration supports real-time application monitoring, log analytics for real-time threat detection and incident management, and clickstream analysis. You can search, explore, filter, aggregate, and visualize the data to gain real-time insights.

---

## Official Practice Question Set

**A company is using an Amazon S3 data lake. The company ingests data into the data lake by using Amazon Kinesis Data Streams. The company reads and processes the incoming data from the stream by using AWS Lambda. The data being ingested has highly variable and unpredictable volume. Currently, the IteratorAge metric is high at peak times when a high volume of data is being posted to the stream. A data engineer must design a solution to increase performance when reading Kinesis Data Streams with Lambda. Which solution will meet these requirements?**

- _Increase the number of shards for the Kinesis data stream._
- _Test different parallelization factor settings to find the most performant._
- _Register the Lambda function as a consumer with enhanced fan-out._

By default, Lambda will create one concurrent instance of the Lambda function for each shard. If you have three shards, you will have three concurrent functions. A high IteratorAge implies that the last record that is read from the Kinesis data stream is increasing in age. A high IteratorAge could mean that the data is not being processed in a timely manner. One way to increase throughput when you use Kinesis Data Streams and Lambda is to reshard. To reshard is to increase the number of shards for Kinesis Data Streams. If there are more shards, there will be more Lambda function invocations that concurrently process data.  
By default, all consumers of a Kinesis data stream share throughput across consumers. Sharing can restrict throughput for any one consumer, such as the Lambda function that processes the data. A high IteratorAge implies that the last record that is read from the Kinesis data stream is increasing in age. A high IteratorAge could mean that the data is not being processed in a timely manner. One way to increase throughput when you use Kinesis Data Streams and Lambda is to register the Lambda function as a consumer with enhanced fan-out. This solution would give the Lambda function dedicated throughput capacity for the Kinesis data stream. Therefore, this solution could increase performance.  
Learn more about [enhanced fan-out consumers and Kinesis](https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html#services-kinesis-configure).

---

**A company is running an Amazon Redshift data warehouse on AWS. The company has recently started using a software as a service (SaaS) sales application that is supported by several AWS services. The company wants to transfer some of the data in the SaaS application to Amazon Redshift for reporting purposes. A data engineer must configure a solution that can continuously send data from the SaaS application to Amazon Redshift. Which solution will meet these requirements with the LEAST operational overhead?**

_Create an Amazon AppFlow flow to ingest the selected source data to Amazon Redshift. Configure the flow to run on event._

With Amazon AppFlow, a flow transfers data between a source and a destination. Amazon AppFlow supports many AWS services and SaaS applications as sources or destinations. A solution that uses Amazon AppFlow can continuously send data from the SaaS application to Amazon Redshift with the least operational overhead.  
Learn more about [Amazon AppFlow flows](https://docs.aws.amazon.com/appflow/latest/userguide/create-flow-console.html).

---

**An ecommerce company is running an application on AWS. The application sources recent data from tables in Amazon Redshift. Data that is older than 1 year is accessible in Amazon S3. Recently, a new report has been written in SQL. The report needs to compare a few columns from the current year sales table with the same columns from tables with sales data from previous years. The report runs slowly, with poor performance and long wait times to get results. A data engineer must optimize the back-end storage to accelerate the query. Which solution will meet these requirements MOST efficiently?**

_Run the report SQL statement to gather the data from Amazon S3. Store the result set in an Amazon Redshift materialized view. Configure the report to run SQL REFRESH. Then, query the materialized view._

You can use Redshift materialized views to speed up queries that are predictable and repeated. A solution that runs SQL REFRESH on the materialized view would ensure that the latest data from the current sales table is included in the report.  
Learn more about [Redshift materialized views](https://docs.aws.amazon.com/redshift/latest/dg/materialized-view-overview.html).

---

**A data engineer has created a new account to deploy an AWS Glue extract, transform, and load (ETL) pipeline. The pipeline jobs need to ingest raw data from a source Amazon S3 bucket. Then, the pipeline jobs write the transformed data to a destination S3 bucket in the same account. The data engineer has written an IAM policy with permissions for AWS Glue to access the source S3 bucket and destination S3 bucket. The data engineer needs to grant the permissions in the IAM policy to AWS Glue to run the ETL pipeline. Which solution will meet these requirements?**

_Create a new IAM service role for AWS Glue. Attach the policy to the new role. Configure AWS Glue to use the new role._

Permissions for AWS Glue are granted through an IAM service role for AWS Glue. A default role exists in the account with loose permissions that allow the service to use any S3 bucket. You can create and attach a new IAM role to AWS Glue. This solution would give you the ability to use more strict permissions in the AWS Glue jobs.  
Learn more about [how to grant permissions so that AWS Glue can access other AWS services](https://docs.aws.amazon.com/glue/latest/dg/create-an-iam-role.html).

---

**An ecommerce company runs several applications on AWS. The company wants to design a centralized streaming log ingestion solution. The solution needs to be able to convert the log files to Apache Parquet format. Then, the solution must store the log files in Amazon S3. The number of log files being created varies throughout the day. A data engineer must configure a solution that ensures the log files are delivered in near real time. Which solution will meet these requirements with the LEAST operational overhead?**

_Configure the applications to send the log files to Amazon Kinesis Data Firehose. Configure Kinesis Data Firehose to invoke an AWS Lambda function that converts the log files to Parquet format. Configure Kinesis Data Firehose to deliver the Parquet files to an output S3 bucket._

You can use Kinesis Data Firehose to deliver log files to Amazon S3 with the least operational overhead. You can use a data-transformation Lambda function with Kinesis Data Firehose. This solution can convert log files to the correct format before the log files are delivered to Amazon S3.  
Learn more about [how to transform incoming source data with Lambda functions on Kinesis Data Firehose](https://docs.aws.amazon.com/firehose/latest/dev/data-transformation.html).

---

**A company is collecting data that is generated by its users for analysis by using an Amazon S3 data lake. Some of the data being collected and stored in Amazon S3 includes personally identifiable information (PII). The company wants a data engineer to design an automated solution to identify new and existing data that needs PII to be masked before analysis is performed. Additionally, the data engineer must provide an overview of the data that is identified. The task of masking the data will be handled by an application already created in the AWS account. The data engineer needs to design a solution that can invoke this application in real time when PII is found. Which solution will meet these requirements with the LEAST operational overhead?**

_Enable Amazon Macie in the AWS account. Create an Amazon EventBridge rule for the default event bus for Macie findings. Set the masking application as the target for the rule._

Macie can analyze data in S3 buckets and determine if the data contains sensitive data like PII. Macie creates findings based on its analysis. Users can view the findings as a report in the AWS Management Console. Macie can also create events that are sent to the default event bus for EventBridge. You can create a rule that filters the findings being generated by Macie. Then, EventBridge can invoke the masking application. This solution meets all requirements and has the lowest operational overhead.  
Learn more about [Macie and EventBridge integration](https://docs.aws.amazon.com/macie/latest/user/findings-monitor-events-eventbridge.html).

---

**A company ingests data into an Amazon S3 data lake from multiple operational sources. The company then ingests the data into Amazon Redshift for a business analysis team to analyze. The business analysis team requires access to only the last 3 months of customer data. Additionally, once a year, the company runs a detailed analysis of the past year's data to compare the overall results of the previous 12 months. After the analysis and comparison, the data is no longer accessed. However, the data must be kept after 12 months for compliance reasons. Which solution will meet these requirements in the MOST cost-effective manner?**

_Ingest 3 months of data into Amazon Redshift. Automate an unload process from Amazon Redshift to Amazon S3 after the data is over 3 months old. Use Amazon Redshift Spectrum for the yearly analysis to include data up to 12 months old. Implement a lifecycle policy in Amazon S3 to move the unloaded data to S3 Glacier Deep Archive after the data is over 12 months old._

You can use Redshift Spectrum to access and query S3 data from Amazon Redshift. You do not need to keep data over 3 months old in Amazon Redshift. Instead, you can unload the data to Amazon S3. Then, you can use Redshift Spectrum for the yearly analysis. Additionally, S3 Glacier Deep Archive provides the most cost-effective option for long-term data storage for compliance reasons.  
Learn more about [Redshift Spectrum](https://docs.aws.amazon.com/redshift/latest/dg/c-using-spectrum.html).  
Learn more about [how to manage storage classes in Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-infreq-data-access).

---

**A finance company is storing paid invoices in an Amazon S3 bucket. After the invoices are uploaded, an AWS Lambda function uses Amazon Textract to process the PDF data and persist the data to Amazon DynamoDB. Currently, the Lambda execution role has the following S3 permission:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ExampleStmt",
      "Action": ["s3:*"],
      "Effect": "Allow",
      "Resource": ["*"]
    }
  ]
}
```

**The company wants to correct the role permissions specific to Amazon S3 according to security best practices. Which solution will meet these requirements?**

_Modify the Action to be: "s3:GetObject." Modify the Resource to be only the bucket ARN._

According to the principle of least privilege, permissions should apply only to what is necessary. The Lambda function needs only the permissions to get the object. Therefore, this solution has the most appropriate modifications.

Learn more about [least-privilege permissions](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege).

---

**A finance company has developed a machine learning (ML) model to enhance its investment strategy. The model uses various sources of data about stock, bond, and commodities markets. The model has been approved for production. A data engineer must ensure that the data being used to run ML decisions is accurate, complete, and trustworthy. The data engineer must automate the data preparation for the model's production deployment. Which solution will meet these requirements?**

_Use Amazon SageMaker workflows with an Amazon SageMaker ML Lineage Tracking step to prepare the data for the model._

SageMaker ML Lineage Tracking creates and stores information about the steps of an ML workflow. SageMaker ML Lineage Tracking gives you the ability to establish model governance and audit standards. SageMaker ML Lineage Tracking helps to ensure that the data being used to run ML decisions is accurate, complete, and trustworthy.  
Learn more about [SageMaker ML Lineage Tracking](https://docs.aws.amazon.com/sagemaker/latest/dg/lineage-tracking.html).

---

**A company is storing data in an Amazon S3 bucket. The company is in the process of adopting a new data lifecycle and retention policy. The policy is defined as follows:**

- **Any newly created data must be available online and will occasionally need to be analyzed with SQL.**
- **Data older than 3 years must be securely stored and made available when needed for compliance evaluation within 12 hours.**
- **Data older than 10 years must be securely deleted.**

**A data engineer must configure a solution that would ensure that the data is stored cost effectively according to the lifecycle and retention policy. Which solution will meet these requirements?**

_Store new data on the S3 Infrequent Access storage class. Query the data in-place on Amazon S3 with Amazon Athena. Create a lifecycle rule to migrate the data to the S3 Glacier Flexible Retrieval storage class after 3 years. Configure the lifecycle rule to delete the data after 10 years._

A solution that uses S3 Lifecycle policies ensures that data is stored cost effectively throughout the data lifecycle. You can lifecycle data to a cheaper storage class based on age when you have predictable usage patterns. You can use this solution to comply with lifecycle and retention policies. A solution that uses the S3 Infrequent-Access storage class will ensure that data is cost effectively made available for occasional analysis by using SQL with Athena. A lifecycle rule that migrates data to the S3 Glacier Flexible Retrieval storage class will ensure that data is available for compliance evaluation within 12 hours.  
Learn more about [S3 Lifecycles](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html).  
Learn more about [how to query S3 data with Athena](https://docs.aws.amazon.com/athena/latest/ug/using-athena-sql.html).

---
