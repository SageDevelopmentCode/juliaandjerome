import Reveal from "@/app/components/Reveal";
import { BackdropPhoto } from "@/app/components/ui";
import { images, itinerary } from "@/app/data/content";

export default function Itinerary() {
  return (
    <BackdropPhoto
      src={images.itineraryBg}
      position="50% 30%"
      className="relative overflow-hidden"
    >
      <section aria-labelledby="itinerary-title" className="relative px-0 pb-10 pt-[18vw] md:pb-14 md:pt-[14vw]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/25" />

        <div className="relative mx-auto max-w-[1440px]">
          <div className="flex items-end justify-between px-2 text-ivory">
            <p className="font-display text-shadow-photo text-[clamp(1rem,2.2vw,1.6rem)]">{itinerary.month}</p>
            <h2
              id="itinerary-title"
              className="font-display text-shadow-photo text-[clamp(2.2rem,4.6vw,3.6rem)]"
            >
              Itinerary
            </h2>
            <p className="font-display text-shadow-photo text-[clamp(1rem,2.2vw,1.6rem)]">{itinerary.year}</p>
          </div>

          <Reveal className="mt-2">
            {/* Desktop: calendar grid */}
            <div className="hidden grid-cols-7 border border-ivory/70 md:grid">
              {itinerary.days.map((d) => (
                <div
                  key={d.day}
                  className="border-r border-ivory/70 bg-black/15 py-2.5 text-center font-mono text-[0.72rem] uppercase tracking-[0.1em] text-ivory backdrop-blur-[2px] last:border-r-0"
                >
                  {d.day}
                </div>
              ))}
              {itinerary.days.map((d) => (
                <div
                  key={d.date}
                  className="min-h-[9.5rem] border-r border-t border-olive/60 bg-ivory px-3 py-3 font-mono text-[0.78rem] text-[#1f1d1a] last:border-r-0"
                >
                  <p className="font-bold">{d.date}</p>
                  <ul className="ml-4 mt-5 list-disc space-y-0.5 leading-snug">
                    {d.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Mobile: stacked days */}
            <ol className="mx-3 divide-y divide-olive/30 border border-ivory/70 bg-ivory md:hidden">
              {itinerary.days.map((d) => (
                <li key={d.date} className="grid grid-cols-[4.5rem_1fr] gap-3 px-4 py-3 font-mono text-[#1f1d1a]">
                  <div>
                    <p className="text-lg font-bold leading-none">{d.date}</p>
                    <p className="mt-1 text-[0.6rem] uppercase tracking-[0.08em]">{d.day}</p>
                  </div>
                  <ul className="list-disc pl-4 text-[0.78rem] leading-snug">
                    {d.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>
    </BackdropPhoto>
  );
}
