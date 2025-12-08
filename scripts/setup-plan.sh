#!/bin/bash
# Setup a new feature specification and plan

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

FEATURE_DIR="$PROJECT_ROOT/specs/$FEATURE_NAME"

# Check if feature already exists
if [ -d "$FEATURE_DIR" ]; then
    log_error "Feature '$FEATURE_NAME' already exists in specs/"
    exit 1
fi

log_info "Setting up feature specification: $FEATURE_NAME"

# Create feature directory structure
mkdir -p "$FEATURE_DIR/contracts"

# Copy templates
if [ -f "$PROJECT_ROOT/templates/spec-template.md" ]; then
    cp "$PROJECT_ROOT/templates/spec-template.md" "$FEATURE_DIR/spec.md"
    log_success "Created spec.md"
else
    log_warning "spec-template.md not found, creating empty spec.md"
    touch "$FEATURE_DIR/spec.md"
fi

if [ -f "$PROJECT_ROOT/templates/plan-template.md" ]; then
    cp "$PROJECT_ROOT/templates/plan-template.md" "$FEATURE_DIR/plan.md"
    log_success "Created plan.md"
else
    log_warning "plan-template.md not found, creating empty plan.md"
    touch "$FEATURE_DIR/plan.md"
fi

if [ -f "$PROJECT_ROOT/templates/tasks-template.md" ]; then
    cp "$PROJECT_ROOT/templates/tasks-template.md" "$FEATURE_DIR/tasks.md"
    log_success "Created tasks.md"
else
    log_warning "tasks-template.md not found, creating empty tasks.md"
    touch "$FEATURE_DIR/tasks.md"
fi

log_success "Feature specification setup complete!"
log_info "Feature directory: $FEATURE_DIR"
log_info "Next steps:"
log_info "  1. Edit $FEATURE_DIR/spec.md with your feature requirements"
log_info "  2. Run '/speckit.plan' to generate implementation plan"
log_info "  3. Run '/speckit.tasks' to generate task breakdown"
log_info "  4. Run '/speckit.implement' to start implementation"

