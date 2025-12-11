import type { User } from '@prisma/client'

export type { User }

// Auth user without sensitive data
export type SafeUser = Omit<User, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
  lastLoginAt: string | null
}

// Login request
export interface LoginRequest {
  email: string
  password: string
}

// Auth response
export interface AuthResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
  user: SafeUser
}

// Register request
export interface RegisterRequest {
  email: string
  password: string
  fullName: string
  crmNumber: string
  crmState: string
  specialty?: string
}

// Session state
export interface AuthState {
  user: SafeUser | null
  isLoading: boolean
  isAuthenticated: boolean
}

// Profile update request
export interface UpdateProfileRequest {
  fullName?: string
  specialty?: string
}
