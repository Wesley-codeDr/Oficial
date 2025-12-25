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

- [x] **Verify & Polish** <!-- id: 6 -->
  - [x] Check gender flexion in generated text.
  - [x] Verify animations between steps.
  - [x] Ensure "Back" navigation works.
