---
title: BFF Reference Architecture
description: Análise
sidebar:
  order: 4
---

## Kotlin Spring Boot BFF Reference Architecture Guide

### Executive Overview

This comprehensive reference architecture guide provides production-ready patterns and practices for building scalable Kotlin Spring Boot Backend-for-Frontend (BFF) applications deployed on Kubernetes and AWS. The guide covers everything from project organization to deployment strategies, targeting medium-complexity applications with room for scaling.

**BFF applications aggregate multiple backend services into optimized interfaces for different frontend clients** (mobile, web, desktop), providing client-specific data transformation, caching, and business logic orchestration while maintaining clean separation of concerns.

### 1. Project Structure and Organization

#### Recommended Multi-Module Structure

```
bff-application/
├── build.gradle.kts (root)
├── settings.gradle.kts
├── core/                    # Domain entities & interfaces
│   ├── build.gradle.kts
│   └── src/main/kotlin/
│       └── com/example/domain/
├── usecases/               # Application business rules
│   ├── build.gradle.kts
│   └── src/main/kotlin/
│       └── com/example/usecases/
├── infrastructure/         # Data providers & external services
│   ├── build.gradle.kts
│   └── src/main/kotlin/
│       └── com/example/infrastructure/
└── bff-web/               # Web BFF layer
    ├── build.gradle.kts
    └── src/main/kotlin/
        └── com/example/bff/web/
```

#### Package Organization by Feature

```kotlin
com.example.bff
├── user/
│   ├── UserController.kt
│   ├── UserService.kt
│   ├── UserRepository.kt
│   └── User.kt
├── product/
│   ├── ProductController.kt
│   ├── ProductService.kt
│   ├── ProductRepository.kt
│   └── Product.kt
└── order/
    ├── OrderController.kt
    ├── OrderService.kt
    ├── OrderRepository.kt
    └── Order.kt
```

#### Build Configuration

```kotlin
// build.gradle.kts
plugins {
    id("org.springframework.boot") version "3.2.0"
    id("io.spring.dependency-management") version "1.1.4"
    kotlin("jvm") version "1.9.20"
    kotlin("plugin.spring") version "1.9.20"
    kotlin("plugin.jpa") version "1.9.20"
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-webflux")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-data-redis")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-reactor")
    implementation("io.github.resilience4j:resilience4j-spring-boot3")
    implementation("io.micrometer:micrometer-registry-prometheus")
    implementation("io.awspring.cloud:spring-cloud-aws-starter-sqs")
}
```

### 2. Clean Architecture Implementation

#### Domain Layer (Core Module)

```kotlin
// Domain Entity with Value Objects
data class User(
    val id: UserId,
    val name: String,
    val email: Email,
    val phoneNumber: PhoneNumber
) {
    companion object {
        fun create(name: String, email: String, phone: String): User {
            return User(
                id = UserId.generate(),
                name = name,
                email = Email(email),
                phoneNumber = PhoneNumber(phone)
            )
        }
    }
}

@JvmInline
value class UserId(val value: String) {
    companion object {
        fun generate() = UserId(UUID.randomUUID().toString())
    }
}

@JvmInline
value class Email(val value: String) {
    init {
        require(value.contains("@")) { "Invalid email format" }
    }
}
```

#### Use Cases Layer (Application Business Rules)

```kotlin
interface UserRepository {
    suspend fun save(user: User): User
    suspend fun findById(id: UserId): User?
}

class CreateUserUseCase(
    private val userRepository: UserRepository
) {
    suspend fun execute(request: CreateUserRequest): CreateUserResponse {
        val user = User.create(
            name = request.name,
            email = request.email,
            phone = request.phoneNumber
        )
        
        val savedUser = userRepository.save(user)
        return CreateUserResponse(savedUser)
    }
}

// Use Case Executor Pattern
interface UseCase<REQUEST, RESPONSE> {
    suspend fun execute(request: REQUEST): RESPONSE
}

class UseCaseExecutor {
    suspend fun <REQUEST, RESPONSE> execute(
        useCase: UseCase<REQUEST, RESPONSE>,
        request: REQUEST
    ): RESPONSE = useCase.execute(request)
}
```

#### Infrastructure Layer

```kotlin
@Repository
class UserRepositoryImpl(
    private val userJpaRepository: UserJpaRepository
) : UserRepository {
    
    override suspend fun save(user: User): User {
        val entity = user.toEntity()
        val savedEntity = userJpaRepository.save(entity)
        return savedEntity.toDomain()
    }
    
    override suspend fun findById(id: UserId): User? {
        return userJpaRepository.findById(id.value)
            ?.toDomain()
    }
}

@Entity
@Table(name = "users")
data class UserEntity(
    @Id val id: String,
    val name: String,
    val email: String,
    val phoneNumber: String
)
```

#### Presentation Layer

