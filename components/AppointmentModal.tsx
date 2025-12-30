"use client";

import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Stethoscope,
  User,
  X,
} from "lucide-react";
import { HOSPITAL } from "./site-constants";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormState = {
  name: string;
  phone: string;
  email: string;
  department: string;
  date: string;
  time: string;
  message: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  phone: "",
  email: "",
  department: "",
  date: "",
  time: "",
  message: "",
};

const DEPARTMENTS = [
  "General Medicine",
  "Neurology",
  "Pediatrics",
  "Diagnostics",
  "Physiotherapy",
  "Emergency Care",
];

export function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const modalScrollRef = useRef<HTMLDivElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const previousBodyOverflowRef = useRef<string>("");

  useEffect(() => {
    if (!isOpen) return;

    previousBodyOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    // Reset scroll & focus every time it opens
    requestAnimationFrame(() => {
      if (modalScrollRef.current) modalScrollRef.current.scrollTop = 0;
      nameInputRef.current?.focus();
    });

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousBodyOverflowRef.current;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          department: formData.department,
          date: formData.date,
          time: formData.time,
          message: formData.message || undefined,
        }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) {
        throw new Error(result?.error || "Failed to send appointment request");
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData(INITIAL_FORM);
        onClose();
      }, 2200);
    } catch (_err) {
      // Fallback to mailto
      const emailSubject = `Appointment Request - ${formData.name}`;
      const emailBody = `
New Appointment Request

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || "Not provided"}
Department: ${formData.department}
Preferred Date: ${formData.date}
Preferred Time: ${formData.time}
Message: ${formData.message || "None"}
      `.trim();
      const mailtoLink = `mailto:${HOSPITAL.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-title"
    >
      <div className="flex min-h-dvh items-center justify-center p-4">
        <div
          ref={modalScrollRef}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-3xl border-2 border-border bg-background shadow-2xl"
        >
          <div className="flex items-center justify-between gap-4 rounded-t-3xl border-b-2 border-border bg-gradient-to-r from-primary to-secondary px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                <Calendar className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 id="appointment-title" className="text-lg font-bold text-white sm:text-xl">
                  Book an Appointment
                </h2>
                <p className="text-xs font-medium text-white/80 sm:text-sm">Fill in your details below</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {isSuccess ? (
            <div className="flex flex-col items-center justify-center gap-4 p-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-9 w-9 text-green-600" strokeWidth={2.2} />
              </div>
              <h3 className="text-xl font-bold text-foreground">Request Sent!</h3>
              <p className="text-sm text-slate-700">
                Thank you for choosing {HOSPITAL.name}. We’ll contact you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                  <User className="h-4 w-4 text-primary" />
                  Full Name *
                </label>
                <input
                  ref={nameInputRef}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm font-medium text-foreground placeholder:text-slate-500 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                    <Phone className="h-4 w-4 text-primary" />
                    Phone Number *
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder={HOSPITAL.phoneDisplay}
                    className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm font-medium text-foreground placeholder:text-slate-500 focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                    <Mail className="h-4 w-4 text-primary" />
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm font-medium text-foreground placeholder:text-slate-500 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                  <Stethoscope className="h-4 w-4 text-primary" />
                  Department *
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm font-medium text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="">Select a department</option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm font-medium text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    Preferred Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm font-medium text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  Additional Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any symptoms or requirements..."
                  className="w-full resize-none rounded-xl border-2 border-border bg-background px-4 py-3 text-sm font-medium text-foreground placeholder:text-slate-500 focus:border-primary focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-bold text-white shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Calendar className="h-5 w-5" />
                    Book Appointment
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-600">
                We’ll contact you on {formData.phone || HOSPITAL.phoneDisplay} to confirm.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
