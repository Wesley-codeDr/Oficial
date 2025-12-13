import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Sans_Arabic, Noto_Sans_Hebrew } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

/**
 * Apple HIG RTL Support
 * @see https://developer.apple.com/design/human-interface-guidelines/right-to-left
 * 
 * Font loading includes RTL-friendly fonts for Arabic and Hebrew.
 * "Visually balance adjacent Latin and RTL scripts when necessary"
 */

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Arabic font - Noto Sans Arabic for proper Arabic rendering
const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

// Hebrew font - Noto Sans Hebrew for proper Hebrew rendering
const notoHebrew = Noto_Sans_Hebrew({
  subsets: ['hebrew'],
  variable: '--font-hebrew',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'WellWave - Anamnese Digital para Emergencias',
    template: '%s | WellWave',
  },
  description:
    'Plataforma de anamnese digital com IA para pronto-socorro. Gere documentacao medica completa em segundos.',
  keywords: [
    'anamnese digital',
    'prontuario eletronico',
    'emergencia',
    'pronto-socorro',
    'medicina',
    'IA medica',
  ],
  authors: [{ name: 'WellWave Team' }],
  creator: 'WellWave',
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Apple HIG: Allow zooming for accessibility
  viewportFit: 'cover', // Apple HIG: Enable safe area insets for notch/Dynamic Island
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

/**
 * Root Layout with RTL Support
 * 
 * Apple HIG Right-to-Left Guidelines:
 * - The `dir` attribute is managed by DirectionProvider
 * - Fonts for Arabic and Hebrew are preloaded
 * - CSS logical properties adapt automatically
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // DirectionProvider owns runtime dir/lang updates; keep static attrs minimal to avoid divergence during hydration.
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`
          ${inter.variable} 
          ${notoArabic.variable} 
          ${notoHebrew.variable} 
          font-sans antialiased min-h-screen bg-background text-foreground
        `}
      >
        <Providers defaultLanguage="pt-BR">
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}

