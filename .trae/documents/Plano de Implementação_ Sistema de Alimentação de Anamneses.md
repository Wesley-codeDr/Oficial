# Plano de Implementação: Sistema de Alimentação de Anamneses (Apple Glass Style)

Este plano detalha a implementação de um sistema para importar documentos médicos, processá-los com IA e gerar templates de anamnese estruturados, mantendo a identidade visual "Apple Glass" do projeto.

## 1. Arquitetura de Dados (Prisma Schema)

Precisamos estender o banco de dados para suportar o fluxo de importação e curadoria de conteúdo antes de ele virar um template oficial (`Syndrome`).

### Novos Modelos

- **`SourceDocument`**: Armazena metadados dos arquivos importados (PDF, TXT, URL).
- **`ContentExtraction`**: Armazena o resultado bruto e processado da extração de IA.
- **`DraftSyndrome`**: Uma versão de rascunho da `Syndrome` que permite edição antes de publicar.

### Alterações Propostas

```prisma
model SourceDocument {
  id          String   @id @default(uuid())
  title       String
  type        String   // "PDF", "TXT", "URL"
  url         String?  // Caminho do arquivo ou URL externa
  content     String   @db.Text // Texto extraído bruto
  status      String   // "PENDING", "PROCESSED", "ERROR"
  createdAt   DateTime @default(now())
}

model ContentExtraction {
  id              String         @id @default(uuid())
  sourceDocumentId String
  extractedData   Json           // JSON estruturado pela IA (sintomas, perguntas, red flags)
  status          String         // "REVIEW_NEEDED", "APPROVED"
  sourceDocument  SourceDocument @relation(fields: [sourceDocumentId], references: [id])
}
```

## 2. Coleta e Processamento (Backend & IA)

### 2.1 Módulo de Importação

- **Upload:** Utilizar _Server Actions_ do Next.js para upload seguro.
- **Parsing:**
  - **PDF:** Usar `pdf-parse` para extrair texto de PDFs.
  - **Web:** Usar `cheerio` ou similar para extrair texto de URLs.
  - **TXT:** Leitura direta.

### 2.2 Processamento com IA (Vercel AI SDK)

- **Novo Prompt (`lib/ai/extraction-prompts.ts`):** Criar um prompt especializado que recebe o texto bruto e retorna um JSON estrito.
- **Estrutura de Saída (JSON Schema):**
  ```json
  {
    "syndromeName": "Nome da Síndrome",
    "description": "Descrição breve",
    "symptoms": ["Sintoma 1", "Sintoma 2"],
    "questions": [{ "category": "HDA", "text": "Pergunta?", "redFlag": false }],
    "redFlags": [{ "condition": "Descrição", "severity": "CRITICAL" }]
  }
  ```

## 3. Interface do Usuário (Apple Glass Layout)

Manteremos a estética `glassmorphism.css` e componentes `glass-card`.

### 3.1 Tela de Importação (`/admin/import`)

- **Componente `GlassUploadZone`:** Área de drag-and-drop com efeito de vidro fosco (`backdrop-filter: blur`).
- **Feedback Visual:** Barra de progresso com gradiente `primary-blue` para indicar status do processamento.

### 3.2 Editor de Curadoria (`/admin/curation/[id]`)

- **Layout de Duas Colunas:**
  - **Esquerda (Fonte):** Visualizador do texto original em um `GlassCard`.
  - **Direita (Extração):** Formulário interativo para validar os dados extraídos pela IA.
- **Ações:** Botões `glass-btn-primary` para "Gerar Rascunho" e `glass-btn-secondary` para "Descartar".

### 3.3 Visualização da Anamnese (Preview)

- Reutilizar os componentes existentes (`AnamnesisView`, `SectionForm`) para mostrar como o template ficará para o usuário final.

## 4. Integração e Fluxo de Trabalho

1.  **Upload:** Usuário envia PDF -> Backend extrai texto -> Salva `SourceDocument`.
2.  **Processamento:** Trigger assíncrono chama OpenAI com o texto -> Salva JSON em `ContentExtraction`.
3.  **Revisão:** Usuário acessa painel, ajusta perguntas e _red flags_ sugeridas.
4.  **Geração:** Usuário clica em "Criar Template" -> Sistema converte JSON para `Syndrome` e `Checkbox` (como rascunho).
5.  **Publicação:** Após teste final, usuário ativa a `Syndrome`.

## 5. Validação e Qualidade

- **Validação de Schema:** Usar `zod` para garantir que o JSON da IA segue a estrutura do banco.
- **Human-in-the-loop:** Nada é publicado automaticamente. O médico/admin sempre valida a extração.

## Próximos Passos (Implementação)

1.  **Setup:** Instalar dependências (`pdf-parse`, `zod` para schema estruturado da IA).
2.  **Database:** Criar migração Prisma para as novas tabelas.
3.  **Backend:** Implementar funções de extração de texto e chamada à IA.
4.  **Frontend:** Criar páginas de Importação e Curadoria seguindo o _Design System_.
