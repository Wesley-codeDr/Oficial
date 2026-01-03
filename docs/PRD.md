# PRD – WellWave: Plataforma de Anamnese Digital com IA para Emergências

## 1. Visão e Contexto Estratégico

### 1.1 Nome do Projeto

WellWave – Plataforma de Anamnese Digital com IA para Emergências.

### 1.2 Declaração de Visão

Criar a plataforma de anamnese digital mais rápida, segura e inteligente do mercado, que converte seleções objetivas em textos médicos completos, consistentes com a prática clínica e blindados juridicamente. A WellWave será a ponte entre a coleta estruturada de dados, a decisão clínica em tempo real e a documentação médico‑legal de excelência, integrada ao ecossistema brasileiro (SUS, saúde suplementar e normativas CFM/ANS/ANVISA).

### 1.3 Proposta de Valor

**Slogan central:** "De checkboxes a narrativa médica perfeita em segundos."

**Eixos de valor:**

* **Velocidade:** anamneses completas em < 2 minutos, focadas em emergência.
* **Qualidade:** texto formal, coeso e alinhado com diretrizes e terminologias clínicas.
* **Segurança jurídica:** documentação robusta, com negativações relevantes, trilha de auditoria e alinhamento às normas brasileiras.
* **Integração:** saída pronta para copy-paste ou integração FHIR/TISS com qualquer prontuário/legacy.

### 1.4 Objetivos Estratégicos

1. **Agilidade assistencial:** Reduzir o tempo de registro da anamnese em pelo menos 50% sem perda de qualidade.
2. **Segurança jurídico-clínica:** Garantir cobertura de 100% dos elementos essenciais de documentação médico‑legal definidos no produto.
3. **Padronização:** Unificar linguagem e estrutura das notas clínicas em plantões e serviços distintos, com terminologia médica validada.
4. **Integração simples:** Permitir uso imediato via web (copy-paste) e preparar base para integrações HL7 FHIR e TISS/TUSS.

---

## 2. Experiência do Usuário (UX) e Design

### 2.1 Identidade Visual

* **Apple Design Language 2025-like (requisito duro):** o layout deve ser o mais próximo possível da experiência visual dos produtos Apple 2025 (iOS, iPadOS, macOS, watchOS e especialmente Apple Health/VisionOS), respeitando as limitações da web.
* **Glassmorphism consistente:** uso pesado de superfícies em vidro (blur, transparência, camadas), sombras suaves, bordas arredondadas amplas e hierarquia visual clara.
* **Tipografia:** SF Pro Display / SF Pro Text como referência de tipografia (ou equivalentes web), com escala, pesos e espaçamentos inspirados nas Human Interface Guidelines mais recentes.
* **Paleta e luz:** cores neutras, discretas, com acentos em poucos tons fortes; foco em contraste, legibilidade e conforto em ambientes escuros de plantão.
* **Motion & microinterações:** animações suaves, estilo Apple (suaves, físicas, sem exagero), para transições de cards, highlights de campos, feedback de geração de texto e abertura do Chat EBM.

### 2.2 Layout Funcional

* **Split-screen principal:**

  * **Esquerda:** checkboxes inteligentes organizados por síndromes, sistemas e protocolos.
  * **Direita:** texto médico gerado em tempo real (anamnese + exame físico + complementos).
* **AI Assistant lateral:** painel ou bolha flutuante com:

  * Sugestões de hipóteses, condutas e exames.
  * Alertas de red flags.
  * Acesso rápido ao Chat Médico EBM.
* **Feedback visual:**

  * Destaque de trechos alterados quando novos checkboxes são marcados.
  * Indicação clara de dados obrigatórios faltantes.

### 2.3 Fluxos Principais de UX

1. **Fluxo de Anamnese Expressa (MVP):**

   * Médico seleciona a síndrome/protocolo.
   * Marca checkboxes obrigatórios e negativos importantes.
   * Visualiza a narrativa gerada em tempo real.
   * Copia/integra a nota no prontuário.

2. **Fluxo de Chat Médico EBM:**

   * Envia anamnese + exame físico + sinais vitais.
   * Recebe hipóteses, exames e condutas com evidência.
   * Gera prescrição, SADT e LME a partir da recomendação.

