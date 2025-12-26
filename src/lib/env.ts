import { z } from 'zod';

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url('VITE_SUPABASE_URL deve ser uma URL válida'),
  VITE_SUPABASE_ANON_KEY: z.string().min(1, 'VITE_SUPABASE_ANON_KEY é obrigatório'),
  // Permite placeholders para não quebrar o build; funcionalidades ficam limitadas.
  VITE_GOOGLE_API_KEY: z.string().optional(),
  VITE_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  VITE_ENABLE_ANALYTICS: z
    .string()
    .optional()
    .transform((value) => value === 'true'),
  VITE_GA_MEASUREMENT_ID: z.string().optional(),
  // Provider de IA (gemini, grok, claude, local) — padrão: gemini
  VITE_AI_PROVIDER: z.enum(['gemini', 'grok', 'claude', 'local']).optional().default('gemini'),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error('❌ Variáveis de ambiente inválidas:', parsed.error.message);
  throw new Error('Falha ao carregar variáveis de ambiente. Confira o arquivo .env.');
}

const envWithFallback = {
  ...parsed.data,
  VITE_GOOGLE_API_KEY: parsed.data.VITE_GOOGLE_API_KEY || 'placeholder-google-key',
  VITE_STRIPE_PUBLISHABLE_KEY: parsed.data.VITE_STRIPE_PUBLISHABLE_KEY || 'placeholder-stripe-key',
};

if (
  envWithFallback.VITE_GOOGLE_API_KEY === 'placeholder-google-key' ||
  envWithFallback.VITE_STRIPE_PUBLISHABLE_KEY === 'placeholder-stripe-key'
) {
  console.warn(
    '⚠️ Variáveis de ambiente VITE_GOOGLE_API_KEY e/ou VITE_STRIPE_PUBLISHABLE_KEY não definidas. Usando placeholders; recursos de Google AI ou Stripe podem não funcionar.'
  );
}

export const env = envWithFallback;
