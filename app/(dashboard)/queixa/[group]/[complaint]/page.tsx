import { redirect } from 'next/navigation'

/**
 * Complaint Detail Page - DEPRECATED
 *
 * This page has been replaced by the integrated selection flow.
 * Redirects to the main /queixa page.
 */

export default function ComplaintPage() {
  redirect('/queixa')
}
