import { BadgeDynasty } from '@/components/ui/BadgeDynasty'
import { CardDynasty } from '@/components/ui/CardDynasty'

export default function SponsoredHero() {
    return (
        <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-gradient-to-r from-obsidian-900 to-obsidian-800 flex items-center justify-center border border-white/5">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="text-center space-y-2 z-10">
                <BadgeDynasty variant="gold">Partnership</BadgeDynasty>
                <h3 className="text-3xl font-display text-white/50">Brand Spotlight Space</h3>
                <p className="text-white/30">Reserved for premium brand collaborations.</p>
            </div>
        </div>
    )
}
