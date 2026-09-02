import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { skills } from '../data/skills';

// Icon placeholders untuk tiap kategori
const categoryIcons: Record<string, string> = {
  Frontend: '▲',
  Backend: '◆',
  'Tools & DevOps': '■',
  'IoT & Embedded': '●',
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 sm:py-32 bg-base border-t border-soft relative overflow-hidden"
    >
      {/* Background parallax orbs */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-80 h-80 bg-[var(--accent-soft)] rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-[var(--accent-soft)] rounded-full blur-3xl opacity-20" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-2">Tech Stack</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-strong mb-4">
            My <span className="text-accent">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        {/* Skills Groups */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {skills.map((skillGroup, gIndex) => (
            <motion.div
              key={gIndex}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: gIndex * 0.1 }}
            >
              <div
                className="relative h-full p-8 rounded-3xl border border-soft bg-elevated overflow-hidden
                           hover:border-accent transition-colors duration-500 group"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--accent-soft)] rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

                <div className="flex items-center gap-3 mb-6">
                  <motion.span
                    className="text-3xl"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    {categoryIcons[skillGroup.category] ?? '✨'}
                  </motion.span>
                  <h3 className="text-xl font-bold text-strong group-hover:text-accent transition-colors duration-300">
                    {skillGroup.category}
                  </h3>
                </div>

                {/* Chips skill muncul satu per satu */}
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.5, y: 10 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: idx * 0.06,
                        type: 'spring',
                        bounce: 0.4,
                      }}
                      whileHover={{ scale: 1.08, y: -3 }}
                      className="px-4 py-2 rounded-full border border-accent-soft text-body text-sm
                                 bg-surface cursor-default hover:text-accent hover:shadow-glow
                                 transition-colors duration-300 select-none"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Always Learning */}
        <motion.div
          className="mt-20 p-8 bg-elevated border border-soft rounded-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-strong mb-3">Always Learning</h3>
          <p className="text-muted max-w-2xl mx-auto">
           saya hanya gabut
          </p>
        </motion.div>
      </div>
    </section>
  );
}
