/**
 * Centralized content for the wedding site.
 * Swap copy, dates, and image filenames here without touching components.
 * Items marked CONFIRM follow the wedding on Tuesday, October 5, 2027 and still need a final check.
 * Items marked PLACEHOLDER point at images that haven't been added yet; drop the file into
 * source-assets/v2, run `npm run assets`, or save it straight to public/assets/web/ with that name.
 */

const web = (name: string) => `/assets/web/${name}`;

export const couple = {
  first: "Julia",
  second: "Jerome",
  combined: "Julia & Jerome",
  signature: "Julia and Jerome",
};

export const event = {
  /** Lake Como is CEST (UTC+2) in early October. */
  dateISO: "2027-10-05T15:00:00+02:00",
  dateLong: "Tuesday, October 5, 2027",
  venueName: "Relais Villa Vittoria",
  venueCity: "Laglio, Lake Como, Italy",
  // CONFIRM: swap for the villa's own site if you'd rather link there.
  venueUrl: "https://www.google.com/search?q=Relais+Villa+Vittoria+Laglio+Lake+Como",
};

export const images = {
  monogram: web("monogram.png"),
  villaSketch: web("villa-sketch.svg"),
  hero: web("hero-boat.jpg"),
  inviteBg: web("invite-lake.jpg"),
  video: web("super8.mp4"),
  videoPoster: web("super8-poster.jpg"),
  presenceVideo: web("presence.mp4"),
  presencePoster: web("presence-poster.jpg"),
  welcomeParty: web("welcome-party.jpg"),
  timelineBg: web("timeline-bg.jpg"),
  dressGirlsBg: web("dress-girls-bg.jpg"),
  dressGuysBg: web("dress-guys-bg.jpg"),
  villaFront: web("villa-front.jpg"),
  villaAerial: web("villa-aerial.jpg"),
  italyMap: web("map-italy.svg"),
  europeMap: web("map-europe.svg"),
  itineraryBg: web("itinerary-bg.jpg"),
  presence: web("presence-stairs.jpg"),
  rsvpPhoto: web("rsvp-boat.jpg"),
};

export const nav = {
  left: [
    { label: "Welcome Party", href: "#welcome-party" },
    { label: "Wedding", href: "#wedding" },
  ],
  right: [
    { label: "Travel", href: "#travel" },
    { label: "RSVP", href: "#rsvp" },
    { label: "FAQ", href: "#faq" },
  ],
};

export const hero = {
  eyebrow: "The wedding of",
  date: { month: "October the 5", suffix: "th", year: ", 2027" },
};

export const invitation = {
  title: "You are invited",
  body: [
    "We know that joining us for our wedding is more than simply marking a date in the calendar. It means making the journey, taking time away, and arranging your plans around the celebration.",
    "We’ve created this space to share the details you’ll need as the date approaches, from the venue and RSVP to the schedule and travel information.",
    "More than anything, we look forward to bringing together the people who mean the most to us.",
  ],
  signoff: "With love,",
};

export const whyComo = {
  title: ["Why", "Lake Como?"],
  body: [
    "Last August, we spent some time in Lake Como.",
    "These are a few photographs from that trip, and what made us want to return.",
  ],
  emphasis: "This time, with all of you.",
  photos: [
    { src: web("como-strip-1.jpg"), alt: "Julia looking out over the lake from a terrace" },
    { src: web("como-strip-2.jpg"), alt: "Pasta and spritzes at a lakeside lunch" },
    { src: web("como-strip-3.jpg"), alt: "Julia and Jerome by the water" },
    { src: web("como-strip-4.jpg"), alt: "Breakfast overlooking Varenna" },
    { src: web("como-strip-5.jpg"), alt: "Walking the narrow streets of a lakeside village" },
    { src: web("como-strip-6.jpg"), alt: "Jerome by an infinity pool above the lake" },
  ],
};

export const welcomeParty = {
  title: ["Welcome", "Party"],
  rows: [
    { label: "Date:", value: ["Monday October 4, 2027", "at 7:30PM"] },
    { label: "Location:", value: ["Relais Villa Vittoria,", "Laglio, Lake Como, Italy"] },
    { label: "Theme:", value: ["A relaxed dinner by the pool with pizza and gelato"] },
  ],
};

export type TimelineItem = { time: string; label: string };

export const timeline: TimelineItem[] = [
  { time: "3:00PM", label: "Ceremony and “I do’s”" },
  { time: "4:00PM", label: "Cocktail Hour" },
  { time: "5:45PM", label: "Reception Dinner and Dancing in an underground cave!" },
  { time: "12:00AM", label: "Celebration ends." },
  { time: "~9:00AM", label: "Farewell Breakfast together." },
];

