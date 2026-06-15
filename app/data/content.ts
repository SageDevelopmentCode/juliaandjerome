/**
 * Centralized content for the wedding site.
 * Swap copy, dates, and image filenames here without touching components.
 * Items marked PLACEHOLDER still need real details.
 */

const img = (name: string) => `/assets/optimized/${name}.jpg`;

export const couple = {
  first: "Julia",
  second: "Jerome",
  combined: "Julia & Jerome",
  initials: "J & J",
  hashtag: "#JuliaAndJerome",
};

export const event = {
  /** ISO timestamp used by the countdown (Lake Como is CEST / UTC+2 in early October). */
  dateISO: "2027-10-05T16:00:00+02:00",
  dateLong: "Tuesday, October 5, 2027",
  dateShort: "October 5, 2027",
  // PLACEHOLDER: confirm the real soft-RSVP / poll deadline.
  rsvpBy: "January 31, 2027",
  venueName: "Relais Villa Vittoria",
  venueCity: "Lake Como, Italy",
  // PLACEHOLDER: add the full street address when confirmed.
  venueAddress: "Relais Villa Vittoria, Lake Como, Italy",
  mapQuery: "Relais Villa Vittoria Lake Como Italy",
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
    image: img("728A7576"),
    caption: "Where it all began",
  },
  {
    eyebrow: "chapter two",
    title: "Cheesecake Factory & Endless Conversations",
    body: [
      "Our first date was at Cheesecake Factory, and what was supposed to be a simple dinner quickly became the beginning of something special. From that day on, we never stopped talking. We spent countless hours together, learning about each other, sharing dreams, and becoming best friends.",
      "Some of our favorite memories are the simplest ones — staying up late talking for hours about everything and nothing, completely losing track of time. Long before we fell asleep beside each other, we were falling in love through endless conversations.",
    ],
    image: img("728A8058"),
    caption: "A love that grew",
  },
  {
    eyebrow: "chapter three",
    title: "The Surprise of a Lifetime",
    body: [
      "Years later, he planned a trip to Hawaii that would become one of the most unforgettable adventures of our lives. What I didn't know was that he had been carrying a secret the entire time. To make things even more memorable, our trip took an unexpected turn when we found ourselves going through a tsunami evacuation and taking shelter at a local middle school. After that, a proposal was the last thing on my mind.",
      "A few days later, we had what I thought was simply a private beach photoshoot at Tunnels Beach. As we stood together in one of the most beautiful places we'd ever seen, he suddenly got down on one knee and asked me to marry him. Completely surprised and overwhelmed with happiness, I said yes. It was the perfect beginning to our next chapter, and we can't wait to celebrate it with all of you.",
    ],
    image: img("728A8135"),
    caption: "Right after yes, Tunnels Beach",
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
];

export type ScheduleEvent = {
  date: string;
  day: string;
  title: string;
  time?: string;
  description: string;
};

export const schedule: ScheduleEvent[] = [
  {
    date: "October 4",
    day: "Monday",
    title: "Welcome Pizza Party",
    time: "7:30 PM",
    description:
      "Kick off the celebration with a relaxed evening of wood-fired pizza, wine, and a first hello to everyone who made the trip.",
  },
  {
    date: "October 5",
    day: "Tuesday",
    title: "Wedding Ceremony & Reception",
    description:
      "The main event. Join us as we say I do at Relais Villa Vittoria, followed by dinner, dancing, and celebrating into the night.",
  },
  {
    date: "October 6",
    day: "Wednesday",
    title: "Farewell Brunch",
    description:
      "Before you check out, gather with us one more time for a slow, sweet farewell brunch.",
  },
];

export type TransportOption = { title: string; body: string };

