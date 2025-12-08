// src/app/routes/HomePage.tsx

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SupremeHero } from '@/components/sections/SupremeHero'
import { AgentCardDynasty } from '@/components/cards/AgentCardDynasty'
import { ProductCardDynasty } from '@/components/cards/ProductCardDynasty'
import { CardDynasty } from '@/components/ui/CardDynasty'
import { BadgeDynasty } from '@/components/ui/BadgeDynasty'
import { ButtonDynasty } from '@/components/ui/ButtonDynasty'
import { fadeInUp, staggerContainer } from '@/lib/motion-variants'
import { agentConfigs, ProfessionalType } from '@/services/ai/agents'
import { ArrowRight, Crown, MapPin, Sparkles, Star } from 'lucide-react'

const trendHighlights = [
  {
    id: 't1',
    title: 'Platinum Blonde Era',
    ref: 'Kim Kardashian & Beyoncé',
    description: 'Platinado frio com raiz esfumada e tratamento de reparação total.',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1500&q=80',
    cta: '/consultoria',
  },
  {
    id: 't2',
    title: "Old Money Glow",
    ref: 'Hailey Bieber vibes',
    description: 'Skin minimalista, nail chrome e cabelo com camadas 90s.',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b7f300?auto=format&fit=crop&w=1500&q=80',
    cta: '/agents',
  },
  {
    id: 't3',
    title: 'Viking Beard Revival',
    ref: 'Jason Momoa energy',
    description: 'Barbas densas com mapeamento 3D e nutrição profunda.',
    image: 'https://images.unsplash.com/photo-1587776536140-0f329b3926a9?auto=format&fit=crop&w=1500&q=80',
    cta: '/saloes',
  },
]

const salonHighlights = [
  {
    id: '1',
    name: 'Barbearia Viking Prime',
    address: 'Av. Paulista, 1000 - Jardins',
    rating: 4.9,
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b7f300?auto=format&fit=crop&w=1500&q=80',
  },
  {
    id: '2',
    name: 'Studio Elegance Femme',
    address: 'Rua Oscar Freire, 500',
    rating: 4.8,
    distance: '2.5 km',
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1500&q=80',
  },
  {
    id: '3',
    name: 'Royal Spa & Wellness',
    address: 'Shopping Cidade Jardim',
    rating: 5.0,
    distance: '3.0 km',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1500&q=80',
  },
]

const productHighlights = [
  {
    id: 'p1',
    name: "L'Homme Mystère Eau de Parfum",
    brand: 'Maison Alsham',
    price: 890,
    originalPrice: 1200,
    rating: 5.0,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1594035910387-40f78ee6604a?auto=format&fit=crop&w=1500&q=80',
    badge: 'Exclusivo',
  },
  {
    id: 'p2',
    name: 'Kit L’Oréal Metal Detox',
    brand: 'L’Oréal Professionnel',
    price: 389.9,
    originalPrice: 450,
    rating: 4.9,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=1500&q=80',
    badge: 'Best Seller',
  },
  {
    id: 'p3',
    name: 'Sérum Vitamina C 10 Pure',
    brand: 'DermX Lab',
    price: 189.9,
    rating: 4.8,
    reviews: 410,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1500&q=80',
    badge: 'Novo',
  },
  {
    id: 'p4',
    name: 'Matcha Ceremonial Orgânico',
    brand: 'Zen Rituals',
    price: 120,
    originalPrice: 150,
    rating: 5,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&w=1500&q=80',
    badge: 'Wellness',
  },
]

const agentAvatars: Record<ProfessionalType, string> = {
  barber_x0: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80',
  grooming_master: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  beard_expert: 'https://images.unsplash.com/photo-1552642986-cca00e545ef7?auto=format&fit=crop&w=800&q=80',
  cabeleireira_x0: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
  colorista_x0: 'https://images.unsplash.com/photo-1492106087820-71f171ce6549?auto=format&fit=crop&w=800&q=80',
  hair_stylist_x0: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
  makeup_artist_x0: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&w=800&q=80',
  beauty_guru: 'https://images.unsplash.com/photo-1576426863848-c21f5fc67255?auto=format&fit=crop&w=800&q=80',
  skincare_expert: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80',
  bronze_master: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
  body_sculptor: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80',
  spa_therapist: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80',
  nail_artist_x0: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
  lash_expert: 'https://images.unsplash.com/photo-1587776536140-0f329b3926a9?auto=format&fit=crop&w=800&q=80',
  brow_designer: 'https://images.unsplash.com/photo-1588513874459-663346923e4a?auto=format&fit=crop&w=800&q=80',
  tattoo_artist: 'https://images.unsplash.com/photo-1590246130796-5ba0ef383978?auto=format&fit=crop&w=800&q=80',
  piercing_master: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
  aesthetic_doctor: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
}

