import { Activity } from 'lucide-react'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">WellWave</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="glass rounded-2xl p-8">{children}</div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex h-14 items-center justify-center border-t text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} WellWave. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
