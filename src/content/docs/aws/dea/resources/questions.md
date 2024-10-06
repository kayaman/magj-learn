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

