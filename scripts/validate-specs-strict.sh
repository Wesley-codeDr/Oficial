#!/bin/bash
# validate-specs-strict.sh - Strict SPECS validation for WellWave
# Version: 3.0.0
# Purpose: Block commits for production code without specifications
# Usage: Run automatically via .husky/pre-commit or manually

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Configuration
PRODUCTION_PATTERNS=(
  "app/(dashboard)/**/*.{ts,tsx,js,jsx}"
  "app/(auth)/**/*.{ts,tsx,js,jsx}"
  "app/api/**/*.{ts,tsx,js,jsx}"
  "components/**/*.{ts,tsx,js,jsx}"
  "lib/**/*.{ts,tsx,js,jsx}"
  "stores/**/*.{ts,tsx,js,jsx}"
  "hooks/**/*.{ts,tsx}"
)

EXCLUDED_PATTERNS=(
  "**/*.test.{ts,tsx,js,jsx}"
  "**/*.spec.{ts,tsx,js,jsx}"
  "**/__tests__/**"
  "**/*.d.ts"
  "**/types/**"
)

SPECS_DIR="specs"
REQUIRED_FILES=("spec.md" "plan.md" "tasks.md")

# Banner
echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}  WellWave SPECS Validator v3.0.0${NC}"
echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Function: Check if file matches production patterns
is_production_file() {
  local file="$1"
  
  # Check if excluded
  for pattern in "${EXCLUDED_PATTERNS[@]}"; do
    if [[ "$file" == $pattern ]]; then
      return 1
    fi
  done
  
  # Check if matches production patterns
  for pattern in "${PRODUCTION_PATTERNS[@]}"; do
    if [[ "$file" == $pattern ]] || [[ "$file" =~ ^(app|components|lib|stores|hooks)/ ]]; then
      return 0
    fi
  done
  
  return 1
}

# Function: Extract feature name from file path
extract_feature_name() {
  local file="$1"
  local feature=""
  
  # Extract from app/(dashboard)/[feature]/ or app/(auth)/[feature]/
  if [[ "$file" =~ app/\(dashboard\)/([^/]+)/ ]]; then
    feature="${BASH_REMATCH[1]}"
  elif [[ "$file" =~ app/\(auth\)/([^/]+)/ ]]; then
    feature="${BASH_REMATCH[1]}"
  elif [[ "$file" =~ app/api/([^/]+)/ ]]; then
    feature="${BASH_REMATCH[1]}"
  elif [[ "$file" =~ components/([^/]+)/ ]]; then
    feature="${BASH_REMATCH[1]}"
  elif [[ "$file" =~ lib/([^/]+)/ ]]; then
    feature="${BASH_REMATCH[1]}"
  else
    # Fallback: use directory name
    feature=$(dirname "$file" | cut -d'/' -f2)
  fi
  
  echo "$feature"
}

# Function: Check if specs exist for feature
check_specs_exist() {
  local feature="$1"
  local missing_files=()
  
  for required_file in "${REQUIRED_FILES[@]}"; do
    local spec_path="$SPECS_DIR/$feature/$required_file"
    if [[ ! -f "$spec_path" ]]; then
      missing_files+=("$required_file")
    fi
  done
  
  if [[ ${#missing_files[@]} -gt 0 ]]; then
    return 1
  fi
  
  return 0
}

# Function: Validate CLAUDE.md size
check_claude_size() {
  local claude_file="CLAUDE.md"
  local max_lines=200
  
  if [[ -f "$claude_file" ]]; then
    local lines=$(wc -l < "$claude_file")
    if [[ $lines -gt $max_lines ]]; then
      echo -e "${RED}✗${NC} CLAUDE.md exceeds $max_lines lines (current: $lines)"
      return 1
    else
      echo -e "${GREEN}✓${NC} CLAUDE.md size OK ($lines/$max_lines lines)"
    fi
  fi
  
  return 0
}

# Main validation logic
main() {
  local exit_code=0
  local checked_features=()
  local violated_features=()
  
  # Get staged files (or all files if not in git context)
  local staged_files
  if git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    staged_files=$(git diff --cached --name-only --diff-filter=ACM)
  else
    # Fallback: check recent modifications
    staged_files=$(find app components lib stores hooks -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" 2>/dev/null | head -20)
  fi
  
  if [[ -z "$staged_files" ]]; then
    echo -e "${YELLOW}ℹ${NC} No staged files to validate"
    exit 0
  fi
  
  echo -e "${BOLD}Checking staged production files...${NC}"
  echo ""
  
  # Check each staged file
  while IFS= read -r file; do
    if [[ -z "$file" ]]; then
      continue
    fi
    
    if is_production_file "$file"; then
      feature=$(extract_feature_name "$file")
      
      # Skip if already checked
      if [[ " ${checked_features[@]} " =~ " ${feature} " ]]; then
        continue
      fi
      
      checked_features+=("$feature")
      
      echo -e "  Checking: ${BOLD}$file${NC} → feature: ${BOLD}$feature${NC}"
      
      if check_specs_exist "$feature"; then
        echo -e "  ${GREEN}✓${NC} SPECS exist for feature: $feature"
        echo -e "    - ${GREEN}✓${NC} specs/$feature/spec.md"
        echo -e "    - ${GREEN}✓${NC} specs/$feature/plan.md"
        echo -e "    - ${GREEN}✓${NC} specs/$feature/tasks.md"
      else
        echo -e "  ${RED}✗${NC} SPECS missing for feature: ${BOLD}$feature${NC}"
        echo -e "    ${RED}Missing required files:${NC}"
        for required_file in "${REQUIRED_FILES[@]}"; do
          if [[ ! -f "$SPECS_DIR/$feature/$required_file" ]]; then
            echo -e "      ${RED}✗${NC} specs/$feature/$required_file"
          fi
        done
        violated_features+=("$feature")
        exit_code=1
      fi
      echo ""
    fi
  done <<< "$staged_files"
  
  # Validate CLAUDE.md size
  echo -e "${BOLD}Checking CLAUDE.md size...${NC}"
  check_claude_size || exit_code=1
  echo ""
  
  # Summary
  echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  if [[ $exit_code -eq 0 ]]; then
    echo -e "${GREEN}${BOLD}✓ VALIDATION PASSED${NC}"
    echo -e "  All production code has required specifications."
  else
    echo -e "${RED}${BOLD}✗ VALIDATION FAILED${NC}"
    echo ""
    echo -e "${RED}Features without SPECS:${NC}"
    for feature in "${violated_features[@]}"; do
      echo -e "  - ${BOLD}$feature${NC}"
    done
    echo ""
    echo -e "${YELLOW}To fix this:${NC}"
    echo -e "  1. Create spec structure:"
    echo -e "     ${BOLD}./scripts/setup-plan.sh <feature-name>${NC}"
    echo ""
    echo -e "  2. Edit the specification:"
    echo -e "     ${BOLD}specs/<feature-name>/spec.md${NC}"
    echo ""
    echo -e "  3. Generate plan and tasks:"
    echo -e "     ${BOLD}/speckit.plan${NC}"
    echo -e "     ${BOLD}/speckit.tasks${NC}"
    echo ""
    echo -e "${RED}${BOLD}COMMIT BLOCKED${NC} - Fix violations above and try again."
  fi
  echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  
  exit $exit_code
}

# Run main function
main "$@"
