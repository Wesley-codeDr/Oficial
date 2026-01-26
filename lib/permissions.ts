/**
 * Permission System for WellWave
 *
 * Role-based access control (RBAC) for protecting resources and operations.
 */

import { User } from '@supabase/supabase-js'

// Role Definitions
export enum UserRole {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  USER = 'user',
}

export function getUserRole(user: User | null): UserRole {
  if (!user) {
    return UserRole.USER
  }

  const role = user.user_metadata?.role as UserRole
  return Object.values(UserRole).includes(role) ? role : UserRole.USER
}

export function isAdmin(user: User | null): boolean {
  return getUserRole(user) === UserRole.ADMIN
}

export function isDoctor(user: User | null): boolean {
  const role = getUserRole(user)
  return role === UserRole.DOCTOR || role === UserRole.ADMIN
}

// Resource Types
export enum ResourceType {
  ANAMNESE_SESSIONS = 'anamnese_sessions',
  CHAT_CONVERSATIONS = 'chat_conversations',
  CHIEF_COMPLAINTS = 'chief_complaints',
  CHIEF_COMPLAINT_SESSIONS = 'chief_complaint_sessions',
  USERS = 'users',
  SYNDROMES = 'syndromes',
  RED_FLAG_RULES = 'red_flag_rules',
  CHECKBOXES = 'checkboxes',
  AUDIT_LOGS = 'audit_logs',
  CONTENT_EXTRACTIONS = 'content_extractions',
  DRAFT_SYNDROMES = 'draft_syndromes',
}

// Action Types
export enum Action {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
}

// Permission Matrix
const PERMISSION_MATRIX: Record<UserRole, Record<ResourceType, Action[]>> = {
  [UserRole.ADMIN]: {
    [ResourceType.ANAMNESE_SESSIONS]: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE, Action.LIST],
    [ResourceType.CHAT_CONVERSATIONS]: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE, Action.LIST],
    [ResourceType.CHIEF_COMPLAINTS]: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE, Action.LIST],
    [ResourceType.CHIEF_COMPLAINT_SESSIONS]: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE, Action.LIST],
    [ResourceType.USERS]: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE, Action.LIST],
    [ResourceType.SYNDROMES]: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE, Action.LIST],
    [ResourceType.RED_FLAG_RULES]: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE, Action.LIST],
    [ResourceType.CHECKBOXES]: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE, Action.LIST],
    [ResourceType.AUDIT_LOGS]: [Action.READ, Action.LIST],
    [ResourceType.CONTENT_EXTRACTIONS]: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE, Action.LIST],
    [ResourceType.DRAFT_SYNDROMES]: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE, Action.LIST],
  },
  [UserRole.DOCTOR]: {
    [ResourceType.ANAMNESE_SESSIONS]: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE, Action.LIST],
    [ResourceType.CHAT_CONVERSATIONS]: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE, Action.LIST],
    [ResourceType.CHIEF_COMPLAINTS]: [Action.READ, Action.LIST],
    [ResourceType.CHIEF_COMPLAINT_SESSIONS]: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE, Action.LIST],
    [ResourceType.USERS]: [Action.READ],
    [ResourceType.SYNDROMES]: [Action.READ, Action.LIST],
    [ResourceType.RED_FLAG_RULES]: [Action.READ, Action.LIST],
    [ResourceType.CHECKBOXES]: [Action.READ, Action.LIST],
    [ResourceType.AUDIT_LOGS]: [],
    [ResourceType.CONTENT_EXTRACTIONS]: [Action.READ, Action.LIST],
    [ResourceType.DRAFT_SYNDROMES]: [Action.READ, Action.LIST],
  },
  [UserRole.USER]: {
    [ResourceType.ANAMNESE_SESSIONS]: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE, Action.LIST],
    [ResourceType.CHAT_CONVERSATIONS]: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE, Action.LIST],
    [ResourceType.CHIEF_COMPLAINTS]: [Action.READ, Action.LIST],
    [ResourceType.CHIEF_COMPLAINT_SESSIONS]: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE, Action.LIST],
    [ResourceType.USERS]: [],
    [ResourceType.SYNDROMES]: [Action.READ, Action.LIST],
    [ResourceType.RED_FLAG_RULES]: [Action.READ, Action.LIST],
    [ResourceType.CHECKBOXES]: [Action.READ, Action.LIST],
    [ResourceType.AUDIT_LOGS]: [],
    [ResourceType.CONTENT_EXTRACTIONS]: [],
    [ResourceType.DRAFT_SYNDROMES]: [],
  },
}

// Permission Check Functions
export function hasPermission(
  user: User | null,
  resourceType: ResourceType,
  action: Action
): boolean {
  const role = getUserRole(user)
  const permissions = PERMISSION_MATRIX[role]?.[resourceType]
  return permissions?.includes(action) ?? false
}

export function requirePermission(
  user: User | null,
  resourceType: ResourceType,
  action: Action
): void {
  if (!hasPermission(user, resourceType, action)) {
    const role = getUserRole(user)
    throw new Error(`User with role '${role}' does not have permission to '${action}' on '${resourceType}'`)
  }
}

// Ownership Check Functions
export function isOwner(
  user: User | null,
  resource: { user_id?: string; userId?: string } | null
): boolean {
  if (!user || !resource) {
    return false
  }

  const resourceUserId = resource.user_id || resource.userId
  return resourceUserId === user.id
}

export function requireOwnership(
  user: User | null,
  resource: { user_id?: string; userId?: string } | null,
  userIdField: string = 'user_id'
): void {
  if (!user) {
    throw new Error('UNAUTHORIZED')
  }

  if (isAdmin(user)) {
    return
  }

  if (!resource) {
    throw new Error('Resource not found')
  }

  const resourceUserId = resource.user_id || resource.userId
  if (resourceUserId !== user.id) {
    throw new Error(`User does not own this resource`)
  }
}

// Helper Functions
export function handlePermissionError(error: unknown): Response {
  if (error instanceof Error && error.message === 'UNAUTHORIZED') {
    return new Response(
      JSON.stringify({
        error: 'Unauthorized',
        message: 'You must be authenticated to perform this action',
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  if (error instanceof Error && error.message.includes('does not have permission')) {
    return new Response(
      JSON.stringify({
        error: 'Forbidden',
        message: error.message,
      }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  if (error instanceof Error && error.message.includes('does not own this resource')) {
    return new Response(
      JSON.stringify({
        error: 'Forbidden',
        message: error.message,
      }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  return new Response(
    JSON.stringify({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
    }),
    {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}
