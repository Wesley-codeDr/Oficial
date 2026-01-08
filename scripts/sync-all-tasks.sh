#!/bin/bash
# Sync all tasks between tasks.md and Vibe Kanban
# This is a convenience script that runs the TypeScript sync script

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Default to bidirectional sync
DIRECTION="${1:-both}"

if [[ ! "$DIRECTION" =~ ^(both|to-kanban|from-kanban)$ ]]; then
  echo "❌ Invalid direction: $DIRECTION"
  echo "   Use: both, to-kanban, or from-kanban"
  exit 1
fi

echo "🔄 Syncing all tasks..."
echo "   Direction: $DIRECTION"
echo ""

cd "$PROJECT_ROOT"

# Run the TypeScript sync script
pnpm tsx scripts/kanban/sync-kanban-tasks.ts "" "$DIRECTION"

echo ""
echo "✅ Sync complete!"

