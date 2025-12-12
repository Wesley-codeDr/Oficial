'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { appleSpring, fadeInUp } from '@/lib/animations/presets'

const navItems = [
  { label: 'Produto', href: '#produto' },
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'Blog', href: '#blog' },
  { label: 'Artigos Médicos', href: '#artigos' },
  { label: 'Contato', href: '#contato' },
]

export function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...appleSpring, delay: 0.1 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'py-3 bg-white/70 dark:bg-[#1c1c1e]/70 backdrop-blur-2xl border-b border-black/[0.04] dark:border-white/[0.06]'
            : 'py-5 bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-10 h-10"
              >
                <Image
                  src="/logo-wave.png"
                  alt="WellWave"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-slate-900 dark:text-white">Well</span>
                <span className="wordmark-wave-gradient animate-gradient">
                  Wave
                </span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                    'text-slate-600 dark:text-slate-300',
                    'hover:text-slate-900 dark:hover:text-white',
                    'hover:bg-black/[0.03] dark:hover:bg-white/[0.06]'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                asChild
                variant="ghost"
                className="h-10 px-5 rounded-full font-semibold text-slate-700 dark:text-slate-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.08]"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                asChild
                className="h-10 px-5 rounded-full font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-lg"
              >
                <Link href="/login">
                  Começar Agora
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-700 dark:text-slate-200" />
              ) : (
                <Menu className="w-6 h-6 text-slate-700 dark:text-slate-200" />
              )}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={appleSpring}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white/95 dark:bg-[#1c1c1e]/95 backdrop-blur-2xl border-l border-black/[0.06] dark:border-white/[0.08] shadow-2xl"
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-6">
                <nav className="flex-1 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center py-4 text-lg font-medium text-slate-700 dark:text-slate-200 border-b border-black/[0.04] dark:border-white/[0.06]"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="space-y-3 pt-6">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full h-12 rounded-full font-semibold"
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full h-12 rounded-full font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                  >
                    <Link href="/login">
                      Começar Agora
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}




