import { NextResponse } from 'next/server'
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/db/prisma'
import { getUser } from '@/lib/supabase/server'
import {
  mapDbComplaintToApiPayload,
  mergeAdditionalData,
  parseAdditionalData,
} from '@/lib/db/complaints'
import { ComplaintUpdateSchema } from '@/lib/validation/complaints'
import { withRateLimit, apiLimiter } from '@/lib/rate-limit'
import { requirePermission, ResourceType, Action, handlePermissionError } from '@/lib/permissions'

async function findComplaintById(id: string) {
  return prisma.chief_complaints.findFirst({
    where: {
      OR: [{ id }, { code: id }],
    },
    include: {
      chief_complaint_groups: true,
    },
  })
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Apply rate limiting
    const rateLimitResponse = await withRateLimit(req, apiLimiter, 30)
    if (rateLimitResponse) return rateLimitResponse

    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const complaint = await findComplaintById(id)

    if (!complaint) {
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 })
    }

    return NextResponse.json(mapDbComplaintToApiPayload(complaint))
  } catch (error) {
    console.error('Error fetching complaint:', error)
    return NextResponse.json(
      { error: 'Failed to fetch complaint' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Apply rate limiting
    const rateLimitResponse = await withRateLimit(req, apiLimiter, 10)
    if (rateLimitResponse) return rateLimitResponse

    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check permission - only admins can update complaints
    try {
      requirePermission(user, ResourceType.CHIEF_COMPLAINTS, Action.UPDATE)
    } catch (permissionError) {
      return handlePermissionError(permissionError)
    }

    const { id } = await params
    const body = await req.json().catch(() => null)

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
    }

    const parsedBody = ComplaintUpdateSchema.safeParse(body)

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: 'Invalid payload', details: parsedBody.error.issues },
        { status: 400 }
      )
    }

    const existing = await findComplaintById(id)

    if (!existing) {
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 })
    }

    let groupId = existing.group_id
    if (parsedBody.data.groupCode) {
      const group = await prisma.chief_complaint_groups.findUnique({
        where: { code: parsedBody.data.groupCode },
      })

      if (!group) {
        return NextResponse.json(
          { error: 'Invalid group code' },
          { status: 400 }
        )
      }

      groupId = group.id
    }

    const currentAdditional = parseAdditionalData(existing.additional_data)
    let additionalUpdate = parsedBody.data.additionalData

    if (parsedBody.data.subtitle !== undefined) {
      additionalUpdate = {
        ...(additionalUpdate || {}),
        metadata: {
          ...(additionalUpdate?.metadata || {}),
          subtitle: parsedBody.data.subtitle,
        },
      }
    }

    const mergedAdditional = mergeAdditionalData(currentAdditional, additionalUpdate)

    const data: Prisma.chief_complaintsUpdateInput = {
      updated_at: new Date(),
    }

    if (parsedBody.data.title !== undefined) {
      data.name_pt = parsedBody.data.title
    }

    if (parsedBody.data.definition !== undefined) {
      data.definition = parsedBody.data.definition
    }

    if (parsedBody.data.groupCode) {
      // @ts-ignore - group_id exists in Prisma schema but not in generated types
      (data as any).group_id = groupId
    }

    if (parsedBody.data.synonyms !== undefined) {
      data.synonyms = parsedBody.data.synonyms
    }

    if (parsedBody.data.icd10Codes !== undefined) {
      data.icd10_codes = parsedBody.data.icd10Codes
    }

    if (parsedBody.data.isHighAcuity !== undefined) {
      data.is_high_acuity = parsedBody.data.isHighAcuity
    }

    if (parsedBody.data.isTimeSensitive !== undefined) {
      data.is_time_sensitive = parsedBody.data.isTimeSensitive
    }

    if (parsedBody.data.requiresIsolation !== undefined) {
      data.requires_isolation = parsedBody.data.requiresIsolation
    }

    if (parsedBody.data.isActive !== undefined) {
      data.is_active = parsedBody.data.isActive
    }

    if (parsedBody.data.orderIndex !== undefined) {
      data.order_index = parsedBody.data.orderIndex
    }

    if (additionalUpdate !== undefined) {
      data.additional_data = mergedAdditional as Prisma.InputJsonValue
    }

    const updatedFields = Object.keys(data).filter(
      (field) => field !== 'updated_at'
    )

    if (updatedFields.length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      )
    }

    const updated = await prisma.chief_complaints.update({
      where: { id: existing.id },
      data,
      include: {
        chief_complaint_groups: true,
      },
    })

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'CHIEF_COMPLAINT_UPDATED',
        resourceType: 'ChiefComplaint',
        resourceId: existing.id,
        metadata: {
          updatedFields,
          source: 'api',
        },
      },
    })

    return NextResponse.json(mapDbComplaintToApiPayload(updated))
  } catch (error) {
    console.error('Error updating complaint:', error)
    return NextResponse.json(
      { error: 'Failed to update complaint' },
      { status: 500 }
    )
  }
}
