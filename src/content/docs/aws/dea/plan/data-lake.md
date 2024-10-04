---
title: A Data Lake Solution
sidebar:
    order: 2
    tableOfContents:
        minHeadingLevel: 2
        maxHeadingLevel: 4
---

## Introduction

### Typical tasks in building a data lake on AWS

![Typical tasks in building a data lake on AWS](/img/typical-data-lake.png)

1. Set up storage

    Amazon Simple Storage Service (Amazon S3) serves as the foundation and primary data lake storage.

2. Ingest data

    AWS Database Migration Service (AWS DMS) is used for connecting to on-premises databases and ingesting the data into the Amazon S3 data lake.  
    AWS DataSync is used for replicating data from on-premises network attached storage (NAS) into Amazon S3.

3. Build Data Catalog

    AWS Glue crawlers are used to crawl the data in Amazon S3 and then store the discovered metadata (such as table definitions and schemas) into the AWS Glue Data Catalog.

4. Process data

    After the data is cataloged, AWS Glue jobs can now be used to transform, enrich, and load data into the appropriate S3 buckets or zones.

5. Set up security

    AWS Lake Formation provides unified governance to centrally manage data security, access control, and audit trails.

6. Serve data for consumption

    Amazon Redshift serves as the data warehouse for running low latency and complex SQL queries on structured data.  
    Amazon Athena is used to perform one-time or impromptu queries.  
    Amazon QuickSight is used for business intelligence and data visualization dashboards.

### Benefits of AWS data lakes

A data lake is an architectural approach that you can use to store all your data in a centralized repository. It can then be accessed, transformed, and analyzed by the appropriate set of users and tools. It's essential to be strategic in managing your data and ensure that data quality, governance, and security measures are in place.

- Scalability

  By storing large volumes and varieties of datasets together, an AWS data lake solution helps you generate data-driven insights using the appropriate tools for the job.

- Discoverability

  Data lakes give you the ability to discover what data is in the lake through crawling, cataloging, and indexing of data. They also ensure that all your data assets are protected.

- Shareability

  Data lakes make it possible for various roles, such as data scientists, data developers, and business analysts, to access data with their choice of analytics and machine learning (ML) tools.

- Agility

  With the most serverless options in the cloud, AWS helps reduce your undifferentiated heavy lifting of infrastructure provisioning and management.

## Set Up Storage

### Amazon S3 for data lakes

| Feature | Description |
|---------|-------------|
| Scalability | Amazon S3 is an exabyte-scale object store for storing any type of data. You can store structured data (such as relational data), semi-structured data (such as JSON, XML, and comma-separated values, or .csv, files), and unstructured data (such as images or media files). You can start small and grow your data lake as needed, with no compromise on performance or reliability. |
| Durability | Amazon S3 is designed to deliver 99.999999999 percent (11 nines) data durability. Amazon S3 Standard automatically creates copies of all uploaded objects and stores them across at least three Availability Zones. This means your data is protected by a Multi-AZ resiliency model and against site-level failures. S3 One Zone-Infrequent Access (S3 One Zone-IA) creates copies in one Availability Zone. |
| Security | Amazon S3 is designed to provide unmatched cloud storage security and compliance across all storage classes, including identity and access management, inventory scanning, automatic encryption, and more. |
| Availability | Amazon S3 storage classes are designed to provide a range of object availability between 99.5 and 99.99 percent in a given year. This is backed by some of the strongest service-level agreements (SLAs) in the cloud. |
| Cost | Data asset storage is often a significant portion of the costs associated with a data lake. By building a data lake on Amazon S3, you only pay for the data storage and data processing services that you actually use as you use them. |

**Amazon S3**  
To learn more, go to the [Amazon Simple Storage Service User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html). 

