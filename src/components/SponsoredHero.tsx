import { ButtonDynasty } from '@/components/ui/ButtonDynasty'

export default function SponsoredHero() {
    return (
        <section className="relative h-96 bg-gradient-to-br from-obsidian-950 to-obsidian-900 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                <h2 className="text-4xl md:text-5xl font-display text-white mb-6">Parcerias Exclusivas</h2>
                <p className="text-xl text-white/80 mb-8 max-w-2xl">Experiências premium com as maiores marcas de beleza do mundo.</p>
                <ButtonDynasty variant="gold" size="lg">Descubra Parceiros</ButtonDynasty>
            </div>
        </section>
    )
}
