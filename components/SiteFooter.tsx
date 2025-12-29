import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react";
import { HOSPITAL, mapsLink, whatsappLink } from "./site-constants";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 md:grid-cols-3">
        {/* Hospital Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-xl border-2 border-primary/30 bg-white shadow-lg">
              <img
                src="/gall/favicon.jpeg"
                alt={`${HOSPITAL.name} logo`}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">{HOSPITAL.name}</div>
              <div className="text-sm text-slate-600">Quality Healthcare • 24/7</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-700">
            Providing trusted multi-speciality medical care in Rajgarh, Churu (Rajasthan). 
            Your health and well-being are our top priorities.
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-white"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-white"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-white"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-4">
          <div className="text-base font-bold text-foreground">Visit Us</div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 flex-none text-primary mt-0.5" />
              <div className="text-sm text-slate-700">
                <div className="font-semibold">{HOSPITAL.addressLines[0]}</div>
                <div>{HOSPITAL.addressLines[1]}</div>
                <div className="mt-1 text-slate-600">{HOSPITAL.addressHindi}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 flex-none text-primary mt-0.5" />
              <div className="text-sm text-slate-700">
                <div className="font-semibold">24 Hours / 7 Days</div>
                <div className="text-slate-600">Always available for emergencies</div>
              </div>
            </div>
          </div>
          <a
            href={mapsLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover"
          >
            <MapPin className="h-4 w-4" />
            Get Directions
          </a>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <div className="text-base font-bold text-foreground">Contact Us</div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-slate-600">Call / WhatsApp</div>
                <a
                  className="text-sm font-bold text-foreground hover:text-primary"
                  href={`tel:${HOSPITAL.phoneE164}`}
                >
                  {HOSPITAL.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-slate-600">Email</div>
                <a
                  className="text-sm font-bold text-foreground hover:text-primary"
                  href={`mailto:${HOSPITAL.email}`}
                >
                  {HOSPITAL.email}
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <a
              href={`tel:${HOSPITAL.phoneE164}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary bg-background px-5 py-2.5 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-slate-900">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-sm text-slate-300 sm:flex-row">
          <div>© {new Date().getFullYear()} {HOSPITAL.name}. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span className="font-semibold text-white">saharamultispecialityhospital.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
