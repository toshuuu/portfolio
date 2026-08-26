# Project Context Document

This document is intended for future AI agents and developers to quickly understand the project architecture, design system, and state without needing deep re-explanation.

## 1. Project Overview
This is a personal developer portfolio built with React and Vite. It is designed to be highly interactive, visually striking, and easy to maintain by editing a single central data file.

## 2. Technology Stack
- **Framework:** React 19 (via Vite)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss@4.3.3` & `tailwindcss@4.3.3`)
- **Animations:** `framer-motion`
- **Icons:** `lucide-react`
- **Linting:** `oxlint`

## 3. Design System & Aesthetics
- **Aesthetic:** Neumorphism (soft UI) combined with modern minimalist typography. It supports robust Light and Dark modes.
- **Tailwind v4 Configuration:** 
  - Tailwind v4 uses a **CSS-first** configuration approach. 
  - The configuration is primarily driven through `src/index.css` via the `@import "tailwindcss";` and `@config "../tailwind.config.js";` directives.
- **Custom Utilities:**
  - Standard custom classes (like `.neumorphic-card`, `.btn-primary`, `.btn-secondary`, `.neumorphic-switch`) are defined in `src/index.css` under `@layer components`. 
  - **Important Rule for Tailwind v4:** You cannot use `@apply` on custom classes (e.g., you can't do `@apply btn-base`). Utility classes must be explicitly written out in the CSS layer or applied directly to HTML elements.
- **Animations:** Almost all sections utilize `framer-motion` for staggering entrances (`hidden`/`visible` variants) and hover states.

## 4. Architecture & Key Files
- `src/App.jsx`: The main entry point assembling all sections (`Hero`, `About`, `Skills`, `Projects`, `LeetCodeSection`, `Experience`, `Learning`, `Contact`).
- `src/index.css`: Contains the Tailwind setup, core theme variables (light/dark colors, neumorphic shadow tokens), and component utility definitions.
- `src/context/ThemeContext.jsx`: Handles the light/dark mode toggling logic.
- `src/data/portfolioData.js`: **The Single Source of Truth**. All text, stats, lists, and links are pulled from here. If a user wants to update their bio, projects, or LeetCode stats, update this file first.

## 5. Recent Major Changes
- **LeetCode Integration:** The generic "Competitive Programming" section (which included Codeforces) was completely removed. It was replaced by a highly interactive, dedicated `LeetCodeSection.jsx` that pulls dynamic stats (Easy/Medium/Hard breakdown, streak, circular target progress) from `portfolioData.js`. The old `Stats.jsx` file is obsolete.

## 6. Development Commands
- **Start Dev Server:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`

---
*Note for AI Agents: When making styling changes, refer strictly to the Tailwind CSS v4 paradigm and prioritize updating `src/index.css` or `portfolioData.js` before writing complex new React components.*
