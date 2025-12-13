'use client'

import {
  LandingHeader,
  HeroSection,
  ValueCards,
  HowItWorks,
  ProductEvolution,
  BlogSection,
  TechStack,
  ContactSection,
  LandingFooter,
} from '@/components/landing'

/**
 * WellWave Landing Page
 * 
 * Apple 2025 Style Institutional Landing Page
 * Premium, clean, and professional design for HealthTech platform.
 */
export default function Home() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-[#0a0a0a] overflow-x-hidden">
      {/* Navigation Header */}
      <LandingHeader />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Value Proposition Cards */}
        <ValueCards />

        {/* How It Works - Timeline */}
        <HowItWorks />

        {/* Product Evolution Section */}
        <ProductEvolution />

        {/* Blog & Medical Articles */}
        <BlogSection />

        {/* Tech Stack */}
        <TechStack />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  )
}
