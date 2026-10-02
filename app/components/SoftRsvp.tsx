import Reveal from "@/app/components/Reveal";
import { BackdropPhoto } from "@/app/components/ui";
import { images, rsvp } from "@/app/data/content";

function Contact({ name, phone, align }: { name: string; phone: string; align: "left" | "right" }) {
  return (
    <div className={align === "right" ? "md:text-right" : "md:text-left"}>
      <p className="font-mono text-sm font-bold uppercase">{name}</p>
      <p className="mt-1 font-mono text-sm">
        Mobile:{" "}
        <a href={`tel:${phone.replace(/\D/g, "")}`} className="underline-offset-4 hover:underline">
          {phone}
        </a>
      </p>
    </div>
  );
}

export default function SoftRsvp() {
  const [julia, jerome] = rsvp.contacts;

  return (
    <section className="bg-sand text-[#2e2b10]">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-14 md:px-10 md:pt-20">
        <Reveal>
          <h2 className="relative mx-auto flex w-fit items-end text-olive">
            <span className="font-script relative z-10 -mr-3 text-[clamp(3rem,6.4vw,5rem)] leading-[0.7]">
              Soft
            </span>
            <span className="font-display text-[clamp(1.9rem,4.4vw,3.4rem)]">RSVPs due by {rsvp.dueBy}</span>
            <svg
              aria-hidden
              viewBox="0 0 300 20"
              className="absolute -bottom-3 right-0 w-[60%] text-olive"
              preserveAspectRatio="none"
            >
              <path d="M2 16 C 80 4, 200 2, 298 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </h2>
        </Reveal>

        <div className="mt-6 grid items-center gap-8 md:grid-cols-[1fr_minmax(0,33rem)_1fr] md:gap-4">
          <div className="order-2 text-center md:order-1">
            <Contact {...julia} align="right" />
          </div>
          <Reveal className="order-1 md:order-2">
            <BackdropPhoto
              src={images.rsvpPhoto}
              label="Julia and Jerome leaning on a boat railing on Lake Como"
              className="aspect-[533/400] w-full"
            />
          </Reveal>
          <div className="order-3 text-center">
            <Contact {...jerome} align="left" />
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-md text-center font-mono text-sm leading-relaxed">
          Follow us on @:{rsvp.instagram} {rsvp.followNote}
        </p>
      </div>
    </section>
  );
}
