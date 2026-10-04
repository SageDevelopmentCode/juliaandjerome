import Reveal from "@/app/components/Reveal";
import { InitialTitle, Tint } from "@/app/components/ui";
import { cn } from "@/lib/utils";
import { images, transport } from "@/app/data/content";

function Paperclip({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 64" className={className} aria-hidden>
      <path
        d="M8 20 V48 a5 5 0 0 0 10 0 V12 a7 7 0 0 0 -14 0 V50 a9 9 0 0 0 18 0 V22"
        fill="none"
        stroke="#8d8d8d"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TravelStamp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <path id="stamp-top" d="M18 50 a32 32 0 0 1 64 0" />
        <path id="stamp-bottom" d="M14 50 a36 36 0 0 0 72 0" />
      </defs>
      <g fill="none" stroke="#2b2b2b" opacity="0.85">
        <circle cx="50" cy="50" r="46" strokeWidth="2" strokeDasharray="2 2.4" />
        <circle cx="50" cy="50" r="40" strokeWidth="1.4" />
        <circle cx="50" cy="50" r="27" strokeWidth="1" />
      </g>
      <g fill="#2b2b2b" opacity="0.85" fontFamily="monospace" fontWeight="700" fontSize="8.5" letterSpacing="1.5">
        <text>
          <textPath href="#stamp-top" startOffset="50%" textAnchor="middle">
            ★ TIME TO ★
          </textPath>
        </text>
        <text>
          <textPath href="#stamp-bottom" startOffset="50%" textAnchor="middle">
            TRAVEL
          </textPath>
        </text>
        <path d="M30 54 L46 50 L56 36 L61 37 L55 50 L68 48 L73 42 L76 43 L73 52 L76 61 L73 62 L68 56 L55 54 L61 67 L56 68 L46 54 L30 52 Z" transform="rotate(-20 52 52)" />
      </g>
    </svg>
  );
}

function ItaliaStamp({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "stamp-edge bg-[#f3f0e6] drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]",
        className
      )}
    >
      <div className="relative flex h-full flex-col border border-[#7b7f86] bg-[#e7e6e1] px-1 pt-1 text-[#4f545c]">
        <div className="flex justify-between font-mono text-[9px] font-bold leading-none">
          <span>L.</span>
          <span>120</span>
        </div>
        <Tint src={images.villaSketch} className="mx-auto mt-1 aspect-[472/392] w-full flex-1" />
        <p className="font-display pb-1 text-center text-[11px] tracking-[0.3em]">Italia</p>
      </div>
    </div>
  );
}

function TipNote({
  text,
  stamp,
  className,
}: {
  text: string;
  stamp: "travel" | "italia";
  className?: string;
}) {
  return (
    <div className={cn("relative mx-auto mt-8 w-full max-w-[19rem]", className)}>
      <div className="relative bg-[#f6f3ec] px-6 pb-14 pt-12 shadow-[2px_6px_16px_-6px_rgba(60,40,20,0.45)]">
        <p className="font-hand text-hand-tip leading-[1.15] text-[#1f1d1a]">
          {text}
        </p>
      </div>
      <Paperclip className="absolute -top-5 left-5 h-16 w-6 rotate-[-4deg]" />
      {stamp === "travel" ? (
        <TravelStamp className="absolute -bottom-3 right-2 h-[5.5rem] w-[5.5rem] rotate-[8deg]" />
      ) : (
        <ItaliaStamp className="absolute -bottom-6 -right-8 h-[6.5rem] w-[5.5rem] rotate-[14deg]" />
      )}
    </div>
  );
}

export default function Transportation() {
  const { flights, shuttle } = transport;

  return (
    <section id="travel" className="scroll-mt-16 overflow-hidden bg-sand text-cocoa">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-14 md:px-12 md:pb-20 md:pt-20">
        <Reveal>
          <InitialTitle
            initial="T"
            rest="ransportation"
            className="text-section-transport"
            initialClassName="text-[2.1em]"
          />
        </Reveal>

        <div className="mt-12 grid gap-14 md:mt-14 md:grid-cols-2 md:gap-20">
          <Reveal>
            <h3 className="font-display text-display-md-wide text-center md:-translate-x-12">
              {flights.title}
            </h3>
            <div className="text-body mt-5 font-mono leading-relaxed md:pl-0">
              <p>{flights.route}</p>
              <ul className="ml-6 mt-1 list-disc space-y-1 md:max-w-[17rem]">
                {flights.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <TipNote text={flights.tip} stamp="travel" className="md:-rotate-[3deg] md:mx-0" />
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="font-display text-display-md-wide text-center">
              {shuttle.title}
            </h3>
            <ul className="text-body ml-6 mt-6 list-disc font-mono leading-relaxed md:max-w-[21rem]">
              <li>
                {shuttle.body.map((part) =>
                  part.bold ? <strong key={part.text}>{part.text}</strong> : part.text
                )}
              </li>
            </ul>
            <TipNote text={shuttle.tip} stamp="italia" className="md:rotate-[2deg] md:mx-0" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
