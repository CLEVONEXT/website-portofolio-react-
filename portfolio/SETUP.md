# Portfolio Website Setup Guide

This is a comprehensive guide to set up your modern, futuristic portfolio website with dynamic certificate management and real-time updates using React, Vite, Supabase, and Vercel.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Supabase Configuration](#supabase-configuration)
4. [Environment Variables](#environment-variables)
5. [Running Locally](#running-locally)
6. [Deployment to Vercel](#deployment-to-vercel)
7. [Admin Dashboard](#admin-dashboard)
8. [Customization](#customization)
9. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)
- A **Supabase** account - [Sign up](https://supabase.com/)
- A **Vercel** account (for deployment) - [Sign up](https://vercel.com/)
- A **GitHub** account (recommended for deployment)

## Local Development Setup

### 1. Clone or Navigate to Project

```bash
cd "path/to/web portfolio/portfolio"
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- React & React Router
- Vite (build tool)
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)
- Supabase JS client
- PostCSS & Autoprefixer

### 3. Verify Installation

```bash
npm --version  # Check npm version
node --version  # Check Node version
```

## Supabase Configuration

### Step 1: Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Click "New Project"
3. Enter your project name (e.g., "portfolio")
4. Choose a database password (save this securely!)
5. Select your region (closest to you or your users)
6. Click "Create new project"
7. Wait for the project to initialize (2-3 minutes)

### Step 2: Get Your Credentials

1. Go to **Settings** → **API**
2. Copy your **Project URL** (save this)
3. Copy your **Anon Public Key** (save this)

⚠️ **IMPORTANT:** Never share these keys or commit them to git!

### Step 3: Create Database Tables

1. In the Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Open the file `supabase/schema.sql` in your text editor
4. Copy the entire SQL content
5. Paste it into the Supabase SQL Editor
6. Click **"Run"** to execute the queries

This will create:
- `certificates` table with all necessary fields
- Row Level Security (RLS) policies
- Indexes for better performance
- Realtime configuration
- Dummy certificate data for testing

### Step 4: Create Storage Bucket

1. In the Supabase dashboard, go to **Storage**
2. Click **"Create a new bucket"**
3. Name it: `certificates`
4. Make sure **"Public bucket"** is toggled ON
5. Click **"Create bucket"**

### Step 5: Set Up Authentication

The authentication is already configured to work with Supabase Auth. Users can sign up and log in to the admin dashboard.

## Environment Variables

### Local Development (.env.local)

Create a `.env.local` file in the project root (this file is gitignored):

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace with your actual credentials from Supabase.

**Example:**
```env
VITE_SUPABASE_URL=https://xyzabc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### For Vercel Deployment

You'll set these in Vercel's environment variables (see Deployment section).

## Running Locally

### Start Development Server

```bash
npm run dev
```

This will:
- Start a local dev server (usually at `http://localhost:5173`)
- Enable hot module reloading (HMR)
- Auto-open in your default browser

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

This serves the built version locally to test before deployment.

## Deployment to Vercel

### Option 1: Connect GitHub Repository (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   - In Vercel project settings, go to **Environment Variables**
   - Add:
     - Key: `VITE_SUPABASE_URL`, Value: `your_supabase_url`
     - Key: `VITE_SUPABASE_ANON_KEY`, Value: `your_anon_key`
   - Click "Save"

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site is now live!

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy
vercel
```

Follow the prompts to connect your account and deploy.

### Option 3: Connect Custom Domain

1. In Vercel project settings, go to **Domains**
2. Enter your custom domain
3. Update your domain's DNS settings to point to Vercel
4. Wait for DNS propagation (can take 24-48 hours)

## Admin Dashboard

### Access Admin Panel

1. Navigate to `https://yoursite.com/admin` (or `http://localhost:5173/admin` for local)
2. Enter your credentials

### First Time Setup

By default, no user accounts exist. You need to create one using Supabase Auth:

**Option A: Via Supabase Dashboard**
1. Go to Supabase → **Authentication** → **Users**
2. Click **"Invite"**
3. Enter email and set password
4. The user will be created

**Option B: Via Admin Panel (if enabled)**
- Sign-up functionality can be enabled in `authService.ts`

### Admin Dashboard Features

- **View Certificates**: See all certificates in a table
- **Add Certificate**:
  - Upload certificate image (drag & drop or click)
  - Fill in title, issuer, description
  - Set category and issue date
  - Add certificate URL (optional)
  - Click "Add Certificate"

- **Edit Certificate**:
  - Click "Edit" on any certificate
  - Modify any field
  - Upload new image if needed
  - Click "Update Certificate"

- **Delete Certificate**:
  - Click "Delete" on any certificate
  - Confirm deletion
  - Certificate is removed immediately

### Real-time Updates

When you modify a certificate in the admin dashboard:
- The public portfolio website updates automatically
- No page refresh needed
- Uses Supabase Realtime subscriptions

## Customization

### Personalize Your Portfolio

Edit `src/config/site.ts`:

```typescript
export const siteConfig = {
  name: "Your Name",                    // Your full name
  role: "Your Role",                    // Your profession
  bio: "Your bio",                      // Short description
  location: "Your Location",            // Where you're based
  email: "your@email.com",             // Contact email
  
  socials: {
    github: "https://github.com/...",
    linkedin: "https://linkedin.com/...",
    instagram: "https://instagram.com/...",
    twitter: "https://twitter.com/...",
  },
  
  cvUrl: "https://example.com/cv.pdf",
  profileImage: "https://example.com/profile.jpg",
};
```

### Customize Colors

Edit `tailwind.config.js` to change the primary color:

```javascript
colors: {
  primary: {
    50: '#f7f0ff',
    100: '#f0e0ff',
    // ... change these to your brand colors
    600: '#9333ea',
    700: '#7e22ce',
    // ...
  },
}
```

### Add More Projects

Edit `src/data/projects.ts`:

```typescript
{
  id: '7',
  title: "Your New Project",
  description: "Project description",
  image: "image_url",
  technologies: ["React", "Node.js"],
  github: "github_url",
  demo: "live_demo_url",
}
```

### Customize Sections

Each section is in `src/components/`:
- `Hero.tsx` - Hero section
- `About.tsx` - About section
- `Skills.tsx` - Skills listing
- `Projects.tsx` - Projects showcase
- `Certificates.tsx` - Certificates gallery
- `Navbar.tsx` - Navigation
- `Footer.tsx` - Footer

Feel free to modify styling, content, or add new features!

## Troubleshooting

### Issue: "Cannot find module '@supabase/supabase-js'"

**Solution:**
```bash
npm install @supabase/supabase-js
```

### Issue: Environment variables not working

**Solution:**
- Make sure `.env.local` file exists (not `.env`)
- Restart dev server: `npm run dev`
- Check variable names start with `VITE_`

### Issue: Certificates not loading

**Solution:**
1. Check if Supabase URL and key are correct in `.env.local`
2. Verify the `certificates` table exists in Supabase
3. Check browser console for errors (F12)
4. Verify RLS policies allow public read access

### Issue: Admin login not working

**Solution:**
1. Create a user in Supabase → Authentication → Users
2. Verify email and password are correct
3. Check Supabase Auth settings (confirm email verification)

### Issue: Images not uploading

**Solution:**
1. Check if `certificates` storage bucket exists
2. Verify bucket is set to **Public**
3. Check file size (max 5MB)
4. Verify file type (JPG, PNG, WEBP only)

### Issue: "Build failed" on Vercel

**Solution:**
1. Check that environment variables are set in Vercel
2. Run `npm run build` locally to test
3. Check Vercel deployment logs for specific errors
4. Try redeploying or clearing build cache

### Issue: Styles not applying

**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Restart dev server
3. Check that Tailwind CSS is installed
4. Verify `src/index.css` includes Tailwind directives

## Project Structure

```
portfolio/
├── public/                    # Static assets
├── src/
│   ├── components/           # React components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Certificates.tsx
│   │   ├── CertificateCard.tsx
│   │   ├── CertificateModal.tsx
│   │   ├── CertificateForm.tsx
│   │   └── Footer.tsx
│   ├── pages/               # Page components
│   │   ├── Home.tsx
│   │   ├── AdminLogin.tsx
│   │   └── AdminDashboard.tsx
│   ├── services/            # API services
│   │   ├── supabase.ts
│   │   ├── certificateService.ts
│   │   └── authService.ts
│   ├── hooks/              # Custom React hooks
│   │   └── useCertificates.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   ├── config/             # Configuration
│   │   └── site.ts
│   ├── data/              # Static data
│   │   ├── projects.ts
│   │   └── skills.ts
│   ├── lib/               # Utilities
│   │   └── utils.ts
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── supabase/
│   └── schema.sql         # Database schema
├── .env.local             # Environment variables (gitignored)
├── .env.example           # Example env template
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── vite.config.ts         # Vite configuration
└── package.json           # Dependencies
```

## Performance Tips

1. **Optimize Images**
   - Use tools like [TinyPNG](https://tinypng.com/)
   - Compress before uploading
   - Use WEBP format for smaller file sizes

2. **Lazy Loading**
   - Components already implement lazy loading
   - Images load on-demand

3. **Code Splitting**
   - Vite automatically splits code by route

4. **Caching**
   - Vercel provides automatic caching
   - Enable browser caching for optimal performance

## SEO Optimization

The portfolio includes:
- ✅ Semantic HTML
- ✅ Proper heading hierarchy
- ✅ Open Graph meta tags (add in `index.html`)
- ✅ Favicon support
- ✅ Mobile responsive
- ✅ Fast loading (Lighthouse optimized)

To add custom SEO tags, edit `index.html`:

```html
<meta name="description" content="Your portfolio description">
<meta property="og:title" content="Your Name - Portfolio">
<meta property="og:description" content="Description">
<meta property="og:image" content="image_url">
```

## Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Vercel Docs**: https://vercel.com/docs
- **Framer Motion**: https://www.framer.com/motion/

## Next Steps

1. ✅ Complete local setup
2. ✅ Configure Supabase
3. ✅ Customize content
4. ✅ Test locally
5. ✅ Deploy to Vercel
6. ✅ Share with the world! 🎉

---

**Created with ❤️ using React, Vite, Tailwind CSS, and Supabase**
