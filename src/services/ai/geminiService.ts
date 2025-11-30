// src/services/ai/geminiService.ts
import { GoogleGenAI, GenerateContentResponse, Type, Modality } from "@google/genai";
import { agentConfigs } from './agents';
import { StyleRecommendation, ChatMessage, ProfessionalType } from "@/types/ai";

// Tenta obter a chave de forma segura
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.warn('⚠️ VITE_GEMINI_API_KEY not found in environment variables. AI features will not work properly.');
}

// Inicialização segura: Se não tiver chave, cria com string vazia para não quebrar o build,
// mas as chamadas falharão graciosamente.
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

const styleResponseSchema = {
    type: Type.OBJECT,
    properties: {
        recommendations: {
            type: Type.ARRAY,
            description: 'List of 3 recommendations.',
            items: {
                type: Type.OBJECT,
                properties: {
                    outfitName: { type: Type.STRING },
                    description: { type: Type.STRING },
                    technicalAnalysis: { type: Type.STRING, description: "Analysis of face shape, colorimetry, or body type." },
                    items: { type: Type.ARRAY, items: { type: Type.STRING } },
                    recommendedProducts: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING },
                                price: { type: Type.STRING },
                                reason: { type: Type.STRING }
                            }
                        }
                    }
                },
                required: ['outfitName', 'description', 'items', 'technicalAnalysis'],
            },
        },
    },
    required: ['recommendations'],
};

export async function getStyleRecommendations(
    prompt: string,
    professional: ProfessionalType,
    images?: { inlineData: { data: string; mimeType: string } }[]
): Promise<StyleRecommendation[]> {
    try {
        if (!apiKey) throw new Error("API Key is missing. Please configure VITE_GEMINI_API_KEY.");

        // Get agent configuration
        const agentConfig = agentConfigs[professional];
        const systemInstruction = agentConfig?.systemInstruction || agentConfigs['barber_x0'].systemInstruction;

        const contents: any[] = [];

        // Add all images for 3D context
        if (images && images.length > 0) {
            images.forEach(img => contents.push(img));
        }

        contents.push({ text: prompt || "Analyze the images and provide 3 personalized recommendations." });

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp',
            contents: { parts: contents },
            config: {
                responseMimeType: 'application/json',
                responseSchema: styleResponseSchema,
                systemInstruction: systemInstruction,
                thinkingConfig: { thinkingBudget: 32768 },
            },
        });

        if (!response.text) throw new Error("No response from AI");
        
        const result = JSON.parse(response.text.trim());
        return result.recommendations as StyleRecommendation[];
    } catch (error: any) {
        console.error('Error in getStyleRecommendations:', error);
        // Retorna array vazio para não quebrar a UI
        return [];
    }
}

export async function generateImage(
    prompt: string,
    aspectRatio: '1:1' | '16:9' | '9:16' | '4:3' | '3:4'
): Promise<string> {
    try {
        if (!apiKey) throw new Error("API Key is missing.");

        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-001', // Ajustado para modelo estável se o 4.0 falhar
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: aspectRatio,
            },
        });
        
        if (!response.generatedImages?.[0]?.image?.imageBytes) {
             throw new Error("No image generated");
        }

        const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
        return `data:image/jpeg;base64,${base64ImageBytes}`;
    } catch (error: any) {
        console.error('Error in generateImage:', error);
        // Retorna imagem de fallback
        return "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80";
    }
}

export async function editImage(
    prompt: string,
    image: { data: string; mimeType: string }
 ): Promise<string> {
    try {
        if (!apiKey) throw new Error("API Key is missing.");

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp',
            contents: {
                parts: [
                    { inlineData: { data: image.data, mimeType: image.mimeType } },
                    { text: prompt }
                ]
            },
            config: { responseModalities: [Modality.IMAGE] },
        });

        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                }
            }
        }
        throw new Error("Nenhuma imagem editada foi retornada pela API.");
    } catch (error: any) {
        console.error('Error in editImage:', error);
        throw new Error(error.message || 'Failed to edit image');
    }
}

