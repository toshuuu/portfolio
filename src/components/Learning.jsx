import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Learning = () => {
  const { learning } = portfolioData;

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="section-container pb-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
      >
        <span className="section-label">Currently Exploring</span>
        
        <div className="mt-8 flex flex-wrap gap-4">
          {learning.map((topic, index) => (
            <div 
              key={index}
              className="px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg text-sm font-medium hover:-translate-y-0.5 transition-transform duration-300 shadow-sm"
            >
              {topic}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Learning;
