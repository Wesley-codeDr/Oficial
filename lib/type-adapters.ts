/**
 * Type Adapters for WellWave
 *
 * Provides type conversion functions to resolve type mismatches between different parts of app.
 */

import { KanbanTask as MedicalKanbanTask, KanbanStatus } from '@/lib/types/medical'
import { KanbanTask as GenericKanbanTask, KanbanColumnStatus } from '@/types/kanban'
import { NoteBlock } from '@/lib/types/medical'

/**
 * Convert NoteBlock to Medical KanbanTask
 */
export function noteBlockToMedicalKanbanTask(noteBlock: NoteBlock): MedicalKanbanTask {
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
 * Convert array of NoteBlock to array of Medical KanbanTask
 */
export function noteBlocksToMedicalKanbanTasks(noteBlocks: NoteBlock[]): MedicalKanbanTask[] {
  return noteBlocks.map(noteBlockToMedicalKanbanTask)
}

/**
 * Convert Medical KanbanTask to NoteBlock
 */
export function medicalKanbanTaskToNoteBlock(kanbanTask: MedicalKanbanTask): NoteBlock {
  return {
    id: kanbanTask.id,
    title: kanbanTask.patientName,
    content: kanbanTask.complaint,
    iconName: 'list',
    alerts: kanbanTask.acuity === 'red' ? ['Alta complexidade'] : undefined,
  }
}

/**
 * Convert array of Medical KanbanTask to array of NoteBlock
 */
export function medicalKanbanTasksToNoteBlocks(kanbanTasks: MedicalKanbanTask[]): NoteBlock[] {
  return kanbanTasks.map(medicalKanbanTaskToNoteBlock)
}

/**
 * Convert NoteBlock to Generic KanbanTask
 */
export function noteBlockToGenericKanbanTask(noteBlock: NoteBlock): GenericKanbanTask {
  return {
    id: noteBlock.id,
    title: noteBlock.title || 'Tarefa',
    description: noteBlock.content || '',
    status: 'done' as KanbanColumnStatus,
    priority: 'medium',
    labels: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

/**
 * Convert array of NoteBlock to array of Generic KanbanTask
 */
export function noteBlocksToGenericKanbanTasks(noteBlocks: NoteBlock[]): GenericKanbanTask[] {
  return noteBlocks.map(noteBlockToGenericKanbanTask)
}

/**
 * Convert Generic KanbanTask to NoteBlock
 */
export function genericKanbanTaskToNoteBlock(kanbanTask: GenericKanbanTask): NoteBlock {
  return {
    id: kanbanTask.id,
    title: kanbanTask.title,
    content: kanbanTask.description || '',
    iconName: 'list',
    alerts: kanbanTask.priority === 'high' || kanbanTask.priority === 'critical' ? ['Alta prioridade'] : undefined,
  }
}

/**
 * Convert array of Generic KanbanTask to array of NoteBlock
 */
export function genericKanbanTasksToNoteBlocks(kanbanTasks: GenericKanbanTask[]): NoteBlock[] {
  return kanbanTasks.map(genericKanbanTaskToNoteBlock)
}

/**
 * Convert Medical KanbanTask to Generic KanbanTask
 */
export function medicalKanbanTaskToGenericKanbanTask(kanbanTask: MedicalKanbanTask): GenericKanbanTask {
  return {
    id: kanbanTask.id,
    title: kanbanTask.patientName,
    description: kanbanTask.complaint,
    status: kanbanTask.status === 'exam' ? 'in_progress' : kanbanTask.status === 'wait' ? 'todo' : kanbanTask.status === 'reval' ? 'review' : kanbanTask.status === 'done' ? 'done' : 'backlog',
    priority: kanbanTask.acuity === 'red' ? 'critical' : kanbanTask.acuity === 'orange' ? 'high' : kanbanTask.acuity === 'yellow' ? 'medium' : 'low',
    labels: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

/**
 * Convert array of Medical KanbanTask to array of Generic KanbanTask
 */
export function medicalKanbanTasksToGenericKanbanTasks(kanbanTasks: MedicalKanbanTask[]): GenericKanbanTask[] {
  return kanbanTasks.map(medicalKanbanTaskToGenericKanbanTask)
}

/**
 * Convert Generic KanbanTask to Medical KanbanTask
 */
export function genericKanbanTaskToMedicalKanbanTask(kanbanTask: GenericKanbanTask): MedicalKanbanTask {
  return {
    id: kanbanTask.id,
    patientName: kanbanTask.title,
    age: '--',
    gender: 'F',
    complaint: kanbanTask.description || '',
    acuity: kanbanTask.priority === 'critical' ? 'red' : kanbanTask.priority === 'high' ? 'orange' : kanbanTask.priority === 'medium' ? 'yellow' : 'green',
    waitTime: '0min',
    status: kanbanTask.status === 'in_progress' ? 'exam' : kanbanTask.status === 'todo' ? 'wait' : kanbanTask.status === 'review' ? 'reval' : 'done',
  }
}

/**
 * Convert array of Generic KanbanTask to array of Medical KanbanTask
 */
export function genericKanbanTasksToMedicalKanbanTasks(kanbanTasks: GenericKanbanTask[]): MedicalKanbanTask[] {
  return kanbanTasks.map(genericKanbanTaskToMedicalKanbanTask)
}

// Legacy aliases for backward compatibility
export const noteBlockToKanbanTask = noteBlockToMedicalKanbanTask
export const noteBlocksToKanbanTasks = noteBlocksToMedicalKanbanTasks
export const kanbanTaskToNoteBlock = medicalKanbanTaskToNoteBlock
export const kanbanTasksToNoteBlocks = medicalKanbanTasksToNoteBlocks
