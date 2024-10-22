---
title: Simple Queue Service (SQS)
description: Udemy
sidebar:
  order: 1
---

## What’s a queue?

![SQS](/img/udemy/sqs.png)

### Standard Queue

- Oldest offering (over 10 years old)
- Fully managed
- Scales from 1 message per second to 15,000s per second
- Default retention of messages: 4 days, maximum of 14 days
- No limit to how many messages can be in the queue
- Low latency (<10 ms on publish and receive)
- Horizontal scaling in terms of number of consumers
- Can have duplicate messages (at least once delivery, occasionally)
- Can have out of order messages (best effort ordering)
- Limitation of 256KB per message sent

### Producing Messages

![Producing](/img/udemy/sqs-producing.png)

- Define Body
- Add message attributes (metadata – optional)
- Provide Delay Delivery (optional)
- Get back
  - Message identifier
  - MD5 hash of the body

### Consuming Messages

![Consuming](/img/udemy/sqs-consuming.png)

- Consumers…
- Poll SQS for messages (receive up to 10 messages at a time)
- Process the message within the visibility timeout
- Delete the message using the message ID & receipt handle

### FIFO Queue

- Newer offering (First In / First out)
- Name of the queue must end in .fifo • Lower throughput (up to 3,000 per second with batching, 300/s without)
- Messages are processed in order by the consumer
- Messages are sent exactly once • 5-minute interval de-duplication usin *Duplication ID*

### Use Cases

- Decouple applications (for example to handle payments asynchronously)
- Buffer writes to a database (for example a voting application)
- Handle large loads of messages coming in (for example an email sender)
- SQS can be integrated with Auto Scaling through CloudWatch!

### Limits

- Maximum of 120,000 in-flight messages being processed by consumers
- Batch Request has a maximum of 10 messages – max 256KB
- Message content is XML, JSON, Unformatted text
- Standard queues have an unlimited TPS
- FIFO queues support up to 3,000 messages per second (using batching)
- Max message size is 256KB (or use Extended Client)
- Data retention from 1 minute to 14 days
- Pricing:
  - Pay per API Request
  - Pay per network usage

### Security

- Encryption in flight using the HTTPS endpoint
- Can enable SSE (Server Side Encryption) using KMS
  - Can set the CMK (Customer Master Key) we want to use
  - SSE only encrypts the body, not the metadata (message ID, timestamp, attributes)
- IAM policy must allow usage of SQS
- SQS queue access policy
  - Finer grained control over IP
  - Control over the time the requests come in

### Kinesis Data Stream vs SQS

| Kinesis Data Stream | SQS |
| - | - |
| Data can be consumed many times | Queue, decouple applications |
| Data is deleted after the retention period | One application per queue |
| Ordering of records is preserved (at the shard level), even during replays | Records are deleted after consumption (ack / fail) |
| Build multiple applications reading from the same stream independently (Pub/Sub) | Records are deleted after consumption (ack / fail) |
| "Streaming MapReduce" querying capability (Spark, Flink…) | Messages are processed independently for standard queue |
| Checkpointing needed to track progress of consumption (ex: KCL with DynamoDB) | Ordering for FIFO queues (decreased throughtput) |
| Provisioned mode or on-demand mode | Capability to "delay" messages |
| | Dynamic scaling of load (no-ops) |

![KDS vs SQS](/img/udemy/kds-vs-sqs.png)

### SQS vs Kinesis use cases

- SQS use cases
  
  - Order processing
  - Image Processing
  - Auto scaling queues according to messages.
  - Buffer and Batch messages for future processing.
  - Request Offloading
  
- Kinesis Data Streams use cases
  
  - Fast log and event data collection and processing
  - Real Time metrics and reports
  - Mobile data capture
  - Real Time data analytics
  - Gaming data feed
  - Complex Stream Processing
  - Data Feed from "Internet of Things"

### Dead Letter Queue (DLQ)

![DLQ](/img/udemy/dlq.png)

- If a consumer fails to process a message within the Visibility Timeout…
the message goes back to the queue!
- We can set a threshold of how many times a message can go back to the queue
- After the MaximumReceives threshold is exceeded, the message goes into a Dead Letter Queue (DLQ)
- Useful for debugging!
- DLQ of a FIFO queue must also be a FIFO queue
- DLQ of a Standard queue must also be a Standard queue
- Make sure to process the messages in the DLQ before they expire
  - Good to set a retention of 14 days in the DLQ

### SQS DLQ: Redrive to Source

![DLQ](/img/udemy/dlq-redrive.png)

- Feature to help consume messages in the DLQ to understand what is wrong with them
- When our code is fixed, we can redrive the messages from the DLQ back into the source queue (or any other queue) in batches without writing custom code
