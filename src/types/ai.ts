// src/types/ai.ts
export interface StyleRecommendation {
  id: string;
  title: string;
  description: string;
  steps: string[];
  products: string[];
  salonSuggestions?: any[];
  imagePrompt?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
}