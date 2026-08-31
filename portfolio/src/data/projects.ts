import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with real-time inventory management, payment processing, and admin dashboard.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=300&fit=crop',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: 'https://github.com/yourusername/ecommerce',
    demo: 'https://ecommerce-demo.com',
    featured: true,
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time synchronization, team collaboration features, and analytics.',
    image: 'https://images.unsplash.com/photo-1553531088-be9b6461d01e?w=500&h=300&fit=crop',
    technologies: ['React', 'Firebase', 'Tailwind CSS'],
    github: 'https://github.com/yourusername/task-app',
    demo: 'https://task-app-demo.com',
    featured: true,
  },
  {
    id: '3',
    title: 'Social Media Analytics',
    description: 'Analytics dashboard for social media metrics with data visualization, trend analysis, and reporting features.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    technologies: ['React', 'Chart.js', 'Express', 'PostgreSQL'],
    github: 'https://github.com/yourusername/social-analytics',
    demo: 'https://social-analytics-demo.com',
  },
  {
    id: '4',
    title: 'Weather Forecast App',
    description: 'Real-time weather forecasting application with location-based services, detailed weather data, and responsive design.',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=300&fit=crop',
    technologies: ['React', 'TypeScript', 'OpenWeather API'],
    github: 'https://github.com/yourusername/weather-app',
    demo: 'https://weather-app-demo.com',
  },
  {
    id: '5',
    title: 'AI Chat Application',
    description: 'An AI-powered chat application with natural language processing, conversation history, and multiple language support.',
    image: 'https://images.unsplash.com/photo-1587890591385-e64b68f11717?w=500&h=300&fit=crop',
    technologies: ['React', 'OpenAI API', 'Socket.io', 'Node.js'],
    github: 'https://github.com/yourusername/ai-chat',
    demo: 'https://ai-chat-demo.com',
  },
  {
    id: '6',
    title: 'Portfolio Website',
    description: 'Modern, responsive portfolio website with dynamic certificate management and real-time updates.',
    image: 'https://images.unsplash.com/photo-1460925895917-adf4e565db6d?w=500&h=300&fit=crop',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Supabase'],
    github: 'https://github.com/yourusername/portfolio',
    demo: 'https://yourportfolio.com',
  },
];

export default projects;
