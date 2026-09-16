/**
 * Centralized content for the wedding site.
 * Swap copy, dates, and image filenames here without touching components.
 * Items marked PLACEHOLDER still need real details.
 */

const img = (name: string) => `/assets/optimized/${name}.jpg`;
const elopement = (id: string) => `/assets/optimized/elopement-${id}.jpg`;

export const couple = {
  first: "Julia",
  second: "Jerome",
  combined: "Julia & Jerome",
  initials: "J & J",
  hashtag: "#JuliaAndJerome",
};

export const event = {
  /** ISO timestamp used by the countdown (Lake Como is CEST / UTC+2 in early October). */
  dateISO: "2027-10-05T15:30:00+02:00",
  dateLong: "Tuesday, October 5, 2027",
  dateShort: "October 5, 2027",
  // PLACEHOLDER: confirm the real soft-RSVP / poll deadline.
  rsvpBy: "January 31, 2027",
  venueName: "Relais Villa Vittoria",
  venueCity: "Lake Como, Italy",
  venueAddress: "Via Vecchia Regina 62, Laglio, Lake Como 22010, Italy",
  mapQuery: "Relais Villa Vittoria Via Vecchia Regina 62 Laglio Lake Como Italy",
  airports: "Milan Malpensa (MXP) or Milan Linate (LIN)",
  // PLACEHOLDER: confirm contact email.
  contactEmail: "hello@juliaandjerome.com",
};

export const hero = {
  image: img("728A8239"),
  invite: "you're cordially invited to celebrate the story of",
};

export type StoryChapter = {
  eyebrow: string;
  title: string;
  body: string[];
  image: string;
  caption: string;
};

export const story: StoryChapter[] = [
  {
    eyebrow: "chapter one",
    title: "The Swipe That Started It All",
    body: [
      "Like many modern love stories, ours began with a swipe on a dating app. At the time, we were both navigating the challenges of pre-nursing school, focused on our futures and completely unaware that we were about to meet the person who would change everything.",
    ],
    image: elopement("7319"),
    caption: "Where it all began",
  },
  {
    eyebrow: "chapter two",
    title: "Cheesecake Factory & Endless Conversations",
    body: [
      "Our first date was at Cheesecake Factory, and what was supposed to be a simple dinner quickly became the beginning of something special. From that day on, we never stopped talking. We spent countless hours together, learning about each other, sharing dreams, and becoming best friends.",
      "Some of our favorite memories are the simplest ones — staying up late talking for hours about everything and nothing, completely losing track of time. Long before we fell asleep beside each other, we were falling in love through endless conversations.",
    ],
    image: elopement("7398"),
    caption: "A love that grew",
  },
  {
    eyebrow: "chapter three",
    title: "The Surprise of a Lifetime",
    body: [
      "Years later, he planned a trip to Hawaii that would become one of the most unforgettable adventures of our lives. What I didn't know was that he had been carrying a secret the entire time. To make things even more memorable, our trip took an unexpected turn when we found ourselves going through a tsunami evacuation and taking shelter at a local middle school. After that, a proposal was the last thing on my mind.",
      "A few days later, we had what I thought was simply a private beach photoshoot at Tunnels Beach. As we stood together in one of the most beautiful places we'd ever seen, he suddenly got down on one knee and asked me to marry him. Completely surprised and overwhelmed with happiness, I said yes. It was the perfect beginning to our next chapter, and we can't wait to celebrate it with all of you.",
    ],
    image: elopement("7371"),
    caption: "The beginning of forever",
  },
];

export type GalleryItem = { src: string; alt: string };

export const gallery: GalleryItem[] = [
  { src: img("728A7660"), alt: "Holding each other at golden hour" },
  { src: img("728A8001"), alt: "Walking along the shoreline" },
  { src: img("728A7711"), alt: "A quiet moment together" },
  { src: img("728A8068"), alt: "Laughing in the light" },
  { src: img("728A7803"), alt: "Side by side" },
  { src: img("728A8530"), alt: "Toward the sea" },
  { src: img("728A7863"), alt: "An embrace in the palms" },
  { src: img("728A8400"), alt: "Soft evening glow" },
  { src: img("728A7988"), alt: "Hand in hand" },
  { src: img("728A8740"), alt: "The two of us" },
  { src: img("728A7922"), alt: "A shared smile" },
  { src: img("728A8919"), alt: "As the sun goes down" },
  { src: elopement("7118"), alt: "Laughing as he carries her" },
  { src: elopement("7298"), alt: "A quiet moment in the trees" },
  { src: elopement("7330"), alt: "Garden light on lace and flowers" },
  { src: elopement("7343"), alt: "Playful and in love" },
  { src: elopement("7350"), alt: "Dinner for two" },
  { src: elopement("7366"), alt: "Lace parasol in the garden" },
  { src: elopement("7378"), alt: "Dressed for the day" },
  { src: elopement("7323"), alt: "Together among the roses" },
];