3. **Fluxo de Prescrição Digital:**

   * Seleciona diagnóstico principal e comorbidades.
   * Busca fármaco (Banco Brasil/SUS).
   * Ajusta dose conforme função renal/hepática.
   * Gera receita digital assinada ICP-Brasil.

---

## 3. Funcionalidades-Chave (MVP e Releases)

### 3.1 Sistema de Checkboxes Inteligentes (MVP)

* Organização por síndromes:

  * Dor torácica / cardiovascular.
  * Neurológica (AVE, crise epiléptica, cefaleia).
  * Respiratória (dispneia, DPOC, asma, pneumonia).
  * Abdominal (abdome agudo inflamatório, obstrutivo, hemorrágico).
  * Trauma (TCE, politrauma, fraturas).
* Estrutura de cada bloco:

  * Perguntas obrigatórias (QP, HDA, antecedentes, alergias, medicações em uso, hábitos).
  * Sinais de alarme e red flags.
  * Sintomas associados.
  * Negativas importantes (nega febre, nega dispneia, nega síncope, etc.).
* Comportamento inteligente:

  * Auto-sugestão de perguntas adicionais com base em combinações de respostas.
  * Destaque de campos críticos faltantes antes de gerar o texto final.

### 3.2 Motor de Geração de Texto Médico

* Templates pré-definidos para:

  * Identificação/Contexto.
  * Queixa principal.
  * História da doença atual (HDA).
  * Antecedentes pessoais/familiares.
  * Hábitos de vida.
  * Alergias e medicações em uso.
  * Exame físico dirigido.
* Características da narrativa:

  * Linguagem formal, terceira pessoa, alinhada a prontuário.
  * Inclusão de negativas relevantes para proteção médico‑legal.
  * Coerência interna cronológica e sem contradições.
* Opções de saída:

  * Modo resumido (pronto-socorro).
  * Modo expandido (internação, parecer).

### 3.3 Sistema de Alertas Clínicos e Jurídicos

* Sinais de alarme clínico destacados por cor/ícone.
* Alertas de inconsistencia (ex.: dor torácica sem registro de fatores de risco).
* Sugestão de registro jurídico adicional (ex.: recusa de exame, recusa de internação, orientações fornecidas).

### 3.4 Integração com Protocolos de Emergência

* Bundles acionados por gatilhos clínicos:

  * Sepse: febre + taquicardia + taquipneia + suspeita de infecção.
  * SCA: dor torácica típica + fatores de risco.
  * AVE: déficit focal súbito + janela temporal.
* Sugestão estruturada de:

  * Exames laboratoriais e de imagem.
  * Condutas iniciais (fluido, antibioticoterapia, antiagregantes, trombólise conforme elegibilidade).
  * Escalas de risco (NEWS2, SOFA simplificado, etc.).

### 3.5 Chat Médico – EBM (Pronto-Socorro)

**Entradas:**

* Dados estruturados da anamnese.
* Exame físico e sinais vitais.
* Comorbidades, medicações em uso, alergias.
* Resultados de exames disponíveis.

**Saídas:**

* Hipóteses diagnósticas principais e diferenciais.
* Exames recomendados (prioridade, via SUS/particular).
* Condutas terapêuticas com doses adultas e ajustes especiais.
* Indicação de nível/força de evidência (ex.: GRADE ou classe/nível da diretriz).
* Citações estruturadas (Autor – Periódico – Ano + PMID/DOI) + diretrizes nacionais (SBC, SBPT, SBD, MS, etc.).
* Destaque de incertezas e controvérsias.

**Ações rápidas:**

* Aplicar ao caso (injetar no texto médico).
* Gerar prescrição SUS/particular.
* Gerar guia SADT (TISS).
* Gerar LME.

**Guardrails:**

* Checagem de dados mínimos antes de sugerir conduta.
* Red flags obrigatoriamente exibidas.
* Verificação de interações medicamentosas.
* Ajuste para função renal/hepática, gestação, pediatria, idosos.

### 3.6 Prescrição Online, SADT e LME (Brasil)

#### 3.6.1 Prescrição Digital

