import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

// ---------------------------------------------------------------------------
// Animated integer counter
// ---------------------------------------------------------------------------
function AnimatedNumber({ value, className }) {
  const ref = useRef(null);
  const motionVal = useMotionValue(0);
  const rounded   = useTransform(motionVal, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(motionVal, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
    const unsub = rounded.on('change', setDisplay);
    return () => { ctrl.stop(); unsub(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value]);

  return <span ref={ref} className={className}>{display}</span>;
}

// ---------------------------------------------------------------------------
// Fetch with timeout + one retry (handles Render cold-start delays)
// ---------------------------------------------------------------------------
async function fetchWithRetry(url, timeoutMs = 15000, retries = 1) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}

// ---------------------------------------------------------------------------
// Fetch live stats from alfa-leetcode-api
// ---------------------------------------------------------------------------
async function fetchLiveStats(username) {
  const BASE = 'https://alfa-leetcode-api.onrender.com';
  try {
    const [solved] = await Promise.all([
      fetchWithRetry(`${BASE}/${username}/solved`),
    ]);
    if (!solved || !solved.solvedProblem) throw new Error('no solved data');
    return {
      solved:  solved.solvedProblem,
      easy:    solved.easySolved,
      medium:  solved.mediumSolved,
      hard:    solved.hardSolved,
    };
  } catch {
    try {
      const d = await fetchWithRetry(`${BASE}/${username}`, 20000, 0);
      if (!d || !d.totalSolved) throw new Error('empty');
      return {
        solved:  d.totalSolved,
        easy:    d.easySolved,
        medium:  d.mediumSolved,
        hard:    d.hardSolved,
      };
    } catch {
      return null;
    }
  }
}

// ---------------------------------------------------------------------------
// Difficulty colours
// ---------------------------------------------------------------------------
const DIFF = {
  Easy:   { text: 'text-emerald-500', bar: 'bg-emerald-500', lborder: 'border-emerald-500/40' },
  Medium: { text: 'text-amber-500',   bar: 'bg-amber-500',   lborder: 'border-amber-500/40'   },
  Hard:   { text: 'text-rose-500',    bar: 'bg-rose-500',    lborder: 'border-rose-500/40'    },
};

// ---------------------------------------------------------------------------
// Live / Offline badge
// ---------------------------------------------------------------------------
function LiveBadge({ live }) {
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-sm border ${
      live
        ? 'border-emerald-500/40 text-emerald-500 bg-emerald-500/5'
        : 'border-light-border dark:border-dark-border text-light-textMuted dark:text-dark-textMuted'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${live ? 'bg-emerald-500 animate-pulse' : 'bg-light-textMuted dark:bg-dark-textMuted'}`} />
      {live ? 'live' : 'offline'}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
const LeetCodeSection = () => {
  const fb = portfolioData.stats.leetcode;
  const username = fb.username;

  const [stats, setStats]   = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'live' | 'fallback'

  useEffect(() => {
    fetchLiveStats(username).then((live) => {
      if (live) {
        setStats(live);
        setStatus('live');
      } else {
        setStatus('fallback');
      }
    });
  }, [username]);

  // Resolved values — live API takes priority, fallback from portfolioData
  const solved  = stats?.solved  ?? fb.solved;
  const easy    = stats?.easy    ?? fb.easy;
  const medium  = stats?.medium  ?? fb.medium;
  const hard    = stats?.hard    ?? fb.hard;
  const target  = fb.target;

  // Static highlights (always from portfolioData — API doesn't give contest rating)
  const contestRating = fb.contestRating;

  // Three-segment donut math
  const circumference = 2 * Math.PI * 44;
  const easyArc   = (easy   / target) * circumference;
  const mediumArc = (medium / target) * circumference;
  const hardArc   = (hard   / target) * circumference;

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="coding-journey" className="section-container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={container}
      >

        {/* ── Header ── */}
        <motion.div variants={item} className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div className="flex items-center gap-3">
            <span className="section-label mb-0">Coding Journey</span>
            <LiveBadge live={status === 'live'} />
          </div>
          <a
            href={`https://leetcode.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-5 py-2 font-mono text-[10px] tracking-[0.2em] uppercase"
          >
            ↗ leetcode/{username}
          </a>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── LEFT: Donut + Progress ── */}
          <motion.div
            variants={item}
            className="neumorphic-card lg:col-span-1 flex flex-col items-center justify-center gap-8 py-10"
          >
            {/* Donut SVG */}
            <div className="relative w-44 h-44">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* track */}
                <circle cx="50" cy="50" r="44" fill="none" strokeWidth="6"
                  className="stroke-light-surfaceHover dark:stroke-dark-surfaceHover" />

                {/* Easy */}
                <motion.circle
                  cx="50" cy="50" r="44" fill="none" strokeWidth="6" strokeLinecap="butt"
                  className="stroke-emerald-500"
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  whileInView={{ strokeDasharray: `${easyArc} ${circumference}` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  strokeDashoffset={0}
                />
                {/* Medium */}
                <motion.circle
                  cx="50" cy="50" r="44" fill="none" strokeWidth="6" strokeLinecap="butt"
                  className="stroke-amber-500"
                  initial={{ strokeDasharray: `0 ${circumference}`, strokeDashoffset: 0 }}
                  whileInView={{
                    strokeDasharray: `${mediumArc} ${circumference}`,
                    strokeDashoffset: -easyArc,
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                />
                {/* Hard */}
                <motion.circle
                  cx="50" cy="50" r="44" fill="none" strokeWidth="6" strokeLinecap="butt"
                  className="stroke-rose-500"
                  initial={{ strokeDasharray: `0 ${circumference}`, strokeDashoffset: 0 }}
                  whileInView={{
                    strokeDasharray: `${hardArc} ${circumference}`,
                    strokeDashoffset: -(easyArc + mediumArc),
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                />
              </svg>
              {/* Centre */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <AnimatedNumber value={status === 'loading' ? 0 : solved} className="text-4xl font-black font-mono tracking-tighter" />
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-light-textMuted dark:text-dark-textMuted mt-0.5">solved</span>
              </div>
            </div>

            {/* Colour legend */}
            <div className="flex gap-5 font-mono text-[9px] uppercase tracking-[0.15em]">
              {Object.entries(DIFF).map(([label, c]) => (
                <span key={label} className={`flex items-center gap-1.5 ${c.text}`}>
                  <span className={`w-2 h-2 rounded-sm ${c.bar}`} />
                  {label}
                </span>
              ))}
            </div>

            {/* Progress bar to target */}
            <div className="w-full px-2">
              <div className="flex justify-between font-mono text-[9px] text-light-textMuted dark:text-dark-textMuted mb-1.5 uppercase tracking-[0.15em]">
                <span>target</span>
                <span>{Math.round(Math.min((solved / target) * 100, 100))}% of {target}</span>
              </div>
              <div className="w-full h-px bg-light-surfaceHover dark:bg-dark-surfaceHover overflow-visible relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min((solved / target) * 100, 100)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                  className="h-px bg-light-text dark:bg-dark-text absolute top-0 left-0"
                />
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Breakdown + Highlights ── */}
          <motion.div variants={container} className="lg:col-span-2 grid sm:grid-cols-2 gap-6">

            {/* Difficulty breakdown */}
            <motion.div variants={item} className="neumorphic-card flex flex-col justify-center gap-6 py-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-light-textMuted dark:text-dark-textMuted">
                difficulty breakdown
              </p>
              {[
                { label: 'Easy',   count: easy,   total: fb.totalEasy   ?? 961  },
                { label: 'Medium', count: medium, total: fb.totalMedium ?? 2105 },
                { label: 'Hard',   count: hard,   total: fb.totalHard   ?? 967  },
              ].map(({ label, count, total }) => (
                <div key={label}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.15em] ${DIFF[label].text}`}>{label}</span>
                    <span className="font-mono text-sm font-black text-light-text dark:text-dark-text">
                      <AnimatedNumber value={status === 'loading' ? 0 : count} />
                      <span className="font-normal text-[9px] text-light-textMuted dark:text-dark-textMuted">/{total}</span>
                    </span>
                  </div>
                  <div className={`w-full h-1.5 bg-light-surfaceHover dark:bg-dark-surfaceHover overflow-hidden border-l-2 ${DIFF[label].lborder}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min((count / total) * 100, 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: 'easeOut', delay: 0.1 }}
                      className={`h-full ${DIFF[label].bar}`}
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Highlights: Contest Rating + Questions Solved */}
            <motion.div variants={item} className="grid grid-cols-1 gap-4 content-start">

              {/* Contest Rating */}
              <div className="neumorphic-card p-6 flex flex-col items-center justify-center gap-2 text-center">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-light-textMuted dark:text-dark-textMuted">
                  contest rating
                </p>
                <p className="text-4xl font-black font-mono tracking-tighter">
                  <AnimatedNumber value={contestRating} />
                </p>
                <p className="font-mono text-[9px] text-light-textMuted dark:text-dark-textMuted">
                  LeetCode contests
                </p>
              </div>

              {/* Questions Solved */}
              <div className="neumorphic-card p-6 flex flex-col items-center justify-center gap-2 text-center">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-light-textMuted dark:text-dark-textMuted">
                  questions solved
                </p>
                <p className="text-4xl font-black font-mono tracking-tighter flex items-end gap-0.5">
                  <AnimatedNumber value={status === 'loading' ? 0 : solved} />
                  <span className="text-xl text-light-textMuted dark:text-dark-textMuted mb-0.5">+</span>
                </p>
                <p className="font-mono text-[9px] text-light-textMuted dark:text-dark-textMuted">
                  and counting
                </p>
              </div>

            </motion.div>

          </motion.div>
        </div>

        {/* ── Footer ── */}
        <motion.p
          variants={item}
          className="mt-5 font-mono text-[9px] uppercase tracking-[0.15em] text-light-textMuted dark:text-dark-textMuted text-right"
        >
          {status === 'live'
            ? `↻ synced · alfa-leetcode-api · ${new Date().toLocaleDateString('en-GB')}`
            : status === 'fallback'
              ? 'data from portfolioData.js — update username to sync live'
              : 'fetching live data…'}
        </motion.p>

      </motion.div>
    </section>
  );
};

export default LeetCodeSection;
