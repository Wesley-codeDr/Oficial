import { redirect } from 'next/navigation'
import { getUser } from '@/lib/supabase/server'
import { Sidebar } from '@/components/layout/sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario'

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Sidebar */}
      <Sidebar userName={userName} userEmail={user.email || ''} />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
