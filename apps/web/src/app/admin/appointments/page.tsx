"use client";
import { useState } from "react";
import { Calendar, Search, Check, X, Clock, Filter, RefreshCw } from "lucide-react";

const initialAppointments = [
  { id: 1, pet: "Max", owner: "John D.", type: "Annual Wellness Exam", date: "2025-05-25", time: "10:30 AM", doctor: "Dr. Tibbs", status: "Confirmed" },
  { id: 2, pet: "Luna", owner: "Sarah M.", type: "Vaccination Follow-up", date: "2025-06-10", time: "2:00 PM", doctor: "Dr. Tibbs", status: "Pending" },
  { id: 3, pet: "Cooper", owner: "Mike R.", type: "Dental Cleaning", date: "2025-05-20", time: "11:00 AM", doctor: "Dr. Tibbs", status: "Confirmed" },
  { id: 4, pet: "Bella", owner: "Emily T.", type: "Sick Visit", date: "2025-05-20", time: "1:30 PM", doctor: "Dr. Tibbs", status: "Checked In" },
  { id: 5, pet: "Rocky", owner: "James K.", type: "Wellness Exam", date: "2025-05-21", time: "3:00 PM", doctor: "Dr. Tibbs", status: "Pending" },
  { id: 6, pet: "Daisy", owner: "Lisa W.", type: "Surgery - Spay", date: "2025-05-22", time: "8:00 AM", doctor: "Dr. Tibbs", status: "Scheduled" },
  { id: 7, pet: "Charlie", owner: "Rob P.", type: "Dental Cleaning", date: "2025-05-23", time: "9:30 AM", doctor: "Dr. Tibbs", status: "Pending" },
];

const statusStyles: Record<string, string> = {
  "Confirmed": "bg-blue-50 text-blue-600",
  "Pending": "bg-amber-50 text-amber-600",
  "Checked In": "bg-green-50 text-green-600",
  "Scheduled": "bg-primary-50 text-primary-600",
  "Cancelled": "bg-red-50 text-red-600",
  "Completed": "bg-sage-100 text-sage-600",
};

