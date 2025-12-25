import { GlassUploadZone } from '@/components/admin/GlassUploadZone'
import { getSourceDocuments } from '@/app/actions/import-actions'
import { GlassCard } from '@/components/ui/glass-card'
import Link from 'next/link'
import { FileText, ArrowRight, CheckCircle, AlertCircle, Clock } from 'lucide-react'

export default async function ImportPage() {
  const documents = await getSourceDocuments()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white p-8">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="glass-heading">Central de Conhecimento</h1>
          <p className="glass-subtitle max-w-2xl mx-auto">
            Importe protocolos e diretrizes médicas para alimentar a inteligência do sistema.
          </p>
        </div>

        {/* Upload Zone */}
        <section>
          <GlassUploadZone />
        </section>

        {/* Recent Imports */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 ml-2">Importações Recentes</h2>

          <div className="grid gap-4">
            {documents.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                Nenhum documento importado ainda.
              </div>
            ) : (
              documents.map((doc) => (
                <GlassCard
                  key={doc.id}
                  className="flex items-center justify-between p-4"
                  hover={true}
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-blue-100 p-3">
                      <FileText className="h-6 w-6 text-primary-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{doc.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>{doc.type}</span>
                        <span>•</span>
                        <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Status Badge */}
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
                      ${
                        doc.status === 'PROCESSED'
                          ? 'bg-green-100 text-green-700'
                          : doc.status === 'ERROR'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {doc.status === 'PROCESSED' && <CheckCircle className="h-4 w-4" />}
                      {doc.status === 'ERROR' && <AlertCircle className="h-4 w-4" />}
                      {doc.status === 'PENDING' && <Clock className="h-4 w-4" />}

                      {doc.status === 'PROCESSED'
                        ? 'Processado'
                        : doc.status === 'ERROR'
                          ? 'Erro'
                          : 'Processando'}
                    </div>

                    {doc.status === 'PROCESSED' && doc.extractions[0] && (
                      <Link
                        href={`/admin/curation/${doc.extractions[0].id}`}
                        className="glass-btn-small"
                      >
                        Revisar Extração
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </GlassCard>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
