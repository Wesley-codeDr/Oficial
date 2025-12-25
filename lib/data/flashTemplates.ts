import { Patient } from '@/lib/types/medical'

export interface FlashTemplate {
  id: string
  nome: string
  categoria: string
  template: {
    queixa_principal: string
    exame_fisico: string
    hipotese_diagnostica: string[]
    conduta: string
    cid: string
    cid_descricao: string
  }
  referencias_mbe: string[]
}

export const flashTemplates: Record<string, FlashTemplate> = {
  ivas: {
    id: 'ivas',
    nome: 'IVAS / Resfriado Comum',
    categoria: 'respiratorio',
    template: {
      queixa_principal:
        'Coriza, odinofagia e tosse seca há {tempo_sintomas}. Nega febre aferida. Nega dispneia. Nega dor torácica.',
      exame_fisico:
        'Bom estado geral, {gender_corado}, {gender_hidratado}, {gender_afebril} ao toque. Orofaringe com hiperemia leve, sem exsudato ou placas. Murmúrio vesicular presente bilateral, sem ruídos adventícios.',
      hipotese_diagnostica: [
        'Infecção de vias aéreas superiores de provável etiologia viral',
        'Rinofaringite aguda',
        'Síndrome gripal',
      ],
      conduta:
        'Prescrito sintomáticos (analgésico e antitérmico). {gender_orientado} quanto à hidratação oral abundante e repouso relativo. {gender_orientado} quanto aos sinais de alarme: febre persistente por mais de 72 horas, dispneia, dor torácica, piora do estado geral. {gender_orientado} a retornar ao pronto atendimento se persistência ou piora dos sintomas. {gender_orientado} a buscar acompanhamento com {gender_medico} assistente para seguimento ambulatorial.',
      cid: 'J069',
      cid_descricao: 'Infecção aguda das vias aéreas superiores não especificada',
    },
    referencias_mbe: [
      'NICE Guidelines CG69',
      'BMJ Best Practice - Common Cold',
      'UpToDate - The common cold in adults',
    ],
  },
  faringoamigdalite: {
    id: 'faringoamigdalite',
    nome: 'Faringoamigdalite Bacteriana',
    categoria: 'respiratorio',
    template: {
      queixa_principal:
        'Odinofagia intensa há {tempo_sintomas}, febre aferida de {temperatura}°C, dificuldade para deglutição. Nega tosse. Nega dispneia. Nega trismo. Nega abaulamento em palato.',
      exame_fisico:
        'Regular estado geral, {gender_corado}, {gender_hidratado}, febril ao toque. Orofaringe com hiperemia intensa e exsudato purulento em tonsilas palatinas bilateralmente. Adenomegalia cervical anterior palpável, dolorosa. Ausência de abaulamento peritonsilar. Murmúrio vesicular presente bilateral, sem ruídos adventícios.',
      hipotese_diagnostica: [
        'Faringoamigdalite aguda bacteriana',
        'Faringoamigdalite estreptocócica',
        'Mononucleose infecciosa em diagnóstico diferencial',
      ],
      conduta:
        'Escore de Centor-McIsaac: {centor_score} pontos. Prescrito antibioticoterapia (Amoxicilina 500mg via oral a cada 8 horas por 10 dias) e sintomáticos. {gender_orientado} quanto a repouso, hidratação oral e alimentação pastosa. {gender_orientado} quanto aos sinais de alarme: dispneia, trismo, abaulamento peritonsilar, salivação excessiva, dificuldade respiratória. {gender_orientado} a retornar ao pronto atendimento se persistência da febre após 48 a 72 horas de antibioticoterapia ou piora clínica. {gender_orientado} a buscar acompanhamento com {gender_medico} assistente ou otorrinolaringologista para seguimento.',
      cid: 'J030',
      cid_descricao: 'Amigdalite estreptocócica',
    },
    referencias_mbe: ['IDSA Guidelines', 'UpToDate - Group A streptococcal tonsillopharyngitis'],
  },
}

export interface FlashInput {
  paciente: {
    sexo: 'M' | 'F'
    idade?: string
    unidade_idade?: 'anos' | 'meses' | 'dias'
    gestante?: boolean
  }
  queixa_selecionada: string
  dados_variaveis: {
    tempo_sintomas: string
    temperatura?: string
    pa_sistolica?: string
    pa_diastolica?: string
    fc?: string
    fr?: string
    spo2?: string
    glasgow?: string
    centor_score?: string // Specific to faringo
    outros?: Record<string, any>
  }
}

export const generateFlashRecord = (input: FlashInput) => {
  const templateId = input.queixa_selecionada // Assuming mapped directly for now
  const templateData = flashTemplates[templateId] || flashTemplates['ivas'] // Fallback

  if (!templateData) {
    return {
      queixa_principal: 'Erro: Template não encontrado',
      exame_fisico: '',
      hipotese_diagnostica: [],
      conduta: '',
      cid: '',
      cid_descricao: '',
    }
  }

  const tmpl = templateData.template
  const vars = input.dados_variaveis
  // Enforce female gender if pregnant
  const gender = input.paciente.gestante ? 'F' : input.paciente.sexo

  // Gender Helper
  const g = (m: string, f: string) => (gender === 'M' ? m : f)

  // Replacer Function
  const replace = (text: string) => {
    let res = text
    // Variables
    Object.entries(vars).forEach(([key, val]) => {
      res = res.replace(new RegExp(`{${key}}`, 'g'), (val as string) || '--')
    })

    // Gender Flexions
    res = res.replace(/{gender_corado}/g, g('corado', 'corada'))
    res = res.replace(/{gender_hidratado}/g, g('hidratado', 'hidratada'))
    res = res.replace(/{gender_afebril}/g, g('afebril', 'afebril')) // Neutral
    res = res.replace(/{gender_orientado}/g, g('Orientado', 'Orientada'))
    res = res.replace(/{gender_medico}/g, g('médico', 'médica')) // Usually refers to the assistant doctor, let's assume generic agreement or context

    // Manual handling for complex gender tokens like {g:o/a} from prompt
    // The prompt used {g:o/a}. I'll normalize my template to use my keys or support that syntax.
    // Let's support the prompt's syntax: {g:o/a}
    res = res.replace(/{g:([^}]+)}/g, (match, content) => {
      const [m, f] = content.split('/')
      return g(m, f || m) // if f is missing, use m? usually it's o/a
    })

    return res
  }

  return {
    queixa_principal: replace(tmpl.queixa_principal),
    exame_fisico: replace(tmpl.exame_fisico),
    hipotese_diagnostica: tmpl.hipotese_diagnostica,
    conduta: replace(tmpl.conduta),
    cid: tmpl.cid,
    cid_descricao: tmpl.cid_descricao,
  }
}
