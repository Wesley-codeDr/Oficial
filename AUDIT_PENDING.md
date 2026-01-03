# Ações Pendentes - Auditoria de Documentação

**Gerado em**: 2026-01-03
**Fase Atual**: Core Documentation ✅ Concluída

---

## Lista de Arquivos Pendentes de Auditoria

### Prioridade 1: Documentação Técnica Principal (12 arquivos)

```
docs/
├── ARCHITECTURE.md          ⏳ Validar stack e estrutura
├── DATABASE.md              ⏳ Validar Prisma 6.x, Supabase config
├── VERCEL.md                ⏳ Validar deployment Next.js 16
├── GITHUB_ACTIONS.md        ⏳ Validar workflows
├── ROADMAP.md               ⏳ Atualizar timeline
├── SPEC_KIT_IMPLEMENTATION.md ⏳ Validar compliance
├── TROUBLESHOOTING.md       ⏳ Atualizar comandos
├── ROLLBACK.md              ⏳ Validar procedimentos
├── IMPROVEMENTS.md          ⏳ Revisar sugestões
├── OBSIDIAN_SYNC.md         ⏳ Validar relevância
├── PRISMA_ACCELERATE_SETUP.md ⏳ Verificar uso atual
└── FASE_1_2_RESUMO.md       ⏳ Atualizar status
```

**Ações por arquivo**:
- Validar versões mencionadas (Next, React, Prisma)
- Atualizar comandos e scripts
- Verificar links internos
- Remover referências a NestJS/Fastify se existirem

---

### Prioridade 2: Specs Secundários (3 specs)

```
specs/
├── 002-wellwave-platform/
│   ├── spec.md             ⏳ Validar requisitos
│   ├── plan.md             ⏳ Atualizar stack
│   ├── research.md         ⏳ Verificar relevância
│   ├── tasks.md            ⏳ Validar tarefas
│   └── anamnese-apple-hig.md ⏳ Revisar design guidelines
│
├── 003-flash-anamnesis/
│   ├── spec.md             ⏳ Validar requisitos
│   ├── plan.md             ⏳ Atualizar stack
│   └── tasks.md            ⏳ Validar tarefas
│
└── 004-inslate-backend/
    ├── spec.md             ⏳ Validar requisitos
    ├── plan.md             ⏳ Atualizar stack (verificar NestJS mencionado)
    └── tasks.md            ⏳ Validar tarefas
```

**Ações**:
- Atualizar Technology Stack tables
- Verificar se há referências a NestJS (spec 004 suspeito)
- Validar compliance com Spec-Kit
- Atualizar versões para Next 16.1+, React 19.2+, Prisma 6.19+

---

### Prioridade 3: Documentação de API (4 arquivos)

```
docs/api/
├── README.md               ⏳ Atualizar overview
├── authentication.md       ⏳ Validar Supabase Auth config
├── error-handling.md       ⏳ Validar patterns
└── rate-limiting.md        ⏳ Verificar implementação
```

**Ações**:
- Verificar se há referências a Express/Fastify
- Atualizar para Next.js API Routes
- Validar exemplos de código

---

### Prioridade 4: Arquitetura Detalhada (5 arquivos)

```
docs/architecture/
├── data-flow.md            ⏳ Atualizar diagramas
├── performance.md          ⏳ Validar métricas
├── scalability.md          ⏳ Atualizar para serverless
├── security.md             ⏳ Validar compliance
└── system-overview.md      ⏳ Atualizar stack completo
```

**Ações**:
- Atualizar diagramas para refletir app/ structure
- Remover referências a NestJS se existirem
- Validar métricas de performance (Next 16)

---

### Prioridade 5: Guias de Desenvolvimento (6 arquivos)

