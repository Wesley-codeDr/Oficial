/**
 * Flash Anamnesis - Checkboxes Específicos por Queixa
 * Baseado em Medicina Baseada em Evidências (MBE)
 *
 * Cada queixa tem seus próprios checkboxes direcionados ao que é
 * clinicamente relevante para aquela condição específica.
 */

export interface FlashCheckbox {
  id: string
  label: string
  category: 'sintomas' | 'exame_fisico' | 'antecedentes' | 'red_flags'
  section: 'queixa_principal' | 'exame_fisico' | 'conduta' | 'antecedentes'
  /** Texto adicionado quando checkbox está MARCADO */
  checkedText: string
  /** Texto adicionado quando checkbox está DESMARCADO (opcional - para "nega X") */
  uncheckedText?: string
  /** Se é um red flag que precisa de destaque */
  isRedFlag?: boolean
  /** Referência MBE */
  mbeReference?: string
}

export interface TemplateCheckboxes {
  templateId: string
  checkboxes: FlashCheckbox[]
}

/**
 * LOMBALGIA - Checkboxes específicos
 * Baseado em: ACP Low Back Pain Guidelines, NICE Guidelines
 * Foco: Red flags, características da dor, irradiação
 */
export const lombalgiaCheckboxes: FlashCheckbox[] = [
  // === SINTOMAS ===
  {
    id: 'lomb_dor_movimento',
    label: 'Dor piora com movimento',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Dor piora com movimento',
    uncheckedText: 'Dor não se altera com movimento',
  },
  {
    id: 'lomb_dor_repouso',
    label: 'Dor melhora com repouso',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'melhora com repouso',
    uncheckedText: 'sem melhora ao repouso',
  },
  {
    id: 'lomb_irradiacao_mmii',
    label: 'Irradiação para membros inferiores',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'com irradiação para membro inferior',
    uncheckedText: 'Sem irradiação para membros inferiores',
  },
  {
    id: 'lomb_parestesia',
    label: 'Parestesias/formigamento',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Refere parestesias associadas',
    uncheckedText: 'Nega parestesias',
  },
  {
    id: 'lomb_esforco',
    label: 'Após esforço físico',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'após esforço físico',
  },
  // === RED FLAGS ===
  {
    id: 'lomb_febre',
    label: '🚨 Febre associada',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'FEBRE ASSOCIADA',
    uncheckedText: 'Nega febre',
    isRedFlag: true,
    mbeReference: 'Red flag para infecção espinhal',
  },
  {
    id: 'lomb_perda_peso',
    label: '🚨 Perda de peso inexplicada',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'PERDA DE PESO INEXPLICADA',
    uncheckedText: 'Nega perda de peso',
    isRedFlag: true,
    mbeReference: 'Red flag para neoplasia',
  },
  {
    id: 'lomb_trauma',
    label: '🚨 Trauma significativo recente',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'HISTÓRIA DE TRAUMA SIGNIFICATIVO',
    uncheckedText: 'Nega trauma recente',
    isRedFlag: true,
  },
  {
    id: 'lomb_alteracao_esfincter',
    label: '🚨 Alteração esfincteriana',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'ALTERAÇÃO ESFINCTERIANA (CAUDA EQUINA)',
    uncheckedText: 'Nega alteração esfincteriana',
    isRedFlag: true,
    mbeReference: 'Síndrome da cauda equina - emergência',
  },
  {
    id: 'lomb_anestesia_sela',
    label: '🚨 Anestesia em sela',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'ANESTESIA EM SELA',
    uncheckedText: 'Nega anestesia em região perineal',
    isRedFlag: true,
  },
  // === EXAME FÍSICO ===
  {
    id: 'lomb_contratura',
    label: 'Contratura paravertebral',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'Contratura de musculatura paravertebral lombar',
  },
  {
    id: 'lomb_lasegue_pos',
    label: 'Lasègue positivo',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'Lasègue positivo',
    uncheckedText: 'Lasègue negativo bilateralmente',
  },
  {
    id: 'lomb_forca_preservada',
    label: 'Força preservada em MMII',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'Força preservada em membros inferiores',
  },
  {
    id: 'lomb_reflexos_simetricos',
    label: 'Reflexos simétricos',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'Reflexos patelares e aquileus simétricos e presentes',
  },
  {
    id: 'lomb_marcha_antalg',
    label: 'Marcha antálgica',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'Marcha antálgica',
  },
]

