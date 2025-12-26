# Implementation Tasks: Flash Anamnesis

- [x] **Fix Linter Errors in `app/page.tsx`** <!-- id: 1 -->
  - [x] Resolve `alert` usage (replace with Toast or console).
  - [x] Resolve `Navigator` type error or undefined variable.
  - [x] Ensure `FlashAnamnesisFlow` is correctly imported and used.

- [x] **Implement `FlashTemplateSelection` Component** <!-- id: 2 -->
  - [x] Create `components/medical/FlashTemplateSelection.tsx`.
  - [x] List templates from `flashTemplates.ts`.
  - [x] styling: Glassmorphism cards.

- [x] **Implement `FlashForm` Component** <!-- id: 3 -->
  - [x] Create `components/medical/FlashForm.tsx`.
  - [x] Add inputs for standard vitals (PA, FC, Temp, SpO2).
  - [x] Add inputs for specific template variables if needed.

- [x] **Implement `FlashPreview` Component** <!-- id: 4 -->
  - [x] Create `components/medical/FlashPreview.tsx`.
  - [x] Display `queixa_principal`, `exame_fisico`, `hipotese_diagnostica`, `conduta`, `cid`.
  - [x] Add "Copy to Clipboard" button.

- [x] **Integrate Components into `FlashAnamnesisFlow`** <!-- id: 5 -->
  - [x] Update `FlashAnamnesisFlow.tsx` to render the new components based on `step`.
  - [x] Ensure state is passed correctly.

- [x] **Implement `FlashPatientEntry` Enhancements** <!-- id: 7 -->
  - [x] Add "Gestante" button with specific styling (glassmorphism, pink, icon).
  - [x] Handle mutually exclusive logic for gender selection.
  - [x] Update `FlashAnamnesisFlow` to handle `isPregnant` state.
  - [x] Integrate with `flashTemplates.ts` (enforce 'F' gender, append status).

- [x] **Refactor `FlashPatientEntry` UI** <!-- id: 8 -->
  - [x] Remove top-level "Gestante" button from gender grid.
  - [x] Implement conditional "Gestante" toggle that appears only when "Feminino" is selected.
  - [x] Ensure "Masculino" selection clears `isPregnant` state.
  - [x] Animate the appearance of the "Gestante" option.

- [x] **Enhance `FlashForm` Duration Input** <!-- id: 9 -->
  - [x] Replace text input for "Tempo de Sintomas" with a button grid.
  - [x] Add common presets: "1 dia", "2 dias", "3 dias", "5 dias", "7 dias", "> 7 dias".
  - [x] Allow manual override if needed (e.g., "Outro" button or double-click behavior, or just a small input below).

- [x] **Implement Inline Editing in `FlashPreview`** <!-- id: 10 -->
  - [x] Allow double-click to edit text content in `SectionCard`.
  - [x] Show a textarea when in edit mode.
  - [x] Auto-save on blur or specific "Save" button.
  - [x] Ensure "Copy All" grabs the _edited_ content, not just the original.

- [x] **Verify & Polish** <!-- id: 6 -->
  - [x] Check gender flexion in generated text.
  - [x] Verify animations between steps.
  - [x] Ensure "Back" navigation works.
