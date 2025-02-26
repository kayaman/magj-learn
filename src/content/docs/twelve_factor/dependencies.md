---
title: Dependencies
sidebar:
  order: 2
---

![image](/img/12factor/2_dependencies.webp)

## **Explicitly Declare and Isolate Dependencies**

A Twelve-Factor App **explicitly declares all dependencies** and does not rely on system-wide packages. This ensures that the application can be reliably deployed across different environments without unexpected behavior due to missing or mismatched dependencies.

---

## **Key Principles**
### 1. **No Implicit Dependencies**  
- The application should never assume that dependencies are already installed on the system (e.g., a programming language runtime, libraries, or system utilities).
- Dependencies should be explicitly defined within the project.

### 2. **Dependency Declaration**  
- Use a **dependency manifest** to list all required packages:
  - **Node.js**: `package.json`
  - **Python**: `pyproject.toml` (Poetry) or `requirements.txt`
  - **Java**: `pom.xml` (Maven) or `build.gradle` (Gradle)
  - **Go**: `go.mod`
  - **Rust**: `Cargo.toml`
  
### 3. **Dependency Isolation**  
- The application should not rely on globally installed dependencies. Instead, it should use:
  - **Virtual environments** (`venv` for Python)
  - **Containerized environments** (Docker)
  - **Package managers with lockfiles** (`package-lock.json`, `poetry.lock`, etc.)

### 4. **Consistent Builds Across Environments**  
- The same dependencies should be installed consistently across development, testing, and production. Lock files ensure that all environments use the exact same package versions.

### 5. **Security & Maintainability**  
- Isolating dependencies helps prevent version conflicts and security vulnerabilities.
- Regularly update dependencies while ensuring compatibility.

---

## **Example: Python (FastAPI) with Poetry**

Instead of installing dependencies globally:

```sh
pip install fastapi
```

Use a dependency manager:

```sh
poetry add fastapi
```

This ensures that dependencies are explicitly defined in `pyproject.toml` and `poetry.lock`.

## Why It Matters?

- Prevents "It works on my machine" problems.
- Simplifies onboarding for new developers.
- Enhances security and maintainability.
- Enables reproducible builds in CI/CD pipelines.

## Further Reading

- [The Twelve-Factor App: Dependencies](https://12factor.net/dependencies)
- [Docker Best Practices for Dependencies](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)