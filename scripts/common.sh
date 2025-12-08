#!/bin/bash
# Common utility functions for spec-kit scripts

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Get project root directory
get_project_root() {
    local script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    echo "$(cd "$script_dir/.." && pwd)"
}

# Check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Validate project structure
validate_project_structure() {
    local project_root=$(get_project_root)
    
    if [ ! -d "$project_root/memory" ]; then
        log_error "memory/ directory not found"
        return 1
    fi
    
    if [ ! -d "$project_root/specs" ]; then
        log_error "specs/ directory not found"
        return 1
    fi
    
    if [ ! -d "$project_root/templates" ]; then
        log_error "templates/ directory not found"
        return 1
    fi
    
    if [ ! -f "$project_root/memory/constitution.md" ]; then
        log_error "memory/constitution.md not found"
        return 1
    fi
    
    log_success "Project structure validated"
    return 0
}

