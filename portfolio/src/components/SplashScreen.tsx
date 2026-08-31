import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../config/site';

/**
 * Splash screen — intro animation sebelum web dibuka.
 * Animasi dibangun dengan Motion (motion.dev / framer-motion).
 * Terinspirasi pola animasi reactbits.dev & animate-ui.com:
 * - Blur-in + letter stagger pada nama
 * - Counting progress bar
 * - Curtain reveal exit (dua panel geser ke atas)
 */
export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Respect prefers-reduced-motion: langsung lewati splash
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShow(false);
      return;
    }

    // Progress counter
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(100, p + Math.random() * 14 + 4);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setShow(false), 600);
      return () => clearTimeout(t);
    }
  }, [progress]);

  const letters = siteConfig.name.split('');

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[100]">
          {/* Curtain panels (exit animation) — hanya render saat exit */}
          <motion.div
            className="absolute inset-0 bg-base"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Center content */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
          >
            {/* Letter stagger */}
            <div className="flex overflow-hidden">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-4xl sm:text-6xl font-bold text-strong"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.1 + i * 0.04,
                    ease: 'easeOut',
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </div>

            <motion.p
              className="text-accent mt-3 text-sm tracking-[0.3em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {siteConfig.role}
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="mt-10 w-56 sm:w-72"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="h-[3px] w-full bg-elevated rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
              <p className="text-muted text-xs mt-2 text-right tabular-nums">
                {Math.round(progress)}%
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
