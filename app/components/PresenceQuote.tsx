import Reveal from "@/app/components/Reveal";
import { InitialTitle } from "@/app/components/ui";
import { images } from "@/app/data/content";

export default function PresenceQuote() {
  return (
    <section className="relative h-[90svh] min-h-[520px] overflow-hidden bg-olive md:h-auto md:aspect-[1024/520]">
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        src={images.presenceVideo}
        poster={images.presencePoster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Julia and Jerome together"
      />
      <div className="absolute inset-0 bg-black/15" />

      <Reveal className="absolute inset-x-0 top-[13%] text-center text-ivory">
        <p className="text-shadow-photo flex flex-col items-center leading-[0.82]">
          <span className="font-display text-display-presence">Your</span>
          <InitialTitle
            as="span"
            initial="P"
            rest="resence"
            className="text-presence-word -mt-1"
          />
          <span className="font-display text-display-presence mt-2">is</span>
          <span className="font-display text-display-presence">our</span>
          <InitialTitle
            as="span"
            initial="P"
            rest="resent."
            className="text-presence-word -mt-1"
          />
        </p>
      </Reveal>
    </section>
  );
}
