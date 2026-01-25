#!/bin/bash
# Validate specifications against Spec-Kit standards

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common.sh"

PROJECT_ROOT=$(get_project_root)

log_info "Validating specifications..."

# Parse command line arguments
VALIDATE_ALL=false
SPEC_NAME=""

while [[ $# -gt 0 ]]; do
    case $1 in
        --all)
            VALIDATE_ALL=true
            shift
            ;;
        *)
            SPEC_NAME="$1"
            shift
      ;;
  esac
done

# Function to validate a single spec
validate_spec() {
    local spec_dir="$1"
    local spec_name=$(basename "$spec_dir")
    
    log_info "Validating: $spec_name"
    
    local errors=0
    local warnings=0
    
    # Check required files exist
    local required_files=("spec.md" "plan.md" "tasks.md")
    for file in "${required_files[@]}"; do
        if [ ! -f "$spec_dir/$file" ]; then
            log_error "  Missing required file: $file"
            ((errors++))
        fi
    done
    
    # Check optional files
    local optional_files=("research.md" "data-model.md" "quickstart.md")
    for file in "${optional_files[@]}"; do
        if [ ! -f "$spec_dir/$file" ]; then
            log_warning "  Missing optional file: $file"
            ((warnings++))
    fi
done

    # Validate spec.md
    if [ -f "$spec_dir/spec.md" ]; then
        # Check for required sections
        local required_sections=("## Overview" "## Requirements" "## User Stories")
        for section in "${required_sections[@]}"; do
            if ! grep -q "^$section" "$spec_dir/spec.md"; then
                log_error "  spec.md missing section: $section"
                ((errors++))
        fi
    done
    fi
    
    # Validate plan.md
    if [ -f "$spec_dir/plan.md" ]; then
        # Check for required sections
        local required_sections=("## Implementation Plan" "## Technology Stack")
        for section in "${required_sections[@]}"; do
            if ! grep -q "^$section" "$spec_dir/plan.md"; then
                log_error "  plan.md missing section: $section"
                ((errors++))
            fi
        done
    fi
    
    # Validate tasks.md
    if [ -f "$spec_dir/tasks.md" ]; then
        # Check for required sections
        local required_sections=("## Tasks" "## Dependencies")
        for section in "${required_sections[@]}"; do
            if ! grep -q "^$section" "$spec_dir/tasks.md"; then
                log_error "  tasks.md missing section: $section"
                ((errors++))
            fi
        done
        
        # Check if tasks are numbered
        if ! grep -q "^### [0-9]" "$spec_dir/tasks.md"; then
            log_warning "  tasks.md may not have numbered tasks"
            ((warnings++))
        fi
    fi
    
    # Check for contracts directory
    if [ -d "$spec_dir/contracts" ]; then
        log_success "  contracts/ directory exists"
    else
        log_warning "  contracts/ directory missing"
        ((warnings++))
    fi
    
    # Check for checklists directory
    if [ -d "$spec_dir/checklists" ]; then
        log_success "  checklists/ directory exists"
    else
        log_warning "  checklists/ directory missing"
        ((warnings++))
    fi
    
    # Report results
    if [ $errors -eq 0 ] && [ $warnings -eq 0 ]; then
        log_success "  $spec_name: VALID ✓"
    elif [ $errors -eq 0 ]; then
        log_warning "  $spec_name: VALID with warnings ($warnings) ⚠"
    else
        log_error "  $spec_name: INVALID ($errors errors, $warnings warnings) ✗"
        return 1
    fi
}

# Validate all specs or specific spec
if [ "$VALIDATE_ALL" = true ]; then
    log_info "Validating all specifications..."
    specs_dir="$PROJECT_ROOT/specs"
    total_specs=0
    valid_specs=0
    invalid_specs=0
    
    for spec_dir in "$specs_dir"/*/; do
        if [ -d "$spec_dir" ]; then
            # Skip special directories
            spec_name=$(basename "$spec_dir")
            if [ "$spec_name" = "archived" ] || [ "$spec_name" = "templates" ] || [ "$spec_name" = "utils" ]; then
                continue
            fi
            ((total_specs++))
            if validate_spec "$spec_dir"; then
                ((valid_specs++))
            else
                ((invalid_specs++))
            fi
        fi
    done
    
    # Summary
    log_info ""
    log_info "Validation Summary:"
    log_info "  Total specs: $total_specs"
    log_success "  Valid: $valid_specs"
    
    if [ $invalid_specs -gt 0 ]; then
        log_error "  Invalid: $invalid_specs"
        exit 1
    fi
    
    log_success "All specifications validated!"
    
elif [ -n "$SPEC_NAME" ]; then
    # Validate specific spec
    spec_dir="$PROJECT_ROOT/specs/$SPEC_NAME"
    
    if [ ! -d "$spec_dir" ]; then
        log_error "Spec not found: $SPEC_NAME"
        exit 1
    fi
    
    if validate_spec "$spec_dir"; then
        log_success "Spec validation passed!"
        exit 0
    else
        log_error "Spec validation failed!"
        exit 1
    fi
    
else
    # No arguments - validate all specs
    log_info "No spec specified, validating all specs..."
    VALIDATE_ALL=true
    specs_dir="$PROJECT_ROOT/specs"
    
    for spec_dir in "$specs_dir"/*/; do
        if [ -d "$spec_dir" ]; then
            # Skip special directories
            spec_name=$(basename "$spec_dir")
            if [ "$spec_name" = "archived" ] || [ "$spec_name" = "templates" ]; then
                continue
            fi
            validate_spec "$spec_dir"
        fi
    done
fi

exit 0
