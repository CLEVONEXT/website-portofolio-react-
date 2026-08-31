# 🚀 Modern Portfolio Website

A stunning, modern, and fully functional portfolio website built with React, Vite, TypeScript, Tailwind CSS, and Supabase. Features real-time certificate management with dynamic updates, beautiful animations, and responsive design.

![React](https://img.shields.io/badge/React-18.0+-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-blue?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.0+-blue?style=flat-square&logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-Latest-green?style=flat-square&logo=supabase)

## ✨ Features

### Public Portfolio
- ⚡ **Lightning Fast** - Optimized with Vite and lazy loading
- 🎨 **Beautiful Design** - Modern, futuristic, and premium aesthetic
- 📱 **Fully Responsive** - Perfect on all devices (mobile, tablet, desktop)
- ✅ **Smooth Animations** - Framer Motion powered transitions
- 🌙 **Dark Mode** - Elegant dark theme with purple accents
- 📊 **Multiple Sections**:
  - Hero section with CTA buttons
  - About section with profile info
  - Skills section with categorized skills
  - Projects showcase with live demos
  - Real-time certificate gallery
  - Contact footer with social links

### Admin Dashboard
- 🔐 **Secure Authentication** - Supabase Auth integration
- ✏️ **Certificate Management** - Add, edit, delete certificates
- 📸 **Image Upload** - Drag & drop with preview
- 🔄 **Real-time Updates** - Supabase Realtime subscriptions
- 📋 **Certificate Gallery** - Grid view with filtering
- ⚡ **Instant Sync** - Changes appear on public site immediately

### Technical Highlights
- 🎯 **TypeScript** - Type-safe code
- 🎭 **Framer Motion** - Professional animations
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🗄️ **Supabase** - Backend, database, and storage
- 🚀 **Vercel Ready** - One-click deployment
- 📦 **Modular Architecture** - Reusable components
- 🔒 **Row Level Security** - Database-level access control

## 🚀 Quick Start

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

## 📁 Project Structure

```
src/
├── components/      # Reusable React components
├── pages/          # Page components (Home, Admin, etc.)
├── services/       # API and external services
├── hooks/          # Custom React hooks
├── types/          # TypeScript type definitions
├── config/         # Configuration files
├── data/           # Static data (projects, skills)
├── lib/            # Utility functions
└── App.tsx         # Main app component
```

## 🎨 Customization

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

## 🔐 Admin Panel

Access the admin panel at `/admin`:

1. **Login** with your Supabase credentials
2. **Manage Certificates**:
   - ➕ Add new certificates
   - ✏️ Edit existing ones
   - 🗑️ Delete certificates
3. **Upload Images** with drag-and-drop
4. **Changes sync instantly** to the public site

## 🌍 Deployment

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

## 📊 Performance

- ✅ Lighthouse Score: 90+
- ✅ Fully responsive
- ✅ Mobile optimized
- ✅ Lazy loading images
- ✅ Code splitting
- ✅ Minified and compressed

## 🔒 Security

- 🔐 Supabase Row Level Security (RLS)
- 🔐 Environment variables protected
- 🔐 No sensitive data in frontend
- 🔐 Authenticated admin routes
- 🔐 Input validation and sanitization

## 📚 Technologies

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

## 🐛 Troubleshooting

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

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 💬 Support

For questions or issues:
1. Check [SETUP.md](./SETUP.md) troubleshooting section
2. Review [Supabase docs](https://supabase.com/docs)
3. Check [Vite docs](https://vitejs.dev)
4. Review [React docs](https://react.dev)

## 🎉 Credits

Built with ❤️ using:
- React & React Router
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase

---

**Ready to showcase your work? Deploy now! 🚀**

For detailed setup instructions, see [SETUP.md](./SETUP.md)
