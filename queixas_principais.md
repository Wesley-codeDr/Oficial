# Queixas Principais

Documento gerado a partir de `lib/data/complaintsData.ts`.

## 📝 Sincronização com Obsidian

Este documento está sincronizado com o Obsidian vault para facilitar consultas e referências.

**Vault**: `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/CODE/WesleyWillianCode/WellWave/`

**Arquivos relacionados**:
- [Índice Principal](obsidian://open?vault=WesleyWillianCode&file=WellWave/00-INDEX)
- [Flash Anamnesis](obsidian://open?vault=WesleyWillianCode&file=WellWave/01-Flash-Anamnesis/INDEX)
- [Anamnese Completa](obsidian://open?vault=WesleyWillianCode&file=WellWave/02-Anamnese-Completa/INDEX)
- [Referências MBE](obsidian://open?vault=WesleyWillianCode&file=WellWave/03-Referencias-MBE/INDEX)

Para mais detalhes sobre a sincronização, veja [`docs/OBSIDIAN_SYNC.md`](./docs/OBSIDIAN_SYNC.md).

## Grupos de Queixas

| Código | Nome | Descrição | Ícone |
|---|---|---|---|
| **PROTO_SEPSE** | Sepse / Choque | Reconhecimento precoce, qSOFA e Bundles de 1h. | Biohazard |
| **PROTO_AVC** | AVC Agudo | Protocolo AVC, escala NIHSS e janela trombolítica. | Brain |
| **PROTO_IC** | IC Descompensada | Perfil hemodinâmico (Stevenson) e manejo de congestão. | HeartPulse |
| **PROTO_TEP** | Tromboembolismo | Estratificação de risco (Wells/Geneva) e conduta no TEP. | Wind |
| **CV** | Peito / Coração | Dor no peito, palpitações, desmaio, pressão alta. | HeartPulse |
| **RC** | Respiração | Falta de ar, tosse, chiado, engasgo. | Wind |
| **NC** | Neuro / Cabeça | Desmaio, convulsão, dor de cabeça, confusão. | Brain |
| **GI** | Digestivo | Dor na barriga, vômito, diarreia, sangramento. | Utensils |
| **GU** | Urinário / Renal | Dor ao urinar, dor nos rins, secreção. | Droplets |
| **MSK** | Osteomuscular | Dor lombar, dores musculares, fraturas. | Bone |
| **INF** | Febre / Infecção | Febre isolada ou com sintomas gerais. | Thermometer |
| **OBG** | Ginecologia | Gestação, dor pélvica, sangramento vaginal. | Baby |
| **PED** | Pediatria | Queixas específicas de bebês e crianças. | Baby |
| **PSI** | Saúde Mental | Ansiedade, agitação, ideias suicidas. | BrainCircuit |
| **TR** | Trauma | Quedas, acidentes, cortes, pancadas. | Siren |
| **TOX** | Intoxicação | Overdose, ingestão de produtos, venenos. | Biohazard |
| **DERM** | Pele | Manchas, alergias, queimaduras, picadas. | Hand |
| **ORL** | Ouvido / Garganta | Dor de ouvido, garganta, nariz, dente. | Ear |
| **OFT** | Olhos | Olho vermelho, dor, perda de visão. | Eye |
| **ENV** | Exposição | Químicos, calor, frio, fumaça. | Sun |
| **GEN** | Geral / Adm | Mal-estar inespecífico, receitas, atestados. | MoreHorizontal |

## Queixas Detalhadas

### CV - Peito / Coração

- **Dor no peito em aperto** (`CV_CHEST_PAIN_TYPICAL`)
  - *Subtítulo*: Pode ser problema no coração
  - *Risco*: Alto
  - *Termos de busca*: dor no peito em aperto, aperto no peito, peso no peito, dor no peito ao esforço, dor no peito que irradia, dor precordial
  - *Sinônimos*: iam, infarto, angina, síndrome coronariana aguda, sca

- **Dor no peito em pontada** (`CV_CHEST_PAIN_ATYPICAL`)
  - *Subtítulo*: Dor localizada ou que piora ao mexer ou respirar
  - *Risco*: Médio
  - *Termos de busca*: dor no peito em pontada, fisgada no peito, dor no peito ao respirar, dor no peito ao mexer, dor costocondral
  - *Sinônimos*: fisgada, dor pleurítica, dor musculoesquelética, síndrome de Tietze

- **Desmaio ou quase desmaio** (`CV_SYNCOPE`)
  - *Subtítulo*: Apagão, queda súbita, perda de consciência
  - *Risco*: Alto
  - *Termos de busca*: desmaio, apagão, escureceu a visão, quase desmaiou, caiu duro
  - *Sinônimos*: síncope, perda de consciência, desvanecimento, colapso

- **Coração disparado** (`CV_PALPITATIONS`)
  - *Subtítulo*: Palpitações ou batimentos fortes
  - *Risco*: Médio
  - *Termos de busca*: coração disparado, coração acelerado, batimentos fortes, batedeira no peito
  - *Sinônimos*: taquicardia, arritmia, batimento irregular, coração acelerado

### RC - Respiração

- **Falta de ar importante** (`RC_DYSPNEA_ACUTE`)
  - *Subtítulo*: Dificuldade para respirar de início recente
  - *Risco*: Alto
  - *Termos de busca*: falta de ar súbita, respiração difícil, cansaço ao respirar
  - *Sinônimos*: dispneia, insuficiência respiratória, apneia, sufoco

- **Tosse** (`RC_COUGH`)
  - *Subtítulo*: Tosse seca ou com catarro
  - *Risco*: Baixo
  - *Termos de busca*: tossindo, tosse forte, tosse noturna
  - *Sinônimos*: tussis, tossir, tosse seca, tosse úmida

### NC - Neuro / Cabeça

- **Suspeita de AVC** (`NC_STROKE_ACUTE`)
  - *Subtítulo*: Fraqueza, fala enrolada, desvio da boca
  - *Risco*: Alto
  - *Termos de busca*: suspeita de avc, derrame, ictus
  - *Sinônimos*: acidente vascular cerebral, derrame cerebral, infarto cerebral, ictus

- **Crise convulsiva** (`NC_SEIZURE`)
  - *Subtítulo*: Movimentos involuntários, perda de consciência
  - *Risco*: Alto
  - *Termos de busca*: crise convulsiva, epilepsia, ataque epiléptico
  - *Sinônimos*: crise convulsiva, epilepsia, crise epiléptica, ataque

### PSI - Saúde Mental

- **Crise de ansiedade / pânico** (`PSI_PANIC_ATTACK`)
  - *Subtítulo*: Coração acelerado, falta de ar, sensação de morte
  - *Risco*: Médio
  - *Termos de busca*: crise de ansiedade, ataque de pânico, sensação de morte iminente
  - *Sinônimos*: ataque de pânico, crise de ansiedade, ansiedade paroxística

### GEN - Geral / Adm

- **Passando mal (sem foco definido)** (`GEN_UNWELL_UNSPEC`)
  - *Subtítulo*: Mal-estar geral sem sintoma principal claro
  - *Risco*: Médio
  - *Termos de busca*: mal-estar, indisposto, fraqueza
  - *Sinônimos*: mal-estar, indisposição, malaise