export const welcomeDinner = {
  date: "Monday, October 4, 2027",
  time: "7:30 PM",
  venueName: "Relais Villa Vittoria",
  address: "Via Vecchia Regina 62, Laglio, Lake Como 22010, Italy",
  mapQuery: "Relais Villa Vittoria Via Vecchia Regina 62 Laglio Lake Como Italy",
  lat: 45.8768,
  lng: 9.1334,
  intro:
    "Come join us the day before for a relaxed dinner by the pool with pizza and sorbet — a casual first hello to everyone who made the trip.",
};

export type WeddingDayEvent = {
  title: string;
  time: string;
  description: string;
};

export const weddingDay = {
  venueName: "Relais Villa Vittoria",
  venueNote:
    "All wedding celebrations take place at our lakeside villa in Laglio, on the shores of Lake Como.",
  events: [
    {
      title: "Ceremony",
      time: "3:30 PM",
      description: "We say I do overlooking the lake.",
    },
    {
      title: "Reception",
      time: "~5:45 PM",
      description: "Dinner, toasts, and dancing begin as the afternoon turns to evening.",
    },
    {
      title: "Celebration Ends",
      time: "12:00 AM",
      description: "A full night of celebrating together under the Italian sky.",
    },
    {
      title: "Farewell Breakfast",
      time: "The following morning",
      description: "One last slow morning together before everyone heads home.",
    },
    {
      title: "Check Out",
      time: "11:30 AM",
      description: "Check out of Relais Villa Vittoria.",
    },
  ] as WeddingDayEvent[],
};

export const travel = {
  flights:
    "Guests are best served flying into Milan Malpensa (MXP) or Milan Linate (LIN). We recommend starting to look at flights in January or February 2027 to find the best routes and fares.",
  milanHotel: {
    name: "Holiday Inn Milan",
    body:
      "For your nights in Milan, we recommend the Holiday Inn — just a few minutes from the airport, with complimentary breakfast and a shuttle for about $5 per day.",
  },
  transportation:
    "A shuttle will be provided from Milan to Lake Como by us — about a 30-minute ride to Relais Villa Vittoria. Pick-up details will be shared closer to the date.",
  accommodation:
    "Relais Villa Vittoria has been reserved for the exclusive use of our guests. We warmly recommend everyone stay on-site so we can spend the whole weekend together, steps from every celebration.",
  disclaimer:
    "More details of the itinerary will be available closer to the wedding day.",
};

export type ItineraryDay = {
  date: string;
  day: string;
  title: string;
  notes: string[];
};

export const itinerary: ItineraryDay[] = [
  {
    date: "October 1–2",
    day: "Friday–Saturday",
    title: "Travel & Arrival in Milan",
    notes: [
      "We recommend arriving in Milan on October 1 or 2 to settle in and beat the jet lag.",
      "We'll be flying out on Friday, October 1 and arriving Saturday, October 2.",
    ],
  },
  {
    date: "October 3",
    day: "Sunday",
    title: "Milan",
    notes: ["Explore the city, rest up, and get ready for the week ahead."],
  },
  {
    date: "October 4",
    day: "Monday",
    title: "Check Out of Milan & Welcome Dinner",
    notes: [
      "Check out of your Milan hotel and transfer to Lake Como.",
      "Welcome Dinner at 7:30 PM — pizza and sorbet by the pool.",
    ],
  },
  {
    date: "October 5",
    day: "Tuesday",
    title: "The Wedding",
    notes: [
      "Ceremony at 3:30 PM, reception at ~5:45 PM, celebrating until midnight.",
    ],
  },
  {
    date: "October 6",
    day: "Wednesday",
    title: "Farewell & Check Out",
    notes: [
      "Farewell breakfast in the morning, then check out of Relais Villa Vittoria by 11:30 AM.",
    ],
  },
];

export type LakeComoSpot = {
  name: string;
  area: string;
  blurb: string;
  lat: number;
  lng: number;
  image: string | null;
};

