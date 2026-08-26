import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * CodeSnippet — a subtle, hoverable inline code easter egg.
 *
 * Props:
 *   code      string   — the snippet text (can contain newlines)
 *   className string   — extra positioning / spacing classes
 *   align     'left' | 'right'  — which side the glow expands from (default 'left')
 */
const CodeSnippet = ({ code, className = '', align = 'left' }) => {
  const shouldReduce = useReducedMotion();

  return (
    <motion.pre
      aria-hidden="true"   // decorative — screen readers skip
      whileHover={
        shouldReduce
          ? {}
          : {
              scale: 1.04,
              // very faint glow via filter; won't affect layout
              filter: 'drop-shadow(0 0 6px rgba(160,160,150,0.35))',
            }
      }
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      // `will-change: transform` keeps the effect on the GPU so it can't cause reflow
      style={{ willChange: 'transform, filter', transformOrigin: align === 'right' ? 'right center' : 'left center' }}
      className={[
        // base text styling — mono, muted, tiny
        'font-mono text-[10px] leading-relaxed select-none pointer-events-auto',
        'text-light-textMuted dark:text-dark-textMuted',
        // on mobile: readable but clearly secondary
        'opacity-40 sm:opacity-30 hover:opacity-70',
        'transition-opacity duration-300',
        // no background so it blends with whichever section it lives in
        className,
      ].join(' ')}
    >
      {code}
    </motion.pre>
  );
};

export default CodeSnippet;
