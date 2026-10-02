import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
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
  const { width: W, height: H, map } = layout;
  const byKey = Object.fromEntries(destinations.map((d) => [d.key, d]));
  const pin = (key: string): Point => ({
    x: map.x + (layout.pins[key].x / 100) * map.w,
    y: map.y + (layout.pins[key].y / 100) * map.h,
  });
  const ink = tone === "light" ? "#f7f5f0" : "#482117";

  return (
    <div className={className}>
      {/* Desktop / tablet: the composed map */}
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
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {layout.labels.map(({ key, side, dot }) => {
          const d = byKey[key];
          return (
            <div key={key}>
              <span
                aria-hidden
                className="absolute z-10 h-[1.05cqw] w-[1.05cqw] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ left: pct(dot.x, W), top: pct(dot.y, H), backgroundColor: ink }}
              />
              <div
                className={cn(
                  "absolute z-10 -translate-y-[1.3cqw]",
                  side === "end" ? "text-right" : "text-left"
                )}
                style={{
                  top: pct(dot.y, H),
                  ...(side === "end"
                    ? { right: pct(W - dot.x + 14, W) }
                    : { left: pct(dot.x + 14, W) }),
                  color: ink,
                }}
              >
                <p className="font-display max-w-[16cqw] text-[2.6cqw] leading-[0.95]">{d.name}</p>
                {(d.note || d.recommend) && (
                  <p className="mt-[0.3cqw] font-mono text-[0.85cqw] uppercase tracking-[0.04em]">
                    {d.note || "Highly recommend"}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {layout.photos.map(({ key, index, x, y, w, h }) => {
          const photo = byKey[key].photos[index];
          return (
            <div
              key={photo.src}
              className="absolute overflow-hidden"
              style={{ left: pct(x, W), top: pct(y, H), width: pct(w, W), height: pct(h, H) }}
            >
              <Image src={photo.src} alt={photo.alt} fill sizes="16vw" className="object-cover" />
            </div>
          );
        })}

        {extra?.({ pin, pct })}
      </div>

      {/* Mobile: title, map, then a list of destinations */}
      <div className="md:hidden">
        <div className="flex justify-center px-4">{title}</div>
        <div className="relative mx-auto mt-6 w-[72%]" style={{ aspectRatio: `${map.w} / ${map.h}` }}>
          <Image src={map.src} alt={map.alt} fill sizes="72vw" />
        </div>
        <ul className="mt-8 space-y-8 px-5">
          {destinations.map((d) => (
            <li key={d.key} style={{ color: ink }}>
              <p className="font-display text-3xl">{d.name}</p>
              {(d.note || d.recommend) && (
                <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.06em]">
                  {d.note || "Highly recommend"}
                </p>
              )}
              {d.photos.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {d.photos.map((photo) => (
                    <div key={photo.src} className="relative aspect-[4/5] overflow-hidden">
                      <Image src={photo.src} alt={photo.alt} fill sizes="50vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