```kotlin
@RestController
@RequestMapping("/api/v1/users")
class UserController(
    private val createUserUseCase: CreateUserUseCase,
    private val useCaseExecutor: UseCaseExecutor
) {
    
    @PostMapping
    suspend fun createUser(@RequestBody request: CreateUserWebRequest): ResponseEntity<UserResponse> {
        val useCaseRequest = CreateUserRequest(
            name = request.name,
            email = request.email,
            phoneNumber = request.phoneNumber
        )
        
        val response = useCaseExecutor.execute(createUserUseCase, useCaseRequest)
        
        return ResponseEntity.ok(UserResponse.from(response.user))
    }
}
```

### 3. SOLID Principles Implementation

#### Single Responsibility Principle

```kotlin
// ✅ Good - Single responsibility per class
@Service
class UserCreationService(
    private val userRepository: UserRepository,
    private val emailService: EmailService,
    private val auditService: AuditService
) {
    fun createUser(request: CreateUserRequest): User {
        val user = User.create(request.name, request.email, request.phone)
        val savedUser = userRepository.save(user)
        
        emailService.sendWelcomeEmail(savedUser)
        auditService.logUserCreation(savedUser)
        
        return savedUser
    }
}
```

#### Open/Closed Principle

```kotlin
interface PaymentProcessor {
    fun processPayment(amount: Double): PaymentResult
}

@Component
class CreditCardProcessor : PaymentProcessor {
    override fun processPayment(amount: Double): PaymentResult {
        return PaymentResult.success("Credit card payment processed")
    }
}

@Component
class PayPalProcessor : PaymentProcessor {
    override fun processPayment(amount: Double): PaymentResult {
        return PaymentResult.success("PayPal payment processed")
    }
}

@Service
class PaymentService(
    private val processors: List<PaymentProcessor>
) {
    fun processPayment(paymentType: PaymentType, amount: Double): PaymentResult {
        val processor = processors.find { it.supports(paymentType) }
            ?: throw IllegalArgumentException("Unsupported payment type")
        
        return processor.processPayment(amount)
    }
}
```

#### Dependency Inversion Principle

```kotlin
interface NotificationService {
    suspend fun sendNotification(message: String, recipient: String)
}

@Service
class EmailNotificationService : NotificationService {
    override suspend fun sendNotification(message: String, recipient: String) {
        // Email implementation
    }
}

@Service
class UserRegistrationService(
    private val notificationService: NotificationService // Depends on abstraction
) {
    suspend fun registerUser(userRequest: CreateUserRequest) {
        // Registration logic
        
        notificationService.sendNotification(
            message = "Welcome to our service!",
            recipient = userRequest.email
        )
    }
}
```

### 4. BFF-Specific Patterns

#### Client-Specific Controllers

```kotlin
// Mobile BFF - Lightweight responses
@RestController
@RequestMapping("/mobile/api/v1")
class MobileProductController(private val productService: ProductService) {
    
    @GetMapping("/products/{id}")
    suspend fun getProduct(@PathVariable id: String): MobileProductResponse {
        val product = productService.getProduct(ProductId(id))
            ?: throw ProductNotFoundException(id)
            
        return MobileProductResponse(
            id = product.id.value,
            name = product.name,
            price = product.price
        )
    }
}

// Web BFF - Rich responses with aggregated data
@RestController
@RequestMapping("/web/api/v1")
class WebProductController(
    private val productService: ProductService,
    private val reviewService: ReviewService,
    private val inventoryService: InventoryService
) {
    
    @GetMapping("/products/{id}")
    suspend fun getProduct(@PathVariable id: String): WebProductResponse {
        val productId = ProductId(id)
        
        // Parallel API calls using coroutines
        val product = async { productService.getProduct(productId) }
        val reviews = async { reviewService.getReviews(productId) }
        val inventory = async { inventoryService.getInventory(productId) }
        
        return WebProductResponse(
            id = product.await()!!.id.value,
            name = product.await()!!.name,
            reviews = reviews.await().map { ReviewResponse.from(it) },
            stockLevel = inventory.await().stockLevel,
            recommendations = productService.getRecommendations(productId)
        )
    }
}
```

#### API Aggregation Service

```kotlin
@Service
class UserAggregatorService(
    private val userService: UserService,
    private val orderService: OrderService,
    private val recommendationService: RecommendationService
) {
    
    suspend fun getUserDashboard(userId: String): UserDashboardDto = coroutineScope {
        // Parallel API calls using coroutines
        val userDeferred = async { userService.getUser(userId) }
        val ordersDeferred = async { orderService.getUserOrders(userId) }
        val recommendationsDeferred = async { recommendationService.getRecommendations(userId) }
        
        // Await all results
        val user = userDeferred.await()
        val orders = ordersDeferred.await()
        val recommendations = recommendationsDeferred.await()
        
        // Transform and aggregate
        UserDashboardDto(
            user = user.toDto(),
            recentOrders = orders.take(5).map { it.toSummaryDto() },
            recommendations = recommendations.map { it.toDto() }
        )
    }
}
```

#### External Service Client with Resilience

