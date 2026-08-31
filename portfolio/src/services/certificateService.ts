import { supabase } from './supabase';
import type { Certificate } from '../types';

export const certificateService = {
  // Fetch all certificates
  async getCertificates(): Promise<Certificate[]> {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('issue_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching certificates:', error);
      return [];
    }
  },

  // Fetch single certificate
  async getCertificate(id: string): Promise<Certificate | null> {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching certificate:', error);
      return null;
    }
  },

  // Create certificate (admin only)
  async createCertificate(certificate: Omit<Certificate, 'id' | 'created_at'>): Promise<Certificate | null> {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .insert([certificate])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating certificate:', error);
      return null;
    }
  },

  // Update certificate (admin only)
  async updateCertificate(id: string, certificate: Partial<Certificate>): Promise<Certificate | null> {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .update(certificate)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating certificate:', error);
      return null;
    }
  },

  // Delete certificate (admin only)
  async deleteCertificate(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('certificates')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting certificate:', error);
      return false;
    }
  },

  // Delete file from storage
  async deleteFile(path: string): Promise<boolean> {
    try {
      const { error } = await supabase.storage
        .from('certificates')
        .remove([path]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  },

  // Upload file to storage
  async uploadFile(file: File): Promise<string | null> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `certificates/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('certificates')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('certificates')
        .getPublicUrl(filePath);

      return data?.publicUrl || null;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  },
};

export default certificateService;
