import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { AnamnesisPdfData } from '@/lib/validation/anamnese'

type RedFlagData = string[] | { [key: string]: unknown } | null

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Helvetica-Bold',
  },
  subtitle: {
    fontSize: 10,
    color: '#666',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    borderBottomStyle: 'solid',
    paddingBottom: 3,
    fontFamily: 'Helvetica-Bold',
  },
  text: {
    marginBottom: 5,
    textAlign: 'justify',
  },
  boldText: {
    fontFamily: 'Helvetica-Bold',
  },
  redFlagsContainer: {
    backgroundColor: '#fee',
    borderWidth: 1,
    borderColor: '#c00',
    borderStyle: 'solid',
    padding: 10,
    marginBottom: 15,
  },
  redFlagTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#c00',
    marginBottom: 5,
    fontFamily: 'Helvetica-Bold',
  },
  redFlagItem: {
    marginBottom: 3,
    color: '#c00',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 8,
    color: '#666',
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
    borderTopStyle: 'solid',
    paddingTop: 5,
    textAlign: 'center',
  },
  anonymousNote: {
    backgroundColor: '#f5f5f5',
    padding: 8,
    marginBottom: 15,
    fontSize: 10,
  },
})

function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${day}/${month}/${year} ${hours}:${minutes}`
}

interface AnamnesisPdfDocumentProps {
  session: AnamnesisPdfData
}

function extractRedFlags(data: unknown): string[] {
  if (!data) return []
  if (Array.isArray(data)) return data.filter((item): item is string => typeof item === 'string')
  if (typeof data === 'object') {
    const obj = data as Record<string, unknown>
    if (Array.isArray(obj.flags))
      return obj.flags.filter((item): item is string => typeof item === 'string')
  }
  return []
}

export function AnamnesisPdfDocument({ session }: AnamnesisPdfDocumentProps) {
  const createdAt = new Date(session.createdAt)
  const redFlags = extractRedFlags(session.redFlagsDetected)
  const hasRedFlags = redFlags.length > 0

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>ANAMNESE - {session.syndrome.name.toUpperCase()}</Text>
          <Text style={styles.subtitle}>
            Data: {formatDate(createdAt)} | Profissional: {session.user.email}
          </Text>
        </View>

        <View style={styles.anonymousNote}>
          <Text>
            <Text style={styles.boldText}>DOCUMENTO ANÔNIMO</Text> - Sem dados de identificação do
            paciente
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Queixa Principal</Text>
          <Text style={styles.text}>{session.syndrome.name}</Text>
        </View>

        {hasRedFlags && (
          <View style={styles.redFlagsContainer}>
            <Text style={styles.redFlagTitle}>⚠ RED FLAGS DETECTADOS</Text>
            {redFlags.map((flag, index) => (
              <Text key={index} style={styles.redFlagItem}>
                • {flag}
              </Text>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Anamnese</Text>
          <Text style={styles.text}>{session.generatedText || 'Nenhum texto gerado.'}</Text>
        </View>

        <View style={styles.footer}>
          <Text>Gerado por WellWave - Sistema de Anamnese Digital | {formatDate(new Date())}</Text>
          <Text>Documento gerado digitalmente - Requer assinatura manual</Text>
        </View>
      </Page>
    </Document>
  )
}
