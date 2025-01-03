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

### Migration for one mainframe workload

![MMM STM](/img/aws/mmm-stm.png)

To minimize the risks and accelerate the speed of the migration, our automated patterns use proven tools that provide replatforming and automated refactoring capabilities. These capabilities are essential to reuse and modernize mainframe assets quickly. These tools facilitate following cloud best practices for availability, scalability, and security.

During this type of migration, the application code is ported or converted, then recompiled for deployment on AWS. Data is also converted and migrated, usually to a relational database. If possible, there should be no manual code rewrite to avoid human errors and risks. Depending on the migration toolset that is used, there can be more or less replatforming involved, and more or less automated refactoring happening.

In many cases, the toolset provides compatibility runtimes. Sometimes they are packaged in libraries. These minimize application changes during modernization. For example, VSAM index files are modernized to a relational database this way. What’s important is that this tool-based migration is a modernization in many ways. And it brings agility benefits that we’re looking for. For example, you can see the CI/CD pipeline for agile development. You can also see the horizontal scalability for elasticity.

### Driven by customer requirements

The AWS Mainframe Modernization Approach starts from a good understanding of the customer requirements. Alignment is verified with these requirements for every activity: for pattern identification, tool evaluation, the proof of concept (POC) viability test, and the project definition and execution.

- Business developers

Business developers identify opportunities, help customers set a mainframe modernization strategy, and get started on their journey to achieve their business goals. Business developers engage mostly during the Assess phase.

- Delivery architects and consultants

Delivery architects and consultants work together with the customer throughout the migration, from scoping a POC to building and delivering the migration plan. Delivery architects and consultants engage mostly during the Mobilize and Migrate and Modernize phases.

- Executives and managers

Executives and managers set migration goals, track them, and make sure the decisions being made are aligned with their business goals. Executives and managers use their influence and the business case to drive the migration and get stakeholders to commit and prioritize the migration effort. IT executives and managers engage on all phases.

- Software development engineers and product owners

Software development engineers and product owners share their understanding of their applications, including interdependencies, execution flow, operating model, and their modernization goals. They also maintain the modernized application moving forward. Software development engineers and product owners engage on all phases.

- Solutions architects

Solutions architects design technical solutions that will help solve their customers' business goals, helping prioritize which workloads to start with, selecting migration patterns and tools, and providing a sizing of the estimated target infrastructure. Solutions architects engage mostly in the Assess phase.

## MAP overview

### MAP

The AWS Mainframe Modernization Approach is built on the Migration Acceleration Program (MAP) phases.

MAP is a comprehensive and proven cloud migration program that takes a holistic approach to migrations. It is built around the following six pillars:

- Migration methodology
- AWS and partner tools
- AWS Partners
- AWS Professional Services
- AWS Training
- AWS Investment

The purpose of MAP is to reduce the risks and increase velocity for mainframe modernization projects.

MAP is a result of AWS experience migrating thousands of enterprise customers and is divided into three phases: Assess, Mobilize, and Migrate and Modernize.

![MMM MAP phases](/img/mmm-map-phases.png)

1. **Assess**

Understand the current mainframe environment and what the gaps are that need to be addressed for a successful mainframe migration. This is where we create a case for change.

2. **Mobilize**

During Mobilize, we start laying the groundwork for the larger-scale migration, preparing the teams, and validating hypotheses. A proof of concept is delivered, a Cloud Center of Excellence is formed, and a migration plan is prepared.

3. **Migrate and Modernize**

Start large-scale migrations to the cloud in multiple waves, operate the migrated applications on the cloud, modernize them to make the most of what the cloud has to offer, and improve the migration for the next set of applications.

#### Activity breakdown by MAP phase

Each phase has a set of activities that must be performed to complete a successful mainframe migration using the AWS approach.

