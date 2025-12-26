#!/usr/bin/env tsx
/**
 * CLI principal do sistema de sincronização Obsidian ↔ TypeScript
 *
 * Uso:
 *   npm run sync:pull      - Obsidian → TypeScript
 *   npm run sync:push      - TypeScript → Obsidian
 *   npm run sync:validate  - Validar dados
 *   npm run sync:watch     - Sincronização automática
 */

import chalk from 'chalk';

const command = process.argv[2];

async function main() {
  console.log(chalk.blue('\n🔄 WellWave Sync System\n'));

  switch (command) {
    case 'pull': {
      console.log(chalk.gray('Executando: Obsidian → TypeScript'));
      const { syncObsidianToTS } = await import('./obsidian-to-ts');
      await syncObsidianToTS();
      break;
    }

    case 'push': {
      console.log(chalk.gray('Executando: TypeScript → Obsidian'));
      const { syncTSToObsidian } = await import('./ts-to-obsidian');
      await syncTSToObsidian();
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
      console.log('  npm run sync:pull      - Sincronizar Obsidian → TypeScript');
      console.log('  npm run sync:push      - Sincronizar TypeScript → Obsidian');
      console.log('  npm run sync:validate  - Validar dados');
      console.log('  npm run sync:watch     - Sincronização automática\n');
      break;
  }
}

main().catch(console.error);
