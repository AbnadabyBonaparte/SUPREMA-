// src/hooks/useAppointments.ts
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useApp } from '@/contexts/AppContext';

export interface Appointment {
  id: string;
  user_id: string;
  salon_id: string;
  salon_name?: string;
  professional_id?: string;
  professional_name?: string;
  service: string;
  service_price?: number;
  date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  created_at?: string;
}

export function useAppointments() {
  const { user } = useApp();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setAppointments([]);
      setLoading(false);
      return;
    }

    async function fetchAppointments() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('appointments')
          .select(`
            *,
            salons:salon_id (name),
            professionals:professional_id (name)
          `)
          .eq('user_id', user.id)
          .order('date', { ascending: false })
          .limit(50);

        if (fetchError) throw fetchError;

        // Transform data to include salon and professional names
        const transformedData = (data || []).map((apt: any) => ({
          ...apt,
          salon_name: apt.salons?.name,
          professional_name: apt.professionals?.name,
        }));

        setAppointments(transformedData);
      } catch (err: any) {
        console.error('Error fetching appointments:', err);
        setError(err.message || 'Erro ao carregar agendamentos');
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, [user]);

  return { appointments, loading, error };
}

