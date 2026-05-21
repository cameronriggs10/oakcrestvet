"use client";
import Link from "next/link";
import { Calendar, PawPrint, Users, Bell, DollarSign, TrendingUp, Clock, AlertCircle, FileText } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Clients", value: "1,247", icon: Users, change: "+12 this month", color: "bg-blue-50 text-blue-600" },
    { label: "Active Pets", value: "1,892", icon: PawPrint, change: "+23 this month", color: "bg-green-50 text-green-600" },
    { label: "Appointments", value: "38", icon: Calendar, change: "This week", color: "bg-primary-50 text-primary-600" },
    { label: "Revenue (MTD)", value: "$24,580", icon: DollarSign, change: "+8% vs last month", color: "bg-warm-50 text-warm-600" },
  ];

  const todayAppointments = [
    { time: "9:00 AM", pet: "Max", owner: "John D.", type: "Annual Wellness Exam", status: "Checked In" },
    { time: "10:30 AM", pet: "Luna", owner: "Sarah M.", type: "Vaccination Follow-up", status: "Confirmed" },
    { time: "11:00 AM", pet: "Cooper", owner: "Mike R.", type: "Dental Cleaning", status: "Confirmed" },
    { time: "1:30 PM", pet: "Bella", owner: "Emily T.", type: "Sick Visit", status: "Pending" },
    { time: "3:00 PM", pet: "Rocky", owner: "James K.", type: "Wellness Exam", status: "Pending" },
  ];

  return (
    <>
      <div className="bg-white border-b border-sage-200 px-8 py-6">
        <h1 className="font-display text-2xl font-bold text-sage-900">Admin Dashboard</h1>
        <p className="text-sm text-sage-500 mt-1">Welcome back! Here is your clinic at a glance.</p>
      </div>

      <div className="p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-2xl p-5 border border-sage-100">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-sage-900">{stat.value}</p>
                <p className="text-sm text-sage-600">{stat.label}</p>
                <p className="text-xs text-green-600 mt-1">{stat.change}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Appointments */}
          <div className="bg-white rounded-2xl border border-sage-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-sage-100">
              <h2 className="font-semibold text-sage-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-500" /> Today's Appointments
              </h2>
              <Link href="/admin/appointments" className="text-sm text-primary-600 hover:underline">Manage All</Link>
            </div>
            <div className="divide-y divide-sage-50">
              {todayAppointments.map((apt) => (
                <div key={apt.time + apt.pet} className="px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-sage-900 w-16">{apt.time}</span>
                    <div>
                      <p className="text-sm font-medium text-sage-900">{apt.pet}</p>
                      <p className="text-xs text-sage-500">{apt.owner} • {apt.type}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    apt.status === "Checked In" ? "bg-green-50 text-green-600" :
                    apt.status === "Confirmed" ? "bg-blue-50 text-blue-600" :
                    "bg-amber-50 text-amber-600"
                  }`}>
                    {apt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-sage-100 p-6">
              <h2 className="font-semibold text-sage-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/admin/appointments" className="p-4 bg-primary-50 rounded-xl text-center hover:bg-primary-100 transition-colors">
                  <Calendar className="w-6 h-6 text-primary-600 mx-auto mb-1" />
                  <span className="text-sm font-medium text-sage-700">New Appointment</span>
                </Link>
                <Link href="/admin/records" className="p-4 bg-accent-50 rounded-xl text-center hover:bg-accent-100 transition-colors">
                  <FileText className="w-6 h-6 text-accent-600 mx-auto mb-1" />
                  <span className="text-sm font-medium text-sage-700">Upload Records</span>
                </Link>
                <Link href="/admin/alerts" className="p-4 bg-warm-50 rounded-xl text-center hover:bg-warm-100 transition-colors">
                  <Bell className="w-6 h-6 text-warm-600 mx-auto mb-1" />
                  <span className="text-sm font-medium text-sage-700">Send Alert</span>
                </Link>
                <Link href="/admin/pets" className="p-4 bg-green-50 rounded-xl text-center hover:bg-green-100 transition-colors">
                  <PawPrint className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <span className="text-sm font-medium text-sage-700">Pet Records</span>
                </Link>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white rounded-2xl border border-sage-100 p-6">
              <h2 className="font-semibold text-sage-900 mb-3">Recent Alerts Sent</h2>
              <div className="space-y-2">
                {[
                  { msg: "20% off Dental Cleaning - May special", sent: "2 days ago", status: "active" },
                  { msg: "Reminder: Heartworm prevention month", sent: "1 week ago", status: "active" },
                ].map((alert) => (
                  <div key={alert.msg} className="flex items-center gap-2 text-sm">
                    <Bell className="w-3 h-3 text-primary-500" />
                    <span className="text-sage-700 flex-1">{alert.msg}</span>
                    <span className="text-xs text-sage-400">{alert.sent}</span>
                    <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">Active</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}