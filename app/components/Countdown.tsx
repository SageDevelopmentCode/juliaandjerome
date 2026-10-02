"use client";

import { Fragment, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { event } from "@/app/data/content";

const TARGET = new Date(event.dateISO).getTime();

function subscribe(onTick: () => void) {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
}

/** Whole seconds, so the snapshot stays stable between ticks. Null on the server so markup never mismatches. */
const nowSeconds = () => Math.floor(Date.now() / 1000);
const serverSnapshot = () => null;

function split(now: number) {
  const diff = Math.max(0, Math.floor(TARGET / 1000) - now);
  return [
    { label: "Days", value: Math.floor(diff / 86_400) },
    { label: "Hours", value: Math.floor((diff % 86_400) / 3_600) },
    { label: "Minutes", value: Math.floor((diff % 3_600) / 60) },
    { label: "Seconds", value: diff % 60 },
  ];
}

const LABELS = ["Days", "Hours", "Minutes", "Seconds"];

export default function Countdown({ className }: { className?: string }) {
  const now = useSyncExternalStore(subscribe, nowSeconds, serverSnapshot);
  const units = now === null ? LABELS.map((label) => ({ label, value: null })) : split(now);

  return (
    <div
      role="timer"
      aria-label={`Countdown to ${event.dateLong}`}
      aria-live="off"
      className={cn("text-shadow-photo flex items-stretch text-ivory", className)}
    >
      {units.map((u, i) => (
        <Fragment key={u.label}>
          {i > 0 && <span aria-hidden className="mx-3 w-px bg-ivory/40 md:mx-6" />}
          <div className="flex min-w-[3.2rem] flex-col items-center md:min-w-[4.5rem]">
            <span className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-none tabular-nums">
              {u.value === null ? "--" : String(u.value).padStart(2, "0")}
            </span>
            <span className="mt-1.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] md:text-[0.7rem]">
              {u.label}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
