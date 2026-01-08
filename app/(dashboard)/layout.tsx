import { redirect } from 'next/navigation'
import { getUser } from '@/lib/supabase/server'
import { DashboardHeader } from '@/components/layout/DashboardHeader'
import { DashboardContent } from '@/components/layout/DashboardContent'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario'

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-slate-950 dark:via-purple-950/20 dark:to-pink-950/30">
      <DashboardHeader userName={userName} />

      <main className="flex-1 p-4 lg:p-6">
        <DashboardContent>{children}</DashboardContent>
      </main>

      <footer
        className={`
        relative z-10
        flex h-12 items-center justify-center border-t
        backdrop-blur-4xl saturate-180
        bg-white/25 dark:bg-slate-900/25
        border-white/30 dark:border-white/10
        shadow-glass dark:shadow-glass-dark
        transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
      `}
      >
        <p className="text-xs text-slate-500 dark:text-slate-400">
          &copy; {new Date().getFullYear()} WellWave - Documentação médica inteligente
        </p>
      </footer>
    </div>
  )
}
