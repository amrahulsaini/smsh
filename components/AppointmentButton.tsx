"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { AppointmentModal } from "./AppointmentModal";

export function AppointmentButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="group fixed bottom-6 right-6 z-50 inline-flex h-14 items-center gap-3 rounded-full border-2 border-primary/20 bg-gradient-to-r from-accent to-orange-600 px-6 py-3 text-sm font-bold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-accent/50 sm:h-16 sm:px-8"
        aria-label="Book Appointment"
      >
        <Calendar className="h-5 w-5 transition-transform group-hover:scale-110 sm:h-6 sm:w-6" strokeWidth={2.5} />
        <span className="hidden sm:inline">Book Appointment</span>
      </button>

      <AppointmentModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
