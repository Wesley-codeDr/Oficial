---
id: CV_CHEST_PAIN_ACS
grupo: CV
risco: high
severidade: 5
icd10: ["I21.9", "I20.0", "I24.9"]
ebm_version: "2.0"
last_ebm_review: "2026-01-05"
brazilian_guidelines: ["SBC Síndrome Coronariana Aguda 2024", "Diretriz Brasileira de Dor Torácica 2021"]
sus_protocol_compatible: true
total_checkboxes: 44
flash_checkboxes: 12
detailed_checkboxes: 20
both_checkboxes: 12
---

# CV - Dor Torácica (Síndrome Coronariana Aguda) - Anamnese Completa

## QP - Queixa Principal

### Tipo de Dor

- [ ] **Dor torácica em aperto/opressão**
  - **Narrativa**: "Refere dor torácica em aperto"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: true
  - **Justificativa**: Dor típica de SCA, alta especificidade para isquemia miocárdica

- [ ] **Dor torácica em queimação/ardência**
  - **Narrativa**: "Refere dor torácica em queimação"
  - **Seção**: BOTH
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Pode indicar SCA ou DRGE, requer diferenciação

- [ ] **Desconforto torácico inespecífico**
  - **Narrativa**: "Relata desconforto torácico inespecífico"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Comum em idosos e diabéticos (apresentação atípica)

- [ ] **Dor em peso/pressão**
  - **Narrativa**: "Descreve dor torácica em peso"
  - **Seção**: BOTH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Altamente sugestivo de isquemia miocárdica

## HDA - História da Doença Atual

### Características Temporais

- [ ] **Duração > 20 minutos**
  - **Narrativa**: "Dor com duração superior a 20 minutos"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: true
  - **Justificativa**: Critério temporal para diferenciação angina estável vs instável

- [ ] **Início súbito**
  - **Narrativa**: "Refere início súbito dos sintomas"
  - **Seção**: FLASH
  - **Required**: true
  - **Red Flag**: true
  - **Justificativa**: Sugere evento agudo, requer avaliação imediata

- [ ] **Dor progressiva (crescendo)**
  - **Narrativa**: "Dor de caráter progressivo, com piora gradual"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Padrão de angina instável

- [ ] **Dor intermitente (vai e volta)**
  - **Narrativa**: "Dor de caráter intermitente"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Menos típico de SCA, pode indicar espasmo coronariano

### Fatores Desencadeantes

- [ ] **Piora com esforço físico**
  - **Narrativa**: "Dor que piora com esforço físico"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Clássico de angina de esforço

- [ ] **Piora com estresse emocional**
  - **Narrativa**: "Sintomas desencadeados por estresse emocional"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Trigger conhecido para eventos coronarianos

- [ ] **Dor em repouso**
  - **Narrativa**: "Dor ocorreu em repouso"
  - **Seção**: FLASH
  - **Required**: true
  - **Red Flag**: true
  - **Justificativa**: Critério diagnóstico para angina instável

- [ ] **Dor noturna (acordou paciente)**
  - **Narrativa**: "Dor noturna que despertou o paciente"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Sugestivo de SCA de alto risco

### Irradiação

- [ ] **Irradiação para membro superior esquerdo**
  - **Narrativa**: "Com irradiação para membro superior esquerdo"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: true
  - **Justificativa**: Irradiação clássica de isquemia miocárdica

- [ ] **Irradiação para mandíbula/pescoço**
  - **Narrativa**: "Com irradiação para região mandibular e cervical"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Padrão típico de SCA, especialmente em mulheres

- [ ] **Irradiação para dorso/região interescapular**
  - **Narrativa**: "Com irradiação para região dorsal interescapular"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Pode indicar SCA ou dissecção aórtica (diagnóstico diferencial crítico)

- [ ] **Irradiação para epigástrio**
  - **Narrativa**: "Com irradiação para região epigástrica"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Comum em IAM de parede inferior

### Sintomas Associados

- [ ] **Sudorese profusa**
  - **Narrativa**: "Apresenta sudorese profusa associada"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: true
  - **Justificativa**: Sinal de ativação simpática, altamente sugestivo de SCA

- [ ] **Náuseas e/ou vômitos**
  - **Narrativa**: "Refere náuseas e vômitos"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Comum em IAM de parede inferior

- [ ] **Dispneia associada**
  - **Narrativa**: "Com dispneia associada"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: true
  - **Justificativa**: Pode indicar insuficiência cardíaca aguda ou extenso IAM

- [ ] **Palpitações**
  - **Narrativa**: "Relata palpitações concomitantes"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Possível arritmia ventricular

- [ ] **Síncope ou pré-síncope**
  - **Narrativa**: "Apresentou episódio sincopal"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Indica comprometimento hemodinâmico grave

### Resposta a Tratamento

- [ ] **Sem melhora com repouso**
  - **Narrativa**: "Dor sem melhora com repouso"
  - **Seção**: FLASH
  - **Required**: true
  - **Red Flag**: true
  - **Justificativa**: Diferencia angina instável de angina estável

