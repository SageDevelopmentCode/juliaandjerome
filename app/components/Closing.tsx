"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { viewportOnce, EASE_SOFT } from "@/lib/utils";
import { closing, couple } from "@/app/data/content";

export default function Closing() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative flex h-[90svh] items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-[-12%]">
        <Image
          src={closing.image}
          alt={`${couple.combined} dancing by the ocean`}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-forest-deep/45" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 1.2, ease: EASE_SOFT }}
        className="relative z-10 max-w-3xl px-6 text-center"
      >
        <span className="label text-cream/70">with all our love</span>
        <p className="font-heading mt-6 text-4xl italic leading-[1.15] text-cream md:text-5xl">
          {closing.quote}
        </p>
      </motion.div>
    </section>
  );
}
