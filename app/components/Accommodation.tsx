import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "@/app/components/Reveal";
import { InitialTitle, Tint } from "@/app/components/ui";
import { cn } from "@/lib/utils";
import { accommodation, event, images } from "@/app/data/content";

function DoorHanger({
  photo,
  photoAlt,
  className,
  children,
}: {
  photo: string;
  photoAlt: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex w-[17.5rem] flex-col items-center rounded-b-[1.25rem] rounded-t-[9rem] px-6 pb-8 pt-6 text-sand shadow-[0_22px_40px_-22px_rgba(30,20,5,0.7)]",
        className
      )}
    >
      <div className="relative aspect-square w-[11rem] overflow-hidden rounded-full">
        <Image src={photo} alt={photoAlt} fill sizes="176px" className="object-cover" />
      </div>
      <Tint src={images.villaSketch} className="mt-5 aspect-[472/392] w-[8.5rem]" />
      {children}
    </div>
  );
}

export default function Accommodation() {
  const { villa, included, early } = accommodation;

  return (
    <section className="overflow-hidden bg-sand text-cocoa">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[4.5rem_1fr_17rem] md:gap-6 md:px-10 md:py-20 lg:grid-cols-[5.5rem_1fr_19rem]">
        <Reveal className="md:flex md:h-full md:items-center md:justify-center">
          <InitialTitle
            initial="A"
            rest="ccommodation"
            className="text-[clamp(2.3rem,5vw,3.6rem)] md:-rotate-90 md:whitespace-nowrap"
            initialClassName="text-[2em]"
          />
        </Reveal>

        <Reveal className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-center sm:gap-0">
          <DoorHanger
            photo={images.villaFront}
            photoAlt="Relais Villa Vittoria from the garden"
            className="z-0 -rotate-3 bg-cocoa sm:mt-6"
          >
            <h3 className="font-display mt-4 text-center text-[2.1rem] leading-[0.9]">
              {villa.title[0]}
              <br />
              {villa.title[1]}
            </h3>
            <p className="mt-4 -rotate-3 text-center font-mono text-[0.95rem] leading-snug">{villa.body}</p>
            <p className="font-display mt-6 text-center text-base leading-tight">
              {villa.checkIn}
              <br />
              {villa.checkOut}
            </p>
          </DoorHanger>

          <DoorHanger
            photo={images.villaAerial}
            photoAlt="Aerial view of the villa and its lakeside pool"
            className="z-10 -rotate-3 bg-olive sm:-ml-6"
          >
            <h3 className="font-display mt-4 text-center text-[2.1rem] leading-[0.9]">
              {included.title[0]}
              <br />
              {included.title[1]}
            </h3>
            <ul className="mt-4 -rotate-3 list-disc self-start pl-6 font-mono text-[0.9rem] leading-snug">
              {included.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a
              href={event.venueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display mt-6 -rotate-3 text-center text-base leading-tight underline underline-offset-2 transition-opacity hover:opacity-70"
            >
              {included.linkLabel}
            </a>
          </DoorHanger>
        </Reveal>

        <Reveal delay={0.15} className="text-center">
          <h3 className="font-display text-[clamp(1.7rem,2.8vw,2.2rem)]">{early.title}</h3>
          <div className="mt-3 font-mono text-[0.78rem] leading-relaxed">
            {early.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="mt-2 font-bold">{early.emphasis}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
