import pdfParse from 'pdf-parse'

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const data = await pdfParse(buffer)
    return data.text
  } catch (error) {
    console.error('Error extracting text from PDF:', error)
    throw new Error('Failed to extract text from PDF')
  }
}

export async function extractTextFromTXT(buffer: Buffer): Promise<string> {
  try {
    // Assuming UTF-8 encoding
    return buffer.toString('utf-8')
  } catch (error) {
    console.error('Error extracting text from TXT:', error)
    throw new Error('Failed to extract text from TXT')
  }
}

export async function extractText(file: globalThis.File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())

  if (file.type === 'application/pdf') {
    return extractTextFromPDF(buffer)
  } else if (file.type === 'text/plain') {
    return extractTextFromTXT(buffer)
  } else {
    throw new Error(`Unsupported file type: ${file.type}`)
  }
}
