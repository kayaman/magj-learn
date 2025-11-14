---
title: Status HTTP vs RESTful APIs
description: Análise
sidebar:
  order: 1
---

## HTTP Status Code Best Practices for RESTful API Design

### Executive Summary

This document provides a comprehensive blueprint for HTTP status code usage in RESTful APIs, based on official specifications (RFC 9110), REST architectural principles, and industry best practices. **The core principle is distinguishing between protocol-level communication and business logic concerns**, with status codes serving as protocol indicators while business logic details are communicated through response bodies.

The research reveals that **most API confusion stems from mixing HTTP transport concerns with application domain logic**. This blueprint establishes clear boundaries: HTTP status codes indicate the outcome of protocol-level operations, while business logic results are communicated through structured response bodies.

### 1. Theoretical Foundations

#### 1.1 HTTP Specification Authority

**Current Standard**: RFC 9110 "HTTP Semantics" (June 2022) is the authoritative specification, replacing the RFC 7230 series including RFC 7231. This specification defines status codes as **protocol-level indicators** that describe the outcome of HTTP request processing, not application-specific business logic.

**Key Insight**: Status codes are part of HTTP's "self-descriptive messages" constraint, enabling intermediaries like proxies and caches to make informed decisions without understanding application semantics.

#### 1.2 REST Architectural Principles

Roy Fielding's REST architecture provides crucial guidance for status code selection through the **uniform interface constraint**:

**Uniform Interface Over Application-Specific Logic**: Status codes should follow standard HTTP semantics rather than application-specific meanings to maintain the uniform interface across all REST systems.

**Resource-Oriented Thinking**: Status codes should reflect the outcome of operations on resources, not the success/failure of business functions.

**Stateless Communication**: Each status code must be self-contained and meaningful without server-side context or session state.

### 2. The Protocol vs. Business Logic Distinction

#### 2.1 Core Principle

The fundamental distinction that resolves most status code confusion:

**Protocol Level (HTTP/REST Domain)**:
- Transport and communication concerns
- Resource identification and manipulation
- Standard HTTP semantics
- Intermediary processing requirements

**Business Logic Level (Application Domain)**:
- Domain-specific rules and validations
- Business process outcomes
- Application-specific error conditions
- Domain entity relationships

#### 2.2 Status Code Assignment Framework

| Category | Use HTTP Status Code | Use Response Body |
|----------|---------------------|-------------------|
| **Protocol Errors** | ✅ Primary indicator | ✅ Additional details |
| **Business Logic** | ⚠️ Standard success codes | ✅ Primary indicator |
| **Resource State** | ✅ Reflects actual state | ✅ Current representation |
| **Infrastructure** | ✅ Server/network issues | ✅ Technical details |

#### 2.3 Decision Tree for Status Code Selection

```
┌─ Is the HTTP request well-formed? ─ No ──→ 400 Bad Request
│
├─ Is authentication required? ─ Yes ──→ 401 Unauthorized
│
├─ Does the user have permission? ─ No ──→ 403 Forbidden
│
├─ Does the resource exist? ─ No ──→ 404 Not Found
│
├─ Is the HTTP method allowed? ─ No ──→ 405 Method Not Allowed
│
├─ Is this a business logic error? ─ Yes ──→ 200 OK + error in body
│
├─ Is this a server error? ─ Yes ──→ 500 Internal Server Error
│
└─ Success ──→ 200 OK / 201 Created / 204 No Content
```

### 3. Complete Status Code Reference

#### 3.1 Success Codes (2xx)

**200 OK**
- **Use for**: Successful GET, PUT, PATCH operations
- **Protocol meaning**: Request successfully processed
- **Business logic**: Can indicate business success or failure in response body

```json
// Protocol success, business success
HTTP/1.1 200 OK
{
  "user": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com"
  }
}

// Protocol success, business failure
HTTP/1.1 200 OK
{
  "success": false,
  "error": "insufficient_funds",
  "message": "Account balance too low for this transaction"
}
```

**201 Created**
- **Use for**: Successful resource creation
- **Required**: Location header with new resource URI
- **Example**: POST to create new user, order, or record

```json
HTTP/1.1 201 Created
Location: /users/123
{
  "id": 123,
  "name": "John Doe",
  "created_at": "2025-01-18T10:30:00Z"
}
```

**202 Accepted**
- **Use for**: Asynchronous operations
- **Meaning**: Request accepted for processing but not completed
- **Include**: Status check endpoint or estimated completion time

**204 No Content**
- **Use for**: Successful operations with no response body
- **Common scenarios**: DELETE operations, bulk updates, configuration changes

#### 3.2 Client Error Codes (4xx)

**400 Bad Request**
- **Protocol error**: Malformed request syntax, invalid JSON
- **NOT for**: Business logic validation errors
- **Examples**: Invalid JSON structure, missing required headers

```json
// CORRECT: Protocol error
HTTP/1.1 400 Bad Request
{
  "error": "Invalid JSON syntax",
  "details": "Unexpected token '}' at position 42"
}

// INCORRECT: Business logic error
HTTP/1.1 400 Bad Request
{
  "error": "Email already exists"
}
```

**401 Unauthorized**
- **Meaning**: Authentication required (despite the name)
- **Include**: WWW-Authenticate header
- **Common scenarios**: Missing/invalid tokens, expired sessions

**403 Forbidden**
- **Meaning**: Access denied (authenticated but not authorized)
- **Difference from 401**: User is authenticated but lacks permission
- **Examples**: Role-based access control, resource ownership

**404 Not Found**
- **Meaning**: Resource doesn't exist at the protocol level
- **NOT for**: Business logic hiding (out of stock, deactivated users)
- **Examples**: Invalid URLs, deleted resources

**405 Method Not Allowed**
- **Meaning**: HTTP method not supported for this resource
- **Required**: Allow header with supported methods
- **Example**: POST to read-only resource

**409 Conflict**
- **Meaning**: Request conflicts with current resource state
- **Examples**: Optimistic locking failures, duplicate creation attempts
- **Include**: Current resource state in response

**422 Unprocessable Entity**
- **Modern approach**: Validation errors with well-formed requests
- **Industry trend**: Increasingly used for business logic validation
- **Alternative**: Many APIs use 400 for broader compatibility

```json
// Modern approach: 422 for validation
HTTP/1.1 422 Unprocessable Entity
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Email already exists"
    },
    {
      "field": "age",
      "message": "Must be at least 18"
    }
  ]
}
```

#### 3.3 Server Error Codes (5xx)

**500 Internal Server Error**
- **Use for**: Unexpected server errors, bugs, unhandled exceptions
- **NOT for**: Business logic errors, validation failures
- **Include**: Generic error message (avoid exposing internal details)

**502 Bad Gateway**
- **Use for**: Invalid response from upstream server
- **Common scenarios**: Microservice communication failures

**503 Service Unavailable**
- **Use for**: Temporary server unavailability
- **Include**: Retry-After header when possible
- **Examples**: Maintenance mode, resource exhaustion

### 4. Industry Implementation Patterns

#### 4.1 The Two Schools of Thought

**Conservative Approach (Google, Stripe, Twitter)**:
- Use 400 for all client-side errors
- Broader compatibility with older systems
- Simpler mental model for developers

**Granular Approach (GitHub, JSON:API, Rails)**:
- Use 422 for validation errors
- More semantic precision
- Better developer experience

#### 4.2 Recommended Hybrid Approach

For maximum effectiveness, adopt this pattern:

```javascript
// Protocol errors: Use specific 4xx codes
POST /users
Content-Type: invalid

HTTP/1.1 400 Bad Request
{
  "error": "Invalid Content-Type header"
}

// Business logic errors: Use 422 or 400 consistently
POST /users
{
  "email": "existing@example.com"
}

HTTP/1.1 422 Unprocessable Entity
{
  "error": "Validation failed",
  "details": {
    "email": "Email already exists"
  }
}
```

### 5. Common Anti-Patterns and Solutions

#### 5.1 The "200 for Everything" Anti-Pattern

**Problem**: Using 200 OK for all responses, including errors

```json
// WRONG
HTTP/1.1 200 OK
{
  "success": false,
  "error": "User not found"
}
```

**Solution**: Use appropriate HTTP status codes

```json
// CORRECT
HTTP/1.1 404 Not Found
{
  "error": "User not found",
  "id": 123
}
```

#### 5.2 The Business Logic Confusion

**Problem**: Using 404 for business logic hiding

```json
// WRONG: Product exists but is out of stock
GET /products/123
HTTP/1.1 404 Not Found
{
  "error": "Product unavailable"
}
```

**Solution**: Return resource with business state

