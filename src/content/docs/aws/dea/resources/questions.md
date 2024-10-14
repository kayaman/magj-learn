---
title: Sample Questions
description: Skill Builder
sidebar:
  order: 2
tableOfContents: false
---

**Which option describes the responsibility of the data engineer and the data analyst?**

*The data engineer builds the system that delivers usable data to the data analyst, who analyzes the data to gain business insights.*

The data engineer builds a system that will deliver process and curated data for the data analyst. During the data discovery process, the data engineer can gather requirements from the data analyst so the system can deliver usable data.

---

**What are some key functions of the data engineer?**

- *They build and manage data infrastructure platforms.*
- *They catalog and document datasets.*
- *They ensure security and compliance.*

Some of the key data engineer functions are to build and manage data platforms, catalog datasets, and ensure security and compliance. Analyzing data, building visualization dashboards, and training ML models are typically the focus of the data scientist and data analyst.

---

**What is the best definition of data discovery?**

*The process of finding and understanding relevant data sources within an organization and the relationships between them*

Data discovery involves interactive sessions to identify key data sources and stakeholders, understand data, and determine how to maximize value from data through appropriate analysis and use cases. The other options describe parts of data discovery, but not the overall definition.

---

**What are the steps in the data discovery process?**

- *Identify key stakeholders and data sources across the organization.*
- *Discover existing data types and formats.*
- *Ingest and explore sample data to understand data types and structures.*

The data discovery process focuses on what data exists, how it can be accessed and transformed, and the ways to use it before defining implementation details.  
Establishing and testing disaster recovery routines is typically done after the discovery process when more information is known about the data landscape and requirements.   
Although reviewing documentation can provide useful background information, the data discovery process is more hands-on and involves interactive sessions with stakeholders.  
Ingesting, processing, and delivering data is the main function of the data analytics system itself, but not part of the discovery process.

---

**Which questions are typically asked during the data discovery process?**

- *Who are the key stakeholders and data owners?*
- *Which formats and types of data are available?*
- *How will the data be secured and accessed?*

Some typical data discovery questions focus on understanding the available data sources, formats, and volumes and establishing the high-level processing needs to maximize the value from data. Identifying the technical requirements for machine learning, which models are used, and which reference architectures are used come later in the process after the initial data discovery.

---

**What is meant by the term data silos?**

*Independent data stores that are optimized for specific uses and are difficult to combine or access by other systems*

Data silos refer to isolated and incompatible data stores that are optimized for departmental or individual use cases. They make it challenging to develop a unified view of organizational data. This siloed approach inhibits data sharing and prevents using data for new insights.

---

**Which option best describes a basic data analytics workflow?**

*Ingest → Store → Catalog → Process → Deliver*

Data analytics workflows vary to suit business needs, however most workflows follow the pattern of Ingest → Store → Catalog → Process → Deliver. Some of these stages are performed cyclically or iteratively.

---

**Why is a data catalog important in a data analytics system?**

*A data catalog acts as a single source of truth for metadata, and tracks data location and quality.*

The data catalog provides transparency into the data landscape by tracking data assets, where they are located, their quality, and how they are being used. This acts as a single source of truth for metadata.

---

**Which options are correct uses of AWS Step Functions in a data analytics workflow?**

- *Coordinating multiple AWS Glue extract, transform, and load (ETL) jobs that process data from different sources and load it into a data warehouse*
- *Orchestrating a machine learning workflow that involves data preprocessing, model training, evaluation, and deployment*
- *Performing batch processing jobs on data stored in Amazon S3 using AWS Batch*

Step Functions is used to coordinate and orchestrate the components of a data analytics workflow, but it does not store any metadata itself. Step Functions workflows can invoke other AWS services like AWS Glue for ETL, AWS Batch for job processing, and AWS Lambda for tasks. But services like DynamoDB are used independently to store metadata, not as part of the Step Functions workflow definition.

---

**Which options are benefits of using zero-ETL approaches on AWS?**

- *It streamlines data architecture and reduces data engineering efforts by automating custom extract, transform, and load (ETL) processes.*
- *It provides real-time insights through real-time or near real-time data access.*
- *It optimizes costs for organizations because it is based on actual usage and data processing needs.*

Zero-ETL aims to eliminate the need for custom ETL pipelines by using integrations and automation between AWS data and analytics services.

