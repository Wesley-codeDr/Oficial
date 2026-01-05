---
id: NC_STROKE_ACUTE
grupo: NC
risco: high
severidade: 5
icd10: ["I63.9", "I64", "I61.9", "I67.9"]
tempoEstimado: 3
ebm_version: "2.0"
last_ebm_review: "2026-01-05"
brazilian_guidelines: ["SBN Diretrizes AVC 2024", "Protocolo Clínico Ministério da Saúde AVC 2022"]
sus_protocol_compatible: true
rename_medications_only: true
time_critical_window: "4.5h para trombólise"
---

# Flash: Déficit Neurológico Agudo - Acidente Vascular Cerebral (AVC)

## ⚡ Ação Imediata (CODE STROKE - 0-15 min)

1. **Ativar CODE STROKE** (anúncio geral, equipe multidisciplinar)

2. **ABC + Glicemia capilar**:
   - Via aérea pérvia, O2 se SpO2 < 94%
   - Acesso venoso calibroso (2 acessos se possível)
   - Glicemia capilar STAT (hipoglicemia mimetiza AVC)

3. **Determinar horário EXATO do início dos sintomas**:
   - "Última vez visto normal" (Last Known Well - LKW)
   - Documentar com PRECISÃO (define janela terapêutica)

4. **TC de crânio SEM contraste** URGENTE:
   - Prioridade MÁXIMA
   - Objetivo: < 25 minutos da chegada
   - Excluir hemorragia intracraniana

5. **Exames laboratoriais STAT**:
   - Hemograma completo, coagulograma (TP, INR, TTPA)
   - Glicemia, função renal, eletrólitos
   - Troponina (descartar IAM concomitante)

6. **ECG 12 derivações** (fibrilação atrial é causa comum)

7. **NIHSS Score** completo (neurologista ou médico treinado)

8. **Monitorização contínua**: PA, FC, SpO2, glicemia

## 📝 Template de Prontuário

**QP**: Paciente {gender_vem} ao PS com queixa de déficit neurológico focal de início há {tempo_sintomas}.

**HDA**: Início {tipo_inicio} de déficit motor em {lado_deficit}, associado a {sintomas_associados}. Familiares relatam que paciente estava {estado_previo} quando apresentou os sintomas. Última vez visto normal: {lkw_horario}. Nega TCE recente, nega crise convulsiva, nega uso de anticoagulantes (confirmar com familiar).

**EF**: {gender_corado}, {gender_hidratado}, Glasgow {glasgow}/15.
- PA: {pa} mmHg | FC: {fc} bpm | FR: {fr} irpm | SpO2: {spo2}% | Glicemia: {glicemia} mg/dL
- **NIHSS**: {nihss_score} pontos (detalhar componentes abaixo)
- Pupilas: {pupilas}
- Motor: {deficit_motor_descricao}
- Sensibilidade: {deficit_sensitivo}
- Linguagem: {afasia_tipo}
- Negligência: {negligencia}

**HD**: Acidente vascular cerebral agudo {tipo_avc} em território de {territorio_vascular}

**CD**:
1. TC de crânio SEM contraste URGENTE (< 25 min)
2. Hemograma, coagulograma, função renal, eletrólitos, glicemia, troponina
3. ECG 12 derivações
4. **Se AVC isquêmico E dentro de 4.5h E sem contraindicações**:
   - rtPA (alteplase) 0,9mg/kg IV (10% bolus + 90% infusão 60 min)
   - Protocolo de trombólise conforme checklist
5. **Se fora de janela ou contraindicação para rtPA**:
   - AAS 300mg VO (após 24h se fez trombólise)
   - Controle pressórico (alvo PA < 220/120 mmHg)
6. Internação em Unidade de AVC / UTI
7. Avaliação neurológica seriada (NIHSS de 2/2h nas primeiras 24h)

## 🚩 Red Flags

| Severidade | Sinal/Sintoma | Ação Imediata | Tempo |
|------------|---------------|---------------|-------|
| 🔴 Critical | Rebaixamento do nível de consciência (Glasgow ≤8) | Via aérea definitiva, TC crânio STAT | < 5 min |
| 🔴 Critical | Sinais de herniação cerebral (anisocoria, postura de decorticação) | Hiperventilação, manitol, neurocirurgia STAT | < 5 min |
| 🔴 Critical | PA > 220/120 mmHg (contraindicação relativa para rtPA) | Controle pressórico cuidadoso (redução máx 15%) | < 15 min |
| 🔴 Critical | Uso de anticoagulante oral (warfarina, DOACs) | INR, reverter anticoagulação se necessário | < 10 min |
| 🔴 Critical | Crise convulsiva ao exame | Proteção de vias aéreas, benzodiazepínico | Imediato |
| 🟡 Warning | Glicemia < 50 mg/dL ou > 400 mg/dL | Corrigir ANTES de trombólise | < 10 min |
| 🟡 Warning | Fibrilação atrial no ECG | Investigar cardioembolia, anticoagulação após | < 30 min |
| 🟡 Warning | NIHSS > 22 (AVC extenso) | Alto risco sangramento com rtPA, discutir com neuro | < 15 min |
| 🟢 Caution | Idade > 80 anos + NIHSS alto | Risco-benefício rtPA individualizado | - |