- [ ] **Melhora parcial com nitrato**
  - **Narrativa**: "Melhora parcial dos sintomas após uso de nitrato"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Resposta clássica a nitrato, mas não exclui SCA

## ANTECEDENTES - História Médica Pregressa

### Fatores de Risco Cardiovascular

- [ ] **Hipertensão Arterial Sistêmica**
  - **Narrativa**: "Hipertenso"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: false
  - **Justificativa**: Fator de risco maior para DAC

- [ ] **Diabetes Mellitus**
  - **Narrativa**: "Diabético"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: false
  - **Justificativa**: Equivalente de DAC, alto risco

- [ ] **Dislipidemia**
  - **Narrativa**: "Dislipidêmico em tratamento"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Fator de risco modificável

### História Cardíaca

- [ ] **DAC prévia / IAM prévio**
  - **Narrativa**: "História de doença arterial coronariana prévia com infarto do miocárdio"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: true
  - **Justificativa**: Alto risco de novo evento coronariano

- [ ] **Angioplastia / Stent prévios**
  - **Narrativa**: "Submetido previamente a angioplastia com implante de stent coronariano"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Risco de reestenose ou trombose de stent

- [ ] **Cirurgia de revascularização miocárdica prévia**
  - **Narrativa**: "Revascularização miocárdica cirúrgica prévia"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Risco de progressão de doença

- [ ] **Insuficiência cardíaca**
  - **Narrativa**: "Portador de insuficiência cardíaca"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Pior prognóstico em SCA

- [ ] **História familiar de DAC precoce**
  - **Narrativa**: "História familiar de doença arterial coronariana precoce"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Fator de risco importante para estratificação (componente do HEART/TIMI Score)

## MEDICACOES - Medicações em Uso

- [ ] **AAS (Ácido Acetilsalicílico)**
  - **Narrativa**: "Em uso de AAS 100mg/dia"
  - **Seção**: BOTH
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Uso prévio indica DAC conhecida

- [ ] **Clopidogrel / Ticagrelor**
  - **Narrativa**: "Em uso de antiagregante plaquetário duplo"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Pode indicar SCA recente ou stent recente

- [ ] **Estatinas**
  - **Narrativa**: "Em uso de estatina"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Tratamento padrão para dislipidemia/DAC

- [ ] **Betabloqueadores**
  - **Narrativa**: "Em uso de betabloqueador"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Uso em DAC ou HAS

- [ ] **Nitratos**
  - **Narrativa**: "Faz uso de nitrato de forma regular"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Indica angina crônica

## ALERGIAS

- [ ] **Alergia a AAS**
  - **Narrativa**: "Refere alergia a ácido acetilsalicílico"
  - **Seção**: FLASH
  - **Required**: true
  - **Red Flag**: true
  - **Justificativa**: CRÍTICO - altera protocolo MONA

- [ ] **Alergia a contraste iodado**
  - **Narrativa**: "Alergia conhecida a contraste iodado"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Importante para cateterismo cardíaco

## HABITOS

- [ ] **Tabagismo ativo**
  - **Narrativa**: "Tabagista ativo"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: false
  - **Justificativa**: Fator de risco maior para DAC

- [ ] **Ex-tabagista**
  - **Narrativa**: "Ex-tabagista"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Risco residual

- [ ] **Etilismo**
  - **Narrativa**: "Etilista"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Fator de risco cardiovascular

- [ ] **Sedentarismo**
  - **Narrativa**: "Sedentário"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Fator de risco modificável

- [ ] **Uso de cocaína/estimulantes**
  - **Narrativa**: "Relata uso recente de cocaína"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: CRÍTICO - altera conduta (evitar betabloqueador)

## EXAME_FISICO - Exame Físico

### Sinais Vitais

- [ ] **PA medida**
  - **Narrativa**: "PA: {valor} mmHg"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: false
  - **Justificativa**: Essencial para HEART Score e decisão de nitrato

- [ ] **FC medida**
  - **Narrativa**: "FC: {valor} bpm"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: false
  - **Justificativa**: Taquicardia pode indicar comprometimento hemodinâmico

- [ ] **FR medida**
  - **Narrativa**: "FR: {valor} irpm"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: false
  - **Justificativa**: Taquipneia sugere IC aguda

- [ ] **SpO2 medida**
  - **Narrativa**: "SpO2: {valor}% em ar ambiente"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: false
  - **Justificativa**: Determina necessidade de O2 suplementar

- [ ] **Febre (Tax > 38°C)**
  - **Narrativa**: "Febril (Tax: {valor}°C)"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Pode indicar pericardite, miocardite ou complicação infecciosa pós-IAM

- [ ] **Hipotensão (PA < 90mmHg)**
  - **Narrativa**: "Hipotenso (PA < 90mmHg)"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: CRÍTICO - choque cardiogênico, contraindicação relativa a nitrato

- [ ] **Taquicardia (FC > 120bpm)**
  - **Narrativa**: "Taquicárdico (FC > 120bpm)"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Instabilidade hemodinâmica

### Estado Geral