---

**Which option best describes a benefit of using serverless architectures for data analytics workloads on AWS?**

*Organizations can optimize costs by paying only for the resources consumed. Serverless services are billed based on actual usage rather than provisioned capacity.*

Serverless architectures are designed specifically to avoid provisioning and managing fleets of EC2 instances. Data encryption is always necessary, whether an architecture is serverless or server-based. With Serverless architectures, you do not directly deploy EC2 instances. Batch and scheduled workloads often use serverless architectures. One of the primary advantages of serverless architectures is cost optimization.

---

**What are typical considerations for securing data in AWS analytics environments?**

- *Implementing least privilege access and preventing unintended access to analytics infrastructure and data.*
- *Encrypting data at rest and in transit to protect sensitive information.*
- *Monitoring infrastructure for changes and user activity with alerts for abnormal behavior.*

Securing data in AWS analytics environments include implementing least privilege access controls, encrypting data, monitoring infrastructure security threats and anomalies, and auditing access. Automating the monitoring of changes helps maintain ongoing visibility and control over an environment subject to evolving analytics requirements. Referring to the AWS documentation on security best practices can provide more details about optimally configuring and managing security.

---

**What are some recommended monitoring best practices?**

- *Test and validate jobs. *
- *Integrate monitoring with visualization tools.*
- *Set up alerts for critical failures.*

It is important to test and validate transformation jobs on an ongoing basis to ensure quality is being maintained. Setting up alerts for failures is critical to catch problems early. Visualization of data can improve insights and make monitoring results more meaningful.  
Many users besides data scientists may need to access logs.  
Cost optimization and automation are not parts of monitoring workflows.

---

**Which options are areas or activities of data analytics systems that should be monitored?**

- *Job submission and completion times for batch jobs using services like AWS Step Functions*
- *Resource utilization of Amazon EC2 instances running analytics jobs to ensure they are not overused*
- *Application performance metrics like request latency and error rates using services like Amazon CloudWatch*

Some key areas and activities to be monitored include application performance, resource utilization, job statuses, data pipelines, streaming data, and application logs.  
Monitoring internal email and calendars, storage naming conventions, and Availability Zone locations are not required to ensure reliability, performance, and availability of the system. The AWS services like CloudWatch, AWS CloudTrail, and Step Functions are useful for monitoring various operational aspects of analytics workloads on AWS.

---

**Which metrics would be most useful to monitor when analyzing the performance of extract, transform, and load (ETL) jobs running on AWS Glue?**

- *Resource utilization of the Amazon EC2 instances running the ETL code*
- *ETL job durations*
- *ETL job failure and retry rates*

Resource utilization, job durations, and the rate of failures and retries are all important metrics to monitor. Inventory levels, open support cases, and warehouse capacity are important, but not critical measures of ETL processes.

---

**A data engineer is working for a startup that collects data from various sources and needs to build out a data pipeline on AWS. The pipeline will ingest raw data from Amazon S3 buckets, process and transform the data, and load it into a data warehouse hosted on Amazon Redshift. Which tasks would typically be the responsibility of the data engineer?**

*Writing extract, transform, and load (ETL) jobs to extract data from the raw files, transform it, and load it into the data warehouse*

The data engineer's core responsibilities would be building and maintaining the data pipelines to ingest and process data for analytical use. Designing schemas, creating dashboards, and defining KPI metrics relate more closely to the roles of data analyst, business analyst, or data scientist.

---

**A data engineer at a startup is building out the company's data infrastructure on AWS. The company has limited engineering resources and budget. They asked the data engineer to design a data processing pipeline that minimizes cost. Which option should the engineer prioritize to meet this requirement?**

*Building a serverless architecture using AWS Lambda, Amazon S3, and Amazon Athena instead of using provisioned services*

To optimize for cost with limited budget and engineering resources, a serverless architecture using Amazon S3, Athena, and Lambda could be the most cost-efficient approach. Using on-demand clusters rather than reserved instances and storing all data in Amazon S3 without optimization might incur higher and unnecessary costs. Provisioning high-capacity EMR clusters could also increase cost.

---

**A data engineer at a financial services company has been asked to build an analytics platform on AWS that will process sensitive customer financial data. Compliance and information security leaders have mandated the platform meet strict regulatory and security requirements. What should be the data engineer's top priority?**

