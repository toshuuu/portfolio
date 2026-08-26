import React, { useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

// Ripple effect on button press
const RippleBtn = ({ children, className, href, target, rel }) => {
  const [ripples, setRipples] = useState([]);
  const ref = useRef(null);

  const addRipple = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
  }, []);

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={`${className} relative overflow-hidden cursor-none`}
      whileTap={{ scale: 0.96 }}
      onPointerDown={addRipple}
    >
      {children}
      <AnimatePresence>
        {ripples.map(({ id, x, y }) => (
          <motion.span
            key={id}
            className="absolute rounded-full pointer-events-none bg-current"
            style={{ left: x, top: y, translateX: '-50%', translateY: '-50%', opacity: 0.15 }}
            initial={{ width: 0, height: 0 }}
            animate={{ width: 240, height: 240, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </motion.a>
  );
};

const Contact = () => {
  const { links } = portfolioData;
  const shouldReduce = useReducedMotion();

  return (
    <section id="contact" className="section-container min-h-[60vh] flex flex-col justify-center">
      <motion.div
        initial={shouldReduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-label">Contact</span>

        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mt-8 mb-6">
          Let's build something useful.
        </h2>

        <p className="text-lg md:text-xl text-light-textMuted dark:text-dark-textMuted max-w-xl mb-12 leading-relaxed">
          Have an interesting idea, project or opportunity?{' '}
          <br className="hidden md:block" />
          I'd love to hear about it.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <RippleBtn
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            GitHub
          </RippleBtn>
          <RippleBtn
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            LinkedIn
          </RippleBtn>
          <RippleBtn href={links.email} className="btn-secondary">
            Email
          </RippleBtn>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