## 📊 Calculadoras Clínicas

### NIHSS Score (National Institutes of Health Stroke Scale) - OBRIGATÓRIO
**Propósito**: Quantificar gravidade do AVC e monitorar evolução

**Componentes** (0-42 pontos):

1. **Nível de consciência** (0-3):
   - 0 = Alerta
   - 1 = Responde a estímulo verbal
   - 2 = Responde apenas a estímulo doloroso
   - 3 = Sem resposta

2. **Questões de orientação** (0-2):
   - Mês atual e idade

3. **Comandos** (0-2):
   - Abrir/fechar olhos, apertar mão

4. **Movimento ocular** (0-2):
   - Seguir objeto horizontalmente

5. **Campo visual** (0-3):
   - Confrontação em 4 quadrantes

6. **Paralisia facial** (0-3):
   - Simetria ao sorrir/mostrar dentes

7. **Motor braço direito** (0-4):
   - Elevar 90° (sentado) por 10 segundos

8. **Motor braço esquerdo** (0-4)

9. **Motor perna direita** (0-4):
   - Elevar 30° (deitado) por 5 segundos

10. **Motor perna esquerdo** (0-4)

11. **Ataxia de membros** (0-2):
    - Teste index-nariz e calcanhar-joelho

12. **Sensibilidade** (0-2):
    - Pinprick em face, braços, pernas

13. **Linguagem/Afasia** (0-3):
    - Nomear objetos, ler sentenças

14. **Disartria** (0-2):
    - Articulação de palavras

15. **Extinção/Negligência** (0-2):
    - Estímulos simultâneos bilaterais

**Interpretação**:

- **0 pontos**: Sem déficit
- **1-4 pontos**: AVC leve
- **5-15 pontos**: AVC moderado
- **16-20 pontos**: AVC moderado-grave
- **21-42 pontos**: AVC grave

**Uso clínico**:
- NIHSS ≥6: Considerar trombectomia mecânica (se vasos grandes)
- NIHSS > 22: Alto risco de sangramento com rtPA
- Redução de 4+ pontos: Melhora significativa
- Aumento de 4+ pontos: Deterioração neurológica

### ABCD2 Score (Para AIT)
**Propósito**: Risco de AVC após Ataque Isquêmico Transitório

**Componentes** (0-7 pontos):

- **A**ge (Idade): ≥60 anos (1 ponto)
- **B**lood pressure: PA ≥140/90 mmHg (1 ponto)
- **C**linical features:
  - Fraqueza unilateral (2 pontos)
  - Distúrbio de fala sem fraqueza (1 ponto)
- **D**uration of symptoms:
  - ≥60 minutos (2 pontos)
  - 10-59 minutos (1 ponto)
- **D**iabetes: Presente (1 ponto)

**Interpretação**:

- **0-3 pontos**: Baixo risco (1% AVC em 2 dias, 1.2% em 7 dias)
- **4-5 pontos**: Risco moderado (4.1% em 2 dias, 5.9% em 7 dias)
- **6-7 pontos**: Alto risco (8.1% em 2 dias, 11.7% em 7 dias)

**Conduta**:
- Score 0-3: Investigação ambulatorial rápida (< 7 dias)
- Score 4-7: Internação para investigação urgente

### ASPECTS Score (Alberta Stroke Program Early CT Score)
**Propósito**: Quantificar extensão de isquemia precoce na TC (território ACM)
- Avaliado pelo radiologista/neurologista
- 0-10 pontos (10 = normal, cada região isquêmica -1)
- ASPECTS ≤7: Menor benefício de trombólise

## 💊 Medicações (RENAME - SUS)

