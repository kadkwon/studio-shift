'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // 메인 커서: 즉각 반응 (스프링 없음)
  // 링: 살짝 따라오는 효과
  const ringSpringConfig = { damping: 35, stiffness: 400, mass: 0.5 };
  const ringXSpring = useSpring(cursorX, ringSpringConfig);
  const ringYSpring = useSpring(cursorY, ringSpringConfig);

  // Private 텍스트용 부드러운 스프링
  const textSpringConfig = { damping: 25, stiffness: 300, mass: 0.8 };
  const textXSpring = useSpring(cursorX, textSpringConfig);
  const textYSpring = useSpring(cursorY, textSpringConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // 잠긴 이미지 감지
      if (target.closest('[data-locked]')) {
        setIsLocked(true);
        setIsHovering(true);
        return;
      }

      if (
        target.tagName === 'IMG' ||
        target.closest('[data-cursor-expand]') ||
        target.classList.contains('cursor-expand')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // 잠긴 이미지에서 벗어남
      if (target.closest('[data-locked]')) {
        setIsLocked(false);
        setIsHovering(false);
        return;
      }

      if (
        target.tagName === 'IMG' ||
        target.closest('[data-cursor-expand]') ||
        target.classList.contains('cursor-expand')
      ) {
        setIsHovering(false);
      }
    };

    const handleMouseOut = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mouseleave', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mouseleave', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor - 즉각 반응 */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="rounded-full bg-white"
          initial={{ opacity: 0 }}
          animate={{
            width: isHovering ? 80 : 12,
            height: isHovering ? 80 : 12,
            opacity: isVisible ? 1 : 0,
            x: isHovering ? -40 : -6,
            y: isHovering ? -40 : -6,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeOut',
          }}
        />
      </motion.div>

      {/* Cursor ring - 살짝 따라오는 효과 */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringXSpring,
          y: ringYSpring,
        }}
      >
        <motion.div
          className="rounded-full border border-[#C5A059]"
          initial={{ opacity: 0 }}
          animate={{
            width: isHovering ? 100 : 40,
            height: isHovering ? 100 : 40,
            opacity: isVisible && !isLocked ? 0.5 : 0,
            x: isHovering ? -50 : -20,
            y: isHovering ? -50 : -20,
          }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
        />
      </motion.div>

      {/* 🔒 Private 텍스트 - 잠긴 이미지 위에서 따라다님 */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: textXSpring,
          y: textYSpring,
        }}
      >
        <motion.div
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(17, 17, 17, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(197, 160, 89, 0.3)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isLocked && isVisible ? 1 : 0,
            scale: isLocked ? 1 : 0.8,
            x: -60,
            y: 20,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeOut',
          }}
        >
          <span className="text-lg">🔒</span>
          <span
            className="text-[#C5A059] text-xs tracking-[0.2em] uppercase font-medium"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Private
          </span>
        </motion.div>
      </motion.div>
    </>
  );
}