```kotlin
@Component
class UserServiceClient(
    private val webClient: WebClient,
    @Value("\${services.user-service.url}") private val userServiceUrl: String
) {
    
    @CircuitBreaker(name = "user-service", fallbackMethod = "fallbackGetUser")
    @Retry(name = "user-service")
    @TimeLimiter(name = "user-service")
    suspend fun getUser(userId: String): UserDTO {
        return webClient.get()
            .uri("$userServiceUrl/users/$userId")
            .retrieve()
            .onStatus(HttpStatusCode::is4xxClientError) { response ->
                Mono.error(UserNotFoundException("User not found: $userId"))
            }
            .onStatus(HttpStatusCode::is5xxServerError) { response ->
                Mono.error(UserServiceException("User service error"))
            }
            .awaitBody<UserDTO>()
    }
    
    suspend fun fallbackGetUser(userId: String, ex: Exception): UserDTO {
        logger.warn("Fallback triggered for user $userId due to: ${ex.message}")
        return UserDTO(
            id = userId,
            name = "Unknown User",
            email = "unknown@example.com",
            isFromCache = true
        )
    }
}
```

### 5. Data Transformation Patterns

#### Extension Functions for Clean Transformation

```kotlin
// Extension functions for clean data transformation
fun User.toDto(): UserDto = UserDto(
    id = this.id,
    name = "${this.firstName} ${this.lastName}",
    email = this.email,
    status = this.status.name
)

// Complex transformation with filtering and enrichment
fun Order.toMobileDto(): MobileOrderDto = MobileOrderDto(
    id = this.id,
    status = this.status.displayName,
    totalAmount = this.items.sumOf { it.price * it.quantity },
    itemCount = this.items.size,
    estimatedDelivery = this.deliveryDate?.format(DateTimeFormatter.ISO_LOCAL_DATE)
)

fun List<Order>.toMobileSummary(): MobileOrderSummaryDto = MobileOrderSummaryDto(
    totalOrders = this.size,
    pendingOrders = this.count { it.status == OrderStatus.PENDING },
    totalSpent = this.sumOf { it.items.sumOf { item -> item.price * item.quantity } },
    recentOrders = this.sortedByDescending { it.createdAt }
        .take(3)
        .map { it.toMobileDto() }
)
```

#### Advanced Data Transformation Service

```kotlin
@Component
class DataTransformationService(
    private val currencyService: CurrencyService,
    private val localizationService: LocalizationService
) {
    
    suspend fun transformForClient(
        data: Any, 
        clientType: ClientType, 
        userContext: UserContext
    ): Any {
        return when (clientType) {
            ClientType.MOBILE -> transformForMobile(data, userContext)
            ClientType.WEB -> transformForWeb(data, userContext)
            ClientType.API -> transformForApi(data)
        }
    }
    
    private suspend fun transformForMobile(data: Any, context: UserContext): Any {
        return when (data) {
            is ProductDto -> data.copy(
                price = currencyService.convertToUserCurrency(data.price, context.currency),
                description = data.description.take(100) + "...", // Truncate for mobile
                images = data.images.take(3) // Limit images for mobile
            )
            is List<*> -> data.take(10) // Pagination for mobile
            else -> data
        }
    }
}
```

### 6. Database Layer Design

#### JPA Entity Design with Kotlin

```kotlin
@Entity
@Table(name = "users", indexes = [
    Index(name = "idx_email", columnList = "email", unique = true),
    Index(name = "idx_status", columnList = "status"),
    Index(name = "idx_created_at", columnList = "created_at")
])
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    
    @Column(nullable = false, length = 50)
    val firstName: String,
    
    @Column(nullable = false, length = 50) 
    val lastName: String,
    
    @Column(nullable = false, unique = true)
    val email: String,
    
    @Enumerated(EnumType.STRING)
    val status: UserStatus = UserStatus.ACTIVE,
    
    @OneToMany(mappedBy = "user", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    val orders: List<Order> = emptyList(),
    
    @CreationTimestamp
    val createdAt: LocalDateTime? = null,
    
    @UpdateTimestamp
    val updatedAt: LocalDateTime? = null
) {
    // Avoid data class issues with JPA
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as User
        return id == other.id
    }
    
    override fun hashCode(): Int = id?.hashCode() ?: 0
    
    override fun toString(): String = "User(id=$id, email='$email')"
}
```

#### Repository Patterns

```kotlin
interface UserRepository : JpaRepository<User, Long> {
    
    fun findByEmail(email: String): User?
    
    fun findByStatus(status: UserStatus): List<User>
    
    @Query("SELECT u FROM User u WHERE u.status = :status AND u.createdAt >= :date")
    fun findActiveUsersCreatedAfter(
        @Param("status") status: UserStatus,
        @Param("date") date: LocalDateTime
    ): List<User>
    
    @Query("""
        SELECT u FROM User u 
        LEFT JOIN FETCH u.orders o 
        WHERE u.id = :userId
    """)
    fun findByIdWithOrders(@Param("userId") userId: Long): User?
    
    @Modifying
    @Query("UPDATE User u SET u.status = :status WHERE u.id IN :ids")
    fun updateUserStatusBatch(
        @Param("ids") ids: List<Long>,
        @Param("status") status: UserStatus
    ): Int
}
```

