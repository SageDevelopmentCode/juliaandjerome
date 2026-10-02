"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE_SOFT } from "@/lib/utils";

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: EASE_SOFT, delay }}
    >
      {children}
    </motion.div>
  );
}
