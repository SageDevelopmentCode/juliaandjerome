import Envelope from "@/app/components/Envelope";
import Nav from "@/app/components/Nav";
import Hero from "@/app/components/Hero";
import Story from "@/app/components/Story";
import Countdown from "@/app/components/Countdown";
import Schedule from "@/app/components/Schedule";
import Venue from "@/app/components/Venue";
import Travel from "@/app/components/Travel";
import Gallery from "@/app/components/Gallery";
import Details from "@/app/components/Details";
import Rsvp from "@/app/components/Rsvp";
import Faq from "@/app/components/Faq";
import Closing from "@/app/components/Closing";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Envelope />
      <Nav />
      <main>
        <Hero />
        <Story />
        <Countdown />
        <Schedule />
        <Venue />
        <Travel />
        <Gallery />
        <Details />
        <Rsvp />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
