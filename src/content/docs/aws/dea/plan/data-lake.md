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



