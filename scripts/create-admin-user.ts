#!/usr/bin/env tsx
/**
 * Script para criar um usuário admin no Supabase
 * 
 * Uso: pnpm tsx scripts/create-admin-user.ts
 */

import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Erro: Variáveis de ambiente necessárias não encontradas!')
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗')
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗')
  process.exit(1)
}

// Credenciais do admin
const ADMIN_EMAIL = 'admin@wellwave.com'
const ADMIN_PASSWORD = 'admin123456'
const ADMIN_FULL_NAME = 'Administrador WellWave'
const ADMIN_CRM = '000000'
const ADMIN_CRM_STATE = 'SP'

async function createAdminUser() {
  console.log('🚀 Criando usuário admin...\n')

  // Criar cliente admin do Supabase
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  try {
    // Primeiro, verificar se o usuário já existe
    const { data: existingUsers } = await supabase.auth.admin.listUsers()
    const userExists = existingUsers?.users.find((u) => u.email === ADMIN_EMAIL)

    if (userExists) {
      console.log('⚠️  Usuário admin já existe!')
      console.log('\n📧 Email:', ADMIN_EMAIL)
      console.log('🔑 Senha:', ADMIN_PASSWORD)
      console.log('\n✅ Você já pode fazer login com estas credenciais!')
      return
    }

    // Criar usuário admin
    const { data, error } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true, // Email já confirmado
      user_metadata: {
        full_name: ADMIN_FULL_NAME,
        crm_number: ADMIN_CRM,
        crm_state: ADMIN_CRM_STATE,
      },
    })

    if (error) {
      console.error('❌ Erro ao criar usuário:', error.message)
      process.exit(1)
    }

    console.log('✅ Usuário admin criado com sucesso!\n')
    console.log('📧 Email:', ADMIN_EMAIL)
    console.log('🔑 Senha:', ADMIN_PASSWORD)
    console.log('👤 Nome:', ADMIN_FULL_NAME)
    console.log('🏥 CRM:', ADMIN_CRM, '-', ADMIN_CRM_STATE)
    console.log('\n✨ Você já pode fazer login com estas credenciais!')
    console.log('🔗 Acesse: http://localhost:3001/login\n')
  } catch (error) {
    console.error('❌ Erro inesperado:', error)
    process.exit(1)
  }
}

createAdminUser()
