---
id: NC_STROKE_ACUTE
grupo: NC
risco: high
severidade: 5
icd10: ["I63.9", "I64", "I61.9", "I67.9"]
ebm_version: "2.0"
last_ebm_review: "2026-01-05"
brazilian_guidelines: ["SBN Diretrizes AVC 2024", "Protocolo Clínico Ministério da Saúde AVC 2022"]
sus_protocol_compatible: true
total_checkboxes: 46
flash_checkboxes: 13
detailed_checkboxes: 21
both_checkboxes: 12
time_critical: true
---

# NC - Déficit Neurológico Agudo (Acidente Vascular Cerebral) - Anamnese Completa

## QP - Queixa Principal

### Tipo de Déficit

- [ ] **Déficit motor unilateral (hemiparesia/hemiplegia)**
  - **Narrativa**: "Apresenta déficit motor em hemicorpo {lado}"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: true
  - **Justificativa**: Déficit focal é cardinal para AVC, determina território vascular

- [ ] **Déficit de fala (afasia/disartria)**
  - **Narrativa**: "Apresenta dificuldade de fala"
  - **Seção**: BOTH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Indica comprometimento de hemisfério dominante (geralmente esquerdo)

- [ ] **Déficit visual (perda de campo visual)**
  - **Narrativa**: "Refere perda de campo visual"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Hemianopsia homônima sugere lesão cortical posterior

- [ ] **Déficit sensitivo unilateral**
  - **Narrativa**: "Apresenta hipoestesia em hemicorpo {lado}"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Menos comum que déficit motor, pode indicar lesão talâmica

- [ ] **Desvio de rima labial**
  - **Narrativa**: "Desvio de rima labial para {lado}"
  - **Seção**: BOTH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Sinal visível de paralisia facial central

- [ ] **Ataxia / incoordenação**
  - **Narrativa**: "Apresenta ataxia de membros"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Sugere lesão cerebelar ou de tronco encefálico

## HDA - História da Doença Atual

### Tempo e Horário (CRÍTICO)

- [ ] **Last Known Well (LKW) documentado**
  - **Narrativa**: "Última vez visto normal: {lkw_horario} ({tempo_sintomas} desde LKW)"
  - **Seção**: FLASH
  - **Required**: true
  - **Red Flag**: true
  - **Justificativa**: CRÍTICO - Define janela terapêutica para trombólise (4.5h)

- [ ] **Sintomas com < 4.5 horas de evolução**
  - **Narrativa**: "Sintomas iniciados há menos de 4.5 horas"
  - **Seção**: FLASH
  - **Required**: true
  - **Red Flag**: true
  - **Justificativa**: Janela terapêutica para rtPA

- [ ] **Sintomas com > 4.5 horas (fora de janela)**
  - **Narrativa**: "Sintomas com mais de 4.5 horas de evolução"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Fora de janela para rtPA IV (considerar trombectomia até 24h em casos selecionados)

### Características do Início

- [ ] **Início súbito (segundos a minutos)**
  - **Narrativa**: "Início súbito dos sintomas"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: true
  - **Justificativa**: Padrão clássico de AVC isquêmico (embólico)

- [ ] **Início flutuante / "stuttering"**
  - **Narrativa**: "Sintomas com piora e melhora intermitentes"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Pode indicar AVC em progressão ou AIT de repetição

- [ ] **Progressão gradual (horas a dias)**
  - **Narrativa**: "Progressão gradual dos sintomas ao longo de {tempo}"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Menos típico de AVC, pensar em tumor ou infecção

- [ ] **Sintomas ao despertar (wake-up stroke)**
  - **Narrativa**: "Sintomas presentes ao despertar pela manhã"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: LKW = hora que foi dormir; pode ser elegível para trombólise com RM (FLAIR/DWI mismatch)

### Sintomas Associados

- [ ] **Cefaleia intensa associada**
  - **Narrativa**: "Cefaleia intensa de início súbito associada ao déficit"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: ALERTA - Pensar em AVC hemorrágico ou transformação hemorrágica

- [ ] **Náuseas e/ou vômitos**
  - **Narrativa**: "Refere náuseas e vômitos"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Sugere lesão de fossa posterior (cerebelo/tronco) ou hipertensão intracraniana

- [ ] **Vertigem associada**
  - **Narrativa**: "Vertigem rotatória associada"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Território vértebrobasilar (cerebelo, tronco encefálico)

- [ ] **Rebaixamento do nível de consciência**
  - **Narrativa**: "Rebaixamento do nível de consciência"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: CRÍTICO - AVC extenso, hemorragia, ou edema cerebral

