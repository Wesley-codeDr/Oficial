'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Newspaper,
  BookOpen,
  Clock,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import {
  fadeInUp,
  staggerContainer,
  staggerChild,
  appleSpring,
} from '@/lib/animations/presets'

const blogPosts = [
  {
    title: 'Como a IA está transformando o pronto-socorro',
    excerpt:
      'Descubra como tecnologias de inteligência artificial estão revolucionando o atendimento em emergências médicas.',
    category: 'Inovação',
    readTime: '5 min',
    image: '/blog/ai-healthcare.jpg',
  },
  {
    title: 'O futuro da documentação médica digital',
    excerpt:
      'Análise das tendências e tecnologias que estão moldando o futuro dos registros médicos eletrônicos.',
    category: 'Tecnologia',
    readTime: '7 min',
    image: '/blog/digital-docs.jpg',
  },
  {
    title: 'Construindo o WellWave: bastidores do desenvolvimento',
    excerpt:
      'Uma visão interna de como estamos construindo uma plataforma médica do zero com as melhores práticas.',
    category: 'Produto',
    readTime: '4 min',
    image: '/blog/behind-scenes.jpg',
  },
]

const medicalArticles = [
  {
    title: 'Protocolo de Dor Torácica no PS',
    excerpt:
      'Revisão sistemática dos protocolos de abordagem à dor torácica em ambiente de emergência.',
    category: 'Cardiologia',
    readTime: '12 min',
    isNew: true,
  },
  {
    title: 'Red Flags em Dispneia Aguda',
    excerpt:
      'Identificação de sinais de alarme que indicam urgência no paciente com dispneia.',
    category: 'Pneumologia',
    readTime: '8 min',
    isNew: false,
  },
  {
    title: 'Abdome Agudo: Decisão Cirúrgica',
    excerpt:
      'Critérios baseados em evidência para decisão de intervenção cirúrgica no abdome agudo.',
    category: 'Cirurgia',
    readTime: '10 min',
    isNew: true,
  },
]

export function BlogSection() {
  return (
    <section id="blog" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-950/10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={staggerChild}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6"
          >
            Conteúdo e{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Conhecimento
            </span>
          </motion.h2>
          <motion.p
            variants={staggerChild}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Acompanhe nosso blog e acesse artigos médicos baseados em evidência.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Blog WellWave */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Blog WellWave
                </h3>
                <p className="text-sm text-slate-500">
                  Bastidores, inovação e tecnologia
                </p>
              </div>
            </div>

            <motion.div
              variants={staggerContainer}
              className="space-y-4"
            >
              {blogPosts.map((post, index) => (
                <motion.div key={post.title} variants={staggerChild}>
                  <GlassCard
                    variant="default"
                    padding="none"
                    className="group overflow-hidden"
                    whileHover={{ x: 4 }}
                    transition={appleSpring}
                  >
                    <Link href="#" className="flex items-start gap-4 p-4">
                      {/* Placeholder Image */}
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex-shrink-0 flex items-center justify-center">
                        <Newspaper className="w-8 h-8 text-blue-500/50" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                            {post.category}
                          </span>
                          <span className="text-slate-300 dark:text-slate-600">•</span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <h4 className="font-semibold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-sm text-slate-500 line-clamp-1 mt-0.5">
                          {post.excerpt}
                        </p>
                      </div>

                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                    </Link>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            <Button
              asChild
              variant="outline"
              className="mt-6 rounded-full"
            >
              <Link href="#">
                Ler todos os posts
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>

          {/* Artigos Médicos */}
          <motion.div
            id="artigos"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Artigos Médicos
                </h3>
                <p className="text-sm text-slate-500">
                  Conteúdo técnico e baseado em evidência
                </p>
              </div>
            </div>

            <motion.div
              variants={staggerContainer}
              className="space-y-4"
            >
              {medicalArticles.map((article, index) => (
                <motion.div key={article.title} variants={staggerChild}>
                  <GlassCard
                    variant="default"
                    padding="none"
                    className="group overflow-hidden"
                    whileHover={{ x: 4 }}
                    transition={appleSpring}
                  >
                    <Link href="#" className="flex items-start gap-4 p-4">
                      {/* Icon */}
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex-shrink-0 flex items-center justify-center relative">
                        <BookOpen className="w-8 h-8 text-green-500/50" />
                        {article.isNew && (
                          <span className="absolute -top-1 -right-1 px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-full">
                            NOVO
                          </span>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                            {article.category}
                          </span>
                          <span className="text-slate-300 dark:text-slate-600">•</span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </span>
                        </div>
                        <h4 className="font-semibold text-slate-900 dark:text-white line-clamp-1 group-hover:text-green-600 transition-colors">
                          {article.title}
                        </h4>
                        <p className="text-sm text-slate-500 line-clamp-1 mt-0.5">
                          {article.excerpt}
                        </p>
                      </div>

                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-green-600 transition-colors flex-shrink-0" />
                    </Link>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            <Button
              asChild
              variant="outline"
              className="mt-6 rounded-full"
            >
              <Link href="#">
                Ler todos os artigos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}



