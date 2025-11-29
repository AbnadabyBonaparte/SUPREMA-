// src/services/ai/gemini/geminiService.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ProfessionalType, agentConfigs } from '../agents';
import type { StyleRecommendation } from '../../types/ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const pro = genAI.getGenerativeModel({ model: "gemini-2.5-pro-exp-03-25" });
const flash = genAI.getGenerativeModel({ model: "gemini-2.5-flash-exp" });

export class GeminiService {
  async getStyleRecommendations(
    prompt: string,
    agentId: ProfessionalType,
    images?: string[]
  ): Promise<StyleRecommendation[]> {
    const agent = agentConfigs[agentId];
    const result = await pro.generateContent([
      agent.systemInstruction,
      prompt,
      ...(images?.map(img => ({ inlineData: { data: img.split(',')[1], mimeType: img.split(':')[1].split(';')[0] } })) || [])
    ], {
      generationConfig: { responseMimeType: "application/json" }
    });
    return JSON.parse((await result.response).text());
  }

  // Outros métodos (generateImage, editImage, generateVideo, TTS, chat, AURA) seguem o mesmo padrão
  // Posso mandar completos se quiser agora
}

export const geminiService = new GeminiService();