import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const shouldReduce = useReducedMotion();
  const cardRef = useRef(null);

  // Raw pointer values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Springy tilt
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), {
    stiffness: 120,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 120,
    damping: 20,
  });

  // Subtle sheen that follows the pointer
  const sheenX = useSpring(useTransform(rawX, [-0.5, 0.5], ['-30%', '130%']), {
    stiffness: 120,
    damping: 20,
  });
  const sheenY = useSpring(useTransform(rawY, [-0.5, 0.5], ['-30%', '130%']), {
    stiffness: 120,
    damping: 20,
  });

  const onMove = (e) => {
    if (shouldReduce || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={
        shouldReduce
          ? {}
          : {
              rotateX,
              rotateY,
              transformPerspective: 800,
              transformStyle: 'preserve-3d',
            }
      }
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="group relative flex flex-col md:flex-row gap-6 md:gap-12 py-10 border-b border-light-border dark:border-dark-border
        -mx-6 px-6 sm:mx-0 sm:px-4 rounded-xl overflow-hidden cursor-none"
    >
      {/* Subtle pointer-following sheen */}
      {!shouldReduce && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${sheenX} ${sheenY}, rgba(255,255,255,0.07) 0%, transparent 60%)`,
          }}
        />
      )}

      {/* Background tint on hover */}
      <div className="absolute inset-0 rounded-xl bg-light-surface/50 dark:bg-dark-surface/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative text-sm font-medium text-light-textMuted dark:text-dark-textMuted w-12 shrink-0 pt-1">
        {project.id}
      </div>

      <div className="relative flex-1 space-y-4">
        <h3 className="text-2xl font-semibold tracking-tight group-hover:-translate-y-0.5 transition-transform duration-300">
          {project.name}
        </h3>
        <p className="text-light-textMuted dark:text-dark-textMuted leading-relaxed max-w-2xl">
          {project.description}
        </p>
        <div className="text-xs font-medium uppercase tracking-wider text-light-text dark:text-dark-text pt-2">
          {project.tech}
        </div>
      </div>

      <div className="relative flex items-start gap-6 pt-1">
        <a
          href={project.github}
          className="text-sm font-medium flex items-center gap-1 hover:text-light-textMuted dark:hover:text-dark-textMuted transition-colors cursor-none"
              target="_blank"
              rel="noopener noreferrer"
        >
          GitHub <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
        </a>
        <a
          href={project.demo}
          className="text-sm font-medium flex items-center gap-1 hover:text-light-textMuted dark:hover:text-dark-textMuted transition-colors cursor-none"
              target="_blank"
              rel="noopener noreferrer"
        >
          Live Demo <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
