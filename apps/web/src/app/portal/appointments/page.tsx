"use client";

import { Calendar, Clock, MapPin, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const appointments = [
  {
    id: 1,
    date: "May 25, 2025",
    time: "10:30 AM",
    type: "Annual Wellness Exam",
    pet: "Max",
    doctor: "Dr. Sarah Johnson",
    status: "Confirmed",
    location: "Main Clinic",
  },
  {
    id: 2,
    date: "June 10, 2025",
    time: "2:00 PM",
    type: "Vaccination",
    pet: "Luna",
    doctor: "Dr. Emily Rodriguez",
    status: "Confirmed",
    location: "Main Clinic",
  },
  {
    id: 3,
    date: "March 15, 2025",
    time: "11:00 AM",
    type: "Dental Cleaning",
    pet: "Max",
    doctor: "Dr. Michael Chen",
    status: "Completed",
    location: "Main Clinic",
  },
  {
    id: 4,
    date: "January 15, 2025",
    time: "9:30 AM",
    type: "Wellness Exam",
    pet: "Max",
    doctor: "Dr. Sarah Johnson",
    status: "Completed",
    location: "Main Clinic",
  },
];

export default function PortalAppointmentsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-12">
        <div className="container-wide">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-white">Appointments</h1>
              <p className="text-primary-100 text-sm mt-1">View and manage your appointments</p>
            </div>
            <Link href="/booking"><Button className="bg-white text-primary-700 hover:bg-primary-50">Book New</Button></Link>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container-wide">
          <div className="space-y-4">
            {appointments.map((apt) => (
              <div key={apt.id} className="bg-white border border-sage-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                      <Calendar className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sage-900">{apt.type}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-sage-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {apt.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {apt.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {apt.location}
                        </span>
                      </div>
                      <p className="text-xs text-sage-400 mt-1">
                        Pet: {apt.pet} • {apt.doctor}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 ${
                      apt.status === "Confirmed" 
                        ? "bg-green-50 text-green-600"
                        : "bg-sage-50 text-sage-500"
                    }`}>
                      {apt.status === "Confirmed" ? (
                        <CheckCircle className="w-3.5 h-3.5" />
                      ) : (
                        <CheckCircle className="w-3.5 h-3.5" />
                      )}
                      {apt.status}
                    </span>
                    {apt.status === "Confirmed" && (
                      <Button variant="outline" size="xs">Reschedule</Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}