# 003-flash-anamnesis - Kanban Tasks

Generated from tasks.md

## Tasks

### Done

- [x] T1: Resolve `alert` usage (replace with Toast or console).

- [x] T2: Resolve `Navigator` type error or undefined variable.

- [x] T3: Ensure `FlashAnamnesisFlow` is correctly imported and used.

- [x] T4: **Implement `FlashTemplateSelection` Component** <!-- id: 2 -->

- [x] T5: Create `components/medical/FlashTemplateSelection.tsx`.

- [x] T6: List templates from `flashTemplates.ts`.

- [x] T7: styling: Glassmorphism cards.

- [x] T8: **Implement `FlashForm` Component** <!-- id: 3 -->

- [x] T9: Create `components/medical/FlashForm.tsx`.

- [x] T10: Add inputs for standard vitals (PA, FC, Temp, SpO2).

- [x] T11: Add inputs for specific template variables if needed.

- [x] T12: **Implement `FlashPreview` Component** <!-- id: 4 -->

- [x] T13: Create `components/medical/FlashPreview.tsx`.

- [x] T14: Display `queixa_principal`, `exame_fisico`, `hipotese_diagnostica`, `conduta`, `

- [x] T15: Add "Copy to Clipboard" button.

- [x] T16: **Integrate Components into `FlashAnamnesisFlow`** <!-- id: 5 -->

- [x] T17: Update `FlashAnamnesisFlow.tsx` to render the new components based on `step`.

- [x] T18: Ensure state is passed correctly.

- [x] T19: **Implement `FlashPatientEntry` Enhancements** <!-- id: 7 -->

- [x] T20: Add "Gestante" button with specific styling (glassmorphism, pink, icon).

- [x] T21: Handle mutually exclusive logic for gender selection.

- [x] T22: Update `FlashAnamnesisFlow` to handle `isPregnant` state.

- [x] T23: Integrate with `flashTemplates.ts` (enforce 'F' gender, append status).

- [x] T24: **Refactor `FlashPatientEntry` UI** <!-- id: 8 -->

- [x] T25: Remove top-level "Gestante" button from gender grid.

- [x] T26: Implement conditional "Gestante" toggle that appears only when "Feminino" is sel

- [x] T27: Ensure "Masculino" selection clears `isPregnant` state.

- [x] T28: Animate the appearance of the "Gestante" option.

- [x] T29: **Enhance `FlashForm` Duration Input** <!-- id: 9 -->

- [x] T30: Replace text input for "Tempo de Sintomas" with a button grid.

- [x] T31: Add common presets: "1 dia", "2 dias", "3 dias", "5 dias", "7 dias", "> 7 dias".

- [x] T32: Allow manual override if needed (e.g., "Outro" button or double-click behavior, 

- [x] T33: **Implement Inline Editing in `FlashPreview`** <!-- id: 10 -->

- [x] T34: Allow double-click to edit text content in `SectionCard`.

- [x] T35: Show a textarea when in edit mode.

- [x] T36: Auto-save on blur or specific "Save" button.

- [x] T37: Ensure "Copy All" grabs the _edited_ content, not just the original.

- [x] T38: **Verify & Polish** <!-- id: 6 -->

- [x] T39: Check gender flexion in generated text.

- [x] T40: Verify animations between steps.

- [x] T41: Ensure "Back" navigation works.
