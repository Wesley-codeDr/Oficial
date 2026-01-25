
import { describe, it, expect } from 'vitest';
import { extractSection } from '@/components/medical/ProtocolDrawer';

describe('ProtocolDrawer extractSection', () => {
  const markdown = `
# Protocolo de Cefaleia

## ⚡ AÇÃO IMEDIATA
Avaliar sinais vitais.
Estabilizar paciente.

## 🚩 Red Flags
- Sinais de meningite
- Cefaleia em trovoada

## 📊 Calculadoras Clínicas
[Link](https://example.com)

## 💊 Protocolo Medicamentoso
Dipirona 1g

## 💡 Diagnóstico Diferencial
- Enxaqueca
- HSA

## ⚙️ Adaptações
Considerar recursos locais.

## 🔗 Referências EBM
1. Guideline XYZ

## Outra Seção
Texto qualquer
`;

  it('should extract a section successfully', () => {
    const result = extractSection(markdown, 'Red Flags');
    expect(result).toContain('## 🚩 Red Flags');
    expect(result).toContain('- Sinais de meningite');
    expect(result).not.toContain('## 📊 Calculadoras Clínicas');
  });

  it('should extract a section with emoji in title search', () => {
    // The input title doesn't have emoji, but the markdown does.
    // The current implementation removes emojis from the search term,
    // but the regex construction allows for matching the header in markdown.
    // Let's verify how it behaves.

    // The function removes emojis from the *input* sectionTitle.
    // The regex created is `##\\s*[^\\n]*${escapedTitle}[\\s\\S]*?(?=\\n##\\s|$)`
    // `[^\\n]*` matches the emoji in the markdown header before the title text if it's there?
    // Let's check the markdown: "## 🚩 Red Flags"
    // Input: "Red Flags" -> clean: "Red Flags" -> regex matches "## <anything> Red Flags"

    const result = extractSection(markdown, 'Red Flags');
    expect(result).toContain('Red Flags');
  });

  it('should handle missing sections', () => {
    const result = extractSection(markdown, 'Non Existent Section');
    expect(result).toBe('');
  });

  it('should handle last section correctly', () => {
    // Note: The sample markdown has "Outra Seção" at the end.
    // Let's test "Referências EBM" which is not the last but towards the end.
    const result = extractSection(markdown, 'Outra Seção');
    expect(result).toContain('## Outra Seção');
    expect(result).toContain('Texto qualquer');
  });

  it('should be case insensitive', () => {
    const result = extractSection(markdown, 'red flags');
    expect(result).toContain('## 🚩 Red Flags');
  });

  it('should handle empty markdown', () => {
    expect(extractSection('', 'Red Flags')).toBe('');
  });

  it('should handle special characters in title', () => {
    // Markdown: ## ⚙️ Adaptações
    // Input: "Adaptações"
    const result = extractSection(markdown, 'Adaptações');
    expect(result).toContain('Adaptações');
  });

  it('should handle input title with emojis by ignoring them', () => {
      // Input: "🚩 Red Flags" -> clean: "Red Flags"
      const result = extractSection(markdown, '🚩 Red Flags');
      expect(result).toContain('Red Flags');
  });
});
