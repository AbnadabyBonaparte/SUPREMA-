// src/lib/z-index.ts
// Sistema hierárquico de z-index para evitar sobreposições

/**
 * Hierarquia Z-Index do Projeto SUPREMA
 *
 * Valores crescentes de camadas visuais:
 * - 0: Background layers
 * - 10: Content layer (padrão)
 * - 20: Dropdowns, popovers
 * - 30: Sticky elements
 * - 40: Overlays (backdrop)
 * - 50: Header/Navigation fixed
 * - 60: Modals, drawers, search
 * - 70: Tooltips
 * - 80: Notifications/Toasts
 * - 90: Loading screens
 */

export const Z_INDEX = {
  // Background
  background: 'z-0',

  // Content (padrão)
  content: 'z-10',
  contentAbove: 'z-20',

  // Dropdowns e Popovers
  dropdown: 'z-30',
  popover: 'z-30',

  // Sticky Elements
  sticky: 'z-40',

  // Navigation/Header
  header: 'z-50',
  mobileMenu: 'z-40', // Menor que header para não sobrepor

  // Overlays e Modals
  overlay: 'z-60',
  modal: 'z-60',
  drawer: 'z-60',
  searchModal: 'z-60',

  // Tooltips
  tooltip: 'z-70',

  // Notifications
  notification: 'z-80',
  toast: 'z-80',

  // Loading
  loading: 'z-90',
} as const

// Valores numéricos para uso em estilos inline ou comparações
export const Z_INDEX_VALUES = {
  background: 0,
  content: 10,
  contentAbove: 20,
  dropdown: 30,
  popover: 30,
  sticky: 40,
  header: 50,
  mobileMenu: 40,
  overlay: 60,
  modal: 60,
  drawer: 60,
  searchModal: 60,
  tooltip: 70,
  notification: 80,
  toast: 80,
  loading: 90,
} as const

export type ZIndexKey = keyof typeof Z_INDEX
