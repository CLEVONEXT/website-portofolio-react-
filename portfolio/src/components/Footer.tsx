import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowUp } from 'lucide-react';
import { scrollToSection } from '../lib/utils';
import { siteConfig } from '../config/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const clicks = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Secret admin access: click the name 3x quickly
  const handleNameClick = () => {
    clicks.current += 1;
    if (clicks.current >= 3) {
      clicks.current = 0;
      navigate('/admin');
      return;
    }
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      clicks.current = 0;
    }, 1500);
  };

  return (
    <footer className="bg-surface border-t border-soft">
      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-32 bg-base border-b border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-strong mb-6">
              Let's <span className="text-accent">Work Together</span>
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto mb-8">
              I'm always interested in hearing about new projects and opportunities.
              Feel free to reach out to me!
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center px-8 py-4 bg-accent hover:opacity-90 text-[#16181d] rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-glow-lg"
              >
                <Mail size={20} className="mr-2" />
                Send me an email
              </a>

              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 border border-accent-soft text-accent hover:opacity-80 rounded-lg font-semibold transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Footer Links */}
          <motion.div
            className="grid md:grid-cols-4 gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold text-gradient mb-4">
                {siteConfig.name.split(' ')[0][0]}
              </h3>
              <p className="text-muted text-sm">
                Building beautiful and performant web applications with modern technologies.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-strong font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2">
                {['Home', 'About', 'Skills', 'Projects'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-muted hover:text-accent transition-colors text-sm"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-strong font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  {siteConfig.cvUrl && (
                    <a
                      href={siteConfig.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-accent transition-colors text-sm"
                    >
                      Download CV
                    </a>
                  )}
                </li>
                <li>
                  <a
                    href={siteConfig.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent transition-colors text-sm"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent transition-colors text-sm"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-strong font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-muted hover:text-accent transition-colors text-sm break-all"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li className="text-muted text-sm">
                  {siteConfig.location}
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="border-t border-soft py-8">
            {/* Bottom Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p
                onClick={handleNameClick}
                className="text-muted text-sm mb-4 sm:mb-0 cursor-default select-none"
              >
                © {currentYear} {siteConfig.name}. All rights reserved.
              </p>

              <button
                onClick={() => scrollToSection('home')}
                className="group p-3 bg-elevated hover:bg-accent-soft border border-soft hover:border-accent rounded-lg transition-all duration-300 transform hover:scale-110"
              >
                <ArrowUp size={20} className="text-accent group-hover:opacity-80" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

