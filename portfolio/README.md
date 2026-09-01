﻿# ðŸš€ Modern Portfolio Website

A stunning, modern, and fully functional portfolio website built with React, Vite, TypeScript, Tailwind CSS, and Supabase. Features real-time certificate management with dynamic updates, beautiful animations, and responsive design.

![React](https://img.shields.io/badge/React-18.0+-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-blue?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.0+-blue?style=flat-square&logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-Latest-green?style=flat-square&logo=supabase)

## âœ¨ Features

### Public Portfolio
- âš¡ **Lightning Fast** - Optimized with Vite and lazy loading
- ðŸŽ¨ **Beautiful Design** - Modern, futuristic, and premium aesthetic
- ðŸ“± **Fully Responsive** - Perfect on all devices (mobile, tablet, desktop)
- âœ… **Smooth Animations** - Framer Motion powered transitions
- ðŸŒ™ **Dark Mode** - Elegant dark theme with purple accents
- ðŸ“Š **Multiple Sections**:
  - Hero section with CTA buttons
  - About section with profile info
  - Skills section with categorized skills
  - Projects showcase with live demos
  - Real-time certificate gallery
  - Contact footer with social links

### Admin Dashboard
- ðŸ” **Secure Authentication** - Supabase Auth integration
- âœï¸ **Certificate Management** - Add, edit, delete certificates
- ðŸ“¸ **Image Upload** - Drag & drop with preview
- ðŸ”„ **Real-time Updates** - Supabase Realtime subscriptions
- ðŸ“‹ **Certificate Gallery** - Grid view with filtering
- âš¡ **Instant Sync** - Changes appear on public site immediately

### Technical Highlights
- ðŸŽ¯ **TypeScript** - Type-safe code
- ðŸŽ­ **Framer Motion** - Professional animations
- ðŸŽ¨ **Tailwind CSS** - Utility-first CSS framework
- ðŸ—„ï¸ **Supabase** - Backend, database, and storage
- ðŸš€ **Vercel Ready** - One-click deployment
- ðŸ“¦ **Modular Architecture** - Reusable components
- ðŸ”’ **Row Level Security** - Database-level access control

## ðŸš€ Quick Start

### Prerequisites
- Node.js 16+ and npm
- Supabase account
- Vercel account (optional, for deployment)

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your Supabase credentials to .env.local
# VITE_SUPABASE_URL=your_url
# VITE_SUPABASE_ANON_KEY=your_key

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:5173` to see your portfolio!

## ðŸ“ Project Structure

```
src/
â”œâ”€â”€ components/      # Reusable React components
â”œâ”€â”€ pages/          # Page components (Home, Admin, etc.)
â”œâ”€â”€ services/       # API and external services
â”œâ”€â”€ hooks/          # Custom React hooks
â”œâ”€â”€ types/          # TypeScript type definitions
â”œâ”€â”€ config/         # Configuration files
â”œâ”€â”€ data/           # Static data (projects, skills)
â”œâ”€â”€ lib/            # Utility functions
â””â”€â”€ App.tsx         # Main app component
```

## ðŸŽ¨ Customization

### Edit Personal Info
Open `src/config/site.ts` and update:
```typescript
export const siteConfig = {
  name: "Your Name",
  role: "Your Role",
  bio: "Your bio",
  // ... more fields
};
```

### Customize Colors
Edit `tailwind.config.js` to change the primary colors and theme.

### Add Projects
Edit `src/data/projects.ts` to add your portfolio projects.

### Modify Skills
Edit `src/data/skills.ts` to list your technical skills.

### Customize Bio (Code Style)
Bio di Hero ditampilkan sebagai code yang mengetik otomatis.
Edit isi `CODE_LINES` di `src/components/CodeBio.tsx`:
```typescript
const CODE_LINES = [
  `const developer = {`,
  `  name: 'Your Name',`,
  `  // ...dst`,
];
```

### Customize ProfileCard
Kartu profil di About memakai `ProfileCard` (React Bits).
Atur di `src/components/About.tsx` — name, title, handle, avatar, gradient, dan efek tilt.

## ðŸ” Admin Panel

Access the admin panel at `/admin`:

1. **Login** with your Supabase credentials
2. **Manage Certificates**:
   - âž• Add new certificates
   - âœï¸ Edit existing ones
   - ðŸ—‘ï¸ Delete certificates
3. **Upload Images** with drag-and-drop
4. **Changes sync instantly** to the public site

## ðŸŒ Deployment

### Deploy to Vercel (Recommended)

```bash
# Connect your GitHub repository
vercel

# Follow the prompts
```

Or manually:
1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy with one click!

See [SETUP.md](./SETUP.md) for detailed deployment guide.

## ðŸ“Š Performance

- âœ… Lighthouse Score: 90+
- âœ… Fully responsive
- âœ… Mobile optimized
- âœ… Lazy loading images
- âœ… Code splitting
- âœ… Minified and compressed

## ðŸ”’ Security

- ðŸ” Supabase Row Level Security (RLS)
- ðŸ” Environment variables protected
- ðŸ” No sensitive data in frontend
- ðŸ” Authenticated admin routes
- ðŸ” Input validation and sanitization

## ðŸ“š Technologies

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Supabase
- **Database**: PostgreSQL (via Supabase)
- **Storage**: Supabase Storage
- **Auth**: Supabase Auth
- **Deployment**: Vercel
- **Routing**: React Router

## ðŸ› Troubleshooting

### Build fails
```bash
npm run build  # Test locally
npm cache clean --force  # Clear cache
npm install  # Reinstall
```

### Environment variables not loading
- Ensure file is named `.env.local` (not `.env`)
- Variables must start with `VITE_`
- Restart dev server after changes

### Admin login issues
- Create user in Supabase Auth
- Verify credentials are correct
- Check browser console for errors

See [SETUP.md](./SETUP.md) for more troubleshooting tips.

## ðŸ“ License

This project is open source and available under the MIT License.

## ðŸ¤ Contributing

Feel free to fork this project and submit pull requests for any improvements.

## ðŸ’¬ Support

For questions or issues:
1. Check [SETUP.md](./SETUP.md) troubleshooting section
2. Review [Supabase docs](https://supabase.com/docs)
3. Check [Vite docs](https://vitejs.dev)
4. Review [React docs](https://react.dev)

## ðŸŽ‰ Credits

Built with â¤ï¸ using:
- React & React Router
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase
- Ogl (WebGL shaders, untuk GhostFibers background)

---

**Ready to showcase your work? Deploy now! ðŸš€**

For detailed setup instructions, see [SETUP.md](./SETUP.md)


