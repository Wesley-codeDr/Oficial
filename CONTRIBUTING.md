# Contributing to WellWave

Thank you for your interest in contributing to WellWave! This document provides guidelines and instructions for contributing to the project.

## 🌟 Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- pnpm 8+ (required - do not use npm or yarn)
- Docker (for local database)
- Git

### Setting Up Development Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Oficial.git
   cd Oficial
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Configure Environment**
   ```bash
   cp env.template .env
   # Edit .env with your configuration
   ```

4. **Start Local Database**
   ```bash
   ./scripts/docker-db.sh start
   ```

5. **Setup Database Schema**
   ```bash
   pnpm prisma generate
   pnpm prisma migrate dev
   pnpm db:seed
   ```

6. **Start Development Server**
   ```bash
   pnpm dev
   ```

Visit http://localhost:3000 to see the application running.

## 📋 Development Workflow

### Spec-Driven Development

This project follows **Spec-Driven Development**. All features must follow this workflow:

1. **Create Specification** (`spec.md`)
   - Define user stories, requirements, and constraints
   - Get approval before implementation

2. **Generate Implementation Plan** (`plan.md`)
   - Use `/speckit.plan` command
   - Define architecture and tech stack

3. **Create Task Breakdown** (`tasks.md`)
   - Use `/speckit.tasks` command
   - Organize tasks with dependencies

4. **Implement** 
   - Follow the tasks in order
   - Write tests alongside code (TDD when appropriate)
   - Keep commits focused and descriptive

### Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions/modifications
- `chore/` - Maintenance tasks

Example: `feature/add-red-flag-detection`

### Commit Message Guidelines

Follow conventional commits:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build process or auxiliary tool changes
- `perf`: Performance improvements

Example:
```
feat(anamnese): add support for pediatric syndromes

- Added new checkbox categories for pediatric patients
- Implemented age-based red flag rules
- Updated narrative generation templates

Closes #123
```

## 🧪 Testing

### Running Tests

```bash
# Unit tests
pnpm test

# Unit tests with coverage
pnpm test:coverage

# E2E tests
pnpm test:e2e

# E2E tests with UI
pnpm test:e2e:ui
```

### Writing Tests

1. **Unit Tests** - Place in `tests/unit/`
   - Test individual functions and components
   - Mock external dependencies
   - Aim for high coverage (>80%)

2. **E2E Tests** - Place in `tests/e2e/`
   - Test complete user flows
   - Use Playwright for browser automation
   - Test critical paths and edge cases

Example unit test:
```typescript
import { describe, it, expect } from 'vitest'
import { generateNarrative } from '@/lib/anamnese/generator'

describe('generateNarrative', () => {
  it('should generate narrative from checkboxes', () => {
    const checkboxes = [/* ... */]
    const result = generateNarrative(checkboxes)
    expect(result).toContain('Paciente refere')
  })
})
```

## 📝 Code Style

### TypeScript Guidelines

- Use TypeScript for all new code
- Define proper types (avoid `any`)
- Use Zod for runtime validation
- Document complex types with comments

### React Guidelines

- Use functional components with hooks
- Implement proper error boundaries
- Follow React best practices (key props, etc.)
- Use Server Components when possible (Next.js 15)

### Formatting

Code is automatically formatted with Prettier on commit. You can also run:

```bash
# Check formatting
pnpm format:check

# Fix formatting
pnpm format
```

### Linting

```bash
# Run linter
pnpm lint

# Fix linting issues
pnpm lint:fix
```

## 🗄️ Database Changes

### Prisma Migrations

When changing the database schema:

1. **Update Schema**
   ```bash
   # Edit prisma/schema.prisma
   ```

2. **Create Migration**
   ```bash
   pnpm prisma migrate dev --name descriptive_migration_name
   ```

3. **Update Seed Data** (if needed)
   ```bash
   # Edit prisma/seed.ts
   pnpm db:seed
   ```

### Migration Guidelines

- Write reversible migrations when possible
- Test migrations locally before pushing
- Document breaking changes
- Update data-model.md in specs

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for public APIs
- Document complex algorithms
- Include usage examples for utilities
- Keep README.md up to date

### Spec Documentation

When adding features:
1. Create spec in `specs/[feature-name]/spec.md`
2. Generate plan with `/speckit.plan`
3. Generate tasks with `/speckit.tasks`
4. Update constitution.md if adding new principles

## 🔍 Pull Request Process

1. **Before Submitting**
   - [ ] Tests pass locally (`pnpm test`, `pnpm test:e2e`)
   - [ ] Code is formatted (`pnpm format`)
   - [ ] No linting errors (`pnpm lint`)
   - [ ] TypeScript compiles (`pnpm typecheck`)
   - [ ] Build succeeds (`pnpm build`)
   - [ ] Documentation is updated

2. **PR Description**
   - Link related issues
   - Describe changes made
   - Include screenshots for UI changes
   - List breaking changes (if any)
   - Add testing instructions

3. **Review Process**
   - Address reviewer feedback
   - Keep PR focused and reasonably sized
   - Rebase on main if needed
   - Squash commits before merging

## 🐛 Reporting Bugs

Use GitHub Issues with the bug template:

- **Description**: Clear description of the bug
- **Steps to Reproduce**: Numbered list of steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: OS, browser, Node version, etc.
- **Screenshots**: If applicable

## 💡 Suggesting Features

Use GitHub Issues with the feature template:

- **Use Case**: Why is this feature needed?
- **Proposed Solution**: How should it work?
- **Alternatives Considered**: Other approaches
- **Additional Context**: Mockups, examples, etc.

## 🚨 Security Issues

**Do not open public issues for security vulnerabilities.**

See [SECURITY.md](./SECURITY.md) for instructions on reporting security issues.

## 📞 Getting Help

- 📖 Check [README.md](./README.md) first
- 💬 Open a GitHub Discussion for questions
- 🐛 Open an issue for bugs
- 📧 Contact maintainers for private matters

## 🏆 Recognition

Contributors will be recognized in:
- Project README
- Release notes
- Contributor graph

Thank you for contributing to WellWave! 🎉

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.
