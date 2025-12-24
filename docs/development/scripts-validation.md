# Scripts de Validação de Especificações

## Visão Geral

Esta seção documenta os scripts de validação automática para garantir a qualidade e consistência das especificações do WellWave.

## Script Principal: validate-specs.sh

### Localização
```bash
scripts/validate-specs.sh
```

### Uso
```bash
# Executar validação completa
./scripts/validate-specs.sh

# Ver apenas erros (ignorar warnings)
./scripts/validate-specs.sh --errors-only

# Gerar relatório em JSON
./scripts/validate-specs.sh --json-report
```

### Funcionalidades

#### 1. Validação de Estrutura de Diretórios

Verifica se todos os diretórios obrigatórios existem:

**Diretórios Obrigatórios:**
- `specs/` - Especificações de features
- `specs/templates/` - Templates padronizados
- `docs/` - Documentação geral
- `docs/architecture/` - Documentação de arquitetura
- `docs/api/` - Documentação de APIs
- `docs/deployment/` - Guias de deploy
- `docs/development/` - Guias para desenvolvedores
- `docs/operations/` - Guias operacionais
- `docs/business/` - Documentacao de produto e mercado

#### 2. Validação de Templates

Verifica se todos os templates obrigatórios existem:

**Templates Obrigatórios:**
- `specs/templates/feature-spec.md` - Template de especificação de feature
- `specs/templates/api-spec.md` - Template de especificação de API
- `specs/templates/technical-design.md` - Template de design técnico
- `specs/templates/deployment-guide.md` - Template de guia de deploy

#### 3. Validação de Seções em Especificações

Verifica se todas as seções obrigatórias estão presentes nos arquivos `spec.md`:

**Seções Obrigatórias:**
- `## Overview`
- `## Problem Statement`
- `## Solution Summary`
- `## User Stories`
- `## Functional Requirements`
- `## Non-Functional Requirements`
- `## Success Criteria`
- `## Dependencies`
- `## Risks and Mitigations`

#### 4. Validação de OpenAPI

Valida arquivos OpenAPI usando ferramentas especializadas:

**Ferramentas Suportadas:**
- `swagger-codegen`
- `@apidevtools/swagger-parser`

**Validações Realizadas:**
- Sintaxe OpenAPI válida
- Referências internas consistentes
- Exemplos funcionais

#### 5. Validação de Links

Verifica links quebrados em arquivos Markdown:

**Ferramenta Utilizada:**
- `markdown-link-check`

**Tipos de Links Verificados:**
- Links internos (para outros arquivos)
- Links externos (URLs)
- Âncoras dentro do mesmo arquivo

#### 6. Validação de Versionamento

Verifica consistência de versionamento:

**Validações:**
- Apenas uma versão ativa por feature
- Formato de versão consistente (semântico)
- Histórico de mudanças documentado

#### 7. Validação de Arquivos Complementares

Verifica se arquivos complementares existem quando há `spec.md`:

**Arquivos Complementares:**
- `plan.md` - Plano de implementação
- `tasks.md` - Breakdown de tarefas
- `contracts/` - Contratos de API

#### 8. Validação do Constitution

Verifica integridade do Constitution:

**Validações:**
- Existência do arquivo `memory/constitution.md`
- Presença de princípios core
- Versão documentada

## Código do Script

```bash
#!/bin/bash

# Script de validação de especificações para WellWave
# Uso: ./scripts/validate-specs.sh

set -e

echo "🔍 Validando estrutura de especificações WellWave..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Contadores
ERRORS=0
WARNINGS=0

# Função para imprimir erro
print_error() {
    echo -e "${RED}❌ $1${NC}"
    ((ERRORS++))
}

# Função para imprimir warning
print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    ((WARNINGS++))
}

# Função para imprimir sucesso
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Função para imprimir info
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# [Restante do script com as validações...]

# Resumo final
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
```

## Integração com CI/CD

### GitHub Actions

O script é integrado no pipeline de CI/CD através do workflow:

```yaml
# .github/workflows/spec-validation.yml
name: Spec Validation

on:
  pull_request:
    paths:
      - 'specs/**'
      - 'docs/**'

jobs:
  validate-specs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Validate Spec Structure
        run: |
          chmod +x scripts/validate-specs.sh
          ./scripts/validate-specs.sh
          
      - name: Upload Validation Report
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: validation-report
          path: validation-report.json
```

### Pre-commit Hooks

O script também pode ser executado como pre-commit hook:

```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Executar validação de specs se houver mudanças
if git diff --cached --name-only | grep -E "specs/|docs/"; then
    echo "🔍 Validando especificações..."
    ./scripts/validate-specs.sh
fi
```

