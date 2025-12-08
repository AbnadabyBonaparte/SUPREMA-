// src/components/MatrixHub.tsx

import { motion } from 'framer-motion'
import { AgentCardDynasty } from '@/components/cards/AgentCardDynasty'
import { agentConfigs } from '@/services/ai/agents'
import { staggerContainer, fadeInUp } from '@/lib/motion-variants'
import { BadgeDynasty } from '@/components/ui/BadgeDynasty'
import { Sparkles } from 'lucide-react'

export default function MatrixHub() {
  return (
    <section className="py-20 px-6 bg-obsidian-950">
      <div className="container mx-auto max-w-7xl">
        {/* Header da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <BadgeDynasty variant="gold" className="mb-4 animate-pulse">
            <Sparkles className="w-4 h-4 mr-2" />
            Sistema de Agentes IA Ativo
          </BadgeDynasty>
          <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
            Matrix Hub — 18 Agentes Especializados
          </h2>
          <p className="text-xl text-marble-50/60 max-w-3xl mx-auto">
            Escolha seu especialista premium. Cada agente utiliza Gemini 2.5 Pro com raciocínio multimodal para consultoria personalizada, técnica e luxuosa.
          </p>
        </motion.div>

        {/* Grid dos Agentes */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {agentConfigs.map((agent, index) => (
            <motion.div key={agent.id} variants={fadeInUp}>
              <AgentCardDynasty
                agent={agent}
                priority={index < 6} // Carrega imagens dos primeiros com prioridade
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-marble-50/60 mb-6">
            Todos os agentes estão online e prontos para sua transformação.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