/**
 * CEFALEIA TENSIONAL - Checkboxes específicos
 * Baseado em: IHS Classification ICHD-3, BMJ Best Practice
 * Foco: Características da dor, sintomas associados, red flags
 */
export const cefaleiaCheckboxes: FlashCheckbox[] = [
  // === CARACTERÍSTICAS DA DOR ===
  {
    id: 'cef_holocraniana',
    label: 'Dor holocraniana (toda cabeça)',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Cefaleia holocraniana',
  },
  {
    id: 'cef_pressao',
    label: 'Dor em pressão/aperto',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'em pressão/aperto',
  },
  {
    id: 'cef_pulsatil',
    label: 'Dor pulsátil/latejante',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'em caráter pulsátil/latejante',
  },
  {
    id: 'cef_leve_moderada',
    label: 'Intensidade leve a moderada',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'intensidade leve a moderada',
  },
  {
    id: 'cef_intensa',
    label: 'Intensidade forte/intensa',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'intensidade forte',
  },
  // === SINTOMAS ASSOCIADOS ===
  {
    id: 'cef_nausea',
    label: 'Náuseas',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Náuseas associadas',
    uncheckedText: 'Sem náuseas',
  },
  {
    id: 'cef_vomitos',
    label: 'Vômitos',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Vômitos associados',
    uncheckedText: 'Sem vômitos',
  },
  {
    id: 'cef_fotofobia',
    label: 'Fotofobia',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Fotofobia presente',
    uncheckedText: 'Sem fotofobia',
  },
  {
    id: 'cef_fonofobia',
    label: 'Fonofobia',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Fonofobia presente',
    uncheckedText: 'Sem fonofobia significativa',
  },
  {
    id: 'cef_piora_atividade',
    label: 'Piora com atividade física',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Piora com atividade física',
    uncheckedText: 'Não piora com atividade física',
  },
  {
    id: 'cef_aura',
    label: 'Aura visual/sensitiva',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Aura visual/sensitiva precedendo a dor',
    uncheckedText: 'Nega aura visual ou sensitiva',
  },
  // === RED FLAGS ===
  {
    id: 'cef_trovao',
    label: '🚨 Cefaleia em trovoada (pior da vida)',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'CEFALEIA EM TROVOADA - PIOR DOR DA VIDA',
    isRedFlag: true,
    mbeReference: 'Suspeita de HSA - TC crânio urgente',
  },
  {
    id: 'cef_rigidez_nuca',
    label: '🚨 Rigidez de nuca',
    category: 'red_flags',
    section: 'exame_fisico',
    checkedText: 'RIGIDEZ DE NUCA PRESENTE',
    uncheckedText: 'Rigidez de nuca ausente',
    isRedFlag: true,
    mbeReference: 'Suspeita de meningite',
  },
  {
    id: 'cef_febre',
    label: '🚨 Febre associada',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'FEBRE ASSOCIADA',
    uncheckedText: 'Nega febre',
    isRedFlag: true,
  },
  {
    id: 'cef_deficit_neuro',
    label: '🚨 Déficit neurológico focal',
    category: 'red_flags',
    section: 'exame_fisico',
    checkedText: 'DÉFICIT NEUROLÓGICO FOCAL PRESENTE',
    uncheckedText: 'Sem déficits neurológicos focais',
    isRedFlag: true,
  },
  {
    id: 'cef_alteracao_consciencia',
    label: '🚨 Alteração do nível de consciência',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'ALTERAÇÃO DO NÍVEL DE CONSCIÊNCIA',
    uncheckedText: 'Nível de consciência preservado',
    isRedFlag: true,
  },
  // === EXAME FÍSICO ===
  {
    id: 'cef_pupilas_ok',
    label: 'Pupilas isocóricas e fotorreagentes',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'Pupilas isocóricas e fotorreagentes',
  },
  {
    id: 'cef_forca_ok',
    label: 'Força preservada nos 4 membros',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'Força preservada nos 4 membros',
  },
  {
    id: 'cef_marcha_ok',
    label: 'Marcha normal',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'Marcha normal',
  },
]

