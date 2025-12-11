import { Activity, LogOut, User, Settings, History, MessageSquare, FileText } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getUser } from '@/lib/supabase/server'
import { logout } from '@/lib/auth/actions'
import { Button } from '@/components/ui/button'

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
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur-xl">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">WellWave</span>
        </Link>

        <nav className="flex items-center gap-1">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <FileText className="mr-2 h-4 w-4" />
              Nova Anamnese
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/history">
              <History className="mr-2 h-4 w-4" />
              Historico
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/chat">
              <MessageSquare className="mr-2 h-4 w-4" />
              EBM Chat
            </Link>
          </Button>
        </nav>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Ola, <span className="font-medium text-foreground">{userName}</span>
          </span>
          <Button variant="ghost" size="icon-sm" asChild>
            <Link href="/profile">
              <User className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon-sm" asChild>
            <Link href="/settings">
              <Settings className="h-4 w-4" />
            </Link>
          </Button>
          <form action={logout}>
            <Button variant="ghost" size="icon-sm" type="submit">
              <LogOut className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>

      {/* Footer */}
      <footer className="flex h-12 items-center justify-center border-t text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} WellWave - Documentacao medica inteligente</p>
      </footer>
    </div>
  )
}
