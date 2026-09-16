"use client";

import dynamic from "next/dynamic";

export type { MapMarker, MapEmbedProps } from "@/app/components/MapEmbedClient";

const MapEmbed = dynamic(() => import("@/app/components/MapEmbedClient"), {
  ssr: false,
  loading: () => (
    <div
      className="aspect-[4/3] animate-pulse rounded-[2px] border border-sage/30 bg-cream/40 shadow-[0_30px_60px_-30px_rgba(44,56,42,0.5)]"
      aria-hidden
    />
  ),
});

export default MapEmbed;