/**
 * IVAS - Checkboxes específicos
 * Baseado em: NICE Guidelines CG69, BMJ Best Practice
 */
export const ivasCheckboxes: FlashCheckbox[] = [
  // === SINTOMAS ===
  {
    id: 'ivas_coriza',
    label: 'Coriza/rinorreia',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Coriza',
  },
  {
    id: 'ivas_odinofagia',
    label: 'Odinofagia (dor de garganta)',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'odinofagia',
  },
  {
    id: 'ivas_tosse_seca',
    label: 'Tosse seca',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'tosse seca',
  },
  {
    id: 'ivas_tosse_produtiva',
    label: 'Tosse produtiva',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'tosse produtiva',
  },
  {
    id: 'ivas_espirros',
    label: 'Espirros frequentes',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Espirros frequentes',
  },
  {
    id: 'ivas_febre',
    label: 'Febre',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Febre aferida de {temperatura}°C',
    uncheckedText: 'Nega febre aferida',
  },
  {
    id: 'ivas_mialgia',
    label: 'Mialgia/dor no corpo',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Mialgia difusa',
  },
  {
    id: 'ivas_cefaleia',
    label: 'Cefaleia',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Cefaleia associada',
  },
  // === RED FLAGS ===
  {
    id: 'ivas_dispneia',
    label: '🚨 Dispneia',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'DISPNEIA PRESENTE',
    uncheckedText: 'Nega dispneia',
    isRedFlag: true,
  },
  {
    id: 'ivas_dor_toracica',
    label: '🚨 Dor torácica',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'DOR TORÁCICA PRESENTE',
    uncheckedText: 'Nega dor torácica',
    isRedFlag: true,
  },
  {
    id: 'ivas_febre_alta',
    label: '🚨 Febre alta (>39°C) persistente',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'FEBRE ALTA PERSISTENTE',
    isRedFlag: true,
  },
  // === EXAME FÍSICO ===
  {
    id: 'ivas_hiperemia_orofaringe',
    label: 'Orofaringe hiperemiada',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'Orofaringe com hiperemia leve',
  },
  {
    id: 'ivas_sem_exsudato',
    label: 'Sem exsudato/placas',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'sem exsudato ou placas',
  },
  {
    id: 'ivas_mv_presente',
    label: 'MV presente bilateral',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'Murmúrio vesicular presente bilateral, sem ruídos adventícios',
  },
]

/**
 * FARINGOAMIGDALITE - Checkboxes específicos
 * Baseado em: IDSA Guidelines, Centor-McIsaac Score
 */
export const faringoamigdaliteCheckboxes: FlashCheckbox[] = [
  // === CRITÉRIOS DE CENTOR ===
  {
    id: 'faring_exsudato',
    label: 'Exsudato tonsilar (Centor +1)',
    category: 'sintomas',
    section: 'exame_fisico',
    checkedText: 'Exsudato purulento em tonsilas palatinas',
    mbeReference: 'Centor Score +1 ponto',
  },
  {
    id: 'faring_adenomegalia',
    label: 'Adenomegalia cervical anterior dolorosa (Centor +1)',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'Adenomegalia cervical anterior palpável, dolorosa',
    mbeReference: 'Centor Score +1 ponto',
  },
  {
    id: 'faring_febre',
    label: 'Febre (Centor +1)',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Febre aferida de {temperatura}°C',
    uncheckedText: 'Nega febre',
    mbeReference: 'Centor Score +1 ponto',
  },
  {
    id: 'faring_ausencia_tosse',
    label: 'Ausência de tosse (Centor +1)',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Nega tosse',
    mbeReference: 'Centor Score +1 ponto',
  },
  // === SINTOMAS ===
  {
    id: 'faring_odinofagia',
    label: 'Odinofagia intensa',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Odinofagia intensa',
  },
  {
    id: 'faring_disfagia',
    label: 'Dificuldade para deglutir',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'dificuldade para deglutição',
  },
  // === RED FLAGS ===
  {
    id: 'faring_trismo',
    label: '🚨 Trismo (abertura limitada)',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'TRISMO PRESENTE',
    uncheckedText: 'Nega trismo',
    isRedFlag: true,
    mbeReference: 'Suspeita de abscesso peritonsilar',
  },
  {
    id: 'faring_abaulamento',
    label: '🚨 Abaulamento peritonsilar',
    category: 'red_flags',
    section: 'exame_fisico',
    checkedText: 'ABAULAMENTO PERITONSILAR PRESENTE',
    uncheckedText: 'Ausência de abaulamento peritonsilar',
    isRedFlag: true,
    mbeReference: 'Abscesso peritonsilar - drenagem',
  },
  {
    id: 'faring_dispneia',
    label: '🚨 Dispneia',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'DISPNEIA PRESENTE',
    uncheckedText: 'Nega dispneia',
    isRedFlag: true,
  },
  {
    id: 'faring_sialorreia',
    label: '🚨 Sialorreia (salivação excessiva)',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'SIALORREIA',
    isRedFlag: true,
    mbeReference: 'Suspeita de obstrução de via aérea',
  },
  // === EXAME FÍSICO ===
  {
    id: 'faring_hiperemia',
    label: 'Hiperemia intensa orofaringe',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'Orofaringe com hiperemia intensa',
  },
  {
    id: 'faring_mv_limpo',
    label: 'Ausculta pulmonar limpa',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'Murmúrio vesicular presente bilateral, sem ruídos adventícios',
  },
]

