#!/bin/bash
# Wrapper script for pnpm commands in Vibe Kanban worktrees
# This script detects if we're in a worktree and redirects to project root

set -e

# Project root directory
PROJECT_ROOT="/Users/wesleywillian/Oficial/Oficial"

# Check if we're in a worktree (temporary directory)
CURRENT_DIR="$(pwd)"
if [[ "$CURRENT_DIR" == *"/vibe-kanban/worktrees/"* ]] || [[ ! -f "package.json" ]]; then
  # We're in a worktree or directory without package.json
  # Redirect to project root
  if [[ -f "$PROJECT_ROOT/package.json" ]]; then
    echo "⚠️  Detected worktree or missing package.json. Redirecting to project root..."
    cd "$PROJECT_ROOT"
  else
    echo "❌ Error: Project root not found at $PROJECT_ROOT"
    echo "   Please update PROJECT_ROOT in scripts/kanban/pnpm-wrapper.sh"
    exit 1
  fi
fi

# Execute pnpm command with all arguments
exec pnpm "$@"

