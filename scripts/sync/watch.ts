#!/usr/bin/env tsx
/**
 * File watcher para sincronização automática bidirecional
 *
 * Uso: npm run sync:watch
 */

import chokidar from 'chokidar';
import path from 'path';
import chalk from 'chalk';
import { PATHS, SYNC_CONFIG } from './utils/config';
import { syncObsidianToDB } from './obsidian-to-db';
import { syncDBToObsidian } from './db-to-obsidian';

// Estado para evitar loops de sincronização
let isSyncing = false;
let pendingSync: 'obsidian' | 'db' | null = null;
let debounceTimer: NodeJS.Timeout | null = null;
let lastDbSyncAt: Date | null = null;

/**
 * Debounce para evitar múltiplas sincronizações
 */
function debounce(fn: () => Promise<void>, delay: number): void {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(async () => {
    debounceTimer = null;
    await fn();
  }, delay);
}

/**
 * Executa sincronização do Obsidian para TypeScript
 */
async function syncFromObsidian(filePaths?: string[]): Promise<void> {
  if (isSyncing) {
    pendingSync = 'obsidian';
    return;
  }

  isSyncing = true;
  console.log(chalk.blue('\n📥 Detectada mudança no Obsidian...'));

  try {
    await syncObsidianToDB({ filePaths });
  } catch (error) {
    console.error(chalk.red('Erro na sincronização:'), error);
  } finally {
    isSyncing = false;

    // Processa sync pendente
    if (pendingSync) {
      const pending = pendingSync;
      pendingSync = null;
      if (pending === 'obsidian') {
        await syncFromObsidian();
      } else {
        await syncFromDatabase();
      }
    }
  }
}

/**
 * Executa sincronização do DB para Obsidian
 */
async function syncFromDatabase(): Promise<void> {
  if (isSyncing) {
    pendingSync = 'db';
    return;
  }

  isSyncing = true;
  console.log(chalk.blue('\n📤 Detectada mudança no DB...'));

  try {
    const result = await syncDBToObsidian({
      since: lastDbSyncAt ?? undefined,
      limit: SYNC_CONFIG.dbBatchSize,
    });
    if (result.lastSyncAt) {
      lastDbSyncAt = new Date(result.lastSyncAt);
    }
  } catch (error) {
    console.error(chalk.red('Erro na sincronização:'), error);
  } finally {
    isSyncing = false;

    // Processa sync pendente
    if (pendingSync) {
      const pending = pendingSync;
      pendingSync = null;
      if (pending === 'db') {
        await syncFromDatabase();
      } else {
        await syncFromObsidian();
      }
    }
  }
}

/**
 * Inicia o file watcher
 */
async function startWatcher(): Promise<void> {
  console.log(chalk.blue('\n🔄 Iniciando sincronização automática bidirecional\n'));
  console.log(chalk.gray('   Monitorando:'));
  console.log(chalk.gray(`   • Obsidian: ${PATHS.queixas}`));
  console.log(chalk.gray(`\n   Debounce: ${SYNC_CONFIG.watchDebounce}ms`));
  console.log(chalk.gray(`   Poll DB: ${SYNC_CONFIG.dbPollInterval}ms`));
  console.log(chalk.yellow('\n   Pressione Ctrl+C para parar\n'));

  // Watcher para o vault do Obsidian
  const obsidianWatcher = chokidar.watch(
    [
      path.join(PATHS.queixas, '**/*.md'),
    ],
    {
      ignored: [
        /(^|[/\\])\../,  // Ignora arquivos ocultos
        /_índice\.md$/,   // Ignora índices
        /00 - Índice/,    // Ignora índice principal
        /-CONFLICT\.md$/, // Ignora arquivos de conflito
      ],
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 500,
        pollInterval: 100,
      },
    }
  );

  // Eventos do Obsidian
  obsidianWatcher
    .on('change', (filePath) => {
      if (isSyncing) return;
      console.log(chalk.cyan(`   📝 Modificado: ${path.basename(filePath)}`));
      debounce(() => syncFromObsidian([filePath]), SYNC_CONFIG.watchDebounce);
    })
    .on('add', (filePath) => {
      if (isSyncing) return;
      console.log(chalk.green(`   ➕ Adicionado: ${path.basename(filePath)}`));
      debounce(() => syncFromObsidian([filePath]), SYNC_CONFIG.watchDebounce);
    })
    .on('unlink', (filePath) => {
      console.log(chalk.yellow(`   ➖ Removido: ${path.basename(filePath)}`));
      // Não sincroniza remoções automaticamente por segurança
    })
    .on('error', (error) => {
      console.error(chalk.red('Erro no watcher Obsidian:'), error);
    });

  // Polling do DB para mudanças
  const dbInterval = setInterval(() => {
    if (isSyncing) return;
    debounce(syncFromDatabase, SYNC_CONFIG.watchDebounce);
  }, SYNC_CONFIG.dbPollInterval);

  // Mantém o processo rodando
  process.on('SIGINT', () => {
    console.log(chalk.yellow('\n\n👋 Encerrando watcher...\n'));
    obsidianWatcher.close();
    clearInterval(dbInterval);
    process.exit(0);
  });

  // Log de status periódico
  setInterval(() => {
    if (!isSyncing) {
      console.log(chalk.gray(`   [${new Date().toLocaleTimeString()}] Monitorando...`));
    }
  }, 60000); // A cada minuto

  await syncFromDatabase();

  console.log(chalk.green('✅ Watcher iniciado! Aguardando mudanças...\n'));
}

// Executa se chamado diretamente
startWatcher().catch(console.error);

export { startWatcher };
