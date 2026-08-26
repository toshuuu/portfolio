import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import CodeSnippet from './CodeSnippet';

// Magnetic button: pulls toward cursor within hover radius
const MagneticBtn = ({ children, className, href, target, rel }) => {
  const shouldReduce = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const onMove = (e) => {
    if (shouldReduce) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={`${className} cursor-none`}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  );
};

// Floating ambient orb
const Orb = ({ x, y, size, delay, duration }) => {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return null;
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: 'radial-gradient(circle, rgba(160,160,150,0.12) 0%, transparent 70%)',
      }}
      animate={{
        y: [0, -24, 0],
        x: [0, 10, 0],
        scale: [1, 1.08, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

const Hero = () => {
  const { person, links } = portfolioData;
  const shouldReduce = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  return (
    <section className="min-h-screen flex items-center pt-20 px-6 max-w-5xl mx-auto relative overflow-hidden">
      {/* Ambient floating orbs */}
      <Orb x="70%" y="20%" size={360} delay={0} duration={7} />
      <Orb x="10%" y="55%" size={220} delay={2} duration={9} />
      <Orb x="85%" y="65%" size={160} delay={4} duration={6.5} />

      {/* Easter-egg snippet — bottom-right, intentionally subtle */}
      <CodeSnippet
        code={`// TODO: become cracked at DSA`}
        align="right"
        className="absolute bottom-8 right-0 hidden sm:block"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full relative z-10"
      >
        <motion.span
          variants={itemVariants}
          className="text-[10px] font-bold tracking-[0.3em] uppercase text-light-textMuted dark:text-dark-textMuted mb-6 block"
        >
          {person.label}
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-semibold tracking-tight mb-8"
        >
          {person.name}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-light-textMuted dark:text-dark-textMuted max-w-xl mb-12 leading-relaxed"
        >
          {person.shortBio}
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-16">
          <MagneticBtn href="#projects" className="btn-primary">
            View Projects
          </MagneticBtn>
          <MagneticBtn
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            GitHub
          </MagneticBtn>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 text-xs font-medium text-light-textMuted dark:text-dark-textMuted uppercase tracking-wider"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-light-text dark:bg-dark-text opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-light-text dark:bg-dark-text opacity-70"></span>
          </span>
          {person.status}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
