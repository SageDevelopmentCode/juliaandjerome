"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn, EASE_SOFT } from "@/lib/utils";
import type { Destination } from "@/app/data/content";

type Point = { x: number; y: number };

export type MapLabel = {
  key: string;
  /** "end": text sits left of the dot (right-aligned). "start": text sits right of the dot. */
  side: "start" | "end";
  /** Dot position, in layout units. */
  dot: Point;
};

export type MapPhoto = { key: string; index: number; x: number; y: number; w: number; h: number };

export type MapLayout = {
  width: number;
  height: number;
  map: { x: number; y: number; w: number; h: number; src: string; alt: string };
  /** Pin positions as percentages of the map box (from scripts/build-maps.mjs). */
  pins: Record<string, { x: number; y: number }>;
  labels: MapLabel[];
  photos: MapPhoto[];
};

const pct = (n: number, total: number) => `${(n / total) * 100}%`;
const ADVANCE_MS = 4500;
const RESUME_MS = 3000;

export default function DestinationMap({
  layout,
  destinations,
  title,
  tone,
  extra,
  className,
}: {
  layout: MapLayout;
  destinations: Destination[];
  title: ReactNode;
  tone: "light" | "dark";
  /** Additional absolutely-positioned overlay content (e.g. the Italy star), in layout units. */
  extra?: (helpers: { pin: (key: string) => Point; pct: typeof pct }) => ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const { width: W, height: H, map } = layout;
  const byKey = Object.fromEntries(destinations.map((d) => [d.key, d]));
  const pin = (key: string): Point => ({
    x: map.x + (layout.pins[key].x / 100) * map.w,
    y: map.y + (layout.pins[key].y / 100) * map.h,
  });
  const ink = tone === "light" ? "#f7f5f0" : "#482117";
  const pinFill = tone === "light" ? "#36350b" : "#482117";
  const pinRing = "0 0 0 2px rgba(247, 245, 240, 0.92)";
  const pinRingActive = "0 0 0 2px #f7f5f0, 0 0 0 3px rgba(54, 53, 11, 0.45)";
  const count = layout.labels.length;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeRef = useRef<number | null>(null);

  const activeKey = layout.labels[active]?.key;
  const activePlace = activeKey ? byKey[activeKey] : undefined;

  function choose(index: number) {
    setActive(index);
    setPaused(true);
    if (resumeRef.current) window.clearTimeout(resumeRef.current);
    resumeRef.current = window.setTimeout(() => setPaused(false), RESUME_MS);
  }

  useEffect(() => {
    if (reduce || paused || count === 0) return;
    const id = window.setInterval(() => {
      setActive((n) => (n + 1) % count);
    }, ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, count]);

  useEffect(
    () => () => {
      if (resumeRef.current) window.clearTimeout(resumeRef.current);
    },
    []
  );

  const dots = (
    <div className="mt-5 flex justify-center gap-2.5" role="tablist" aria-label="Places">
      {layout.labels.map((label, i) => {
        const on = i === active;
        return (
          <button
            key={label.key}
            type="button"
            role="tab"
            aria-selected={on}
            aria-label={byKey[label.key]?.name ?? label.key}
            onClick={() => choose(i)}
            className="h-2.5 w-2.5 rounded-full transition-opacity"
            style={{ backgroundColor: pinFill, opacity: on ? 1 : 0.55 }}
          />
        );
      })}
    </div>
  );

  return (
    <div className={className}>
      <div
        className="relative mx-auto hidden w-full max-w-[1280px] [container-type:inline-size] md:block"
        style={{ aspectRatio: `${W} / ${H}` }}
      >
        <div className="absolute inset-x-0 top-[1%] z-20 flex justify-center">{title}</div>

        <Image
          src={map.src}
          alt={map.alt}
          width={map.w}
          height={map.h}
          className="absolute"
          style={{ left: pct(map.x, W), top: pct(map.y, H), width: pct(map.w, W), height: pct(map.h, H) }}
        />

        <svg
          aria-hidden
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 z-10 h-full w-full"
        >
          {layout.labels.map(({ key, dot }) => {
            const p = pin(key);
            return (
              <line
                key={key}
                x1={dot.x}
                y1={dot.y}
                x2={p.x}
                y2={p.y}
                stroke={ink}
                strokeWidth={2}
                strokeOpacity={key === activeKey ? 1 : 0.2}
                vectorEffect="non-scaling-stroke"
                className="transition-opacity duration-700"
              />
            );
          })}
        </svg>

        {layout.labels.map(({ key, side, dot }, i) => {
          const d = byKey[key];
          const on = key === activeKey;
          return (
            <div key={key}>
              <button
                type="button"
                aria-label={d?.name ?? key}
                aria-current={on ? "true" : undefined}
                onClick={() => choose(i)}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500"
                style={{
                  left: pct(dot.x, W),
                  top: pct(dot.y, H),
                  backgroundColor: pinFill,
                  width: on ? "1.45cqw" : "1.05cqw",
                  height: on ? "1.45cqw" : "1.05cqw",
                  opacity: on ? 1 : 0.7,
                  boxShadow: on ? pinRingActive : pinRing,
                }}
              />
              <button
                type="button"
                onClick={() => choose(i)}
                className={cn(
                  "absolute z-10 -translate-y-[1.3cqw] transition-opacity duration-700",
                  side === "end" ? "text-right" : "text-left"
                )}
                style={{
                  top: pct(dot.y, H),
                  ...(side === "end"
                    ? { right: pct(W - dot.x + 14, W) }
                    : { left: pct(dot.x + 14, W) }),
                  color: ink,
                  opacity: on ? 1 : 0.28,
                }}
              >
                <p className="font-display text-map-label max-w-[16cqw] leading-[0.95]">{d?.name}</p>
                {(d?.note || d?.recommend) && (
                  <p className="text-map-label-sub mt-[0.3cqw] font-mono uppercase tracking-[0.04em]">
                    {d.note || "Highly recommend"}
                  </p>
                )}
              </button>
            </div>
          );
        })}

        {layout.photos.map(({ key, index, x, y, w, h }) => {
          const photo = byKey[key]?.photos[index];
          if (!photo) return null;
          const on = key === activeKey;
          return (
            <div
              key={photo.src}
              className={cn(
                "absolute overflow-hidden transition-opacity duration-700",
                on ? "opacity-100" : "pointer-events-none opacity-0"
              )}
              style={{ left: pct(x, W), top: pct(y, H), width: pct(w, W), height: pct(h, H) }}
            >
              <Image src={photo.src} alt={on ? photo.alt : ""} fill sizes="16vw" className="object-cover" />
            </div>
          );
        })}

        {extra?.({ pin, pct })}
      </div>

      <div className="hidden md:block">{dots}</div>

      <div className="md:hidden">
        <div className="flex justify-center px-4">{title}</div>
        <div className="relative mx-auto mt-6 w-[72%]" style={{ aspectRatio: `${map.w} / ${map.h}` }}>
          <Image src={map.src} alt={map.alt} fill sizes="72vw" />
          {layout.labels.map(({ key }, i) => {
            const d = byKey[key];
            const on = i === active;
            const pinPos = layout.pins[key];
            if (!pinPos) return null;
            return (
              <button
                key={key}
                type="button"
                aria-label={d?.name ?? key}
                aria-current={on ? "true" : undefined}
                onClick={() => choose(i)}
                className="absolute z-10 flex min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={{ left: `${pinPos.x}%`, top: `${pinPos.y}%` }}
              >
                <span
                  className="block rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: pinFill,
                    width: on ? 12 : 9,
                    height: on ? 12 : 9,
                    opacity: on ? 1 : 0.7,
                    boxShadow: on ? pinRingActive : pinRing,
                  }}
                />
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          {activePlace && activeKey && (
            <motion.div
              key={activeKey}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: EASE_SOFT }}
              className="mt-8 px-5 text-center"
              style={{ color: ink }}
            >
              <p className="font-display text-3xl">{activePlace.name}</p>
              {(activePlace.note || activePlace.recommend) && (
                <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.06em]">
                  {activePlace.note || "Highly recommend"}
                </p>
              )}
              {activePlace.photos.length > 0 && (
                <div
                  className={cn(
                    "mx-auto mt-4 grid max-w-md gap-2",
                    activePlace.photos.length > 1 ? "grid-cols-2" : "grid-cols-1"
                  )}
                >
                  {activePlace.photos.map((photo) => (
                    <div key={photo.src} className="relative aspect-[4/5] overflow-hidden">
                      <Image src={photo.src} alt={photo.alt} fill sizes="50vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {dots}
      </div>
    </div>
  );
}