#### Transaction Management

```kotlin
@Service
@Transactional
class UserService(
    private val userRepository: UserRepository,
    private val orderRepository: OrderRepository,
    private val emailService: EmailService
) {
    
    @Transactional(readOnly = true)
    fun findUser(id: Long): User? {
        return userRepository.findById(id).orElse(null)
    }
    
    @Transactional
    fun createUser(userDto: CreateUserDto): User {
        val user = User(
            firstName = userDto.firstName,
            lastName = userDto.lastName,
            email = userDto.email
        )
        
        val savedUser = userRepository.save(user)
        
        // This will participate in the same transaction
        emailService.sendWelcomeEmail(savedUser.email)
        
        return savedUser
    }
    
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    fun auditUserAction(userId: Long, action: String) {
        // This runs in a separate transaction
        auditRepository.save(AuditLog(userId, action))
    }
}
```

### 7. Cache Layer Implementation

#### Redis Configuration

```kotlin
@Configuration
@EnableCaching
class RedisConfig(
    @Value("\${spring.data.redis.host:localhost}") private val redisHost: String,
    @Value("\${spring.data.redis.port:6379}") private val redisPort: Int
) {
    
    @Bean
    fun redisConnectionFactory(): LettuceConnectionFactory {
        return LettuceConnectionFactory(redisHost, redisPort)
    }
    
    @Bean
    fun redisTemplate(connectionFactory: RedisConnectionFactory): RedisTemplate<String, Any> {
        val template = RedisTemplate<String, Any>()
        template.connectionFactory = connectionFactory
        
        val jsonSerializer = GenericJackson2JsonRedisSerializer(
            ObjectMapper().registerModule(KotlinModule.Builder().build())
        )
        
        template.keySerializer = StringRedisSerializer()
        template.valueSerializer = jsonSerializer
        template.hashKeySerializer = StringRedisSerializer()
        template.hashValueSerializer = jsonSerializer
        
        return template
    }
    
    @Bean
    fun cacheManager(redisConnectionFactory: RedisConnectionFactory): RedisCacheManager {
        val config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(10))
            .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(StringRedisSerializer()))
            .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(GenericJackson2JsonRedisSerializer()))
            .disableCachingNullValues()
        
        return RedisCacheManager.builder(redisConnectionFactory)
            .cacheDefaults(config)
            .withCacheConfiguration("users", config.entryTtl(Duration.ofMinutes(30)))
            .withCacheConfiguration("products", config.entryTtl(Duration.ofHours(1)))
            .build()
    }
}
```

#### Cache-Aside Pattern Implementation

```kotlin
@Component
class ProductCacheService(
    private val productRepository: ProductRepository,
    private val redisTemplate: RedisTemplate<String, Any>
) {
    
    suspend fun getProduct(id: Long): Product? = withContext(Dispatchers.IO) {
        val cacheKey = "product:$id"
        
        // 1. Try cache first
        val cachedProduct = redisTemplate.opsForValue().get(cacheKey) as? Product
        if (cachedProduct != null) {
            return@withContext cachedProduct
        }
        
        // 2. If not in cache, query database
        val product = productRepository.findById(id).orElse(null)
        
        // 3. Update cache
        product?.let {
            redisTemplate.opsForValue().set(cacheKey, it, Duration.ofHours(1))
        }
        
        product
    }
    
    suspend fun updateProduct(product: Product): Product = withContext(Dispatchers.IO) {
        // 1. Update database
        val updatedProduct = productRepository.save(product)
        
        // 2. Update cache
        val cacheKey = "product:${product.id}"
        redisTemplate.opsForValue().set(cacheKey, updatedProduct, Duration.ofHours(1))
        
        updatedProduct
    }
}
```

#### Two-Level Caching Strategy

```kotlin
@Component
class TwoLevelCacheService(
    private val redisTemplate: RedisTemplate<String, Any>
) {
    
    // Local cache using Caffeine
    private val localCache: Cache<String, Any> = Caffeine.newBuilder()
        .maximumSize(1000)
        .expireAfterWrite(Duration.ofMinutes(5))
        .build()
    
    suspend fun getCachedData(key: String): Any? = withContext(Dispatchers.IO) {
        // L1: Check local cache
        localCache.getIfPresent(key)?.let { return@withContext it }
        
        // L2: Check Redis cache
        val redisValue = redisTemplate.opsForValue().get(key)
        redisValue?.let {
            // Populate local cache
            localCache.put(key, it)
            return@withContext it
        }
        
        null
    }
    
    fun setCachedData(key: String, value: Any, ttl: Duration) {
        // Update both levels
        localCache.put(key, value)
        redisTemplate.opsForValue().set(key, value, ttl)
    }
}
```

### 8. Background Jobs and Queue Processing

#### AWS SQS Configuration

