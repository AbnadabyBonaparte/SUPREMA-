// src/hooks/useSalons.ts
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface Salon {
  id: string;
  name: string;
  address: string;
  image?: string;
  images?: string[];
  rating?: number;
  reviews_count?: number;
  distance?: string;
  is_verified?: boolean;
  created_at?: string;
}

export interface Professional {
  id: string;
  salon_id: string;
  name: string;
  role: string;
  avatar?: string;
  rating?: number;
  created_at?: string;
}

export interface Service {
  id: string;
  professional_id: string;
  name: string;
  price: number;
  duration?: string;
  created_at?: string;
}

export interface SalonWithProfessionals extends Salon {
  professionals?: (Professional & { services?: Service[] })[];
}

export function useSalons() {
  const [salons, setSalons] = useState<SalonWithProfessionals[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSalons() {
      try {
        setLoading(true);
        setError(null);

        // Fetch salons
        const { data: salonsData, error: salonsError } = await supabase
          .from('salons')
          .select('*')
          .order('rating', { ascending: false, nullsFirst: false })
          .limit(50);

        if (salonsError) throw salonsError;

        // Fetch professionals for each salon
        const salonsWithProfessionals = await Promise.all(
          (salonsData || []).map(async (salon) => {
            const { data: professionalsData } = await supabase
              .from('professionals')
              .select('*')
              .eq('salon_id', salon.id)
              .limit(10);

            // Fetch services for each professional
            const professionalsWithServices = await Promise.all(
              (professionalsData || []).map(async (professional) => {
                const { data: servicesData } = await supabase
                  .from('services')
                  .select('*')
                  .eq('professional_id', professional.id)
                  .limit(10);

                return {
                  ...professional,
                  services: servicesData || [],
                };
              })
            );

            return {
              ...salon,
              professionals: professionalsWithServices,
            };
          })
        );

        setSalons(salonsWithProfessionals);
      } catch (err: any) {
        console.error('Error fetching salons:', err);
        setError(err.message || 'Erro ao carregar salões');
      } finally {
        setLoading(false);
      }
    }

    fetchSalons();
  }, []);

  return { salons, loading, error };
}

