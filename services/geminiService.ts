
import { GoogleGenAI, GenerateContentResponse, Type, Modality } from "@google/genai";
import { agentInstructions } from '../agents';
import { StyleRecommendation, ChatMessage, ProfessionalType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
  
  // Seleciona a instrução correta baseada no tipo de profissional
  const systemInstruction = agentInstructions[professional] || agentInstructions['barber_x0'];

  const contents: any[] = [];
  
  // Adiciona todas as imagens fornecidas para contexto 3D
  if (images && images.length > 0) {
      images.forEach(img => contents.push(img));
  }
  
  contents.push({ text: prompt });

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: { parts: contents },
    config: {
      responseMimeType: 'application/json',
      responseSchema: styleResponseSchema,
      systemInstruction: systemInstruction,
      thinkingConfig: { thinkingBudget: 32768 }, // Budget alto para raciocínio transcendental
    },
  });

  const result = JSON.parse(response.text.trim());
  return result.recommendations as StyleRecommendation[];
}

export async function generateImage(prompt: string, aspectRatio: '1:1' | '16:9' | '9:16' | '4:3' | '3:4'): Promise<string> {
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: prompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
      aspectRatio: aspectRatio,
    },
  });
  const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
  return `data:image/jpeg;base64,${base64ImageBytes}`;
}

export async function editImage(prompt: string, image: { data: string; mimeType: string }): Promise<string> {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [ { inlineData: { data: image.data, mimeType: image.mimeType } }, { text: prompt } ] },
        config: { responseModalities: [Modality.IMAGE] },
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
    }
    throw new Error("Nenhuma imagem editada foi retornada pela API.");
}

export async function generateVideo(prompt: string, image: { data: string; mimeType: string }, aspectRatio: '16:9' | '9:16') {
  const newAi = new GoogleGenAI({ apiKey: process.env.API_KEY });
  let operation = await newAi.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    image: { imageBytes: image.data, mimeType: image.mimeType },
    config: { numberOfVideos: 1, resolution: '720p', aspectRatio: aspectRatio }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    operation = await newAi.operations.getVideosOperation({ operation: operation });
  }
  
  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) {
    throw new Error("A geração de vídeo falhou ou não retornou um link.");
  }

  const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  const blob = await videoResponse.blob();
  return URL.createObjectURL(blob);
}

export async function getChatResponse(history: { role: 'user' | 'model'; parts: { text: string }[] }[], newMessage: string, useSearch: boolean, useMaps: boolean, location?: GeolocationCoordinates): Promise<ChatMessage> {
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
    model: 'gemini-2.5-flash',
    contents: [...history, { role: 'user', parts: [{ text: newMessage }] }],
    config: Object.keys(config).length > 0 ? config : undefined,
  });
  
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
  const groundingSources = groundingChunks?.map(chunk => ({
      uri: chunk.web?.uri || chunk.maps?.uri || '',
      title: chunk.web?.title || chunk.maps?.title || 'Fonte do Mapa'
  })).filter(source => source.uri);

  return { role: 'model', text: response.text, groundingSources: groundingSources };
}

export async function generateSpeech(text: string): Promise<string> {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
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
}

// --- AURA: AI CONTEXT ENGINE ---
export async function getAuraInsight(pageContext: string): Promise<string> {
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
        model: 'gemini-2.5-flash',
        contents: [{ parts: [{ text: prompt }] }]
    });

    return response.text.trim();
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
}