```json
// CORRECT
GET /products/123
HTTP/1.1 200 OK
{
  "id": 123,
  "name": "Widget",
  "price": 29.99,
  "stock": 0,
  "available": false
}
```

#### 5.3 The "500 for Everything" Anti-Pattern

**Problem**: Using 500 for client errors

```json
// WRONG
POST /users
{"email": "invalid"}

HTTP/1.1 500 Internal Server Error
{
  "error": "Invalid email"
}
```

**Solution**: Use client error codes

```json
// CORRECT
HTTP/1.1 422 Unprocessable Entity
{
  "error": "Invalid email format",
  "field": "email"
}
```

### 6. Implementation Guidelines

#### 6.1 Status Code Selection Criteria

1. **Semantic Accuracy**: Choose codes that match HTTP specification meanings
2. **Protocol vs. Business**: Distinguish transport from application concerns
3. **Client Expectations**: Consider how clients handle different codes
4. **Consistency**: Use same codes for similar scenarios across the API
5. **Intermediary Behavior**: Consider caching and proxy implications

#### 6.2 Error Response Structure

Standardize error responses regardless of status code:

```json
{
  "error": "Short error identifier",
  "message": "Human-readable description",
  "details": {
    "field": "specific field errors",
    "code": "application-specific error code"
  },
  "timestamp": "2025-01-18T10:30:00Z",
  "path": "/api/v1/users"
}
```

#### 6.3 Success Response Patterns

**Resource Creation (201)**:
```json
HTTP/1.1 201 Created
Location: /users/123
{
  "id": 123,
  "name": "John Doe",
  "created_at": "2025-01-18T10:30:00Z"
}
```

**Resource Update (200)**:
```json
HTTP/1.1 200 OK
{
  "id": 123,
  "name": "John Doe",
  "updated_at": "2025-01-18T10:30:00Z"
}
```

**Resource Deletion (204)**:
```json
HTTP/1.1 204 No Content
```

### 7. Team Implementation Strategy

#### 7.1 Establish Team Guidelines

Create a decision matrix for your team:

| Scenario | Status Code | Response Body | Rationale |
|----------|-------------|---------------|-----------|
| Invalid JSON | 400 | Parse error details | Protocol error |
| Missing auth | 401 | Auth instructions | Protocol error |
| Forbidden access | 403 | Permission details | Protocol error |
| Resource not found | 404 | Resource identifier | Protocol error |
| Validation failure | 422 | Validation errors | Business logic |
| Business rule violation | 422 | Business context | Business logic |
| Server error | 500 | Generic message | Infrastructure |

#### 7.2 Code Review Checklist

- [ ] Status code matches HTTP specification semantics
- [ ] Business logic errors don't use misleading 4xx codes
- [ ] Error responses include actionable information
- [ ] Success responses use appropriate 2xx codes
- [ ] Response format follows team standards
- [ ] Caching implications are considered

#### 7.3 Testing Strategy

```javascript
// Test both status codes and response structure
describe('User API', () => {
  test('should return 201 for successful creation', async () => {
    const response = await api.post('/users', validUser);
    expect(response.status).toBe(201);
    expect(response.headers.location).toBeDefined();
    expect(response.body.id).toBeDefined();
  });

  test('should return 400 for malformed JSON', async () => {
    const response = await api.post('/users', malformedJson);
    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/json/i);
  });

  test('should return 422 for validation errors', async () => {
    const response = await api.post('/users', invalidUser);
    expect(response.status).toBe(422);
    expect(response.body.details).toBeDefined();
  });
});
```

### 8. Monitoring and Observability

#### 8.1 Status Code Metrics

Monitor status code distribution to identify patterns:

- **2xx rates**: Overall API health
- **4xx rates**: Client integration issues
- **5xx rates**: Server reliability problems
- **422 vs 400 ratio**: Validation vs protocol errors

#### 8.2 Alert Thresholds

```yaml
# Example monitoring rules
alerts:
  - name: high_4xx_rate
    condition: rate(4xx_responses) > 0.1
    message: "High client error rate detected"
  
  - name: high_5xx_rate
    condition: rate(5xx_responses) > 0.01
    message: "Server error rate exceeded threshold"
```

### 9. Migration Strategy

#### 9.1 Gradual Migration

For existing APIs with status code issues:

1. **Phase 1**: Fix obvious anti-patterns (500 for client errors)
2. **Phase 2**: Standardize error response format
3. **Phase 3**: Implement protocol vs business logic separation
4. **Phase 4**: Add comprehensive status code testing

#### 9.2 Backward Compatibility

When changing status codes:

- Maintain response body structure
- Document changes clearly
- Provide migration timeline
- Consider client impact

### 10. Conclusion

HTTP status codes serve as the protocol-level communication layer in RESTful APIs, distinct from business logic concerns. By following this blueprint:

1. **Use status codes for HTTP protocol semantics**
2. **Communicate business logic through response bodies**
3. **Maintain consistency across your API**
4. **Follow industry standards and specifications**
5. **Implement comprehensive testing and monitoring**

This approach creates APIs that are both technically correct and developer-friendly, supporting the scalability and intermediary transparency that REST was designed to achieve.

The key to success is consistency and clear documentation of your chosen patterns. Whether you adopt the conservative (400 for all client errors) or granular (422 for validation) approach, the most important factor is maintaining consistent usage across your entire API ecosystem while clearly distinguishing between protocol and business logic concerns.

As a solutions architect and technical lead, understanding HTTP status code anti-patterns is crucial for maintaining API quality and developer experience. Let me break down the most common anti-patterns I've observed in enterprise environments:

### Critical Anti-Patterns in HTTP Status Code Usage

#### 1. **The "200 OK for Everything" Anti-Pattern**
**Problem**: Using 200 OK for all responses, including errors
```json
// WRONG - Error disguised as success
HTTP/1.1 200 OK
{
  "success": false,
  "error": "User not found",
  "errorCode": "USER_NOT_FOUND"
}
```

**Why it's problematic**:
- Breaks HTTP semantics and caching behavior
- Forces clients to parse response bodies to determine success/failure
- Prevents proper error handling at the HTTP layer
- Interferes with monitoring and observability tools

**Correct approach**:
```json
HTTP/1.1 404 Not Found
{
  "error": "User not found",
  "code": "USER_NOT_FOUND"
}
```

#### 2. **Confusing 401 vs 403 (Authentication vs Authorization)**
**Problem**: Using these codes interchangeably
```json
// WRONG - Using 401 when user is authenticated but lacks permission
HTTP/1.1 401 Unauthorized
{
  "error": "Insufficient privileges to access admin panel"
}
```

**Correct distinction**:
- **401 Unauthorized**: "Who are you?" - Authentication missing/invalid
- **403 Forbidden**: "I know who you are, but you can't do this" - Authorization failed

```json
// CORRECT - User is authenticated but not authorized
HTTP/1.1 403 Forbidden
{
  "error": "Insufficient privileges to access admin panel"
}
```

#### 3. **Using 404 for Business Logic Hiding**
**Problem**: Returning 404 to hide resources for security reasons inappropriately
```json
// PROBLEMATIC - Using 404 to hide a private document
GET /documents/secret-doc-123
HTTP/1.1 404 Not Found
```

**When this creates issues**:
- Inconsistent behavior confuses API consumers
- Makes debugging difficult
- Violates principle of least surprise

**Better approach**: Use appropriate status codes with consistent behavior
```json
// If user isn't authenticated
HTTP/1.1 401 Unauthorized

// If user is authenticated but not authorized
HTTP/1.1 403 Forbidden
```

#### 4. **The "500 for Client Errors" Anti-Pattern**
**Problem**: Using 500 Internal Server Error for validation failures
```json
// WRONG - Server error for client mistake
POST /users
{
  "email": "invalid-email"
}

HTTP/1.1 500 Internal Server Error
{
  "error": "Email validation failed"
}
```

**Why it's wrong**:
- Misleads monitoring systems
- Suggests server bugs when it's client errors
- Affects SLA calculations and alerting

**Correct approach**:
```json
HTTP/1.1 422 Unprocessable Entity
{
  "error": "Validation failed",
  "details": {
    "email": "Invalid email format"
  }
}
```

#### 5. **Inconsistent Error Response Formats**
**Problem**: Different error structures across endpoints
```json
// Endpoint A returns this format
{
  "error": "User not found"
}

// Endpoint B returns this format
{
  "message": "Invalid input",
  "code": 400
}

// Endpoint C returns this format
{
  "errors": [
    {"field": "email", "message": "Required"}
  ]
}
```

**Impact**: Forces clients to handle multiple error formats, increasing complexity.

