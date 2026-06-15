"use client";

import { motion } from "framer-motion";
import { viewportOnce, EASE_SOFT, fadeUp, stagger } from "@/lib/utils";
import { event } from "@/app/data/content";

export default function Venue() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    event.mapQuery
  )}&output=embed`;

  return (
    <section id="venue" className="relative bg-paper py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.span variants={fadeUp} className="label block text-sage-deep">
            the celebration
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-heading mt-4 text-5xl text-forest md:text-6xl"
          >
            Where We&apos;ll Gather
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="mt-6 h-px w-16 bg-sage/60"
          />
          <motion.p
            variants={fadeUp}
            className="font-serif mt-8 text-2xl text-forest md:text-3xl"
          >
            {event.venueName}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-2 text-forest/70">
            {event.venueAddress}
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-md leading-relaxed text-forest/70"
          >
            A romantic lakeside villa tucked into the hills of Lake Como, where
            the ceremony, dinner, and dancing will unfold against the water and
            the Italian autumn light.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#rsvp"
              className="rounded-full bg-forest px-9 py-4 font-serif text-xs uppercase tracking-[0.25em] text-paper transition-colors duration-300 hover:bg-forest-deep"
            >
              Submit RSVP
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                event.mapQuery
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-xs uppercase tracking-[0.25em] text-forest/70 underline-offset-4 hover:text-forest hover:underline"
            >
              Get Directions
            </a>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="font-serif mt-6 text-xs uppercase tracking-[0.3em] text-forest/45"
          >
            kindly reply by {event.rsvpBy}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, ease: EASE_SOFT }}
          className="relative aspect-[4/3] overflow-hidden rounded-[2px] shadow-[0_30px_60px_-30px_rgba(44,56,42,0.5)]"
        >
          <iframe
            title={`Map to ${event.venueName}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full grayscale-[0.2] contrast-[1.05]"
          />
        </motion.div>
      </div>
    </section>
  );
}
