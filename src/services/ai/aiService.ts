// src/services/ai/aiService.ts
// Interface abstrata para provedores de IA — Escudo Anti-Refém
// Permite trocar de provedor (Gemini, Grok, Claude, etc.) sem quebrar o código

// ProfessionalType será definido aqui mesmo para evitar dependência circular

/**
 * Tipos compartilhados entre todos os adapters
 */
export type ProfessionalType = 'professional';

export interface StyleRecommendation {
  outfitName: string;
  description: string;
  technicalAnalysis: string;
  items: string[];
  recommendedProducts: { name: string; price: string; reason: string }[];
}

export interface UpsellRecommendation {
  productName: string;
  reason: string;
  price: string;
  urgency: 'high' | 'medium' | 'low';
}

export interface SustainabilityAnalysis {
  score: number;
  rating: 'EXCELENTE' | 'BOM' | 'REGULAR' | 'RUIM';
  issues: string[];
  alternatives: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface FaceAnalysis {
  faceShape: string;
  skinTone: string;
  undertone: string;
  recommendations: string[];
}

/**
 * Interface abstrata que todos os adapters de IA devem implementar
 * Este é o contrato único que garante liberdade de trocar provedores
 */
export interface IAIService {
  /**
   * Consultoria de estilo personalizada
   * @param prompt Descrição do que o usuário deseja
   * @param professional Tipo de profissional (agente)
   * @param images Imagens opcionais para análise multimodal
   */
  getStyleRecommendations(
    prompt: string,
    professional: ProfessionalType,
    images?: File[]
  ): Promise<StyleRecommendation[]>;

  /**
   * Recomendações de upsell no checkout
   * @param cartItems Itens no carrinho
   * @param userProfile Perfil do usuário (opcional)
   */
  getUpsellRecommendation(
    cartItems: string[],
    userProfile?: string
  ): Promise<UpsellRecommendation[]>;

  /**
   * Análise de sustentabilidade de ingredientes
   * @param ingredients Lista de ingredientes
   */
  analyzeIngredients(ingredients: string[]): Promise<SustainabilityAnalysis>;

  /**
   * Geração de imagem a partir de prompt
   * @param prompt Descrição da imagem desejada
   * @param aspectRatio Proporção da imagem
   */
  generateImage(
    prompt: string,
    aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4'
  ): Promise<string>;

  /**
   * Edição de imagem com IA
   * @param prompt Instrução de edição
   * @param image Imagem a ser editada (base64 + mimeType)
   */
  editImage(
    prompt: string,
    image: { data: string; mimeType: string }
  ): Promise<string>;

  /**
   * Chat com agente específico
   * @param agentId ID do agente (ex: 'cabeleireira_x0')
   * @param message Mensagem do usuário
   * @param history Histórico de mensagens (opcional)
   */
  chatWithAgent(
    agentId: string,
    message: string,
    history?: ChatMessage[]
  ): Promise<string>;

  /**
   * Chat genérico (sem agente específico)
   * @param messages Histórico de mensagens
   */
  chatWithGemini(messages: ChatMessage[]): Promise<string>;

  /**
   * Análise facial para visagismo
   * @param image Imagem do rosto
   */
  analyzeFace(image: File): Promise<FaceAnalysis>;

  /**
   * Text-to-Speech
   * @param text Texto a ser convertido em áudio
   */
  playTextAsSpeech(text: string): Promise<void>;

  /**
   * Geração de vídeo (futuro)
   * @param prompt Descrição do vídeo
   */
  generateVideo(prompt: string): Promise<string>;
}

