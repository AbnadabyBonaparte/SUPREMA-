import { GoogleGenerativeAI } from "@google/generative-ai";
import { ProfessionalType } from "@/types/ai";

// 1. Tenta pegar a chave
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// 2. Variável para armazenar a instância (Lazy loading)
let genAI: GoogleGenerativeAI | null = null;

// 3. Função segura de inicialização (Só cria se tiver chave)
const getGenAI = () => {
  if (genAI) return genAI;
  
  if (!API_KEY) {
    console.warn("⚠️ VITE_GEMINI_API_KEY não encontrada. A IA não funcionará.");
    return null;
  }
  
  genAI = new GoogleGenerativeAI(API_KEY);
  return genAI;
};

// --- FUNÇÕES EXPORTADAS (Todas blindadas) ---

export const getStyleRecommendations = async (
  prompt: string,
  professional: string,
  images: any[] = []
) => {
  try {
    const ai = getGenAI();
    if (!ai) return fallbackResponse(); // Não trava, só retorna fake

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      `Atue como ${professional}. Análise: ${prompt}`,
      ...images
    ]);
    return result.response.text();
  } catch (error) {
    console.error("Erro na IA:", error);
    return fallbackResponse();
  }
};

const fallbackResponse = () => JSON.stringify({
  recommendations: [{ 
    outfitName: "Consultoria Indisponível", 
    description: "Configure a API Key no Vercel para ativar a IA.",
    technicalAnalysis: "Sistema aguardando configuração.",
    items: [],
    recommendedProducts: []
  }]
});

export const generateImage = async (prompt: string) => {
  return "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80";
};

export const getChatResponse = async (history: any[], msg: string) => {
  try {
    const ai = getGenAI();
    if (!ai) return { role: 'model', text: "Olá! A chave da API não foi configurada no sistema." };

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({ history: [] }); 
    const result = await chat.sendMessage(msg);
    return { role: 'model', text: result.response.text() };
  } catch (error) {
    return { role: 'model', text: "Erro ao conectar com a IA." };
  }
};

// Placeholders seguros para as outras funções
export const editImage = async () => "";
export const generateVideo = async () => "";
export const generateSpeech = async () => "";
export const playTextAsSpeech = async () => {};
export const getAuraInsight = async () => "Bem-vindo ao Alsham Suprema Beleza!";