```
docs/development/
├── coding-standards.md     ⏳ Validar padrões TypeScript
├── getting-started.md      ⏳ Atualizar setup
├── scripts-validation.md   ⏳ Validar scripts atuais
└── testing.md              ⏳ Atualizar Vitest/Playwright

docs/guides/
├── coding-patterns.md      ⏳ Validar patterns
└── implementation-guide.md ⏳ Atualizar workflow
```

**Ações**:
- Validar comandos npm/pnpm
- Atualizar setup steps
- Verificar links para outros docs

---

### Prioridade 6: Configuration Files (28 arquivos)

#### .cursor/ (2 arquivos)
```
.cursor/
├── DEVELOPMENT.md          ⏳ Atualizar stack
└── README.md               ⏳ Validar regras
```

#### .github/ (4 arquivos)
```
.github/
├── ISSUE_TEMPLATE/
│   ├── bug_report.md      ⏳ Validar template
│   └── feature_request.md ⏳ Validar template
├── PULL_REQUEST_TEMPLATE.md ⏳ Atualizar checklist
└── README.md              ⏳ Validar workflows
```

#### .brv/context-tree/ (10 arquivos)
```
.brv/context-tree/
├── authentication/jwt/jwt_based_authentication.md
├── compliance/regulatory/regulatory_compliance.md
├── components/glass_testimonial_stack/glasstestimonialstack_component.md
├── database/prisma_orm/prisma_orm_with_postgresql.md
├── project/overview/project_overview.md
├── routing/nextjs_app_router/next_js_app_router.md
├── styling/tailwind_css/tailwind_css_with_visionos_theme.md
├── typescript/configuration/typescript_configuration.md
└── typescript/strict_mode/typescript_strict_mode.md
```

**Ações**: Validar que context tree está atualizado com versões corretas

#### .claude/agents/ (7 arquivos)
```
.claude/agents/kfc/
├── spec-design.md          ⏳ Validar agent spec
├── spec-impl.md            ⏳ Validar implementation
├── spec-judge.md           ⏳ Validar judge criteria
├── spec-requirements.md    ⏳ Validar requirements
├── spec-system-prompt-loader.md ⏳ Validar prompts
├── spec-tasks.md           ⏳ Validar tasks
└── spec-test.md            ⏳ Validar tests
```

#### Outros (5 arquivos)
```
.clinerules/byterover-rules.md
.kilocode/rules/byterover-rules.md
.roo/rules/byterover-rules.md
.trae/rules/project_rules.md
.zencoder/rules/repo.md
```

---

### Prioridade 7: Templates (12 arquivos)

```
templates/
├── CLAUDE-template.md      ⏳ Atualizar template
├── spec-template.md        ⏳ Validar Spec-Kit compliance
├── plan-template.md        ⏳ Validar stack section
├── tasks-template.md       ⏳ Validar structure
├── api-spec.md             ⏳ Atualizar para API Routes
├── data-model.md           ⏳ Validar Prisma patterns
└── research-template.md    ⏳ Validar format

specify_cli/
├── README.md               ⏳ Validar CLI docs
├── commands/README.md      ⏳ Validar commands
├── generators/README.md    ⏳ Validar generators
├── utils/README.md         ⏳ Validar utils
└── validators/README.md    ⏳ Validar validators
```

---

### Prioridade 8: Business & Operations (14 arquivos)

```
docs/business/
├── competitive-analysis.md ⏳ Revisar competitors
├── market-analysis.md      ⏳ Atualizar market
├── product-vision.md       ⏳ Validar vision
└── roadmap.md              ⏳ Atualizar timeline

docs/deployment/
└── github-actions-setup.md ⏳ Validar workflows

docs/operations/
├── README.md               ⏳ Atualizar overview
├── backup-recovery.md      ⏳ Validar procedures
├── incident-response.md    ⏳ Validar runbooks
├── maintenance.md          ⏳ Validar schedule
├── monitoring.md           ⏳ Validar Sentry config
└── runbooks/README.md      ⏳ Validar runbooks
```

---

