// src/services/ai/adapters/localAdapter.ts
// Placeholder para futuro adapter local (Ollama, LM Studio, etc.)
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
 * Adapter Local — implementação futura para modelos locais (Ollama, LM Studio)
 * 
 * Para implementar:
 * 1. Configurar servidor local (Ollama, LM Studio, etc.)
 * 2. Configurar variável de ambiente: VITE_LOCAL_AI_URL (ex: http://localhost:11434)
 * 3. Implementar todos os métodos da interface IAIService
 * 4. Adicionar 'local' ao index.ts
 * 
 * Vantagens:
 * - Privacidade total (dados não saem do dispositivo)
 * - Sem custos de API
 * - Controle total sobre o modelo
 */
export class LocalAdapter implements IAIService {
  async getStyleRecommendations(
    prompt: string,
    professional: ProfessionalType,
    images?: File[]
  ): Promise<StyleRecommendation[]> {
    throw new Error('Local adapter não implementado ainda. Use VITE_AI_PROVIDER=gemini');
  }

  async getUpsellRecommendation(
    cartItems: string[],
    userProfile?: string
  ): Promise<UpsellRecommendation[]> {
    throw new Error('Local adapter não implementado ainda.');
  }

  async analyzeIngredients(ingredients: string[]): Promise<SustainabilityAnalysis> {
    throw new Error('Local adapter não implementado ainda.');
  }

  async generateImage(
    prompt: string,
    aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4'
  ): Promise<string> {
    throw new Error('Local adapter não implementado ainda.');
  }

  async editImage(
    prompt: string,
    image: { data: string; mimeType: string }
  ): Promise<string> {
    throw new Error('Local adapter não implementado ainda.');
  }

  async chatWithAgent(
    agentId: string,
    message: string,
    history?: ChatMessage[]
  ): Promise<string> {
    throw new Error('Local adapter não implementado ainda.');
  }

  async chatWithGemini(messages: ChatMessage[]): Promise<string> {
    throw new Error('Local adapter não implementado ainda.');
  }

  async analyzeFace(image: File): Promise<FaceAnalysis> {
    throw new Error('Local adapter não implementado ainda.');
  }

  async playTextAsSpeech(text: string): Promise<void> {
    throw new Error('Local adapter não implementado ainda.');
  }

  async generateVideo(prompt: string): Promise<string> {
    throw new Error('Local adapter não implementado ainda.');
  }
}

