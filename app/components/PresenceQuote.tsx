import Image from "next/image";
import Reveal from "@/app/components/Reveal";
import { images } from "@/app/data/content";

export default function PresenceQuote() {
  return (
    <section className="relative h-[90svh] min-h-[520px] overflow-hidden bg-olive md:h-auto md:aspect-[1024/520]">
      <Image
        src={images.presence}
        alt="Jerome leading Julia up a flight of stone stairs in Bellagio"
        fill
        sizes="100vw"
        className="object-cover object-[50%_45%]"
      />
      <div className="absolute inset-0 bg-black/15" />

      <Reveal className="absolute inset-x-0 top-[13%] text-center text-ivory">
        <p className="text-shadow-photo flex flex-col items-center leading-[0.82]">
          <span className="font-display text-[clamp(2.8rem,5.6vw,4.4rem)]">Your</span>
          <span className="font-script -mt-1 text-[clamp(2.6rem,5.2vw,4rem)]">Presence</span>
          <span className="font-display mt-2 text-[clamp(2.8rem,5.6vw,4.4rem)]">is</span>
          <span className="font-display text-[clamp(2.8rem,5.6vw,4.4rem)]">our</span>
          <span className="font-script -mt-1 text-[clamp(2.6rem,5.2vw,4rem)]">Present.</span>
        </p>
      </Reveal>
    </section>
  );
}
