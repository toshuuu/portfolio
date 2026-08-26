import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorGlow = () => {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Main blob — tight, near-instant
  const blobX = useSpring(mouseX, {
    stiffness: 600,
    damping: 40,
    mass: 0.2,
  });

  const blobY = useSpring(mouseY, {
    stiffness: 600,
    damping: 40,
    mass: 0.2,
  });

  // Soft trailing blob — slight lag for depth, but not sluggish
  const trailX = useSpring(mouseX, {
    stiffness: 200,
    damping: 30,
    mass: 0.4,
  });

  const trailY = useSpring(mouseY, {
    stiffness: 200,
    damping: 30,
    mass: 0.4,
  });

  // Cursor dot — instant
  const dotX = useSpring(mouseX, {
    stiffness: 800,
    damping: 50,
  });

  const dotY = useSpring(mouseY, {
    stiffness: 800,
    damping: 50,
  });

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('pointermove', move);

    return () => window.removeEventListener('pointermove', move);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Small soft trail */}
      <motion.div
        className="pointer-events-none fixed z-[9997] rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: 220,
          height: 220,
          background:
            'radial-gradient(circle, rgba(180,180,170,0.06) 0%, transparent 70%)',
          filter: 'blur(12px)',
        }}
      />

      {/* Main glow */}
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full mix-blend-multiply dark:mix-blend-screen"
        style={{
          x: blobX,
          y: blobY,
          translateX: '-50%',
          translateY: '-50%',
          width: 150,
          height: 150,
          background:
            'radial-gradient(circle, rgba(180,180,170,0.16) 0%, transparent 70%)',
          filter: 'blur(5px)',
        }}
      />

      {/* Cursor dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full bg-light-text dark:bg-dark-text"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 5,
          height: 5,
          opacity: 0.6,
        }}
      />
    </>
  );
};

export default CursorGlow;