## Relatórios de Validação

### Formato Texto

O script gera relatório em formato texto com:

- Resumo de validações executadas
- Lista de erros encontrados
- Lista de warnings
- Estatísticas finais

### Formato JSON

Opcionalmente, pode gerar relatório em JSON:

```json
{
  "timestamp": "2024-01-01T00:00:00Z",
  "summary": {
    "total_checks": 50,
    "passed": 45,
    "warnings": 3,
    "errors": 2
  },
  "validations": [
    {
      "type": "directory_structure",
      "status": "passed",
      "message": "All required directories found"
    },
    {
      "type": "template_validation",
      "status": "warning",
      "message": "Optional template missing: deployment-guide.md"
    }
  ],
  "errors": [
    {
      "file": "specs/feature-x/spec.md",
      "line": 15,
      "message": "Missing required section: Problem Statement"
    }
  ],
  "warnings": [
    {
      "file": "docs/api/authentication.md",
      "line": 42,
      "message": "Link to external resource may be outdated"
    }
  ]
}
```

## Configuração

### Variáveis de Ambiente

O script pode ser configurado através de variáveis de ambiente:

```bash
# Nível de严格za (strict|normal|lenient)
export SPEC_VALIDATION_STRICTNESS=strict

# Formato de saída (text|json|junit)
export SPEC_VALIDATION_OUTPUT=json

# Arquivos a ignorar
export SPEC_VALIDATION_IGNORE=node_modules,dist,*.min.js
```

### Arquivo de Configuração

Alternativamente, pode usar arquivo de configuração:

```yaml
# .spec-validation.yml
validation:
  strictness: strict
  output_format: json
  ignore_patterns:
    - node_modules
    - dist
    - "*.min.js"
  
checks:
  directory_structure: true
  template_validation: true
  section_validation: true
  openapi_validation: true
  link_validation: true
  version_validation: true
  
openapi:
  validator: swagger-codegen
  
links:
  timeout: 10
  retry_count: 3
  
reports:
  output_file: validation-report.json
  include_suggestions: true
```

## Melhorias Futuras

### Validações Adicionais Planejadas

1. **Validação de Consistência de Conteúdo**
   - Verificar se user stories correspondem a requisitos funcionais
   - Validar se critérios de sucesso são mensuráveis

2. **Validação de Impacto em Outros Documentos**
   - Detectar se mudanças em uma spec afetam outras specs
   - Verificar dependências entre especificações

3. **Validação de Qualidade de Escrita**
   - Verificar clareza e objetividade do texto
   - Detectar jargões excessivos ou ambiguidades

4. **Validação de Completeness**
   - Verificar se todos os campos obrigatórios estão preenchidos
   - Validar se exemplos são funcionais

### Integrações Adicionais

1. **Integração com Ferramentas de Lint**
   - Markdown lint para formatação consistente
   - Spell checking para documentos

2. **Integração com Ferramentas de Análise**
   - Análise de complexidade de especificações
   - Métricas de qualidade de documentação

3. **Integração com Sistema de Issues**
   - Criação automática de issues para problemas encontrados
   - Atribuição automática para responsáveis

## Troubleshooting

### Problemas Comuns

#### Erro: "Template não encontrado"
**Causa:** Template obrigatório ausente
**Solução:** Copiar template de `specs/templates/` ou criar novo

#### Erro: "Seção ausente em spec.md"
**Causa:** Seção obrigatória faltando
**Solução:** Adicionar seção usando template como referência

#### Warning: "Link quebrado"
**Causa:** URL inválida ou recurso movido
**Solução:** Atualizar link ou remover referência

#### Erro: "OpenAPI inválido"
**Causa:** Sintaxe incorreta no arquivo YAML
**Solução:** Validar sintaxe com linter YAML

### Debug

Para debug do script:

```bash
# Executar com debug
./scripts/validate-specs.sh --debug

# Ver apenas validações específicas
./scripts/validate-specs.sh --check=directory_structure
./scripts/validate-specs.sh --check=openapi_validation

# Usar arquivo de config customizado
./scripts/validate-specs.sh --config=.spec-validation.custom.yml
```

## Conclusão

O script de validação de especificações é uma ferramenta essencial para manter a qualidade e consistência da documentação do WellWave. Ao automatizar as validações, garantimos que todas as especificações sigam os padrões estabelecidos e que a documentação permaneça útil e atualizada.

A integração com CI/CD e pre-commit hooks garante que problemas sejam detectados cedo no processo de desenvolvimento, reduzindo o tempo gasto com revisões manuais e melhorando a eficiência do time.
