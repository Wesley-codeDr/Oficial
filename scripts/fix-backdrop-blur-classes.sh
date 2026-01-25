#!/bin/bash

# Script para corrigir classes backdrop-blur-[Xpx] saturate-[Y%] para usar classes CSS dedicadas
# Substitui as classes hardcoded por classes compatíveis com Tailwind CSS 4

# Cores a serem corrigidas
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Iniciando correção de classes backdrop-blur...${NC}"

# Contador de arquivos corrigidos
count=0

# Encontrar todos os arquivos .tsx com backdrop-blur-[
find components app -name "*.tsx" -type f -exec grep -l "backdrop-blur-\[" {} \;

if [ -z "$files" ]; then
    echo -e "${YELLOW}Nenhum arquivo encontrado com backdrop-blur-[$NC}"
    exit 0
fi

# Para cada arquivo encontrado
for file in $files; do
    # Fazer backup do arquivo
    cp "$file" "$file.backup"
    
    # Substituir backdrop-blur-[50px] saturate-[200%] por liquid-glass-default
    sed -i '' 's/backdrop-blur-\[50px\] saturate-\[200%\]/liquid-glass-default/g' "$file"
    
    # Substituir backdrop-blur-[60px] saturate-[180%] por liquid-glass-elevated
    sed -i '' 's/backdrop-blur-\[60px\] saturate-\[180%\]/liquid-glass-elevated/g' "$file"
    
    # Substituir backdrop-blur-[40px] saturate-[150%] por liquid-glass-subtle
    sed -i '' 's/backdrop-blur-\[40px\] saturate-\[150%\]/liquid-glass-subtle/g' "$file"
    
    # Substituir backdrop-blur-[60px] saturate-[100%] por liquid-glass-clear
    sed -i '' 's/backdrop-blur-\[60px\] saturate-\[100%\]/liquid-glass-clear/g' "$file"
    
    # Substituir backdrop-blur-[80px] saturate-[200%] por liquid-glass-default (80px não existe, usar default)
    sed -i '' 's/backdrop-blur-\[80px\] saturate-\[200%\]/liquid-glass-default/g' "$file"
    
    # Substituir backdrop-blur-[20px] saturate-[150%] por liquid-glass-subtle (20px não existe, usar subtle)
    sed -i '' 's/backdrop-blur-\[20px\] saturate-\[150%\]/liquid-glass-subtle/g' "$file"
    
    # Substituir backdrop-blur-[10px] por liquid-glass-subtle (10px não existe, usar subtle)
    sed -i '' 's/backdrop-blur-\[10px\]/liquid-glass-subtle/g' "$file"
    
    # Verificar se o arquivo foi modificado
    if ! cmp -s "$file" "$file.backup"; then
        echo -e "${GREEN}✓${NC} $file"
        ((count++))
        rm "$file.backup"
    else
        echo -e "${YELLOW}⚠${NC} $file (sem alterações)"
        rm "$file.backup"
    fi
done

echo -e "${GREEN}Total de arquivos corrigidos: $count${NC}"
echo -e "${GREEN}Correção concluída!${NC}"
