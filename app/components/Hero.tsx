import Reveal from "@/app/components/Reveal";
import { ScriptInitialWord } from "@/app/components/ui";
import { couple, hero, images } from "@/app/data/content";

export default function Hero() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-black">
      <video
        className="pointer-events-none absolute top-1/2 left-1/2 h-full w-[177.78svh] min-w-full max-w-none -translate-x-1/2 -translate-y-1/2 object-cover object-center"
        src={images.heroVideo}
        poster={images.heroPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Julia and Jerome waving from a wooden boat on Lake Como"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-olive/25 via-olive/5 to-olive/20" />

      <div className="relative flex h-full flex-col items-center text-center text-ivory">
        <div className="flex flex-1 flex-col items-center justify-center px-4 sm:pt-[22svh] md:pt-[24svh] sm:justify-start">
          <Reveal y={16}>
            <p className="text-shadow-photo font-mono text-sm uppercase tracking-[0.18em] md:text-lg">
              {hero.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.15} className="flex w-full flex-col items-center">
            <h1
              className="text-hero text-shadow-photo mt-3 flex max-w-[min(100%,42rem)] max-sm:translate-x-0 translate-x-[clamp(0.35rem,2.5vw,1.25rem)] flex-nowrap items-center justify-center gap-x-[clamp(0.75rem,4vw,4.5rem)] max-sm:gap-x-[clamp(0.5rem,3vw,2rem)] leading-[1.05] max-sm:text-[clamp(2.35rem,8.5vw,2.9rem)]"
            >
            <span className="shrink-0 whitespace-nowrap">
              <ScriptInitialWord
                word={couple.first}
                variant="name"
                initialClassName="-mr-[0.06em] overflow-visible pl-[0.08em]"
              />
            </span>
            <span className="font-display shrink-0 text-[0.38em] leading-none">+</span>
            <span className="shrink-0 whitespace-nowrap">
              <ScriptInitialWord
                word={couple.second}
                variant="name"
                initialClassName="-mr-[0.06em] overflow-visible pl-[0.08em]"
              />
            </span>
          </h1>
          <a
            href="#rsvp"
            className="text-shadow-photo mt-8 inline-block border border-ivory/80 px-8 py-3 font-mono text-xs uppercase tracking-[0.28em] text-ivory transition-colors hover:bg-ivory hover:text-olive"
          >
            RSVP
          </a>
          </Reveal>
        </div>

        <Reveal delay={0.35} className="pb-10 md:pb-14">
          <p className="text-shadow-photo font-mono text-xs uppercase tracking-[0.08em] md:text-sm">
            {hero.date.month}
            <sup className="text-[0.6em]">{hero.date.suffix}</sup>
            {hero.date.year}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