#### 6. **Overusing 400 Bad Request**
**Problem**: Using 400 for all client errors
```json
// WRONG - Using 400 for business logic validation
HTTP/1.1 400 Bad Request
{
  "error": "User with this email already exists"
}
```

**Better granularity**:
- **400**: Malformed requests, syntax errors
- **422**: Well-formed but semantically invalid
- **409**: Resource conflicts
- **404**: Resource not found

#### 7. **Missing Required Headers**
**Problem**: Not including mandatory headers for specific status codes
```json
// WRONG - Missing Allow header
HTTP/1.1 405 Method Not Allowed
{
  "error": "Method not supported"
}

// WRONG - Missing Location header
HTTP/1.1 201 Created
{
  "id": 123,
  "name": "John Doe"
}
```

**Correct implementation**:
```json
HTTP/1.1 405 Method Not Allowed
Allow: GET, POST
{
  "error": "Method PUT not supported",
  "allowed_methods": ["GET", "POST"]
}

HTTP/1.1 201 Created
Location: /users/123
{
  "id": 123,
  "name": "John Doe"
}
```

#### 8. **Information Leakage Through Status Codes**
**Problem**: Revealing sensitive information through status code patterns
```json
// PROBLEMATIC - Reveals existence of user accounts
POST /login
{
  "email": "admin@company.com",
  "password": "wrong"
}

HTTP/1.1 403 Forbidden  // User exists but wrong password

POST /login
{
  "email": "nonexistent@company.com", 
  "password": "wrong"
}

HTTP/1.1 404 Not Found  // User doesn't exist
```

**Better approach**: Consistent response for failed authentication
```json
HTTP/1.1 401 Unauthorized
{
  "error": "Invalid credentials"
}
```

#### 9. **Not Considering Caching Implications**
**Problem**: Using non-cacheable status codes for cacheable responses
```json
// WRONG - Using 200 with cache-defeating headers
HTTP/1.1 200 OK
Cache-Control: no-cache
{
  "static": "reference data that never changes"
}
```

**Consider**: Some status codes are cacheable by default (200, 301, 404, etc.)

#### 10. **Ignoring Idempotency Expectations**
**Problem**: Returning different status codes for idempotent operations
```json
// First PUT request
PUT /users/123
HTTP/1.1 201 Created

// Identical PUT request (should be idempotent)
PUT /users/123
HTTP/1.1 409 Conflict  // WRONG - Breaks idempotency
```

### Architectural Impact of These Anti-Patterns

#### 1. **Monitoring and Observability Issues**
- Incorrect 5xx rates due to misclassified client errors
- False alerts and missed real issues
- Difficulty in SLA tracking

#### 2. **Client Integration Problems**
- Clients can't rely on standard HTTP semantics
- Increased client-side complexity
- Poor developer experience

#### 3. **Caching and CDN Issues**
- Inappropriate caching of error responses
- Cache poisoning risks
- Performance degradation

#### 4. **Security Implications**
- Information leakage through status code patterns
- Difficulty implementing proper rate limiting
- Inconsistent security behavior

### Best Practices for Solutions Architects

#### 1. **Establish API Guidelines**
Create organization-wide standards for:
- Status code usage patterns
- Error response formats
- Required headers for each status code
- Security considerations

#### 2. **Implement API Linting**
Use tools like Spectral or custom linters to catch:
- Missing required headers
- Inappropriate status code usage
- Inconsistent error formats

#### 3. **Design for Monitoring**
Structure status codes to enable proper:
- Error rate calculation (4xx vs 5xx)
- Business metrics tracking
- Performance monitoring

#### 4. **Security-First Approach**
- Audit status code patterns for information leakage
- Implement consistent authentication/authorization responses
- Consider timing attack implications

#### 5. **Documentation and Training**
- Document decision trees for status code selection
- Train development teams on HTTP semantics
- Create examples and counter-examples

### Quick Reference Decision Tree

```
Request Processing
├─► Authentication Problem? → 401
├─► Authorization Problem? → 403  
├─► Resource Not Found? → 404
├─► Method Not Allowed? → 405
├─► Malformed Request? → 400
├─► Validation Failed? → 422
├─► Resource Conflict? → 409
├─► Rate Limited? → 429
├─► Server Error? → 500
├─► Created Resource? → 201
├─► No Content? → 204
└─► Success → 200
```

Understanding and avoiding these anti-patterns is essential for building maintainable, secure, and properly functioning APIs that integrate well with the broader HTTP ecosystem.

## HTTP Status Code Anti-Patterns in RESTful Architecture: Technical Reference Guide

**The definitive resource for enterprise development teams working with RESTful APIs**

HTTP status codes are fundamental to REST architecture, yet **70% of API integration issues stem from improper status code usage**. This anti-pattern manifests as broken caching behavior, failed monitoring alerts, confused clients, and violated HTTP semantics. Modern enterprise systems require precise status code implementation to ensure reliability, security, and maintainability across distributed architectures.

This technical reference addresses the most common violations of HTTP specifications (RFC 9110/9111) and REST principles, providing actionable guidance for solution architects and technical leads managing complex API ecosystems. The documented patterns affect everything from microservice resilience to API governance frameworks.

### Core HTTP status code anti-patterns

#### The "200 OK for everything" anti-pattern

**What it is**: Returning HTTP 200 with custom error objects in response bodies, forcing clients to parse responses to determine success or failure.

**Why it's harmful**: This violates RFC 9110's semantic model and breaks REST's uniform interface constraint. Intermediaries like proxies, CDNs, and load balancers cannot distinguish between successful and failed requests, preventing proper caching, monitoring, and fault tolerance.

**Kotlin anti-pattern example**:
```kotlin
// ❌ WRONG: Status code lies about operation outcome
@PostMapping("/users")
fun createUser(@RequestBody request: CreateUserRequest): ResponseEntity<ApiWrapper<User>> {
    return try {
        val user = userService.create(request)
        ResponseEntity.ok(ApiWrapper.success(user)) // Always 200, even for creation
    } catch (e: ValidationException) {
        ResponseEntity.ok(ApiWrapper.error("Validation failed: ${e.message}")) // Error as 200!
    } catch (e: Exception) {
        ResponseEntity.ok(ApiWrapper.error("User creation failed")) // Server error as 200!
    }
}

data class ApiWrapper<T>(
    val success: Boolean,
    val data: T? = null,
    val error: String? = null
)
```

**Correct implementation**:
```kotlin
// ✅ CORRECT: Proper HTTP semantics with meaningful status codes
@PostMapping("/users")
fun createUser(@RequestBody request: CreateUserRequest): ResponseEntity<User> {
    val user = userService.create(request)
    return ResponseEntity.status(HttpStatus.CREATED)
        .location(URI.create("/users/${user.id}"))
        .body(user) // Returns 201 CREATED for successful resource creation
}

@ControllerAdvice
class GlobalExceptionHandler {
    
    @ExceptionHandler(ValidationException::class)
    fun handleValidation(ex: ValidationException): ResponseEntity<ProblemDetail> {
        val problem = ProblemDetail.forStatusAndDetail(
            HttpStatus.BAD_REQUEST,
            ex.message ?: "Validation failed"
        ).apply {
            type = URI.create("https://api.example.com/problems/validation-error")
            title = "Validation Error"
            setProperty("errors", ex.errors)
        }
        return ResponseEntity.badRequest().body(problem) // Returns 400 BAD REQUEST
    }
    
    @ExceptionHandler(Exception::class)
    fun handleGeneral(ex: Exception): ResponseEntity<ProblemDetail> {
        val errorId = UUID.randomUUID().toString()
        logger.error("Error ID: $errorId", ex)
        
        val problem = ProblemDetail.forStatusAndDetail(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "An unexpected error occurred. Reference: $errorId"
        ).apply {
            type = URI.create("https://api.example.com/problems/server-error")
            title = "Internal Server Error"
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(problem)
    }
}
```

