"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { EASE_SOFT } from "@/lib/utils";

const UNLOCK_FLAG = "site-gate-unlocked";

export default function SitePageEnter({ children }: { children: ReactNode }) {
  const [animateIn, setAnimateIn] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);

    if (sessionStorage.getItem(UNLOCK_FLAG) === "1") {
      sessionStorage.removeItem(UNLOCK_FLAG);
      setAnimateIn(true);
    }
  }, []);

  if (!animateIn) {
    return children;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0.35 : 1,
        ease: EASE_SOFT,
      }}
    >
      {children}
    </motion.div>
  );
}
