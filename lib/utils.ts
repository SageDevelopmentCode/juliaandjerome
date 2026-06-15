import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Variants } from "framer-motion";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Soft cinematic easing used across the site. */
export const EASE_SOFT = [0.22, 1, 0.36, 1] as const;

/** Fade + rise reveal, ideal for whileInView. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_SOFT },
  },
};

/** Gentle fade only. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.1, ease: EASE_SOFT } },
};

/** Container that staggers its children. */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

/** Slow image scale-in. */
export const revealImage: Variants = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: EASE_SOFT },
  },
};

/** Shared viewport config for scroll reveals. */
export const viewportOnce = { once: true, amount: 0.3 } as const;