export async function generateVideo(
    prompt: string,
    image: { data: string; mimeType: string },
    aspectRatio: '16:9' | '9:16'
) {
    try {
        if (!apiKey) throw new Error("API Key is missing.");

        // Nota: new GoogleGenAI recriado para garantir contexto limpo
        const newAi = new GoogleGenAI({ apiKey: apiKey });
        
        let operation = await newAi.models.generateVideos({
            model: 'veo-2.0-generate-preview-001', // Ajustado para modelo disponível
            prompt: prompt,
            image: { imageBytes: image.data, mimeType: image.mimeType },
            config: { numberOfVideos: 1, resolution: '720p', aspectRatio: aspectRatio }
        });

        // Polling para esperar o vídeo ficar pronto
        let attempts = 0;
        while (!operation.done && attempts < 30) { // Timeout de segurança
            await new Promise(resolve => setTimeout(resolve, 5000));
            operation = await newAi.operations.getVideosOperation({ operation: operation });
            attempts++;
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (!downloadLink) {
            throw new Error("A geração de vídeo falhou ou não retornou um link.");
        }

        // O link precisa da chave API para ser baixado
        const videoResponse = await fetch(`${downloadLink}&key=${apiKey}`);
        const blob = await videoResponse.blob();
        return URL.createObjectURL(blob);
    } catch (error: any) {
        console.error('Error in generateVideo:', error);
        throw new Error(error.message || 'Failed to generate video');
    }
}

export async function getChatResponse(
    history: { role: 'user' | 'model'; parts: { text: string }[] }[],
    newMessage: string,
    useSearch: boolean,
    useMaps: boolean,
    location?: GeolocationCoordinates
): Promise<ChatMessage> {
    try {
        if (!apiKey) throw new Error("API Key is missing.");

        const tools: any[] = [];
        if (useSearch) tools.push({ googleSearch: {} });
        if (useMaps) tools.push({ googleMaps: {} });

        const toolConfig = useMaps && location ? {
            retrievalConfig: {
                latLng: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                }
            }
        } : undefined;

        const config: any = {};
        if (tools.length > 0) {
            config.tools = tools;
        }
        if (toolConfig) {
            config.toolConfig = toolConfig;
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp',
            contents: [...history, { role: 'user', parts: [{ text: newMessage }] }],
            config: Object.keys(config).length > 0 ? config : undefined,
        });

        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        const groundingSources = groundingChunks?.map(chunk => ({
            uri: chunk.web?.uri || chunk.maps?.uri || '',
            title: chunk.web?.title || chunk.maps?.title || 'Fonte do Mapa'
        })).filter(source => source.uri);

        return { role: 'model', text: response.text || "Desculpe, não entendi.", groundingSources: groundingSources };
    } catch (error: any) {
        console.error('Error in getChatResponse:', error);
        return { role: 'model', text: "Estou tendo dificuldades de conexão no momento. Verifique a chave de API." };
    }
}

export async function generateSpeech(text: string): Promise<string> {
    try {
        if (!apiKey) throw new Error("API Key is missing.");

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-exp",
            contents: [{ parts: [{ text: text }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!base64Audio) {
            throw new Error("A API não retornou dados de áudio.");
        }
        return base64Audio;
    } catch (error: any) {
        console.error('Error in generateSpeech:', error);
        throw new Error(error.message || 'Failed to generate speech');
    }
}

// --- AURA: AI CONTEXT ENGINE ---
export async function getAuraInsight(pageContext: string): Promise<string> {
    try {
        if (!apiKey) return "Bem-vindo ao Alsham Suprema Beleza!";

        const prompt = `
    You are AURA, the Alsham Unified Responsive Assistant.
    The user is currently on the "${pageContext}" page of the Suprema Beleza app.
    Provide a very short, punchy, futuristic, and helpful tip (max 20 words) for this specific context.
    Examples:
    - Home: "Ready to transform? Select an agent to begin."
    - Studio: "Describe your dream look. I will visualize it."
    - Booking: "Finding the best professionals near you."
    Respond in Portuguese.
    `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp',
            contents: [{ parts: [{ text: prompt }] }]
        });

        return response.text ? response.text.trim() : "Estou aqui para ajudar.";
    } catch (error: any) {
        console.error('Error in getAuraInsight:', error);
        return "Estou aqui para ajudar.";
    }
}

