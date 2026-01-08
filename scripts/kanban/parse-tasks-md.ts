#!/usr/bin/env tsx
/**
 * Parser for tasks.md files
 * Extracts tasks with their metadata (status, markers, dependencies, phase, etc.)
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';

export interface TaskMarker {
  blocking: boolean;
  parallel: boolean;
  dependencies: string[];
}

export interface TaskFromMD {
  id: string;
  description: string;
  status: 'done' | 'pending';
  markers: TaskMarker;
  phase: string;
  spec: string;
  files?: string[];
  rawLine: string;
  lineNumber: number;
}

export interface SpecTasks {
  spec: string;
  specPath: string;
  overview: {
    feature?: string;
    branch?: string;
    plan?: string;
    spec?: string;
    status?: string;
  };
  tasks: TaskFromMD[];
}

/**
 * Parse a single tasks.md file
 */
export function parseTasksMD(filePath: string): SpecTasks {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  // Extract spec name from path
  const specMatch = filePath.match(/specs\/([^/]+)\/tasks\.md/);
  const spec = specMatch ? specMatch[1] : 'unknown';
  
  // Parse overview section
  const overview: SpecTasks['overview'] = {};
  let inOverview = false;
  let currentPhase = '';
  const tasks: TaskFromMD[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Parse overview metadata
    if (line.startsWith('**Feature:**')) {
      overview.feature = line.replace('**Feature:**', '').trim();
    } else if (line.startsWith('**Branch:**')) {
      overview.branch = line.replace('**Branch:**', '').trim();
    } else if (line.startsWith('**Plan:**')) {
      overview.plan = line.replace('**Plan:**', '').trim();
    } else if (line.startsWith('**Spec:**')) {
      overview.spec = line.replace('**Spec:**', '').trim();
    } else if (line.startsWith('**Status:**')) {
      overview.status = line.replace('**Status:**', '').trim();
    }
    
    // Detect phase headers (## Phase X: ...)
    const phaseMatch = line.match(/^##\s+Phase\s+(\d+):\s*(.+?)(?:\s*\[B\])?(?:\s*✅\s*COMPLETE)?$/);
    if (phaseMatch) {
      currentPhase = `Phase ${phaseMatch[1]}`;
      continue;
    }
    
    // Detect phase headers without "Phase" prefix (### Phase: ... or ## Phase 1: ...)
    const phaseMatch2 = line.match(/^##\s+Phase\s*(\d+)/);
    if (phaseMatch2) {
      currentPhase = `Phase ${phaseMatch2[1]}`;
      continue;
    }
    
    // Detect sub-phase headers (### X.Y Section Name)
    const subPhaseMatch = line.match(/^###\s+(\d+\.\d+)\s+(.+)$/);
    if (subPhaseMatch) {
      currentPhase = `Phase ${subPhaseMatch[1]}`;
      continue;
    }
    
    // Parse task lines: - [x] or - [ ] followed by markers and task ID
    const taskMatch = line.match(/^-\s+\[([x\s])\]\s*(.+)$/);
    if (taskMatch) {
      const status = taskMatch[1].trim() === 'x' ? 'done' : 'pending';
      const rest = taskMatch[2];
      
      // Extract markers [B], [P], [D:X]
      const blocking = /\[B\]/.test(rest);
      const parallel = /\[P\]/.test(rest);
      const depMatches = rest.matchAll(/\[D:([^\]]+)\]/g);
      const dependencies = Array.from(depMatches, m => m[1]);
      
      // Extract task ID (T1.1.1, T2.3, etc.)
      const idMatch = rest.match(/\*\*T?(\d+(?:\.\d+)*)\*\*/);
      const taskId = idMatch ? `T${idMatch[1]}` : `T${tasks.length + 1}`;
      
      // Extract description (everything after the ID and markers)
      let description = rest
        .replace(/\[B\]/g, '')
        .replace(/\[P\]/g, '')
        .replace(/\[D:[^\]]+\]/g, '')
        .replace(/\*\*T?\d+(?:\.\d+)*\*\*/g, '')
        .trim();
      
      // Extract file references from description
      const fileMatches = description.matchAll(/`([^`]+)`/g);
      const files = Array.from(fileMatches, m => m[1]).filter(f => 
        f.includes('/') || f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.md')
      );
      
      tasks.push({
        id: taskId,
        description,
        status,
        markers: {
          blocking,
          parallel,
          dependencies,
        },
        phase: currentPhase || 'Unknown',
        spec,
        files: files.length > 0 ? files : undefined,
        rawLine: line,
        lineNumber: i + 1,
      });
    }
  }
  
  return {
    spec,
    specPath: filePath,
    overview,
    tasks,
  };
}

/**
 * Find all tasks.md files in the specs directory
 */
export function findAllTasksMD(rootDir: string = process.cwd()): string[] {
  const specsDir = join(rootDir, 'specs');
  const tasksFiles: string[] = [];
  
  function walkDir(dir: string) {
    const entries = readdirSync(dir);
    
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (entry === 'tasks.md') {
        tasksFiles.push(fullPath);
      }
    }
  }
  
  walkDir(specsDir);
  return tasksFiles;
}

/**
 * Parse all tasks.md files
 */
export function parseAllTasksMD(rootDir: string = process.cwd()): SpecTasks[] {
  const tasksFiles = findAllTasksMD(rootDir);
  return tasksFiles.map(file => parseTasksMD(file));
}

if (require.main === module) {
  // CLI usage
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    // Parse all
    const allTasks = parseAllTasksMD();
    console.log(JSON.stringify(allTasks, null, 2));
  } else {
    // Parse specific file
    const tasks = parseTasksMD(args[0]);
    console.log(JSON.stringify(tasks, null, 2));
  }
}

