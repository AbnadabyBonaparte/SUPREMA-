// src/components/layout/SupremeHeader.tsx

'use client'  // Não necessário em Vite, mas ok deixar

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, ShoppingBag, User, Search, Sparkles,
  Crown, Diamond, Calendar, MessageCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Z_INDEX } from '@/lib/z-index'

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

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 transition-all duration-500",
          Z_INDEX.header,
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
            className={cn("fixed inset-0 lg:hidden", Z_INDEX.mobileMenu)}
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
            className={cn("fixed inset-0 flex items-start justify-center pt-32 px-6", Z_INDEX.searchModal)}
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
