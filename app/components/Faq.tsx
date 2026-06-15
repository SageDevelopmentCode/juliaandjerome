"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { viewportOnce, EASE_SOFT } from "@/lib/utils";
import { faq, event } from "@/app/data/content";

function Item({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-forest/10">
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-serif text-lg text-forest md:text-xl">{q}</span>
        <span className="relative flex h-6 w-6 flex-none items-center justify-center">
          <span className="absolute h-px w-3.5 bg-sage-deep" />
          <motion.span
            animate={{ rotate: isOpen ? 0 : 90 }}
            transition={{ duration: 0.4, ease: EASE_SOFT }}
            className="absolute h-px w-3.5 bg-sage-deep"
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_SOFT }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 leading-relaxed text-forest/70">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-paper py-28 md:py-36">
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: EASE_SOFT }}
          className="mb-14 text-center"
        >
          <span className="label text-sage-deep">questions &amp; answers</span>
          <h2 className="font-heading mt-4 text-5xl text-forest md:text-6xl">
            Good to Know
          </h2>
        </motion.div>

        <div>
          {faq.map((item, i) => (
            <Item
              key={item.q}
              q={item.q}
              a={item.a}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>

        <p className="mt-12 text-center text-forest/60">
          Still have a question? Reach out at{" "}
          <a
            href={`mailto:${event.contactEmail}`}
            className="text-sage-deep underline-offset-4 hover:underline"
          >
            {event.contactEmail}
          </a>
        </p>
      </div>
    </section>
  );
}
