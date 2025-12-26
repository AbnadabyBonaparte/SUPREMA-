import { createClient } from '@supabase/supabase-js';
import { env } from './env';

/**
 * Cliente Supabase único e centralizado
 * Este é o ÚNICO lugar onde o cliente Supabase deve ser criado
 * 
 * Para usar em outros arquivos:
 * import { supabase } from '@/lib/supabaseClient';
 */
export const supabase = createClient(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

/**
 * Função auxiliar para salvar Lead
 * Mantida para compatibilidade com código existente
 */
export async function saveLead(name: string, email: string) {
  const { data, error } = await supabase
    .from('leads')
    .insert([
      { name: name, email: email, tier: 'black_member_waitlist', created_at: new Date() }
    ])
    .select();

  return { data, error };
}

