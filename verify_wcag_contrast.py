#!/usr/bin/env python3
"""
Verificação de Conformidade WCAG para Paleta de Cores WellWave
Calcula contraste e verifica conformidade com WCAG AA (4.5:1) e AAA (7:0:1)
"""

import math
from typing import Tuple, Dict, List

def hex_to_rgb(hex_color: str) -> Tuple[int, int, int]:
    """Converte cor hexadecimal para RGB."""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def calculate_luminance(rgb: Tuple[int, int, int]) -> float:
    """Calcula luminância relativa de uma cor RGB."""
    r, g, b = rgb
    # Normaliza os valores para o intervalo 0-1
    r_norm = r / 255.0
    g_norm = g / 255.0
    b_norm = b / 255.0
    
    # Aplica a fórmula de luminância WCAG
    if r_norm <= 0.03928:
        r_lum = r_norm / 12.92
    else:
        r_lum = ((r_norm + 0.055) / 1.055) ** 2.4
    
    if g_norm <= 0.03928:
        g_lum = g_norm / 12.92
    else:
        g_lum = ((g_norm + 0.055) / 1.055) ** 2.4
    
    if b_norm <= 0.03928:
        b_lum = b_norm / 12.92
    else:
        b_lum = ((b_norm + 0.055) / 1.055) ** 2.4
    
    return 0.2126 * r_lum + 0.7152 * g_lum + 0.0722 * b_lum

def calculate_contrast_ratio(luminance1: float, luminance2: float) -> float:
    """Calcula razão de contraste entre duas luminâncias."""
    lighter = max(luminance1, luminance2)
    darker = min(luminance1, luminance2)
    return (lighter + 0.05) / (darker + 0.05)

def check_wcag_compliance(contrast_ratio: float) -> Dict[str, bool]:
    """Verifica conformidade com WCAG AA e AAA."""
    return {
        "AA": contrast_ratio >= 4.5,
        "AAA": contrast_ratio >= 7.0,
        "AA_Large": contrast_ratio >= 3.0,
        "AAA_Large": contrast_ratio >= 4.5
    }

def test_color_pair(foreground: str, background: str, description: str) -> Dict:
    """Testa um par de cores e retorna resultado detalhado."""
    fg_rgb = hex_to_rgb(foreground)
    bg_rgb = hex_to_rgb(background)
    
    fg_lum = calculate_luminance(fg_rgb)
    bg_lum = calculate_luminance(bg_rgb)
    
    contrast_ratio = calculate_contrast_ratio(fg_lum, bg_lum)
    compliance = check_wcag_compliance(contrast_ratio)
    
    return {
        "description": description,
        "foreground": foreground,
        "background": background,
        "contrast_ratio": contrast_ratio,
        "compliance": compliance
    }

def print_result(result: Dict):
    """Imprime resultado formatado."""
    fg = result["foreground"]
    bg = result["background"]
    ratio = result["contrast_ratio"]
    compliance = result["compliance"]
    
    status_aa = "✅ PASS" if compliance["AA"] else "❌ FAIL"
    status_aaa = "✅ PASS" if compliance["AAA"] else "❌ FAIL"
    status_aa_large = "✅ PASS" if compliance["AA_Large"] else "❌ FAIL"
    status_aaa_large = "✅ PASS" if compliance["AAA_Large"] else "❌ FAIL"
    
    print(f"\n📊 {result['description']}")
    print(f"   Foreground: {fg}")
    print(f"   Background: {bg}")
    print(f"   Contraste: {ratio:.2f}:1")
    print(f"   WCAG AA (4.5:1): {status_aa}")
    print(f"   WCAG AAA (7.0:1): {status_aaa}")
    print(f"   WCAG AA Large (3.0:1): {status_aa_large}")
    print(f"   WCAG AAA Large (4.5:1): {status_aaa_large}")

