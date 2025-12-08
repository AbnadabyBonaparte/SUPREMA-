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
