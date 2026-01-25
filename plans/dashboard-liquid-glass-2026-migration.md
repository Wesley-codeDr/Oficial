# Plano de Migração: Apple Liquid Glass 2026 para WellWave Dashboard

## Visão Geral

Este plano detalha a migração completa do WellWave Dashboard para o design system **Apple Liquid Glass 2026** demonstrado em [`http://localhost:3000/test-liquid-glass-2026`](http://localhost:3000/test-liquid-glass-2026). A migração garante a aplicação consistente do layout em todos os módulos e componentes existentes, mantendo a funcionalidade validada em modo claro e escuro, priorizando a estruturação de variáveis de tema globais e a refatoração sistemática da interface para aderir estritamente à estética, interatividade e padrões visuais do protótipo referenciado.

## Objetivos Principais

1. **Consistência Visual**: Aplicar o Apple Liquid Glass 2026 uniformemente em toda a interface
2. **Funcionalidade Preservada**: Manter todas as funcionalidades existentes intactas
3. **Acessibilidade**: Garantir WCAG 2.1 AA em modo claro e escuro
4. **Performance**: Otimizar renderização e animações
5. **Manutenibilidade**: Criar componentes reutilizáveis e sistema de design escalável

## Especificações Técnicas do Apple Liquid Glass 2026

### Propriedades CSS Fundamentais

```css
/* Backdrop Filter Universal */
backdrop-filter: blur(50px) saturate(200%);
-webkit-backdrop-filter: blur(50px) saturate(200%);

/* GPU Acceleration */
transform: translateZ(0);
backface-visibility: hidden;
contain: layout style paint;

/* Animações */
transition: all 200ms cubic-bezier(0.25, 1, 0.5, 1);

/* Efeitos Visuais */
--liquid-glass-blur: 50px;
--liquid-glass-saturate: 200%;
--liquid-glass-specular: rgba(255, 255, 255, 0.6);
--liquid-glass-inner-glow: rgba(255, 255, 255, 0.1);
--liquid-glass-rim-light: conic-gradient(at 0% 0%, var(--color-rim-light) 0%, transparent 100%, transparent);
```

### Variantes de Componentes

#### GlassCard
- **default**: `backdrop-blur-[50px] saturate-[200%]`
- **clear**: Mais transparente para fundos ricos
- **elevated**: Mais opacidade e sombra aprimorada
- **medical**: Tema médico com brilho azul
- **subtle**: Mais transparente e leve

#### GlassInput
- **default**: Input padrão com blur(50px) e saturate(200%)
- **clear**: Input transparente para fundos ricos
- **elevated**: Input elevado para elementos proeminentes
- **medical**: Input médico com tema azul e efeito de brilho

#### GlassButton
- **default**: Botão padrão com blur(50px) e saturate(200%)
- **primary**: Botão primário com tema azul
- **secondary**: Botão secundário mais transparente
- **medical**: Botão médico com tema azul
- **danger**: Botão destrutivo com tema vermelho

#### GlassBadge
- **default**: Badge padrão com blur(50px) e saturate(200%)
- **primary**: Badge primária com tema azul
- **secondary**: Badge secundária mais transparente
- **medical**: Badge médica com tema azul
- **success**: Badge de sucesso com tema verde
- **warning**: Badge de aviso com tema laranja
- **danger**: Badge de perigo com tema vermelho

### Sistema de Tipografia iOS 2026

```css
--font-display: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-body: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-caption: 'SF Pro Caption', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'SF Mono', 'Menlo', 'Consolas', monospace;
```

### Sistema de Espaçamento iOS 2026

```css
--spacing-1: 4px;
--spacing-2: 8px;
--spacing-3: 12px;
--spacing-4: 16px;
--spacing-5: 20px;
--spacing-6: 24px;
--spacing-8: 32px;
--spacing-10: 40px;
--spacing-12: 48px;
```

### Sistema de Cores Apple 2026

```css
--color-primary: #007AFF;
--color-secondary: #5856D6;
--color-accent: #5AC8FA;
--color-success: #34C759;
--color-warning: #FF9500;
--color-danger: #FF3B30;
--color-text-primary: #1D1D1F;
--color-text-secondary: #6B7280;
--color-text-muted: #8E8E93;
--color-border: rgba(255, 255, 255, 0.35);
--color-border-dark: rgba(255, 255, 255, 0.2);
```

## Diagrama de Arquitetura da Migração

```mermaid
graph TD
    A[Análise] --> B[Planejamento]
    B --> C[Implementação]
    C --> D[Testes]
    D --> E[Documentação]
    
    subgraph Componentes
        C --> C1[UI Base]
        C --> C2[Médicos]
        C --> C3[Chat]
        C --> C4[Dashboard]
        C --> C5[Kanban]
        C --> C6[Layout]
        C --> C7[Autenticação]
        C --> C8[Utilitários]
    
    subgraph Efeitos
        C1 --> E1[Inner Glow]
        C1 --> E2[Specular Highlight]
        C1 --> E3[Rim Light]
        C1 --> E4[Caustics]
        C1 --> E5[Textura de Ruído]
    
    subgraph Animações
        C1 --> A1[Fade-in]
        C1 --> A2[Hover Scale]
        C1 --> A3[Tap Scale]
    
    subgraph Acessibilidade
        C1 --> AC1[WCAG 2.1]
        C1 --> AC2[Reduced Motion]
        C1 --> AC3[Reduced Transparency]
    
    subgraph Performance
        C1 --> P1[GPU Acceleration]
        C1 --> P2[CSS Containment]
        C1 --> P3[Will-change]
```

## Fases da Migração

### Fase 1: Fundação e Infraestrutura

**Objetivo**: Configurar variáveis de tema globais e sistema de design tokens

**Tarefas**:
1. Revisar [`app/liquid-glass-2026.css`](../app/liquid-glass-2026.css) para garantir que todas as variáveis estão definidas
2. Criar arquivo [`app/globals.css`](../app/globals.css) com variáveis globais de tema
3. Atualizar [`tailwind.config.ts`](../tailwind.config.ts) com tokens do Apple Liquid Glass 2026
4. Criar arquivo [`lib/theme/tokens.ts`](../lib/theme/tokens.ts) com constantes de tema TypeScript
5. Criar arquivo [`lib/theme/index.ts`](../lib/theme/index.ts) com hooks de tema
6. Atualizar [`app/layout.tsx`](../app/layout.tsx) para usar variáveis de tema globais

**Deliveráveis**:
- Sistema de variáveis CSS globais
- Tokens de tema TypeScript
- Hooks de tema reutilizáveis
- Configuração Tailwind atualizada

### Fase 2: Componentes UI Base

**Objetivo**: Migrar componentes UI base para valores Apple Liquid Glass 2026

**Componentes a migrar**:
1. [`components/ui/glass-action-button.tsx`](../components/ui/glass-action-button.tsx)
2. [`components/ui/glass-checkbox.tsx`](../components/ui/glass-checkbox.tsx)
3. [`components/ui/glass-circle-button.tsx`](../components/ui/glass-circle-button.tsx)
4. [`components/ui/glass-control-tile.tsx`](../components/ui/glass-control-tile.tsx)
5. [`components/ui/glass-dialog.tsx`](../components/ui/glass-dialog.tsx)
6. [`components/ui/glass-modal.tsx`](../components/ui/glass-modal.tsx)
7. [`components/ui/glass-notification.tsx`](../components/ui/glass-notification.tsx)
8. [`components/ui/glass-radio-group.tsx`](../components/ui/glass-radio-group.tsx)
9. [`components/ui/glass-select.tsx`](../components/ui/glass-select.tsx)
10. [`components/ui/glass-sheet.tsx`](../components/ui/glass-sheet.tsx)
11. [`components/ui/glass-slider.tsx`](../components/ui/glass-slider.tsx)
12. [`components/ui/glass-switch.tsx`](../components/ui/glass-switch.tsx)
13. [`components/ui/glass-testimonial-stack.tsx`](../components/ui/glass-testimonial-stack.tsx)
14. [`components/ui/ios/Checkbox.tsx`](../components/ui/ios/Checkbox.tsx)
15. [`components/ui/ios/SegmentedControl.tsx`](../components/ui/ios/SegmentedControl.tsx)

**Modificações**:
- Substituir `backdrop-blur-xl` por `backdrop-blur-[50px] saturate-[200%]`
- Substituir `backdrop-blur(20px) saturate(180%)` por `backdrop-blur-[50px] saturate-[200%]`
- Adicionar efeitos visuais: inner glow, specular highlight, rim light
- Aplicar animações: fade-in, hover scale, tap scale
- Adicionar textura de ruído SVG com opacidade de 2.5%
- Atualizar radius para 16px (ou 12px para badges)
- Aplicar tipografia iOS 2026
- Aplicar espaçamento iOS 2026

**Componentes a criar**:
1. [`components/ui/glass/GlassModal.tsx`](../components/ui/glass/GlassModal.tsx)
2. [`components/ui/glass/GlassSheet.tsx`](../components/ui/glass/GlassSheet.tsx)
3. [`components/ui/glass/GlassSelect.tsx`](../components/ui/glass/GlassSelect.tsx)
4. [`components/ui/glass/GlassSlider.tsx`](../components/ui/glass/GlassSlider.tsx)
5. [`components/ui/glass/GlassSwitch.tsx`](../components/ui/glass/GlassSwitch.tsx)
6. [`components/ui/glass/GlassRadioGroup.tsx`](../components/ui/glass/GlassRadioGroup.tsx)
7. [`components/ui/glass/GlassCheckbox.tsx`](../components/ui/glass/GlassCheckbox.tsx)

### Fase 3: Componentes Médicos

**Objetivo**: Migrar componentes médicos para valores Apple Liquid Glass 2026

**Componentes a migrar**:
1. [`components/anamnese/anamnese-form.tsx`](../components/anamnese/anamnese-form.tsx)
2. [`components/anamnese/CategoryNav.tsx`](../components/anamnese/CategoryNav.tsx)
3. [`components/anamnese/checkbox-group.tsx`](../components/anamnese/checkbox-group.tsx)
4. [`components/anamnese/ComplaintSelector.tsx`](../components/anamnese/ComplaintSelector.tsx)
5. [`components/anamnese/PriorityCheckboxPanel.tsx`](../components/anamnese/PriorityCheckboxPanel.tsx)
6. [`components/anamnese/NarrativePreview.tsx`](../components/anamnese/NarrativePreview.tsx)
7. [`components/anamnese/SectionForm.tsx`](../components/anamnese/SectionForm.tsx)
8. [`components/anamnese/ProgressStatus.tsx`](../components/anamnese/ProgressStatus.tsx)
9. [`components/anamnese/red-flag-alert.tsx`](../components/anamnese/red-flag-alert.tsx)
10. [`components/anamnese/SeverityIndicator.tsx`](../components/anamnese/SeverityIndicator.tsx)
11. [`components/anamnese/EmergencyWarningOverlay.tsx`](../components/anamnese/EmergencyWarningOverlay.tsx)
12. [`components/anamnese/EmergencyModeBar.tsx`](../components/anamnese/EmergencyModeBar.tsx)
13. [`components/anamnese/CFMProgressIndicator.tsx`](../components/anamnese/CFMProgressIndicator.tsx)
14. [`components/anamnese/CollaborationPanel.tsx`](../components/anamnese/CollaborationPanel.tsx)
15. [`components/anamnese/patient-context-modal.tsx`](../components/anamnese/patient-context-modal.tsx)
16. [`components/anamnese/copy-button.tsx`](../components/anamnese/copy-button.tsx)

**Modificações**:
- Substituir classes `glass-molded`, `rim-light-ios26`, `inner-glow-ios26`, `noise-grain` por classes do Apple Liquid Glass 2026
- Substituir `backdrop-blur-xl` por `backdrop-blur-[50px] saturate-[200%]`
- Substituir `backdrop-blur(20px) saturate(180%)` por `backdrop-blur-[50px] saturate-[200%]`
- Adicionar efeitos visuais: inner glow, specular highlight, rim light, caustics
- Aplicar animações: fade-in, hover scale, tap scale
- Adicionar textura de ruído SVG com opacidade de 2.5%
- Atualizar radius para 16px (ou 12px para badges)
- Aplicar tipografia iOS 2026
- Aplicar espaçamento iOS 2026

### Fase 4: Componentes de Chat

**Objetivo**: Migrar componentes de chat para valores Apple Liquid Glass 2026

**Componentes a migrar**:
1. [`components/chat/chat-interface.tsx`](../components/chat/chat-interface.tsx)
2. [`components/chat/chat-input.tsx`](../components/chat/chat-input.tsx)
3. [`components/chat/message-bubble.tsx`](../components/chat/message-bubble.tsx)
4. [`components/chat/typing-indicator.tsx`](../components/chat/typing-indicator.tsx)
5. [`components/chat/citation-card.tsx`](../components/chat/citation-card.tsx)
6. [`components/chat/chatwell-demo.tsx`](../components/chat/chatwell-demo.tsx)

**Modificações**:
- Substituir classes `glass-pill`, `liquid-glass-material` por classes do Apple Liquid Glass 2026
- Substituir `backdrop-blur-xl` por `backdrop-blur-[50px] saturate-[200%]`
- Substituir `backdrop-blur(20px) saturate(180%)` por `backdrop-blur-[50px] saturate-[200%]`
- Adicionar efeitos visuais: inner glow, specular highlight, rim light
- Aplicar animações: fade-in, hover scale, tap scale
- Adicionar textura de ruído SVG com opacidade de 2.5%
- Atualizar radius para 16px (ou 12px para badges)
- Aplicar tipografia iOS 2026
- Aplicar espaçamento iOS 2026

### Fase 5: Componentes de Dashboard

**Objetivo**: Migrar componentes de dashboard para valores Apple Liquid Glass 2026

**Componentes a migrar**:
1. [`components/dashboard/WelcomePanel.tsx`](../components/dashboard/WelcomePanel.tsx)
2. [`components/dashboard/ShiftTodoList.tsx`](../components/dashboard/ShiftTodoList.tsx)
3. [`components/dashboard/StickyNotes.tsx`](../components/dashboard/StickyNotes.tsx)
4. [`components/dashboard/TodoInput.tsx`](../components/dashboard/TodoInput.tsx)
5. [`components/dashboard/TodoItem.tsx`](../components/dashboard/TodoItem.tsx)
6. [`components/dashboard/WelcomeHeader.tsx`](../components/dashboard/WelcomeHeader.tsx)

**Modificações**:
- Substituir `backdrop-blur(20px) saturate(180%)` por `backdrop-blur-[50px] saturate-[200%]`
- Substituir valores hardcoded de background por variáveis de tema
- Adicionar efeitos visuais: inner glow, specular highlight, rim light
- Aplicar animações: fade-in, hover scale, tap scale
- Adicionar textura de ruído SVG com opacidade de 2.5%
- Atualizar radius para 16px (ou 12px para badges)
- Aplicar tipografia iOS 2026
- Aplicar espaçamento iOS 2026

### Fase 6: Componentes de Cards

**Objetivo**: Migrar componentes de cards para valores Apple Liquid Glass 2026

**Componentes a migrar**:
1. [`components/cards/BloodPressureCard.tsx`](../components/cards/BloodPressureCard.tsx)
2. [`components/cards/HeartRateCard.tsx`](../components/cards/HeartRateCard.tsx)
3. [`components/cards/MedicationsCard.tsx`](../components/cards/MedicationsCard.tsx)
4. [`components/cards/RemindersCard.tsx`](../components/cards/RemindersCard.tsx)
5. [`components/cards/SmallStatsCards.tsx`](../components/cards/SmallStatsCards.tsx)
6. [`components/cards/SummaryCard.tsx`](../components/cards/SummaryCard.tsx)

**Modificações**:
- Substituir valores hardcoded de background por variáveis de tema
- Adicionar efeitos visuais: inner glow, specular highlight, rim light
- Aplicar animações: fade-in, hover scale, tap scale
- Adicionar textura de ruído SVG com opacidade de 2.5%
- Atualizar radius para 16px (ou 12px para badges)
- Aplicar tipografia iOS 2026
- Aplicar espaçamento iOS 2026

### Fase 7: Componentes de Kanban

**Objetivo**: Migrar componentes de kanban para valores Apple Liquid Glass 2026

**Componentes a migrar**:
1. [`components/kanban/KanbanBoard.tsx`](../components/kanban/KanbanBoard.tsx)
2. [`components/kanban/KanbanCard.tsx`](../components/kanban/KanbanCard.tsx)
3. [`components/kanban/KanbanColumn.tsx`](../components/kanban/KanbanColumn.tsx)
4. [`components/kanban/ExpandableHelpCard.tsx`](../components/kanban/ExpandableHelpCard.tsx)
5. [`components/kanban/KanbanEmptyState.tsx`](../components/kanban/KanbanEmptyState.tsx)
6. [`components/kanban/TaskImportModal.tsx`](../components/kanban/TaskImportModal.tsx)

**Modificações**:
- Substituir valores hardcoded de background por variáveis de tema
- Adicionar efeitos visuais: inner glow, specular highlight, rim light
- Aplicar animações: fade-in, hover scale, tap scale
- Adicionar textura de ruído SVG com opacidade de 2.5%
- Atualizar radius para 16px (ou 12px para badges)
- Aplicar tipografia iOS 2026
- Aplicar espaçamento iOS 2026

### Fase 8: Componentes de Layout

**Objetivo**: Migrar componentes de layout para valores Apple Liquid Glass 2026

**Componentes a migrar**:
1. [`components/layout/DashboardHeader.tsx`](../components/layout/DashboardHeader.tsx)
2. [`components/layout/DashboardContent.tsx`](../components/layout/DashboardContent.tsx)
3. [`components/layout/DashboardFooter.tsx`](../components/layout/DashboardFooter.tsx)

**Modificações**:
- Substituir `backdrop-blur-[40px] saturate-[180%]` por `backdrop-blur-[50px] saturate-[200%]`
- Substituir valores hardcoded de background por variáveis de tema
- Adicionar efeitos visuais: inner glow, specular highlight, rim light
- Aplicar animações: fade-in, hover scale, tap scale
- Adicionar textura de ruído SVG com opacidade de 2.5%
- Atualizar radius para 16px (ou 12px para badges)
- Aplicar tipografia iOS 2026
- Aplicar espaçamento iOS 2026

### Fase 9: Componentes Médicos Gerais

**Objetivo**: Migrar componentes médicos gerais para valores Apple Liquid Glass 2026

**Componentes a migrar**:
1. [`components/medical/AnamnesisView.tsx`](../components/medical/AnamnesisView.tsx)
2. [`components/medical/AnamnesisWorkspace.tsx`](../components/medical/AnamnesisWorkspace.tsx)
3. [`components/medical/AutoRedFlagAlert.tsx`](../components/medical/AutoRedFlagAlert.tsx)
4. [`components/medical/CalculatorTriggerButton.tsx`](../components/medical/CalculatorTriggerButton.tsx)
5. [`components/medical/ChatWell.tsx`](../components/medical/ChatWell.tsx)
6. [`components/medical/ComplaintDetailPanel.tsx`](../components/medical/ComplaintDetailPanel.tsx)
7. [`components/medical/ComplaintSelection.tsx`](../components/medical/ComplaintSelection.tsx)
8. [`components/medical/DashboardSettingsModal.tsx`](../components/medical/DashboardSettingsModal.tsx)
9. [`components/medical/DashboardView.tsx`](../components/medical/DashboardView.tsx)
10. [`components/medical/FlashAnamnesisFlow.tsx`](../components/medical/FlashAnamnesisFlow.tsx)
11. [`components/medical/FlashForm.tsx`](../components/medical/FlashForm.tsx)
12. [`components/medical/FlashPatientEntry.tsx`](../components/medical/FlashPatientEntry.tsx)
13. [`components/medical/FlashPreview.tsx`](../components/medical/FlashPreview.tsx)
14. [`components/medical/FlashTemplateSelection.tsx`](../components/medical/FlashTemplateSelection.tsx)
15. [`components/medical/Header.tsx`](../components/medical/Header.tsx)
16. [`components/medical/HeartScoreCalculator.tsx`](../components/medical/HeartScoreCalculator.tsx)
17. [`components/medical/InlineCalculatorPanel.tsx`](../components/medical/InlineCalculatorPanel.tsx)
18. [`components/medical/LiquidEditor.tsx`](../components/medical/LiquidEditor.tsx)
19. [`components/medical/OnboardingTutorial.tsx`](../components/medical/OnboardingTutorial.tsx)
20. [`components/medical/ProtocolDrawer.tsx`](../components/medical/ProtocolDrawer.tsx)
21. [`components/medical/Sidebar.tsx`](../components/medical/Sidebar.tsx)
22. [`components/medical/SmartNotePanel.tsx`](../components/medical/SmartNotePanel.tsx)
23. [`components/medical/SyncStatusBadge.tsx`](../components/medical/SyncStatusBadge.tsx)
24. [`components/medical/glass-inputs/GlassCheckbox.tsx`](../components/medical/glass-inputs/GlassCheckbox.tsx)
25. [`components/medical/glass-inputs/GlassInput.tsx`](../components/medical/glass-inputs/GlassInput.tsx)
26. [`components/medical/glass-inputs/GlassMultiSelect.tsx`](../components/medical/glass-inputs/GlassMultiSelect.tsx)
27. [`components/medical/glass-inputs/GlassRange.tsx`](../components/medical/glass-inputs/GlassRange.tsx)
28. [`components/medical/glass-inputs/GlassSegmented.tsx`](../components/medical/glass-inputs/GlassSegmented.tsx)

**Modificações**:
- Substituir valores hardcoded de background por variáveis de tema
- Adicionar efeitos visuais: inner glow, specular highlight, rim light
- Aplicar animações: fade-in, hover scale, tap scale
- Adicionar textura de ruído SVG com opacidade de 2.5%
- Atualizar radius para 16px (ou 12px para badges)
- Aplicar tipografia iOS 2026
- Aplicar espaçamento iOS 2026

### Fase 10: Páginas do Dashboard

**Objetivo**: Migrar páginas do dashboard para usar novos componentes

**Páginas a migrar**:
1. [`app/(dashboard)/dashboard/page.tsx`](../app/(dashboard)/dashboard/page.tsx)
2. [`app/(dashboard)/chat/page.tsx`](../app/(dashboard)/chat/page.tsx)
3. [`app/(dashboard)/chat/[id]/page.tsx`](../app/(dashboard)/chat/[id]/page.tsx)
4. [`app/(dashboard)/history/page.tsx`](../app/(dashboard)/history/page.tsx)
5. [`app/(dashboard)/anamnese/[syndrome]/page.tsx`](../app/(dashboard)/anamnese/[syndrome]/page.tsx)
6. [`app/(dashboard)/kanban/page.tsx`](../app/(dashboard)/kanban/page.tsx)
7. [`app/(dashboard)/chatwell/page.tsx`](../app/(dashboard)/chatwell/page.tsx)

**Modificações**:
- Substituir componentes antigos pelos novos componentes Apple Liquid Glass 2026
- Atualizar layout de cada página para usar variáveis de tema globais
- Aplicar animações de entrada com Framer Motion
- Garantir consistência visual entre todas as páginas

### Fase 11: Componentes de Autenticação

**Objetivo**: Migrar componentes de autenticação para valores Apple Liquid Glass 2026

**Componentes a migrar**:
1. [`components/auth/login-form.tsx`](../components/auth/login-form.tsx)
2. [`components/auth/register-form.tsx`](../components/auth/register-form.tsx)
3. [`components/auth/forgot-password-form.tsx`](../components/auth/forgot-password-form.tsx)

**Modificações**:
- Substituir valores hardcoded de background por variáveis de tema
- Adicionar efeitos visuais: inner glow, specular highlight, rim light
- Aplicar animações: fade-in, hover scale, tap scale
- Adicionar textura de ruído SVG com opacidade de 2.5%
- Atualizar radius para 16px (ou 12px para badges)
- Aplicar tipografia iOS 2026
- Aplicar espaçamento iOS 2026

### Fase 12: Componentes de Transição e Animação

**Objetivo**: Migrar componentes de transição e animação para valores Apple Liquid Glass 2026

**Componentes a migrar**:
1. [`components/transitions/page-transition.tsx`](../components/transitions/page-transition.tsx)
2. [`components/ui/fade-in.tsx`](../components/ui/fade-in.tsx)
3. [`components/ui/scale-in.tsx`](../components/ui/scale-in.tsx)
4. [`components/ui/animated-wrapper.tsx`](../components/ui/animated-wrapper.tsx)

**Modificações**:
- Aplicar animações suaves com Framer Motion
- Usar easing cúbico [0.25, 1, 0.5, 1]
- Aplicar duração de 200ms
- Garantir performance com GPU acceleration

### Fase 13: Componentes Utilitários

**Objetivo**: Migrar componentes utilitários para valores Apple Liquid Glass 2026

**Componentes a migrar**:
1. [`components/ui/auto-save-indicator.tsx`](../components/ui/auto-save-indicator.tsx)
2. [`components/ui/network-recovery-banner.tsx`](../components/ui/network-recovery-banner.tsx)
3. [`components/ui/ripple-effect.tsx`](../components/ui/ripple-effect.tsx)
4. [`components/ui/scroll-area.tsx`](../components/ui/scroll-area.tsx)
5. [`components/ui/skeleton.tsx`](../components/ui/skeleton.tsx)
6. [`components/ui/toast.tsx`](../components/ui/toast.tsx)
7. [`components/ui/toaster.tsx`](../components/ui/toaster.tsx)
8. [`components/ui/tooltip.tsx`](../components/ui/tooltip.tsx)

**Modificações**:
- Substituir valores hardcoded de background por variáveis de tema
- Adicionar efeitos visuais: inner glow, specular highlight, rim light
- Aplicar animações: fade-in, hover scale, tap scale
- Adicionar textura de ruído SVG com opacidade de 2.5%
- Atualizar radius para 16px (ou 12px para badges)
- Aplicar tipografia iOS 2026
- Aplicar espaçamento iOS 2026

### Fase 14: Componentes shadcn/ui Base

**Objetivo**: Migrar componentes shadcn/ui base para valores Apple Liquid Glass 2026

**Componentes a migrar**:
1. [`components/ui/button.tsx`](../components/ui/button.tsx)
2. [`components/ui/input.tsx`](../components/ui/input.tsx)
3. [`components/ui/badge.tsx`](../components/ui/badge.tsx)
4. [`components/ui/card.tsx`](../components/ui/card.tsx)
5. [`components/ui/checkbox.tsx`](../components/ui/checkbox.tsx)
6. [`components/ui/dialog.tsx`](../components/ui/dialog.tsx)
7. [`components/ui/accordion.tsx`](../components/ui/accordion.tsx)
8. [`components/ui/form.tsx`](../components/ui/form.tsx)
9. [`components/ui/label.tsx`](../components/ui/label.tsx)
10. [`components/ui/select.tsx`](../components/ui/select.tsx)
11. [`components/ui/slider.tsx`](../components/ui/slider.tsx)
12. [`components/ui/switch.tsx`](../components/ui/switch.tsx)
13. [`components/ui/separator.tsx`](../components/ui/separator.tsx)
14. [`components/ui/sheet.tsx`](../components/ui/sheet.tsx)

**Modificações**:
- Substituir valores hardcoded de background por variáveis de tema
- Adicionar efeitos visuais: inner glow, specular highlight, rim light
- Aplicar animações: fade-in, hover scale, tap scale
- Adicionar textura de ruído SVG com opacidade de 2.5%
- Atualizar radius para 16px (ou 12px para badges)
- Aplicar tipografia iOS 2026
- Aplicar espaçamento iOS 2026

### Fase 15: Atualizar Layout Principal do Dashboard

**Objetivo**: Atualizar layout principal do dashboard para usar variáveis de tema globais

**Arquivo a migrar**: [`app/(dashboard)/layout.tsx`](../app/(dashboard)/layout.tsx)

**Modificações**:
- Substituir `backdrop-blur-[40px] saturate-[180%]` por `backdrop-blur-[50px] saturate-[200%]`
- Substituir valores hardcoded de background por variáveis de tema
- Atualizar footer para usar variáveis de tema globais
- Garantir consistência visual com protótipo

### Fase 16: Testes e Validação

**Objetivo**: Testar todos os componentes em light mode e dark mode

**Testes**:
1. Testar todos os componentes em light mode
2. Testar todos os componentes em dark mode
3. Testar transições entre light mode e dark mode
4. Testar animações de entrada, hover e tap
5. Testar efeitos visuais (inner glow, specular highlight, rim light)
6. Testar acessibilidade com leitores de tela
7. Testar contraste de cores
8. Testar responsividade em diferentes breakpoints
9. Testar performance com React DevTools
10. Testar compatibilidade cross-browser

**Validação**:
1. Validar WCAG 2.1 AA para contraste de cores
2. Validar preferências de usuário (reduced motion, reduced transparency)
3. Validar acessibilidade de teclado
4. Validar acessibilidade de mouse
5. Validar foco visível
6. Validar ARIA attributes
7. Validar semântica HTML
8. Validar performance (FPS > 60)

### Fase 17: Documentação

**Objetivo**: Criar documentação de migração para a equipe

**Documentos a criar**:
1. Guia de uso dos novos componentes
2. Guia de migração de componentes existentes
3. Guia de customização de tema
4. Guia de acessibilidade
5. Guia de performance
6. Guia de troubleshooting

## Checklist de Validação Final

- [ ] Todos os componentes UI base migrados para Apple Liquid Glass 2026
- [ ] Todos os componentes médicos migrados para Apple Liquid Glass 2026
- [ ] Todos os componentes de chat migrados para Apple Liquid Glass 2026
- [ ] Todos os componentes de dashboard migrados para Apple Liquid Glass 2026
- [ ] Todos os componentes de cards migrados para Apple Liquid Glass 2026
- [ ] Todos os componentes de kanban migrados para Apple Liquid Glass 2026
- [ ] Todos os componentes de layout migrados para Apple Liquid Glass 2026
- [ ] Todos os componentes médicos gerais migrados para Apple Liquid Glass 2026
- [ ] Todos os componentes de autenticação migrados para Apple Liquid Glass 2026
- [ ] Todos os componentes de transição migrados para Apple Liquid Glass 2026
- [ ] Todos os componentes utilitários migrados para Apple Liquid Glass 2026
- [ ] Todos os componentes shadcn/ui base migrados para Apple Liquid Glass 2026
- [ ] Layout principal do dashboard atualizado
- [ ] Todas as páginas do dashboard atualizadas
- [ ] Variáveis de tema globais configuradas
- [ ] Sistema de tipografia iOS 2026 aplicado
- [ ] Sistema de espaçamento iOS 2026 aplicado
- [ ] Sistema de cores Apple 2026 aplicado
- [ ] Efeitos visuais (inner glow, specular highlight, rim light) aplicados
- [ ] Animações sutis e micro-interações aplicadas
- [ ] Textura de ruído SVG aplicada
- [ ] Todos os componentes testados em light mode
- [ ] Todos os componentes testados em dark mode
- [ ] Acessibilidade WCAG 2.1 validada
- [ ] Contraste de cores validado
- [ ] Preferências de usuário suportadas
- [ ] Performance otimizada (FPS > 60)
- [ ] Documentação de migração criada
- [ ] Guias de uso criados

## Próximos Passos Após Migração

1. **Monitoramento**: Monitorar performance e regressões visuais em produção
2. **Feedback**: Coletar feedback da equipe e usuários
3. **Iteração**: Refinar design system com base no feedback
4. **Manutenção**: Atualizar componentes conforme novas necessidades
5. **Evolução**: Adicionar novos componentes e efeitos conforme evolução do design system

## Riscos e Mitigações

### Riscos

1. **Regressões Visuais**: Componentes podem não seguir exatamente o protótipo
2. **Performance**: Animações podem afetar performance em dispositivos mais antigos
3. **Acessibilidade**: Efeitos visuais podem reduzir contraste
4. **Compatibilidade**: Browser antigos podem não suportar backdrop-filter

### Mitigações

1. **Testes Exaustivos**: Testar em múltiplos browsers e dispositivos
2. **Fallbacks**: Fornecer fallbacks para browsers sem suporte a backdrop-filter
3. **Progressive Enhancement**: Habilitar efeitos avançados gradualmente
4. **Performance Monitoring**: Monitorar FPS e otimizar conforme necessário
5. **User Preferences**: Respeitar preferências de usuário (reduced motion, reduced transparency)

## Conclusão

Este plano fornece uma rota clara para migrar todo o WellWave Dashboard para o design system Apple Liquid Glass 2026. A migração será realizada em fases sistemáticas, garantindo consistência visual, funcionalidade preservada, acessibilidade e performance otimizada. Após a conclusão da migração, o dashboard terá uma estética premium e moderna, seguindo as diretrizes de design da Apple 2026.
