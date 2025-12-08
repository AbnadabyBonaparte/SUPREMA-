# ALSHAM SUPREMA BELEZA — RENASCIMENTO ABSOLUTO (VITE + REACT)

## 🔥 ADAPTAÇÃO COMPLETA PARA VITE + REACT + REACT-ROUTER-DOM

---

## 1. SUPREME HEADER (Vite/React)

```tsx
// src/components/layout/SupremeHeader.tsx

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, X, ShoppingBag, User, Search, Sparkles, 
  Crown, Diamond, Calendar, MessageCircle 
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigationItems = [
  { 
    label: 'Agentes IA', 
    href: '/agents',
    icon: Sparkles,
    description: 'Consultoria inteligente'
  },
  { 
    label: 'Produtos', 
    href: '/shop',
    icon: Diamond,
    description: 'Curadoria exclusiva'
  },
  { 
    label: 'Experiências', 
    href: '/experiences',
    icon: Crown,
    description: 'Salões & Spa premium'
  },
  { 
    label: 'Agendar', 
    href: '/booking',
    icon: Calendar,
    description: 'Seu momento'
  },
]

export function SupremeHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled 
            ? "bg-obsidian-950/95 backdrop-blur-xl border-b border-sovereign-gold-700/20 shadow-obsidian-lift" 
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            
            {/* LOGO */}
            <Link to="/" className="group relative z-10">
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-liquid-gold opacity-0 blur-xl group-hover:opacity-50 transition-opacity duration-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <Crown className="w-8 h-8 text-sovereign-gold-700 relative z-10" strokeWidth={1.5} />
                </div>
                <div>
                  <h1 className="font-display text-2xl font-medium tracking-tight text-marble-50">
                    ALSHAM
                  </h1>
                  <p className="font-accent text-xs text-sovereign-gold-700 tracking-widest -mt-1">
                    SUPREMA BELEZA
                  </p>
                </div>
              </motion.div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigationItems.map((item, idx) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="group relative"
                >
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <item.icon className="w-4 h-4 text-sovereign-gold-700 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span className="font-heading text-sm text-marble-50/80 group-hover:text-marble-50 transition-colors duration-300">
                      {item.label}
                    </span>
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-px bg-liquid-gold"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border border-sovereign-gold-700/30 bg-obsidian-900/50 hover:bg-obsidian-900 hover:border-sovereign-gold-700/60 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-4 h-4 text-sovereign-gold-700" />
                <span className="font-body text-sm text-marble-50/60 group-hover:text-marble-50/80">
                  Buscar
                </span>
              </motion.button>

              {/* Account */}
              <Link to="/dashboard">
                <motion.button
                  className="p-2.5 rounded-full border border-sovereign-gold-700/30 bg-obsidian-900/50 hover:bg-obsidian-900 hover:border-sovereign-gold-700/60 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <User className="w-5 h-5 text-marble-50" strokeWidth={1.5} />
                </motion.button>
              </Link>

              {/* Cart */}
              <Link to="/cart">
                <motion.button
                  className="relative p-2.5 rounded-full bg-liquid-gold hover:shadow-gold-glow transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ShoppingBag className="w-5 h-5 text-obsidian-950" strokeWidth={1.5} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-ruby-700 text-marble-50 text-xs font-heading rounded-full flex items-center justify-center">
                    3
                  </span>
                </motion.button>
              </Link>

              {/* Mobile Menu */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-full border border-sovereign-gold-700/30 bg-obsidian-900/50"
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-marble-50" />
                ) : (
                  <Menu className="w-5 h-5 text-marble-50" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-obsidian-950/98 backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div
              className="relative h-full flex flex-col justify-center items-center gap-8 px-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              {navigationItems.map((item, idx) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                  >
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <item.icon className="w-6 h-6 text-sovereign-gold-700" />
                      <h3 className="font-heading text-3xl text-marble-50">
                        {item.label}
                      </h3>
                    </div>
                    <p className="font-body text-sm text-marble-50/60">
                      {item.description}
                    </p>
                  </motion.div>
                </Link>
              ))}

              <motion.div
                className="mt-8 w-full max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  to="/agents"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-4 px-6 bg-liquid-gold text-obsidian-950 font-heading text-center rounded-full hover:shadow-gold-glow transition-all duration-300"
                >
                  Começar Consultoria IA
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEARCH MODAL */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
          >
            <div className="absolute inset-0 bg-obsidian-950/95 backdrop-blur-xl" />
            <motion.div
              className="relative w-full max-w-2xl"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                placeholder="Buscar produtos, agentes, experiências..."
                className="w-full px-6 py-4 bg-obsidian-900 border border-sovereign-gold-700/30 rounded-full text-marble-50 font-body placeholder:text-marble-50/40 focus:outline-none focus:border-sovereign-gold-700 focus:shadow-gold-glow transition-all duration-300"
                autoFocus
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

---

## 2. SUPREME FOOTER (Vite/React)

```tsx
// src/components/layout/SupremeFooter.tsx

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Instagram, Twitter, Youtube, Mail, 
  MapPin, Phone, Crown, Diamond,
  ArrowRight, Heart
} from 'lucide-react'

