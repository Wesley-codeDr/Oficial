#!/usr/bin/env tsx
/**
 * Migrate tasks from tasks.md files to Vibe Kanban
 * 
 * Usage:
 *   tsx scripts/kanban/migrate-tasks-to-kanban.ts [spec-name]
 * 
 * If spec-name is provided, only migrates that spec.
 * Otherwise, migrates all specs.
 */

import { parseAllTasksMD, parseTasksMD, TaskFromMD, SpecTasks } from './parse-tasks-md';
import { join } from 'path';
import { writeFileSync, mkdirSync, existsSync } from 'fs';

interface KanbanTask {
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  labels: string[];
  dependencies: string[];
  metadata: {
    taskId: string;
    spec: string;
    phase: string;
    files?: string[];
    rawLine?: string;
    lineNumber?: number;
  };
}

/**
 * Convert a task from tasks.md format to Kanban format
 */
function convertToKanbanTask(task: TaskFromMD, spec: string): KanbanTask {
  // Build labels
  const labels: string[] = [
    `spec:${spec}`,
    `phase:${task.phase}`,
  ];
  
  if (task.markers.blocking) {
    labels.push('blocking');
  }
  
  if (task.markers.parallel) {
    labels.push('parallel');
  }
  
  // Determine status
  let status: 'todo' | 'in_progress' | 'done' = 'todo';
  if (task.status === 'done') {
    status = 'done';
  } else if (task.markers.blocking) {
    // Blocking tasks that are pending might be in progress
    status = 'todo';
  }
  
  // Build description with metadata
  let description = task.description;
  if (task.files && task.files.length > 0) {
    description += `\n\n**Files:**\n${task.files.map(f => `- \`${f}\``).join('\n')}`;
  }
  
  if (task.markers.dependencies.length > 0) {
    description += `\n\n**Dependencies:** ${task.markers.dependencies.join(', ')}`;
  }
  
  return {
    title: `${task.id}: ${task.description.split('\n')[0]!.substring(0, 80)}`,
    description,
    status,
    labels,
    dependencies: task.markers.dependencies,
    metadata: {
      taskId: task.id,
      spec,
      phase: task.phase,
      files: task.files,
      rawLine: task.rawLine,
      lineNumber: task.lineNumber,
    },
  };
}

/**
 * Generate Vibe Kanban import format
 * Vibe Kanban uses a JSON format for imports
 */
function generateKanbanImport(tasks: KanbanTask[]): any {
  return {
    version: '1.0',
    tasks: tasks.map(task => ({
      title: task.title,
      description: task.description,
      status: task.status,
      labels: task.labels,
      dependencies: task.dependencies,
      metadata: task.metadata,
    })),
  };
}

/**
 * Generate markdown format for Vibe Kanban (alternative format)
 */
function generateKanbanMarkdown(tasks: KanbanTask[], spec: string): string {
  const lines: string[] = [
    `# ${spec} - Kanban Tasks`,
    '',
    'Generated from tasks.md',
    '',
    '## Tasks',
    '',
  ];
  
  // Group by status
  const byStatus = {
    todo: tasks.filter(t => t.status === 'todo'),
    in_progress: tasks.filter(t => t.status === 'in_progress'),
    done: tasks.filter(t => t.status === 'done'),
  };
  
  if (byStatus.todo.length > 0) {
    lines.push('### To Do', '');
    byStatus.todo.forEach(task => {
      lines.push(`- [ ] ${task.title}`);
      lines.push(`  - Labels: ${task.labels.join(', ')}`);
      if (task.dependencies.length > 0) {
        lines.push(`  - Depends on: ${task.dependencies.join(', ')}`);
      }
      lines.push('');
    });
  }
  
  if (byStatus.in_progress.length > 0) {
    lines.push('### In Progress', '');
    byStatus.in_progress.forEach(task => {
      lines.push(`- [ ] ${task.title}`);
      lines.push(`  - Labels: ${task.labels.join(', ')}`);
      lines.push('');
    });
  }
  
  if (byStatus.done.length > 0) {
    lines.push('### Done', '');
    byStatus.done.forEach(task => {
      lines.push(`- [x] ${task.title}`);
      lines.push('');
    });
  }
  
  return lines.join('\n');
}

/**
 * Main migration function
 */
async function migrateTasks(specName?: string) {
  const rootDir = process.cwd();
  const outputDir = join(rootDir, '.vibe-kanban');
  
  // Ensure output directory exists
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  
  let specs: SpecTasks[];
  
  if (specName) {
    // Migrate specific spec
    const tasksPath = join(rootDir, 'specs', specName, 'tasks.md');
    if (!existsSync(tasksPath)) {
      console.error(`❌ tasks.md not found for spec: ${specName}`);
      process.exit(1);
    }
    const parsed = parseTasksMD(tasksPath);
    specs = [parsed];
  } else {
    // Migrate all specs
    specs = parseAllTasksMD(rootDir);
  }
  
  console.log(`📋 Found ${specs.length} spec(s) to migrate\n`);
  
  const allKanbanTasks: KanbanTask[] = [];
  
  for (const spec of specs) {
    console.log(`📦 Processing: ${spec.spec}`);
    console.log(`   Found ${spec.tasks.length} tasks`);
    
    const kanbanTasks = spec.tasks.map(task => convertToKanbanTask(task, spec.spec));
    allKanbanTasks.push(...kanbanTasks);
    
    // Generate per-spec files
    const specOutputDir = join(outputDir, spec.spec);
    if (!existsSync(specOutputDir)) {
      mkdirSync(specOutputDir, { recursive: true });
    }
    
    // JSON format
    const jsonOutput = generateKanbanImport(kanbanTasks);
    writeFileSync(
      join(specOutputDir, 'kanban-import.json'),
      JSON.stringify(jsonOutput, null, 2)
    );
    
    // Markdown format (for manual import)
    const mdOutput = generateKanbanMarkdown(kanbanTasks, spec.spec);
    writeFileSync(
      join(specOutputDir, 'kanban-tasks.md'),
      mdOutput
    );
    
    // Summary
    const summary = {
      spec: spec.spec,
      totalTasks: spec.tasks.length,
      done: spec.tasks.filter(t => t.status === 'done').length,
      pending: spec.tasks.filter(t => t.status === 'pending').length,
      blocking: spec.tasks.filter(t => t.markers.blocking).length,
      parallel: spec.tasks.filter(t => t.markers.parallel).length,
    };
    
    writeFileSync(
      join(specOutputDir, 'summary.json'),
      JSON.stringify(summary, null, 2)
    );
    
    console.log(`   ✅ Generated files in .vibe-kanban/${spec.spec}/`);
    console.log(`   📊 Done: ${summary.done}, Pending: ${summary.pending}\n`);
  }
  
  // Generate combined import file
  const combinedImport = generateKanbanImport(allKanbanTasks);
  writeFileSync(
    join(outputDir, 'all-tasks-import.json'),
    JSON.stringify(combinedImport, null, 2)
  );
  
  console.log(`\n✨ Migration complete!`);
  console.log(`   Total tasks: ${allKanbanTasks.length}`);
  console.log(`   Output directory: .vibe-kanban/`);
  console.log(`\n📝 Next steps:`);
  console.log(`   1. Review the generated files in .vibe-kanban/`);
  console.log(`   2. Import into Vibe Kanban using the JSON files`);
  console.log(`   3. Or use the markdown files for manual entry`);
}

// CLI
if (require.main === module) {
  const specName = process.argv[2];
  migrateTasks(specName).catch(err => {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  });
}

export { convertToKanbanTask, generateKanbanImport, generateKanbanMarkdown };

