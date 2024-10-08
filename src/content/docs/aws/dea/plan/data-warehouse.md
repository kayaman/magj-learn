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


