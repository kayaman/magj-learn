---
title: A Streaming Data Pipeline
sidebar:
  order: 5
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 5
---

## Introduction

### Comparing streaming processing to batch processing

Before setting up a streaming pipeline, consider the differences between batch processing and streaming processing. This will allow you to choose the best process for your use case.

#### Batch processing

Batch processing usually computes results based on complete datasets. This approach supports deep analysis of large datasets and is usually done on a recurring schedule, such as nightly, weekly, or quarterly.

#### Streaming processing

In contrast, a data stream is unbounded. Streaming data is generated continuously by different data sources concurrently. Stream processing involves ingesting a sequence of data and incrementally updating metrics, reports, or summary statistics as new data arrives.  
Organizations can use stream processing to gather data, analyze it quickly, and act on insights in near real time.

To learn more, see [What is Streaming Data?](https://aws.amazon.com/what-is/streaming-data/).

### Streaming data architecture use cases

- Customer experience

  Online businesses continuously push features on their websites to respond to ever-changing competition, drive higher sales, and enhance customer satisfaction.

- Fraud detection

  Organizations must identify security breaches, network outages, or machine failures in real time or on a continual basis. In financial services, companies can respond to potential fraudulent credit card transactions or login attempts by joining a real-time activity stream with historic account data in real time.

- Healthcare

  In clinical healthcare, stakeholders can use analytics to monitor patient safety, personalize patient results, and assess clinical risk on a continual basis. These metrics can reduce patient re-admission, improve organizational efficiency, and result in a better patient experience. Wearable health device data combined with geospatial data can proactively notify relatives, caregivers, or incident commanders for a timely response.

- Log analytics

  Businesses can get a real-time view of the performance of their web content and user interaction with their applications and websites. This information includes user behavior, amount of time spent, and popular content. They can capture and centralize all logs and metrics from their applications and IT silos. With this information, businesses get deep visibility into the application and infrastructure stack and support uptime requirements.

- Marketing campaigns

  Streaming analytics can combine data from sources such as ad inventory, web traffic, and clickstream logs to improve advertising and marketing campaigns. It can also use both customer demographic and behavioral data to uncover insights that improve audience targeting, pricing strategies, and conversion rates. This increases campaign return on investment (ROI) and creates new revenue opportunities.

- Predictive maintenance

  Industrial and commercial Internet of Things (IoT) sectors have many use cases that can take advantage of real-time streaming analytics. In manufacturing and supply chain, predictive maintenance provides servicing with minimal disruption and cost. Beyond the factory, predictive maintenance can optimize supply chains for spare parts and raw materials. It can also optimize forward-capacity planning, process improvement, and quality management.

### Typical streaming data architecture

![Typical streaming data architecture](/img/typical-streaming.png)

1. **Ingestion**

    Data is collected from various data sources in real time and sent into the data stream.

2. **Storage**

    Streams of data are harnessed and then stored for processing.

3. **Processing**

    Multiple processes are run, such as consuming data, running computations, and deleting unnecessary data.

4. **Analytics**

    The processed data is served to support data analytics, such as visualization.

### Streaming components

- **Producers** put records into Amazon Kinesis Data Streams. For example, a web server sending log data to a stream is a producer.
- **Stream storage** receives data from the producers and stores that data in the data stream for downstream consumers.
- **Stream processing** takes the previously stored data and normalizes or otherwise alters it.
- **Consumers** get records from Kinesis Data Streams and process them. They can deliver the stream to storage options for processing.  
- **Outputs** gather the streaming data and present it with analytic tools or process it for different services.

![streaming components](/img/streaming-components.png)

### Benefits of an AWS streaming data pipeline

When streaming data, you can encounter difficulties with setup, management, and scaling. AWS streaming provides the following benefits:

- Flexible scaling 

  Automatically scales capacity in response to changing data volumes


- High availability 

  Provides built-in availability and fault tolerance by default


- Lower costs 

  Incurs costs per gigabyte of data that is written, read, and stored

## Ingestiong Data from Stream Sources

### Data ingestion

The first action in a streaming data pipeline is data ingestion. Ingestion entails the movement of data from a source or sources into another location for further analysis.

![ingestion](/img/ingestion.png)

In a streaming data architecture, records are ingested onto the stream continuously. Consumers continuously read records off of the stream and process them on a sliding window of time, often making them available for real-time analytics immediately. The processed records might also be written to durable storage for downstream consumption and for compliance and audit purposes.

With streaming pipelines, the main steps of the ingestion process involve producers, a stream storing data, and consumers. **Producers** place records on the stream, and the stream provides continuous storage from which consumers can get and process records. **Consumers** read records from the stream and process them.

![Producers/Consumers](/img/producer-consumer.png)

The advantage of streaming ingestion is the opportunity to analyze incoming data and take action immediately. Data is ready for analysis with very low latency. Also, the stream is designed to handle semi-structured data that is high volume and high velocity.

To choose ingestion methods for your pipeline, you need to understand both the type and volume of data that the pipeline is expected to handle at a given interval. For example, you might need to ingest a continual stream of large volumes of small records that need to be processed as quickly as possible. It is important to understand where your data is coming from.

### Streaming data sources

Streaming data is generated continuously by various data sources. They typically send data records concurrently, in small sizes, and at high velocity. Data sources can include databases, websites, social media feeds, system and application logs, purchasing and banking systems, mobile devices and apps, and IoT sensor data. These data sources generate or house data of many formats, schema, and types.

### Streaming processing concepts

Streaming data includes multiple timestamps around its creation, ingestion, and processing. It is important to understand the terminology and how to apply it in stream ingestion, processing, and consumption.

#### Shard

A shard is a uniquely identified sequence of data records in a stream. A stream is composed of one or more shards, each of which provides a fixed unit of capacity. Increasing the capacity of a stream involves increasing the number of shards. Increasing or decreasing the number of shards allocated to a stream controls the data rate capacity of the stream.  
In Amazon Managed Streaming for Apache Kafka (Amazon MSK), a shard is known as a **topic**.

#### Resharding

Resharding is the process of adjusting the number of shards in a Kinesis Data Stream to adapt to changes in the rate of data flow through the stream.  
You might want to reshard if you need to scale up processing in your streaming application for a peak period or because your volumes of data are increasing.

#### Querying

By querying the data stream, you can gain insight into the data flowing through your stream. You can use familiar query approaches to query streaming data, but you must specify a bounded portion of the stream in your query. Amazon Managed Service for Apache Flink is a framework and distributed processing engine for stateful computations over unbounded and bounded data streams.

#### Partitions

A **partition key** is used to group data by shard within a stream. The partition key that is associated with each data record determines which shard a given data record belongs to.

### Choosing ingestion services

The first part of the data pipeline is the ingestion of data. Choose ingestion services based on the type of data and the workload requirements. Typical choices for ingesting streaming data are Kinesis, Firehose, Amazon MSK, and AWS Glue.

#### Amazon Kinesis

You can use Kinesis to cost-effectively ingest and process streaming data at any scale. Kinesis provides the flexibility to choose the tools that best suit the requirements of your application.  
**Kinesis Data Streams** is a fully managed service that you can use to ingest, transform, and analyze streaming data in real time.

![KDS](/img/kds.png)

A **producer** is an application that writes data to Kinesis Data Streams. The stream producer collects data from multiple sources and prepares it for stream storage. To write to a Kinesis data stream, you must specify the name of the stream, a partition key, and the data blob to be written. The partition key is used to determine which shard in the stream the data record is added to. In this example, the producer is a web server running on an instance of Amazon Elastic Compute Cloud (Amazon EC2). 

A robust producer must also handle the complexities of streaming data, such as the following:

- Buffering the incoming stream
- Error handling and retry logic
- Scaling and resharding

You can build producers for Kinesis Data Streams by using the AWS SDK or the Amazon Kinesis Producer Library (KPL). The KPL includes features such as retries and error handling. It also helps developers fully use shard capacity to optimize throughput. 

In addition to using the KPL, you can build a custom producer for Kinesis Data Streams by using other AWS toolkits and libraries.

- **AWS SDK**: You can develop producers by using the Kinesis Data Streams API with the AWS SDK.
- **AWS Mobile SDK**: You can use the AWS Mobile SDK to build mobile applications integrated with AWS services.
- **Amazon Kinesis Agent**: This stand-alone application collects and sends file data to Kinesis Data Streams. It continuously monitors a set of files and sends new data to your data stream. The Agent handles file rotation, checkpointing, and retry upon failures.

Kinesis Data Streams can deliver streaming data to destinations such as Amazon S3, Amazon Redshift, Amazon OpenSearch Service, Amazon OpenSearch Serverless, Splunk, and any custom HTTP endpoint or HTTP endpoints owned by supported third-party service providers. Kinesis Data Streams is often used with Firehose to deliver data into Amazon S3, Amazon Redshift, or OpenSearch Service.

![shards](/img/kds-shards.png)

Kinesis Data Streams receives data from the producers and stores that data in the data stream for downstream consumers. The data stream is organized into shards for optimized throughput and data management. Kinesis Data Streams is a fully managed service that manages the configuration, deployment, scaling, and security of your critical streaming workloads.

Data can be ingested into Kinesis Data Streams through Amazon API Gateway. Data can also be delivered from Kinesis Data Streams to API Gateway.

Kinesis Data Streams provides configuration options to help you address the scaling needs of your pipeline. There are three primary controls to consider.

##### Retention period

The retention period tells the stream how long to keep records on the stream before they expire. By default, a Kinesis Data Stream stores records for 24 hours. This is configurable (up to 8,760 hours or 365 days), but the costs increase as the retention period increases.

##### Write capaccity

The write capacity is controlled by how many shards are allocated to the stream, which sets the limit on how much data can be written to the stream in a given period. You can choose either on-demand or provisioned capacity mode.  
Data streams that use on-demand mode require no capacity planning and automatically scale to handle gigabytes of write and read throughput per minute. With on-demand mode, Kinesis Data Streams automatically manages the shards to provide the necessary throughput.  
If you choose provisioned mode, you must specify the number of shards for the data stream. The total capacity of a data stream is the sum of the capacities of its shards. You can increase or decrease the number of shards in a data stream as needed.

##### Read capacity

Read capacity scales the throughput for consumers of your stream. You can choose between shared fan out and enhanced fan out consumer types.  
When a consumer uses the shared fan out configuration, it shares a single pipe of read capacity with other consumers of the stream using the Kinesis Client Library (KCL), which consumes and processes data from a Kinesis data stream and taking care of many of the complex tasks associated with distributed computing.  
The enhanced fan out configuration gives the consumer its own pipe, which increases the throughput for that consumer. The following illustration shows the enhanced fan out configuration.

![reacd capacity](/img/kcl-read-capacity.png)

Both AWS CloudTrail and Amazon CloudWatch are integrated with Kinesis Data Streams. The metrics that you configure for your streams are automatically collected and pushed to CloudWatch every minute.

To learn more, see [Amazon Kinesis](https://aws.amazon.com/kinesis/).

#### Amazon Data Firehose

Firehose is an AWS service used to acquire, transform, and deliver data streams. Firehose can deliver data from Kinesis Data Streams to common destinations such as Amazon S3, Amazon Redshift, and OpenSearch Service.

Firehose buffers data for at least sixty seconds before delivering it to a destination. Customers can choose to configure Firehose with zero buffering to get faster insights from the data stream.

![Firehose](/img/kdf.png)

You can also use Firehose to ingest data directly from streaming data sources and producers and persist that data to a myriad of storage and analytics destinations. Firehose can perform record-level transformations, or you can use AWS Lambda to transform the streaming data. You can automatically provision and scale to meet any workload requirement without additional administration overhead.

To learn more, see [Amazon Data Firehose](https://aws.amazon.com/firehose/).

#### Amazon MSK

Amazon MSK helps you reduce the operational overhead of running Apache Kafka and Kafka Connect clusters. Amazon MSK manages the provisioning, configuration, and maintenance of Apache Kafka and Kafka Connect clusters. You can use applications and tools built for Apache Kafka without any code changes and scale cluster capacity automatically.

:::note
Data engineers choose Amazon MSK over Kinesis Data Streams in instances such as the following:

- When they need lower latency
- When they need higher throughput
- When the stream needs to handle larger incoming messages
- When migrating from an on-premises Kafka solution

:::

![MSK](/img/msk-pic.png)

Apache Kafka is used to build real-time streaming data pipelines and real-time streaming applications. For example, you might want to create a data pipeline that takes in user activity data to track how people use your website in real time. Kafka would be used to ingest and store streaming data while serving reads for the applications that power the data pipeline.

With Amazon MSK, you can deploy production-ready applications by using AWS integrations, and you can connect other applications using the Kafka APIs. Kafka has the following four APIs:

- **Producer API** is used to publish a stream of records to a Kafka topic.
- **Consumer API** is used to subscribe to topics and process their streams of records.
- **Streams API** lets applications behave as stream processors, which take in an input stream from topics and transform it to an output stream that goes into different output topics.
- **Connector API** is used to seamlessly automate the addition of another application or data system to their current Kafka topics.

Manually running Kafka Connect clusters requires you to plan and provision the required infrastructure, deal with cluster operations, and scale it in response to load changes. You can use Amazon MSK to build and run applications that use the Apache Kafka data framework.

Amazon MSK Connect is a feature of Amazon MSK that works with MSK clusters and with compatible self-managed Kafka clusters to run fully managed Kafka Connect workloads.

To learn more, see [Amazon Managed Streaming for Apache Kafka](https://aws.amazon.com/msk/).

#### AWS Glue

Serverless streaming extract, transform, and load (ETL) jobs in AWS Glue continuously consume data from streaming sources, including Kinesis Data Streams. AWS Glue uses built-in transforms and transforms that are part of Apache Spark Structured Streaming to clean and transform streaming data in transit.

AWS Glue streaming ETL jobs can enrich and aggregate data, join batch and streaming sources, and run a variety of complex analytics and ML operations. Output is available for analysis in seconds in your target data store. This feature supports event data workloads such as IoT event streams, clickstreams, and network logs.

![Glue](/img/glue-pic.png)

To learn more, see [AWS Glue](https://aws.amazon.com/glue/).

## Storing Streaming Data

### Data storage

The next step in a streaming data pipeline is data storage. Storage entails the storing of data from a source or sources into another location for further processing and analysis.

![Storage](/img/s-data-storage.png)

### Using streaming storage temporarily

During the process of streaming data, you might need to temporarily store the data before it is processed or moved to a longer-term storage solution. The time period from when a record is added to when it is no longer accessible is called the **retention period**. It's important to consider the retention period based on your application's needs. The retention period acts as a buffer to allow consumers time to process data in case of any issues. You should set a retention period that is longer than the time it might take for your slowest consumers to read the data.

#### Benefits of storing data temporarily

In today's data-driven world, where real-time insights are paramount, streaming pipelines have become essential for processing and analyzing data as it arrives. However, the transient nature of streaming data poses challenges in terms of buffering, fault tolerance, and data replication. This is where temporary data storage solutions like Amazon Kinesis and Amazon MSK come into play. By providing a temporary storage layer, organizations can use these services to decouple data ingestion from processing. This ensures reliable and scalable data streaming pipelines.

- **Run analytics on real-time data**

  By buffering streaming data for a short period, you can run analytics on recent events as they occur and generate insights from real-time data streams.

- **Handle transient data**

  Some streaming data like clickstreams or tweets are transient in nature. Storing them short-term is sufficient as losing a few events does not significantly impact analysis. It's not necessary to keep this type of data for long periods.

- **Meet processing requirements**

  Services like Kinesis, Amazon MSK, or Amazon Redshift might require batching data to maintain optimal load performance and to efficiently process the data. Buffering for a short interval collects enough records before processing them.

- **Handle network or destination issues**

  Temporary storage provides reliability against transient network issues or outages in downstream systems. Data is not lost if delivery fails temporarily. You can decouple services that improve your flexibility and ability to scale.

- **Encourage data minimization**

  Organizations need to consider the size of payloads being sent to streaming services. With short-term storage data payloads can be reviewed to reduce unnecessary fields before long-term archival. This helps optimize resource usage.

- **Cost optimization**

  By using short-term storage, you can store the data for just as long as you need, sometimes bypassing long-term storage all together. With this. you can optimize your cost savings when building a streaming data pipeline.

Amazon MSK and Kinesis Data Streams are AWS services used for ingesting and processing real-time data streams. You can use these services to store data temporarily for a configurable retention period. Let's look at how you can use Amazon MSK and Kinesis Data Streams as short-term storage in your data pipeline.

##### Amazon MSK

With Amazon MSK, you can build and run applications that use Apache Kafka for building real-time streaming data pipelines where data is consumed and processed as it arrives rather than stored for long periods of time. Consuming messages does not automatically remove them from the log in Amazon MSK. Amazon MSK can configure the Kafka topics with a retention period, which determines how long the data is stored before being automatically removed. 

Amazon MSK stores the streaming data temporarily in a performance-optimized primary storage tier until it reaches the retention limits. Then, the data is automatically moved into a new low-cost storage tier. The default retention period in low-cost storage is 3 days. There is no minimum retention period for primary storage.

![MSK](/img/s-msk.png)

##### Kinesis Data Streams

Kinesis Data Streams is a service you can use to collect and process large amounts of streaming data in real time. A Kinesis Data Stream stores records for 24 hours by default and can store them up to 8760 hours (365 days). You can use it as a short-term storage solution for a streaming data pipeline to act as a buffer or temporary storage for data before it is processed or loaded into a more permanent storage solution.

![KDS](/img/s-kds.png)

To learn more, see [Getting started using Amazon MSK](https://docs.aws.amazon.com/msk/latest/developerguide/getting-started.html).  
To learn more, see [What Is Amazon Kinesis Data Streams?](https://docs.aws.amazon.com/streams/latest/dev/introduction.html)

### AWS long term storage solutions

The storage option you use when storing data long term largely depends on your use case. Some of the long-term storage options and common use cases for the storage service are listed in the next section.

#### Long-term storage use cases

When streaming data from thousands of sources, you can use a long-term storage strategy to plan for the future and comply with any regulatory requirements. In the following use cases, storing data long term is beneficial:

- **Compliance and regulatory requirements**: Certain industries like healthcare and financial services have regulations that require data to be retained for auditing purposes for periods ranging from a few months to several years.

- **Machine learning and analytics**: By storing streaming data historically, you can reprocess and analyze the data over time to improve models and insights. You can backtest machine learning (ML) algorithms on historical data to evaluate performance.

- **Monitoring and operational control**: With historical streaming data, you can debug production issues, investigate anomalies, or analyze outages that occurred in the past.

#### Data movement

With the capacity to move data, you can build flexible, scalable, and secure data pipelines that meet your specific requirements. These requirements might include ingesting data from external sources, integrating with external systems, or moving data between AWS services for processing and analysis.

![Data movement](/img/data-movement.png)

1. **Inside-out data movement**

    Inside-out data movement includes moving stored streaming data from a data lake out to a data warehouse. For example, storing the streaming data in a data lake for offline analytics and then moving data to a data warehouse for daily reporting.

2. **Around the perimeter data movement**

    Perimeter movement involves moving streaming data from one purpose-built data store to another. For example, loading streaming data into Amazon Redshift to offload the search queries from the database.

3. **Outside-in data movement**

    Outside-in movement involves moving streaming data from Kinesis Data Streams into a data lake. For example, moving data from a Kinesis Data Stream into a data lake for product recommendations by using ML algorithms.

#### Data lakes

Amazon S3 is an object storage service that offers scalability, data availability, security, and performance. Amazon S3 is typically used as the primary data store for a data lake. A data lake is a centralized repository where you can store all your structured and unstructured data at any scale and then run different types of analytics to guide your business decisions.

![DL](/img/s-dl.png)

#### Amazon Redshift

Amazon Redshift supports streaming ingestion from Kinesis Data Streams. The Amazon Redshift streaming ingestion feature provides low-latency, high-speed ingestion of streaming data from Kinesis Data Streams into an Amazon Redshift materialized view. Amazon Redshift streaming ingestion removes the need to stage data in Amazon S3 before ingesting into Amazon Redshift.

![Redshift](/img/s-redshift.png)

#### Amazon OpenSearch Service

Amazon OpenSearch Service is a fully managed service offered by AWS to deploy, operate, and scale OpenSearch Service clusters in the AWS Cloud or on-premises data centers. It can also be used as a storage solution for your streaming data. There are a few ways in which you can store streaming data in OpenSearch Service.

- Firehose delivery

  Firehose can deliver streaming data from Kinesis to OpenSearch Service. It handles transforming and loading the data automatically in near real-time. You can store large volumes of streaming data in OpenSearch Service for long-term analysis and querying.

- OpenSearch service ingest node plugin

The OpenSearch Service Ingest Node plugin can be used to build a custom pipeline that reads data from Kinesis and indexes it into OpenSearch Service. This provides more control over transformations during ingestion.

- Kinesis streaming data

Storing streaming data from Kinesis in OpenSearch Service provides the ability to run queries, aggregations, and visualizations on large datasets for insights over time. The data can be stored cost effectively in OpenSearch Service for long term retrieval and analysis, as needed.

![OpenSearch](/img/s-opensearch.png)

To learn more, see [What is Amazon OpenSearch Service?](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html)

### Cost optimization strategies for storing streaming data

#### Using Amazon S3 storage tiers

Develop an appropriate data storage strategy based on the access patterns of your data. Frequently accessed data can be stored in Amazon S3 Standard storage while infrequently accessed data can be moved to S3 Glacier or Glacier Deep Archive for cost savings. You can automate data tiering using S3 Lifecycle policies.

Monitor data access patterns using S3 Analytics and S3 Intelligent Tiering to understand how your data is being used and to refine your storage strategy over time. Ingest data into the same AWS Region and Availability Zone where it will be processed to reduce data transfer costs.

![storage tiers](/img/s3-st.png)

#### Adjusting data size and distribution

Partitioning data in Kinesis Data Streams brings advantages like faster processing, improved throughput, efficient resource use, and more straightforward error handling. By optimizing how the data is distributed and processed in the streaming pipeline, costs can be reduced through efficiently using resources and avoiding overprovisioned compute or storage capacity. 

- **Partitioning**: Partitioning and bucketing the data helps distribute it across compute resources in a way that optimizes performance. This reduces the amount of data each individual compute resource must process.
- **Smaller data**: By processing smaller, partitioned chunks of data in parallel, the pipeline can scale out with additional compute capacity only where needed. This improves throughput and avoids overprovisioning resources. 
- **Distribution**: Distributing the workload means the pipeline can finish processing faster, so the resources don't need to be running as long. Shorter processing times can directly translate to lower costs.
- **Filtering**: Real-time filtering or aggregation of streaming data before storing it can reduce the amount of long-term storage you need. Only the relevant processed data is stored rather than all raw records.

![P-S-C](/img/psc.png)

#### Compressing data

Applying data compression prior to transmitting it to Kinesis Data Streams has numerous advantages. This approach not only reduces the data’s size for faster travel and efficient resource use, but it also leads to cost savings when it comes to storage expenses. 

Additionally, this practice makes storage and data retention more cost efficient. By using compression algorithms such as GZIP, Snappy, or LZO, you can achieve substantial reduction in the size of large records. Compression is implemented seamlessly without requiring the caller to make changes to the item or use extra AWS services to support storage. 

However, compression introduces additional CPU overhead and latency on the producer side, and its impact on the compression ratio and efficiency can vary depending on the data type and format. Also, compression can enhance consumer throughput at the expense of some decompression overhead.

![compressing](/img/compressing.png)

### AWS zero-ETL capabilities

Zero-ETL refers to minimizing or eliminating the need to build extract, transform, load data pipelines when ingesting streaming data into a data warehouse like Amazon Redshift. With traditional ETL approaches, data must be extracted from various sources, transformed into a unified format, and loaded into the data warehouse. This process can be complex, time-consuming, and difficult to scale.

Adopting zero-ETL approaches provides the following benefits:

- Increased agility by reducing engineering efforts spent on ETL pipelines
- Lower costs through cloud-focused integrations that optimize usage-based pricing models
- Focusing on building instead doing the heavy integration

#### Zero-ETL using Amazon Redshift

You can use zero-ETL integrations with Amazon Redshift to access your data in place using federated queries or ingest it into Amazon Redshift with a fully managed solution from across their databases. This bypasses the need for separate data transformation and loading stages. With this solution, you can configure an integration from your source to an Amazon Redshift data warehouse. You don't need to maintain an ETL pipeline.

- **Amazon Aurora PostgreSQL-compatible and Amazon Aurora MySQL-compatible**

An Aurora zero-ETL integration with Amazon Redshift enables near real-time analytics and ML using Amazon Redshift on petabytes of transactional data from Aurora.  
The integration monitors the health of the data pipeline and recovers from issues when possible. You can create integrations from multiple Aurora DB clusters into a single Amazon Redshift namespace to derive insights across multiple applications.  
Aurora MySQL-compatible integration processes more than 1 million transactions per minute and makes data available in Amazon Redshift within seconds of being written in Aurora.

![Aurora compat](/img/zetl-aurora-compat.png)

- **Amazon DynamoDB**

Amazon Redshift complements DynamoDB with advanced business intelligence capabilities and a powerful SQL-based interface. When you copy data from a DynamoDB table into Amazon Redshift, you can perform complex data analysis queries on that data, including joins with other tables in your Amazon Redshift cluster.

- **Amazon RDS for MySQL**

A zero-ETL integration makes the data in your Amazon Relational Database Service (Amazon RDS) database available in Amazon Redshift in near real-time. After that data is in Amazon Redshift, you can power your analytics, ML, and AI workloads using the built-in capabilities of Amazon Redshift, such as machine learning, materialized views, data sharing, federated access to multiple data stores and data lakes, and integrations with SageMaker, QuickSight, and other AWS services.

![RDS](/img/zetl-rds.png)

To learn more, see [Working with Zero-ETL Integrations](https://docs.aws.amazon.com/redshift/latest/mgmt/zero-etl-using.html).

#### Zero-ETL using Amazon OpenSearch Service

To optimize business operations and create a more engaging experience for users, many customers use Amazon OpenSearch Service. Amazon OpenSearch Service is used as a zero-ETL integration to allow searching and analyzing data directly from data sources like DynamoDB and Amazon S3 without needing to extract, transform, and load the data into OpenSearch Service first. These zero-ETL integrations use OpenSearch Service query acceleration and visualization features for improved insights without data movement overhead.

- **OpenSearch service with Amazon DynamoDB**

You can use Amazon OpenSearch Service direct queries to query data in Amazon S3. Amazon OpenSearch Service provides a direct query integration with Amazon S3 as a way to analyze operational logs in Amazon S3 and data lakes based in Amazon S3 without having to switch between services. You can now analyze data in cloud object stores—and simultaneously use the operational analytics and visualizations of OpenSearch Service.

![z-ETL OpenSearch DynamoDB](/img/zetl-opensearch-dynamodb.png)

- **OpenSearch service with Amazon S3**

You can use Amazon OpenSearch Service direct queries to query data in Amazon S3. Amazon OpenSearch Service provides a direct query integration with Amazon S3 as a way to analyze operational logs in Amazon S3 and data lakes based in Amazon S3 without having to switch between services. You can now analyze data in cloud object stores—and simultaneously use the operational analytics and visualizations of OpenSearch Service.

![z-ETL OpenSearch S3](/img/zetl-opensearch-s3.png)


## Processing Data



## Analyzing Data
