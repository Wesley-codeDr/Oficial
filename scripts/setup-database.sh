#!/bin/bash
# Setup database configuration

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common.sh"

PROJECT_ROOT=$(get_project_root)
ENV_FILE="$PROJECT_ROOT/.env"
ENV_TEMPLATE="$PROJECT_ROOT/env.template"

log_info "Configurando banco de dados e Supabase..."

# Check if .env already exists
if [ -f "$ENV_FILE" ]; then
    log_warning ".env já existe. Deseja sobrescrever? (s/N)"
    read -r response
    if [[ ! "$response" =~ ^[Ss]$ ]]; then
        log_info "Operação cancelada."
        exit 0
    fi
fi

log_info "Escolha o ambiente:"
echo "  1) Desenvolvimento Local (Docker)"
echo "  2) Produção (Supabase)"
read -p "Opção (1 ou 2): " ENV_CHOICE

if [ "$ENV_CHOICE" = "1" ]; then
    # Desenvolvimento Local
    log_info "Configurando para desenvolvimento local..."
    
    DATABASE_URL="postgresql://postgres:devpassword@localhost:5432/postgres"
    SHADOW_DATABASE_URL="postgresql://postgres:devpassword@localhost:5433/postgres_shadow"
    NODE_ENV="development"
    
    log_info "Configurando Supabase (opcional para desenvolvimento):"
    read -p "NEXT_PUBLIC_SUPABASE_URL (ou Enter para pular): " SUPABASE_URL
    read -p "NEXT_PUBLIC_SUPABASE_ANON_KEY (ou Enter para pular): " SUPABASE_ANON_KEY
    read -p "SUPABASE_SERVICE_ROLE_KEY (ou Enter para pular): " SUPABASE_SERVICE_KEY
    
    cat > "$ENV_FILE" << EOF
# ---- DATABASE (Local - Desenvolvimento) ----
DATABASE_URL="${DATABASE_URL}"
SHADOW_DATABASE_URL="${SHADOW_DATABASE_URL}"

# ---- SUPABASE KEYS ----
${SUPABASE_URL:+NEXT_PUBLIC_SUPABASE_URL="${SUPABASE_URL}"}
${SUPABASE_ANON_KEY:+NEXT_PUBLIC_SUPABASE_ANON_KEY="${SUPABASE_ANON_KEY}"}
${SUPABASE_SERVICE_KEY:+SUPABASE_SERVICE_ROLE_KEY="${SUPABASE_SERVICE_KEY}"}

# ---- ENVIRONMENT ----
NODE_ENV="${NODE_ENV}"
EOF

    log_success "Arquivo .env criado para desenvolvimento local!"
    log_info ""
    log_info "Próximos passos:"
    log_info "  1. Inicie o Docker: ./scripts/docker-db.sh start"
    log_info "  2. Execute: pnpm prisma generate"
    log_info "  3. Execute: pnpm prisma migrate dev"
    
else
    # Produção (Supabase)
    log_info "Configurando para produção (Supabase)..."
    
    read -p "DATABASE_URL (Supabase com pgbouncer): " DATABASE_URL
    read -p "SHADOW_DATABASE_URL (ou Enter para usar o mesmo): " SHADOW_DATABASE_URL
    SHADOW_DATABASE_URL=${SHADOW_DATABASE_URL:-$DATABASE_URL}
    
    read -p "NEXT_PUBLIC_SUPABASE_URL: " SUPABASE_URL
    read -p "NEXT_PUBLIC_SUPABASE_ANON_KEY: " SUPABASE_ANON_KEY
    read -p "SUPABASE_SERVICE_ROLE_KEY: " SUPABASE_SERVICE_KEY
    
    NODE_ENV="production"
    
    cat > "$ENV_FILE" << EOF
# ---- DATABASE (Supabase - Produção) ----
DATABASE_URL="${DATABASE_URL}"
SHADOW_DATABASE_URL="${SHADOW_DATABASE_URL}"

# ---- SUPABASE KEYS ----
NEXT_PUBLIC_SUPABASE_URL="${SUPABASE_URL}"
NEXT_PUBLIC_SUPABASE_ANON_KEY="${SUPABASE_ANON_KEY}"
SUPABASE_SERVICE_ROLE_KEY="${SUPABASE_SERVICE_KEY}"

# ---- ENVIRONMENT ----
NODE_ENV="${NODE_ENV}"
EOF

    log_success "Arquivo .env criado para produção!"
    log_warning "⚠️  Lembre-se de configurar estas variáveis no Vercel Dashboard também!"
fi

log_info "Localização: $ENV_FILE"

