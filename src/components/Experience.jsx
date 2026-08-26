import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="experience" className="section-container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
      >
        <span className="section-label">Experience &amp; Open Source</span>

        <div className="mt-12 ml-4 md:ml-6 border-l border-light-border dark:border-dark-border pl-8 relative">
          {/* Timeline dot */}
          <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-light-border dark:bg-dark-border" />

          <p className="text-light-textMuted dark:text-dark-textMuted text-sm leading-relaxed">
            Nothing here yet — still in the building phase.
          </p>
          <p className="text-xs text-light-textMuted/60 dark:text-dark-textMuted/60 mt-2 tracking-wide">
            Working on it.
          </p>
        </div>

        {/* Placeholder entries — uncomment when ready
        {experience.map((item, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-[37px] top-1.5 w-2 h-2 rounded-full bg-light-text dark:bg-dark-text outline outline-4 outline-light-bg dark:outline-dark-bg" />
            <div className="text-xs font-semibold text-light-textMuted dark:text-dark-textMuted mb-2">{item.year}</div>
            <h3 className="text-lg font-medium text-light-text dark:text-dark-text">{item.role}</h3>
            <div className="text-sm font-medium text-light-textMuted dark:text-dark-textMuted mb-4 uppercase tracking-wider">{item.org}</div>
            <p className="text-light-textMuted dark:text-dark-textMuted max-w-2xl leading-relaxed">{item.description}</p>
          </div>
        ))}
        */}
      </motion.div>
    </section>
  );
};

export default Experience;
