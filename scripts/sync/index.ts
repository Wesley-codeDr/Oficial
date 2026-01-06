#!/usr/bin/env tsx
/**
 * CLI principal do sistema de sincronização Obsidian ↔ DB
 *
 * Uso:
 *   npm run sync:pull      - Obsidian → DB
 *   npm run sync:push      - DB → Obsidian
 *   npm run sync:validate  - Validar dados
 *   npm run sync:watch     - Sincronização automática
 */

import chalk from 'chalk';

const command = process.argv[2];

async function main() {
  console.log(chalk.blue('\n🔄 WellWave Sync System\n'));

  switch (command) {
    case 'pull': {
      console.log(chalk.gray('Executando: Obsidian → DB'));
      const { syncObsidianToDB } = await import('./obsidian-to-db');
      await syncObsidianToDB();
      break;
    }

    case 'push': {
      console.log(chalk.gray('Executando: DB → Obsidian'));
      const { syncDBToObsidian } = await import('./db-to-obsidian');
      await syncDBToObsidian();
      break;
    }

    case 'validate': {
      console.log(chalk.gray('Executando: Validação'));
      const { validate } = await import('./validate');
      await validate();
      break;
    }

    case 'watch': {
      console.log(chalk.gray('Executando: File Watcher'));
      const { startWatcher } = await import('./watch');
      await startWatcher();
      break;
    }

    default:
      console.log(chalk.yellow('Comandos disponíveis:\n'));
      console.log('  npm run sync:pull      - Sincronizar Obsidian → DB');
      console.log('  npm run sync:push      - Sincronizar DB → Obsidian');
      console.log('  npm run sync:validate  - Validar dados');
      console.log('  npm run sync:watch     - Sincronização automática\n');
      break;
  }
}

main().catch(console.error);
