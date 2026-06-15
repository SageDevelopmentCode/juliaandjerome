import type { Metadata } from "next";
import {
  Pinyon_Script,
  Cormorant_Garamond,
  Playfair_Display,
  EB_Garamond,
} from "next/font/google";
import "./globals.css";

const pinyon = Pinyon_Script({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Julia & Jerome — We're Getting Married",
  description:
    "Join us as we celebrate the wedding of Julia & Jerome. Our story, the details, and how to RSVP.",
  openGraph: {
    title: "Julia & Jerome — We're Getting Married",
    description:
      "Join us as we celebrate the wedding of Julia & Jerome.",
    type: "website",
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
      className={`${pinyon.variable} ${cormorant.variable} ${playfair.variable} ${ebGaramond.variable} antialiased`}
    >
      <body className="min-h-full bg-paper text-forest font-body">
        {children}
      </body>
    </html>
  );
}
