"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_SOFT } from "@/lib/utils";
import { couple, event } from "@/app/data/content";

export default function Envelope() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function enter() {
    setOpen(true);
    document.body.style.overflow = "";
    window.scrollTo({ top: 0 });
  }

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-stretch"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.9 } }}
        >
          {/* Split panels */}
          <motion.div
            className="grain relative w-1/2 overflow-hidden bg-forest-deep"
            initial={{ x: 0 }}
            exit={{ x: "-100%", transition: { duration: 1.1, ease: EASE_SOFT } }}
          />
          <motion.div
            className="grain relative w-1/2 overflow-hidden bg-forest-deep"
            initial={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 1.1, ease: EASE_SOFT } }}
          />

          {/* Center content */}
          <motion.div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            exit={{
              opacity: 0,
              scale: 0.96,
              transition: { duration: 0.5, ease: EASE_SOFT },
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={
                mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
              }
              transition={{ duration: 1.1, ease: EASE_SOFT, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <span className="label text-cream/70">an invitation awaits</span>

              <div className="my-7 h-px w-16 bg-cream/30" />

              <Image
                src="/assets/Logo.png"
                alt={`${couple.combined} monogram`}
                width={220}
                height={220}
                priority
                className="h-28 w-28 invert md:h-36 md:w-36"
              />

              <h1 className="font-display mt-6 text-5xl text-cream md:text-7xl">
                {couple.combined}
              </h1>

              <p className="font-serif mt-3 text-sm uppercase tracking-[0.35em] text-cream/60">
                {event.dateShort}
              </p>

              <motion.button
                onClick={enter}
                className="group pointer-events-auto mt-12 flex flex-col items-center gap-3"
                whileHover="hover"
              >
                <span className="font-serif text-xs uppercase tracking-[0.4em] text-cream/80 transition-colors group-hover:text-cream">
                  Click to enter
                </span>
                <motion.span
                  className="block h-10 w-px bg-cream/40"
                  variants={{ hover: { height: 28 } }}
                  transition={{ duration: 0.4, ease: EASE_SOFT }}
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
