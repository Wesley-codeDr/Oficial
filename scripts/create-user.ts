#!/usr/bin/env tsx
/**
 * Script para criar usuário médico comum
 * Uso: pnpm tsx scripts/create-user.ts
 */

import { createClient } from '@supabase/supabase-js'
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente necessárias não encontradas!')
  process.exit(1)
}

// Credenciais do usuário médico
const USER_EMAIL = 'medico@wellwave.com'
const USER_PASSWORD = 'Medico@2025!'
const USER_FULL_NAME = 'Dr. João Silva'
const USER_CRM = '123456'
const USER_CRM_STATE = 'SP'
const USER_SPECIALTY = 'Clínica Médica'

async function createUser() {
  console.log('👨‍⚕️  Criando usuário médico...\n')

  const supabase = createClient(supabaseUrl!, supabaseServiceKey!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  const prisma = new PrismaClient()

  try {
    // 1. Verificar se usuário existe
    console.log('1️⃣  Verificando usuário no Supabase Auth...')
    const { data: listData } = await supabase.auth.admin.listUsers()
    let authUser = listData?.users.find((u) => u.email === USER_EMAIL)

    if (!authUser) {
      console.log('   ⚠️  Usuário não encontrado, criando...')

      const { data: createData, error: createError } = await supabase.auth.admin.createUser({
        email: USER_EMAIL,
        password: USER_PASSWORD,
        email_confirm: true,
        user_metadata: {
          full_name: USER_FULL_NAME,
          crm_number: USER_CRM,
          crm_state: USER_CRM_STATE,
          specialty: USER_SPECIALTY,
        },
      })

      if (createError) {
        console.error('   ❌ Erro ao criar usuário:', createError.message)
        throw createError
      }

      authUser = createData.user
      console.log('   ✅ Usuário criado com sucesso!')
    } else {
      console.log('   ✅ Usuário já existe no Auth')

      // Atualizar senha
      console.log('   🔄 Atualizando senha...')
      await supabase.auth.admin.updateUserById(authUser.id, {
        password: USER_PASSWORD,
      })
      console.log('   ✅ Senha atualizada')
    }

    // 2. Criar registro no Prisma
    console.log('\n2️⃣  Verificando registro na tabela users...')
    let dbUser = await prisma.user.findUnique({
      where: { email: USER_EMAIL },
    })

    if (!dbUser && authUser) {
      console.log('   ⚠️  Registro não encontrado, criando...')

      try {
        dbUser = await prisma.user.create({
          data: {
            id: authUser.id,
            email: USER_EMAIL,
            fullName: USER_FULL_NAME,
            crmNumber: USER_CRM,
            crmState: USER_CRM_STATE,
            specialty: USER_SPECIALTY,
            isActive: true,
          },
        })
        console.log('   ✅ Registro criado na tabela users')
      } catch (dbError: any) {
        if (dbError.code === 'P2002') {
          console.log('   ✅ Registro já existe')
        } else {
          throw dbError
        }
      }
    } else {
      console.log('   ✅ Registro já existe na tabela users')
    }

    // 3. Testar login
    console.log('\n3️⃣  Testando autenticação...')
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: USER_EMAIL,
      password: USER_PASSWORD,
    })

    if (signInError) {
      console.error('   ❌ Erro ao testar login:', signInError.message)
      throw signInError
    }

    console.log('   ✅ Login testado com sucesso!')

    // 4. Exibir credenciais
    console.log('\n' + '='.repeat(80))
    console.log('🎉 USUÁRIO MÉDICO CRIADO COM SUCESSO!')
    console.log('='.repeat(80))
    console.log('')
    console.log('🌐 Acesse: http://localhost:3000/login')
    console.log('')
    console.log('📧 Email:        ', USER_EMAIL)
    console.log('🔑 Senha:        ', USER_PASSWORD)
    console.log('')
    console.log('👤 Nome:         ', USER_FULL_NAME)
    console.log('🏥 CRM:          ', USER_CRM, '-', USER_CRM_STATE)
    console.log('🩺 Especialidade:', USER_SPECIALTY)
    console.log('')
    console.log('✅ Pronto para usar! Faça login e comece a gerar anamneses.')
    console.log('')

  } catch (error) {
    console.error('\n❌ Erro:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

createUser()
