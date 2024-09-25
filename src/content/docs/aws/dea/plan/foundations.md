---
title: Foundations
sidebar:
  order: 1
---

## Introduction

### What are the key functions of the data engineer?

![key functions](/img/key-functions.png)

- Build and manage data infrastructure and platforms

    This includes setting up databases, data lakes, and data warehouses on AWS services like Amazon Simple Storage Service (Amazon S3), AWS Glue, Amazon Redshift, among others. 

- Ingest data from various sources

    You can use tools like AWS Glue jobs or AWS Lambda functions to ingest data from databases, applications, files, and streaming devices into the centralized data platforms. 

- Prepare the ingested data for analytics

    Use technologies like AWS Glue, Apache Spark, or Amazon EMR to prepare data by cleaning, transforming, and enriching it.

- Catalog and document curated datasets

    Use AWS Glue crawlers to determine the format and schema, group data into tables, and write metadata to the AWS Glue Data Catalog. Use metadata tagging in Data Catalog for data governance and discoverability.

- Automate regular data workflows and pipelines

    Simplify and accelerate data processing using services like AWS Glue workflows, AWS Lambda, or AWS Step Functions.

- Ensure data quality, security, and compliance

    Create access controls, establish authorization policies, and build monitoring processes. Use Amazon DataZone or AWS Lake Formation to manage and govern access to data using fine-grained controls. These controls help ensure access with the right level of privileges and context. 

### Who will you work with as a data engineer?

| Personas | Responsibility | Areas of interest |
|----------|----------------|-------------------|
| Chief data officer (CDO) |	Builds a culture of using data to solve problems and accelerate innovation	| Data quality, data governance, data and artificial intelligence (AI) strategy, evangelizing the value of data to the business |
| Data architect |	Driven to architect technical solutions to meet business needs, focuses on solving complex data challenges to help the CDO deliver on their vision	| Data pipeline, data processing, data integration, data governance, and data catalogs |
| Data engineer	| Delivers usable, accurate datasets to the organization in a secure and high-performing manner	| The variety of tools used for building data pipelines, ease of use, configuration, and maintenance |
| Data security officer	| Ensures that data security, privacy, and governance are strictly defined and adhered to |	Keeping information secure, complying with data privacy regulations, protecting personally identifiable information (PII), and applying fine-grained access controls and data masking |
| Data scientist | Constructs the means for quickly extracting business-focused insight  from data for the business to make better decisions |	Tools that simplify data manipulation and provide deeper insight than visualization tools and tools that help build the machine learning (ML) pipeline |
| Data analyst	| Reacts to market conditions in real time, must have the ability to find data and perform analytics quickly and easily	| Querying data and performing analysis to create new business insights and producing reports and visualizations that explain the business insights |

## Data Discovery

### What is data discovery?

Before you can architect and deploy a data analytics system, the following questions must be answered:

- Which data should be analyzed? What is its value to the business or organization?
- Who owns the data? Where is it located?
- Is the data usable in its current state? What transformations are required?
- Who needs to see the data?
- After the data is curated and ready for consumption, how should it be presented?
  
These questions and others are typically answered during the data discovery process. Data discovery refers to the process of finding and understanding relevant data sources within an organization and the relationships between them. It is a crucial first step for extracting value from data assets. 

Data discovery is an important prerequisite to architecting and deploying a data analytics system, but it's also an ongoing process. The landscape changes—new data sources emerge, opportunities arise, and new business goals are defined. The data discovery process keeps you ahead of this curve and able to respond with agility and accuracy.

### Data discovery steps

![dd-steps](/img/dd-steps.png)

- **Define business value**

Conduct data discovery kick-off workshops with stakeholders to understand business goals, prioritize use cases, and identify potential data sources.  
The following are example questions that define the business opportunity:

  - How would getting insight into data provide value to the business?
  - Are you looking to create a new revenue stream from your data?
  - What are the challenges with your current approach and tool? 
  - Would your business benefit from managing fraud detection, predictive maintenance, and root-cause analysis to reduce mean time to detection and mean time to recovery?
  - How are you continually innovating on behalf of your customers and improving their user experience?

