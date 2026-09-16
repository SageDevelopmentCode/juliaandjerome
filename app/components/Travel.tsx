"use client";

import { motion } from "framer-motion";
import { viewportOnce, EASE_SOFT, fadeUp, stagger } from "@/lib/utils";
import { travel, itinerary, nearbyDestinations } from "@/app/data/content";
import LakeComoMap from "@/app/components/LakeComoMap";

export default function Travel() {
  return (
    <section id="travel" className="relative bg-cream/40 py-28 md:py-36">
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
            you need to get here, settle in, and make the most of your trip.
          </p>
        </motion.div>

        {/* Flights + Milan Hotel */}
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
              Flights
            </motion.h3>
            <motion.div variants={fadeUp} className="mt-4 h-px w-12 bg-sage/60" />
            <motion.p
              variants={fadeUp}
              className="mt-5 leading-relaxed text-forest/70"
            >
              {travel.flights}
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
              Milan Hotel
            </motion.h3>
            <motion.div variants={fadeUp} className="mt-4 h-px w-12 bg-sage/60" />
            <motion.p
              variants={fadeUp}
              className="font-serif mt-5 text-lg text-forest"
            >
              {travel.milanHotel.name}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-3 leading-relaxed text-forest/70"
            >
              {travel.milanHotel.body}
            </motion.p>
          </motion.div>
        </div>

        {/* Transportation + Accommodation */}
        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
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
              Transportation
            </motion.h3>
            <motion.div variants={fadeUp} className="mt-4 h-px w-12 bg-sage/60" />
            <motion.p
              variants={fadeUp}
              className="mt-5 leading-relaxed text-forest/70"
            >
              {travel.transportation}
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
              Accommodation
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
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: EASE_SOFT }}
          className="mt-4 max-w-xl text-sm leading-relaxed text-forest/70"
        >
          Click an attraction to explore it on the map. Photos coming soon.
        </motion.p>
        <div className="mt-8">
          <LakeComoMap />
        </div>

        {/* Other cities */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: EASE_SOFT }}
          className="font-serif mt-24 text-2xl text-forest md:text-3xl"
        >
          Other Cities to Explore
        </motion.h3>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {nearbyDestinations.map((region, i) => (
            <motion.div
              key={region.region}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_SOFT, delay: (i % 3) * 0.08 }}
              className="rounded-[2px] border border-forest/10 bg-paper p-6"
            >
              <h4 className="font-serif text-lg text-forest">{region.region}</h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {region.cities.map((city) => (
                  <span
                    key={city}
                    className="rounded-full border border-forest/15 px-3 py-1 font-serif text-xs text-forest/70"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: EASE_SOFT }}
          className="mt-16 text-center font-serif text-sm italic text-forest/55"
        >
          {travel.disclaimer}
        </motion.p>
      </div>
    </section>
  );
}
