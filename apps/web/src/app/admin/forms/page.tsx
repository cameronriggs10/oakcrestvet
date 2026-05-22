"use client";
import { useState } from "react";
import { FileText, Upload, Send, Eye, Download, Search, Plus, Check, X, Edit3, Users } from "lucide-react";

interface IntakeForm {
  id: number;
  name: string;
  version: string;
  lastUpdated: string;
  status: "active" | "draft";
  sentCount: number;
}

const initialForms: IntakeForm[] = [
  { id: 1, name: "New Patient Intake Form (Standard)", version: "v2.1", lastUpdated: "May 1, 2025", status: "active", sentCount: 47 },
  { id: 2, name: "New Patient Intake Form (Cats Only)", version: "v1.3", lastUpdated: "Apr 15, 2025", status: "draft", sentCount: 12 },
  { id: 3, name: "Surgery Consent Form", version: "v3.0", lastUpdated: "Mar 20, 2025", status: "active", sentCount: 89 },
];

const recentSends = [
  { email: "john.doe@email.com", pet: "Max", form: "New Patient Intake Form (Standard)", sent: "May 19, 2025", status: "Opened" },
  { email: "sarah.m@email.com", pet: "Luna", form: "New Patient Intake Form (Cats Only)", sent: "May 18, 2025", status: "Completed" },
  { email: "mike.r@email.com", pet: "Cooper", form: "New Patient Intake Form (Standard)", sent: "May 17, 2025", status: "Pending" },
];

export default function AdminForms() {
  const [search, setSearch] = useState("");
  const [showSend, setShowSend] = useState(false);
  const [sendEmail, setSendEmail] = useState("");
  const [sendPet, setSendPet] = useState("");
  const [sendForm, setSendForm] = useState(initialForms[0].name);
  const [sentConfirm, setSentConfirm] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const handleSendForm = () => {
    if (!sendEmail || !sendPet) return;
    setSentConfirm(true);
    setTimeout(() => setSentConfirm(false), 3000);
    setShowSend(false);
    setSendEmail("");
    setSendPet("");
  };

  const startEdit = (id: number) => {
    setEditing(id);
    setEditContent(`# New Patient Intake Form\n\n## Owner Information\n- Full Name: _______________\n- Email: _______________\n- Phone: _______________\n- Address: _______________\n\n## Pet Information\n- Pet Name: _______________\n- Species: _______________\n- Breed: _______________\n- Age: _______________\n- Weight: _______________\n\n## Medical History\n- Current Medications: _______________\n- Allergies: _______________\n- Previous Vet: _______________\n- Reason for Visit: _______________\n\n## Emergency Contact\n- Name: _______________\n- Phone: _______________\n\n## Signature\n- Owner Signature: _______________\n- Date: _______________`);
  };

  return (
    <>
      <div className="bg-white border-b border-sage-200 px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-sage-900">Patient Forms</h1>
          <p className="text-sm text-sage-500 mt-1">Manage intake forms, send to clients, and auto-send on initial booking</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600">
          <Plus className="w-4 h-4" /> New Form
        </button>
      </div>

      <div className="p-8 space-y-8">
        {/* Auto-Send Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-blue-900">Auto-Send is Active ✅</h3>
              <p className="text-sm text-blue-700 mt-1">
                When a new client books their first appointment, the <strong>"{initialForms[0].name}"</strong> form is automatically sent to their email. 
                They receive a link to complete the paperwork before their visit.
              </p>
            </div>
          </div>
        </div>

        {/* Form Templates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {initialForms.map((form) => (
            <div key={form.id} className="bg-white rounded-2xl border border-sage-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-600" />
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${form.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                  {form.status}
                </span>
              </div>
              <h3 className="font-semibold text-sm text-sage-900">{form.name}</h3>
              <p className="text-xs text-sage-500 mt-1">{form.version} • Updated {form.lastUpdated}</p>
              <p className="text-xs text-sage-400 mt-1">{form.sentCount} times sent</p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => startEdit(form.id)} className="flex items-center gap-1 px-3 py-1.5 text-xs bg-sage-100 text-sage-700 rounded-lg hover:bg-sage-200">
                  <Edit3 className="w-3 h-3" /> Edit
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 text-xs bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100">
                  <Eye className="w-3 h-3" /> Preview
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 text-xs bg-green-50 text-green-600 rounded-lg hover:bg-green-100" onClick={() => { setShowSend(true); setSendForm(form.name); }}>
                  <Send className="w-3 h-3" /> Send
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Send Form Modal */}
        {showSend && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowSend(false)}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sage-900">Send Form</h3>
                <button onClick={() => setShowSend(false)}><X className="w-4 h-4 text-sage-400" /></button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-sage-700 mb-1 block">Form</label>
                  <select value={sendForm} onChange={e => setSendForm(e.target.value)} className="w-full px-3 py-2 border border-sage-200 rounded-lg text-sm">
                    {initialForms.map(f => <option key={f.id}>{f.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-sage-700 mb-1 block">Client Email</label>
                  <input value={sendEmail} onChange={e => setSendEmail(e.target.value)} placeholder="client@email.com" className="w-full px-3 py-2 border border-sage-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-sage-700 mb-1 block">Pet Name</label>
                  <input value={sendPet} onChange={e => setSendPet(e.target.value)} placeholder="Pet name" className="w-full px-3 py-2 border border-sage-200 rounded-lg text-sm" />
                </div>
                <button onClick={handleSendForm} className="w-full py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Send Form
                </button>
              </div>
            </div>
          </div>
        )}

        {sentConfirm && (
          <div className="fixed bottom-6 right-6 bg-green-50 border border-green-200 rounded-xl p-4 shadow-lg text-sm text-green-700 flex items-center gap-2 z-50">
            <Check className="w-4 h-4" /> Form sent successfully to {sendEmail}!
          </div>
        )}

        {/* Edit Form Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setEditing(null)}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sage-900">Edit Form</h3>
                <button onClick={() => setEditing(null)}><X className="w-4 h-4 text-sage-400" /></button>
              </div>
              <textarea value={editContent} onChange={e => setEditContent(e.target.value)}
                className="w-full h-80 px-4 py-3 border border-sage-200 rounded-xl text-sm font-mono" />
              <div className="flex gap-2 mt-4 justify-end">
                <button onClick={() => setEditing(null)} className="px-4 py-2 border border-sage-200 rounded-lg text-sm">Cancel</button>
                <button onClick={() => { setEditing(null); }} className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm">Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {/* Recent Sends */}
        <div className="bg-white rounded-2xl border border-sage-100">
          <div className="px-6 py-4 border-b border-sage-100">
            <h2 className="font-semibold text-sage-900">Recent Form Sends</h2>
          </div>
          <div className="divide-y divide-sage-50">
            {recentSends.map((s) => (
              <div key={s.email + s.pet} className="px-6 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-sage-900">{s.email} <span className="text-sage-400">- {s.pet}</span></p>
                  <p className="text-xs text-sage-500">{s.form} • Sent {s.sent}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  s.status === "Completed" ? "bg-green-50 text-green-600" : 
                  s.status === "Opened" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                }`}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}