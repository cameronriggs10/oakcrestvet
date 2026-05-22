"use client";
import { useState } from "react";
import { MessageSquare, Pill, FileText, Send, CheckCircle, X, User, Search, Filter, Clock, Plus, Reply } from "lucide-react";

type CommType = "all" | "message" | "refill" | "intake" | "alert";

interface CommItem {
  id: number;
  type: "message" | "refill" | "intake" | "alert";
  from: string;
  pet?: string;
  subject: string;
  message: string;
  date: string;
  status: "new" | "in-progress" | "completed";
  notes: string;
}

const initialComms: CommItem[] = [
  { id: 1, type: "message", from: "John D.", pet: "Max", subject: "Question about diet/scratching", message: "Hi, Max has been scratching more lately. Is it allergies?", date: "May 19, 2025", status: "in-progress", notes: "" },
  { id: 2, type: "refill", from: "Sarah M.", pet: "Luna", subject: "Heartworm Refill Request", message: "Need a refill of Revolution Plus for Luna", date: "May 18, 2025", status: "new", notes: "" },
  { id: 3, type: "message", from: "Mike R.", pet: "Cooper", subject: "Dental cleaning follow-up", message: "Cooper seems fine after the cleaning. When should we schedule next?", date: "May 17, 2025", status: "completed", notes: "Responded with 6-month recommendation" },
  { id: 4, type: "intake", from: "Lisa W.", pet: "Daisy", subject: "New Patient Intake Form", message: "New client registration for Daisy (Poodle, 1 yr old)", date: "May 16, 2025", status: "completed", notes: "Records created. Welcome call made." },
  { id: 5, type: "refill", from: "Emily T.", pet: "Bella", subject: "Flea Prevention Refill", message: "Need to refill Bella's flea medication - almost out", date: "May 15, 2025", status: "new", notes: "" },
];

// Predefined response templates
const quickReplies = [
  { label: "Refill Approved", text: "Your refill request has been approved. The medication will be ready for pickup within 24 hours. Please call ahead to confirm availability. Thank you!" },
  { label: "Refill - Need Exam", text: "A refill requires an updated examination. Your pet is due for a check-up before we can authorize this refill. Please schedule an appointment at your earliest convenience." },
  { label: "Appointment Confirmed", text: "Your appointment has been confirmed. Please arrive 10 minutes early. If you need to reschedule, please notify us at least 48 hours in advance." },
  { label: "General Health Advice", text: "Thank you for reaching out. Based on the symptoms described, we recommend scheduling an examination to properly diagnose the issue. In the meantime, monitor closely and contact us if symptoms worsen." },
  { label: "Intake Form Received", text: "Thank you for submitting your new patient intake form! We have received your paperwork and a member of our team will contact you within 24-48 hours to schedule your first appointment. Welcome to Oak Crest!" },
  { label: "Payment Follow-up", text: "This is a friendly reminder that you have an outstanding balance on your account. Please log into your client portal to view and pay your invoice. Thank you!" },
  { label: "Lab Results Ready", text: "Your pet's lab results are now available. Please schedule a follow-up appointment to review the results with the doctor. You can book through the client portal or call us." },
];

const typeIcons: Record<string, any> = { message: MessageSquare, refill: Pill, intake: FileText, alert: Send };
const typeColors: Record<string, string> = { message: "bg-blue-50 text-blue-600", refill: "bg-green-50 text-green-600", intake: "bg-primary-50 text-primary-600", alert: "bg-warm-50 text-warm-600" };
const statusColors: Record<string, string> = { "new": "bg-amber-50 text-amber-600", "in-progress": "bg-blue-50 text-blue-600", "completed": "bg-green-50 text-green-600" };