- [ ] **Paciente ansioso/agitado**
  - **Narrativa**: "Paciente ansioso e agitado"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Comum em SCA

- [ ] **Palidez cutânea**
  - **Narrativa**: "Apresenta palidez cutânea"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Sinal de má perfusão periférica

- [ ] **Extremidades frias**
  - **Narrativa**: "Extremidades frias ao exame"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Choque cardiogênico

### Exame Cardiovascular

- [ ] **Ritmo cardíaco regular**
  - **Narrativa**: "Ritmo cardíaco regular em 2 tempos"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: false
  - **Justificativa**: Achado esperado

- [ ] **Arritmia cardíaca detectada**
  - **Narrativa**: "Arritmia cardíaca detectada ao exame"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Pode indicar isquemia ou IAM

- [ ] **Sopro cardíaco novo**
  - **Narrativa**: "Sopro sistólico audível em foco mitral"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Pode indicar complicação mecânica (IM aguda, CIV)

- [ ] **B3 (galope ventricular)**
  - **Narrativa**: "Presença de terceira bulha (B3)"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Sinal de disfunção ventricular

- [ ] **Pulsos periféricos simétricos**
  - **Narrativa**: "Pulsos periféricos presentes e simétricos"
  - **Seção**: DETAILED
  - **Required**: true
  - **Red Flag**: false
  - **Justificativa**: Importante para diferenciar de dissecção aórtica

- [ ] **Assimetria de pulsos**
  - **Narrativa**: "Assimetria de pulsos periféricos"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: CRÍTICO - pensar em dissecção aórtica

### Exame Respiratório

- [ ] **Murmúrio vesicular presente bilateralmente**
  - **Narrativa**: "Murmúrio vesicular presente bilateralmente, sem ruídos adventícios"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: false
  - **Justificativa**: Achado normal esperado

- [ ] **Estertores crepitantes (bases pulmonares)**
  - **Narrativa**: "Estertores crepitantes em bases pulmonares"
  - **Seção**: FLASH
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Edema agudo de pulmão / IC descompensada

- [ ] **Diminuição de murmúrio vesicular**
  - **Narrativa**: "Diminuição de murmúrio vesicular em hemitórax {lado}"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: true
  - **Justificativa**: Derrame pleural ou pneumotórax (complicação rara)

## NEGATIVAS - Negativas Pertinentes

- [ ] **Nega febre**
  - **Narrativa**: "Nega febre"
  - **Seção**: BOTH
  - **Required**: true
  - **Red Flag**: false
  - **Justificativa**: Exclui processo infeccioso

- [ ] **Nega tosse**
  - **Narrativa**: "Nega tosse"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Exclui causa respiratória

- [ ] **Nega trauma torácico**
  - **Narrativa**: "Nega história de trauma torácico"
  - **Seção**: FLASH
  - **Required**: true
  - **Red Flag**: false
  - **Justificativa**: Exclui etiologia traumática

- [ ] **Nega hemoptise**
  - **Narrativa**: "Nega hemoptise"
  - **Seção**: DETAILED
  - **Required**: false
  - **Red Flag**: false
  - **Justificativa**: Exclui embolia pulmonar

---

## 📊 Estatísticas do Template

- **Total de checkboxes**: 44
- **Checkboxes FLASH**: 12 (27.3%)
- **Checkboxes DETAILED**: 20 (45.5%)
- **Checkboxes BOTH**: 12 (27.3%)
- **Red Flags**: 28 (63.6%)
- **Campos obrigatórios**: 18 (40.9%)

## 🎯 Mapeamento de Prioridade (Para Flash)

### Checkboxes Essenciais Flash (12)
1. QP: Dor torácica em aperto/opressão
2. HDA: Duração > 20 minutos
3. HDA: Início súbito
4. HDA: Dor em repouso
5. HDA: Irradiação para MSE
6. HDA: Sudorese profusa
7. HDA: Dispneia associada
8. HDA: Sem melhora com repouso
9. ANTECEDENTES: HAS
10. ANTECEDENTES: Diabetes Mellitus
11. EXAME_FISICO: Sinais vitais completos (PA, FC, FR, SpO2)
12. NEGATIVAS: Nega trauma torácico

## 🔍 Uso em Fluxo de Trabalho

### Flash (2-3 minutos)
- Médico marca apenas checkboxes FLASH + BOTH (24 total)
- Gera prontuário básico CFM-compliant
- Tempo estimado: 90-120 segundos

### Anamnese Well (5-10 minutos)
- Médico marca todos os 44 checkboxes aplicáveis
- Gera prontuário completo e detalhado
- Inclui todos os checkboxes FLASH automaticamente
- Tempo estimado: 5-8 minutos

## 📚 Referências

Baseado nas mesmas diretrizes do Flash template:
- **SBC** - Diretriz de Síndrome Coronariana Aguda (2024)
- **Diretriz Brasileira de Dor Torácica** (2021)
- **UpToDate** - Acute Coronary Syndrome (2025)

---

*Última revisão clínica: 2026-01-05*
*Este template foi criado seguindo rigorosamente as diretrizes brasileiras de cardiologia*
