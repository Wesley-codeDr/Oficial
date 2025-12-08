import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/fade-in"
import { GlassCard } from "@/components/ui/glass-card"
import { ScaleIn } from "@/components/ui/scale-in"
import { Container } from "@/components/ui/container"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24 bg-gradient-to-br from-background via-background to-primary/5">
      <Container className="max-w-5xl w-full" animate={true} stagger={true}>
        <FadeIn direction="up" delay={0.1}>
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">
              Wavewell Oficial
            </h1>
            <p className="text-lg text-muted-foreground">
              Projeto configurado com Next.js, TypeScript, Tailwind CSS, Shadcn UI e Framer Motion
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Estilo Apple 2025
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <FadeIn direction="right" delay={0.2}>
            <GlassCard>
              <h2 className="text-2xl font-semibold mb-2">Glass Morphism</h2>
              <p className="text-muted-foreground">
                Cards com efeito de vidro fosco, estilo Apple moderno
              </p>
            </GlassCard>
          </FadeIn>

          <FadeIn direction="left" delay={0.3}>
            <GlassCard>
              <h2 className="text-2xl font-semibold mb-2">Animações Suaves</h2>
              <p className="text-muted-foreground">
                Transições fluidas com Framer Motion
              </p>
            </GlassCard>
          </FadeIn>
        </div>

        <FadeIn direction="up" delay={0.4}>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="default">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="glass">Glass</Button>
          </div>
        </FadeIn>

        <ScaleIn delay={0.5} className="mt-12">
          <GlassCard hover={false} className="text-center">
            <h3 className="text-xl font-semibold mb-2">Componentes Prontos</h3>
            <p className="text-muted-foreground mb-4">
              Todos os componentes estão configurados e prontos para uso
            </p>
            <div className="flex flex-wrap gap-2 justify-center text-sm">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                Next.js 16
              </span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                React 19
              </span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                Tailwind CSS 4
              </span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                Framer Motion
              </span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                Radix UI
              </span>
            </div>
          </GlassCard>
        </ScaleIn>
      </Container>
    </main>
  )
}

