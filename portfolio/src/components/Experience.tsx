import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Cpu } from 'lucide-react';

const timeline = [
  {
    icon: Briefcase,
    year: '2023 — Sekarang',
    title: 'Freelance Web Developer',
    description:
      'Membangun website dan aplikasi web untuk berbagai klien menggunakan React, Tailwind CSS, dan backend modern seperti Supabase & Laravel.',
  },
  {
    icon: Cpu,
    year: '2022 — 2023',
    title: 'IoT & Embedded Projects',
    description:
      'Mengerjakan berbagai proyek IoT berbasis ESP32/ESP8266 — mulai dari smart home, monitoring sensor, sampai integrasi MQTT ke dashboard web.',
  },
  {
    icon: GraduationCap,
    year: '2022',
    title: 'Mulai Serius Ngoding',
    description:
      'Memulai perjalanan ngoding dari HTML & CSS, lanjut ke JavaScript, React, dan terus eksplor ke dunia full-stack development.',
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
