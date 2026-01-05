# Troubleshooting - Extensão GitLab no Cursor

> **Versão**: 1.1
> **Última Atualização**: Janeiro 2026
> **Tempo Estimado de Resolução**: 5-10 minutos

## Visão Geral do Problema

A extensão GitLab no Cursor utiliza autenticação OAuth para acessar repositórios e funcionalidades do GitLab. Quando ocorrem problemas de autenticação, você pode ver erros como:

- `Token is invalid or expired`
- `Token is invalid. No token provided`
- `invalid_grant: The provided authorization grant is invalid, expired, revoked...`
- `Request to refresh token failed, because it's revoked or already refreshed`

### Quando Esses Erros Ocorrem

Esses erros geralmente acontecem quando:

1. **Token foi revogado**: Você revogou o acesso da aplicação OAuth no GitLab
2. **Token expirou**: O token de refresh expirou e não pode ser renovado automaticamente
3. **Token já foi atualizado**: Múltiplas tentativas de refresh simultâneas causaram conflito
4. **Aplicação OAuth foi modificada**: As configurações da aplicação OAuth no GitLab mudaram
5. **Mudança de senha**: Você alterou a senha da conta GitLab

### Impacto no Workflow

Quando a autenticação falha, você pode perder acesso a:

- Sincronização de repositórios GitLab
- Funcionalidades de merge requests e issues
- Integração com CI/CD do GitLab
- Comandos Git que dependem de autenticação

## Diagnóstico

### Identificando o Problema nos Logs

Os logs do Cursor mostram erros de autenticação no formato:

```
[warning]: [auth] Token validation failed in Language Server: (Token is invalid. Token is invalid or expired.. Reason: invalid_token)
[error]: [TokenRefreshService][auth] Failed to refresh token for account https://gitlab.com|25244549:
  {
    "message": "Request to refresh token failed, because it's revoked or already refreshed.",
    "response": {
      "status": 400,
      "body": "{\"error\":\"invalid_grant\",\"error_description\":\"The provided authorization grant is invalid...\"}"
    }
  }
```

### Sinais de que a Autenticação Precisa ser Renovada

- Logs repetidos de falha de validação de token
- Mensagens de "circuit breaker is open" nos logs
- Funcionalidades do GitLab não funcionando no Cursor
- Prompts de autenticação aparecendo repetidamente

### Verificação do Status da Conta GitLab no Cursor

1. Abra o Cursor
2. Vá em **Settings** (ou **Preferences** no macOS: `Cmd + ,`)
3. Procure por **Accounts** ou **GitLab**
4. Verifique se sua conta GitLab está listada e com status válido

## Soluções Passo-a-Passo

### Solução 1: Reautenticação Simples

A forma mais rápida de resolver é reautenticar sua conta GitLab.

#### Via Command Palette

1. Abra o Command Palette:
   - **macOS**: `Cmd + Shift + P`
   - **Windows/Linux**: `Ctrl + Shift + P`

2. Digite: `GitLab: Sign In` ou `GitLab: Reauthenticate`

3. Siga o fluxo OAuth no navegador:
   - Você será redirecionado para o GitLab
   - Autorize o Cursor a acessar sua conta
   - Você será redirecionado de volta ao Cursor

#### Via Settings/Preferences

1. Abra **Settings** (`Cmd/Ctrl + ,`)

2. Procure por **Accounts** ou **GitLab** na barra de busca

3. Encontre sua conta GitLab e clique em **Reauthenticate** ou **Sign Out** e depois **Sign In**

4. Siga o fluxo OAuth no navegador

### Solução 2: Reconexão Completa

Se a reautenticação simples não funcionar, faça uma reconexão completa.

#### Passo 1: Remover Conta GitLab Existente

1. Abra **Settings** (`Cmd/Ctrl + ,`)

2. Vá em **Accounts** ou procure por **GitLab**

3. Encontre sua conta GitLab e clique em **Remove Account** ou **Sign Out**

4. Confirme a remoção

#### Passo 2: Limpar Cache (Opcional)

Se o problema persistir, limpe o cache do Cursor:

**macOS:**
```bash
rm -rf ~/Library/Application\ Support/Cursor/User/globalStorage/gitlab.*
```

**Windows:**
```powershell
Remove-Item -Recurse -Force "$env:APPDATA\Cursor\User\globalStorage\gitlab.*"
```

**Linux:**
```bash
rm -rf ~/.config/Cursor/User/globalStorage/gitlab.*
```

#### Passo 3: Adicionar Nova Conexão

1. No Cursor, abra o Command Palette (`Cmd/Ctrl + Shift + P`)

2. Digite: `GitLab: Sign In`

3. Siga o fluxo OAuth:
   - Escolha sua instância GitLab (gitlab.com ou self-hosted)
   - Autorize o Cursor
   - Aguarde o redirecionamento

