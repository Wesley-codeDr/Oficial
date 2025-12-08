#!/bin/bash
# Script para gerenciar o banco de dados Docker local

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common.sh"

PROJECT_ROOT=$(get_project_root)

cd "$PROJECT_ROOT"

case "${1:-}" in
  start|up)
    log_info "Iniciando containers PostgreSQL..."
    docker-compose up -d
    log_success "Containers iniciados!"
    log_info "Aguardando banco de dados ficar pronto..."
    sleep 3
    log_info "Banco de dados pronto!"
    log_info "DATABASE_URL: postgresql://postgres:devpassword@localhost:5432/postgres"
    log_info "SHADOW_DATABASE_URL: postgresql://postgres:devpassword@localhost:5433/postgres_shadow"
    ;;
  stop|down)
    log_info "Parando containers PostgreSQL..."
    docker-compose down
    log_success "Containers parados!"
    ;;
  restart)
    log_info "Reiniciando containers PostgreSQL..."
    docker-compose restart
    log_success "Containers reiniciados!"
    ;;
  logs)
    docker-compose logs -f postgres
    ;;
  status)
    log_info "Status dos containers:"
    docker-compose ps
    ;;
  reset)
    log_warning "Isso irá APAGAR todos os dados dos bancos locais!"
    read -p "Tem certeza? (s/N): " -r response
    if [[ "$response" =~ ^[Ss]$ ]]; then
      log_info "Parando e removendo containers e volumes..."
      docker-compose down -v
      log_success "Bancos de dados resetados!"
      log_info "Execute 'docker-db.sh start' para recriar os containers."
    else
      log_info "Operação cancelada."
    fi
    ;;
  *)
    echo "Uso: $0 {start|stop|restart|logs|status|reset}"
    echo ""
    echo "Comandos:"
    echo "  start   - Inicia os containers PostgreSQL"
    echo "  stop    - Para os containers"
    echo "  restart - Reinicia os containers"
    echo "  logs    - Mostra logs do PostgreSQL"
    echo "  status  - Mostra status dos containers"
    echo "  reset   - Remove containers e volumes (apaga dados)"
    exit 1
    ;;
esac

