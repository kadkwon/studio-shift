'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#111111]">
      {/* Background with slow zoom effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: isLoaded ? 1 : 1.1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        {/* Placeholder gradient - replace with actual image/video */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#111111] to-[#0a0a0a]"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 20% 30%, rgba(197, 160, 89, 0.03) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, rgba(197, 160, 89, 0.02) 0%, transparent 50%)
            `,
          }}
        />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      {/* Logo / Brand */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
        >
          <motion.h1
            className="font-[family-name:var(--font-cormorant)] text-[#EAEAEA] text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.2em] uppercase"
            initial={{ opacity: 0, letterSpacing: '0.4em' }}
            animate={{ opacity: 1, letterSpacing: '0.2em' }}
            transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
          >
            Studio
          </motion.h1>
          <motion.h1
            className="font-[family-name:var(--font-cormorant)] text-[#EAEAEA] text-6xl md:text-8xl lg:text-9xl font-light italic tracking-[0.3em] uppercase mt-2"
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}
          >
            Shift
          </motion.h1>

          {/* Accent line */}
          <motion.div
            className="mx-auto mt-8 h-[1px] bg-[#C5A059]"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1.2, delay: 1.5, ease: 'easeOut' }}
          />

          <motion.p
            className="mt-6 text-[#666666] text-sm tracking-[0.3em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            Space Directing
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-expand"
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        whileHover={{ scale: 1.1 }}
      >
        <span className="text-[#666666] text-xs tracking-[0.3em] uppercase">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-[#C5A059]" />
        </motion.div>
      </motion.button>

      {/* Corner decorations */}
      <motion.div
        className="absolute top-8 left-8 w-16 h-[1px] bg-[#C5A059] opacity-30"
        initial={{ width: 0 }}
        animate={{ width: 64 }}
        transition={{ duration: 1, delay: 2 }}
      />
      <motion.div
        className="absolute top-8 left-8 w-[1px] h-16 bg-[#C5A059] opacity-30"
        initial={{ height: 0 }}
        animate={{ height: 64 }}
        transition={{ duration: 1, delay: 2 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-16 h-[1px] bg-[#C5A059] opacity-30"
        initial={{ width: 0 }}
        animate={{ width: 64 }}
        transition={{ duration: 1, delay: 2 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-[1px] h-16 bg-[#C5A059] opacity-30"
        initial={{ height: 0 }}
        animate={{ height: 64 }}
        transition={{ duration: 1, delay: 2 }}
      />
    </section>
  );
}
