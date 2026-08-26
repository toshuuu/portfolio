import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import CodeSnippet from './CodeSnippet';

const About = () => {
  const { person, info } = portfolioData;
  const shouldReduce = useReducedMotion();

  const infoRows = [
    { label: 'Education', value: info.education },
    { label: 'Focus', value: info.focus },
    { label: 'Interests', value: info.interests },
    { label: 'Currently Learning', value: info.learning },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: i * 0.1,
      },
    }),
  };

  return (
    <section id="about" className="section-container">
      <motion.div
        initial={shouldReduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="section-label">About</span>

        <div className="grid md:grid-cols-2 gap-16 mt-12">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.1 }}
          >
            <p className="text-xl md:text-2xl leading-relaxed text-light-text dark:text-dark-text font-light">
              &quot;{person.fullBio}&quot;
            </p>
            <CodeSnippet
              code={`const me = {\n  learning: true,\n  sleep: false,\n};`}
              className="mt-6"
            />
          </motion.div>

          <div className="space-y-8">
            {infoRows.map(({ label, value }, i) => (
              <motion.div
                key={label}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="border-t border-light-border dark:border-dark-border pt-4"
              >
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-light-textMuted dark:text-dark-textMuted mb-2">
                  {label}
                </h4>
                <p className="text-sm">{value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