export const lakeComo: LakeComoSpot[] = [
  {
    name: "Bellagio",
    area: "Central Lake",
    blurb:
      "The 'Pearl of the Lake' — cobblestone streets, gardens, and views in every direction.",
    lat: 45.9876,
    lng: 9.2612,
    image: null,
  },
  {
    name: "Villa del Balbianello",
    area: "Lenno",
    blurb:
      "A cinematic lakeside villa with terraced gardens worth the boat ride.",
    lat: 45.9613,
    lng: 9.2027,
    image: null,
  },
  {
    name: "Lake Cruise",
    area: "Lake Como",
    blurb:
      "Hop a ferry or private boat to take in the villas and villages from the water.",
    lat: 45.9411,
    lng: 9.2567,
    image: null,
  },
  {
    name: "Como Town",
    area: "Como",
    blurb:
      "Historic cathedral, silk boutiques, and lakeside cafés perfect for an afternoon.",
    lat: 45.8081,
    lng: 9.0852,
    image: null,
  },
  {
    name: "Varenna",
    area: "Eastern Shore",
    blurb:
      "A charming village with a lakeside promenade and the Villa Monastero gardens.",
    lat: 46.0103,
    lng: 9.2837,
    image: null,
  },
  {
    name: "Menaggio",
    area: "Western Shore",
    blurb:
      "A relaxed town with a lively piazza and easy ferry connections across the lake.",
    lat: 46.0206,
    lng: 9.2401,
    image: null,
  },
];

export type DestinationRegion = {
  region: string;
  cities: string[];
};

export const nearbyDestinations: DestinationRegion[] = [
  {
    region: "Northern Italy",
    cities: ["Milan", "Venice", "Dolomites"],
  },
  {
    region: "Southern Italy",
    cities: ["Rome", "Positano", "Amalfi Coast", "Capri"],
  },
  {
    region: "Switzerland",
    cities: ["Lugano", "Zurich", "Lucerne"],
  },
  {
    region: "Austria",
    cities: ["Innsbruck", "Salzburg", "Vienna"],
  },
  {
    region: "Germany",
    cities: ["Munich", "Lake Constance", "Black Forest"],
  },
];

export type DetailCard = {
  title: string;
  blurb: string;
  body: string;
};

export const details: DetailCard[] = [
  {
    title: "Travel Documents",
    blurb: "Check your passport early.",
    body: "A valid passport is required for travel to Italy. Please make sure yours will not expire before January 2028 — and that it remains valid for at least 3 months beyond the date you plan to leave Italy. If it's close, renew it now, as processing can take time.",
  },
  {
    title: "Dress Code",
    blurb: "To be announced.",
    body: "Details on attire are coming soon. Expect an elegant celebration suited to a lakeside Italian villa in early autumn.",
  },
  {
    title: "Registry",
    blurb: "Your presence is the gift.",
    body: "Having you travel to celebrate with us means everything. For those who have asked, registry details will be shared closer to the date.",
  },
  {
    title: "Weather & Packing",
    blurb: "Early autumn on the lake.",
    body: "October in Lake Como is typically mild and crisp, cooler in the evenings. Pack a few layers and comfortable shoes for cobblestone streets.",
  },
];

export type FaqItem = { q: string; a: string };

export const faq: FaqItem[] = [
  {
    q: "When should I let you know if I'm coming?",
    a: "Because this is a destination wedding, we're collecting a soft, early RSVP to help everyone plan. Please share your initial response as soon as you can — ideally by January 31, 2027 — and a formal invitation will follow.",
  },
  {
    q: "Do I need a passport?",
    a: "Yes. A valid passport is required to travel to Italy. Please confirm yours will not expire before January 2028 and remains valid for at least 3 months after your departure from Italy. If it's expiring soon, renew it now since processing times vary.",
  },
  {
    q: "When should I book my flights?",
    a: "We recommend starting your flight search in January or February 2027. Booking earlier generally means better routes and fares.",
  },
  {
    q: "Which airport should I fly into?",
    a: "The closest options are Milan Malpensa (MXP) and Milan Linate (LIN). We'll provide a shuttle from Milan to Lake Como — about a 30-minute ride.",
  },
  {
    q: "Where should I stay?",
    a: "We've reserved Relais Villa Vittoria for the exclusive use of our guests and warmly recommend everyone stay on-site. For your nights in Milan before the wedding, we suggest the Holiday Inn near the airport.",
  },
  {
    q: "How do I get from Milan to Lake Como?",
    a: "We'll provide a shuttle from Milan to Relais Villa Vittoria — about 30 minutes. Pick-up details will be shared closer to the date.",
  },
  {
    q: "What does the weekend look like?",
    a: "Welcome Dinner on Monday, October 4 at 7:30 PM; the wedding ceremony at 3:30 PM and reception at ~5:45 PM on Tuesday, October 5; farewell breakfast and check-out by 11:30 AM on Wednesday, October 6.",
  },
  {
    q: "Anything else I should do now?",
    a: "Three things: double-check your passport, start watching flights in early 2027, and add the wedding weekend to your calendar so you don't miss any updates.",
  },
];

export const closing = {
  image: elopement("7401"),
  quote: "you're my favorite person to do everything with, for the rest of my life.",
};

export const nav = [
  { label: "Story", href: "#story" },
  { label: "Welcome", href: "#welcome-dinner" },
  { label: "Wedding", href: "#wedding-day" },
  { label: "Travel", href: "#travel" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
];
