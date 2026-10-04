import type { Metadata } from "next";
import { Ballet, Caveat, Instrument_Serif, Roboto_Mono } from "next/font/google";
import { couple, event, images } from "@/app/data/content";
import "./globals.css";

const previewPlaceAndDate = "Lake Como · October 6, 2027";
const pageTitle = `${couple.combined} — ${previewPlaceAndDate}`;
const metaDescription = `The wedding of ${couple.combined} at ${event.venueName}, Lake Como — ${event.dateLong}. RSVP, travel, and schedule.`;

// Stand-in for Burgues Script. To use the real font, drop the file in app/fonts/ and replace with:
// localFont({ src: "./fonts/BurguesScript.woff2", variable: "--font-script", display: "swap" })
const script = Ballet({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
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
  metadataBase: new URL("https://juliaandjerome.com"),
  title: pageTitle,
  description: metaDescription,
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: couple.combined,
    description: previewPlaceAndDate,
    type: "website",
    images: [images.hero],
  },
  twitter: {
    card: "summary_large_image",
    title: couple.combined,
    description: previewPlaceAndDate,
    images: [images.hero],
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
