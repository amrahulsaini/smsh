import Link from "next/link";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Activity,
  Heart,
  Stethoscope,
  Baby,
  Brain,
  Syringe,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  Award,
  Users,
  Shield,
  Building2,
  Bot,
} from "lucide-react";
import { HOSPITAL, mapsLink, whatsappLink } from "../components/site-constants";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-light via-background to-secondary-light">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Left Content */}
            <div className="flex flex-col justify-center space-y-6 animate-[slide-up_0.6s_ease-out]">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Your Health, <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Our Priority
                </span>
              </h1>

              <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
                Sahara Multi Speciality Hospital provides comprehensive medical care with
                state-of-the-art facilities in Rajgarh. From general medicine to specialized
                treatment, we're here for your complete health journey.
              </p>

              <div className="flex items-start gap-3 rounded-2xl border-2 border-border bg-background p-5 shadow-lg">
                <MapPin className="h-6 w-6 flex-none text-primary mt-1" />
                <div className="space-y-1">
                  <div className="font-bold text-foreground">{HOSPITAL.addressLines[0]}</div>
                  <div className="text-sm text-slate-600">{HOSPITAL.addressLines[1]}</div>
                  <div className="text-sm text-slate-500">{HOSPITAL.addressHindi}</div>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href={`tel:${HOSPITAL.phoneE164}`}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
                >
                  <Phone className="h-5 w-5 transition-transform group-hover:rotate-12" />
                  Call {HOSPITAL.phoneDisplay}
                </a>
                <a
                  href={whatsappLink(`Hello ${HOSPITAL.name}! I want to book an appointment.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary bg-background px-8 py-4 text-base font-bold text-primary transition-all hover:bg-primary hover:text-white hover:shadow-xl"
                >
                  <MessageCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
                  WhatsApp
                </a>
              </div>

              <div className="flex items-center gap-6 pt-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-secondary" />
                  <span className="font-semibold text-slate-700">24/7 Emergency</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-secondary" />
                  <span className="font-semibold text-slate-700">Modern Equipment</span>
                </div>
              </div>
            </div>

            {/* Right Content - Banner */}
            <div className="relative animate-[slide-up_0.8s_ease-out]">
              <div className="overflow-hidden rounded-3xl border-4 border-white bg-white shadow-2xl">
                <img
                  src="/banner/hero-banner.jpg"
                  alt="Sahara Multi Speciality Hospital"
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              {/* Floating Stats - Hidden on mobile */}
              <div className="absolute -bottom-6 left-4 right-4 hidden grid-cols-3 gap-2 sm:grid sm:gap-3">
                <div className="rounded-2xl border-2 border-white bg-gradient-to-br from-primary to-primary-hover p-4 text-center shadow-xl">
                  <div className="text-2xl font-extrabold text-white">24/7</div>
                  <div className="text-xs font-semibold text-white/90">Available</div>
                </div>
                <div className="rounded-2xl border-2 border-white bg-gradient-to-br from-secondary to-secondary-hover p-4 text-center shadow-xl">
                  <div className="text-2xl font-extrabold text-white">100+</div>
                  <div className="text-xs font-semibold text-white/90">Daily Patients</div>
                </div>
                <div className="rounded-2xl border-2 border-white bg-gradient-to-br from-accent to-orange-600 p-4 text-center shadow-xl">
                  <div className="text-2xl font-extrabold text-white">10+</div>
                  <div className="text-xs font-semibold text-white/90">Services</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="border-y border-border bg-background py-16">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Why Choose Sahara Multi Speciality Hospital?
            </h2>
            <p className="mt-4 text-lg text-slate-700">
              Trusted healthcare with modern facilities and experienced professionals
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Award,
                title: "Expert Care",
                desc: "Experienced medical professionals dedicated to your health",
                color: "from-primary to-primary-hover",
              },
              {
                icon: Building2,
                title: "Modern Facilities",
                desc: "State-of-the-art equipment and comfortable patient rooms",
                color: "from-secondary to-secondary-hover",
              },
              {
                icon: Clock,
                title: "24/7 Emergency",
                desc: "Round-the-clock availability for urgent medical needs",
                color: "from-accent to-orange-600",
              },
              {
                icon: Shield,
                title: "Trusted Service",
                desc: "Serving the Rajgarh community with quality healthcare",
                color: "from-primary to-secondary",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.color} p-6 shadow-xl transition-all hover:shadow-2xl hover:scale-105 hover:-translate-y-3 animate-[slide-up_0.6s_ease-out]`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 transition-all group-hover:scale-150"></div>
                <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm transition-transform group-hover:scale-110 group-hover:rotate-6">
                  <item.icon className="h-8 w-8 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="relative mt-5 text-xl font-bold text-white">{item.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-white/90">{item.desc}</p>
                <div className="relative mt-4 inline-flex items-center gap-2 text-sm font-bold text-white opacity-0 transition-all group-hover:opacity-100">
                  Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Journey Flowchart */}
      <section className="bg-gradient-to-br from-primary-light via-background to-secondary-light py-16">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Your Treatment Journey with Us
            </h2>
            <p className="mt-4 text-lg text-slate-700">
              Simple, transparent process from consultation to recovery
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Initial Consultation",
                desc: "Visit us or call for appointment. Our staff will guide you to the right specialist.",
                icon: "🩺",
              },
              {
                step: "02",
                title: "Diagnosis & Tests",
                desc: "Comprehensive health screening and diagnostic tests with modern equipment.",
                icon: "🔬",
              },
              {
                step: "03",
                title: "Treatment Plan",
                desc: "Personalized treatment plan designed by experienced doctors for your condition.",
                icon: "📋",
              },
              {
                step: "04",
                title: "Recovery & Care",
                desc: "Post-treatment follow-up and rehabilitation support for complete recovery.",
                icon: "💚",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative animate-[slide-up_0.6s_ease-out]"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                {/* Connecting Arrow (except last) */}
                {idx < 3 && (
                  <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-gradient-to-r from-primary to-secondary lg:block">
                    <div className="absolute -right-2 -top-1.5 h-4 w-4 rotate-45 border-r-2 border-t-2 border-secondary"></div>
                  </div>
                )}

                <div className="relative rounded-3xl border-2 border-border bg-background p-6 shadow-lg transition-all hover:border-primary hover:shadow-2xl hover:scale-105 hover:-translate-y-2">
                  <div className="absolute -right-3 -top-3 flex h-14 w-14 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-primary to-secondary text-2xl font-extrabold text-white shadow-xl">
                    {item.step}
                  </div>
                  <div className="text-5xl">{item.icon}</div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-gradient-to-br from-muted to-background py-16">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Services List */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  Our Medical Services
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-700">
                  We provide comprehensive healthcare services covering multiple specialities.
                  Our team of experienced doctors and modern facilities ensure you receive
                  the best possible care for all your medical needs.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { icon: Stethoscope, text: "General Medicine (जनरल मेडिसिन)", gradient: "from-blue-500 to-blue-600" },
                  { icon: Brain, text: "Neuro Medicine (न्यूरो मेडिसिन)", gradient: "from-purple-500 to-purple-600" },
                  { icon: Baby, text: "Child / Pediatric Care (शिशु-बाल रोग उपचार)", gradient: "from-pink-500 to-pink-600" },
                  { icon: Activity, text: "Health Screening (हेल्थ स्क्रीनिंग)", gradient: "from-green-500 to-green-600" },
                  { icon: Heart, text: "Physiotherapy / Rehabilitation Services (फिजियोथेरेपी / रिहैबिलिटेशन सर्विसेज)", gradient: "from-red-500 to-red-600" },
                  { icon: Syringe, text: "Diagnosis & Treatment (डायग्नोसिस एंड ट्रीटमेंट)", gradient: "from-orange-500 to-orange-600" },
                  { icon: Clock, text: "24/7 Emergency Care (24/7)", gradient: "from-primary to-secondary" },
                ].map((service, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center gap-4 rounded-2xl border-2 border-border bg-background p-4 shadow-md transition-all hover:border-secondary hover:shadow-2xl hover:scale-[1.02] hover:-translate-x-1 animate-[slide-up_0.6s_ease-out]"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div className={`flex h-14 w-14 flex-none items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg transition-all group-hover:scale-110 group-hover:rotate-6`}>
                      <service.icon className="h-7 w-7 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="flex-1 font-semibold text-slate-800 transition-colors group-hover:text-secondary">{service.text}</span>
                    <CheckCircle2 className="h-6 w-6 flex-none text-primary opacity-0 transition-all group-hover:opacity-100 group-hover:scale-110" strokeWidth={3} />
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border-2 border-primary/20 bg-primary-light p-6">
                <div className="flex items-start gap-4">
                  <Users className="h-8 w-8 flex-none text-primary" />
                  <div>
                    <div className="font-bold text-foreground">Need Help Choosing?</div>
                    <p className="mt-1 text-sm text-slate-700">
                      Not sure which department you need? Call or WhatsApp us and our staff
                      will guide you to the right specialist for your condition.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Visual */}
            <div className="space-y-6">
              <div className="overflow-hidden rounded-3xl border-2 border-border bg-background shadow-xl transition-all hover:shadow-2xl hover:scale-[1.02]">
                <img
                  src="/gall/logowithaddress.jpeg"
                  alt="Hospital logo with address"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="group overflow-hidden rounded-2xl border-2 border-border shadow-lg transition-all hover:border-primary hover:shadow-2xl hover:scale-105">
                  <img
                    src="/gall/hospital-outer1.jpeg"
                    alt="Hospital building"
                    className="h-48 w-full object-cover transition-transform group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="group overflow-hidden rounded-2xl border-2 border-border shadow-lg transition-all hover:border-primary hover:shadow-2xl hover:scale-105">
                  <img
                    src="/gall/reception1.jpeg"
                    alt="Reception area"
                    className="h-48 w-full object-cover transition-transform group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="rounded-2xl border-2 border-secondary/20 bg-secondary-light p-6 text-center shadow-lg transition-all hover:shadow-xl hover:scale-105">
                <Clock className="mx-auto h-12 w-12 text-secondary animate-pulse" />
                <div className="mt-4 text-2xl font-extrabold text-foreground">24/7 Emergency</div>
                <p className="mt-2 text-sm text-slate-700">
                  For medical emergencies, call immediately: <br />
                  <a
                    href={`tel:${HOSPITAL.phoneE164}`}
                    className="text-lg font-bold text-secondary hover:underline"
                  >
                    {HOSPITAL.phoneDisplay}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Statistics */}
      <section className="border-y border-border bg-gradient-to-r from-primary via-secondary to-primary py-16">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { number: "5000+", label: "Patients Treated", icon: "👥" },
              { number: "24/7", label: "Emergency Services", icon: "🚨" },
              { number: "5+", label: "Years Experience", icon: "⭐" },
              { number: "100%", label: "Patient Satisfaction", icon: "💚" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="group text-center animate-[slide-up_0.6s_ease-out]"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-5xl mb-3 transition-transform group-hover:scale-125">{stat.icon}</div>
                <div className="text-4xl font-extrabold text-white transition-all group-hover:scale-110">{stat.number}</div>
                <div className="mt-2 text-sm font-semibold text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Cards - Proper Flowchart */}
      <section className="relative bg-gradient-to-b from-background via-muted/50 to-background py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #248e97 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        </div>

        <div className="relative mx-auto w-full max-w-5xl px-4">
          <div className="text-center mb-16 animate-[fade-in_0.6s_ease-out]">
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Our Specialized Departments
            </h2>
            <p className="mt-4 text-lg text-slate-700 max-w-2xl mx-auto">
              Complete healthcare journey with expert specialists, advanced technology, and compassionate care at every step
            </p>
          </div>

          {/* Flowchart Container */}
          <div className="relative mx-auto max-w-3xl">
            {[
              {
                name: "General Medicine Department",
                subtitle: "Primary Healthcare & Consultation",
                desc: "First point of contact for all health concerns. Our experienced physicians diagnose and treat common illnesses, manage chronic conditions like diabetes and hypertension, and provide preventive care guidance.",
                icon: Stethoscope,
                features: ["Health Check-ups", "Chronic Disease Management", "Preventive Medicine"],
                stat: "5000+ Patients/Year",
              },
              {
                name: "Neurology Department",
                subtitle: "Brain & Nervous System Care",
                desc: "Specialized treatment for neurological disorders including migraines, epilepsy, stroke, Parkinson's disease, and nerve-related conditions with advanced diagnostic facilities.",
                icon: Brain,
                features: ["Stroke Treatment", "Epilepsy Management", "Neuro Diagnostics"],
                stat: "Expert Neurologists",
              },
              {
                name: "Pediatrics Department",
                subtitle: "Child Health & Development",
                desc: "Complete healthcare for children from birth to adolescence. Vaccination programs, growth monitoring, treatment of childhood illnesses, and developmental assessments by caring pediatricians.",
                icon: Baby,
                features: ["Vaccination Programs", "Growth Monitoring", "Child Nutrition"],
                stat: "2000+ Children Treated",
              },
              {
                name: "Diagnostic Center",
                subtitle: "Advanced Testing & Imaging",
                desc: "State-of-the-art laboratory and imaging services including blood tests, X-rays, ultrasounds, ECG, and comprehensive health screening packages with quick and accurate results.",
                icon: Activity,
                features: ["Lab Testing", "X-Ray & Ultrasound", "Health Packages"],
                stat: "10,000+ Tests Monthly",
              },
              {
                name: "Physiotherapy Unit",
                subtitle: "Recovery & Rehabilitation",
                desc: "Expert physiotherapy services for injury recovery, post-surgery rehabilitation, sports injuries, chronic pain management, and mobility improvement with modern equipment and techniques.",
                icon: Heart,
                features: ["Injury Recovery", "Pain Management", "Sports Therapy"],
                stat: "95% Recovery Rate",
              },
              {
                name: "Emergency Services",
                subtitle: "24/7 Critical Care",
                desc: "Round-the-clock emergency medical services with trained staff and ambulance facility. Immediate treatment for accidents, heart attacks, breathing problems, and all urgent medical situations.",
                icon: Clock,
                features: ["24/7 Availability", "Ambulance Service", "Critical Care"],
                stat: "Always Available",
              },
            ].map((dept, idx) => (
              <div key={idx} className="relative">
                {/* Department Card */}
                <div
                  className="group relative animate-[slide-up_0.8s_ease-out] opacity-0"
                  style={{
                    animationDelay: `${idx * 0.15}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <div className="relative rounded-3xl border-2 border-border bg-background p-8 shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:border-primary">
                    {/* Department Number Badge */}
                    <div className="absolute -left-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-primary to-secondary text-xl font-black text-white shadow-lg">
                      {(idx + 1).toString().padStart(2, '0')}
                    </div>

                    <div className="flex flex-col gap-6 md:flex-row md:items-start">
                      {/* Icon */}
                      <div className="flex h-20 w-20 flex-none items-center justify-center rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary-light to-secondary-light shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                        <dept.icon className="h-10 w-10 text-primary" strokeWidth={2} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {dept.name}
                          </h3>
                          <p className="text-sm font-semibold text-secondary mt-1">{dept.subtitle}</p>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-700">{dept.desc}</p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2">
                          {dept.features.map((feature, fIdx) => (
                            <span
                              key={fIdx}
                              className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-light px-3 py-1 text-xs font-semibold text-primary"
                            >
                              <CheckCircle2 className="h-3 w-3" strokeWidth={3} />
                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* Stat Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full border-2 border-secondary/20 bg-secondary-light px-4 py-2 text-sm font-bold text-secondary">
                          <Award className="h-4 w-4" />
                          {dept.stat}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connecting Arrow */}
                {idx < 5 && (
                  <div className="relative flex justify-center py-6">
                    <div className="relative flex flex-col items-center">
                      {/* Animated Line */}
                      <div className="relative h-12 w-1 overflow-hidden rounded-full bg-slate-200">
                        <div className="absolute inset-0 w-full bg-gradient-to-b from-primary to-secondary animate-[slide-down_1.5s_ease-in-out_infinite]"></div>
                      </div>
                      
                      {/* Arrow Icon */}
                      <div className="relative -mt-1 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background shadow-lg animate-bounce">
                        <ArrowDown className="h-5 w-5 text-primary" strokeWidth={3} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Final CTA Section */}
          <div className="mt-20 text-center animate-[fade-in_0.8s_ease-out_1.5s] opacity-0" style={{ animationFillMode: "forwards" }}>
            <div className="relative overflow-hidden rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary-light via-background to-secondary-light p-10 shadow-2xl">
              {/* Decorative Elements */}
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl"></div>
              <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-secondary/10 blur-3xl"></div>

              <div className="relative space-y-6">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-xl animate-pulse">
                  <Sparkles className="h-10 w-10 text-white" strokeWidth={2} />
                </div>
                
                <div>
                  <h3 className="text-3xl font-bold text-foreground">Ready to Get Started?</h3>
                  <p className="mt-3 text-lg text-slate-700 max-w-2xl mx-auto">
                    Our expert team is here to guide you through every step of your healthcare journey. 
                    Book your appointment today and experience quality care.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <a
                    href={`tel:${HOSPITAL.phoneE164}`}
                    className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
                  >
                    <Phone className="h-5 w-5 transition-transform group-hover:rotate-12" />
                    Call {HOSPITAL.phoneDisplay}
                  </a>
                  <a
                    href={whatsappLink("I want to book an appointment with a specialist")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 px-8 py-4 text-base font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
                  >
                    <MessageCircle className="h-5 w-5 transition-transform group-hover:rotate-12" />
                    WhatsApp Now
                  </a>
                </div>

                <div className="flex items-center justify-center gap-6 pt-4 text-sm font-semibold text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Open 24/7
                  </div>
                  <div className="h-4 w-px bg-slate-300"></div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    Expert Doctors
                  </div>
                  <div className="h-4 w-px bg-slate-300"></div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Quality Care
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Preview */}
      <section className="border-t border-border bg-gradient-to-br from-muted to-background py-16">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Hospital Facilities & Gallery
              </h2>
              <p className="mt-2 text-lg text-slate-700">
                Explore our modern facilities, patient rooms, and medical equipment
              </p>
            </div>
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-secondary to-secondary-hover px-6 py-3 text-base font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              View Full Gallery
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { src: "/gall/privateroom1.jpeg", title: "Private Rooms", desc: "Comfortable AC rooms" },
              { src: "/gall/beds-with-ac1.jpeg", title: "AC Patient Beds", desc: "Modern patient care" },
              { src: "/gall/medicines-shop1.jpeg", title: "Pharmacy", desc: "24/7 medicine availability" },
              { src: "/gall/lift1.jpeg", title: "Modern Lift", desc: "Easy floor access" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border-2 border-border bg-muted shadow-lg transition-all hover:border-primary hover:shadow-2xl hover:scale-105 hover:-translate-y-2 animate-[slide-up_0.6s_ease-out]"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-125 group-hover:rotate-2"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
                  <div className="text-lg font-bold">{item.title}</div>
                  <div className="mt-1 text-sm text-white/90">{item.desc}</div>
                </div>
                <div className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white opacity-0 transition-all group-hover:opacity-100">
                  View
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Information Section */}
      <section id="appointment-info" className="border-t border-border bg-gradient-to-br from-muted to-background py-16">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Book Your Appointment
            </h2>
            <p className="mt-4 text-lg text-slate-700">
              Easy appointment booking - Choose your preferred method
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Method 1: AI Assistant */}
            <div className="group relative overflow-hidden rounded-3xl border-2 border-border bg-background p-8 shadow-lg transition-all hover:border-secondary hover:shadow-2xl hover:scale-105">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-secondary-hover shadow-lg">
                  <Bot className="h-10 w-10 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-foreground">AI Assistant Chat</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Chat with our AI assistant in the bottom-right corner. It will guide you through the booking process step-by-step and send your details directly to our team.
                </p>
                <div className="space-y-2 text-left w-full">
                  <div className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>24/7 Available</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Instant Response</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Guided Booking</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Method 2: Phone Call */}
            <div className="group relative overflow-hidden rounded-3xl border-2 border-primary bg-gradient-to-br from-primary-light to-background p-8 shadow-lg transition-all hover:shadow-2xl hover:scale-105">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-hover shadow-lg animate-pulse">
                  <Phone className="h-10 w-10 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Call Directly</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Speak directly with our staff to book your appointment. Available 24/7 for emergencies and general appointments.
                </p>
                <a
                  href={`tel:${HOSPITAL.phoneE164}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105"
                >
                  <Phone className="h-5 w-5" />
                  {HOSPITAL.phoneDisplay}
                </a>
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <Clock className="h-4 w-4" />
                  Open 24/7
                </div>
              </div>
            </div>

            {/* Method 3: WhatsApp */}
            <div className="group relative overflow-hidden rounded-3xl border-2 border-border bg-background p-8 shadow-lg transition-all hover:border-green-500 hover:shadow-2xl hover:scale-105">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                  <MessageCircle className="h-10 w-10 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-foreground">WhatsApp Booking</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Send us a WhatsApp message with your appointment details. Quick, convenient, and you get instant confirmation.
                </p>
                <a
                  href={whatsappLink(`Hello! I would like to book an appointment.\n\nName: \nPhone: \nDepartment: \nPreferred Date: \nPreferred Time: `)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Now
                </a>
                <div className="flex items-center gap-2 text-xs font-semibold text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Quick Response
                </div>
              </div>
            </div>
          </div>

          {/* What to Expect */}
          <div className="mt-16 rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary-light via-background to-secondary-light p-8 shadow-xl">
            <h3 className="text-center text-2xl font-bold text-foreground mb-8">What to Expect</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "1", title: "Share Details", desc: "Provide your name, contact, and preferred department", icon: "📝" },
                { step: "2", title: "Choose Date & Time", desc: "Select your preferred appointment slot", icon: "📅" },
                { step: "3", title: "Get Confirmation", desc: "We'll contact you within 24 hours", icon: "✅" },
                { step: "4", title: "Visit Hospital", desc: "Come for your scheduled appointment", icon: "🏥" },
              ].map((item, idx) => (
                <div key={idx} className="text-center space-y-3 animate-[slide-up_0.6s_ease-out]" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="text-4xl">{item.icon}</div>
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-black text-white">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-foreground">{item.title}</h4>
                  <p className="text-sm text-slate-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-border bg-gradient-to-br from-primary via-primary-hover to-secondary py-16">
        <div className="mx-auto w-full max-w-7xl px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Need Medical Assistance?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Our team is available 24/7 to help you with appointments, emergencies, or any health concerns
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`tel:${HOSPITAL.phoneE164}`}
              className="group inline-flex items-center gap-2 rounded-full border-2 border-white bg-white px-8 py-4 text-base font-bold text-primary shadow-xl transition-all hover:scale-105"
            >
              <Phone className="h-5 w-5 transition-transform group-hover:rotate-12" />
              {HOSPITAL.phoneDisplay}
            </a>
            <a
              href={whatsappLink(`Hello ${HOSPITAL.name}! I need help.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-4 text-base font-bold text-white transition-all hover:bg-white hover:text-primary"
            >
              <MessageCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
              WhatsApp Us
            </a>
            <a
              href={mapsLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-4 text-base font-bold text-white transition-all hover:bg-white hover:text-primary"
            >
              <MapPin className="h-5 w-5 transition-transform group-hover:scale-110" />
              Get Directions
            </a>
          </div>

          <div className="mt-10 text-sm text-white/80">
            Email us at:{" "}
            <a
              href={`mailto:${HOSPITAL.email}`}
              className="font-bold text-white underline hover:no-underline"
            >
              {HOSPITAL.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
