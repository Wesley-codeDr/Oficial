# Configuração GitLab - WellWave Oficial

> **Versão**: 1.0
> **Última Atualização**: Janeiro 2026
> **Tempo Estimado**: 10-15 minutos

## 📋 Visão Geral

Este projeto está configurado para sincronizar código entre **GitHub** (repositório principal) e **GitLab** (mirror). Isso permite:

- **Backup automático** do código em múltiplas plataformas
- **CI/CD no GitLab** (pipelines, runners)
- **Colaboração** com equipes que preferem GitLab
- **Flexibilidade** para usar funcionalidades específicas de cada plataforma

## 🔧 Configuração Inicial

### 1. Remotes Configurados

O projeto possui 3 remotes Git:

```bash
# GitHub - Repositório principal
origin: https://github.com/Wesley-codeDr/Oficial.git

# GitLab - Mirror/backup
gitlab: https://gitlab.com/Wesley-codeDr/oficial.git

# GitHub - Frontend original (legado)
frontend: https://github.com/Wesley-codeDr/Oficial-frontend-.git
```

Para verificar:
```bash
git remote -v
```

### 2. Autenticação GitLab no Cursor

#### Opção A: OAuth (Recomendado)

1. Abra o **Command Palette** no Cursor:
   - **macOS**: `Cmd + Shift + P`
   - **Windows/Linux**: `Ctrl + Shift + P`

2. Digite: `GitLab: Sign In`

3. Siga o fluxo OAuth no navegador:
   - Autorize o Cursor a acessar sua conta GitLab
   - Aguarde o redirecionamento automático

4. Verifique a autenticação:
   - Settings → Accounts → GitLab
   - Deve mostrar sua conta conectada

#### Opção B: Personal Access Token (PAT)

Se OAuth não funcionar, use um Personal Access Token:

