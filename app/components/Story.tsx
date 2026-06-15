"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  fadeUp,
  revealImage,
  stagger,
  viewportOnce,
  EASE_SOFT,
} from "@/lib/utils";
import { story, type StoryChapter } from "@/app/data/content";

function Chapter({ chapter, index }: { chapter: StoryChapter; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const reversed = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="grid items-center gap-10 md:grid-cols-2 md:gap-20"
    >
      {/* Image */}
      <motion.div
        variants={revealImage}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className={`relative ${reversed ? "md:order-2" : ""}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] shadow-[0_30px_60px_-30px_rgba(44,56,42,0.5)]">
          <motion.div style={{ y: imgY }} className="absolute inset-[-8%]">
            <Image
              src={chapter.image}
              alt={chapter.caption}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
        <span className="font-serif mt-4 block text-xs uppercase tracking-[0.3em] text-forest/45">
          {chapter.caption}
        </span>
      </motion.div>

      {/* Text */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className={reversed ? "md:order-1" : ""}
      >
        <motion.span
          variants={fadeUp}
          className="label block text-sage-deep"
        >
          {chapter.eyebrow}
        </motion.span>
        <motion.h3
          variants={fadeUp}
          className="font-heading mt-4 text-4xl font-medium italic text-forest md:text-[2.75rem]"
        >
          {chapter.title}
        </motion.h3>
        <motion.div
          variants={fadeUp}
          className="mt-6 h-px w-16 origin-left bg-sage/60"
        />
        <div className="mt-6 max-w-md space-y-4">
          {chapter.body.map((paragraph, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className="text-[1.08rem] leading-[1.85] text-forest/78"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Story() {
  return (
    <section id="story" className="relative bg-paper py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: EASE_SOFT }}
          className="mb-20 text-center md:mb-28"
        >
          <span className="label text-sage-deep">how it happened</span>
          <h2 className="font-heading mt-4 text-5xl font-medium text-forest md:text-6xl">
            Our Story
          </h2>
        </motion.div>

        <div className="space-y-28 md:space-y-40">
          {story.map((chapter, i) => (
            <Chapter key={chapter.title} chapter={chapter} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
