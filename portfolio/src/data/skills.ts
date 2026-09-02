import type { Skill } from '../types';

export const skills: Skill[] = [
  {
    category: 'Frontend',
    items: ['HTML', 'CSS' , 'React', 'Tailwind',],
  },
  {
    category: 'Backend',
    items: ['PHP', 'Laravel', 'PostgreSQL', 'MySQL', 'Supabase'],
  },
  {
    category: 'Tools & DevOps',
    items: ['Git', 'GitHub', 'VS Code', 'Docker', 'Vercel', 'Firebase', 'Figma', 'Linux'],
  },
  {
    category: 'IoT & Embedded',
    items: ['IoT Development', 'Automation','Embedded Systems',],
  },
];

export default skills;
