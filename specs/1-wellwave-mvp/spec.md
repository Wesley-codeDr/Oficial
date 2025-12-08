# Feature Specification: WellWave MVP

## Overview

**Feature Name:** WellWave MVP - Sistema de Anamnese Digital para Emergências
**Version:** 1.0.0
**Status:** Draft
**Author:** WellWave Team
**Created:** 2024-12-08
**Last Updated:** 2024-12-08

## Problem Statement

Médicos emergencistas enfrentam alta pressão temporal para documentar atendimentos de forma completa, juridicamente robusta e em conformidade com normas do CFM. O processo tradicional de anamnese:

- Consome tempo excessivo (5+ minutos por paciente)
- Frequentemente resulta em documentação incompleta
- Expõe profissionais a riscos médico-legais por falta de registro de negativas
- Não padroniza a linguagem entre diferentes profissionais
- Dificulta a identificação de sinais de alarme (red flags)

## Solution Summary

WellWave é uma plataforma digital que converte seleções objetivas (checkboxes) em narrativas médicas completas em segundos. O sistema:

1. Organiza perguntas por síndromes clínicas comuns em emergência
2. Gera texto médico formal em tempo real conforme checkboxes são marcados
3. Inclui automaticamente negativas relevantes para proteção jurídica
4. Destaca sinais de alarme para triagem de urgência
5. Oferece assistente de IA para sugestões de diagnóstico e conduta baseadas em evidência

## User Personas

### Persona Principal: Dr. Carlos (Médico Emergencista)

- **Idade:** 32 anos
- **Experiência:** 5 anos de pronto-socorro
- **Contexto:** Trabalha em plantões de 12-24h com alto volume de pacientes
- **Frustrações:** Tempo gasto em documentação vs atendimento, medo de processos por documentação incompleta
- **Objetivos:** Documentar rapidamente sem perder qualidade, proteger-se juridicamente, não perder red flags

### Persona Secundária: Dra. Marina (Médica Residente)

- **Idade:** 26 anos
- **Experiência:** R2 de Clínica Médica
- **Contexto:** Ainda aprendendo padrões de documentação, precisa de orientação
- **Frustrações:** Incerteza sobre o que documentar, dificuldade em lembrar todas as perguntas relevantes
- **Objetivos:** Aprender boas práticas de documentação, ter suporte para decisões clínicas

## User Scenarios & Testing

### Cenário 1: Anamnese Expressa de Dor Torácica

**Ator:** Dr. Carlos (médico emergencista)
**Pré-condição:** Médico autenticado no sistema
**Fluxo:**
1. Médico seleciona síndrome "Dor Torácica / Cardiovascular"
2. Sistema exibe checkboxes organizados por categorias (QP, HDA, antecedentes, etc.)
3. Médico marca características da dor: precordial, em aperto, irradiando para MSE
4. Médico marca fatores de risco: HAS, DM, tabagismo
5. Médico marca negativas importantes: nega síncope, nega dispneia
6. Sistema gera narrativa em tempo real no painel direito
7. Sistema destaca red flags identificados (dor típica + múltiplos fatores de risco)
8. Médico copia texto gerado para prontuário do hospital

**Resultado Esperado:** Anamnese completa gerada em menos de 90 segundos com todas as negativas documentadas

**Critérios de Aceite:**
- Texto gerado em linguagem formal, terceira pessoa
- Negativas marcadas aparecem no texto como "Nega [sintoma]"
- Red flags aparecem destacados visualmente
- Botão de cópia funciona em um clique
- Tempo total do fluxo < 90 segundos

### Cenário 2: Consulta ao Chat Médico EBM

**Ator:** Dra. Marina (médica residente)
**Pré-condição:** Anamnese já preenchida no sistema
**Fluxo:**
1. Médica abre o Chat Médico EBM
2. Sistema envia automaticamente contexto da anamnese atual
3. Médica pergunta: "Quais são as hipóteses diagnósticas e exames iniciais?"
4. Sistema retorna hipóteses ordenadas por probabilidade
5. Sistema inclui exames recomendados com justificativa
6. Sistema cita diretrizes nacionais (SBC) e referências internacionais
7. Médica seleciona conduta sugerida para aplicar ao caso

