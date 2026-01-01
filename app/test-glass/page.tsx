"use client";

import { GlassRadioGroup } from "@/components/ui/glass-radio-group";
import { GlassActionButton, GlassActionButtonGroup } from "@/components/ui/glass-action-button";
import {
  Copy,
  Type,
  Plus,
  RefreshCcw,
  Activity,
  Heart,
  Trash2,
  Download,
  Upload,
  Settings,
  Check,
} from "lucide-react";
import * as React from "react";

export default function TestGlassPage() {
  const [radioValue, setRadioValue] = React.useState("silver");
  const [isLoading, setIsLoading] = React.useState(false);

  const radioOptions = [
    { id: "silver", label: "Silver", value: "silver", color: "silver" as const },
    { id: "gold", label: "Gold", value: "gold", color: "gold" as const },
    { id: "platinum", label: "Platinum", value: "platinum", color: "platinum" as const },
  ];

  const handleLoadingTest = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-4 sm:p-8">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Apple Liquid Glass System
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 text-center">
          Replicando a estética premium Apple 2025 com acessibilidade WCAG 2.1
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Check className="w-4 h-4 text-green-500" />
          <span>Keyboard Navigation</span>
          <Check className="w-4 h-4 text-green-500" />
          <span>ARIA Compliant</span>
          <Check className="w-4 h-4 text-green-500" />
          <span>Focus Visible</span>
        </div>
      </div>

      <div className="w-full max-w-6xl space-y-8">
        {/* Radio Control Group */}
        <div className="flex flex-col gap-8 p-6 sm:p-12 rounded-[2.5rem] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium uppercase tracking-widest text-slate-500">
                Radio Control Group
              </h2>
              <span className="text-xs text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full">
                ⌨️ Arrow keys
              </span>
            </div>
            <GlassRadioGroup
              aria-label="Selecione um tema de cor"
              options={radioOptions}
              value={radioValue}
              onChange={setRadioValue}
            />
            <p className="text-xs text-slate-400 italic">
              Selecionado: <span className="font-bold uppercase text-white">{radioValue}</span>
            </p>
            <p className="text-xs text-slate-500">
              💡 Use as setas do teclado, Home/End para navegar. Tab para sair do grupo.
            </p>
          </div>

          <div className="w-full h-px bg-white/10" />

          {/* Disabled State */}
          <div className="space-y-4">
            <h2 className="text-sm font-medium uppercase tracking-widest text-slate-500">
              Radio Group - Disabled States
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400 mb-2">Opção Individual Desabilitada</p>
                <GlassRadioGroup
                  aria-label="Opções com uma desabilitada"
                  options={[
                    { id: "opt1", label: "Habilitado 1", value: "1" },
                    { id: "opt2", label: "Desabilitado", value: "2", disabled: true },
                    { id: "opt3", label: "Habilitado 2", value: "3" },
                  ]}
                />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-2">Grupo Inteiro Desabilitado</p>
                <GlassRadioGroup
                  aria-label="Grupo desabilitado"
                  disabled
                  options={[
                    { id: "d1", label: "Opção 1", value: "1" },
                    { id: "d2", label: "Opção 2", value: "2" },
                    { id: "d3", label: "Opção 3", value: "3" },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-8 p-6 sm:p-12 rounded-[2.5rem] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl">
          <div className="space-y-4">
            <h2 className="text-sm font-medium uppercase tracking-widest text-slate-500">
              Action Button Group - Padrão
            </h2>
            <GlassActionButtonGroup>
              <GlassActionButton size="sm" selected icon={<Type className="w-4 h-4" />}>
                CAIXA ALTA
              </GlassActionButton>

              <GlassActionButton
                size="sm"
                variant="primary"
                icon={<Copy className="w-4 h-4" />}
              >
                Copiar Tudo
              </GlassActionButton>

              <GlassActionButton
                size="sm"
                icon={<RefreshCcw className="w-4 h-4" />}
                className="text-orange-500 hover:text-orange-600"
              >
                Novo
              </GlassActionButton>
            </GlassActionButtonGroup>
          </div>

          <div className="w-full h-px bg-white/10" />

          {/* Variantes Médicas WellWave */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium uppercase tracking-widest text-slate-500">
                Variantes Médicas WellWave
              </h2>
              <span className="text-xs text-slate-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                🏥 Medical System
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <GlassActionButtonGroup orientation="vertical" fullWidth>
                <GlassActionButton
                  variant="medical-primary"
                  size="md"
                  icon={<Activity className="w-5 h-5" />}
                  fullWidth
                >
                  Deep Ocean Blue
                </GlassActionButton>

                <GlassActionButton
                  variant="medical-secondary"
                  size="md"
                  icon={<Heart className="w-5 h-5" />}
                  fullWidth
                >
                  Cyan/Teal Accent
                </GlassActionButton>
              </GlassActionButtonGroup>

              <div className="space-y-2">
                <p className="text-xs text-slate-400">Cores do Sistema WellWave:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-medical-primary" />
                    <span className="text-slate-300">#004e92</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-medical-secondary" />
                    <span className="text-slate-300">#00c6ff</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-white/10" />

          {/* Estados Interativos */}
          <div className="space-y-4">
            <h2 className="text-sm font-medium uppercase tracking-widest text-slate-500">
              Estados Interativos (Disabled & Loading)
            </h2>
            <div className="flex flex-wrap gap-4">
              <GlassActionButton disabled icon={<Settings className="w-4 h-4" />}>
                Desabilitado
              </GlassActionButton>

              <GlassActionButton
                loading={isLoading}
                variant="primary"
                onClick={handleLoadingTest}
              >
                {isLoading ? "Carregando..." : "Testar Loading"}
              </GlassActionButton>

              <GlassActionButton variant="danger" disabled icon={<Trash2 className="w-4 h-4" />}>
                Deletar (Disabled)
              </GlassActionButton>
            </div>
          </div>

          <div className="w-full h-px bg-white/10" />

          {/* Stand-alone Variations */}
          <div className="space-y-4">
            <h2 className="text-sm font-medium uppercase tracking-widest text-slate-500">
              Variantes Independentes com Ícones
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <GlassActionButton
                variant="primary"
                size="md"
                icon={<Plus className="w-5 h-5" />}
                fullWidth
              >
                Adicionar
              </GlassActionButton>

              <GlassActionButton
                variant="secondary"
                size="md"
                icon={<Download className="w-5 h-5" />}
                fullWidth
              >
                Download
              </GlassActionButton>

              <GlassActionButton
                variant="danger"
                size="md"
                icon={<Trash2 className="w-5 h-5" />}
                fullWidth
              >
                Deletar
              </GlassActionButton>
            </div>
          </div>

          <div className="w-full h-px bg-white/10" />

          {/* Tamanhos */}
          <div className="space-y-4">
            <h2 className="text-sm font-medium uppercase tracking-widest text-slate-500">
              Tamanhos Disponíveis
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <GlassActionButton size="sm" variant="secondary">
                Small
              </GlassActionButton>

              <GlassActionButton size="md" variant="secondary">
                Medium (Padrão)
              </GlassActionButton>

              <GlassActionButton size="lg" variant="secondary">
                Large
              </GlassActionButton>
            </div>
          </div>

          <div className="w-full h-px bg-white/10" />

          {/* Posição de Ícone */}
          <div className="space-y-4">
            <h2 className="text-sm font-medium uppercase tracking-widest text-slate-500">
              Posicionamento de Ícones
            </h2>
            <div className="flex flex-wrap gap-4">
              <GlassActionButton
                icon={<Upload className="w-4 h-4" />}
                iconPosition="left"
                variant="medical-primary"
              >
                Ícone à Esquerda
              </GlassActionButton>

              <GlassActionButton
                icon={<Download className="w-4 h-4" />}
                iconPosition="right"
                variant="medical-secondary"
              >
                Ícone à Direita
              </GlassActionButton>
            </div>
          </div>
        </div>

        {/* Responsividade */}
        <div className="flex flex-col gap-8 p-6 sm:p-12 rounded-[2.5rem] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl">
          <div className="space-y-4">
            <h2 className="text-sm font-medium uppercase tracking-widest text-slate-500">
              Responsividade Mobile
            </h2>
            <p className="text-xs text-slate-400">
              Todos os componentes se adaptam automaticamente para dispositivos móveis com tamanhos
              e espaçamentos otimizados.
            </p>
            <div className="space-y-4">
              <div className="p-4 border border-dashed border-slate-600 rounded-2xl">
                <p className="text-xs text-slate-500 mb-3">Radio Group (width: 100% em mobile)</p>
                <GlassRadioGroup
                  aria-label="Teste responsivo"
                  options={[
                    { id: "r1", label: "Mobile", value: "1" },
                    { id: "r2", label: "Tablet", value: "2" },
                    { id: "r3", label: "Desktop", value: "3" },
                  ]}
                />
              </div>

              <div className="p-4 border border-dashed border-slate-600 rounded-2xl">
                <p className="text-xs text-slate-500 mb-3">Button Group (full width)</p>
                <GlassActionButtonGroup fullWidth>
                  <GlassActionButton fullWidth>Opção 1</GlassActionButton>
                  <GlassActionButton fullWidth>Opção 2</GlassActionButton>
                  <GlassActionButton fullWidth>Opção 3</GlassActionButton>
                </GlassActionButtonGroup>
              </div>
            </div>
          </div>
        </div>

        {/* Acessibilidade Info */}
        <div className="flex flex-col gap-6 p-6 sm:p-12 rounded-[2.5rem] bg-emerald-500/10 backdrop-blur-3xl border border-emerald-500/30 shadow-2xl">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-base font-bold text-emerald-100">
                  Acessibilidade WCAG 2.1 Completa
                </h2>
                <p className="text-xs text-emerald-300">Pronto para uso em sistemas médicos</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="font-semibold text-emerald-200">✅ Navegação por Teclado</p>
                <ul className="text-xs text-emerald-300 space-y-1 pl-4">
                  <li>• Arrow keys (↑↓←→)</li>
                  <li>• Home / End</li>
                  <li>• Space / Enter</li>
                  <li>• Tab / Shift+Tab</li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-emerald-200">✅ ARIA Compliant</p>
                <ul className="text-xs text-emerald-300 space-y-1 pl-4">
                  <li>• role="radio" / "radiogroup"</li>
                  <li>• aria-checked / aria-disabled</li>
                  <li>• aria-busy (loading)</li>
                  <li>• aria-label support</li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-emerald-200">✅ Focus Visible</p>
                <ul className="text-xs text-emerald-300 space-y-1 pl-4">
                  <li>• Ring de foco azul</li>
                  <li>• Offset de 2px</li>
                  <li>• Contraste WCAG AAA</li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-emerald-200">✅ Estados Visuais</p>
                <ul className="text-xs text-emerald-300 space-y-1 pl-4">
                  <li>• Disabled (opacity 50%)</li>
                  <li>• Loading (spinner animado)</li>
                  <li>• Hover / Active</li>
                  <li>• Focus / Selected</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 pb-8">
        <p>Apple Liquid Glass Components v2.0</p>
        <p className="mt-1">Production-ready • WCAG 2.1 • WellWave Medical System</p>
      </div>
    </div>
  );
}
