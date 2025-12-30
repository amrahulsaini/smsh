"use client";

import { useState } from "react";
import { X, Calendar, User, Phone, Mail, Stethoscope, MessageSquare, CheckCircle2, Loader2 } from "lucide-react";
import { HOSPITAL } from "./site-constants";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    department: "",
    date: "",
    time: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const departments = [
    "General Medicine",
    "Neurology",
    "Pediatrics",
    "Diagnostics",
    "Physiotherapy",
    "Emergency Care",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create email content
    const emailSubject = `New Appointment Request - ${formData.name}`;
    const emailBody = `
New Appointment Request from Website:

Patient Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Department: ${formData.department}
Preferred Date: ${formData.date}
Preferred Time: ${formData.time}
Message: ${formData.message || "None"}

Please contact the patient to confirm the appointment.
    `.trim();

    try {
      const response = await fetch("/api/send-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "saharamedicoserajgarh@gmail.com",
          subject: emailSubject,
          body: emailBody,
          formData: formData,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
          setFormData({
            name: "",
            phone: "",
            email: "",
            department: "",
            date: "",
            time: "",
            message: "",
          });
        }, 3000);
      } else {
        // Fallback to mailto if API fails
        const mailtoLink = `mailto:saharamedicoserajgarh@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;
      }
    } catch (error) {
      // Fallback to mailto
      const mailtoLink = `mailto:saharamedicoserajgarh@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-[fade-in_0.3s_ease-out]">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-border bg-background shadow-2xl animate-[slide-up_0.3s_ease-out]">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 rounded-t-3xl border-b-2 border-border bg-gradient-to-r from-primary to-secondary px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <Calendar className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Book an Appointment</h2>
              <p className="text-sm text-white/80">Fill in your details below</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-white/30"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Success Message */}
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-12 w-12 text-green-600" strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Appointment Request Sent!</h3>
            <p className="text-slate-700">
              Thank you for choosing {HOSPITAL.name}. We'll contact you shortly to confirm your appointment.
            </p>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            {/* Name */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                <User className="h-4 w-4 text-primary" />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm font-medium text-foreground placeholder:text-slate-500 focus:border-primary focus:outline-none"
              />
            </div>

            {/* Phone & Email */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm font-medium text-foreground placeholder:text-slate-500 focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  Email Address
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

            {/* Department */}
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
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time */}
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

            {/* Message */}
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
                placeholder="Any specific symptoms or requirements..."
                className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm font-medium text-foreground placeholder:text-slate-500 focus:border-primary focus:outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending Request...
                  </>
                ) : (
                  <>
                    <Calendar className="h-5 w-5" />
                    Book Appointment
                  </>
                )}
              </button>
              <p className="text-center text-xs text-slate-600">
                We'll contact you within 24 hours to confirm your appointment
              </p>
            </div>
          </form>
        )}
      </div>

      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose}></div>
    </div>
  );
}
