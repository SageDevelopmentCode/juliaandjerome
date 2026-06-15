"use client";

import { motion } from "framer-motion";
import { viewportOnce, EASE_SOFT } from "@/lib/utils";
import { details } from "@/app/data/content";

export default function Details() {
  return (
    <section id="details" className="relative bg-cream/40 py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: EASE_SOFT }}
          className="mb-16 max-w-xl"
        >
          <span className="label text-sage-deep">good to know</span>
          <h2 className="font-heading mt-4 text-5xl text-forest md:text-6xl">
            The Details
          </h2>
          <p className="mt-6 leading-relaxed text-forest/70">
            The people, places, and practical notes that will make the weekend
            feel effortless.
          </p>
        </motion.div>

        <div className="grid gap-px overflow-hidden rounded-[2px] bg-forest/10 sm:grid-cols-2 lg:grid-cols-3">
          {details.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                ease: EASE_SOFT,
                delay: (i % 3) * 0.08,
              }}
              className="group relative flex flex-col bg-paper p-8 transition-colors duration-500 hover:bg-paper-deep md:p-10"
            >
              <span className="font-serif text-sm text-sage-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading mt-3 text-2xl text-forest md:text-3xl">
                {card.title}
              </h3>
              <p className="font-serif mt-2 text-sm italic text-forest/55">
                {card.blurb}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-forest/70">
                {card.body}
              </p>
              <span className="mt-6 block h-px w-10 origin-left bg-sage/50 transition-all duration-500 group-hover:w-20" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
