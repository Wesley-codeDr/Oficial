
#!/bin/bash

# Script de validação de especificações para WellWave
# Uso: ./scripts/validate-specs.sh

set -e

ERRORS_ONLY=false
JSON_REPORT=false
QUIET=false

for arg in "$@"; do
  case "$arg" in
    --errors-only)
      ERRORS_ONLY=true
      ;;
    --json-report)
      JSON_REPORT=true
      QUIET=true
      ;;
  esac
done

if [ "$QUIET" = false ]; then
    echo "🔍 Validando estrutura de especificações WellWave..."
fi

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Contadores
ERRORS=0
WARNINGS=0
ERROR_MESSAGES=()
WARNING_MESSAGES=()

json_escape() {
  printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g'
}

# Função para imprimir erro
print_error() {
    if [ "$QUIET" = false ]; then
        echo -e "${RED}❌ $1${NC}"
    fi
    ((ERRORS++))
    if [ "$JSON_REPORT" = true ]; then
        ERROR_MESSAGES+=("$1")
    fi
}

# Função para imprimir warning
print_warning() {
    if [ "$ERRORS_ONLY" = true ]; then
        return
    fi
    if [ "$QUIET" = false ]; then
        echo -e "${YELLOW}⚠️  $1${NC}"
    fi
    ((WARNINGS++))
    if [ "$JSON_REPORT" = true ]; then
        WARNING_MESSAGES+=("$1")
    fi
}

# Função para imprimir sucesso
print_success() {
    if [ "$QUIET" = false ]; then
        echo -e "${GREEN}✅ $1${NC}"
    fi
}

# Função para imprimir info
print_info() {
    if [ "$QUIET" = false ]; then
        echo -e "${BLUE}ℹ️  $1${NC}"
    fi
}

# 1. Validar estrutura de diretórios obrigatórios
print_info "Validando estrutura de diretórios..."

required_dirs=(
    "specs"
    "specs/templates"
    "docs"
    "docs/architecture"
    "docs/api"
    "docs/deployment"
    "docs/development"
    "docs/operations"
    "docs/business"
)

for dir in "${required_dirs[@]}"; do
    if [ ! -d "$dir" ]; then
        print_error "Diretório obrigatório ausente: $dir"
    else
        print_success "Diretório encontrado: $dir"
    fi
done

# 2. Validar templates obrigatórios
print_info "Validando templates de especificação..."

required_templates=(
    "specs/templates/feature-spec.md"
    "specs/templates/api-spec.md"
    "specs/templates/technical-design.md"
    "specs/templates/deployment-guide.md"
)

for template in "${required_templates[@]}"; do
    if [ ! -f "$template" ]; then
        print_error "Template obrigatório ausente: $template"
    else
        print_success "Template encontrado: $template"
    fi
done

# 3. Validar seções obrigatórias nas specs
print_info "Validando seções obrigatórias nas especificações..."

spec_files=$(find specs -name "spec.md" -not -path "*/templates/*")

for spec_file in $spec_files; do
    echo ""
    print_info "Validando $spec_file..."
    
    # Seções obrigatórias
    required_sections=(
        "## Overview"
        "## Problem Statement"
        "## Solution Summary"
        "## User Stories"
        "## Functional Requirements"
        "## Non-Functional Requirements"
        "## Success Criteria"
        "## Dependencies"
        "## Risks and Mitigations"
    )
    
    for section in "${required_sections[@]}"; do
        if ! grep -q "$section" "$spec_file"; then
            print_warning "Seção ausente em $spec_file: $section"
        fi
    done
done

# 4. Validar arquivos OpenAPI
print_info "Validando especificações OpenAPI..."

openapi_files=$(find specs -name "openapi.yaml" -o -name "openapi.yml")

for openapi_file in $openapi_files; do
    echo ""
    print_info "Validando $openapi_file..."
    
    # Verificar se existe o comando swagger-codegen ou similar
    if command -v swagger-codegen &> /dev/null; then
        if swagger-codegen validate -i "$openapi_file" 2>/dev/null; then
            print_success "OpenAPI válido: $openapi_file"
        else
            print_error "OpenAPI inválido: $openapi_file"
        fi
    elif command -v npx &> /dev/null; then
        if npx @apidevtools/swagger-parser validate "$openapi_file" 2>/dev/null; then
            print_success "OpenAPI válido: $openapi_file"
        else
            print_error "OpenAPI inválido: $openapi_file"
        fi
    else
        print_warning "Ferramenta de validação OpenAPI não encontrada. Instale swagger-codegen ou @apidevtools/swagger-parser"
    fi
done

# 5. Validar links em arquivos Markdown
print_info "Validando links em arquivos Markdown..."

