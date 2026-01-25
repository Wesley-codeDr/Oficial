import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

// Apple Liquid Glass 2026 - SF Pro Display font stack
// Falls back to system fonts for native Apple experience
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import './liquid-glass-2026.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),

  title: {
    default: 'WellWave - Sistema de Anamnese Médica Inteligente',
    template: '%s | WellWave',
  },

  description:
    'Sistema médico para geração automática de anamneses em pronto-socorro. Compliance CFM e LGPD garantidos. Reduza o tempo de documentação de 5 minutos para 90 segundos.',

  keywords: [
    'anamnese digital',
    'prontuário eletrônico',
    'sistema médico',
    'emergência',
    'pronto-socorro',
    'medicina de emergência',
    'IA médica',
    'CFM compliance',
    'LGPD',
    'documentação clínica',
    'red flags médicos',
    'protocolos clínicos',
  ],

  authors: [{ name: 'WellWave Team' }],
  creator: 'WellWave',
  publisher: 'WellWave',

  // OpenGraph metadata
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'WellWave',
    title: 'WellWave - Sistema de Anamnese Médica Inteligente',
    description: 'Sistema médico para geração automática de anamneses em pronto-socorro. Compliance CFM e LGPD garantidos.',
  },

  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'WellWave - Sistema de Anamnese Médica Inteligente',
    description: 'Sistema médico para geração automática de anamneses em pronto-socorro',
    images: ['/twitter-image.png'], // TODO: Criar imagem 1200x600px
    creator: '@wellwave',
  },

  // Robots configuration
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  // Manifest for PWA
  manifest: '/manifest.json',

  // Verification (add when available)
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  // },

  // Canonical URL
  alternates: {
    canonical: '/',
  },

  // App-specific metadata
  applicationName: 'WellWave',
  category: 'Medical',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sf-pro-display antialiased min-h-screen bg-[#FFFFFF] text-[#1D1D1F] dark:bg-[#000000] dark:text-[#F5F5F7] selection:bg-[#007AFF]/30`}
        suppressHydrationWarning
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Apple Liquid Glass 2026 Background - iOS 26 Specification */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none liquid-glass-bg">
          {/* Primary Blob - Apple Blue (#007AFF) - Refined for 2026 V3.0 Visionary */}
          <div className="absolute top-[-20%] left-[-15%] w-[80%] h-[80%] rounded-full bg-[#007AFF]/30 dark:bg-[#0A84FF]/25 blur-[120px] animate-blob-1 liquid-blob liquid-blob-1" />
          {/* Secondary Blob - Apple Green (#34C759) - Heart of Health */}
          <div className="absolute bottom-[-20%] right-[-15%] w-[70%] h-[70%] rounded-full bg-[#34C759]/25 dark:bg-[#30D158]/20 blur-[120px] animate-blob-2 liquid-blob liquid-blob-2" />
          {/* Tertiary Blob - Apple Purple (#BF5AF2) - Pure Intelligence */}
          <div className="absolute top-[10%] right-[-5%] w-[60%] h-[60%] rounded-full bg-[#BF5AF2]/20 dark:bg-[#BF5AF2]/18 blur-[120px] animate-blob-3 liquid-blob liquid-blob-3" />
          
          {/* Noise Texture - Apple 2026 V3.0 "Physical" Grain */}
          <div 
            className="absolute inset-0 opacity-[0.012] dark:opacity-[0.018] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
