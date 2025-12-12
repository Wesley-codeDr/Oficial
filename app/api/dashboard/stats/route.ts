import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getUser } from '@/lib/supabase/server'

export async function GET() {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const now = new Date()
    const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000)
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
    const todayStart = new Date(now.setHours(0, 0, 0, 0))

    // Get sessions in last 3 hours (simulating thoracic pain count)
    const recentSessions = await prisma.anamneseSession.count({
      where: {
        startedAt: { gte: threeHoursAgo },
      },
    })

    // Get sessions per hour (last hour)
    const lastHourSessions = await prisma.anamneseSession.count({
      where: {
        startedAt: { gte: oneHourAgo },
      },
    })

    // Get pending reevaluations (sessions without completedAt)
    const pendingReevals = await prisma.anamneseSession.count({
      where: {
        completedAt: null,
        startedAt: { gte: todayStart },
      },
    })

    // Get today's total sessions
    const todaySessions = await prisma.anamneseSession.count({
      where: {
        startedAt: { gte: todayStart },
      },
    })

    // Get red flags detected today
    const sessionsWithRedFlags = await prisma.anamneseSession.findMany({
      where: {
        startedAt: { gte: todayStart },
        NOT: { redFlagsDetected: { equals: [] } },
      },
      select: { redFlagsDetected: true },
    })

    const totalRedFlags = sessionsWithRedFlags.reduce((acc, s) => {
      const flags = s.redFlagsDetected as string[] | null
      return acc + (flags?.length || 0)
    }, 0)

    // Get recent sessions for trend calculation
    const recentStats = await prisma.anamneseSession.groupBy({
      by: ['syndromeId'],
      where: { startedAt: { gte: threeHoursAgo } },
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
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}
