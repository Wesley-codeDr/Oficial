import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

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
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
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
        className={`${inter.variable} font-sans antialiased min-h-screen`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
