"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, X, Send } from "lucide-react";
import { HOSPITAL, whatsappLink } from "./site-constants";

type AppointmentData = {
  name?: string;
  phone?: string;
  email?: string;
  department?: string;
  date?: string;
  time?: string;
  message?: string;
};

type ConversationState = "idle" | "collecting_name" | "collecting_phone" | "collecting_email" | "collecting_department" | "collecting_date" | "collecting_time" | "collecting_message" | "confirming";

const FAQ_RESPONSES = [
  {
    keywords: ["service", "services", "treatment", "provide"],
    response: `We provide: ${HOSPITAL.services.join(", ")}. How can I help you further?`,
  },
  {
    keywords: ["hour", "time", "open", "available", "24/7"],
    response: "We are open 24/7! Our emergency services are always available. You can visit us or call anytime.",
  },
  {
    keywords: ["location", "address", "where", "direction"],
    response: `We're located at ${HOSPITAL.addressLines.join(", ")}. Would you like directions?`,
  },
  {
    keywords: ["phone", "call", "number", "contact"],
    response: `You can call us at ${HOSPITAL.phoneDisplay} or WhatsApp us. We're happy to help!`,
  },
  {
    keywords: ["doctor", "specialist", "physician"],
    response: "We have experienced doctors for General Medicine, Neurology, Pediatrics, Diagnostics, Physiotherapy, and Emergency Care. What specialty do you need?",
  },
];

