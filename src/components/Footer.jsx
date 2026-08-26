import React from 'react';
import { portfolioData } from '../data/portfolioData';
import CodeSnippet from './CodeSnippet';

const Footer = () => {
  const { person, links } = portfolioData;
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-light-border dark:border-dark-border mt-20 py-12">
      {/* Easter-egg snippet — centred above the footer links, whisper quiet */}
      <div className="flex justify-center mb-6">
        <CodeSnippet
          code={`worksOnMyMachine(); // hopefully yours too`}
          align="left"
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm font-medium tracking-wide">
          {person.name}
        </div>
        
        <div className="flex items-center gap-6 text-sm text-light-textMuted dark:text-dark-textMuted">
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="hover:text-light-text dark:hover:text-dark-text transition-colors">
            GitHub
          </a>
          <span>·</span>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-light-text dark:hover:text-dark-text transition-colors">
            LinkedIn
          </a>
          <span>·</span>
          <a href={links.email} className="hover:text-light-text dark:hover:text-dark-text transition-colors">
            Email
          </a>
        </div>
        
        <div className="text-xs text-light-textMuted dark:text-dark-textMuted uppercase tracking-widest">
          © {year} {person.name}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
