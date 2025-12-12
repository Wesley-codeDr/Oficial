import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { requireApiUser } from '@/lib/api/auth'
import { createApiError } from '@/lib/api/errors'

// Dashboard stats are scoped per-user to ensure data privacy and tenant isolation
export async function GET() {
  try {
    const auth = await requireApiUser()
    if (auth.error) return auth.error
    const { user } = auth

    const now = new Date()
    const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000)
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
    // Create a new Date instance to avoid mutating 'now'
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    // Get sessions in last 3 hours (simulating thoracic pain count) - scoped by user
    const recentSessions = await prisma.anamneseSession.count({
      where: {
        userId: user.id,
        startedAt: { gte: threeHoursAgo },
      },
    })

    // Get sessions per hour (last hour) - scoped by user
    const lastHourSessions = await prisma.anamneseSession.count({
      where: {
        userId: user.id,
        startedAt: { gte: oneHourAgo },
      },
    })

    // Get pending reevaluations (sessions without completedAt) - scoped by user
    const pendingReevals = await prisma.anamneseSession.count({
      where: {
        userId: user.id,
        completedAt: null,
        startedAt: { gte: todayStart },
      },
    })

    // Get today's total sessions - scoped by user
    const todaySessions = await prisma.anamneseSession.count({
      where: {
        userId: user.id,
        startedAt: { gte: todayStart },
      },
    })

    // Get red flags detected today - scoped by user
    const sessionsWithRedFlags = await prisma.anamneseSession.findMany({
      where: {
        userId: user.id,
        startedAt: { gte: todayStart },
        NOT: { redFlagsDetected: { equals: [] } },
      },
      select: { redFlagsDetected: true },
    })

    const totalRedFlags = sessionsWithRedFlags.reduce((acc, s) => {
      const flags = s.redFlagsDetected as string[] | null
      return acc + (flags?.length || 0)
    }, 0)

    // Get recent sessions for trend calculation - scoped by user
    const recentStats = await prisma.anamneseSession.groupBy({
      by: ['syndromeId'],
      where: {
        userId: user.id,
        startedAt: { gte: threeHoursAgo },
      },
      _count: true,
    })

    return NextResponse.json({
      thoracicPainCount: recentSessions,
      patientsPerHour: lastHourSessions,
      pendingReevaluations: pendingReevals,
      todaySessions,
      totalRedFlags,
      syndromeBreakdown: recentStats,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      createApiError('INTERNAL_ERROR', 'Failed to fetch dashboard stats'),
      { status: 500 }
    )
  }
}
