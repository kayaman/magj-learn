---
title: Codebase
sidebar:
  order: 1
---

**One codebase tracked in version control, many deploys.**

### Description

The first factor, Codebase, focuses on maintaining a single codebase for an application, which is stored in version control (e.g., Git). This codebase is the single source of truth and serves all deployments (e.g., development, staging, production). While the same application can be deployed in multiple environments, it must originate from this unified codebase.

If there are multiple codebases, it indicates multiple apps rather than a single application. Similarly, an app without a version-controlled codebase does not comply with twelve-factor methodology.

### Key Principles

- One Codebase per App: Each app is tied to a single codebase. Shared libraries or services should reside in separate repositories.
- Version Control: Tools like Git or Mercurial are mandatory to track the codebase, enabling collaboration, rollback, and traceability of changes.
- Multiple Deploys: The same codebase can support multiple deployments across environments (e.g., development, QA, production), differentiated by configuration.
- Avoid Duplication: Shared components or utilities should be modularized into libraries rather than duplicating code across multiple repositories.

### Common Practices

- Use branches for feature development, releases, or hotfixes to maintain a clean main branch.
- Implement CI/CD pipelines to ensure code consistency across environments.
- Clearly separate configurations for different environments (this will be elaborated in Factor 3: Config).

### Why It Matters

The Codebase factor ensures consistency between environments, reduces complexity, and prevents code drift. This approach enhances collaboration, simplifies debugging, and allows for predictable deployments. It forms the foundation of building scalable, maintainable applications.