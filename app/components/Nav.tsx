"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn, EASE_SOFT } from "@/lib/utils";
import { couple, images, nav } from "@/app/data/content";
import { Tint } from "@/app/components/ui";

const linkClass =
  "font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ivory/90 transition-opacity hover:opacity-60 lg:text-[0.8rem]";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const allLinks = [...nav.left, ...nav.right];

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled || menuOpen ? "bg-olive/95 backdrop-blur-sm" : "bg-transparent"
        )}
      >
        <nav
          className={cn(
            "mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-5 transition-[height] duration-500 md:px-10",
            scrolled ? "h-16" : "h-20 md:h-28"
          )}
        >
          <div className="hidden items-center justify-around md:flex">
            {nav.left.map((item) => (
              <a key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </a>
            ))}
          </div>
          <div className="md:hidden" />

          <a href="#top" aria-label={couple.combined} className="text-ivory">
            <Tint
              src={images.monogram}
              className={cn(
                "transition-all duration-500",
                scrolled ? "h-9 w-7" : "h-12 w-9 md:h-16 md:w-12"
              )}
            />
          </a>

          <div className="hidden items-center justify-around md:flex">
            {nav.right.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(linkClass, item.label === "FAQ" && "underline underline-offset-4")}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex justify-end md:hidden">
            <button
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            >
              <span
                className={cn(
                  "h-px w-6 bg-ivory transition-transform duration-300",
                  menuOpen && "translate-y-[3.5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-px w-6 bg-ivory transition-transform duration-300",
                  menuOpen && "-translate-y-[3.5px] -rotate-45"
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-olive md:hidden"
          >
            {allLinks.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.06, ease: EASE_SOFT }}
                className="font-display text-3xl text-ivory"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