*Implementing security controls like encryption, access controls, and data masking to protect sensitive data*

When working with regulated, sensitive data, implementing proper security controls should be the data engineer's top priority. Optimizing performance, building data pipelines, and using open source to reduce costs are important but secondary to security.

---

**A data engineer at a large e-commerce company has built various data processing pipelines on AWS that need to run on daily, weekly, and monthly schedules. They want to implement an orchestration layer to automate the scheduling and operation of these pipelines. Which tools would BEST fit this requirement?**

*AWS Step Functions with AWS Lambda and AWS Glue to schedule and automate data-driven workflows*

Step Functions, along with Lambda and AWS Glue, is designed to automate the scheduling, orchestrating, and monitoring of data processing workflows and pipelines. OpsWorks, CodeDeploy, and AWS Config are unrelated to orchestration of data pipelines.

---

**A large retail company wants to gain insights from customer purchase data to improve their marketing strategies. Which role would a data engineer play in the data discovery process?**

*Work with business stakeholders to understand their goals and define key metrics. Analyze data sources and processing requirements. Recommend modern data architecture*

The best choice is that the data engineer would work with stakeholders to understand requirements, analyze existing data landscape, and recommend the best modern analytics solution. Owning data access policies, building machine learning models, and deploying a data mesh represent important ongoing activities. However, they are not the primary focus during the initial data discovery process.

---

**A data analyst is working for a large ecommerce company. Their team needs to store and analyze sales data from the past 5 years, which amounts to approximately 10 TB of data. They will access this data frequently for reporting and analysis purposes. Additionally, the data analyst has a smaller amount of archived sales data from the past 10 years (about 2 TB) that is rarely accessed but must be retained for compliance purposes.**    
**Which combination of Amazon S3 storage classes is the most appropriate and cost-effective for storing and accessing this data?**

*Store the 10 TB of frequently accessed data in S3 Standard and the 2 TB of archived data in S3 Glacier Deep Archive.*

S3 Standard is the most suitable storage class for frequently accessed data because it provides low-latency and high-throughput access. For the archived data that is rarely accessed, S3 Glacier Deep Archive is the most cost-effective option, offering the lowest storage costs for long-term archival data.  
S3 Standard-IA is designed for data that is infrequently accessed but requires rapid access when needed. Because the 10 TB of data is frequently accessed, S3 Standard is a better choice. Additionally, S3 Glacier Flexible Retrieval might not be the most cost-effective option for the archived data because S3 Glacier Deep Archive offers lower storage costs for long-term archival data.  
S3 One Zone-IA is designed for data that is infrequently accessed and can tolerate a higher level of risk by storing data in a single Availability Zone. However, because the 10 TB of data is frequently accessed, S3 Standard is a better choice. Additionally, S3 Intelligent-Tiering is designed for data with unknown or changing access patterns. It might not be the most cost-effective option for the archived data that is rarely accessed.  
S3 Standard is a suitable choice for the frequently accessed data. However, S3 Glacier Flexible Retrieval is designed for archives with unpredictable retrieval needs. It might not be the most cost-effective option for the archived data that is rarely accessed. S3 Glacier Deep Archive is a more cost-effective choice for long-term archival data.

---

**Which AWS service is the best option to migrate data from on-premises or cloud-based relational databases to Amazon S3?**

*AWS Database Migration Service (AWS DMS)*

AWS DMS is a cloud service that can be used to migrate data from on-premises or cloud-based relational databases to Amazon S3 to build a data lake.  
DataSync is used for transferring data between on-premises storage and Amazon S3, Amazon Elastic File System (Amazon EFS), or Amazon FSx. It is not used for migrating data from databases to Amazon S3.  
AWS Glue is a fully managed extract, transform, and load (ETL) service that can be used for data integration tasks. While you can use AWS Glue to connect to relational databases and read data from tables, it is not used to handle database migrations tasks. DMS is purpose built for this task.  
Lake Formation is a service that helps to build, secure, and manage data lakes, but it does not perform data migration from databases to Amazon S3.

---

**Which AWS service can be used to efficiently transfer large amounts of file-based data from on-premises or cloud-based storage to Amazon S3 in a continuous fashion?**

*AWS DataSync*

