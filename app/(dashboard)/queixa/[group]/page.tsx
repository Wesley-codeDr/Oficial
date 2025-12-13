import { redirect } from 'next/navigation'

/**
 * Group Complaints Page - DEPRECATED
 *
 * This page has been replaced by the integrated selection flow.
 * Redirects to the main /queixa page.
 */

export default function GroupPage() {
  redirect('/queixa')
}
