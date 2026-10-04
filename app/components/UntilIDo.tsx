import Countdown from "@/app/components/Countdown";
import Reveal from "@/app/components/Reveal";
import { images } from "@/app/data/content";

export default function UntilIDo() {
  return (
    <section className="border-b-[14px] border-sand bg-olive md:border-b-[22px]">
      <div className="relative h-[70svh] min-h-[380px] overflow-hidden md:h-auto md:aspect-[1024/430]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={images.video}
          poster={images.videoPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Super 8 film of Julia and Jerome"
        />
        <div className="absolute inset-0 bg-olive/15" />
        <Reveal className="absolute inset-x-0 top-[24%] flex flex-col items-center px-4 text-ivory">
          <h2 className="text-until text-shadow-photo flex items-baseline gap-[0.3em]">
            <span className="font-display">Until we say</span>
            <span className="font-script text-[1.35em]">“I do”</span>
          </h2>
          <Countdown className="mt-4 md:mt-6" />
        </Reveal>
      </div>
    </section>
  );
}
