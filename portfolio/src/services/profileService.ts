import { supabase } from "./supabase";

export interface SiteProfile {
  id: string;
  profile_image_url: string;
  updated_at?: string;
}

export const profileService = {
  // Fetch profile (public read)
  async getProfile(): Promise<SiteProfile | null> {
    try {
      const { data, error } = await supabase
        .from("site_profile")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  },

  // Upload profile image to the "profile" storage bucket
  async uploadProfileImage(file: File): Promise<string | null> {
    try {
      const fileExt = (file.name.split(".").pop() || "jpg").toLowerCase();
      const fileName = `profile-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("profile")
        .upload(fileName, file, {
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) {
        console.error("Upload error detail:", uploadError.message);
        throw uploadError;
      }

      const { data } = supabase.storage.from("profile").getPublicUrl(fileName);
      return data?.publicUrl || null;
    } catch (error) {
      console.error("Error uploading profile image:", error);
      return null;
    }
  },

  // Save profile image URL to the site_profile table (authenticated only)
  async saveProfile(imageUrl: string): Promise<SiteProfile | null> {
    try {
      const existing = await profileService.getProfile();

      if (existing) {
        const { data, error } = await supabase
          .from("site_profile")
          .update({ profile_image_url: imageUrl })
          .eq("id", existing.id)
          .select()
          .single();
        if (error) throw error;
        return data;
      }

      const { data, error } = await supabase
        .from("site_profile")
        .insert([{ profile_image_url: imageUrl }])
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error saving profile:", error);
      return null;
    }
  },
};

export default profileService;
