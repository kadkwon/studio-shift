'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Serenity',
    subtitle: 'Residential',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
  },
  {
    id: 2,
    title: 'Obsidian',
    subtitle: 'Commercial',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  },
  {
    id: 3,
    title: 'Lumière',
    subtitle: 'Hospitality',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
  },
  {
    id: 4,
    title: 'Private Collection',
    subtitle: 'Residential',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
  },
  {
    id: 5,
    title: 'Confidential',
    subtitle: 'Commercial',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    id: 6,
    title: 'Exclusive',
    subtitle: 'Residential',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
  },
];

export default function PrivateArchive() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax 텍스트 움직임 (오른쪽 → 왼쪽)
  const parallaxX = useTransform(scrollYProgress, [0, 1], ['30%', '-30%']);
  // 보조 텍스트 (왼쪽 → 오른쪽, 더 느리게)
  const parallaxX2 = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#111111] py-32 px-8 md:px-16 overflow-hidden">
      {/* Parallax Typography - 배경에 우아하게 지나가는 텍스트 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 whitespace-nowrap"
          style={{ x: parallaxX }}
        >
          <span
            className="text-[15vw] font-light tracking-[0.2em] uppercase select-none"
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(197, 160, 89, 0.15)',
            }}
          >
            Exclusive Collection
          </span>
        </motion.div>
        <motion.div
          className="absolute top-2/3 whitespace-nowrap"
          style={{ x: parallaxX2 }}
        >
          <span
            className="text-[12vw] font-light italic tracking-[0.3em] select-none"
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(234, 234, 234, 0.08)',
            }}
          >
            Private Archive
          </span>
        </motion.div>
      </div>

      {/* Section Header */}
      <motion.div
        className="relative z-10 mb-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <h2 className="font-[family-name:var(--font-cormorant)] text-[#EAEAEA] text-4xl md:text-6xl font-light italic tracking-[0.1em]">
          Private Archive
        </h2>
        <motion.div
          className="mt-6 h-[1px] bg-[#C5A059] opacity-50"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <p className="mt-6 text-[#666666] text-sm tracking-[0.2em] uppercase max-w-md">
          A curated selection of our most distinguished works
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => {
          const isLocked = index >= 3;

          return (
            <motion.div
              key={project.id}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {/* Image Container */}
              <div
                className={`relative aspect-[4/5] overflow-hidden bg-[#1a1a1a] cursor-expand ${
                  isLocked ? 'cursor-not-allowed' : ''
                }`}
              >
                {/* Project Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    isLocked ? 'blur-lg scale-105' : ''
                  }`}
                />

                {/* Hover overlay for unlocked */}
                {!isLocked && (
                  <motion.div
                    className="absolute inset-0 bg-[#C5A059] opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                  />
                )}

                {/* Glassmorphism overlay for locked items */}
                {isLocked && (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    data-locked="true"
                    style={{
                      background: 'rgba(17, 17, 17, 0.4)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: 'inset 0 0 80px rgba(0, 0, 0, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4)',
                    }}
                  >
                    {/* Glass reflection effect */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
                      }}
                    />
                  </div>
                )}

                {/* Project number */}
                <div className="absolute top-4 right-4">
                  <span className="text-[#666666] text-xs tracking-widest">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="mt-6">
                <div className="flex items-baseline justify-between">
                  <h3
                    className={`font-[family-name:var(--font-cormorant)] text-2xl font-light tracking-wide ${
                      isLocked ? 'text-[#444444]' : 'text-[#EAEAEA]'
                    }`}
                  >
                    {isLocked ? '••••••••' : project.title}
                  </h3>
                  <span className="text-[#666666] text-xs">
                    {isLocked ? '••••' : project.year}
                  </span>
                </div>
                <p className="mt-2 text-[#666666] text-xs tracking-[0.2em] uppercase">
                  {isLocked ? 'Classified' : project.subtitle}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
