import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET() {
  try {
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
    return NextResponse.json([], { status: 200 });
  }
}