- **Identify your data consumers**
  
Conduct interactive sessions with various stakeholders within an organization such as data scientists and analysts.  
The following example questions can help identify your data consumers:

  - Who are the end users (for example, business analysts, data engineers, data analysts, or data scientists)? 
  - Which insights are you currently getting from your data?
  - Which insights are on your roadmap?
  - What are the different consumption models?
  - Which tool or interface do your data consumers use?
  - How real time does the data need to be for this use case (for example, near real time, every 15 minutes, hourly, or daily)? 
  - What is the total number of consumers for this consumption model?
  - What is the peak concurrency?

- **Identify your data sources**

| Data types | Example data types |
|------------|--------------------|
| Structured data	| Relational databases, spreadsheets, CSV files, XML |
| Semi-structured data | Non-relational databases, JSON, Log files,  XML with attributes, Internet of Things (IoT) sensor data |
| Unstructured data	| Text documents, images, audio files, video files |

| Data sources	| Example data sources |
|---------------|----------------------|
| Databases	| CRM applications, ERP applications, CMS applications |
| Files	| On-premises file servers, document libraries, archives |
| Logs	| Application logs, device logs |
| IoT devices	| Sensor data, device metadata, time-series data |
| Mobile devices	| Social media, messaging apps |
| Video	| Media and entertainment services, surveillance cameras, video libraries |
| Software as a service (SaaS) apps	| User activity logs, transactional data, marketing analytics, e-commerce data |
| Datasets	| Demographic data, weather data, geospatial mapping, transportation data |

| Ingest modes | Example ingest modes |
|--------------|----------------------|
| Streaming	| Sensors, social media platforms, media and entertainment services, IoT devices |
| Micro-batch |	Sensors, website logs, graphics and video rendering |
| Batch	| Medical imagery, genomic data, financial records, usage data |

The following example questions can help identify your data types,  data sources, and ingest modes:

  - How many data sources do you have to support?
  - Where and how is the data generated?
  - What are the different types of data? 
  - What are the different formats of data? 
  - Is your data originating from on premises, a third-party vendor, or the cloud?
  - Is the data source streaming, batch, or micro-batch?
  - What is the velocity and volume of ingestion?
  - What is the ingestion interface? 
  - How does your team onboard new data sources?

- **Define your storage, catalog, and data access needs**

Determine the best storage for specific data types. Assess data quality to determine processing needs. Catalog and register details about data sources.  
The following are example questions to identify your data storage and data access requirements:

  - Which data stores do you have?
  - What is the purpose of each data store?
  - Why are you using that storage method?  (for example, files, SQL, NoSQL, or a data warehouse)
  - How do you currently organize your data? (for example, data tiering or partition)
  - How much data are you storing now, and how much do you expect to store in the future? (for example, 18 months from now)
  - How do you manage data governance? 
  - Which regulatory and governance compliance standards are applicable to you? 
  - What is your disaster recovery (DR) strategy?

- **Define your data processing requirements**
  
Extract relevant data from sources like databases, data lakes, and CRM systems using tools such as AWS Glue crawlers or custom scripts.  
Curate and transform the raw data as needed using services like AWS Glue and Amazon EMR.  
The following example questions can help identify your data processing requirements:

  - Do you have to transform or enrich the data before you consume it?
  - Which tools do you use for transforming your data?
  - Do you have a visual editor for the transformation code? 
  - What is the frequency of your data transformation? (for example, real time, micro-batching, overnight batch) 
  - Are there any constraints with your current tool of choice?

To learn more about data discovery, refer to **Data Discovery** in the [Data Analytics Lens - Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/analytics-lens/data-discovery.html) document.

## AWS Data Services and the Modern Data Architecture


## Orchestration and Automation Options


## Data Engineering Security and Monitoring