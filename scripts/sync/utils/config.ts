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
};

// Paths absolutos calculados
export const PATHS = {
  vault: SYNC_CONFIG.obsidianVault,
  queixas: path.join(SYNC_CONFIG.obsidianVault, SYNC_CONFIG.queixasFolder),
  protocolos: path.join(SYNC_CONFIG.obsidianVault, SYNC_CONFIG.protocolosFolder),
  complaintsData: path.resolve(process.cwd(), SYNC_CONFIG.complaintsDataPath),
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
