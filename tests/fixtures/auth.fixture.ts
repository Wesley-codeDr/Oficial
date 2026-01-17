/* eslint-disable react-hooks/rules-of-hooks */
import { test as base } from '@playwright/test'
import { createClient, type User } from '@supabase/supabase-js'

export type AuthFixtures = {
  user: User
}

export const test = base.extend<AuthFixtures>({
  // eslint-disable-next-line no-empty-pattern
  user: async ({ context }, use, testInfo) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    // Fallback or Fail
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error(
        'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. ' +
        'Authenticated tests require these environment variables.'
      )
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      }
    })

    const email = `test-${Date.now()}-${Math.floor(Math.random() * 1000)}@wellwave.com`
    const password = 'TestPassword123!'

    // 1. Create User
    const { data: { user }, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })

    if (createError || !user) {
      throw new Error(`Failed to create test user: ${createError?.message}`)
    }

    try {
      // 2. Sign In to get session/tokens
      const { data: { session }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError || !session) {
        throw new Error(`Failed to sign in test user: ${signInError?.message}`)
      }

      // 3. Set Cookies
      // Attempt to parse project ID from URL
      let projectId: string | undefined
      try {
        const urlObj = new URL(supabaseUrl)
        const parts = urlObj.hostname.split('.')
        // For cloud: xxxx.supabase.co -> xxxx
        // For local: localhost or 127.0.0.1 -> treat as special case or use first part
        if (parts.length > 1) {
            projectId = parts[0]
        } else {
            // Localhost fallback?
            // If strictly local, the cookie name logic in the app might vary.
            // But usually for local dev we might rely on the same logic if configured similarly.
            // For now, we take the hostname as is if no dots.
            projectId = urlObj.hostname
        }
      } catch (e) {
        console.warn('Failed to parse Supabase URL', e)
      }

      if (projectId) {
          const cookieName = `sb-${projectId}-auth-token`
          const cookieValue = JSON.stringify(session)

          // Use the baseURL from the test config to determine scope
          const baseURL = testInfo.project.use.baseURL || 'http://localhost:3000'

          await context.addCookies([{
              name: cookieName,
              value: cookieValue,
              url: baseURL,
              path: '/',
              httpOnly: false,
              secure: false,
              sameSite: 'Lax'
          }])
      } else {
         console.warn('Could not determine Project ID from URL. Auth cookies might fail.')
      }

      // 4. Use user
      await use(user)

    } finally {
      // 5. Cleanup
      // We always attempt to delete the user, even if the test fails
      await supabase.auth.admin.deleteUser(user.id)
    }
  }
})

export { expect } from '@playwright/test'
