import { Activity } from 'lucide-react'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Gradient Background with Animated Blobs */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient mesh - enhanced for Apple Glass aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

        {/* Secondary gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent dark:from-slate-950/50" />

        {/* Animated gradient blobs - enhanced size and opacity */}
        <div
          className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#007AFF]/25 blur-[100px] animate-blob dark:bg-[#007AFF]/15"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute -right-32 top-1/4 h-[600px] w-[600px] rounded-full bg-[#5856D6]/25 blur-[120px] animate-blob dark:bg-[#5856D6]/15"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute -bottom-32 left-1/4 h-[500px] w-[500px] rounded-full bg-[#5AC8FA]/25 blur-[100px] animate-blob dark:bg-[#5AC8FA]/15"
          style={{ animationDelay: '4s' }}
        />
        {/* Additional accent blob for richness */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-[#34C759]/15 blur-[80px] animate-blob dark:bg-[#34C759]/10"
          style={{ animationDelay: '3s' }}
        />
      </div>

      {/* Header - Minimal with subtle glass effect */}
      <header className="relative z-10 flex h-16 items-center justify-between px-6 backdrop-blur-sm bg-white/5 dark:bg-slate-900/5">
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-all duration-300 hover:opacity-80 hover:scale-[1.02]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#007AFF] to-[#5856D6] shadow-lg">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-[#007AFF] to-[#5856D6] bg-clip-text text-transparent">
            WellWave
          </span>
        </Link>
      </header>

      {/* Main Content - Full height centered */}
      <main className="relative z-10 flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md lg:max-w-4xl animate-fade-in-up">
          <div className="glass rounded-3xl p-6 lg:p-10 shadow-2xl backdrop-blur-2xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/70">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