AWS DataSync is a data transfer service that can be used to efficiently transfer large amounts of file-based data from on-premises or cloud-based storage systems to Amazon S3. This makes it suitable for ingesting data into a data lake.  
AWS DMS is used for migrating data from databases, not for transferring data from storage systems to Amazon S3.  
AWS Snowball is a data migration solution that involves physically shipping storage devices, which might not be as efficient for regular data ingestion into a data lake.  
Firehose is used for ingesting and delivering streaming data, but it is not optimized for transferring large amounts of static data from storage systems to Amazon S3.

---

**Which of these are DMS capabilities?**

- *Perform a full load of existing tables and replicating change data capture events (inserts, deletes, updates)  in a continuous mode.*
- *Automatic population of Glue Data Catalog with tables definitions during migration tasks.*

DMS can perform full load replication tasks in a continuous mode.  
DMS can be configured to automatically populate the Glue Data catalog while performing a migration task.  
DMS supports writing both in CSV as well as Parquet format.  
DMS does not support replicating CDC on a schedule.

---

**What is the primary purpose of AWS Glue Data Catalog?**

*To store and manage metadata (for example location and schema) about data sets*

AWS Glue Data Catalog is a centralized metadata repository that stores information about data sources like locations, partitions  and schemas, . Use it to discover, access, and manage data across various data stores and analytics applications.  
AWS Glue Data Catalog does not provide compute processing capabilities. For real-time data streaming and analytics use  AWS Glue ETL streaming jobs or Spark Structured Streaming  Jobs in Amazon EMR or Amazon Managed Service for Apache Flink.  
AWS Glue Data Catalog is not a Hadoop cluster. For managed Hadoop clusters, use Amazon EMR.  
AWS Glue Data Catalog is not a data warehousing or querying service. For serverless data warehousing and querying, use Amazon Athena or Amazon Redshift.

---

**Which statement about AWS Glue Data Catalog is true?**

*It integrates seamlessly with other AWS analytics services, like Amazon Athena and Amazon EMR.*

Data Catalog is designed to work seamlessly with other AWS analytics services like Amazon Athena, Amazon EMR, and AWS Glue extract, transform, and load (ETL) jobs. With Data Catalog, these services can access and process data from various sources using the centralized metadata.  
Data Catalog supports metadata for data stored in various data sources, including Amazon S3, Amazon RDS and on-premises databases.  
Data Catalog does not automatically discover and catalog data sources. Manually define data sources or use AWS Glue crawlers to automatically scan and infer metadata from data sources.  
Although metadata can be manually defined in the AWS Glue Data Catalog, there are also automated tools, like AWS Glue crawlers, to extract and populate metadata from data sources.

---

**Which statement about using AWS Glue Data Catalog in a data analytics workflow is correct?**

*It makes it possible to discover, access, and combine data from multiple sources for analysis and reporting.*

Data Catalog makes it possible to discover, access, and combine data from various sources for analysis and reporting within the data analytics workflow.  
Although Data Catalog is commonly used in batch data processing workflows, it can also support real-time analytics. It provides metadata about streaming data sources and integrating with services like Amazon Kinesis.  
Data Catalog does not provide data transformation capabilities. For data transformation and extract, transform, and load (ETL) jobs, use AWS Glue ETL or other services, like AWS Lambda or Amazon EMR.  
Data Catalog is a metadata repository not a fully managed data lake solution. It works with various data storage services, like Amazon S3 (for data lake) and Amazon RDS and Amazon Redshift (for data warehousing).

---

**Which AWS service is used to extract, transform, and load (ETL) data in a data analytics system?**

*AWS Glue*

AWS Glue is the correct answer because it is a serverless data integration service that provides ETL capabilities for preparing and loading data into data stores for analytics.

---

**What is the primary benefit of using AWS Glue Studio Visual extract, transform, and load (ETL) for data transformation?**

*Automatic code generation*

AWS Glue Studio Visual ETL automatically generates the code to invoke data transformations based on the specifications provided, eliminating the need for manual coding.

---

**What are features of AWS Glue?**

- *Job scheduling*
- *Real-time or batch data processing*
- *Data cataloging*

AWS Glue is primarily designed for streaming or batch-based extract, transform, and load (ETL) processes. AWS Glue can be used to schedule ETL jobs. With AWS Glue it is also possible to achieve Real-time streaming analytics.  
AWS Glue does not perform image recognition or manage users, and is not used for cost optimization.

