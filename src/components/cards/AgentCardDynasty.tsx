// src/components/cards/AgentCardDynasty.tsx

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { CardDynasty } from '@/components/ui/CardDynasty'
import { ButtonDynasty } from '@/components/ui/ButtonDynasty'
import { BadgeDynasty } from '@/components/ui/BadgeDynasty'

interface AgentCardDynastyProps {
  name: string
  specialty: string
  description: string
  avatar: string
  consultations: number
  rating: number
  available: boolean
}

export function AgentCardDynasty({
  name,
  specialty,
  description,
  avatar,
  consultations,
  rating,
  available
}: AgentCardDynastyProps) {
  return (
    <CardDynasty className="group relative overflow-hidden">
      {/* Glow Effect on Hover */}
      <motion.div
        className="absolute inset-0 bg-gold-radial opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1.2 }}
      />

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-sovereign-gold-700/30">
              <img
                src={avatar}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            {available && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-noir-600 border-2 border-obsidian-900 rounded-full animate-pulse" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-heading text-xl text-marble-50">
                {name}
              </h3>
              <BadgeDynasty variant="gold" className="gap-1">
                <Sparkles className="w-3 h-3" />
                {rating}
              </BadgeDynasty>
            </div>
            <p className="font-accent text-sm text-sovereign-gold-700">
              {specialty}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="font-body text-sm text-marble-50/70 mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-sovereign-gold-700/10">
          <div>
            <div className="font-heading text-lg text-marble-50">
              {consultations.toLocaleString()}+
            </div>
            <div className="font-body text-xs text-marble-50/60">
              Consultorias
            </div>
          </div>
          <div className="w-px h-10 bg-sovereign-gold-700/20" />
          <div>
            <div className="font-heading text-lg text-marble-50">
              {available ? 'Online' : 'Offline'}
            </div>
            <div className="font-body text-xs text-marble-50/60">
              Status
            </div>
          </div>
        </div>

        {/* CTA */}
        <ButtonDynasty 
          variant="gold" 
          className="w-full group/btn"
          size="lg"
        >
          Iniciar Consultoria
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </ButtonDynasty>
      </div>
    </CardDynasty>
  )
}
