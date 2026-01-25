"use client";

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

// --- Animation Variants ---
const cardVariants = {
  front: {
    zIndex: 3,
    scale: 1,
    y: 0,
    opacity: 1,
    rotateX: 0,
    rotateZ: 0,
    filter: 'blur(0px)',
    transition: applePhysics.default
  },
  middle: {
    zIndex: 2,
    ...spatialDepth.inactive,
    transition: applePhysics.spatial
  },
  back: {
    zIndex: 1,
    ...spatialDepth.hidden, // Using hidden because back cards are transition targets
    opacity: 0.4,
    y: -25,
    filter: 'blur(3px)',
    transition: applePhysics.spatial
  },
  exit: (direction: number) => ({
    zIndex: 4,
    x: direction < 0 ? -300 : 300,
    opacity: 0,
    rotateZ: direction < 0 ? -15 : 15,
    transition: { duration: 0.3 }
  }),
  enter: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3 }
  })
};

// --- Component ---
export const GlassTestimonialStack: React.FC<GlassTestimonialStackProps> = ({
  testimonials,
  className = ""
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const isMobile = useIsMobile();

  const totalCards = testimonials.length;

  const handleDragEnd = useCallback((event: React.MouseEvent | React.TouchEvent | React.PointerEvent | globalThis.MouseEvent | globalThis.TouchEvent | globalThis.PointerEvent, info: PanInfo) => {
    // Touch-friendly threshold - easier swipe on mobile
    const threshold = isMobile ? 30 : 50;
    if (info.offset.x > threshold) {
      setDirection(1);
      setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
    } else if (info.offset.x < -threshold) {
      setDirection(-1);
      setActiveIndex((prev) => (prev + 1) % totalCards);
    }
  }, [totalCards, isMobile]);

  const getDisplayIndex = (offset: number) => {
    return (activeIndex + offset + totalCards) % totalCards;
  };

  // We only render 3 cards at a time for performance and stack logic
  const activeCard = testimonials[activeIndex];
  const nextCard = testimonials[getDisplayIndex(1)];
  const nextNextCard = testimonials[getDisplayIndex(2)];

  // Helper to render stars
  const renderStars = (rating: number = 5) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-3 h-3 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}`} 
          />
        ))}
      </div>
    );
  };

  if (!testimonials || testimonials.length === 0) return null;
  if (!activeCard) return null;

  return (
    <div className={`relative w-full max-w-lg mx-auto min-h-[350px] xs:min-h-[380px] sm:min-h-[400px] lg:min-h-[450px] flex items-center justify-center perspective-1000 ${className}`}>
        {/* Background Ambient Glows */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/10 rounded-full blur-[80px] animate-pulse-slow" />
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-[60px]" />
        </div>

        <div className="relative w-full h-full flex items-center justify-center">
            {/* Using a mechanic where we map indices to positions: Front, Middle, Back */}
            {/* To simplify AnimatePresence complexities with stacks, we manually map the visible stack */}
            
            {/* BACK CARD */}
            {testimonials.length > 2 && nextNextCard && (
              <GlassCard 
                key={`back-${nextNextCard.id}`}
                position="back"
              />
            )}

            {/* MIDDLE CARD */}
             {testimonials.length > 1 && nextCard && (
              <GlassCard 
                key={`middle-${nextCard.id}`}
                position="middle"
              />
            )}

            {/* FRONT CARD (Active) */}
            <AnimatePresence initial={false} custom={direction} mode='popLayout'>
               <motion.div
                  key={activeCard.id}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="front"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1} // Feel de borracha elástica típico Apple
                  onDragEnd={handleDragEnd}
                  className="absolute w-full"
                  style={{ touchAction: 'none', cursor: 'grab' }}
                  whileTap={{ cursor: 'grabbing' }}
               >
                   <div className="mx-auto w-[95%] xs:w-[92%] sm:w-[90%] md:w-[85%] lg:w-full max-w-md">
                      <div className="group relative rounded-[32px] xs:rounded-[36px] sm:rounded-[40px] liquid-glass-material liquid-sheen bg-white/60! dark:bg-slate-900/60! liquid-glass-default border-white/40 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-500 glass-texture">

                         {/* Specular Gradient Overlay (Shine) */}
                         <div className="absolute inset-0 bg-linear-to-tr from-white/30 via-transparent to-transparent opacity-50 pointer-events-none" />

                         <div className="p-4 xs:p-5 sm:p-6 md:p-8 relative z-10">
                            {/* Header: User Info & Quote Icon */}
                            <div className="flex items-start justify-between mb-4 xs:mb-5 sm:mb-6">
                               <div className="flex items-center gap-2.5 xs:gap-3 sm:gap-4">
                                  <div
                                    className="w-12 h-12 xs:w-13 xs:h-13 sm:w-14 sm:h-14 rounded-xl xs:rounded-2xl flex items-center justify-center text-white font-bold text-responsive-lg shadow-lg border border-white/20"
                                    style={{ background: activeCard.avatarGradient || 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
                                  >
                                     {activeCard.initials}
                                  </div>
                                  <div>
                                     <h3 className="text-responsive-lg font-black text-slate-900 dark:text-white leading-tight">{activeCard.name}</h3>
                                     <p className="text-responsive-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-0.5">{activeCard.role}</p>
                                  </div>
                               </div>
                               <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                  <Quote className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 fill-current opacity-50" />
                               </div>
                            </div>

                            {/* Quote Body */}
                            <div className="mb-6 xs:mb-7 sm:mb-8 relative">
                               <p className="text-responsive-base leading-relaxed font-medium text-slate-700 dark:text-slate-200">
                                  "{activeCard.quote}"
                               </p>
                            </div>

                            {/* Footer: Tags & Rating */}
                            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 xs:gap-2 pt-4 xs:pt-5 sm:pt-6 border-t border-white/20 dark:border-white/5">
                               <div className="flex flex-wrap gap-1.5 xs:gap-2">
                                  {activeCard.tags?.map((tag, i) => (
                                     <span
                                      key={i}
                                      className={`px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 rounded-full text-responsive-xs font-black uppercase tracking-widest border backdrop-blur-md ${
                                        tag.type === 'featured'
                                        ? 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400'
                                        : 'bg-slate-100/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-400'
                                      }`}
                                     >
                                        {tag.text}
                                     </span>
                                  ))}
                               </div>
                               {renderStars(activeCard.rating)}
                            </div>
                         </div>
                      </div>
                   </div>
               </motion.div>
            </AnimatePresence>

            {/* Pagination Static Visuals */}
            <div className="absolute bottom-4 xs:bottom-2 sm:-bottom-10 left-0 right-0 flex justify-center gap-2 xs:gap-2.5 sm:gap-3">
               {testimonials.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 xs:h-1.5 rounded-full transition-all duration-300 ${
                       idx === activeIndex
                       ? 'w-6 xs:w-7 sm:w-8 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                       : 'w-1 xs:w-1.5 bg-slate-300 dark:bg-slate-700'
                    }`}
                  />
               ))}
            </div>
        </div>
    </div>
  );
};

