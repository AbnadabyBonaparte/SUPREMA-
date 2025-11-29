import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

export async function getAIRecommendation(prompt: string, agentId: string, images?: string[]) {
  const messages: any[] = [
    { role: "system", content: `Você é um especialista em beleza de luxo da Alsham Suprema Beleza. Responda em português, com tom premium e sempre retorne exatamente 3 recomendações em JSON válido.` },
    { role: "user", content: prompt || "Analise minhas fotos e me dê 3 recomendações personalizadas de beleza." }
  ];

  if (images?.length) {
    images.forEach(img => {
      messages.push({
        role: "user",
        content: [{ type: "image_url", image_url: { url: img } }]
      });
    });
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
    response_format: { type: "json_object" },
    max_tokens: 1000
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}