export const transport = {
  flights: {
    title: "Flights",
    route: "LAX to MXP (Milan)",
    bullets: [
      "Most flights to MXP require a stopover.",
      "Recommended to start looking and book flights as early as November!",
    ],
    tip: "TIP: We recommend Lufthansa Airlines. Our stopover was in Frankfurt, Germany for 2 hours and food and experience was amazing!",
  },
  shuttle: {
    title: "Shuttle",
    body: [
      { text: "A shuttle will be provided from Milan to Lake Como " },
      { text: "by us", bold: true },
      { text: " — about a 30-minute ride to Relais Villa Vittoria on " },
      { text: "October 4", bold: true },
      { text: ". Pick-up details will be shared closer to the date." },
    ],
    tip: "TIP: One thing no one warned us on how difficult transportation is to get in or around Lake Como. So keep that in mind when planning!",
  },
};

/** Outfit cutout with its pixel size, so a row of them can share one height. */
export type Outfit = { src: string; w: number; h: number };

const outfit = (name: string, w: number): Outfit => ({ src: web(`${name}.webp`), w, h: 640 });

export type DressCard = {
  title: string;
  swatches: string[];
  outfits: Outfit[];
};

export type DressCode = {
  id: string;
  label: string;
  background: string;
  cards: [DressCard, DressCard];
};

export const dressCode: DressCode[] = [
  {
    id: "dress-code-girls",
    label: "Girls",
    background: images.dressGirlsBg,
    cards: [
      {
        title: "Welcome Party",
        swatches: ["#f2413a", "#c1121f", "#f9d55b"],
        outfits: [
          outfit("attire-girls-welcome-1", 236),
          outfit("attire-girls-welcome-2", 229),
          outfit("attire-girls-welcome-3", 182),
          outfit("attire-girls-welcome-4", 194),
          outfit("attire-girls-welcome-5", 227),
          outfit("attire-girls-welcome-6", 267),
          outfit("attire-girls-welcome-7", 248),
        ],
      },
      {
        title: "Wedding Day",
        swatches: ["#f1e791", "#98b3e6", "#f6b8c6", "#8e9e66"],
        outfits: [
          outfit("attire-girls-wedding-1", 234),
          outfit("attire-girls-wedding-2", 205),
          outfit("attire-girls-wedding-3", 226),
          outfit("attire-girls-wedding-4", 233),
        ],
      },
    ],
  },
  {
    id: "dress-code-guys",
    label: "Guys",
    background: images.dressGuysBg,
    cards: [
      {
        title: "Welcome Party",
        swatches: ["#9fb1da", "#b59b7e", "#272f8c"],
        outfits: [
          outfit("attire-guys-welcome-1", 177),
          outfit("attire-guys-welcome-2", 217),
          outfit("attire-guys-welcome-3", 209),
          outfit("attire-guys-welcome-4", 255),
          outfit("attire-guys-welcome-5", 394),
        ],
      },
      {
        title: "Wedding Day",
        swatches: ["#0b0b0b", "#ffffff"],
        outfits: [outfit("attire-guys-wedding-1", 204)],
      },
    ],
  },
];

export const accommodation = {
  villa: {
    title: ["Relais Villa", "Vittoria"],
    body: "The entire villa is exclusively reserved for our wedding week.",
    checkIn: "Check in at 3PM",
    checkOut: "Check out at 11AM",
  },
  included: {
    title: ["What is", "included"],
    items: [
      "AC/Heat in Rooms",
      "All meals",
      "Infinity Pool",
      "Boat Tours",
      "Restaurant, Spa, Cooking classes",
    ],
    linkLabel: "Click here for more info on the villa!",
  },
  early: {
    title: "Want to arrive early?",
    body: [
      "Our exclusive wedding stay at Relais Villa Vittoria will be October 4-6, but if you are planning to arrive in Lake Como a little earlier, we would love for you to have the option to stay at the villa before our wedding week.",
      "It is still a bit too early to arrange additional nights, so we will share more details on availability and booking approximately six months before the wedding.",
    ],
    emphasis:
      "More details regarding room selection and rates will be shared with you directly once RSVPs and headcount is confirmed!",
  },
};

export type Destination = {
  key: string;
  name: string;
  note: string;
  recommend?: boolean;
  photos: { src: string; alt: string }[];
};

export const italyDestinations: Destination[] = [
  {
    key: "milan",
    name: "Milan",
    note: "For quick city escape",
    photos: [
      { src: web("travel-milan-1.jpg"), alt: "Jerome in front of the Duomo di Milano" },
      { src: web("travel-milan-2.jpg"), alt: "Galleria Vittorio Emanuele II" },
    ],
  },
  {
    key: "dolomites",
    name: "Dolomites",
    note: "For the adventurous",
    photos: [
      { src: web("travel-dolomites-1.jpg"), alt: "Celebrating at the Tre Cime di Lavaredo" },
      { src: web("travel-dolomites-2.jpg"), alt: "Resting above the Seceda ridgeline" },
    ],
  },
  {
    key: "venice",
    name: "Venice",
    note: "For classic Italian",
    photos: [{ src: web("travel-venice-1.jpg"), alt: "Julia along a Venetian canal" }],
  },
  {
    key: "florence",
    name: "Florence/Pisa",
    note: "For art & culture",
    photos: [
      { src: web("travel-pisa.jpg"), alt: "Family at the Leaning Tower of Pisa" },
      { src: web("travel-florence-1.jpg"), alt: "Palazzo Vecchio in Florence" },
    ],
  },
  {
    key: "rome",
    name: "Rome",
    note: "For the history lovers",
    photos: [
      { src: web("travel-rome-1.jpg"), alt: "Family selfie at the Colosseum" },
      { src: web("travel-rome-2.jpg"), alt: "Selfie in front of the Colosseum" },
    ],
  },
  {
    key: "amalfi",
    name: "Amalfi Coast",
    note: "For the coastal getaway",
    photos: [],
  },
];

