# Storage Setup Guide for Profile Image Upload

Jika upload image gagal, ikuti langkah-langkah berikut untuk setup Supabase Storage:

## 1. Create Storage Bucket

1. Buka Supabase Dashboard
2. Pergi ke **Storage** section (sidebar kiri)
3. Klik **"New bucket"**
4. Isi form:
   - **Name**: `profile`
   - **Visibility**: Pilih **"Public"** (agar image bisa diakses)
   - Klik **"Create bucket"**

## 2. Configure RLS Policies

1. Setelah bucket `profile` dibuat, klik 3 dots menu
2. Pilih **"Policies"**
3. Tambah policy untuk **SELECT** (read):
   ```sql
   -- Allow public to view images
   SELECT TRUE;
   ```
4. Tambah policy untuk **INSERT** (upload):
   ```sql
   -- Allow authenticated users to upload
   auth.role() = 'authenticated';
   ```
5. Tambah policy untuk **UPDATE** (replace):
   ```sql
   -- Allow authenticated users to update/replace
   auth.role() = 'authenticated';
   ```

## 3. Enable CORS (Optional tapi Recommended)

Jika upload masih error, tambahkan CORS settings di bucket:

1. Buka bucket `profile`
2. Klik **Settings**
3. Scroll ke bawah cari **CORS configuration**
4. Tambahkan:
   ```json
   [
     {
       "origin": "*",
       "methods": ["GET", "POST", "PUT", "DELETE"],
       "allowedHeaders": ["*"]
     }
   ]
   ```

## 4. Verify Database Table

Pastikan table `site_profile` sudah ada dan punya kolom:
- `id` (UUID, primary key)
- `profile_image_url` (text)
- `updated_at` (timestamp with time zone)

SQL untuk create table (jika belum ada):
```sql
CREATE TABLE IF NOT EXISTS site_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_image_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_profile ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read
CREATE POLICY "Allow public read" ON site_profile
  FOR SELECT USING (true);

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated update" ON site_profile
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON site_profile
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

## 5. Troubleshooting

### Error: "Storage bucket not configured"
- Pastikan bucket `profile` sudah dibuat
- Pastikan visibility set ke "Public"

### Error: "Failed to upload image"
- Cek browser console (F12) untuk error detail
- Pastikan file type adalah JPG, PNG, atau WebP
- Pastikan file size < 5MB
- Cek RLS policies di bucket settings

### Error: "Failed to save profile"
- Pastikan table `site_profile` sudah ada
- Pastikan authenticated user punya permission untuk UPDATE/INSERT

## Quick Test

Setelah setup selesai, coba:
1. Login ke admin panel
2. Upload profile photo
3. Check browser console untuk logs
4. Verify image muncul di "About" section di homepage
