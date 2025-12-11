import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SafeUser } from '@/types/auth'

interface AuthState {
  user: SafeUser | null
  isLoading: boolean
  isAuthenticated: boolean
  setUser: (user: SafeUser | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          isLoading: false,
        }),

      setLoading: (isLoading) => set({ isLoading }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        }),
    }),
    {
      name: 'wellwave-auth',
      partialize: (state) => ({ user: state.user }),
    }
  )
)
