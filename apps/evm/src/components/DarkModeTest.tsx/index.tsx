import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

// Tailwind requirements:
// - Enable the `dark` class strategy in tailwind.config.js:  darkMode: 'class'
// - This component will toggle the `dark` class on <html>
// - Uses only Tailwind utilities, no external UI deps

const STARS = Array.from({ length: 24 }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 1.2,
}));

function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
  });

  // Apply to <html> and persist
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    // Tailwind uses `dark` class; ensure we toggle it for dark mode
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Respond to system changes (when user hasn't forced a choice)
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem('theme');
      if (!saved) setTheme(e.matches ? 'dark' : 'light');
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return { theme, setTheme } as const;
}

const Sun = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <g>
      <circle cx="12" cy="12" r="5" />
      {/* rays */}
      {[...Array(8)].map((_, i) => (
        <rect key={i} x="11.25" y="1" width="1.5" height="4" rx="0.75" transform={`rotate(${i * 45} 12 12)`} />
      ))}
    </g>
  </svg>
);

const Moon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8Z" />
  </svg>
);

export default function DarkModeButton() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const toggle = () => setTheme(isDark ? 'light' : 'dark');

  // Motion values for subtle parallax
  const knob = useMotionValue(0);
  const bgShift = useTransform(knob, [0, 1], ['0%', '100%']);

  useEffect(() => {
    // animate knob to the target side
    knob.set(isDark ? 1 : 0);
  }, [isDark, knob]);

  const gradient = useMemo(() => ({
    light: 'from-rose-100 via-amber-100 to-sky-100',
    dark: 'from-slate-900 via-indigo-950 to-slate-950',
  }), []);

  return <button
            onClick={toggle}
            className="relative group select-none"
            aria-label="Toggle theme"
          >
            <motion.div
              className="w-[74px] h-10 rounded-full p-1 shadow-lg ring-1 ring-black/5 backdrop-blur-sm flex items-center"
              initial={false}
              animate={{ backgroundColor: isDark ? 'rgba(2,6,23,0.7)' : 'rgba(255,255,255,0.7)' }}
              transition={{ duration: 0.35 }}
            >
              <div className="absolute inset-0 flex items-center justify-between px-3">
                <motion.div initial={false} animate={{ rotate: isDark ? 0 : 0 }} className="text-amber-500">
                  <Sun className="h-4 w-4 fill-current" />
                </motion.div>
                <motion.div initial={false} animate={{ rotate: isDark ? 0 : 0 }} className="text-indigo-300">
                  <Moon className="h-4 w-4 fill-current" />
                </motion.div>
              </div>
              <motion.div
                className="relative h-8 w-8 rounded-full shadow-md flex items-center justify-center"
                style={{ x: useTransform(knob, [0, 1], [0, 88 - 56]) }} // 88 container width - 2*padding - knob size
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                animate={{ backgroundColor: isDark ? 'rgb(30,41,59)' : 'rgb(253,224,71)' }}
              >
                <AnimatePresence initial={false} mode="wait">
                  {isDark ? (
                    <motion.span
                      key="moon"
                      initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 1000, damping: 20 }}
                      className="text-indigo-200"
                    >
                      <Moon className="h-6 w-6 fill-current" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="sun"
                      initial={{ rotate: 90, scale: 0.6, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      exit={{ rotate: -90, scale: 0.6, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 1000, damping: 20 }}
                      className="text-amber-700"
                    >
                      <Sun className="h-5 w-5 fill-current" />
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Rim glow */}
                <motion.span
                  className="absolute inset-0 rounded-full"
                  initial={false}
                  animate={{
                    boxShadow: isDark
                      ? '0 0 0 3px rgba(165,180,252,0.25), 0 8px 24px rgba(30,41,59,0.5)'
                      : '0 0 0 3px rgba(251,191,36,0.25), 0 8px 24px rgba(250,204,21,0.35)'
                  }}
                  transition={{ duration: 0.35 }}
                />
              </motion.div>
            </motion.div>
          </button>
}
