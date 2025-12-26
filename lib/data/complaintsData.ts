export const complaintsData = {
  version: 'frontend-1.0',
  locale: 'pt-BR',
  groups: [],
  complaints: [
    {
        id: "RC_DYSPNEA_ACUTE",
        group: "RC",
        title: "Falta de ar importante",
        subtitle: "Dificuldade para respirar de início recente",
        ageTargets: [
            "adult"
        ],
        riskLevel: "high",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: false,
        chips: [],
        searchTerms: [],
        synonyms: [
            "dispneia",
            "insuficiência respiratória",
            "apneia",
            "sufoco"
        ],
        relatedSymptoms: [
            "Tosse",
            "Dor no peito",
            "Fadiga",
            "Cianose"
        ],
        bodySystem: [],
        severity: 1,
        commonMisconceptions: [],
        icd10Codes: [
            "R06.0",
            "R06.02"
        ],
        searchWeight: 1,
        lastSync: "2025-12-25T17:05:30.738Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [
                "SpO2 < 90% em ar ambiente",
                "Uso de musculatura acessória",
                "Fala entrecortada",
                "Cianose",
                "Alteração do nível de consciência",
                "Sudorese",
                "Ortopneia / DPN",
                "Stridor",
                "Hemoptise"
            ],
            diagnosticoDiferencial: [],
            condutaInicial: "1. **ABC** - Via aérea, respiração, circulação\n2. **Oximetria** - Suplementar O2 se SpO2 < 92%\n3. **Acesso venoso**\n4. **Monitorização** - ECG contínuo\n5. **Anamnese rápida**:\n   - Início (súbito vs gradual)\n   - Fatores de risco para TEP\n   - História de asma/DPOC/IC\n   - Medicações\n6. **Exame físico**:\n   - Ausculta pulmonar (sibilos, estertores, MV abolido)\n   - Sinais de congestão (turgência jugular, edema)\n   - Sinais de TVP\n7. **Exames**:\n   - ECG\n   - RX de tórax\n   - Gasometria arterial\n   - D-dímero (se suspeita de TEP)\n   - BNP (se suspeita de IC)",
            calculadoras: [
                "**Wells Score** - Probabilidade de TEP",
                "**PERC** - Exclusão de TEP",
                "**CURB-65** - Gravidade de pneumonia",
                "**Peak Flow** - Se asma"
            ],
            referencias: [],
            rawMarkdown: "\n# Falta de ar importante\n\n> Dificuldade para respirar de início recente\n\n## Informações Gerais\n\n- **Código**: `RC_DYSPNEA_ACUTE`\n- **Grupo**: [[RC - Respiratório/_índice|RC - Respiração]]\n- **Nível de Risco**: 🔴 Alto\n- **Severidade**: 5/5\n- **Fast Track**: Não\n\n### Público-Alvo\n- Adultos\n- Idosos\n\n## Sintomas Relacionados\n\n- Tosse\n- Dor no peito\n- Fadiga\n- Cianose\n\n## Red Flags\n\n- SpO2 < 90% em ar ambiente\n- Uso de musculatura acessória\n- Fala entrecortada\n- Cianose\n- Alteração do nível de consciência\n- Sudorese\n- Ortopneia / DPN\n- Stridor\n- Hemoptise\n\n## Diagnóstico Diferencial\n\n### Pulmonar\n- Pneumonia\n- Asma aguda / DPOC exacerbado\n- Pneumotórax\n- Derrame pleural\n- TEP\n\n### Cardíaco\n- IC descompensada / EAP\n- Síndrome coronariana aguda\n- Tamponamento cardíaco\n\n### Vias Aéreas\n- Corpo estranho\n- Anafilaxia\n- Angioedema\n\n### Outros\n- Acidose metabólica\n- Anemia grave\n- Ansiedade / Hiperventilação\n\n## Calculadoras Recomendadas\n\n- **Wells Score** - Probabilidade de TEP\n- **PERC** - Exclusão de TEP\n- **CURB-65** - Gravidade de pneumonia\n- **Peak Flow** - Se asma\n\n## Conduta Inicial\n\n1. **ABC** - Via aérea, respiração, circulação\n2. **Oximetria** - Suplementar O2 se SpO2 < 92%\n3. **Acesso venoso**\n4. **Monitorização** - ECG contínuo\n5. **Anamnese rápida**:\n   - Início (súbito vs gradual)\n   - Fatores de risco para TEP\n   - História de asma/DPOC/IC\n   - Medicações\n6. **Exame físico**:\n   - Ausculta pulmonar (sibilos, estertores, MV abolido)\n   - Sinais de congestão (turgência jugular, edema)\n   - Sinais de TVP\n7. **Exames**:\n   - ECG\n   - RX de tórax\n   - Gasometria arterial\n   - D-dímero (se suspeita de TEP)\n   - BNP (se suspeita de IC)\n\n## Fluxograma por Suspeita\n\n### Suspeita de TEP\n→ [[PROTO_TEP]]\n\n### Suspeita de IC\n→ [[PROTO_IC]]\n\n### Asma/DPOC\n- Beta-2 agonista inalatório\n- Corticoide sistêmico\n- Anticolinérgico se necessário\n\n### Pneumonia\n- Antibioticoterapia empírica\n- Estratificar com CURB-65\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| R06.0 | Dispneia |\n| R06.02 | Falta de ar |\n\n## Termos de Busca\n\n`falta de ar súbita` `respiração difícil` `cansaço ao respirar`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Asma\"\n- \"Pneumonia\"\n- \"Problema nos pulmões\"\n\n## Links Relacionados\n\n- [[RC - Respiratório/_índice|Grupo RC - Respiratório]]\n- [[RC_COUGH]] - Tosse\n- [[PROTO_TEP]] - Protocolo TEP\n- [[PROTO_IC]] - Protocolo IC\n- [[CV_CHEST_PAIN_TYPICAL]] - Dor no peito\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
        }
    },
    {
        id: "RC_COUGH",
        group: "RC",
        title: "Tosse",
        subtitle: "Tosse seca ou com catarro",
        ageTargets: [
            "adult"
        ],
        riskLevel: "low",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: false,
        chips: [],
        searchTerms: [],
        synonyms: [
            "tussis",
            "tossir",
            "tosse seca",
            "tosse úmida"
        ],
        relatedSymptoms: [
            "Congestão nasal",
            "Dor de garganta",
            "Febre",
            "Fadiga"
        ],
        bodySystem: [],
        severity: 1,
        commonMisconceptions: [],
        icd10Codes: [
            "R05.9"
        ],
        searchWeight: 1,
        lastSync: "2025-12-25T17:05:30.739Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [
                "Hemoptise (sangue na tosse)",
                "Febre alta > 38,5°C persistente",
                "Dispneia associada",
                "Dor torácica",
                "Perda de peso não intencional",
                "Tosse > 3 semanas (tosse crônica)",
                "Imunossupressão",
                "Contato com tuberculose"
            ],
            diagnosticoDiferencial: [],
            condutaInicial: "1. **Anamnese**:\n   - Duração da tosse\n   - Características (seca vs produtiva)\n   - Cor do escarro\n   - Sintomas associados\n   - Medicações (IECA?)\n   - Tabagismo\n   - Contatos\n2. **Exame físico**:\n   - Orofaringe\n   - Ausculta pulmonar\n   - Temperatura\n3. **Exames** (se indicado):\n   - RX de tórax se > 3 semanas ou red flags\n   - Hemograma se suspeita de infecção bacteriana",
            calculadoras: [
                "Avaliação clínica geralmente suficiente",
                "**CURB-65** - Se suspeita de pneumonia"
            ],
            referencias: [],
            rawMarkdown: "\n# Tosse\n\n> Tosse seca ou com catarro\n\n## Informações Gerais\n\n- **Código**: `RC_COUGH`\n- **Grupo**: [[RC - Respiratório/_índice|RC - Respiração]]\n- **Nível de Risco**: 🟢 Baixo\n- **Severidade**: 1/5\n- **Fast Track**: Sim\n\n### Público-Alvo\n- Adultos\n- Crianças\n\n## Sintomas Relacionados\n\n- Congestão nasal\n- Dor de garganta\n- Febre\n- Fadiga\n\n## Red Flags\n\n- Hemoptise (sangue na tosse)\n- Febre alta > 38,5°C persistente\n- Dispneia associada\n- Dor torácica\n- Perda de peso não intencional\n- Tosse > 3 semanas (tosse crônica)\n- Imunossupressão\n- Contato com tuberculose\n\n## Diagnóstico Diferencial\n\n### Tosse Aguda (< 3 semanas)\n- IVAS (resfriado comum)\n- Faringite\n- Traqueobronquite\n- Pneumonia\n- Sinusite aguda\n- COVID-19 / Influenza\n\n### Tosse Subaguda (3-8 semanas)\n- Tosse pós-infecciosa\n- Sinusite\n- Asma\n\n### Tosse Crônica (> 8 semanas)\n- Gotejamento pós-nasal\n- Asma / Tosse variante de asma\n- DRGE\n- IECA (medicamento)\n- DPOC\n- Tuberculose\n- Neoplasia\n\n## Calculadoras Recomendadas\n\n- Avaliação clínica geralmente suficiente\n- **CURB-65** - Se suspeita de pneumonia\n\n## Conduta Inicial\n\n1. **Anamnese**:\n   - Duração da tosse\n   - Características (seca vs produtiva)\n   - Cor do escarro\n   - Sintomas associados\n   - Medicações (IECA?)\n   - Tabagismo\n   - Contatos\n2. **Exame físico**:\n   - Orofaringe\n   - Ausculta pulmonar\n   - Temperatura\n3. **Exames** (se indicado):\n   - RX de tórax se > 3 semanas ou red flags\n   - Hemograma se suspeita de infecção bacteriana\n\n## Tratamento Sintomático\n\n### Tosse Seca\n- Mel (adultos e crianças > 1 ano)\n- Dextrometorfano (se muito incômoda)\n- Codeína (casos refratários, adultos)\n\n### Tosse Produtiva\n- Hidratação\n- Evitar antitussígenos\n- Acetilcisteína ou Ambroxol (benefício questionável)\n\n### IVAS\n- Tratamento de suporte\n- Analgésicos/antitérmicos se necessário\n- Orientações de alarme\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| R05.9 | Tosse, não especificada |\n\n## Termos de Busca\n\n`tossindo` `tosse forte` `tosse noturna`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Pneumonia\"\n- \"Tuberculose\"\n\n## Links Relacionados\n\n- [[RC - Respiratório/_índice|Grupo RC - Respiratório]]\n- [[RC_DYSPNEA_ACUTE]] - Falta de ar importante\n- [[INF - Infecção/_índice|Grupo INF - Febre/Infecção]]\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
        }
    },
    {
        id: "PSI_PANIC_ATTACK",
        group: "PSI",
        title: "Crise de ansiedade / pânico",
        subtitle: "Coração acelerado, falta de ar, sensação de morte",
        ageTargets: [
            "adult"
        ],
        riskLevel: "medium",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: false,
        chips: [],
        searchTerms: [],
        synonyms: [
            "ataque de pânico",
            "crise de ansiedade",
            "ansiedade paroxística"
        ],
        relatedSymptoms: [
            "Taquicardia",
            "Dispneia",
            "Tremor",
            "Sudorese"
        ],
        bodySystem: [],
        severity: 1,
        commonMisconceptions: [],
        icd10Codes: [
            "F41.0"
        ],
        searchWeight: 1,
        lastSync: "2025-12-25T17:05:30.739Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [
                "Descartar Causas Orgânicas",
                "Primeiro episódio (pode não ser pânico)",
                "Idade > 40 anos no primeiro episódio",
                "Dor torácica típica / fatores de risco CV",
                "Dispneia grave com hipoxemia",
                "Alteração de consciência",
                "Déficit neurológico",
                "Febre",
                "Uso de substâncias"
            ],
            diagnosticoDiferencial: [],
            condutaInicial: "",
            calculadoras: [],
            referencias: [],
            rawMarkdown: "\n# Crise de ansiedade / pânico\n\n> Coração acelerado, falta de ar, sensação de morte\n\n## Informações Gerais\n\n- **Código**: `PSI_PANIC_ATTACK`\n- **Grupo**: [[PSI - Saúde Mental/_índice|PSI - Saúde Mental]]\n- **Nível de Risco**: 🟡 Médio\n- **Severidade**: 3/5\n- **Fast Track**: Sim\n\n### Público-Alvo\n- Adultos\n- Adolescentes\n\n## Sintomas Relacionados\n\n- Taquicardia\n- Dispneia\n- Tremor\n- Sudorese\n\n## Sintomas do Ataque de Pânico (DSM-5)\n\nInício súbito de medo intenso com ≥ 4 dos sintomas:\n- [ ] Palpitações / taquicardia\n- [ ] Sudorese\n- [ ] Tremores\n- [ ] Falta de ar / sufocamento\n- [ ] Dor ou desconforto torácico\n- [ ] Náusea ou desconforto abdominal\n- [ ] Tontura / vertigem\n- [ ] Calafrios ou ondas de calor\n- [ ] Parestesias (formigamento)\n- [ ] Desrealização / despersonalização\n- [ ] Medo de perder o controle ou \"enlouquecer\"\n- [ ] Medo de morrer\n\n## Red Flags - Descartar Causas Orgânicas\n\n- Primeiro episódio (pode não ser pânico)\n- Idade > 40 anos no primeiro episódio\n- Dor torácica típica / fatores de risco CV\n- Dispneia grave com hipoxemia\n- Alteração de consciência\n- Déficit neurológico\n- Febre\n- Uso de substâncias\n\n## Diagnóstico Diferencial\n\n### Cardiovascular\n- Síndrome coronariana aguda\n- Arritmias\n- TEP\n\n### Respiratório\n- Asma\n- DPOC exacerbado\n\n### Endócrino\n- Hipertireoidismo\n- Feocromocitoma\n- Hipoglicemia\n\n### Neurológico\n- Crise convulsiva parcial\n- Vertigem\n\n### Psiquiátrico\n- Transtorno de pânico\n- TAG (Transtorno de Ansiedade Generalizada)\n- Fobia\n- TEPT\n- Uso de substâncias\n\n## Conduta Inicial\n\n### 1. Triagem e Avaliação\n- Sinais vitais completos\n- ECG (especialmente se dor torácica ou primeiro episódio)\n- Glicemia capilar\n- Oximetria\n\n### 2. Excluir Causas Orgânicas\nSe paciente jovem, sem fatores de risco, episódios prévios similares e exame normal → provável pânico\n\n### 3. Manejo da Crise\n\n**Não-farmacológico:**\n- Ambiente calmo e seguro\n- Reasseguramento\n- Técnica de respiração controlada:\n  - Inspirar por 4 segundos\n  - Segurar por 4 segundos\n  - Expirar por 6 segundos\n- Grounding (foco nos sentidos)\n\n**Farmacológico (se necessário):**\n- Alprazolam 0,5-1mg VO OU\n- Clonazepam 0,5-1mg VO OU\n- Diazepam 5-10mg VO\n\n### 4. Orientação de Alta\n- Explicar natureza benigna do pânico\n- Orientar sobre recorrência\n- Encaminhar para seguimento psiquiátrico/psicológico\n- Evitar benzodiazepínicos de uso contínuo (risco de dependência)\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| F41.0 | Transtorno de pânico |\n\n## Termos de Busca\n\n`crise de ansiedade` `ataque de pânico` `sensação de morte iminente`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Infarto\"\n- \"Loucura\"\n\n## Links Relacionados\n\n- [[PSI - Saúde Mental/_índice|Grupo PSI - Saúde Mental]]\n- [[CV_CHEST_PAIN_ATYPICAL]] - Dor no peito em pontada\n- [[CV_PALPITATIONS]] - Coração disparado\n- [[RC_DYSPNEA_ACUTE]] - Falta de ar importante\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
        }
    },
    {
        id: "TR_HEAD_INJURY",
        group: "TR",
        title: "Bateu a cabeça",
        subtitle: "Pode ter machucado o cérebro",
        ageTargets: [
            "adult"
        ],
        riskLevel: "high",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: false,
        chips: [],
        searchTerms: [],
        synonyms: [
            "bateu a cabeça",
            "pancada na cabeça",
            "trauma craniano",
            "tce",
            "queda com trauma"
        ],
        relatedSymptoms: [
            "Cefaleia pós-trauma",
            "Vômitos",
            "Tontura",
            "Confusão mental",
            "Perda de consciência",
            "Amnésia do evento"
        ],
        bodySystem: [],
        severity: 1,
        commonMisconceptions: [],
        icd10Codes: [
            "S06.9",
            "S00.9",
            "S09.9"
        ],
        searchWeight: 1,
        lastSync: "2025-12-25T17:05:30.739Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [
                "Perda de consciência > 5 minutos",
                "Amnésia > 30 minutos",
                "Glasgow < 15 em qualquer momento",
                "Convulsão pós-trauma",
                "Déficit neurológico focal",
                "Vômitos persistentes (>2 episódios)",
                "Sinais de fratura de base de crânio",
                "Uso de anticoagulantes",
                "Idade > 65 anos",
                "Mecanismo de alta energia"
            ],
            diagnosticoDiferencial: [
                "Concussão cerebral",
                "Contusão cerebral",
                "Hematoma epidural",
                "Hematoma subdural",
                "Hemorragia subaracnóidea traumática",
                "Fratura de crânio",
                "Lesão axonal difusa"
            ],
            condutaInicial: "1. **ABCDE** - Estabilização primária\n2. **Glasgow seriado** - A cada 30 min nas primeiras 2h\n3. **Imobilização cervical** - Se mecanismo de risco\n4. **TC de crânio** - Se critérios de Canadian/PECARN\n5. **Observação** - Mínimo 4-6h se TC não indicada\n6. **Orientações de alta** - Sinais de alarme para retorno\n7. **Neurocirurgia** - Se lesão com indicação cirúrgica",
            calculadoras: [
                "**Canadian CT Head Rule** - Indicação de TC em TCE leve",
                "**PECARN** - TC em trauma craniano pediátrico",
                "**New Orleans Criteria** - Indicação de TC"
            ],
            referencias: [],
            rawMarkdown: "\n# Bateu a cabeça\n\n> Pode ter machucado o cérebro\n\n## Informações Gerais\n\n- **Código**: `TR_HEAD_INJURY`\n- **Grupo**: [[TR - Trauma/_índice|TR - Trauma]]\n- **Nível de Risco**: 🔴 Alto\n- **Severidade**: 5/5\n- **Fast Track**: Não\n\n### Público-Alvo\n- Adultos\n- Crianças\n- Idosos\n\n## Sintomas Relacionados\n\n- Cefaleia pós-trauma\n- Vômitos\n- Tontura\n- Confusão mental\n- Perda de consciência\n- Amnésia do evento\n\n## Red Flags\n\n- Perda de consciência > 5 minutos\n- Amnésia > 30 minutos\n- Glasgow < 15 em qualquer momento\n- Convulsão pós-trauma\n- Déficit neurológico focal\n- Vômitos persistentes (>2 episódios)\n- Sinais de fratura de base de crânio\n- Uso de anticoagulantes\n- Idade > 65 anos\n- Mecanismo de alta energia\n\n## Diagnóstico Diferencial\n\n- Concussão cerebral\n- Contusão cerebral\n- Hematoma epidural\n- Hematoma subdural\n- Hemorragia subaracnóidea traumática\n- Fratura de crânio\n- Lesão axonal difusa\n\n## Calculadoras Recomendadas\n\n- **Canadian CT Head Rule** - Indicação de TC em TCE leve\n- **PECARN** - TC em trauma craniano pediátrico\n- **New Orleans Criteria** - Indicação de TC\n\n### Canadian CT Head Rule (Alto Risco)\n| Critério |\n|----------|\n| Glasgow < 15 após 2h |\n| Suspeita de fratura aberta/afundamento |\n| Sinais de fratura de base de crânio |\n| ≥ 2 episódios de vômito |\n| Idade ≥ 65 anos |\n\n### PECARN (Crianças < 2 anos)\n| Alto Risco - TC Indicada |\n|--------------------------|\n| Glasgow < 15 |\n| Alteração do estado mental |\n| Fratura de crânio palpável |\n\n## Conduta Inicial\n\n1. **ABCDE** - Estabilização primária\n2. **Glasgow seriado** - A cada 30 min nas primeiras 2h\n3. **Imobilização cervical** - Se mecanismo de risco\n4. **TC de crânio** - Se critérios de Canadian/PECARN\n5. **Observação** - Mínimo 4-6h se TC não indicada\n6. **Orientações de alta** - Sinais de alarme para retorno\n7. **Neurocirurgia** - Se lesão com indicação cirúrgica\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| S06.9 | Traumatismo intracraniano, não especificado |\n| S00.9 | Traumatismo superficial da cabeça, não especificado |\n| S09.9 | Traumatismo da cabeça, não especificado |\n\n## Termos de Busca\n\n`bateu a cabeça` `pancada na cabeça` `trauma craniano` `caiu e bateu a cabeça` `tce` `dor de cabeça após queda`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Foi só uma batidinha\"\n- \"Não desmaiou, então não é grave\"\n- \"Galo é bom, inchou pra fora\"\n\n## Links Relacionados\n\n- [[TR - Trauma/_índice|Grupo TR - Trauma]]\n- [[NC_STROKE_ACUTE]] - AVC\n- [[NC_SEIZURE]] - Convulsão\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
        }
    },
    {
        id: "TR_FRACTURE",
        group: "TR",
        title: "Suspeita de fratura",
        subtitle: "Pode ter quebrado o osso",
        ageTargets: [
            "adult"
        ],
        riskLevel: "medium",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: false,
        chips: [],
        searchTerms: [],
        synonyms: [
            "fratura",
            "osso quebrado",
            "quebrou o braço",
            "quebrou a perna",
            "trincou"
        ],
        relatedSymptoms: [
            "Dor intensa localizada",
            "Edema",
            "Deformidade",
            "Incapacidade funcional",
            "Crepitação",
            "Hematoma"
        ],
        bodySystem: [],
        severity: 1,
        commonMisconceptions: [],
        icd10Codes: [
            "T14.2",
            "S52.9",
            "S82.9"
        ],
        searchWeight: 1,
        lastSync: "2025-12-25T17:05:30.739Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [
                "Fratura exposta (osso visível)",
                "Deformidade grosseira",
                "Comprometimento vascular (pulso ausente, palidez)",
                "Comprometimento neurológico (parestesia, paralisia)",
                "Síndrome compartimental (dor desproporcional)",
                "Fratura de pelve (instabilidade hemodinâmica)",
                "Fratura de fêmur (perda sanguínea significativa)",
                "Fratura patológica (suspeita de tumor)"
            ],
            diagnosticoDiferencial: [
                "Fratura completa",
                "Fratura incompleta (fissura)",
                "Luxação",
                "Entorse grave",
                "Contusão óssea",
                "Fratura por estresse",
                "Lesão ligamentar"
            ],
            condutaInicial: "1. **Imobilização** - Tala provisória, não forçar alinhamento\n2. **Analgesia** - Dipirona, anti-inflamatórios, opioides se necessário\n3. **Gelo** - 20 min a cada hora\n4. **Elevação** - Acima do nível do coração\n5. **Radiografia** - Duas incidências mínimo\n6. **Avaliar neurovascular** - Pulso, sensibilidade, motricidade distal\n7. **Ortopedia** - Se fratura confirmada ou suspeita alta\n8. **Redução** - Se indicada, sob analgesia adequada",
            calculadoras: [
                "**Ottawa Ankle Rules** - Indicação de RX em tornozelo",
                "**Ottawa Knee Rules** - Indicação de RX em joelho",
                "**Regras de Pittsburgh** - RX em joelho"
            ],
            referencias: [],
            rawMarkdown: "\n# Suspeita de fratura\n\n> Pode ter quebrado o osso\n\n## Informações Gerais\n\n- **Código**: `TR_FRACTURE`\n- **Grupo**: [[TR - Trauma/_índice|TR - Trauma]]\n- **Nível de Risco**: 🟡 Médio\n- **Severidade**: 3/5\n- **Fast Track**: Depende da localização\n\n### Público-Alvo\n- Adultos\n- Crianças\n- Idosos\n\n## Sintomas Relacionados\n\n- Dor intensa localizada\n- Edema\n- Deformidade\n- Incapacidade funcional\n- Crepitação\n- Hematoma\n\n## Red Flags\n\n- Fratura exposta (osso visível)\n- Deformidade grosseira\n- Comprometimento vascular (pulso ausente, palidez)\n- Comprometimento neurológico (parestesia, paralisia)\n- Síndrome compartimental (dor desproporcional)\n- Fratura de pelve (instabilidade hemodinâmica)\n- Fratura de fêmur (perda sanguínea significativa)\n- Fratura patológica (suspeita de tumor)\n\n## Diagnóstico Diferencial\n\n- Fratura completa\n- Fratura incompleta (fissura)\n- Luxação\n- Entorse grave\n- Contusão óssea\n- Fratura por estresse\n- Lesão ligamentar\n\n## Calculadoras Recomendadas\n\n- **Ottawa Ankle Rules** - Indicação de RX em tornozelo\n- **Ottawa Knee Rules** - Indicação de RX em joelho\n- **Regras de Pittsburgh** - RX em joelho\n\n### Ottawa Ankle Rules\n| Indicação de RX |\n|-----------------|\n| Dor em maléolo + incapaz andar 4 passos |\n| Dor em maléolo + dor à palpação óssea posterior (6cm) |\n| Dor no médiopé + incapaz andar 4 passos |\n| Dor à palpação do navicular ou base do 5º MT |\n\n## Conduta Inicial\n\n1. **Imobilização** - Tala provisória, não forçar alinhamento\n2. **Analgesia** - Dipirona, anti-inflamatórios, opioides se necessário\n3. **Gelo** - 20 min a cada hora\n4. **Elevação** - Acima do nível do coração\n5. **Radiografia** - Duas incidências mínimo\n6. **Avaliar neurovascular** - Pulso, sensibilidade, motricidade distal\n7. **Ortopedia** - Se fratura confirmada ou suspeita alta\n8. **Redução** - Se indicada, sob analgesia adequada\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| T14.2 | Fratura de região não especificada do corpo |\n| S52.9 | Fratura de antebraço, não especificada |\n| S82.9 | Fratura da perna, não especificada |\n\n## Termos de Busca\n\n`fratura` `osso quebrado` `quebrou o braço` `quebrou a perna` `trincou o osso` `machucou o braço` `dor após queda`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Se mexe não está quebrado\"\n- \"Trincou, não quebrou\"\n- \"Só está inchado\"\n\n## Links Relacionados\n\n- [[TR - Trauma/_índice|Grupo TR - Trauma]]\n- [[TR_HEAD_INJURY]] - Trauma craniano\n- [[MSK_JOINT_PAIN]] - Dor articular\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
        }
    },
    {
        id: "NC_STROKE_ACUTE",
        group: "NC",
        title: "Suspeita de AVC",
        subtitle: "Fraqueza, fala enrolada, desvio da boca",
        ageTargets: [
            "adult"
        ],
        riskLevel: "high",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: false,
        chips: [],
        searchTerms: [],
        synonyms: [
            "acidente vascular cerebral",
            "derrame cerebral",
            "infarto cerebral",
            "ictus"
        ],
        relatedSymptoms: [
            "Dificuldade de fala",
            "Perda de visão",
            "Cefaleia intensa",
            "Confusão mental"
        ],
        bodySystem: [],
        severity: 1,
        commonMisconceptions: [],
        icd10Codes: [
            "I63.9",
            "I64"
        ],
        searchWeight: 1,
        lastSync: "2025-12-25T17:05:30.739Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [
                "TODOS SÃO RED FLAGS",
                "Déficit neurológico focal de início súbito",
                "Alteração da fala (disartria ou afasia)",
                "Fraqueza ou dormência unilateral",
                "Desvio de rima labial",
                "Alteração visual súbita",
                "Ataxia / Desequilíbrio",
                "Cefaleia súbita e intensa (\"a pior da vida\")",
                "Rebaixamento do nível de consciência"
            ],
            diagnosticoDiferencial: [],
            condutaInicial: "- TEMPO É CÉREBRO\n\n1. **Ativar Código Stroke** - Prioridade máxima\n2. **ABC** - Via aérea, respiração, circulação\n3. **Glicemia capilar** - Excluir hipoglicemia (mimic comum)\n4. **Hora do ictus** - Última vez visto normal\n5. **Acesso venoso** - Coleta de exames\n6. **TC de crânio** - Urgente, sem contraste\n7. **NIHSS** - Aplicar escala\n8. **Verificar critérios** - Trombólise / Trombectomia",
            calculadoras: [
                "**NIHSS** - Gravidade do AVC",
                "**ASPECTS** - Extensão do infarto na TC",
                "Veja detalhes em [[PROTO_AVC]]"
            ],
            referencias: [],
            rawMarkdown: "\n# Suspeita de AVC\n\n> Fraqueza, fala enrolada, desvio da boca\n\n## Informações Gerais\n\n- **Código**: `NC_STROKE_ACUTE`\n- **Grupo**: [[NC - Neurológico/_índice|NC - Neuro / Cabeça]]\n- **Nível de Risco**: 🔴 Alto\n- **Severidade**: 5/5\n- **Fast Track**: Não\n\n### Público-Alvo\n- Adultos\n- Idosos\n\n## Sintomas Relacionados\n\n- Dificuldade de fala\n- Perda de visão\n- Cefaleia intensa\n- Confusão mental\n\n## Red Flags - TODOS SÃO RED FLAGS\n\n- Déficit neurológico focal de início súbito\n- Alteração da fala (disartria ou afasia)\n- Fraqueza ou dormência unilateral\n- Desvio de rima labial\n- Alteração visual súbita\n- Ataxia / Desequilíbrio\n- Cefaleia súbita e intensa (\"a pior da vida\")\n- Rebaixamento do nível de consciência\n\n## FAST - Reconhecimento\n\n| Sinal | Avaliação |\n|-------|-----------|\n| **F**ace | Peça para sorrir - há desvio? |\n| **A**rms | Peça para levantar os braços - há queda? |\n| **S**peech | Peça para repetir frase - há alteração? |\n| **T**ime | Qual a hora do início? CRÍTICO! |\n\n## Diagnóstico Diferencial\n\n### Stroke Mimics\n- Hipoglicemia\n- Crise convulsiva (paralisia de Todd)\n- Enxaqueca com aura\n- Encefalopatia hepática\n- Tumor cerebral\n- Intoxicação\n- Transtorno conversivo\n\n### Tipos de AVC\n- AVC isquêmico (80%)\n- AVC hemorrágico (15%)\n- Hemorragia subaracnoidea (5%)\n\n## Calculadoras Recomendadas\n\n- **NIHSS** - Gravidade do AVC\n- **ASPECTS** - Extensão do infarto na TC\n- Veja detalhes em [[PROTO_AVC]]\n\n## Conduta Inicial - TEMPO É CÉREBRO\n\n1. **Ativar Código Stroke** - Prioridade máxima\n2. **ABC** - Via aérea, respiração, circulação\n3. **Glicemia capilar** - Excluir hipoglicemia (mimic comum)\n4. **Hora do ictus** - Última vez visto normal\n5. **Acesso venoso** - Coleta de exames\n6. **TC de crânio** - Urgente, sem contraste\n7. **NIHSS** - Aplicar escala\n8. **Verificar critérios** - Trombólise / Trombectomia\n\n### Metas de Tempo\n| Etapa | Meta |\n|-------|------|\n| Porta-médico | < 10 min |\n| Porta-TC | < 25 min |\n| Porta-agulha | < 60 min |\n\n## Janelas Terapêuticas\n\n| Tratamento | Janela |\n|------------|--------|\n| Trombólise IV | < 4,5 horas |\n| Trombectomia | < 6-24 horas |\n\n**→ Protocolo completo: [[PROTO_AVC]]**\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| I63.9 | Infarto cerebral, não especificado |\n| I64 | AVC não especificado como hemorrágico ou isquêmico |\n\n## Termos de Busca\n\n`suspeita de avc` `derrame` `ictus`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Derrame\"\n- \"Infarto\"\n- \"Trombose\"\n\n## Links Relacionados\n\n- [[NC - Neurológico/_índice|Grupo NC - Neurológico]]\n- [[PROTO_AVC]] - Protocolo AVC Completo\n- [[NC_SEIZURE]] - Crise convulsiva (DDx)\n- [[CV_SYNCOPE]] - Desmaio (DDx)\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
        }
    },
    {
        id: "NC_SEIZURE",
        group: "NC",
        title: "Crise convulsiva",
        subtitle: "Movimentos involuntários, perda de consciência",
        ageTargets: [
            "adult"
        ],
        riskLevel: "high",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: false,
        chips: [],
        searchTerms: [],
        synonyms: [
            "crise convulsiva",
            "epilepsia",
            "crise epiléptica",
            "ataque"
        ],
        relatedSymptoms: [
            "Perda de consciência",
            "Espuma na boca",
            "Incontinência urinária/fecal",
            "Confusão pós-ictal"
        ],
        bodySystem: [],
        severity: 1,
        commonMisconceptions: [],
        icd10Codes: [
            "R56.9",
            "G40.9"
        ],
        searchWeight: 1,
        lastSync: "2025-12-25T17:05:30.739Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [
                "Crise > 5 minutos (status epilepticus)",
                "Crises em salvas",
                "Não retorno ao nível de consciência basal",
                "Primeira crise na vida",
                "Trauma associado",
                "Febre (adulto)",
                "Gestante",
                "Déficit neurológico focal pós-ictal persistente",
                "Cefaleia intensa pós-crise",
                "Imunossupressão"
            ],
            diagnosticoDiferencial: [],
            condutaInicial: "",
            calculadoras: [
                "**Glasgow Coma Scale** - Nível de consciência",
                "Avaliação clínica é fundamental"
            ],
            referencias: [],
            rawMarkdown: "\n# Crise convulsiva\n\n> Movimentos involuntários, perda de consciência\n\n## Informações Gerais\n\n- **Código**: `NC_SEIZURE`\n- **Grupo**: [[NC - Neurológico/_índice|NC - Neuro / Cabeça]]\n- **Nível de Risco**: 🔴 Alto\n- **Severidade**: 5/5\n- **Fast Track**: Não\n\n### Público-Alvo\n- Adultos\n- Crianças\n- Adolescentes\n\n## Sintomas Relacionados\n\n- Perda de consciência\n- Espuma na boca\n- Incontinência urinária/fecal\n- Confusão pós-ictal\n\n## Red Flags\n\n- Crise > 5 minutos (status epilepticus)\n- Crises em salvas\n- Não retorno ao nível de consciência basal\n- Primeira crise na vida\n- Trauma associado\n- Febre (adulto)\n- Gestante\n- Déficit neurológico focal pós-ictal persistente\n- Cefaleia intensa pós-crise\n- Imunossupressão\n\n## Diagnóstico Diferencial\n\n### Epiléptico\n- Epilepsia conhecida\n- Primeira crise\n\n### Não-Epiléptico\n- Síncope convulsiva\n- Crise não-epiléptica psicogênica (CNEP)\n- Hipoglicemia\n- Intoxicação / Abstinência\n- Encefalopatia metabólica\n\n### Causas de Primeira Crise\n- Trauma cranioencefálico\n- AVC\n- Tumor cerebral\n- Infecção do SNC\n- Distúrbio metabólico\n- Abstinência alcoólica\n- Drogas / Medicamentos\n- Eclâmpsia (gestante)\n\n## Calculadoras Recomendadas\n\n- **Glasgow Coma Scale** - Nível de consciência\n- Avaliação clínica é fundamental\n\n## Conduta Durante a Crise\n\n1. **Proteger o paciente** - Afastar objetos, não conter\n2. **NÃO colocar objetos na boca**\n3. **Posição de segurança** - Decúbito lateral após cessar\n4. **Cronometrar** - Duração da crise\n5. **Observar** - Tipo de movimentos, lateralidade\n\n### Se crise > 5 minutos (Status Epilepticus)\n\n**Primeira linha:**\n- Diazepam 10mg IV/retal OU\n- Midazolam 10mg IM\n\n**Segunda linha (se persistir):**\n- Fenitoína 20 mg/kg IV (infusão lenta)\n\n**Terceira linha:**\n- UTI + Sedação contínua\n\n## Conduta Pós-Ictal\n\n1. **Avaliar consciência** - Glasgow, orientação\n2. **Glicemia capilar**\n3. **Exame neurológico** - Déficits focais?\n4. **Anamnese com acompanhante**:\n   - Descrição da crise\n   - Duração\n   - Pródromos (aura)\n   - Atividade antes da crise\n   - Medicações\n   - Uso de álcool/drogas\n   - Privação de sono\n5. **Exames**:\n   - Glicemia, eletrólitos, função renal\n   - Toxicológico se indicado\n   - TC de crânio (primeira crise, trauma, déficit focal)\n   - Punção lombar (se suspeita de infecção)\n\n## Primeira Crise - Quando Investigar\n\n- **TC de crânio**: Sempre na primeira crise\n- **EEG**: Ambulatorial, não emergencial\n- **RNM**: Se TC normal e alta suspeita de lesão estrutural\n- **PL**: Se febre ou suspeita de meningite/encefalite\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| R56.9 | Convulsões, não especificadas |\n| G40.9 | Epilepsia, não especificada |\n\n## Termos de Busca\n\n`crise convulsiva` `epilepsia` `ataque epiléptico`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Loucura\"\n- \"Possessão\"\n\n## Links Relacionados\n\n- [[NC - Neurológico/_índice|Grupo NC - Neurológico]]\n- [[NC_STROKE_ACUTE]] - Suspeita de AVC\n- [[CV_SYNCOPE]] - Desmaio (DDx)\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
        }
    },
    {
        id: "MSK_LOW_BACK_PAIN",
        group: "MSK",
        title: "Dor nas costas",
        subtitle: "Pode ser problema muscular ou de coluna",
        ageTargets: [
            "adult"
        ],
        riskLevel: "medium",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: false,
        chips: [],
        searchTerms: [],
        synonyms: [
            "dor nas costas",
            "lombalgia",
            "dor na coluna",
            "travou a coluna",
            "mau jeito"
        ],
        relatedSymptoms: [
            "Rigidez matinal",
            "Limitação de movimentos",
            "Irradiação para membros inferiores",
            "Parestesias",
            "Fraqueza muscular",
            "Claudicação"
        ],
        bodySystem: [],
        severity: 1,
        commonMisconceptions: [],
        icd10Codes: [
            "M54.5",
            "M54.4",
            "M51.1"
        ],
        searchWeight: 1,
        lastSync: "2025-12-25T17:05:30.739Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [
                "Idade < 20 ou > 55 anos (primeiro episódio)",
                "Trauma significativo",
                "Perda de peso inexplicada",
                "História de câncer",
                "Uso de corticoides prolongado",
                "Febre",
                "Déficit neurológico progressivo",
                "Síndrome da cauda equina (retenção urinária, anestesia em sela)",
                "Dor noturna que não melhora em repouso",
                "Imunossupressão"
            ],
            diagnosticoDiferencial: [
                "Lombalgia mecânica",
                "Hérnia de disco",
                "Estenose de canal",
                "Espondilolistese",
                "Fratura vertebral",
                "Espondilodiscite",
                "Tumor vertebral",
                "Cólica renal",
                "Aneurisma de aorta"
            ],
            condutaInicial: "1. **Excluir red flags** - Anamnese e exame físico cuidadosos\n2. **Analgesia escalonada** - Paracetamol → AINE → Opioide fraco\n3. **Relaxante muscular** - Ciclobenzaprina (curto prazo)\n4. **Orientar atividade** - Evitar repouso prolongado\n5. **Fisioterapia** - Se dor > 4 semanas\n6. **Imagem** - Apenas se red flags ou refratário > 6 sem\n7. **Encaminhamento** - Neurocirurgia se déficit motor",
            calculadoras: [
                "**STarT Back Tool** - Estratificação de risco",
                "**Oswestry Disability Index** - Incapacidade",
                "**Roland-Morris Questionnaire** - Função"
            ],
            referencias: [],
            rawMarkdown: "\n# Dor nas costas\n\n> Pode ser problema muscular ou de coluna\n\n## Informações Gerais\n\n- **Código**: `MSK_LOW_BACK_PAIN`\n- **Grupo**: [[MSK - Osteomuscular/_índice|MSK - Osteomuscular]]\n- **Nível de Risco**: 🟡 Médio\n- **Severidade**: 2/5\n- **Fast Track**: Sim (se sem red flags)\n\n### Público-Alvo\n- Adultos\n- Idosos\n\n## Sintomas Relacionados\n\n- Rigidez matinal\n- Limitação de movimentos\n- Irradiação para membros inferiores\n- Parestesias\n- Fraqueza muscular\n- Claudicação\n\n## Red Flags\n\n- Idade < 20 ou > 55 anos (primeiro episódio)\n- Trauma significativo\n- Perda de peso inexplicada\n- História de câncer\n- Uso de corticoides prolongado\n- Febre\n- Déficit neurológico progressivo\n- Síndrome da cauda equina (retenção urinária, anestesia em sela)\n- Dor noturna que não melhora em repouso\n- Imunossupressão\n\n## Diagnóstico Diferencial\n\n- Lombalgia mecânica\n- Hérnia de disco\n- Estenose de canal\n- Espondilolistese\n- Fratura vertebral\n- Espondilodiscite\n- Tumor vertebral\n- Cólica renal\n- Aneurisma de aorta\n\n## Calculadoras Recomendadas\n\n- **STarT Back Tool** - Estratificação de risco\n- **Oswestry Disability Index** - Incapacidade\n- **Roland-Morris Questionnaire** - Função\n\n### STarT Back Tool\n| Questão | Pontos |\n|---------|--------|\n| Dor irradiada para perna | 1 |\n| Dor em ombro ou pescoço | 1 |\n| Andar limitado pela dor | 1 |\n| Vestir-se mais devagar | 1 |\n| Medo de atividade física | 1 |\n| Pensamentos negativos | 1 |\n| Humor deprimido | 1 |\n| Preocupação com a dor | 1 |\n| Dor \"terrível\" | 1 |\n\n## Conduta Inicial\n\n1. **Excluir red flags** - Anamnese e exame físico cuidadosos\n2. **Analgesia escalonada** - Paracetamol → AINE → Opioide fraco\n3. **Relaxante muscular** - Ciclobenzaprina (curto prazo)\n4. **Orientar atividade** - Evitar repouso prolongado\n5. **Fisioterapia** - Se dor > 4 semanas\n6. **Imagem** - Apenas se red flags ou refratário > 6 sem\n7. **Encaminhamento** - Neurocirurgia se déficit motor\n\n### Quando NÃO pedir RX/RM\n| Critério |\n|----------|\n| Primeiro episódio < 6 semanas |\n| Sem red flags |\n| Sem déficit neurológico |\n| Melhora com tratamento conservador |\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| M54.5 | Dor lombar baixa |\n| M54.4 | Lumbago com ciática |\n| M51.1 | Transtornos de disco lombar com radiculopatia |\n\n## Termos de Busca\n\n`dor nas costas` `lombalgia` `travou a coluna` `dor na lombar` `mau jeito nas costas` `dor ciática`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Preciso de ressonância\"\n- \"Bico de papagaio\"\n- \"Nervo inflamado\"\n- \"Preciso operar\"\n\n## Links Relacionados\n\n- [[MSK - Osteomuscular/_índice|Grupo MSK - Osteomuscular]]\n- [[MSK_JOINT_PAIN]] - Dor articular\n- [[GU_RENAL_COLIC]] - Cólica renal\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
        }
    },
    {
        id: "MSK_JOINT_PAIN",
        group: "MSK",
        title: "Dor na articulação",
        subtitle: "Pode ser inflamação ou desgaste",
        ageTargets: [
            "adult"
        ],
        riskLevel: "medium",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: false,
        chips: [],
        searchTerms: [],
        synonyms: [
            "dor no joelho",
            "dor no ombro",
            "junta doendo",
            "artrite",
            "reumatismo"
        ],
        relatedSymptoms: [
            "Edema articular",
            "Calor local",
            "Rigidez",
            "Limitação de movimento",
            "Crepitação",
            "Deformidade"
        ],
        bodySystem: [],
        severity: 1,
        commonMisconceptions: [],
        icd10Codes: [
            "M25.5",
            "M13.9",
            "M06.9"
        ],
        searchWeight: 1,
        lastSync: "2025-12-25T17:05:30.739Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [
                "Monoartrite aguda + febre (artrite séptica)",
                "Trauma recente com derrame",
                "Sinais flogísticos intensos",
                "Múltiplas articulações + febre + rash",
                "Déficit neurovascular distal",
                "Imunossuprimido",
                "Uso de prótese articular",
                "Dor desproporcional + edema tenso (síndrome compartimental)"
            ],
            diagnosticoDiferencial: [
                "Osteoartrose",
                "Artrite reumatoide",
                "Gota / Pseudogota",
                "Artrite séptica",
                "Artrite reativa",
                "Bursite / Tendinite",
                "Lesão ligamentar",
                "Fratura oculta"
            ],
            condutaInicial: "1. **Identificar padrão** - Mono/oligo/poliarticular, agudo/crônico\n2. **Exame físico** - Sinais flogísticos, derrame, amplitude\n3. **Artrocentese** - Se derrame e suspeita de séptica/cristais\n4. **Analgesia** - AINE, paracetamol\n5. **Imobilização relativa** - Se inflamatório agudo\n6. **Exames** - Hemograma, VHS, PCR, ácido úrico\n7. **Imagem** - RX, USG articular\n8. **Reumatologia** - Se poliarticular ou autoimune",
            calculadoras: [
                "**Kocher Criteria** - Artrite séptica de quadril em crianças",
                "**WOMAC** - Osteoartrose de joelho/quadril"
            ],
            referencias: [],
            rawMarkdown: "\n# Dor na articulação\n\n> Pode ser inflamação ou desgaste\n\n## Informações Gerais\n\n- **Código**: `MSK_JOINT_PAIN`\n- **Grupo**: [[MSK - Osteomuscular/_índice|MSK - Osteomuscular]]\n- **Nível de Risco**: 🟡 Médio\n- **Severidade**: 2/5\n- **Fast Track**: Sim (se monoarticular sem sinais de alarme)\n\n### Público-Alvo\n- Adultos\n- Idosos\n\n## Sintomas Relacionados\n\n- Edema articular\n- Calor local\n- Rigidez\n- Limitação de movimento\n- Crepitação\n- Deformidade\n\n## Red Flags\n\n- Monoartrite aguda + febre (artrite séptica)\n- Trauma recente com derrame\n- Sinais flogísticos intensos\n- Múltiplas articulações + febre + rash\n- Déficit neurovascular distal\n- Imunossuprimido\n- Uso de prótese articular\n- Dor desproporcional + edema tenso (síndrome compartimental)\n\n## Diagnóstico Diferencial\n\n- Osteoartrose\n- Artrite reumatoide\n- Gota / Pseudogota\n- Artrite séptica\n- Artrite reativa\n- Bursite / Tendinite\n- Lesão ligamentar\n- Fratura oculta\n\n## Calculadoras Recomendadas\n\n- **Kocher Criteria** - Artrite séptica de quadril em crianças\n- **WOMAC** - Osteoartrose de joelho/quadril\n\n### Kocher Criteria (Artrite Séptica Pediátrica)\n| Critério | Pontos |\n|----------|--------|\n| Febre > 38.5°C | 1 |\n| Recusa de carga | 1 |\n| VHS > 40 | 1 |\n| Leucócitos > 12.000 | 1 |\n\n**Probabilidade de artrite séptica:**\n- 0 critérios: 0.2%\n- 4 critérios: 99.6%\n\n## Conduta Inicial\n\n1. **Identificar padrão** - Mono/oligo/poliarticular, agudo/crônico\n2. **Exame físico** - Sinais flogísticos, derrame, amplitude\n3. **Artrocentese** - Se derrame e suspeita de séptica/cristais\n4. **Analgesia** - AINE, paracetamol\n5. **Imobilização relativa** - Se inflamatório agudo\n6. **Exames** - Hemograma, VHS, PCR, ácido úrico\n7. **Imagem** - RX, USG articular\n8. **Reumatologia** - Se poliarticular ou autoimune\n\n### Análise do Líquido Sinovial\n| Característica | Normal | Inflamatório | Séptico |\n|----------------|--------|--------------|---------|\n| Aspecto | Claro | Turvo | Purulento |\n| Leucócitos/mm³ | < 200 | 2.000-50.000 | > 50.000 |\n| PMN | < 25% | > 50% | > 90% |\n| Cristais | - | Pode ter | Raro |\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| M25.5 | Dor articular |\n| M13.9 | Artrite não especificada |\n| M06.9 | Artrite reumatoide não especificada |\n\n## Termos de Busca\n\n`dor no joelho` `dor no ombro` `junta doendo` `artrite` `reumatismo` `dor nas juntas` `joelho inchado`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Reumatismo\"\n- \"Artrose é artrite\"\n- \"Precisa tirar líquido\"\n\n## Links Relacionados\n\n- [[MSK - Osteomuscular/_índice|Grupo MSK - Osteomuscular]]\n- [[MSK_LOW_BACK_PAIN]] - Lombalgia\n- [[INF_FEVER]] - Febre\n- [[TR_FRACTURE]] - Fratura\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
        }
    },
    {
        id: "GU_RENAL_COLIC",
        group: "GU",
        title: "Cólica renal",
        subtitle: "Pode ser pedra no rim",
        ageTargets: [
            "adult"
        ],
        riskLevel: "high",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: false,
        chips: [],
        searchTerms: [],
        synonyms: [
            "cólica renal",
            "pedra no rim",
            "cálculo renal",
            "dor nos rins",
            "nefrolitíase"
        ],
        relatedSymptoms: [
            "Dor lombar intensa em cólica",
            "Irradiação para flanco e região inguinal",
            "Hematúria",
            "Náusea e vômitos",
            "Inquietação (não consegue ficar parado)",
            "Disúria"
        ],
        bodySystem: [],
        severity: 1,
        commonMisconceptions: [],
        icd10Codes: [
            "N23",
            "N20.0",
            "R10.2"
        ],
        searchWeight: 1,
        lastSync: "2025-12-25T17:05:30.739Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [
                "Febre (obstrução infectada = emergência)",
                "Rim único",
                "Anúria (obstrução bilateral)",
                "Insuficiência renal aguda",
                "Sepse urinária",
                "Dor refratária a analgesia",
                "Gestante"
            ],
            diagnosticoDiferencial: [
                "Cólica nefrética por cálculo",
                "Pielonefrite",
                "Aneurisma de aorta (idoso)",
                "Apendicite",
                "Torção de ovário",
                "Diverticulite",
                "Hérnia de disco lombar",
                "Infarto renal"
            ],
            condutaInicial: "1. **Analgesia potente** - Dipirona IV + Anti-inflamatório (cetorolaco)\n2. **Antiespasmódico** - Hioscina\n3. **Hidratação** - Não forçar hiper-hidratação\n4. **TC de abdome sem contraste** - Padrão ouro\n5. **Exames laboratoriais** - Creatinina, EAS\n6. **Alfa-bloqueador** - Tansulosina para expulsão\n7. **Urologia** - Se complicação ou cálculo > 10mm\n8. **Internação** - Se infecção, rim único, refratário",
            calculadoras: [
                "**STONE Score** - Probabilidade de cálculo ureteral",
                "**S.T.O.N.E. Nephrolithometry** - Complexidade do cálculo"
            ],
            referencias: [],
            rawMarkdown: "\n# Cólica renal\n\n> Pode ser pedra no rim\n\n## Informações Gerais\n\n- **Código**: `GU_RENAL_COLIC`\n- **Grupo**: [[GU - Urinário/_índice|GU - Urinário]]\n- **Nível de Risco**: 🔴 Alto\n- **Severidade**: 4/5\n- **Fast Track**: Não\n\n### Público-Alvo\n- Adultos\n- Idosos\n\n## Sintomas Relacionados\n\n- Dor lombar intensa em cólica\n- Irradiação para flanco e região inguinal\n- Hematúria\n- Náusea e vômitos\n- Inquietação (não consegue ficar parado)\n- Disúria\n\n## Red Flags\n\n- Febre (obstrução infectada = emergência)\n- Rim único\n- Anúria (obstrução bilateral)\n- Insuficiência renal aguda\n- Sepse urinária\n- Dor refratária a analgesia\n- Gestante\n\n## Diagnóstico Diferencial\n\n- Cólica nefrética por cálculo\n- Pielonefrite\n- Aneurisma de aorta (idoso)\n- Apendicite\n- Torção de ovário\n- Diverticulite\n- Hérnia de disco lombar\n- Infarto renal\n\n## Calculadoras Recomendadas\n\n- **STONE Score** - Probabilidade de cálculo ureteral\n- **S.T.O.N.E. Nephrolithometry** - Complexidade do cálculo\n\n### STONE Score\n| Item | Pontos |\n|------|--------|\n| Sexo masculino | 2 |\n| Duração < 6h | 3 |\n| Origem não negra | 3 |\n| Náusea/vômito | 1 |\n| Hematúria microscópica | 3 |\n\n**Interpretação:**\n- 0-5: Baixa probabilidade\n- 6-9: Moderada\n- 10-13: Alta probabilidade\n\n## Conduta Inicial\n\n1. **Analgesia potente** - Dipirona IV + Anti-inflamatório (cetorolaco)\n2. **Antiespasmódico** - Hioscina\n3. **Hidratação** - Não forçar hiper-hidratação\n4. **TC de abdome sem contraste** - Padrão ouro\n5. **Exames laboratoriais** - Creatinina, EAS\n6. **Alfa-bloqueador** - Tansulosina para expulsão\n7. **Urologia** - Se complicação ou cálculo > 10mm\n8. **Internação** - Se infecção, rim único, refratário\n\n### Indicações de Intervenção Urológica\n| Critério |\n|----------|\n| Cálculo > 10mm |\n| Obstrução + infecção |\n| Dor refratária |\n| Rim único |\n| IRA |\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| N23 | Cólica renal não especificada |\n| N20.0 | Cálculo do rim |\n| R10.2 | Dor pélvica e perineal |\n\n## Termos de Busca\n\n`cólica renal` `pedra no rim` `dor nos rins` `cálculo renal` `dor lombar forte` `dor que vai para virilha`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Problema de coluna\"\n- \"Gases\"\n- \"Mau jeito\"\n\n## Links Relacionados\n\n- [[GU - Urinário/_índice|Grupo GU - Urinário]]\n- [[GU_DYSURIA]] - Dor para urinar\n- [[GI_ABDOMINAL_PAIN_ACUTE]] - Dor abdominal\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
        }
    },
    {
        id: "GU_DYSURIA",
        group: "GU",
        title: "Dor para urinar",
        subtitle: "Pode ser infecção urinária",
        ageTargets: [
            "adult"
        ],
        riskLevel: "medium",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: false,
        chips: [],
        searchTerms: [],
        synonyms: [
            "dor para urinar",
            "ardência ao urinar",
            "infecção urinária",
            "cistite",
            "itu"
        ],
        relatedSymptoms: [
            "Polaciúria (urinar frequente)",
            "Urgência miccional",
            "Dor suprapúbica",
            "Urina turva ou com odor forte",
            "Hematúria",
            "Febre (se pielonefrite)"
        ],
        bodySystem: [],
        severity: 1,
        commonMisconceptions: [],
        icd10Codes: [
            "N30.0",
            "N39.0",
            "R30.0"
        ],
        searchWeight: 1,
        lastSync: "2025-12-25T17:05:30.739Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [
                "Febre > 38°C (pielonefrite)",
                "Dor lombar (sinal de Giordano)",
                "Calafrios",
                "Náusea e vômitos",
                "Gestante",
                "Homem (ITU complicada)",
                "Imunossuprimido",
                "Diabético descompensado",
                "Uso de cateter vesical"
            ],
            diagnosticoDiferencial: [
                "Cistite aguda não complicada",
                "Pielonefrite aguda",
                "Uretrite (DST)",
                "Prostatite (homens)",
                "Vaginite",
                "Cistite intersticial",
                "Câncer de bexiga (hematúria)"
            ],
            condutaInicial: "1. **Anamnese** - Sintomas, duração, fatores de risco\n2. **EAS + Urocultura** - Se ITU complicada ou recorrente\n3. **Antibioticoterapia empírica** - Se cistite não complicada\n4. **Analgesia** - Fenazopiridina (urina laranja)\n5. **Hidratação** - Aumentar ingesta hídrica\n6. **Investigação adicional** - Se ITU recorrente (>3/ano)\n7. **Internação** - Se pielonefrite com critérios de gravidade",
            calculadoras: [
                "**UTI Probability Score** - Probabilidade de ITU",
                "**qSOFA** - Se suspeita de sepse urinária"
            ],
            referencias: [],
            rawMarkdown: "\n# Dor para urinar\n\n> Pode ser infecção urinária\n\n## Informações Gerais\n\n- **Código**: `GU_DYSURIA`\n- **Grupo**: [[GU - Urinário/_índice|GU - Urinário]]\n- **Nível de Risco**: 🟡 Médio\n- **Severidade**: 2/5\n- **Fast Track**: Sim (cistite não complicada)\n\n### Público-Alvo\n- Adultos\n- Mulheres (principalmente)\n- Idosos\n\n## Sintomas Relacionados\n\n- Polaciúria (urinar frequente)\n- Urgência miccional\n- Dor suprapúbica\n- Urina turva ou com odor forte\n- Hematúria\n- Febre (se pielonefrite)\n\n## Red Flags\n\n- Febre > 38°C (pielonefrite)\n- Dor lombar (sinal de Giordano)\n- Calafrios\n- Náusea e vômitos\n- Gestante\n- Homem (ITU complicada)\n- Imunossuprimido\n- Diabético descompensado\n- Uso de cateter vesical\n\n## Diagnóstico Diferencial\n\n- Cistite aguda não complicada\n- Pielonefrite aguda\n- Uretrite (DST)\n- Prostatite (homens)\n- Vaginite\n- Cistite intersticial\n- Câncer de bexiga (hematúria)\n\n## Calculadoras Recomendadas\n\n- **UTI Probability Score** - Probabilidade de ITU\n- **qSOFA** - Se suspeita de sepse urinária\n\n### Critérios de ITU Não Complicada\n| Critério |\n|----------|\n| Mulher não gestante |\n| Sem febre |\n| Sem dor lombar |\n| Sem alteração anatômica |\n| Não imunossuprimida |\n| Sem uso de cateter |\n\n## Conduta Inicial\n\n1. **Anamnese** - Sintomas, duração, fatores de risco\n2. **EAS + Urocultura** - Se ITU complicada ou recorrente\n3. **Antibioticoterapia empírica** - Se cistite não complicada\n4. **Analgesia** - Fenazopiridina (urina laranja)\n5. **Hidratação** - Aumentar ingesta hídrica\n6. **Investigação adicional** - Se ITU recorrente (>3/ano)\n7. **Internação** - Se pielonefrite com critérios de gravidade\n\n### Antibióticos para Cistite Não Complicada\n| Opção | Dose |\n|-------|------|\n| Fosfomicina | 3g dose única |\n| Nitrofurantoína | 100mg 6/6h por 5 dias |\n| SMX-TMP | 800/160mg 12/12h por 3 dias |\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| N30.0 | Cistite aguda |\n| N39.0 | Infecção do trato urinário, local não especificado |\n| R30.0 | Disúria |\n\n## Termos de Busca\n\n`dor para urinar` `ardência ao urinar` `infecção urinária` `cistite` `urina queimando` `dor ao fazer xixi`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Peguei frio\"\n- \"Sentei em lugar sujo\"\n- \"Infecção nos rins\"\n\n## Links Relacionados\n\n- [[GU - Urinário/_índice|Grupo GU - Urinário]]\n- [[GU_RENAL_COLIC]] - Cólica renal\n- [[INF_FEVER]] - Febre\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
        }
    },
    {
        id: "INF_SEPSIS",
        group: "INF",
        title: "Sepse / Infecção grave",
        subtitle: "Infecção que está se espalhando pelo corpo",
        ageTargets: [
            "adult"
        ],
        riskLevel: "high",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: false,
        chips: [],
        searchTerms: [],
        synonyms: [
            "sepse",
            "infecção generalizada",
            "choque séptico",
            "septicemia"
        ],
        relatedSymptoms: [
            "Febre ou hipotermia",
            "Taquicardia",
            "Taquipneia",
            "Confusão mental",
            "Hipotensão",
            "Oligúria",
            "Pele moteada"
        ],
        bodySystem: [],
        severity: 1,
        commonMisconceptions: [],
        icd10Codes: [
            "A41.9",
            "R65.1",
            "R57.2"
        ],
        searchWeight: 1,
        lastSync: "2025-12-25T17:05:30.739Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [
                "Hipotensão refratária a volume",
                "Lactato > 4 mmol/L",
                "Necessidade de vasopressor",
                "Disfunção orgânica múltipla",
                "Alteração aguda de consciência",
                "Insuficiência respiratória",
                "Insuficiência renal aguda",
                "Coagulopatia"
            ],
            diagnosticoDiferencial: [
                "Sepse de foco pulmonar",
                "Sepse de foco urinário",
                "Sepse de foco abdominal",
                "Sepse de foco cutâneo",
                "Endocardite",
                "Meningite",
                "Choque cardiogênico",
                "Choque hipovolêmico",
                "TEP maciço"
            ],
            condutaInicial: "(HORA DE OURO)\n\n1. **Reconhecer** - qSOFA ≥ 2 + suspeita de infecção\n2. **Lactato** - Colher imediatamente\n3. **Hemoculturas** - 2 pares antes do ATB\n4. **Antibiótico** - Iniciar em até 1 HORA\n5. **Ressuscitação volêmica** - 30mL/kg de cristaloide em 3h\n6. **Vasopressor** - Se PAM < 65 após volume\n7. **Reavaliar** - Lactato 2-4h, resposta a volume\n8. **UTI** - Transferir precocemente",
            calculadoras: [
                "**qSOFA** - Triagem rápida",
                "**SOFA Score** - Disfunção orgânica",
                "**NEWS2** - Deterioração clínica",
                "**MEDS Score** - Mortalidade em sepse"
            ],
            referencias: [],
            rawMarkdown: "\n# Sepse / Infecção grave\n\n> Infecção que está se espalhando pelo corpo\n\n## Informações Gerais\n\n- **Código**: `INF_SEPSIS`\n- **Grupo**: [[INF - Infecção/_índice|INF - Infecção]]\n- **Nível de Risco**: 🔴 Alto\n- **Severidade**: 5/5\n- **Fast Track**: Não - EMERGÊNCIA\n\n### Público-Alvo\n- Adultos\n- Idosos\n- Imunossuprimidos\n\n## Sintomas Relacionados\n\n- Febre ou hipotermia\n- Taquicardia\n- Taquipneia\n- Confusão mental\n- Hipotensão\n- Oligúria\n- Pele moteada\n\n## Red Flags (TODOS são graves em sepse)\n\n- Hipotensão refratária a volume\n- Lactato > 4 mmol/L\n- Necessidade de vasopressor\n- Disfunção orgânica múltipla\n- Alteração aguda de consciência\n- Insuficiência respiratória\n- Insuficiência renal aguda\n- Coagulopatia\n\n## Diagnóstico Diferencial\n\n- Sepse de foco pulmonar\n- Sepse de foco urinário\n- Sepse de foco abdominal\n- Sepse de foco cutâneo\n- Endocardite\n- Meningite\n- Choque cardiogênico\n- Choque hipovolêmico\n- TEP maciço\n\n## Calculadoras Recomendadas\n\n- **qSOFA** - Triagem rápida\n- **SOFA Score** - Disfunção orgânica\n- **NEWS2** - Deterioração clínica\n- **MEDS Score** - Mortalidade em sepse\n\n### SOFA Score\n| Sistema | 0 | 1 | 2 | 3 | 4 |\n|---------|---|---|---|---|---|\n| Respiratório (PaO2/FiO2) | ≥400 | <400 | <300 | <200 c/ VM | <100 c/ VM |\n| Coagulação (Plaquetas) | ≥150 | <150 | <100 | <50 | <20 |\n| Hepático (Bilirrubina) | <1.2 | 1.2-1.9 | 2.0-5.9 | 6.0-11.9 | >12 |\n| Cardiovascular | PAM≥70 | PAM<70 | Dopa≤5 | Dopa>5 ou NE≤0.1 | NE>0.1 |\n| Neurológico (Glasgow) | 15 | 13-14 | 10-12 | 6-9 | <6 |\n| Renal (Creatinina) | <1.2 | 1.2-1.9 | 2.0-3.4 | 3.5-4.9 | >5 |\n\n## Conduta Inicial (HORA DE OURO)\n\n1. **Reconhecer** - qSOFA ≥ 2 + suspeita de infecção\n2. **Lactato** - Colher imediatamente\n3. **Hemoculturas** - 2 pares antes do ATB\n4. **Antibiótico** - Iniciar em até 1 HORA\n5. **Ressuscitação volêmica** - 30mL/kg de cristaloide em 3h\n6. **Vasopressor** - Se PAM < 65 após volume\n7. **Reavaliar** - Lactato 2-4h, resposta a volume\n8. **UTI** - Transferir precocemente\n\n### Pacote 1ª Hora (Surviving Sepsis)\n| Ação | Tempo |\n|------|-------|\n| Medir lactato | Imediato |\n| Hemoculturas | Antes do ATB |\n| Antibiótico de amplo espectro | < 1 hora |\n| Cristaloide 30mL/kg se hipotensão ou lactato ≥ 4 | Iniciar imediato |\n| Vasopressor se PAM < 65 após volume | Imediato |\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| A41.9 | Sepse não especificada |\n| R65.1 | SIRS de origem infecciosa com disfunção orgânica |\n| R57.2 | Choque séptico |\n\n## Termos de Busca\n\n`sepse` `infecção generalizada` `choque séptico` `infecção grave` `septicemia` `infecção no sangue`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Infecção no sangue\"\n- \"Bactéria no sangue\"\n- \"Sangue contaminado\"\n\n## Links Relacionados\n\n- [[INF - Infecção/_índice|Grupo INF - Infecção]]\n- [[INF_FEVER]] - Febre\n- [[Protocolos/PROTO_SEPSE|Protocolo Sepse]]\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
        }
    },
    {
        id: "INF_FEVER",
        group: "INF",
        title: "Febre",
        subtitle: "Pode ser infecção em algum lugar do corpo",
        ageTargets: [
            "adult"
        ],
        riskLevel: "medium",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: false,
        chips: [],
        searchTerms: [],
        synonyms: [
            "febre",
            "febril",
            "temperatura alta",
            "corpo quente",
            "calafrios"
        ],
        relatedSymptoms: [
            "Calafrios",
            "Sudorese",
            "Mal-estar",
            "Cefaleia",
            "Mialgia",
            "Astenia"
        ],
        bodySystem: [],
        severity: 1,
        commonMisconceptions: [],
        icd10Codes: [
            "R50.9",
            "A49.9",
            "R50.0"
        ],
        searchWeight: 1,
        lastSync: "2025-12-25T17:05:30.739Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [
                "Febre + rigidez de nuca (meningite)",
                "Febre + petéquias (meningococcemia)",
                "Febre + hipotensão (sepse)",
                "Febre + confusão mental",
                "Febre > 39°C em idoso",
                "Febre em neutropênico",
                "Febre em imunossuprimido",
                "Febre + rash difuso",
                "Febre > 7 dias sem foco"
            ],
            diagnosticoDiferencial: [
                "Infecção respiratória (pneumonia, gripe)",
                "Infecção urinária",
                "Infecção de pele/partes moles",
                "Meningite/encefalite",
                "Endocardite",
                "Sepse",
                "Dengue/arboviroses",
                "COVID-19",
                "Febre de origem indeterminada"
            ],
            condutaInicial: "1. **Identificar foco** - Anamnese e exame físico completos\n2. **Sinais vitais** - PA, FC, FR, SatO2, Tax\n3. **Antitérmico** - Dipirona ou paracetamol\n4. **Hidratação** - VO ou IV conforme gravidade\n5. **Exames** - Hemograma, PCR, EAS, RX tórax\n6. **Culturas** - Se suspeita de sepse\n7. **Antibiótico empírico** - Se foco bacteriano identificado\n8. **Protocolo sepse** - Se qSOFA ≥ 2",
            calculadoras: [
                "**qSOFA** - Triagem de sepse",
                "**SIRS Criteria** - Síndrome da resposta inflamatória",
                "**NEWS2** - Deterioração clínica"
            ],
            referencias: [],
            rawMarkdown: "\n# Febre\n\n> Pode ser infecção em algum lugar do corpo\n\n## Informações Gerais\n\n- **Código**: `INF_FEVER`\n- **Grupo**: [[INF - Infecção/_índice|INF - Infecção]]\n- **Nível de Risco**: 🟡 Médio\n- **Severidade**: 3/5\n- **Fast Track**: Depende do foco\n\n### Público-Alvo\n- Adultos\n- Crianças\n- Idosos\n\n## Sintomas Relacionados\n\n- Calafrios\n- Sudorese\n- Mal-estar\n- Cefaleia\n- Mialgia\n- Astenia\n\n## Red Flags\n\n- Febre + rigidez de nuca (meningite)\n- Febre + petéquias (meningococcemia)\n- Febre + hipotensão (sepse)\n- Febre + confusão mental\n- Febre > 39°C em idoso\n- Febre em neutropênico\n- Febre em imunossuprimido\n- Febre + rash difuso\n- Febre > 7 dias sem foco\n\n## Diagnóstico Diferencial\n\n- Infecção respiratória (pneumonia, gripe)\n- Infecção urinária\n- Infecção de pele/partes moles\n- Meningite/encefalite\n- Endocardite\n- Sepse\n- Dengue/arboviroses\n- COVID-19\n- Febre de origem indeterminada\n\n## Calculadoras Recomendadas\n\n- **qSOFA** - Triagem de sepse\n- **SIRS Criteria** - Síndrome da resposta inflamatória\n- **NEWS2** - Deterioração clínica\n\n### qSOFA (Sepse)\n| Critério | Pontos |\n|----------|--------|\n| FR ≥ 22 irpm | 1 |\n| PAS ≤ 100 mmHg | 1 |\n| Alteração do nível de consciência | 1 |\n\n**Interpretação:** ≥ 2 pontos = alto risco de sepse\n\n### SIRS\n| Critério |\n|----------|\n| Temperatura > 38°C ou < 36°C |\n| FC > 90 bpm |\n| FR > 20 irpm |\n| Leucócitos > 12.000 ou < 4.000 |\n\n## Conduta Inicial\n\n1. **Identificar foco** - Anamnese e exame físico completos\n2. **Sinais vitais** - PA, FC, FR, SatO2, Tax\n3. **Antitérmico** - Dipirona ou paracetamol\n4. **Hidratação** - VO ou IV conforme gravidade\n5. **Exames** - Hemograma, PCR, EAS, RX tórax\n6. **Culturas** - Se suspeita de sepse\n7. **Antibiótico empírico** - Se foco bacteriano identificado\n8. **Protocolo sepse** - Se qSOFA ≥ 2\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| R50.9 | Febre não especificada |\n| A49.9 | Infecção bacteriana não especificada |\n| R50.0 | Febre com calafrios |\n\n## Termos de Busca\n\n`febre` `febril` `temperatura alta` `corpo quente` `calafrios` `tremendo de frio`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Febre baixa não é febre\"\n- \"Infecção de garganta\"\n- \"Virose\"\n\n## Links Relacionados\n\n- [[INF - Infecção/_índice|Grupo INF - Infecção]]\n- [[INF_SEPSIS]] - Sepse\n- [[GU_DYSURIA]] - Infecção urinária\n- [[RC_COUGH]] - Tosse (pneumonia)\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
        }
    },
    {
        id: "GI_NAUSEA_VOMITING",
        group: "GI",
        title: "Enjoo e vômito",
        subtitle: "Pode ser infecção, intoxicação ou problema digestivo",
        ageTargets: [
            "adult"
        ],
        riskLevel: "medium",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: false,
        chips: [],
        searchTerms: [],
        synonyms: [
            "enjoo",
            "vômito",
            "ânsia",
            "náusea",
            "vomitando",
            "passando mal"
        ],
        relatedSymptoms: [
            "Dor abdominal",
            "Diarreia",
            "Febre",
            "Desidratação",
            "Cefaleia",
            "Tontura"
        ],
        bodySystem: [],
        severity: 1,
        commonMisconceptions: [],
        icd10Codes: [
            "R11.0",
            "R11.2",
            "K29.7"
        ],
        searchWeight: 1,
        lastSync: "2025-12-25T17:05:30.739Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [
                "Vômitos em jato (hipertensão intracraniana)",
                "Hematêmese (sangue no vômito)",
                "Vômitos fecaloides",
                "Sinais de desidratação grave",
                "Alteração do nível de consciência",
                "Vômitos pós-trauma craniano",
                "Vômitos + cefaleia intensa",
                "Gestante com vômitos incoercíveis"
            ],
            diagnosticoDiferencial: [
                "Gastroenterite viral",
                "Intoxicação alimentar",
                "Gastroparesia",
                "Obstrução intestinal",
                "Gravidez (hiperêmese)",
                "Labirintite",
                "Enxaqueca",
                "Cetoacidose diabética",
                "Hipertensão intracraniana"
            ],
            condutaInicial: "1. **Avaliar hidratação** - Sinais vitais, turgor, mucosas\n2. **Acesso venoso** - Se desidratação moderada/grave\n3. **Hidratação** - VO se tolerado, IV se não\n4. **Antieméticos** - Ondansetrona, metoclopramida\n5. **Investigar causa** - Anamnese detalhada\n6. **Exames** - Se prolongado: eletrólitos, função renal, glicemia\n7. **Dieta** - Líquidos claros, evoluir gradualmente",
            calculadoras: [
                "**Clinical Dehydration Scale** - Grau de desidratação em crianças",
                "**Gorelick Dehydration Scale** - Avaliação pediátrica"
            ],
            referencias: [],
            rawMarkdown: "\n# Enjoo e vômito\n\n> Pode ser infecção, intoxicação ou problema digestivo\n\n## Informações Gerais\n\n- **Código**: `GI_NAUSEA_VOMITING`\n- **Grupo**: [[GI - Digestivo/_índice|GI - Digestivo]]\n- **Nível de Risco**: 🟡 Médio\n- **Severidade**: 3/5\n- **Fast Track**: Sim (se sem red flags)\n\n### Público-Alvo\n- Adultos\n- Crianças\n- Idosos\n\n## Sintomas Relacionados\n\n- Dor abdominal\n- Diarreia\n- Febre\n- Desidratação\n- Cefaleia\n- Tontura\n\n## Red Flags\n\n- Vômitos em jato (hipertensão intracraniana)\n- Hematêmese (sangue no vômito)\n- Vômitos fecaloides\n- Sinais de desidratação grave\n- Alteração do nível de consciência\n- Vômitos pós-trauma craniano\n- Vômitos + cefaleia intensa\n- Gestante com vômitos incoercíveis\n\n## Diagnóstico Diferencial\n\n- Gastroenterite viral\n- Intoxicação alimentar\n- Gastroparesia\n- Obstrução intestinal\n- Gravidez (hiperêmese)\n- Labirintite\n- Enxaqueca\n- Cetoacidose diabética\n- Hipertensão intracraniana\n\n## Calculadoras Recomendadas\n\n- **Clinical Dehydration Scale** - Grau de desidratação em crianças\n- **Gorelick Dehydration Scale** - Avaliação pediátrica\n\n### Sinais de Desidratação\n| Leve | Moderada | Grave |\n|------|----------|-------|\n| Sede | Olhos fundos | Letargia |\n| Mucosas secas | Turgor diminuído | Pulso fraco |\n| Urina escura | Taquicardia | Hipotensão |\n\n## Conduta Inicial\n\n1. **Avaliar hidratação** - Sinais vitais, turgor, mucosas\n2. **Acesso venoso** - Se desidratação moderada/grave\n3. **Hidratação** - VO se tolerado, IV se não\n4. **Antieméticos** - Ondansetrona, metoclopramida\n5. **Investigar causa** - Anamnese detalhada\n6. **Exames** - Se prolongado: eletrólitos, função renal, glicemia\n7. **Dieta** - Líquidos claros, evoluir gradualmente\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| R11.0 | Náusea |\n| R11.2 | Náusea com vômito |\n| K29.7 | Gastrite não especificada |\n\n## Termos de Busca\n\n`enjoo` `vômito` `náusea` `vomitando` `ânsia de vômito` `passando mal` `estômago embrulhado`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Virose\"\n- \"Comida estragada\"\n- \"Labirintite\"\n\n## Links Relacionados\n\n- [[GI - Digestivo/_índice|Grupo GI - Digestivo]]\n- [[GI_ABDOMINAL_PAIN_ACUTE]] - Dor abdominal\n- [[GI_DIARRHEA]] - Diarreia\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
        }
    },
    {
        id: "GI_DIARRHEA",
        group: "GI",
        title: "Diarreia",
        subtitle: "Pode ser infecção intestinal ou intoxicação",
        ageTargets: [
            "adult"
        ],
        riskLevel: "medium",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: false,
        chips: [],
        searchTerms: [],
        synonyms: [
            "diarreia",
            "intestino solto",
            "caganeira",
            "disenteria",
            "evacuando muito"
        ],
        relatedSymptoms: [
            "Cólicas abdominais",
            "Náusea",
            "Vômitos",
            "Febre",
            "Desidratação",
            "Tenesmo"
        ],
        bodySystem: [],
        severity: 1,
        commonMisconceptions: [],
        icd10Codes: [
            "A09.9",
            "K52.9",
            "R19.7"
        ],
        searchWeight: 1,
        lastSync: "2025-12-25T17:05:30.739Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [
                "Sangue nas fezes (disenteria)",
                "Febre alta (>39°C)",
                "Desidratação grave",
                "Diarreia > 7 dias",
                "Idoso ou imunossuprimido",
                "Uso recente de antibióticos (C. difficile)",
                "Viagem recente para área endêmica",
                "Dor abdominal intensa"
            ],
            diagnosticoDiferencial: [
                "Gastroenterite viral",
                "Gastroenterite bacteriana",
                "Intoxicação alimentar",
                "Doença inflamatória intestinal",
                "Síndrome do intestino irritável",
                "Colite por C. difficile",
                "Parasitose",
                "Intolerância alimentar"
            ],
            condutaInicial: "1. **Avaliar desidratação** - TRO ou hidratação IV\n2. **Dieta** - Manter alimentação, evitar lactose temporariamente\n3. **Probióticos** - Podem encurtar duração\n4. **Antidiarreicos** - Loperamida (evitar se disenteria)\n5. **Antibióticos** - Apenas se indicação específica\n6. **Coprocultura** - Se febre alta, sangue, imunossuprimido\n7. **Orientar sinais de alarme** - Sangue, febre, piora",
            calculadoras: [
                "**Vesikari Scale** - Gravidade de gastroenterite em crianças",
                "**Clinical Dehydration Scale** - Grau de desidratação"
            ],
            referencias: [],
            rawMarkdown: "\n# Diarreia\n\n> Pode ser infecção intestinal ou intoxicação\n\n## Informações Gerais\n\n- **Código**: `GI_DIARRHEA`\n- **Grupo**: [[GI - Digestivo/_índice|GI - Digestivo]]\n- **Nível de Risco**: 🟡 Médio\n- **Severidade**: 3/5\n- **Fast Track**: Sim (se sem red flags)\n\n### Público-Alvo\n- Adultos\n- Crianças\n- Idosos\n\n## Sintomas Relacionados\n\n- Cólicas abdominais\n- Náusea\n- Vômitos\n- Febre\n- Desidratação\n- Tenesmo\n\n## Red Flags\n\n- Sangue nas fezes (disenteria)\n- Febre alta (>39°C)\n- Desidratação grave\n- Diarreia > 7 dias\n- Idoso ou imunossuprimido\n- Uso recente de antibióticos (C. difficile)\n- Viagem recente para área endêmica\n- Dor abdominal intensa\n\n## Diagnóstico Diferencial\n\n- Gastroenterite viral\n- Gastroenterite bacteriana\n- Intoxicação alimentar\n- Doença inflamatória intestinal\n- Síndrome do intestino irritável\n- Colite por C. difficile\n- Parasitose\n- Intolerância alimentar\n\n## Calculadoras Recomendadas\n\n- **Vesikari Scale** - Gravidade de gastroenterite em crianças\n- **Clinical Dehydration Scale** - Grau de desidratação\n\n### Classificação da Diarreia\n| Tipo | Duração |\n|------|---------|\n| Aguda | < 14 dias |\n| Persistente | 14-30 dias |\n| Crônica | > 30 dias |\n\n## Conduta Inicial\n\n1. **Avaliar desidratação** - TRO ou hidratação IV\n2. **Dieta** - Manter alimentação, evitar lactose temporariamente\n3. **Probióticos** - Podem encurtar duração\n4. **Antidiarreicos** - Loperamida (evitar se disenteria)\n5. **Antibióticos** - Apenas se indicação específica\n6. **Coprocultura** - Se febre alta, sangue, imunossuprimido\n7. **Orientar sinais de alarme** - Sangue, febre, piora\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| A09.9 | Gastroenterite infecciosa, não especificada |\n| K52.9 | Gastroenterite não infecciosa |\n| R19.7 | Diarreia, não especificada |\n\n## Termos de Busca\n\n`diarreia` `intestino solto` `fezes líquidas` `evacuando muito` `dor de barriga com diarreia` `gastroenterite`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Virose\"\n- \"Comeu algo estragado\"\n- \"Intestino preso que soltou\"\n\n## Links Relacionados\n\n- [[GI - Digestivo/_índice|Grupo GI - Digestivo]]\n- [[GI_NAUSEA_VOMITING]] - Náusea e vômitos\n- [[GI_ABDOMINAL_PAIN_ACUTE]] - Dor abdominal\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
        }
    },
    {
        id: "GI_ABDOMINAL_PAIN_ACUTE",
        group: "GI",
        title: "Dor na barriga forte",
        subtitle: "Pode ser algo sério na barriga",
        ageTargets: [
            "adult"
        ],
        riskLevel: "high",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: false,
        chips: [],
        searchTerms: [],
        synonyms: [
            "dor na barriga",
            "dor de barriga",
            "abdome agudo",
            "barriga dói"
        ],
        relatedSymptoms: [
            "Náusea",
            "Vômitos",
            "Febre",
            "Distensão abdominal",
            "Parada de evacuação",
            "Icterícia"
        ],
        bodySystem: [],
        severity: 1,
        commonMisconceptions: [],
        icd10Codes: [
            "R10.0",
            "R10.4",
            "K35.9"
        ],
        searchWeight: 1,
        lastSync: "2025-12-25T17:05:30.739Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [
                "Defesa abdominal / abdome em tábua",
                "Dor + febre alta (>38.5°C)",
                "Vômitos fecaloides",
                "Distensão + parada de eliminação de gases",
                "Instabilidade hemodinâmica",
                "Dor súbita de forte intensidade",
                "Sinais de irritação peritoneal",
                "Massa abdominal pulsátil (AAA)"
            ],
            diagnosticoDiferencial: [
                "Apendicite aguda",
                "Colecistite aguda",
                "Pancreatite aguda",
                "Obstrução intestinal",
                "Diverticulite",
                "Úlcera perfurada",
                "Isquemia mesentérica",
                "Gravidez ectópica (mulheres)",
                "Aneurisma de aorta roto"
            ],
            condutaInicial: "1. **Jejum** - NPO até definição diagnóstica\n2. **Acesso venoso** - Hidratação + coleta de exames\n3. **Analgesia** - Não postergar por medo de mascarar quadro\n4. **Exames laboratoriais** - Hemograma, PCR, amilase, lipase, função hepática\n5. **Imagem** - USG abdominal ou TC conforme suspeita\n6. **Avaliação cirúrgica** - Se sinais de abdome agudo\n7. **Reavaliação seriada** - Quadro pode evoluir",
            calculadoras: [
                "**Alvarado Score** - Probabilidade de apendicite",
                "**RIPASA Score** - Apendicite em asiáticos",
                "**Ranson Criteria** - Gravidade de pancreatite"
            ],
            referencias: [],
            rawMarkdown: "\n# Dor na barriga forte\n\n> Pode ser algo sério na barriga\n\n## Informações Gerais\n\n- **Código**: `GI_ABDOMINAL_PAIN_ACUTE`\n- **Grupo**: [[GI - Digestivo/_índice|GI - Digestivo]]\n- **Nível de Risco**: 🔴 Alto\n- **Severidade**: 4/5\n- **Fast Track**: Não\n\n### Público-Alvo\n- Adultos\n- Idosos\n- Crianças\n\n## Sintomas Relacionados\n\n- Náusea\n- Vômitos\n- Febre\n- Distensão abdominal\n- Parada de evacuação\n- Icterícia\n\n## Red Flags\n\n- Defesa abdominal / abdome em tábua\n- Dor + febre alta (>38.5°C)\n- Vômitos fecaloides\n- Distensão + parada de eliminação de gases\n- Instabilidade hemodinâmica\n- Dor súbita de forte intensidade\n- Sinais de irritação peritoneal\n- Massa abdominal pulsátil (AAA)\n\n## Diagnóstico Diferencial\n\n- Apendicite aguda\n- Colecistite aguda\n- Pancreatite aguda\n- Obstrução intestinal\n- Diverticulite\n- Úlcera perfurada\n- Isquemia mesentérica\n- Gravidez ectópica (mulheres)\n- Aneurisma de aorta roto\n\n## Calculadoras Recomendadas\n\n- **Alvarado Score** - Probabilidade de apendicite\n- **RIPASA Score** - Apendicite em asiáticos\n- **Ranson Criteria** - Gravidade de pancreatite\n\n### Alvarado Score\n| Item | Pontos |\n|------|--------|\n| Migração da dor para FID | 1 |\n| Anorexia | 1 |\n| Náusea/vômitos | 1 |\n| Dor em FID | 2 |\n| Blumberg positivo | 1 |\n| Febre >37.3°C | 1 |\n| Leucocitose >10.000 | 2 |\n| Desvio à esquerda | 1 |\n\n**Interpretação:**\n- 1-4: Baixa probabilidade\n- 5-6: Compatível (observação)\n- 7-10: Alta probabilidade (cirurgia)\n\n## Conduta Inicial\n\n1. **Jejum** - NPO até definição diagnóstica\n2. **Acesso venoso** - Hidratação + coleta de exames\n3. **Analgesia** - Não postergar por medo de mascarar quadro\n4. **Exames laboratoriais** - Hemograma, PCR, amilase, lipase, função hepática\n5. **Imagem** - USG abdominal ou TC conforme suspeita\n6. **Avaliação cirúrgica** - Se sinais de abdome agudo\n7. **Reavaliação seriada** - Quadro pode evoluir\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| R10.0 | Abdome agudo |\n| R10.4 | Dor abdominal, não especificada |\n| K35.9 | Apendicite aguda, não especificada |\n\n## Termos de Busca\n\n`dor na barriga` `dor abdominal` `abdome agudo` `barriga doendo` `cólica forte` `dor de barriga intensa`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Gases\"\n- \"Prisão de ventre\"\n- \"Cólica intestinal\"\n- \"Indigestão\"\n\n## Links Relacionados\n\n- [[GI - Digestivo/_índice|Grupo GI - Digestivo]]\n- [[GI_NAUSEA_VOMITING]] - Náusea e vômitos\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
        }
    },
    {
        id: "CV_SYNCOPE",
        group: "CV",
        title: "Desmaio ou quase desmaio",
        subtitle: "Apagão, queda súbita, perda de consciência",
        ageTargets: [
            "adult"
        ],
        riskLevel: "high",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: false,
        chips: [],
        searchTerms: [],
        synonyms: [
            "síncope",
            "perda de consciência",
            "desvanecimento",
            "colapso"
        ],
        relatedSymptoms: [
            "Tontura",
            "Palidez",
            "Taquicardia",
            "Náusea"
        ],
        bodySystem: [],
        severity: 1,
        commonMisconceptions: [],
        icd10Codes: [
            "R55.9"
        ],
        searchWeight: 1,
        lastSync: "2025-12-25T17:05:30.739Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [
                "San Francisco Syncope Rule",
                "**C** - Congestive heart failure (ICC)",
                "**H** - Hematócrito < 30%",
                "**E** - ECG anormal (novo ou alterado)",
                "**S** - Shortness of breath (dispneia)",
                "**S** - Systolic BP < 90 mmHg"
            ],
            diagnosticoDiferencial: [],
            condutaInicial: "1. **ABC** - Garantir via aérea, respiração, circulação\n2. **Anamnese detalhada**:\n   - Pródromos (sudorese, náusea, visão turva)\n   - Posição (ortostática, supina, sentada)\n   - Atividade (repouso, exercício, pós-prandial)\n   - Recuperação (imediata vs confusão pós-ictal)\n3. **ECG 12 derivações** - Obrigatório\n4. **Glicemia capilar**\n5. **PA em ortostatismo** - Queda ≥ 20 mmHg sistólica\n6. **Exames laboratoriais** - Hemograma, eletrólitos, troponina se indicado\n7. **Estratificação de risco** - San Francisco, EGSYS",
            calculadoras: [
                "**San Francisco Syncope Rule** - Identificar alto risco",
                "**EGSYS Score** - Probabilidade de causa cardíaca",
                "**OESIL Score** - Risco de mortalidade"
            ],
            referencias: [],
            rawMarkdown: "\n# Desmaio ou quase desmaio\n\n> Apagão, queda súbita, perda de consciência\n\n## Informações Gerais\n\n- **Código**: `CV_SYNCOPE`\n- **Grupo**: [[CV - Cardiovascular/_índice|CV - Peito / Coração]]\n- **Nível de Risco**: 🔴 Alto\n- **Severidade**: 4/5\n- **Fast Track**: Não\n\n### Público-Alvo\n- Adultos\n- Idosos\n- Adolescentes\n\n## Sintomas Relacionados\n\n- Tontura\n- Palidez\n- Taquicardia\n- Náusea\n\n## Red Flags - San Francisco Syncope Rule\n\n- **C** - Congestive heart failure (ICC)\n- **H** - Hematócrito < 30%\n- **E** - ECG anormal (novo ou alterado)\n- **S** - Shortness of breath (dispneia)\n- **S** - Systolic BP < 90 mmHg\n\n### Outros Red Flags\n- Síncope durante exercício\n- Síncope com palpitações precedendo\n- História familiar de morte súbita\n- Dor torácica associada\n- Déficit neurológico\n- Trauma significativo na queda\n\n## Diagnóstico Diferencial\n\n### Cardíaco (Alto Risco)\n- Arritmias (BAV, TV, FA rápida)\n- Estenose aórtica\n- Cardiomiopatia hipertrófica\n- Síndrome do QT longo\n- IAM\n\n### Reflexo (Baixo Risco)\n- Vasovagal\n- Situacional (tosse, micção)\n- Hipersensibilidade do seio carotídeo\n\n### Ortostática\n- Hipovolemia\n- Medicamentos\n- Disautonomia\n\n### Neurológico\n- Crise convulsiva (diagnóstico diferencial)\n- AIT (raro causar síncope)\n\n## Calculadoras Recomendadas\n\n- **San Francisco Syncope Rule** - Identificar alto risco\n- **EGSYS Score** - Probabilidade de causa cardíaca\n- **OESIL Score** - Risco de mortalidade\n\n### EGSYS Score\n| Fator | Pontos |\n|-------|--------|\n| Palpitação antes da síncope | +4 |\n| ECG anormal e/ou cardiopatia | +3 |\n| Síncope durante esforço | +3 |\n| Síncope em posição supina | +2 |\n| Pródromos autonômicos | -1 |\n| Fatores precipitantes | -1 |\n\n**≥ 3 pontos**: Alta probabilidade de causa cardíaca\n\n## Conduta Inicial\n\n1. **ABC** - Garantir via aérea, respiração, circulação\n2. **Anamnese detalhada**:\n   - Pródromos (sudorese, náusea, visão turva)\n   - Posição (ortostática, supina, sentada)\n   - Atividade (repouso, exercício, pós-prandial)\n   - Recuperação (imediata vs confusão pós-ictal)\n3. **ECG 12 derivações** - Obrigatório\n4. **Glicemia capilar**\n5. **PA em ortostatismo** - Queda ≥ 20 mmHg sistólica\n6. **Exames laboratoriais** - Hemograma, eletrólitos, troponina se indicado\n7. **Estratificação de risco** - San Francisco, EGSYS\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| R55.9 | Síncope e colapso |\n\n## Termos de Busca\n\n`desmaio` `apagão` `escureceu a visão` `quase desmaiou` `caiu duro`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Convulsão\"\n- \"Ataque cardíaco\"\n\n## Links Relacionados\n\n- [[CV - Cardiovascular/_índice|Grupo CV - Cardiovascular]]\n- [[CV_PALPITATIONS]] - Coração disparado\n- [[NC_SEIZURE]] - Crise convulsiva (DDx)\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
        }
    },
    {
        id: "CV_PALPITATIONS",
        group: "CV",
        title: "Coração disparado",
        subtitle: "Palpitações ou batimentos fortes",
        ageTargets: [
            "adult"
        ],
        riskLevel: "medium",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: false,
        chips: [],
        searchTerms: [],
        synonyms: [
            "taquicardia",
            "arritmia",
            "batimento irregular",
            "coração acelerado"
        ],
        relatedSymptoms: [
            "Tontura",
            "Dispneia",
            "Ansiedade",
            "Tremor"
        ],
        bodySystem: [],
        severity: 1,
        commonMisconceptions: [],
        icd10Codes: [
            "R00.2",
            "I49.9"
        ],
        searchWeight: 1,
        lastSync: "2025-12-25T17:05:30.739Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [
                "Síncope ou pré-síncope associada",
                "Dor torácica",
                "Dispneia importante",
                "História de cardiopatia estrutural",
                "História familiar de morte súbita",
                "Palpitação durante exercício",
                "FC > 150 bpm sustentada",
                "Hipotensão"
            ],
            diagnosticoDiferencial: [],
            condutaInicial: "1. **ECG 12 derivações** - Obrigatório, idealmente durante sintoma\n2. **Monitorização** - Se sintoma ativo\n3. **Anamnese**:\n   - Início/término (súbito vs gradual)\n   - Duração e frequência\n   - Regular vs irregular\n   - Fatores desencadeantes\n   - Medicações e substâncias\n4. **Exames laboratoriais**:\n   - TSH\n   - Hemograma (anemia)\n   - Eletrólitos (K, Mg)\n5. **Manobras vagais** - Se taquicardia regular (TPSV)\n6. **Holter 24h** - Se sintomas frequentes não capturados",
            calculadoras: [
                "ECG é a ferramenta principal",
                "**CHA2DS2-VASc** - Se FA confirmada",
                "**HAS-BLED** - Risco de sangramento se anticoagulação"
            ],
            referencias: [],
            rawMarkdown: "\n# Coração disparado\n\n> Palpitações ou batimentos fortes\n\n## Informações Gerais\n\n- **Código**: `CV_PALPITATIONS`\n- **Grupo**: [[CV - Cardiovascular/_índice|CV - Peito / Coração]]\n- **Nível de Risco**: 🟡 Médio\n- **Severidade**: 3/5\n- **Fast Track**: Sim\n\n### Público-Alvo\n- Adultos\n- Idosos\n- Adolescentes\n\n## Sintomas Relacionados\n\n- Tontura\n- Dispneia\n- Ansiedade\n- Tremor\n\n## Red Flags\n\n- Síncope ou pré-síncope associada\n- Dor torácica\n- Dispneia importante\n- História de cardiopatia estrutural\n- História familiar de morte súbita\n- Palpitação durante exercício\n- FC > 150 bpm sustentada\n- Hipotensão\n\n## Diagnóstico Diferencial\n\n### Arritmias\n- Extrassístoles (atriais ou ventriculares)\n- Fibrilação atrial\n- Flutter atrial\n- Taquicardia supraventricular (TPSV)\n- Taquicardia ventricular\n\n### Não-Arrítmicas\n- Ansiedade / Transtorno do pânico\n- Hipertireoidismo\n- Anemia\n- Febre\n- Cafeína / Estimulantes\n- Medicamentos (beta-agonistas, descongestionantes)\n- Feocromocitoma (raro)\n\n## Calculadoras Recomendadas\n\n- ECG é a ferramenta principal\n- **CHA2DS2-VASc** - Se FA confirmada\n- **HAS-BLED** - Risco de sangramento se anticoagulação\n\n## Conduta Inicial\n\n1. **ECG 12 derivações** - Obrigatório, idealmente durante sintoma\n2. **Monitorização** - Se sintoma ativo\n3. **Anamnese**:\n   - Início/término (súbito vs gradual)\n   - Duração e frequência\n   - Regular vs irregular\n   - Fatores desencadeantes\n   - Medicações e substâncias\n4. **Exames laboratoriais**:\n   - TSH\n   - Hemograma (anemia)\n   - Eletrólitos (K, Mg)\n5. **Manobras vagais** - Se taquicardia regular (TPSV)\n6. **Holter 24h** - Se sintomas frequentes não capturados\n\n### Manobra de Valsalva Modificada\n1. Paciente sentado, soprar em seringa 10mL por 15 segundos\n2. Deitar imediatamente\n3. Elevar MMII a 45° por 15 segundos\n4. Retornar à posição sentada\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| R00.2 | Palpitações |\n| I49.9 | Arritmia cardíaca, não especificada |\n\n## Termos de Busca\n\n`coração disparado` `coração acelerado` `batimentos fortes` `batedeira no peito`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Problema no coração\"\n- \"Infarto\"\n\n## Links Relacionados\n\n- [[CV - Cardiovascular/_índice|Grupo CV - Cardiovascular]]\n- [[CV_SYNCOPE]] - Desmaio\n- [[PSI_PANIC_ATTACK]] - Crise de ansiedade (DDx)\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
        }
    },
    {
        id: "CV_CHEST_PAIN_TYPICAL",
        group: "CV",
        title: "Dor no peito em aperto",
        subtitle: "Pode ser problema no coração",
        ageTargets: [
            "adult"
        ],
        riskLevel: "high",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: false,
        chips: [],
        searchTerms: [],
        synonyms: [
            "iam",
            "infarto",
            "angina",
            "síndrome coronariana aguda",
            "sca"
        ],
        relatedSymptoms: [
            "Sudorese",
            "Náusea",
            "Dispneia",
            "Palpitações",
            "Taquicardia"
        ],
        bodySystem: [],
        severity: 1,
        commonMisconceptions: [],
        icd10Codes: [
            "I20.0",
            "I21.9"
        ],
        searchWeight: 1,
        lastSync: "2025-12-25T17:05:30.739Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [
                "Dor precordial em aperto > 20 min",
                "Irradiação para MSE, mandíbula ou dorso",
                "Sudorese fria profusa",
                "Dispneia associada",
                "Síncope ou pré-síncope",
                "Hipotensão",
                "Alteração de consciência"
            ],
            diagnosticoDiferencial: [
                "IAM com supra de ST (IAMCSST)",
                "IAM sem supra de ST (IAMSSST)",
                "Angina instável",
                "Dissecção de aorta",
                "TEP",
                "Pericardite",
                "Esofagite/DRGE"
            ],
            condutaInicial: "1. **Monitorização contínua** - ECG, oximetria, PA\n2. **Acesso venoso** - Coleta de troponina, hemograma, coagulograma\n3. **AAS 200-300mg VO** - Se não contraindicado\n4. **Nitroglicerina SL** - Se PA permitir\n5. **Morfina** - Se dor refratária\n6. **ECG seriado** - A cada 15-30 min se dúvida\n7. **Estratificação de risco** - HEART, TIMI, GRACE",
            calculadoras: [
                "**HEART Score** - Estratificação de risco em dor torácica",
                "**TIMI Score** - Risco de eventos em SCA",
                "**GRACE Score** - Mortalidade intra-hospitalar"
            ],
            referencias: [],
            rawMarkdown: "\n# Dor no peito em aperto\n\n> Pode ser problema no coração\n\n## Informações Gerais\n\n- **Código**: `CV_CHEST_PAIN_TYPICAL`\n- **Grupo**: [[CV - Cardiovascular/_índice|CV - Peito / Coração]]\n- **Nível de Risco**: 🔴 Alto\n- **Severidade**: 5/5\n- **Fast Track**: Não\n\n### Público-Alvo\n- Adultos\n- Idosos\n\n## Sintomas Relacionados\n\n- Sudorese\n- Náusea\n- Dispneia\n- Palpitações\n- Taquicardia\n\n## Red Flags\n\n- Dor precordial em aperto > 20 min\n- Irradiação para MSE, mandíbula ou dorso\n- Sudorese fria profusa\n- Dispneia associada\n- Síncope ou pré-síncope\n- Hipotensão\n- Alteração de consciência\n\n## Diagnóstico Diferencial\n\n- IAM com supra de ST (IAMCSST)\n- IAM sem supra de ST (IAMSSST)\n- Angina instável\n- Dissecção de aorta\n- TEP\n- Pericardite\n- Esofagite/DRGE\n\n## Calculadoras Recomendadas\n\n- **HEART Score** - Estratificação de risco em dor torácica\n- **TIMI Score** - Risco de eventos em SCA\n- **GRACE Score** - Mortalidade intra-hospitalar\n\n### HEART Score\n| Item | 0 | 1 | 2 |\n|------|---|---|---|\n| History | Pouco suspeito | Moderadamente | Altamente suspeito |\n| ECG | Normal | Alteração inespecífica | Desvio ST significativo |\n| Age | < 45 | 45-64 | ≥ 65 |\n| Risk factors | Nenhum | 1-2 | ≥ 3 ou DAC conhecida |\n| Troponina | Normal | 1-3x limite | > 3x limite |\n\n**Interpretação:**\n- 0-3: Baixo risco (< 2% eventos)\n- 4-6: Intermediário (12-16%)\n- 7-10: Alto (50-65%)\n\n## Conduta Inicial\n\n1. **Monitorização contínua** - ECG, oximetria, PA\n2. **Acesso venoso** - Coleta de troponina, hemograma, coagulograma\n3. **AAS 200-300mg VO** - Se não contraindicado\n4. **Nitroglicerina SL** - Se PA permitir\n5. **Morfina** - Se dor refratária\n6. **ECG seriado** - A cada 15-30 min se dúvida\n7. **Estratificação de risco** - HEART, TIMI, GRACE\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| I20.0 | Angina instável |\n| I21.9 | Infarto agudo do miocárdio, não especificado |\n\n## Termos de Busca\n\n`dor no peito em aperto` `aperto no peito` `peso no peito` `dor no peito ao esforço` `dor no peito que irradia` `dor precordial`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Ataque cardíaco\"\n- \"Problema no coração\"\n- \"Parada cardíaca\"\n\n## Links Relacionados\n\n- [[CV - Cardiovascular/_índice|Grupo CV - Cardiovascular]]\n- [[CV_CHEST_PAIN_ATYPICAL]] - Dor no peito em pontada\n- [[CV_SYNCOPE]] - Desmaio\n- [[PROTO_IC]] - IC Descompensada\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
        }
    },
    {
        id: "CV_CHEST_PAIN_ATYPICAL",
        group: "CV",
        title: "Dor no peito em pontada",
        subtitle: "Dor localizada ou que piora ao mexer ou respirar",
        ageTargets: [
            "adult"
        ],
        riskLevel: "medium",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: false,
        chips: [],
        searchTerms: [],
        synonyms: [
            "fisgada",
            "dor pleurítica",
            "dor musculoesquelética",
            "síndrome de Tietze"
        ],
        relatedSymptoms: [
            "Dor ao respirar profundo",
            "Dor ao movimento",
            "Inchaço na parede torácica"
        ],
        bodySystem: [],
        severity: 1,
        commonMisconceptions: [],
        icd10Codes: [
            "R07.9",
            "M79.1"
        ],
        searchWeight: 1,
        lastSync: "2025-12-25T17:05:30.739Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [
                "Dor que não melhora com analgesia",
                "Dispneia associada",
                "Febre (pensar em pleurite/pneumonia)",
                "Trauma recente",
                "Uso de anticoagulantes"
            ],
            diagnosticoDiferencial: [
                "Costocondrite / Síndrome de Tietze",
                "Dor musculoesquelética",
                "Dor pleurítica",
                "Herpes zoster",
                "Pneumotórax",
                "Fratura de costela"
            ],
            condutaInicial: "1. **Anamnese detalhada** - Característica, localização, fatores de melhora/piora\n2. **Exame físico** - Palpação da parede torácica, ausculta pulmonar\n3. **Reprodutibilidade** - Dor que piora à palpação sugere origem musculoesquelética\n4. **Analgesia** - AINE ou dipirona\n5. **ECG** - Se dúvida diagnóstica\n6. **RX de tórax** - Se suspeita de pneumotórax ou fratura",
            calculadoras: [
                "**HEART Score** - Descartar SCA se dúvida",
                "Avaliação clínica é geralmente suficiente"
            ],
            referencias: [],
            rawMarkdown: "\n# Dor no peito em pontada\n\n> Dor localizada ou que piora ao mexer ou respirar\n\n## Informações Gerais\n\n- **Código**: `CV_CHEST_PAIN_ATYPICAL`\n- **Grupo**: [[CV - Cardiovascular/_índice|CV - Peito / Coração]]\n- **Nível de Risco**: 🟡 Médio\n- **Severidade**: 2/5\n- **Fast Track**: Sim\n\n### Público-Alvo\n- Adultos\n- Idosos\n\n## Sintomas Relacionados\n\n- Dor ao respirar profundo\n- Dor ao movimento\n- Inchaço na parede torácica\n\n## Red Flags\n\n- Dor que não melhora com analgesia\n- Dispneia associada\n- Febre (pensar em pleurite/pneumonia)\n- Trauma recente\n- Uso de anticoagulantes\n\n## Diagnóstico Diferencial\n\n- Costocondrite / Síndrome de Tietze\n- Dor musculoesquelética\n- Dor pleurítica\n- Herpes zoster\n- Pneumotórax\n- Fratura de costela\n\n## Calculadoras Recomendadas\n\n- **HEART Score** - Descartar SCA se dúvida\n- Avaliação clínica é geralmente suficiente\n\n## Conduta Inicial\n\n1. **Anamnese detalhada** - Característica, localização, fatores de melhora/piora\n2. **Exame físico** - Palpação da parede torácica, ausculta pulmonar\n3. **Reprodutibilidade** - Dor que piora à palpação sugere origem musculoesquelética\n4. **Analgesia** - AINE ou dipirona\n5. **ECG** - Se dúvida diagnóstica\n6. **RX de tórax** - Se suspeita de pneumotórax ou fratura\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| R07.9 | Dor torácica, não especificada |\n| M79.1 | Mialgia |\n\n## Termos de Busca\n\n`dor no peito em pontada` `fisgada no peito` `dor no peito ao respirar` `dor no peito ao mexer` `dor costocondral`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Problema no pulmão\"\n- \"Costela quebrada\"\n\n## Links Relacionados\n\n- [[CV - Cardiovascular/_índice|Grupo CV - Cardiovascular]]\n- [[CV_CHEST_PAIN_TYPICAL]] - Dor no peito em aperto\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
        }
    },
    {
        id: "GEN_UNWELL_UNSPEC",
        group: "GEN",
        title: "Passando mal (sem foco definido)",
        subtitle: "Mal-estar geral sem sintoma principal claro",
        ageTargets: [
            "adult"
        ],
        riskLevel: "medium",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: false,
        chips: [],
        searchTerms: [],
        synonyms: [
            "mal-estar",
            "indisposição",
            "malaise"
        ],
        relatedSymptoms: [
            "Fadiga",
            "Fraqueza",
            "Irritabilidade"
        ],
        bodySystem: [],
        severity: 1,
        commonMisconceptions: [],
        icd10Codes: [
            "R53.83"
        ],
        searchWeight: 1,
        lastSync: "2025-12-25T17:05:30.739Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [
                "Sinais vitais anormais",
                "Alteração do nível de consciência",
                "Dor torácica ou abdominal",
                "Dispneia",
                "Febre",
                "Perda de peso não intencional",
                "Sudorese noturna",
                "Idoso com apresentação atípica (pode ser infecção grave)",
                "Síncope ou pré-síncope",
                "Palidez intensa"
            ],
            diagnosticoDiferencial: [],
            condutaInicial: "",
            calculadoras: [],
            referencias: [],
            rawMarkdown: "\n# Passando mal (sem foco definido)\n\n> Mal-estar geral sem sintoma principal claro\n\n## Informações Gerais\n\n- **Código**: `GEN_UNWELL_UNSPEC`\n- **Grupo**: [[GEN - Geral/_índice|GEN - Geral / Adm]]\n- **Nível de Risco**: 🟡 Médio\n- **Severidade**: 1/5\n- **Fast Track**: Não\n\n### Público-Alvo\n- Adultos\n- Idosos\n\n## Sintomas Relacionados\n\n- Fadiga\n- Fraqueza\n- Irritabilidade\n\n## Red Flags\n\n- Sinais vitais anormais\n- Alteração do nível de consciência\n- Dor torácica ou abdominal\n- Dispneia\n- Febre\n- Perda de peso não intencional\n- Sudorese noturna\n- Idoso com apresentação atípica (pode ser infecção grave)\n- Síncope ou pré-síncope\n- Palidez intensa\n\n## Diagnóstico Diferencial\n\n### Infeccioso\n- Viroses / IVAS\n- ITU (especialmente idosos)\n- Sepse oculta\n\n### Metabólico\n- Hipoglicemia\n- Hiperglicemia\n- Desidratação\n- Distúrbios eletrolíticos\n- Insuficiência adrenal\n\n### Cardiovascular\n- IAM atípico (especialmente idosos, diabéticos)\n- IC descompensada\n- Arritmias\n\n### Hematológico\n- Anemia\n- Leucemias\n\n### Psiquiátrico\n- Depressão\n- Somatização\n\n### Outros\n- Neoplasia oculta\n- Hipotireoidismo\n- Medicamentos\n\n## Conduta Inicial\n\n### 1. Triagem Completa\n- Sinais vitais detalhados\n- Glicemia capilar\n- Oximetria\n- Avaliação do estado geral\n\n### 2. Anamnese Sistemática\n- **O** - Onset (início)\n- **P** - Provocação/Paliação\n- **Q** - Qualidade\n- **R** - Radiação\n- **S** - Severidade\n- **T** - Tempo/duração\n- **A** - Associated symptoms\n\n### 3. Revisão por Sistemas\n- Neurológico (cefaleia, confusão, fraqueza)\n- Cardiovascular (dor torácica, dispneia, edema)\n- Respiratório (tosse, febre, dispneia)\n- Gastrointestinal (dor abdominal, vômitos, diarreia)\n- Urinário (disúria, polaciúria, dor lombar)\n- Psiquiátrico (humor, sono, apetite)\n\n### 4. Exame Físico Completo\n- Não pular etapas quando queixa inespecífica\n\n### 5. Exames Complementares (conforme suspeita)\n- Hemograma\n- Glicemia\n- Eletrólitos\n- Função renal\n- PCR / VHS\n- Urina tipo 1\n- ECG (especialmente idosos)\n\n## Apresentações Atípicas em Idosos\n\n| Doença | Apresentação Clássica | Atípica em Idosos |\n|--------|----------------------|-------------------|\n| IAM | Dor torácica | Mal-estar, dispneia, confusão |\n| Pneumonia | Febre, tosse | Confusão, queda, inapetência |\n| ITU | Disúria | Confusão, mal-estar |\n| Abdome agudo | Dor intensa | Dor leve ou ausente |\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| R53.83 | Outro mal-estar |\n\n## Termos de Busca\n\n`mal-estar` `indisposto` `fraqueza`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Depressão\"\n- \"Tristeza\"\n\n## Links Relacionados\n\n- [[GEN - Geral/_índice|Grupo GEN - Geral]]\n- [[INF - Infecção/_índice|Grupo INF - Febre/Infecção]]\n- [[PSI - Saúde Mental/_índice|Grupo PSI - Saúde Mental]]\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
        }
    }
],
}