def main():
    """Função principal."""
    print("=" * 80)
    print("VERIFICAÇÃO DE CONFORMIDADE WCAG - CORES WELLWAVE")
    print("=" * 80)
    
    # Cores WellWave ajustadas
    tests = [
        # Texto primário sobre fundo neutro
        ("#00227d", "#f3f3f5", "text-primary sobre bg-neutral"),
        
        # Texto neutro sobre fundo primário
        ("#f3f3f5", "#00227d", "text-neutral sobre bg-primary"),
        
        # Texto branco sobre fundo primário
        ("#ffffff", "#00227d", "text-white sobre bg-primary"),
        
        # Texto primário sobre fundo branco
        ("#00227d", "#ffffff", "text-primary sobre bg-white"),
        
        # Texto WellWave primário sobre fundo neutro WellWave
        ("#00227d", "#f3f3f5", "text-ww-primary sobre bg-ww-neutral"),
        
        # Texto WellWave primário-800 sobre fundo WellWave primário-100
        ("#244999", "#e0e9ff", "text-ww-primary-800 sobre bg-ww-primary-100"),
        
        # Texto WellWave primário-900 sobre fundo WellWave primário-200
        ("#163066", "#c3d6ff", "text-ww-primary-900 sobre bg-ww-primary-200"),
        
        # Texto WellWave primário-950 sobre fundo WellWave primário-300
        ("#0b1a44", "#a3c2ff", "text-ww-primary-950 sobre bg-ww-primary-300"),
        
        # Botão primário: texto branco sobre fundo primário
        ("#ffffff", "#00227d", "botão primary: text-white sobre bg-primary"),
        
        # Botão primário: texto primário-100 sobre fundo primário-600
        ("#e0e9ff", "#00227d", "botão primary: text-primary-100 sobre bg-primary-600"),
        
        # Botão secundário: texto branco sobre fundo secundário
        ("#ffffff", "#0b3673", "botão secondary: text-white sobre bg-secondary"),
        
        # Botão secundário: texto secundário-100 sobre fundo secundário-600
        ("#b3ecff", "#075170", "botão secondary: text-secondary-100 sobre bg-secondary-600"),
        
        # Fundo neutro sobre texto primário
        ("#00227d", "#f3f3f5", "bg-neutral sobre text-primary"),
        
        # Fundo branco sobre texto primário-600
        ("#437fff", "#ffffff", "bg-white sobre text-primary-600"),
        
        # Fundo branco sobre texto secundário
        ("#1fa8e3", "#ffffff", "bg-white sobre text-secondary"),
        
        # Texto branco sobre fundo danger
        ("#ffffff", "#dc2626", "text-white sobre bg-danger"),
        
        # Texto branco sobre fundo warning
        ("#ffffff", "#b45309", "text-white sobre bg-warning"),
        
        # Texto branco sobre fundo success
        ("#ffffff", "#15803d", "text-white sobre bg-success"),
        
        # Texto branco sobre fundo médico
        ("#ffffff", "#00227d", "text-white sobre bg-medical"),
        
        # Texto branco sobre fundo primário
        ("#ffffff", "#00227d", "text-white sobre bg-primary"),
        
        # Texto branco sobre fundo primário-900
        ("#ffffff", "#163066", "text-white sobre bg-primary-900"),
        
        # Texto branco sobre fundo secundário-900
        ("#ffffff", "#0b3673", "text-white sobre bg-secondary-900"),
        
        # Texto primário sobre fundo neutro
        ("#00227d", "#f3f3f5", "text-primary sobre bg-neutral"),
        
        # Texto primário-800 sobre fundo primário-100
        ("#244999", "#e0e9ff", "text-primary-800 sobre bg-primary-100"),
        
        # Texto neutro-800 sobre fundo neutro-50
        ("#1f2937", "#f9fafb", "text-neutral-800 sobre bg-neutral-50"),
    ]
    
    # Executa testes
    results = []
    for fg, bg, desc in tests:
        result = test_color_pair(fg, bg, desc)
        results.append(result)
        print_result(result)
    
    # Calcula estatísticas
    aa_pass = sum(1 for r in results if r["compliance"]["AA"])
    aaa_pass = sum(1 for r in results if r["compliance"]["AAA"])
    total = len(results)
    
    print("\n" + "=" * 80)
    print(f"Total de testes: {total}")
    print(f"Conformidade WCAG AA (4.5:1): {aa_pass}/{total} ({aa_pass/total*100:.1f}%)")
    print(f"Conformidade WCAG AAA (7.0:1): {aaa_pass}/{total} ({aaa_pass/total*100:.1f}%)")
    
    # Lista cores com baixo contraste
    print("\n" + "=" * 80)
    print("RECOMENDAÇÕES")
    print("=" * 80)
    
    low_contrast = [r for r in results if not r["compliance"]["AA"]]
    if low_contrast:
        print("\n⚠️  CORES COM BAIXO CONTRASTE (não atendem WCAG AA):")
        for r in low_contrast:
            print(f"   - {r['description']}: {r['contrast_ratio']:.2f}:1")
        
        print("\nRecomendações:")
        print("   1. Ajuste a luminância das cores de texto ou fundo")
        print("   2. Use cores mais claras para texto sobre fundos escuros")
        print("   3. Use cores mais escuras para texto sobre fundos claros")
        print("   4. Considere aumentar o tamanho da fonte para texto grande (≥18pt ou 14pt bold)")
    else:
        print("\n✅ TODAS AS CORES ATENDEM WCAG AA!")
    
    # Lista cores que não atendem AAA
    aaa_fail = [r for r in results if not r["compliance"]["AAA"]]
    if aaa_fail:
        print(f"\n⚠️  {len(aaa_fail)} cores não atendem WCAG AAA (recomendado para melhor acessibilidade)")
    
    print("\n" + "=" * 80)
    print("FERRAMENTAS DE VERIFICAÇÃO")
    print("=" * 80)
    print("\nPara verificar contraste em tempo real:")
    print("   - WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/")
    print("   - axe DevTools: https://www.deque.com/axe-devtools/")
    print("   - Chrome DevTools: Painel Lighthouse > Accessibility")
    print("   - Firefox Developer Tools: Painel Accessibility Inspector")

if __name__ == "__main__":
    main()
