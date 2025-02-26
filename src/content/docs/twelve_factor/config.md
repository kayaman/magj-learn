---
title: Config
sidebar:
  order: 3
---

![Config](/img/12factor/3_config.webp)

**Store Configuration in the Environment**

In a Twelve-Factor App, configuration refers to anything that is likely to vary between deploys, such as:

- Database connection strings
- API keys
- Third-party service credentials
- Environment-specific settings (e.g., development vs. production)

Instead of hardcoding these settings in the codebase, a Twelve-Factor App stores configuration in environment variables. This keeps configuration separate from the application’s source code, ensuring that code remains the same across different environments while allowing settings to be adjusted as needed.

### Why This Matters

- Security – Storing credentials in code is a security risk. Keeping them in environment variables helps prevent accidental exposure.
- Portability – Different environments (development, staging, production) can use different configurations without modifying the code.
- Scalability – Multiple instances of an app can run with different configurations dynamically.
- Flexibility – Config values can be changed without redeploying the app.

#### Bad Practice (Hardcoded Config in Code)

```sh
# Bad example: Configuration is hardcoded in the source code
DATABASE_URL = "postgres://user:password@localhost:5432/mydb"
SECRET_KEY = "mysecretkey"
```
#### Good Practice (Using Environment Variables)

```python
import os

# Good example: Configuration is pulled from environment variables
DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
```

#### Good example: Configuration is pulled from environment variables

```python
import os
DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
```

### Best Practices for Managing Configuration

- Use a `.env` file in development to load environment variables.
- Use a secrets management tool (e.g., AWS Secrets Manager, HashiCorp Vault) for sensitive configurations.
- Avoid committing `.env` files to version control. Instead, use example files like `.env.example`.
- Use platform-specific environment management tools (e.g., Kubernetes ConfigMaps, Docker environment variables).

By following the Twelve-Factor principle for configuration, applications become more secure, portable, and scalable.