import Image from "next/image";
import Reveal from "@/app/components/Reveal";
import { InitialTitle } from "@/app/components/ui";
import { cn } from "@/lib/utils";
import type { DressCard, DressCode as DressCodeData, Outfit } from "@/app/data/content";

function Swatches({ colors }: { colors: string[] }) {
  return (
    <div className="flex justify-center" aria-label={`Palette: ${colors.join(", ")}`}>
      {colors.map((color, i) => (
        <span
          key={color}
          className={cn(
            "h-14 w-14 rounded-full md:h-16 md:w-16",
            i > 0 && "-ml-4",
            color === "#ffffff" && "ring-1 ring-black/5"
          )}
          style={{ backgroundColor: color, zIndex: i }}
        />
      ))}
    </div>
  );
}

function Card({ card, label }: { card: DressCard; label: string }) {
  return (
    <div className="flex w-full max-w-[20rem] flex-col items-center rounded-[3.25rem] bg-sand px-6 pb-8 pt-8 text-cocoa shadow-[0_18px_40px_-20px_rgba(0,0,0,0.5)] md:max-w-none">
      <h3 className="font-display text-display-card">{card.title}</h3>
      <div className="mt-3">
        <Swatches colors={card.swatches} />
      </div>
      <Outfits outfits={card.outfits} label={`${label} outfit inspiration for the ${card.title.toLowerCase()}`} />
    </div>
  );
}

/**
 * Every row is the same height in every card. Each figure gets an equal slot and is centered in it
 * at full height, so wider figures spill slightly over their neighbors instead of shrinking.
 */
function Outfits({ outfits, label }: { outfits: Outfit[]; label: string }) {
  return (
    <div role="img" aria-label={label} className="mt-5 flex h-[9.5rem] w-full md:h-[10.5rem]">
      {outfits.map((o, i) => (
        <div key={o.src} className="relative flex min-w-0 flex-1 justify-center" style={{ zIndex: i }}>
          <Image
            src={o.src}
            alt=""
            width={o.w}
            height={o.h}
            className="h-full w-auto max-w-none drop-shadow-[2px_0_3px_rgba(40,30,10,0.18)]"
          />
        </div>
      ))}
    </div>
  );
}

export default function DressCode({ data, titleTone }: { data: DressCodeData; titleTone: "ivory" | "cocoa" }) {
  return (
    <section id={data.id} className="relative overflow-hidden bg-olive">
      <Image src={data.background} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative mx-auto max-w-6xl px-5 py-10 md:px-6 md:py-16">
        <Reveal
          className={cn(
            "text-center md:absolute md:inset-x-0 md:top-10",
            titleTone === "ivory" ? "text-ivory" : "text-cocoa"
          )}
        >
          <InitialTitle
            as="h2"
            initial="D"
            rest="ress Code"
            className="text-section-xl-dress leading-[0.9]"
          />
          <p className="-mt-1 font-mono text-sm uppercase tracking-[0.05em] md:text-base">{data.label}</p>
        </Reveal>

        <div className="mt-8 flex flex-col items-center gap-6 md:mt-24 md:flex-row md:items-start md:justify-between md:gap-0">
          {data.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1} className="flex w-full justify-center md:w-[30%]">
              <Card card={card} label={data.label} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
