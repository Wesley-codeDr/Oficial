#!/usr/bin/env python3
"""
Script para extrair as cores predominantes do logo WellWave
"""

from PIL import Image
import json
from collections import Counter
import sys

def rgb_to_hex(rgb):
    """Converte RGB para hexadecimal"""
    return '#{:02x}{:02x}{:02x}'.format(*rgb)

def get_dominant_colors(image_path, num_colors=10):
    """
    Extrai as cores predominantes de uma imagem usando quantização de cores
    """
    try:
        # Abre a imagem
        img = Image.open(image_path)
        
        # Redimensiona para processamento mais rápido (mantém proporção)
        img.thumbnail((300, 300))
        
        # Converte para RGB se necessário
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Aplica quantização de cores para reduzir paleta
        # Isso ajuda a agrupar cores similares
        quantized = img.quantize(colors=64)
        
        # Obtém a paleta de cores
        palette = quantized.getpalette()
        
        # Converte a imagem quantizada de volta para RGB para obter os valores
        quantized_rgb = quantized.convert('RGB')
        
        # Conta a frequência de cada cor
        pixels = list(quantized_rgb.getdata())
        color_counts = Counter(pixels)
        
        # Obtém as cores mais frequentes
        most_common = color_counts.most_common(num_colors)
        
        # Formata o resultado
        colors = []
        for rgb, count in most_common:
            hex_color = rgb_to_hex(rgb)
            percentage = (count / len(pixels)) * 100
            colors.append({
                'hex': hex_color,
                'rgb': rgb,
                'percentage': round(percentage, 2)
            })
        
        return colors
        
    except Exception as e:
        print(f"Erro ao processar imagem: {e}", file=sys.stderr)
        return []

def analyze_logo(image_path):
    """
    Analisa o logo e retorna informações detalhadas sobre as cores
    """
    colors = get_dominant_colors(image_path, num_colors=15)
    
    if not colors:
        print("Nenhuma cor encontrada.")
        return
    
    # Separa as cores por categoria
    primary_colors = colors[:3]  # 3 cores principais
    secondary_colors = colors[3:8]  # 5 cores secundárias
    accent_colors = colors[8:12]  # 4 cores de destaque
    
    # Calcula médias para identificar tons neutros
    neutral_candidates = []
    for color in colors:
        r, g, b = color['rgb']
        # Verifica se é uma cor neutra (tons de cinza, branco, preto)
        max_diff = max(abs(r-g), abs(g-b), abs(r-b))
        if max_diff < 30:  # Diferença pequena entre canais
            neutral_candidates.append(color)
    
    # Identifica cores neutras mais proeminentes
    neutral_colors = neutral_candidates[:3]
    
    result = {
        'primary': primary_colors,
        'secondary': secondary_colors,
        'accent': accent_colors,
        'neutral': neutral_colors,
        'all_colors': colors
    }
    
    return result

if __name__ == '__main__':
    logo_path = '/Users/wesleywillian/Oficial/Oficial/public/logo-wellwave.png'
    
    print("Analisando cores do logo WellWave...")
    print("=" * 60)
    
    result = analyze_logo(logo_path)
    
    if result:
        print(json.dumps(result, indent=2))