**Resultado Esperado:** Resposta com hipóteses diagnósticas, exames e citações estruturadas

**Critérios de Aceite:**
- Resposta inclui pelo menos 3 hipóteses diagnósticas
- Cada hipótese tem nível de evidência indicado
- Citações incluem autor, periódico, ano e PMID/DOI quando disponível
- Diretrizes brasileiras priorizadas quando aplicável
- Red flags são sempre exibidos se presentes

### Cenário 3: Autenticação de Médico

**Ator:** Qualquer médico
**Pré-condição:** Médico possui cadastro no sistema
**Fluxo:**
1. Médico acessa página de login
2. Médico insere email e senha
3. Sistema valida credenciais
4. Sistema redireciona para dashboard principal
5. Sessão permanece ativa por período configurável

**Resultado Esperado:** Acesso seguro ao sistema com sessão persistente

**Critérios de Aceite:**
- Login com email/senha funcional
- Feedback claro em caso de erro de credenciais
- Sessão expira após período de inatividade
- Logout manual disponível
- Dados do médico (nome, CRM) exibidos após login

### Cenário 4: Geração de Anamnese para Abdome Agudo

**Ator:** Dr. Carlos
**Pré-condição:** Médico autenticado
**Fluxo:**
1. Médico seleciona síndrome "Abdome Agudo"
2. Sistema exibe checkboxes específicos para quadro abdominal
3. Médico marca localização: dor em FID, tipo cólica, início há 12h
4. Médico marca sintomas associados: náusea, febre, anorexia
5. Médico marca negativas: nega diarreia, nega hematoquezia
6. Sistema gera narrativa formatada
7. Sistema destaca sinais de alarme (possível apendicite)

**Resultado Esperado:** Anamnese completa com alertas de urgência

**Critérios de Aceite:**
- Template específico para abdome agudo disponível
- Sinais de alarme cirúrgico destacados
- Texto segue estrutura padrão de anamnese

### Cenário 5: Geração de Anamnese para Dispneia

**Ator:** Dr. Carlos
**Pré-condição:** Médico autenticado
**Fluxo:**
1. Médico seleciona síndrome "Dispneia / Respiratória"
2. Sistema exibe checkboxes para quadro respiratório
3. Médico marca características: dispneia progressiva, piora com esforço
4. Médico marca antecedentes: DPOC, tabagismo 40 maços/ano
5. Médico marca exame físico: sibilos difusos, uso de musculatura acessória
6. Sistema gera narrativa completa

**Resultado Esperado:** Anamnese respiratória com achados de exame físico

**Critérios de Aceite:**
- Template específico para quadro respiratório
- Achados de exame físico integrados na narrativa
- Red flags respiratórios destacados

## Functional Requirements

### FR-001: Sistema de Checkboxes Inteligentes

O sistema DEVE apresentar checkboxes organizados por síndromes clínicas:

**Síndromes MVP:**
- Dor torácica / Cardiovascular
- Dispneia / Respiratória
- Abdome agudo

**Estrutura por síndrome:**
- Queixa principal (QP): características, localização, intensidade, duração
- História da doença atual (HDA): evolução, fatores de melhora/piora
- Antecedentes pessoais: HAS, DM, DLP, tabagismo, cirurgias
- Medicações em uso: lista de medicamentos contínuos
- Alergias: medicamentosas e alimentares
- Hábitos: tabagismo, etilismo, drogas
- Sinais de alarme: específicos por síndrome
- Negativas importantes: sintomas ausentes relevantes

**Comportamento:**
- Checkboxes marcados geram texto imediatamente
- Campos obrigatórios indicados visualmente
- Campos faltantes alertados antes de finalizar

### FR-002: Motor de Geração de Texto Médico

O sistema DEVE gerar narrativa médica a partir dos checkboxes marcados:

**Características do texto:**
- Linguagem formal, terceira pessoa
- Estrutura padrão de anamnese (identificação, QP, HDA, etc.)
- Negativas documentadas explicitamente ("Nega febre", "Nega dispneia")
- Coerência cronológica
- Sem contradições internas

**Modos de saída:**
- Modo resumido: adequado para pronto-socorro
- Modo expandido: adequado para internação ou parecer

