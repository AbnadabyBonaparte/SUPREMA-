// src/hooks/useProducts.ts
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  category: string;
  brand?: string;
  rating?: number;
  reviews_count?: number;
  image?: string;
  images?: string[];
  is_new?: boolean;
  is_best_seller?: boolean;
  sustainability_score?: number;
  created_at?: string;
}

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);

        if (category && category !== 'Todos') {
          query = query.eq('category', category);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        setProducts(data || []);
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Erro ao carregar produtos');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  return { products, loading, error, refetch: () => {
    const categoryParam = category;
    // Trigger re-fetch by updating dependency
    setProducts([]);
    setLoading(true);
  }};
}

