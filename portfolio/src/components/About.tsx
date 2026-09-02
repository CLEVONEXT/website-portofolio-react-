import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, Users } from 'lucide-react';
import { siteConfig } from '../config/site';
import profileService from '../services/profileService';
import { scrollToSection } from '../lib/utils';
import ProfileCard from './ProfileCard';

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
      title: 'DEVELOPER',
      description: 'Writing maintainable, scalable, and efficient code that follows best practices.',
    },
    {
      icon: Zap,
      title: 'IoT Enthusiast',
      description: 'Building innovative IoT solutions that connect the physical world with intelligent technology.',
    },
    {
      icon: Users,
      title: 'Creative Technologist',
      description: 'Combining technology and creativity to transform ideas into innovative, functional, and impactful digital experiences.',
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
          {/* Left Side - Profile Card dengan efek tilt 3D */}
          <motion.div variants={itemVariants} className="relative flex justify-center">
            <ProfileCard
              name={siteConfig.name}
              handle="arzyuanx"
              status="Online"
              contactText="Contact Me"
              avatarUrl={profileUrl || siteConfig.profileImage}
              showUserInfo
              enableTilt
              enableMobileTilt
              behindGlowEnabled
              innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
              onContactClick={() => scrollToSection('contact')}
            />
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
               I love exploring new ideas, solving problems, and turning creative concepts into something meaningful and real. I’m always curious to learn, experiment with new possibilities, and challenge myself to create things that are useful, engaging, and thoughtfully designed.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-6">
              <div className="card text-center p-4 border rounded-lg hover:border-accent transition-colors">
                <p className="text-3xl font-bold text-accent">{siteConfig.about.yearsExperience}+</p>
                <p className="text-muted text-sm mt-2">Years Experience</p>
              </div>
              <div className="card text-center p-4 border rounded-lg hover:border-accent transition-colors">
                <p className="text-3xl font-bold text-accent">10+</p>
                <p className="text-muted text-sm mt-2">Projects Completed</p>
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