#### Passo 4: Verificar Permissões OAuth

Após reconectar, verifique se as permissões estão corretas:

1. Acesse [GitLab Settings > Applications](https://gitlab.com/-/profile/applications)

2. Encontre a aplicação "Cursor" ou similar

3. Verifique os **Scopes**:
   - `api` - Acesso completo à API
   - `read_user` - Ler informações do usuário
   - `read_repository` - Ler repositórios
   - `write_repository` - Escrever em repositórios (se necessário)

### Solução 3: Verificação de Aplicação OAuth no GitLab

Se as soluções anteriores não funcionarem, verifique a aplicação OAuth diretamente no GitLab.

#### Verificar Aplicação OAuth

1. Acesse [GitLab Settings > Applications](https://gitlab.com/-/profile/applications)

2. Procure pela aplicação do Cursor

3. Verifique:
   - **Status**: Deve estar ativa
   - **Scopes**: Devem incluir as permissões necessárias
   - **Redirect URI**: Deve corresponder ao esperado pelo Cursor

#### Verificar Redirect URIs

O redirect URI deve ser algo como:
- `vscode://` ou `cursor://` para desktop
- `http://localhost:PORT` para web (se aplicável)

**Importante**: Se você modificou a aplicação OAuth no GitLab, pode ser necessário recriá-la.

#### Recriar Aplicação OAuth (Último Recurso)

1. Acesse [GitLab Settings > Applications](https://gitlab.com/-/profile/applications)

2. **Delete** a aplicação Cursor existente (se houver)

3. **Add new application**:
   - **Name**: `Cursor` ou `Cursor IDE`
   - **Redirect URI**: Deixe em branco ou use `vscode://` (o Cursor geralmente gerencia isso)
   - **Scopes**: Selecione:
     - `api`
     - `read_user`
     - `read_repository`
     - `write_repository` (se necessário)

4. Clique em **Save application**

5. **Não copie** o Client ID e Secret manualmente - deixe o Cursor fazer isso via OAuth flow

6. No Cursor, faça **Sign In** novamente seguindo a Solução 2

## Segurança de Tokens

### ⚠️ IMPORTANTE: Nunca Compartilhe Tokens

**Tokens de acesso (OAuth ou Personal Access Tokens) são informações sensíveis e nunca devem ser:**

- Compartilhados em conversas, mensagens ou emails
- Commitados em repositórios Git
- Armazenados em logs públicos
- Expostos em screenshots ou documentação pública

### Se Você Compartilhou um Token Acidentalmente

**Ação imediata necessária:**

1. **Revogue o token imediatamente**:
   - **OAuth**: [GitLab Settings > Applications](https://gitlab.com/-/profile/applications) → Revoke
   - **Personal Access Token**: [GitLab Settings > Access Tokens](https://gitlab.com/-/profile/personal_access_tokens) → Revoke

2. **Crie um novo token** seguindo as instruções abaixo

3. **Verifique logs de acesso** no GitLab para atividade suspeita

4. **Se o token tinha permissões amplas**, considere revisar:
   - Repositórios acessados
   - Alterações recentes
   - Configurações de CI/CD

### Personal Access Tokens vs OAuth

O Cursor geralmente usa **OAuth** (fluxo interativo), mas em alguns casos pode usar **Personal Access Tokens (PATs)**:

- **OAuth** (recomendado): Fluxo seguro, tokens gerenciados automaticamente
- **PATs**: Tokens manuais, mais controle, mas requer gerenciamento manual

**Se você precisa usar um PAT:**

1. Crie em: [GitLab Settings > Access Tokens](https://gitlab.com/-/profile/personal_access_tokens)
2. Configure:
   - **Name**: `Cursor IDE - [Data]`
   - **Expiration date**: Defina uma data (não deixe sem expiração)
   - **Scopes**: Apenas o necessário (`api`, `read_repository`, `write_repository`)
3. **Copie imediatamente** (só aparece uma vez)
4. **Configure no Cursor** via Settings (se suportado) ou use OAuth flow

## Prevenção

### Boas Práticas para Evitar Problemas Futuros

1. **Não revogue tokens desnecessariamente**
   - Evite revogar acessos OAuth no GitLab a menos que seja necessário por segurança

2. **Mantenha o Cursor atualizado**
   - Atualizações podem incluir correções de autenticação
   - Verifique atualizações em **Help > Check for Updates**

3. **Use uma conta GitLab dedicada para desenvolvimento** (opcional)
   - Reduz risco de revogação acidental
   - Facilita gerenciamento de permissões

4. **Evite múltiplas instâncias do Cursor**
   - Múltiplas instâncias podem causar conflitos de refresh de token
   - Feche outras instâncias antes de autenticar

5. **Nunca compartilhe tokens**
   - Tokens são como senhas - mantenha-os privados
   - Use variáveis de ambiente para desenvolvimento local
   - Revogue imediatamente se expostos

### Quando Fazer Refresh Manual

Faça refresh manual quando:

- Você alterou a senha do GitLab
- Você revogou e readicionou a aplicação OAuth
- Você está vendo erros intermitentes de autenticação
- Você mudou de rede/VPN e há problemas de conectividade

### Monitoramento de Tokens

Os tokens OAuth do GitLab geralmente:

- **Access tokens**: Expiração curta (1 hora)
- **Refresh tokens**: Expiração longa (30-90 dias)

O Cursor gerencia o refresh automaticamente, mas se você ver erros frequentes, pode ser sinal de:

- Problema de conectividade
- Token de refresh próximo do vencimento
- Conflito com outra aplicação usando o mesmo token

## Problemas Comuns e Soluções

### FAQ

#### Q: Os erros continuam aparecendo mesmo após reautenticar

**A**: Tente:
1. Reiniciar o Cursor completamente
2. Limpar o cache (veja Solução 2)
3. Verificar se há múltiplas contas GitLab configuradas
4. Verificar logs do Cursor para erros adicionais

#### Q: O fluxo OAuth não redireciona de volta ao Cursor

**A**: 
1. Verifique se o Cursor está rodando
2. Tente copiar o código de autorização manualmente (se fornecido)
3. Verifique se o redirect URI na aplicação OAuth está correto
4. Tente usar o fluxo em um navegador diferente

#### Q: "Circuit breaker is open" nos logs

**A**: Isso significa que o Cursor detectou muitas falhas e pausou tentativas de refresh:
1. Aguarde alguns minutos
2. Faça reautenticação manual (Solução 1)
3. Se persistir, faça reconexão completa (Solução 2)

#### Q: Funcionalidades do GitLab não funcionam mesmo após autenticar

**A**: Verifique:
1. Se os scopes OAuth incluem as permissões necessárias
2. Se você tem permissões no repositório GitLab específico
3. Se a instância GitLab está acessível (não é problema de rede)
4. Logs do Cursor para erros específicos

#### Q: Como verificar se a autenticação está funcionando?

**A**: 
1. Tente usar uma funcionalidade GitLab no Cursor (ex: ver issues)
2. Verifique os logs do Cursor (Help > Toggle Developer Tools > Console)
3. Procure por mensagens de sucesso de autenticação
4. Verifique em Settings > Accounts se a conta mostra status válido

#### Q: Posso usar múltiplas contas GitLab?

**A**: Sim, o Cursor suporta múltiplas contas. Certifique-se de:
1. Cada conta tenha uma aplicação OAuth separada (ou use a mesma)
2. Não haja conflitos de permissões
3. Você selecione a conta correta ao usar funcionalidades GitLab

### Soluções Rápidas por Caso Específico

#### Caso 1: Erro após mudança de senha GitLab

```bash
# 1. Sign Out da conta GitLab no Cursor
# 2. Sign In novamente
# 3. Autorize novamente no fluxo OAuth
```

#### Caso 2: Erro após revogar aplicação OAuth

```bash
# 1. Recrie a aplicação OAuth no GitLab (Solução 3)
# 2. Faça reconexão completa (Solução 2)
```

#### Caso 3: Erros intermitentes

```bash
# 1. Verifique conectividade de rede
# 2. Reinicie o Cursor
# 3. Se persistir, limpe cache e reconecte
```

#### Caso 4: Erro em GitLab self-hosted

```bash
# 1. Verifique se a URL do GitLab está correta
# 2. Verifique certificados SSL (se usando HTTPS)
# 3. Verifique se o GitLab permite OAuth de aplicações externas
# 4. Configure redirect URI correto na aplicação OAuth
```

## Recursos Adicionais

- [GitLab OAuth Documentation](https://docs.gitlab.com/ee/api/oauth2.html)
- [Cursor Documentation](https://cursor.sh/docs)
- [GitLab Applications Settings](https://gitlab.com/-/profile/applications)

## Suporte

Se nenhuma das soluções acima resolver o problema:

1. **Verifique os logs completos do Cursor**:
   - Help > Toggle Developer Tools > Console
   - Procure por erros relacionados a `gitlab`, `auth`, `token`

2. **Reporte o problema**:
   - Inclua logs relevantes
   - Descreva os passos que tentou
   - Informe versão do Cursor e sistema operacional

3. **Alternativas temporárias**:
   - Use Git via linha de comando enquanto o problema é resolvido
   - Use GitLab web interface para funcionalidades críticas

---

**Próximo**: [Getting Started](./getting-started.md) | [Coding Standards](./coding-standards.md)

