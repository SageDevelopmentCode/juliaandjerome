import type { Metadata } from "next";
import { Caveat, Instrument_Serif, Pinyon_Script, Roboto_Mono } from "next/font/google";
import "./globals.css";

// Stand-in for Burgues Script. To use the real font, drop the file in app/fonts/ and replace with:
// localFont({ src: "./fonts/BurguesScript.woff2", variable: "--font-script", display: "swap" })
const script = Pinyon_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const mono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const hand = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Julia & Jerome — Lake Como, October 6, 2027",
  description:
    "The wedding of Julia & Jerome at Relais Villa Vittoria, Lake Como. Schedule, travel, dress code, and RSVP.",
  openGraph: {
    title: "Julia & Jerome — Lake Como, October 6, 2027",
    description: "The wedding of Julia & Jerome at Relais Villa Vittoria, Lake Como.",
    type: "website",
    images: ["/assets/web/hero-boat.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${script.variable} ${display.variable} ${mono.variable} ${hand.variable} antialiased`}
    >
      <body className="min-h-full bg-sand font-mono text-cocoa">{children}</body>
    </html>
  );
}