/**
 * GASTROENTERITE - Checkboxes específicos
 * Baseado em: WHO Diarrhoea Guidelines, ESPGHAN/ESPID
 */
export const gastroenteriteCheckboxes: FlashCheckbox[] = [
  // === SINTOMAS ===
  {
    id: 'gastro_diarreia',
    label: 'Diarreia líquida',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Diarreia líquida',
  },
  {
    id: 'gastro_nausea',
    label: 'Náuseas',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Náuseas',
  },
  {
    id: 'gastro_vomitos',
    label: 'Vômitos',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'vômitos associados',
  },
  {
    id: 'gastro_dor_abdominal',
    label: 'Dor abdominal em cólica',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Dor abdominal em cólica difusa',
  },
  {
    id: 'gastro_febre',
    label: 'Febre',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Febre aferida',
    uncheckedText: 'Nega febre aferida',
  },
  // === RED FLAGS ===
  {
    id: 'gastro_sangue_fezes',
    label: '🚨 Sangue nas fezes',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'SANGUE NAS FEZES',
    uncheckedText: 'Nega sangue ou muco nas fezes',
    isRedFlag: true,
    mbeReference: 'Disenteria - considerar antibiótico',
  },
  {
    id: 'gastro_desidratacao',
    label: '🚨 Sinais de desidratação',
    category: 'red_flags',
    section: 'exame_fisico',
    checkedText: 'SINAIS DE DESIDRATAÇÃO',
    uncheckedText: 'Turgor cutâneo preservado',
    isRedFlag: true,
  },
  {
    id: 'gastro_febre_alta',
    label: '🚨 Febre alta persistente',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'FEBRE ALTA PERSISTENTE',
    isRedFlag: true,
  },
  // === EXAME FÍSICO ===
  {
    id: 'gastro_rha_aumentados',
    label: 'RHA aumentados',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'ruídos hidroaéreos aumentados',
  },
  {
    id: 'gastro_sem_peritonite',
    label: 'Sem sinais de peritonite',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'sem sinais de peritonite',
  },
]

/**
 * CÓLICA RENAL - Checkboxes específicos
 * Baseado em: EAU Guidelines Urolithiasis
 */
