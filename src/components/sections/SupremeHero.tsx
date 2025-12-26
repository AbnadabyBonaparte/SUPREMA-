// src/components/sections/SupremeHero.tsx

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function SupremeHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian-950"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-obsidian-grain opacity-10" />
      
      {/* Animated Gold Gradient */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gold-radial blur-[120px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-sovereign-gold-700 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 container mx-auto px-6 lg:px-8 pt-32 pb-20"
      >
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge Announcement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <Badge variant="gold" className="gap-2 px-4 py-2">
              <Sparkles className="w-3 h-3" />
              <span>Powered by Gemini 2.5 Pro + Imagen 4 + Veo 3</span>
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-dynasty-hero text-marble-50 mb-6"
          >
            O futuro da beleza
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-sovereign-gold-700 via-sovereign-gold-500 to-sovereign-gold-700 bg-clip-text text-transparent">
                é inteligente
              </span>
              <motion.span
                className="absolute inset-0 bg-liquid-gold blur-2xl opacity-30"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-dynasty-body text-marble-50/70 mb-12 max-w-3xl mx-auto"
          >
            18 agentes IA especializados. Try-on virtual em tempo real. 
            Experiências de luxo absolutamente personalizadas.
            <br />
            Bem-vindo ao maior ecossistema de Beauty Tech do planeta.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/agents">
              <Button variant="gold" size="xl" className="group">
                Começar Consultoria IA
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Button variant="outline" size="xl" className="group">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Ver Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { number: '18', label: 'Agentes IA Especialistas' },
              { number: '10K+', label: 'Produtos Curados' },
              { number: '99.8%', label: 'Satisfação Premium' },
            ].map((stat, idx) => (
              <div key={idx} className="relative group">
                <motion.div
                  className="absolute inset-0 bg-liquid-gold/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="relative p-6 rounded-2xl border border-sovereign-gold-700/20 bg-obsidian-900/30 backdrop-blur-sm">
                  <div className="font-display text-4xl text-sovereign-gold-700 mb-2">
                    {stat.number}
                  </div>
                  <div className="font-body text-sm text-marble-50/60">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-sovereign-gold-700/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-sovereign-gold-700 rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian-950 to-transparent" />
    </section>
  )
}
