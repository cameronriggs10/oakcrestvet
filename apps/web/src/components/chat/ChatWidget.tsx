"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, PawPrint, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/Button";

const quickQuestions = [
  "What are your hours?",
  "How much does a checkup cost?",
  "Do you accept pet insurance?",
  "How do I book an appointment?",
];

interface Message {
  role: "user" | "bot";
  text: string;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "🐾 Welcome to Oak Crest Veterinary Services! I'm your virtual assistant. How can I help you today? You can ask about our services, hours, pricing, or book an appointment.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    // Simulate AI response with FAQ-based answers
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      setMessages((prev) => [...prev, { role: "bot", text: botResponse }]);
      setLoading(false);
    }, 800);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-all duration-300 flex items-center justify-center ${
          open ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-sage-200 flex flex-col transition-all duration-300 origin-bottom-right ${
          open ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
        style={{ maxHeight: "600px", height: "80vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sage-100 bg-primary-500 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm text-white">Oak Crest Assistant</p>
              <p className="text-xs text-white/70">Online • Typically replies instantly</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary-500 text-white rounded-br-md"
                    : "bg-sage-50 text-sage-800 rounded-bl-md"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-sage-50 text-sage-800 rounded-2xl rounded-bl-md px-4 py-2.5 text-sm">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <span className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-sage-400 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-1.5">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setInput(q);
                  }}
                  className="text-xs px-3 py-1.5 bg-sage-50 text-sage-600 rounded-full hover:bg-primary-50 hover:text-primary-600 border border-sage-200 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-3 border-t border-sage-100">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your question..."
              className="flex-1 px-4 py-2.5 text-sm border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="p-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("hour") || lower.includes("open") || lower.includes("time")) {
    return "Our clinic hours are:\n• Monday - Friday: 8AM - 6PM\n• Saturday: 9AM - 3PM\n• Sunday: Closed\n\nWe also offer extended hours on select days. Would you like to book an appointment?";
  }

  if (lower.includes("price") || lower.includes("cost") || lower.includes("fee") || lower.includes("checkup")) {
    return "Our standard wellness exam starts at $65. Pricing varies by service. We offer:\n• Wellness Exam: $65\n• Vaccinations: $25-$45 each\n• Dental Cleaning: $200-$400\n• Surgery: Varies\n\nWould you like to see our full pricing page or book a consultation?";
  }

  if (lower.includes("insurance") || lower.includes("pet insurance")) {
    return "Yes, we accept most major pet insurance plans! We work with:\n• Trupanion\n• Healthy Paws\n• Nationwide\n• Embrace\n• Many others\n\nWe can help you file claims. Visit our Pricing page for more details!";
  }

  if (lower.includes("book") || lower.includes("appointment") || lower.includes("schedule")) {
    return "You can book an appointment in several ways:\n1. 📅 Book online through our website\n2. 📞 Call us at (555) 123-4567\n3. 💻 Use the Client Portal\n\nWould you like me to help you schedule something?";
  }

  if (lower.includes("vaccin") || lower.includes("shot") || lower.includes("rabies")) {
    return "We offer a comprehensive vaccination program including:\n• Rabies (required by law)\n• DHPP (Distemper, Hepatitis, Parainfluenza, Parvovirus)\n• FVRCP (for cats)\n• Bordetella (kennel cough)\n• Leptospirosis\n\nVaccination schedules vary by age and lifestyle. We can create a custom plan for your pet!";
  }

  if (lower.includes("dental") || lower.includes("teeth") || lower.includes("clean")) {
    return "Dental health is crucial for your pet! We offer:\n• Professional dental cleaning\n• Dental X-rays\n• Extractions (if needed)\n• At-home care guidance\n\nSigns of dental issues: bad breath, yellow/brown teeth, difficulty eating. Would you like to schedule a dental checkup?";
  }

  if (lower.includes("new client") || lower.includes("new patient") || lower.includes("first time")) {
    return "Welcome! 🎉 As a new client, here's what to do:\n1. Visit our New Clients page to fill out intake paperwork\n2. Bring your pet's medical records (if available)\n3. Arrive 10-15 minutes early for your first visit\n\nClick on 'New Clients' in the menu to get started!";
  }

  if (lower.includes("portal") || lower.includes("login") || lower.includes("record")) {
    return "Our Client Portal allows you to:\n• View your pet's medical records\n• Book and manage appointments\n• Make payments\n• Access vaccination history\n\nVisit the Client Portal section to login or create an account!";
  }

  return "Thank you for reaching out! I'd be happy to help with that. For the most accurate information, you can also:\n\n1. 📞 Call us at (555) 123-4567\n2. ✉️ Email us at info@oakcrestvet.com\n3. 💻 Visit our website for more details\n\nIs there anything specific about this you'd like to know? Or would you like to book an appointment?";
}