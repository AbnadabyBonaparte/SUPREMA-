// src/services/ai/index.ts
// Ponto de entrada único para serviços de IA — Escudo Anti-Refém
// Troque o provedor de IA mudando apenas VITE_AI_PROVIDER no .env

import { GeminiAdapter } from './adapters/geminiAdapter';
// import { GrokAdapter } from './adapters/grokAdapter'; // Futuro
// import { ClaudeAdapter } from './adapters/claudeAdapter'; // Futuro
// import { LocalAdapter } from './adapters/localAdapter'; // Futuro

import type { IAIService } from './aiService';

/**
 * Registro de todos os adapters disponíveis
 * Adicione novos adapters aqui quando implementados
 */
const providers: Record<string, IAIService> = {
  gemini: new GeminiAdapter(),
  // grok: new GrokAdapter(), // Descomente quando implementado
  // claude: new ClaudeAdapter(), // Descomente quando implementado
  // local: new LocalAdapter(), // Descomente quando implementado
};

/**
 * Provider ativo baseado em variável de ambiente
 * Padrão: 'gemini' se não especificado
 */
const currentProviderName = import.meta.env.VITE_AI_PROVIDER || 'gemini';

/**
 * Validação do provider
 */
if (!providers[currentProviderName]) {
  console.warn(
    `⚠️ Provider de IA "${currentProviderName}" não encontrado. Usando "gemini" como fallback.`
  );
  console.warn(`Providers disponíveis: ${Object.keys(providers).join(', ')}`);
}

/**
 * Instância do serviço de IA ativo
 * Este é o objeto único que todo o código deve usar
 */
export const aiService: IAIService = providers[currentProviderName] || providers.gemini;

/**
 * Exporta tipos para uso externo
 */
export type {
  IAIService,
  StyleRecommendation,
  UpsellRecommendation,
  SustainabilityAnalysis,
  ChatMessage,
  FaceAnalysis,
  ProfessionalType,
} from './aiService';

/**
 * Log de inicialização (apenas em desenvolvimento)
 */
if (import.meta.env.DEV) {
  console.log(`🤖 AI Service inicializado com provider: ${currentProviderName}`);
}

