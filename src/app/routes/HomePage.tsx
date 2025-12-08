// src/app/routes/HomePage.tsx

import { SupremeHero } from '@/components/sections/SupremeHero'
// Outros imports...

export default function HomePage() {
  return (
    <div className="min-h-screen bg-obsidian-950">
      <SupremeHero />
      
      {/* Resto do conteúdo da HomePage (MatrixHub, TrendSpotlight, etc.) */}
      {/* Exemplo: */}
      <section className="py-24">
        {/* Seu conteúdo existente */}
      </section>
    </div>
  )
}
