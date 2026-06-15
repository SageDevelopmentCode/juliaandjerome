"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE_SOFT } from "@/lib/utils";
import { couple, event, hero } from "@/app/data/content";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden"
    >
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0"
      >
        <Image
          src={hero.image}
          alt={`${couple.combined} on the beach at sunset`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/55 via-forest-deep/25 to-forest-deep/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(44,56,42,0.35)_0%,transparent_65%)]" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-cream"
      >
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE_SOFT, delay: 0.4 }}
          className="font-serif text-shadow-hero max-w-md text-sm italic tracking-wide text-cream md:text-base"
        >
          {hero.invite}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: EASE_SOFT, delay: 0.6 }}
          className="font-display text-shadow-hero mt-4 text-[3.7rem] leading-[0.95] md:text-[8rem]"
        >
          {couple.first}
          <span className="mx-2 align-middle text-[2.5rem] md:text-[5rem]">
            &amp;
          </span>
          {couple.second}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE_SOFT, delay: 0.9 }}
          className="mt-8 flex flex-col items-center gap-2.5"
        >
          <span className="h-px w-14 bg-gradient-to-r from-transparent via-cream/55 to-transparent" />
          <p className="font-serif text-shadow-hero text-base italic tracking-wide text-cream md:text-lg">
            {event.dateLong}
          </p>
          <span className="font-serif text-[0.45rem] text-cream/45" aria-hidden="true">
            ·
          </span>
          <p className="font-serif text-shadow-hero text-[0.65rem] uppercase tracking-[0.32em] text-cream/75 md:text-xs">
            {event.venueCity}
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-serif text-shadow-hero text-[0.65rem] font-medium uppercase tracking-[0.35em] text-cream/90">
          scroll to explore
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-px bg-cream/70"
        />
      </motion.div>
    </section>
  );
}
