"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { EASE_SOFT } from "@/lib/utils";
import { couple, images, invitation } from "@/app/data/content";
import { Tint } from "@/app/components/ui";

export default function Invitation() {
  return (
    <section className="relative overflow-hidden bg-olive pt-20 md:pt-28">
      <Image
        src={images.inviteBg}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[50%_40%]"
      />

      {/* --w drives every envelope measurement so the pocket always lines up with the card */}
      <div
        className="relative mx-auto w-[var(--w)]"
        style={{ "--w": "min(94vw, 820px)" } as CSSProperties}
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[calc(var(--w)*0.32)] bg-[#e9e3d4] [clip-path:polygon(0_100%,50%_0,100%_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 top-[calc(var(--w)*0.32)] bg-[#e4ddcc]"
        />

        <motion.div
          initial={{ y: "14%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.6, ease: EASE_SOFT }}
          className="relative z-10 mx-[12%] mt-[calc(var(--w)*0.08)] bg-ivory px-[7%] pb-[calc(var(--w)*0.27)] pt-[calc(var(--w)*0.03)] text-center text-cocoa shadow-[0_10px_40px_-12px_rgba(40,30,10,0.35)]"
        >
          <Tint
            src={images.villaSketch}
            label="Sketch of Relais Villa Vittoria"
            className="mx-auto aspect-[472/392] w-[42%]"
          />
          <h2 className="font-display mt-[4%] text-[clamp(2rem,6.4vw,3.9rem)]">
            {invitation.title}
          </h2>
          <div className="mx-auto mt-3 max-w-[34rem] space-y-0 font-mono text-[clamp(0.6rem,1.35vw,0.8rem)] leading-[1.45]">
            {invitation.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-4 font-mono text-[clamp(0.6rem,1.35vw,0.8rem)]">{invitation.signoff}</p>
          <p className="font-script mt-2 text-[clamp(1.9rem,5vw,3.2rem)] leading-tight">
            {couple.signature}
          </p>
        </motion.div>

        <svg
          aria-hidden
          viewBox="0 0 100 32"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 z-20 h-[calc(var(--w)*0.32)] w-full drop-shadow-[0_-6px_10px_rgba(60,45,20,0.18)]"
        >
          <path d="M0 0 L49 20 Q50 20.6 51 20 L100 0 L100 32 L0 32 Z" fill="#e8e1d1" />
          <path d="M0 32 L47 13.5 Q50 12 53 13.5 L100 32 Z" fill="#ede7d9" />
        </svg>
      </div>
    </section>
  );
}
