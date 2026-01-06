/**
 * PM2 Ecosystem Configuration
 *
 * Gerencia o sync agent como um processo persistente com auto-restart
 *
 * Uso:
 *   pm2 start ecosystem.config.js            # Inicia todos os processos
 *   pm2 start ecosystem.config.js --only sync-agent  # Inicia apenas sync agent
 *   pm2 logs sync-agent                      # Ver logs
 *   pm2 monit                                # Monitor interativo
 *   pm2 restart sync-agent                   # Restart
 *   pm2 stop sync-agent                      # Parar
 *   pm2 delete sync-agent                    # Remover
 *   pm2 save                                 # Salvar configuração
 *   pm2 startup                              # Auto-start no boot
 */

module.exports = {
  apps: [
    {
      // ====================================================================
      // Sync Agent (Obsidian → Database)
      // ====================================================================
      name: 'sync-agent',
      script: 'pnpm',
      interpreter: 'none',

      // Diretório de trabalho
      cwd: './',

      // Argumentos
      args: 'tsx scripts/sync/agent.ts',

      // ====================================================================
      // Restart Policy
      // ====================================================================

      // Auto-restart em caso de crash
      autorestart: true,

      // Delay entre restarts (ms)
      restart_delay: 5000,

      // Máximo de restarts em 1 minuto
      max_restarts: 10,

      // Tempo mínimo de uptime para considerar restart bem-sucedido (ms)
      min_uptime: 10000,

      // Política de restart exponencial
      exp_backoff_restart_delay: 1000,

      // ====================================================================
      // Watch & Reload
      // ====================================================================

      // Não usar watch em produção (pode causar restarts desnecessários)
      watch: false,

      // Se watch habilitado, ignorar estas pastas
      ignore_watch: [
        'node_modules',
        '.git',
        'logs',
        '.next',
        'dist',
        '.obsidian',
      ],

      // ====================================================================
      // Logging
      // ====================================================================

      // Arquivo de log out
      out_file: './logs/sync-agent-out.log',

      // Arquivo de log error
      error_file: './logs/sync-agent-error.log',

      // Combinar logs (out + error)
      combine_logs: true,

      // Merge logs de todas as instâncias
      merge_logs: true,

      // Formato de timestamp nos logs
      time: true,

      // Rotação de logs (requer pm2-logrotate)
      // Instalar com: pm2 install pm2-logrotate
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',

      // ====================================================================
      // Environment Variables
      // ====================================================================

      env: {
        NODE_ENV: 'production',
        SYNC_ON_START: 'true',
        HEALTH_PORT: '3001',
        HEALTH_HOST: 'localhost',
      },

      env_development: {
        NODE_ENV: 'development',
        SYNC_ON_START: 'true',
        HEALTH_PORT: '3001',
        HEALTH_HOST: 'localhost',
      },

      env_test: {
        NODE_ENV: 'test',
        SYNC_ON_START: 'false',
        HEALTH_PORT: '3002',
        HEALTH_HOST: 'localhost',
      },

      // ====================================================================
      // Performance
      // ====================================================================

      // Modo de execução (fork | cluster)
      // Use fork para sync agent (não precisa de cluster)
      exec_mode: 'fork',

      // Número de instâncias (apenas 1 para sync agent)
      instances: 1,

      // Memória máxima (restart se exceder)
      max_memory_restart: '500M',

      // ====================================================================
      // Monitoring & Health
      // ====================================================================

      // Habilitar monitoring
      monitoring: true,

      // Intervalo de health check (ms)
      // PM2 vai checar se o processo está vivo
      kill_timeout: 5000,

      // Listen timeout (ms)
      listen_timeout: 10000,

      // ====================================================================
      // Graceful Shutdown
      // ====================================================================

      // Tempo máximo para graceful shutdown (ms)
      // Aguarda o agent completar sync atual antes de matar
      shutdown_with_message: false,

      // Sinal de shutdown
      kill_signal: 'SIGINT',

      // ====================================================================
      // Advanced
      // ====================================================================

      // Source maps (útil para debugging TypeScript)
      source_map_support: true,

      // Force color nos logs
      force: true,

      // Disable auto-restart durante error
      autorestart: true,

      // ====================================================================
      // Cron Restart (Opcional)
      // ====================================================================

      // Restart diário às 3am (previne memory leaks de longo prazo)
      cron_restart: '0 3 * * *',

      // ====================================================================
      // Post Deploy Hooks (Opcional)
      // ====================================================================

      // Scripts executados após deploy
      post_update: ['npm install', 'npm run build'],

      // ====================================================================
      // Vizualização
      // ====================================================================

      // Nome amigável no monit
      viz: {
        name: 'WellWave Sync Agent',
        description: 'Sincroniza Obsidian vault com PostgreSQL database',
        category: 'backend-services',
      },
    },

    // ====================================================================
    // Health Monitor (Opcional - Standalone Health Server)
    // ====================================================================
    // Descomente se quiser rodar health server separado do agent
    /*
    {
      name: 'health-monitor',
      script: './scripts/sync/health-server.ts',
      interpreter: 'tsx',
      cwd: './',
      autorestart: true,
      restart_delay: 3000,
      max_restarts: 10,
      min_uptime: 5000,
      watch: false,
      out_file: './logs/health-monitor-out.log',
      error_file: './logs/health-monitor-error.log',
      combine_logs: true,
      time: true,
      env: {
        NODE_ENV: 'production',
        HEALTH_PORT: '3001',
        HEALTH_HOST: '0.0.0.0', // Aceita conexões externas
      },
      exec_mode: 'fork',
      instances: 1,
      max_memory_restart: '100M',
      monitoring: true,
    },
    */
  ],

  // ======================================================================
  // Deploy Configuration (Opcional - Para CI/CD)
  // ======================================================================

  deploy: {
    production: {
      user: 'ubuntu',
      host: 'your-server.com',
      ref: 'origin/main',
      repo: 'git@github.com:yourusername/yourrepo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
    },

    staging: {
      user: 'ubuntu',
      host: 'staging-server.com',
      ref: 'origin/develop',
      repo: 'git@github.com:yourusername/yourrepo.git',
      path: '/var/www/staging',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env development',
    },
  },
}