### Prioridade 9: Outros Documentos Core (6 arquivos)

```
/
├── AGENTS.md               ⏳ Validar relevância e atualizar
├── CHANGELOG.md            ⏳ Adicionar mudanças recentes
├── CLAUDE.md               ⚠️ CRÍTICO: Consolidar 3 versões
├── CODE_OF_CONDUCT.md      ⏳ Validar
├── CONTRIBUTING.md         ⏳ Atualizar workflow
├── IMPROVEMENTS.md         ⏳ Revisar sugestões
├── MIGRATION_GUIDE.md      ⏳ Validar migrations
├── SECURITY.md             ⏳ Atualizar policies
├── WARP.md                 ⏳ Validar relevância
└── RESPONSIVE_IMPLEMENTATION.md ⏳ Validar responsive guidelines
```

---

## Issues Críticos Identificados

### 1. CLAUDE.md Múltiplas Versões ⚠️ CRÍTICO

**Localizações encontradas**:
1. `/Users/wesleywillian/Oficial/Oficial/CLAUDE.md` (projeto)
2. `/Users/wesleywillian/CLAUDE.md` (parent dir)
3. `/Users/wesleywillian/.claude/CLAUDE.md` (global user)

**Conteúdos**: DIFERENTES entre si

**Ação Necessária**:
- Decidir qual versão é a fonte de verdade
- Consolidar em versão única
- Documentar hierarquia (global vs projeto)
- Remover duplicatas

### 2. Spec 004 (inslate-backend) Suspeito de NestJS

Spec com "backend" no nome pode ter referências a NestJS que precisam ser removidas ou atualizadas para API Routes.

### 3. Links Internos Não Validados

Ainda não foi feita validação de links quebrados entre documentos.

---

## Script de Validação Sugerido

Criar script `scripts/audit-docs.sh`:

```bash
#!/bin/bash

# Validar versões em documentação vs package.json
NEXT_VERSION=$(grep '"next"' package.json | cut -d'"' -f4)
REACT_VERSION=$(grep '"react"' package.json | cut -d'"' -f4)
PRISMA_VERSION=$(grep '"prisma"' package.json | cut -d'"' -f4)

# Buscar docs que mencionam versões antigas
echo "Checking for outdated version references..."
grep -r "Next.js 15" docs/ specs/ memory/ *.md 2>/dev/null
grep -r "NestJS" docs/ specs/ memory/ *.md 2>/dev/null
grep -r "Fastify" docs/ specs/ memory/ *.md 2>/dev/null

# Validar links quebrados
echo "Checking for broken internal links..."
find . -name "*.md" -not -path "./node_modules/*" -exec grep -H "\[.*\](.*\.md)" {} \;

echo "Audit complete. Review output above."
```

---

## Timeline Estimado

| Fase | Arquivos | Tempo Estimado |
|------|----------|----------------|
| ✅ Core Docs | 5 | 30 min (concluído) |
| Prioridade 1 | 12 | 1 hora |
| Prioridade 2-3 | 13 | 1 hora |
| Prioridade 4-5 | 11 | 45 min |
| Prioridade 6-7 | 40 | 2 horas |
| Prioridade 8-9 | 20 | 1 hora |
| **Total** | **101** | **~6 horas** |

---

## Checklist de Validação (Por Arquivo)

Ao auditar cada arquivo, verificar:

- [ ] Versões de tecnologias mencionadas estão corretas
- [ ] Não há referências a NestJS/Fastify (exceto em contexto histórico)
- [ ] Estrutura de diretórios reflete `app/` raiz
- [ ] Links internos funcionam
- [ ] Comandos e scripts estão atualizados
- [ ] Exemplos de código usam sintaxe atual
- [ ] Compliance com Spec-Kit (se aplicável)
- [ ] Metadados (data, versão) atualizados

---

**Próxima Ação Recomendada**: Executar auditoria Prioridade 1 (docs técnicos principais)
