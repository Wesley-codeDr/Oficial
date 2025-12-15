import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/fade-in"
import { GlassCard } from "@/components/ui/glass-card"
import { ScaleIn } from "@/components/ui/scale-in"
import { Container } from "@/components/ui/container"
import {
  ActivitySquare,
  ArrowRight,
  Cpu,
  LineChart,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Timer,
} from "lucide-react"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#f7fbff_0,#eef2ff_32%,#e6edf7_55%,#0b1024_120%)] dark:bg-[radial-gradient(circle_at_20%_20%,#0f172a_0,#0b1224_55%,#030712_120%)] text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 -top-[10%] h-[320px] bg-gradient-to-r from-primary/30 via-primary/10 to-blue-400/20 blur-[120px] opacity-80" />
        <div className="absolute -left-[8%] -bottom-[10%] h-80 w-80 rounded-full bg-emerald-300/40 blur-[100px] opacity-70" />
        <div className="absolute -right-[6%] top-10 h-72 w-72 rounded-full bg-indigo-400/35 blur-[100px] opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.16),transparent_28%),radial-gradient(circle_at_60%_80%,rgba(255,255,255,0.1),transparent_35%)]" />
      </div>

      <Container className="relative max-w-6xl w-full py-16 md:py-24 space-y-16" animate={true} stagger={true}>
        <FadeIn direction="up" delay={0.05}>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/60 px-4 py-2 text-xs font-medium text-slate-700 shadow-apple dark:border-white/10 dark:bg-white/5 dark:text-white glass-sheen">
                <Sparkles className="h-4 w-4 text-primary" />
                Interface Liquid Glass 2025
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(16,185,129,0.35)]" />
                Imersão Apple
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-6xl dark:text-white">
                  WellWave, com o brilho <span className="text-gradient">Liquid Glass</span>.
                </h1>
                <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
                  Anamnese digital construída com a elegância Apple: superfícies translúcidas, profundidade
                  calibrada e animações suaves que guiam cada decisão clínica.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button size="lg">
                  Iniciar anamnese
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="glass" size="lg" className="border border-white/50 px-6">
                  Ver experiência
                </Button>
                <Button variant="ghost" size="lg" className="text-primary">
                  Tour guiado
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/40 bg-white/70 p-4 text-left shadow-apple glass-sheen dark:border-white/10 dark:bg-white/5">
                  <div className="text-xs uppercase text-muted-foreground">Precisão semântica</div>
                  <div className="text-2xl font-semibold text-slate-900 dark:text-white">98%</div>
                  <p className="text-sm text-muted-foreground">Protocolos alinhados ao fluxo clínico.</p>
                </div>
                <div className="rounded-2xl border border-white/40 bg-white/70 p-4 text-left shadow-apple glass-sheen dark:border-white/10 dark:bg-white/5">
                  <div className="text-xs uppercase text-muted-foreground">Tempo de triagem</div>
                  <div className="text-2xl font-semibold text-slate-900 dark:text-white">12s</div>
                  <p className="text-sm text-muted-foreground">Checklist dinâmico com IA contextual.</p>
                </div>
                <div className="rounded-2xl border border-white/40 bg-white/70 p-4 text-left shadow-apple glass-sheen dark:border-white/10 dark:bg-white/5">
                  <div className="text-xs uppercase text-muted-foreground">Experiência Apple</div>
                  <div className="text-2xl font-semibold text-slate-900 dark:text-white">Liquid Glass</div>
                  <p className="text-sm text-muted-foreground">Profundidade, luz e microinterações.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/40 via-primary/10 to-white/5 blur-3xl opacity-80 dark:from-white/5 dark:via-primary/10 dark:to-white/0" />
              <GlassCard className="relative overflow-hidden border border-white/60 bg-white/70 p-6 shadow-apple-xl glass-sheen dark:border-white/10 dark:bg-white/5 md:p-8" hover={false}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Painel vivo</p>
                    <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                      Anamnese em andamento
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      IA ajusta perguntas conforme sinais vitais oscilam.
                    </p>
                  </div>
                  <Button size="sm" variant="glass" className="border border-white/40 px-3">
                    Ao vivo
                  </Button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/40 bg-white/80 p-4 glass-sheen shadow-apple dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 text-emerald-500" />
                      Risco calculado
                    </div>
                    <div className="mt-2 flex items-baseline justify-between">
                      <span className="text-3xl font-semibold text-slate-900 dark:text-white">Baixo</span>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 shadow-sm dark:bg-emerald-400/20 dark:text-emerald-200">
                        Safe lane
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">Protocolo Manchester + sinais contínuos.</p>
                  </div>

                  <div className="rounded-2xl border border-white/40 bg-white/80 p-4 glass-sheen shadow-apple dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <Timer className="h-4 w-4 text-primary" />
                      Linha do tempo
                    </div>
                    <div className="mt-2 space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span>Admissão</span>
                        <span className="font-semibold text-slate-900 dark:text-white">00:12s</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Coleta inteligente</span>
                        <span className="font-semibold text-slate-900 dark:text-white">01:24s</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Síntese narrativa</span>
                        <span className="font-semibold text-slate-900 dark:text-white">02:10s</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/50 bg-gradient-to-r from-primary/15 via-white/70 to-white/30 p-4 text-sm shadow-apple glass-sheen dark:border-white/10 dark:from-primary/15 dark:via-white/5 dark:to-white/10">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-white">Resumo instantâneo</p>
                      <p className="text-muted-foreground">
                        Narrativa estruturada, termos médicos polidos e comandos de follow-up já sugeridos.
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </FadeIn>

        <ScaleIn delay={0.1}>
          <div className="grid gap-6 md:grid-cols-2">
            <GlassCard className="glass-sheen border border-white/50 bg-white/70 p-6 shadow-apple-xl dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <Cpu className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">IA contextual</h3>
                  <p className="text-sm text-muted-foreground">Respeita jornada Apple: foco, clareza e silêncio visual.</p>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/40 bg-white/70 p-3 text-sm glass-sheen dark:border-white/10 dark:bg-white/5">
                  <p className="text-muted-foreground">Sugestões discretas</p>
                  <p className="font-medium text-slate-900 dark:text-white">Sem distrações na coleta crítica.</p>
                </div>
                <div className="rounded-xl border border-white/40 bg-white/70 p-3 text-sm glass-sheen dark:border-white/10 dark:bg-white/5">
                  <p className="text-muted-foreground">Modo escuro nativo</p>
                  <p className="font-medium text-slate-900 dark:text-white">Contraste calibrado e luz suave.</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="glass-sheen border border-white/50 bg-white/70 p-6 shadow-apple-xl dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <LineChart className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Painéis vivos</h3>
                  <p className="text-sm text-muted-foreground">Cards líquidos com métricas, tempos e alertas.</p>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-gradient-to-b from-primary/20 to-primary/5 p-3 text-center text-sm font-semibold text-primary shadow-apple dark:from-primary/25 dark:to-primary/5">
                  Sinais
                  <div className="text-xs text-primary/80">AO VIVO</div>
                </div>
                <div className="rounded-xl bg-white/70 p-3 text-center text-sm font-semibold text-slate-900 shadow-apple glass-sheen dark:bg-white/5 dark:text-white">
                  Alertas
                  <div className="text-xs text-muted-foreground">Sem ruído</div>
                </div>
                <div className="rounded-xl bg-white/70 p-3 text-center text-sm font-semibold text-slate-900 shadow-apple glass-sheen dark:bg-white/5 dark:text-white">
                  Exportar
                  <div className="text-xs text-muted-foreground">PDF + EHR</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </ScaleIn>

        <FadeIn direction="up" delay={0.15}>
          <GlassCard className="glass-sheen border border-white/50 bg-white/70 p-8 shadow-apple-xl dark:border-white/10 dark:bg-white/5" hover={false}>
            <div className="grid gap-6 lg:grid-cols-[1fr,0.8fr]">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                  <ActivitySquare className="h-4 w-4 text-primary" />
                  Fluxo Apple-first
                </div>
                <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
                  Do acolhimento à síntese com continuidade líquida.
                </h2>
                <p className="text-lg text-muted-foreground">
                  A interface mantém ritmo constante, com superfícies translúcidas e foco absoluto no paciente.
                  Gestos, teclas e micro animações seguem o padrão Apple para 2025.
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/40 bg-white/80 p-3 text-sm font-medium glass-sheen shadow-apple dark:border-white/10 dark:bg-white/5">
                    <Stethoscope className="mb-2 h-5 w-5 text-primary" />
                    Captura clínica
                  </div>
                  <div className="rounded-xl border border-white/40 bg-white/80 p-3 text-sm font-medium glass-sheen shadow-apple dark:border-white/10 dark:bg-white/5">
                    <ShieldCheck className="mb-2 h-5 w-5 text-emerald-500" />
                    Segurança
                  </div>
                  <div className="rounded-xl border border-white/40 bg-white/80 p-3 text-sm font-medium glass-sheen shadow-apple dark:border-white/10 dark:bg-white/5">
                    <LineChart className="mb-2 h-5 w-5 text-primary" />
                    Insights
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/40 bg-white/90 p-4 text-center shadow-apple glass-sheen dark:border-white/10 dark:bg-white/5">
                  <div className="text-xs uppercase text-muted-foreground">Etapa 1</div>
                  <div className="text-lg font-semibold text-slate-900 dark:text-white">Acolhimento</div>
                  <p className="text-sm text-muted-foreground">Layout sereno para decisões rápidas.</p>
                </div>
                <div className="rounded-2xl border border-white/40 bg-white/90 p-4 text-center shadow-apple glass-sheen dark:border-white/10 dark:bg-white/5">
                  <div className="text-xs uppercase text-muted-foreground">Etapa 2</div>
                  <div className="text-lg font-semibold text-slate-900 dark:text-white">Coleta guiada</div>
                  <p className="text-sm text-muted-foreground">Perguntas se adaptam ao quadro.</p>
                </div>
                <div className="rounded-2xl border border-white/40 bg-white/90 p-4 text-center shadow-apple glass-sheen dark:border-white/10 dark:bg-white/5">
                  <div className="text-xs uppercase text-muted-foreground">Etapa 3</div>
                  <div className="text-lg font-semibold text-slate-900 dark:text-white">Síntese</div>
                  <p className="text-sm text-muted-foreground">Narrativa pronta para assinatura.</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <GlassCard className="relative overflow-hidden border border-white/60 bg-gradient-to-r from-primary/20 via-white/70 to-white/30 p-8 text-center shadow-apple-xl glass-sheen dark:border-white/10 dark:from-primary/20 dark:via-white/5 dark:to-white/10" hover={false}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.35),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.2),transparent_35%)]" />
            <div className="relative space-y-4">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Apple Liquid Glass</p>
              <h3 className="text-3xl font-semibold text-slate-900 dark:text-white">
                O futuro da anamnese com textura, luz e calma.
              </h3>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Experiência contínua, pronta para hardware Apple 2025, com transparências calibradas,
                animações suaves e foco absoluto na decisão clínica.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg">Começar agora</Button>
                <Button variant="glass" size="lg" className="border border-white/50">
                  Explorar layout
                </Button>
              </div>
            </div>
          </GlassCard>
        </FadeIn>
      </Container>
    </main>
  )
}
