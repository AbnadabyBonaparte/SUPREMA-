// src/services/ai/geminiService.ts
// @deprecated Este arquivo está obsoleto. Use '@/services/ai' em vez disso.
// Mantido apenas para compatibilidade durante migração.

/**
 * ⚠️ DEPRECATED — Este arquivo será removido em versão futura
 * 
 * MIGRAÇÃO:
 * // Antes
 * import { getStyleRecommendations } from '@/services/ai/geminiService'
 * 
 * // Depois
 * import { aiService } from '@/services/ai'
 * const result = await aiService.getStyleRecommendations(...)
 * 
 * Todos os exports foram movidos para a camada de abstração:
 * - src/services/ai/index.ts (exporta aiService)
 * - src/services/ai/adapters/geminiAdapter.ts (implementação Gemini)
 */

// Re-export para compatibilidade (temporário)
export { aiService } from './index';
export type {
  StyleRecommendation,
  UpsellRecommendation,
  SustainabilityAnalysis,
  ChatMessage,
  FaceAnalysis,
  ProfessionalType,
} from './aiService';

// Re-export métodos como funções nomeadas para compatibilidade
import { aiService } from './index';

export const getStyleRecommendations = aiService.getStyleRecommendations.bind(aiService);
export const getUpsellRecommendation = aiService.getUpsellRecommendation.bind(aiService);
export const analyzeIngredients = aiService.analyzeIngredients.bind(aiService);
export const generateImage = aiService.generateImage.bind(aiService);
export const editImage = aiService.editImage.bind(aiService);
export const chatWithGemini = aiService.chatWithGemini.bind(aiService);
export const playTextAsSpeech = aiService.playTextAsSpeech.bind(aiService);
export const generateVideo = aiService.generateVideo.bind(aiService);

// Type exports para compatibilidade
export type { ProfessionalType } from './aiService';
