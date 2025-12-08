#!/bin/bash
# Alias for setup-plan.sh for convenience

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
"$SCRIPT_DIR/setup-plan.sh" "$@"

