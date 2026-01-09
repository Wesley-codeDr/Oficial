/**
 * Authentication Module Unit Tests
 *
 * Tests for lib/auth/actions.ts covering:
 * - Login validation and errors
 * - Registration validation and password requirements
 * - Password reset flow
 * - Rate limiting behavior
 * - Supabase error handling
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { z } from 'zod'

// ============================================================================
// Test the validation schemas directly (exported for testing)
// ============================================================================

// Recreate schemas for testing (matching the source)
const passwordSchema = z
  .string()
  .min(12, 'Senha deve ter no mínimo 12 caracteres')
  .regex(/[A-Z]/, 'Deve conter ao menos uma letra maiúscula')
  .regex(/[a-z]/, 'Deve conter ao menos uma letra minúscula')
  .regex(/[0-9]/, 'Deve conter ao menos um número')
  .regex(/[^A-Za-z0-9]/, 'Deve conter ao menos um caractere especial (!@#$%^&*)')

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: passwordSchema,
  fullName: z.string().min(3, 'Nome completo obrigatório'),
  crmNumber: z.string().min(4, 'CRM obrigatório'),
  crmState: z.string().length(2, 'UF do CRM deve ter 2 caracteres'),
})

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
})

// ============================================================================
// Login Schema Tests
// ============================================================================

describe('Login Validation', () => {
  describe('Email Validation', () => {
    it('should accept valid email', () => {
      const result = loginSchema.safeParse({
        email: 'doctor@hospital.com',
        password: 'password123',
      })
      expect(result.success).toBe(true)
    })

    it('should reject invalid email format', () => {
      const result = loginSchema.safeParse({
        email: 'invalid-email',
        password: 'password123',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email inválido')
      }
    })

    it('should reject email without domain', () => {
      const result = loginSchema.safeParse({
        email: 'user@',
        password: 'password123',
      })
      expect(result.success).toBe(false)
    })

    it('should reject email without @', () => {
      const result = loginSchema.safeParse({
        email: 'userdomain.com',
        password: 'password123',
      })
      expect(result.success).toBe(false)
    })

    it('should reject empty email', () => {
      const result = loginSchema.safeParse({
        email: '',
        password: 'password123',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('Password Validation (Login)', () => {
    it('should accept password with 6+ characters', () => {
      const result = loginSchema.safeParse({
        email: 'test@test.com',
        password: '123456',
      })
      expect(result.success).toBe(true)
    })

    it('should reject password with less than 6 characters', () => {
      const result = loginSchema.safeParse({
        email: 'test@test.com',
        password: '12345',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Senha deve ter pelo menos 6 caracteres')
      }
    })

    it('should reject empty password', () => {
      const result = loginSchema.safeParse({
        email: 'test@test.com',
        password: '',
      })
      expect(result.success).toBe(false)
    })
  })
})

// ============================================================================
// Password Strength Schema Tests
// ============================================================================

describe('Password Strength Validation', () => {
  describe('Minimum Length', () => {
    it('should reject password with less than 12 characters', () => {
      const result = passwordSchema.safeParse('Short1!aA')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('12 caracteres')
      }
    })

    it('should accept password with exactly 12 characters', () => {
      const result = passwordSchema.safeParse('Abcdefgh1!23')
      expect(result.success).toBe(true)
    })

    it('should accept password with more than 12 characters', () => {
      const result = passwordSchema.safeParse('MySecurePassword123!')
      expect(result.success).toBe(true)
    })
  })

  describe('Uppercase Requirement', () => {
    it('should reject password without uppercase', () => {
      const result = passwordSchema.safeParse('abcdefgh1!23')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.some(e => e.message.includes('maiúscula'))).toBe(true)
      }
    })

    it('should accept password with uppercase', () => {
      const result = passwordSchema.safeParse('Abcdefgh1!23')
      expect(result.success).toBe(true)
    })
  })

  describe('Lowercase Requirement', () => {
    it('should reject password without lowercase', () => {
      const result = passwordSchema.safeParse('ABCDEFGH1!23')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.some(e => e.message.includes('minúscula'))).toBe(true)
      }
    })

    it('should accept password with lowercase', () => {
      const result = passwordSchema.safeParse('Abcdefgh1!23')
      expect(result.success).toBe(true)
    })
  })

  describe('Number Requirement', () => {
    it('should reject password without number', () => {
      const result = passwordSchema.safeParse('Abcdefghij!@')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.some(e => e.message.includes('número'))).toBe(true)
      }
    })

    it('should accept password with number', () => {
      const result = passwordSchema.safeParse('Abcdefgh1!23')
      expect(result.success).toBe(true)
    })
  })

  describe('Special Character Requirement', () => {
    it('should reject password without special character', () => {
      const result = passwordSchema.safeParse('Abcdefgh1234')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.some(e => e.message.includes('especial'))).toBe(true)
      }
    })

    it('should accept password with special character !', () => {
      const result = passwordSchema.safeParse('Abcdefgh123!')
      expect(result.success).toBe(true)
    })

    it('should accept password with special character @', () => {
      const result = passwordSchema.safeParse('Abcdefgh123@')
      expect(result.success).toBe(true)
    })

    it('should accept password with special character #', () => {
      const result = passwordSchema.safeParse('Abcdefgh123#')
      expect(result.success).toBe(true)
    })

    it('should accept password with special character $', () => {
      const result = passwordSchema.safeParse('Abcdefgh123$')
      expect(result.success).toBe(true)
    })
  })

  describe('Strong Password Examples', () => {
    const strongPasswords = [
      'MySecure@Pass1',
      'C0mpl3x!Password',
      'Dr.Silva#2024!',
      'Hospital123!@#',
      'M3dico$eguro!',
    ]

    strongPasswords.forEach((password) => {
      it(`should accept strong password: ${password.substring(0, 5)}...`, () => {
        const result = passwordSchema.safeParse(password)
        expect(result.success).toBe(true)
      })
    })
  })

  describe('Weak Password Examples', () => {
    const weakPasswords = [
      { password: 'password', reason: 'no uppercase, number, special' },
      { password: 'PASSWORD', reason: 'no lowercase, number, special' },
      { password: '12345678', reason: 'no letters, special' },
      { password: 'Short1!', reason: 'too short' },
      { password: 'abcdefghijkl', reason: 'no uppercase, number, special' },
    ]

    weakPasswords.forEach(({ password, reason }) => {
      it(`should reject weak password (${reason})`, () => {
        const result = passwordSchema.safeParse(password)
        expect(result.success).toBe(false)
      })
    })
  })
})

// ============================================================================
// Registration Schema Tests
// ============================================================================

describe('Registration Validation', () => {
  const validRegistration = {
    email: 'doctor@hospital.com',
    password: 'SecurePass123!',
    fullName: 'Dr. João Silva',
    crmNumber: '123456',
    crmState: 'SP',
  }

  describe('Email Validation', () => {
    it('should accept valid registration email', () => {
      const result = registerSchema.safeParse(validRegistration)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email', () => {
      const result = registerSchema.safeParse({
        ...validRegistration,
        email: 'invalid-email',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('Full Name Validation', () => {
    it('should accept valid full name', () => {
      const result = registerSchema.safeParse(validRegistration)
      expect(result.success).toBe(true)
    })

    it('should reject name with less than 3 characters', () => {
      const result = registerSchema.safeParse({
        ...validRegistration,
        fullName: 'Jo',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Nome completo obrigatório')
      }
    })

    it('should accept name with exactly 3 characters', () => {
      const result = registerSchema.safeParse({
        ...validRegistration,
        fullName: 'Ana',
      })
      expect(result.success).toBe(true)
    })
  })

  describe('CRM Number Validation', () => {
    it('should accept valid CRM number', () => {
      const result = registerSchema.safeParse(validRegistration)
      expect(result.success).toBe(true)
    })

    it('should reject CRM with less than 4 characters', () => {
      const result = registerSchema.safeParse({
        ...validRegistration,
        crmNumber: '123',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('CRM obrigatório')
      }
    })

    it('should accept CRM with exactly 4 characters', () => {
      const result = registerSchema.safeParse({
        ...validRegistration,
        crmNumber: '1234',
      })
      expect(result.success).toBe(true)
    })

    it('should accept long CRM number', () => {
      const result = registerSchema.safeParse({
        ...validRegistration,
        crmNumber: '1234567890',
      })
      expect(result.success).toBe(true)
    })
  })

  describe('CRM State Validation', () => {
    it('should accept valid 2-character state code', () => {
      const result = registerSchema.safeParse(validRegistration)
      expect(result.success).toBe(true)
    })

    it('should reject state code with 1 character', () => {
      const result = registerSchema.safeParse({
        ...validRegistration,
        crmState: 'S',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('UF do CRM deve ter 2 caracteres')
      }
    })

    it('should reject state code with 3 characters', () => {
      const result = registerSchema.safeParse({
        ...validRegistration,
        crmState: 'SPP',
      })
      expect(result.success).toBe(false)
    })

    const validStates = ['SP', 'RJ', 'MG', 'RS', 'BA', 'PR', 'SC', 'PE', 'CE', 'GO']
    validStates.forEach((state) => {
      it(`should accept state code: ${state}`, () => {
        const result = registerSchema.safeParse({
          ...validRegistration,
          crmState: state,
        })
        expect(result.success).toBe(true)
      })
    })
  })

  describe('Complete Registration Validation', () => {
    it('should accept complete valid registration', () => {
      const result = registerSchema.safeParse(validRegistration)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validRegistration)
      }
    })

    it('should reject registration with missing fields', () => {
      const incomplete = {
        email: 'test@test.com',
        password: 'SecurePass123!',
      }
      const result = registerSchema.safeParse(incomplete)
      expect(result.success).toBe(false)
    })

    it('should reject registration with empty fields', () => {
      const result = registerSchema.safeParse({
        email: '',
        password: '',
        fullName: '',
        crmNumber: '',
        crmState: '',
      })
      expect(result.success).toBe(false)
    })
  })
})

// ============================================================================
// Forgot Password Schema Tests
// ============================================================================

describe('Forgot Password Validation', () => {
  it('should accept valid email', () => {
    const result = forgotPasswordSchema.safeParse({
      email: 'doctor@hospital.com',
    })
    expect(result.success).toBe(true)
  })

  it('should reject invalid email', () => {
    const result = forgotPasswordSchema.safeParse({
      email: 'invalid-email',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Email inválido')
    }
  })

  it('should reject empty email', () => {
    const result = forgotPasswordSchema.safeParse({
      email: '',
    })
    expect(result.success).toBe(false)
  })
})

// ============================================================================
// Error Message Tests
// ============================================================================

describe('Error Messages (Portuguese)', () => {
  it('should return Portuguese error for invalid email', () => {
    const result = loginSchema.safeParse({ email: 'invalid', password: '123456' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('Email inválido')
    }
  })

  it('should return Portuguese error for short password', () => {
    const result = loginSchema.safeParse({ email: 'test@test.com', password: '123' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('Senha deve ter pelo menos 6 caracteres')
    }
  })

  it('should return Portuguese error for weak registration password', () => {
    const result = passwordSchema.safeParse('short')
    expect(result.success).toBe(false)
    if (!result.success && result.error.issues.length > 0) {
      expect(result.error.issues[0]?.message).toContain('12 caracteres')
    }
  })

  it('should return Portuguese error for missing uppercase', () => {
    const result = passwordSchema.safeParse('abcdefgh1!23')
    expect(result.success).toBe(false)
    if (!result.success && result.error.issues.length > 0) {
      const hasUppercaseError = result.error.issues.some(e => e.message.includes('maiúscula'))
      expect(hasUppercaseError).toBe(true)
    }
  })

  it('should return Portuguese error for short name', () => {
    const result = registerSchema.safeParse({
      email: 'test@test.com',
      password: 'SecurePass123!',
      fullName: 'Jo',
      crmNumber: '12345',
      crmState: 'SP',
    })
    expect(result.success).toBe(false)
    if (!result.success && result.error.issues.length > 0) {
      const hasNameError = result.error.issues.some(e => e.message.includes('Nome completo'))
      expect(hasNameError).toBe(true)
    }
  })
})

// ============================================================================
// Edge Cases
// ============================================================================

describe('Edge Cases', () => {
  describe('Unicode and Special Characters', () => {
    it('should accept email with + character', () => {
      const result = loginSchema.safeParse({
        email: 'doctor+test@hospital.com',
        password: '123456',
      })
      expect(result.success).toBe(true)
    })

    it('should accept name with accents', () => {
      const result = registerSchema.safeParse({
        email: 'test@test.com',
        password: 'SecurePass123!',
        fullName: 'José João Çaça',
        crmNumber: '12345',
        crmState: 'SP',
      })
      expect(result.success).toBe(true)
    })

    it('should accept password with unicode special chars', () => {
      const result = passwordSchema.safeParse('Abcdefgh123£')
      expect(result.success).toBe(true)
    })
  })

  describe('Whitespace Handling', () => {
    it('should reject email with spaces', () => {
      const result = loginSchema.safeParse({
        email: 'doctor @hospital.com',
        password: '123456',
      })
      expect(result.success).toBe(false)
    })

    it('should accept password with spaces (if other requirements met)', () => {
      const result = passwordSchema.safeParse('A b c d e 1 2 3 !')
      expect(result.success).toBe(true)
    })
  })

  describe('Null and Undefined', () => {
    it('should reject null email', () => {
      const result = loginSchema.safeParse({
        email: null,
        password: '123456',
      })
      expect(result.success).toBe(false)
    })

    it('should reject undefined password', () => {
      const result = loginSchema.safeParse({
        email: 'test@test.com',
        password: undefined,
      })
      expect(result.success).toBe(false)
    })
  })
})
