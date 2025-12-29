"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, X, Send } from "lucide-react";
import { HOSPITAL, whatsappLink } from "./site-constants";

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
    keywords: ["appointment", "book", "schedule"],
    response: `To book an appointment, please call ${HOSPITAL.phoneDisplay} or WhatsApp us. Our staff will schedule you with the appropriate doctor.`,
  },
  {
    keywords: ["emergency", "urgent", "immediate"],
    response: `For emergencies, call ${HOSPITAL.phoneDisplay} immediately! We have 24/7 emergency services.`,
  },
  {
    keywords: ["doctor", "specialist", "physician"],
    response: "We have experienced doctors for General Medicine, Neurology, Pediatrics, and more. What specialty do you need?",
  },
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    setMessages((prev) => [...prev, { text: messageText, isBot: false }]);
    setInput("");

    // Find matching response
    setTimeout(() => {
      const lowerInput = messageText.toLowerCase();
      const match = FAQ_RESPONSES.find((faq) =>
        faq.keywords.some((keyword) => lowerInput.includes(keyword))
      );

      const botResponse = match
        ? match.response
        : `I understand you're asking about "${messageText}". For detailed information, please call us at ${HOSPITAL.phoneDisplay} or WhatsApp. Our team will be happy to assist you!`;

      setMessages((prev) => [...prev, { text: botResponse, isBot: true }]);
    }, 800);
  };

  const handleQuickAction = (label: string) => {
    handleSend(label);
  };

  return (
    <>
      {/* Floating Button - Icon Only */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group fixed bottom-28 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-secondary/20 bg-gradient-to-r from-secondary to-secondary-hover shadow-2xl transition-all hover:scale-110 hover:shadow-secondary/50 animate-[pulse-glow_2s_ease-in-out_infinite] sm:h-16 sm:w-16"
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
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-md sm:max-w-[80%] sm:px-4 sm:py-3 ${
                    msg.isBot
                      ? "border-2 border-primary/20 bg-primary-light text-slate-800"
                      : "bg-gradient-to-r from-secondary to-secondary-hover text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="border-t-2 border-border px-4 py-3 sm:px-5">
            <div className="text-xs font-semibold text-slate-600 mb-2">Quick Actions:</div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Services", icon: "🏥" },
                { label: "Appointment", icon: "📅" },
                { label: "Emergency", icon: "🚨" },
                { label: "Location", icon: "📍" },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleQuickAction(action.label)}
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-border bg-background px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:border-primary hover:bg-primary-light active:scale-95"
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
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 rounded-full border-2 border-border bg-background px-3 py-2 text-sm font-medium text-foreground placeholder:text-slate-500 focus:border-primary focus:outline-none sm:px-4"
            />
            <button
              onClick={() => handleSend()}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-md transition-all hover:scale-110 hover:shadow-lg active:scale-95 sm:h-10 sm:w-10"
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
