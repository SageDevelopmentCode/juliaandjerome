import DestinationMap, { type MapLayout } from "@/app/components/DestinationMap";
import Reveal from "@/app/components/Reveal";
import { InitialTitle } from "@/app/components/ui";
import { images, italyDestinations } from "@/app/data/content";
import { italyPins } from "@/app/data/map-pins";

/** Positions in design units (the Canva page is 1024 wide). */
const layout: MapLayout = {
  width: 1024,
  height: 545,
  map: { x: 345, y: 110, w: 360, h: 420, src: images.italyMap, alt: "Map of Italy" },
  pins: italyPins,
  labels: [
    { key: "milan", side: "end", dot: { x: 244, y: 183 } },
    { key: "florence", side: "end", dot: { x: 378, y: 262 } },
    { key: "amalfi", side: "end", dot: { x: 462, y: 430 } },
    { key: "dolomites", side: "start", dot: { x: 645, y: 125 } },
    { key: "venice", side: "start", dot: { x: 622, y: 215 } },
    { key: "rome", side: "start", dot: { x: 722, y: 326 } },
  ],
  photos: [
    { key: "milan", index: 1, x: 122, y: 5, w: 103, h: 155 },
    { key: "milan", index: 0, x: 0, y: 70, w: 133, h: 173 },
    { key: "florence", index: 0, x: 32, y: 265, w: 153, h: 205 },
    { key: "florence", index: 1, x: 160, y: 301, w: 140, h: 204 },
    { key: "dolomites", index: 0, x: 780, y: 15, w: 82, h: 123 },
    { key: "dolomites", index: 1, x: 862, y: 2, w: 158, h: 196 },
    { key: "venice", index: 0, x: 730, y: 158, w: 120, h: 150 },
    { key: "rome", index: 0, x: 710, y: 368, w: 162, h: 130 },
    { key: "rome", index: 1, x: 872, y: 313, w: 125, h: 200 },
  ],
};

export default function ItalyMap() {
  return (
    <section className="overflow-hidden bg-olive pb-14 pt-12 text-ivory md:pb-12 md:pt-10">
      <Reveal>
        <DestinationMap
          layout={layout}
          destinations={italyDestinations}
          tone="light"
          title={
            <InitialTitle
              initial="M"
              rest="ore to see in Italy"
              className="text-section"
              initialClassName="text-[1.8em]"
            />
          }
        />
      </Reveal>
    </section>
  );
}
