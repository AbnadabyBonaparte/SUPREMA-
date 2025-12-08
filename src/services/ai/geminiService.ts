// Função Chat com Grounding
export async function chatWithGemini(messages: Message[]): Promise<string> {
  const model = ai.getGenerativeModel({ model: 'gemini-2.5-pro' })
  const chat = model.startChat({
    history: messages.map(m => ({ role: m.role, parts: [{ text: m.content }] })),
  })
  const lastUserMessage = messages[messages.length - 1].content
  const result = await chat.sendMessage(lastUserMessage)
  return result.response.text()
}

// Veo Video Generation (simplificado — base64 ou URL)
export async function generateVideo(prompt: string): Promise<string> {
  // Implementação Veo via Gemini API (quando disponível)
  // Placeholder premium
  return 'video_base64_or_url_here'
}
