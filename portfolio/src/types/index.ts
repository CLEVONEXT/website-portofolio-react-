export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  description: string;
  image_url: string;
  certificate_url?: string;
  issue_date: string;
  category: string;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  bio: string;
  location: string;
  avatar_url?: string;
  created_at: string;
}