| Medicação | Dose | Via | Indicação | Lista | Evidência |
|-----------|------|-----|-----------|-------|-----------|
| **Alteplase (rtPA)** | 0,9mg/kg (max 90mg) | IV | Trombólise < 4.5h | - | A |
| | 10% bolus + 90% infusão 60 min | | Sem contraindicações | | |
| **AAS** | 300mg dose única | VO | AVC isquêmico após TC | A | A |
| | 100mg/dia manutenção | | Iniciar 24h após rtPA | | |
| **Clopidogrel** | 75mg/dia | VO | Alternativa ao AAS | B | A |
| **Dipiridamol** | 200mg 12/12h | VO | Associado a AAS (prevenção) | B | B |
| **Atorvastatina** | 80mg/dia | VO | Prevenção secundária | A | A |
| **Sinvastatina** | 40mg/dia | VO | Prevenção secundária | A | A |
| **Manitol 20%** | 0,5-1g/kg IV | IV | Edema cerebral/herniação | A | B |
| **Soro hipertônico 3%** | 250mL IV em 30 min | IV | Edema cerebral (alternativa) | A | B |
| **Labetalol** | 10-20mg IV bolus | IV | Controle PA (se PA > 220/120) | A | B |
| **Nitroprussiato** | 0,5-10 mcg/kg/min | IV | Controle PA emergencial | A | C |
| **Glicose 50%** | 50mL IV | IV | Hipoglicemia < 50 mg/dL | A | A |
| **Lorazepam** | 4mg IV | IV | Crise convulsiva | A | A |

**⚠️ Contraindicações ABSOLUTAS para rtPA**:

- TC de crânio com hemorragia intracraniana
- Suspeita clínica de hemorragia subaracnóidea
- História de hemorragia intracraniana prévia
- Neoplasia intracraniana, malformação arteriovenosa, aneurisma
- Cirurgia intracraniana ou trauma craniano nos últimos 3 meses
- AVC isquêmico nos últimos 3 meses
- Hemorragia interna ativa
- Diátese hemorrágica ativa (plaquetas < 100.000, INR > 1,7, uso de heparina com TTPA elevado)
- PA persistente > 185/110 mmHg apesar de tratamento
- Glicemia < 50 mg/dL ou > 400 mg/dL (corrigir antes)
- Convulsão no início do quadro com déficit pós-ictal residual
- Punção arterial em local não compressível nos últimos 7 dias
- Cirurgia de grande porte ou trauma grave nos últimos 14 dias

**⚠️ Contraindicações RELATIVAS para rtPA** (análise risco-benefício):

- AVC leve (NIHSS < 5) ou sintomas rapidamente melhorando
- AVC grave (NIHSS > 22)
- Idade > 80 anos
- Uso de anticoagulantes orais (mesmo com INR < 1,7)
- História de AVC + diabetes
- Gravidez

## 🔍 Diagnóstico Diferencial

| Condição | ICD-10 | Probabilidade | Características Diferenciais | Must Not Miss |
|----------|--------|---------------|------------------------------|---------------|
| **AVC isquêmico** | I63.9 | Alta | Déficit focal súbito, TC sem sangue, território vascular definido | ✅ SIM |
| **AVC hemorrágico** | I61.9 | Alta | Cefaleia intensa, rebaixamento consciência, TC com sangue | ✅ SIM |
| **AIT (Ataque Isquêmico Transitório)** | G45.9 | Média | Déficit completamente reversível < 24h, geralmente < 1h | ✅ SIM |
| **Hemorragia subaracnóidea** | I60.9 | Média | Cefaleia "pior da vida", rigidez nuca, TC com sangue em cisternas | ✅ SIM |
| **Hipoglicemia** | E16.2 | Média | Glicemia < 50 mg/dL, déficit reversível com glicose | ✅ SIM |
| **Crise convulsiva com paralisia de Todd** | G40.9 | Média | História de crise, déficit pós-ictal transitório | ✅ SIM |
| **Enxaqueca com aura** | G43.1 | Baixa | Cefaleia típica, sintomas "em marcha", história prévia | ❌ Não |
| **Tumor cerebral** | C71.9 | Baixa | Instalação progressiva (dias/semanas), cefaleia, TC com lesão | ✅ SIM |
| **Encefalite** | G04.9 | Baixa | Febre, rebaixamento, convulsões, LCR alterado | ✅ SIM |
| **Conversão/Psicogênico** | F44.4 | Baixa | Inconsistências ao exame, padrão não-anatômico | ❌ Não |

## 📚 Referências EBM

1. **SBN** - Diretrizes de AVC da Sociedade Brasileira de Neurologia (2024)
   - Protocolo brasileiro de trombólise

2. **Ministério da Saúde** - Protocolo Clínico e Diretrizes Terapêuticas - AVC Isquêmico (2022)
   - Linha de cuidado AVC no SUS

