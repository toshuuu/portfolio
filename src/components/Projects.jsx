import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import ProjectCard from './ProjectCard';
import CodeSnippet from './CodeSnippet';

const Projects = () => {
  const { projects } = portfolioData;

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="projects" className="section-container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
      >
        <span className="section-label">Selected Work</span>

        {/* Easter-egg snippet */}
        <CodeSnippet
          code={`const bugs = "features";`}
          className="mb-8 -mt-2"
        />
        
        <div className="mt-12 border-t border-light-border dark:border-dark-border">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
