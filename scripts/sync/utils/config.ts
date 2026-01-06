/**
 * Configuração do sistema de sincronização Obsidian ↔ TypeScript
 */

import path from 'path';

export const SYNC_CONFIG = {
  // Caminho para o vault do Obsidian
  obsidianVault: '/Users/wesleywillian/Library/Mobile Documents/iCloud~md~obsidian/Documents/CODE/WesleyWillianCode/WellWave',

  // Caminho para o arquivo de dados no projeto
  complaintsDataPath: 'lib/data/complaintsData.ts',

  // Pastas dentro do vault
  queixasFolder: 'Queixas',
  protocolosFolder: 'Protocolos',

  // Padrões de arquivos a ignorar
  ignorePatterns: [
    '_índice.md',
    '00 - Índice Queixas.md',
    '.obsidian',
  ],

  // Debounce em ms para o file watcher
  watchDebounce: 1000,

  // Polling do DB em ms
  dbPollInterval: 60000,

  // Limite de registros por lote
  dbBatchSize: 500,

  // Campos obrigatórios no frontmatter
  requiredFields: ['grupo', 'risco'],

  // Mapeamento de campos frontmatter → TypeScript
  fieldMapping: {
    // Frontmatter → TypeScript
    id: 'id',
    grupo: 'group',
    risco: 'riskLevel',
    severidade: 'severity',
    icd10: 'icd10Codes',
    aliases: 'synonyms',
    searchTerms: 'searchTerms',
    chips: 'chips',
    ageTargets: 'ageTargets',
    isTopForAdult: 'isTopForAdult',
    isTopForChild: 'isTopForChild',
    isFastTrack: 'isFastTrack',
    searchWeight: 'searchWeight',
    bodySystem: 'bodySystem',
    relatedSymptoms: 'relatedSymptoms',
    commonMisconceptions: 'commonMisconceptions',
    lastSync: 'lastSync',
  } as Record<string, string>,

  // ========== CONFIGURAÇÃO EBM (Evidence-Based Medicine) ==========

  ebm: {
    // Pasta de referências EBM no Obsidian
    referencesFolder: '03-Referencias-MBE',

    // Arquivo de medicações RENAME
    medicationsFile: 'Medicacoes/RENAME-Index.md',

    // Campos obrigatórios EBM no frontmatter
    requiredEBMFields: ['ebm_version', 'last_ebm_review'],

    // Validar compatibilidade SUS
    validateSUS: true,

    // Validar compatibilidade RENAME
    validateRENAME: true,

    // Fontes de citação aceitas
    citationSources: [
      'uptodate',
      'dynamed',
      'brazilian-guideline',
      'cochrane',
      'pubmed',
      'sbim',
      'sbc',
      'sbpt',
      'amb',
      'ms',
    ] as const,

    // Níveis de evidência aceitos (Oxford CEBM)
    evidenceLevels: ['A', 'B', 'C', 'D'] as const,

    // Vias de administração aceitas
    medicationRoutes: [
      'VO',
      'IV',
      'IM',
      'SC',
      'Inalatório',
      'Tópico',
      'SL',
      'Retal',
      'Nasal',
      'Ocular',
    ] as const,

    // Listas RENAME
    renameLists: ['A', 'B', 'C'] as const,

    // Severidades de red flags
    redFlagSeverities: ['critical', 'warning', 'caution'] as const,

    // Probabilidades de diagnóstico diferencial
    diagnosisProbabilities: ['high', 'medium', 'low'] as const,
  },

  // Mapeamento de campos EBM frontmatter → TypeScript
  ebmFieldMapping: {
    // Frontmatter → TypeScript (extendedContent)
    ebm_version: 'ebmVersion',
    last_ebm_review: 'lastEBMReview',
    evidence_quality: 'evidenceQuality',
    uptodate_reviewed: 'uptodateReviewed',
    dynamed_reviewed: 'dynamedReviewed',
    brazilian_guidelines: 'brazilianGuidelines',
    sus_protocol_compatible: 'susProtocolCompatible',
    rename_medications_only: 'renameMedicationsOnly',
    sus_guidelines: 'susGuidelines',
    brazilian_epidemiology: 'brazilianEpidemiology',
    brazilian_adaptations: 'brazilianAdaptations',
    sus_diagnostic_availability: 'susDiagnosticAvailability',
    sus_referral_pathway: 'susReferralPathway',
  } as Record<string, string>,
};

// Paths absolutos calculados
export const PATHS = {
  vault: SYNC_CONFIG.obsidianVault,
  queixas: path.join(SYNC_CONFIG.obsidianVault, SYNC_CONFIG.queixasFolder),
  protocolos: path.join(SYNC_CONFIG.obsidianVault, SYNC_CONFIG.protocolosFolder),
  complaintsData: path.resolve(process.cwd(), SYNC_CONFIG.complaintsDataPath),

  // Paths EBM
  ebmReferences: path.join(SYNC_CONFIG.obsidianVault, SYNC_CONFIG.ebm.referencesFolder),
  ebmMedications: path.join(
    SYNC_CONFIG.obsidianVault,
    SYNC_CONFIG.ebm.referencesFolder,
    SYNC_CONFIG.ebm.medicationsFile
  ),
  ebmUpToDate: path.join(
    SYNC_CONFIG.obsidianVault,
    SYNC_CONFIG.ebm.referencesFolder,
    'UpToDate'
  ),
  ebmDynaMed: path.join(
    SYNC_CONFIG.obsidianVault,
    SYNC_CONFIG.ebm.referencesFolder,
    'DynaMed'
  ),
  ebmBrazilianGuidelines: path.join(
    SYNC_CONFIG.obsidianVault,
    SYNC_CONFIG.ebm.referencesFolder,
    'Diretrizes-Brasileiras'
  ),
};

// Grupos válidos
export const VALID_GROUPS = [
  'PROTO_SEPSE', 'PROTO_AVC', 'PROTO_IC', 'PROTO_TEP',
  'CV', 'RC', 'NC', 'GI', 'GU', 'MSK', 'INF', 'OBG',
  'PED', 'PSI', 'TR', 'TOX', 'DERM', 'ORL', 'OFT', 'ENV', 'GEN',
];

// Níveis de risco válidos
export const VALID_RISK_LEVELS = ['low', 'medium', 'high'] as const;

// Age targets válidos
export const VALID_AGE_TARGETS = [
  'adult', 'child', 'elderly', 'teen', 'infant', 'adultPregnant',
] as const;
