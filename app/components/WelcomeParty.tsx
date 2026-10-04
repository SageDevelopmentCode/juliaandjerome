import Image from "next/image";
import Reveal from "@/app/components/Reveal";
import { InitialTitle } from "@/app/components/ui";
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
          <h2 className="text-section-xl text-center leading-[0.82]">
            <InitialTitle
              as="span"
              initial={welcomeParty.title[0][0]}
              rest={welcomeParty.title[0].slice(1)}
              className="block -translate-x-[0.4em] justify-center"
            />
            <InitialTitle
              as="span"
              initial={welcomeParty.title[1][0]}
              rest={welcomeParty.title[1].slice(1)}
              className="block translate-x-[0.3em] justify-center"
            />
          </h2>

          <dl className="mt-10 space-y-7 md:mt-14">
            {welcomeParty.rows.map((row) => (
              <div key={row.label} className="grid grid-cols-[auto_1fr] items-center gap-6">
                <dt className="font-display text-display-md min-w-[8.5rem]">
                  {row.label}
                </dt>
                <dd className="text-body-sm text-center font-mono leading-relaxed md:text-body">
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