export const colicaRenalCheckboxes: FlashCheckbox[] = [
  // === SINTOMAS ===
  {
    id: 'colica_dor_lombar',
    label: 'Dor lombar súbita intensa',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Dor lombar de início súbito, muito intensa, em cólica',
  },
  {
    id: 'colica_irradiacao',
    label: 'Irradiação para flanco/virilha',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'com irradiação para flanco e região inguinal ipsilateral',
  },
  {
    id: 'colica_nausea',
    label: 'Náuseas/vômitos',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Náuseas e vômitos associados',
  },
  {
    id: 'colica_hematuria',
    label: 'Hematúria',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Hematúria',
  },
  {
    id: 'colica_agitacao',
    label: 'Agitação psicomotora pela dor',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Agitação psicomotora pela dor',
  },
  // === RED FLAGS ===
  {
    id: 'colica_febre',
    label: '🚨 Febre (obstrução infectada)',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'FEBRE ASSOCIADA - SUSPEITA DE OBSTRUÇÃO INFECTADA',
    uncheckedText: 'Nega febre',
    isRedFlag: true,
    mbeReference: 'Urgência urológica - risco de sepse',
  },
  {
    id: 'colica_anuria',
    label: '🚨 Anúria',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'ANÚRIA',
    isRedFlag: true,
    mbeReference: 'Obstrução bilateral - urgência',
  },
  {
    id: 'colica_rim_unico',
    label: '🚨 Rim único',
    category: 'red_flags',
    section: 'antecedentes',
    checkedText: 'PACIENTE COM RIM ÚNICO',
    isRedFlag: true,
  },
  // === EXAME FÍSICO ===
  {
    id: 'colica_giordano_pos',
    label: 'Giordano positivo',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'Punho-percussão lombar intensamente positiva (Giordano +)',
  },
  {
    id: 'colica_sem_peritonite',
    label: 'Sem sinais de peritonite',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'Abdome flácido, sem sinais de peritonite',
  },
]

/**
 * CISTITE - Checkboxes específicos
 * Baseado em: IDSA Guidelines UTI
 */
export const cistiteCheckboxes: FlashCheckbox[] = [
  // === SINTOMAS ===
  {
    id: 'cistite_disuria',
    label: 'Disúria',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Disúria',
  },
  {
    id: 'cistite_polaciuria',
    label: 'Polaciúria',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'polaciúria',
  },
  {
    id: 'cistite_urgencia',
    label: 'Urgência miccional',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'urgência miccional',
  },
  {
    id: 'cistite_dor_suprapubica',
    label: 'Dor suprapúbica',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Dor suprapúbica associada',
  },
  {
    id: 'cistite_urina_turva',
    label: 'Urina turva',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Urina turva',
  },
  // === RED FLAGS (pielonefrite) ===
  {
    id: 'cistite_febre',
    label: '🚨 Febre (sugere pielonefrite)',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'FEBRE AFERIDA',
    uncheckedText: 'Nega febre aferida',
    isRedFlag: true,
    mbeReference: 'Sugere pielonefrite',
  },
  {
    id: 'cistite_dor_lombar',
    label: '🚨 Dor lombar',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'DOR LOMBAR PRESENTE',
    uncheckedText: 'Nega dor lombar',
    isRedFlag: true,
    mbeReference: 'Sugere pielonefrite',
  },
  {
    id: 'cistite_nausea_vomito',
    label: '🚨 Náuseas/vômitos',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'NÁUSEAS E VÔMITOS',
    isRedFlag: true,
  },
  // === EXAME FÍSICO ===
  {
    id: 'cistite_giordano_neg',
    label: 'Giordano negativo bilateral',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'Punho-percussão lombar indolor bilateralmente (Giordano negativo)',
  },
  {
    id: 'cistite_dor_hipogastrio',
    label: 'Dor à palpação de hipogástrio',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'dor leve à palpação em hipogástrio',
  },
]

/**
 * URTICÁRIA - Checkboxes específicos
 * Baseado em: EAACI Urticaria Guidelines, WAO Guidelines
 */
