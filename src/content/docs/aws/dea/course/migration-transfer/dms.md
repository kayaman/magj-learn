---
title: Database Migration Service (DMS)
description: Udemy
sidebar:
  order: 2
---

- Quickly and securely migrate databases to AWS, resilient, self healing
- The source database remains available during the migration
- Supports:
  - Homogeneous migrations: ex. Oracle to Oracle
  - Heterogeneous migrations: ex SQL Server to Aurora
- Continuous data replication using CDC
- You must create an EC2 instance to perform the replication tasks

### DMS Sources and Targets

| Sources                                                                                                             | Targets                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| On-Premises and EC2 instance databases <br> Azure <br> Amazon RDS <br> Amazon Aurora <br> Amazon S3 <br> DocumentDB | On-Premises and EC2 instance databases <br> Amazon RDS <br> Redshift <br> DynamoDB <br> S3 <br> OpenSearch Service <br> Kinesis Data Streams <br> Apache Kafka <br> DocumentDB <br> Amazon Neptune <br> Redis <br> Babelfish |

### AWS Schema Conversion Tool (SCT)

- Convert your database's schema from one engine to another
- Example OLTP: (SQL Server or Oracle) to MySQL, PostgreSQL, Aurora
- Example OLAP: (Teradata or Oracle) to Amazon Redshift
- You do not need to use SCT if you are migrating the same DB engine
  - Ex: On-Premise PostgreSQL => RDS PostgreSQL
  - The DB engine is still PostgreSQL, RDS is the platform

### DMS - Continuous Replication

![DMS/CDC](/img/udemy/dms-cdc.png)

#### DMS - Multi-AZ Deployment

![DMS/MultiAZ](/img/udemy/dms-multi-az.png)

- When multi-AZ is enabled, DMS provisions and maintains a synchronously stand replica in a different AZ
- Advantages:
  - Provides data redundancy
  - Eliminates I/O freezes
  - Minimizes latency spikes
