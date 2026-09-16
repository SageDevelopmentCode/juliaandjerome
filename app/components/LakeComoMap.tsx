"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn, viewportOnce, EASE_SOFT } from "@/lib/utils";
import { lakeComo } from "@/app/data/content";
import MapEmbed from "@/app/components/MapEmbed";

const LAKE_CENTER = { lat: 45.9411, lng: 9.22 };
const LAKE_MARKERS = lakeComo.map((spot) => ({
  lat: spot.lat,
  lng: spot.lng,
  label: spot.name,
}));

export default function LakeComoMap() {
  const [active, setActive] = useState(0);
  const selected = lakeComo[active];

  const areas = [...new Set(lakeComo.map((s) => s.area))];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      {/* Attraction list */}
      <div className="space-y-6">
        {areas.map((area) => {
          const spots = lakeComo.filter((s) => s.area === area);
          return (
            <div key={area}>
              <h4 className="font-serif text-xs uppercase tracking-[0.25em] text-sage-deep">
                {area}
              </h4>
              <ul className="mt-3 space-y-2">
                {spots.map((spot) => {
                  const index = lakeComo.indexOf(spot);
                  const isActive = index === active;
                  return (
                    <li key={spot.name}>
                      <button
                        type="button"
                        onClick={() => setActive(index)}
                        className={cn(
                          "w-full rounded-[2px] border-l-2 px-4 py-3 text-left transition-colors duration-300",
                          isActive
                            ? "border-sage bg-sage/10"
                            : "border-transparent hover:border-sage/40 hover:bg-forest/[0.03]"
                        )}
                      >
                        <span className="font-heading text-lg text-forest md:text-xl">
                          {spot.name}
                        </span>
                        <p className="mt-1 text-sm leading-relaxed text-forest/70">
                          {spot.blurb}
                        </p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Map + image */}
      <div className="space-y-4">
        <MapEmbed
          lat={LAKE_CENTER.lat}
          lng={LAKE_CENTER.lng}
          title="Lake Como attractions"
          zoom={11}
          flyZoom={14}
          markers={LAKE_MARKERS}
          activeMarkerIndex={active}
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: EASE_SOFT }}
          className="relative aspect-[16/9] overflow-hidden rounded-[2px] bg-cream/60"
        >
          {selected.image ? (
            <Image
              src={selected.image}
              alt={selected.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
              <span className="font-serif text-xs uppercase tracking-[0.3em] text-forest/40">
                Photo coming soon
              </span>
              <p className="font-heading text-xl text-forest/60">{selected.name}</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
