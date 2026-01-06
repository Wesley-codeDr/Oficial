#!/usr/bin/env tsx
/**
 * Script para garantir que o login admin esteja funcionando
 * Verifica e corrige problemas de autenticação
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

const ADMIN_EMAIL = 'admin@wellwave.com'
const ADMIN_PASSWORD = 'Admin@2025!Strong'
const ADMIN_FULL_NAME = 'Administrador WellWave'
const ADMIN_CRM = '999999'
const ADMIN_CRM_STATE = 'SP'

async function fixAdminLogin() {
  console.log('🔧 Verificando e corrigindo login administrativo...\n')

  const supabase = createClient(supabaseUrl!, supabaseServiceKey!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  const prisma = new PrismaClient()

  try {
    // 1. Verificar se usuário existe no Supabase Auth
    console.log('1️⃣  Verificando usuário no Supabase Auth...')
    const { data: listData } = await supabase.auth.admin.listUsers()
    let authUser = listData?.users.find((u) => u.email === ADMIN_EMAIL)

    if (!authUser) {
      console.log('   ⚠️  Usuário não encontrado, criando...')

      const { data: createData, error: createError } = await supabase.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        email_confirm: true,
        user_metadata: {
          full_name: ADMIN_FULL_NAME,
          crm_number: ADMIN_CRM,
          crm_state: ADMIN_CRM_STATE,
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

      // Atualizar senha para garantir que está correta
      console.log('   🔄 Atualizando senha...')
      const { error: updateError } = await supabase.auth.admin.updateUserById(authUser.id, {
        password: ADMIN_PASSWORD,
      })

      if (updateError) {
        console.log('   ⚠️  Erro ao atualizar senha:', updateError.message)
      } else {
        console.log('   ✅ Senha atualizada')
      }
    }

    // 2. Verificar se existe na tabela users do Prisma
    console.log('\n2️⃣  Verificando registro na tabela users...')
    let dbUser = await prisma.user.findUnique({
      where: { email: ADMIN_EMAIL },
    })

    if (!dbUser && authUser) {
      console.log('   ⚠️  Registro não encontrado, criando...')

      try {
        dbUser = await prisma.user.create({
          data: {
            id: authUser.id,
            email: ADMIN_EMAIL,
            fullName: ADMIN_FULL_NAME,
            crmNumber: ADMIN_CRM,
            crmState: ADMIN_CRM_STATE,
            isActive: true,
          },
        })
        console.log('   ✅ Registro criado na tabela users')
      } catch (dbError: any) {
        if (dbError.code === 'P2002') {
          console.log('   ✅ Registro já existe (chave duplicada)')
        } else {
          console.error('   ❌ Erro ao criar registro:', dbError.message)
        }
      }
    } else {
      console.log('   ✅ Registro já existe na tabela users')

      // Garantir que está ativo
      if (dbUser && !dbUser.isActive) {
        console.log('   🔄 Ativando usuário...')
        await prisma.user.update({
          where: { id: dbUser.id },
          data: { isActive: true },
        })
        console.log('   ✅ Usuário ativado')
      }
    }

    // 3. Testar login
    console.log('\n3️⃣  Testando autenticação...')
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    })

    if (signInError) {
      console.error('   ❌ Erro ao testar login:', signInError.message)
      throw signInError
    }

    console.log('   ✅ Login testado com sucesso!')
    console.log('   📝 Session ID:', signInData.session?.access_token.slice(0, 20) + '...')

    // 4. Exibir credenciais
    console.log('\n' + '='.repeat(80))
    console.log('🎉 LOGIN ADMINISTRATIVO FUNCIONANDO!')
    console.log('='.repeat(80))
    console.log('')
    console.log('🌐 Acesse: http://localhost:3000/login')
    console.log('')
    console.log('📧 Email:    ', ADMIN_EMAIL)
    console.log('🔑 Senha:    ', ADMIN_PASSWORD)
    console.log('')
    console.log('👤 Nome:     ', ADMIN_FULL_NAME)
    console.log('🏥 CRM:      ', ADMIN_CRM, '-', ADMIN_CRM_STATE)
    console.log('')
    console.log('✅ Tudo pronto! Faça login e explore o sistema.')
    console.log('')

  } catch (error) {
    console.error('\n❌ Erro ao configurar login:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

fixAdminLogin()