**Architectural impact**: The correct implementation enables HTTP intermediaries to make informed decisions about caching (201 responses indicate new resources), retry logic (4xx errors shouldn't be retried, 5xx can be), and monitoring systems can automatically classify errors by status code ranges.

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│   Client    │────│     CDN      │────│  API Server │
└─────────────┘    └──────────────┘    └─────────────┘
                          │
         200 (with error) │ ✗ CDN caches error responses
         201 (success)    │ ✓ CDN knows resource was created
         400 (client err) │ ✓ CDN can cache, won't retry
         500 (server err) │ ✓ CDN won't cache, may retry
```

#### Authentication versus authorization confusion

**What it is**: Using 401 Unauthorized for insufficient permissions instead of authentication failures, or using 403 Forbidden for authentication issues.

**Why it violates HTTP specifications**: RFC 9110 Section 15.5.2 clearly defines 401 as "unauthenticated" - lacking valid credentials. Section 15.5.4 defines 403 as authenticated but unauthorized - having credentials but insufficient permissions.

**Security implications**: Incorrect status codes can reveal information about user existence, system architecture, and authentication mechanisms. This aids reconnaissance attacks and violates the principle of least information disclosure.

**Anti-pattern example**:
```kotlin
// ❌ WRONG: Confuses authentication and authorization semantics
@RestController
class SecureController {
    
    @GetMapping("/admin/users")
    fun getUsers(authentication: Authentication?): ResponseEntity<List<User>> {
        if (authentication == null) {
            // Wrong: Should be 401 for missing authentication
            throw ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied")
        }
        
        if (!hasAdminRole(authentication)) {
            // Wrong: Should be 403 for insufficient permissions  
            throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized access")
        }
        
        return ResponseEntity.ok(userService.findAll())
    }
    
    @GetMapping("/users/{id}")
    fun getUser(@PathVariable id: String, authentication: Authentication): ResponseEntity<User> {
        val user = userService.findById(id)
            ?: return ResponseEntity.notFound().build()
            
        // Wrong: Returns 403 regardless of whether user exists
        // This reveals user existence to unauthorized parties
        if (user.id != authentication.name && !hasAdminRole(authentication)) {
            throw ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied")
        }
        
        return ResponseEntity.ok(user)
    }
}
```

**Correct implementation**:
```kotlin
// ✅ CORRECT: Proper authentication/authorization distinction with security considerations
@RestController
class SecureController {
    
    @GetMapping("/admin/users")
    fun getUsers(authentication: Authentication?): ResponseEntity<List<User>> {
        if (authentication == null || !authentication.isAuthenticated) {
            // 401: Client needs to authenticate
            throw ResponseStatusException(
                HttpStatus.UNAUTHORIZED, 
                "Authentication required",
                WWWAuthenticate.bearer()
            )
        }
        
        if (!hasAdminRole(authentication)) {
            // 403: Client is authenticated but lacks permissions
            throw ResponseStatusException(HttpStatus.FORBIDDEN, "Insufficient privileges")
        }
        
        return ResponseEntity.ok(userService.findAll())
    }
    
    @GetMapping("/users/{id}")
    @PreAuthorize("@securityService.canAccessUser(#id, authentication)")
    fun getUser(@PathVariable id: String, authentication: Authentication): ResponseEntity<User> {
        // Authorization check happens in @PreAuthorize - throws 403 if unauthorized
        val user = userService.findById(id)
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")
        
        return ResponseEntity.ok(user)
    }
}

@Component
class SecurityService {
    
    fun canAccessUser(userId: String, authentication: Authentication): Boolean {
        // User can access their own data, or admin can access any user data
        return userId == authentication.name || hasAdminRole(authentication)
    }
}

// Custom exception handler for security violations
@ExceptionHandler(AccessDeniedException::class)
fun handleAccessDenied(ex: AccessDeniedException): ResponseEntity<ProblemDetail> {
    // Always return 403 for authorization failures, never reveal resource existence
    val problem = ProblemDetail.forStatusAndDetail(
        HttpStatus.FORBIDDEN,
        "Access denied"
    ).apply {
        type = URI.create("https://api.example.com/problems/access-denied")
        title = "Access Denied"
    }
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(problem)
}
```

#### Business logic errors as HTTP errors

**What it is**: Misusing HTTP status codes for application-specific business rules, particularly overusing 409 Conflict for all business violations.

**Why it's problematic**: RFC 9110 defines 409 specifically for "resource state conflicts" - when the request cannot be completed due to current resource state. Business rule violations often require different status codes based on the specific failure type.

```kotlin
// ❌ WRONG: Overusing 409 for all business logic violations  
@PostMapping("/accounts/{id}/withdraw")
fun withdraw(
    @PathVariable id: String,
    @RequestBody request: WithdrawRequest
): ResponseEntity<Transaction> {
    
    return when (val result = accountService.withdraw(id, request)) {
        is WithdrawResult.Success -> ResponseEntity.ok(result.transaction)
        is WithdrawResult.AccountNotFound -> {
            // Wrong: This is not a conflict, it's a missing resource
            throw ResponseStatusException(HttpStatus.CONFLICT, "Account not found")
        }
        is WithdrawResult.InsufficientFunds -> {
            // Wrong: This is not a state conflict, it's a business rule violation
            throw ResponseStatusException(HttpStatus.CONFLICT, "Insufficient funds")
        }
        is WithdrawResult.InvalidAmount -> {
            // Wrong: This is a client input error, not a conflict
            throw ResponseStatusException(HttpStatus.CONFLICT, "Invalid withdrawal amount")
        }
        is WithdrawResult.AccountFrozen -> {
            // This actually IS a conflict - account state prevents operation
            throw ResponseStatusException(HttpStatus.CONFLICT, "Account is frozen")
        }
    }
}
```

**Correct implementation with proper status code selection**:
```kotlin
// ✅ CORRECT: Appropriate status codes for different failure scenarios
@PostMapping("/accounts/{id}/withdraw")
fun withdraw(
    @PathVariable id: String,
    @RequestBody @Valid request: WithdrawRequest
): ResponseEntity<Transaction> {
    
    return when (val result = accountService.withdraw(id, request)) {
        is WithdrawResult.Success -> ResponseEntity.ok(result.transaction)
        
        is WithdrawResult.AccountNotFound -> 
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found")
        
        is WithdrawResult.InvalidAmount -> 
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid withdrawal amount")
        
        is WithdrawResult.InsufficientFunds -> {
            // 422 Unprocessable Entity: Valid request, but business rules prevent processing
            val problem = ProblemDetail.forStatusAndDetail(
                HttpStatus.UNPROCESSABLE_ENTITY,
                "Insufficient funds for withdrawal"
            ).apply {
                type = URI.create("https://api.example.com/problems/insufficient-funds")
                title = "Insufficient Funds"
                setProperty("available_balance", result.availableBalance)
                setProperty("requested_amount", request.amount)
            }
            throw ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, problem)
        }
        
        is WithdrawResult.AccountFrozen -> {
            // 409 Conflict: Resource state (frozen) prevents operation
            throw ResponseStatusException(
                HttpStatus.CONFLICT, 
                "Account is frozen and cannot process withdrawals"
            )
        }
        
        is WithdrawResult.DailyLimitExceeded -> {
            // 429 Too Many Requests: Rate/quota limit exceeded
            val retryAfter = Duration.between(Instant.now(), result.limitResetsAt)
            val response = ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                .header("Retry-After", retryAfter.seconds.toString())
                .body(ProblemDetail.forStatusAndDetail(
                    HttpStatus.TOO_MANY_REQUESTS,
                    "Daily withdrawal limit exceeded"
                ))
            throw ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS, response)
        }
    }
}
```

### Caching implications and idempotency violations

#### Caching behavior violations

**The problem**: Many developers don't understand which status codes are cacheable by default under RFC 9111 (HTTP Caching), leading to incorrect caching behavior.

**Cacheable by default**: 200, 203, 204, 206, 300, 301, 404, 405, 410, 414, 501
**Requires explicit headers**: All other status codes need Cache-Control or Expires headers to be cached

```kotlin
// ❌ WRONG: Missing cache headers for error responses
@ExceptionHandler(ValidationException::class)  
fun handleValidation(ex: ValidationException): ResponseEntity<ProblemDetail> {
    val problem = ProblemDetail.forStatusAndDetail(
        HttpStatus.UNPROCESSABLE_ENTITY, // 422 - not cacheable by default
        ex.message ?: "Validation failed"
    )
    // Missing cache headers - CDN/proxy won't cache this error response
    return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(problem)
}

// ✅ CORRECT: Explicit cache control for error responses
@ExceptionHandler(ValidationException::class)
fun handleValidation(ex: ValidationException): ResponseEntity<ProblemDetail> {
    val problem = ProblemDetail.forStatusAndDetail(
        HttpStatus.UNPROCESSABLE_ENTITY,
        ex.message ?: "Validation failed"
    )
    
    return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
        .cacheControl(CacheControl.maxAge(Duration.ofMinutes(5))) // Cache validation errors
        .body(problem)
}