export const europeDestinations: Destination[] = [
  {
    key: "amsterdam",
    name: "Amsterdam, Netherland",
    note: "",
    photos: [{ src: web("travel-amsterdam.jpg"), alt: "Canal houses and bikes in Amsterdam" }],
  },
  {
    key: "london",
    name: "London, England",
    note: "",
    recommend: true,
    photos: [{ src: web("travel-london.jpg"), alt: "Westminster and Big Ben" }],
  },
  {
    key: "barcelona",
    name: "Barcelona, Spain",
    note: "",
    photos: [{ src: web("travel-barcelona.jpg"), alt: "Family at Barcelona Cathedral" }],
  },
  {
    key: "paris",
    name: "Paris, France",
    note: "",
    recommend: true,
    photos: [{ src: web("travel-paris.jpg"), alt: "Family selfie with the Eiffel Tower" }],
  },
  {
    key: "germany",
    name: "Germany",
    note: "",
    photos: [{ src: web("travel-germany.jpg"), alt: "Mountain lookout over an alpine lake" }],
  },
  {
    key: "switzerland",
    name: "Switzerland",
    note: "",
    recommend: true,
    photos: [{ src: web("travel-switzerland.jpg"), alt: "Hiking selfie in the Swiss Alps" }],
  },
  {
    key: "greece",
    name: "Greece",
    note: "",
    photos: [{ src: web("travel-greece.jpg"), alt: "Whitewashed domes in Santorini" }],
  },
];

export type ItineraryDay = { day: string; date: string; dateLabel?: string; notes: string[] };

// CONFIRM: Sep 30 – Oct 6 week; wedding Tuesday, October 5; welcome party Monday, October 4.
export const itinerary = {
  month: "September – October",
  year: "2027",
  days: [
    {
      day: "Thursday",
      date: "30",
      dateLabel: "Sep 30",
      notes: ["Fly LAX → MILAN"],
    },
    { day: "Friday", date: "01", notes: ["Arrive in Milan - Rest/Adjust to Jet Lag"] },
    { day: "Saturday", date: "02", notes: ["Spend the day in Milan w/ us! (your preference)"] },
    { day: "Sunday", date: "03", notes: ["Free day in Milan"] },
    {
      day: "Monday",
      date: "04",
      notes: ["Provided Transportation Pick up in Milan → Lake Como", "Welcome Party"],
    },
    { day: "Tuesday", date: "05", notes: ["Wedding Day"] },
    { day: "Wednesday", date: "06", notes: ["Free to leave Villa or continue traveling"] },
  ] as ItineraryDay[],
};

export type FaqItem = { q: string; a: string };

export const faq: { left: FaqItem[]; right: FaqItem[] } = {
  left: [
    {
      q: "Can I bring a plus one? my kids?",
      a: "We love your people (and your little people!), but due to our 30-person capacity, we’re only able to accommodate the guests named on the invitation. 🤍 Your loved ones are absolutely welcome to join you in Italy and stay at a nearby hotel. We just can’t include them at the wedding itself.",
    },
    {
      q: "Can I stay longer than the wedding weekend?",
      a: "Absolutely! In fact, we highly recommend it. You made it all the way to Lake Como. Might as well make the most of it!",
    },
    {
      q: "What is the weather like in Lake Como? What if it rains?",
      a: "October in Lake Como is typically in the 60s-70s, but the weather can be a little weird! If it rains, we do have a plan B so the wedding will still go on!",
    },
  ],
  right: [
    {
      q: "What do I need to cover?",
      a: "Guests are responsible for their own flights and accommodations. Once you arrive in Milan, Italy, we’ve got the transportation covered!",
    },
    {
      q: "After the wedding, how will we get back?",
      a: "We’ve got you covered getting to the wedding! 🤍 For the ride back, we’ll need to know everyone’s plans after the celebration. More details will be shared closer to the date so we can coordinate transportation and make sure everyone gets back safely.",
    },
    {
      q: "Can I wear white on the wedding day?",
      a: "We love white, but we’re saving that one for the bride! 🤍 Please avoid white, ivory, or anything that could be mistaken for bridal attire. Thank you for letting us have our main-character moment!",
    },
  ],
};

export const rsvp = {
  dueBy: "Nov 1, 2026",
  contacts: [
    { name: "Julia Cecilia", phone: "(562) 457-7577" },
    { name: "Jerome Tadeo", phone: "(626) 278-7329" },
  ],
  instagram: "@juliaandjerome27",
  instagramUrl: "https://www.instagram.com/juliaandjerome27/",
  followNote: "for more wedding updates and travel tips as we count down to October 2027!",
};
