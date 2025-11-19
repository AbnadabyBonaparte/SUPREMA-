
import { createClient } from '@supabase/supabase-js';

// NOTA PARA O DESENVOLVEDOR (VOCÊ):
// Para o deploy funcionar, você deve configurar as Variáveis de Ambiente no Vercel.
// 1. Crie um projeto no Supabase.
// 2. Pegue a URL e a Key (Anon Public).
// 3. No Vercel, adicione VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

// Cria o cliente apenas se as chaves existirem (evita erro no ambiente de dev local sem env)
export const supabase = (supabaseUrl && supabaseAnonKey) 
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Função auxiliar para salvar Lead
export async function saveLead(name: string, email: string) {
    if (!supabase) {
        console.warn("Supabase não configurado. Dados não serão salvos na nuvem.");
        return { error: "Banco de dados não conectado. Configure o VITE_SUPABASE_URL." };
    }

    const { data, error } = await supabase
        .from('leads')
        .insert([
            { name: name, email: email, tier: 'black_member_waitlist', created_at: new Date() }
        ])
        .select();

    return { data, error };
}