export default function HomePage() {
  const agents = Object.values(agentConfigs)

  return (
    <div className="min-h-screen bg-obsidian-950 text-marble-50">
      <SupremeHero />

      {/* Trend Spotlight */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 lg:py-20 border-t border-sovereign-gold-700/10"
      >
        <div className="container mx-auto px-6 lg:px-10 space-y-8">
          <motion.div
            variants={fadeInUp}
            className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <BadgeDynasty className="w-fit">TrendSpotlight™</BadgeDynasty>
              <h2 className="mt-3 font-display text-3xl md:text-4xl text-marble-50">
                Radar global de tendências em tempo real
              </h2>
              <p className="font-body text-marble-50/60 max-w-2xl">
                IA monitora fashion weeks, TikTok e streetstyle para servir os visuais mais quentes em alta definição.
              </p>
            </div>
            <Link to="/live" className="w-fit">
              <ButtonDynasty variant="outline" className="gap-2">
                Ver Live Shopping
                <ArrowRight className="w-4 h-4" />
              </ButtonDynasty>
            </Link>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {trendHighlights.map((trend, idx) => (
              <motion.div key={trend.id} variants={fadeInUp} transition={{ delay: idx * 0.05 }}>
                <CardDynasty className="overflow-hidden h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={trend.image}
                      alt={trend.title}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/30 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <BadgeDynasty variant="gold" className="shadow-lg">
                        Trending
                      </BadgeDynasty>
                      <BadgeDynasty variant="obsidian">{trend.ref}</BadgeDynasty>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="font-display text-xl text-marble-50">{trend.title}</h3>
                    <p className="font-body text-sm text-marble-50/70 leading-relaxed">
                      {trend.description}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-accent text-xs uppercase tracking-[0.2em] text-sovereign-gold-700">
                        Celebrity drop
                      </span>
                      <Link to={trend.cta}>
                        <ButtonDynasty size="sm" variant="gold" className="gap-2">
                          Quero este visual
                          <ArrowRight className="w-4 h-4" />
                        </ButtonDynasty>
                      </Link>
                    </div>
                  </div>
                </CardDynasty>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* MatrixHub - 18 agentes */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 lg:py-20 border-t border-sovereign-gold-700/10 bg-obsidian-950"
      >
        <div className="container mx-auto px-6 lg:px-10 space-y-8">
          <motion.div variants={fadeInUp} className="flex flex-col gap-3">
            <BadgeDynasty className="w-fit gap-2">
              <Sparkles className="w-4 h-4" />
              MatrixHub • 18 agentes IA
            </BadgeDynasty>
            <h2 className="font-display text-3xl md:text-4xl text-marble-50">
              Consultoria suprema para cada detalhe do seu ritual de beleza
            </h2>
            <p className="font-body text-marble-50/60 max-w-3xl">
              Especialistas em cabelo, pele, make, wellness e self-care. Respostas instantâneas, recomendações personalizadas e roteiros prontos para executar hoje.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {agents.map((agent, idx) => {
              const rating = Math.min(5, 4.8 + (idx % 3) * 0.07)
              const consultations = 1800 + idx * 37

              return (
                <motion.div key={agent.id} variants={fadeInUp} transition={{ delay: (idx % 6) * 0.05 }}>
                  <AgentCardDynasty
                    name={agent.name}
                    specialty={agent.title}
                    description={agent.description}
                    avatar={agentAvatars[agent.id]}
                    consultations={consultations}
                    rating={Number(rating.toFixed(1))}
                    available={idx % 4 !== 0}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Booking preview */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 lg:py-20 border-t border-sovereign-gold-700/10 bg-obsidian-950"
      >
        <div className="container mx-auto px-6 lg:px-10 space-y-8">
          <motion.div variants={fadeInUp} className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <BadgeDynasty className="w-fit">Booking • Rede credenciada</BadgeDynasty>
              <h2 className="mt-3 font-display text-3xl md:text-4xl text-marble-50">
                Agende em salões e spas premiados
              </h2>
              <p className="font-body text-marble-50/60 max-w-2xl">
                Slots em tempo real, profissionais verificados e checkout seguro com benefícios Supreme.
              </p>
            </div>
            <Link to="/saloes">
              <ButtonDynasty variant="gold" className="gap-2">
                Abrir agenda completa
                <ArrowRight className="w-4 h-4" />
              </ButtonDynasty>
            </Link>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {salonHighlights.map((salon, idx) => (
              <motion.div key={salon.id} variants={fadeInUp} transition={{ delay: idx * 0.05 }}>
                <CardDynasty className="overflow-hidden h-full">
                  <div className="relative aspect-video">
                    <img
                      src={salon.image}
                      alt={salon.name}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <BadgeDynasty variant="gold" className="gap-2">
                        <Crown className="w-4 h-4" />
                        Supreme Verified
                      </BadgeDynasty>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl text-marble-50">{salon.name}</h3>
                      <span className="font-accent text-xs uppercase tracking-[0.2em] text-sovereign-gold-700">
                        {salon.distance}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-marble-50/70 text-sm">
                      <MapPin className="w-4 h-4 text-sovereign-gold-700" />
                      <span>{salon.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sovereign-gold-700">
                      <Star className="w-4 h-4 fill-sovereign-gold-700" />
                      <span className="font-heading text-lg">{salon.rating}</span>
                      <span className="font-body text-sm text-marble-50/60">Guests Supreme</span>
                    </div>
                    <Link to="/saloes">
                      <ButtonDynasty variant="outline" className="w-full mt-2">
                        Reservar agora
                      </ButtonDynasty>
                    </Link>
                  </div>
                </CardDynasty>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Shop preview */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 lg:py-20 border-t border-sovereign-gold-700/10 bg-obsidian-950"
      >
        <div className="container mx-auto px-6 lg:px-10 space-y-8">
          <motion.div variants={fadeInUp} className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <BadgeDynasty className="w-fit">Boutique Supreme</BadgeDynasty>
              <h2 className="mt-3 font-display text-3xl md:text-4xl text-marble-50">
                Curadoria de luxo pronta para o carrinho
              </h2>
              <p className="font-body text-marble-50/60 max-w-2xl">
                Produtos de alta performance, combos profissionais e lançamentos exclusivos.
              </p>
            </div>
            <Link to="/shop">
              <ButtonDynasty variant="gold" className="gap-2">
                Ver loja completa
                <ArrowRight className="w-4 h-4" />
              </ButtonDynasty>
            </Link>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {productHighlights.map((product, idx) => (
              <motion.div key={product.id} variants={fadeInUp} transition={{ delay: idx * 0.05 }}>
                <ProductCardDynasty {...product} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Brand Spotlight / Sponsored Hero */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 lg:py-20 border-t border-sovereign-gold-700/10 bg-obsidian-950"
      >
        <div className="container mx-auto px-6 lg:px-10">
          <motion.div variants={fadeInUp}>
            <CardDynasty className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950 via-obsidian-900 to-obsidian-950" />
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(214,165,56,0.25),transparent_45%)]" />
              <div className="relative grid gap-10 lg:grid-cols-2 items-center p-8 lg:p-12">
                <div className="space-y-4">
                  <BadgeDynasty className="w-fit">Brand Spotlight</BadgeDynasty>
                  <h3 className="font-display text-3xl md:text-4xl text-marble-50 leading-tight">
                    Alsham Obsidian Dynasty — o renascimento absoluto da beleza de luxo
                  </h3>
                  <p className="font-body text-marble-50/70 leading-relaxed">
                    Powered by Gemini 2.5 Pro + Imagen 4 + Veo 3. Experiências imersivas, consultoria 24/7 e um ecossistema completo que vai do ritual diário ao red carpet.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <BadgeDynasty variant="gold">IA generativa</BadgeDynasty>
                    <BadgeDynasty variant="obsidian">Try-on instantâneo</BadgeDynasty>
                    <BadgeDynasty variant="gold">Concierge Supreme</BadgeDynasty>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Link to="/membership">
                      <ButtonDynasty variant="gold" className="gap-2">
                        Assinar Supreme
                        <ArrowRight className="w-4 h-4" />
                      </ButtonDynasty>
                    </Link>
                    <Link to="/partner">
                      <ButtonDynasty variant="outline" className="gap-2">
                        Ser um parceiro
                        <ArrowRight className="w-4 h-4" />
                      </ButtonDynasty>
                    </Link>
                  </div>
                </div>

                <div className="relative h-full">
                  <div className="grid grid-cols-2 gap-3">
                    {['Try-on AR', 'Consultoria IA', 'Live Shopping', 'Agenda Premium'].map((label, idx) => (
                      <motion.div
                        key={label}
                        variants={fadeInUp}
                        transition={{ delay: 0.1 * idx }}
                        className="p-5 rounded-2xl border border-sovereign-gold-700/20 bg-obsidian-900/50 backdrop-blur-sm"
                      >
                        <span className="font-accent text-xs uppercase tracking-[0.2em] text-sovereign-gold-700">
                          {label}
                        </span>
                        <p className="mt-2 font-heading text-lg text-marble-50">
                          Experiência {idx + 1}
                        </p>
                        <p className="font-body text-sm text-marble-50/60">
                          Fluidez total com o stack Obsidian Dynasty.
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </CardDynasty>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