```yaml
spring:
  cloud:
    aws:
      credentials:
        access-key: ${AWS_ACCESS_KEY}
        secret-key: ${AWS_SECRET_KEY}
      region:
        static: us-east-1
      sqs:
        endpoint: https://sqs.us-east-1.amazonaws.com
```

#### SQS Message Processing

```kotlin
@Service
class MessageProducer(
    private val sqsTemplate: SqsTemplate
) {
    
    fun sendMessage(queueName: String, message: Any) {
        sqsTemplate.send(queueName, message)
    }
    
    fun sendMessageWithAttributes(queueName: String, message: Any, attributes: Map<String, String>) {
        sqsTemplate.send(queueName) { messageBuilder ->
            messageBuilder
                .payload(message)
                .headers(attributes)
        }
    }
}

@Component
class MessageListener {
    
    @SqsListener(value = ["\${app.queue.main}"])
    fun processMessage(message: OrderMessage, acknowledgment: Acknowledgment) {
        try {
            processOrder(message)
            acknowledgment.acknowledge()
        } catch (exception: Exception) {
            logger.error("Failed to process message: $message", exception)
        }
    }
    
    @SqsListener(
        value = ["\${app.queue.batch}"],
        deletionPolicy = SqsMessageDeletionPolicy.ON_SUCCESS
    )
    fun processBatchMessages(messages: List<OrderMessage>) {
        messages.forEach { message ->
            try {
                processOrder(message)
            } catch (exception: Exception) {
                logger.error("Failed to process message in batch: $message", exception)
                throw exception
            }
        }
    }
}
```

#### Dead Letter Queue Processing

```kotlin
@Component
class DlqProcessor(
    private val sqsTemplate: SqsTemplate,
    private val mainQueueName: String = "my-app-queue"
) {
    
    @SqsListener(value = ["\${app.queue.dlq}"])
    fun processDlqMessage(
        @Header("MessageId") messageId: String,
        @Header("ApproximateReceiveCount") receiveCount: String,
        message: String
    ) {
        val retryCount = receiveCount.toInt()
        
        when {
            retryCount < 3 -> reprocessMessage(message)
            retryCount < 5 -> scheduleDelayedRetry(message, Duration.ofMinutes(30))
            else -> sendToHumanReview(messageId, message)
        }
    }
    
    private fun scheduleDelayedRetry(message: String, delay: Duration) {
        sqsTemplate.send(mainQueueName) { messageBuilder ->
            messageBuilder
                .payload(message)
                .header("DelaySeconds", delay.seconds.toString())
        }
    }
}
```

### 9. Feature Flags and Configuration Management

#### Configuration-Based Feature Flags

```kotlin
@ConfigurationProperties(prefix = "features")
@Component
data class FeatureProperties(
    val experimentalMiner: Boolean = false,
    val newUi: Boolean = false,
    val recommendations: RecommendationFeatures = RecommendationFeatures()
) {
    data class RecommendationFeatures(
        val aiPowered: Boolean = false,
        val personalizedOffers: Boolean = false
    )
}

@Service
class FeatureToggleService(
    private val featureProperties: FeatureProperties,
    private val redisTemplate: RedisTemplate<String, String>
) {
    
    fun isFeatureEnabled(feature: String, userId: String? = null): Boolean {
        // Check user-specific override
        userId?.let { uid ->
            val userOverride = redisTemplate.opsForValue()
                .get("feature:$feature:user:$uid")
            if (userOverride != null) {
                return userOverride.toBoolean()
            }
        }
        
        // Check global override
        val globalOverride = redisTemplate.opsForValue()
            .get("feature:$feature:global")
        if (globalOverride != null) {
            return globalOverride.toBoolean()
        }
        
        // Fall back to configuration
        return getFeatureFromConfig(feature)
    }
}
```

#### Feature Flag Annotations

```kotlin
@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
annotation class FeatureFlag(
    val feature: String,
    val fallbackMethod: String = "",
    val enabledForRoles: Array<String> = [],
    val rolloutPercentage: Int = 100
)

@RestController
class RecommendationController(private val recommendationService: RecommendationService) {
    
    @GetMapping("/recommendations/{userId}")
    @FeatureFlag(
        feature = "ai-powered-recommendations",
        fallbackMethod = "getBasicRecommendations",
        rolloutPercentage = 25
    )
    suspend fun getAiRecommendations(@PathVariable userId: String): List<Recommendation> {
        return recommendationService.getAiPoweredRecommendations(userId)
    }
    
    suspend fun getBasicRecommendations(userId: String): List<Recommendation> {
        return recommendationService.getBasicRecommendations(userId)
    }
}
```

### 10. Microservices Communication Patterns

#### Circuit Breaker Configuration

