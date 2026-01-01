import { MetadataRoute } from 'next'

/**
 * Dynamic Sitemap for WellWave
 *
 * This sitemap includes only public-facing pages.
 * Private routes (dashboard, admin, auth) are excluded
 * as they require authentication and should not be indexed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wellwave.com.br'
  const currentDate = new Date()

  return [
    // Home page - highest priority
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1.0,
    },

    // Authentication pages - low priority, rarely change
    {
      url: `${baseUrl}/login`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },

    // Note: Private routes are NOT included:
    // - /dashboard (requires auth)
    // - /admin (requires auth + admin role)
    // - /anamnese/* (requires auth)
    // - /chat/* (requires auth)
    // - /api/* (backend endpoints)

    // Future: Add public documentation/help pages if created
    // {
    //   url: `${baseUrl}/docs`,
    //   lastModified: currentDate,
    //   changeFrequency: 'weekly',
    //   priority: 0.7,
    // },
  ]
}