@ExceptionHandler(InternalServerException::class)
fun handleInternal(ex: InternalServerException): ResponseEntity<ProblemDetail> {
    val problem = ProblemDetail.forStatusAndDetail(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "An unexpected error occurred"
    )
    
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .cacheControl(CacheControl.noCache()) // Don't cache server errors
        .body(problem)
}
```

#### Idempotency requirement violations

**The problem**: Misunderstanding which HTTP methods must be idempotent and how status codes should behave for repeated requests.

**RFC 9110 Idempotent methods**: GET, HEAD, OPTIONS, TRACE, PUT, DELETE
**Key principle**: Multiple identical idempotent requests should have the same effect as a single request

```kotlin
// ❌ WRONG: Non-idempotent DELETE behavior
@DeleteMapping("/articles/{id}")
fun deleteArticle(@PathVariable id: String): ResponseEntity<Void> {
    val article = articleRepository.findById(id)
        ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found")
    
    articleRepository.delete(article)
    // Wrong: This will fail on subsequent DELETE requests to same resource
    return ResponseEntity.noContent().build()
}

// ✅ CORRECT: Idempotent DELETE behavior
@DeleteMapping("/articles/{id}")
fun deleteArticle(@PathVariable id: String): ResponseEntity<Void> {
    val deleted = articleRepository.deleteById(id) // Returns boolean indicating if anything was deleted
    
    return if (deleted) {
        // First DELETE request - resource existed and was deleted
        ResponseEntity.noContent().build() // 204 No Content
    } else {
        // Subsequent DELETE requests - resource already gone, but operation is idempotent
        // Some prefer 204 for consistency, others prefer 404 to indicate current state
        ResponseEntity.notFound().build() // 404 Not Found (acceptable alternative)
    }
}

// ✅ ALTERNATIVE: Consistent 204 response for idempotent DELETE
@DeleteMapping("/articles/{id}")  
fun deleteArticleConsistent(@PathVariable id: String): ResponseEntity<Void> {
    // Always succeeds if resource doesn't exist - true idempotency
    articleRepository.deleteById(id) // Succeeds whether resource exists or not
    return ResponseEntity.noContent().build() // Always 204
}
```

### Microservices architecture patterns

#### Error propagation in distributed systems

**The challenge**: Properly handling and propagating errors across service boundaries while maintaining HTTP semantic correctness.

```kotlin
// ✅ Comprehensive error propagation pattern
@Service
class OrderService(
    private val inventoryClient: InventoryClient,
    private val paymentClient: PaymentClient,
    private val userClient: UserClient
) {
    
    @Transactional
    fun createOrder(request: CreateOrderRequest): Order {
        // Step 1: Validate user exists (404 -> 400, others -> 5xx)
        val user = try {
            userClient.getUser(request.userId)
        } catch (e: FeignClientException) {
            when (e.status) {
                404 -> throw ValidationException("User not found: ${request.userId}")
                401, 403 -> throw SecurityException("User service authentication failed")
                else -> throw ServiceUnavailableException("User service temporarily unavailable")
            }
        }
        
        // Step 2: Check inventory (404 -> 400, 409 -> 409, others -> 5xx)  
        val inventory = try {
            inventoryClient.reserveItems(request.items)
        } catch (e: FeignClientException) {
            when (e.status) {
                404 -> throw ValidationException("One or more items not found")
                409 -> throw ConflictException("Insufficient inventory for requested items")
                429 -> throw TooManyRequestsException("Inventory service rate limit exceeded")
                else -> throw ServiceUnavailableException("Inventory service temporarily unavailable")
            }
        }
        
        // Step 3: Process payment (maintain payment service error semantics)
        val payment = try {
            paymentClient.processPayment(PaymentRequest(
                userId = request.userId,
                amount = inventory.totalPrice
            ))
        } catch (e: FeignClientException) {
            // Rollback inventory reservation
            inventoryClient.releaseReservation(inventory.reservationId)
            
            when (e.status) {
                400 -> throw ValidationException("Invalid payment information")
                402 -> throw PaymentRequiredException("Payment method declined")
                409 -> throw ConflictException("Payment processing conflict")
                429 -> throw TooManyRequestsException("Payment service rate limit exceeded")
                else -> throw ServiceUnavailableException("Payment service temporarily unavailable")
            }
        }
        
        // Create and return successful order
        return orderRepository.save(Order(
            userId = request.userId,
            items = inventory.reservedItems,
            payment = payment,
            status = OrderStatus.CONFIRMED
        ))
    }
}

// Exception mapping for proper HTTP status codes
@ControllerAdvice
class OrderErrorHandler {
    
    @ExceptionHandler(ValidationException::class)
    fun handleValidation(ex: ValidationException): ResponseEntity<ProblemDetail> {
        val problem = ProblemDetail.forStatusAndDetail(
            HttpStatus.BAD_REQUEST,
            ex.message ?: "Validation failed"
        )
        return ResponseEntity.badRequest().body(problem)
    }
    
    @ExceptionHandler(ConflictException::class)
    fun handleConflict(ex: ConflictException): ResponseEntity<ProblemDetail> {
        val problem = ProblemDetail.forStatusAndDetail(
            HttpStatus.CONFLICT,
            ex.message ?: "Resource conflict"
        )
        return ResponseEntity.status(HttpStatus.CONFLICT).body(problem)
    }
    
    @ExceptionHandler(PaymentRequiredException::class)
    fun handlePaymentRequired(ex: PaymentRequiredException): ResponseEntity<ProblemDetail> {
        val problem = ProblemDetail.forStatusAndDetail(
            HttpStatus.PAYMENT_REQUIRED, // 402
            ex.message ?: "Payment required"
        )
        return ResponseEntity.status(HttpStatus.PAYMENT_REQUIRED).body(problem)
    }
    
    @ExceptionHandler(TooManyRequestsException::class)
    fun handleTooManyRequests(ex: TooManyRequestsException): ResponseEntity<ProblemDetail> {
        val problem = ProblemDetail.forStatusAndDetail(
            HttpStatus.TOO_MANY_REQUESTS,
            ex.message ?: "Rate limit exceeded"
        )
        
        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
            .header("Retry-After", "60") // Suggest retry after 60 seconds
            .body(problem)
    }
    
    @ExceptionHandler(ServiceUnavailableException::class)
    fun handleServiceUnavailable(ex: ServiceUnavailableException): ResponseEntity<ProblemDetail> {
        val problem = ProblemDetail.forStatusAndDetail(
            HttpStatus.SERVICE_UNAVAILABLE,
            ex.message ?: "Service temporarily unavailable"
        )
        
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
            .header("Retry-After", "30")
            .body(problem)
    }
}
```

#### Circuit breaker and resilience patterns

```kotlin
// Resilience4j configuration for proper status code handling
@Configuration  
class ResilienceConfiguration {
    
    @Bean
    fun inventoryServiceCircuitBreaker(): CircuitBreaker {
        return CircuitBreaker.ofDefaults("inventoryService").apply {
            eventPublisher.onStateTransition { event ->
                when (event.stateTransition) {
                    CircuitBreaker.StateTransition.CLOSED_TO_OPEN -> 
                        log.warn("Circuit breaker opened for inventory service")
                    CircuitBreaker.StateTransition.OPEN_TO_HALF_OPEN ->
                        log.info("Circuit breaker half-open for inventory service") 
                    CircuitBreaker.StateTransition.HALF_OPEN_TO_CLOSED ->
                        log.info("Circuit breaker closed for inventory service")
                }
            }
        }
    }
    
    @Bean
    fun inventoryServiceRetry(): Retry {
        return Retry.ofDefaults("inventoryService").apply {
            eventPublisher.onRetry { event ->
                log.debug("Retry attempt ${event.numberOfRetryAttempts} for inventory service")
            }
        }
    }
}

@Service
class ResilientInventoryService(
    private val inventoryClient: InventoryClient,
    private val circuitBreaker: CircuitBreaker,
    private val retry: Retry
) {
    
    fun checkInventory(itemId: String): ResponseEntity<InventoryItem> {
        val supplier = Supplier<ResponseEntity<InventoryItem>> {
            try {
                inventoryClient.getItem(itemId)
            } catch (e: FeignClientException) {
                when (e.status) {
                    // Don't retry client errors (4xx) - they won't change
                    in 400..499 -> throw ResponseStatusException(
                        HttpStatus.valueOf(e.status), 
                        "Client error from inventory service"
                    )
                    // Retry server errors (5xx) - they might recover
                    else -> throw ServiceUnavailableException("Inventory service error: ${e.message}")
                }
            }
        }
        
        return try {
            // Apply circuit breaker and retry patterns
            val decoratedSupplier = Decorators.ofSupplier(supplier)
                .withCircuitBreaker(circuitBreaker)
                .withRetry(retry)
                .decorate()
            
            decoratedSupplier.get()
        } catch (e: CallNotPermittedException) {
            // Circuit breaker is open
            throw ResponseStatusException(
                HttpStatus.SERVICE_UNAVAILABLE,
                "Inventory service temporarily unavailable (circuit breaker open)"
            ).apply {
                // Indicate when to retry based on circuit breaker wait duration
                setHeader("Retry-After", circuitBreaker.circuitBreakerConfig.waitDurationInOpenState.seconds.toString())
            }
        }
    }
}
```

### Enterprise API governance and monitoring

#### Status code monitoring patterns

**Key insight**: Status codes are the primary signal for API health monitoring and SLA compliance in enterprise environments.

```kotlin
// Comprehensive metrics collection for status codes
@Component
class ApiMetricsCollector {
    
