// src/components/cards/AgentCardDynasty.tsx

import { CardDynasty } from '@/components/ui/CardDynasty'
import { BadgeDynasty } from '@/components/ui/BadgeDynasty'
import { ButtonDynasty } from '@/components/ui/ButtonDynasty'
import { AgentConfig } from '@/services/ai/agents'
import { Sparkles, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface AgentCardDynastyProps {
  agent: AgentConfig
  priority?: boolean
}

export function AgentCardDynasty({ agent, priority = false }: AgentCardDynastyProps) {
  const navigate = useNavigate()

  const handleSelect = () => {
    navigate(`/consultoria?agent=${agent.id}`)
  }

  return (
    <CardDynasty 
      className="h-full group cursor-pointer overflow-hidden border-sovereign-gold-700/10 hover:border-sovereign-gold-700/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sovereign-gold-700/20"
      onClick={handleSelect}
    >
      <div className="relative aspect-square bg-gradient-to-br from-obsidian-900 to-obsidian-950 overflow-hidden">
        <div className="absolute inset-0 bg-liquid-gold opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
        
        {/* Avatar Placeholder Premium */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-sovereign-gold-700/20 border-4 border-sovereign-gold-700/40 flex items-center justify-center">
            <Sparkles className="w-16 h-16 text-sovereign-gold-600" />
          </div>
        </div>

        {/* Online Indicator */}
        <div className="absolute top-4 right-4">
          <BadgeDynasty variant="gold" className="animate-pulse">
            Online
          </BadgeDynasty>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="text-center">
          <h3 className="font-display text-xl text-white mb-2">
            {agent.name}
          </h3>
          <BadgeDynasty variant="outline" className="text-xs">
            Especialista Premium
          </BadgeDynasty>
        </div>

        <ButtonDynasty 
          variant="gold" 
          className="w-full gap-2"
          onClick={(e) => {
            e.stopPropagation()
            handleSelect()
          }}
        >
          <MessageCircle className="w-4 h-4" />
          Iniciar Consultoria
        </ButtonDynasty>
      </div>
    </CardDynasty>
  )
}
