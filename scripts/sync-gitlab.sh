#!/bin/bash

# WellWave - Script de Sincronização GitLab
# Sincroniza código entre GitHub (origin) e GitLab (mirror)

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}WellWave - Sincronização GitLab${NC}"
echo "=================================="
echo ""

# Verify we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}Erro: Este não é um repositório Git${NC}"
    exit 1
fi

# Verify remotes exist
if ! git remote | grep -q "^origin$"; then
    echo -e "${RED}Erro: Remote 'origin' (GitHub) não encontrado${NC}"
    exit 1
fi

if ! git remote | grep -q "^gitlab$"; then
    echo -e "${RED}Erro: Remote 'gitlab' não encontrado${NC}"
    echo -e "${YELLOW}Execute: git remote add gitlab https://gitlab.com/Wesley-codeDr/oficial.git${NC}"
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo -e "${YELLOW}Branch atual: ${CURRENT_BRANCH}${NC}"
echo ""

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo -e "${YELLOW}⚠️  Você tem alterações não commitadas${NC}"
    echo -e "Deseja continuar? As alterações locais serão mantidas."
    read -p "Continuar? (s/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[SsYy]$ ]]; then
        echo -e "${RED}Sincronização cancelada${NC}"
        exit 1
    fi
fi

# Sync mode
echo "Escolha o modo de sincronização:"
echo "1) Push para ambos (GitHub + GitLab)"
echo "2) Pull do GitHub, push para GitLab"
echo "3) Apenas push para GitLab"
echo "4) Fetch de todos os remotes"
read -p "Opção (1-4): " -n 1 -r SYNC_MODE
echo ""
echo ""

case $SYNC_MODE in
    1)
        echo -e "${GREEN}📤 Sincronizando com GitHub...${NC}"
        git push origin "$CURRENT_BRANCH"

        echo -e "${GREEN}📤 Sincronizando com GitLab...${NC}"
        git push gitlab "$CURRENT_BRANCH"

        echo -e "${GREEN}✅ Sincronização completa!${NC}"
        ;;
    2)
        echo -e "${GREEN}📥 Atualizando do GitHub...${NC}"
        git pull origin "$CURRENT_BRANCH"

        echo -e "${GREEN}📤 Enviando para GitLab...${NC}"
        git push gitlab "$CURRENT_BRANCH"

        echo -e "${GREEN}✅ Sincronização completa!${NC}"
        ;;
    3)
        echo -e "${GREEN}📤 Enviando apenas para GitLab...${NC}"
        git push gitlab "$CURRENT_BRANCH"

        echo -e "${GREEN}✅ Push para GitLab completo!${NC}"
        ;;
    4)
        echo -e "${GREEN}🔄 Fazendo fetch de todos os remotes...${NC}"
        git fetch --all

        echo -e "${GREEN}✅ Fetch completo!${NC}"
        echo ""
        echo "Status dos remotes:"
        git remote -v
        ;;
    *)
        echo -e "${RED}Opção inválida${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}Remotes configurados:${NC}"
git remote -v

echo ""
echo -e "${GREEN}Status atual:${NC}"
git status -sb
