#!/bin/bash
# Setup script for Vibe Kanban integration
# This script sets up the initial configuration and verifies prerequisites

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🚀 Setting up Vibe Kanban integration..."
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed"
  exit 1
fi
echo "   ✅ Node.js: $(node --version)"

# Check pnpm
if ! command -v pnpm &> /dev/null; then
  echo "❌ pnpm is not installed"
  exit 1
fi
echo "   ✅ pnpm: $(pnpm --version)"

# Check Cursor Agent CLI
if command -v agent &> /dev/null || command -v cursor-agent &> /dev/null; then
  echo "   ✅ Cursor Agent CLI installed"
else
  echo "   ⚠️  Cursor Agent CLI not found"
  echo "   📦 Installing Cursor Agent CLI..."
  curl https://cursor.com/install -fsS | bash
fi

# Check if vibe-kanban-web-companion is installed
if pnpm list vibe-kanban-web-companion &> /dev/null; then
  echo "   ✅ vibe-kanban-web-companion installed"
else
  echo "   ⚠️  vibe-kanban-web-companion not found in dependencies"
  echo "   💡 It should already be in package.json"
fi

echo ""
echo "📁 Creating .vibe-kanban directory..."
mkdir -p "$PROJECT_ROOT/.vibe-kanban"
echo "   ✅ Created .vibe-kanban/"

echo ""
echo "📝 Creating initial configuration..."
cat > "$PROJECT_ROOT/.vibe-kanban/config.json" <<EOF
{
  "version": "1.0",
  "project": "WellWave",
  "sync": {
    "autoSync": false,
    "syncInterval": 3600000,
    "preferKanbanStatus": true
  },
  "kanban": {
    "columns": ["todo", "in_progress", "review", "done"],
    "labels": {
      "spec": "spec:",
      "phase": "phase:",
      "blocking": "blocking",
      "parallel": "parallel"
    }
  }
}
EOF
echo "   ✅ Created .vibe-kanban/config.json"

echo ""
echo "✨ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Run 'pnpm kanban:migrate' to migrate existing tasks"
echo "   2. Start Vibe Kanban with 'npx vibe-kanban'"
echo "   3. Import the generated JSON files from .vibe-kanban/"
echo "   4. Run 'pnpm kanban:sync' periodically to keep tasks.md and Kanban in sync"

