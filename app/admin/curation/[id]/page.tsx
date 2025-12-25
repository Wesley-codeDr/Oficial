import { getExtraction } from '@/app/actions/import-actions'
import { ExtractionReview } from '@/components/admin/ExtractionReview'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { ExtractedData } from '@/lib/services/extractionService'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CurationPage({ params }: PageProps) {
  const { id } = await params
  const extraction = await getExtraction(id)

  if (!extraction) {
    notFound()
  }

  // Cast JSON to expected type safely
  const extractedData = extraction.extractedData as ExtractedData

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white p-4 lg:p-8 overflow-hidden">
      <div className="max-w-[1600px] mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/admin/import"
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Curadoria de Conteúdo</h1>
            <p className="text-slate-500 text-sm">
              Baseado em:{' '}
              <span className="font-medium text-slate-700">{extraction.sourceDocument.title}</span>
            </p>
          </div>
        </div>

        {/* Main Editor */}
        <ExtractionReview
          extractionId={extraction.id}
          initialData={extractedData}
          sourceText={extraction.sourceDocument.content}
        />
      </div>
    </div>
  )
}
