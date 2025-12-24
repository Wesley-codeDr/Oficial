# Primeiros Passos

Guia rapido para rodar o WellWave localmente.

## Requisitos

- Node.js 18+
- pnpm
- Docker (para banco local)

## Setup basico

```bash
# 1) Verificar prerequisitos
./scripts/check-prerequisites.sh

# 2) Instalar dependencias
pnpm install

# 3) Configurar .env (escolha local ou Supabase)
./scripts/setup-database.sh

# 4) Subir banco local (se aplicavel)
./scripts/docker-db.sh start

# 5) Gerar Prisma e rodar migrations (se aplicavel)
pnpm db:generate
pnpm db:migrate

# 6) Rodar app
pnpm dev
```

## Variaveis de ambiente

- Modelo base: `env.template`
- Arquivo local: `.env`

## Scripts uteis

- `pnpm lint` / `pnpm lint:fix`
- `pnpm typecheck`
- `pnpm test` / `pnpm test:e2e`
