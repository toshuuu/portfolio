import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import CodeSnippet from './CodeSnippet';

const About = () => {
  const { person } = portfolioData;
  const shouldReduce = useReducedMotion();

  const tags = [
    'C++', 'DSA', 'React', 'Node.js', 'MongoDB',
    'Backend', 'Open Source', 'AI / ML',
  ];

  return (
    <section id="about" className="section-container">
      <motion.div
        initial={shouldReduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="section-label">About</span>

        {/* Bio — large, light weight, full width */}
        <motion.p
          initial={shouldReduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.1 }}
          className="text-2xl md:text-4xl font-light leading-snug tracking-tight text-light-text dark:text-dark-text mt-10 max-w-3xl"
        >
          CS student, builder, and chronic problem-solver —
          <span className="text-light-textMuted dark:text-dark-textMuted"> currently turning caffeine into code and DSA reps into (hopefully) a cracked engineer.</span>
        </motion.p>

        {/* Easter-egg snippet */}
        <CodeSnippet
          code={`const me = {\n  learning: true,\n  sleep: false,\n};`}
          className="mt-8"
        />

        {/* Natural-language paragraph */}
        <motion.p
          initial={shouldReduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.2 }}
          className="mt-10 text-base md:text-lg text-light-textMuted dark:text-dark-textMuted leading-relaxed max-w-2xl"
        >
          I study Computer Science Engineering and spend most of my time grinding DSA,
          building full-stack projects, and exploring how AI fits into the things I make.
          Outside of that I'm deep into system design, backend architecture, and contributing
          to open source whenever I can find the time.
        </motion.p>

        {/* Tag strip — "currently into" */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-2"
        >
          <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-light-textMuted dark:text-dark-textMuted self-center mr-2">
            Into
          </span>
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full border border-light-border dark:border-dark-border
                text-xs text-light-textMuted dark:text-dark-textMuted
                hover:border-light-text/40 dark:hover:border-dark-text/40
                hover:text-light-text dark:hover:text-dark-text
                transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
