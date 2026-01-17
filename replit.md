# WellWave - Medical Anamnesis System

## Overview
WellWave is a medical anamnesis generation system designed for emergency rooms. It helps healthcare professionals create structured patient histories efficiently while maintaining CFM and LGPD compliance.

## Tech Stack
- **Framework**: Next.js 16 with Turbopack
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Supabase (optional, gracefully handles missing credentials)
- **Styling**: Tailwind CSS v4 with Apple Liquid Glass 2026 design system
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack Query

## Design System: Apple Liquid Glass 2026

### Medical Color Palette (Color Psychology)
The application uses a carefully crafted color palette based on color psychology principles for healthcare:

**Primary: Medical Blue** - Trust, Professionalism, Reliability
- `#0087FF` (500) - Primary actions
- `#006FD6` (600) - Hover states
- `#0057AD` (700) - Active states
- `#004E92` (800) - Dark accents
- `#003366` (900) - Deep emphasis

**Secondary: Medical Green** - Health, Vitality, Wellness
- `#00D68F` (500) - Success states
- `#00B894` (600) - Health indicators
- `#009975` (700) - Active health
- `#007A5E` (800) - Deep health
- `#005C46` (900) - Emphasis

**Accent: Medical Teal** - Balance, Calm, Serenity
- `#14B8A6` (500) - Accent actions
- `#0D9488` (600) - Secondary accents

### Liquid Glass Effects
- Backdrop blur: 80-100px
- Saturation: 200-220%
- Border: Semi-transparent white (35-55%)
- Inner glow: Inset shadow with white highlight
- Animated blobs: 4 medical-themed gradient blobs with organic movement

## Project Structure
```
app/
  page.tsx          - Main dashboard with liquid glass background
  layout.tsx        - Root layout with gradient background
  globals.css       - CSS variables and theme configuration
  liquid-glass-utils.css - Liquid glass utility classes

components/
  glass/
    GlassPanel.tsx  - Reusable glass panel with variants
  medical/
    Header.tsx      - Patient info capsule
    Sidebar.tsx     - Navigation sidebar
    DashboardView.tsx - Dashboard with patient kanban
  ui/
    button.tsx      - Button variants including medical styles
    medical-background.tsx - Animated blob background

lib/
  types/            - TypeScript type definitions
  data/             - Static data and configurations
  services/         - Business logic services
```

## Running the Project
```bash
npm run dev -- -p 5000 -H 0.0.0.0
```

## Recent Changes
- **2026-01-17**: Applied Apple Liquid Glass 2026 aesthetic with medical color palette
  - Enhanced CSS variables with full medical blue/green scale
  - Updated GlassPanel with 4 variants (default, elevated, medical, subtle)
  - Added animated medical background with 4 gradient blobs
  - Updated Button with medical-specific variants (medical-green, medical-teal, glass-medical)
  - Enhanced Header component with improved glass styling
  - Applied color psychology principles (blue=trust, green=health)

## User Preferences
- Portuguese language (Brazilian) for UI
- Medical terminology compliance
- High contrast for emergency room readability
- Accessible design with proper ARIA labels
