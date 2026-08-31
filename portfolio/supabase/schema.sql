-- Create certificates table
CREATE TABLE public.certificates (
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
CREATE INDEX idx_certificates_category ON public.certificates(category);
CREATE INDEX idx_certificates_issue_date ON public.certificates(issue_date DESC);
CREATE INDEX idx_certificates_created_at ON public.certificates(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Policy for public users - can select (read) all certificates
CREATE POLICY "Enable read access for all users" ON public.certificates
  FOR SELECT
  USING (true);

-- Policy for authenticated users only - can insert
CREATE POLICY "Enable insert for authenticated users only" ON public.certificates
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy for authenticated users only - can update
CREATE POLICY "Enable update for authenticated users only" ON public.certificates
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Policy for authenticated users only - can delete
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
CREATE POLICY "Enable read access for site_profile" ON public.site_profile
  FOR SELECT
  USING (true);

-- Authenticated users can manage profile
CREATE POLICY "Enable insert for authenticated users" ON public.site_profile
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON public.site_profile
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Storage bucket for profile photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile', 'profile', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read profile images" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'profile');

CREATE POLICY "Authenticated upload profile images" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'profile' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated update profile images" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'profile' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated delete profile images" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'profile' AND auth.role() = 'authenticated');

-- Enable realtime for certificates table
ALTER PUBLICATION supabase_realtime ADD TABLE public.certificates;

-- Create storage bucket for certificates
-- Note: This needs to be done via the Supabase dashboard or API
-- Storage bucket name: "certificates"
-- Make the bucket public to allow downloading certificate images

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
