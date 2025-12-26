// src/services/ai/adapters/grokAdapter.ts
// Placeholder para futuro adapter Grok (X.AI)
// TODO: Implementar quando necessário

import type {
  IAIService,
  StyleRecommendation,
  UpsellRecommendation,
  SustainabilityAnalysis,
  ChatMessage,
  FaceAnalysis,
  ProfessionalType,
} from '../aiService';

/**
 * Adapter Grok — implementação futura para X.AI Grok
 * 
 * Para implementar:
 * 1. Instalar SDK do Grok: npm install @xai/grok-sdk
 * 2. Configurar variável de ambiente: VITE_GROK_API_KEY
 * 3. Implementar todos os métodos da interface IAIService
 * 4. Adicionar 'grok' ao index.ts
 */
export class GrokAdapter implements IAIService {
  async getStyleRecommendations(
    prompt: string,
    professional: ProfessionalType,
    images?: File[]
  ): Promise<StyleRecommendation[]> {
    throw new Error('Grok adapter não implementado ainda. Use VITE_AI_PROVIDER=gemini');
  }

  async getUpsellRecommendation(
    cartItems: string[],
    userProfile?: string
  ): Promise<UpsellRecommendation[]> {
    throw new Error('Grok adapter não implementado ainda.');
  }

  async analyzeIngredients(ingredients: string[]): Promise<SustainabilityAnalysis> {
    throw new Error('Grok adapter não implementado ainda.');
  }

  async generateImage(
    prompt: string,
    aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4'
  ): Promise<string> {
    throw new Error('Grok adapter não implementado ainda.');
  }

  async editImage(
    prompt: string,
    image: { data: string; mimeType: string }
  ): Promise<string> {
    throw new Error('Grok adapter não implementado ainda.');
  }

  async chatWithAgent(
    agentId: string,
    message: string,
    history?: ChatMessage[]
  ): Promise<string> {
    throw new Error('Grok adapter não implementado ainda.');
  }

  async chatWithGemini(messages: ChatMessage[]): Promise<string> {
    throw new Error('Grok adapter não implementado ainda.');
  }

  async analyzeFace(image: File): Promise<FaceAnalysis> {
    throw new Error('Grok adapter não implementado ainda.');
  }

  async playTextAsSpeech(text: string): Promise<void> {
    throw new Error('Grok adapter não implementado ainda.');
  }

  async generateVideo(prompt: string): Promise<string> {
    throw new Error('Grok adapter não implementado ainda.');
  }
}

