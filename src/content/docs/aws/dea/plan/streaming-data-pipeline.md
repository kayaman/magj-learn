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

### Amazon Kinesis

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

#### Retention period

The retention period tells the stream how long to keep records on the stream before they expire. By default, a Kinesis Data Stream stores records for 24 hours. This is configurable (up to 8,760 hours or 365 days), but the costs increase as the retention period increases.

#### Write capaccity

The write capacity is controlled by how many shards are allocated to the stream, which sets the limit on how much data can be written to the stream in a given period. You can choose either on-demand or provisioned capacity mode.  
Data streams that use on-demand mode require no capacity planning and automatically scale to handle gigabytes of write and read throughput per minute. With on-demand mode, Kinesis Data Streams automatically manages the shards to provide the necessary throughput.  
If you choose provisioned mode, you must specify the number of shards for the data stream. The total capacity of a data stream is the sum of the capacities of its shards. You can increase or decrease the number of shards in a data stream as needed.

#### Read capacity

Read capacity scales the throughput for consumers of your stream. You can choose between shared fan out and enhanced fan out consumer types.  
When a consumer uses the shared fan out configuration, it shares a single pipe of read capacity with other consumers of the stream using the Kinesis Client Library (KCL), which consumes and processes data from a Kinesis data stream and taking care of many of the complex tasks associated with distributed computing.  
The enhanced fan out configuration gives the consumer its own pipe, which increases the throughput for that consumer. The following illustration shows the enhanced fan out configuration.

![reacd capacity](/img/kcl-read-capacity.png)

Both AWS CloudTrail and Amazon CloudWatch are integrated with Kinesis Data Streams. The metrics that you configure for your streams are automatically collected and pushed to CloudWatch every minute.

To learn more, see [Amazon Kinesis](https://aws.amazon.com/kinesis/).

### Amazon Data Firehose

Firehose is an AWS service used to acquire, transform, and deliver data streams. Firehose can deliver data from Kinesis Data Streams to common destinations such as Amazon S3, Amazon Redshift, and OpenSearch Service.

Firehose buffers data for at least sixty seconds before delivering it to a destination. Customers can choose to configure Firehose with zero buffering to get faster insights from the data stream.

![Firehose](/img/kdf.png)

You can also use Firehose to ingest data directly from streaming data sources and producers and persist that data to a myriad of storage and analytics destinations. Firehose can perform record-level transformations, or you can use AWS Lambda to transform the streaming data. You can automatically provision and scale to meet any workload requirement without additional administration overhead.

To learn more, see [Amazon Data Firehose](https://aws.amazon.com/firehose/).

### Amazon MSK






## Storing Streamin Data



## Processing Data



## Analyzing Data