---

**Which statement best describes the benefit of using Amazon Athena and Amazon QuickSight together?**

*Athena and QuickSight provide a cost-effective and scalable solution for querying and visualizing data Amazon S3 without the need to provision or manage any infrastructure.*

Together, Athena and QuickSight provide a serverless and scalable solution without the need to provision or manage any infrastructure. With Athena, you can use SQL to query data stored in Amazon S3. With QuickSight, you can create interactive dashboards and visualizations from that data.   
Athena is more suitable for impromptu, batch-oriented SQL queries on data stored in Amazon S3, which may not be ideal for real-time monitoring use cases. For a real-time monitoring dashboard, Amazon OpenSearch Service and its dashboarding capabilities may be a better choice compared to Amazon Athena and Amazon QuickSight.  
You can build Quicksight dashboards using queries on Athena tables as sources.   
Together, Athena and QuickSight provide a way to query and visualize data, but they do not constitute a complete, fully managed data warehouse solution. They are separate AWS services that integrate well, but each has its own distinct purpose and capabilities. 

---

**Which term represents an AWS Glue Data Catalog object that stores login credentials, URI strings, virtual private cloud (VPC) information, and more for a particular data store?**

*An AWS Glue connection*

An AWS Glue connection is a Data Catalog object that stores login credentials, URI strings, virtual private cloud (VPC) information, and more for a particular data store.

---

**You are working on an ETL pipeline that involves extracting data from multiple sources, transforming it using complex computations and aggregations, and then loading it into Amazon Redshift. Which AWS service would be most suitable for the transformation step of this pipeline?**

*Amazon EMR*

For complex or computationally intensive transformations, **Amazon EMR (Elastic MapReduce)** is the most suitable choice. Amazon EMR provides a managed Hadoop system that includes tools like Apache Spark, Apache Hive, and Apache Pig, which can be used for data transformation tasks involving complex computations, aggregations, and joining data from multiple sources. AWS Glue is suitable for simpler transformations, while Lambda is more suitable for event-driven processing and not recommended for computationally intensive tasks.

---

**What is a SPICE query?**

*An in-memory data store that Amazon QuickSight uses to accelerate query performance*

SPICE is an **in-memory data store that Amazon QuickSight uses to accelerate query performance**. When you load data into SPICE, QuickSight automatically optimizes the data for fast queries. SPICE is optimized for aggregations, filtering, and grouping operations, which means that it is ideal for interactive data exploration and dashboards.

---

**What is the name for clusters that you want to share data from?**

*Datashare producers*

Datashare producers (also known as data sharing producers or datashare producers) are clusters that you want to share data from. Producer cluster administrators and database owners can create datashares using the CREATE DATASHARE command.

---

**How does Amazon Redshift Spectrum integrate with the AWS data lake?**

*Redshift Spectrum integrates seamlessly with the AWS data lake stored in Amazon S3. It can query structured and semi-structured data formats directly.*

Redshift Spectrum integrates seamlessly with the AWS data lake stored in Amazon S3. It can query structured and semi-structured data formats directly. Amazon Redshift Spectrum resides on dedicated Amazon Redshift servers that are independent of your cluster. Redshift Spectrum queries employ massive parallelism to run very fast against large datasets.

---

**Which services can be used to ingest batch data into Amazon Redshift?**

- *AWS Glue*
- *Amazon EMR*

AWS Glue and Amazon EMR are the services used to ingest batch data into Amazon Redshift. When ingesting data from batch sources into Amazon Redshift, it's essential to consider factors such as data volume, data format, transformation requirements, and the frequency of data ingestion.

---

**What is the name for pre-computed views that store the result of a complex queries on large tables for faster access in Amazon Redshift?**

*Materialized views*

Materialized views in Amazon Redshift are pre-computed views that store the result of a complex queries on large tables for faster access. They provide improved query performance by minimizing the need to recalculate the underlying queries when the same or similar queries are performed repeatedly.

---

**In Amazon QuickSight, what is the difference between using Super-fast, Parallel, In-memory Calculation Engine (SPICE) and a direct query when connecting to Amazon Redshift?**

*SPICE is an in-memory data store optimized for fast queries, whereas direct query connects directly to Amazon Redshift for real-time data access.*

