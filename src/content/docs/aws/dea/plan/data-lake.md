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
| Landing Zone | When working with sensitive data (for example, personally identifiable information, or PII), it is recommended to use an additional S3 bucket as a landing zone. Mask the data before it is moved into the raw zone. |
| Logs Zone | This zone is used for logs for Amazon S3 and other services in the data lake architecture. The logs can include S3 Access Logs, Amazon CloudWatch log files, or AWS CloudTrail log files. |
| Archived Zone | This zone is used for storing infrequently accessed, historical, or compliance-related data. |
| Sandbox Zone | This zone is used for exploratory analysis and experimentation. |

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

