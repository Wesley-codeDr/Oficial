import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type EvolutionType = 'agudo' | 'subagudo' | 'crônico'
type OnsetType = 'súbito' | 'progressivo' | 'insidioso'

interface PatientState {
  // Estado do contexto do paciente
  gender: 'M' | 'F'
  isPediatric: boolean
  age: string
  phoneNumber: string
  allergies: string
  painIntensity: number
  evolutionType: EvolutionType | undefined
  onsetType: OnsetType | undefined
  isContextSet: boolean // Flag para saber se o contexto foi definido

  // Ações
  setGender: (gender: 'M' | 'F') => void
  setIsPediatric: (isPediatric: boolean) => void
  setAge: (age: string) => void
  setPhoneNumber: (phone: string) => void
  setAllergies: (allergies: string) => void
  setPainIntensity: (intensity: number) => void
  setEvolutionType: (type: EvolutionType | undefined) => void
  setOnsetType: (type: OnsetType | undefined) => void
  setContext: (context: Partial<PatientState>) => void
  getContext: () => Partial<PatientState>
  reset: () => void
  markContextSet: () => void
}

const initialState = {
  gender: 'M' as const,
  isPediatric: false,
  age: '',
  phoneNumber: '',
  allergies: '',
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

      setAge: (age) => set({ age }),

      setPhoneNumber: (phoneNumber) => set({ phoneNumber }),

      setAllergies: (allergies) => set({ allergies }),

      setPainIntensity: (painIntensity) => set({ painIntensity }),

      setEvolutionType: (evolutionType) => set({ evolutionType }),

      setOnsetType: (onsetType) => set({ onsetType }),

      setContext: (context) =>
        set((state) => ({
          ...state,
          ...context,
          isContextSet: true,
        })),

      getContext: () => {
        const state = get()
        return {
          gender: state.gender,
          isPediatric: state.isPediatric,
          age: state.age,
          phoneNumber: state.phoneNumber,
          allergies: state.allergies,
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
