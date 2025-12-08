// src/components/ai/SmartConsultation.tsx

import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ButtonDynasty } from '@/components/ui/ButtonDynasty'
import { CardDynasty } from '@/components/ui/CardDynasty'
import { BadgeDynasty } from '@/components/ui/BadgeDynasty'
import { InputDynasty } from '@/components/ui/InputDynasty'
import { TextareaDynasty } from '@/components/ui/textarea'
import { agentConfigs } from '@/services/ai/agents'
import { getStyleRecommendations, playTextAsSpeech } from '@/services/ai/geminiService'
import { fadeInUp, staggerContainer } from '@/lib/motion-variants'
import { Sparkles, Send, Volume2, Camera } from 'lucide-react'

export default function SmartConsultation() {
  const [searchParams] = useSearchParams()
  const agentId = searchParams.get('agent') || agentConfigs[0].id
  const selectedAgent = agentConfigs.find(a => a.id === agentId) || agentConfigs[0]

  const [prompt, setPrompt] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!prompt.trim()) return
    setIsLoading(true)
    setError('')
    try {
      const result = await getStyleRecommendations(prompt, selectedAgent.type as any, images)
      setRecommendations(result)
    } catch (err: any) {
      setError('Erro na consultoria. Tente novamente.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }

  return (
    <section className="py-20 px-6 bg-obsidian-950">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Header Consultoria */}
          <motion.div variants={fadeInUp} className="text-center">
            <BadgeDynasty variant="gold" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Consultoria com {selectedAgent.name}
            </BadgeDynasty>
            <h2 className="text-4xl font-display text-white mb-4">
              Sua Transformação Personalizada
            </h2>
            <p className="text-xl text-marble-50/60">
              Descreva seu desejo ou envie fotos. {selectedAgent.name} analisa multimodalmente e entrega recomendações premium.
            </p>
          </motion.div>

          {/* Formulário */}
          <CardDynasty className="p-8 bg-obsidian-900/50 border-sovereign-gold-700/20">
            <motion.div variants={fadeInUp} className="space-y-6">
              <TextareaDynasty
                placeholder="Descreva o que deseja: corte, maquiagem, skincare, estilo completo..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-32"
              />

              <div className="flex items-center gap-4">
                <InputDynasty
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="flex-1"
                />
                <label className="cursor-pointer">
                  <ButtonDynasty variant="outline" className="gap-2">
                    <Camera className="w-4 h-4" />
                    Enviar Fotos ({images.length})
                  </ButtonDynasty>
                </label>
              </div>

              <ButtonDynasty
                variant="gold"
                size="lg"
                onClick={handleSubmit}
                disabled={isLoading || !prompt.trim()}
                className="w-full"
              >
                {isLoading ? 'Analisando...' : 'Iniciar Consultoria'}
                <Send className="w-5 h-5 ml-2" />
              </ButtonDynasty>

              {error && <p className="text-ruby-600 text-center">{error}</p>}
            </motion.div>
          </CardDynasty>

          {/* Resultados */}
          {recommendations.length > 0 && (
            <motion.div variants={fadeInUp} className="space-y-8">
              <h3 className="text-3xl font-display text-white text-center">
                Recomendações Premium
              </h3>
              {recommendations.map((rec, idx) => (
                <CardDynasty key={idx} className="p-8 bg-obsidian-900/50 border-sovereign-gold-700/20">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-2xl font-display text-sovereign-gold-500 mb-2">
                        {rec.outfitName}
                      </h4>
                      <p className="text-marble-50/80">{rec.description}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-white mb-2">Análise Técnica:</p>
                      <p className="text-marble-50/60">{rec.technicalAnalysis}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <ButtonDynasty variant="outline" onClick={() => playTextAsSpeech(rec.description)}>
                        <Volume2 className="w-4 h-4 mr-2" />
                        Ouvir Recomendação
                      </ButtonDynasty>
                    </div>
                  </div>
                </CardDynasty>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
