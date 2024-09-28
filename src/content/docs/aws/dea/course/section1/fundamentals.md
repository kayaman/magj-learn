---
title: Data Engineering Fundamentals
description: Udemy
sidebar:
  order: 1
---

## Types of data

- Structured

Data is organized in a defined manner or schema, typically found in relational databases.

  - easily queryable
  - organized in rows and columns
  - has a consistent structure

- Unstructured

Data that doesn't have a predefined structure or schema.

  - not easily queryable without preprocessing
  - may come in various formats

- Semi-structured

Data that is not as organized as structured data but has some level  of structure in the form of tags, hierarchies or other patterns.

  - elements might be tagged or chategorized in some way
  - more flexible than structured data but not as chaotic as unstructured data

## Proprties of data

- Volume
  
  Refers to the amount or size of data thatorganizations are dealing with at any given time.

- Velocity
  
  Refers to the speed at which new data is generated, collected and processed.

- Variety

  Refers to the different types, structures and sources of data.

## Data Warehouses vs. Data Lakes

### Data Warehouse

A centralized repository optimized  for analysis where data from different sources is stored in a structured format.

### Data Lake

A storage repository that holds vast amounts of raw data in its native format, including structured, semi-structured, and unstructured data.

### Schema

- **Data Warehouse**

  Schema on write: predefined schema before writing data.
  - Extract - Transform - Load (**ETL**)

- **Data Lake**

  Schema on read: schema is defined at the time of reading data.
  - Extract - Load - Transform (**ELT**)




