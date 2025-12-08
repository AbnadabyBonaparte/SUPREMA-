// src/components/ai/ImageStudio.tsx

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ButtonDynasty } from '@/components/ui/ButtonDynasty'
import { CardDynasty } from '@/components/ui/CardDynasty'
import { InputDynasty } from '@/components/ui/InputDynasty'
import { BadgeDynasty } from '@/components/ui/BadgeDynasty'
import { generateImage, editImage } from '@/services/ai/geminiService'
import { fadeInUp } from '@/lib/motion-variants'
import { Sparkles, Wand2, Image as ImageIcon, Download } from 'lucide-react'

export default function ImageStudio() {
  const [prompt, setPrompt] = useState('')
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [editImageFile, setEditImageFile] = useState<File | null>(null)
  const [editPrompt, setEditPrompt] = useState('')
  const [editedImage, setEditedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setIsGenerating(true)
    try {
      const base64 = await generateImage(prompt, '1:1')
      setGeneratedImage(`data:image/png;base64,${base64}`)
    } catch (err) {
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleEdit = async () => {
    if (!editImageFile || !editPrompt.trim()) return
    setIsEditing(true)
    try {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64 = e.target?.result as string
        const edited = await editImage(editPrompt, { data: base64.split(',')[1], mimeType: 'image/png' })
        setEditedImage(`data:image/png;base64,${edited}`)
      }
      reader.readAsDataURL(editImageFile)
    } catch (err) {
      console.error(err)
    } finally {
      setIsEditing(false)
    }
  }

  return (
    <section className="py-20 px-6 bg-obsidian-950">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-16">
          <BadgeDynasty variant="gold" className="mb-4">
            <Sparkles className="w-5 h-5 mr-2" />
            Image Studio — Imagen 4 + Gemini Editing
          </BadgeDynasty>
          <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
            Gere e Edite Imagens com IA Premium
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Geração */}
          <CardDynasty className="p-8 bg-obsidian-900/50 border-sovereign-gold-700/20">
            <h3 className="text-2xl font-display text-white mb-6 flex items-center gap-3">
              <Wand2 className="w-6 h-6 text-sovereign-gold-600" />
              Geração de Imagens
            </h3>
            <InputDynasty
              placeholder="Descreva a imagem desejada (ex: maquiagem cyberpunk em rosto oval)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mb-6"
            />
            <ButtonDynasty
              variant="gold"
              size="lg"
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full"
            >
              {isGenerating ? 'Gerando...' : 'Criar Imagem'}
            </ButtonDynasty>

            {generatedImage && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
                <img src={generatedImage} alt="Generated" className="w-full rounded-xl shadow-2xl" />
                <ButtonDynasty variant="outline" className="mt-4 w-full gap-2">
                  <Download className="w-4 h-4" />
                  Baixar Imagem
                </ButtonDynasty>
              </motion.div>
            )}
          </CardDynasty>

          {/* Edição */}
          <CardDynasty className="p-8 bg-obsidian-900/50 border-sovereign-gold-700/20">
            <h3 className="text-2xl font-display text-white mb-6 flex items-center gap-3">
              <ImageIcon className="w-6 h-6 text-sovereign-gold-600" />
              Edição de Imagens (Try-On Virtual)
            </h3>
            <InputDynasty
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && setEditImageFile(e.target.files[0])}
              className="mb-4"
            />
            <InputDynasty
              placeholder="Instrução de edição (ex: aplique maquiagem latte, troque cabelo para wolf cut)"
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              className="mb-6"
            />
            <ButtonDynasty
              variant="gold"
              size="lg"
              onClick={handleEdit}
              disabled={isEditing || !editImageFile || !editPrompt.trim()}
              className="w-full"
            >
              {isEditing ? 'Editando...' : 'Editar Imagem'}
            </ButtonDynasty>

            {editedImage && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
                <img src={editedImage} alt="Edited" className="w-full rounded-xl shadow-2xl" />
              </motion.div>
            )}
          </CardDynasty>
        </div>
      </div>
    </section>
  )
}
