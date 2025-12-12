/**
 * Medical Library Exports
 * Centralized exports for medical utilities
 */

// Syndromes
export {
  syndromes,
  getSyndromeById,
  getSyndromesByCategory,
  getCriticalSyndromes,
  syndromeColorMap,
} from './syndromes';

// Protocols
export {
  getProtocolData,
  getMetaSection,
  getPhysicalExamSection,
  getHypotheses,
  mapComplaintToProtocol,
  getCalculatorsForGroup,
} from './protocols';

// References
export {
  getStructuredReferences,
  getAllReferences,
  getCommonReference,
} from './references';

// Clinical Context
export {
  getCategoryContext,
  getMedicationAlerts,
  getAgeAdjustmentInfo,
  getCategoryRedFlags,
} from './clinical-context';

// Complaints Data
export {
  complaintsData,
  getComplaintsByGroup,
  getComplaintById,
  getGroupByCode,
  searchComplaints,
  getTopComplaints,
} from './complaints-data';

// Re-export types
export type { ClinicalContext } from './clinical-context';
