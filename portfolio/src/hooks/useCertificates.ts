import { useState, useEffect, useCallback } from 'react';
import type { Certificate } from '../types';
import { supabase } from '../services/supabase';
import certificateService from '../services/certificateService';

export const useCertificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch certificates
  const fetchCertificates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await certificateService.getCertificates();
      setCertificates(data);
    } catch (err) {
      setError('Failed to fetch certificates');
      console.error('Error fetching certificates:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Subscribe to realtime changes
  useEffect(() => {
    // Initial fetch
    fetchCertificates();

    // Setup realtime subscription
    const channel = supabase
      .channel('certificates-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'certificates',
        },
        () => {
          fetchCertificates();
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchCertificates]);

  return {
    certificates,
    loading,
    error,
    refetch: fetchCertificates,
  };
};

export default useCertificates;
