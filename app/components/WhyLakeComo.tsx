import type { CSSProperties } from "react";
import Image from "next/image";
import Reveal from "@/app/components/Reveal";
import { whyComo } from "@/app/data/content";

/** Relative widths of the six strip photos, taken from the design. */
const STRIP_WIDTHS = [145, 190, 193, 190, 155, 152];

export default function WhyLakeComo() {
  return (
    <section className="bg-olive text-sand">
      <Reveal className="px-6 pb-10 pt-14 text-center md:pb-12 md:pt-16">
        <h2 className="text-section-xl-tall leading-[0.85]">
          <span className="font-script block">{whyComo.title[0]}</span>
          <span className="font-display mt-1 block">{whyComo.title[1]}</span>
        </h2>
        <div className="text-body-sm mx-auto mt-8 max-w-xl font-mono leading-relaxed md:text-body">
          {whyComo.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p className="font-bold">{whyComo.emphasis}</p>
        </div>
      </Reveal>

      <div className="overflow-hidden motion-reduce:overflow-x-auto">
        <div className="photo-marquee flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex motion-reduce:[&:nth-child(2)]:hidden" aria-hidden={copy === 1}>
              {whyComo.photos.map((photo, i) => (
                <div
                  key={`${copy}-${photo.src}`}
                  className="relative h-[clamp(220px,28vw,380px)] w-[46vw] flex-none md:w-[calc(var(--strip)*1vw)]"
                  style={{ "--strip": STRIP_WIDTHS[i] / 10.2 } as CSSProperties}
                >
                  <Image
                    src={photo.src}
                    alt={copy === 0 ? photo.alt : ""}
                    fill
                    sizes="(min-width: 768px) 18vw, 46vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