const DEPARTMENTS = [
  "General Medicine",
  "Neurology", 
  "Pediatrics",
  "Diagnostics",
  "Physiotherapy",
  "Emergency Care",
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([
    {
      text: `Hello! I'm your virtual assistant for ${HOSPITAL.name}. How can I help you today?`,
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [conversationState, setConversationState] = useState<ConversationState>("idle");
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addBotMessage = (text: string) => {
    setTimeout(() => {
      setMessages((prev) => [...prev, { text, isBot: true }]);
    }, 800);
  };

  const sendAppointmentEmail = async (data: AppointmentData) => {
    try {
      const response = await fetch("/api/send-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        console.error("Failed to send email:", result.error);
        // Fallback to mailto if API fails
        const emailBody = `
New Appointment Request

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email || "Not provided"}
Department: ${data.department}
Date: ${data.date}
Time: ${data.time}
${data.message ? `Message: ${data.message}` : ""}
        `.trim();
        const mailtoLink = `mailto:saharamedicoserajgarh@gmail.com?subject=${encodeURIComponent(`Appointment Request - ${data.name}`)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;
      }
    } catch (error) {
      console.error("Error sending appointment:", error);
      // Fallback to mailto on error
      const emailBody = `
New Appointment Request

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email || "Not provided"}
Department: ${data.department}
Date: ${data.date}
Time: ${data.time}
${data.message ? `Message: ${data.message}` : ""}
      `.trim();
      const mailtoLink = `mailto:saharamedicoserajgarh@gmail.com?subject=${encodeURIComponent(`Appointment Request - ${data.name}`)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
    }
  };

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    setMessages((prev) => [...prev, { text: messageText, isBot: false }]);
    setInput("");

    // Handle appointment booking flow
    if (conversationState !== "idle") {
      handleAppointmentFlow(messageText);
      return;
    }

    // Check if user wants to book appointment
    const lowerInput = messageText.toLowerCase();
    if (lowerInput.includes("appointment") || lowerInput.includes("book") || lowerInput.includes("schedule")) {
      addBotMessage("Great! I'll help you book an appointment. Let's start with your details.\n\nWhat is your full name?");
      setConversationState("collecting_name");
      return;
    }

    // Regular FAQ handling
    const match = FAQ_RESPONSES.find((faq) =>
      faq.keywords.some((keyword) => lowerInput.includes(keyword))
    );

    const botResponse = match
      ? match.response
      : `I understand you're asking about "${messageText}". For detailed information, please call us at ${HOSPITAL.phoneDisplay} or WhatsApp. I can also help you book an appointment - just say "book appointment"!`;

    addBotMessage(botResponse);
  };

  const handleAppointmentFlow = (userInput: string) => {
    const trimmedInput = userInput.trim();

    switch (conversationState) {
      case "collecting_name":
        setAppointmentData({ ...appointmentData, name: trimmedInput });
        addBotMessage(`Thank you, ${trimmedInput}! Now, please provide your phone number (e.g., +91 XXXXX XXXXX)`);
        setConversationState("collecting_phone");
        break;

      case "collecting_phone":
        setAppointmentData({ ...appointmentData, phone: trimmedInput });
        addBotMessage("Great! Would you like to provide your email address? (Type 'skip' if you don't want to provide)");
        setConversationState("collecting_email");
        break;

      case "collecting_email":
        if (trimmedInput.toLowerCase() !== "skip") {
          setAppointmentData({ ...appointmentData, email: trimmedInput });
        }
        addBotMessage(`Which department do you need?\n\n${DEPARTMENTS.map((d, i) => `${i + 1}. ${d}`).join("\n")}\n\nPlease type the number or department name.`);
        setConversationState("collecting_department");
        break;

      case "collecting_department":
        let department = trimmedInput;
        const deptNum = parseInt(trimmedInput);
        if (!isNaN(deptNum) && deptNum >= 1 && deptNum <= DEPARTMENTS.length) {
          department = DEPARTMENTS[deptNum - 1];
        }
        setAppointmentData({ ...appointmentData, department });
        addBotMessage("What is your preferred date? (Format: YYYY-MM-DD or DD/MM/YYYY)");
        setConversationState("collecting_date");
        break;

      case "collecting_date":
        setAppointmentData({ ...appointmentData, date: trimmedInput });
        addBotMessage("What time would you prefer? (e.g., 10:00 AM, 2:30 PM, or 14:30)");
        setConversationState("collecting_time");
        break;

      case "collecting_time":
        setAppointmentData({ ...appointmentData, time: trimmedInput });
        addBotMessage("Would you like to add any additional message about your symptoms or requirements? (Type 'skip' if not needed)");
        setConversationState("collecting_message");
        break;

      case "collecting_message":
        const finalData = {
          ...appointmentData,
          message: trimmedInput.toLowerCase() === "skip" ? undefined : trimmedInput,
        };
        setAppointmentData(finalData);
        
        const confirmText = `Perfect! Let me confirm your appointment details:\n\n📋 Name: ${finalData.name}\n📞 Phone: ${finalData.phone}\n${finalData.email ? `📧 Email: ${finalData.email}\n` : ""}🏥 Department: ${finalData.department}\n📅 Date: ${finalData.date}\n🕐 Time: ${finalData.time}\n${finalData.message ? `💬 Message: ${finalData.message}\n` : ""}\nIs this information correct? Reply 'yes' to confirm or 'no' to start over.`;
        
        addBotMessage(confirmText);
        setConversationState("confirming");
        break;

      case "confirming":
        if (trimmedInput.toLowerCase() === "yes" || trimmedInput.toLowerCase() === "y") {
          setIsSubmitting(true);
          addBotMessage("✅ Excellent! I'm sending your appointment request now...");
          
          setTimeout(() => {
            sendAppointmentEmail(appointmentData as AppointmentData);
            addBotMessage(`✨ Your appointment request has been sent to our team at ${HOSPITAL.name}!\n\nWe will contact you at ${appointmentData.phone} within 24 hours to confirm your appointment.\n\nFor urgent matters, please call ${HOSPITAL.phoneDisplay}.\n\nIs there anything else I can help you with?`);
            setConversationState("idle");
            setAppointmentData({});
            setIsSubmitting(false);
          }, 1500);
        } else {
          addBotMessage("No problem! Let's start over. What is your full name?");
          setAppointmentData({});
          setConversationState("collecting_name");
        }
        break;
    }
  };

  const handleQuickAction = (label: string) => {
    if (label === "Appointment") {
      handleSend("I want to book an appointment");
      return;
    }
    handleSend(label);
  };

  return (
    <>
      {/* Floating Button - Icon Only */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-secondary/20 bg-gradient-to-r from-secondary to-secondary-hover shadow-2xl transition-all hover:scale-110 hover:shadow-secondary/50 animate-[pulse-glow_2s_ease-in-out_infinite] sm:h-16 sm:w-16"
          aria-label="Open AI Assistant"
        >
          <Bot className="h-7 w-7 text-white transition-transform group-hover:rotate-12 sm:h-8 sm:w-8" strokeWidth={2.5} />
        </button>
      )}

      {/* Chat Window - Responsive */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex w-[90vw] max-w-[380px] flex-col rounded-3xl border-2 border-border bg-background shadow-2xl animate-[slide-up_0.3s_ease-out]">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 rounded-t-3xl border-b-2 border-border bg-gradient-to-r from-secondary to-secondary-hover px-4 py-3 sm:px-5 sm:py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Bot className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-sm font-bold text-white">AI Assistant</div>
                <div className="flex items-center gap-1 text-xs text-white/80">
                  <span className="inline-flex h-2 w-2 rounded-full bg-green-400"></span>
                  Online Now
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-white/30"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages - Auto-scroll */}
          <div className="flex h-[300px] flex-col gap-3 overflow-y-auto p-4 scrollbar-thin sm:h-[400px] sm:p-5">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isBot ? "justify-start" : "justify-end"} animate-[slide-up_0.3s_ease-out]`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-md sm:max-w-[80%] sm:px-4 sm:py-3 ${
                    msg.isBot
                      ? "border-2 border-primary/20 bg-primary-light text-slate-800"
                      : "bg-gradient-to-r from-secondary to-secondary-hover text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isSubmitting && (
              <div className="flex justify-start">
                <div className="rounded-2xl border-2 border-primary/20 bg-primary-light px-4 py-3 text-sm text-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0.2s" }}></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="border-t-2 border-border px-4 py-3 sm:px-5">
            <div className="text-xs font-semibold text-slate-600 mb-2">Quick Actions:</div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Appointment", icon: "📅" },
                { label: "Services", icon: "🏥" },
                { label: "Emergency", icon: "🚨" },
                { label: "Location", icon: "📍" },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleQuickAction(action.label)}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-border bg-background px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:border-primary hover:bg-primary-light active:scale-95 disabled:opacity-50"
                >
                  <span>{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 rounded-b-3xl border-t-2 border-border bg-muted p-3 sm:p-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isSubmitting && handleSend()}
              placeholder="Type your message..."
              disabled={isSubmitting}
              className="flex-1 rounded-full border-2 border-border bg-background px-3 py-2 text-sm font-medium text-foreground placeholder:text-slate-500 focus:border-primary focus:outline-none disabled:opacity-50 sm:px-4"
            />
            <button
              onClick={() => handleSend()}
              disabled={isSubmitting}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-md transition-all hover:scale-110 hover:shadow-lg active:scale-95 disabled:opacity-50 sm:h-10 sm:w-10"
            >
              <Send className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
            </button>
          </div>

          {/* Footer */}
          <div className="rounded-b-3xl bg-slate-900 px-4 py-2.5 text-center sm:px-5 sm:py-3">
            <a
              href={whatsappLink(`Hello! I need assistance.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-white hover:underline"
            >
              💬 Chat with a real person on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
