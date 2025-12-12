/**
 * Clinical Context Configuration
 * Context-specific considerations for different patient categories
 * Migrated from Google AI Studio frontend
 */

import type { UIPatient } from '@/types/frontend';

export interface ClinicalContext {
  category: string;
  alerts: string[];
  considerations: string[];
  contraindications: string[];
}

/**
 * Get clinical context based on patient characteristics
 */
export function getCategoryContext(patient: UIPatient): ClinicalContext {
  const context: ClinicalContext = {
    category: patient.category,
    alerts: [],
    considerations: [],
    contraindications: [],
  };

  // Pediatric context
  if (patient.category === 'pediatric') {
    context.alerts.push('Paciente pediátrico - considerar doses ajustadas ao peso');
    context.considerations.push(
      'Verificar cartão de vacinação',
      'Considerar diagnósticos diferenciais específicos da idade',
      'Avaliar sinais de desidratação com atenção redobrada',
      'Comunicação com responsável obrigatória'
    );
    context.contraindications.push(
      'AAS contraindicado em quadros virais (Síndrome de Reye)',
      'Metoclopramida evitar em < 1 ano',
      'Fluoroquinolonas evitar se possível'
    );
  }

  // Elderly context
  if (patient.category === 'elderly') {
    context.alerts.push('Paciente idoso - atenção a polifarmácia e função renal');
    context.considerations.push(
      'Avaliar risco de queda',
      'Verificar lista completa de medicamentos em uso',
      'Considerar apresentação atípica de doenças',
      'Avaliar função renal antes de medicações',
      'Considerar delirium como diagnóstico diferencial'
    );
    context.contraindications.push(
      'Benzodiazepínicos com cautela (risco de delirium)',
      'AINEs evitar se possível (função renal)',
      'Anticolinérgicos com cautela'
    );
  }

  // Pregnant context
  if (patient.isPregnant) {
    context.alerts.push('GESTANTE - Avaliar idade gestacional e riscos fetais');
    context.considerations.push(
      'Evitar medicações categoria X e D',
      'Considerar diagnósticos obstétricos',
      'Avaliar necessidade de avaliação obstétrica',
      'Posicionar em decúbito lateral esquerdo se > 20 semanas',
      'Considerar alterações fisiológicas da gestação'
    );
    context.contraindications.push(
      'AINEs evitar especialmente no 3º trimestre',
      'Fluoroquinolonas contraindicadas',
      'Estatinas contraindicadas',
      'IECAs/BRAs contraindicados',
      'Metoclopramida com cautela'
    );
  }

  return context;
}

/**
 * Get medication safety alerts based on patient data
 */
export function getMedicationAlerts(patient: UIPatient, protocolId?: string): string[] {
  const alerts: string[] = [];

  // Check for dangerous interactions
  if (patient.medications && patient.allergies) {
    patient.medications.forEach(med => {
      patient.allergies.forEach(allergy => {
        if (
          med.toLowerCase().includes(allergy.toLowerCase()) ||
          allergy.toLowerCase().includes(med.toLowerCase())
        ) {
          alerts.push(`INTERACAO GRAVE: Uso de ${med} em paciente alérgico a ${allergy}.`);
        }
      });
    });
  }

  // Protocol-specific alerts
  if (protocolId === 'dor_toracica') {
    const pde5Inhibitors = ['sildenafil', 'tadalafila', 'viagra', 'cialis', 'vardenafil'];
    if (patient.medications.some(m => pde5Inhibitors.some(p => m.toLowerCase().includes(p)))) {
      alerts.push('CONTRAINDICACAO ABSOLUTA: Nitratos (risco de obito com inibidores de PDE-5).');
    }

    // Check for anticoagulants
    const anticoagulants = ['warfarina', 'rivaroxabana', 'apixabana', 'dabigatrana', 'marevan'];
    if (patient.medications.some(m => anticoagulants.some(a => m.toLowerCase().includes(a)))) {
      alerts.push('ATENCAO: Paciente em uso de anticoagulante - verificar INR/coagulacao.');
    }
  }

  // Sepsis protocol alerts
  if (protocolId === 'febre') {
    const immunosuppressants = ['prednisona', 'prednisolona', 'metilprednisolona', 'azatioprina', 'metotrexato'];
    if (patient.medications.some(m => immunosuppressants.some(i => m.toLowerCase().includes(i)))) {
      alerts.push('ATENCAO: Paciente imunossuprimido - considerar infeccoes oportunistas.');
    }
  }

  return alerts;
}

/**
 * Get age-specific dose adjustments info
 */
export function getAgeAdjustmentInfo(patient: UIPatient): string[] {
  const info: string[] = [];
  const age = parseInt(patient.age) || 0;

  if (patient.category === 'pediatric') {
    if (age < 1) {
      info.push('Lactente: doses em mg/kg, volume maximo reduzido');
    } else if (age < 6) {
      info.push('Pre-escolar: preferir formulacoes liquidas');
    } else if (age < 12) {
      info.push('Escolar: pode usar comprimidos se souber engolir');
    }
  }

  if (patient.category === 'elderly') {
    if (age >= 80) {
      info.push('Idoso > 80 anos: considerar reducao de dose em 25-50%');
    } else if (age >= 65) {
      info.push('Idoso: avaliar funcao renal antes de ajuste de dose');
    }
  }

  return info;
}

/**
 * Get red flag considerations based on patient category
 */
export function getCategoryRedFlags(patient: UIPatient): string[] {
  const redFlags: string[] = [];

  if (patient.category === 'pediatric') {
    redFlags.push(
      'Irritabilidade inconsolavel',
      'Recusa alimentar',
      'Letargia ou hipotonia',
      'Fontanela abaulada (se < 18m)'
    );
  }

  if (patient.category === 'elderly') {
    redFlags.push(
      'Confusao mental aguda',
      'Queda recente',
      'Incontinencia de inicio recente',
      'Hipotensao ou bradicardia'
    );
  }

  if (patient.isPregnant) {
    redFlags.push(
      'Sangramento vaginal',
      'Dor abdominal intensa',
      'Reducao de movimentos fetais',
      'Cefaleia intensa + PA elevada',
      'Edema de face/maos'
    );
  }

  return redFlags;
}
