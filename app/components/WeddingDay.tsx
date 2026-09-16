"use client";

import { motion } from "framer-motion";
import { viewportOnce, EASE_SOFT } from "@/lib/utils";
import { weddingDay } from "@/app/data/content";

export default function WeddingDay() {
  return (
    <section id="wedding-day" className="relative bg-paper py-28 md:py-36">
      <div className="mx-auto max-w-4xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: EASE_SOFT }}
          className="mb-16 text-center"
        >
          <span className="label text-sage-deep">the main event</span>
          <h2 className="font-heading mt-4 text-5xl text-forest md:text-6xl">
            Wedding Day
          </h2>
          <p className="mt-6 leading-relaxed text-forest/70">
            {weddingDay.venueNote}
          </p>
          <p className="font-serif mt-3 text-lg text-forest md:text-xl">
            {weddingDay.venueName}
          </p>
        </motion.div>

        <div className="relative">
          <span className="absolute left-[7px] top-2 bottom-2 w-px bg-forest/15 md:left-1/2" />

          <div className="space-y-12 md:space-y-16">
            {weddingDay.events.map((item, i) => {
              const right = i % 2 === 1;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, ease: EASE_SOFT }}
                  className="relative pl-10 md:grid md:grid-cols-2 md:gap-12 md:pl-0"
                >
                  <span className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center md:left-1/2 md:-translate-x-1/2">
                    <span className="h-2.5 w-2.5 rounded-full bg-sage ring-4 ring-paper" />
                  </span>

                  <div
                    className={
                      right
                        ? "md:col-start-2 md:pl-12"
                        : "md:col-start-1 md:row-start-1 md:pr-12 md:text-right"
                    }
                  >
                    <h3 className="font-heading text-3xl italic text-forest md:text-4xl">
                      {item.title}
                    </h3>
                    <p className="font-serif mt-1 text-sm italic text-forest/55">
                      {item.time}
                    </p>
                    <p className="mt-4 leading-relaxed text-forest/70">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
