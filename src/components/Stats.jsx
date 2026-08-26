import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Stats = () => {
  const { stats } = portfolioData;

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="section-container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
      >
        <span className="section-label">Competitive Programming</span>
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* LeetCode */}
          <div className="border border-light-border dark:border-dark-border rounded-xl p-8 hover:bg-light-surface/30 dark:hover:bg-dark-surface/30 transition-colors">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-light-textMuted dark:text-dark-textMuted mb-8">
              LeetCode
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-light-textMuted dark:text-dark-textMuted mb-2">Problems Solved</p>
                <p className="text-3xl font-light">{stats.leetcode.solved}</p>
              </div>
              <div>
                <p className="text-sm text-light-textMuted dark:text-dark-textMuted mb-2">Rating</p>
                <p className="text-3xl font-light">{stats.leetcode.rating}</p>
              </div>
            </div>
          </div>
          
          {/* Codeforces */}
          <div className="border border-light-border dark:border-dark-border rounded-xl p-8 hover:bg-light-surface/30 dark:hover:bg-dark-surface/30 transition-colors">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-light-textMuted dark:text-dark-textMuted mb-8">
              Codeforces
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-light-textMuted dark:text-dark-textMuted mb-2">Rating</p>
                <p className="text-3xl font-light">{stats.codeforces.rating}</p>
              </div>
              <div>
                <p className="text-sm text-light-textMuted dark:text-dark-textMuted mb-2">Contests</p>
                <p className="text-3xl font-light">{stats.codeforces.contests}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Stats;