export default function AdminAppointments() {
  const [filter, setFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("all");
  const [dateSearch, setDateSearch] = useState("");
  const [dateRangeFrom, setDateRangeFrom] = useState("");
  const [dateRangeTo, setDateRangeTo] = useState("");
  const [appts, setAppts] = useState(initialAppointments);
  const [rescheduling, setRescheduling] = useState<number | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const todayStr = new Date().toISOString().split('T')[0];

  const filtered = appts.filter(a => {
    if (filter !== "All" && a.status !== filter) return false;
    if (dateFilter === "today" && a.date !== todayStr) return false;
    if (dateFilter === "range" && dateRangeFrom && dateRangeTo) {
      if (a.date < dateRangeFrom || a.date > dateRangeTo) return false;
    }
    if (dateFilter === "single" && dateSearch && a.date !== dateSearch) return false;
    return true;
  });

  const handleReschedule = (id: number) => {
    setRescheduling(id);
    const apt = appts.find(a => a.id === id);
    if (apt) {
      setNewDate(apt.date);
      setNewTime(apt.time);
    }
  };

  const confirmReschedule = (id: number) => {
    if (!newDate || !newTime) return;
    setAppts(prev => prev.map(a => a.id === id ? { ...a, date: newDate, time: newTime } : a));
    setRescheduling(null);
  };

  return (
    <>
      <div className="bg-white border-b border-sage-200 px-8 py-6">
        <h1 className="font-display text-2xl font-bold text-sage-900">Appointments</h1>
        <p className="text-sm text-sage-500 mt-1">Manage all clinic appointments</p>
      </div>

      <div className="p-8">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-sm text-sage-500 flex items-center gap-1"><Filter className="w-3 h-3" /> Status:</span>
        {["All", "Pending", "Confirmed", "Checked In", "Completed", "Cancelled"].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              filter === s ? "bg-primary-500 text-white" : "bg-sage-100 text-sage-600 hover:bg-sage-200"
            }`}
          >{s}</button>
        ))}
      </div>

      {/* Date Filter */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-sm text-sage-500"><Calendar className="w-3.5 h-3.5 inline" /> Date:</span>
        <button onClick={() => setDateFilter("all")}
          className={`px-3 py-1 text-xs rounded-full ${dateFilter === "all" ? "bg-primary-500 text-white" : "bg-sage-100 text-sage-600 hover:bg-sage-200"}`}>All</button>
        <button onClick={() => setDateFilter("today")}
          className={`px-3 py-1 text-xs rounded-full ${dateFilter === "today" ? "bg-primary-500 text-white" : "bg-sage-100 text-sage-600 hover:bg-sage-200"}`}>Today</button>
        <button onClick={() => setDateFilter("single")}
          className={`px-3 py-1 text-xs rounded-full ${dateFilter === "single" ? "bg-primary-500 text-white" : "bg-sage-100 text-sage-600 hover:bg-sage-200"}`}>Single Date</button>
        <button onClick={() => setDateFilter("range")}
          className={`px-3 py-1 text-xs rounded-full ${dateFilter === "range" ? "bg-primary-500 text-white" : "bg-sage-100 text-sage-600 hover:bg-sage-200"}`}>Date Range</button>

        {dateFilter === "single" && (
          <input type="date" value={dateSearch} onChange={e => setDateSearch(e.target.value)}
            className="px-3 py-1 border border-sage-200 rounded-lg text-xs" />
        )}
        {dateFilter === "range" && (
          <>
            <input type="date" value={dateRangeFrom} onChange={e => setDateRangeFrom(e.target.value)}
              className="px-3 py-1 border border-sage-200 rounded-lg text-xs" />
            <span className="text-xs text-sage-400">to</span>
            <input type="date" value={dateRangeTo} onChange={e => setDateRangeTo(e.target.value)}
              className="px-3 py-1 border border-sage-200 rounded-lg text-xs" />
          </>
        )}
        {dateFilter !== "all" && (
          <span className="text-xs text-sage-400">({filtered.length} appointments)</span>
        )}
      </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-sage-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-sage-50 text-left">
                <th className="px-6 py-3 font-medium text-sage-600">Pet</th>
                <th className="px-6 py-3 font-medium text-sage-600">Owner</th>
                <th className="px-6 py-3 font-medium text-sage-600">Type</th>
                <th className="px-6 py-3 font-medium text-sage-600">Date</th>
                <th className="px-6 py-3 font-medium text-sage-600">Time</th>
                <th className="px-6 py-3 font-medium text-sage-600">Doctor</th>
                <th className="px-6 py-3 font-medium text-sage-600">Status</th>
                <th className="px-6 py-3 font-medium text-sage-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-50">
              {filtered.map((apt) => (
                <tr key={apt.id} className="hover:bg-sage-50/50">
                  <td className="px-6 py-4 font-medium text-sage-900">{apt.pet}</td>
                  <td className="px-6 py-4 text-sage-600">{apt.owner}</td>
                  <td className="px-6 py-4 text-sage-700">{apt.type}</td>
                  <td className="px-6 py-4 text-sage-600">{apt.date}</td>
                  <td className="px-6 py-4 flex items-center gap-1"><Clock className="w-3 h-3 text-sage-400" />{apt.time}</td>
                  <td className="px-6 py-4 text-sage-600">{apt.doctor}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${statusStyles[apt.status] || ""}`}>{apt.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <button className="p-1.5 text-green-600 hover:bg-green-50 rounded" title="Confirm"><Check className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleReschedule(apt.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Reschedule"><RefreshCw className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 text-red-500 hover:bg-red-50 rounded" title="Cancel"><X className="w-3.5 h-3.5" /></button>
                    </div>
                    {rescheduling === apt.id && (
                      <div className="mt-2 flex gap-1">
                        <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)}
                          className="w-28 px-2 py-1 border border-blue-200 rounded text-xs" />
                        <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)}
                          className="w-20 px-2 py-1 border border-blue-200 rounded text-xs" />
                        <button onClick={() => confirmReschedule(apt.id)}
                          className="px-2 py-1 bg-blue-500 text-white rounded text-xs">Save</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Add */}
        <div className="mt-6 bg-white rounded-2xl border border-sage-100 p-6">
          <h2 className="font-semibold text-sage-900 mb-4">Quick Add Appointment</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <input placeholder="Pet name" className="px-3 py-2 border border-sage-200 rounded-lg text-sm" />
            <input placeholder="Owner" className="px-3 py-2 border border-sage-200 rounded-lg text-sm" />
            <input placeholder="Service type" className="px-3 py-2 border border-sage-200 rounded-lg text-sm" />
            <input type="date" className="px-3 py-2 border border-sage-200 rounded-lg text-sm" />
            <button className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600">Add</button>
          </div>
        </div>
      </div>
    </>
  );
}