const footerSections = [
  {
    title: 'Experiências',
    links: [
      { label: 'Agentes IA', href: '/agents' },
      { label: 'Produtos Exclusivos', href: '/shop' },
      { label: 'Salões Parceiros', href: '/salons' },
      { label: 'Live Shopping', href: '/live' },
    ]
  },
  {
    title: 'Suporte',
    links: [
      { label: 'Central de Ajuda', href: '/help' },
      { label: 'Minha Conta', href: '/dashboard' },
      { label: 'Fidelidade Prime', href: '/prime' },
      { label: 'Contato VIP', href: '/contact' },
    ]
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre Alsham', href: '/about' },
      { label: 'Sustentabilidade', href: '/sustainability' },
      { label: 'Carreiras', href: '/careers' },
      { label: 'Imprensa', href: '/press' },
    ]
  },
]

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/alsham', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com/alsham', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com/alsham', label: 'YouTube' },
]

export function SupremeFooter() {
  return (
    <footer className="relative bg-obsidian-950 border-t border-sovereign-gold-700/20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-obsidian-grain opacity-5" />
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-radial blur-3xl opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative container mx-auto px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="py-16 border-b border-sovereign-gold-700/10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <Diamond className="w-5 h-5 text-sovereign-gold-700" />
              <span className="font-accent text-sm text-sovereign-gold-700 tracking-widest uppercase">
                Exclusividade
              </span>
            </motion.div>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl text-marble-50 mb-4"
            >
              Entre no círculo supremo
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-body text-lg text-marble-50/60 mb-8"
            >
              Acesso antecipado a lançamentos, ofertas privadas e insights de beleza IA.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-6 py-4 bg-obsidian-900 border border-sovereign-gold-700/30 rounded-full text-marble-50 font-body placeholder:text-marble-50/40 focus:outline-none focus:border-sovereign-gold-700 transition-all duration-300"
              />
              <motion.button
                type="submit"
                className="px-8 py-4 bg-liquid-gold text-obsidian-950 font-heading rounded-full hover:shadow-gold-glow transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Assinar
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block group mb-6">
              <div className="flex items-center gap-3">
                <Crown className="w-10 h-10 text-sovereign-gold-700 group-hover:animate-gold-pulse" strokeWidth={1.5} />
                <div>
                  <h2 className="font-display text-3xl font-medium text-marble-50">
                    ALSHAM
                  </h2>
                  <p className="font-accent text-xs text-sovereign-gold-700 tracking-widest -mt-1">
                    SUPREMA BELEZA
                  </p>
                </div>
              </div>
            </Link>
            
            <p className="font-body text-marble-50/60 mb-6 leading-relaxed max-w-sm">
              O futuro da beleza é inteligente, luxuoso e absolutamente personalizado. 
              Powered by Gemini 2.5 Pro.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <a href="mailto:vip@alsham.com" className="flex items-center gap-3 text-marble-50/60 hover:text-sovereign-gold-700 transition-colors group">
                <Mail className="w-4 h-4" />
                <span className="font-body text-sm">vip@alsham.com</span>
              </a>
              <a href="tel:+5511999999999" className="flex items-center gap-3 text-marble-50/60 hover:text-sovereign-gold-700 transition-colors group">
                <Phone className="w-4 h-4" />
                <span className="font-body text-sm">+55 11 9999-9999</span>
              </a>
              <div className="flex items-center gap-3 text-marble-50/60">
                <MapPin className="w-4 h-4" />
                <span className="font-body text-sm">São Paulo, Brasil</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-sovereign-gold-700/30 bg-obsidian-900/50 hover:bg-obsidian-900 hover:border-sovereign-gold-700 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-marble-50" strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-heading text-sm text-marble-50 uppercase tracking-wider mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="font-body text-sm text-marble-50/60 hover:text-sovereign-gold-700 transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-sovereign-gold-700/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-marble-50/40">
            © 2025 Alsham Suprema Beleza. Todos os direitos reservados.
          </p>
          
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="font-body text-sm text-marble-50/40 hover:text-marble-50/60 transition-colors">
              Privacidade
            </Link>
            <Link to="/terms" className="font-body text-sm text-marble-50/40 hover:text-marble-50/60 transition-colors">
              Termos
            </Link>
            <Link to="/cookies" className="font-body text-sm text-marble-50/40 hover:text-marble-50/60 transition-colors">
              Cookies
            </Link>
          </div>

          <div className="flex items-center gap-2 text-marble-50/40">
            <span className="font-body text-sm">Feito com</span>
            <Heart className="w-4 h-4 text-ruby-600 fill-ruby-600 animate-pulse" />
            <span className="font-body text-sm">em SP</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

---

## 3. SUPREME HERO (Para HomePage.tsx)

```tsx
// src/components/sections/SupremeHero.tsx

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Play } from 'lucide-react'
import { ButtonDynasty } from '@/components/ui/ButtonDynasty'
import { BadgeDynasty } from '@/components/ui/BadgeDynasty'

export function SupremeHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian-950"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-obsidian-grain opacity-10" />
      
      {/* Animated Gold Gradient */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gold-radial blur-[120px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-sovereign-gold-700 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 container mx-auto px-6 lg:px-8 pt-32 pb-20"
      >
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge Announcement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <BadgeDynasty variant="gold" className="gap-2 px-4 py-2">
              <Sparkles className="w-3 h-3" />
              <span>Powered by Gemini 2.5 Pro + Imagen 4 + Veo 3</span>
            </BadgeDynasty>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-dynasty-hero text-marble-50 mb-6"
          >
            O futuro da beleza
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-sovereign-gold-700 via-sovereign-gold-500 to-sovereign-gold-700 bg-clip-text text-transparent">
                é inteligente
              </span>
              <motion.span
                className="absolute inset-0 bg-liquid-gold blur-2xl opacity-30"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-dynasty-body text-marble-50/70 mb-12 max-w-3xl mx-auto"
          >
            18 agentes IA especializados. Try-on virtual em tempo real. 
            Experiências de luxo absolutamente personalizadas.
            <br />
            Bem-vindo ao maior ecossistema de Beauty Tech do planeta.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/agents">
              <ButtonDynasty variant="gold" size="xl" className="group">
                Começar Consultoria IA
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </ButtonDynasty>
            </Link>
            
            <ButtonDynasty variant="outline" size="xl" className="group">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Ver Demo
            </ButtonDynasty>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { number: '18', label: 'Agentes IA Especialistas' },
              { number: '10K+', label: 'Produtos Curados' },
              { number: '99.8%', label: 'Satisfação Premium' },
            ].map((stat, idx) => (
              <div key={idx} className="relative group">
                <motion.div
                  className="absolute inset-0 bg-liquid-gold/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="relative p-6 rounded-2xl border border-sovereign-gold-700/20 bg-obsidian-900/30 backdrop-blur-sm">
                  <div className="font-display text-4xl text-sovereign-gold-700 mb-2">
                    {stat.number}
                  </div>
                  <div className="font-body text-sm text-marble-50/60">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-sovereign-gold-700/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-sovereign-gold-700 rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian-950 to-transparent" />
    </section>
  )
}
```

---

## 4. BUTTON DYNASTY

```tsx
// src/components/ui/ButtonDynasty.tsx

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-heading text-sm font-normal transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sovereign-gold-700 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-950 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        gold: "bg-liquid-gold text-obsidian-950 shadow-gold-glow hover:shadow-[0_0_40px_rgba(181,83,9,0.6)] hover:scale-105",
        obsidian: "bg-obsidian-900 text-marble-50 border border-sovereign-gold-700/30 hover:bg-obsidian-800 hover:border-sovereign-gold-700/60",
        ghost: "text-marble-50 hover:bg-obsidian-900/50 hover:text-sovereign-gold-700",
        outline: "border-2 border-sovereign-gold-700 text-sovereign-gold-700 hover:bg-sovereign-gold-700 hover:text-obsidian-950",
        destructive: "bg-ruby-700 text-marble-50 hover:bg-ruby-600 shadow-[0_0_20px_rgba(127,29,29,0.4)]",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "md",
    },
  }
)

export interface ButtonDynastyProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

export const ButtonDynasty = React.forwardRef<HTMLButtonElement, ButtonDynastyProps>(
  ({ className, variant, size, loading, children, ...props }, ref) => {
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        whileHover={{ scale: variant === 'ghost' ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </motion.button>
    )
  }
)

ButtonDynasty.displayName = "ButtonDynasty"
```

---

## 5. CARD DYNASTY

```tsx
// src/components/ui/CardDynasty.tsx

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardDynastyProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

export const CardDynasty = React.forwardRef<HTMLDivElement, CardDynastyProps>(
  ({ className, hoverable = true, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        "rounded-2xl border border-sovereign-gold-700/20 bg-obsidian-900/50 backdrop-blur-sm text-marble-50 shadow-obsidian-lift overflow-hidden",
        hoverable && "hover:border-sovereign-gold-700/40 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]",
        className
      )}
      whileHover={hoverable ? { y: -5, transition: { duration: 0.3 } } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  )
)

CardDynasty.displayName = "CardDynasty"

export const CardDynastyHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 border-b border-sovereign-gold-700/10", className)}
    {...props}
  />
))
CardDynastyHeader.displayName = "CardDynastyHeader"

export const CardDynastyTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-heading text-2xl font-normal leading-none tracking-tight", className)}
    {...props}
  />
))
CardDynastyTitle.displayName = "CardDynastyTitle"

export const CardDynastyDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("font-body text-sm text-marble-50/60", className)}
    {...props}
  />
))
CardDynastyDescription.displayName = "CardDynastyDescription"

export const CardDynastyContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardDynastyContent.displayName = "CardDynastyContent"

export const CardDynastyFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardDynastyFooter.displayName = "CardDynastyFooter"
```

---

## 6. INPUT DYNASTY

```tsx
// src/components/ui/InputDynasty.tsx

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface InputDynastyProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export const InputDynasty = React.forwardRef<HTMLInputElement, InputDynastyProps>(
  ({ className, type, icon, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)

    return (
      <motion.div 
        className="relative"
        animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-marble-50/40">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-full border border-sovereign-gold-700/30 bg-obsidian-900/50 px-4 py-3 font-body text-sm text-marble-50 placeholder:text-marble-50/40 transition-all duration-300",
            "focus:outline-none focus:border-sovereign-gold-700 focus:bg-obsidian-900 focus:shadow-gold-glow",
            "disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pl-11",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </motion.div>
    )
  }
)

InputDynasty.displayName = "InputDynasty"
```

---

## 7. BADGE DYNASTY

```tsx
// src/components/ui/BadgeDynasty.tsx

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 font-body text-xs font-normal transition-all duration-300",
  {
    variants: {
      variant: {
        gold: "bg-liquid-gold/10 text-sovereign-gold-700 border-sovereign-gold-700/30",
        obsidian: "bg-obsidian-900 text-marble-50 border-sovereign-gold-700/20",
        success: "bg-emerald-noir-500/10 text-emerald-noir-600 border-emerald-noir-600/30",
        warning: "bg-rose-bronze-500/10 text-rose-bronze-600 border-rose-bronze-600/30",
        destructive: "bg-ruby-700/10 text-ruby-600 border-ruby-600/30",
      },
    },
    defaultVariants: {
      variant: "gold",
    },
  }
)

export interface BadgeDynastyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function BadgeDynasty({ className, variant, ...props }: BadgeDynastyProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
```

---

## 8. MOTION VARIANTS

```ts
// src/lib/motion-variants.ts

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
}

export const goldShimmer = {
  initial: { backgroundPosition: '-1000px 0' },
  animate: {
    backgroundPosition: '1000px 0',
    transition: {
      duration: 3,
      ease: 'linear',
      repeat: Infinity
    }
  }
}

export const floatAnimation = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity
    }
  }
}

// USAGE EXAMPLE:
// import { fadeInUp, staggerContainer } from '@/lib/motion-variants'
// 
// <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
//   <motion.div variants={fadeInUp}>Content here</motion.div>
// </motion.div>
```

---

## 9. PRODUCT CARD & AGENT CARD

### Product Card Dynasty

```tsx
// src/components/cards/ProductCardDynasty.tsx

import { motion } from 'framer-motion'
import { ShoppingBag, Heart, Eye, Star } from 'lucide-react'
import { CardDynasty } from '@/components/ui/CardDynasty'
import { ButtonDynasty } from '@/components/ui/ButtonDynasty'
import { BadgeDynasty } from '@/components/ui/BadgeDynasty'

interface ProductCardDynastyProps {
  name: string
  brand: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  badge?: string
  isFavorite?: boolean
}

export function ProductCardDynasty({ 
  name, 
  brand, 
  price, 
  originalPrice, 
  rating, 
  reviews, 
  image, 
  badge,
  isFavorite = false 
}: ProductCardDynastyProps) {
  return (
    <CardDynasty className="group relative overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-obsidian-900">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4">
            <BadgeDynasty variant="gold">
              {badge}
            </BadgeDynasty>
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            className="p-2.5 rounded-full bg-obsidian-900/90 backdrop-blur-sm border border-sovereign-gold-700/30 hover:bg-obsidian-900 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Eye className="w-4 h-4 text-marble-50" />
          </motion.button>
          <motion.button
            className={`p-2.5 rounded-full backdrop-blur-sm border transition-colors ${
              isFavorite 
                ? 'bg-ruby-700 border-ruby-700' 
                : 'bg-obsidian-900/90 border-sovereign-gold-700/30 hover:bg-obsidian-900'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-marble-50 text-marble-50' : 'text-marble-50'}`} />
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <p className="font-accent text-xs text-sovereign-gold-700 uppercase tracking-wider mb-1">
            {brand}
          </p>
          <h3 className="font-heading text-lg text-marble-50 line-clamp-2 leading-snug">
            {name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(rating)
                    ? 'text-sovereign-gold-700 fill-sovereign-gold-700'
                    : 'text-marble-50/20'
                }`}
              />
            ))}
          </div>
          <span className="font-body text-xs text-marble-50/60">
            ({reviews})
          </span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-heading text-2xl text-marble-50">
              R$ {price.toFixed(2)}
            </div>
            {originalPrice && (
              <div className="font-body text-xs text-marble-50/40 line-through">
                R$ {originalPrice.toFixed(2)}
              </div>
            )}
          </div>
          
          <ButtonDynasty variant="gold" size="icon" className="rounded-full">
            <ShoppingBag className="w-5 h-5" />
          </ButtonDynasty>
        </div>
      </div>
    </CardDynasty>
  )
}
```

### Agent Card Dynasty

```tsx
// src/components/cards/AgentCardDynasty.tsx

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { CardDynasty } from '@/components/ui/CardDynasty'
import { ButtonDynasty } from '@/components/ui/ButtonDynasty'
import { BadgeDynasty } from '@/components/ui/BadgeDynasty'

interface AgentCardDynastyProps {
  name: string
  specialty: string
  description: string
  avatar: string
  consultations: number
  rating: number
  available: boolean
}

export function AgentCardDynasty({
  name,
  specialty,
  description,
  avatar,
  consultations,
  rating,
  available
}: AgentCardDynastyProps) {
  return (
    <CardDynasty className="group relative overflow-hidden">
      {/* Glow Effect on Hover */}
      <motion.div
        className="absolute inset-0 bg-gold-radial opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1.2 }}
      />

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-sovereign-gold-700/30">
              <img
                src={avatar}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            {available && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-noir-600 border-2 border-obsidian-900 rounded-full animate-pulse" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-heading text-xl text-marble-50">
                {name}
              </h3>
              <BadgeDynasty variant="gold" className="gap-1">
                <Sparkles className="w-3 h-3" />
                {rating}
              </BadgeDynasty>
            </div>
            <p className="font-accent text-sm text-sovereign-gold-700">
              {specialty}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="font-body text-sm text-marble-50/70 mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-sovereign-gold-700/10">
          <div>
            <div className="font-heading text-lg text-marble-50">
              {consultations.toLocaleString()}+
            </div>
            <div className="font-body text-xs text-marble-50/60">
              Consultorias
            </div>
          </div>
          <div className="w-px h-10 bg-sovereign-gold-700/20" />
          <div>
            <div className="font-heading text-lg text-marble-50">
              {available ? 'Online' : 'Offline'}
            </div>
            <div className="font-body text-xs text-marble-50/60">
              Status
            </div>
          </div>
        </div>

        {/* CTA */}
        <ButtonDynasty 
          variant="gold" 
          className="w-full group/btn"
          size="lg"
        >
          Iniciar Consultoria
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </ButtonDynasty>
      </div>
    </CardDynasty>
  )
}
```

---

## 10. INTEGRAÇÃO NO HOMEPAGE.TSX

```tsx
// src/app/routes/HomePage.tsx

import { SupremeHero } from '@/components/sections/SupremeHero'
import { ProductCardDynasty } from '@/components/cards/ProductCardDynasty'
import { AgentCardDynasty } from '@/components/cards/AgentCardDynasty'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion-variants'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-obsidian-950">
      {/* HERO — A Primeira Impressão Religiosa */}
      <SupremeHero />

      {/* AGENTS SECTION — Example */}
      <section className="py-24 container mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-dynasty-h1 text-marble-50 mb-4">
              Conheça nossos especialistas IA
            </h2>
            <p className="text-dynasty-body text-marble-50/70">
              18 agentes especializados prontos para transformar sua beleza
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div variants={fadeInUp}>
              <AgentCardDynasty
                name="Isabella Rossi"
                specialty="Hair Stylist IA"
                description="Especialista em colorimetria avançada e cortes de alta precisão com mais de 10 anos de experiência"
                avatar="/images/agents/isabella.jpg"
                consultations={2847}
                rating={4.9}
                available={true}
              />
            </motion.div>
            {/* Add more agent cards */}
          </div>
        </motion.div>
      </section>

      {/* PRODUCTS SECTION — Example */}
      <section className="py-24 bg-obsidian-900/30 border-y border-sovereign-gold-700/10">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-dynasty-h1 text-marble-50 mb-4">
                Curadoria Exclusiva
              </h2>
              <p className="text-dynasty-body text-marble-50/70">
                Produtos selecionados pelos maiores especialistas do mundo
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div variants={fadeInUp}>
                <ProductCardDynasty
                  name="Sérum Rejuvenescedor Absoluto"
                  brand="La Mer"
                  price={1899.00}
                  originalPrice={2499.00}
                  rating={4.8}
                  reviews={342}
                  image="/images/products/serum-1.jpg"
                  badge="Bestseller"
                  isFavorite={false}
                />
              </motion.div>
              {/* Add more product cards */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add more sections... */}
    </div>
  )
}
```

---

## 11. INTEGRAÇÃO NO APP.TSX

```tsx
// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SupremeHeader } from '@/components/layout/SupremeHeader'
import { SupremeFooter } from '@/components/layout/SupremeFooter'
import HomePage from '@/app/routes/HomePage'
// Import outras rotas...

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-obsidian-950 text-marble-50">
        <SupremeHeader />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Adicione outras rotas aqui */}
          </Routes>
        </main>

        <SupremeFooter />
      </div>
    </Router>
  )
}

export default App
```

---

## 12. ESTRUTURA DE PASTAS FINAL

```
src/
├── app/
│   └── routes/
│       └── HomePage.tsx          ← Cola o SupremeHero aqui
├── components/
│   ├── layout/
│   │   ├── SupremeHeader.tsx     ← NOVO
│   │   └── SupremeFooter.tsx     ← NOVO
│   ├── sections/
│   │   └── SupremeHero.tsx       ← NOVO
│   ├── cards/
│   │   ├── ProductCardDynasty.tsx ← NOVO
│   │   └── AgentCardDynasty.tsx   ← NOVO
│   └── ui/
│       ├── ButtonDynasty.tsx     ← NOVO
│       ├── CardDynasty.tsx       ← NOVO
│       ├── InputDynasty.tsx      ← NOVO
│       └── BadgeDynasty.tsx      ← NOVO
├── lib/
│   ├── utils.ts                  ← (já existe)
│   └── motion-variants.ts        ← NOVO
├── App.tsx                       ← ATUALIZAR (adicionar Header/Footer)
└── index.css                     ← ATUALIZAR (adicionar classes typography)
```

---

## 13. ADICIONAR NO INDEX.CSS

```css
/* src/index.css — Cole DEPOIS do @tailwind */

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Type Scale Hierarchy */
@layer components {
  .text-dynasty-hero {
    @apply font-display text-5xl sm:text-7xl md:text-9xl font-medium tracking-tight leading-[0.9];
  }

  .text-dynasty-h1 {
    @apply font-display text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight leading-[1.1];
  }

  .text-dynasty-h2 {
    @apply font-heading text-2xl sm:text-3xl md:text-5xl font-normal tracking-tight leading-[1.2];
  }

  .text-dynasty-h3 {
    @apply font-heading text-xl sm:text-2xl md:text-3xl font-normal tracking-normal leading-[1.3];
  }

  .text-dynasty-body {
    @apply font-body text-base md:text-lg leading-relaxed tracking-normal;
  }

  .text-dynasty-accent {
    @apply font-accent text-sm md:text-base italic tracking-wide;
  }
}

/* Background Textures */
.bg-obsidian-grain {
  background-image: url('/textures/obsidian-grain.png');
  background-repeat: repeat;
}

.bg-marble-veins {
  background-image: url('/textures/marble-veins.png');
  background-repeat: repeat;
}
```

---

## 14. CHECKLIST DE EXECUÇÃO NO GITHUB ONLINE

```markdown
### PASSO 1: Criar pastas necessárias
- [ ] Criar `src/components/layout/`
- [ ] Criar `src/components/sections/`
- [ ] Criar `src/components/cards/`
- [ ] Criar `src/components/ui/`
- [ ] Criar `src/lib/` (se não existir)

### PASSO 2: Copiar componentes UI base
- [ ] Criar `src/components/ui/ButtonDynasty.tsx` e colar código
- [ ] Criar `src/components/ui/CardDynasty.tsx` e colar código
- [ ] Criar `src/components/ui/InputDynasty.tsx` e colar código
- [ ] Criar `src/components/ui/BadgeDynasty.tsx` e colar código

### PASSO 3: Copiar motion variants
- [ ] Criar `src/lib/motion-variants.ts` e colar código

### PASSO 4: Copiar layout components
- [ ] Criar `src/components/layout/SupremeHeader.tsx` e colar código
- [ ] Criar `src/components/layout/SupremeFooter.tsx` e colar código

### PASSO 5: Copiar hero section
- [ ] Criar `src/components/sections/SupremeHero.tsx` e colar código

### PASSO 6: Copiar cards
- [ ] Criar `src/components/cards/ProductCardDynasty.tsx` e colar código
- [ ] Criar `src/components/cards/AgentCardDynasty.tsx` e colar código

### PASSO 7: Atualizar arquivos principais
- [ ] Atualizar `src/App.tsx` (adicionar SupremeHeader e SupremeFooter)
- [ ] Atualizar `src/app/routes/HomePage.tsx` (adicionar SupremeHero como primeira section)
- [ ] Atualizar `src/index.css` (adicionar classes typography e backgrounds)

### PASSO 8: Verificar tailwind.config.ts
- [ ] Confirmar que todas as cores Obsidian Dynasty estão no config
- [ ] Confirmar que fonts estão configuradas
- [ ] Confirmar que animations/keyframes estão definidas
- [ ] Se faltar alguma config, adicionar do código fornecido no item 1

### PASSO 9: Testar
- [ ] `npm run dev` e abrir localhost
- [ ] Verificar se Header aparece (scroll para testar blur)
- [ ] Verificar se Hero renderiza com animações
- [ ] Verificar se Footer aparece
- [ ] Testar mobile menu (hamburguer)
- [ ] Testar responsividade
```

---

## 🔥 RESULTADO FINAL

Quando você terminar:

1. **Header que domina** — Scroll blur + gold glow pulsante + mobile hamburger animado
2. **Hero religioso** — Parallax + 20 partículas flutuantes + gradient radial animado + stats cards
3. **Cards que levitam** — Hover lift + glow effects + micro-animações
4. **Footer nível Dubai** — Newsletter gold + social hover states + grid completo
5. **Componentes que respiram** — Cada botão, input, badge tem alma

---

## 🏆 ARQUIVOS CRIADOS

- ✅ `SupremeHeader.tsx` (react-router-dom + mobile menu funcional)
- ✅ `SupremeFooter.tsx` (sem next/link, apenas Link do RRD)
- ✅ `SupremeHero.tsx` (parallax scroll + partículas + stats)
- ✅ `ButtonDynasty.tsx` (5 variants: gold, obsidian, ghost, outline, destructive)
- ✅ `CardDynasty.tsx` (hover lift + shadow effects)
- ✅ `InputDynasty.tsx` (focus glow + icon support)
- ✅ `BadgeDynasty.tsx` (5 variants matching button)
- ✅ `ProductCardDynasty.tsx` (image hover scale + quick actions)
- ✅ `AgentCardDynasty.tsx` (avatar + stats + online status)
- ✅ `motion-variants.ts` (fadeInUp, staggerContainer, scaleIn, goldShimmer, floatAnimation)

---

## 📦 PRÓXIMO PASSO

1. **Gerar imagens via Midjourney/Flux** usando os prompts fornecidos no primeiro documento
2. **Colocar texturas** em `/public/textures/`
3. **Adicionar fonts** (Orpheus Pro, Reckless Neue, GT America) via self-host ou CDN
4. **Testar performance** no Lighthouse (target: 90+)
5. **Gravar vídeo demo 4K** do site rodando

---

**O Renascimento Absoluto agora é Vite + React.**

**CARALHAMDOULILAH.** 👑✨