**Amazon S3 and data lakes**  
To learn more, go to **Central Storage: Amazon S3 as the Data Lake Storage Platform** in the [Storage Best Practices for Data and Analytics Applications](https://docs.aws.amazon.com/whitepapers/latest/building-data-lakes/amazon-s3-data-lake-storage-platform.html) AWS Whitepaper.

### Data lake zones or layers

An effective data lake zones or layers strategy helps with data organization, data integrity, and access controls. The following is a common three zone approach to align with the stages of a data pipeline.

![Zones](/img/dl-zones.png)

|   |   |   |
|---|---|---|
| The raw zone stores the raw data as it is ingested into the data lake. To preserve data integrity, it is recommended to retain the original file format and turn on versioning in this S3 bucket. | The cleaned zone stores processed or transformed data. For example, filtering anomalies, standardizing formats, and correcting values that are not valid. | The curated Zone stores merged, aggregated, and quality-assured data for specific use cases in a consumption-ready format. |

The following are some additional S3 buckets to consider.

| Bucket |	Description |
|--------|--------------|
| **Landing Zone** | When working with sensitive data (for example, personally identifiable information, or PII), it is recommended to use an additional S3 bucket as a landing zone. Mask the data before it is moved into the raw zone. |
| **Logs Zone** | This zone is used for logs for Amazon S3 and other services in the data lake architecture. The logs can include S3 Access Logs, Amazon CloudWatch log files, or AWS CloudTrail log files. |
| **Archived Zone** | This zone is used for storing infrequently accessed, historical, or compliance-related data. |
| **Sandbox Zone** | This zone is used for exploratory analysis and experimentation. |

**Storage best practices**  
To learn more, see **Data Lake Foundation** in the [Storage Best Practices for Data and Analytics Applications AWS Whitepaper](https://docs.aws.amazon.com/whitepapers/latest/building-data-lakes/data-lake-foundation.html).

**Defining Amazon S3 bucket names**  
To learn more, see **Defining S3 Bucket and Path Names for Data Lake Layers on the AWS Cloud** in the [AWS Prescriptive Guidance](https://docs.aws.amazon.com/prescriptive-guidance/latest/defining-bucket-names-data-lakes/welcome.html).

### Amazon S3 storage classes

| Storage Class for Automatically Moving Objects | Storage Classes for Frequently Accessed Objects	| Storage Classes for Infrequently Accessed Objects |	Storage Classes for Archiving Objects |
|---|---|---|---|
| **S3 Intelligent-Tiering** <br> This storage class provides automatic cost savings for data with unknown or constantly changing access patterns. It automatically moves data to the most cost-effective storage tier without any performance impact or operational burden. | **S3 Standard** <br> This is general purpose storage for active, frequently accessed data. <br><br> **S3 Express One Zone** <br> This is a high-performance, Single-AZ storage class that is purpose-built to deliver the lowest latency storage for your most frequently accessed data. With this storage class, data is stored in a different bucket type—an S3 directory bucket—which supports hundreds of thousands of requests each second. | **S3 Standard-Infrequent Access (S3 Standard-IA)** <br> This is low-cost storage for data accessed monthly and requires milliseconds retrieval. <br><br> **S3 One Zone-Infrequent Access (S3 One Zone-IA)** <br> This is low-cost storage for infrequently accessed data in a Single-AZ. | **S3 Glacier Instant Retrieval** <br> This is low-cost storage for long-lived data that is accessed a few times each year and requires milliseconds retrieval. <br><br> **S3 Glacier Flexible Retrieval** <br> This is low-cost storage for long-lived data used for backups and archives, with bulk data retrieval from minutes to hours. <br><br> **S3 Glacier Deep Archive** <br> This is the lowest-cost storage for long-term archived data that is rarely accessed, with retrieval in hours. |

**Amazon S3 storage classes**  
To learn more, see [Amazon S3 Storage Classes](https://aws.amazon.com/s3/storage-classes/).

**Optimizing storage costs**  
To learn more, see [Optimizing Storage Costs Using Amazon S3](https://aws.amazon.com/s3/cost-optimization/).

### S3 lifecycle policies

You can configure S3 Lifecycle rules to manage storage costs. They can automatically migrate data assets to a lower cost tier of storage such as the S3 Standard-IA or Amazon S3 Glacier Flexible Retrieval storage class . Rules can also be set up to expire assets when they are no longer needed.

#### Lifecycle policy considerations

To help you decide when to transition the right data to the right storage class, use Amazon analytics S3 Storage Class Analysis. After using storage class analysis to monitor access patterns, you can use the information to configure S3 Lifecycle policies to make the data transfer to the appropriate storage class. 

The following are guidelines to consider when implementing lifecycle policies:

- If your bucket is versioned, ensure that there is a rule action for both current and noncurrent objects to either transition or expire.
- If you are uploading objects using multipart upload, there might be situations when the uploads fail or do not finish. The incomplete uploads remain in your buckets and are chargeable. You can configure lifecycle rules to automatically clean up incomplete multipart uploads after a certain time period.
- To have a single lifecycle policy for all the source datasets (instead of one for each source prefix), you can keep all source data under one prefix.
- S3 Lifecycle transition costs are directly proportional to the number of objects transitioned. Reduce the number of objects by aggregating or zipping and compressing them before moving them to archive tiers.

**Amazon S3 storage lifecycle**  
To learn more, see **Managing Your Storage Lifecycle** in the [Amazon S3 User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/analytics-storage-class.html).

**Amazon S3 storage classes**  
To learn more, see **Storage Class Analysis** in the [Amazon S3 User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/analytics-storage-class.html).

### Additional Amazon S3 optimization techniques

The following are additional Amazon S3 performance and cost optimization techniques to consider.


- Using S3 object tagging

    S3 object tagging is used to granularly control access, analyze usage, manage lifecycle policies, and replicate objects.

- Assessing your storage activity and estimating your costs

    As your data lake grows, it can become increasingly complicated to assess usage of the data across your organization, evaluate your security posture, and optimize costs. 
    Amazon S3 Storage Lens gives you visibility into your object storage across your organization with point-in-time metrics and actionable insights. It helps you visualize trends, identify outliers, and receive recommendations for storage cost optimization. You can generate insights at organization, account, AWS Region, bucket, and prefix level. For more information, see [S3 Storage Lens](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens.html).  
    The following are some of the insights you can access from the S3 Storage Lens dashboard.
    - Bucket size, object size, and object count
    - Data distribution on different storage classes
    - Non-encrypted data
    - Multiple versions of objects
    - Incomplete multipart uploads
    - Cold buckets (that have not been accessed for a long time)
    - AWS Pricing Calculator is a web-based planning tool that you can use to create cost estimates for using AWS services. For more information, see [AWS Pricing Calculator](https://calculator.aws/).
    You can use Pricing Calculator for the following use cases:  
    - Model your solutions before building them.
    - Explore price points for AWS services.
    - Review the calculations for your estimates.
    - Plan your AWS spend.
    - Find cost-saving opportunities.
  
  - Considering a single account or multi-account strategy

    The following are factors to consider when deciding whether to use a single AWS account or multi-account strategy for your data lake initiative.

    | Factor | Account strategy |
    |--------|------------------|
    | You have a central IT department with data integration and security teams. | Single account |
    | You are a large organization with multiple lines of business (LOBs) that operate independently and have separate IT departments. | Multi-account |
    | You are getting started with a proof of concept (POC) or minimal viable product (MVP) and want a straightforward setup. | Single account |

    If you are undecided, you can start with a single AWS account and then shift to a multi-account strategy.





### Resources

**Optimizing Amazon S3 performance**  
To learn more, see **Best Practices Design Patterns: Optimizing Amazon S3 Performance** in the [Amazon Simple Storage Service User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance.html).

**Cost optimization in analytics**  
To learn more, see **Cost Optimization in Analytics Services: Storage** in the [Cost Modeling Data Lakes for Beginners Whitepaper](https://docs.aws.amazon.com/whitepapers/latest/cost-modeling-data-lakes/cost-optimization-in-analytics-services.html#storage).

## Ingest Data

### AWS DMS

AWS DMS can ingest data into your AWS data lake from various data stores, such as relational databases, NoSQL databases, and data warehouses. AWS DMS can migrate from database to database, and from database to other storage, such as Amazon S3.

By shifting analytical and transformation tasks to your data lake environment, you can reduce the computational load and demand on your source databases and business-critical applications.

![DMS](/img/dms-flow.png)

1. Source database

    The source database can be located in an on-premises or cloud-based system.

2. Source endpoint

    The source endpoint provides connection, data store type, and location information about the source data store.  
    AWS DMS uses this information to make a connection. 

3. Replication instance

    This is the compute resource that will be used to perform the replication tasks.

4. Replication task
   
    Three phases of replication are as follows:
    - Migrate existing data (Full load)
    - Application of cached changes
    - Replicate data changes only (change data capture)

5. Target endpoint

    The target endpoint provides connection, data store type, and location information about the target data store.  
    AWS DMS uses this information to make a connection. 

6. Amazon S3

    This is the central storage repository for the data lake.

#### Types of replication tasks

- Full load

    The full load is a one-time migration of existing data. Any changes to the database that occur during this initial migration are cached.

- Application of cached changes

    The second phase is the application of cached changes. After the full load is complete, AWS DMS begins applying changes that occurred up to that point.  
    After the full load task is completed, AWS DMS begins to collect changes as transactions for the ongoing replication phase. After AWS DMS applies all cached changes, tables are transactionally consistent. At this point, AWS DMS moves to the ongoing replication phase.

- Ongoing replication

    The third phase is ongoing replication, referred to as change data capture (CDC), which keeps the source and target data stores in sync.  
    After the table is loaded (Task 1) and the cached changes are applied (Task 2), AWS DMS performs ongoing replication.  
    AWS DMS reads changes from the source database transaction logs, extracts these changes, converts them to the target format, and applies them to the target. This process provides near real-time replication to the target, reducing the complexity of replication monitoring.  
    The following are two types of CDC workloads:
    - Insert-only operations
    - Full CDC, which includes update and delete operations

| Aspect | Insert-only CDC | Full CDC (with updates and deletes) |
|---|---|---|
| Common use cases |	Suitable for append-only data, like logging |	Applies to dynamic datasets where records are modified or purged |
| Data operations |	Inserts only |	Involves inserts, updates, and deletes, requiring handling of existing records |
| Performance impact |	Generally lower, optimized for insertions |	Higher, due to the additional steps required to locate and modify or delete existing records |
| Data consistency |	Straightforward to maintain because data is only added |	More challenging to ensure consistency and integrity across transactions |
| CDC method |	Efficient capture of new entries. |	Might require sophisticated methods to capture and replicate changes accurately, including transaction logs or triggers |

**Amazon S3 and AWS DMS**  
To learn more specifics about AWS DMS and Amazon S3, see **Using Amazon S3 as a target for AWS Database Migration Service** in the [AWS DMS User Guide](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.S3.html). 

**AWS DMS training**  
For a self-paced training course about AWS DMS, see [AWS Database Migration Service (AWS DMS) Getting Started](https://explore.skillbuilder.aws/learn/course/15904/play/108922/aws-database-migration-service-aws-dms-getting-started) in AWS Skill Builder. 

**AWS DMS and AWS Glue**  
To learn more about DMS and automatic Glue data catalog population see **Create an AWS Glue Data Catalog with AWS DMS** in the [AWS Blog](https://aws.amazon.com/blogs/database/create-an-aws-glue-data-catalog-with-aws-dms/).


### AWS DataSync

AWS DataSync is a data transfer service optimized for moving large volumes of file-based and object data to, from, and between AWS storage services.

Example file-based data include the following:

- Content repositories (user home directories, project files, digital archives)
Media libraries (collections of video, audio, and image files)
- Research, engineering, and simulation files
- Log files or file-based backups of critical data from enterprise applications

DataSync automatically scales and handles scheduling, monitoring, encryption, and verification of your file and object transfers. With DataSync, you pay only for the amount of data copied, with no minimum commitments or upfront fees.

### Resources

**AWS DataSync**
To learn more about AWS DataSync, see the [AWS DataSync User Guide](https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html).

**AWS DataSync FAQs**
To explore frequently asked questions about AWS DataSync, see [AWS DataSync FAQs](https://aws.amazon.com/datasync/faqs/).

**AWS DataSync training**
To start training on AWS DataSync, see [AWS DataSync Primer](https://explore.skillbuilder.aws/learn/course/external/view/elearning/102/aws-datasync-primer).

## Build Data Catalog

### Data Catalog

The AWS Glue Data Catalog is the central metadata repository for all your data assets stored in your data lake locations.

Data Catalog integrates seamlessly with other AWS analytics such as the following: 

- **Amazon Athena** relies on the Data Catalog to store and retrieve metadata about the data sources (tables, columns, data types, and so on) that you want to query. 
- **Amazon EMR** can directly access the metadata stored in the Data Catalog so it can understand the structure and location of the data it needs to process. 
  
You can use the metadata in the catalog to query and transform that data in a consistent manner across a wide variety of applications. This metadata is stored in the form of tables, which contain information like the location, schema, and runtime metrics of the data.

#### Example of a Data Catalog table

| Table entry | Description |
|-------------|-------------|
| Name | This is the name of the table. |
| DatabaseName | This is the database the table belongs to. |
| StorageDescriptor | This defines the physical storage properties of the data as follows: <br> - Data format (for example .csv, Parquet) <br> - Location of the data in Amazon S3 <br> - Serialization and deserialization libraries |
| Schema |	This includes the schema (column names and data types), such as the following: <br> - name: string <br> - year: integer <br> - price: double |
| PartitionKeys |	These are the columns used to partition the data, which can improve query performance. <br The following is an example of data partitioned by day and that has been ingested data for 2 days: <br> - Partition1: **year=2024/month=3/day=13** => Location = s3://doc-example-bucket/data/mytable/year=2024/month=3/day=13 <br> - Partition2: **year=2024/month=3/day=14/** => Location = s3://doc-example-bucket/data/mytable/year=2024/month=3/day=14/ |
| Parameters |	These are key-value pairs that store additional metadata about the table, such as the table's description, creator, and creation time. |
| Table Type |	This indicates the type of table, such as EXTERNAL_TABLE, VIRTUAL_VIEW, and so on. |

#### Populating the catalog

Software entities called crawlers populate the Data Catalog. Crawlers discover the data, recognize its structure, and then add metadata into the Data Catalog. Crawlers use classifiers to detect and infer schemas. 

There are other ways to populate the data catalog:

- Add metadata manually

    Manually add and update table details using the AWS Glue console or by calling the API through the AWS Command Line Interface (AWS CLI).  
    Now that you have reviewed how to add metadata manually, move to the next tab to learn about running data definition language (DDL) queries.

- Run DDL queries

    Run DDL queries in Athena, AWS Glue jobs, and AWS EMR jobs. 
    DDL is a subset of SQL that is used to define and manage the structure of a database. It is responsible for creating, modifying, and deleting database objects, such as tables, indexes, views, stored procedures, and other database components.

#### Crawlers

AWS Glue crawlers can scan data in all kinds of repositories, classify it, extract schema information from it, and store the metadata automatically in the Data Catalog.

When a crawler runs, it automatically takes the following actions.

- Uses a classifier to discover and infer the structure of the data

    AWS Glue crawlers can use built-in or custom classifiers to scan the data in the data store and recognize its format, schema, and associated properties. 

- Groups data into tables or partitions

    AWS Glue crawlers infer file types and schemas. They also automatically identify the partition structure of your dataset when they populate the Data Catalog. By partitioning your data, you can restrict the amount of data scanned by each query, which improves performance and reduces cost.

- Populates metadata in the Data Catalog

    On completion, the AWS Glue crawler creates or updates one or more tables in the Data Catalog with the corresponding table definitions and partitions. You can configure how the crawler adds, updates, and deletes tables and partition information. 

- Creates a single schema for each Amazon S3 path

    You can configure the crawler to combine compatible schemas into a common table definition. If the schemas that are compared match, meaning the partition threshold is higher than 70 percent, the schemas are denoted as partitions of a table. If they don’t match, the crawler creates a table for each Amazon S3 path, resulting in a higher number of tables. You can specify the maximum limit of tables that a crawler can generate.

#### Configuration options

The following are some AWS Glue crawler configuration options and features to consider:

- You can configure the crawler to scan multiple data stores in a single run. 
- You can run crawlers on a schedule or on demand, or you can invoke them based on an event to ensure that your metadata is up to date.
- It is recommended to choose the default setting of always updating Data Catalog tables. This way, the Data Catalog metadata is always in sync with the Amazon S3 data lake.
- You can configure the crawler to scan only new subfolders and perform incremental crawls for adding new partitions in AWS Glue.

#### Classifiers

When you define a crawler, you can rely on built-in classifiers or choose one or more custom classifiers to read the data and determine its structure or schema. When the crawler runs, the first classifier in your list to successfully recognize your data store is used to create a schema for your table. Considerations for each type of classifiers are as follows:

- Built-in classifiers: AWS Glue provides built-in classifiers to infer schemas from common files with formats that include JSON, .csv, and Apache Avro. 
- Custom classifiers: To configure the results of a classification, you can create a custom classifier. You provide the code for custom classifiers, and they run in the order that you specify. You define your custom classifiers in a separate operation before you define the crawlers.

#### Data Catalog features and considerations

The following are some features and considerations for using Data Catalog:

- Each AWS account has one Data Catalog in each Region. 
- You can manually edit the schemas in the Data Catalog. For example, you can change column data types, add new columns, or modify table properties.
- The Data Catalog maintains a comprehensive schema version history so you can compare and review how your data has changed over time.
- You can compute column-level statistics for Data Catalog tables, such as minimum value, maximum value, total null values, and total distinct values. 
- You can measure and monitor the quality of your data using the AWS Glue Data Quality service. 

### Resources

**AWS Glue overview**  
For an overview of the features and benefits of AWS Glue, go to the [What Is a Data Catalog?](https://aws.amazon.com/what-is/data-catalog/) website.

**AWS Glue and column-level statistics**  
To learn more about computing column-level statistics, go to **Optimizing Query Performance Using Column Statistics** in the [AWS Glue User Guide](https://docs.aws.amazon.com/glue/latest/dg/column-statistics.html).

**AWS Glue data quality**  
To learn more about data quality, go to **AWS Glue Data Quality** in the [AWS Glue User Guide](https://docs.aws.amazon.com/glue/latest/dg/glue-data-quality.html).

**AWS Glue crawlers**  
To learn more about crawlers, see **Data Discovery and Cataloging in AWS Glue** in the [AWS Glue User Guide](https://docs.aws.amazon.com/glue/latest/dg/catalog-and-crawler.html).

**AWS Glue and AWS DMS**
To learn more about the interaction between AWS Glue and AWS DMS, see **Create an AWS Glue Data Catalog with AWS DMS** in the [AWS Database Blog](https://aws.amazon.com/blogs/database/create-an-aws-glue-data-catalog-with-aws-dms/). 









## Transform Data



## Serve Data for Consumption


