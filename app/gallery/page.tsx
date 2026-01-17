"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Image as ImageIcon, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

const GALLERY = [
  { src: "/gall/hospital-outer1.jpeg", title: "Hospital Building Exterior", category: "Building" },
  { src: "/gall/hospital-outer2.jpeg", title: "Hospital Front View", category: "Building" },
  { src: "/gall/reception1.jpeg", title: "Main Reception Area", category: "Reception" },
  { src: "/gall/reception2.jpeg", title: "Reception Desk", category: "Reception" },
  { src: "/gall/beds1.jpeg", title: "Patient Beds Area", category: "Rooms" },
  { src: "/gall/beds3.jpeg", title: "ICU", category: "Rooms" },
  { src: "/gall/lift1.jpeg", title: "Modern Elevator", category: "Facilities" },
  { src: "/gall/medicines-shop1.jpeg", title: "Hospital Pharmacy", category: "Pharmacy" },
  { src: "/gall/medicines-shop2.jpeg", title: "Medicine Counter", category: "Pharmacy" },
];

export default function GalleryPage() {
  const [fullscreenImage, setFullscreenImage] = useState<number | null>(null);

  const openFullscreen = (idx: number) => {
    setFullscreenImage(idx);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  const nextImage = () => {
    if (fullscreenImage !== null) {
      setFullscreenImage((fullscreenImage + 1) % GALLERY.length);
    }
  };

  const prevImage = () => {
    if (fullscreenImage !== null) {
      setFullscreenImage((fullscreenImage - 1 + GALLERY.length) % GALLERY.length);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted to-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-10">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Hospital Gallery
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-700">
              Take a virtual tour of Sahara Multi Speciality Hospital. Browse through our
              modern facilities, comfortable patient rooms, well-equipped pharmacy, and
              professional medical staff.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border-2 border-primary/20 bg-primary-light p-4">
            <ImageIcon className="h-8 w-8 text-primary" />
            <div>
              <div className="text-2xl font-extrabold text-foreground">{GALLERY.length}</div>
              <div className="text-sm font-semibold text-slate-700">Photos</div>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {GALLERY.map((item, idx) => (
            <figure
              key={item.src}
              className="group relative overflow-hidden rounded-2xl border-2 border-border bg-background shadow-lg transition-all hover:border-primary hover:shadow-2xl animate-[slide-up_0.6s_ease-out]"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <img
                  src={item.src}
                  alt={item.title}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                
                {/* Fullscreen Button - Always visible on mobile */}
                <button
                  onClick={() => openFullscreen(idx)}
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-black/80 sm:opacity-0 sm:group-hover:opacity-100"
                  aria-label="View fullscreen"
                >
                  <Maximize2 className="h-5 w-5" strokeWidth={2.5} />
                </button>
              </div>
              <figcaption className="relative">
                <div className="px-5 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-bold text-slate-800">{item.title}</div>
                      <div className="mt-1 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                        {item.category}
                      </div>
                    </div>
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-12 rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary-light to-secondary-light p-8 text-center shadow-xl">
          <h2 className="text-2xl font-extrabold text-foreground">Visit Us in Person</h2>
          <p className="mt-3 text-base text-slate-700">
            Experience our facilities firsthand. We're located at Opposite Krishi Upaj Mandi,
            near bus stand, Rajgarh, Churu (Rajasthan). Open 24/7 for your healthcare needs.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="tel:+919251198569"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Call +91 9251-198569
            </a>
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary bg-background px-6 py-3 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              View Our Services
            </Link>
          </div>
        </div>

        {/* Fullscreen Modal */}
        {fullscreenImage !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-[fade-in_0.3s_ease-out]">
            {/* Close Button */}
            <button
              onClick={closeFullscreen}
              className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
              aria-label="Close fullscreen"
            >
              <X className="h-6 w-6" strokeWidth={2.5} />
            </button>

            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-7 w-7" strokeWidth={2.5} />
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
              aria-label="Next image"
            >
              <ChevronRight className="h-7 w-7" strokeWidth={2.5} />
            </button>

            {/* Image */}
            <div className="relative max-h-[90vh] max-w-[90vw] p-4">
              <img
                src={GALLERY[fullscreenImage].src}
                alt={GALLERY[fullscreenImage].title}
                className="h-auto max-h-[85vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-black/60 px-6 py-3 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-sm font-bold text-white">{GALLERY[fullscreenImage].title}</div>
                  <div className="mt-1 text-xs text-white/80">
                    {fullscreenImage + 1} / {GALLERY.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Click outside to close */}
            <div
              className="absolute inset-0 -z-10"
              onClick={closeFullscreen}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}