SPICE is an in-memory data store optimized for fast queries, whereas direct query connects directly to Amazon Redshift for real-time data access. QuickSight uses SPICE to accelerate query performance. When data is loaded data into SPICE, QuickSight automatically optimizes the data for fast queries. SPICE is optimized for aggregations, filtering, and grouping operations, which means that it is ideal for interactive data exploration and dashboards.

---

**A data analyst needs to access the latest data across operational databases and combine it with historical data in Amazon Redshift for real-time reporting. Which Amazon Redshift feature should they use?**

*Federated queries*

They should use federated queries. By using federated queries in Amazon Redshift, the analyst can query and analyze data across operational databases, data warehouses, and data lakes. They can integrate queries from Amazon Redshift on live data in external databases with queries across the Amazon Redshift and Amazon S3 environments. Federated queries can work with external databases in Amazon RDS for PostgreSQL, Amazon Aurora PostgreSQL-Compatible Edition, Amazon RDS for MySQL, and Amazon Aurora MySQL-Compatible Edition.

---

**What is the purpose of the GROUPING SETS, ROLLUP, and CUBE extensions in Amazon Redshift?**

*To perform multiple GROUP BY operations in a single statement*

Amazon Redshift supports aggregation extensions to do the work of multiple GROUP BY. Use GROUPING SETS, ROLLUP, and CUBE extensions in Amazon Redshift to perform multiple GROUP BY operations in a single statement.

---

**Which Amazon Redshift feature can be used to scale compute resources independently from storage to accommodate growing data volumes?**

*Redshift Managed Storage (RMS)*

The feature is Redshift Managed Storage (RMS). Data warehouse data is stored in a separate storage tier. RMS provides the ability to scale your storage to petabytes using Amazon S3 storage. With RMS, organizations can scale and pay for computing and storage independently. It automatically uses high-performance SSD-based local storage as tier-1 cache.

---

**A data analyst wants to implement a data transformation pipeline that can handle large volumes of data and complex transformations. Which combination of AWS services would be most suitable for this task?**

*AWS Step Functions and AWS Glue*

Throughout the entire extract, transform, and load (ETL) workflow, Step Functions orchestrates running AWS Glue jobs. Step Functions provides monitoring and logging capabilities to track the progress of the workflow and troubleshoot any issues that might arise. The combination of services is AWS Step Functions and AWS Glue.

---

## Official Practice Question Set

**A company is using an Amazon S3 data lake. The company ingests data into the data lake by using Amazon Kinesis Data Streams. The company reads and processes the incoming data from the stream by using AWS Lambda. The data being ingested has highly variable and unpredictable volume. Currently, the IteratorAge metric is high at peak times when a high volume of data is being posted to the stream. A data engineer must design a solution to increase performance when reading Kinesis Data Streams with Lambda. Which solution will meet these requirements?**

- *Increase the number of shards for the Kinesis data stream.*
- *Test different parallelization factor settings to find the most performant.*
- *Register the Lambda function as a consumer with enhanced fan-out.*