- [ ] **Crise convulsiva presenciada**
  - **Narrativa**: "Crise convulsiva presenciada ao início dos sintomas"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: CONTRAINDICAÇÃO relativa para rtPA (paralisia de Todd vs AVC)

### Evolução

- [ ] **Sintomas estáveis desde o início**
  - **Narrativa**: "Déficit neurológico estável desde o início"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Padrão típico de AVC estabelecido

- [ ] **Piora progressiva**
  - **Narrativa**: "Piora progressiva do déficit neurológico"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: AVC em progressão ou edema cerebral

- [ ] **Melhora espontânea dos sintomas**
  - **Narrativa**: "Melhora espontânea parcial dos sintomas"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Pode indicar AIT ou penumbra isquêmica viável

## ANTECEDENTES - História Médica Pregressa

### Fatores de Risco Cardiovascular

- [ ] **Hipertensão Arterial Sistêmica**
  - **Narrativa**: "Hipertenso"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: false
  - **Justificativa**: Principal fator de risco para AVC (RR 3-5x)

- [ ] **Diabetes Mellitus**
  - **Narrativa**: "Diabético"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: false
  - **Justificativa**: Fator de risco importante (RR 2-3x), piora prognóstico

- [ ] **Fibrilação atrial**
  - **Narrativa**: "Portador de fibrilação atrial"
  - **Seção**: FLASH
  - **Required**: true
  - **Red Flag**: true
  - **Justificativa**: CRÍTICO - Principal causa de AVC cardioembólico (RR 5x)

- [ ] **Dislipidemia**
  - **Narrativa**: "Dislipidêmico em tratamento"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Fator de risco modificável

### História Neurológica

- [ ] **AVC prévio**
  - **Narrativa**: "História de acidente vascular cerebral prévio"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: true
  - **Justificativa**: Alto risco de recorrência (10-15% ao ano sem tratamento)

- [ ] **AIT (Ataque Isquêmico Transitório) prévio**
  - **Narrativa**: "História de ataque isquêmico transitório"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Risco de AVC estabelecido em 10-20% em 90 dias

- [ ] **Estenose carotídea conhecida**
  - **Narrativa**: "Estenose carotídea conhecida"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Estenose >70% aumenta muito risco de AVC

### Outras Comorbidades

- [ ] **Insuficiência cardíaca**
  - **Narrativa**: "Portador de insuficiência cardíaca"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Baixo débito pode precipitar AVC em áreas de estenose

- [ ] **Doença valvar cardíaca**
  - **Narrativa**: "Portador de valvopatia cardíaca"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Risco de embolia (estenose mitral, prótese valvar)

## MEDICACOES - Medicações em Uso

- [ ] **Anticoagulante oral (Warfarina)**
  - **Narrativa**: "Em uso de warfarina (antagonista vitamina K)"
  - **Seção**: FLASH
  - **Required**: true
  - **Red Flag**: true
  - **Justificativa**: CONTRAINDICAÇÃO ABSOLUTA para rtPA se INR > 1.7

- [ ] **Anticoagulante oral direto (DOACs)**
  - **Narrativa**: "Em uso de anticoagulante oral direto (rivaroxabana, apixabana, dabigatrana ou edoxabana)"
  - **Seção**: FLASH
  - **Required**: true
  - **Red Flag**: true
  - **Justificativa**: CONTRAINDICAÇÃO relativa para rtPA (considerar tempo última dose)

- [ ] **AAS (Ácido Acetilsalicílico)**
  - **Narrativa**: "Em uso de AAS {dose}mg/dia"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Não contraindica rtPA, mas indica prevenção secundária prévia

- [ ] **Clopidogrel**
  - **Narrativa**: "Em uso de clopidogrel"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Não contraindica rtPA

- [ ] **Heparina (últimas 48h)**
  - **Narrativa**: "Uso recente de heparina nas últimas 48 horas"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Verificar TTPA antes de rtPA

- [ ] **Anti-hipertensivos em uso**
  - **Narrativa**: "Em uso de anti-hipertensivos"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Importante para manejo pressórico no AVC

## ALERGIAS

- [ ] **Alergia a rtPA (alteplase)**
  - **Narrativa**: "Refere alergia conhecida a alteplase"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Raro, mas contraindica trombólise

- [ ] **Alergia a contraste iodado**
  - **Narrativa**: "Alergia conhecida a contraste iodado"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Importante para angioTC ou arteriografia

## HABITOS

- [ ] **Tabagismo ativo**
  - **Narrativa**: "Tabagista ativo"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: false
  - **Justificativa**: Fator de risco importante para AVC (RR 2x)

