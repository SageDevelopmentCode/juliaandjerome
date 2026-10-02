import Image from "next/image";
import Reveal from "@/app/components/Reveal";
import { whyComo } from "@/app/data/content";

/** Relative widths of the six strip photos, taken from the design. */
const STRIP_WIDTHS = [145, 190, 193, 190, 155, 152];

export default function WhyLakeComo() {
  return (
    <section className="bg-olive text-sand">
      <Reveal className="px-6 pb-10 pt-14 text-center md:pb-12 md:pt-16">
        <h2 className="font-script text-[clamp(3.6rem,8.5vw,6.5rem)] leading-[0.85]">
          <span className="block pl-[0.6em]">{whyComo.title[0]}</span>
          <span className="block">{whyComo.title[1]}</span>
        </h2>
        <div className="mx-auto mt-8 max-w-xl font-mono text-[0.78rem] leading-relaxed md:text-sm">
          {whyComo.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p className="font-bold">{whyComo.emphasis}</p>
        </div>
      </Reveal>

      <div className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto md:overflow-visible">
        {whyComo.photos.map((photo, i) => (
          <div
            key={photo.src}
            className="relative aspect-[3/4] w-[46vw] flex-none snap-start md:aspect-auto md:h-[clamp(220px,26vw,380px)] md:w-auto md:flex-1"
            style={{ flexGrow: STRIP_WIDTHS[i] }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 18vw, 46vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
