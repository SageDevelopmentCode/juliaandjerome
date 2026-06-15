import Image from "next/image";
import { couple, event } from "@/app/data/content";

export default function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-forest-deep py-20 text-center text-cream">
      <div className="relative mx-auto max-w-xl px-6">
        <Image
          src="/assets/Logo.png"
          alt={`${couple.combined} monogram`}
          width={120}
          height={120}
          className="mx-auto h-16 w-16 invert"
        />
        <h2 className="font-heading mt-6 text-5xl text-cream md:text-6xl">
          {couple.combined}
        </h2>
        <p className="font-serif mt-4 text-xs uppercase tracking-[0.35em] text-cream/60">
          {event.dateShort} &middot; {event.venueCity}
        </p>
        <p className="font-serif mt-2 text-xs uppercase tracking-[0.3em] text-cream/40">
          {couple.hashtag}
        </p>

        <div className="mx-auto mt-10 h-px w-16 bg-cream/20" />
        <p className="mt-6 text-xs text-cream/40">
          Made with love for our favorite people.
        </p>
      </div>
    </footer>
  );
}
