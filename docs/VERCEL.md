# Configuração do Vercel

Este documento descreve como configurar e fazer deploy do projeto Wavewell Oficial no Vercel.

## 📋 Pré-requisitos

- Conta no [Vercel](https://vercel.com)
- Projeto criado no Vercel Dashboard: [oficial](https://vercel.com/wesley-codedrs-projects/oficial)
- Repositório Git conectado (GitHub, GitLab ou Bitbucket)

## 🚀 Configuração Inicial

### 1. Conectar Repositório Git

1. Acesse o [Vercel Dashboard](https://vercel.com/wesley-codedrs-projects/oficial)
2. Vá em **Settings > Git**
3. Conecte seu repositório Git
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (raiz do projeto)
   - **Build Command**: `pnpm build` (já configurado no `vercel.json`)
   - **Output Directory**: `.next` (padrão do Next.js)
   - **Install Command**: `pnpm install` (já configurado no `vercel.json`)

### 2. Configurar Variáveis de Ambiente

No Vercel Dashboard, vá em **Settings > Environment Variables** e adicione todas as variáveis necessárias:

#### Variáveis Obrigatórias

```bash
# Database
DATABASE_URL=postgresql://postgres:SENHA@db.xxxxx.supabase.co:5432/postgres?pgbouncer=true&sslmode=require
SHADOW_DATABASE_URL=postgresql://postgres:SENHA@db.xxxxx.supabase.co:5432/postgres?pgbouncer=true&sslmode=require

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# Environment
NODE_ENV=production
```

#### Variáveis do Sentry (Opcional)

Se você quiser configurar o Sentry com variáveis de ambiente:

```bash
SENTRY_DSN=https://893edabca7965e86e06718dbfcba0166@o4510188708691968.ingest.us.sentry.io/4510497457831936
SENTRY_ORG=wellwaveoficial
SENTRY_PROJECT=oficial
```

#### Configuração por Ambiente

- **Production**: Todas as variáveis acima
- **Preview**: Use as mesmas variáveis (ou variáveis de staging se tiver)
- **Development**: Não necessário (use `.env` local)

⚠️ **IMPORTANTE**: 
- Sempre use `?pgbouncer=true&sslmode=require` na `DATABASE_URL` em produção
- Use a connection string de **Connection Pooling** do Supabase, não a direta
- Nunca exponha `SUPABASE_SERVICE_ROLE_KEY` no client-side

### 3. Configurar Build Settings

O arquivo `vercel.json` já está configurado com:

```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["gru1"]
}
```

**Região**: O projeto está configurado para usar `gru1` (São Paulo, Brasil) para melhor latência.

### 4. Configurar Prisma

O Prisma está configurado para gerar o client automaticamente:

- **Build**: O script `build` executa `prisma generate && next build`
- **Postinstall**: O script `postinstall` executa `prisma generate` após instalar dependências

Isso garante que o Prisma Client seja gerado antes do build.

## 🔄 Deploy

### Deploy Automático

O Vercel faz deploy automaticamente quando você:

1. **Push para branch principal** (geralmente `main` ou `master`)
   - Cria deploy de **Production**

2. **Cria Pull Request**
   - Cria deploy de **Preview** com URL única

### Deploy Manual

1. Acesse o [Vercel Dashboard](https://vercel.com/wesley-codedrs-projects/oficial)
2. Clique em **Deployments**
3. Clique em **Redeploy** no deployment desejado

Ou use a CLI do Vercel:

```bash
# Instalar Vercel CLI
pnpm add -g vercel

# Fazer login
vercel login

# Deploy de produção
vercel --prod

# Deploy de preview
vercel
```

## 🗄️ Migrations do Prisma

### Aplicar Migrations em Produção

**Opção 1: Automático (Recomendado)**

Adicione um script de build que aplica migrations:

```json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

⚠️ **Atenção**: Isso pode aumentar o tempo de build. Use apenas se necessário.

**Opção 2: Manual**

Execute migrations manualmente antes do deploy:

```bash
# Localmente, conectado ao banco de produção
DATABASE_URL="postgresql://..." pnpm prisma migrate deploy
```

**Opção 3: Vercel Build Command**

Configure no Vercel Dashboard:
- **Build Command**: `prisma generate && prisma migrate deploy && pnpm build`

## 🔍 Monitoramento

### Sentry

O projeto está configurado com Sentry para monitoramento de erros:

- **DSN**: Configurado em `sentry.server.config.ts` e `sentry.edge.config.ts`
- **Org**: `wellwaveoficial`
- **Project**: `oficial`
- **Tunnel Route**: `/monitoring` (para evitar bloqueio de ad-blockers)

Acesse o [Sentry Dashboard](https://sentry.io) para ver erros e performance.

### Vercel Analytics

O Vercel Analytics está disponível no Dashboard:
- **Analytics**: Métricas de performance
- **Speed Insights**: Core Web Vitals
- **Logs**: Logs de runtime

## 🐛 Troubleshooting

### Erro: "Prisma Client not generated"

**Solução**: 
- Verifique se o script `postinstall` está no `package.json`
- Verifique se `prisma generate` está no script `build`

### Erro: "Connection pool timeout"

**Causa**: Não está usando PgBouncer

**Solução**:
- Certifique-se de que `DATABASE_URL` inclui `?pgbouncer=true&sslmode=require`
- Use a connection string de **Connection Pooling** do Supabase

### Erro: "Module not found: @prisma/client"

**Solução**:
- Verifique se `prisma generate` está sendo executado no build
- Verifique se `@prisma/client` está em `dependencies` (não `devDependencies`)

### Build muito lento

**Soluções**:
- Use `pnpm` (já configurado)
- Configure cache do Vercel
- Considere usar `prisma generate` apenas no `postinstall` e não no `build`

### Erro: "Sentry upload failed"

**Solução**:
- Verifique se as variáveis `SENTRY_ORG` e `SENTRY_PROJECT` estão configuradas
- Verifique se o token do Sentry está configurado no Vercel
- O upload pode falhar silenciosamente em preview builds (normal)

## 📊 Performance

### Otimizações Configuradas

1. **Região**: `gru1` (São Paulo) para melhor latência
2. **Prisma**: Geração automática do client
3. **Next.js**: Otimizações automáticas do framework
4. **Sentry**: Source maps para melhor debugging

### Recomendações

1. **Use Edge Functions** quando possível para melhor performance
2. **Configure ISR** (Incremental Static Regeneration) para páginas estáticas
3. **Use Image Optimization** do Next.js para imagens
4. **Configure CDN** para assets estáticos

## 🔐 Segurança

### Checklist de Segurança

- [ ] Todas as variáveis sensíveis estão no Vercel (não no código)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` não está exposta no client-side
- [ ] `DATABASE_URL` usa SSL (`sslmode=require`)
- [ ] `DATABASE_URL` usa PgBouncer (`pgbouncer=true`)
- [ ] Sentry está configurado para não expor dados sensíveis
- [ ] `.env` não está commitado no Git

## 📚 Recursos

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Prisma on Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Sentry Next.js Guide](https://docs.sentry.io/platforms/javascript/guides/nextjs/)

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs no Vercel Dashboard
2. Verifique os erros no Sentry Dashboard
3. Consulte a documentação acima
4. Abra uma issue no repositório

---

**Última atualização**: Configurado para Next.js 16, React 19, Prisma 7, Sentry 10

