"use client";
import { useState } from "react";
import { Calendar, Clock, MapPin, CheckCircle, AlertTriangle, RefreshCw, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const appointments = [
  { id: 1, date: "May 25, 2025", time: "10:30 AM", type: "Annual Wellness Exam", pet: "Max", doctor: "Dr. Jim Tibbs", status: "Confirmed", location: "Main Clinic" },
  { id: 2, date: "June 10, 2025", time: "2:00 PM", type: "Vaccination", pet: "Luna", doctor: "Dr. Jim Tibbs", status: "Confirmed", location: "Main Clinic" },
  { id: 3, date: "March 15, 2025", time: "11:00 AM", type: "Dental Cleaning", pet: "Max", doctor: "Dr. Jim Tibbs", status: "Completed", location: "Main Clinic" },
  { id: 4, date: "January 15, 2025", time: "9:30 AM", type: "Wellness Exam", pet: "Max", doctor: "Dr. Jim Tibbs", status: "Completed", location: "Main Clinic" },
];

const getHoursUntil = (dateStr: string) => {
  const aptDate = new Date(dateStr);
  const now = new Date();
  return Math.round((aptDate.getTime() - now.getTime()) / (1000 * 60 * 60));
};

export default function PortalAppointmentsPage() {
  const [rescheduling, setRescheduling] = useState<number | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [appts, setAppts] = useState(appointments);

  const handleReschedule = (id: number) => {
    const apt = appts.find(a => a.id === id);
    if (!apt) return;
    const hoursUntil = getHoursUntil(apt.date);
    if (hoursUntil < 48) {
      alert("⚠️ Appointments within 48 hours cannot be rescheduled online. Please call the clinic at (301) 773-9909.");
      return;
    }
    setRescheduling(id);
  };

  const confirmReschedule = (id: number) => {
    if (!newDate || !newTime) return;
    setAppts(prev => prev.map(a => a.id === id ? { ...a, date: newDate, time: newTime } : a));
    setRescheduling(null);
    setNewDate("");
    setNewTime("");
    alert("✅ Appointment rescheduled successfully!");
  };

  return (
    <>
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-12">
        <div className="container-wide flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-white">Appointments</h1>
            <p className="text-primary-100 text-sm mt-1">View, reschedule, or book new appointments</p>
          </div>
          <Link href="/booking"><Button className="bg-white text-primary-700 hover:bg-primary-50">Book New</Button></Link>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container-wide space-y-4">
          {appts.map((apt) => {
            const hoursUntil = getHoursUntil(apt.date);
            const canReschedule = apt.status === "Confirmed" && hoursUntil >= 48;
            const isNear = apt.status === "Confirmed" && hoursUntil < 48 && hoursUntil > 0;

            return (
              <div key={apt.id} className="bg-white border border-sage-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                      <Calendar className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sage-900">{apt.type}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-sage-500 mt-1">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {apt.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {apt.time}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {apt.location}</span>
                      </div>
                      <p className="text-xs text-sage-400 mt-1">Pet: {apt.pet} • {apt.doctor}</p>
                      {isNear && (
                        <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Within 48-hour window — call (301) 773-9909 to reschedule
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 ${
                      apt.status === "Confirmed" ? "bg-green-50 text-green-600" : "bg-sage-50 text-sage-500"
                    }`}>
                      <CheckCircle className="w-3.5 h-3.5" />
                      {apt.status}
                    </span>
                    {apt.status === "Confirmed" && (
                      <Button variant="outline" size="xs" onClick={() => handleReschedule(apt.id)}
                        className={!canReschedule ? "opacity-50 cursor-not-allowed" : ""}
                      >
                        <RefreshCw className="w-3 h-3 mr-1" /> Reschedule
                      </Button>
                    )}
                  </div>
                </div>

                {/* Reschedule Form */}
                {rescheduling === apt.id && (
                  <div className="mt-4 p-4 bg-primary-50 rounded-xl border border-primary-100">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-primary-800">Reschedule Appointment</p>
                      <button onClick={() => setRescheduling(null)}><X className="w-4 h-4 text-primary-600" /></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)}
                        className="px-3 py-2 border border-primary-200 rounded-lg text-sm" />
                      <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)}
                        className="px-3 py-2 border border-primary-200 rounded-lg text-sm" />
                      <Button onClick={() => confirmReschedule(apt.id)} size="sm">Confirm</Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}