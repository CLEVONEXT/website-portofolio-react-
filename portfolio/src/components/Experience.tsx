import { motion } from 'framer-motion';
import { Code2, Bot, Cloud, Trophy } from 'lucide-react';


const timeline = [
  {
    icon: Code2,
    year: '1.',
    title: 'Web Development',
    description:
      'Building responsive and user-friendly web applications using modern technologies, frameworks, and best practices to deliver high-quality digital experiences.',
  },
  {
    icon: Bot,
    year: '2.',
    title: 'IoT & Robotics',
    description:
      'Developing innovative projects that combine sensors, hardware, and creative problem-solving to create practical solutions.',
  },
  {
    icon: Cloud,
    year: '3.',
    title: 'Google Cloud Arcade Facilitator 2026',
    description:
      'Guiding and supporting participants throughout the Google Skills Arcade journey by sharing learning resources, answering questions, and helping them stay motivated to complete cloud learning challenges and skill badges.',
  },
  {
    icon: Trophy,
    year: '4.',
    title: 'competition FIKSI — Digital Technology',
    description:
      'Participated in FIKSI in the Digital Technology field, developing innovative technology-based solutions and transforming ideas into practical products with real-world potential.',
  },
];

export default function Experience() {
  return (
    <section className="py-20 sm:py-32 bg-base border-t border-soft relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-2">Journey</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-strong mb-4">
            My <span className="text-accent">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Garis vertikal */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-accent-soft" />

          <div className="space-y-12">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="relative pl-16"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  {/* Dot di timeline */}
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-elevated border border-accent-soft flex items-center justify-center">
                    <Icon size={20} className="text-accent" />
                  </div>

                  <div className="card p-6 border border-soft rounded-2xl hover:border-accent hover:shadow-glow transition-all duration-300">
                    <p className="text-accent text-sm font-semibold tracking-wide mb-1">
                      {item.year}
                    </p>
                    <h3 className="text-xl font-bold text-strong mb-2">{item.title}</h3>
                    <p className="text-muted leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
