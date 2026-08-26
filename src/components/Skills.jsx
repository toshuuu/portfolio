import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import CodeSnippet from './CodeSnippet';

// Individual skill pill with neumorphic press effect
const SkillPill = ({ label, index }) => {
  const [pressed, setPressed] = useState(false);
  const shouldReduce = useReducedMotion();

  return (
    <motion.button
      initial={shouldReduce ? false : { opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 18,
        delay: index * 0.04,
      }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      className="cursor-none select-none px-3 py-1.5 rounded-lg text-xs font-medium
        text-light-text dark:text-dark-text
        transition-shadow duration-150"
      style={{
        boxShadow: pressed
          ? 'inset 3px 3px 7px var(--shadow-dark, #d6d6d2), inset -3px -3px 7px var(--shadow-light, #ffffff)'
          : '3px 3px 7px var(--shadow-dark, #d6d6d2), -3px -3px 7px var(--shadow-light, #ffffff)',
        background: 'var(--neu-surface, #EBEBE6)',
        transform: pressed ? 'scale(0.94)' : 'scale(1)',
      }}
    >
      {label}
    </motion.button>
  );
};

const Skills = () => {
  const { skills } = portfolioData;
  const shouldReduce = useReducedMotion();

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: i * 0.08,
      },
    }),
  };

  return (
    <section id="skills" className="section-container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
      >
        <span className="section-label">Skills &amp; Technologies</span>

        {/* Easter-egg snippet — sits quietly beside the section label */}
        <CodeSnippet
          code={`if (coffee) { code(); }`}
          className="mb-8 -mt-2"
        />

        <div className="mt-12 border-t border-light-border dark:border-dark-border">
          {skills.map((skill, index) => {
            const items = skill.items.split(' · ').map((s) => s.trim());
            return (
              <motion.div
                key={index}
                custom={index}
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="py-6 border-b border-light-border dark:border-dark-border grid grid-cols-1 md:grid-cols-4 gap-4 items-start"
              >
                <div className="text-[11px] font-bold tracking-[0.15em] text-light-textMuted dark:text-dark-textMuted md:col-span-1 pt-1">
                  {skill.category}
                </div>
                <div className="md:col-span-3 flex flex-wrap gap-2">
                  {items.map((item, i) => (
                    <SkillPill key={item} label={item} index={i} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
