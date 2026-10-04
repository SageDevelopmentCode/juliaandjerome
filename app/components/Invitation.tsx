"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_SOFT } from "@/lib/utils";
import { couple, images, invitation } from "@/app/data/content";
import { ScriptInitialWord, Tint } from "@/app/components/ui";

export default function Invitation() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden bg-olive pt-[36vw] md:pt-52">
      <Image
        src={images.inviteBg}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[50%_40%]"
      />

      {/* --w drives every envelope measurement so the pocket always lines up with the card */}
      <div
        className="relative mx-auto w-[var(--w)] pb-[calc(var(--w)*0.06)] [perspective:1400px] md:pb-0"
        style={{ "--w": "min(94vw, 820px)" } as CSSProperties}
      >
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 top-[calc(var(--w)*0.28)] bg-[#e4ddcc]"
        />

        <motion.div
          initial={reduce ? false : { y: "42%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1, margin: "15% 0px 15% 0px" }}
          transition={{ duration: 1.1, ease: EASE_SOFT }}
          className="relative z-10 mx-[12%] mt-[calc(var(--w)*0.1)] bg-ivory px-[7%] pb-[calc(var(--w)*0.22)] pt-[calc(var(--w)*0.03)] text-center text-cocoa shadow-[0_10px_40px_-12px_rgba(40,30,10,0.35)]"
        >
          <Tint
            src={images.villaSketch}
            label="Sketch of Relais Villa Vittoria"
            className="mx-auto aspect-[472/392] w-[42%]"
          />
          <h2 className="font-display text-invite-title mt-[4%]">{invitation.title}</h2>
          <div className="text-invite-body mx-auto mt-3 max-w-[34rem] space-y-0 font-mono leading-[1.45]">
            {invitation.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="text-invite-body mt-4 font-mono">{invitation.signoff}</p>
          <p className="text-script-signature mt-2 flex flex-wrap items-end justify-center gap-x-[0.35em] leading-tight">
            <ScriptInitialWord word={couple.first} variant="name" />
            <span className="font-display normal-case italic leading-none">and</span>
            <ScriptInitialWord word={couple.second} variant="name" />
          </p>
        </motion.div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[12%] top-[calc(var(--w)*0.1)] z-[5] h-[calc(var(--w)*0.1)] -translate-y-full md:hidden"
        >
          <svg
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
            className="h-full w-full drop-shadow-[0_4px_10px_rgba(40,30,10,0.15)]"
          >
            <polygon points="0,20 50,0 100,20" fill="#efe8d8" />
          </svg>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden h-[calc(var(--w)*0.3)] origin-bottom [transform:rotateX(-160deg)] md:block"
        >
          <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-full w-full drop-shadow-[0_8px_14px_rgba(40,30,10,0.18)]">
            <polygon points="0,30 50,0 100,30" fill="#efe8d8" />
          </svg>
        </div>

        <svg
          aria-hidden
          viewBox="0 0 100 18"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[calc(var(--w)*0.16)] w-full"
        >
          <path d="M0 0 L48 11 Q50 11.6 52 11 L100 0 L100 18 L0 18 Z" fill="#e8e1d1" />
          <path d="M0 18 L46 8 Q50 6.6 54 8 L100 18 Z" fill="#ede7d9" />
        </svg>
      </div>
    </section>
  );
}
