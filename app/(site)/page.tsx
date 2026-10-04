import BackgroundMusic from "@/app/components/BackgroundMusic";
import Nav from "@/app/components/Nav";
import Hero from "@/app/components/Hero";
import Invitation from "@/app/components/Invitation";
import UntilIDo from "@/app/components/UntilIDo";
import WhyLakeComo from "@/app/components/WhyLakeComo";
import WelcomeParty from "@/app/components/WelcomeParty";
import Timeline from "@/app/components/Timeline";
import Transportation from "@/app/components/Transportation";
import DressCode from "@/app/components/DressCode";
import Accommodation from "@/app/components/Accommodation";
import ItalyMap from "@/app/components/ItalyMap";
import EuropeMap from "@/app/components/EuropeMap";
import Itinerary from "@/app/components/Itinerary";
import PresenceQuote from "@/app/components/PresenceQuote";
import Faq from "@/app/components/Faq";
import Rsvp from "@/app/components/Rsvp";
import SoftRsvp from "@/app/components/SoftRsvp";
import { dressCode } from "@/app/data/content";

export default function Home() {
  const [girls, guys] = dressCode;

  return (
    <>
      <Nav />
      <BackgroundMusic />
      <main>
        <Hero />
        <Invitation />
        <UntilIDo />
        <WhyLakeComo />
        <WelcomeParty />
        <Timeline />
        <Transportation />
        <DressCode data={girls} titleTone="ivory" />
        <DressCode data={guys} titleTone="cocoa" />
        <Accommodation />
        <ItalyMap />
        <EuropeMap />
        <Itinerary />
        <PresenceQuote />
        <Faq />
        <Rsvp />
        <SoftRsvp />
      </main>
    </>
  );
}
