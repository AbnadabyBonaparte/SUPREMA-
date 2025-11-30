// src/types/ai.ts

// ============================================
// CORE AI TYPES
// ============================================

export interface StyleRecommendation {
  outfitName: string;
  description: string;
  items: string[];
  technicalAnalysis?: string; // Análise de visagismo/estrutura óssea
  recommendedProducts?: Product[];
}

export interface Product {
  name: string;
  price: string;
  reason: string; // Por que a IA recomendou isso
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  groundingSources?: GroundingSource[];
}

// ============================================
// PROFESSIONAL TYPES
// ============================================

// As 18 Vertentes + Matriz
export type ProfessionalType =
  // Masculino
  | 'barber_x0'
  | 'grooming_master'
  | 'beard_expert'
  | 'mens_style'
  // Feminino
  | 'cabeleireira_x0'
  | 'colorista_x0'
  | 'hair_stylist_x0'
  // Make & Estética
  | 'makeup_artist_x0'
  | 'beauty_guru'
  | 'skincare_expert'
  // Corpo & Bronze
  | 'bronze_master'
  | 'body_sculptor'
  | 'spa_therapist'
  // Unhas & Detalhes
  | 'nail_artist_x0'
  | 'lash_expert'
  | 'brow_designer'
  // Avançado
  | 'tattoo_artist'
  | 'piercing_master'
  | 'aesthetic_doctor';

export interface ProfessionalProfile {
  id: ProfessionalType;
  name: string;
  title: string;
  description: string;
  category: 'Masculino' | 'Feminino' | 'Estética' | 'Corpo' | 'Detalhes' | 'Avançado';
  image: string;
}

// ============================================
// TREND RADAR TYPES
// ============================================

export interface Trend {
  id: string;
  title: string;
  celebrityRef: string; // e.g. "Inspired by David Beckham"
  description: string;
  image: string;
  signature: string; // e.g. "Assinatura: Fade degradê navalhado"
  targetProfessional: ProfessionalType; // Quem executa isso?
  promptContext: string; // O que enviar pra IA
}

// ============================================
// MARKETPLACE TYPES (Future Phases)
// ============================================

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: string; // e.g., "45 min"
}

export interface RealProfessional {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  services: Service[];
}

export interface Salon {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  distance: string; // e.g., "2.5 km"
  address: string;
  professionals: RealProfessional[];
  isVerified: boolean;
}

// ============================================
// SHOP TYPES (Future Phases)
// ============================================

export type ShopCategory = 'Todos' | 'Perfumaria' | 'Cabelo' | 'Skincare' | 'Wellness' | 'Homem' | 'Fitness';

export interface ShopProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: ShopCategory;
  image: string;
  rating: number;
  isNew?: boolean;
  isBestSeller?: boolean;
}