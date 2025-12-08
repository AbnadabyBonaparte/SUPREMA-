// src/services/ai/geminiService.ts (adicione no final do arquivo)

export interface UpsellRecommendation {
  productName: string
  reason: string
  price: string
  urgency: 'high' | 'medium' | 'low'
}

export async function getUpsellRecommendation(
  cartItems: string[],
  userProfile?: string
): Promise<UpsellRecommendation[]> {
  if (!apiKey) {
    // Fallback premium para testes sem key
    return [
      {
        productName: 'Kit Supreme Glow',
        reason: 'Complementa perfeitamente seus itens de skincare — clientes semelhantes adoram.',
        price: 'R$ 489,00',
        urgency: 'high'
      }
    ]
  }

  const model = ai.getGenerativeModel({ 
    model: 'gemini-2.5-pro',
    generationConfig: { 
      responseMimeType: 'application/json',
      temperature: 0.7,
      maxOutputTokens: 512
    }
  })

  const prompt = `
Você é Product Specialist da Alsham Suprema Beleza.
O usuário tem no carrinho: ${cartItems.join(', ')}.
${userProfile ? `Perfil: ${userProfile}.` : ''}

Recomende 1-3 produtos upsell premium que complementem perfeitamente.
Retorne JSON estrito:
{
  "recommendations": [
    {
      "productName": "string",
      "reason": "string detalhado e persuasivo",
      "price": "string com R$",
      "urgency": "high" | "medium" | "low"
    }
  ]
}
`

  try {
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const parsed = JSON.parse(text)
    return parsed.recommendations || []
  } catch (error) {
    console.error('Upsell error:', error)
    // Fallback premium
    return [
      {
        productName: 'Óleo Capilar Supreme',
        reason: 'Best-seller que eleva qualquer rotina capilar — 98% das clientes recomendam.',
        price: 'R$ 289,00',
        urgency: 'high'
      }
    ]
  }
}