```yaml
resilience4j:
  circuitbreaker:
    instances:
      user-service:
        slidingWindowSize: 10
        minimumNumberOfCalls: 5
        failureRateThreshold: 50
        waitDurationInOpenState: 30s
        permittedNumberOfCallsInHalfOpenState: 3
      payment-service:
        slidingWindowSize: 20
        minimumNumberOfCalls: 10
        failureRateThreshold: 60
        waitDurationInOpenState: 60s
  retry:
    instances:
      user-service:
        maxAttempts: 3
        waitDuration: 1s
        enableExponentialBackoff: true
        exponentialBackoffMultiplier: 2
```

#### Saga Pattern for Distributed Transactions

```kotlin
@Service
class OrderSagaOrchestrator(
    private val paymentService: PaymentService,
    private val inventoryService: InventoryService,
    private val shippingService: ShippingService,
    private val sagaStateRepository: SagaStateRepository
) {
    
    suspend fun processOrder(orderId: String) {
        val sagaState = SagaState(
            sagaId = UUID.randomUUID().toString(),
            orderId = orderId,
            currentStep = SagaStep.PAYMENT
        )
        
        try {
            sagaStateRepository.save(sagaState)
            
            // Step 1: Process Payment
            val paymentResult = paymentService.processPayment(orderId)
            sagaState.markStepCompleted(SagaStep.PAYMENT, paymentResult.paymentId)
            
            // Step 2: Reserve Inventory
            val inventoryResult = inventoryService.reserveInventory(orderId)
            sagaState.markStepCompleted(SagaStep.INVENTORY, inventoryResult.reservationId)
            
            // Step 3: Create Shipment
            val shippingResult = shippingService.createShipment(orderId)
            sagaState.markStepCompleted(SagaStep.SHIPPING, shippingResult.shipmentId)
            
            sagaState.markCompleted()
            
        } catch (ex: Exception) {
            logger.error("Saga failed at step ${sagaState.currentStep}", ex)
            compensate(sagaState)
        } finally {
            sagaStateRepository.save(sagaState)
        }
    }
    
    private suspend fun compensate(sagaState: SagaState) {
        sagaState.completedSteps.reversed().forEach { step ->
            try {
                when (step.step) {
                    SagaStep.SHIPPING -> shippingService.cancelShipment(step.transactionId)
                    SagaStep.INVENTORY -> inventoryService.releaseInventory(step.transactionId)
                    SagaStep.PAYMENT -> paymentService.refundPayment(step.transactionId)
                }
            } catch (ex: Exception) {
                logger.error("Compensation failed for step ${step.step}", ex)
            }
        }
        sagaState.markCompensated()
    }
}
```

### 11. Observability and Monitoring

#### Structured Logging Configuration

```xml
<!-- logback-spring.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <!-- JSON Console Appender -->
    <appender name="JSON_CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder class="net.logstash.logback.encoder.LogstashEncoder">
            <includeContext>true</includeContext>
            <includeMdc>true</includeMdc>
            <customFields>{"service":"${spring.application.name:-unknown}"}</customFields>
        </encoder>
    </appender>
    
    <root level="INFO">
        <appender-ref ref="JSON_CONSOLE"/>
    </root>
</configuration>
```

#### Custom Metrics with Micrometer

```kotlin
@Service
class OrderMetricsService(
    private val meterRegistry: MeterRegistry
) {
    
    private val orderCounter = Counter.builder("orders.processed.total")
        .description("Total number of orders processed")
        .tag("service", "order")
        .register(meterRegistry)
    
    private val orderTimer = Timer.builder("orders.processing.duration")
        .description("Order processing duration")
        .register(meterRegistry)
    
    private val activeOrdersGauge = AtomicInteger(0).also { activeOrders ->
        Gauge.builder("orders.active.count")
            .description("Number of currently active orders")
            .register(meterRegistry) { activeOrders.get().toDouble() }
    }
    
    fun recordOrderProcessed(status: OrderStatus, processingTime: Duration) {
        orderCounter.increment(
            Tags.of(
                "status", status.name.lowercase(),
                "result", if (status == OrderStatus.COMPLETED) "success" else "failure"
            )
        )
        
        orderTimer.record(processingTime)
    }
}
```

#### Health Checks

```kotlin
@Component
class ExternalServiceHealthIndicator(
    private val externalServiceClient: ExternalServiceClient
) : HealthIndicator {
    
    override fun health(): Health {
        return try {
            val response = externalServiceClient.healthCheck()
            
            when (response.status) {
                "UP" -> Health.up()
                    .withDetail("service", "external-api")
                    .withDetail("version", response.version)
                    .withDetail("responseTime", "${response.responseTime}ms")
                    .build()
                else -> Health.down()
                    .withDetail("service", "external-api")
                    .withDetail("error", "Service returned status: ${response.status}")
                    .build()
            }
        } catch (exception: Exception) {
            Health.down(exception)
                .withDetail("service", "external-api")
                .withDetail("error", exception.message)
                .build()
        }
    }
}
```

### 12. Performance Optimization

#### JVM Configuration

