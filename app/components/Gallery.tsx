"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { viewportOnce, EASE_SOFT } from "@/lib/utils";
import { gallery } from "@/app/data/content";

const ratios = [
  "aspect-[4/5]",
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[3/4]",
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative bg-paper-deep py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: EASE_SOFT }}
          className="mb-16 text-center"
        >
          <span className="label text-sage-deep">moments</span>
          <h2 className="font-heading mt-4 text-5xl text-forest md:text-6xl">
            A Few Favorites
          </h2>
        </motion.div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {gallery.map((item, i) => (
            <motion.figure
              key={item.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.9,
                ease: EASE_SOFT,
                delay: (i % 3) * 0.08,
              }}
              className="group relative block break-inside-avoid overflow-hidden rounded-[2px]"
            >
              <div className={`relative w-full ${ratios[i % ratios.length]}`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-forest-deep/0 transition-colors duration-700 group-hover:bg-forest-deep/15" />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 p-4 font-serif text-xs uppercase tracking-[0.25em] text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.alt}
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
