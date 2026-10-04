"use client";

import DestinationMap, { type MapLayout } from "@/app/components/DestinationMap";
import Reveal from "@/app/components/Reveal";
import { InitialTitle } from "@/app/components/ui";
import { europeDestinations, images } from "@/app/data/content";
import { europePins } from "@/app/data/map-pins";

/** Positions in design units (the Canva page is 1024 wide). */
const layout: MapLayout = {
  width: 1024,
  height: 545,
  map: { x: 315, y: 100, w: 420, h: 378, src: images.europeMap, alt: "Map of Europe" },
  pins: { ...europePins },
  labels: [
    { key: "amsterdam", side: "end", dot: { x: 423, y: 128 } },
    { key: "london", side: "end", dot: { x: 287, y: 222 } },
    { key: "barcelona", side: "end", dot: { x: 318, y: 372 } },
    { key: "paris", side: "start", dot: { x: 672, y: 116 } },
    { key: "germany", side: "start", dot: { x: 727, y: 230 } },
    { key: "switzerland", side: "start", dot: { x: 712, y: 352 } },
    { key: "greece", side: "start", dot: { x: 650, y: 470 } },
  ],
  photos: [
    { key: "amsterdam", index: 0, x: 152, y: 15, w: 128, h: 143 },
    { key: "london", index: 0, x: 62, y: 175, w: 116, h: 126 },
    { key: "barcelona", index: 0, x: 52, y: 321, w: 136, h: 154 },
    { key: "paris", index: 0, x: 772, y: 6, w: 126, h: 178 },
    { key: "germany", index: 0, x: 858, y: 200, w: 147, h: 150 },
    { key: "switzerland", index: 0, x: 906, y: 333, w: 112, h: 150 },
    { key: "greece", index: 0, x: 722, y: 408, w: 116, h: 122 },
  ],
};

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 1.8l3.1 6.6 7.1.8-5.3 4.9 1.5 7.1L12 17.6l-6.4 3.6 1.5-7.1L1.8 9.2l7.1-.8z"
        fill="#f6c548"
      />
    </svg>
  );
}

export default function EuropeMap() {
  return (
    <section className="overflow-hidden bg-sand pb-14 pt-12 text-cocoa md:pb-10 md:pt-10">
      <Reveal>
        <DestinationMap
          layout={layout}
          destinations={europeDestinations}
          tone="dark"
          title={
            <InitialTitle
              initial="B"
              rest="eyond Italy"
              className="text-section"
              initialClassName="text-[1.8em]"
            />
          }
          extra={({ pin, pct }) => {
            const italy = pin("italy");
            return (
              <>
                <span
                  className="absolute z-20 w-[3.6cqw] -translate-x-1/2 -translate-y-1/2"
                  style={{ left: pct(italy.x, 1024), top: pct(italy.y, 545) }}
                >
                  <Star className="block w-full" />
                </span>
                <span
                  aria-hidden
                  className="absolute z-10 w-[2px] -translate-x-1/2 bg-cocoa"
                  style={{ left: pct(italy.x, 1024), top: pct(italy.y, 545), height: pct(500 - italy.y, 545) }}
                />
                <p
                  className="font-display text-map-label absolute z-10 -translate-x-1/2"
                  style={{ left: pct(italy.x, 1024), top: pct(502, 545) }}
                >
                  Italy
                </p>
              </>
            );
          }}
        />
      </Reveal>
    </section>
  );
}
