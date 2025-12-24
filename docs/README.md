# Documentação WellWave

Base de conhecimento para produto, arquitetura, especificações e operação da plataforma WellWave.

## Índice rápido

### Estratégia e produto
- [Estratégia de Digitalização](ESTRATEGIA_DIGITALIZACAO.md)
- [PRD](PRD.md)
- [Roadmap](ROADMAP.md)

### Especificações
- [Spec-Kit: visão e processo](SPEC_KIT_IMPLEMENTATION.md)
- [Índice de specs](../specs/README.md)
- [Templates de especificação](../specs/templates/)

### Arquitetura e dados
- [Visão geral do sistema](architecture/system-overview.md)
- [Arquitetura detalhada](ARCHITECTURE.md)
- [Data flow](architecture/data-flow.md)
- [Security](architecture/security.md)
- [Performance](architecture/performance.md)
- [Scalability](architecture/scalability.md)
- [Database](DATABASE.md)

### APIs e integrações
- [Documentação de API](api/README.md)
- [OpenAPI (MVP)](../specs/1-wellwave-mvp/contracts/openapi.yaml)

### Deploy, operações e suporte
- [GitHub Actions](deployment/github-actions-setup.md)
- [Vercel](VERCEL.md)
- [Rollback](ROLLBACK.md)
- [Troubleshooting](TROUBLESHOOTING.md)
- [Operações](operations/README.md)

### Business
- [Product vision](business/product-vision.md)
- [Market analysis](business/market-analysis.md)
- [Competitive analysis](business/competitive-analysis.md)
- [Roadmap](business/roadmap.md)

### Desenvolvimento
- [Primeiros passos](development/getting-started.md)
- [Coding standards](development/coding-standards.md)
- [Testing](development/testing.md)
- [Scripts de validacao](development/scripts-validation.md)

## Destaques do produto

### Redesenho de Anamnese (Apple HIG iOS17)
- Especificação: [specs/wellwave-platform/anamnese-apple-hig.md](../specs/wellwave-platform/anamnese-apple-hig.md)
- Página: [app/anamnese/page.tsx](../app/anamnese/page.tsx)
- Tokens: [lib/design/tokens.ts](../lib/design/tokens.ts)

## Como contribuir com documentação

1. Use os templates em `specs/templates/`
2. Valide localmente com `./scripts/validate-specs.sh`
3. Atualize o índice de specs ao criar novas specs

## Scripts úteis

```bash
# Validar especificações e links
./scripts/validate-specs.sh

# Verificar pré-requisitos do ambiente
./scripts/check-prerequisites.sh

# Configurar banco local
./scripts/setup-database.sh

# Criar plano básico para nova spec
./scripts/setup-plan.sh
```

## 📝 Licença

Esta documentação segue a mesma licença do projeto WellWave. Consulte o arquivo LICENSE para mais informações.

---

**Última Atualização**: 2024-12-23  
**Versão da Documentação**: 1.0.0  
**Mantido por**: Equipe WellWave
