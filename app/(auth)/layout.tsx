import { Activity } from 'lucide-react'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Animated Mesh Gradient Background - iOS 26 Style */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Base gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

        {/* Secondary gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent dark:from-slate-950/50" />

        {/* Animated gradient blobs - Enhanced for iOS 26 */}
        {/* Blue blob - Primary brand color */}
        <div
          className="absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full bg-[#007AFF]/25 blur-[120px] animate-blob dark:bg-[#007AFF]/12"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute left-1/4 top-20 h-[400px] w-[400px] rounded-full bg-[#007AFF]/15 blur-[100px] animate-blob dark:bg-[#007AFF]/8"
          style={{ animationDelay: '1.5s' }}
        />

        {/* Purple blob - Accent */}
        <div
          className="absolute -right-32 top-1/4 h-[700px] w-[700px] rounded-full bg-[#5856D6]/20 blur-[140px] animate-blob dark:bg-[#5856D6]/10"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 h-[350px] w-[350px] rounded-full bg-[#5856D6]/12 blur-[90px] animate-blob dark:bg-[#5856D6]/6"
          style={{ animationDelay: '3.5s' }}
        />

        {/* Light blue/cyan blob */}
        <div
          className="absolute -bottom-32 left-1/4 h-[600px] w-[600px] rounded-full bg-[#5AC8FA]/20 blur-[120px] animate-blob dark:bg-[#5AC8FA]/10"
          style={{ animationDelay: '4s' }}
        />
        <div
          className="absolute right-20 top-1/2 h-[300px] w-[300px] rounded-full bg-[#5AC8FA]/12 blur-[80px] animate-blob dark:bg-[#5AC8FA]/6"
          style={{ animationDelay: '0.5s' }}
        />

        {/* Green blob - Accent */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#34C759]/15 blur-[100px] animate-blob dark:bg-[#34C759]/8"
          style={{ animationDelay: '3s' }}
        />

        {/* Additional warm accent (orange/pink) */}
        <div
          className="absolute left-1/3 bottom-1/3 h-[350px] w-[350px] rounded-full bg-[#FF9500]/12 blur-[90px] animate-blob dark:bg-[#FF9500]/6"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute right-1/3 top-1/3 h-[280px] w-[280px] rounded-full bg-[#FF2D55]/10 blur-[80px] animate-blob dark:bg-[#FF2D55]/5"
          style={{ animationDelay: '2.5s' }}
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
      <header className="relative z-10 flex h-16 items-center justify-between px-6 backdrop-blur-sm bg-white/30 dark:bg-slate-900/30">
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
          {/* Glass Card Container */}
          <div className="liquid-glass-material rim-light-ios26 inner-glow-ios26 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/50 dark:border-white/10 rounded-[32px] p-6 lg:p-10 shadow-2xl relative overflow-hidden">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
