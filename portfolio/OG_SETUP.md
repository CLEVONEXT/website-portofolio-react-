# Open Graph & SEO Setup Guide

## Overview

Website sekarang dilengkapi dengan:
- ✅ Open Graph meta tags (untuk social media preview)
- ✅ Twitter Card tags
- ✅ Favicon (multiple formats)
- ✅ Web Manifest (PWA support)
- ✅ Robots.txt (SEO)
- ✅ Sitemap.xml (SEO)

---

## 1. Add OG Image

OG Image digunakan ketika share link di social media. Untuk add OG image:

### Option A: Jika punya gambar

1. Siapkan image: **1200x630 pixels** (recommended)
2. Format: PNG atau JPG, size < 500KB
3. Copy ke folder: `portfolio/public/og-image.png`
4. Image akan otomatis di-serve dari `/og-image.png`

### Option B: Generate OG Image secara dynamic (Optional)

Kalau mau generate OG image secara otomatis, bisa gunakan service seperti:
- Vercel OG Image Generation
- Placeholder service

---

## 2. Favicon Setup

Favicon sudah di-setup di 3 format:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/favicon.svg" />
<link rel="shortcut icon" type="image/svg+xml" href="/favicon.svg" />
```

File: `public/favicon.svg` (sudah ada)

### Generate Favicon dari Logo

Jika mau favicon yang lebih bagus:

1. Buka: https://realfavicongenerator.net/
2. Upload logo/image
3. Customize untuk semua ukuran
4. Download & extract ke `public/`
5. Copy generated meta tags ke `index.html`

---

## 3. Manifest File (PWA)

File: `public/manifest.json`

Fitur:
- ✅ App name & description
- ✅ Theme colors
- ✅ App icons
- ✅ Display mode

User bisa "Install" website seperti app native!

---

## 4. SEO Files

### Robots.txt
- Path: `public/robots.txt`
- Gunanya: Tell search engines apa yg boleh di-crawl
- Admin panel sudah di-block: `/admin` dan `/admin/dashboard`

### Sitemap.xml
- Path: `public/sitemap.xml`
- Gunanya: List semua pages untuk search engines
- Sudah include semua major sections

---

## 5. Meta Tags yang Sudah Ditambah

```html
<!-- Basic -->
<meta name="description" content="..." />
<meta name="keywords" content="..." />
<meta name="author" content="Moh. Arsyil Afif Madani" />
<meta name="robots" content="index, follow" />

<!-- Open Graph (Facebook, LinkedIn, etc) -->
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
<meta property="og:url" content="..." />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:image" content="..." />
```

---

## 6. Test Social Media Preview

### Facebook
- Buka: https://developers.facebook.com/tools/debug/
- Paste URL: https://arsyil-portofolio.vercel.app
- Klik "Scrape Again"

### Twitter
- Buka: https://cards-dev.twitter.com/validator
- Paste URL
- Lihat preview

### LinkedIn
- Paste URL di feed
- Lihat preview

---

## 7. Google Search Console Setup (Recommended)

1. Buka: https://search.google.com/search-console
2. Add property: https://arsyil-portofolio.vercel.app
3. Upload `sitemap.xml` (https://arsyil-portofolio.vercel.app/sitemap.xml)
4. Submit untuk indexing
5. Monitor performance di dashboard

---

## 8. File Structure

```
public/
├── favicon.svg           # Website icon
├── manifest.json         # PWA configuration
├── og-image.png         # Social media preview (TODO: ADD THIS)
├── robots.txt           # Search engine crawler rules
└── sitemap.xml          # Page sitemap for SEO

index.html
├── All meta tags          # ✅ Already added
└── Manifest link          # ✅ Already added
```

---

## Next Steps

1. **Add OG Image**: Copy `og-image.png` ke `public/`
2. **Test Preview**: Share link di social media atau gunakan debugger tools
3. **Monitor SEO**: Setup Google Search Console
4. **Update Sitemap**: Jika ada page baru, update `sitemap.xml`

---

## Quick Checklist

- [ ] Add `public/og-image.png` (1200x630)
- [ ] Test OG preview di Facebook Debugger
- [ ] Test Twitter Card preview
- [ ] Setup Google Search Console
- [ ] Submit sitemap ke Google
- [ ] Monitor search rankings
