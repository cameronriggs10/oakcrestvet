"use client";
import { useState, useEffect } from "react";
import { Bell, Calendar, DollarSign, Heart, AlertCircle, Pill, MessageSquare, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Notification {
  id: number;
  type: "appointment" | "refill" | "promo" | "message" | "reminder";
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: 1, type: "appointment", title: "Appointment Confirmed", message: "Max's Annual Wellness Exam on May 25, 2025 at 10:30 AM", date: "May 18, 2025", read: false },
  { id: 2, type: "reminder", title: "Upcoming Appointment", message: "Max's checkup is in 5 days on May 25th", date: "May 20, 2025", read: false },
  { id: 3, type: "promo", title: "Summer Special! 🎉", message: "20% off Dental Cleaning this month. Book now!", date: "May 15, 2025", read: false },
  { id: 4, type: "refill", title: "Refill Available", message: "Max's heartworm prevention is due for a refill", date: "May 10, 2025", read: true },
  { id: 5, type: "message", title: "New Message from Clinic", message: "Dr. Tibbs responded to your question about Max's diet", date: "May 8, 2025", read: true },
  { id: 6, type: "appointment", title: "Appointment Completed", message: "Luna's vaccination follow-up was completed", date: "April 15, 2025", read: true },
];

const typeIcons: Record<string, any> = {
  appointment: Calendar,
  refill: Pill,
  promo: DollarSign,
  message: MessageSquare,
  reminder: AlertCircle,
};

const typeColors: Record<string, string> = {
  appointment: "bg-blue-50 text-blue-600",
  refill: "bg-green-50 text-green-600",
  promo: "bg-warm-50 text-warm-600",
  message: "bg-primary-50 text-primary-600",
  reminder: "bg-amber-50 text-amber-600",
};

export default function PortalNotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("All");
  const unread = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filtered = filter === "All" ? notifications : notifications.filter(n => n.type === filter.toLowerCase());

  return (
    <>
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-12">
        <div className="container-wide flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-white">Notifications</h1>
            <p className="text-primary-100 text-sm mt-1">Stay updated on appointments, refills, and clinic news</p>
          </div>
          {unread > 0 && (
            <button onClick={markAllRead} className="text-sm text-white/80 hover:text-white underline">
              Mark all read ({unread})
            </button>
          )}
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container-wide">
          {/* Filter */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-sage-500 mr-1">Filter:</span>
            {["All", "Appointment", "Refill", "Promo", "Message", "Reminder"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  filter === f ? "bg-primary-500 text-white" : "bg-sage-100 text-sage-600 hover:bg-sage-200"
                }`}
              >{f}</button>
            ))}
          </div>

          {/* Notification List */}
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-sage-100">
                <Bell className="w-12 h-12 text-sage-200 mx-auto mb-3" />
                <p className="text-sage-600 font-medium">No notifications yet</p>
                <p className="text-sm text-sage-400 mt-1">You'll see updates here about appointments, refills, and specials</p>
              </div>
            ) : (
              filtered.map((n) => {
                const Icon = typeIcons[n.type];
                const color = typeColors[n.type];
                return (
                  <div key={n.id} className={`bg-white rounded-2xl p-4 border transition-shadow hover:shadow-md ${n.read ? 'border-sage-100' : 'border-primary-200 bg-primary-50/30'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-sm text-sage-900">{n.title}</h3>
                            <p className="text-sm text-sage-600 mt-0.5">{n.message}</p>
                          </div>
                          {!n.read && <span className="w-2 h-2 bg-primary-500 rounded-full shrink-0 mt-2" />}
                        </div>
                        <p className="text-xs text-sage-400 mt-2">{n.date}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}