---
title: Sample Questions
description: Skill Builder
sidebar:
  order: 2
---

Which option describes the responsibility of the data engineer and the data analyst?

*The data engineer builds the system that delivers usable data to the data analyst, who analyzes the data to gain business insights.*

The data engineer builds a system that will deliver process and curated data for the data analyst. During the data discovery process, the data engineer can gather requirements from the data analyst so the system can deliver usable data.

---

What are some key functions of the data engineer?

- *They build and manage data infrastructure platforms.*
- *They catalog and document datasets.*
- *They ensure security and compliance.*

Some of the key data engineer functions are to build and manage data platforms, catalog datasets, and ensure security and compliance. Analyzing data, building visualization dashboards, and training ML models are typically the focus of the data scientist and data analyst.

---

What is the best definition of data discovery?

*The process of finding and understanding relevant data sources within an organization and the relationships between them*

Data discovery involves interactive sessions to identify key data sources and stakeholders, understand data, and determine how to maximize value from data through appropriate analysis and use cases. The other options describe parts of data discovery, but not the overall definition.

---

What are the steps in the data discovery process?

- *Identify key stakeholders and data sources across the organization.*
- *Discover existing data types and formats.*
- *Ingest and explore sample data to understand data types and structures.*

The data discovery process focuses on what data exists, how it can be accessed and transformed, and the ways to use it before defining implementation details.  
Establishing and testing disaster recovery routines is typically done after the discovery process when more information is known about the data landscape and requirements.   
Although reviewing documentation can provide useful background information, the data discovery process is more hands-on and involves interactive sessions with stakeholders.  
Ingesting, processing, and delivering data is the main function of the data analytics system itself, but not part of the discovery process.

---

Which questions are typically asked during the data discovery process?

- *Who are the key stakeholders and data owners?*
- *Which formats and types of data are available?*
- *How will the data be secured and accessed?*

Some typical data discovery questions focus on understanding the available data sources, formats, and volumes and establishing the high-level processing needs to maximize the value from data. Identifying the technical requirements for machine learning, which models are used, and which reference architectures are used come later in the process after the initial data discovery.

---

What is meant by the term data silos? 

*Independent data stores that are optimized for specific uses and are difficult to combine or access by other systems*

Data silos refer to isolated and incompatible data stores that are optimized for departmental or individual use cases. They make it challenging to develop a unified view of organizational data. This siloed approach inhibits data sharing and prevents using data for new insights.

---

Which option best describes a basic data analytics workflow?

*Ingest → Store → Catalog → Process → Deliver*

Data analytics workflows vary to suit business needs, however most workflows follow the pattern of Ingest → Store → Catalog → Process → Deliver. Some of these stages are performed cyclically or iteratively.

---

Why is a data catalog important in a data analytics system? 

*A data catalog acts as a single source of truth for metadata, and tracks data location and quality.*

The data catalog provides transparency into the data landscape by tracking data assets, where they are located, their quality, and how they are being used. This acts as a single source of truth for metadata.

---

Which options are correct uses of AWS Step Functions in a data analytics workflow?

- *Coordinating multiple AWS Glue extract, transform, and load (ETL) jobs that process data from different sources and load it into a data warehouse*
- *Orchestrating a machine learning workflow that involves data preprocessing, model training, evaluation, and deployment*
- *Performing batch processing jobs on data stored in Amazon S3 using AWS Batch*

Step Functions is used to coordinate and orchestrate the components of a data analytics workflow, but it does not store any metadata itself. Step Functions workflows can invoke other AWS services like AWS Glue for ETL, AWS Batch for job processing, and AWS Lambda for tasks. But services like DynamoDB are used independently to store metadata, not as part of the Step Functions workflow definition.

---

Which options are benefits of using zero-ETL approaches on AWS?

- *It streamlines data architecture and reduces data engineering efforts by automating custom extract, transform, and load (ETL) processes.*
- *It provides real-time insights through real-time or near real-time data access.*
- *It optimizes costs for organizations because it is based on actual usage and data processing needs.*

Zero-ETL aims to eliminate the need for custom ETL pipelines by using integrations and automation between AWS data and analytics services.

---

Which option best describes a benefit of using serverless architectures for data analytics workloads on AWS?

*Organizations can optimize costs by paying only for the resources consumed. Serverless services are billed based on actual usage rather than provisioned capacity.*

Serverless architectures are designed specifically to avoid provisioning and managing fleets of EC2 instances. Data encryption is always necessary, whether an architecture is serverless or server-based. With Serverless architectures, you do not directly deploy EC2 instances. Batch and scheduled workloads often use serverless architectures. One of the primary advantages of serverless architectures is cost optimization.

---

