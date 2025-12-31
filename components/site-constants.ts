export const HOSPITAL = {
  name: "Sahara Multi Speciality Hospital",
  phoneDisplay: "+91 6376-060157",
  phoneE164: "+916376060157",
  email: "Smshospital14@gmail.com",
  addressLines: [
    "Opposite Krishi Upaj Mandi, near bus stand, Rajgarh",
    "Rajgarh, Churu, Rajasthan 331023",
  ],
  addressHindi: "कृषि मंडी के सामने, राजगढ़, चूरू, राजस्थान 331023",
  services: [
    "General Medicine (जनरल मेडिसिन)",
    "Neuro Medicine (न्यूरो मेडिसिन)",
    "Child / Pediatric Care (शिशु-बाल रोग उपचार)",
    "Health Screening (हेल्थ स्क्रीनिंग)",
    "Physiotherapy / Rehabilitation Services (फिजियोथेरेपी / रिहैबिलिटेशन सर्विसेज)",
    "Diagnosis & Treatment (डायग्नोसिस एंड ट्रीटमेंट)",
    "24/7 Available (24/7)",
  ],
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${HOSPITAL.phoneE164.replace(/\D/g, "")}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function mapsLink() {
  const query = `${HOSPITAL.name}, ${HOSPITAL.addressLines.join(", ")}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