if command -v npx &> /dev/null; then
    markdown_files=$(find docs specs -name "*.md" -not -path "*/node_modules/*")
    
    for md_file in $markdown_files; do
        # Usar markdown-link-check se disponível
        if npx markdown-link-check "$md_file" --quiet 2>/dev/null; then
            print_success "Links válidos: $md_file"
        else
            print_warning "Links quebrados encontrados em: $md_file"
        fi
    done
else
    print_warning "markdown-link-check não encontrado. Instale com: npm install -g markdown-link-check"
fi

# 6. Validar consistência de versionamento
print_info "Validando consistência de versionamento..."

# Verificar se há múltiplas versões da mesma feature
for spec_dir in specs/*/; do
    if [ -d "$spec_dir" ]; then
        spec_name=$(basename "$spec_dir")
        version_count=$(find "$spec_dir" -name "v*" -type d | wc -l)
        
        if [ $version_count -gt 1 ]; then
            print_warning "Múltiplas versões encontradas para $spec_name"
        fi
    fi
done

# 7. Validar arquivos de plano e tarefas
print_info "Validando arquivos de plano e tarefas..."

for spec_dir in specs/*/; do
    if [ -d "$spec_dir" ]; then
        spec_name=$(basename "$spec_dir")
        
        if [ -f "$spec_dir/spec.md" ]; then
            # Verificar se existe plan.md e tasks.md
            if [ ! -f "$spec_dir/plan.md" ]; then
                print_warning "Plano de implementação ausente para: $spec_name"
            fi
            
            if [ ! -f "$spec_dir/tasks.md" ]; then
                print_warning "Breakdown de tarefas ausente para: $spec_name"
            fi
        fi
    fi
done

# 8. Validar configuração do Constitution
print_info "Validando Constitution..."

if [ -f "memory/constitution.md" ]; then
    # Verificar seções principais
    if grep -q "## Core Principles" "memory/constitution.md"; then
        print_success "Constitution contém princípios core"
    else
        print_error "Constitution não contém princípios core"
    fi
    
    # Verificar versão
    if grep -q "Version:" "memory/constitution.md"; then
        print_success "Constitution contem versão"
    else
        print_warning "Constitution não contém versão"
    fi
else
    print_error "Constitution não encontrado"
fi

# 9. Validar documentação de API
print_info "Validando documentação de API..."

api_docs=(
    "docs/api/README.md"
    "docs/api/authentication.md"
    "docs/api/error-handling.md"
    "docs/api/rate-limiting.md"
    "specs/1-wellwave-mvp/contracts/openapi.yaml"
)

for api_doc in "${api_docs[@]}"; do
    if [ -f "$api_doc" ]; then
        print_success "Documentação de API encontrada: $api_doc"
    else
        print_warning "Documentação de API ausente: $api_doc"
    fi
done

# 10. Validar guias de desenvolvimento
print_info "Validando guias de desenvolvimento..."

dev_guides=(
    "docs/development/getting-started.md"
    "docs/development/coding-standards.md"
    "docs/development/testing.md"
)

for guide in "${dev_guides[@]}"; do
    if [ -f "$guide" ]; then
        print_success "Guia de desenvolvimento encontrado: $guide"
    else
        print_warning "Guia de desenvolvimento ausente: $guide"
    fi
done

# Resumo final
# Resumo final
if [ "$JSON_REPORT" = true ]; then
    {
        echo -n '{"summary":{"errors":'
        echo -n "$ERRORS"
        echo -n ',"warnings":'
        echo -n "$WARNINGS"
        echo -n '},"errors":['
        first=true
        for msg in "${ERROR_MESSAGES[@]}"; do
            if [ "$first" = true ]; then
                first=false
            else
                echo -n ','
            fi
            echo -n "\"$(json_escape "$msg")\""
        done
        echo -n '],"warnings":['
        first=true
        for msg in "${WARNING_MESSAGES[@]}"; do
            if [ "$first" = true ]; then
                first=false
            else
                echo -n ','
            fi
            echo -n "\"$(json_escape "$msg")\""
        done
        echo -n ']}'
    }

    if [ $ERRORS -gt 0 ]; then
        exit 1
    fi
    exit 0
fi

echo ""
echo "📊 Resumo da Validação:"
echo -e "${GREEN}✅ Sucessos:${NC} Diretórios e arquivos válidos"
echo -e "${YELLOW}⚠️  Warnings:${NC} $WARNINGS itens precisam atenção"
echo -e "${RED}❌ Erros:${NC} $ERRORS itens precisam correção"

if [ $ERRORS -gt 0 ]; then
    echo ""
    print_error "Validação FALHOU. Corrija os erros antes de continuar."
    exit 1
elif [ $WARNINGS -gt 0 ]; then
    echo ""
    print_warning "Validação concluída com warnings. Recomendado revisar os itens."
    exit 0
else
    echo ""
    print_success "Validação CONCLUÍDA com sucesso! 🎉"
    exit 0
fi
