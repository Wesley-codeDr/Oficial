'use client'

import { memo } from 'react'

interface MedicalBackgroundProps {
  className?: string
  variant?: 'default' | 'subtle' | 'vibrant'
  showBlobs?: boolean
}

export const MedicalBackground = memo(function MedicalBackground({
  className = '',
  variant = 'default',
  showBlobs = true,
}: MedicalBackgroundProps) {
  const getOpacity = () => {
    switch (variant) {
      case 'subtle':
        return { blob1: 0.15, blob2: 0.12, blob3: 0.1 }
      case 'vibrant':
        return { blob1: 0.35, blob2: 0.3, blob3: 0.25 }
      default:
        return { blob1: 0.25, blob2: 0.2, blob3: 0.15 }
    }
  }

  const opacity = getOpacity()

  return (
    <div
      className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

      {showBlobs && (
        <>
          <div
            className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(0, 135, 255, ${opacity.blob1}) 0%, rgba(0, 135, 255, 0) 70%)`,
              animation: 'blob-float-1 12s ease-in-out infinite',
              filter: 'blur(60px)',
            }}
          />

          <div
            className="absolute top-[40%] right-[-15%] w-[700px] h-[700px] rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(0, 214, 143, ${opacity.blob2}) 0%, rgba(0, 214, 143, 0) 70%)`,
              animation: 'blob-float-2 14s ease-in-out infinite',
              filter: 'blur(70px)',
            }}
          />

          <div
            className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(20, 184, 166, ${opacity.blob3}) 0%, rgba(20, 184, 166, 0) 70%)`,
              animation: 'blob-float-3 16s ease-in-out infinite',
              filter: 'blur(50px)',
            }}
          />

          <div
            className="absolute top-[60%] left-[50%] w-[400px] h-[400px] rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(0, 111, 214, ${opacity.blob3}) 0%, rgba(0, 111, 214, 0) 70%)`,
              animation: 'blob-float-1 18s ease-in-out infinite reverse',
              filter: 'blur(55px)',
            }}
          />
        </>
      )}

      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-white/80 via-white/40 to-transparent dark:from-slate-950/80 dark:via-slate-950/40 dark:to-transparent" />
    </div>
  )
})

export default MedicalBackground