### FR-003: Interface Split-Screen

O sistema DEVE apresentar layout dividido:

**Painel esquerdo:** Checkboxes organizados por categorias
**Painel direito:** Texto médico gerado em tempo real

**Comportamento:**
- Texto atualiza conforme checkboxes são marcados
- Trechos alterados destacados visualmente
- Scroll sincronizado opcional

### FR-004: Sistema de Alertas Clínicos (Red Flags)

O sistema DEVE identificar e destacar sinais de alarme:

**Alertas visuais:**
- Cor diferenciada para red flags
- Ícone de alerta próximo ao checkbox
- Destaque no texto gerado

**Red flags por síndrome:**
- Dor torácica: síncope, dispneia, sudorese, dor típica + fatores de risco
- Dispneia: cianose, uso de musculatura acessória, alteração de consciência
- Abdome agudo: defesa abdominal, febre alta, parada de eliminação de gases

### FR-005: Chat Médico EBM

O sistema DEVE oferecer assistente de IA para suporte à decisão:

**Entradas aceitas:**
- Dados da anamnese atual (automático)
- Perguntas livres do médico

**Saídas fornecidas:**
- Hipóteses diagnósticas ordenadas
- Exames recomendados com priorização
- Condutas terapêuticas com doses
- Nível de evidência (GRADE quando disponível)
- Citações estruturadas (autor, periódico, ano, PMID/DOI)
- Diretrizes brasileiras quando aplicável (SBC, SBPT, SBD)

**Guardrails:**
- Verificação de dados mínimos antes de sugerir conduta
- Red flags sempre exibidos
- Disclaimer sobre uso como suporte, não substituição do julgamento clínico

### FR-006: Autenticação de Médicos

O sistema DEVE permitir login seguro:

**Funcionalidades:**
- Login via email e senha
- Recuperação de senha por email
- Validação manual de CRM (fase MVP)
- Sessão com timeout configurável
- Logout manual

**Dados do perfil:**
- Nome completo
- CRM (número e estado)
- Especialidade (opcional)
- Email

### FR-007: Exportação e Cópia

O sistema DEVE permitir exportar a anamnese gerada:

**Formatos:**
- Cópia para clipboard (um clique)
- Texto plano formatado

**Metadados:**
- Timestamp de geração
- Versão do sistema
- Identificação do médico (opcional, configurável)

## Non-Functional Requirements

### NFR-001: Performance

- Carregamento inicial: < 2 segundos em conexão hospitalar típica
- Geração de texto: < 1.5 segundos após marcar checkbox
- Resposta do Chat EBM: início do streaming < 2 segundos
- Fluxo completo de anamnese: < 90 segundos

### NFR-002: Disponibilidade

- Uptime: ≥ 99.9%
- Recuperação de falhas: < 5 minutos

### NFR-003: Segurança

- Autenticação obrigatória para acesso
- Sessões com timeout configurável
- Conformidade LGPD para dados de saúde
- Dados de pacientes NÃO são armazenados no MVP (copy-paste para prontuário externo)

### NFR-004: Usabilidade

- Interface intuitiva para uso sob pressão
- Suporte a tema escuro (ambientes de plantão)
- Responsivo para tablets (uso comum em PS)
- Feedback visual claro para ações do usuário

### NFR-005: Acessibilidade

- Contraste adequado para leitura
- Navegação por teclado
- Tamanhos de fonte legíveis

## Success Criteria

| Critério | Meta | Método de Verificação |
|----------|------|----------------------|
| Tempo médio de anamnese completa | < 90 segundos | Medição em testes com usuários |
| Cobertura de campos obrigatórios | ≥ 95% das anamneses | Validação automática no sistema |
| Taxa de inclusão de negativas | ≥ 90% das anamneses | Análise de textos gerados |
| Identificação de red flags | 100% quando presentes | Testes com casos simulados |
| Respostas EBM com citação | ≥ 95% das respostas | Auditoria de logs |
| Satisfação do usuário (CSAT) | ≥ 4.5/5 | Survey pós-uso |
| Taxa de adoção após trial | ≥ 60% | Métricas de uso |
| Uptime do sistema | ≥ 99.9% | Monitoramento |