1. Acesse: [GitLab Settings > Access Tokens](https://gitlab.com/-/profile/personal_access_tokens)

2. Crie um novo token:
   - **Name**: `Cursor IDE - WellWave`
   - **Expiration**: 90 dias (ou conforme política da empresa)
   - **Scopes**:
     - ✅ `api` - Acesso completo à API
     - ✅ `read_repository` - Ler repositórios
     - ✅ `write_repository` - Escrever em repositórios

3. Copie o token (aparece apenas uma vez!)

4. Configure no Git:
   ```bash
   # Armazena credenciais de forma segura
   git config --global credential.helper store

   # Primeiro push vai solicitar credenciais
   # Username: seu-usuario-gitlab
   # Password: cole-o-token-aqui
   ```

⚠️ **IMPORTANTE**: Nunca compartilhe ou commite tokens de acesso!

### 3. Verificar Conectividade

Teste se a autenticação está funcionando:

```bash
# Fetch do GitLab
git fetch gitlab

# Se funcionar sem erro, está configurado corretamente!
```

## 🚀 Sincronização de Código

### Método 1: Script Automatizado (Recomendado)

Use o script de sincronização interativo:

```bash
./scripts/sync-gitlab.sh
```

**Opções disponíveis:**

1. **Push para ambos** - Envia código para GitHub + GitLab
2. **Pull + Push** - Atualiza do GitHub, envia para GitLab
3. **Apenas GitLab** - Push somente para GitLab
4. **Fetch all** - Atualiza informações de todos os remotes

### Método 2: Comandos Manuais

#### Sincronizar branch atual para ambos

```bash
# Commit suas alterações
git add .
git commit -m "feat: sua mensagem"

# Push para GitHub (principal)
git push origin main

# Push para GitLab (mirror)
git push gitlab main
```

#### Sincronizar todas as branches

```bash
# Push de todas as branches para GitLab
git push --all gitlab

# Push de todas as tags também
git push --tags gitlab
```

#### Atualizar do GitHub e enviar para GitLab

```bash
# Pull do GitHub
git pull origin main

# Push para GitLab
git push gitlab main
```

### Método 3: Aliases Git (Opcional)

Crie aliases para comandos frequentes:

```bash
# Adicionar aliases
git config --global alias.sync-all '!git push origin && git push gitlab'
git config --global alias.sync-gitlab 'push gitlab'

# Usar
git sync-all        # Push para ambos
git sync-gitlab     # Push apenas GitLab
```

## 🔄 Workflows Comuns

### Workflow Diário

1. **Início do dia**: Atualizar do GitHub
   ```bash
   git pull origin main
   ```

2. **Durante desenvolvimento**: Commits normais
   ```bash
   git add .
   git commit -m "feat: nova funcionalidade"
   ```

3. **Fim do dia**: Sincronizar com ambos
   ```bash
   ./scripts/sync-gitlab.sh  # Opção 1: Push para ambos
   ```

### Workflow de Feature Branch

1. **Criar branch**
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```

2. **Desenvolver e commitar**
   ```bash
   git add .
   git commit -m "feat: implementação inicial"
   ```

3. **Push para ambos os remotes**
   ```bash
   git push origin feature/nova-funcionalidade
   git push gitlab feature/nova-funcionalidade
   ```

4. **Após merge**: Sincronizar main
   ```bash
   git checkout main
   git pull origin main
   git push gitlab main
   ```

### Workflow de Emergência

Se você precisa **apenas** do GitLab temporariamente:

```bash
# Mudar origin temporariamente
git remote set-url origin https://gitlab.com/Wesley-codeDr/oficial.git

# Quando voltar ao normal
git remote set-url origin https://github.com/Wesley-codeDr/Oficial.git
```

## 🛠️ Configurações Avançadas

### GitLab CI/CD (Planejado)

Criar `.gitlab-ci.yml` para pipelines:

```yaml
# .gitlab-ci.yml (exemplo básico)
stages:
  - test
  - build
  - deploy

test:
  stage: test
  script:
    - npm install
    - npm run type-check
    - npm run lint
    - npm run test:e2e

build:
  stage: build
  script:
    - npm run build
  artifacts:
    paths:
      - .next/

deploy:
  stage: deploy
  script:
    - echo "Deploy logic here"
  only:
    - main
```

### Sincronização Automática com Hooks

Criar hook para push automático:

```bash
# .git/hooks/post-commit
#!/bin/bash
# Auto-push para GitLab após cada commit

git push gitlab $(git rev-parse --abbrev-ref HEAD) &
```

Tornar executável:
```bash
chmod +x .git/hooks/post-commit
```

⚠️ **Cuidado**: Pode causar lentidão se commits forem frequentes.

### Configurar GitLab como Upstream

Para contribuições upstream:

```bash
git remote add upstream https://gitlab.com/wellwave/oficial.git
git fetch upstream
```

## 🐛 Troubleshooting

### Problema: Erro de autenticação ao fazer push

**Solução**:
1. Verifique se está autenticado no Cursor (Settings → Accounts)
2. Tente reautenticar: Command Palette → `GitLab: Sign In`
3. Se usar PAT, verifique se não expirou
4. Consulte: [docs/development/gitlab-cursor-troubleshooting.md](./gitlab-cursor-troubleshooting.md)

### Problema: Divergências entre GitHub e GitLab

**Solução**:
```bash
# Forçar GitLab a ficar igual ao GitHub
git push gitlab main --force

# ⚠️ CUIDADO: Isso sobrescreve histórico no GitLab!
```

### Problema: Push para GitLab muito lento

**Possíveis causas**:
- Conexão de rede lenta
- Repositório muito grande
- Compressão de objetos Git

**Solução**:
```bash
# Aumentar buffer de rede
git config --global http.postBuffer 524288000  # 500MB

# Comprimir menos (mais rápido, mais tráfego)
git config --global core.compression 0
```

### Problema: Conflito de branches

**Solução**:
```bash
# Pull do GitHub com rebase
git pull origin main --rebase

# Resolver conflitos manualmente
git add .
git rebase --continue

# Push para ambos
git push origin main
git push gitlab main
```

## 📊 Monitoramento

### Verificar status de sincronização

```bash
# Ver diferenças entre remotes
git log origin/main..gitlab/main  # Commits no GitHub não no GitLab
git log gitlab/main..origin/main  # Commits no GitLab não no GitHub

# Ver todos os branches remotos
git branch -r
```

### Verificar último push

```bash
# Ver histórico de pushes
git reflog --date=iso
```

## 🔐 Segurança

### Boas Práticas

1. **Nunca commite tokens ou senhas**
   - Use `.env.local` (já no `.gitignore`)
   - Use variáveis de ambiente no CI/CD

2. **Revogue tokens antigos**
   - Acesse: [GitLab Access Tokens](https://gitlab.com/-/profile/personal_access_tokens)
   - Revogue tokens não utilizados

3. **Use tokens com escopo mínimo**
   - Apenas permissões necessárias
   - Defina data de expiração

4. **Rotação de tokens**
   - Renovar tokens a cada 90 dias (ou conforme política)
   - Documentar quando foram criados

### Em caso de exposição de token

**Ação imediata**:
1. Revogue o token em: [GitLab Access Tokens](https://gitlab.com/-/profile/personal_access_tokens)
2. Crie um novo token
3. Atualize configuração local
4. Verifique logs de acesso no GitLab

## 📚 Recursos Adicionais

- [Documentação GitLab OAuth](https://docs.gitlab.com/ee/api/oauth2.html)
- [Git Remote Documentation](https://git-scm.com/docs/git-remote)
- [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)
- [Troubleshooting Cursor-GitLab](./gitlab-cursor-troubleshooting.md)

## 📞 Suporte

### Logs úteis para debug

```bash
# Ver configuração Git completa
git config --list

# Ver histórico detalhado
git log --graph --oneline --all

# Ver status de todos os remotes
git remote show origin
git remote show gitlab
```

### Comandos de diagnóstico

```bash
# Testar conectividade
git ls-remote gitlab

# Ver configuração de remote
git remote -v

# Ver branches rastreadas
git branch -vv
```

---

**Próximo**: [CI/CD Configuration](./ci-cd-setup.md) | [Development Workflow](./development-workflow.md)

**Voltar**: [Getting Started](./getting-started.md) | [README](./.cursor/README.md)
