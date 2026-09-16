"use client";

import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";

export type MapMarker = {
  lat: number;
  lng: number;
  label: string;
};

export type MapEmbedProps = {
  lat: number;
  lng: number;
  title: string;
  zoom?: number;
  flyZoom?: number;
  className?: string;
  markers?: MapMarker[];
  activeMarkerIndex?: number;
};

const CARTO_URL =
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const CARTO_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

const LAKE_COMO_BOUNDS: L.LatLngBoundsExpression = [
  [45.75, 9.0],
  [46.1, 9.35],
];

function createPinIcon(active: boolean) {
  const size = active ? 18 : 14;
  return L.divIcon({
    className: "",
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      background: ${active ? "#3e4f3c" : "#939e66"};
      border: 2px solid #f6f4ed;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(44,56,42,0.35);
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function FlyToActive({
  lat,
  lng,
  zoom,
}: {
  lat: number;
  lng: number;
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lng], zoom, { duration: 1.2 });
  }, [map, lat, lng, zoom]);

  return null;
}

function MapInvalidateSize() {
  const map = useMap();

  useEffect(() => {
    const timer = window.setTimeout(() => map.invalidateSize(), 100);
    return () => window.clearTimeout(timer);
  }, [map]);

  return null;
}

export default function MapEmbedClient({
  lat,
  lng,
  title,
  zoom = 14,
  flyZoom,
  className,
  markers,
  activeMarkerIndex = 0,
}: MapEmbedProps) {
  const targetZoom = flyZoom ?? zoom;
  const displayMarkers = markers ?? [{ lat, lng, label: title }];
  const activeMarker =
    displayMarkers[activeMarkerIndex] ?? displayMarkers[0] ?? {
      lat,
      lng,
      label: title,
    };
  const isMultiMarker = Boolean(markers && markers.length > 1);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2px] border border-sage/30 shadow-[0_30px_60px_-30px_rgba(44,56,42,0.5)]",
        className
      )}
      aria-label={title}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream/40">
        <MapContainer
          center={[lat, lng]}
          zoom={zoom}
          scrollWheelZoom={false}
          maxBounds={isMultiMarker ? LAKE_COMO_BOUNDS : undefined}
          maxBoundsViscosity={isMultiMarker ? 0.8 : undefined}
          className="map-embed z-0 h-full w-full"
        >
          <TileLayer url={CARTO_URL} attribution={CARTO_ATTRIBUTION} />
          <MapInvalidateSize />
          <FlyToActive
            lat={activeMarker.lat}
            lng={activeMarker.lng}
            zoom={targetZoom}
          />
          {displayMarkers.map((marker, index) => (
            <Marker
              key={`${marker.label}-${index}`}
              position={[marker.lat, marker.lng]}
              icon={createPinIcon(index === activeMarkerIndex)}
              title={marker.label}
            />
          ))}
        </MapContainer>

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/15 via-transparent to-forest/10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-forest/10"
          aria-hidden
        />
      </div>
    </div>
  );
}
