import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { prisma } from '@/lib/db/prisma'
import { getUser } from '@/lib/supabase/server'
import { ExportPdfRequestSchema } from '@/lib/validation/anamnese'
import { AnamnesisPdfDocument } from '@/lib/pdf/anamnesis-template'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: 'Autenticação necessária' }, { status: 401 })
    }

    const body = await request.json()
    const parseResult = ExportPdfRequestSchema.safeParse(body)

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Requisição inválida', details: parseResult.error.issues },
        { status: 400 }
      )
    }

    const { sessionId } = parseResult.data

    const session = await prisma.anamneseSession.findUnique({
      where: { id: sessionId },
      include: {
        syndrome: { select: { name: true } },
        user: { select: { email: true } },
      },
    })

    if (!session) {
      return NextResponse.json({ error: 'Sessão não encontrada' }, { status: 404 })
    }

    if (session.userId !== user.id) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
    }

    if (!session.generatedText) {
      return NextResponse.json(
        { error: 'Anamnese ainda não foi gerada. Por favor, gere primeiro.' },
        { status: 400 }
      )
    }

    const pdfData = {
      id: session.id,
      userId: session.userId,
      syndromeId: session.syndromeId,
      generatedText: session.generatedText,
      redFlagsDetected: session.redFlagsDetected,
      outputMode: session.outputMode,
      createdAt: session.createdAt,
      syndrome: session.syndrome,
      user: session.user,
    }

    const pdfBuffer = await renderToBuffer(AnamnesisPdfDocument({ session: pdfData }))

    const syndromeName = session.syndrome.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')

    const dateStr = new Date().toISOString().split('T')[0]
    const filename = `anamnese-${syndromeName}-${dateStr}.pdf`

    const uint8Array = new Uint8Array(pdfBuffer)

    return new Response(uint8Array, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': uint8Array.length.toString(),
      },
    })
  } catch (error) {
    console.error('Erro ao gerar PDF:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }

    return NextResponse.json({ error: 'Falha ao gerar PDF. Tente novamente.' }, { status: 500 })
  }
}