export const travel = {
  gettingThere:
    "The closest gateways are Milan Malpensa (MXP) and Milan Linate (LIN), both within easy reach of Lake Como. We recommend beginning your flight search in 2027 to find the best routes and fares.",
  // PLACEHOLDER: fill in shuttle / rental specifics as they are confirmed.
  transport: [
    {
      title: "Shuttle",
      body: "We plan to arrange group shuttles for key events. Details and pick-up times will be shared closer to the date.",
    },
    {
      title: "Car Rental",
      body: "Renting a car is a great option if you'd like to explore the lake at your own pace. We'll add a few rental recommendations soon.",
    },
    {
      title: "Taxi & Rideshare",
      body: "Taxis and rideshare are available in the area for getting around between towns and the venue.",
    },
  ] as TransportOption[],
  accommodation:
    "Relais Villa Vittoria has been reserved for the exclusive use of our guests. We warmly recommend everyone stay on-site so we can spend the whole weekend together, steps from every celebration.",
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
      "We recommend arriving October 1 or 2 to settle in and beat the jet lag.",
      "We'll be flying out October 1 and arriving October 2.",
    ],
  },
  {
    date: "October 3",
    day: "Sunday",
    title: "Milan",
    notes: ["Explore Milan, rest up, and get ready for the week ahead."],
  },
  {
    date: "October 4",
    day: "Monday",
    title: "Check Out of Milan & Welcome Dinner",
    notes: ["Transfer toward Lake Como.", "Welcome Pizza Party at 7:30 PM."],
  },
  {
    date: "October 5",
    day: "Tuesday",
    title: "The Wedding",
    notes: ["Ceremony and reception at Relais Villa Vittoria."],
  },
  {
    date: "October 6",
    day: "Wednesday",
    title: "Farewell & Check Out",
    notes: ["Farewell brunch, then check out of Relais Villa Vittoria."],
  },
];

export type LakeComoSpot = { name: string; blurb: string };

// PLACEHOLDER: swap in your real Lake Como recommendations.
export const lakeComo: LakeComoSpot[] = [
  {
    name: "Bellagio",
    blurb: "The 'Pearl of the Lake' — cobblestone streets, gardens, and views in every direction.",
  },
  {
    name: "Villa del Balbianello",
    blurb: "A cinematic lakeside villa with terraced gardens worth the boat ride.",
  },
  {
    name: "Lake Cruise",
    blurb: "Hop a ferry or private boat to take in the villas and villages from the water.",
  },
  {
    name: "Como Town",
    blurb: "Historic cathedral, silk boutiques, and lakeside cafés perfect for an afternoon.",
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
    body: "A valid passport is required for travel to Italy. Please make sure yours will not expire before December 2027 — if it's close, renew it now, as processing can take time.",
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
    a: "Yes. A valid passport is required to travel to Italy. Please confirm yours will not expire before December 2027. If it's expiring soon, renew it now since processing times vary.",
  },
  {
    q: "When should I book my flights?",
    a: "We recommend starting your flight search in 2027. Booking earlier generally means better routes and fares.",
  },
  {
    q: "Which airport should I fly into?",
    a: "The closest options are Milan Malpensa (MXP) and Milan Linate (LIN), both an easy transfer to Lake Como.",
  },
  {
    q: "Where should I stay?",
    a: "We've reserved Relais Villa Vittoria for the exclusive use of our guests and warmly recommend everyone stay on-site so we can enjoy the whole weekend together.",
  },
  {
    q: "How do I get around once I'm there?",
    a: "We plan to arrange shuttles for key events. Car rentals are great for exploring the lake on your own, and taxis and rideshare are also available. More details to come.",
  },
  {
    q: "What does the weekend look like?",
    a: "Welcome Pizza Party on Monday, October 4; the wedding ceremony and reception on Tuesday, October 5; and a farewell brunch on Wednesday, October 6 before check-out.",
  },
  {
    q: "Anything else I should do now?",
    a: "Three things: double-check your passport, start watching flights, and add the wedding weekend to your calendar so you don't miss any updates.",
  },
];

export const closing = {
  image: img("728A8618"),
  quote: "you're my favorite person to do everything with, for the rest of my life.",
};

export const nav = [
  { label: "Our Story", href: "#story" },
  { label: "Schedule", href: "#schedule" },
  { label: "Travel", href: "#travel" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
];
