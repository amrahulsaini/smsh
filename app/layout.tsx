import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { AIAssistant } from "../components/AIAssistant";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://saharamultispecialityhospital.com";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sahara Multi Speciality Hospital | Rajgarh, Churu",
    template: "%s | Sahara Multi Speciality Hospital",
  },
  description:
    "Sahara Multi Speciality Hospital in Rajgarh (Churu, Rajasthan) — General Medicine, Neuro Medicine, Pediatric Care, Diagnostics, Physiotherapy/Rehabilitation, and Emergency Care.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Sahara Multi Speciality Hospital",
    "hospital in Rajgarh",
    "hospital in Churu",
    "Rajasthan hospital",
    "general medicine",
    "neurology",
    "pediatrics",
    "diagnostics",
    "physiotherapy",
    "emergency care",
  ],
  icons: {
    icon: [
      { url: "/gall/favicon.jpeg", sizes: "any" },
    ],
    apple: "/gall/favicon.jpeg",
    shortcut: "/gall/favicon.jpeg",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Sahara Multi Speciality Hospital | Rajgarh, Churu",
    description:
      "Book appointments and access trusted multi-speciality healthcare in Rajgarh (Churu, Rajasthan).",
    siteName: "Sahara Multi Speciality Hospital",
    images: [
      {
        url: "/banner/hero-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Sahara Multi Speciality Hospital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahara Multi Speciality Hospital | Rajgarh, Churu",
    description:
      "Book appointments and access trusted multi-speciality healthcare in Rajgarh (Churu, Rajasthan).",
    images: ["/banner/hero-banner.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        <div className="min-h-dvh bg-background text-foreground">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <WhatsAppButton />
          <AIAssistant />
        </div>
      </body>
    </html>
  );
}
