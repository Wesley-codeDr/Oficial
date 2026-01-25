"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { GlassInput } from "@/components/ui/glass-input"
import { GlassButton } from "@/components/ui/glass-button"
import { GlassBadge } from "@/components/ui/glass-badge"
import { useState } from "react"

export default function TestLiquidGlass2026Page() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'dark' : ''}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Theme Toggle Button */}
        <div className="fixed top-4 right-4 z-50">
          <GlassButton variant="primary" onClick={toggleTheme}>
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </GlassButton>
        </div>

        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
          Apple Liquid Glass 2026 - Teste de Componentes
        </h1>
        
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
          Testando todos os novos componentes com o sistema Apple Liquid Glass 2026.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-8">
          Clique no botão acima para alternar entre modo claro e escuro.
        </p>

        {/* GlassCard Test Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
            GlassCard
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Default Variant */}
            <GlassCard variant="default">
              <h3 className="text-lg font-semibold mb-3">Default</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                Card padrão com blur(50px) e saturate(200%).
              </p>
              <div className="space-y-3">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong>Texto de exemplo:</strong>
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  Conteúdo dentro do card com efeitos de vidro.
                </p>
              </div>
            </GlassCard>

            {/* Clear Variant */}
            <GlassCard variant="clear">
              <h3 className="text-lg font-semibold mb-3">Clear</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                Card transparente para fundos ricos.
              </p>
              <div className="space-y-3">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong>Texto de exemplo:</strong>
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  Conteúdo com fundo visível através do vidro.
                </p>
              </div>
            </GlassCard>

            {/* Elevated Variant */}
            <GlassCard variant="elevated">
              <h3 className="text-lg font-semibold mb-3">Elevated</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                Card elevado para modais e painéis flutuantes.
              </p>
              <div className="space-y-3">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong>Texto de exemplo:</strong>
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  Card com mais opacidade e sombra aprimorada.
                </p>
              </div>
            </GlassCard>

            {/* Medical Variant */}
            <GlassCard variant="medical" glow="blue">
              <h3 className="text-lg font-semibold mb-3">Medical</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                Card com tema médico e brilho azul.
              </p>
              <div className="space-y-3">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong>Texto de exemplo:</strong>
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  Card para componentes médicos com efeito de brilho.
                </p>
              </div>
            </GlassCard>

            {/* Subtle Variant */}
            <GlassCard variant="subtle">
              <h3 className="text-lg font-semibold mb-3">Subtle</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                Card mais transparente e leve.
              </p>
              <div className="space-y-3">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong>Texto de exemplo:</strong>
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  Card para elementos secundários com transparência aprimorada.
                </p>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* GlassInput Test Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
            GlassInput
          </h2>
          
          <div className="space-y-4">
            {/* Default Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Default Input
              </label>
              <GlassInput 
                variant="default"
                size="md"
                placeholder="Digite algo..."
              />
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Input padrão com blur(50px) e saturate(200%).
              </p>
            </div>

            {/* Clear Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Clear Input
              </label>
              <GlassInput 
                variant="clear"
                size="md"
                placeholder="Digite algo..."
              />
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Input transparente para fundos ricos.
              </p>
            </div>

            {/* Elevated Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Elevated Input
              </label>
              <GlassInput 
                variant="elevated"
                size="md"
                placeholder="Digite algo..."
              />
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Input elevado para elementos proeminentes.
              </p>
            </div>

            {/* Medical Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Medical Input
              </label>
              <GlassInput 
                variant="medical"
                size="md"
                placeholder="Digite algo..."
              />
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Input médico com tema azul e efeito de brilho.
              </p>
            </div>

            {/* Input with Error State */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Input com Erro
              </label>
              <GlassInput 
                variant="default"
                size="md"
                error={true}
                errorMessage="Este campo é obrigatório"
                placeholder="Digite algo..."
              />
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Input com estado de erro validado.
              </p>
            </div>
          </div>
        </section>

        {/* GlassButton Test Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
            GlassButton
          </h2>
          
          <div className="space-y-4">
            {/* Default Button */}
            <div className="space-y-3">
              <GlassButton variant="default">
                Default
              </GlassButton>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Botão padrão com blur(50px) e saturate(200%).
              </p>
            </div>

            {/* Primary Button */}
            <div className="space-y-3">
              <GlassButton variant="primary">
                Primary
              </GlassButton>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Botão primário com tema azul.
              </p>
            </div>

            {/* Secondary Button */}
            <div className="space-y-3">
              <GlassButton variant="secondary">
                Secondary
              </GlassButton>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Botão secundário mais transparente.
              </p>
            </div>

            {/* Medical Button */}
            <div className="space-y-3">
              <GlassButton variant="medical">
                Medical
              </GlassButton>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Botão médico com tema azul.
              </p>
            </div>

            {/* Danger Button */}
            <div className="space-y-3">
              <GlassButton variant="danger">
                Danger
              </GlassButton>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Botão destrutivo com tema vermelho.
              </p>
            </div>

            {/* Button Sizes */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Tamanhos de Botão:
              </p>
              <div className="flex gap-3 flex-wrap">
                <GlassButton variant="default" size="sm">
                  Small
                </GlassButton>
                <GlassButton variant="default" size="md">
                  Medium
                </GlassButton>
                <GlassButton variant="default" size="lg">
                  Large
                </GlassButton>
              </div>
            </div>

            {/* Button with Loading State */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Botão com Estado de Loading:
              </p>
              <div className="flex gap-3">
                <GlassButton variant="primary" loading={true}>
                  Loading...
                </GlassButton>
                <GlassButton variant="primary" loading={false}>
                  Ready
                </GlassButton>
              </div>
            </div>
          </div>
        </section>

        {/* GlassBadge Test Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
            GlassBadge
          </h2>
          
          <div className="space-y-4">
            {/* Default Badge */}
            <div className="space-y-3">
              <GlassBadge variant="default">
                Default
              </GlassBadge>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Badge padrão com blur(50px) e saturate(200%).
              </p>
            </div>

            {/* Primary Badge */}
            <div className="space-y-3">
              <GlassBadge variant="primary">
                Primary
              </GlassBadge>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Badge primária com tema azul.
              </p>
            </div>

            {/* Secondary Badge */}
            <div className="space-y-3">
              <GlassBadge variant="secondary">
                Secondary
              </GlassBadge>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Badge secundária mais transparente.
              </p>
            </div>

            {/* Medical Badge */}
            <div className="space-y-3">
              <GlassBadge variant="medical">
                Medical
              </GlassBadge>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Badge médica com tema azul.
              </p>
            </div>

            {/* Success Badge */}
            <div className="space-y-3">
              <GlassBadge variant="success">
                Success
              </GlassBadge>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Badge de sucesso com tema verde.
              </p>
            </div>

            {/* Warning Badge */}
            <div className="space-y-3">
              <GlassBadge variant="warning">
                Warning
              </GlassBadge>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Badge de aviso com tema laranja.
              </p>
            </div>

            {/* Danger Badge */}
            <div className="space-y-3">
              <GlassBadge variant="danger">
                Danger
              </GlassBadge>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Badge de perigo com tema vermelho.
              </p>
            </div>

            {/* Badge Sizes */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Tamanhos de Badge:
              </p>
              <div className="flex gap-3 flex-wrap items-center">
                <GlassBadge variant="default" size="sm">
                  Small
                </GlassBadge>
                <GlassBadge variant="default" size="md">
                  Medium
                </GlassBadge>
                <GlassBadge variant="default" size="lg">
                  Large
                </GlassBadge>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Effects Test Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Efeitos Visuais
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inner Glow */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold mb-3">Inner Glow</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Brilho interno suave nos componentes.
              </p>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <p className="text-slate-900 dark:text-slate-100">
                  Todos os componentes possuem efeito de brilho interno ativado por padrão.
                </p>
              </div>
            </div>

            {/* Specular Highlight */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold mb-3">Specular Highlight</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Reflexão de luz no topo simulando vidro.
              </p>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <p className="text-slate-900 dark:text-slate-100">
                  Os componentes GlassCard, GlassInput, GlassButton e GlassBadge possuem efeito de reflexão especular ativado.
                </p>
              </div>
            </div>

            {/* Rim Light */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold mb-3">Rim Light</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Gradiente cônica ao redor para bordas iluminadas.
              </p>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <p className="text-slate-900 dark:text-slate-100">
                  Efeito de rim light implementado em todos os componentes.
                </p>
              </div>
            </div>

            {/* Noise Texture */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold mb-3">Textura de Ruído</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Textura orgânica para autenticidade.
              </p>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <p className="text-slate-900 dark:text-slate-100">
                  Todos os componentes possuem textura de ruído SVG com opacidade de 2.5% (2% em modo escuro).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Animation Test Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Animações
          </h2>
          
          <div className="space-y-4">
            <p className="text-base text-slate-700 dark:text-slate-300 mb-3">
              <strong>Entrada com Fade-in:</strong> Todos os componentes aparecem com animação suave de entrada (opacity 0 → 1, scale 0.98 → 1).
            </p>
            <p className="text-base text-slate-700 dark:text-slate-300 mb-3">
              <strong>Hover:</strong> Efeito de hover com escala 1.02 e easing [0.25, 1, 0.5, 1].
            </p>
            <p className="text-base text-slate-700 dark:text-slate-300 mb-3">
              <strong>Tap (botões):</strong> Feedback háptico visual com escala 0.95.
            </p>
            <p className="text-base text-slate-700 dark:text-slate-300 mb-3">
              <strong>Transições:</strong> Todas as animações usam duração de 200ms com easing cúbico [0.25, 1, 0.5, 1].
            </p>
          </div>
        </section>

        {/* Performance Notes */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Performance
          </h2>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">
              Otimizações Implementadas
            </h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300 text-sm">
              <li>✓ <strong>GPU Acceleration:</strong> transform: translateZ(0), backface-visibility: hidden</li>
              <li>✓ <strong>CSS Containment:</strong> contain: layout style paint</li>
              <li>✓ <strong>Reduced Motion:</strong> prefers-reduced-motion para leitores de movimento</li>
              <li>✓ <strong>Will-change:</strong> contain: strict para animações de GPU</li>
              <li>✓ <strong>Backdrop Filter Otimizado:</strong> blur(50px) saturate(200%) em vez de blur(40px) saturate(180%)</li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Próximos Passos
          </h2>
          
          <div className="space-y-3">
            <p className="text-base text-slate-700 dark:text-slate-300 mb-3">
              <strong>1. Testar Componentes:</strong> Verificar o comportamento dos componentes em diferentes contextos (light/dark mode, diferentes fundos).
            </p>
            <p className="text-base text-slate-700 dark:text-slate-300 mb-3">
              <strong>2. Aplicar em Páginas Existentes:</strong> Substituir componentes antigos pelos novos componentes Liquid Glass 2026.
            </p>
            <p className="text-base text-slate-700 dark:text-slate-300 mb-3">
              <strong>3. Ajustar Opacidade:</strong> Ajustar os valores de opacidade das variantes conforme necessário para cada contexto.
            </p>
            <p className="text-base text-slate-700 dark:text-slate-300 mb-3">
              <strong>4. Otimizar Sombras:</strong> Ajustar as sombras conforme a hierarquia visual.
            </p>
            <p className="text-base text-slate-700 dark:text-slate-300 mb-3">
              <strong>5. Refinar Animações:</strong> Ajustar durações e easing conforme feedback de UX.
            </p>
            <p className="text-base text-slate-700 dark:text-slate-300 mb-3">
              <strong>6. Documentar Uso:</strong> Criar guias de uso dos novos componentes para a equipe.
            </p>
            <p className="text-base text-slate-700 dark:text-slate-300 mb-3">
              <strong>7. Validar Acessibilidade:</strong> Testar com leitores de tela e verificar contraste de cores.
            </p>
            <p className="text-base text-slate-700 dark:text-slate-300 mb-3">
              <strong>8. Otimizar Performance:</strong> Monitorar FPS e usar React DevTools para identificar gargalos.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
