// lib/motion.ts

/**
 * Shared Framer Motion easing curve used across AURUM.
 * A smooth ease-out cubic-bezier — quick start, gentle settle.
 * Use this instead of redefining easing arrays per component,
 * since inline array literals get widened to `number[]` by
 * TypeScript and fail Framer Motion's `Easing` type unless
 * pinned with `as const`.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Slightly snappier variant — good for small UI elements
 * (buttons, toggles, badges) where a full 0.5s+ reveal feels sluggish.
 */
export const EASE_OUT_SOFT = [0.16, 1, 0.3, 1] as const;

/**
 * Standard durations, in seconds, kept consistent across pages
 * so entrance timing feels like one system rather than ad hoc values.
 */
export const DURATION = {
  fast: 0.3,
  base: 0.45,
  slow: 0.6,
} as const;

/**
 * Reusable stagger container — children animate in sequence.
 * Spread into a parent <motion.div variants={...}>.
 */
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/**
 * Reusable fade-up variant for individual items inside a stagger container.
 */
export const fadeUp = (distance = 12, duration: number = DURATION.base) => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: EASE_OUT },
  },
});