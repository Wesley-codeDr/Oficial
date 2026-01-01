#!/bin/bash

# Script para gerar todas as imagens necessárias (OpenGraph, Twitter, Favicons)
# usando sips (macOS built-in tool)

set -e

LOGO="public/logo-wellwave.png"
PUBLIC_DIR="public"

echo "🎨 Gerando imagens sociais e favicons..."
echo ""

# Verificar se logo existe
if [ ! -f "$LOGO" ]; then
  echo "❌ Logo não encontrado em $LOGO"
  exit 1
fi

# 1. OpenGraph Image (1200x630px)
echo "📸 Criando og-image.png (1200x630px)..."
sips -z 630 1200 "$LOGO" --out "$PUBLIC_DIR/og-image.png" > /dev/null 2>&1
echo "✅ og-image.png criado"

# 2. Twitter Card Image (1200x600px)
echo "📸 Criando twitter-image.png (1200x600px)..."
sips -z 600 1200 "$LOGO" --out "$PUBLIC_DIR/twitter-image.png" > /dev/null 2>&1
echo "✅ twitter-image.png criado"

# 3. Favicon 16x16
echo "📸 Criando favicon-16x16.png..."
sips -z 16 16 "$LOGO" --out "$PUBLIC_DIR/favicon-16x16.png" > /dev/null 2>&1
echo "✅ favicon-16x16.png criado"

# 4. Favicon 32x32
echo "📸 Criando favicon-32x32.png..."
sips -z 32 32 "$LOGO" --out "$PUBLIC_DIR/favicon-32x32.png" > /dev/null 2>&1
echo "✅ favicon-32x32.png criado"

# 5. Apple Touch Icon (180x180)
echo "📸 Criando apple-touch-icon.png (180x180px)..."
sips -z 180 180 "$LOGO" --out "$PUBLIC_DIR/apple-touch-icon.png" > /dev/null 2>&1
echo "✅ apple-touch-icon.png criado"

# 6. Favicon.ico (multi-size ICO file)
echo "📸 Criando favicon.ico..."
# Para .ico, precisamos usar imagemagick ou outra ferramenta
# Por enquanto, vamos apenas copiar o 32x32 como fallback
if command -v magick &> /dev/null; then
  magick "$PUBLIC_DIR/favicon-16x16.png" "$PUBLIC_DIR/favicon-32x32.png" "$PUBLIC_DIR/favicon.ico"
  echo "✅ favicon.ico criado com ImageMagick"
elif command -v convert &> /dev/null; then
  convert "$PUBLIC_DIR/favicon-16x16.png" "$PUBLIC_DIR/favicon-32x32.png" "$PUBLIC_DIR/favicon.ico"
  echo "✅ favicon.ico criado com ImageMagick"
else
  # Fallback: usar sips para criar apenas 32x32 como .ico
  sips -s format ico "$PUBLIC_DIR/favicon-32x32.png" --out "$PUBLIC_DIR/favicon.ico" > /dev/null 2>&1
  echo "✅ favicon.ico criado (fallback 32x32)"
fi

echo ""
echo "🎉 Todas as imagens foram geradas com sucesso!"
echo ""
echo "Arquivos criados:"
echo "  ✓ og-image.png (1200x630px)"
echo "  ✓ twitter-image.png (1200x600px)"
echo "  ✓ favicon-16x16.png"
echo "  ✓ favicon-32x32.png"
echo "  ✓ apple-touch-icon.png (180x180px)"
echo "  ✓ favicon.ico"
echo ""
echo "📁 Localização: $PUBLIC_DIR/"
