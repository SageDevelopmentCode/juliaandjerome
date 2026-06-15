"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn, EASE_SOFT } from "@/lib/utils";
import { couple, nav } from "@/app/data/content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE_SOFT, delay: 0.3 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          solid
            ? "bg-paper/85 shadow-[0_1px_0_rgba(62,79,60,0.08)] backdrop-blur-md"
            : "bg-gradient-to-b from-forest-deep/50 via-forest-deep/20 to-transparent"
        )}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
          {/* Left: desktop links */}
          <div className="hidden flex-1 items-center gap-8 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "font-serif text-xs font-medium uppercase tracking-[0.2em] transition-colors",
                  solid
                    ? "text-forest/70 hover:text-forest"
                    : "text-shadow-hero text-cream hover:text-paper"
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Monogram — left on mobile, centered on desktop */}
          <a
            href="#top"
            className="flex flex-none items-center justify-start md:justify-center"
          >
            <Image
              src="/assets/Logo.png"
              alt={`${couple.combined}`}
              width={120}
              height={120}
              className={cn(
                "h-11 w-11 transition-[filter] duration-500",
                solid ? "invert-0" : "invert"
              )}
            />
          </a>

          {/* Right: RSVP + mobile toggle */}
          <div className="flex flex-1 items-center justify-end gap-4">
            <a
              href="#rsvp"
              className={cn(
                "hidden rounded-full px-7 py-2.5 font-serif text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 md:inline-block",
                solid
                  ? "border border-forest/30 bg-forest text-paper shadow-sm hover:bg-forest-deep"
                  : "bg-cream text-forest shadow-[0_2px_12px_rgba(44,56,42,0.35)] hover:bg-paper hover:shadow-[0_4px_16px_rgba(44,56,42,0.4)]"
              )}
            >
              RSVP
            </a>

            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span
                className={cn(
                  "h-px w-6 transition-all duration-300",
                  solid ? "bg-forest" : "bg-cream",
                  menuOpen && "translate-y-[3.5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-px w-6 transition-all duration-300",
                  solid ? "bg-forest" : "bg-cream",
                  menuOpen && "-translate-y-[3.5px] -rotate-45"
                )}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-paper md:hidden"
          >
            {nav.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, ease: EASE_SOFT }}
                className="font-serif text-2xl uppercase tracking-[0.25em] text-forest"
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href="#rsvp"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + nav.length * 0.08, ease: EASE_SOFT }}
              className="mt-4 rounded-full bg-forest px-9 py-3 font-serif text-sm uppercase tracking-[0.2em] text-paper"
            >
              RSVP
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
