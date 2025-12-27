# Implementation Plan: Flash Anamnesis

## Architecture

- **Pattern:** Wizard/Stepper Workflow (Identity -> Selection -> Form -> Preview).
- **State Management:** Local React State in `FlashAnamnesisFlow` (Orchestrator).
- **Data Logic:** `lib/data/flashTemplates.ts` handles template storage and text generation logic.
- **Routing:** Controlled by `viewMode` state in `app/page.tsx`.

## Technology Stack

### Tech Stack

- **Framework:** Next.js 14 (App Router).
- **Styling:** Tailwind CSS + Framer Motion (animations).
- **Icons:** Lucide React.
- **Language:** TypeScript (Strict).

## Components Structure

1.  `FlashAnamnesisFlow.tsx`: Main container. Manages `step` state.
2.  `FlashPatientEntry.tsx`: Step 1 - Identity (Adult/Ped/Gender).
3.  `FlashTemplateSelection.tsx`: Step 2 - Grid of available templates.
4.  `FlashForm.tsx`: Step 3 - Input fields for variables.
5.  `FlashPreview.tsx`: Step 4 - Display generated text with Copy button.

## Data Model (Local)

```typescript
interface FlashState {
  step: 'identity' | 'selection' | 'form' | 'preview'
  patient: {
    category: 'adult' | 'pediatric'
    gender: 'M' | 'F'
  }
  selectedTemplateId: string | null
  variables: Record<string, string>
}
```

## Implementation Plan

### Steps to Implement

1.  **Refine `FlashAnamnesisFlow.tsx`**: Ensure it handles all steps correctly.
2.  **Implement `FlashTemplateSelection.tsx`**: Create component to list templates from `flashTemplates.ts`.
3.  **Implement `FlashForm.tsx`**: Create dynamic form based on variables required by the template (or fixed set of common vitals).
4.  **Implement `FlashPreview.tsx`**: Show the result of `generateFlashRecord`.
5.  **Fix Integration in `app/page.tsx`**: Resolve linter errors (alert, Navigator) and ensure clean switching.
6.  **Verify `flashTemplates.ts`**: Ensure gender flexion logic is robust.

## Verification Plan

- **Manual Test:** Go through the full flow (Identity -> Select -> Form -> Preview).
- **Check Output:** Verify text changes based on gender (O/A) and variables.
- **Linter Check:** Ensure no errors in `app/page.tsx`.
