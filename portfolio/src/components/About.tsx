import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, Users } from 'lucide-react';
import { siteConfig } from '../config/site';
import profileService from '../services/profileService';

export default function About() {
  const [profileUrl, setProfileUrl] = useState<string | null>(null);

  useEffect(() => {
    profileService.getProfile().then((p) => {
      setProfileUrl(p?.profile_image_url || null);
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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

  const features = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code that follows best practices.',
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Creating fast, responsive applications with optimized load times.',
    },
    {
      icon: Users,
      title: 'User Focused',
      description: 'Designing intuitive interfaces that provide excellent user experiences.',
    },
  ];

  return (
    <section
      id="about"
      className="py-20 sm:py-32 bg-base border-t border-soft relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-strong mb-4">
            About <span className="text-accent">Me</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left Side - Image/Profile */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-transparent rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
            <div className="relative bg-surface border border-soft rounded-2xl p-8">
              <img
                src={profileUrl || siteConfig.profileImage}
                alt={siteConfig.name}
                className="w-full h-96 object-cover rounded-xl mb-6 hover:scale-105 transition-transform duration-300"
              />
              <div className="space-y-4">
                <div>
                  <p className="text-muted text-sm uppercase tracking-widest mb-1">Location</p>
                  <p className="text-strong text-lg font-semibold">{siteConfig.location}</p>
                </div>
                <div>
                  <p className="text-muted text-sm uppercase tracking-widest mb-1">Experience</p>
                  <p className="text-strong text-lg font-semibold">{siteConfig.about.yearsExperience}+ Years</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Description */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-strong mb-4">
                I'm a passionate <span className="text-accent">developer</span>
              </h3>
              <p className="text-body text-lg leading-relaxed mb-4">
                {siteConfig.about.description}
              </p>
              <p className="text-muted text-base leading-relaxed">
                I love turning ideas into reality through code and design. With expertise in both
                frontend and backend technologies, I create solutions that are not only functional
                but also beautiful and performant.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-6">
              <div className="text-center p-4 bg-surface border border-soft rounded-lg hover:border-accent transition-colors">
                <p className="text-3xl font-bold text-accent">{siteConfig.about.yearsExperience}+</p>
                <p className="text-muted text-sm mt-2">Years Experience</p>
              </div>
              <div className="text-center p-4 bg-surface border border-soft rounded-lg hover:border-accent transition-colors">
                <p className="text-3xl font-bold text-accent">20+</p>
                <p className="text-muted text-sm mt-2">Projects Completed</p>
              </div>
              <div className="text-center p-4 bg-surface border border-soft rounded-lg hover:border-accent transition-colors">
                <p className="text-3xl font-bold text-accent">50+</p>
                <p className="text-muted text-sm mt-2">Happy Clients</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-8 bg-surface border border-soft rounded-xl hover:border-accent hover:bg-elevated transition-all duration-300"
              >
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-strong mb-3">{feature.title}</h3>
                <p className="text-muted leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
