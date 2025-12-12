'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Heart,
} from 'lucide-react'
import { fadeInUp, staggerContainer, staggerChild } from '@/lib/animations/presets'

const footerLinks = {
  produto: [
    { label: 'Funcionalidades', href: '#produto' },
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Preços', href: '#' },
    { label: 'Roadmap', href: '#' },
  ],
  recursos: [
    { label: 'Blog', href: '#blog' },
    { label: 'Artigos Médicos', href: '#artigos' },
    { label: 'Documentação', href: '#' },
    { label: 'API', href: '#' },
  ],
  empresa: [
    { label: 'Sobre nós', href: '#' },
    { label: 'Carreiras', href: '#' },
    { label: 'Contato', href: '#contato' },
    { label: 'Parceiros', href: '#' },
  ],
  legal: [
    { label: 'Privacidade', href: '#' },
    { label: 'Termos de Uso', href: '#' },
    { label: 'Cookies', href: '#' },
    { label: 'LGPD', href: '#' },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Mail, href: 'mailto:contato@wellwave.app', label: 'Email' },
]

export function LandingFooter() {
  return (
    <footer className="relative bg-slate-900 dark:bg-[#0a0a0a] text-white overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Main Footer Content */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="py-16 lg:py-20 grid grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12"
        >
          {/* Brand Column */}
          <motion.div
            variants={staggerChild}
            className="col-span-2"
          >
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <Image
                  src="/wavewell-logo.svg"
                  alt="WellWave"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                WellWave
              </span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-xs leading-relaxed">
              Plataforma de anamnese digital inteligente para pronto-socorro.
              Documentação médica simplificada.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5 text-slate-400" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          <motion.div variants={staggerChild}>
            <h4 className="font-semibold text-white mb-4">Produto</h4>
            <ul className="space-y-3">
              {footerLinks.produto.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={staggerChild}>
            <h4 className="font-semibold text-white mb-4">Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={staggerChild}>
            <h4 className="font-semibold text-white mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={staggerChild}>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} WellWave. Todos os direitos reservados.
            </p>
            <p className="text-slate-500 text-sm flex items-center gap-1">
              Feito com{' '}
              <Heart className="w-4 h-4 text-red-500 fill-red-500" /> para médicos
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}




