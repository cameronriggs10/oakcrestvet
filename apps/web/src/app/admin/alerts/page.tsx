"use client";
import { useState } from "react";
import { Bell, Send, Mail, MessageSquare, Smartphone, Check } from "lucide-react";

export default function AdminAlerts() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ title: "", message: "", channels: ["email"], audience: "all" });

  const handleSend = () => {
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const toggleChannel = (ch: string) => {
    setForm(prev => ({
      ...prev,
      channels: prev.channels.includes(ch) 
        ? prev.channels.filter(c => c !== ch) 
        : [...prev.channels, ch]
    }));
  };

  const recentAlerts = [
    { title: "20% off Dental Cleaning", sent: "May 18, 2025", audience: "All Clients", channels: ["Email", "SMS"], opens: 342 },
    { title: "Heartworm Prevention Month", sent: "May 1, 2025", audience: "Dog Owners", channels: ["Email"], opens: 521 },
    { title: "Summer Heat Safety Tips", sent: "Apr 25, 2025", audience: "All Clients", channels: ["Email", "Push"], opens: 678 },
  ];

  return (
    <>
      <div className="bg-white border-b border-sage-200 px-8 py-6">
        <h1 className="font-display text-2xl font-bold text-sage-900">Send Alerts</h1>
        <p className="text-sm text-sage-500 mt-1">Push sales, specials, and important info to your clients</p>
      </div>

      <div className="p-8 space-y-8">
        {/* Compose Alert */}
        <div className="bg-white rounded-2xl border border-sage-100 p-6">
          <h2 className="font-semibold text-sage-900 mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary-500" /> New Alert Campaign
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-1">Alert Title</label>
              <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                placeholder="e.g., Summer Special: 20% Off Dental Cleaning"
                className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-sage-700 mb-1">Message</label>
              <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                placeholder="Write your message here..."
                rows={4}
                className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-2">Send Via</label>
                <div className="flex flex-wrap gap-2">
                  {["email", "sms", "push"].map((ch) => (
                    <button key={ch} onClick={() => toggleChannel(ch)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-colors ${
                        form.channels.includes(ch) 
                          ? "bg-primary-500 text-white" 
                          : "bg-sage-100 text-sage-600 hover:bg-sage-200"
                      }`}
                    >
                      {ch === "email" ? <Mail className="w-3.5 h-3.5" /> : ch === "sms" ? <MessageSquare className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
                      {ch === "email" ? "Email" : ch === "sms" ? "SMS Text" : "Push Notification"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-700 mb-2">Audience</label>
                <select value={form.audience} onChange={e => setForm({...form, audience: e.target.value})}
                  className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Clients</option>
                  <option value="dog">Dog Owners Only</option>
                  <option value="cat">Cat Owners Only</option>
                  <option value="overdue">Overdue Visits</option>
                  <option value="new">New Clients</option>
                </select>
              </div>
            </div>

            <button onClick={handleSend}
              className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
            >
              {sent ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              {sent ? "Sent Successfully!" : "Send Alert"}
            </button>
          </div>
        </div>

        {/* Recent Alerts History */}
        <div className="bg-white rounded-2xl border border-sage-100">
          <div className="px-6 py-4 border-b border-sage-100">
            <h2 className="font-semibold text-sage-900">Alert History</h2>
          </div>
          <div className="divide-y divide-sage-50">
            {recentAlerts.map((alert) => (
              <div key={alert.title} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-sage-900">{alert.title}</p>
                  <p className="text-xs text-sage-500">Sent {alert.sent} to {alert.audience}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {alert.channels.map(ch => (
                      <span key={ch} className="text-xs bg-sage-100 text-sage-600 px-2 py-0.5 rounded">{ch}</span>
                    ))}
                  </div>
                  <span className="text-xs text-sage-400">{alert.opens} opened</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}