```bash
# Production JVM arguments
-Xms2g -Xmx4g
-XX:NewRatio=2
-XX:MaxMetaspaceSize=512m

# G1 Garbage Collector
-XX:+UseG1GC
-XX:MaxGCPauseMillis=200
-XX:G1HeapRegionSize=16m

# Monitoring and diagnostics
-XX:+FlightRecorder
-XX:StartFlightRecording=duration=60s,filename=app-startup.jfr
```

#### Application Configuration

```yaml
# Performance optimizations
spring:
  main:
    lazy-initialization: true
    
  datasource:
    hikari:
      minimum-idle: 5
      maximum-pool-size: 20
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
      leak-detection-threshold: 60000
      
  jpa:
    properties:
      hibernate:
        jdbc:
          batch_size: 25
          order_inserts: true
          order_updates: true
        cache:
          use_second_level_cache: true

server:
  tomcat:
    threads:
      max: 200
      min-spare: 10
    connection-timeout: 20000
    accept-count: 100
  compression:
    enabled: true
    min-response-size: 1024
```

#### Database Query Optimization

```kotlin
@Repository
interface OrderRepository : JpaRepository<Order, String> {
    
    @Query("SELECT o FROM Order o JOIN FETCH o.items WHERE o.status = :status")
    fun findByStatusWithItems(@Param("status") status: OrderStatus): List<Order>
    
    @Query("""
        SELECT o FROM Order o 
        WHERE o.createdDate >= :startDate 
        AND o.createdDate < :endDate
        ORDER BY o.createdDate DESC
    """)
    fun findOrdersByDateRange(
        @Param("startDate") startDate: LocalDateTime,
        @Param("endDate") endDate: LocalDateTime,
        pageable: Pageable
    ): Page<Order>
    
    @Modifying
    @Query("UPDATE Order o SET o.status = :status WHERE o.id IN :ids")
    fun bulkUpdateStatus(@Param("ids") ids: List<String>, @Param("status") status: OrderStatus)
}
```

### 13. Kubernetes Deployment

#### Deployment Configuration

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spring-boot-bff
  labels:
    app: spring-boot-bff
spec:
  replicas: 3
  selector:
    matchLabels:
      app: spring-boot-bff
  template:
    metadata:
      labels:
        app: spring-boot-bff
    spec:
      containers:
      - name: spring-boot-bff
        image: your-registry/spring-boot-bff:latest
        imagePullPolicy: Always
        ports:
        - containerPort: 8080
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        resources:
          limits:
            memory: "1Gi"
            cpu: "500m"
          requests:
            memory: "512Mi"
            cpu: "250m"
        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
          initialDelaySeconds: 60
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 5
```

#### Service and Ingress

```yaml
apiVersion: v1
kind: Service
metadata:
  name: spring-boot-bff-service
spec:
  selector:
    app: spring-boot-bff
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: spring-boot-bff-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - api.yourdomain.com
    secretName: api-tls
  rules:
  - host: api.yourdomain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: spring-boot-bff-service
            port:
              number: 80
```

#### Horizontal Pod Autoscaler

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: spring-boot-bff-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: spring-boot-bff
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

### 14. AWS Integration Patterns

#### Spring Cloud AWS Configuration

```yaml
spring:
  cloud:
    aws:
      credentials:
        access-key: ${AWS_ACCESS_KEY}
        secret-key: ${AWS_SECRET_KEY}
      region:
        static: ${AWS_REGION:us-east-1}
      sqs:
        endpoint: https://sqs.us-east-1.amazonaws.com
  cache:
    type: redis
  redis:
    host: ${ELASTICACHE_ENDPOINT}
    port: 6379
    cluster:
      nodes: ${ELASTICACHE_CLUSTER_NODES}
  datasource:
    url: jdbc:postgresql://${RDS_HOSTNAME}:5432/${RDS_DB_NAME}
    username: ${RDS_USERNAME}
    password: ${RDS_PASSWORD}
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
```

#### IAM Role Configuration

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "sqs:SendMessage",
        "sqs:ReceiveMessage",
        "sqs:DeleteMessage",
        "sqs:GetQueueAttributes"
      ],
      "Resource": "arn:aws:sqs:region:account:queue-name"
    },
    {
      "Effect": "Allow",
      "Action": [
        "rds:DescribeDBInstances",
        "elasticache:DescribeCacheClusters"
      ],
      "Resource": "*"
    }
  ]
}
```

### 15. Docker Multi-Stage Build

#### Production-Ready Dockerfile

