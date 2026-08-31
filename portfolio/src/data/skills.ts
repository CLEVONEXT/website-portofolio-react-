import type { Skill } from '../types';

export const skills: Skill[] = [
  {
    category: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'PHP', 'Laravel', 'PostgreSQL', 'MySQL', 'MongoDB', 'Supabase'],
  },
  {
    category: 'Tools & DevOps',
    items: ['Git', 'GitHub', 'VS Code', 'Docker', 'Vercel', 'Firebase', 'Figma', 'Linux'],
  },
  {
    category: 'IoT & Embedded',
    items: ['ESP32', 'ESP8266', 'Arduino', 'Sensors', 'MQTT', 'Embedded C'],
  },
];

export default skills;
