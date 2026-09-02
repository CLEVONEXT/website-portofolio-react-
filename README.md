# 🌐 Website Portofolio — Moh. Arsyil Afif Madani

[![Live Demo](https://img.shields.io/badge/Live_Demo-arsyil--portofolio.vercel.app-000?style=for-the-badge&logo=vercel)](https://arsyil-portofolio.vercel.app)

Portfolio website modern dengan admin panel untuk mengelola sertifikat & project secara dinamis.

## 🔗 Live Demo

**https://arsyil-portofolio.vercel.app**

## ✨ Fitur

- **Halaman publik**: Hero, About, Skills, Experience, Projects, Certificates, Footer — animasi smooth (Framer Motion), dark theme
- **Admin Panel** (`/admin`) — login Supabase Auth:
  - 📜 CRUD **Certificates** (upload gambar, kategori, tanggal, URL sertifikat)
  - 🗂️ CRUD **Projects** (upload gambar, technologies, GitHub/Demo URL, featured)
  - 👤 Ganti foto profil (otomatis update section About)
- **Realtime updates** — perubahan data langsung tampil tanpa reload (Supabase Realtime)
- **Code-splitting** — bundle admin dipisah agar pengunjung tidak mengunduhnya

## 🛠️ Tech Stack

- React 19 + TypeScript
- Vite + Tailwind CSS
- Supabase (Database + Auth + Storage + Realtime)
- Framer Motion
- Deploy di Vercel

## 🚀 Menjalankan Secara Lokal

```bash
cd portfolio
npm install
```

Buat file `.env.local`:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Jalankan:

```bash
npm run dev
```

## 🗄️ Setup Database

Jalankan `portfolio/supabase/schema.sql` di SQL Editor Supabase. Skrip idempotent (aman dijalankan ulang) dan membuat tabel `certificates`, `projects`, `site_profile` + RLS policies, storage buckets, dan realtime publication.