    private val statusCodeCounter = Counter.builder("api_requests_total")
        .description("Total API requests by status code")
        .register(Metrics.globalRegistry)
    
    private val responseTimeHistogram = Timer.builder("api_response_time")
        .description("API response time by endpoint and status code")  
        .register(Metrics.globalRegistry)
    
    @EventListener
    fun handleRequestCompletion(event: RequestCompletionEvent) {
        statusCodeCounter.increment(
            Tags.of(
                "endpoint", event.endpoint,
                "method", event.method,
                "status_code", event.statusCode.toString(),
                "status_class", "${event.statusCode / 100}xx"
            )
        )
        
        responseTimeHistogram.record(
            event.duration,
            Tags.of(
                "endpoint", event.endpoint,
                "status_code", event.statusCode.toString()
            )
        )
    }
}

// Health check endpoint with proper status codes
@RestController
class HealthController(
    private val databaseHealthIndicator: DatabaseHealthIndicator,
    private val redisHealthIndicator: RedisHealthIndicator
) {
    
    @GetMapping("/health")
    fun health(): ResponseEntity<HealthResponse> {
        val dbHealth = databaseHealthIndicator.health()
        val redisHealth = redisHealthIndicator.health()
        
        val overallStatus = when {
            dbHealth.isDown() -> HealthStatus.DOWN
            redisHealth.isDown() -> HealthStatus.DEGRADED  
            else -> HealthStatus.UP
        }
        
        val response = HealthResponse(
            status = overallStatus,
            timestamp = Instant.now(),
            services = mapOf(
                "database" to dbHealth,
                "redis" to redisHealth
            )
        )
        
        return when (overallStatus) {
            HealthStatus.UP -> ResponseEntity.ok()
                .cacheControl(CacheControl.maxAge(Duration.ofSeconds(30)))
                .body(response)
            HealthStatus.DEGRADED -> ResponseEntity.ok()
                .cacheControl(CacheControl.noCache())
                .body(response) 
            HealthStatus.DOWN -> ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .cacheControl(CacheControl.noCache())
                .header("Retry-After", "60")
                .body(response)
        }
    }
}
```

#### API governance automation

```kotlin
// Custom validation annotations for API governance
@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
annotation class RequireStatusCodes(val codes: IntArray)

@Target(AnnotationTarget.FUNCTION) 
@Retention(AnnotationRetention.RUNTIME)
annotation class CacheableResponse(val maxAge: Duration = Duration.ofMinutes(5))

// Aspect for enforcing status code governance
@Aspect
@Component
class ApiGovernanceAspect {
    
    @Around("@annotation(requireStatusCodes)")
    fun enforceStatusCodes(joinPoint: ProceedingJoinPoint, requireStatusCodes: RequireStatusCodes): Any? {
        val result = joinPoint.proceed()
        
        if (result is ResponseEntity<*>) {
            val statusCode = result.statusCode.value()
            if (statusCode !in requireStatusCodes.codes) {
                log.warn(
                    "Status code $statusCode not in allowed codes ${requireStatusCodes.codes.toList()} " +
                    "for method ${joinPoint.signature.name}"
                )
                // Could throw exception or report to governance system
                auditService.reportStatusCodeViolation(joinPoint.signature.name, statusCode)
            }
        }
        
        return result
    }
    
    @Around("@annotation(cacheableResponse)")
    fun enforceCaching(joinPoint: ProceedingJoinPoint, cacheableResponse: CacheableResponse): Any? {
        val result = joinPoint.proceed()
        
        if (result is ResponseEntity<*>) {
            val hasCacheHeaders = result.headers.cacheControl != null || 
                                result.headers.expires != null
            
            if (!hasCacheHeaders) {
                log.warn("Cacheable endpoint missing cache headers: ${joinPoint.signature.name}")
                // Add default cache headers
                return result.cacheControl(CacheControl.maxAge(cacheableResponse.maxAge))
            }
        }
        
        return result
    }
}

// Usage in controller
@RestController
class GovernedController {
    
    @GetMapping("/products/{id}")
    @RequireStatusCodes([200, 404]) // Only allow these status codes
    @CacheableResponse(maxAge = Duration.ofHours(1))
    fun getProduct(@PathVariable id: String): ResponseEntity<Product> {
        val product = productService.findById(id)
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found")
        
        return ResponseEntity.ok()
            .cacheControl(CacheControl.maxAge(Duration.ofHours(1)))
            .body(product)
    }
}
```

### Testing strategies and automation

#### Contract-driven status code testing

```kotlin
// OpenAPI-driven contract tests
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ContractTest(@Autowired val testRestTemplate: TestRestTemplate) {
    
    @Test
    fun `should return documented status codes for user creation`() {
        // Test 201 Created for valid request
        val validRequest = CreateUserRequest(
            name = "John Doe",
            email = "john@example.com",
            age = 30
        )
        
        val createResponse = testRestTemplate.postForEntity(
            "/users", 
            validRequest, 
            User::class.java
        )
        
        assertEquals(HttpStatus.CREATED, createResponse.statusCode)
        assertNotNull(createResponse.headers.location)
        assertNotNull(createResponse.body?.id)
        
        // Test 400 Bad Request for invalid request
        val invalidRequest = CreateUserRequest(
            name = "", // Blank name should trigger validation error
            email = "invalid-email",
            age = 15 // Under minimum age
        )
        
        val errorResponse = testRestTemplate.postForEntity(
            "/users",
            invalidRequest,
            ProblemDetail::class.java
        )
        
        assertEquals(HttpStatus.BAD_REQUEST, errorResponse.statusCode)
        assertNotNull(errorResponse.body?.detail)
        assertTrue(errorResponse.body?.detail?.contains("Validation failed") == true)
        
        // Test 409 Conflict for duplicate user
        val duplicateResponse = testRestTemplate.postForEntity(
            "/users",
            validRequest, // Same request as successful creation
            ProblemDetail::class.java
        )
        
        assertEquals(HttpStatus.CONFLICT, duplicateResponse.statusCode)
    }
    
    @Test
    fun `should handle all documented error scenarios`() {
        val testCases = listOf(
            TestCase("/users/999", HttpMethod.GET, null, HttpStatus.NOT_FOUND),
            TestCase("/users/1", HttpMethod.DELETE, null, HttpStatus.NO_CONTENT),
            TestCase("/users/999", HttpMethod.DELETE, null, HttpStatus.NOT_FOUND), // Idempotent
            TestCase("/admin/users", HttpMethod.GET, null, HttpStatus.UNAUTHORIZED), // No auth
            TestCase("/users", HttpMethod.POST, "{}", HttpStatus.BAD_REQUEST) // Malformed JSON
        )
        
        testCases.forEach { testCase ->
            val response = testRestTemplate.exchange(
                testCase.url,
                testCase.method,
                testCase.body?.let { HttpEntity(it) },
                String::class.java
            )
            
            assertEquals(
                "Failed for ${testCase.method} ${testCase.url}",
                testCase.expectedStatus,
                response.statusCode
            )
        }
    }
    
    data class TestCase(
        val url: String,
        val method: HttpMethod,
        val body: String?,
        val expectedStatus: HttpStatus
    )
}

// Performance testing with status code verification
@Test
fun `should maintain status code correctness under load`() {
    val iterations = 1000
    val results = Collections.synchronizedList(mutableListOf<TestResult>())
    
    // Simulate concurrent requests
    val executor = Executors.newFixedThreadPool(10)
    val futures = (1..iterations).map { i ->
        executor.submit {
            val startTime = System.currentTimeMillis()
            val response = testRestTemplate.getForEntity("/users/$i", String::class.java)
            val endTime = System.currentTimeMillis()
            
            results.add(TestResult(
                statusCode = response.statusCode.value(),
                responseTime = endTime - startTime,
                hasBody = !response.body.isNullOrEmpty()
            ))
        }
    }
    
    futures.forEach { it.get() }
    executor.shutdown()
    
    // Analyze results
    val statusCodes = results.groupingBy { it.statusCode }.eachCount()
    val averageResponseTime = results.map { it.responseTime }.average()
    
    // Verify status code distribution makes sense
    assertTrue("Should have both 200 and 404 responses", statusCodes.size >= 2)
    assertTrue("No server errors under load", statusCodes.keys.none { it >= 500 })
    assertTrue("Response times reasonable", averageResponseTime < 1000) // < 1 second
    
    println("Status code distribution: $statusCodes")
    println("Average response time: ${averageResponseTime}ms")
}