export const urticariaCheckboxes: FlashCheckbox[] = [
  // === SINTOMAS ===
  {
    id: 'urtic_lesoes',
    label: 'Lesões eritematosas pruriginosas',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Lesões avermelhadas pruriginosas pelo corpo',
  },
  {
    id: 'urtic_prurido_intenso',
    label: 'Prurido intenso',
    category: 'sintomas',
    section: 'queixa_principal',
    checkedText: 'Prurido intenso',
  },
  // === RED FLAGS (anafilaxia) ===
  {
    id: 'urtic_dispneia',
    label: '🚨 Dispneia',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'DISPNEIA PRESENTE',
    uncheckedText: 'Nega dispneia',
    isRedFlag: true,
    mbeReference: 'Suspeita de anafilaxia',
  },
  {
    id: 'urtic_edema_face',
    label: '🚨 Edema de lábios/língua',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'EDEMA DE LÁBIOS/LÍNGUA',
    uncheckedText: 'Nega edema de lábios ou língua',
    isRedFlag: true,
    mbeReference: 'Angioedema - risco de via aérea',
  },
  {
    id: 'urtic_disfagia',
    label: '🚨 Dificuldade para engolir',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'DIFICULDADE PARA DEGLUTIÇÃO',
    uncheckedText: 'Nega dificuldade para engolir',
    isRedFlag: true,
  },
  {
    id: 'urtic_hipotensao',
    label: '🚨 Hipotensão/síncope',
    category: 'red_flags',
    section: 'queixa_principal',
    checkedText: 'HIPOTENSÃO/SÍNCOPE',
    isRedFlag: true,
    mbeReference: 'Anafilaxia - adrenalina IM',
  },
  // === EXAME FÍSICO ===
  {
    id: 'urtic_placas',
    label: 'Placas urticariformes',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'Pele com placas urticariformes eritematosas, elevadas, pruriginosas, com halo central pálido',
  },
  {
    id: 'urtic_dermografismo',
    label: 'Dermografismo presente',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'Dermografismo presente',
  },
  {
    id: 'urtic_sem_angioedema',
    label: 'Sem angioedema',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'Sem angioedema de face, lábios, língua ou vias aéreas',
  },
  {
    id: 'urtic_ausculta_limpa',
    label: 'Ausculta pulmonar limpa',
    category: 'exame_fisico',
    section: 'exame_fisico',
    checkedText: 'Ausculta pulmonar limpa, sem sibilos ou estridor',
  },
]

/**
 * Mapeamento de template ID para seus checkboxes específicos
 */
export const templateCheckboxesMap: Record<string, FlashCheckbox[]> = {
  lombalgia: lombalgiaCheckboxes,
  cefaleia_tensional: cefaleiaCheckboxes,
  enxaqueca: cefaleiaCheckboxes, // Usa mesmos checkboxes de cefaleia
  ivas: ivasCheckboxes,
  faringoamigdalite: faringoamigdaliteCheckboxes,
  gastroenterite: gastroenteriteCheckboxes,
  colica_renal: colicaRenalCheckboxes,
  cistite: cistiteCheckboxes,
  urticaria: urticariaCheckboxes,
  // Adicionar mais conforme necessário
}

/**
 * Obtém checkboxes para um template específico
 */
export function getCheckboxesForTemplate(templateId: string): FlashCheckbox[] {
  return templateCheckboxesMap[templateId] || []
}

/**
 * Gera texto baseado nos checkboxes selecionados
 */
export function generateTextFromCheckboxes(
  checkboxes: FlashCheckbox[],
  checkedIds: Set<string>,
  section: 'queixa_principal' | 'exame_fisico' | 'conduta',
  variables?: Record<string, string>
): string {
  const relevantCheckboxes = checkboxes.filter(cb => cb.section === section)
  const textParts: string[] = []

  for (const checkbox of relevantCheckboxes) {
    if (checkedIds.has(checkbox.id)) {
      let text = checkbox.checkedText
      // Substituir variáveis se fornecidas
      if (variables) {
        Object.entries(variables).forEach(([key, value]) => {
          text = text.replace(`{${key}}`, value || '--')
        })
      }
      textParts.push(text)
    } else if (checkbox.uncheckedText) {
      textParts.push(checkbox.uncheckedText)
    }
  }

  return textParts.join('. ')
}

/**
 * Verifica se há red flags marcados
 */
export function hasRedFlags(
  checkboxes: FlashCheckbox[],
  checkedIds: Set<string>
): boolean {
  return checkboxes.some(cb => cb.isRedFlag && checkedIds.has(cb.id))
}

/**
 * Obtém lista de red flags marcados
 */
export function getActiveRedFlags(
  checkboxes: FlashCheckbox[],
  checkedIds: Set<string>
): FlashCheckbox[] {
  return checkboxes.filter(cb => cb.isRedFlag && checkedIds.has(cb.id))
}