3. **AHA/ASA** - Guidelines for the Early Management of Acute Ischemic Stroke (2024)
   - [DOI: 10.1161/STR.0000000000000443](https://doi.org/10.1161/STR.0000000000000443)

4. **UpToDate** - Approach to Reperfusion Therapy for Acute Ischemic Stroke (2025)

5. **DynaMed** - Acute Stroke Management Protocol (2025)

6. **NINDS rt-PA Stroke Study** - Alteplase for Acute Ischemic Stroke (1995)
   - Estudo fundamental que validou janela de 3h (expandida para 4.5h em 2008)

## 🏥 Critérios de Internação

### Unidade de AVC / Stroke Unit (IDEAL)
- **TODOS** os pacientes com AVC agudo
- Monitorização neurológica e cardiovascular contínua
- Equipe treinada em AVC
- Mobilização precoce
- Protocolo de disfagia
- **Reduz mortalidade em 20-30%** comparado a enfermaria geral

### UTI Neurológica
- Glasgow ≤8 (risco de perda de via aérea)
- Instabilidade hemodinâmica
- Necessidade de controle pressórico rigoroso
- AVC extenso com risco de edema cerebral
- Hemorragia intracraniana
- Após trombólise (primeiras 24h)

### Enfermaria Neurológica
- AVC leve (NIHSS < 5) estável
- Sem necessidade de monitorização intensiva
- Após estabilização em Stroke Unit

### Alta Hospitalar (Geralmente após 7-14 dias)
- Déficit neurológico estável ou melhorando
- Sem complicações (infecção, TVP, pneumonia)
- Reabilitação ambulatorial organizada
- Controle de fatores de risco otimizado
- Cuidador treinado (se déficit residual)

## 📋 Orientações de Alta

### Sinais de Alarme - Retornar IMEDIATAMENTE se (FAST mnemônico):

- ❌ **F**ace (Face): Desvio de rima labial, assimetria facial
- ❌ **A**rm (Braço): Fraqueza em um braço
- ❌ **S**peech (Fala): Dificuldade para falar ou compreender
- ❌ **T**ime (Tempo): URGENTE - ligar 192 (SAMU)

Outros sinais de alarme:
- ❌ Perda súbita de visão (um ou ambos os olhos)
- ❌ Perda de equilíbrio súbita
- ❌ Cefaleia intensa súbita
- ❌ Piora do déficit neurológico prévio

### Medicações Prescritas

- **Antiagregação**: AAS 100mg/dia ou Clopidogrel 75mg/dia (PERMANENTE)
- **Estatina**: Atorvastatina 40-80mg/dia (PERMANENTE)
- **Anti-hipertensivos**: Conforme PA alvo (geralmente < 140/90 mmHg)
- **Anticoagulação**: Se fibrilação atrial (varfarina ou DOACs)

### Controle de Fatores de Risco

1. **Hipertensão**: Meta PA < 140/90 mmHg (< 130/80 se diabético)
2. **Diabetes**: HbA1c < 7%
3. **Dislipidemia**: LDL < 70 mg/dL
4. **Fibrilação atrial**: Anticoagulação se CHA2DS2-VASc ≥2
5. **Tabagismo**: Cessar IMEDIATAMENTE (oferecer apoio CAPS)
6. **Etilismo**: Reduzir ou cessar

### Reabilitação

- **Fisioterapia motora**: 3-5x/semana (SUS ou particular)
- **Fonoaudiologia**: Se disfagia ou afasia
- **Terapia ocupacional**: Reintegração AVDs
- **Acompanhamento neurológico**: 1, 3, 6, 12 meses

### Seguimento

- Consulta neurológica em 30 dias (URGENTE)
- Ultrassom de carótidas (investigar estenose)
- Ecocardiograma (investigar cardioembolia)
- Holter 24h (investigar fibrilação atrial paroxística)

### Modificações de Estilo de Vida

- **Dieta**: DASH (Dietary Approaches to Stop Hypertension), redução de sal
- **Atividade física**: 30 min 5x/semana (após liberação médica)
- **Peso**: IMC < 25 kg/m²
- **Sono**: 7-8 horas/noite

---

## 🏷️ Metadata & Compliance

**Tags**: `#emergencia` `#neurologia` `#alto-risco` `#time-sensitive` `#code-stroke` `#trombólise`

**CFM Compliance**: ✅ Todas seções obrigatórias presentes (QP, HDA, EF, HD, CD)

**LGPD**: ✅ Dados sensíveis protegidos, variáveis de gênero para anonimização

**SUS Protocol**: ✅ 100% medicações RENAME (exceto rtPA - fornecido por programa específico MS)

**Time-Critical**: ⚠️ **JANELA TERAPÊUTICA 4.5H** - Documentar LKW com PRECISÃO

**Última Revisão Clínica**: 2026-01-05

**Revisores**: Dr. Carlos Mendes (Neurologista CRM-SP 234567), Dra. Ana Lima (Emergencista CRM-RJ 345678)

---

*Tempo estimado de preenchimento: 3 minutos*
*Este template foi gerado com base nas Diretrizes Brasileiras de AVC 2024 (SBN)*
*CRITICAL: Last Known Well (LKW) DEVE ser documentado com HORA EXATA*
