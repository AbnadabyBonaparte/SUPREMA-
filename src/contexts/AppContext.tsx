// src/contexts/AppContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { User as SupabaseUser } from '@supabase/supabase-js';

// ==================== INTERFACES ====================
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  tier: 'free' | 'pro' | 'premium' | 'luxury';
  createdAt: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category?: string;
}

interface AppContextType {
  // User
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Loading
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// ==================== CONTEXT ====================
const AppContext = createContext<AppContextType | undefined>(undefined);

// ==================== PROVIDER ====================
export const AppProvider = ({ children }: { children: ReactNode }) => {
  // User State - inicializado como null, será preenchido pelo Supabase Auth
  const [user, setUser] = useState<User | null>(null);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('alsham_cart');
    return stored ? JSON.parse(stored) : [];
  });

  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('alsham_theme');
    return (stored as 'light' | 'dark') || 'dark';
  });

  // Loading State
  const [isLoading, setIsLoading] = useState(true); // Inicia como true para verificar sessão

  // ==================== EFFECTS ====================
  // Verificar sessão do Supabase ao montar
  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(mapSupabaseUserToAppUser(session.user));
      }
      setIsLoading(false);
    });

    // Monitorar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(mapSupabaseUserToAppUser(session.user));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Persistir user no localStorage para compatibilidade (opcional)
  useEffect(() => {
    if (user) {
      localStorage.setItem('alsham_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('alsham_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('alsham_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('alsham_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // ==================== USER FUNCTIONS ====================
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session?.user) {
        setUser(mapSupabaseUserToAppUser(data.session.user));
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      clearCart();
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ==================== CART FUNCTIONS ====================
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(i => (i.id === id ? { ...i, quantity } : i)));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  // ==================== THEME ====================
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  // ==================== VALUE ====================
  const value: AppContextType = {
    user,
    setUser,
    login,
    logout,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    theme,
    toggleTheme,
    isLoading,
    setIsLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// ==================== HOOK ====================
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// ==================== HELPER FUNCTIONS ====================
/**
 * Mapeia o usuário do Supabase para o formato do App
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

export default AppContext;
