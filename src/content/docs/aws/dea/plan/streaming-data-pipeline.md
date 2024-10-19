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









## Ingestiong Data from Stream Sources



## Storing Streamin Data



## Processing Data



## Analyzing Data
