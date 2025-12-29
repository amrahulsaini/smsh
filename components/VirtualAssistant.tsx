"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { HOSPITAL, mapsLink, whatsappLink } from "./site-constants";

type QA = { q: string; a: string };

export function VirtualAssistant() {
  const [open, setOpen] = useState(false);

  const faqs: QA[] = useMemo(
    () => [
      {
        q: "What services do you provide?",
        a: HOSPITAL.services.join(" • "),
      },
      {
        q: "Where are you located?",
        a: `${HOSPITAL.addressLines.join(", ")} (${HOSPITAL.addressHindi})`,
      },
      {
        q: "How can I contact you?",
        a: `Call: ${HOSPITAL.phoneDisplay} | WhatsApp: ${HOSPITAL.phoneDisplay} | Email: ${HOSPITAL.email}`,
      },
      {
        q: "Are you open 24/7?",
        a: "Yes — 24/7 available.",
      },
    ],
    [],
  );

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {open && (
        <div className="mb-3 w-[320px] overflow-hidden rounded-2xl border border-border bg-background shadow-lg">
          <div className="flex items-center justify-between gap-3 border-b border-border bg-muted px-4 py-3">
            <div>
              <div className="text-sm font-semibold text-foreground">Virtual Assistant</div>
              <div className="text-xs text-slate-600">{HOSPITAL.name}</div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-muted"
            >
              Close
            </button>
          </div>

          <div className="space-y-3 px-4 py-4">
            <div className="text-xs text-slate-600">
              Quick help — choose an option or contact us.
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={`tel:${HOSPITAL.phoneE164}`}
                className="rounded-full bg-primary px-3 py-2 text-xs font-semibold text-white hover:bg-primary-hover"
              >
                Call now
              </a>
              <a
                href={whatsappLink(`Hello ${HOSPITAL.name}! I want an appointment.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted"
              >
                WhatsApp
              </a>
              <a
                href={mapsLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted"
              >
                Directions
              </a>
              <Link
                href="/gallery"
                className="rounded-full border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted"
              >
                Gallery
              </Link>
            </div>

            <div className="space-y-2">
              {faqs.map((item) => (
                <details
                  key={item.q}
                  className="rounded-xl border border-border bg-background px-3 py-2"
                >
                  <summary className="cursor-pointer text-sm font-semibold text-foreground">
                    {item.q}
                  </summary>
                  <div className="mt-2 text-sm text-slate-700">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground shadow-lg hover:bg-muted"
        aria-expanded={open}
        aria-controls="virtual-assistant"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white">
          ?
        </span>
        Help
      </button>
    </div>
  );
}
