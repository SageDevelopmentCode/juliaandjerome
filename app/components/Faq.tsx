import Reveal from "@/app/components/Reveal";
import { faq, type FaqItem } from "@/app/data/content";

function Item({ item }: { item: FaqItem }) {
  return (
    <div className="text-center">
      <h3 className="font-mono text-[1.15rem] font-medium leading-tight md:text-[1.35rem]">{item.q}</h3>
      <p className="mt-2 font-mono text-[0.78rem] leading-relaxed md:text-[0.82rem]">{item.a}</p>
    </div>
  );
}

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-16 bg-sand text-cocoa">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 md:px-12 md:pt-20">
        <Reveal>
          <h2 className="font-display mx-auto w-fit border-b-[3px] border-cocoa pb-0.5 text-[clamp(3rem,5.8vw,4.4rem)] leading-[0.85]">
            FAQs
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 md:mt-14 md:grid-cols-2 md:gap-14">
          <div className="space-y-10 md:space-y-9">
            {faq.left.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.05}>
                <Item item={item} />
              </Reveal>
            ))}
          </div>
          <div className="space-y-10 md:space-y-16 md:pt-5">
            {faq.right.map((item, i) => (
              <Reveal key={item.q} delay={0.1 + i * 0.05}>
                <Item item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
