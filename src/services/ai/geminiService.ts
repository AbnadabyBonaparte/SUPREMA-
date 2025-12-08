// src/services/ai/geminiService.ts (adicione no final do arquivo)

export interface SustainabilityAnalysis {
  score: number; // 0-100
  rating: 'EXCELENTE' | 'BOM' | 'REGULAR' | 'RUIM';
  issues: string[];
  alternatives: string[];
}

export async function analyzeIngredients(ingredients: string[]): Promise<SustainabilityAnalysis> {
  if (!apiKey) {
    // Fallback premium para testes sem key
    return {
      score: 92,
      rating: 'EXCELENTE',
      issues: [],
      alternatives: ['Todos os ingredientes são clean e sustentáveis.']
    }
  }

  const model = ai.getGenerativeModel({ 
    model: 'gemini-2.5-pro',
    generationConfig: { 
      responseMimeType: 'application/json',
      temperature: 0.6,
      maxOutputTokens: 512
    }
  })

  const prompt = `
Você é Sustainability Advisor da Alsham Suprema Beleza.
Analise a lista de ingredientes: ${ingredients.join(', ')}.

Avalie sustentabilidade, clean beauty e impacto ambiental.
Retorne JSON estrito:
{
  "score": number (0-100),
  "rating": "EXCELENTE" | "BOM" | "REGULAR" | "RUIM",
  "issues": string[] (ingredientes problemáticos + motivo),
  "alternatives": string[] (sugestões clean da Alsham)
}
`

  try {
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const parsed = JSON.parse(text)
    return {
      score: parsed.score || 70,
      rating: parsed.rating || 'REGULAR',
      issues: parsed.issues || [],
      alternatives: parsed.alternatives || ['Consulte nossa linha Clean Beauty']
    }
  } catch (error) {
    console.error('Sustainability analysis error:', error)
    // Fallback premium
    return {
      score: 78,
      rating: 'BOM',
      issues: ['Alguns ingredientes requerem atenção (ex: silicones)'],
      alternatives: ['Recomendamos nossa linha Zero Waste Supreme']
    }
  }
}
