/**
 * Type Adapters for WellWave
 *
 * Provides type conversion functions to resolve type mismatches between different parts of the app.
 */

import { KanbanTask, KanbanStatus } from '@/lib/types/medical'
import { NoteBlock } from '@/lib/types/medical'

/**
 * Convert NoteBlock to KanbanTask
 */
export function noteBlockToKanbanTask(noteBlock: NoteBlock): KanbanTask {
  return {
    id: noteBlock.id,
    patientName: 'Paciente Anônimo', // Default value since NoteBlock doesn't have patient info
    age: '--',
    gender: 'F',
    complaint: 'Geral',
    acuity: 'green',
    waitTime: '0min',
    status: 'done' as KanbanStatus,
  }
}

/**
 * Convert array of NoteBlock to array of KanbanTask
 */
export function noteBlocksToKanbanTasks(noteBlocks: NoteBlock[]): KanbanTask[] {
  return noteBlocks.map(noteBlockToKanbanTask)
}

/**
 * Convert KanbanTask to NoteBlock
 */
export function kanbanTaskToNoteBlock(kanbanTask: KanbanTask): NoteBlock {
  return {
    id: kanbanTask.id,
    title: kanbanTask.patientName,
    content: kanbanTask.complaint,
    iconName: 'list',
    alerts: kanbanTask.acuity === 'red' ? ['Alta complexidade'] : undefined,
  }
}

/**
 * Convert array of KanbanTask to array of NoteBlock
 */
export function kanbanTasksToNoteBlocks(kanbanTasks: KanbanTask[]): NoteBlock[] {
  return kanbanTasks.map(kanbanTaskToNoteBlock)
}
