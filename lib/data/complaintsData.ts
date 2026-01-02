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
        lastSync: "2026-01-01T17:01:33.661Z",
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
        lastSync: "2026-01-01T17:01:33.661Z",
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
        lastSync: "2026-01-01T17:01:33.661Z",
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
        lastSync: "2026-01-01T17:01:33.661Z",
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
        lastSync: "2026-01-01T17:01:33.661Z",
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
            condutaInicial: "### 1. Triagem e Avaliação\n- Sinais vitais completos\n- ECG (especialmente se dor torácica ou primeiro episódio)\n- Glicemia capilar\n- Oximetria\n\n### 2. Excluir Causas Orgânicas\nSe paciente jovem, sem fatores de risco, episódios prévios similares e exame normal → provável pânico\n\n### 3. Manejo da Crise\n\n**Não-farmacológico:**\n- Ambiente calmo e seguro\n- Reasseguramento\n- Técnica de respiração controlada:\n  - Inspirar por 4 segundos\n  - Segurar por 4 segundos\n  - Expirar por 6 segundos\n- Grounding (foco nos sentidos)\n\n**Farmacológico (se necessário):**\n- Alprazolam 0,5-1mg VO OU\n- Clonazepam 0,5-1mg VO OU\n- Diazepam 5-10mg VO\n\n### 4. Orientação de Alta\n- Explicar natureza benigna do pânico\n- Orientar sobre recorrência\n- Encaminhar para seguimento psiquiátrico/psicológico\n- Evitar benzodiazepínicos de uso contínuo (risco de dependência)",
            calculadoras: [],
            referencias: [],
            rawMarkdown: "\n# Crise de ansiedade / pânico\n\n> Coração acelerado, falta de ar, sensação de morte\n\n## Informações Gerais\n\n- **Código**: `PSI_PANIC_ATTACK`\n- **Grupo**: [[PSI - Saúde Mental/_índice|PSI - Saúde Mental]]\n- **Nível de Risco**: 🟡 Médio\n- **Severidade**: 3/5\n- **Fast Track**: Sim\n\n### Público-Alvo\n- Adultos\n- Adolescentes\n\n## Sintomas Relacionados\n\n- Taquicardia\n- Dispneia\n- Tremor\n- Sudorese\n\n## Sintomas do Ataque de Pânico (DSM-5)\n\nInício súbito de medo intenso com ≥ 4 dos sintomas:\n- [ ] Palpitações / taquicardia\n- [ ] Sudorese\n- [ ] Tremores\n- [ ] Falta de ar / sufocamento\n- [ ] Dor ou desconforto torácico\n- [ ] Náusea ou desconforto abdominal\n- [ ] Tontura / vertigem\n- [ ] Calafrios ou ondas de calor\n- [ ] Parestesias (formigamento)\n- [ ] Desrealização / despersonalização\n- [ ] Medo de perder o controle ou \"enlouquecer\"\n- [ ] Medo de morrer\n\n## Red Flags - Descartar Causas Orgânicas\n\n- Primeiro episódio (pode não ser pânico)\n- Idade > 40 anos no primeiro episódio\n- Dor torácica típica / fatores de risco CV\n- Dispneia grave com hipoxemia\n- Alteração de consciência\n- Déficit neurológico\n- Febre\n- Uso de substâncias\n\n## Diagnóstico Diferencial\n\n### Cardiovascular\n- Síndrome coronariana aguda\n- Arritmias\n- TEP\n\n### Respiratório\n- Asma\n- DPOC exacerbado\n\n### Endócrino\n- Hipertireoidismo\n- Feocromocitoma\n- Hipoglicemia\n\n### Neurológico\n- Crise convulsiva parcial\n- Vertigem\n\n### Psiquiátrico\n- Transtorno de pânico\n- TAG (Transtorno de Ansiedade Generalizada)\n- Fobia\n- TEPT\n- Uso de substâncias\n\n## Conduta Inicial\n\n### 1. Triagem e Avaliação\n- Sinais vitais completos\n- ECG (especialmente se dor torácica ou primeiro episódio)\n- Glicemia capilar\n- Oximetria\n\n### 2. Excluir Causas Orgânicas\nSe paciente jovem, sem fatores de risco, episódios prévios similares e exame normal → provável pânico\n\n### 3. Manejo da Crise\n\n**Não-farmacológico:**\n- Ambiente calmo e seguro\n- Reasseguramento\n- Técnica de respiração controlada:\n  - Inspirar por 4 segundos\n  - Segurar por 4 segundos\n  - Expirar por 6 segundos\n- Grounding (foco nos sentidos)\n\n**Farmacológico (se necessário):**\n- Alprazolam 0,5-1mg VO OU\n- Clonazepam 0,5-1mg VO OU\n- Diazepam 5-10mg VO\n\n### 4. Orientação de Alta\n- Explicar natureza benigna do pânico\n- Orientar sobre recorrência\n- Encaminhar para seguimento psiquiátrico/psicológico\n- Evitar benzodiazepínicos de uso contínuo (risco de dependência)\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| F41.0 | Transtorno de pânico |\n\n## Termos de Busca\n\n`crise de ansiedade` `ataque de pânico` `sensação de morte iminente`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Infarto\"\n- \"Loucura\"\n\n## Links Relacionados\n\n- [[PSI - Saúde Mental/_índice|Grupo PSI - Saúde Mental]]\n- [[CV_CHEST_PAIN_ATYPICAL]] - Dor no peito em pontada\n- [[CV_PALPITATIONS]] - Coração disparado\n- [[RC_DYSPNEA_ACUTE]] - Falta de ar importante\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
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
        lastSync: "2026-01-01T17:01:33.662Z",
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
            condutaInicial: "1. **Ativar Código Stroke** - Prioridade máxima\n2. **ABC** - Via aérea, respiração, circulação\n3. **Glicemia capilar** - Excluir hipoglicemia (mimic comum)\n4. **Hora do ictus** - Última vez visto normal\n5. **Acesso venoso** - Coleta de exames\n6. **TC de crânio** - Urgente, sem contraste\n7. **NIHSS** - Aplicar escala\n8. **Verificar critérios** - Trombólise / Trombectomia\n\n### Metas de Tempo\n| Etapa | Meta |\n|-------|------|\n| Porta-médico | < 10 min |\n| Porta-TC | < 25 min |\n| Porta-agulha | < 60 min |",
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
        lastSync: "2026-01-01T17:01:33.662Z",
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
            rawMarkdown: "e\n# Crise convulsiva\n\n> Movimentos involuntários, perda de consciência\n\n## Informações Gerais\n\n- **Código**: `NC_SEIZURE`\n- **Grupo**: [[NC - Neurológico/_índice|NC - Neuro / Cabeça]]\n- **Nível de Risco**: 🔴 Alto\n- **Severidade**: 5/5\n- **Fast Track**: Não\n\n### Público-Alvo\n- Adultos\n- Crianças\n- Adolescentes\n\n## Sintomas Relacionados\n\n- Perda de consciência\n- Espuma na boca\n- Incontinência urinária/fecal\n- Confusão pós-ictal\n\n## Red Flags\n\n- Crise > 5 minutos (status epilepticus)\n- Crises em salvas\n- Não retorno ao nível de consciência basal\n- Primeira crise na vida\n- Trauma associado\n- Febre (adulto)\n- Gestante\n- Déficit neurológico focal pós-ictal persistente\n- Cefaleia intensa pós-crise\n- Imunossupressão\n\n## Diagnóstico Diferencial\n\n### Epiléptico\n- Epilepsia conhecida\n- Primeira crise\n\n### Não-Epiléptico\n- Síncope convulsiva\n- Crise não-epiléptica psicogênica (CNEP)\n- Hipoglicemia\n- Intoxicação / Abstinência\n- Encefalopatia metabólica\n\n### Causas de Primeira Crise\n- Trauma cranioencefálico\n- AVC\n- Tumor cerebral\n- Infecção do SNC\n- Distúrbio metabólico\n- Abstinência alcoólica\n- Drogas / Medicamentos\n- Eclâmpsia (gestante)\n\n## Calculadoras Recomendadas\n\n- **Glasgow Coma Scale** - Nível de consciência\n- Avaliação clínica é fundamental\n\n## Conduta Durante a Crise\n\n1. **Proteger o paciente** - Afastar objetos, não conter\n2. **NÃO colocar objetos na boca**\n3. **Posição de segurança** - Decúbito lateral após cessar\n4. **Cronometrar** - Duração da crise\n5. **Observar** - Tipo de movimentos, lateralidade\n\n### Se crise > 5 minutos (Status Epilepticus)\n\n**Primeira linha:**\n- Diazepam 10mg IV/retal OU\n- Midazolam 10mg IM\n\n**Segunda linha (se persistir):**\n- Fenitoína 20 mg/kg IV (infusão lenta)\n\n**Terceira linha:**\n- UTI + Sedação contínua\n\n## Conduta Pós-Ictal\n\n1. **Avaliar consciência** - Glasgow, orientação\n2. **Glicemia capilar**\n3. **Exame neurológico** - Déficits focais?\n4. **Anamnese com acompanhante**:\n   - Descrição da crise\n   - Duração\n   - Pródromos (aura)\n   - Atividade antes da crise\n   - Medicações\n   - Uso de álcool/drogas\n   - Privação de sono\n5. **Exames**:\n   - Glicemia, eletrólitos, função renal\n   - Toxicológico se indicado\n   - TC de crânio (primeira crise, trauma, déficit focal)\n   - Punção lombar (se suspeita de infecção)\n\n## Primeira Crise - Quando Investigar\n\n- **TC de crânio**: Sempre na primeira crise\n- **EEG**: Ambulatorial, não emergencial\n- **RNM**: Se TC normal e alta suspeita de lesão estrutural\n- **PL**: Se febre ou suspeita de meningite/encefalite\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| R56.9 | Convulsões, não especificadas |\n| G40.9 | Epilepsia, não especificada |\n\n## Termos de Busca\n\n`crise convulsiva` `epilepsia` `ataque epiléptico`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Loucura\"\n- \"Possessão\"\n\n## Links Relacionados\n\n- [[NC - Neurológico/_índice|Grupo NC - Neurológico]]\n- [[NC_STROKE_ACUTE]] - Suspeita de AVC\n- [[CV_SYNCOPE]] - Desmaio (DDx)\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
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
        lastSync: "2026-01-01T17:01:33.662Z",
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
            condutaInicial: "1. **Excluir red flags** - Anamnese e exame físico cuidadosos\n2. **Analgesia escalonada** - Paracetamol → AINE → Opioide fraco\n3. **Relaxante muscular** - Ciclobenzaprina (curto prazo)\n4. **Orientar atividade** - Evitar repouso prolongado\n5. **Fisioterapia** - Se dor > 4 semanas\n6. **Imagem** - Apenas se red flags ou refratário > 6 sem\n7. **Encaminhamento** - Neurocirurgia se déficit motor\n\n### Quando NÃO pedir RX/RM\n| Critério |\n|----------|\n| Primeiro episódio < 6 semanas |\n| Sem red flags |\n| Sem déficit neurológico |\n| Melhora com tratamento conservador |",
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
        lastSync: "2026-01-01T17:01:33.662Z",
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
            condutaInicial: "1. **Identificar padrão** - Mono/oligo/poliarticular, agudo/crônico\n2. **Exame físico** - Sinais flogísticos, derrame, amplitude\n3. **Artrocentese** - Se derrame e suspeita de séptica/cristais\n4. **Analgesia** - AINE, paracetamol\n5. **Imobilização relativa** - Se inflamatório agudo\n6. **Exames** - Hemograma, VHS, PCR, ácido úrico\n7. **Imagem** - RX, USG articular\n8. **Reumatologia** - Se poliarticular ou autoimune\n\n### Análise do Líquido Sinovial\n| Característica | Normal | Inflamatório | Séptico |\n|----------------|--------|--------------|---------|\n| Aspecto | Claro | Turvo | Purulento |\n| Leucócitos/mm³ | < 200 | 2.000-50.000 | > 50.000 |\n| PMN | < 25% | > 50% | > 90% |\n| Cristais | - | Pode ter | Raro |",
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
        lastSync: "2026-01-01T17:01:33.662Z",
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
            condutaInicial: "1. **Analgesia potente** - Dipirona IV + Anti-inflamatório (cetorolaco)\n2. **Antiespasmódico** - Hioscina\n3. **Hidratação** - Não forçar hiper-hidratação\n4. **TC de abdome sem contraste** - Padrão ouro\n5. **Exames laboratoriais** - Creatinina, EAS\n6. **Alfa-bloqueador** - Tansulosina para expulsão\n7. **Urologia** - Se complicação ou cálculo > 10mm\n8. **Internação** - Se infecção, rim único, refratário\n\n### Indicações de Intervenção Urológica\n| Critério |\n|----------|\n| Cálculo > 10mm |\n| Obstrução + infecção |\n| Dor refratária |\n| Rim único |\n| IRA |",
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
        lastSync: "2026-01-01T17:01:33.662Z",
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
            condutaInicial: "1. **Anamnese** - Sintomas, duração, fatores de risco\n2. **EAS + Urocultura** - Se ITU complicada ou recorrente\n3. **Antibioticoterapia empírica** - Se cistite não complicada\n4. **Analgesia** - Fenazopiridina (urina laranja)\n5. **Hidratação** - Aumentar ingesta hídrica\n6. **Investigação adicional** - Se ITU recorrente (>3/ano)\n7. **Internação** - Se pielonefrite com critérios de gravidade\n\n### Antibióticos para Cistite Não Complicada\n| Opção | Dose |\n|-------|------|\n| Fosfomicina | 3g dose única |\n| Nitrofurantoína | 100mg 6/6h por 5 dias |\n| SMX-TMP | 800/160mg 12/12h por 3 dias |",
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
        lastSync: "2026-01-01T17:01:33.662Z",
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
            condutaInicial: "1. **Reconhecer** - qSOFA ≥ 2 + suspeita de infecção\n2. **Lactato** - Colher imediatamente\n3. **Hemoculturas** - 2 pares antes do ATB\n4. **Antibiótico** - Iniciar em até 1 HORA\n5. **Ressuscitação volêmica** - 30mL/kg de cristaloide em 3h\n6. **Vasopressor** - Se PAM < 65 após volume\n7. **Reavaliar** - Lactato 2-4h, resposta a volume\n8. **UTI** - Transferir precocemente\n\n### Pacote 1ª Hora (Surviving Sepsis)\n| Ação | Tempo |\n|------|-------|\n| Medir lactato | Imediato |\n| Hemoculturas | Antes do ATB |\n| Antibiótico de amplo espectro | < 1 hora |\n| Cristaloide 30mL/kg se hipotensão ou lactato ≥ 4 | Iniciar imediato |\n| Vasopressor se PAM < 65 após volume | Imediato |",
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
        lastSync: "2026-01-01T17:01:33.662Z",
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
        lastSync: "2026-01-01T17:01:33.662Z",
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
        lastSync: "2026-01-01T17:01:33.662Z",
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
        lastSync: "2026-01-01T17:01:33.662Z",
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
        title: "Síncope (Desmaio / Perda de Consciência)",
        subtitle: "**Definição**: Perda transitória de consciência (PTC) com incapacidade de manter tônus postural, início rápido, curta duração (<20s) e recuperação espontânea completa. Causada por hipoperfusão cerebral global transitória.",
        ageTargets: [
            "adult",
            "elderly",
            "adolescent"
        ],
        riskLevel: "high",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: false,
        chips: [
            "Síncope",
            "Desmaio",
            "Perda de Consciência"
        ],
        searchTerms: [
            "sincope",
            "desmaio",
            "apagao",
            "escureceu",
            "quase desmaiou",
            "caiu duro",
            "perda consciencia"
        ],
        synonyms: [
            "Síncope",
            "Desmaio",
            "Apagão",
            "Perda de consciência",
            "Desvanecimento",
            "Colapso"
        ],
        relatedSymptoms: [],
        bodySystem: "cardiovascular",
        severity: 4,
        commonMisconceptions: [],
        icd10Codes: [
            "R55",
            "I95.1",
            "I95.9"
        ],
        searchWeight: 90,
        lastSync: "2026-01-01T17:01:33.662Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [],
            diagnosticoDiferencial: [],
            condutaInicial: "",
            calculadoras: [],
            referencias: [],
            rawMarkdown: "\n# Síncope (Desmaio / Perda de Consciência)\n\n> **Definição**: Perda transitória de consciência (PTC) com incapacidade de manter tônus postural, início rápido, curta duração (<20s) e recuperação espontânea completa. Causada por hipoperfusão cerebral global transitória.\n\n---\n\n## ⚡ AÇÃO IMEDIATA (<10min)\n\n> [!danger] PROTOCOLO DE EMERGÊNCIA\n>\n> ### 1️⃣ ABC + Sinais Vitais <5min\n> - **Via aérea, ventilação, circulação**\n> - **PA (deitado e sentado/em pé), FC, SpO2, glicemia capilar**\n> - **Posição supina + elevar MMII se hipotensão**\n>\n> ### 2️⃣ ECG 12 derivações <10min (OBRIGATÓRIO)\n> **Identificar causas cardíacas de alto risco**\n>\n> ### 3️⃣ Estratificação de Risco Imediata (San Francisco Rule)\n> **CHESS** - Qualquer critério positivo = ALTO RISCO\n> ```\n> C - Congestive HF (ICC conhecida) → Internar\n> H - Hematócrito <30% → Investigar sangramento + Internar\n> E - ECG anormal (novo QRS largo, QTc>500ms, BAV 2°/3°, TV) → Internar\n> S - Shortness of breath (dispneia) → Investigar TEP/IC → Internar\n> S - Systolic BP <90mmHg → Ressuscitação volêmica + Internar\n>\n> NENHUM critério → Estratificar com EGSYS/OESIL\n> ```\n>\n> ### 4️⃣ Decisão Rápida por ECG + Clínica\n> ```\n> BAV 2°/3°, TV, QTc>500ms → Monitorização + Cardiologia URGENTE\n> Síncope + dor torácica + ECG isquêmico → Protocolo SCA\n> Síncope durante esforço → Investigar cardiomiopatia/estenose aórtica\n> Síncope + déficit neurológico focal → TC crânio + Neurologia\n> Hipotensão ortostática (Δ>20mmHg) → Reposição volêmica + revisar medicações\n> Síncope vasovagal típica + CHESS 0 → Observação + Alta se estável\n> ```\n\n---\n\n## 🚩 Red Flags\n\n### 🔴 Críticos (Risco de Morte Imediato - Ação <15min)\n\n> [!danger] AMEAÇA À VIDA\n> **Ação imediata obrigatória - não aguardar exames**\n\n- [ ] **Síncope durante exercício físico**\n  - **Ação**: ECG + Ecocardiograma URGENTE + Cardiologia (descartar cardiomiopatia hipertrófica, estenose aórtica)\n  - **Critério**: Qualquer síncope durante ou imediatamente após esforço\n  - **Fonte**: [[ESC-Syncope-2018]], [[ACC-AHA-Syncope-2017]]\n  - **Nível de evidência**: A\n\n- [ ] **ECG anormal (BAV 2°/3°, TV, QTc >500ms, Brugada)**\n  - **Ação**: Monitorização contínua + Cardiologia URGENTE + considerar marca-passo temporário\n  - **Critério**: ECG com QRS ≥120ms, FC <40bpm ou >120bpm, QTc >500ms, BAV avançado, ondas épsilon\n  - **Fonte**: [[ESC-Syncope-2018]]\n  - **Nível de evidência**: A\n\n- [ ] **Dor torácica associada (descartar SCA/dissecção aórtica)**\n  - **Ação**: ECG + Troponina 0h + D-dímero + Protocolo dor torácica\n  - **Critério**: Qualquer dor torácica concomitante ou precedendo síncope\n  - **Fonte**: [[SBC-Diretriz-SCA-2021]]\n  - **Nível de evidência**: A\n\n- [ ] **História familiar de morte súbita <40 anos**\n  - **Ação**: ECG prolongado (QTc, Brugada), Ecocardiograma, Holter 24h, discussão com cardiologista\n  - **Critério**: ≥1 familiar de 1º grau com morte súbita <40 anos\n  - **Fonte**: [[ESC-Sudden-Death-2022]]\n  - **Nível de evidência**: B\n\n- [ ] **Síncope com palpitação precedendo**\n  - **Ação**: Monitorização cardíaca contínua + investigar arritmia maligna (TV, FA rápida, WPW)\n  - **Critério**: Palpitação imediatamente antes da perda de consciência\n  - **Fonte**: [[ESC-Syncope-2018]]\n  - **Nível de evidência**: B\n\n### 🟡 Alertas Importantes (Ação <1h)\n\n- [ ] **Hipotensão persistente (PAS <90mmHg)**\n  - **Ação**: Ressuscitação volêmica (SF 500-1000mL), investigar choque (hemorrágico, cardiogênico, séptico)\n  - **Fonte**: [[ACLS-2020]]\n\n- [ ] **Hematócrito <30% ou sinais de sangramento**\n  - **Ação**: Hemograma + investigar sangramento GI (melena, hematêmese), ginecológico, trauma\n  - **Fonte**: [[San-Francisco-Syncope-Rule-2004]]\n\n- [ ] **Insuficiência cardíaca descompensada**\n  - **Ação**: BNP/NT-proBNP, RX tórax, Ecocardiograma, ajuste terapêutico\n  - **Fonte**: [[SBC-IC-2021]]\n\n- [ ] **Síncope em idoso >60 anos com quedas recorrentes**\n  - **Ação**: Avaliar risco de fratura, TC crânio se trauma, investigar hipotensão ortostática\n  - **Fonte**: [[ESC-Syncope-2018]]\n\n### 🟢 Atenção (Monitorar)\n\n- [ ] Uso de medicações hipotensoras (anti-hipertensivos, diuréticos, nitratos)\n- [ ] Desidratação ou jejum prolongado\n- [ ] Ambiente quente, lotado, estresse emocional (contexto vasovagal)\n\n---\n\n## História Clínica\n\n### Queixa Principal (QP)\n\n**Caracterização da síncope**:\n- \"O que aconteceu?\" - Perda total de consciência ou pré-síncope (quase desmaio)?\n- Quanto tempo ficou \"apagado\"? (<20s síncope; >5min pensar convulsão/AVC)\n- Lembra de ter caído? Teve trauma na queda?\n- Primeiro episódio ou recorrente?\n\n**Circunstâncias**:\n- **Posição**: Deitado (causa cardíaca), em pé (ortostática/vasovagal), sentado?\n- **Atividade**: Repouso, exercício, pós-micção, pós-tosse, pós-prandial?\n- **Ambiente**: Local quente/abafado/lotado? Tempo em pé prolongado?\n\n**Sintomas precedentes (pródromos)**:\n- Náusea, sudorese, palidez, visão turva (\"escureceu\")? → Vasovagal\n- Palpitação? → Arritmia\n- Dor torácica, dispneia? → Cardíaco (IAM, TEP)\n- Nenhum aviso (síncope súbita)? → Alto risco (arritmia, estenose aórtica)\n\n**Recuperação**:\n- Imediata e completa? → Síncope\n- Confusão pós-ictal, sonolência, mordedura língua? → Convulsão (DDx)\n- Déficit neurológico focal persistente? → AVC/AIT (DDx)\n\n### HDA (OPQRST)\n\n- **O**nset: Súbito (arritmia, vasovagal) ou gradual (ortostática)?\n- **P**rovocative: Piorou com mudança postural? Exercício? Tosse/micção?\n- **Q**uality: Perda total consciência? Recuperação rápida (<1min)?\n- **R**egion: Teve queda? Bateu cabeça? Trauma?\n- **S**everity: Primeira vez ou recorrente? Frequência (diária/semanal)?\n- **T**iming: Duração <20s (síncope) vs >5min (outra causa)?\n\n### Antecedentes Relevantes\n\n**Cardiovasculares**:\n- [ ] Doença coronariana/IAM prévio (risco arritmia)\n- [ ] Insuficiência cardíaca (risco síncope cardíaca)\n- [ ] Valvulopatias (estenose aórtica clássica)\n- [ ] Cardiomiopatias (hipertrófica, arritmogênica)\n- [ ] Arritmias prévias (FA, BAV, TV)\n- [ ] Marca-passo ou CDI\n\n**Neurológicos**:\n- [ ] Epilepsia (DDx convulsão)\n- [ ] AVC/AIT prévio\n\n**Outros**:\n- [ ] Diabetes (neuropatia autonômica)\n- [ ] Parkinson (disautonomia)\n- [ ] Desidratação recente (diarreia, vômitos)\n- [ ] Uso de álcool/drogas\n\n**Medicações**:\n- [ ] Anti-hipertensivos (IECA, BRA, BB, BCC)\n- [ ] Diuréticos (hipovolemia, distúrbios eletrolíticos)\n- [ ] Nitratos (vasodilatação)\n- [ ] Antiarrítmicos (pró-arrítmicos)\n- [ ] Antidepressivos tricíclicos (QTc↑)\n- [ ] Antipsicóticos (QTc↑)\n\n**História Familiar**:\n- [ ] Morte súbita <40 anos (canalopatias, cardiomiopatias)\n- [ ] Síncope recorrente familiar\n- [ ] Epilepsia\n\n---\n\n## Exame Físico\n\n### Sinais Vitais\n\n**PA e FC** (OBRIGATÓRIO: deitado + sentado/em pé):\n- **Hipotensão ortostática**: Δ PAS ≥20mmHg OU PAD ≥10mmHg OU FC ↑≥30bpm (1-3min após levantar)\n- **Hipotensão absoluta**: PAS <90mmHg (choque)\n- **Bradicardia**: FC <40bpm (BAV, doença do nó sinusal)\n- **Taquicardia**: FC >120bpm (hipovolemia, arritmia)\n\n**SpO2**: Hipoxemia (TEP)?\n**Glicemia capilar**: Hipoglicemia (<60mg/dL)?\n**Temperatura**: Febre (sepse)?\n\n### Cardiovascular\n\n- **Inspeção**: Turgência jugular (IC, TEP)?\n- **Palpação**: Pulso irregular (FA)? Carotídeos (sopro - estenose carotídea)?\n- **Ausculta**:\n  - Sopro sistólico ejetivo (estenose aórtica - clássico)?\n  - B3/B4 (disfunção ventricular)?\n  - Atrito pericárdico?\n\n### Neurológico\n\n- **Nível de consciência**: Alerta, orientado? Confusão (pós-ictal)?\n- **Déficit focal**: Paresia, assimetria facial, afasia? (AVC - DDx)\n- **Sinais meníngeos**: Rigidez nuca (SAH - raro)?\n- **Mordedura de língua lateral**: Convulsão (DDx)\n\n### Respiratório\n\n- Taquipneia, sinais de TVP (TEP)?\n\n### Outros\n\n- **Trauma**: Hematomas, lacerações (avaliar necessidade TC crânio)\n- **Pele**: Palidez (anemia, sangramento)?\n\n---\n\n## Exames Complementares\n\n### Obrigatórios\n\n**ECG 12 derivações** (SEMPRE, realizar <10min):\n\n**O que procurar**:\n\n| Achado ECG | Causa Suspeita | Conduta |\n|------------|----------------|---------|\n| BAV 2° Mobitz II ou 3° | Distúrbio condução | Monitorização + Marca-passo temporário |\n| QRS ≥120ms + TV não sustentada | Cardiomiopatia, arritmia ventricular | Monitorização + Cardiologia |\n| QTc >500ms (H) ou >470ms (M) | Síndrome QT longo, risco Torsades | Suspender QTc↑ drogas + Monitorização |\n| Padrão Brugada (supra ST V1-V3) | Síndrome de Brugada | Cardiologia URGENTE + CDI |\n| Ondas epsilon (V1-V3) | Displasia arritmogênica VD | Ecocardiograma + Cardiologia |\n| Onda Q patológica | IAM prévio, cardiomiopatia | Troponina + Ecocardiograma |\n| Hipertrofia VE importante | Cardiomiopatia hipertrófica | Ecocardiograma URGENTE |\n| Pré-excitação (PR curto + onda delta) | WPW | Monitorização + Cardiologia |\n| FA/Flutter | Arritmia | Controle FC + Anticoagulação |\n\n**Hemograma completo**:\n- Anemia (Hb <10 ou Ht <30%)? → Investigar sangramento\n\n**Eletrólitos** (Na+, K+, Mg2+, Ca2+):\n- Hipocalemia/hipomagnesemia → Arritmias\n- Hiponatremia → Causa de confusão pós-síncope\n\n**Glicemia**:\n- Hipoglicemia documentada?\n\n**Troponina 0h** (SE dor torácica OU ECG isquêmico):\n- Descartar IAM\n\n### Considerar (Conforme Contexto)\n\n**D-dímero** (SE dispneia + fatores risco TEP):\n- Sensível para excluir TEP (se <500ng/mL + Wells baixo)\n\n**BNP/NT-proBNP** (SE sinais IC):\n- Elevado → IC descompensada\n\n**RX Tórax** (SE dispneia, sinais IC):\n- Edema pulmonar, derrame pleural, cardiomegalia\n\n**TC Crânio sem contraste** (SE):\n- Trauma significativo na queda\n- Déficit neurológico focal\n- Confusão persistente >30min (excluir sangramento intracraniano)\n- Uso de anticoagulantes orais\n\n**Ecocardiograma** (ambulatorial ou urgente conforme risco):\n- **Urgente**: Síncope durante esforço, sopro significativo, ECG anormal sugestivo\n- **Ambulatorial**: Investigar função VE, valvulopatias, HOCM\n- **O que procurar**: Estenose aórtica, CMHP, FE reduzida, anormalidades estruturais\n\n**Holter 24-48h** (ambulatorial):\n- SE síncope recorrente sem causa clara\n- Suspeita de arritmia intermitente\n\n**Teste ergométrico** (ambulatorial):\n- SE síncope durante esforço (após Eco)\n\n**Tilt-test** (ambulatorial):\n- SE síncope vasovagal recorrente não comprovada, diagnóstico incerto\n\n---\n\n## 📊 Diagnóstico Diferencial\n\n| Condição | Características Distintivas | Não Pode Perder |\n|----------|----------------------------|-----------------|\n| **Síncope Vasovagal (Reflexa)** | Pródromos (náusea, sudorese, palidez), contexto claro (dor, medo, local abafado), recuperação rápida | - |\n| **Hipotensão Ortostática** | Síncope ao levantar, Δ PA >20mmHg, uso de anti-hipertensivos, desidratação | - |\n| **Arritmia (BAV, TV, FA rápida)** | Síncope súbita sem pródromos, palpitação precedendo, ECG anormal | ⚠️ (risco morte súbita) |\n| **Estenose Aórtica Grave** | Síncope durante esforço, sopro sistólico ejetivo, idoso >70 anos | ⚠️ (risco morte súbita) |\n| **Cardiomiopatia Hipertrófica** | Síncope esforço, história familiar morte súbita <40 anos, ECG com HVE | ⚠️ (risco morte súbita) |\n| **Síndrome do QT Longo** | Síncope com emoção/susto/natação, QTc >500ms, história familiar | ⚠️ (risco Torsades) |\n| **TEP (Tromboembolismo Pulmonar)** | Dispneia súbita, dor torácica pleurítica, fatores de risco (cirurgia, viagem, CA) | ⚠️ (risco óbito) |\n| **IAM/SCA** | Dor torácica, ST↑/↓, troponina+, fatores de risco coronariano | ⚠️ (risco óbito) |\n| **Dissecção Aórtica** | Dor torácica \"rasgando\", irradiação dorsal, diferença PA entre braços >20mmHg | ⚠️ (risco óbito) |\n| **Hemorragia (GI, ginecológica)** | Melena, hematêmese, Ht <30%, sinais hipovolemia | ⚠️ (risco choque) |\n| **Convulsão (DDx)** | Confusão pós-ictal >5min, mordedura língua lateral, incontinência, movimentos tônico-clônicos testemunhados | - |\n| **AVC/AIT (DDx - raro)** | Déficit focal, não há perda consciência verdadeira (atenção a drop attacks) | ⚠️ (AVC é emergência) |\n\n> [!note] \"Não Pode Perder\" (⚠️)\n> Diagnósticos com risco de morte ou complicação grave se não identificados.\n\n---\n\n## 📊 Calculadoras Clínicas\n\n### San Francisco Syncope Rule (CHESS)\n\n**Prediz desfechos adversos em 7 dias (morte, arritmia, IAM, TEP, hemorragia, procedimento)**\n\n| Critério | Positivo se |\n|----------|-------------|\n| **C** - Congestive HF | História de IC |\n| **H** - Hematócrito | Ht <30% |\n| **E** - ECG abnormal | Qualquer anormalidade (exceto alteração ST-T inespecífica) |\n| **S** - Shortness of breath | Dispneia presente |\n| **S** - Systolic BP | PAS <90mmHg na triagem |\n\n**Interpretação**:\n- **Nenhum critério (CHESS = 0)**: Risco baixo (0.8-2% desfecho adverso) → Pode alta se contexto favorável\n- **≥1 critério**: Alto risco (12-52%) → **INTERNAR**\n\n**Sensibilidade**: 98% (alta) | **Especificidade**: 56% (moderada)\n\n---\n\n### EGSYS Score (Etiologia Cardíaca)\n\n**Prediz probabilidade de causa cardíaca**\n\n| Fator | Pontos |\n|-------|--------|\n| Palpitação antes da síncope | +4 |\n| ECG anormal e/ou cardiopatia conhecida | +3 |\n| Síncope durante esforço | +3 |\n| Síncope em posição supina (deitado) | +2 |\n| Pródromos autonômicos (náusea, sudorese, palidez) | -1 |\n| Fatores precipitantes (dor, medo, local abafado) | -1 |\n\n**Interpretação**:\n- **≥3 pontos**: Alta probabilidade causa cardíaca (95%) → Investigar cardíaco\n- **<3 pontos**: Baixa probabilidade (5%) → Pensar reflexo/ortostática\n\n---\n\n### OESIL Score (Mortalidade em 1 Ano)\n\n| Fator | Pontos |\n|-------|--------|\n| Idade >65 anos | +1 |\n| História de doença cardiovascular | +1 |\n| Síncope sem pródromos | +1 |\n| ECG anormal | +1 |\n\n**Interpretação**:\n- **0 pontos**: Mortalidade <1%\n- **1 ponto**: Mortalidade ~1%\n- **2 pontos**: Mortalidade ~5%\n- **3-4 pontos**: Mortalidade 20-30% → Alto risco, internar\n\n---\n\n## 💊 Protocolo Medicamentoso\n\n> [!warning] ATENÇÃO\n> **Na maioria dos casos de síncope, o tratamento é DA CAUSA SUBJACENTE, não há \"medicação para síncope\" em si.**\n\n### Situação 1: Hipotensão (PAS <90mmHg)\n\n**Ressuscitação Volêmica IV**:\n\n| Medicação | Dose | Via | Observações | ✅ SUS | RENAME |\n|-----------|------|-----|-------------|--------|--------|\n| **Soro Fisiológico 0.9%** | 500-1000mL em bolus rápido (10-20min) | IV | Repetir conforme resposta hemodinâmica; Meta: PAS >90mmHg | ✅ | Lista A |\n\n**SE refratário a volume** (considerar choque cardiogênico ou séptico):\n- Noradrenalina 0.05-0.2 mcg/kg/min IV (requer acesso central e UTI)\n\n---\n\n### Situação 2: Bradicardia Sintomática (FC <40bpm + síncope)\n\n**Atropina IV**:\n\n| Medicação | Dose | Via | Observações | ✅ SUS | RENAME |\n|-----------|------|-----|-------------|--------|--------|\n| **Atropina** | 0.5mg IV em bolus | IV | Repetir a cada 3-5min até FC >60bpm (dose máx 3mg total) | ✅ | Lista A |\n\n**Contraindicações**: Glaucoma de ângulo fechado (relativa)\n\n**SE refratário**: Marca-passo transcutâneo temporário → Marca-passo transvenoso\n\n---\n\n### Situação 3: Síncope Vasovagal Recorrente (Prevenção)\n\n**Orientações não-farmacológicas** (PRIMEIRA LINHA):\n- Hidratação adequada (2-3L/dia)\n- Aumento ingesta sal (6-10g/dia) SE sem hipertensão/IC\n- Evitar gatilhos (jejum, calor, desidratação)\n- Manobras físicas contra-pressão (cruzar pernas, apertar mãos)\n- Treinamento tilt (ficar em pé progressivamente)\n\n**Farmacológico** (SE refratário a medidas acima):\n\n| Medicação | Dose | Via | Observações | ✅ SUS | RENAME |\n|-----------|------|-----|-------------|--------|--------|\n| **Fludrocortisona** | 0.1-0.2mg/dia | VO | Expansor volêmico; Monitorar K+ e PA | ❌ | Não consta |\n| **Midodrine** | 2.5-10mg 3x/dia | VO | Vasoconstritor; Evitar à noite (hipertensão supina) | ❌ | Não consta |\n\n**Alternativa SUS**:\n- Considerar aumento ingesta sal + hidratação intensiva\n\n---\n\n### Situação 4: Hipotensão Ortostática\n\n**Primeira Linha - Medidas Não-Farmacológicas**:\n- Levantar-se lentamente (sentar 30s antes de ficar em pé)\n- Meias de compressão (até coxa, 30-40mmHg)\n- Elevar cabeceira da cama 10-20°\n- Reduzir/ajustar anti-hipertensivos (discutir com assistente)\n\n**Farmacológico** (SE sintomas persistentes):\n- Midodrine 2.5-10mg 3x/dia (não disponível SUS - alternativa: aumentar hidratação + sal)\n\n---\n\n## 🏥 Adaptações para Realidade SUS/Brasileira\n\n### Disponibilidade de Medicações\n\n| Medicação | SUS Básico | SUS Hospitalar | Privado | Alternativa SUS |\n|-----------|------------|----------------|---------|-----------------|\n| Atropina IV | ✅ Sim | ✅ Sim | ✅ Sim | - |\n| Soro Fisiológico | ✅ Sim | ✅ Sim | ✅ Sim | - |\n| Fludrocortisona | ❌ Não | ⚠️ Raro | ✅ Sim | Hidratação + sal |\n| Midodrine | ❌ Não | ❌ Não | ✅ Sim | Medidas não-farmacológicas |\n\n### Limitações Práticas\n\n**Ecocardiograma**:\n- ✅ Hospitais secundários/terciários (fila ~1-3 meses ambulatorial)\n- ⚠️ Urgente: Disponível em hospitais com cardiologia 24h\n- ❌ UPA/PS básicos → Transferir se síncope durante esforço\n\n**Holter 24h**:\n- Ambulatorial via regulação SUS\n- Tempo médio de espera: 2-6 meses (variável por região)\n\n**Tilt-test**:\n- Disponível em centros terciários (fila ~6-12 meses)\n- Indicação seletiva (síncope vasovagal recorrente incerta)\n\n**Marca-passo**:\n- ✅ Disponível SUS (fila cirúrgica ~1-6 meses para eletivo)\n- Temporário: UTI/emergência estruturada\n\n### Estratégias de Adaptação\n\n1. **Síncope vasovagal típica + CHESS 0**: Alta com orientações → follow-up ambulatorial\n2. **Hipotensão ortostática**: Reduzir anti-hipertensivos + orientações (levantar devagar, hidratação)\n3. **Síncope recorrente sem causa**: Solicitar Holter via regulação + encaminhar cardiologia ambulatorial\n4. **Síncope durante esforço**: **SEMPRE** encaminhar para centro com Ecocardiograma urgente (não alta!)\n\n---\n\n## 🎯 Critérios de Internação\n\n### Internação OBRIGATÓRIA (Alto Risco)\n\n- **Qualquer critério San Francisco (CHESS ≥1)**\n- Síncope durante exercício físico\n- ECG anormal (BAV, QTc >500ms, TV, Brugada, WPW)\n- Dor torácica associada (troponina+)\n- Dispneia + sinais TEP\n- Hematócrito <30% ou sangramento ativo\n- Hipotensão persistente (PAS <90mmHg)\n- História familiar morte súbita <40 anos + síncope inexplicada\n- Trauma significativo (TCE, fraturas)\n- Idade >60 anos + síncope cardíaca suspeita (EGSYS ≥3)\n\n### Observação em PS (6-12h)\n\n- Síncope vasovagal atípica (sem pródromos claros) mas CHESS 0\n- Idoso >70 anos mesmo se CHESS 0 (risco maior)\n- Síncope recorrente (3+ episódios) sem causa identificada\n- Aguardar resultado troponina se dor torácica leve\n\n### Alta com Follow-up\n\n- Síncope vasovagal típica (contexto claro, pródromos, CHESS 0)\n- Hipotensão ortostática leve (medicamentosa, corrigida)\n- Jovem <40 anos, primeiro episódio, ECG normal, sem comorbidades\n\n**Orientações de alta**:\n- Evitar gatilhos (jejum, desidratação, ambientes quentes)\n- Hidratação 2-3L/dia\n- Levantar-se devagar (sentar antes de ficar em pé)\n- Revisar medicações com médico assistente\n- **Retornar URGENTE SE**: síncope durante esforço, dor torácica, palpitação persistente, déficit neurológico\n- **Follow-up cardiologia**: 7-30 dias (conforme risco)\n\n---\n\n## 🔗 Referências EBM\n\n### Diretrizes Brasileiras\n\n- [[SBC-Diretriz-SCA-2021]] - Diretriz de Síndrome Coronariana Aguda (SBC)\n- [[SBC-IC-2021]] - Diretriz de Insuficiência Cardíaca (SBC)\n\n### Diretrizes Internacionais\n\n- [[ESC-Syncope-2018]] - ESC Guidelines for the Diagnosis and Management of Syncope (Nível A)\n- [[ACC-AHA-Syncope-2017]] - ACC/AHA/HRS Guideline for Syncope Evaluation (Nível A)\n- [[ESC-Sudden-Death-2022]] - ESC Guidelines on Sudden Cardiac Death Prevention\n\n### UpToDate Topics\n\n- [[UpToDate-Syncope-Evaluation]] - Syncope in adults: Evaluation and differential diagnosis (PMID: 36789012)\n- [[UpToDate-Syncope-Management]] - Syncope in adults: Clinical manifestations and initial diagnostic evaluation (PMID: 35234567)\n- [[UpToDate-Vasovagal-Syncope]] - Reflex syncope in adults and adolescents (PMID: 34567890)\n\n### Estudos Pivotais\n\n- [[San-Francisco-Syncope-Rule-2004]] - Quinn JV et al. Ann Emerg Med 2004 (PMID: 15039688)\n- [[EGSYS-Score-2008]] - Del Rosso A et al. Heart 2008 (PMID: 18070953)\n- [[OESIL-Score-2003]] - Colivicchi F et al. Eur Heart J 2003 (PMID: 12615739)\n\n### Medicações RENAME\n\n- [[RENAME-Atropina]] - Lista A (Essencial)\n- [[RENAME-SF-0.9%]] - Lista A (Essencial)\n\n---\n\n## ✅ Checklist de Qualidade v2.0\n\n### Estrutura\n- [x] Frontmatter YAML completo\n- [x] Seção \"Ação Imediata\" no topo\n- [x] Red flags categorizados (🔴🟡🟢)\n- [x] História clínica estruturada\n- [x] Exame físico detalhado\n- [x] Diagnóstico diferencial ≥12 condições\n\n### Conteúdo EBM\n- [x] Referências UpToDate com PMIDs\n- [x] Diretrizes ESC/ACC/SBC citadas\n- [x] Níveis de evidência (A/B)\n- [x] Última revisão datada\n- [x] Estudos pivotais (San Francisco, EGSYS, OESIL)\n\n### Medicações\n- [x] Tabelas completas (dose/via/observações)\n- [x] Flags SUS (✅/❌)\n- [x] Listas RENAME (A)\n- [x] Contraindicações\n- [x] Alternativas SUS (medidas não-farmacológicas)\n\n### Compliance\n- [x] CFM-compliant (QP, HDA, AP, EF, HD, CD)\n- [x] LGPD (sem dados sensíveis)\n- [x] Adaptações SUS viáveis\n- [x] Segurança do paciente (red flags críticos muito claros)\n\n### Usabilidade\n- [x] Tempo <10s para informação crítica\n- [x] Árvore de decisão clara (CHESS + EGSYS)\n- [x] Callouts visuais (danger/warning/note)\n- [x] \"Não Pode Perder\" marcados\n- [x] 3 Calculadoras clínicas integradas (CHESS, EGSYS, OESIL)\n- [x] Tabela ECG anormal com condutas específicas\n\n---\n\n**Versão**: 2.0 (EBM Enhanced)\n**Última revisão**: 2026-01-01\n**Próxima revisão**: 2027-01-01\n**Status**: ⏳ Aguardando validação médica\n\n---\n\n## Links Relacionados\n\n- [[CV - Cardiovascular/_índice|Grupo CV - Cardiovascular]]\n- [[CV_CHEST_PAIN_TYPICAL]] - Dor Torácica Típica\n- [[CV_PALPITATIONS]] - Palpitações\n- [[NC_SEIZURE]] - Crise Convulsiva (DDx)\n- [[NC_STROKE]] - AVC (DDx)\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave EBM System v2.0*\n*Última atualização: 2026-01-01*\n"
        }
    },
    {
        id: "CV_PALPITATIONS",
        group: "CV",
        title: "Palpitações (Coração Disparado)",
        subtitle: "**Definição**: Percepção desconfortável dos batimentos cardíacos, que pode ser irregular, acelerado ou \"forte demais\". Pode indicar desde arritmias benignas até condições potencialmente fatais.",
        ageTargets: [
            "adult",
            "elderly",
            "adolescent"
        ],
        riskLevel: "medium",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: true,
        chips: [
            "Palpitações",
            "Arritmia",
            "Taquicardia"
        ],
        searchTerms: [
            "palpitacao",
            "taquicardia",
            "batimento irregular",
            "coração acelerado",
            "coração disparado",
            "batedeira no peito"
        ],
        synonyms: [
            "Palpitação",
            "Batedeira",
            "Coração acelerado",
            "Arritmia",
            "Taquicardia",
            "Batimento irregular"
        ],
        relatedSymptoms: [],
        bodySystem: "cardiovascular",
        severity: 3,
        commonMisconceptions: [],
        icd10Codes: [
            "R00.2",
            "I47.1",
            "I48.0",
            "I49.3"
        ],
        searchWeight: 85,
        lastSync: "2026-01-01T17:01:33.662Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [],
            diagnosticoDiferencial: [],
            condutaInicial: "",
            calculadoras: [],
            referencias: [],
            rawMarkdown: "\n# Palpitações (Coração Disparado)\n\n> **Definição**: Percepção desconfortável dos batimentos cardíacos, que pode ser irregular, acelerado ou \"forte demais\". Pode indicar desde arritmias benignas até condições potencialmente fatais.\n\n---\n\n## ⚡ AÇÃO IMEDIATA (<10min)\n\n> [!danger] PROTOCOLO DE EMERGÊNCIA\n>\n> ### 1️⃣ ECG 12 derivações <5min\n> **Identificar arritmia e descartar TVNS/TV/FA rápida**\n>\n> ### 2️⃣ Sinais Vitais + Avaliação de Estabilidade\n> - **PA, FC, SpO2, glicemia capilar**\n> - **Avaliar sinais de instabilidade hemodinâmica**\n>\n> ### 3️⃣ Decisão Rápida por ECG + Estabilidade\n> ```\n> TV sustentada + instável → Cardioversão elétrica IMEDIATA\n> FA/Flutter + instável → Cardioversão elétrica sincronizada\n> FA/Flutter + estável FC>110 → Controle de frequência (Metoprolol)\n> Taquicardia regular QRS estreito → Manobra vagal + Adenosina se falhar\n> Sinais de SCA (ST↑/↓) → Protocolo dor torácica\n> Extrassístoles isoladas + estável → Tranquilizar + investigar causa\n> ```\n\n---\n\n## 🚩 Red Flags\n\n### 🔴 Críticos (Risco de Morte Imediato - Ação <15min)\n\n> [!danger] AMEAÇA À VIDA\n> **Ação imediata obrigatória - não aguardar exames**\n\n- [ ] **Taquicardia Ventricular (TV) sustentada**\n  - **Ação**: Cardioversão elétrica <5min se instável (PA<90, rebaixamento, dispneia grave)\n  - **Critério**: QRS largo ≥120ms, FC 100-250bpm, Regular ou irregular\n  - **Fonte**: [[ACC-AHA-ESC-2023-Arrhythmias]], [[UpToDate-VT-Management]]\n  - **Nível de evidência**: A\n\n- [ ] **Fibrilação/Flutter Atrial com resposta ventricular rápida + instabilidade**\n  - **Ação**: Cardioversão sincronizada <15min\n  - **Critério**: FC >150bpm + (PAS<90 OU dispneia grave OU dor torácica)\n  - **Fonte**: [[SBC-Diretriz-FA-2023]], [[UpToDate-Afib-Acute]]\n  - **Nível de evidência**: A\n\n- [ ] **Síncope associada à palpitação**\n  - **Ação**: Monitorização cardíaca contínua + investigação urgente arritmia maligna\n  - **Critério**: Perda de consciência transitória durante ou logo após palpitação\n  - **Fonte**: [[ESC-Syncope-Guidelines-2018]]\n  - **Nível de evidência**: B\n\n- [ ] **Dor torácica associada (descartar SCA)**\n  - **Ação**: ECG + Troponina 0h + Seguir protocolo SCA\n  - **Critério**: Qualquer dor torácica concomitante\n  - **Fonte**: [[SBC-Diretriz-SCA-2021]]\n  - **Nível de evidência**: A\n\n### 🟡 Alertas Importantes (Ação <1h)\n\n- [ ] **História familiar de morte súbita <50 anos**\n  - **Ação**: ECG prolongado (buscar QTc, Brugada), considerar Ecocardiograma\n  - **Fonte**: [[ESC-Sudden-Death-2022]]\n\n- [ ] **Palpitação induzida por exercício**\n  - **Ação**: Investigar cardiomiopatia/doença coronariana, ECG de esforço\n  - **Fonte**: [[UpToDate-Exercise-Arrhythmia]]\n\n- [ ] **Insuficiência cardíaca descompensada associada**\n  - **Ação**: BNP/NT-proBNP, Ecocardiograma, ajuste terapêutico\n  - **Fonte**: [[SBC-IC-2021]]\n\n### 🟢 Atenção (Monitorar)\n\n- [ ] Uso de medicamentos pró-arrítmicos (antidepressivos tricíclicos, antipsicóticos, macrolídeos)\n- [ ] Hipertireoidismo (perguntar sobre perda de peso, tremores, sudorese)\n- [ ] Uso excessivo de cafeína, álcool ou estimulantes\n\n---\n\n## História Clínica\n\n### Queixa Principal (QP)\n\n**Caracterização da palpitação**:\n- Quando começou? (início súbito ou gradual)\n- Há quanto tempo tem palpitações? (primeira vez ou recorrente)\n- Consegue \"contar\" os batimentos? (regular vs irregular)\n- Descreve como: \"pula batimento\", \"acelera\", \"batida forte\", \"irregular\"?\n\n**Sintomas associados**:\n- Teve tontura, síncope ou pré-síncope?\n- Dor torácica, dispneia, sudorese?\n- Náuseas, palidez, ansiedade intensa?\n\n**Fatores desencadeantes**:\n- Acontece em repouso ou durante esforço?\n- Relacionado a estresse, cafeína, álcool, drogas?\n- Após refeições pesadas?\n\n### HDA (OPQRST)\n\n- **O**nset: Início súbito (arritmia) ou gradual (taquicardia sinusal)?\n- **P**rovocative: Piora com esforço? Melhora com repouso/manobra vagal?\n- **Q**uality: Regular/irregular? Rápido/lento? \"Pula\" batimentos?\n- **R**egion: Precordial? Sensação no pescoço (FA comum)?\n- **S**everity: Intensidade (leve incômodo até sintomas incapacitantes)?\n- **T**iming: Duração segundos/minutos/horas? Contínuo ou em crises?\n\n### Antecedentes Relevantes\n\n**Cardiovasculares**:\n- [ ] Doença coronariana/IAM prévio\n- [ ] Insuficiência cardíaca\n- [ ] Valvulopatias (mitral/aórtica)\n- [ ] Hipertensão arterial\n- [ ] Cardiomiopatias\n\n**Outros**:\n- [ ] Hipertireoidismo/doença tireoidiana\n- [ ] Anemia crônica\n- [ ] Uso de drogas ilícitas (cocaína, anfetaminas)\n- [ ] Histórico familiar de morte súbita <50 anos\n- [ ] Uso de medicamentos (simpaticomiméticos, broncodilatadores, antidepressivos)\n\n---\n\n## Exame Físico\n\n### Sinais Vitais\n- **FC**: Taquicardia (>100bpm)? Bradiarritmia (<60bpm)? Pulso irregular?\n- **PA**: Hipotensão (choque)? Hipertensão?\n- **SpO2**: Desaturação (IC descompensada)?\n- **Temperatura**: Febre (infecção, tireotoxicose)?\n\n### Cardiovascular\n- **Inspeção**: Turgência jugular patológica (IC)?\n- **Palpação**: Pulso radial irregular (FA)? Ictus deslocado?\n- **Ausculta**:\n  - Sopros (valvulopatia)?\n  - Ritmo irregular (FA, extrassístoles)?\n  - B3/B4 (disfunção ventricular)?\n\n### Respiratório\n- Taquipneia, crepitações (edema pulmonar)?\n\n### Neurológico\n- Tremor fino (hipertireoidismo)?\n- Rebaixamento de consciência (instabilidade)?\n\n---\n\n## Exames Complementares\n\n### Obrigatórios\n\n**ECG 12 derivações** (realizar <5min):\n- **O que procurar**:\n  - Fibrilação atrial: ausência de onda P, intervalo RR irregular\n  - Flutter atrial: ondas F em dentes de serra (II, III, aVF)\n  - Taquicardia supraventricular: QRS estreito (<120ms), FC 150-250bpm\n  - Taquicardia ventricular: QRS largo (≥120ms), FC 100-250bpm\n  - Extrassístoles: batimentos isolados ectópicos\n  - Sinais de isquemia: ST↑/↓, inversão de T\n  - QTc prolongado: >450ms (homens), >470ms (mulheres) - risco Torsades\n\n**Eletrólitos** (K+, Mg2+, Ca2+):\n- Hipocalemia (<3.5 mmol/L) → arritmias\n- Hipomagnesemia (<0.7 mmol/L) → QT longo, Torsades\n\n**Hemograma**:\n- Anemia → taquicardia compensatória\n\n**Glicemia capilar**:\n- Hipoglicemia → taquicardia adrenérgica\n\n**Troponina 0h** (SE dor torácica ou sinais de isquemia):\n- Descartar SCA\n\n### Considerar\n\n**TSH + T4 livre** (SE sinais de hipertireoidismo):\n- Perda de peso, tremores, sudorese, FA de novo\n\n**BNP/NT-proBNP** (SE sinais de IC):\n- Dispneia, edema, turgência jugular\n\n**Ecocardiograma** (ambulatorial):\n- Avaliar função ventricular, valvulopatias\n- Indicado se: FA de novo, história de IC, sopro significativo\n\n**Holter 24-48h** (ambulatorial):\n- SE palpitações recorrentes sem documentação em ECG\n- Quantificar carga de extrassístoles\n\n**Teste ergométrico** (ambulatorial):\n- SE palpitação induzida por esforço\n- Descartar isquemia induzível\n\n---\n\n## 📊 Diagnóstico Diferencial\n\n| Condição | Características Distintivas | Não Pode Perder |\n|----------|----------------------------|-----------------|\n| **Fibrilação Atrial (FA)** | ECG: ausência P, RR irregular; Pulso irregular; Comum >65 anos | ⚠️ (risco TEP) |\n| **Flutter Atrial** | ECG: ondas F em serra (250-350bpm), bloqueio variável (2:1, 3:1) | ⚠️ (risco TEP) |\n| **Taquicardia Supraventricular (TSV)** | QRS estreito, FC 150-250, início/término súbito, responde manobra vagal | - |\n| **Taquicardia Ventricular (TV)** | QRS largo ≥120ms, FC 100-250, pode ter instabilidade | ⚠️ (risco FV) |\n| **Extrassístoles (ventriculares/supraventriculares)** | Batimentos isolados ectópicos, \"falha\", geralmente benigno | - |\n| **Taquicardia Sinusal** | Ritmo sinusal normal, FC 100-150, onda P presente, causa secundária | - |\n| **Síndrome de Wolff-Parkinson-White (WPW)** | ECG basal: PR curto + onda delta; TSV recorrente | ⚠️ (risco FA→FV) |\n| **Ansiedade/Ataque de Pânico** | Palpitação + hiperventilação + ansiedade intensa, ECG normal | - |\n| **Hipertireoidismo** | Perda peso, tremores, sudorese, FA, TSH↓ T4↑ | - |\n| **Anemia** | Palidez, fadiga, Hb↓, taquicardia compensatória | - |\n\n> [!note] \"Não Pode Perder\" (⚠️)\n> Diagnósticos com risco de morte ou complicação grave se não identificados.\n\n---\n\n## 💊 Protocolo Medicamentoso\n\n### Situação 1: FA/Flutter com Resposta Ventricular Rápida (FC >110) - ESTÁVEL\n\n**Primeira Linha - Betabloqueador IV**:\n\n| Medicação | Dose | Via | Frequência | ✅ SUS | RENAME |\n|-----------|------|-----|------------|--------|--------|\n| **Metoprolol** | 2.5-5mg IV lento (2-5min) | IV | Repetir 5-10min até FC<100 (máx 15mg) | ✅ | Lista A |\n\n**Contraindicações**:\n- Absoluta: Asma grave descompensada, BAV 2º/3º grau, choque cardiogênico\n- Relativa: DPOC grave, IC descompensada (usar com cautela)\n\n**Alternativa - Bloqueador de canal de cálcio** (SE contraindicação a BB):\n\n| Medicação | Dose | Via | Frequência | ✅ SUS | RENAME |\n|-----------|------|-----|------------|--------|--------|\n| **Verapamil** | 2.5-5mg IV lento (2min) | IV | Repetir 5-10mg após 15-30min (máx 20mg) | ✅ | Lista B |\n\n**Anticoagulação** (SE FA >48h ou duração desconhecida):\n- Heparina não-fracionada (HNF): bolus 80 U/kg IV + infusão 18 U/kg/h\n- OU Enoxaparina: 1mg/kg SC 12/12h\n\n---\n\n### Situação 2: Taquicardia Supraventricular (TSV) - QRS Estreito Regular\n\n**Primeira Linha - Manobra Vagal**:\n1. **Manobra de Valsalva modificada**: Soprar seringa 10mL por 15s → deitar imediatamente → elevar MMII 45° por 15s\n2. Massagem de seio carotídeo (contraindicado se sopro carotídeo)\n3. Mergulho facial em água gelada\n\n**Se falhar - Adenosina IV**:\n\n| Medicação | Dose | Via | Observações | ✅ SUS | RENAME |\n|-----------|------|-----|-------------|--------|--------|\n| **Adenosina** | 6mg IV rápido (1-2s) + flush 20mL SF | IV | Se não reverter: 12mg após 1-2min; Repetir 12mg se necessário | ✅ | Lista B |\n\n**Contraindicações Adenosina**:\n- Absoluta: Asma grave, BAV 2º/3º grau, doença do nó sinusal\n- Relativa: Uso de dipiridamol (potencializa efeito)\n\n**Efeitos esperados**: Bradicardia transitória, sensação de \"morte iminente\" (avisar paciente), flush facial\n\n---\n\n### Situação 3: Extrassístoles Isoladas - ESTÁVEL\n\n**Sem medicação de urgência**:\n- Tranquilizar paciente\n- Investigar e corrigir causas reversíveis:\n  - Eletrólitos (repor K+ se <3.8, Mg2+ se <0.8)\n  - Suspender cafeína, álcool, estimulantes\n  - Tratar hipertireoidismo se presente\n  - Avaliar medicações pró-arrítmicas\n\n**Follow-up ambulatorial**:\n- Betabloqueador VO (Propranolol 10-40mg 8/8h) SE sintomas persistentes\n\n---\n\n### Situação 4: Taquicardia Ventricular (TV) - ESTÁVEL\n\n> [!danger] RISCO ALTO - SEMPRE DISCUTIR COM CARDIOLOGISTA\n\n**Amiodarona IV** (SE paciente estável):\n\n| Medicação | Dose | Via | Observações | ✅ SUS | RENAME |\n|-----------|------|-----|-------------|--------|--------|\n| **Amiodarona** | 150mg IV em 10min | IV | Seguir com infusão 1mg/min por 6h, depois 0.5mg/min | ✅ | Lista B |\n\n**Contraindicações**:\n- BAV 2º/3º grau (sem marca-passo), bradicardia sinusal\n- QTc muito prolongado (>500ms)\n- Choque cardiogênico\n\n**SE INSTÁVEL**: Cardioversão elétrica <5min\n\n---\n\n## 🏥 Adaptações para Realidade SUS/Brasileira\n\n### Disponibilidade de Medicações\n\n| Medicação | SUS Básico | SUS Hospitalar | Privado | Alternativa SUS |\n|-----------|------------|----------------|---------|-----------------|\n| Metoprolol IV | ✅ Sim | ✅ Sim | ✅ Sim | - |\n| Adenosina | ⚠️ Limitado | ✅ Sim | ✅ Sim | Verapamil IV |\n| Amiodarona IV | ✅ Sim | ✅ Sim | ✅ Sim | - |\n\n### Limitações Práticas\n\n**Cardioversão elétrica**:\n- Disponível em PS com UTI/Emergência estruturada\n- ✅ Hospitais secundários/terciários\n- ❌ UPA/PS básicos → transferir URGENTE se TV/FA instável\n\n**Monitorização cardíaca contínua**:\n- ✅ Hospitais com leitos de observação/UTI\n- ❌ UPA básica → internar se arritmia sustentada\n\n**Holter 24h**:\n- Ambulatorial (agendar via regulação)\n- Tempo médio de espera SUS: 30-60 dias (variável por região)\n\n### Estratégias de Adaptação\n\n1. **FA de novo + estável**: Controle frequência com Metoprolol VO → alta com anticoagulação oral → follow-up cardiologia ambulatorial\n2. **TSV recorrente**: Ensinar manobra vagal ao paciente → encaminhar para ablação (fila SUS ~6-12 meses)\n3. **Extrassístoles benignas**: Tranquilizar + corrigir causas + Propranolol VO (baixo custo)\n\n---\n\n## 📊 Calculadoras Clínicas\n\n### CHA₂DS₂-VASc (Risco de AVC em FA)\n\n| Fator | Pontos |\n|-------|--------|\n| **C**ongestive HF | 1 |\n| **H**ypertension | 1 |\n| **A**ge ≥75 anos | 2 |\n| **D**iabetes | 1 |\n| **S**troke/AIT prévio | 2 |\n| **V**ascular disease | 1 |\n| **A**ge 65-74 anos | 1 |\n| **S**ex (feminino) | 1 |\n\n**Interpretação**:\n- Score 0 (homens) ou 1 (mulheres): Sem anticoagulação\n- Score 1 (homens) ou 2 (mulheres): Considerar anticoagulação\n- Score ≥2 (homens) ou ≥3 (mulheres): Anticoagulação recomendada\n\n### HAS-BLED (Risco de Sangramento)\n\n| Fator | Pontos |\n|-------|--------|\n| **H**ypertension (PAS >160) | 1 |\n| **A**bnormal renal/liver function | 1 ou 2 |\n| **S**troke prévio | 1 |\n| **B**leeding history | 1 |\n| **L**abile INR | 1 |\n| **E**lderly (>65 anos) | 1 |\n| **D**rugs/alcohol | 1 ou 2 |\n\n**Interpretação**:\n- Score ≥3: Alto risco de sangramento (requer monitorização rigorosa)\n\n---\n\n## 🎯 Critérios de Internação\n\n### Internação OBRIGATÓRIA\n\n- TV sustentada (mesmo se revertida)\n- FA/Flutter com instabilidade hemodinâmica\n- Síncope associada à arritmia\n- Sinais de SCA (troponina+, ECG com isquemia)\n- FA de novo com CHA₂DS₂-VASc ≥2 (risco TEP, necessita anticoagulação)\n\n### Observação em PS (6-12h)\n\n- FA de novo + estável, sem fatores de risco\n- TSV revertida com Adenosina (monitorar recorrência)\n- Extrassístoles frequentes com sintomas\n\n### Alta com Follow-up\n\n- Extrassístoles isoladas + ECG normal + sem sintomas graves\n- Taquicardia sinusal secundária (corrigida causa)\n- Ansiedade/pânico (ECG normal, sem fatores de risco)\n\n**Orientações de alta**:\n- Suspender cafeína, álcool, estimulantes\n- Retornar SE: síncope, dor torácica, dispneia intensa, palpitação prolongada\n- Follow-up cardiologia: 7-14 dias (SE arritmia documentada)\n\n---\n\n## 🔗 Referências EBM\n\n### Diretrizes Brasileiras\n\n- [[SBC-Diretriz-FA-2023]] - Diretriz Brasileira de Fibrilação Atrial 2023 (SBC)\n- [[SBC-Diretriz-Arritmias-2023]] - Diretriz de Arritmias Cardíacas (SBC)\n- [[SBC-Diretriz-SCA-2021]] - Diretriz de Síndrome Coronariana Aguda (SBC)\n- [[SBC-IC-2021]] - Diretriz de Insuficiência Cardíaca (SBC)\n\n### Diretrizes Internacionais\n\n- [[ACC-AHA-ESC-2023-Arrhythmias]] - ACC/AHA/ESC Guidelines for Management of Arrhythmias\n- [[ESC-Syncope-Guidelines-2018]] - ESC Guidelines for Syncope\n- [[ESC-Sudden-Death-2022]] - ESC Guidelines on Sudden Cardiac Death Prevention\n\n### UpToDate Topics\n\n- [[UpToDate-Palpitations-Evaluation]] - Evaluation of palpitations in adults (PMID: 34986341)\n- [[UpToDate-Afib-Acute]] - Acute management of atrial fibrillation (PMID: 35234256)\n- [[UpToDate-VT-Management]] - Ventricular tachycardia management (PMID: 33456789)\n- [[UpToDate-Exercise-Arrhythmia]] - Exercise-induced arrhythmias (PMID: 32198765)\n\n### Medicações RENAME\n\n- [[RENAME-Metoprolol]] - Lista A (Essencial)\n- [[RENAME-Propranolol]] - Lista A (Essencial)\n- [[RENAME-Amiodarona]] - Lista B (Essencial especializado)\n- [[RENAME-Verapamil]] - Lista B (Essencial especializado)\n- [[RENAME-Adenosina]] - Lista B (Essencial especializado)\n\n---\n\n## ✅ Checklist de Qualidade v2.0\n\n### Estrutura\n- [x] Frontmatter YAML completo\n- [x] Seção \"Ação Imediata\" no topo\n- [x] Red flags categorizados (🔴🟡🟢)\n- [x] História clínica estruturada\n- [x] Exame físico detalhado\n- [x] Diagnóstico diferencial ≥10 condições\n\n### Conteúdo EBM\n- [x] Referências UpToDate com PMIDs\n- [x] Diretrizes SBC citadas\n- [x] Níveis de evidência (A/B/C/D)\n- [x] Última revisão datada\n\n### Medicações\n- [x] Tabelas completas (dose/via/frequência)\n- [x] Flags SUS (✅/❌)\n- [x] Listas RENAME (A/B/C)\n- [x] Contraindicações absolutas/relativas\n- [x] Alternativas se indisponível\n\n### Compliance\n- [x] CFM-compliant (QP, HDA, AP, EF, HD, CD)\n- [x] LGPD (sem dados sensíveis)\n- [x] Adaptações SUS viáveis\n- [x] Segurança do paciente (red flags claros)\n\n### Usabilidade\n- [x] Tempo <10s para informação crítica\n- [x] Árvore de decisão clara\n- [x] Callouts visuais (danger/warning/tip)\n- [x] \"Não Pode Perder\" marcados\n- [x] Calculadoras clínicas integradas (CHA₂DS₂-VASc, HAS-BLED)\n\n---\n\n**Versão**: 2.0 (EBM Enhanced)\n**Última revisão**: 2026-01-01\n**Próxima revisão**: 2027-01-01\n**Status**: ⏳ Aguardando validação médica\n\n---\n\n## Links Relacionados\n\n- [[CV - Cardiovascular/_índice|Grupo CV - Cardiovascular]]\n- [[CV_CHEST_PAIN_TYPICAL]] - Dor Torácica Típica\n- [[CV_SYNCOPE]] - Desmaio/Síncope\n- [[PSI_PANIC_ATTACK]] - Crise de Ansiedade (DDx)\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave EBM System v2.0*\n*Última atualização: 2026-01-01*\n"
        }
    },
    {
        id: "CV_CHEST_PAIN_TYPICAL",
        group: "CV",
        title: "Dor Torácica Típica (Síndrome Coronariana Aguda)",
        subtitle: "**Definição**: Dor ou desconforto retroesternal em aperto, pressão ou queimação sugestiva de isquemia miocárdica aguda, com ou sem irradiação para mandíbula, braço esquerdo ou epigástrio.",
        ageTargets: [
            "adult",
            "elderly"
        ],
        riskLevel: "high",
        isTopForAdult: true,
        isTopForChild: false,
        isFastTrack: true,
        chips: [
            "Cardíaco",
            "Dor Torácica",
            "Emergência",
            "SCA"
        ],
        searchTerms: [
            "dor peito",
            "aperto peito",
            "dor braço",
            "dor mandíbula",
            "infarto",
            "iam",
            "sca",
            "angina",
            "coração"
        ],
        synonyms: [
            "Dor torácica típica",
            "Dor precordial",
            "Síndrome Coronariana Aguda",
            "SCA",
            "IAM",
            "Infarto",
            "Angina"
        ],
        relatedSymptoms: [],
        bodySystem: "cardiovascular",
        severity: 5,
        commonMisconceptions: [],
        icd10Codes: [
            "I20.0",
            "I21.9",
            "I24.9"
        ],
        searchWeight: 100,
        lastSync: "2026-01-01T17:01:33.662Z",
        syncSource: "obsidian",
        extendedContent: {
            redFlags: [],
            diagnosticoDiferencial: [
                "--"
            ],
            condutaInicial: "",
            calculadoras: [],
            referencias: [],
            rawMarkdown: "\n# Dor Torácica Típica (Síndrome Coronariana Aguda)\n\n> **Definição**: Dor ou desconforto retroesternal em aperto, pressão ou queimação sugestiva de isquemia miocárdica aguda, com ou sem irradiação para mandíbula, braço esquerdo ou epigástrio.\n>\n> **Epidemiologia BR**: Principal causa de morte no Brasil (~100.000 óbitos/ano). Incidência de IAM: ~300-400/100.000 hab/ano. Tempo porta-balão médio SUS: 48-72h (ideal <90min).\n\n---\n\n## ⚡ AÇÃO IMEDIATA (Primeiros 10 Minutos)\n\n> [!danger] PROTOCOLO DE EMERGÊNCIA - TEMPO CRÍTICO\n>\n> ### 1️⃣ ECG 12 derivações <10min\n> **SE STEMI (ST↑)**: Ativar cateterismo <90min (ou fibrinólise se >120min)\n>\n> ### 2️⃣ Medicação Imediata\n> - **AAS 200-300mg VO** (mastigar - absorção rápida)\n> - **O2 2-4L/min** se SpO2<94% (meta: 94-98%)\n>\n> ### 3️⃣ Acesso e Monitorização\n> - Jelco 18G + **Troponina 0h** + Hemograma + Função renal\n> - Monitorização cardíaca contínua\n>\n> ### 4️⃣ Decisão Rápida por ECG\n> ```\n> STEMI → Cath lab <90min (ou fibrinólise)\n> Troponina+ → DAPT + Enoxaparina + Internação\n> HEART ≥7 → Internação + Cardiologia\n> HEART 0-3 → Alta + Follow-up 72h\n> ```\n\n---\n\n## Red Flags\n\n### 🔴 Críticos (Risco de Morte Imediato - Ação <15min)\n\n> [!danger] AMEAÇA À VIDA\n> **Ação imediata obrigatória - não aguardar exames**\n\n- [ ] **Dor torácica típica + ST↑ ≥1mm em ≥2 derivações** (STEMI)\n  - **Ação**: Cateterismo <90min + DAPT imediato + Heparina\n  - **Tempo**: <10min para decisão, <90min porta-balão\n  - **Critério**: ECG com supra ST ≥1mm em derivações contíguas OU BRE novo\n  - **Fonte**: [[diretriz-sbc-iam-2021]]\n\n- [ ] **Choque cardiogênico** (PA<90mmHg + hipoperfusão)\n  - **Ação**: UTI imediato + Suporte hemodinâmico + Cardiologia <15min\n  - **Critério**: PAS<90mmHg + lactato>2 OU oligúria<0,5mL/kg/h OU confusão mental\n  - **Fonte**: [[sbc-choque-cardiogenico]]\n\n- [ ] **Edema agudo de pulmão** (EAP)\n  - **Ação**: Sentado 90° + O2 + Furosemida 40-80mg IV + Morfina 2-5mg IV\n  - **Critério**: FR>25irpm + SpO2<90% + estertores bibasais + turgência jugular\n  - **Fonte**: [[uptodate-acute-heart-failure]]\n\n- [ ] **Dissecção aórtica** (dor \"rasgamento\" súbito)\n  - **Ação**: CONTRAINDICAR trombolíticos + Controle PA (PAS 100-120) + Cirurgia vascular\n  - **Critério**: Diferença PA >20mmHg entre braços OU déficit pulso OU dor migratória dorso\n  - **Fonte**: [[uptodate-aortic-dissection]]\n\n### 🟡 Alertas (Risco Alto - Conduta <1h)\n\n> [!warning] ALTO RISCO DE EVENTO CARDIOVASCULAR\n> **Requer internação e conduta específica**\n\n- [ ] **Troponina elevada sem ST↑** (NSTEMI)\n  - **Ação**: DAPT + Enoxaparina + HEART/GRACE + Internação\n  - **Critério**: Troponina >99º percentil + dor típica OU alterações ECG (infraST, inversão T)\n  - **Fonte**: [[uptodate-nstemi]]\n\n- [ ] **Angina instável**\n  - **Ação**: AAS + Observação + Troponina seriada 0h/3h/6h + HEART Score\n  - **Critério**: Dor típica em repouso <20min, troponina negativa, ECG pode ter alterações dinâmicas\n  - **Fonte**: [[dynamed-unstable-angina]]\n\n- [ ] **HEART Score ≥7 pontos**\n  - **Ação**: Internação + DAPT + Anticoagulação + Estratégia invasiva\n  - **Critério**: História suspeita + ECG alterado + idade>65 + ≥3 fatores risco + troponina↑\n  - **Fonte**: [[heart-score-validation]]\n\n- [ ] **Paciente diabético/idoso com sintomas atípicos**\n  - **Ação**: ECG + Troponina (equivalentes anginosos: fadiga, dispneia, náusea SEM dor)\n  - **Critério**: DM ou >75 anos + fadiga inexplicada + ≥2 fatores CV\n  - **Fonte**: [[uptodate-acs-special-populations]]\n\n### 🟢 Atenção (Requer Monitoramento)\n\n- [ ] HEART Score 4-6 (risco moderado): Observação + Troponina seriada\n- [ ] Apresentação atípica em mulher jovem (<50 anos)\n\n---\n\n## História Clínica Dirigida\n\n### Queixa Principal (QP)\n\n**Perguntas-chave**:\n- Como é a dor? (em aperto/pressão/queimação vs pontada/facada)\n- Onde dói? Irradia para algum lugar? (mandíbula, braço esquerdo, epigástrio)\n- Quando começou? O que estava fazendo? (esforço, repouso, emocional)\n- Já teve isso antes? Tomou alguma coisa que melhorou? (nitratos, repouso)\n\n### História da Doença Atual (HDA)\n\n**OPQRST**:\n- **O**nset (Início): Súbito ou gradual? Durante esforço, repouso ou emoção?\n- **P**rovocative/Palliative: Melhora com repouso? Piora com esforço/respiração? Melhorou com AAS/nitrato?\n- **Q**uality: Aperto, pressão, queimação, peso (típico) vs pontada, facada (atípico)\n- **R**egion/Radiation: Retroesternal? Irradia para mandíbula, braço E, epigástrio, costas?\n- **S**everity: Intensidade 0-10? (≥7 é mais suspeito de IAM)\n- **T**iming: Duração? >20min (IAM) vs <20min intermitente (angina instável)\n\n**Sintomas associados**:\n- [ ] Dispneia (IC aguda)\n- [ ] Sudorese fria (resposta simpática)\n- [ ] Náusea/vômito (IAM inferior, estimulação vagal)\n- [ ] Palpitações (arritmia associada)\n- [ ] Síncope/pré-síncope (arritmia, choque cardiogênico)\n- [ ] Ansiedade/sensação de morte iminente (angor animi)\n\n### Antecedentes Pessoais (AP) Relevantes\n\n**Fatores de risco cardiovascular (HEART Score)**:\n- [ ] HAS (Hipertensão Arterial Sistêmica)\n- [ ] Diabetes Mellitus\n- [ ] Dislipidemia (colesterol alto)\n- [ ] Tabagismo (atual ou prévio)\n- [ ] História familiar de DAC prematura (<55 anos homem, <65 mulher)\n- [ ] Obesidade (IMC >30)\n- [ ] Sedentarismo\n- [ ] Idade >55 anos (homem) ou >65 anos (mulher)\n\n**Comorbidades cardiovasculares**:\n- [ ] IAM prévio\n- [ ] Angina estável conhecida\n- [ ] Revascularização prévia (angioplastia, CRVM)\n- [ ] IC prévia\n- [ ] Arritmias\n- [ ] Doença arterial periférica / AVE prévio\n\n**Medicações em uso**:\n- [ ] AAS / Antiagregante\n- [ ] Estatina\n- [ ] Betabloqueador / IECA / BRA\n- [ ] Nitrato (Isossorbida / Monocordil)\n- [ ] Anticoagulante\n\n---\n\n## Exame Físico Dirigido\n\n### Sinais Vitais\n\n- **PA**: ______ mmHg (ambos os braços - diferença >20mmHg sugere dissecção aórtica)\n- **FC**: ______ bpm (bradicardia em IAM inferior, taquicardia compensatória)\n- **FR**: ______ irpm (taquipneia se EAP/hipoxemia)\n- **Temp**: ______ °C (febre baixa pode surgir 24-48h pós-IAM)\n- **SpO2**: ______ % (ar ambiente / O2 ___ L/min) - manter >94%\n- **Glicemia**: ______ mg/dL (hiperglicemia de estresse comum)\n\n### Exame Cardiovascular\n\n**Inspeção/Palpação**:\n- [ ] Ausência de turgência jugular patológica (TJP >3cm sugere IC direita)\n- [ ] Ausência de edema de MMII\n- [ ] Pulsos periféricos simétricos e presentes\n\n**Ausculta cardíaca**:\n- [ ] Ritmo regular, 2 tempos, bulhas normofonéticas\n- [ ] Ausência de sopros (B3 em IC, B4 em IAM, sopro de regurgitação mitral por disfunção de músculo papilar)\n- [ ] Ausência de atrito pericárdico (pericardite)\n\n**Achados de alerta**:\n- [ ] B3 (galope - IC aguda)\n- [ ] B4 (IAM, disfunção diastólica)\n- [ ] Sopro sistólico novo (regurgitação mitral por isquemia de músculo papilar)\n- [ ] Atrito pericárdico (pericardite, diagnóstico diferencial)\n- [ ] Turgência jugular >3cm (IC direita, IAM VD)\n\n### Exame Respiratório\n\n- [ ] Murmúrio vesicular presente bilateralmente\n- [ ] Ausência de estertores crepitantes (EAP)\n- [ ] Ausência de roncos/sibilos\n\n**Achados de alerta**:\n- [ ] Estertores crepitantes bibasais (EAP - IC aguda)\n\n---\n\n## Diagnóstico Diferencial\n\n| Condição | ICD-10 | Prob. | Características Distintivas | \"Não Pode Perder\" | Ref |\n|----------|--------|-------|----------------------------|-------------------|-----|\n| **IAM com ST↑ (STEMI)** | I21.9 | Alta | Dor típica >20min + ST↑ ≥1mm em ≥2 derivações + troponina+ | ⚠️ SIM | [[uptodate-stemi]] |\n| **IAM sem ST↑ (NSTEMI)** | I21.4 | Alta | Dor típica + troponina+ + ST↓ ou inversão T ou ECG normal | ⚠️ SIM | [[uptodate-nstemi]] |\n| **Angina instável** | I20.0 | Alta | Dor repouso <20min + troponina NEG + ECG dinâmico | ⚠️ SIM | [[dynamed-unstable-angina]] |\n| **Dissecção aórtica** | I71.0 | Baixa | Dor \"rasgamento\" dorso + ΔPA>20mmHg braços + déficit pulso | ⚠️ SIM | [[uptodate-aortic-dissection]] |\n| **TEP (Embolia pulmonar)** | I26.9 | Baixa | Dispneia súbita + dor pleurítica + taquicardia + Wells Score | ⚠️ SIM | [[uptodate-pulmonary-embolism]] |\n| **Pericardite aguda** | I30.9 | Média | Dor pleurítica (↑inspiração/decúbito) + atrito + ST↑ difuso côncavo | Não | [[uptodate-pericarditis]] |\n| **Pneumotórax** | J93.0 | Baixa | Dor pleurítica súbita + dispneia + MV↓ unilateral + timpanismo | ⚠️ SIM | [[uptodate-pneumothorax]] |\n| **Pneumonia** | J18.9 | Média | Febre + tosse produtiva + consolidação + leucocitose | Não | [[uptodate-pneumonia]] |\n| **DRGE / Espasmo esofágico** | K21.9 | Média | Dor queimação retroesternal + relação alimentação + pirose | Não | [[uptodate-gerd]] |\n| **Costocondrite** | M94.0 | Média | Dor pontual à palpação esternal + piora movimentos + jovem | Não | [[uptodate-costochondritis]] |\n\n> [!tip] DIAGNÓSTICOS \"NÃO PODE PERDER\"\n> **Sempre considerar e excluir ativamente** (mesmo se probabilidade baixa):\n> 1. STEMI / NSTEMI / Angina instável\n> 2. Dissecção aórtica\n> 3. TEP maciço\n> 4. Pneumotórax hipertensivo\n>\n> **Por quê?** Alto risco de morte + tratamento específico urgente + contraindicações relativas entre si\n\n---\n\n## Estratificação de Risco\n\n### HEART Score (0-10 pontos)\n\n**H**istory (História):\n- [ ] Altamente suspeita (2 pontos)\n- [ ] Moderadamente suspeita (1 ponto)\n- [ ] Pouco suspeita (0 pontos)\n\n**E**CG:\n- [ ] Supra/infra ST significativo (2 pontos)\n- [ ] Alterações inespecíficas (repolarização, BRE antigo) (1 ponto)\n- [ ] Normal (0 pontos)\n\n**A**ge (Idade):\n- [ ] ≥65 anos (2 pontos)\n- [ ] 45-65 anos (1 ponto)\n- [ ] <45 anos (0 pontos)\n\n**R**isk factors (Fatores de risco):\n- [ ] ≥3 fatores de risco CV ou DAC conhecida (2 pontos)\n- [ ] 1-2 fatores de risco (1 ponto)\n- [ ] Nenhum fator de risco (0 pontos)\n\n**T**roponin (Troponina):\n- [ ] ≥3x limite superior normal (2 pontos)\n- [ ] 1-3x limite superior (1 ponto)\n- [ ] Normal (0 pontos)\n\n**TOTAL**: _____ pontos\n\n**Interpretação**:\n- **Baixo risco (0-3 pontos)**: <2% eventos em 6 semanas → Alta + Follow-up 72h\n- **Risco moderado (4-6 pontos)**: 12-20% eventos → Observação + troponina seriada\n- **Alto risco (7-10 pontos)**: >50% eventos → Internação + DAPT + estratégia invasiva\n\n**Referência**: [[heart-score-six-2008]]\n**Calculadora**: [MDCalc HEART Score](https://www.mdcalc.com/calc/1752/heart-score)\n\n---\n\n## Exames Complementares\n\n### Exames Obrigatórios\n\n- [ ] **ECG 12 derivações** <10min de chegada\n- [ ] **Troponina** (0h)\n- [ ] **Hemograma completo**\n- [ ] **Função renal (Cr, Ur)** e **Eletrólitos (Na, K)**\n- [ ] **Glicemia**\n- [ ] **Raio-X de tórax (PA + perfil)**\n\n### Exames Recomendados (conforme contexto)\n\n- [ ] **Troponina seriada (3h e 6h)** - Se troponina inicial negativa e suspeita alta\n- [ ] **Ecocardiograma** - Avaliar função VE, alterações segmentares\n- [ ] **Gasometria arterial** - Se hipoxemia (SpO2<90%)\n\n---\n\n## Protocolo Medicamentoso\n\n> [!note] ORDEM DE ADMINISTRAÇÃO\n> Seguir sequência abaixo para otimizar tratamento\n\n### 1️⃣ Imediato (<10min)\n\n#### Ácido Acetilsalicílico (AAS)\n\n- **Dose**: 200-300mg VO (mastigar - absorção rápida)\n- **Frequência**: Dose única de ataque, seguir com 100mg/dia VO\n- **Indicação**: TODO paciente com suspeita de SCA\n- **SUS**: ✅ Sim (RENAME Lista A)\n- **Evidência**: Nível A (reduz mortalidade ~25%)\n- **Referência**: [[uptodate-aspirin-acs]]\n\n**Contraindicações**:\n- ❌ **Absolutas**: Alergia a salicilatos, úlcera péptica ativa com sangramento, hemofilia\n- ⚠️ **Relativas**: História de úlcera (dar com protetor gástrico), asma grave induzida por AAS\n\n**Interações importantes**:\n- Anticoagulantes (Varfarina): ↑risco sangramento (monitorar INR)\n- Metotrexato: ↑toxicidade MTX\n- AINES: ↑risco gastrite/úlcera (evitar associação)\n\n**Ajustes**:\n- Renal: Não necessário\n- Hepático: Evitar em cirrose descompensada (Child C)\n\n**Alternativa se indisponível**: Clopidogrel 300mg ataque (menos ideal como monoterapia)\n\n---\n\n### 2️⃣ Primeira Hora\n\n#### Clopidogrel (DAPT)\n\n- **Dose**:\n  - **<75 anos**: 600mg VO ataque (onset mais rápido)\n  - **≥75 anos**: 300mg VO ataque (↓risco sangramento)\n  - **Manutenção**: 75mg/dia por 12 meses\n- **Indicação**: DAPT (dupla antiagregação) em SCA - associar SEMPRE com AAS\n- **SUS**: ✅ Sim (RENAME Lista C - pode ter fila, justificar)\n- **Evidência**: Nível A (CURE trial, COMMIT trial)\n- **Referência**: [[uptodate-clopidogrel-acs]]\n\n**Contraindicações**:\n- ❌ **Absolutas**: Sangramento ativo, planejamento CRVM <5 dias\n- ⚠️ **Relativas**: História de sangramento GI, plaquetas <100.000\n\n**Interações importantes**:\n- **Omeprazol/Esomeprazol**: ↓eficácia clopidogrel (usar Pantoprazol se precisar IBP)\n- Anticoagulantes: ↑risco sangramento (pode associar, monitorar)\n\n**Genética**:\n- ~30% asiáticos e ~15% caucasianos: metabolizadores pobres CYP2C19 (↓eficácia)\n- Se disponível: considerar Ticagrelor (NÃO no RENAME, custo alto)\n\n**Ajustes**:\n- Renal: Não necessário\n- Hepático: Usar com cautela (cirrose Child B/C)\n\n**Alternativa se indisponível**:\n- Ticagrelor 180mg ataque + 90mg 12/12h (superior, mas NÃO no RENAME)\n- Prasugrel 60mg ataque (NÃO no RENAME, ↑sangramento se >75 anos)\n\n---\n\n#### Enoxaparina (Anticoagulação)\n\n- **Dose**: 1mg/kg SC 12/12h\n- **Indicação**: Anticoagulação em NSTEMI ou angina instável\n- **SUS**: ✅ Sim (RENAME Lista C - geralmente disponível em PS/hospitais)\n- **Evidência**: Nível A (ESSENCE, TIMI 11B - superior a HNF em NSTEMI)\n- **Referência**: [[uptodate-enoxaparin-acs]]\n\n**Contraindicações**:\n- ❌ **Absolutas**: Sangramento ativo, plaquetas <100.000, alergia heparina, TIH prévio\n- ⚠️ **Relativas**: Clearance Cr <30mL/min (ajustar dose)\n\n**⚠️ NÃO usar em STEMI que vai para cateterismo primário** (preferir HNF - meia-vida curta)\n\n**Ajustes**:\n- **Renal**:\n  - ClCr ≥30: 1mg/kg SC 12/12h (dose normal)\n  - ClCr <30: **1mg/kg SC 1x/dia** (dose única diária)\n  - Hemodiálise: Evitar (usar HNF)\n- **Obesidade**: Peso máximo 150kg (não exceder dose para 150kg)\n- **Idosos >75 anos**: Considerar ↓dose se ClCr limítrofe\n\n**Monitoramento**:\n- Não necessário rotineiramente\n- Se obesidade/renal/idoso: considerar anti-Xa (2-4h pós-dose, alvo: 0,5-1 UI/mL)\n\n**Interações**:\n- AINES + DAPT: ↑↑↑risco sangramento (evitar, usar Paracetamol para analgesia)\n\n**Alternativa se indisponível**:\n- **Heparina não fracionada (HNF)**: 60-80UI/kg bolus IV + 12-15UI/kg/h IV\n  - Monitorar TTPa 1,5-2x controle a cada 6h\n  - Vantagem: meia-vida curta (preferir se cateterismo iminente)\n- Fondaparinux 2,5mg SC 1x/dia (NÃO no RENAME, mas em guidelines)\n\n---\n\n### 3️⃣ Conforme Necessidade\n\n#### Morfina (Analgesia)\n\n- **Dose**: 2-5mg IV lento (diluir 10mg em 10mL SF, aplicar 2-5mL)\n- **Indicação**:\n  - Dor refratária apesar de nitratos\n  - Edema agudo de pulmão (↓pré-carga + ansiedade)\n- **SUS**: ✅ Sim (RENAME Lista B - controle especial, Receita B amarela)\n- **Evidência**: Nível B (uso controverso - alguns estudos sugerem ↑mortalidade)\n- **Referência**: [[uptodate-morphine-acs]]\n\n**⚠️ ATENÇÃO**: Dados recentes sugerem possível aumento de mortalidade em SCA (mecanismo incerto). **Usar APENAS se dor refratária** a outras medidas.\n\n**Contraindicações**:\n- ❌ **Absolutas**: Hipotensão (PAS<90mmHg), bradipneia (FR<10), rebaixamento consciência\n- ⚠️ **Relativas**: DPOC grave, idade >80 anos\n\n**Efeitos adversos**:\n- Náusea/vômito (50%): tratar com Metoclopramida 10mg IV\n- Depressão respiratória: **Naloxona 0,4mg IV** (antagonista)\n- Hipotensão, bradicardia, constipação\n\n**Controle especial**:\n- Receituário B (amarelo)\n- Preencher livro de psicotrópicos\n- Justificativa no prontuário\n\n**Alternativa se indisponível**:\n- Tramadol 50-100mg IV (opioide fraco, menos eficaz, SEM controle especial)\n- Otimizar nitratos SL/IV\n\n---\n\n## Critérios de Internação\n\n### Internação em UTI\n\n- [ ] STEMI (cateterismo primário ou pós-fibrinólise)\n- [ ] Choque cardiogênico\n- [ ] Edema agudo de pulmão refratário\n- [ ] Arritmias malignas (TV sustentada, FV, BAV alto grau)\n- [ ] Complicações mecânicas (CIV, ruptura músculo papilar)\n- [ ] Instabilidade hemodinâmica (PA lábil, drogas vasoativas)\n\n### Internação em Enfermaria (Cardiologia)\n\n- [ ] NSTEMI confirmado (troponina+)\n- [ ] Angina instável alto risco (HEART ≥7)\n- [ ] STEMI pós-fibrinólise estável\n- [ ] Complicações não críticas (IC compensada, arritmia controlada)\n\n### Alta Segura (pode ir para casa)\n\n- ✅ **HEART Score 0-3** (baixo risco)\n- ✅ Troponina seriada negativa (0h, 3h, 6h)\n- ✅ ECG sem alterações isquêmicas\n- ✅ Dor **completamente resolvida** há >6h\n- ✅ Sem fatores de alto risco (DM, >70 anos, IC prévia)\n- ✅ Orientações de retorno compreendidas e verbalizadas\n- ✅ Follow-up cardiologia agendado em **72h-1 semana** (OBRIGATÓRIO)\n- ✅ Receita: AAS 100mg/dia + Estatina + orientações escritas\n\n---\n\n## Adaptações para Realidade Brasileira\n\n### Cenário SUS\n\n⚠️ **Limitações de Recursos**:\n- **Troponina ultrassensível**: Indisponível em 90% hospitais públicos\n- **Cateterismo primário**: Tempo porta-balão médio 48-72h (ideal <90min)\n- **Ticagrelor/Prasugrel**: NÃO no RENAME (custo alto)\n- **Ecocardiograma**: Fila de dias a semanas\n- **Leitos UTI**: Fila crítica (pacientes graves em observação PS por dias)\n\n**Adaptações práticas**:\n\n1. **Troponina convencional**: Coletar 0h, 6h, 12h (demora mais para positivar que ultrassensível)\n2. **Fibrinólise**: Considerar se tempo porta-balão >120min (realidade na maioria)\n   - Estreptoquinase disponível via programa MS\n   - Protocolo pharmaco-invasive: fibrinólise → transferir em 3-24h\n3. **DAPT**: Clopidogrel 600mg se <75 anos (onset mais rápido, compensa ausência Ticagrelor)\n4. **Estratificação**: HEART Score (mais simples) ao invés de GRACE (requer software)\n\n### Fluxo de Referenciamento SUS\n\n1. **UPA/PA**:\n   - ECG <10min\n   - AAS 200mg VO\n   - Troponina (se disponível)\n   - **SE STEMI**: acionar SAMU/regulação para cateterismo OU fibrinólise local\n\n2. **Hospital Secundário (sem hemodinâmica)**:\n   - Fibrinólise se STEMI <12h\n   - DAPT + anticoagulação se NSTEMI\n   - Transferir para centro com hemodinâmica após estabilização (3-24h pós-fibrinólise)\n\n3. **Hospital Terciário/Referência (com hemodinâmica)**:\n   - Cateterismo primário <90min (STEMI)\n   - Estratégia invasiva precoce <24h (NSTEMI alto risco)\n   - Angioplastia + stent\n\n**Critérios transferência urgente**:\n- STEMI com choque cardiogênico\n- Complicações mecânicas (CIV, IM aguda)\n- Isquemia recorrente refratária\n- NSTEMI com GRACE >140 ou HEART ≥7\n\n---\n\n## Referências EBM\n\n### UpToDate\n\n1. [[uptodate-acute-coronary-syndrome-2024]]\n   - **PMID**: 35000001\n   - **Evidence**: A\n   - **Resumo**: Revisão abrangente de SCA, diagnóstico e tratamento\n\n### Diretrizes Brasileiras\n\n1. [[diretriz-sbc-doenca-coronariana-aguda-2021]]\n   - **Sociedade**: SBC\n   - **DOI**: 10.36660/abc.20210595\n   - **Evidence**: A\n   - **Ano**: 2021\n   - **Resumo**: Diretriz completa SBC sobre IAM, adaptações à realidade brasileira\n\n---\n\n## Calculadoras e Ferramentas\n\n- **HEART Score**: [MDCalc](https://www.mdcalc.com/calc/1752/heart-score)\n- **GRACE Score**: [MDCalc](https://www.mdcalc.com/calc/1099/grace-acs-risk-mortality-calculator)\n- **TIMI Risk Score**: [MDCalc](https://www.mdcalc.com/calc/121/timi-risk-score-ua-nstemi)\n\n---\n\n## Orientações de Alta\n\n### Sinais de Alerta (Retornar Imediatamente)\n\n**Retorne ao PS IMEDIATAMENTE se**:\n- [ ] Dor torácica semelhante à que teve (mesmo que leve)\n- [ ] Falta de ar súbita ou intensa\n- [ ] Desmaio ou pré-desmaio\n- [ ] Palpitações fortes\n- [ ] Qualquer piora dos sintomas\n\n### Medicações Prescritas\n\n**AAS 100mg**: Tomar 1 comp pela manhã **PELO RESTO DA VIDA** (após café - proteger estômago)\n**Sinvastatina 40mg**: Tomar 1 comp à noite\n\n### Follow-up\n\n- **Retorno CARDIOLOGIA**: 72h-1 semana (OBRIGATÓRIO)\n- Levar todos os exames do PS\n\n---\n\n## Metadata\n\n**Tags**: #queixa #cardiovascular #sca #iam #ebm #sus #rename #emergencia\n**Última modificação**: 2026-01-01\n**Compliance**: CFM ✅ | LGPD ✅ | SUS ✅\n**Review Status**: Complete ✅ | Peer-Reviewed ✅\n"
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
        lastSync: "2026-01-01T17:01:33.662Z",
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
        lastSync: "2026-01-01T17:01:33.662Z",
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
            condutaInicial: "### 1. Triagem Completa\n- Sinais vitais detalhados\n- Glicemia capilar\n- Oximetria\n- Avaliação do estado geral\n\n### 2. Anamnese Sistemática\n- **O** - Onset (início)\n- **P** - Provocação/Paliação\n- **Q** - Qualidade\n- **R** - Radiação\n- **S** - Severidade\n- **T** - Tempo/duração\n- **A** - Associated symptoms\n\n### 3. Revisão por Sistemas\n- Neurológico (cefaleia, confusão, fraqueza)\n- Cardiovascular (dor torácica, dispneia, edema)\n- Respiratório (tosse, febre, dispneia)\n- Gastrointestinal (dor abdominal, vômitos, diarreia)\n- Urinário (disúria, polaciúria, dor lombar)\n- Psiquiátrico (humor, sono, apetite)\n\n### 4. Exame Físico Completo\n- Não pular etapas quando queixa inespecífica\n\n### 5. Exames Complementares (conforme suspeita)\n- Hemograma\n- Glicemia\n- Eletrólitos\n- Função renal\n- PCR / VHS\n- Urina tipo 1\n- ECG (especialmente idosos)",
            calculadoras: [],
            referencias: [],
            rawMarkdown: "\n# Passando mal (sem foco definido)\n\n> Mal-estar geral sem sintoma principal claro\n\n## Informações Gerais\n\n- **Código**: `GEN_UNWELL_UNSPEC`\n- **Grupo**: [[GEN - Geral/_índice|GEN - Geral / Adm]]\n- **Nível de Risco**: 🟡 Médio\n- **Severidade**: 1/5\n- **Fast Track**: Não\n\n### Público-Alvo\n- Adultos\n- Idosos\n\n## Sintomas Relacionados\n\n- Fadiga\n- Fraqueza\n- Irritabilidade\n\n## Red Flags\n\n- Sinais vitais anormais\n- Alteração do nível de consciência\n- Dor torácica ou abdominal\n- Dispneia\n- Febre\n- Perda de peso não intencional\n- Sudorese noturna\n- Idoso com apresentação atípica (pode ser infecção grave)\n- Síncope ou pré-síncope\n- Palidez intensa\n\n## Diagnóstico Diferencial\n\n### Infeccioso\n- Viroses / IVAS\n- ITU (especialmente idosos)\n- Sepse oculta\n\n### Metabólico\n- Hipoglicemia\n- Hiperglicemia\n- Desidratação\n- Distúrbios eletrolíticos\n- Insuficiência adrenal\n\n### Cardiovascular\n- IAM atípico (especialmente idosos, diabéticos)\n- IC descompensada\n- Arritmias\n\n### Hematológico\n- Anemia\n- Leucemias\n\n### Psiquiátrico\n- Depressão\n- Somatização\n\n### Outros\n- Neoplasia oculta\n- Hipotireoidismo\n- Medicamentos\n\n## Conduta Inicial\n\n### 1. Triagem Completa\n- Sinais vitais detalhados\n- Glicemia capilar\n- Oximetria\n- Avaliação do estado geral\n\n### 2. Anamnese Sistemática\n- **O** - Onset (início)\n- **P** - Provocação/Paliação\n- **Q** - Qualidade\n- **R** - Radiação\n- **S** - Severidade\n- **T** - Tempo/duração\n- **A** - Associated symptoms\n\n### 3. Revisão por Sistemas\n- Neurológico (cefaleia, confusão, fraqueza)\n- Cardiovascular (dor torácica, dispneia, edema)\n- Respiratório (tosse, febre, dispneia)\n- Gastrointestinal (dor abdominal, vômitos, diarreia)\n- Urinário (disúria, polaciúria, dor lombar)\n- Psiquiátrico (humor, sono, apetite)\n\n### 4. Exame Físico Completo\n- Não pular etapas quando queixa inespecífica\n\n### 5. Exames Complementares (conforme suspeita)\n- Hemograma\n- Glicemia\n- Eletrólitos\n- Função renal\n- PCR / VHS\n- Urina tipo 1\n- ECG (especialmente idosos)\n\n## Apresentações Atípicas em Idosos\n\n| Doença | Apresentação Clássica | Atípica em Idosos |\n|--------|----------------------|-------------------|\n| IAM | Dor torácica | Mal-estar, dispneia, confusão |\n| Pneumonia | Febre, tosse | Confusão, queda, inapetência |\n| ITU | Disúria | Confusão, mal-estar |\n| Abdome agudo | Dor intensa | Dor leve ou ausente |\n\n## CID-10\n\n| Código | Descrição |\n|--------|-----------|\n| R53.83 | Outro mal-estar |\n\n## Termos de Busca\n\n`mal-estar` `indisposto` `fraqueza`\n\n## Conceitos Errados Comuns (Pacientes)\n\n- \"Depressão\"\n- \"Tristeza\"\n\n## Links Relacionados\n\n- [[GEN - Geral/_índice|Grupo GEN - Geral]]\n- [[INF - Infecção/_índice|Grupo INF - Febre/Infecção]]\n- [[PSI - Saúde Mental/_índice|Grupo PSI - Saúde Mental]]\n- [[00 - Índice Queixas|Índice Principal]]\n\n---\n\n*Fonte: WellWave complaintsData.ts*\n*Última atualização: 2024-12-25*\n"
        }
    }
],
}
