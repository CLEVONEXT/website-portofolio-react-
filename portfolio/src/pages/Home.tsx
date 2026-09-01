import { lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import SplashScreen from '../components/SplashScreen';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

// Bagian bawah halaman di-code-split agar bundle awal ringan
const About = lazy(() => import('../components/About'));
const Skills = lazy(() => import('../components/Skills'));
const Experience = lazy(() => import('../components/Experience'));
const Projects = lazy(() => import('../components/Projects'));
const Certificates = lazy(() => import('../components/Certificates'));

function SectionFallback() {
  return <div className="min-h-[40vh] bg-base" />;
}

export default function Home() {
  return (
    <div className="bg-base min-h-screen">
      <SplashScreen />
      <Navbar />
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certificates />
      </Suspense>
      <Footer />
    </div>
  );
}