```dockerfile
# Build stage
FROM eclipse-temurin:17-jdk-jammy AS builder

RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*

WORKDIR /build

# Copy Maven wrapper and dependencies
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw

# Download dependencies (cached layer)
RUN ./mvnw dependency:go-offline -B

# Copy source code and build
COPY src ./src
RUN ./mvnw clean package -DskipTests -B

# Extract layers for better caching
RUN java -Djarmode=layertools -jar target/*.jar extract

# Runtime stage
FROM eclipse-temurin:17-jre-jammy AS final

# Install security updates and create non-root user
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends curl && \
    rm -rf /var/lib/apt/lists/* && \
    groupadd --gid 1001 appuser && \
    useradd --uid 1001 --gid appuser --create-home --shell /bin/false appuser

WORKDIR /app

# Copy application layers from builder stage
COPY --from=builder --chown=appuser:appuser /build/dependencies/ ./
COPY --from=builder --chown=appuser:appuser /build/spring-boot-loader/ ./
COPY --from=builder --chown=appuser:appuser /build/snapshot-dependencies/ ./
COPY --from=builder --chown=appuser:appuser /build/application/ ./

# Switch to non-root user
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/actuator/health || exit 1

# Expose port
EXPOSE 8080

# JVM optimizations for containers
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -XX:+UseG1GC"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS org.springframework.boot.loader.JarLauncher"]
```

### 16. Anti-patterns to Avoid

#### Common Spring Boot Anti-patterns

```kotlin
// ❌ Field Injection
@Service
class BadOrderService {
    @Autowired
    private lateinit var orderRepository: OrderRepository // Avoid this!
}

// ✅ Constructor Injection
@Service
class GoodOrderService(
    private val orderRepository: OrderRepository // Prefer this
)

// ❌ Transaction on Private Methods
@Service
class BadTransactionService {
    @Transactional
    private fun saveOrder(order: Order) { // Won't work!
    }
}

// ✅ Public Transactional Methods
@Service
class GoodTransactionService {
    @Transactional
    fun processOrder(order: Order) {
        // Proper transaction boundary
    }
}

// ❌ String Concatenation in Logging
logger.info("Processing order: " + orderId + " for user: " + userId) // Expensive!

// ✅ Parameterized Logging
logger.info("Processing order: {} for user: {}", orderId, userId) // Efficient!
```

#### Database Anti-patterns

```kotlin
// ❌ Read-Modify-Write Race Condition
@Service
class BadOrderService {
    fun updateOrderAmount(orderId: String, newAmount: BigDecimal) {
        val order = orderRepository.findById(orderId) // Read
        order.amount = newAmount // Modify
        orderRepository.save(order) // Write - Race condition possible!
    }
}

// ✅ Atomic Updates
@Repository
interface OrderRepository : JpaRepository<Order, String> {
    @Modifying
    @Query("UPDATE Order o SET o.amount = :amount WHERE o.id = :id")
    fun updateAmount(@Param("id") id: String, @Param("amount") amount: BigDecimal): Int
}
```

### 17. 12-Factor App Implementation

#### Key Principles Applied

**Config Management:**
```yaml
spring:
  datasource:
    url: ${DATABASE_URL:jdbc:h2:mem:testdb}
    username: ${DB_USERNAME:sa}
    password: ${DB_PASSWORD:password}
  profiles:
    active: ${SPRING_PROFILES_ACTIVE:development}
```

**Graceful Shutdown:**
```yaml
server:
  shutdown: graceful
spring:
  lifecycle:
    timeout-per-shutdown-phase: 30s
```

**Port Binding:**
```yaml
server:
  port: ${PORT:8080}
```

**Stateless Processes:**
```kotlin
// Store session data in Redis instead of in-memory
@Service
class SessionService(
    private val redisTemplate: RedisTemplate<String, Any>
) {
    fun storeSession(sessionId: String, data: Any) {
        redisTemplate.opsForValue().set(sessionId, data, Duration.ofHours(1))
    }
}
```

### Conclusion and Best Practices

#### Architecture Decision Principles

**Successful BFF implementations prioritize client-specific optimization over generic APIs**, focusing on reducing client-side complexity and network overhead through strategic data aggregation and transformation. **Clean architecture boundaries ensure maintainable separation of concerns**, with domain logic remaining independent of infrastructure details.

**Performance at scale requires thoughtful caching strategies and database optimization**, combining local and distributed caching with properly indexed queries and connection pooling. **Observability must be built-in from the start**, not bolted on later, with structured logging, custom metrics, and comprehensive health checks.

#### Production Readiness Checklist

**Essential Implementation Standards:**
- Constructor-based dependency injection with immutable configurations
- Transactional boundaries properly scoped to business operations  
- Circuit breakers and retries configured for all external service calls
- Feature flags implemented for safe deployment and rollback capabilities
- Comprehensive test coverage including integration tests with Testcontainers

**Operational Excellence Requirements:**
- Structured JSON logging with correlation IDs for distributed tracing
- Custom business metrics exposed via Micrometer for monitoring key operations
- Health checks covering all critical dependencies (database, cache, external APIs)
- Kubernetes resource limits and requests properly configured for workloads
- Docker images built with non-root users and security scanning integrated

**Scaling Considerations:**
- Database queries optimized with appropriate indexes and batch operations
- Redis caching strategy aligned with data access patterns and invalidation needs
- Asynchronous processing implemented for long-running or non-critical operations
- Auto-scaling configured based on CPU, memory, and custom business metrics

This reference architecture provides the foundation for building production-ready BFF applications that can scale from medium complexity to enterprise-level deployments while maintaining code quality, operational excellence, and development velocity.