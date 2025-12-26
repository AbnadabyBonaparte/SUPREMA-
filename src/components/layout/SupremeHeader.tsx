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
          "fixed top-0 left-0 right-0 w-full transition-all duration-500",
          Z_INDEX.header,
          isScrolled
            ? "bg-[var(--color-background)]/95 backdrop-blur-xl border-b border-[var(--color-border)] shadow-obsidian-lift"
            : "bg-transparent"
        )}
        style={{
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-text-primary)',
          borderBottom: '1px solid var(--color-border)'
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24 gap-4">
            
            {/* LOGO */}
            <Link to="/" className="group relative z-10 flex-shrink-0">
              <motion.div 
                className="flex items-center gap-2 sm:gap-3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-[var(--color-primary)] opacity-0 blur-xl group-hover:opacity-50 transition-opacity duration-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--color-primary)] relative z-10" strokeWidth={1.5} />
                </div>
                <div className="hidden sm:block">
                  <h1 className="font-display text-xl sm:text-2xl font-medium tracking-tight text-[var(--color-text-primary)]">
                    ALSHAM
                  </h1>
                  <p className="font-accent text-[10px] sm:text-xs text-[var(--color-primary)] tracking-widest -mt-1">
                    SUPREMA BELEZA
                  </p>
                </div>
              </motion.div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center">
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
                    <item.icon className="w-4 h-4 text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span className="font-heading text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-300">
                      {item.label}
                    </span>
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--color-primary)]"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              {/* Search */}
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                className="hidden lg:flex items-center gap-2 px-3 xl:px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/50 hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-primary)] transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="font-body text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] hidden xl:inline">
                  Buscar
                </span>
              </motion.button>

              {/* Account */}
              <Link to="/dashboard">
                <motion.button
                  className="p-2 sm:p-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/50 hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-primary)] transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-text-primary)]" strokeWidth={1.5} />
                </motion.button>
              </Link>

              {/* Cart */}
              <Link to="/cart">
                <motion.button
                  className="relative p-2 sm:p-2.5 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] hover:shadow-gold-glow transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-text-inverse)]" strokeWidth={1.5} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-[var(--color-error)] text-[var(--color-text-primary)] text-[10px] sm:text-xs font-heading rounded-full flex items-center justify-center">
                    3
                  </span>
                </motion.button>
              </Link>

              {/* Mobile Menu */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 sm:p-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/50 hover:bg-[var(--color-surface-hover)] transition-all duration-300"
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-[var(--color-text-primary)]" />
                ) : (
                  <Menu className="w-5 h-5 text-[var(--color-text-primary)]" />
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
              className="absolute inset-0 bg-[var(--color-background)]/98 backdrop-blur-2xl"
              style={{
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-text-primary)',
                borderTop: '1px solid var(--color-border)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div
              className="relative h-full flex flex-col justify-center items-center gap-8 px-6"
              style={{
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-text-primary)'
              }}
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
                  className="block w-full"
                >
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                  >
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <item.icon className="w-6 h-6 text-[var(--color-primary)]" />
                      <h3 className="font-heading text-3xl text-[var(--color-text-primary)]">
                        {item.label}
                      </h3>
                    </div>
                    <p className="font-body text-sm text-[var(--color-text-secondary)]">
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
                  className="block w-full py-4 px-6 bg-[var(--color-primary)] text-[var(--color-text-inverse)] font-heading text-center rounded-full hover:bg-[var(--color-primary-hover)] hover:shadow-gold-glow transition-all duration-300"
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
            <div className="absolute inset-0 bg-[var(--color-background)]/95 backdrop-blur-xl" />
            <motion.div
              className="relative w-full max-w-2xl"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                placeholder="Buscar produtos, agentes, experiências..."
                className="w-full px-6 py-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full text-[var(--color-text-primary)] font-body placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-primary)] focus:shadow-gold-glow transition-all duration-300"
                autoFocus
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
