"use client";

import { motion } from "framer-motion";
import { viewportOnce, EASE_SOFT, fadeUp, stagger } from "@/lib/utils";
import { travel, itinerary, lakeComo } from "@/app/data/content";

export default function Travel() {
  return (
    <section id="travel" className="relative bg-paper py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: EASE_SOFT }}
          className="mb-16 max-w-xl"
        >
          <span className="label text-sage-deep">making the trip</span>
          <h2 className="font-heading mt-4 text-5xl text-forest md:text-6xl">
            Travel &amp; Stay
          </h2>
          <p className="mt-6 leading-relaxed text-forest/70">
            A weekend in Lake Como takes a little planning. Here is everything
            you need to get here and settle in.
          </p>
        </motion.div>

        {/* Getting there + Stay */}
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.h3
              variants={fadeUp}
              className="font-serif text-2xl text-forest md:text-3xl"
            >
              Getting There
            </motion.h3>
            <motion.div variants={fadeUp} className="mt-4 h-px w-12 bg-sage/60" />
            <motion.p
              variants={fadeUp}
              className="mt-5 leading-relaxed text-forest/70"
            >
              {travel.gettingThere}
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.h3
              variants={fadeUp}
              className="font-serif text-2xl text-forest md:text-3xl"
            >
              Where You&apos;ll Stay
            </motion.h3>
            <motion.div variants={fadeUp} className="mt-4 h-px w-12 bg-sage/60" />
            <motion.p
              variants={fadeUp}
              className="mt-5 leading-relaxed text-forest/70"
            >
              {travel.accommodation}
            </motion.p>
          </motion.div>
        </div>

        {/* Getting around */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: EASE_SOFT }}
          className="font-serif mt-20 text-2xl text-forest md:text-3xl"
        >
          Getting Around
        </motion.h3>
        <div className="mt-8 grid gap-px overflow-hidden rounded-[2px] bg-forest/10 sm:grid-cols-3">
          {travel.transport.map((opt, i) => (
            <motion.div
              key={opt.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_SOFT, delay: i * 0.08 }}
              className="bg-paper p-8"
            >
              <span className="font-serif text-sm text-sage-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="font-heading mt-2 text-2xl text-forest md:text-3xl">
                {opt.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-forest/70">
                {opt.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Preliminary itinerary */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: EASE_SOFT }}
          className="font-serif mt-24 text-2xl text-forest md:text-3xl"
        >
          Preliminary Itinerary
        </motion.h3>
        <div className="mt-8 border-t border-forest/10">
          {itinerary.map((day, i) => (
            <motion.div
              key={day.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE_SOFT, delay: (i % 2) * 0.05 }}
              className="grid gap-2 border-b border-forest/10 py-6 md:grid-cols-[200px_1fr] md:gap-8"
            >
              <div>
                <p className="font-serif text-sm uppercase tracking-[0.2em] text-sage-deep">
                  {day.date}
                </p>
                <p className="font-serif text-xs italic text-forest/45">
                  {day.day}
                </p>
              </div>
              <div>
                <h4 className="font-serif text-xl text-forest">{day.title}</h4>
                <ul className="mt-2 space-y-1">
                  {day.notes.map((note, n) => (
                    <li key={n} className="text-sm leading-relaxed text-forest/70">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Things to do */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: EASE_SOFT }}
          className="font-serif mt-24 text-2xl text-forest md:text-3xl"
        >
          Things to Do in Lake Como
        </motion.h3>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {lakeComo.map((spot, i) => (
            <motion.div
              key={spot.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_SOFT, delay: (i % 2) * 0.08 }}
              className="flex gap-5 border-l border-sage/40 pl-5"
            >
              <div>
                <h4 className="font-heading text-xl text-forest md:text-2xl">{spot.name}</h4>
                <p className="mt-1 text-sm leading-relaxed text-forest/70">
                  {spot.blurb}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