* Banco de fármacos Brasil (DCB/DCIU, ANVISA, RENAME) com mapeamento ATC.
* Geração de prescrições com:

  * Fármaco, dose, via, intervalo, duração.
  * Orientações ao paciente.
  * Opção de substituição genérica.
  * CID-10 (quando necessário).
* Assinatura digital ICP-Brasil (A1/A3) com carimbo de tempo e QR Code de verificação pública.
* Regras especiais para antimicrobianos e psicotrópicos (campos obrigatórios, validade, nº de vias).

#### 3.6.2 SADT – Padrão TISS

* Criação automática da guia SADT a partir do caso clínico.
* Codificação TUSS de procedimentos, exames e terapias.
* Exportação em XML TISS 4.x + PDF amigável.
* Registro de status de autorização (inicialmente manual, depois via integração).

#### 3.6.3 LME – CEAF/SUS

* Pré-preenchimento de LME com base em PCDT (inclusão/exclusão, exames obrigatórios, esquema terapêutico).
* Validação de elegibilidade.
* Geração de PDF padronizado com checklist por UF.

---

## 4. Arquitetura Técnica e Interoperabilidade

### 4.1 Tech Stack

* **Frontend:**

  * Next.js 16+ (App Router) - sempre na versão estável mais recente.
  * React 19+ (última versão estável).
  * TypeScript 5.9+ (strict mode).
  * Tailwind CSS 4+ + shadcn/ui como base de componentes.
  * Radix UI como primitives de acessibilidade.
  * Framer Motion para animações suaves, esteticamente alinhadas ao Apple Design Language 2025.
  * Design system próprio inspirado 1:1 no Apple Design Language 2025 (tokens de cor, tipografia, radius, sombras, motion).

* **Backend:**

  * Next.js API Routes (serverless, otimizado para Vercel).
  * Node.js versão LTS mais recente suportada pela Vercel.
  * **Nota arquitetural**: O projeto usa Next.js API Routes ao invés de NestJS/Fastify para simplificação da arquitetura e melhor integração com Vercel Edge Functions.

* **Banco de Dados e Persistência:**

  * PostgreSQL como banco principal, provisionado via **Supabase** (cluster gerenciado com pooling compatível com serverless/Vercel).
  * **Prisma ORM 6+** para modelagem de schema, migrações e tipagem forte end-to-end.
  * Supabase Storage (S3-like) para PDFs de receitas, SADT, LME e anexos clínicos.
  * **Nota**: Projeto mantido em Prisma 6.x para estabilidade de deployment após downgrade planejado do Prisma 7.

* **Autenticação e Autorização:**

  * Supabase Auth (e/ou solução dedicada a depender do ambiente) para login de médicos, com integração futura com SSO/hospital.

* **IA:**

  * LLMs compatíveis (OpenAI e equivalentes), sempre na geração mais avançada estável disponível.
  * Orquestração com LangChain ou equivalente.
  * SSE/streaming para geração em tempo real de texto médico e respostas EBM.

* **Infraestrutura e DevOps:**

  * **Vercel** para deploy do frontend, API Routes e edge functions.
  * **Supabase** como backend gerenciado (Postgres, Auth, Storage).
  * **GitHub** como VCS, com GitHub Actions para CI/CD (lint, testes, build e deploy automatizado para Vercel).
  * Storage S3‑compatível (via Supabase Storage) para documentos médicos, PDFs, receitas.
  * Observabilidade com **Sentry** (monitoring) + logs estruturados.
  * Padrão: manter componentes de stack (Next.js, React, Prisma, Tailwind) sempre na **versão estável mais recente**, com política explícita de revisão periódica de dependências.

### 4.2 Segurança e Compliance

* Criptografia AES-256 em repouso; TLS 1.3 em trânsito.
* Chaves geridas em KMS/HSM.
* Segregação multi-tenant (por hospital/clínica).
* LGPD by design: minimização de dados, anonimização/pseudonimização quando possível, registro de bases legais.
* Conformidade com:

  * Normas CFM/SBIS para PEP e prescrição eletrônica.
  * ANS/TISS/TUSS para saúde suplementar.
  * RENAME/SUS e ANVISA para fármacos e terapias.