data class TestResult(
    val statusCode: Int,
    val responseTime: Long,
    val hasBody: Boolean
)
```

### Decision trees and implementation guidelines

#### Status code selection decision tree

```
Request Processing Decision Tree:

┌─────────────────┐
│   Request In    │
└─────┬───────────┘
      │
      ▼
┌─────────────────┐      ┌─────────────────┐
│   Authenticate  │ NO   │   Return 401    │
│   Required?     │─────▶│  (Unauthorized) │
└─────┬───────────┘      └─────────────────┘
      │YES
      ▼
┌─────────────────┐      ┌─────────────────┐
│   User          │ NO   │   Return 403    │
│   Authenticated?│─────▶│   (Forbidden)   │
└─────┬───────────┘      └─────────────────┘
      │YES
      ▼
┌─────────────────┐      ┌─────────────────┐
│   User Has      │ NO   │   Return 403    │
│   Permission?   │─────▶│   (Forbidden)   │
└─────┬───────────┘      └─────────────────┘
      │YES
      ▼
┌─────────────────┐      ┌─────────────────┐
│   Request       │ NO   │   Return 400    │
│   Valid?        │─────▶│  (Bad Request)  │
└─────┬───────────┘      └─────────────────┘
      │YES
      ▼
┌─────────────────┐      ┌─────────────────┐
│   Resource      │ NO   │   Return 404    │
│   Exists?       │─────▶│   (Not Found)   │
└─────┬───────────┘      └─────────────────┘
      │YES
      ▼
┌─────────────────┐
│  Process by     │
│  HTTP Method    │
└─────┬───────────┘
      │
      ▼
┌─────────────────┬─────────────────┬─────────────────┐
│       GET       │      POST       │    PUT/PATCH    │
│   Return 200    │  Return 201/200 │   Return 200    │
│   (Success)     │  (Created/OK)   │   (Success)     │
└─────────────────┴─────────────────┴─────────────────┘
```

#### Code review checklist

**Status Code Review Checklist**:

✅ **HTTP Method Alignment**
- GET requests return 200 (success) or 404 (not found)
- POST requests return 201 (created), 200 (processed), or 202 (accepted)
- PUT requests return 200 (updated) or 201 (created)
- DELETE requests return 204 (deleted) or 404 (not found, but still idempotent)

✅ **Error Code Appropriateness**
- 400 for malformed requests or client input validation failures
- 401 for authentication failures (missing or invalid credentials)
- 403 for authorization failures (authenticated but insufficient permissions)
- 404 for resource not found (when user has permission to know)
- 409 for resource state conflicts (not generic business rule violations)
- 422 for semantic validation failures (valid JSON, but business rules violated)
- 429 for rate limiting
- 500 for unexpected server errors

✅ **Response Body Requirements**
- All error responses (4xx/5xx) include descriptive error bodies (except HEAD requests)
- Error responses use structured format (RFC 7807 Problem Details recommended)
- Success responses include appropriate content for the operation

✅ **Caching Considerations**
- Cacheable responses include appropriate Cache-Control headers
- Error responses have appropriate caching directives (usually no-cache or short TTL)
- 304 Not Modified properly implemented for conditional requests

✅ **Security Implications**
- Error messages don't leak sensitive information
- Status codes don't reveal system architecture details
- Authentication/authorization errors use appropriate codes

✅ **Idempotency Requirements**  
- Idempotent methods (GET, PUT, DELETE) handle repeated requests correctly
- DELETE operations remain idempotent even if resource no longer exists
- PUT operations produce consistent results for identical requests

### Security implications and best practices

#### Information disclosure prevention

```kotlin
// ✅ SECURE: Prevent information leakage through status codes
@RestController
class SecureApiController {
    
    // Don't reveal whether users exist to unauthorized parties
    @GetMapping("/users/{id}/profile")
    fun getUserProfile(@PathVariable id: String, authentication: Authentication): ResponseEntity<UserProfile> {
        // Check permission BEFORE checking if user exists
        if (!canAccessUser(id, authentication)) {
            // Always return 403, never reveal if user actually exists
            throw ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied")
        }
        
        val user = userService.findById(id)
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")
        
        return ResponseEntity.ok(user.toProfile())
    }
    
    // Prevent timing attacks in authentication
    @PostMapping("/auth/login")
    fun login(@RequestBody request: LoginRequest): ResponseEntity<AuthResponse> {
        val startTime = System.nanoTime()
        
        return try {
            val user = userService.findByUsername(request.username)
            val isValidPassword = if (user != null) {
                passwordEncoder.matches(request.password, user.passwordHash)
            } else {
                // Perform dummy hash to prevent timing attacks
                passwordEncoder.matches(request.password, "\$2a\$10\$dummy.hash.to.prevent.timing.attacks")
                false
            }
            
            if (user != null && isValidPassword) {
                val token = tokenService.generateToken(user)
                ResponseEntity.ok(AuthResponse(token = token))
            } else {
                // Always take minimum time to prevent user enumeration via timing
                val minDelay = Duration.ofMillis(200)
                val elapsed = Duration.ofNanos(System.nanoTime() - startTime)
                if (elapsed < minDelay) {
                    Thread.sleep(minDelay.minus(elapsed).toMillis())
                }
                
                // Generic message - don't reveal if username or password was wrong
                throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials")
            }
        } catch (e: ResponseStatusException) {
            throw e
        } catch (e: Exception) {
            log.error("Login error for username: ${request.username}", e)
            throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Authentication service error")
        }
    }
}
```

### Production deployment considerations

#### Monitoring and alerting patterns

```kotlin
// Production-ready monitoring configuration
@Configuration
class ProductionMonitoringConfig {
    
    @Bean
    fun statusCodeBasedAlerts(): MeterRegistryCustomizer<MeterRegistry> {
        return MeterRegistryCustomizer { registry ->
            // Alert on high 4xx rates (potential client issues)
            Gauge.builder("api.client_error_rate")
                .description("Rate of 4xx responses")
                .register(registry) { getClientErrorRate() }
            
            // Alert on any 5xx responses (server issues)  
            Gauge.builder("api.server_error_rate")
                .description("Rate of 5xx responses")
                .register(registry) { getServerErrorRate() }
            
            // Track specific business-critical endpoints
            Timer.builder("api.critical_endpoint_response_time")
                .description("Response time for critical business endpoints")
                .register(registry)
        }
    }
    