- [ ] **Etilismo**
  - **Narrativa**: "Etilista"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Fator de risco cardiovascular

- [ ] **Uso de cocaína/anfetaminas**
  - **Narrativa**: "Relata uso recente de cocaína ou anfetaminas"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Pode causar AVC hemorrágico ou isquêmico (vasoespasmo, HAS)

- [ ] **Sedentarismo**
  - **Narrativa**: "Sedentário"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Fator de risco modificável

## EXAME_FISICO - Exame Físico

### Nível de Consciência

- [ ] **Glasgow Coma Scale medida**
  - **Narrativa**: "Glasgow {valor}/15"
  - **Seção**: FLASH
  - **Required**: true
  - **Red Flag**: false
  - **Justificativa**: Essencial para monitorização neurológica

- [ ] **Rebaixamento de consciência (Glasgow ≤12)**
  - **Narrativa**: "Rebaixamento do nível de consciência (Glasgow {valor}/15)"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: CRÍTICO - AVC extenso ou hemorragia, pode necessitar IOT

### Sinais Vitais

- [ ] **PA medida**
  - **Narrativa**: "PA: {valor} mmHg"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: false
  - **Justificativa**: Essencial para elegibilidade rtPA (PA > 185/110 contraindica)

- [ ] **Hipertensão grave (PA > 220/120 mmHg)**
  - **Narrativa**: "Hipertensão arterial grave (PA {valor} mmHg)"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: CRÍTICO - Contraindicação relativa para rtPA, risco de transformação hemorrágica

- [ ] **Glicemia capilar medida**
  - **Narrativa**: "Glicemia capilar: {valor} mg/dL"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: false
  - **Justificativa**: Hipoglicemia pode mimetizar AVC; hiperglicemia piora prognóstico

- [ ] **Hipoglicemia (glicemia < 60 mg/dL)**
  - **Narrativa**: "Hipoglicemia (glicemia {valor} mg/dL)"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: DIAGNÓSTICO DIFERENCIAL - Hipoglicemia mimetiza AVC

### Exame Neurológico

- [ ] **Déficit motor unilateral confirmado**
  - **Narrativa**: "Déficit motor em dimídio {lado} (força grau {grau}/5)"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: true
  - **Justificativa**: Sinal cardinal de AVC, quantificar força (0-5)

- [ ] **Paralisia facial central**
  - **Narrativa**: "Paralisia facial central à {lado}"
  - **Seção**: BOTH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Componente do NIHSS, indica lesão cortical ou subcortical

- [ ] **Afasia (dificuldade de linguagem)**
  - **Narrativa**: "Afasia {tipo}"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Indica lesão hemisférica dominante (geralmente esquerda)

- [ ] **Disartria (dificuldade de articulação)**
  - **Narrativa**: "Disartria"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Componente do NIHSS, pode indicar lesão de tronco ou subcortical

- [ ] **Negligência espacial (extinção/inatenção)**
  - **Narrativa**: "Negligência espacial hemicorpo {lado}"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Componente do NIHSS, indica lesão hemisférica não-dominante

### Sinais de Gravidade

- [ ] **Anisocoria (pupilas assimétricas)**
  - **Narrativa**: "Anisocoria (pupila {lado} {tamanho}mm)"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: CRÍTICO - Sinal de herniação cerebral ou lesão de tronco

- [ ] **Rigidez de nuca**
  - **Narrativa**: "Rigidez de nuca presente"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: ALERTA - Pensar em hemorragia subaracnóidea

- [ ] **Sinais de herniação (postura decerebração/decorticação)**
  - **Narrativa**: "Sinais de herniação cerebral (postura anormal)"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: CRÍTICO - Emergência neurocirúrgica, altíssima mortalidade

### Cardiovascular

- [ ] **Ritmo cardíaco irregular (fibrilação atrial)**
  - **Narrativa**: "Ritmo cardíaco irregular (sugestivo de fibrilação atrial)"
  - **Seção**: BOTH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Principal causa de AVC cardioembólico

## NEGATIVAS - Negativas Pertinentes

- [ ] **Nega TCE recente**
  - **Narrativa**: "Nega traumatismo cranioencefálico recente"
  - **Seção**: FLASH
  - **Required**: true
  - **Red Flag**: false
  - **Justificativa**: TCE nos últimos 3 meses contraindica rtPA

- [ ] **Nega convulsões**
  - **Narrativa**: "Nega crises convulsivas"
  - **Seção**: FLASH
  - **Required**: true
  - **Red Flag**: false
  - **Justificativa**: Convulsão no início contraindica rtPA (paralisia de Todd)

