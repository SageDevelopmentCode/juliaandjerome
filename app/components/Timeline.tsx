import Reveal from "@/app/components/Reveal";
import { BackdropPhoto, InitialTitle } from "@/app/components/ui";
import { images, timeline } from "@/app/data/content";

export default function Timeline() {
  return (
    <section id="wedding" className="scroll-mt-16 bg-olive text-ivory">
      <Reveal className="px-4 py-7 md:py-9">
        <InitialTitle
          initial="W"
          rest="edding Day Timeline"
          className="text-section-sm"
        />
      </Reveal>

      <BackdropPhoto
        src={images.timelineBg}
        label="Julia and Jerome embracing in a narrow Lake Como street"
        position="55% 38%"
        className="h-[38svh] min-h-[240px] md:h-auto md:aspect-[1024/260]"
      />

      <div className="relative -mt-4 px-5 pb-10 md:-mt-[1.1rem] md:px-10 md:pb-9">
        {/* Desktop: dots joined by a line */}
        <ol className="mx-auto hidden max-w-5xl grid-cols-5 md:grid">
          {timeline.map((item, i) => (
            <li key={item.time} className="relative flex flex-col items-center text-center">
              {i < timeline.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-1/2 top-[1.05rem] h-[5px] w-full -translate-y-1/2 bg-ivory"
                />
              )}
              <span aria-hidden className="relative z-10 h-[2.1rem] w-[2.1rem] rounded-full bg-ivory" />
              <p className="font-display text-display-time mt-4">{item.time}</p>
              <p className="text-body-sm mt-2 max-w-[8.5rem] font-mono leading-snug">
                {item.label}
              </p>
            </li>
          ))}
        </ol>

        {/* Mobile: vertical timeline */}
        <ol className="relative mx-auto max-w-sm pt-10 md:hidden">
          <span aria-hidden className="absolute bottom-6 left-[0.85rem] top-12 w-[3px] bg-ivory" />
          {timeline.map((item) => (
            <li key={item.time} className="relative flex items-start gap-5 pb-7 last:pb-0">
              <span aria-hidden className="relative z-10 mt-1 h-7 w-7 flex-none rounded-full bg-ivory" />
              <div>
                <p className="font-display text-3xl">{item.time}</p>
                <p className="mt-1 font-mono text-xs">{item.label}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