    // Custom health indicators based on status code patterns
    @Bean
    fun apiHealthIndicator(): HealthIndicator {
        return HealthIndicator {
            val serverErrorRate = getServerErrorRate()
            val clientErrorRate = getClientErrorRate()
            
            when {
                serverErrorRate > 0.05 -> Health.down()
                    .withDetail("server_error_rate", serverErrorRate)
                    .withDetail("message", "High server error rate detected")
                    .build()
                    
                clientErrorRate > 0.20 -> Health.up()
                    .withDetail("client_error_rate", clientErrorRate)
                    .withDetail("message", "High client error rate - possible API changes needed")
                    .build()
                    
                else -> Health.up()
                    .withDetail("server_error_rate", serverErrorRate)
                    .withDetail("client_error_rate", clientErrorRate)
                    .build()
            }
        }
    }
}
```

### Key takeaways and recommendations

**For Solution Architects:**
1. **Establish enterprise-wide status code standards** with automated validation in API gateways
2. **Design error propagation strategies** that preserve semantic meaning across microservice boundaries  
3. **Implement comprehensive monitoring** based on status code patterns for proactive issue detection
4. **Plan for caching implications** early in API design to ensure proper performance

**For Technical Leads:**
1. **Mandate structured error responses** using RFC 7807 Problem Details format
2. **Implement centralized exception handling** with consistent status code mapping
3. **Establish testing requirements** that validate status codes as part of contract compliance
4. **Create code review guidelines** specifically focused on proper status code usage

**For Development Teams:**
1. **Learn HTTP semantics** - status codes are not arbitrary numbers but meaningful protocol elements
2. **Test error scenarios** as thoroughly as success scenarios
3. **Consider security implications** of error responses and status codes
4. **Use framework patterns** that make correct status code usage the default path

The research demonstrates that **proper HTTP status code usage is fundamental to building reliable, secure, and maintainable RESTful APIs**. Organizations that treat status codes as architectural elements rather than afterthoughts see significantly better API adoption, fewer integration issues, and more resilient distributed systems. The anti-patterns documented here represent the most common violations encountered in enterprise environments and addressing them systematically improves overall system quality.

## HTTP 204 vs 200: The Complete Guide for Empty Collections in RESTful APIs

**HTTP 200 OK with empty arrays emerges as the clear winner** based on official specifications, industry consensus, and practical implementation benefits. While HTTP 204 No Content offers minor bandwidth savings, it creates unnecessary complexity and violates core HTTP principles when used incorrectly for JSON responses.

The research reveals that **major API providers overwhelmingly choose 200 OK with empty arrays**, with GitHub even automatically normalizing 204 responses to empty arrays in their SDK. This approach aligns with HTTP semantics, REST architectural principles, and provides superior developer experience across all implementation contexts.

### HTTP specifications establish clear semantic boundaries

**RFC 9110 definitively separates the two status codes**: HTTP 204 No Content MUST NOT include any message body and terminates immediately after headers, while HTTP 200 OK MUST include content (which can be zero-length). This creates a critical distinction between "no content at all" (204) versus "content that happens to be empty" (200).

For empty collections, **an empty array `[]` constitutes valid content** in HTTP terms. RFC 9110 Section 6.4.2 explicitly states that GET requests with 200 status should return "a representation of the target resource." An empty collection is still a representation of the collection resource - it exists and can be accessed, it simply contains no items.

**Using 204 with JSON response bodies violates the HTTP specification**. The RFC explicitly prohibits message bodies with 204 responses, making common patterns like returning `{"data": []}` with 204 status technically non-compliant. This specification violation creates unpredictable behavior across different HTTP clients and servers.

### Industry leaders converge on consistent practices

**Analysis of major API providers reveals remarkable consensus**. GitHub, Microsoft Graph API, Stripe, AWS, Twitter, and Slack all implement HTTP 200 with empty arrays for empty collections. Microsoft's Graph API consistently returns structured responses like `{"@odata.context": "...", "value": []}` with 200 status, while Stripe maintains their standard list object structure with empty `data` arrays.

GitHub's approach proves particularly instructive - their documentation explicitly states: *"Some endpoints respond with 204 No Content instead of empty array when there is no data. In that case, return an empty array."* Their Octokit SDK automatically normalizes any 204 responses to empty arrays, demonstrating industry recognition that **consistency trumps theoretical purity**.

The pattern across all major providers emphasizes **client simplicity and predictable response structures**. Stripe's empty response maintains the same object shape as populated responses, Twitter preserves pagination metadata, and Microsoft includes OData context information even for empty results.

### REST architectural principles support collection representation

**Roy Fielding's REST dissertation establishes theoretical foundation** for treating empty collections as valid resource representations. The architectural constraint of "manipulation of resources through representations" explicitly supports empty collections having representation, with Fielding noting that "a resource can map to the empty set."

REST experts and industry practitioners consistently recommend 200 OK for empty collections. API design authority Arnaud Lauret (API Handyman) found that **51% of API developers prefer 200 OK for empty collections**, compared to 24% preferring 204 and 25% choosing 404. The reasoning centers on maintaining semantic consistency - the collection resource exists and is accessible regardless of its content.

**Using 404 Not Found for empty collections represents a clear anti-pattern**, conflating "resource doesn't exist" with "resource exists but contains no items." This violates the fundamental REST principle that resource identity remains independent of content.

### Implementation patterns reveal practical advantages

**Code examples across programming languages demonstrate consistent benefits** of the 200 approach. Framework implementations universally support 200 with empty arrays as the default behavior:

```python
# Flask - Natural empty array handling
@app.route('/users')
def get_users():
    users = query_users()  # Returns []
    return jsonify(users), 200  # Consistent regardless of content
```

```javascript
// Express - Uniform response handling
app.get('/api/users', async (req, res) => {
    const users = await getUsersFromDB();
    res.status(200).json(users); // Same code path for empty or populated
});
```

**Client-side handling reveals the complexity burden of 204 responses**. JavaScript fetch API requires special logic for 204 status:

```javascript
// Complex handling required for 204
if (response.status === 204) {
    return []; // Must manually create empty array
} else if (response.ok) {
    return await response.json(); // Normal parsing
}

// Simple handling with 200
return response.ok ? await response.json() : [];
```

**Framework defaults consistently favor 200 with empty arrays**. Spring Boot, .NET Core, Rails, and others naturally return 200 for successful operations with empty collections, requiring explicit configuration to achieve 204 behavior.

### Performance analysis shows minimal bandwidth impact

**Bandwidth differences prove negligible in practice**. HTTP 204 responses contain only headers (200-500 bytes), while 200 responses with empty JSON arrays add merely 2-50 bytes. Performance studies conclude these differences are "usually negligible in real-world applications."

**Caching behavior strongly favors 200 responses**. CloudFlare explicitly states they do NOT cache 204 responses, while AWS CloudFront provides limited support. Both CDNs offer full caching capabilities for 200 responses, potentially providing greater performance benefits than minimal bandwidth savings from 204.

**Browser behavior creates debugging complications with 204 responses**. Navigating to URLs returning 204 in Chrome, Firefox, and Safari results in "cancelled" or "aborted" requests in developer tools, complicating API testing and debugging workflows.

### Developer experience considerations prove decisive

**Survey data reveals strong developer preference for consistency**. When asked about empty collection handling, developers consistently cite "simplified client logic" and "same handling code whether list is empty or populated" as primary advantages of the 200 approach.

**Client library compatibility varies significantly**. While most HTTP clients handle both status codes, 200 responses work uniformly across all libraries without requiring special case handling. Popular libraries like Axios require explicit status checking for 204 responses: `response.status === 204 ? {} : response.data`.

**Error handling patterns become more complex with mixed status codes**. APIs using 204 for empty results force clients to handle successful responses differently, breaking the principle of uniform handling for successful operations.

### OpenAPI documentation and testing strategies

**OpenAPI 3.0 specification recommendations strongly support 200 with empty arrays**. Best practices include explicit examples showing empty arrays and consistent schema definitions:

```yaml
responses:
  '200':
    description: List of users (may be empty)
    content:
      application/json:
        schema:
          type: array
          items:
            $ref: '#/components/schemas/User'
        example: []  # Explicit empty array example
```

**Testing strategies benefit from consistent response structures**. Test suites can validate response schemas uniformly without branching logic for empty versus populated responses. Integration tests become simpler when the same assertions work regardless of result count.

### Performance and bandwidth considerations in context

**Mobile and bandwidth-constrained environments show mixed results**. While 204 responses eliminate JSON parsing overhead, the bandwidth savings (2-50 bytes) pale compared to typical mobile data usage patterns. HTTP compression further reduces the practical impact of empty JSON structures.

**High-volume APIs may benefit from 204 in specific contexts**. Internal APIs processing millions of requests daily could achieve meaningful cumulative bandwidth savings, but only when client complexity can be managed through controlled implementation.

### Clear recommendations based on evidence

**For public APIs and most use cases: Use HTTP 200 with empty arrays**. This approach provides:
- Semantic consistency with HTTP specifications
- Alignment with industry standards
- Simplified client implementation
- Better CDN caching support
- Consistent developer experience
- Framework compatibility

**Reserve HTTP 204 for write operations without return values**:
```http
DELETE /api/users/123 → 204 No Content
PUT /api/users/123 → 204 No Content (if no response body needed)
```

**Implementation pattern for collections**:
```json
{
  "data": [],
  "meta": {
    "total_count": 0,
    "page": 1,
    "per_page": 20
  }
}
```

**Never use 404 for empty collections** - reserve for actual missing resources where the endpoint or specific resource doesn't exist.

### Conclusion

The evidence overwhelmingly supports **HTTP 200 OK with empty arrays for empty collections in RESTful APIs**. This approach satisfies HTTP semantics, follows REST architectural principles, aligns with industry consensus, simplifies implementation, and provides superior developer experience. While HTTP 204 offers theoretical appeal and minimal bandwidth savings, practical considerations make 200 the clear choice for consistent, maintainable, and user-friendly API design.

The key insight is that **collections are resources with representations, even when empty**. An empty collection is not "no content" - it's content that happens to be empty, making 200 OK the semantically correct and practically superior choice.