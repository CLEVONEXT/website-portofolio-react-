import { motion } from 'framer-motion';
import { Mail, Download, ArrowRight } from 'lucide-react';
import { scrollToSection } from '../lib/utils';
import { siteConfig } from '../config/site';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[var(--accent-soft)]" />

        {/* Glowing Orb */}
        <motion.div
          className="absolute top-1/2 right-1/4 w-96 h-96 bg-[var(--accent-soft)] rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(var(--accent-soft) 1px, transparent 1px),
                linear-gradient(90deg, var(--accent-soft) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting */}
        <motion.div variants={itemVariants} className="mb-6">
          <p className="text-accent text-lg font-medium tracking-widest uppercase">
            Welcome to my portfolio
          </p>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Hello, I'm{' '}
          <span className="text-gradient">
            {siteConfig.name}
          </span>
        </motion.h1>

        {/* Role */}
        <motion.p variants={itemVariants} className="text-body text-2xl sm:text-3xl mb-6">
          {siteConfig.role}
        </motion.p>

        {/* Bio */}
        <motion.p
          variants={itemVariants}
          className="text-muted text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {siteConfig.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="group inline-flex items-center px-8 py-4 bg-accent hover:opacity-90 text-[#16181d] rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-glow-lg"
          >
            View My Projects
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
          </button>

          {siteConfig.cvUrl && (
            <a
              href={siteConfig.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border border-accent-soft text-accent hover:opacity-80 rounded-lg font-semibold transition-all duration-300"
            >
              <Download size={20} className="mr-2" />
              Download CV
            </a>
          )}
        </motion.div>

        {/* Social Media Icons */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center items-center gap-6"
        >
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 bg-elevated hover:bg-accent-soft border border-accent-soft hover:border-accent rounded-lg transition-all duration-300 transform hover:scale-110"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-6 h-6 text-accent group-hover:opacity-80"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>

          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 bg-elevated hover:bg-accent-soft border border-accent-soft hover:border-accent rounded-lg transition-all duration-300 transform hover:scale-110"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-6 h-6 text-accent group-hover:opacity-80"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6 z M2 9h4v12 H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>

          <a
            href={`mailto:${siteConfig.email}`}
            className="group p-3 bg-elevated hover:bg-accent-soft border border-accent-soft hover:border-accent rounded-lg transition-all duration-300 transform hover:scale-110"
          >
            <Mail size={24} className="text-accent group-hover:opacity-80" />
          </a>

          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 bg-elevated hover:bg-accent-soft border border-accent-soft hover:border-accent rounded-lg transition-all duration-300 transform hover:scale-110"
          >
            <svg

              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-accent group-hover:opacity-80"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37 Z" />
              <circle cx="17.5" cy="6.5" r="1.5" />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-accent/50 text-center">
          <p className="text-sm mb-2">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-accent-soft rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-accent rounded-full mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

