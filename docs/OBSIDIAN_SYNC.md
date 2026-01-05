# Sincronização com Obsidian - MCP

Este documento descreve a integração entre o projeto WellWave e o Obsidian via MCP (Model Context Protocol).

## 📍 Configuração

### Vault Obsidian
- **Caminho**: `/Users/wesleywillian/Library/Mobile Documents/iCloud~md~obsidian/Documents/CODE/WesleyWillianCode`
- **Pasta do Projeto**: `WellWave/`

### MCP Server
- **Servidor**: `@mauricio.wolff/mcp-obsidian@latest`
- **Configuração**: `.cursor/mcp.json`

## 🗂️ Estrutura no Obsidian

```
WellWave/
├── 00-INDEX.md                          # Índice principal
├── Config-Variaveis.md                  # Sistema de variáveis
├── Sync-Status.md                       # Status de sincronização
├── 01-Flash-Anamnesis/
│   ├── INDEX.md                         # Índice Flash
│   ├── Flash-IVAS.md                    # Template IVAS
│   ├── Flash-Faringoamigdalite.md       # Template Faringite
│   └── [15+ templates futuros]
├── 02-Anamnese-Completa/
│   ├── INDEX.md                         # Índice Anamnese
│   ├── CV-Cardiovascular.md             # Sistema CV (4 queixas)
│   └── [20 sistemas restantes]
├── 03-Referencias-MBE/
│   ├── INDEX.md                         # Índice Referências
│   └── [50+ referências por queixa]
├── Protocolos/                          # Já existentes
│   ├── PROTO_SEPSE.md
│   ├── PROTO_AVC.md
│   ├── PROTO_IC.md
│   └── PROTO_TEP.md
└── Queixas/                             # Já existentes
    └── CV - Cardiovascular/
        ├── CV_CHEST_PAIN_TYPICAL.md
        └── CV_CHEST_PAIN_ATYPICAL.md
```

## 🔗 Mapeamento de Arquivos

| Arquivo Fonte | Obsidian Destino | Descrição |
|---------------|------------------|-----------|
| `lib/data/flashTemplates.ts` | `01-Flash-Anamnesis/*.md` | Templates Flash |
| `lib/data/complaintsData.ts` | `02-Anamnese-Completa/*.md` | Queixas por sistema |
| `queixas_principais.md` | `00-INDEX.md` | Documentação geral |
| `specs/flash-anamnesis/` | `01-Flash-Anamnesis/INDEX.md` | Especificações |

## 📊 Status Atual (2025-12-25)

### ✅ Criado
- [x] Estrutura de pastas
- [x] Índice principal
- [x] Sistema de variáveis documentado
- [x] 2 templates Flash (IVAS, Faringoamigdalite)
- [x] 1 sistema completo (CV - 4 queixas)
- [x] Índice de referências MBE
- [x] Conexão com protocolos existentes

### 📋 Pendente
- [ ] 13 templates Flash restantes
- [ ] 20 sistemas de anamnese completa
- [ ] 50+ referências MBE detalhadas
- [ ] Integração bidirecional (Obsidian → Projeto)

## 🎯 Objetivos

### Para Desenvolvedores
1. **Manter sincronizado**: Obsidian reflete o código TypeScript
2. **Documentar referências**: Guidelines MBE para cada template
3. **Validar CID-10**: Códigos corretos e atualizados
4. **Testar templates**: Verificar substituição de variáveis

### Para Clínicos
1. **Consultar rapidamente**: Obsidian como knowledge base
2. **Buscar referências**: Links diretos para guidelines
3. **Validar condutas**: Verificar MBE para cada queixa
4. **Copiar templates**: Prontuários prontos para uso

## 🔄 Workflow de Sincronização

### 1. Adicionar Novo Template Flash

#### No Código (`lib/data/flashTemplates.ts`)
```typescript
export const flashTemplates: Record<string, FlashTemplate> = {
  // ... templates existentes
  
  novo_template: {
    id: 'novo_template',
    nome: 'Nome do Template',
    categoria: 'respiratorio',
    template: {
      queixa_principal: '...',
      exame_fisico: '...',
      hipotese_diagnostica: ['...'],
      conduta: '...',
      cid: 'J00.0',
      cid_descricao: '...',
    },
    referencias_mbe: ['...'],
  },
}
```

#### No Obsidian
1. Criar `WellWave/01-Flash-Anamnesis/Flash-NovoTemplate.md`
2. Usar estrutura padrão (ver Flash-IVAS.md)
3. Adicionar referências em `03-Referencias-MBE/`
4. Atualizar `Sync-Status.md`

### 2. Adicionar Novo Sistema de Anamnese

#### No Código (`lib/data/complaintsData.ts`)
```typescript
complaints: [
  {
    id: 'SYSTEM_COMPLAINT_ID',
    group: 'SYSTEM',
    title: 'Título da Queixa',
    // ...
  }
]
```

