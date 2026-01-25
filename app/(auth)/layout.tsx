import { Activity } from 'lucide-react'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-white dark:bg-slate-950">
      {/* Healthcare Liquid Glass Background - iOS 26 Style */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Base gradient mesh - Apple system palette */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

        {/* Secondary gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent dark:from-slate-950/50" />

        {/* Animated gradient blobs - Apple System Colors */}
        {/* Primary Blue blob */}
        <div
          className="absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full bg-[#007AFF]/25 blur-[120px] animate-blob dark:bg-[#007AFF]/12"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute left-1/4 top-20 h-[400px] w-[400px] rounded-full bg-[#007AFF]/15 blur-[100px] animate-blob dark:bg-[#007AFF]/8"
          style={{ animationDelay: '1.5s' }}
        />

        {/* Teal blob */}
        <div
          className="absolute -right-32 top-1/4 h-[700px] w-[700px] rounded-full bg-[#5AC8FA]/20 blur-[140px] animate-blob dark:bg-[#5AC8FA]/10"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 h-[350px] w-[350px] rounded-full bg-[#5AC8FA]/12 blur-[90px] animate-blob dark:bg-[#5AC8FA]/6"
          style={{ animationDelay: '3.5s' }}
        />

        {/* Success Green blob */}
        <div
          className="absolute -bottom-32 left-1/4 h-[600px] w-[600px] rounded-full bg-[#34C759]/20 blur-[120px] animate-blob dark:bg-[#34C759]/10"
          style={{ animationDelay: '4s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#34C759]/15 blur-[100px] animate-blob dark:bg-[#34C759]/8"
          style={{ animationDelay: '3s' }}
        />

        {/* Noise grain overlay for texture */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Header - Minimal with subtle glass effect */}
      <header className="relative z-10 flex h-16 items-center justify-between px-6 liquid-glass-regular rim-light-ios26 inner-glow-ios26 border-b border-white/50 dark:border-white/12">
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-all duration-300 hover:opacity-80 hover:scale-[1.02]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-[14px] bg-[#007AFF] shadow-md">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-slate-800 dark:text-white">
            WellWave
          </span>
        </Link>
      </header>

      {/* Main Content - Full height centered */}
      <main className="relative z-10 flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md lg:max-w-4xl animate-fade-in-up">
          {/* Glass Card Container */}
          <div className="liquid-glass-regular rim-light-ios26 inner-glow-ios26 border border-white/50 dark:border-white/12 rounded-[32px] p-6 lg:p-10 shadow-glass-elevated relative overflow-hidden">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