export default function AdminCommunications() {
  const [comms, setComms] = useState(initialComms);
  const [filter, setFilter] = useState<CommType>("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [responding, setResponding] = useState<number | null>(null);
  const [response, setResponse] = useState("");
  const [notes, setNotes] = useState("");
  const [search, setSearch] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(false);

  const filtered = comms.filter(c => {
    if (filter !== "all" && c.type !== filter) return false;
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    if (search && !c.from.toLowerCase().includes(search.toLowerCase()) && !c.subject.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const useQuickReply = (text: string) => {
    setResponse(text);
    setShowQuickReplies(false);
  };

  const handleRespond = (id: number) => {
    setComms(prev => prev.map(c => c.id === id ? { ...c, status: "in-progress", notes: notes || c.notes } : c));
    setResponding(null);
    setResponse("");
    setNotes("");
  };

  const markComplete = (id: number) => {
    setComms(prev => prev.map(c => c.id === id ? { ...c, status: "completed", notes: notes || c.notes } : c));
    setResponding(null);
    setResponse("");
    setNotes("");
  };

  return (
    <>
      <div className="bg-white border-b border-sage-200 px-8 py-6">
        <h1 className="font-display text-2xl font-bold text-sage-900">Client Communications</h1>
        <p className="text-sm text-sage-500 mt-1">Manage all client messages, refill requests, and intake forms</p>
      </div>

      <div className="p-8 space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-sage-500 flex items-center gap-1"><Filter className="w-3 h-3" /> Type:</span>
          {[
            { key: "all", label: "All" },
            { key: "message", label: "Messages" },
            { key: "refill", label: "Refill Requests" },
            { key: "intake", label: "Intake Forms" },
          ].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key as CommType)}
              className={`px-3 py-1 text-xs rounded-full ${filter === f.key ? "bg-primary-500 text-white" : "bg-sage-100 text-sage-600 hover:bg-sage-200"}`}
            >{f.label}</button>
          ))}
          <span className="text-sm text-sage-500 ml-4 mr-1">Status:</span>
          {["all", "new", "in-progress", "completed"].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 text-xs rounded-full ${statusFilter === s ? "bg-sage-700 text-white" : "bg-sage-100 text-sage-600 hover:bg-sage-200"}`}
            >{s === "in-progress" ? "In Progress" : s.charAt(0).toUpperCase() + s.slice(1)}</button>
          ))}
          <div className="ml-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-sage-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="pl-9 pr-3 py-1.5 border border-sage-200 rounded-lg text-xs w-48" />
          </div>
        </div>

        {/* Communication List */}
        <div className="space-y-3">
          {filtered.map((comm) => {
            const Icon = typeIcons[comm.type];
            const color = typeColors[comm.type];
            const isResponding = responding === comm.id;
            return (
              <div key={comm.id} className={`bg-white rounded-2xl border overflow-hidden ${
                comm.status === "new" ? "border-primary-200 ring-1 ring-primary-100" : "border-sage-100"
              }`}>
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-sm text-sage-900">{comm.subject}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[comm.type]}`}>{comm.type}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[comm.status]}`}>{comm.status}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-sage-500 mt-1">
                          <span className="flex items-center gap-1"><User className="w-3 h-3" /> {comm.from}</span>
                          {comm.pet && <span>🐾 {comm.pet}</span>}
                          <span><Clock className="w-3 h-3 inline" /> {comm.date}</span>
                        </div>
                        <p className="text-sm text-sage-700 mt-2">{comm.message}</p>
                        {comm.notes && (
                          <div className="mt-2 text-xs text-sage-500 bg-sage-50 rounded-lg p-2">
                            📝 Notes: {comm.notes}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={() => setResponding(isResponding ? null : comm.id)}
                        className="px-3 py-1.5 text-xs bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                        {comm.status === "completed" ? "View" : "Respond"}
                      </button>
                      {comm.status !== "completed" && (
                        <button onClick={() => markComplete(comm.id)}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded" title="Mark Complete">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Response Form */}
                  {isResponding && (
                    <div className="mt-4 pt-4 border-t border-sage-100 space-y-3">
                      {/* Quick Replies */}
                      <div className="relative">
                        <button onClick={() => setShowQuickReplies(!showQuickReplies)}
                          className="flex items-center gap-1.5 text-xs text-primary-600 hover:text-primary-700 mb-2">
                          <Plus className="w-3 h-3" /> Insert Quick Reply
                        </button>
                        {showQuickReplies && (
                          <div className="absolute z-10 left-0 top-8 bg-white border border-sage-200 rounded-xl shadow-lg p-2 w-80 max-h-64 overflow-y-auto">
                            <p className="text-xs font-medium text-sage-500 px-2 py-1">Predefined Responses</p>
                            {quickReplies.map((qr) => (
                              <button key={qr.label} onClick={() => useQuickReply(qr.text)}
                                className="block w-full text-left text-xs text-sage-700 hover:bg-primary-50 px-2 py-2 rounded-lg transition-colors">
                                <span className="font-medium text-sage-900">{qr.label}</span>
                                <p className="text-sage-500 truncate mt-0.5">{qr.text.substring(0, 60)}...</p>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <textarea value={response} onChange={e => setResponse(e.target.value)}
                        placeholder="Type your response..."
                        className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm" rows={3}
                      />
                      <div className="flex gap-2">
                        <input value={notes} onChange={e => setNotes(e.target.value)}
                          placeholder="Internal notes (only visible to staff)..."
                          className="flex-1 px-3 py-2 border border-sage-200 rounded-lg text-xs"
                        />
                        <button onClick={() => handleRespond(comm.id)}
                          className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm flex items-center gap-1">
                          <Send className="w-3 h-3" /> Send & Save
                        </button>
                        <button onClick={() => markComplete(comm.id)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Mark Complete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}