#### No Obsidian
1. Criar `WellWave/02-Anamnese-Completa/SYSTEM-Nome.md`
2. Documentar todas as queixas do grupo
3. Adicionar red flags, diagnósticos diferenciais
4. Linkar com templates Flash relacionados

## 🧭 Guia de Sincronização (Obsidian ↔ Código)

### Comandos Principais

| Comando | Descrição |
| --- | --- |
| `pnpm run sync:watch` | Sincronização automática (recomendado) |
| `pnpm run sync:pull` | Obsidian → TypeScript (manual) |
| `pnpm run sync:push` | TypeScript → Obsidian (manual) |
| `pnpm run sync:validate` | Valida dados (campos obrigatórios, CID-10, grupos) |

### Estrutura de Queixa (Frontmatter)

Campos sincronizados com `lib/data/complaintsData.ts`:

```yaml
---
id: CV_CHEST_PAIN_TYPICAL
tags: [wellwave, queixa, CV, high]
grupo: CV
risco: high
severidade: 5
icd10: ["I20.0", "I21.9"]
aliases: [iam, infarto, angina]
searchTerms: [dor no peito em aperto, aperto no peito]
chips: [dor no peito, aperto no peito]
ageTargets: [adult, elderly]
isTopForAdult: true
isTopForChild: false
isFastTrack: false
searchWeight: 1.8
bodySystem: [cardiovascular, coronário]
relatedSymptoms: [sudorese, náusea, dispneia]
commonMisconceptions: [ataque cardíaco, parada cardíaca]
lastSync: "2025-12-25T00:00:00Z"
---
```

O conteúdo markdown da nota é preservado no campo `extendedContent` durante o sync.

### Resolução de Conflitos

1. Nota mais recente no Obsidian → prevalece no `pull`
2. Arquivo TypeScript mais recente → prevalece no `push`
3. `lastSync` é atualizado a cada sincronização

## 🛠️ Ferramentas MCP Disponíveis

### Leitura
- `mcp_obsidian_read_multiple_notes` - Ler múltiplas notas
- `mcp_obsidian_search_notes` - Buscar notas
- `mcp_obsidian_get_notes_info` - Metadata de notas

### Escrita
- `mcp_obsidian-mcp-_show_file_in_obsidian` - Abrir arquivo
- `mcp_obsidian-mcp-_update_active_file` - Atualizar conteúdo
- `mcp_obsidian_patch_note` - Edição parcial

### Utilitários
- `mcp_obsidian_update_frontmatter` - Metadados YAML
- `mcp_obsidian-mcp-_patch_vault_file` - Patch relativo

## 📝 Padrões de Nomenclatura

### Arquivos Flash
- Formato: `Flash-NomeTemplate.md`
- Exemplo: `Flash-IVAS.md`, `Flash-Pneumonia.md`

### Arquivos Anamnese
- Formato: `CODIGO-NomeSistema.md`
- Exemplo: `CV-Cardiovascular.md`, `RC-Respiracao.md`

### Referências MBE
- Formato: `NomeQueixa-Referencias.md`
- Exemplo: `IVAS-Referencias.md`, `SCA-Referencias.md`

## 🔍 Busca e Navegação

### Tags Recomendadas
```yaml
#flash-template
#anamnese-completa
#protocolo
#referencia-mbe
#alto-risco
#fast-track
```

### Links Internos
Use sempre links relativos:
- `[[01-Flash-Anamnesis/Flash-IVAS|IVAS]]`
- `[[../02-Anamnese-Completa/CV-Cardiovascular|Sistema CV]]`

## 📈 Métricas de Progresso

| Categoria | Atual | Meta | % |
|-----------|-------|------|---|
| Flash Templates | 2 | 15 | 13% |
| Sistemas Anamnese | 1 | 21 | 5% |
| Protocolos | 4 | 4 | 100% |
| Referências MBE | 1 | 50+ | 2% |
| **Total Arquivos** | **8** | **100+** | **8%** |

## 🚀 Comandos Úteis

### Verificar Estrutura
```bash
# Ver arquivos do projeto
ls -la lib/data/

# Ver estrutura Obsidian (via MCP)
mcp_obsidian_search_notes --query "WellWave"
```

### Criar Novo Template
```typescript
// 1. Adicionar em flashTemplates.ts
// 2. Testar no app
// 3. Sincronizar com Obsidian
// 4. Documentar referências
```

## 🔗 Links Úteis

- **Projeto**: `/Users/wesleywillian/Oficial/Oficial`
- **Vault**: `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/CODE/WesleyWillianCode`
- **Índice Obsidian**: `obsidian://open?vault=WesleyWillianCode&file=WellWave/00-INDEX`

## 📞 Suporte

Em caso de problemas:
1. Verificar `Sync-Status.md` no Obsidian
2. Validar MCP em `.cursor/mcp.json`
3. Testar conexão: `pnpm dlx @mauricio.wolff/mcp-obsidian@latest --help`

---

**Última atualização**: 2025-12-25
**Status**: ✅ Sincronizado e operacional
