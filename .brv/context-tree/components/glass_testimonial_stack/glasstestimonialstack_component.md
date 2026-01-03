
## Relations
@styling/tailwind_css

The `GlassTestimonialStack` component implements the visionOS design with glassmorphism, Apple-style physics animations, and an interactive 3D stack. It uses `framer-motion` for animations and `tailwind-css` for styling.

---

```typescript
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { applePhysics, spatialDepth } from '@/lib/design-system/animation-tokens';
import { useIsMobile } from '../../src/hooks/useMediaQuery';

// --- Interfaces ---
export interface Testimonial {
  id: string | number;
  initials: string;
  name: string;
  role: string;
  quote: string;
  tags?: { text: string; type: 'featured' | 'default' }[];
  rating?: number;
  avatarGradient?: string;
}

export interface GlassTestimonialStackProps {
  testimonials: Testimonial[];
  className?: string;
}
```
