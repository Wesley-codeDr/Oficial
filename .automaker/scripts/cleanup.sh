#!/bin/bash
# Automaker Cleanup Script - Remove old features and optimize performance

set -e

echo "🧹 Automaker Cleanup Script"
echo "=========================="
echo ""

# Archive directory
ARCHIVE_DIR=".automaker/archive/features-$(date +%Y-%m)"
FEATURES_DIR=".automaker/features"

# Check if features directory exists
if [ ! -d "$FEATURES_DIR" ]; then
    echo "❌ Features directory not found"
    exit 1
fi

# Count features
FEATURE_COUNT=$(find "$FEATURES_DIR" -maxdepth 1 -type d -name "feature-*" | wc -l)

if [ "$FEATURE_COUNT" -eq 0 ]; then
    echo "✅ No features to archive"
    exit 0
fi

echo "📦 Found $FEATURE_COUNT features to archive"
echo ""

# Create archive directory
mkdir -p "$ARCHIVE_DIR"

# Move completed features older than 7 days
find "$FEATURES_DIR" -maxdepth 1 -type d -name "feature-*" -mtime +7 -exec mv {} "$ARCHIVE_DIR/" \;

# Count archived
ARCHIVED_COUNT=$(find "$ARCHIVE_DIR" -maxdepth 1 -type d -name "feature-*" | wc -l)

echo "✅ Archived $ARCHIVED_COUNT features to $ARCHIVE_DIR"
echo ""

# Show current size
TOTAL_SIZE=$(du -sh .automaker | cut -f1)
ARCHIVE_SIZE=$(du -sh .automaker/archive 2>/dev/null | cut -f1 || echo "0K")

echo "📊 Storage:"
echo "   Total: $TOTAL_SIZE"
echo "   Archive: $ARCHIVE_SIZE"
echo ""

# Cleanup empty directories
find "$FEATURES_DIR" -type d -empty -delete 2>/dev/null || true

echo "🎉 Cleanup complete!"