By default, Lambda will create one concurrent instance of the Lambda function for each shard. If you have three shards, you will have three concurrent functions. A high IteratorAge implies that the last record that is read from the Kinesis data stream is increasing in age. A high IteratorAge could mean that the data is not being processed in a timely manner. One way to increase throughput when you use Kinesis Data Streams and Lambda is to reshard. To reshard is to increase the number of shards for Kinesis Data Streams. If there are more shards, there will be more Lambda function invocations that concurrently process data.  
By default, all consumers of a Kinesis data stream share throughput across consumers. Sharing can restrict throughput for any one consumer, such as the Lambda function that processes the data. A high IteratorAge implies that the last record that is read from the Kinesis data stream is increasing in age. A high IteratorAge could mean that the data is not being processed in a timely manner. One way to increase throughput when you use Kinesis Data Streams and Lambda is to register the Lambda function as a consumer with enhanced fan-out. This solution would give the Lambda function dedicated throughput capacity for the Kinesis data stream. Therefore, this solution could increase performance.  
Learn more about [enhanced fan-out consumers and Kinesis](https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html#services-kinesis-configure).

---

**A company is running an Amazon Redshift data warehouse on AWS. The company has recently started using a software as a service (SaaS) sales application that is supported by several AWS services. The company wants to transfer some of the data in the SaaS application to Amazon Redshift for reporting purposes. A data engineer must configure a solution that can continuously send data from the SaaS application to Amazon Redshift. Which solution will meet these requirements with the LEAST operational overhead?**

*Create an Amazon AppFlow flow to ingest the selected source data to Amazon Redshift. Configure the flow to run on event.*

With Amazon AppFlow, a flow transfers data between a source and a destination. Amazon AppFlow supports many AWS services and SaaS applications as sources or destinations. A solution that uses Amazon AppFlow can continuously send data from the SaaS application to Amazon Redshift with the least operational overhead.  
Learn more about [Amazon AppFlow flows](https://docs.aws.amazon.com/appflow/latest/userguide/create-flow-console.html).

---

**An ecommerce company is running an application on AWS. The application sources recent data from tables in Amazon Redshift. Data that is older than 1 year is accessible in Amazon S3. Recently, a new report has been written in SQL. The report needs to compare a few columns from the current year sales table with the same columns from tables with sales data from previous years. The report runs slowly, with poor performance and long wait times to get results. A data engineer must optimize the back-end storage to accelerate the query. Which solution will meet these requirements MOST efficiently?**

*Run the report SQL statement to gather the data from Amazon S3. Store the result set in an Amazon Redshift materialized view. Configure the report to run SQL REFRESH. Then, query the materialized view.*

You can use Redshift materialized views to speed up queries that are predictable and repeated. A solution that runs SQL REFRESH on the materialized view would ensure that the latest data from the current sales table is included in the report.  
Learn more about [Redshift materialized views](https://docs.aws.amazon.com/redshift/latest/dg/materialized-view-overview.html).

---

**A data engineer has created a new account to deploy an AWS Glue extract, transform, and load (ETL) pipeline. The pipeline jobs need to ingest raw data from a source Amazon S3 bucket. Then, the pipeline jobs write the transformed data to a destination S3 bucket in the same account. The data engineer has written an IAM policy with permissions for AWS Glue to access the source S3 bucket and destination S3 bucket. The data engineer needs to grant the permissions in the IAM policy to AWS Glue to run the ETL pipeline. Which solution will meet these requirements?**

*Create a new IAM service role for AWS Glue. Attach the policy to the new role. Configure AWS Glue to use the new role.*

Permissions for AWS Glue are granted through an IAM service role for AWS Glue. A default role exists in the account with loose permissions that allow the service to use any S3 bucket. You can create and attach a new IAM role to AWS Glue. This solution would give you the ability to use more strict permissions in the AWS Glue jobs.  
Learn more about [how to grant permissions so that AWS Glue can access other AWS services](https://docs.aws.amazon.com/glue/latest/dg/create-an-iam-role.html).

---

**An ecommerce company runs several applications on AWS. The company wants to design a centralized streaming log ingestion solution. The solution needs to be able to convert the log files to Apache Parquet format. Then, the solution must store the log files in Amazon S3. The number of log files being created varies throughout the day. A data engineer must configure a solution that ensures the log files are delivered in near real time. Which solution will meet these requirements with the LEAST operational overhead?**

*Configure the applications to send the log files to Amazon Kinesis Data Firehose. Configure Kinesis Data Firehose to invoke an AWS Lambda function that converts the log files to Parquet format. Configure Kinesis Data Firehose to deliver the Parquet files to an output S3 bucket.*

You can use Kinesis Data Firehose to deliver log files to Amazon S3 with the least operational overhead. You can use a data-transformation Lambda function with Kinesis Data Firehose. This solution can convert log files to the correct format before the log files are delivered to Amazon S3.  
Learn more about [how to transform incoming source data with Lambda functions on Kinesis Data Firehose](https://docs.aws.amazon.com/firehose/latest/dev/data-transformation.html).

---

**A company is collecting data that is generated by its users for analysis by using an Amazon S3 data lake. Some of the data being collected and stored in Amazon S3 includes personally identifiable information (PII). The company wants a data engineer to design an automated solution to identify new and existing data that needs PII to be masked before analysis is performed. Additionally, the data engineer must provide an overview of the data that is identified. The task of masking the data will be handled by an application already created in the AWS account. The data engineer needs to design a solution that can invoke this application in real time when PII is found. Which solution will meet these requirements with the LEAST operational overhead?**

*Enable Amazon Macie in the AWS account. Create an Amazon EventBridge rule for the default event bus for Macie findings. Set the masking application as the target for the rule.*

Macie can analyze data in S3 buckets and determine if the data contains sensitive data like PII. Macie creates findings based on its analysis. Users can view the findings as a report in the AWS Management Console. Macie can also create events that are sent to the default event bus for EventBridge. You can create a rule that filters the findings being generated by Macie. Then, EventBridge can invoke the masking application. This solution meets all requirements and has the lowest operational overhead.  
Learn more about [Macie and EventBridge integration](https://docs.aws.amazon.com/macie/latest/user/findings-monitor-events-eventbridge.html).

---

**A company ingests data into an Amazon S3 data lake from multiple operational sources. The company then ingests the data into Amazon Redshift for a business analysis team to analyze. The business analysis team requires access to only the last 3 months of customer data. Additionally, once a year, the company runs a detailed analysis of the past year's data to compare the overall results of the previous 12 months. After the analysis and comparison, the data is no longer accessed. However, the data must be kept after 12 months for compliance reasons. Which solution will meet these requirements in the MOST cost-effective manner?**

*Ingest 3 months of data into Amazon Redshift. Automate an unload process from Amazon Redshift to Amazon S3 after the data is over 3 months old. Use Amazon Redshift Spectrum for the yearly analysis to include data up to 12 months old. Implement a lifecycle policy in Amazon S3 to move the unloaded data to S3 Glacier Deep Archive after the data is over 12 months old.*

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

*Modify the Action to be: "s3:GetObject." Modify the Resource to be only the bucket ARN.*

According to the principle of least privilege, permissions should apply only to what is necessary. The Lambda function needs only the permissions to get the object. Therefore, this solution has the most appropriate modifications.

Learn more about [least-privilege permissions](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege).

---

**A finance company has developed a machine learning (ML) model to enhance its investment strategy. The model uses various sources of data about stock, bond, and commodities markets. The model has been approved for production. A data engineer must ensure that the data being used to run ML decisions is accurate, complete, and trustworthy. The data engineer must automate the data preparation for the model's production deployment. Which solution will meet these requirements?**

*Use Amazon SageMaker workflows with an Amazon SageMaker ML Lineage Tracking step to prepare the data for the model.*

SageMaker ML Lineage Tracking creates and stores information about the steps of an ML workflow. SageMaker ML Lineage Tracking gives you the ability to establish model governance and audit standards. SageMaker ML Lineage Tracking helps to ensure that the data being used to run ML decisions is accurate, complete, and trustworthy.  
Learn more about [SageMaker ML Lineage Tracking](https://docs.aws.amazon.com/sagemaker/latest/dg/lineage-tracking.html).

---

**A company is storing data in an Amazon S3 bucket. The company is in the process of adopting a new data lifecycle and retention policy. The policy is defined as follows:**

- **Any newly created data must be available online and will occasionally need to be analyzed with SQL.**
- **Data older than 3 years must be securely stored and made available when needed for compliance evaluation within 12 hours.**
- **Data older than 10 years must be securely deleted.**

**A data engineer must configure a solution that would ensure that the data is stored cost effectively according to the lifecycle and retention policy. Which solution will meet these requirements?**

*Store new data on the S3 Infrequent Access storage class. Query the data in-place on Amazon S3 with Amazon Athena. Create a lifecycle rule to migrate the data to the S3 Glacier Flexible Retrieval storage class after 3 years. Configure the lifecycle rule to delete the data after 10 years.*

A solution that uses S3 Lifecycle policies ensures that data is stored cost effectively throughout the data lifecycle. You can lifecycle data to a cheaper storage class based on age when you have predictable usage patterns. You can use this solution to comply with lifecycle and retention policies. A solution that uses the S3 Infrequent-Access storage class will ensure that data is cost effectively made available for occasional analysis by using SQL with Athena. A lifecycle rule that migrates data to the S3 Glacier Flexible Retrieval storage class will ensure that data is available for compliance evaluation within 12 hours.  
Learn more about [S3 Lifecycles](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html).  
Learn more about [how to query S3 data with Athena](https://docs.aws.amazon.com/athena/latest/ug/using-athena-sql.html).

---

