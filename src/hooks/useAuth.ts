import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';
import type { User } from '@/contexts/AppContext';

/**
 * Hook de autenticação usando Supabase Auth
 * Gerencia sessão, login, logout e signup
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar sessão inicial e monitorar mudanças
  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session ? mapSupabaseUserToAppUser(session.user) : null);
      setLoading(false);
    });

    // Monitorar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session ? mapSupabaseUserToAppUser(session.user) : null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Login com email e senha
   */
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session && data.user) {
        setSession(data.session);
        setUser(mapSupabaseUserToAppUser(data.user));
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Signup com email e senha
   */
  const signUp = async (email: string, password: string, name?: string): Promise<void> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || email.split('@')[0],
          },
        },
      });

      if (error) throw error;

      if (data.session && data.user) {
        setSession(data.session);
        setUser(mapSupabaseUserToAppUser(data.user));
      }
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout
   */
  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setSession(null);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    session,
    loading,
    login,
    signUp,
    logout,
  };
}

/**
 * Mapeia o usuário do Supabase para o formato do App
 * Busca informações adicionais do perfil se necessário
 */
function mapSupabaseUserToAppUser(supabaseUser: SupabaseUser): User {
  const userMetadata = supabaseUser.user_metadata || {};
  const name = userMetadata.name || userMetadata.full_name || supabaseUser.email?.split('@')[0] || 'Usuário';
  const avatar = userMetadata.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${supabaseUser.email}`;

  // Por padrão, usuário começa como 'free'
  // O tier pode ser atualizado depois baseado na subscription
  const tier = (userMetadata.tier as User['tier']) || 'free';

  return {
    id: supabaseUser.id,
    name,
    email: supabaseUser.email || '',
    avatar,
    tier,
    createdAt: supabaseUser.created_at,
  };
}

