import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { AIAssistant } from "../components/AIAssistant";

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
  title: "Sahara Multi Speciality Hospital | Rajgarh, Churu",
  description:
    "Sahara Multi Speciality Hospital (Rajgarh, Churu, Rajasthan) — General Medicine, Neuro Medicine, Pediatric care, Health Screening, Physiotherapy/Rehabilitation, Diagnosis & Treatment. 24/7.",
  icons: {
    icon: "/gall/favicon.jpeg",
    apple: "/gall/favicon.jpeg",
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
