"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { viewportOnce, EASE_SOFT } from "@/lib/utils";
import { event } from "@/app/data/content";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

export default function Countdown() {
  const target = new Date(event.dateISO).getTime();
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft(target));
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units: { label: string; value: number }[] = [
    { label: "Days", value: time?.days ?? 0 },
    { label: "Hours", value: time?.hours ?? 0 },
    { label: "Minutes", value: time?.minutes ?? 0 },
    { label: "Seconds", value: time?.seconds ?? 0 },
  ];

  return (
    <section className="grain relative overflow-hidden bg-forest py-24 text-cream md:py-32">
      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-10">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: EASE_SOFT }}
          className="label block text-cream/60"
        >
          so please join us
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: EASE_SOFT, delay: 0.1 }}
          className="font-heading mt-4 text-5xl text-cream md:text-6xl"
        >
          {event.dateShort}
        </motion.h2>

        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-3 md:gap-8">
          {units.map((u, i) => (
            <motion.div
              key={u.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: EASE_SOFT, delay: 0.15 + i * 0.08 }}
              className="flex flex-col items-center"
            >
              <span className="font-serif text-4xl tabular-nums text-cream md:text-6xl">
                {u.value.toString().padStart(2, "0")}
              </span>
              <span className="font-serif mt-2 text-[0.6rem] uppercase tracking-[0.3em] text-cream/55 md:text-xs">
                {u.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif mt-12 text-sm uppercase tracking-[0.3em] text-cream/60"
        >
          until we say I do
        </motion.p>
      </div>
    </section>
  );
}
