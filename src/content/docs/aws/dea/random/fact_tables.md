---
title: Fact Tables
description: ChatGPT
sidebar:
  order: 1
---

## What is a Fact Table?

A **fact table** is a central table in a **star schema** or **snowflake schema** of a **data warehouse**. It primarily stores **quantitative data (measures)** for analysis and reporting. These tables are characterized by:

- **Granularity**: The level of detail stored in the table (e.g., daily sales vs. hourly sales).
- **Foreign Keys**: Links to **dimension tables** that provide descriptive context.
- **Measures**: Numeric values that are analyzed (e.g., revenue, quantity sold, order count).

## Key Characteristics of Fact Tables

- Contains **foreign keys** to dimension tables.
- Stores **measures** that are typically **aggregated** (sum, average, count, etc.).
- Can grow **very large** due to transactional data.

## Examples of Fact Table Types

### 1. **Transactional Fact Table**

- Stores data at the **lowest level of granularity** (each transaction).
- Best for **sales, purchases, log events, or financial transactions**.

#### Example: `sales_fact`

| sale_id | product_id | customer_id | store_id | sale_date  | quantity | total_price |
| ------- | ---------- | ----------- | -------- | ---------- | -------- | ----------- |
| 1001    | 200        | 501         | 10       | 2024-03-16 | 2        | 50.00       |
| 1002    | 300        | 502         | 11       | 2024-03-16 | 1        | 20.00       |
| 1003    | 400        | 503         | 10       | 2024-03-17 | 3        | 75.00       |

📌 **Use Case:** Track individual **sales transactions** for revenue analysis.

---

### 2. **Snapshot Fact Table**

- Captures **status at a specific point in time** (daily, weekly, monthly).
- Best for **inventory levels, account balances, or employee count**.

#### Example: `daily_inventory_fact`

| snapshot_date | product_id | store_id | stock_level |
| ------------- | ---------- | -------- | ----------- |
| 2024-03-16    | 200        | 10       | 500         |
| 2024-03-16    | 300        | 11       | 200         |
| 2024-03-17    | 200        | 10       | 480         |

📌 **Use Case:** Track **inventory levels** over time.

---

### 3. **Accumulating Snapshot Fact Table**

- Used for **tracking processes with multiple steps**.
- Stores records that get **updated** as the process moves forward.
- Best for **order fulfillment, claim processing, shipment tracking**.

#### Example: `order_processing_fact`

| order_id | customer_id | order_date | payment_date | shipped_date | delivered_date | order_status |
| -------- | ----------- | ---------- | ------------ | ------------ | -------------- | ------------ |
| 5001     | 701         | 2024-03-01 | 2024-03-02   | 2024-03-05   | 2024-03-07     | Delivered    |
| 5002     | 702         | 2024-03-03 | 2024-03-04   | NULL         | NULL           | Pending      |
| 5003     | 703         | 2024-03-05 | 2024-03-06   | 2024-03-08   | NULL           | Shipped      |

📌 **Use Case:** Monitor the **lifecycle of orders** from creation to delivery.

---

## **Summary Table**

| Fact Table Type           | Purpose                                   | Example Use Case  |
| ------------------------- | ----------------------------------------- | ----------------- |
| **Transactional Fact**    | Stores individual transactions            | Sales records     |
| **Snapshot Fact**         | Captures data at a specific point in time | Daily inventory   |
| **Accumulating Snapshot** | Tracks events over time in a process      | Order fulfillment |

---

Each type serves **a different analytical need**, allowing businesses to track transactions, monitor statuses, and analyze historical trends effectively.

## Related Concepts

### 1. **Dimension Tables**

- Describe **context** for facts (e.g., time, product, customer, location).
- Contain **descriptive attributes** (e.g., product name, category).
- Used for filtering, grouping, and categorization.

### 2. **Star Schema**

- A **simplified** schema where a central fact table is surrounded by dimension tables.
- Optimized for **read-heavy** workloads and **fast queries**.
- Example: A `sales_fact` table linked to `customer_dim`, `product_dim`, `date_dim`.

```less
          Dimension
              |
Dimension — Fact Table — Dimension
              |
          Dimension
```

### 3. **Snowflake Schema**

- A **normalized** version of the star schema where dimension tables are split into multiple related tables.
- Reduces **data redundancy** but increases **query complexity**.

```vbnet
          Dimension
              |
          Sub-Dimension
              |
Dimension — Fact Table — Dimension
              |
          Sub-Dimension
              |
          Dimension

```

### 4. **Fact Table Types**

- **Transactional Fact Table**: Stores individual transactions (e.g., sales, purchases).
- **Snapshot Fact Table**: Captures data at specific points in time (e.g., daily inventory levels).
- **Accumulating Snapshot Fact Table**: Tracks historical changes over time (e.g., order processing lifecycle).

### 5. **Fact Table Granularity**

- Defines the **level of detail** in the table (e.g., per transaction, per day, per region).
- Higher granularity = **more records**, but **more detail**.
- Lower granularity = **fewer records**, but **less detail**.

### 6. **ETL (Extract, Transform, Load) Process**

- Fact tables are populated through **ETL pipelines**.
- **Extract**: Data is pulled from source systems.
- **Transform**: Data is cleaned and structured.
- **Load**: Data is inserted into the fact table.

## Example of a Fact Table

| order_id | product_id | customer_id | order_date | quantity | total_price |
| -------- | ---------- | ----------- | ---------- | -------- | ----------- |
| 1001     | 200        | 501         | 2024-03-16 | 2        | 50.00       |
| 1002     | 300        | 502         | 2024-03-16 | 1        | 20.00       |

- `order_id`, `product_id`, and `customer_id` are **foreign keys** linking to dimension tables.
- `quantity` and `total_price` are **measures** used for analysis.

## Conclusion

Fact tables are fundamental in **data warehouses**, providing the core **quantitative** data for reporting and analytics. They work alongside **dimension tables**, following **star or snowflake schemas**, and are loaded through **ETL processes**.

Understanding fact tables and their related concepts is key to building **efficient, scalable** data pipelines for business intelligence and analytics.

---
