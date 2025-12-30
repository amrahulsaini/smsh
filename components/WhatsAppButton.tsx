import { MessageCircle } from "lucide-react";
import { HOSPITAL, whatsappLink } from "./site-constants";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(`Hello ${HOSPITAL.name}! I need help.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-24 right-6 z-50 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-2xl transition-all hover:scale-110 hover:shadow-green-500/50 animate-[pulse-glow_2s_ease-in-out_infinite]"
    >
      <span className="sr-only">WhatsApp</span>
      <MessageCircle className="h-7 w-7 transition-transform group-hover:rotate-12" strokeWidth={2.5} />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
        <span className="relative inline-flex h-4 w-4 rounded-full bg-accent"></span>
      </span>
    </a>
  );
}
