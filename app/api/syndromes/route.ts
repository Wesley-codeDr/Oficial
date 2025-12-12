import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { getUser } from '@/lib/supabase/server';
import { createApiError } from '@/lib/api/errors';

// GET /api/syndromes - List active syndromes
// This endpoint is protected and requires authentication to align with other medical data routes
export async function GET() {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        createApiError('UNAUTHORIZED', 'Unauthorized'),
        { status: 401 }
      );
    }

    const syndromes = await prisma.syndrome.findMany({
      where: { isActive: true },
      orderBy: { orderIndex: 'asc' },
      include: {
        _count: {
          select: { checkboxes: true },
        },
      },
    });

    return NextResponse.json(syndromes);
  } catch (error) {
    console.error('Failed to fetch syndromes:', error);
    return NextResponse.json(
      createApiError('INTERNAL_ERROR', 'Failed to fetch syndromes'),
      { status: 500 }
    );
  }
}