- **Assess**

  - Approach presentation
  - Rapid portfolio review
  - Pattern and tool guidance
  - Initial cost estimates
    - Infrastructure cost
    - Migration cost
  - POC scoping
    - POC source code analysis
    - POC candidate identification
    - POC success criteria
  - Mobilize SOW proposal
  - Optional training: [AWS Migration Readiness Assessment (MRA)](https://aws.amazon.com/migration-acceleration-program/)

## Assess phase

### Phase one

During the Assess phase, we consider the migration readiness, define a directional business case, review the application portfolio, prioritize the applications, and provide pattern and tool guidance.

- Primary outcome

  - Statement of Work (SOW) for the Mobilize phase
  - Provide an initial high-level estimate of the infrastructure and migration costs

- Duration

  - 2 to 4 weeks

- Cost

  - Pre-sale
  - No cost to customer

#### Key activities

- Approach presentation
- Rapid portfolio review
- Pattern and tool guidance
- POC scoping (source code analysis, candidate identification, and success criteria)
- Initial cost estimates (infrastructure cost and migration cost)
- SOW proposal for the Mobilize phase

#### Mitigating risks  

Next, we evaluate the technical and business components to identify challenges, risks, mitigations, and favorable opportunities.

- **Challenges**

During the mainframe modernization opportunity qualification process, these challenges indicate higher risks in pursuing the mainframe migration opportunity.

- Business

  - Migration go-live deadline within 6 months
  - No customer C-level sponsor commitment
  - No customer strategic initiative alignment
  - No customer technical team commitment
  - Large scale manual rewrite hard requirement

- Technical

  - Unsupported language such as Fortran or C++
  - Unsupported platform such as z/TPF, ALCS, HP NonStop, or BullSequana
  - No source code or no IP ownership of code
  - COTS ISV software package unless there's an IP agreement in place
  - Customer-made database or subsystem unless developed in a supported language

- **Business risks and mitigations**

During the mainframe modernization opportunity qualification process, these risks indicate the mainframe migration can be successful by using mitigation strategies.

  - Risks

    - Small mainframe capacity (<1000 MPS) with large number of lines of code (>1 MLOC)
    - AS/400 application
    - Multiple tools proposed concurrently for one application
    - Limited scope manual rewrite

  - Mitigations

    - Verify application is strategic to support business case.
    - Advise one tool per application (different options for different applications).
    - Verify manual effort scope is a few months or <5% of overall project effort.

- **Technical risks and mitigations**

During the mainframe modernization opportunity qualification process, these risks indicate the mainframe migration can be successful by using mitigation strategies.

  - Risks

    - Large assembler code with business logic (>100 KLOC)
    - 4GL languages like CA-Gen, LINC
    - Surrounding dependencies like Easytrieve, Focus, or SAS
    - Very low latency (<10ms) or very high transactions per second
    - Non-mainstream technical stack (z/VSE or IMS)

  - Mitigations

    - Verify partner solution can address and integrate.
    - Verify support and volume of code and validate with POC.
    - Verify limited project effort, partner solution, and volume of code.
    - Verify tool solution and validate with prototype.
    - Verify solution design and validate with POC.

- **Sweet spot**

During the mainframe modernization opportunity qualification process, these components are the most favorable qualities for a successful mainframe migration.

  - Business

    - Migration deadline within 1 to 3 years
    - Mainframe contract renewal within 2 to 4 years
    - Mainframe annual cost >$1M
    - Mainframe managed by customer
    - Data center exit strategy in place
    - Existing AWS customer and usage
    - Mainframe skills shortage or personnel retiring
    - Customer learned from past failed attempts at modernization

  - Technical

    - IBM mainframe z/OS
    - CICS, COBOL, PL/I, DB2, VSAM, JCL
    - COBOL on any platform

#### Defining goals

With the drivers identified and prioritized, you can move into the goals definition. The goals will be related to your modernization drivers; for example, a driver for increased agility might have faster time to market as a goal.

- Core purpose

Why are you considering a move to the cloud? 
(For example: Increase the speed and agility of your technology organization)

- Business needs

What key business priorities does technology need to support? 
(For example: User growth, cost containment, competitive threats, speed to market, and so on)

- Technology challenges

What technology challenges are limiting your ability to meet business objectives? 
(For example: Release frequency, business intelligence, app stability, app security, and so on)

- Biztech goals

What is the desired future state of your business-enabling technology? 
(For example: Real-time reporting, DevOps, Agile, and so on)

For each goal, make sure to define the metrics that will be used to track it, a target date for the goal to be achieved, and milestones to track the progress during the migration. Aside from defining the goals, your organization should strive to communicate them and make sure everyone is aligned.

The migration will hit roadblocks and several decisions will have to be made during the project. It is helpful to have stakeholders and senior leaders committed in these situations to ensure that the goals are always being considered when setbacks arise and when decisions need to be made.

Speed is a defining factor of a successful migration, to ensure that the benefits are being realized in a timely manner and that executive buy-in doesn’t wane.  During the alignment, all stakeholders and executives should understand the following:

- A phased modernization approach requires integration tools.
- Procurement timelines need to be taken into consideration.
- Technical then business-level modernization must be serialized.
- Each migration pattern has its trade-offs.

#### Workload selection criteria

After qualifying the opportunity and defining the goals with alignment from stakeholders, then we can begin a workload selection criteria and portfolio analysis.

The workload selection criteria define the business and technical characteristics that are considered when selecting a workload for migration.

It is a good practice to start with the workload selection criteria because you will know what to look for when performing the portfolio analysis.

The approach is flexible to adapt to each customer-specific context. Generally speaking, the first workloads should include the following criteria:

| Business criteria | Technical criteria |
| - | - |
| Business value | Tool support |
| Time constraints | Mainframe stack |
| Regulatory demands | IT target stack |
| Agility requirements | Complexity |
| Competitive pressure | Developer availability |
| Business strategy | Technology roadmap |

#### Portfolio analysis

After defining the criteria, we collect and compare the characteristics of each workload. This helps focus on building the portfolio with the dimensions that are important, instead of collecting all the information available and extending the time required for a portfolio analysis.

Building the portfolio requires the involvement of business and technical resources from different business domains and is time-bound to avoid having it extended for long periods of time.

With the portfolio complete, we make a straightforward analysis and rank the workloads to see which ones are aligned with the selection criteria. We select one or two workloads for a deep dive discovery.

##### Illustrative Example of Portfolio Analysis ß(for a Given Workload)

![Portfolio Analysis](/img/aws/mmm-portfolio-analysis.png)

#### Pattern definition

Based on the findings of the analysis and the defined goals, we define a migration pattern.

- Technical stack constraints

  Mainframe technical stack constraints include if the workload has mainstream or niche technologies, whether the application is homegrown or using a commercial off-the-shelf product, the languages used, and whether the source code is available.

- Size of the workload

  The size of the workload includes the total of lines of code and number of programs (for example, number of lines of code, data objects, and program objects).

- Third-party dependencies

  Mainframe third-party dependencies include Easytrieve, Focus, SAS, and 4GL languages.

-Nonfunctional requirements

  Mainframe nonfunctional requirements include transactions per second, latency, high availability, security, and scalability.

- Documentation

  Mainframe documentation and test case availability are also considered.

-Workload type

  Mainframe workload type includes comparing stabilized to maintenance mode to slow-moving or strategic.

-Pattern and tool support

  Pattern and tool support for source tech stack is also considered.

-Organizational constraints

  Organizational constraints includes mainframe developer skills, subject matter experts (SMEs), and if the mainframe is managed by a managed service provider (MSP).

- Time constraints

  Time constraints include contract renewals and migration deadlines.

-Business objectives and prioritization

  Business objectives and prioritization include cost reduction, agility gains, and risk mitigation.

-IT strategy

  IT strategy includes cloud, managed services in AWS, elasticity, portability, and use of serverless.

-Target IT stack preferences

  Target IT stack preferences include languages, frameworks, data store types, and CI/CD.


## Mobilize phase



## Migrate and Modernize phase



## Large Mainframe Workload-by-Workload Migration