import Image from "next/image";
import Reveal from "@/app/components/Reveal";
import { couple, hero, images } from "@/app/data/content";

export default function Hero() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-olive">
      <Image
        src={images.hero}
        alt="Julia and Jerome waving from a wooden boat on Lake Como"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[66%_60%] md:object-[50%_60%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-olive/35 via-olive/10 to-olive/30" />

      <div className="relative flex h-full flex-col items-center px-4 pt-[22svh] text-center text-ivory md:pt-[24svh]">
        <Reveal y={16}>
          <p className="text-shadow-photo font-mono text-sm uppercase tracking-[0.18em] md:text-lg">
            {hero.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h1 className="text-shadow-photo font-script mt-3 whitespace-nowrap text-[clamp(3.4rem,11.5vw,10.5rem)] leading-[1.05]">
            {couple.first} <span className="-mx-[0.08em]">&amp;</span> {couple.second}
          </h1>
        </Reveal>

        <Reveal delay={0.35} className="mt-auto pb-10 md:pb-14">
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
