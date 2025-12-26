#!/bin/bash
# Archive a completed specification

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common.sh"

PROJECT_ROOT=$(get_project_root)

# Parse command line arguments
SPEC_NAME=""
MOVE_TO_HISTORY=false
CREATE_BRANCH=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --move-history)
            MOVE_TO_HISTORY=true
            shift
            ;;
        --create-branch)
            CREATE_BRANCH=true
            shift
            ;;
        *)
            SPEC_NAME="$1"
            shift
            ;;
    esac
done

# Check if spec name is provided
if [ -z "$SPEC_NAME" ]; then
    log_error "Please specify a spec name"
    log_info "Usage: $0 <spec-name> [--move-history] [--create-branch]"
    exit 1
fi

# Find the spec directory
SPEC_DIR=""
for dir in "$PROJECT_ROOT/specs"/*/; do
    dir_name=$(basename "$dir")
    if [[ "$dir_name" == *"$SPEC_NAME"* ]]; then
        SPEC_DIR="$dir"
        break
    fi
done

if [ -z "$SPEC_DIR" ]; then
    log_error "Spec not found: $SPEC_NAME"
    exit 1
fi

log_info "Archiving spec: $(basename "$SPEC_DIR")"

# Validate spec is complete
if [ ! -f "$SPEC_DIR/spec.md" ] || [ ! -f "$SPEC_DIR/plan.md" ] || [ ! -f "$SPEC_DIR/tasks.md" ]; then
    log_warning "Spec appears incomplete. Ensure spec.md, plan.md, and tasks.md exist."
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "Archiving cancelled."
        exit 0
    fi
fi

# Create archive directory if it doesn't exist
ARCHIVE_DIR="$PROJECT_ROOT/specs/.archived"
mkdir -p "$ARCHIVE_DIR"

# Get current date
ARCHIVE_DATE=$(date +%Y%m%d)
ARCHIVE_TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Create archive name
SPEC_BASENAME=$(basename "$SPEC_DIR")
ARCHIVE_NAME="${ARCHIVE_DATE}_${SPEC_BASENAME}"
ARCHIVE_PATH="$ARCHIVE_DIR/$ARCHIVE_NAME"

# Check if archive already exists
if [ -d "$ARCHIVE_PATH" ]; then
    log_warning "Archive already exists: $ARCHIVE_NAME"
    read -p "Overwrite? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "Archiving cancelled."
        exit 0
    fi
    rm -rf "$ARCHIVE_PATH"
fi

# Archive the spec
log_info "Moving spec to archive..."
cp -r "$SPEC_DIR" "$ARCHIVE_PATH"

# Create archive metadata
cat > "$ARCHIVE_PATH/ARCHIVE_INFO.md" << EOF
# Archive Information

**Archived Date:** $(date +%Y-%m-%d)
**Archived Time:** $(date +%H:%M:%S)
**Original Location:** specs/${SPEC_BASENAME}
**Archive Name:** ${ARCHIVE_NAME}

## Archival Notes

This specification has been archived. All implementation should be complete.

## Files Included

$(find "$ARCHIVE_PATH" -type f -name "*.md" -o -name "*.json" | sed 's|'"$ARCHIVE_PATH/"||' | sed 's/^/- /')

## Post-Archive Actions

- [ ] Update CHANGELOG.md with release notes
- [ ] Update documentation
- [ ] Close related GitHub issues
- [ ] Notify team of completion
EOF

# Create git branch if requested
if [ "$CREATE_BRANCH" = true ]; then
    BRANCH_NAME="archive/${SPEC_BASENAME}"
    
    if git branch --show-current >/dev/null 2>&1; then
        log_info "Creating git branch: $BRANCH_NAME"
        git checkout -b "$BRANCH_NAME" 2>/dev/null || {
            log_error "Failed to create branch. May already exist."
            git checkout - 2>/dev/null
        }
    else
        log_warning "Not in a git repository, skipping branch creation"
    fi
fi

# Update CHANGELOG.md if it exists
CHANGELOG="$PROJECT_ROOT/CHANGELOG.md"
if [ -f "$CHANGELOG" ]; then
    log_info "Updating CHANGELOG.md..."
    
    # Get spec title from spec.md
    SPEC_TITLE=$(grep -m 1 "^# " "$SPEC_DIR/spec.md" | sed 's/^# //')
    SPEC_DESCRIPTION=$(grep -A 5 "^## Overview" "$SPEC_DIR/spec.md" | head -6 | tail -1)
    
    # Add entry to CHANGELOG
    TEMP_FILE=$(mktemp)
    cat "$CHANGELOG" > "$TEMP_FILE"
    
    cat > "$CHANGELOG" << EOF
# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Completed Features

#### ${SPEC_BASENAME}
${SPEC_TITLE}

${SPEC_DESCRIPTION}

- **Date:** $(date +%Y-%m-%d)
- **Spec:** specs/${SPEC_BASENAME}
- **Archive:** specs/.archived/${ARCHIVE_NAME}

EOF
    
    cat "$TEMP_FILE" >> "$CHANGELOG"
    rm "$TEMP_FILE"
    
    log_success "CHANGELOG.md updated"
fi

# Remove original spec if move-history flag is set
if [ "$MOVE_TO_HISTORY" = true ]; then
    log_info "Removing original spec from specs/..."
    rm -rf "$SPEC_DIR"
    log_success "Original spec removed"
else
    log_info "Original spec kept in specs/"
    log_info "Use --move-history to remove it after archiving"
fi

log_success "Archiving complete!"
log_info "Archive location: $ARCHIVE_PATH"
log_info ""
log_info "Next steps:"
log_info "  1. Review archive at $ARCHIVE_PATH"
log_info "  2. Update CHANGELOG.md with release notes"
log_info "  3. Update documentation as needed"
log_info "  4. Close related GitHub issues"
log_info "  5. Notify team of completion"

