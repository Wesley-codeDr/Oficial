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
    <div className="flex min-h-screen flex-col bg-[#FFFFFF] dark:bg-[#000000] relative overflow-hidden" style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Apple Liquid Glass 2026 Background */}
      <div className="liquid-glass-bg fixed inset-0 -z-10" aria-hidden="true">
        <div className="liquid-blob liquid-blob-1" />
        <div className="liquid-blob liquid-blob-2" />
        <div className="liquid-blob liquid-blob-3" />
      </div>

      <DashboardHeader userName={userName} />

      <main className="flex-1 p-4 lg:p-6 relative z-10">
        <DashboardContent>{children}</DashboardContent>
      </main>

      <footer className="relative z-10 flex h-12 items-center justify-center border-t liquid-glass-regular rim-light-ios26 liquid-glass-specular border-white/30 dark:border-white/12">
        <p className="text-xs text-[#86868B] dark:text-[#A1A1AA] font-sf-pro-text" style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
          &copy; {new Date().getFullYear()} WellWave - Documentação médica inteligente
        </p>
      </footer>
    </div>
  )
}
