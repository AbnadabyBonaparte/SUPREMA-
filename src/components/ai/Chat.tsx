// src/components/ai/Chat.tsx

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { aiService } from '@/services/ai'
import { fadeInUp } from '@/lib/motion-variants'
import { Send, Bot, User } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await aiService.chatWithGemini([...messages, userMessage])
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Erro na resposta. Tente novamente.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-20 px-6 bg-obsidian-950 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-12">
          <Badge variant="gold" className="mb-4">
            Chat com Grounding Gemini
          </Badge>
          <h2 className="text-4xl font-display text-white">
            Converse com a Inteligência Suprema
          </h2>
        </motion.div>

        <Card className="h-96 md:h-full flex flex-col bg-obsidian-900/50 border-sovereign-gold-700/20">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 && (
              <p className="text-center text-marble-50/60 mt-20">
                Inicie uma conversa. Gemini com grounding está pronto.
              </p>
            )}
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={msg.role === 'user' ? 'ml-auto max-w-md' : 'mr-auto max-w-md'}
              >
                <div className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-full bg-sovereign-gold-700/20 flex items-center justify-center">
                    {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>
                  <div className="bg-obsidian-800/50 px-4 py-3 rounded-2xl">
                    <p className="text-marble-50">{msg.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="text-center text-marble-50/60">Pensando...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 border-t border-sovereign-gold-700/20">
            <div className="flex gap-3">
              <Input
                placeholder="Digite sua mensagem..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button variant="gold" onClick={handleSend} disabled={isLoading}>
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