### 4.3 Interoperabilidade (HL7 FHIR, TISS/TUSS, SUS)

* Recursos FHIR principais:

  * Patient, Practitioner, Organization, Encounter.
  * Condition, Observation, AllergyIntolerance.
  * Medication, MedicationRequest, MedicationStatement, MedicationKnowledge.
  * ServiceRequest, Procedure, Claim.
  * DocumentReference, Bundle.
* Terminologias:

  * CID-10 (diagnósticos).
  * LOINC (exames laboratoriais).
  * TUSS (procedimentos e serviços).
  * DCB/ATC (fármacos).

### 4.4 Biblioteca de Fármacos

* Fonte: ANVISA/Bulário + RENAME + complementos de mercado.
* Atualização: mensal, com versionamento e histórico.
* Campos críticos: DCB, apresentação, concentração, restrições, disponibilidade SUS.
* Serviços associados: calculadora de dose, ajustes, interações, substituições.

---

## 5. Métricas de Sucesso

* Tempo médio de anamnese: < 90 segundos.
* Cobertura de campos obrigatórios (anamnese + exame): ≥ 95% dos casos.
* Respostas do Chat EBM com referência estruturada: ≥ 95%.
* Tempo para prescrição digital simples: ≤ 60 segundos.
* Validação de XML TISS sem erros: ≥ 99% dos envios.
* LME auto-preenchida com campos obrigatórios: ≥ 80%.
* Cobertura RENAME dos principais PCDTs: 100% de 1ª linha.
* Adoção pós-período trial: ≥ 70% dos médicos que testarem por 2 semanas.
* Uptime: ≥ 99,99%.
* CSAT (médicos): ≥ 4,6/5.

---

## 6. Roadmap

### MVP (0–2 meses)

* Split-screen com checkboxes inteligentes para 3 síndromes prioritárias (ex.: dor torácica, dispneia, abdome agudo) e motor de texto médico.
* Chat Médico EBM v0 (respostas acionáveis + citações básicas internacionais e nacionais).
* Catálogo inicial de fármacos (RENAME + principais da urgência/emergência).
* Prescrição digital v0 (não controlados) com QR Code de verificação simples.
* SADT v0: geração de PDF e XML mínimo TISS.
* LME rascunho para 3 PCDTs de alta demanda.

### Versão 1.0 (3–4 meses)

* Expansão dos protocolos de emergência (Sepse, SCA, AVE, trauma).
* Chat Médico EBM v1 com PMID/DOI automáticos e preferência EBM local-first (PCDT/diretrizes brasileiras).
* Prescrição digital v1 (incluindo controlados, antimicrobianos, psicotrópicos) com ICP-Brasil A1/A3.
* SADT v1 com integração básica com operadoras.
* LME v1 para top 20 PCDTs.
* Painel de auditoria/documentos (assinaturas, revogações, histórico).

### Versão 2.0 (5–6 meses)

* PWA/mobile com suporte offline parcial para anamnese.
* Input por voz com NLP clínico.
* Analytics clínico e de uso.
* Integrações FHIR com prontuários de mercado.
* Camada de recomendação baseada em epidemiologia local e disponibilidade SUS.

---

## 7. Requisitos Não Funcionais

* Tempo de carregamento inicial < 2s em banda hospitalar típica.
* Tempo de resposta do motor de texto < 1,5s para anamneses padrão.
* Escalabilidade horizontal preparada para picos de plantão.
* Observabilidade com logs estruturados, tracing e métricas de performance.
* Testes automatizados (unit, integração, E2E) para fluxos críticos.

---

## 8. Diferenciais Competitivos

* Combinação única de:

  * Anamnese expressa estruturada.
  * Geração de narrativa médico‑legal robusta.
  * Chat EBM com citações auditáveis.
  * Pipelines Brasil-ready: RENAME/SUS, TISS/TUSS, LME/PCDT, ICP-Brasil.
* Foco radical na realidade de pronto-socorro e plantão brasileiro, não em modelos genéricos de prontuário.

---

Este PRD/Blueprint é a base para uso em VibeCoding: pode ser usado como entrada em Cursor/Claude para geração de arquitetura detalhada, epics, tasks e código.
