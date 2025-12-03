import { z } from 'zod';

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url('VITE_SUPABASE_URL deve ser uma URL válida'),
  VITE_SUPABASE_ANON_KEY: z.string().min(1, 'VITE_SUPABASE_ANON_KEY é obrigatório'),
  VITE_GOOGLE_API_KEY: z.string().min(1, 'VITE_GOOGLE_API_KEY é obrigatório'),
  VITE_STRIPE_PUBLISHABLE_KEY: z.string().min(1, 'VITE_STRIPE_PUBLISHABLE_KEY é obrigatório'),
  VITE_ENABLE_ANALYTICS: z
    .string()
    .optional()
    .transform((value) => value === 'true'),
  VITE_GA_MEASUREMENT_ID: z.string().optional(),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error('❌ Variáveis de ambiente inválidas:', parsed.error.message);
  throw new Error('Falha ao carregar variáveis de ambiente. Confira o arquivo .env.');
}

export const env = parsed.data;
