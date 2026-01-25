#!/usr/bin/env tsx
/**
 * Bidirectional sync between tasks.md and Vibe Kanban
 * 
 * This script:
 * 1. Reads current state from tasks.md
 * 2. Reads current state from Vibe Kanban (via exported JSON)
 * 3. Syncs status changes bidirectionally
 * 4. Updates tasks.md with status from Kanban
 * 
 * Usage:
 *   tsx scripts/kanban/sync-kanban-tasks.ts [spec-name]
 */

import { parseTasksMD, parseAllTasksMD, SpecTasks, TaskFromMD } from './parse-tasks-md';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

interface KanbanTaskStatus {
  taskId: string;
  spec: string;
  status: 'todo' | 'in_progress' | 'done';
  lastUpdated?: string;
}

/**
 * Load Kanban status from exported JSON
 * This assumes Vibe Kanban exports tasks with their current status
 */
function loadKanbanStatus(kanbanExportPath: string): Map<string, KanbanTaskStatus> {
  const statusMap = new Map<string, KanbanTaskStatus>();
  
  if (!existsSync(kanbanExportPath)) {
    console.warn(`⚠️  Kanban export not found: ${kanbanExportPath}`);
    console.warn(`   Run export from Vibe Kanban first, or skip sync from Kanban`);
    return statusMap;
  }
  
  try {
    const content = readFileSync(kanbanExportPath, 'utf-8');
    const data = JSON.parse(content);
    
    if (data.tasks && Array.isArray(data.tasks)) {
      for (const task of data.tasks) {
        const key = `${task.metadata?.spec || 'unknown'}:${task.metadata?.taskId || task.title}`;
        statusMap.set(key, {
          taskId: task.metadata?.taskId || '',
          spec: task.metadata?.spec || 'unknown',
          status: task.status || 'todo',
          lastUpdated: task.lastUpdated,
        });
      }
    }
  } catch (err) {
    console.error(`❌ Failed to parse Kanban export:`, err);
  }
  
  return statusMap;
}

/**
 * Update tasks.md with status from Kanban
 */
function updateTasksMDStatus(
  tasksPath: string,
  tasks: TaskFromMD[],
  kanbanStatus: Map<string, KanbanTaskStatus>,
  spec: string
): boolean {
  const content = readFileSync(tasksPath, 'utf-8');
  const lines = content.split('\n');
  let changed = false;
  
  for (const task of tasks) {
    const key = `${spec}:${task.id}`;
    const kanbanTask = kanbanStatus.get(key);
    
    if (!kanbanTask) {
      continue;
    }
    
    // Map Kanban status to tasks.md status
    const shouldBeDone = kanbanTask.status === 'done';
    const currentIsDone = task.status === 'done';
    
    if (shouldBeDone !== currentIsDone) {
      // Update the line
      const lineIndex = task.lineNumber - 1;
      if (lineIndex >= 0 && lineIndex < lines.length) {
        const oldLine = lines[lineIndex]!;
        const newLine = oldLine.replace(
          /^-\s+\[([x\s])\]/,
          shouldBeDone ? '- [x]' : '- [ ]'
        );
        
        if (oldLine !== newLine) {
          lines[lineIndex] = newLine;
          changed = true;
          console.log(`   ✅ Updated ${task.id}: ${currentIsDone ? 'done' : 'pending'} → ${shouldBeDone ? 'done' : 'pending'}`);
        }
      }
    }
  }
  
  if (changed) {
    writeFileSync(tasksPath, lines.join('\n'), 'utf-8');
    console.log(`\n   💾 Updated ${tasksPath}`);
  }
  
  return changed;
}

/**
 * Generate Kanban update file from tasks.md changes
 * This can be imported back into Vibe Kanban
 */
function generateKanbanUpdate(
  tasks: TaskFromMD[],
  spec: string,
  outputPath: string
) {
  const updates = tasks.map(task => ({
    taskId: task.id,
    spec,
    status: task.status === 'done' ? 'done' : 'todo',
    description: task.description,
    labels: [
      `spec:${spec}`,
      `phase:${task.phase}`,
      ...(task.markers.blocking ? ['blocking'] : []),
      ...(task.markers.parallel ? ['parallel'] : []),
    ],
    dependencies: task.markers.dependencies,
  }));
  
  const updateFile = {
    version: '1.0',
    updates: updates,
    generatedAt: new Date().toISOString(),
  };
  
  writeFileSync(outputPath, JSON.stringify(updateFile, null, 2));
  console.log(`   📤 Generated Kanban update: ${outputPath}`);
}

/**
 * Main sync function
 */
async function syncTasks(specName?: string, direction: 'both' | 'to-kanban' | 'from-kanban' = 'both') {
  const rootDir = process.cwd();
  const kanbanDir = join(rootDir, '.vibe-kanban');
  
  let specs: SpecTasks[];
  
  if (specName) {
    const tasksPath = join(rootDir, 'specs', specName, 'tasks.md');
    if (!existsSync(tasksPath)) {
      console.error(`❌ tasks.md not found for spec: ${specName}`);
      process.exit(1);
    }
    specs = [parseTasksMD(tasksPath)];
  } else {
    specs = parseAllTasksMD(rootDir);
  }
  
  console.log(`🔄 Syncing ${specs.length} spec(s)\n`);
  
  let totalUpdated = 0;
  
  for (const spec of specs) {
    console.log(`📦 Syncing: ${spec.spec}`);
    
    // Sync from Kanban to tasks.md
    if (direction === 'both' || direction === 'from-kanban') {
      const kanbanExportPath = join(kanbanDir, spec.spec, 'kanban-export.json');
      const kanbanStatus = loadKanbanStatus(kanbanExportPath);
      
      if (kanbanStatus.size > 0) {
        const tasksPath = spec.specPath;
        const updated = updateTasksMDStatus(tasksPath, spec.tasks, kanbanStatus, spec.spec);
        if (updated) {
          totalUpdated++;
        }
      } else {
        console.log(`   ⚠️  No Kanban export found, skipping sync from Kanban`);
        console.log(`   💡 Export from Vibe Kanban to .vibe-kanban/${spec.spec}/kanban-export.json`);
      }
    }
    
    // Sync from tasks.md to Kanban
    if (direction === 'both' || direction === 'to-kanban') {
      const outputPath = join(kanbanDir, spec.spec, 'kanban-update.json');
      if (!existsSync(join(kanbanDir, spec.spec))) {
        const { mkdirSync } = require('fs');
        mkdirSync(join(kanbanDir, spec.spec), { recursive: true });
      }
      generateKanbanUpdate(spec.tasks, spec.spec, outputPath);
    }
  }
  
  console.log(`\n✨ Sync complete!`);
  if (totalUpdated > 0) {
    console.log(`   Updated ${totalUpdated} task file(s)`);
  }
  console.log(`\n📝 Next steps:`);
  console.log(`   1. Review changes in tasks.md files`);
  console.log(`   2. Import kanban-update.json into Vibe Kanban if needed`);
  console.log(`   3. Commit changes to git`);
}

// CLI
if (require.main === module) {
  const specName = process.argv[2];
  const direction = (process.argv[3] as any) || 'both';
  
  if (direction && !['both', 'to-kanban', 'from-kanban'].includes(direction)) {
    console.error(`❌ Invalid direction: ${direction}`);
    console.error(`   Use: both, to-kanban, or from-kanban`);
    process.exit(1);
  }
  
  syncTasks(specName, direction).catch(err => {
    console.error('❌ Sync failed:', err);
    process.exit(1);
  });
}

export { syncTasks, loadKanbanStatus, updateTasksMDStatus };

