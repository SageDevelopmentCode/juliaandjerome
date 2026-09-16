"use client";

import { motion } from "framer-motion";
import { viewportOnce, EASE_SOFT, fadeUp, stagger } from "@/lib/utils";
import { welcomeDinner } from "@/app/data/content";
import MapEmbed from "@/app/components/MapEmbed";

export default function WelcomeDinner() {
  return (
    <section id="welcome-dinner" className="relative bg-cream/40 py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.span variants={fadeUp} className="label block text-sage-deep">
            the evening before
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-heading mt-4 text-5xl text-forest md:text-6xl"
          >
            Welcome Dinner
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="mt-6 h-px w-16 bg-sage/60"
          />
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-md leading-relaxed text-forest/70"
          >
            {welcomeDinner.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 space-y-2">
            <p className="font-serif text-sm uppercase tracking-[0.25em] text-sage-deep">
              {welcomeDinner.date}
            </p>
            <p className="font-heading text-3xl italic text-forest md:text-4xl">
              {welcomeDinner.time}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8">
            <p className="font-serif text-xl text-forest md:text-2xl">
              {welcomeDinner.venueName}
            </p>
            <p className="mt-2 text-forest/70">{welcomeDinner.address}</p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                welcomeDinner.mapQuery
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-xs uppercase tracking-[0.25em] text-forest/70 underline-offset-4 hover:text-forest hover:underline"
            >
              Get Directions
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, ease: EASE_SOFT }}
        >
          <MapEmbed
            lat={welcomeDinner.lat}
            lng={welcomeDinner.lng}
            title={`Map to ${welcomeDinner.venueName}`}
            zoom={15}
          />
        </motion.div>
      </div>
    </section>
  );
}