// --- UPSELL RECOMMENDATION (NOVO) ---
export async function getUpsellRecommendation(cartItems: string): Promise<{
  name: string;
  price: number;
  reason: string;
}> {
  try {
    if (!apiKey) {
      return {
        name: "Shampoo Premium Alsham",
        price: 89.90,
        reason: "Complementa perfeitamente seus produtos selecionados"
      };
    }

    const prompt = `
Você é um especialista em vendas de produtos de beleza da marca Alsham Suprema Beleza.
O cliente tem no carrinho: ${cartItems}

Sugira UM produto complementar premium que combine perfeitamente com os itens do carrinho.
O produto deve ser da linha Alsham e ter alto valor agregado.

Responda APENAS com JSON no formato:
{
  "name": "Nome do Produto",
  "price": 99.90,
  "reason": "Motivo da recomendação (max 100 caracteres)"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
      }
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }

    const result = JSON.parse(response.text.trim());
    return result;
  } catch (error: any) {
    console.error('Error in getUpsellRecommendation:', error);
    // Fallback
    return {
      name: "Kit Completo Alsham Gold",
      price: 149.90,
      reason: "Perfeito para completar sua rotina de beleza premium"
    };
  }
}

// --- SUSTAINABILITY SCANNER (NOVO) ---
export async function analyzeIngredients(imageBase64: string): Promise<{
  score: number;
  rating: string;
  issues: string[];
  alternatives: string[];
}> {
  try {
    if (!apiKey) {
      return {
        score: 75,
        rating: "BOM",
        issues: [],
        alternatives: ["Produto aprovado! Continue usando."]
      };
    }

    const prompt = `
Você é um especialista em sustentabilidade e ingredientes de produtos de beleza.
Analise a imagem do rótulo/embalagem e avalie:

1. Score de sustentabilidade (0-100)
2. Rating: EXCELENTE (90-100), BOM (70-89), REGULAR (40-69), RUIM (0-39)
3. Problemas encontrados (parabenos, sulfatos, microplásticos, etc.)
4. Alternativas sustentáveis da marca Alsham

Responda APENAS com JSON no formato:
{
  "score": 85,
  "rating": "BOM",
  "issues": ["Lista de problemas"],
  "alternatives": ["Lista de alternativas Alsham"]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: {
        parts: [
          { inlineData: { data: imageBase64.split(',')[1] || imageBase64, mimeType: 'image/jpeg' } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: 'application/json',
      }
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }

    const result = JSON.parse(response.text.trim());
    return result;
  } catch (error: any) {
    console.error('Error in analyzeIngredients:', error);
    // Fallback
    return {
      score: 65,
      rating: "REGULAR",
      issues: ["Não foi possível analisar todos os ingredientes"],
      alternatives: ["Experimente produtos da linha Alsham Clean Beauty"]
    };
  }
}


// --- AUDIO DECODING HELPERS ---
function decode(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

async function decodeAudioDataHelper(data: Uint8Array, ctx: AudioContext): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length;
    const buffer = ctx.createBuffer(1, frameCount, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i] / 32768.0;
    }
    return buffer;
}

export async function playTextAsSpeech(text: string): Promise<void> {
    try {
        if (!apiKey) return;
        
        const base64Audio = await generateSpeech(text);
        const decodedBytes = decode(base64Audio);
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const audioContext = new AudioContext();
        const audioBuffer = await decodeAudioDataHelper(decodedBytes, audioContext);

        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start(0);
    } catch (error: any) {
        console.error('Error in playTextAsSpeech:', error);
    }
}
