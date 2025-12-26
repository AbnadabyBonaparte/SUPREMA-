// src/components/ai/GlobalAssistant.tsx

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sparkles, X, Send } from 'lucide-react'
import { Z_INDEX } from '@/lib/z-index'
import { cn } from '@/lib/utils'

export function GlobalAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([])

  return (
    <>
      {/* Botão Flutuante */}
      <motion.button
        className={cn(
          "fixed bottom-8 right-8 w-16 h-16 rounded-full bg-liquid-gold shadow-2xl shadow-sovereign-gold-700/50 flex items-center justify-center hover:scale-110 transition-all duration-300",
          Z_INDEX.header
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <Sparkles className="w-8 h-8 text-obsidian-950" />
      </motion.button>

      {/* Painel AURA */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn("fixed bottom-28 right-8 w-96 max-w-[calc(100vw-4rem)]", Z_INDEX.modal)}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <Card className="h-96 flex flex-col bg-obsidian-900/95 border-sovereign-gold-700/30 backdrop-blur-xl">
              <div className="p-4 border-b border-sovereign-gold-700/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-sovereign-gold-600" />
                  <h3 className="font-display text-lg text-white">AURA — Sua Assistente</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex-1 p-4 overflow-y-auto">
                {messages.length === 0 && (
                  <p className="text-marble-50/60 text-center mt-8">
                    Olá! Sou AURA, sua assistente premium. Como posso ajudar na sua transformação hoje?
                  </p>
                )}
              </div>

              <div className="p-4 border-t border-sovereign-gold-700/20">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Pergunte qualquer coisa..."
                    className="flex-1 px-4 py-2 bg-obsidian-800 border border-sovereign-gold-700/30 rounded-full text-marble-50 placeholder:text-marble-50/40 focus:outline-none focus:border-sovereign-gold-700"
                  />
                  <Button variant="gold" size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
