// src/components/ai/GlobalAssistant.tsx
// AURA — Assistente Global com IA Real (Etapa 1 Completa)

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sparkles, X, Send, Loader2, AlertCircle } from 'lucide-react'
import { Z_INDEX } from '@/lib/z-index'
import { cn } from '@/lib/utils'
import { aiService, type ChatMessage } from '@/services/ai'

const AURA_HISTORY_KEY = 'aura_history'
const AURA_AGENT_ID = 'aura_x0' // Agente padrão da AURA (pode ser customizado)

export function GlobalAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Carregar histórico do localStorage ao montar
  useEffect(() => {
    const savedHistory = localStorage.getItem(AURA_HISTORY_KEY)
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory) as ChatMessage[]
        setMessages(parsed)
      } catch (err) {
        console.error('Erro ao carregar histórico da AURA:', err)
      }
    }
  }, [])

  // Salvar histórico no localStorage sempre que mudar
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(AURA_HISTORY_KEY, JSON.stringify(messages))
    }
  }, [messages])

  // Auto-scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Focar input quando abrir modal
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
    }

    // Adicionar mensagem do usuário imediatamente
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setError(null)
    setIsLoading(true)

    try {
      // Usar aiService.chatWithGemini com histórico completo
      const history: ChatMessage[] = [...messages, userMessage]
      const response = await aiService.chatWithGemini(history)

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (err: any) {
      console.error('Erro ao obter resposta da AURA:', err)
      setError(err.message || 'Erro ao conectar com a IA. Tente novamente.')
      
      // Adicionar mensagem de erro
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro. Por favor, tente novamente.',
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleRetry = () => {
    setError(null)
    if (messages.length > 0) {
      // Remover última mensagem (erro) e tentar novamente
      const lastUserMessage = messages.filter(m => m.role === 'user').pop()
      if (lastUserMessage) {
        setMessages(prev => prev.slice(0, -1))
        setInput(lastUserMessage.content)
        setTimeout(() => handleSend(), 100)
      }
    }
  }

  const clearHistory = () => {
    setMessages([])
    localStorage.removeItem(AURA_HISTORY_KEY)
  }

  return (
    <>
      {/* Botão Flutuante */}
      <motion.button
        className={cn(
          "fixed bottom-8 right-8 w-16 h-16 rounded-full bg-liquid-gold shadow-2xl shadow-sovereign-gold-700/50 flex items-center justify-center hover:scale-110 transition-all duration-300 z-50",
          Z_INDEX.header
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
        aria-label="Abrir AURA"
      >
        <Sparkles className="w-8 h-8 text-obsidian-950" />
        {messages.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-ruby-600 rounded-full flex items-center justify-center text-xs text-white font-bold">
            {messages.filter(m => m.role === 'user').length}
          </span>
        )}
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
            <Card className="h-[600px] flex flex-col bg-obsidian-900/95 border-sovereign-gold-700/30 backdrop-blur-xl shadow-2xl">
              {/* Header */}
              <div className="p-4 border-b border-sovereign-gold-700/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-sovereign-gold-600 animate-pulse" />
                  <div>
                    <h3 className="font-display text-lg text-white">AURA — Sua Assistente</h3>
                    <p className="text-xs text-marble-50/50">Powered by AI</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {messages.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearHistory}
                      className="text-xs text-marble-50/60 hover:text-marble-50"
                    >
                      Limpar
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Área de Mensagens */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.length === 0 && (
                  <div className="text-center mt-8 space-y-4">
                    <Sparkles className="w-12 h-12 text-sovereign-gold-600 mx-auto animate-pulse" />
                    <p className="text-marble-50/80 text-lg font-display">
                      Olá! Sou AURA, sua assistente premium.
                    </p>
                    <p className="text-marble-50/60 text-sm">
                      Como posso ajudar na sua transformação hoje?
                    </p>
                  </div>
                )}

                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex gap-3",
                      msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      msg.role === 'user'
                        ? 'bg-sovereign-gold-700/30'
                        : 'bg-sovereign-gold-700/20'
                    )}>
                      {msg.role === 'user' ? (
                        <span className="text-xs font-bold text-sovereign-gold-600">V</span>
                      ) : (
                        <Sparkles className="w-4 h-4 text-sovereign-gold-600" />
                      )}
                    </div>
                    <div className={cn(
                      "max-w-[75%] rounded-2xl px-4 py-2",
                      msg.role === 'user'
                        ? 'bg-sovereign-gold-700/20 text-marble-50'
                        : 'bg-obsidian-800/50 text-marble-50'
                    )}>
                      <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-sovereign-gold-700/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-sovereign-gold-600" />
                    </div>
                    <div className="bg-obsidian-800/50 rounded-2xl px-4 py-2">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-sovereign-gold-600" />
                        <p className="text-sm text-marble-50/60">AURA está pensando...</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-ruby-900/30 border border-ruby-700/40 rounded-xl p-4 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-ruby-500" />
                      <p className="text-sm text-ruby-400 font-semibold">Erro</p>
                    </div>
                    <p className="text-xs text-marble-50/70">{error}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRetry}
                      className="mt-2 text-xs"
                    >
                      Tentar novamente
                    </Button>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-sovereign-gold-700/20">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Pergunte qualquer coisa..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-obsidian-800 border border-sovereign-gold-700/30 rounded-full text-marble-50 placeholder:text-marble-50/40 focus:outline-none focus:border-sovereign-gold-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  />
                  <Button
                    variant="gold"
                    size="icon"
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-marble-50/40 mt-2 text-center">
                  Pressione Enter para enviar
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
