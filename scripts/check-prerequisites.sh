#!/bin/bash
# Check prerequisites for spec-kit workflow

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common.sh"

log_info "Checking prerequisites..."

# Check Git
if command_exists git; then
    GIT_VERSION=$(git --version | awk '{print $3}')
    log_success "Git found: $GIT_VERSION"
else
    log_error "Git is not installed. Please install Git to continue."
    exit 1
fi

# Check if we're in a git repository
if [ -d ".git" ]; then
    log_success "Git repository detected"
else
    log_warning "Not in a git repository. Consider initializing one with 'git init'"
fi

# Check Node.js (if needed for frontend projects)
if command_exists node; then
    NODE_VERSION=$(node --version)
    log_success "Node.js found: $NODE_VERSION"
else
    log_warning "Node.js not found. Install if needed for frontend development."
fi

# Check pnpm (required for this project)
if command_exists pnpm; then
    PNPM_VERSION=$(pnpm --version)
    log_success "pnpm found: $PNPM_VERSION"
else
    log_error "pnpm is not installed. This project requires pnpm."
    log_info "Install pnpm with: npm install -g pnpm"
    log_info "Or visit: https://pnpm.io/installation"
    exit 1
fi

# Check Python (if needed for backend projects)
if command_exists python3; then
    PYTHON_VERSION=$(python3 --version)
    log_success "Python found: $PYTHON_VERSION"
else
    log_warning "Python3 not found. Install if needed for backend development."
fi

# Validate project structure
validate_project_structure

log_success "Prerequisites check complete!"

