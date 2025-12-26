// src/hooks/useProduct.ts
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface ProductDetail {
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
  in_stock?: boolean;
  created_at?: string;
}

export function useProduct(productId: string) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();

        if (fetchError) throw fetchError;

        setProduct(data);
      } catch (err: any) {
        console.error('Error fetching product:', err);
        setError(err.message || 'Erro ao carregar produto');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();

    // Realtime subscription for product updates (stock, price, etc.)
    const channel = supabase
      .channel(`product_${productId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'products',
          filter: `id=eq.${productId}`,
        },
        (payload) => {
          console.log('Product updated:', payload);
          setProduct(payload.new as ProductDetail);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [productId]);

  return { product, loading, error };
}

