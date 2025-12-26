#!/bin/bash
# Check prerequisites for spec-kit workflow

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common.sh"

PROJECT_ROOT=$(get_project_root)

log_info "Checking prerequisites..."

# Check Git
if command_exists git; then
    GIT_VERSION=$(git --version | awk '{print $3}')
    log_success "Git found: $GIT_VERSION"
else
    log_error "Git is not installed. Please install Git to continue."
    log_info "Visit: https://git-scm.com/downloads"
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
    # Check if Node version is >= 18 (required for Next.js 15)
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_MAJOR" -ge 18 ]; then
        log_success "Node.js found: $NODE_VERSION (meets requirement >= 18)"
    else
        log_error "Node.js version $NODE_VERSION is too old. Next.js 15 requires Node.js >= 18."
        log_info "Please upgrade Node.js: https://nodejs.org/"
        exit 1
    fi
else
    log_warning "Node.js not found. Install for frontend development."
    log_info "Visit: https://nodejs.org/"
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

# Check TypeScript (required)
if command_exists tsc; then
    TSC_VERSION=$(tsc --version)
    log_success "TypeScript found: $TSC_VERSION"
else
    log_warning "TypeScript not found. Will be installed via pnpm."
fi

# Check Prisma CLI (for database)
if command_exists prisma; then
    PRISMA_VERSION=$(prisma --version)
    log_success "Prisma CLI found: $PRISMA_VERSION"
else
    log_warning "Prisma CLI not found globally. Will be installed via pnpm."
fi

# Check GitHub CLI (for Spec-Kit integration)
if command_exists gh; then
    GH_VERSION=$(gh --version | awk '{print $3}')
    log_success "GitHub CLI found: $GH_VERSION"
else
    log_warning "GitHub CLI not found. Optional for Spec-Kit features."
    log_info "Install with: brew install gh (macOS) or https://cli.github.com/"
fi

# Check Playwright (for E2E tests)
if command_exists playwright; then
    PLAYWRIGHT_VERSION=$(playwright --version)
    log_success "Playwright found: $PLAYWRIGHT_VERSION"
else
    log_info "Playwright not found. Will be installed via pnpm for testing."
fi

# Check for required environment variables
log_info "Checking environment variables..."
ENV_FILE="$PROJECT_ROOT/.env"
if [ -f "$ENV_FILE" ]; then
    log_success ".env file found"
    
    # Check critical environment variables
    REQUIRED_VARS=("DATABASE_URL")
    MISSING_VARS=()
    
    for var in "${REQUIRED_VARS[@]}"; do
        if ! grep -q "^${var}=" "$ENV_FILE"; then
            MISSING_VARS+=("$var")
        fi
    done
    
    if [ ${#MISSING_VARS[@]} -gt 0 ]; then
        log_warning "Missing environment variables: ${MISSING_VARS[*]}"
        log_info "Create .env from .env.example if available"
    else
        log_success "Required environment variables configured"
    fi
else
    log_warning ".env file not found. Create it from env.template or .env.example"
fi

# Validate project structure
log_info "Validating project structure..."
if validate_project_structure; then
    log_success "Project structure validated"
else
    log_error "Project structure validation failed"
    exit 1
fi

# Check for required directories
REQUIRED_DIRS=("app" "components" "lib" "specs" "templates" "memory")
for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$PROJECT_ROOT/$dir" ]; then
        log_success "Directory exists: $dir/"
    else
        log_error "Required directory missing: $dir/"
        exit 1
    fi
done

# Check for required files
REQUIRED_FILES=("CLAUDE.md" "package.json" "tsconfig.json" "memory/constitution.md")
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$PROJECT_ROOT/$file" ]; then
        log_success "File exists: $file"
    else
        log_error "Required file missing: $file"
        exit 1
    fi
done

# Check dependencies are installed
if [ -f "$PROJECT_ROOT/node_modules/.package-lock.json" ] || [ -d "$PROJECT_ROOT/node_modules" ]; then
    log_success "Dependencies installed"
else
    log_warning "Dependencies not installed. Run 'pnpm install'"
fi

# Check if git remote is configured
if git remote get-url origin >/dev/null 2>&1; then
    REMOTE_URL=$(git remote get-url origin)
    log_success "Git remote configured: $REMOTE_URL"
else
    log_warning "Git remote not configured. Configure with: git remote add origin <url>"
fi

# Summary
log_info ""
log_success "Prerequisites check complete!"
log_info ""
log_info "Summary:"
log_info "  - Version control: Git"
log_info "  - Package manager: pnpm"
log_info "  - Runtime: Node.js >= 18"
log_info "  - Language: TypeScript"
log_info "  - ORM: Prisma"
log_info "  - Testing: Playwright"
log_info "  - Spec-Kit: Ready"
log_info ""
log_info "Next steps:"
log_info "  1. Ensure .env is configured"
log_info "  2. Run 'pnpm install' if dependencies not installed"
log_info "  3. Run 'pnpm prisma generate' to generate Prisma client"
log_info "  4. Run 'pnpm dev' to start development server"
log_info "  5. Use './scripts/setup-plan.sh <feature-name>' to create a new feature"
