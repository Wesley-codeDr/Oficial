import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { PatientContext } from '@/lib/anamnese/narrative-templates'

type EvolutionType = 'agudo' | 'subagudo' | 'crônico'
type OnsetType = 'súbito' | 'progressivo' | 'insidioso'

interface PatientState {
  // Estado do contexto do paciente
  gender: 'M' | 'F'
  isPediatric: boolean
  painIntensity: number
  evolutionType: EvolutionType | undefined
  onsetType: OnsetType | undefined
  isContextSet: boolean // Flag para saber se o contexto foi definido

  // Ações
  setGender: (gender: 'M' | 'F') => void
  setIsPediatric: (isPediatric: boolean) => void
  setPainIntensity: (intensity: number) => void
  setEvolutionType: (type: EvolutionType | undefined) => void
  setOnsetType: (type: OnsetType | undefined) => void
  setContext: (context: Partial<PatientContext>) => void
  getContext: () => PatientContext
  reset: () => void
  markContextSet: () => void
}

const initialState = {
  gender: 'M' as const,
  isPediatric: false,
  painIntensity: 0,
  evolutionType: undefined as EvolutionType | undefined,
  onsetType: undefined as OnsetType | undefined,
  isContextSet: false,
}

export const usePatientStore = create<PatientState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setGender: (gender) => set({ gender }),

      setIsPediatric: (isPediatric) => set({ isPediatric }),

      setPainIntensity: (painIntensity) => set({ painIntensity }),

      setEvolutionType: (evolutionType) => set({ evolutionType }),

      setOnsetType: (onsetType) => set({ onsetType }),

      setContext: (context) =>
        set((state) => ({
          ...state,
          ...context,
          isContextSet: true,
        })),

      getContext: (): PatientContext => {
        const state = get()
        return {
          gender: state.gender,
          isPediatric: state.isPediatric,
          painIntensity: state.painIntensity > 0 ? state.painIntensity : undefined,
          evolutionType: state.evolutionType,
          onsetType: state.onsetType,
        }
      },

      markContextSet: () => set({ isContextSet: true }),

      reset: () => set(initialState),
    }),
    {
      name: 'patient-context-storage',
      storage: createJSONStorage(() => sessionStorage),
      // Persistir apenas durante a sessão do navegador
    }
  )
)
