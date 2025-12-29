"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, Menu } from "lucide-react";
import { HOSPITAL, whatsappLink } from "./site-constants";

export function SiteHeader() {
  const pathname = usePathname();

  const handleServicesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") {
      return; // Let it navigate to /#services
    }
    e.preventDefault();
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="group flex items-center gap-3 transition-transform hover:scale-[1.02]">
          <div className="relative h-12 w-12 overflow-hidden rounded-xl border-2 border-primary/20 bg-white shadow-md transition-all group-hover:border-primary/40 group-hover:shadow-lg">
            <img
              src="/gall/favicon.jpeg"
              alt={`${HOSPITAL.name} logo`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="leading-tight">
            <div className="text-base font-bold text-foreground sm:text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {HOSPITAL.name}
            </div>
            <div className="text-xs text-slate-600 font-medium">Rajgarh • Churu • Rajasthan</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-700 lg:flex">
          <Link href="/" className="relative transition-colors hover:text-primary after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full">
            Home
          </Link>
          <Link href="/gallery" className="relative transition-colors hover:text-primary after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full">
            Gallery
          </Link>
          <a href="/#services" onClick={handleServicesClick} className="relative transition-colors hover:text-primary after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full">
            Services
          </a>
          <a href="#contact" className="relative transition-colors hover:text-primary after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${HOSPITAL.phoneE164}`}
            className="group hidden items-center gap-2 rounded-full border-2 border-primary/20 bg-primary-light px-4 py-2.5 text-sm font-bold text-primary transition-all hover:border-primary hover:bg-primary hover:text-white hover:shadow-lg sm:inline-flex"
          >
            <Phone className="h-4 w-4 transition-transform group-hover:rotate-12" />
            Call
          </a>
          <a
            href={whatsappLink(`Hello ${HOSPITAL.name}! I want to book an appointment.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:shadow-xl hover:scale-105"
          >
            <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <button className="inline-flex items-center justify-center rounded-full border-2 border-border p-2 text-slate-700 hover:bg-muted lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
