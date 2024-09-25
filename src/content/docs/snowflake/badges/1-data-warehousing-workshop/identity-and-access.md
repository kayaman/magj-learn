---
title: Identity and Access
description: Learning Snowflake
sidebar:
  order: 2
---

## Create a Database

1. Create a New Database
2. Switch Your System Role to **SYSADMIN**
3. Switch Your System Role Back to **ACCOUNTADMIN**
4. Explore the Database You Created

Databases are used to group datasets (tables) together. A second-level organizational grouping, within a database, is called a schema. Every time you create a database, Snowflake will automatically create two schemas for you.

The INFORMATION_SCHEMA schema holds a collection of views. The INFORMATION_SCHEMA schema cannot be deleted (dropped), renamed, or moved.

The PUBLIC schema is created empty and you can fill it with tables, views and other things over time. The PUBLIC schema can be dropped, renamed, or moved at any time.  

5. Transfer Ownership of Your Database to the **SYSADMIN** Role
6. Switch Your System Role Back to **SYSADMIN**
