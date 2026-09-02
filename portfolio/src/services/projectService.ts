import { supabase } from "./supabase";
import type { Project } from "../types";

export const projectService = {
  // Fetch all projects
  async getProjects(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data || []).map((p: any) => ({
        ...p,
        technologies: p.technologies ?? [],
      }));
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  },

  // Fetch single project
  async getProject(id: string): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data ? { ...data, technologies: data.technologies ?? [] } : null;
    } catch (error) {
      console.error("Error fetching project:", error);
      return null;
    }
  },

  // Create project (admin only)
  async createProject(project: Omit<Project, "id">): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from("projects")
        .insert([project])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating project:", error);
      return null;
    }
  },

  // Update project (admin only)
  async updateProject(
    id: string,
    project: Partial<Project>,
  ): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from("projects")
        .update(project)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating project:", error);
      return null;
    }
  },

  // Delete project (admin only)
  async deleteProject(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error deleting project:", error);
      return false;
    }
  },

  // Upload project image to storage bucket 'projects'
  async uploadFile(file: File): Promise<string | null> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("projects")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      // Lempar error asli Supabase agar penyebabnya terlihat di UI
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage.from("projects").getPublicUrl(filePath);
    return data?.publicUrl || null;
  },
};

export default projectService;
