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
    <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,#E3F2FD_0%,#BBDEFB_30%,#90CAF9_60%,#64B5F6_100%)] dark:bg-[linear-gradient(180deg,#0F172A_0%,#1E293B_30%,#1E3A5F_60%,#1E4976_100%)] relative overflow-hidden">
      <div className="liquid-glass-bg" aria-hidden="true">
        <div className="liquid-blob liquid-blob-1" />
        <div className="liquid-blob liquid-blob-2" />
        <div className="liquid-blob liquid-blob-3" />
      </div>

      <DashboardHeader userName={userName} />

      <main className="flex-1 p-4 lg:p-6 relative z-10">
        <DashboardContent>{children}</DashboardContent>
      </main>

      <footer className="relative z-10 flex h-12 items-center justify-center border-t backdrop-blur-[40px] saturate-[180%] bg-white/20 dark:bg-[rgba(30,30,30,0.25)] border-white/30 dark:border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.2)]">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          &copy; {new Date().getFullYear()} WellWave - Documentação médica inteligente
        </p>
      </footer>
    </div>
  )
}
