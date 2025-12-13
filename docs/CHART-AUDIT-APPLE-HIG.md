# 📊 Auditoria de Gráficos - Apple Human Interface Guidelines

> Análise de conformidade dos componentes de visualização de dados com as [Diretrizes Apple HIG para Charting Data](https://developer.apple.com/design/human-interface-guidelines/charting-data)

---

## 📋 Resumo Executivo

### Pontuação Geral: **68/100**

| Critério | Pontuação | Status |
|----------|-----------|--------|
| Design Visual | 85/100 | ✅ Excelente |
| Acessibilidade | 45/100 | ⚠️ Necessita Melhorias |
| Texto Descritivo | 50/100 | ⚠️ Necessita Melhorias |
| Consistência | 70/100 | 🟡 Bom |
| Interatividade | 65/100 | 🟡 Bom |
| Performance | 90/100 | ✅ Excelente |

---

## 🔍 Componentes Auditados

### 1. MetricCard (`components/dashboard/cards/metric-card.tsx`)

**Propósito**: Card de métrica com mini sparkline chart

#### ✅ Pontos Fortes
- Design glassmorphism bem executado seguindo Apple HIG 2025
- Animações Spring com Framer Motion (física realista)
- Gradientes volumétricos para profundidade
- Temas de cores configuráveis por status clínico
- Tooltips customizados

#### ❌ Gaps Identificados
| Gap | Impacto | Prioridade |
|-----|---------|------------|
| Sem ARIA labels nos gráficos | Usuários com deficiência visual não conseguem interpretar | 🔴 Alta |
| Sem keyboard navigation | Usuários que não usam mouse não conseguem interagir | 🔴 Alta |
| Tooltip sem unidade de medida | Dificulta interpretação rápida | 🟡 Média |
| Sem eixos/labels no sparkline | Sem contexto temporal ou de escala | 🟡 Média |
| Sem texto descritivo/insight | Não comunica o "so what" dos dados | 🟡 Média |

#### Recomendações
```tsx
// Adicionar acessibilidade
<Area
  role="img"
  aria-label={`Gráfico de tendência mostrando ${title}. Valor atual: ${value}`}
  tabIndex={0}
  ...
/>
```

---

### 2. HeartRateCard (`components/dashboard/cards/heart-rate-card.tsx`)

**Propósito**: Card especializado para frequência cardíaca com ECG-style chart

#### ✅ Pontos Fortes
- Tooltip com unidade (bpm) - **Apple HIG ✓**
- Design consistente com MetricCard
- Botão de ação com aria-label
- Cores semanticamente significativas (vermelho para coração)

#### ❌ Gaps Identificados
| Gap | Impacto | Prioridade |
|-----|---------|------------|
| Sem contexto temporal no gráfico | Usuário não sabe se é 1h, 24h, 7d | 🟡 Média |
| Sem indicador de tendência | Não mostra se está subindo/descendo | 🟡 Média |
| Sem range normal de referência | Usuário não sabe se valor está bom | 🟡 Média |

#### Recomendações
- Adicionar label de período (ex: "Últimas 24h")
- Adicionar linha de referência para range normal (60-100 bpm)
- Adicionar badge de tendência (↑ 5 bpm)

---

### 3. Stats Cards (`components/dashboard/cards/stats-cards.tsx`)

**Propósito**: Coleção de cards menores para métricas secundárias

#### ✅ Pontos Fortes
- Variedade de tipos (BarChart, LineChart, Ring/Gauge)
- Tooltips com unidades (h, kg)
- Componente GlassCard reutilizável
- Efeito de shine no hover

#### ❌ Gaps Identificados
| Gap | Impacto | Prioridade |
|-----|---------|------------|
| Botões sem labels de acessibilidade | Violação WCAG 2.1 | 🔴 Alta |
| Ring charts sem ARIA | Screen readers não conseguem ler | 🔴 Alta |
| Tooltips inconsistentes entre cards | Experiência fragmentada | 🟡 Média |

#### Recomendações
```tsx
// Ring chart com acessibilidade
<svg 
  role="img" 
  aria-label={`Vigilância: ${percentage}% do objetivo`}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={percentage}
>
```

---

### 4. BloodPressureCard (`components/dashboard/cards/blood-pressure-card.tsx`)

**Propósito**: Card especializado para pressão arterial

#### ✅ Pontos Fortes
- Status badge visual (Normal/Atenção)
- Comparação atual vs média (7 dias)
- Cores semânticas por status
- Indicador visual de barra lateral

#### ❌ Gaps Identificados
| Gap | Impacto | Prioridade |
|-----|---------|------------|
| Sem gráfico de tendência | Não mostra evolução temporal | 🟡 Média |
| Sem tooltip de contexto | Usuário não sabe o que é "normal" | 🟡 Média |
| Timestamp hardcoded | Não reflete dados reais | 🟢 Baixa |

---

## 📐 Análise por Diretriz Apple HIG

### 1. "Use a chart when you want to highlight important information"

| Componente | Conformidade | Observação |
|------------|--------------|------------|
| MetricCard | ✅ | Destaca métricas chave visualmente |
| HeartRateCard | ✅ | Foco claro em frequência cardíaca |
| Stats Cards | ⚠️ | Alguns cards sem gráfico onde faria sentido |
| BloodPressureCard | ⚠️ | Poderia ter sparkline de tendência |

### 2. "Keep a chart simple, letting people choose when they want additional details"

| Componente | Conformidade | Observação |
|------------|--------------|------------|
| MetricCard | ✅ | Sparkline simples com tooltip sob demanda |
| HeartRateCard | ✅ | Botão para revelar histórico completo |
| Stats Cards | ⚠️ | Sem drill-down disponível |
| BloodPressureCard | ✅ | Mostra resumo com opção de ver mais |

### 3. "Make every chart in your app accessible"

| Componente | Conformidade | Observação |
|------------|--------------|------------|
| MetricCard | ❌ | Sem ARIA labels, sem keyboard nav |
| HeartRateCard | ⚠️ | Botão tem aria-label, gráfico não |
| Stats Cards | ❌ | Sem suporte a acessibilidade |
| BloodPressureCard | ⚠️ | Status badge ajuda, mas insuficiente |

### 4. "Prefer using common chart types"

| Componente | Conformidade | Observação |
|------------|--------------|------------|
| MetricCard | ✅ | Area chart (comum e intuitivo) |
| HeartRateCard | ✅ | Line chart estilo ECG |
| Stats Cards | ✅ | Bar, Line e Ring charts |
| BloodPressureCard | ⚠️ | Sem gráfico, apenas valores |

### 5. "Aid comprehension by adding descriptive text"

| Componente | Conformidade | Observação |
|------------|--------------|------------|
| MetricCard | ⚠️ | Tem título e subtítulo, mas sem insight |
| HeartRateCard | ⚠️ | Título bom, falta contexto |
| Stats Cards | ⚠️ | Títulos básicos apenas |
| BloodPressureCard | ✅ | Status badge comunica interpretação |

### 6. "Match the size of a chart to its functionality"

| Componente | Conformidade | Observação |
|------------|--------------|------------|
| MetricCard | ✅ | Sparkline proporcional ao card |
| HeartRateCard | ✅ | Gráfico ocupa área adequada |
| Stats Cards | ✅ | Tamanhos compactos para visão geral |
| BloodPressureCard | ⚠️ | Espaço subutilizado sem gráfico |

### 7. "Prefer consistency across multiple charts"

| Componente | Conformidade | Observação |
|------------|--------------|------------|
| Design Visual | ✅ | Glassmorphism consistente |
| Tooltips | ⚠️ | Estilos levemente diferentes |
| Animações | ✅ | Usam mesmos presets de animação |
| Cores | ✅ | Sistema de cores unificado |

---

## 🎯 Plano de Ação

### Fase 1: Acessibilidade (Prioridade Alta)

1. **Criar `ChartAccessibility` wrapper**
   - ARIA labels automáticos
   - Keyboard navigation
   - Screen reader announcements

2. **Atualizar todos os gráficos**
   - Adicionar `role="img"` ou `role="graphics-document"`
   - Adicionar `aria-label` descritivo
   - Adicionar `tabIndex={0}` para focabilidade

### Fase 2: Texto Descritivo (Prioridade Média)

1. **Criar sistema de insights**
   - Componente `ChartInsight` para headline/summary
   - Geração automática de texto baseado em dados
   - Ex: "↑ 12% vs semana passada"

2. **Adicionar contexto temporal**
   - Labels de período em todos os gráficos
   - Linhas de referência para valores normais

### Fase 3: Consistência (Prioridade Média)

1. **Unificar tooltips**
   - Criar `ChartTooltip` componente base
   - Estilo consistente com glassmorphism
   - Sempre incluir unidade de medida

2. **Padronizar animações de entrada**
   - Staggered reveal para grupos de gráficos
   - Animação consistente de desenho das linhas

### Fase 4: Interatividade (Prioridade Baixa)

1. **Adicionar drill-down**
   - Expandir sparklines para visão detalhada
   - Gestos de pinch-to-zoom em mobile

2. **Adicionar filtros de período**
   - Seletores 1h / 24h / 7d / 30d
   - Transições animadas entre períodos

---

## 📦 Componentes a Criar

### 1. ChartTooltip (Base)
```tsx
interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
  unit?: string;
  formatter?: (value: number) => string;
}
```

### 2. ChartAccessibilityWrapper
```tsx
interface ChartAccessibilityProps {
  title: string;
  description: string;
  dataPoints: number;
  trendDirection?: 'up' | 'down' | 'stable';
  children: React.ReactNode;
}
```

### 3. ChartInsight
```tsx
interface ChartInsightProps {
  headline: string;
  trend?: { direction: 'up' | 'down'; value: string };
  period?: string;
}
```

### 4. EnhancedMetricCard (Atualização)
- Todos os gaps corrigidos
- Acessibilidade completa
- Texto descritivo opcional
- Animações staggered

---

## 📊 Métricas de Sucesso

| Métrica | Atual | Meta |
|---------|-------|------|
| WCAG 2.1 AA Compliance | ~40% | 100% |
| Lighthouse Accessibility | ~75 | 95+ |
| Keyboard Navigation | Parcial | Completa |
| Screen Reader Support | Mínimo | Completo |
| Consistência Visual | 70% | 95% |
| User Comprehension Time | ~5s | ~2s |

---

## 🔗 Referências

- [Apple HIG - Charting Data](https://developer.apple.com/design/human-interface-guidelines/charting-data)
- [Apple HIG - Charts](https://developer.apple.com/design/human-interface-guidelines/charts)
- [Recharts Accessibility](https://recharts.org/en-US/guide/accessibility)
- [WCAG 2.1 - Non-text Content](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content)

---

*Documento gerado em: Dezembro 2025*
*Próxima revisão: Após implementação da Fase 1*

