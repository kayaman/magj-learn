---
title: Mainframe Migration and Modernization
---

## Introduction

In this course, you will learn foundational information about the AWS approach for mainframe migration and modernization on AWS. You will also discover the details of our Migration Acceleration Program (MAP) and its phases—Assess, Mobilize, and Migrate and Modernize—used to scale and meet mainframe modernization demand. 

## AWS Mainframe Modernization Approach

### Need for mainframe change

Mainframe workloads often lack the agility needed to deploy new business functions, and their technical complexity slows down development. They sustain high costs and prevent businesses from using their data efficiently.

### Common modernization drivers

At AWS, we start with the customer's drivers and goals when planning a migration. They are our compass for decision making throughout the project. Customers migrate for the following three main reasons.

#### Increase Agility

The first reason is agility: As Andy Jassy says, "The main reasons that organizations are moving to the cloud are speed and agility." Agility is the ability of a business to quickly and inexpensively respond to change. We have many dimensions where AWS Cloud brings agility to mainframe workloads. For example:

- DevOps and CI/CD 
- Elastic and on-demand services
- Pervasive automation
- API enabled services
- Managed services

#### Reduce Costs

The second reason customers modernize mainframes with AWS is cost reduction: Customers have seen between 60 percent and 90 percent cost savings when migrating mainframe workloads to AWS. 

In addition, AWS offers services and mechanisms to track and optimize costs further. Building a transparent and cost-aware architecture allows controlling expenses and aligning cost with business needs. The cost savings can then be reinvested in further mainframe modernizations or innovation. 

#### Mitigate Risks

The third reason customers modernize with AWS is to mitigate the many mainframe risks: Customers want to avoid the risks of mainframe specialists retiring. They want to avoid the risks of slow mainframe changes because of complexity. They want to avoid the risks of discontinued or unsupported technology, among other risks.

### Tenets

Before describing how to modernize, the following highlights some of the tenets we have:

- **Maximize speed to value**: First, we want to maximize speed to value. That means our approach achieves tangible business benefits quickly. And we do it with speed using mature and automated tools.  
  
  - Value – Maximize agility benefits in least amount of time
  - Speed – Highly automated, mature, and fit-for-purpose tools  
  - Achievable measurable business benefits in the short term 

- **Minimize business and technical risks**: Second, mainframe modernization is complex. So, it's very important to minimize business and technical risks. We do this with evolutionary transitions, by decomposing workloads and using proven patterns. We also use a very hands-on, pragmatic approach. We prove technical options as early as possible.
  - Evolutionary transitions – No rip-and-replace – No big bang
  - Decomposition into workloads, then packages, then services
  - Proven patterns and tools – Proven scalable infrastructure
  - Hands-on pragmatic approach – Go build

### The AWS approach

![The AWS approach](/img/aws/mm-aws-approach.png)

1. Begin by defining the goals and performing a portfolio analysis.

2. Select a workload based on its characteristics and do a deep dive discovery on it.

3. Based on the findings of the deep dive discovery, select the most appropriate migration pattern and choose a vendor to provide the tooling required to deliver it.

4. With the vendor and toolset onboarded, start the migration by capturing and automating tests, modernizing code and migrating data, and migrating integrated dependencies such as scheduling, security, printing, and other requirements raised during the deep dive discovery.

5. After migrating, the workload can be optimized to achieve further benefits on agility, cost reduction, and risk mitigation (for example, breaking monoliths into microservices, making use of fully managed services and serverless services, and removing inheritances from the mainframe). 
Accelerate innovation by taking advantage of the available services such as artificial intelligence (AI) and machine learning (ML), analytics, the Internet of Things (IoT), and others.

### Evolution to agile services and towards agility and cost control

The approach enables the evolution from the mainframe monolith to agile services. It follows the tenets we just described and aligns with the AWS Migrate then Optimize approach. 

We start with a migration to macroservices to provide business value in the short term, reduce risks by using automated tools, and set it up for microservices decomposition.

![Monolith](/img/aws/mm-monolith.png)

It starts with the mainframe monolith. It has tightly coupled programs calling one another.

The first phase is a short-term migration and modernization. In this phase, the mainframe workload is transformed into macroservices—coarse-grained business services.

They can be based on a complete mainframe workload with business functions exposed as services APIs. Or macroservices can be more granular based on a subset of a mainframe workload.

![Macroservices](/img/aws/mm-macroservices.png)

During this first phase, the mainframe workload legacy data store is migrated to a shared relational database. This shared database gives us many advantages.

It is fully supported by the migration tools for quick and reliable migration. It keeps the data normalization and structure minimizing application risks. It preserves the data integrity with strict consistency and ACID transactions.

The second phase is an optimization of some services into microservices. But in this phase, only some services—not all services—are optimized into microservices. We only extract microservices when and where it makes sense.

![Microservices](/img/aws/mm-microservices.png)

A microservice is an independent deployable service owning its own data for information hiding and for avoiding coupling. Hence, there is one database per microservice.








## MAP overview



## Assess phase



## Mobilize phase



## Migrate and Modernize phase



## Large Mainframe Workload-by-Workload Migration