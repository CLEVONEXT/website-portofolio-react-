-- Create certificates table (aman dijalankan ulang)
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  issuer VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  certificate_url TEXT,
  issue_date DATE NOT NULL,
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_certificates_category ON public.certificates(category);
CREATE INDEX IF NOT EXISTS idx_certificates_issue_date ON public.certificates(issue_date DESC);
CREATE INDEX IF NOT EXISTS idx_certificates_created_at ON public.certificates(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Policy for public users - can select (read) all certificates
DROP POLICY IF EXISTS "Enable read access for all users" ON public.certificates;
CREATE POLICY "Enable read access for all users" ON public.certificates
  FOR SELECT
  USING (true);

-- Policy for authenticated users only - can insert
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.certificates;
CREATE POLICY "Enable insert for authenticated users only" ON public.certificates
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy for authenticated users only - can update
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.certificates;
CREATE POLICY "Enable update for authenticated users only" ON public.certificates
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Policy for authenticated users only - can delete
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.certificates;
CREATE POLICY "Enable delete for authenticated users only" ON public.certificates
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Create site_profile table (for dynamic profile photo)
CREATE TABLE IF NOT EXISTS public.site_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_image_url TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.site_profile ENABLE ROW LEVEL SECURITY;

-- Public can read profile
DROP POLICY IF EXISTS "Enable read access for site_profile" ON public.site_profile;
CREATE POLICY "Enable read access for site_profile" ON public.site_profile
  FOR SELECT
  USING (true);

-- Authenticated users can manage profile
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.site_profile;
CREATE POLICY "Enable insert for authenticated users" ON public.site_profile
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.site_profile;
CREATE POLICY "Enable update for authenticated users" ON public.site_profile
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Storage bucket for profile photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile', 'profile', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read profile images" ON storage.objects;
CREATE POLICY "Public read profile images" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'profile');

DROP POLICY IF EXISTS "Authenticated upload profile images" ON storage.objects;
CREATE POLICY "Authenticated upload profile images" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'profile' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated update profile images" ON storage.objects;
CREATE POLICY "Authenticated update profile images" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'profile' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated delete profile images" ON storage.objects;
CREATE POLICY "Authenticated delete profile images" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'profile' AND auth.role() = 'authenticated');

-- Enable realtime for certificates table (skip jika sudah pernah ditambahkan)
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.certificates;
EXCEPTION
  WHEN duplicate_object THEN NULL; -- sudah ada di publication
END $$;

-- Create storage bucket for certificates
INSERT INTO storage.buckets (id, name, public)
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;

-- Public can view certificate images
DROP POLICY IF EXISTS "Public read certificate images" ON storage.objects;
CREATE POLICY "Public read certificate images" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'certificates');

-- Authenticated users can upload certificate images
DROP POLICY IF EXISTS "Authenticated upload certificate images" ON storage.objects;
CREATE POLICY "Authenticated upload certificate images" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'certificates' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated update certificate images" ON storage.objects;
CREATE POLICY "Authenticated update certificate images" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'certificates' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated delete certificate images" ON storage.objects;
CREATE POLICY "Authenticated delete certificate images" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'certificates' AND auth.role() = 'authenticated');

-- ============================================================
-- Projects table (admin CRUD)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  github TEXT,
  demo TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.projects;
CREATE POLICY "Enable read access for all users" ON public.projects
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.projects;
CREATE POLICY "Enable insert for authenticated users only" ON public.projects
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.projects;
CREATE POLICY "Enable update for authenticated users only" ON public.projects
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.projects;
CREATE POLICY "Enable delete for authenticated users only" ON public.projects
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Realtime for projects (skip jika sudah ada)
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('projects', 'projects', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read project images" ON storage.objects;
CREATE POLICY "Public read project images" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'projects');

DROP POLICY IF EXISTS "Authenticated upload project images" ON storage.objects;
CREATE POLICY "Authenticated upload project images" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'projects' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated update project images" ON storage.objects;
CREATE POLICY "Authenticated update project images" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'projects' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated delete project images" ON storage.objects;
CREATE POLICY "Authenticated delete project images" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'projects' AND auth.role() = 'authenticated');

-- Insert dummy data (optional)
INSERT INTO public.certificates (title, issuer, description, image_url, certificate_url, issue_date, category)
VALUES
  (
    'AWS Certified Solutions Architect',
    'Amazon Web Services',
    'Professional-level certification demonstrating advanced AWS architecture skills',
    'https://images.unsplash.com/photo-1633356713697-e94c18a6379e?w=500&h=300&fit=crop',
    '',
    '2024-06-15',
    'Cloud'
  ),
  (
    'React Advanced Patterns',
    'Frontend Masters',
    'Advanced React patterns and best practices certification',
    'https://images.unsplash.com/photo-1633356713697-e94c18a6379e?w=500&h=300&fit=crop',
    '',
    '2024-05-20',
    'Programming'
  ),
  (
    'TypeScript Professional',
    'Scrimba',
    'Professional TypeScript development certification',
    'https://images.unsplash.com/photo-1633356713697-e94c18a6379e?w=500&h=300&fit=crop',
    '',
    '2024-04-10',
    'Programming'
  );