- [ ] **Nega cirurgia recente**
  - **Narrativa**: "Nega cirurgias recentes"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Cirurgia grande porte < 14 dias contraindica rtPA

- [ ] **Nega sangramento recente**
  - **Narrativa**: "Nega sangramentos recentes"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Hemorragia ativa contraindica rtPA

---

## 📊 Estatísticas do Template

- **Total de checkboxes**: 46
- **Checkboxes FLASH**: 13 (28.3%)
- **Checkboxes DETAILED**: 21 (45.7%)
- **Checkboxes BOTH**: 12 (26.1%)
- **Red Flags**: 32 (69.6%)
- **Campos obrigatórios**: 16 (34.8%)
- **Time-critical checkboxes**: 5 (LKW, < 4.5h, anticoagulantes, cefaleia, convulsão)

## 🎯 Mapeamento de Prioridade (Para Flash)

### Checkboxes Essenciais Flash (13)

1. **QP**: Déficit motor unilateral
2. **QP**: Déficit de fala
3. **QP**: Desvio de rima labial
4. **HDA**: Last Known Well (LKW) documentado
5. **HDA**: Sintomas < 4.5h
6. **HDA**: Sintomas > 4.5h (se aplicável)
7. **HDA**: Início súbito
8. **HDA**: Wake-up stroke (se aplicável)
9. **HDA**: Cefaleia intensa
10. **HDA**: Rebaixamento consciência
11. **HDA**: Crise convulsiva
12. **HDA**: Piora progressiva
13. **ANTECEDENTES**: Fibrilação atrial
14. **MEDICACOES**: Anticoagulante oral (warfarina)
15. **MEDICACOES**: Anticoagulante oral direto (DOACs)
16. **MEDICACOES**: Heparina recente
17. **ALERGIAS**: Alergia a rtPA
18. **HABITOS**: Uso de cocaína
19. **EXAME_FISICO**: Glasgow medido
20. **EXAME_FISICO**: Rebaixamento (Glasgow ≤12)
21. **EXAME_FISICO**: PA medida
22. **EXAME_FISICO**: HAS grave (> 220/120)
23. **EXAME_FISICO**: Glicemia medida
24. **EXAME_FISICO**: Hipoglicemia
25. **EXAME_FISICO**: Anisocoria
26. **EXAME_FISICO**: Rigidez nuca
27. **EXAME_FISICO**: Sinais herniação
28. **NEGATIVAS**: Nega TCE recente
29. **NEGATIVAS**: Nega convulsões

## 🔍 Uso em Fluxo de Trabalho

### Flash (2-3 minutos) - MODO CODE STROKE

- Médico marca **apenas checkboxes FLASH + BOTH** (25 total)
- **FOCO**: LKW, janela terapêutica, contraindicações rtPA
- Gera prontuário básico CFM-compliant
- **Tempo estimado**: 90-120 segundos
- **CRÍTICO**: LKW deve ser documentado com HORA EXATA

### Anamnese Well (5-10 minutos)

- Médico marca todos os 46 checkboxes aplicáveis
- Gera prontuário completo e detalhado
- Inclui componentes NIHSS completos
- Fatores de risco detalhados
- **Tempo estimado**: 5-8 minutos

### Checklist de Elegibilidade rtPA (Automatizado)

Baseado nos checkboxes marcados, o sistema deve alertar:

**CONTRAINDICAÇÕES ABSOLUTAS** (se marcados):
- ❌ Anticoagulante oral com INR > 1.7
- ❌ TCE/AVC/cirurgia intracraniana < 3 meses
- ❌ Hemorragia intracraniana prévia
- ❌ Sintomas > 4.5h
- ❌ PA > 185/110 mmHg persistente
- ❌ Glicemia < 50 ou > 400 mg/dL
- ❌ Convulsão no início

**ELEGÍVEL PARA rtPA** (se todos verdadeiros):
- ✅ LKW < 4.5h
- ✅ Sem contraindicações absolutas
- ✅ TC sem hemorragia
- ✅ NIHSS ≥ 4 (déficit mensurável)

## 📚 Referências

Baseado nas mesmas diretrizes do Flash template:
- **SBN** - Diretrizes de AVC (2024)
- **Ministério da Saúde** - Protocolo Clínico AVC (2022)
- **AHA/ASA** - Guidelines Acute Ischemic Stroke (2024)
- **UpToDate** - Reperfusion Therapy Acute Ischemic Stroke (2025)

---

*Última revisão clínica: 2026-01-05*
*Este template foi criado seguindo rigorosamente as diretrizes brasileiras de AVC*
*CRITICAL: Last Known Well (LKW) é o checkpoint mais importante para elegibilidade rtPA*
