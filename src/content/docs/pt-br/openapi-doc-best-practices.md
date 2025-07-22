---
title: OpenAPI doc guide
description: Análise
sidebar:
  order: 5
---

### Title
Keep it concise and descriptive - typically the name of your service or product:
```yaml
title: "User Management API"
# or
title: "Payment Processing API"
```

### Description
This is where you provide the functional overview. For a small API, focus on:

**What the API does** - Lead with the primary business purpose:
```yaml
description: |
  Manages user accounts, authentication, and profile data for the XYZ platform.
  
  This API provides endpoints for user registration, login, profile management,
  and account settings. It supports both individual users and organization accounts.
```

**Key capabilities** - List the main functional areas (since you only have 6 endpoints, you can be specific):
```yaml
description: |
  Handles core user operations including:
  - User registration and authentication
  - Profile creation and updates
  - Password management
  - Account activation and deactivation
```

**Authentication/Security note** - Briefly mention how to authenticate:
```yaml
description: |
  User Management API for the XYZ platform.
  
  All endpoints require Bearer token authentication except for registration
  and login endpoints.
```

### Version
Use semantic versioning:
```yaml
version: "1.0.0"
```

### Complete Example
```yaml
info:
  title: "User Management API"
  description: |
    Manages user accounts and authentication for the XYZ platform.
    
    This API handles user registration, login, profile management, and account 
    settings. It supports both individual users and organization accounts.
    
    Authentication is required for most endpoints using Bearer tokens obtained
    through the login endpoint.
    
    Key features:
    - User registration and email verification
    - Secure authentication with JWT tokens
    - Profile management and settings
    - Password reset functionality
  version: "1.0.0"
  contact:
    name: "API Support"
    email: "api-support@company.com"
  license:
    name: "MIT"
```

### In the `info.description` (API-wide rules)
Include general parameter rules that apply across endpoints:

```yaml
info:
  title: "User Management API"
  description: |
    Manages user accounts and authentication for the XYZ platform.
    
    ### Authentication
    Most endpoints require Bearer token authentication in the Authorization header:
    `Authorization: Bearer <your-token>`
    
    ### General Parameter Rules
    - All timestamps use ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)
    - String parameters have a maximum length of 255 characters unless specified
    - Email addresses must be valid and unique across the system
    - Usernames must be 3-30 characters, alphanumeric and underscores only
    - Passwords must be at least 8 characters with mixed case and numbers
    
    ### Rate Limiting
    API calls are limited to 100 requests per minute per API key.
    
    ### Error Handling
    All errors return standard HTTP status codes with detailed error messages
    in the response body.
```

### At the Parameter Level (specific rules)
For individual parameters, use the `description` field and validation properties:

```yaml
parameters:
  - name: username
    in: path
    required: true
    description: |
      User's unique username. Must be 3-30 characters long, containing only 
      alphanumeric characters and underscores. Cannot start with a number.
    schema:
      type: string
      pattern: '^[a-zA-Z_][a-zA-Z0-9_]{2,29}$'
      example: "john_doe"
  
  - name: email
    in: query
    description: |
      User's email address. Must be a valid email format and unique in the system.
      Used for account notifications and password recovery.
    schema:
      type: string
      format: email
      maxLength: 255
      example: "user@example.com"
```

### In Schema Definitions (reusable rules)
For parameters used across multiple endpoints:

```yaml
components:
  schemas:
    UserId:
      type: integer
      description: |
        Unique identifier for a user. Must be a positive integer.
        System-generated and immutable once assigned.
      minimum: 1
      example: 12345
    
    UserStatus:
      type: string
      description: |
        Current status of the user account. Controls access permissions:
        - active: Full access to all features
        - inactive: Limited access, cannot perform write operations
        - suspended: No access, account temporarily disabled
        - deleted: Account marked for deletion, no access
      enum: [active, inactive, suspended, deleted]
      example: "active"
```

### In Operation Descriptions (endpoint-specific rules)
For rules specific to certain endpoints:

```yaml
paths:
  /users/{userId}:
    put:
      summary: "Update user profile"
      description: |
        Updates user profile information. 
        
        **Parameter Rules:**
        - Only the authenticated user can update their own profile
        - Admin users can update any profile
        - Email changes require email verification
        - Username changes are limited to once per 30 days
        
        **Validation:**
        - At least one field must be provided for update
        - Partial updates are supported
```

### Complete Example Structure
```yaml
info:
  title: "User Management API"
  description: |
    Manages user accounts and authentication for the XYZ platform.
    
    ### Global Parameter Rules
    - All IDs are positive integers
    - Timestamps use ISO 8601 format
    - String fields are trimmed of whitespace
    - Maximum request body size: 1MB
    
    ### Authentication
    Bearer token required: `Authorization: Bearer <token>`

components:
  parameters:
    UserIdParam:
      name: userId
      in: path
      required: true
      description: |
        Unique user identifier. Must belong to an existing, non-deleted user.
        Regular users can only access their own ID.
      schema:
        type: integer
        minimum: 1
        example: 12345
```

This approach gives flexibility to document rules at the appropriate level - global rules in `info`, reusable parameter rules in `components`, and specific constraints directly on parameters or operations.