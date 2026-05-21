"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PawPrint, Calendar, FileText, CreditCard, Bell, Settings, Activity, Syringe, Heart, ChevronRight } from "lucide-react";

const quickActions = [
  { icon: Calendar, label: "Book Appointment", href: "/booking", color: "text-primary-600 bg-primary-50" },
  { icon: FileText, label: "Medical Records", href: "/portal/records", color: "text-accent-600 bg-accent-50" },
  { icon: CreditCard, label: "Make Payment", href: "#", color: "text-warm-600 bg-warm-50" },
  { icon: Bell, label: "Notifications", href: "#", color: "text-sage-600 bg-sage-50" },
];

const upcomingAppointments = [
  { 
    date: "May 25, 2025", time: "10:30 AM", 
    type: "Annual Wellness Exam", pet: "Max", 
    status: "Confirmed", doctor: "Dr. Johnson" 
  },
];

const pets = [
  { name: "Max", species: "Golden Retriever", age: 3, nextVisit: "May 25, 2025", image: null },
  { name: "Luna", species: "Domestic Shorthair", age: 5, nextVisit: "June 10, 2025", image: null },
];

export default function PortalDashboard() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-12">
        <div className="container-wide">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-white">My Dashboard</h1>
              <p className="text-primary-100 text-sm mt-1">Welcome back, pet parent!</p>
            </div>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-white/70 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link key={action.label} href={action.href} className="bg-white border border-sage-100 rounded-2xl p-4 text-center hover:shadow-md transition-shadow group">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${action.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-medium text-sage-700">{action.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Upcoming Appointments */}
              <div>
                <h2 className="font-semibold text-lg text-sage-900 mb-4">Upcoming Appointments</h2>
                {upcomingAppointments.length > 0 ? (
                  <div className="bg-white border border-sage-100 rounded-2xl overflow-hidden">
                    {upcomingAppointments.map((apt) => (
                      <div key={apt.pet + apt.date} className="p-5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sage-900">{apt.type}</p>
                            <p className="text-sm text-sage-500">{apt.date} at {apt.time}</p>
                            <p className="text-xs text-sage-400">Pet: {apt.pet} • Dr. {apt.doctor}</p>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                          {apt.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-sage-100 rounded-2xl p-8 text-center">
                    <Calendar className="w-10 h-10 text-sage-300 mx-auto mb-3" />
                    <p className="text-sage-600">No upcoming appointments</p>
                    <Link href="/booking"><Button size="sm" className="mt-3">Book Now</Button></Link>
                  </div>
                )}
              </div>

              {/* My Pets */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg text-sage-900">My Pets</h2>
                  <Link href="/portal/pets" className="text-sm text-primary-600 hover:underline">View All</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pets.map((pet) => (
                    <div key={pet.name} className="bg-white border border-sage-100 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                      <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center">
                        <PawPrint className="w-7 h-7 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sage-900">{pet.name}</h3>
                        <p className="text-xs text-sage-500">{pet.species} • {pet.age} years</p>
                        <p className="text-xs text-primary-600">Next visit: {pet.nextVisit}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-sage-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pet Health Card */}
              <div className="bg-white border border-sage-100 rounded-2xl p-5">
                <h3 className="font-semibold text-sage-900 mb-3">Pet Health Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Activity className="w-4 h-4 text-sage-400" />
                    <span className="text-sage-600">Vaccinations up to date</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Syringe className="w-4 h-4 text-sage-400" />
                    <span className="text-sage-600">Last checkup: 2 months ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Heart className="w-4 h-4 text-sage-400" />
                    <span className="text-sage-600">Heartworm prevention: Active</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white border border-sage-100 rounded-2xl p-5">
                <h3 className="font-semibold text-sage-900 mb-3">Quick Links</h3>
                <nav className="space-y-2">
                  {[
                    { label: "Pet Records", href: "/portal/records" },
                    { label: "Appointment History", href: "/portal/appointments" },
                    { label: "Billing & Payments", href: "#" },
                    { label: "Messages", href: "#" },
                  ].map((link) => (
                    <Link key={link.label} href={link.href} className="block text-sm text-sage-600 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Alert */}
              <div className="bg-accent-50 border border-accent-200 rounded-2xl p-5">
                <h3 className="font-semibold text-sage-900 mb-2">Reminder</h3>
                <p className="text-sm text-sage-600">Luna is due for her annual vaccination. Schedule an appointment soon!</p>
                <Link href="/booking"><Button size="sm" variant="secondary" className="mt-3">Book Now</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}