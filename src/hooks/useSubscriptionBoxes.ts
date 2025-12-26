// src/hooks/useSubscriptionBoxes.ts
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface SubscriptionBox {
  id: string;
  tier: string;
  name: string;
  description?: string;
  price: number;
  products?: string[]; // Array of product IDs
  product_details?: any[]; // Full product objects if joined
  image?: string;
  created_at?: string;
}

export function useSubscriptionBoxes() {
  const [boxes, setBoxes] = useState<SubscriptionBox[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBoxes() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('subscription_boxes')
          .select('*')
          .order('price', { ascending: true })
          .limit(10);

        if (fetchError) throw fetchError;

        // If boxes have product IDs, fetch product details
        const boxesWithProducts = await Promise.all(
          (data || []).map(async (box) => {
            if (box.products && box.products.length > 0) {
              const { data: productsData } = await supabase
                .from('products')
                .select('*')
                .in('id', box.products)
                .limit(10);

              return {
                ...box,
                product_details: productsData || [],
              };
            }
            return box;
          })
        );

        setBoxes(boxesWithProducts);
      } catch (err: any) {
        console.error('Error fetching subscription boxes:', err);
        setError(err.message || 'Erro ao carregar boxes de assinatura');
      } finally {
        setLoading(false);
      }
    }

    fetchBoxes();
  }, []);

  return { boxes, loading, error };
}

