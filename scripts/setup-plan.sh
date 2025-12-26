#!/bin/bash
# Setup a new feature specification and plan based on GitHub Spec-Kit standards

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common.sh"

PROJECT_ROOT=$(get_project_root)

# Get feature name from user
if [ -z "$1" ]; then
    read -p "Enter feature name (kebab-case): " FEATURE_NAME
else
    FEATURE_NAME="$1"
fi

# Validate feature name format (kebab-case)
if [[ ! "$FEATURE_NAME" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
    log_error "Feature name must be in kebab-case (e.g., 'user-authentication')"
    exit 1
fi

# Generate feature number (XXX format based on existing specs)
FEATURE_NUMBER=$(find "$PROJECT_ROOT/specs" -maxdepth 1 -type d -name "[0-9][0-9][0-9]-*" 2>/dev/null | wc -l | tr -d ' ')
FEATURE_NUMBER=$(printf "%03d" "$FEATURE_NUMBER")
FEATURE_DIR="$PROJECT_ROOT/specs/${FEATURE_NUMBER}-${FEATURE_NAME}"

# Check if feature already exists
if [ -d "$FEATURE_DIR" ]; then
    log_error "Feature '${FEATURE_NUMBER}-${FEATURE_NAME}' already exists in specs/"
    exit 1
fi

log_info "Setting up feature specification: ${FEATURE_NUMBER}-${FEATURE_NAME}"

# Create feature directory structure following Spec-Kit standards
mkdir -p "$FEATURE_DIR/contracts"
mkdir -p "$FEATURE_DIR/checklists"

# Copy and customize spec template
if [ -f "$PROJECT_ROOT/templates/spec-template.md" ]; then
    cp "$PROJECT_ROOT/templates/spec-template.md" "$FEATURE_DIR/spec.md"
    # Replace placeholders with feature-specific values
    sed -i '' "s/{{FEATURE_NAME}}/${FEATURE_NAME}/g" "$FEATURE_DIR/spec.md"
    sed -i '' "s/{{FEATURE_NUMBER}}/${FEATURE_NUMBER}/g" "$FEATURE_DIR/spec.md"
    sed -i '' "s/{{DATE}}/$(date +%Y-%m-%d)/g" "$FEATURE_DIR/spec.md"
    log_success "Created spec.md"
else
    log_warning "spec-template.md not found, creating empty spec.md"
    touch "$FEATURE_DIR/spec.md"
fi

# Copy plan template
if [ -f "$PROJECT_ROOT/templates/plan-template.md" ]; then
    cp "$PROJECT_ROOT/templates/plan-template.md" "$FEATURE_DIR/plan.md"
    sed -i '' "s/{{FEATURE_NAME}}/${FEATURE_NAME}/g" "$FEATURE_DIR/plan.md"
    sed -i '' "s/{{FEATURE_NUMBER}}/${FEATURE_NUMBER}/g" "$FEATURE_DIR/plan.md"
    log_success "Created plan.md"
else
    log_warning "plan-template.md not found, creating empty plan.md"
    touch "$FEATURE_DIR/plan.md"
fi

# Copy tasks template
if [ -f "$PROJECT_ROOT/templates/tasks-template.md" ]; then
    cp "$PROJECT_ROOT/templates/tasks-template.md" "$FEATURE_DIR/tasks.md"
    sed -i '' "s/{{FEATURE_NAME}}/${FEATURE_NAME}/g" "$FEATURE_DIR/tasks.md"
    log_success "Created tasks.md"
else
    log_warning "tasks-template.md not found, creating empty tasks.md"
    touch "$FEATURE_DIR/tasks.md"
fi

# Create research.md template
if [ -f "$PROJECT_ROOT/templates/research-template.md" ]; then
    cp "$PROJECT_ROOT/templates/research-template.md" "$FEATURE_DIR/research.md"
    sed -i '' "s/{{FEATURE_NAME}}/${FEATURE_NAME}/g" "$FEATURE_DIR/research.md"
    log_success "Created research.md"
else
    log_info "Creating research.md"
    cat > "$FEATURE_DIR/research.md" << 'EOF'
# Research Document

## Overview
This document contains research findings related to the implementation of this feature.

## Technology Stack Research
- [ ] Research frontend technologies
- [ ] Research backend technologies
- [ ] Research database technologies
- [ ] Research third-party integrations

## Competitor Analysis
- [ ] Analyze competitor solutions
- [ ] Identify best practices
- [ ] Document lessons learned

## Performance Considerations
- [ ] Identify performance requirements
- [ ] Research optimization techniques
- [ ] Document performance metrics

## Security Considerations
- [ ] Identify security requirements
- [ ] Research security best practices
- [ ] Document security measures

## Regulatory Compliance
- [ ] Identify applicable regulations
- [ ] Research compliance requirements
- [ ] Document compliance measures

## References
- [ ]
EOF
fi

# Create data-model.md template
if [ -f "$PROJECT_ROOT/templates/data-model.md" ]; then
    cp "$PROJECT_ROOT/templates/data-model.md" "$FEATURE_DIR/data-model.md"
    log_success "Created data-model.md"
else
    log_info "Creating data-model.md"
    cat > "$FEATURE_DIR/data-model.md" << 'EOF'
# Data Model

## Overview
This document describes the data structures and relationships for this feature.

## Database Schema
```prisma
// Add your Prisma models here

model Example {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## TypeScript Types
```typescript
// Add your TypeScript types here

export interface Example {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Data Flow
```mermaid
flowchart TD
    A[Client] --> B[API]
    B --> C[Database]
    C --> B
    B --> A
```

## Data Validation
- [ ] Define validation rules
- [ ] Document constraints
- [ ] Specify error handling
```
fi

# Create quickstart.md template
log_info "Creating quickstart.md"
cat > "$FEATURE_DIR/quickstart.md" << 'EOF'
# Quick Start Guide

## Prerequisites
- [ ] Node.js installed
- [ ] Database set up
- [ ] Environment variables configured

## Local Development

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run database migrations:
   ```bash
   pnpm prisma migrate dev
   ```

3. Start development server:
   ```bash
   pnpm dev
   ```

4. Open http://localhost:3000

## Running Tests

```bash
# Unit tests
pnpm test

# Integration tests
pnpm test:integration

# E2E tests
pnpm test:e2e
```

## Common Commands

```bash
# Generate types
pnpm prisma generate

# Open Prisma Studio
pnpm prisma studio

# Format code
pnpm format

# Lint code
pnpm lint
```

## Troubleshooting

### Issue: Database connection failed
Solution: Check DATABASE_URL in .env

### Issue: Port already in use
Solution: Kill process on port 3000 or change port
```

# Create requirements checklist
log_info "Creating requirements checklist"
cat > "$FEATURE_DIR/checklists/requirements.md" << 'EOF'
# Requirements Checklist

## Functional Requirements
- [ ] Requirement 1
- [ ] Requirement 2
- [ ] Requirement 3

## Non-Functional Requirements
- [ ] Performance requirements
- [ ] Security requirements
- [ ] Scalability requirements

## User Stories
- [ ] User Story 1
- [ ] User Story 2
- [ ] User Story 3

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
```

log_success "Feature specification setup complete!"
log_info "Feature directory: $FEATURE_DIR"
log_info ""
log_info "Next steps:"
log_info "  1. Edit $FEATURE_DIR/spec.md with your feature requirements"
log_info "  2. Research in $FEATURE_DIR/research.md"
log_info "  3. Run '/speckit.plan' to generate implementation plan"
log_info "  4. Run '/speckit.tasks' to generate task breakdown"
log_info "  5. Run '/speckit.implement' to start implementation"
log_info ""
log_info "Templates created:"
log_info "  - spec.md (feature specification)"
log_info "  - plan.md (implementation plan)"
log_info "  - tasks.md (task breakdown)"
log_info "  - research.md (research findings)"
log_info "  - data-model.md (data structures)"
log_info "  - quickstart.md (development guide)"
log_info "  - checklists/requirements.md (requirements checklist)"
log_info "  - contracts/ (API contracts and specs)"
