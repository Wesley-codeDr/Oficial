# Constitution

This document defines the core principles, rules, and guidelines that govern how this project is developed. All development work must adhere to these principles.

## Core Principles

### 1. Spec-Driven Development
- All features must start with a specification document
- Specifications must be approved before implementation begins
- Implementation must follow the approved specification

### 2. Code Quality
- Code must be readable, maintainable, and well-documented
- Follow language-specific best practices and style guides
- Write self-documenting code with clear naming conventions

### 3. Testing
- All features must have appropriate tests
- Tests should be written before or alongside implementation (TDD when applicable)
- Test coverage should be maintained at a reasonable level

### 4. Documentation
- Code should be documented with clear comments where necessary
- API documentation should be kept up to date
- README files should be maintained for each major component

### 5. Security
- Security best practices must be followed
- Sensitive data must never be committed to version control
- Dependencies should be kept up to date

### 6. Performance
- Code should be optimized for performance where it matters
- Avoid premature optimization
- Profile before optimizing

## Development Workflow

**CRITICAL: This workflow is MANDATORY and cannot be skipped.**

1. **Specification**: Create or update specification document
   - MUST exist before any code is written
   - MUST be approved before proceeding
   - Located in `specs/[feature-name]/spec.md`

2. **Planning**: Create implementation plan based on specification
   - MUST exist before implementation begins
   - Generated using `/speckit.plan` command
   - Located in `specs/[feature-name]/plan.md`

3. **Tasks**: Break down plan into actionable tasks
   - MUST exist before implementation begins
   - Generated using `/speckit.tasks` command
   - Located in `specs/[feature-name]/tasks.md`

4. **Implementation**: Implement following the tasks
   - MUST follow tasks in order
   - MUST respect dependencies
   - MUST use `/speckit.implement` command

5. **Review**: Code review and testing
   - All tests must pass
   - Code must follow constitution
   - Architecture must match plan

6. **Documentation**: Update documentation as needed
   - Keep README updated
   - Document APIs
   - Update inline comments

## Technology Stack

(To be defined based on project requirements)

## Project Structure

```
.
├── memory/
│   └── constitution.md
├── specs/
│   └── [feature-name]/
│       ├── spec.md
│       ├── plan.md
│       ├── tasks.md
│       └── contracts/
├── scripts/
├── templates/
└── README.md
```

## Communication

- Use clear, descriptive commit messages
- Document decisions in specifications or design documents
- Ask for clarification when requirements are unclear

## Enforcement

These rules are enforced through:
- `.cursorrules` file (Cursor IDE integration)
- `CLAUDE.md` configuration
- Automated validation scripts
- Code review process

**Violations of this workflow will result in:**
- Code changes being rejected
- Requests to create/update specifications first
- Alerts and warnings from development tools

## Golden Rule

> **NO SPEC = NO CODE**
> 
> Without a specification, there can be no implementation. This is non-negotiable.

