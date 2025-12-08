# GitHub Actions Workflows

Esta pasta contém os workflows do GitHub Actions para CI/CD do projeto.

## 📁 Estrutura

```
.github/
├── workflows/
│   ├── ci.yml              # CI básico (lint, typecheck, build)
│   ├── code-quality.yml    # Verificação de qualidade de código
│   ├── prisma-migrate.yml  # Validação de migrations do Prisma
│   ├── security.yml        # Auditoria de segurança
│   └── release.yml         # Criação de releases
└── README.md               # Este arquivo
```

## 🚀 Workflows

### CI (`ci.yml`)

Validação automática em cada push e PR:
- ESLint
- TypeScript type checking
- Validação do schema Prisma
- Build do Next.js

### Code Quality (`code-quality.yml`)

Verificação de qualidade:
- Formatação de código
- Dependências desatualizadas
- Auditoria de pacotes

### Prisma Migrate (`prisma-migrate.yml`)

Validação de migrations:
- Validação do schema
- Verificação de status das migrations
- Geração do Prisma Client

### Security (`security.yml`)

Segurança:
- Revisão de dependências em PRs
- Auditoria de vulnerabilidades
- Verificação semanal automática

### Release (`release.yml`)

Criação de releases:
- Build de validação
- Criação de release no GitHub
- Suporte a tags e manual

## 📖 Documentação Completa

Veja `docs/GITHUB_ACTIONS.md` para documentação detalhada.

## ⚙️ Configuração

### Secrets Necessários

Configure no GitHub (Settings > Secrets and variables > Actions):

- `DATABASE_URL` - Para build e migrations
- `NEXT_PUBLIC_SUPABASE_URL` - Para build
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Para build

### Branch Protection

Configure branch protection para exigir status checks:

1. Settings > Branches
2. Add rule para `main`/`master`
3. Marque como required:
   - `lint-and-typecheck`
   - `prisma-validate`
   - `build`

## 🔄 Integração

Os workflows trabalham em conjunto com:
- **Vercel**: Deploy automático após merge
- **Sentry**: Monitoramento de erros
- **Prisma**: Validação de schema e migrations