## Key Entities

### Médico (User)
- ID único
- Nome completo
- Email (único)
- Senha (hash)
- CRM (número + UF)
- Especialidade (opcional)
- Data de criação
- Último acesso

### Síndrome (Template)
- ID único
- Nome (ex: "Dor Torácica")
- Código interno
- Categorias de checkboxes
- Red flags associados
- Template de texto

### Checkbox
- ID único
- Síndrome associada
- Categoria (QP, HDA, etc.)
- Texto de exibição
- Texto para narrativa
- É obrigatório?
- É red flag?
- Ordem de exibição

### Sessão de Anamnese
- ID único
- Médico responsável
- Síndrome selecionada
- Checkboxes marcados
- Texto gerado
- Timestamp início
- Timestamp finalização
- Foi copiado?

### Conversa EBM
- ID único
- Sessão de anamnese associada
- Mensagens (pergunta/resposta)
- Citações retornadas
- Timestamp

## Assumptions

1. **Médicos têm acesso à internet** durante o atendimento (conexão hospitalar)
2. **Prontuário do hospital é externo** - WellWave não substitui o PEP, apenas gera texto para copy-paste
3. **Validação de CRM é manual** no MVP - integração com base do CFM em versão futura
4. **Dados de pacientes não são armazenados** - apenas a estrutura do atendimento para auditoria
5. **Templates médicos são validados** por médicos consultores antes do lançamento
6. **Idioma é português brasileiro** exclusivamente no MVP
7. **Navegadores suportados:** Chrome, Safari, Edge (últimas 2 versões)

## Dependencies

### Externas
- Serviço de autenticação (Supabase Auth ou equivalente)
- Serviço de LLM para Chat EBM (OpenAI ou equivalente)
- Hospedagem web (Vercel ou equivalente)

### Internas
- Design system WellWave (baseado em Apple Design Language 2025)
- Templates médicos validados por especialistas
- Base de conhecimento EBM para prompts do chat

## Scope Boundaries

### Incluído no MVP
- 3 síndromes: dor torácica, dispneia, abdome agudo
- Geração de texto de anamnese
- Chat EBM básico com citações
- Autenticação de médicos
- Exportação via copy-paste

### Excluído do MVP (versões futuras)
- Prescrição digital com assinatura ICP-Brasil
- Integração SADT/TISS com operadoras
- LME para CEAF/SUS
- PWA/mobile com offline
- Input por voz
- Integrações FHIR com prontuários externos
- Multi-tenancy por hospital
- Armazenamento de dados de pacientes
- Síndromes adicionais (trauma, neurológico, etc.)

## Risks and Mitigations

| Risco | Impacto | Probabilidade | Mitigação |
|-------|---------|---------------|-----------|
| Qualidade do texto gerado inadequada | Alto | Médio | Templates revisados por médicos, testes extensivos com especialistas |
| Latência da API de IA | Médio | Médio | Streaming para feedback imediato, fallback para respostas pré-definidas |
| Rejeição por médicos | Alto | Baixo | UX testing com emergencistas, iteração baseada em feedback |
| Conformidade CFM questionada | Alto | Baixo | Consultoria jurídica, disclaimers claros, auditoria por especialistas |
| Falhas em identificar red flags | Alto | Baixo | Testes extensivos, validação por especialistas, alertas conservadores |

## Glossary

| Termo | Definição |
|-------|-----------|
| Anamnese | Histórico médico coletado através de entrevista com o paciente |
| QP | Queixa Principal - motivo que levou o paciente a procurar atendimento |
| HDA | História da Doença Atual - evolução cronológica dos sintomas |
| Red Flag | Sinal de alarme que indica condição potencialmente grave |
| EBM | Evidence-Based Medicine - Medicina Baseada em Evidências |
| CFM | Conselho Federal de Medicina |
| LGPD | Lei Geral de Proteção de Dados |
| PEP | Prontuário Eletrônico do Paciente |
| PS | Pronto-Socorro |

## References

- PRD completo: `/docs/PRD.md`
- Constitution: `/memory/constitution.md`
- Resoluções CFM sobre prontuário eletrônico
- Apple Human Interface Guidelines 2025
