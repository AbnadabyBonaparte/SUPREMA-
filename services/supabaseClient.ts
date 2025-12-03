
import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';

// NOTA PARA O DESENVOLVEDOR (VOCÊ):
// Para o deploy funcionar, você deve configurar as Variáveis de Ambiente no Vercel.
// 1. Crie um projeto no Supabase.
// 2. Pegue a URL e a Key (Anon Public).
// 3. No Vercel, adicione VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.

export const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

// Função auxiliar para salvar Lead
export async function saveLead(name: string, email: string) {
    const { data, error } = await supabase
        .from('leads')
        .insert([
            { name: name, email: email, tier: 'black_member_waitlist', created_at: new Date() }
        ])
        .select();

    return { data, error };
}
