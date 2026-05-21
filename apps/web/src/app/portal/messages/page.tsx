"use client";
import { useState, useEffect } from "react";
import { MessageSquare, Send, Paperclip, CheckCircle, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Simulated toggle from admin settings (in production, this comes from backend)
const MESSAGING_ENABLED = true;

const sampleMessages = [
  { id: 1, from: "client", text: "Hi, I have a question about Max's diet. He's been scratching more than usual lately.", date: "May 18, 2025", read: true },
  { id: 2, from: "clinic", text: "Hi John! Increased scratching could be allergies or dry skin. Is Max on any new food?", date: "May 18, 2025", read: true },
  { id: 3, from: "client", text: "No new food, but he's been spending more time outside lately.", date: "May 19, 2025", read: true },
  { id: 4, from: "clinic", text: "That could be seasonal allergies. We can do a quick skin test. Want to schedule a visit?", date: "May 19, 2025", read: true },
];

export default function PortalMessagesPage() {
  const [messages, setMessages] = useState(sampleMessages);
  const [newMsg, setNewMsg] = useState("");

  if (!MESSAGING_ENABLED) {
    return (
      <section className="py-16 text-center">
        <div className="container-wide max-w-md">
          <MessageSquare className="w-16 h-16 text-sage-200 mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-sage-900 mb-2">Messaging Unavailable</h1>
          <p className="text-sage-600">Messaging is currently disabled. Please call the clinic at (301) 773-9909.</p>
        </div>
      </section>
    );
  }

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), from: "client", text: newMsg, date: "Just now", read: true }]);
    setNewMsg("");
  };

  return (
    <>
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-12">
        <div className="container-wide">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white">Messages</h1>
          <p className="text-primary-100 text-sm mt-1">Communicate with the Oak Crest team</p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container-wide max-w-3xl">
          {/* Message Thread */}
          <div className="bg-white border border-sage-100 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-sage-100 bg-sage-50">
              <h2 className="font-semibold text-sage-900">Conversation with Clinic</h2>
              <p className="text-xs text-sage-500">Typically responds within 24 hours</p>
            </div>

            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "client" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] rounded-2xl p-3 ${
                    msg.from === "client" 
                      ? "bg-primary-500 text-white rounded-br-md" 
                      : "bg-sage-50 text-sage-800 rounded-bl-md"
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      {msg.from === "clinic" && <User className="w-3 h-3" />}
                      <span className="text-xs opacity-70">{msg.from === "client" ? "You" : "Oak Crest Vet"}</span>
                    </div>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.from === "client" ? "text-white/60" : "text-sage-400"}`}>{msg.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 border-t border-sage-100">
              <div className="flex gap-2">
                <input value={newMsg} onChange={e => setNewMsg(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2.5 border border-sage-200 rounded-xl text-sm"
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                />
                <button onClick={sendMessage} className="w-10 h-10 bg-primary-500 text-white rounded-xl hover:bg-primary-600 flex items-center justify-center">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}