// Internal Sub-component for Background Cards (Simpler, non-interactive)
const GlassCard = ({ position }: { position: 'middle' | 'back' }) => {
   return (
      <motion.div
        variants={cardVariants}
        initial={position}
        animate={position}
        className="absolute w-full pointer-events-none"
      >
         <div className="mx-auto w-[95%] xs:w-[92%] sm:w-[90%] md:w-[85%] lg:w-full max-w-md opacity-40 grayscale-50 blur-[2px]">
             <div className="rounded-[32px] xs:rounded-[36px] sm:rounded-[40px] liquid-glass-material bg-white/30! dark:bg-slate-900/30! liquid-glass-subtle border-white/10 shadow-none overflow-hidden min-h-[280px] xs:min-h-[300px] sm:min-h-[320px] flex flex-col p-4 xs:p-5 sm:p-6 md:p-8 glass-texture">
                 {/* Skeleton-like structure for depth context */}
                 <div className="flex items-center gap-3 xs:gap-4 mb-4 xs:mb-5 sm:mb-6 opacity-50">
                    <div className="w-12 h-12 xs:w-13 xs:h-13 sm:w-14 sm:h-14 rounded-2xl bg-white/20" />
                    <div className="space-y-2">
                       <div className="w-24 xs:w-28 sm:w-32 h-3 xs:h-3.5 sm:h-4 rounded-full bg-white/20" />
                       <div className="w-16 xs:w-18 sm:w-20 h-1.5 xs:h-2 rounded-full bg-white/10" />
                    </div>
                 </div>
                 <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 opacity-30">
                    <div className="w-full h-2.5 xs:h-3 rounded-full bg-white/20" />
                    <div className="w-full h-2.5 xs:h-3 rounded-full bg-white/20" />
                    <div className="w-2/3 h-2.5 xs:h-3 rounded-full bg-white/20" />
                 </div>
             </div>
         </div>
      </motion.div>
   );
};
