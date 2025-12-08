import { CardDynasty } from '@/components/ui/CardDynasty'
import { BadgeDynasty } from '@/components/ui/BadgeDynasty'

export default function MatrixHub() {
    return (
        <section className="py-20 px-6">
            <CardDynasty className="p-12 text-center bg-obsidian-950/90 border-sovereign-gold-700/20">
                <BadgeDynasty variant="gold" className="mb-6">Sistema de Agentes IA</BadgeDynasty>
                <h2 className="text-3xl font-display text-white mb-4">Matrix Hub — 18 Agentes Especializados</h2>
                <p className="text-white/60">Integração Gemini em progresso. Em breve: Consultoria Multimodal Completa.</p>
            </CardDynasty>
        </section>
    )
}
