import Image from "next/image";
import Reveal from "@/app/components/Reveal";
import { images, welcomeParty } from "@/app/data/content";

export default function WelcomeParty() {
  return (
    <section id="welcome-party" className="scroll-mt-16 bg-sand text-cocoa">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-[1.05fr_1fr] md:gap-12 md:px-14 md:py-20">
        <Reveal className="relative aspect-[435/390] w-full overflow-hidden">
          <Image
            src={images.welcomeParty}
            alt="Julia and Jerome dancing on a boat on Lake Como"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-script text-center text-[clamp(3.4rem,7vw,5.6rem)] leading-[0.82]">
            <span className="block -translate-x-[0.4em]">{welcomeParty.title[0]}</span>
            <span className="block translate-x-[0.3em]">{welcomeParty.title[1]}</span>
          </h2>

          <dl className="mt-10 space-y-7 md:mt-14">
            {welcomeParty.rows.map((row) => (
              <div key={row.label} className="grid grid-cols-[auto_1fr] items-center gap-6">
                <dt className="font-display min-w-[8.5rem] text-[clamp(2rem,3.6vw,2.7rem)]">
                  {row.label}
                </dt>
                <dd className="text-center font-mono text-[0.8rem] leading-relaxed md:text-[0.95rem]">
                  {row.value.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
