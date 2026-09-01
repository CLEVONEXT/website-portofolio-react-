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
      // Validate file before upload
      if (!file || file.size === 0) {
        console.error("File is empty");
        throw new Error("File is empty");
      }

      const fileExt = (file.name.split(".").pop() || "jpg").toLowerCase();
      const fileName = `profile-${Date.now()}.${fileExt}`;

      console.log("Starting upload:", { fileName, fileSize: file.size, fileType: file.type });

      // Upload with proper error handling
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("profile")
        .upload(fileName, file, {
          upsert: true, // Allow overwriting existing file
          contentType: file.type,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        // Check if it's a bucket not found error
        if (uploadError.message?.includes("not found") || uploadError.message?.includes("No such bucket")) {
          throw new Error("Storage bucket not configured. Please contact admin.");
        }
        throw uploadError;
      }

      console.log("Upload successful:", uploadData);

      // Get public URL
      const { data: urlData } = supabase.storage.from("profile").getPublicUrl(fileName);
      const publicUrl = urlData?.publicUrl;

      if (!publicUrl) {
        throw new Error("Failed to generate public URL");
      }

      console.log("Public URL generated:", publicUrl);
      return publicUrl;
    } catch (error: any) {
      console.error("Error uploading profile image:", error);
      // Return error message to be shown to user
      throw new Error(error?.message || "Failed to upload image. Please try again.");
    }
  },

  // Save profile image URL to the site_profile table (authenticated only)
  async saveProfile(imageUrl: string): Promise<SiteProfile | null> {
    try {
      const { data: existing, error: fetchError } = await supabase
        .from("site_profile")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (fetchError) throw fetchError;

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
