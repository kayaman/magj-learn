# Contributing Guidelines

## Commit Message Format

We follow the [Conventional Commits specification](https://www.conventionalcommits.org/).

Commit messages should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc; no code change)
- `refactor`: Code refactoring (no functional change)
- `perf`: Performance improvements
- `test`: Adding or fixing tests
- `build`: Build system or external dependency changes
- `ci`: CI configuration changes
- `chore`: Other changes that don't modify source or test files

### Examples

```
feat(auth): add login functionality
fix(api): correct status code response
docs: update README with new API endpoints
refactor(components): simplify Button component
```

To create commits using our commit wizard:

```bash
npm run commit
```
