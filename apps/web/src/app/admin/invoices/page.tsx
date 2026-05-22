"use client";
import { useState } from "react";
import { DollarSign, Plus, FileText, Send, Check, Search, X, Trash2, Printer } from "lucide-react";

interface LineItem {
  id: number;
  service: string;
  description: string;
  qty: number;
  rate: number;
}

const serviceCatalog = [
  { service: "Wellness Exam", rate: 65 },
  { service: "Annual Wellness Exam", rate: 85 },
  { service: "Vaccination - Rabies", rate: 25 },
  { service: "Vaccination - DHPP", rate: 35 },
  { service: "Vaccination - FVRCP", rate: 35 },
  { service: "Vaccination - Bordetella", rate: 30 },
  { service: "Dental Cleaning", rate: 200 },
  { service: "Dental Cleaning with Extractions", rate: 350 },
  { service: "Spay/Neuter - Dog", rate: 350 },
  { service: "Spay/Neuter - Cat", rate: 250 },
  { service: "Surgery - Soft Tissue", rate: 400 },
  { service: "Surgery - Orthopedic", rate: 800 },
  { service: "Heartworm Test", rate: 45 },
  { service: "Fecal Exam", rate: 35 },
  { service: "Blood Work Panel", rate: 120 },
  { service: "X-Ray (per view)", rate: 95 },
  { service: "Ultrasound", rate: 250 },
  { service: "Microchipping", rate: 50 },
  { service: "Nail Trim", rate: 20 },
  { service: "Ear Cleaning", rate: 25 },
  { service: "Gland Expression", rate: 25 },
  { service: "Hospitalization (per day)", rate: 150 },
  { service: "Prescription Refill - Heartgard", rate: 15 },
  { service: "Prescription Refill - NexGard", rate: 25 },
  { service: "Prescription Refill - Revolution", rate: 20 },
  { service: "Euthanasia", rate: 150 },
  { service: "Cremation - Private", rate: 200 },
  { service: "Cremation - Communal", rate: 80 },
];

const clients = [
  { pet: "Max", owner: "John D." },
  { pet: "Luna", owner: "Sarah M." },
  { pet: "Cooper", owner: "Mike R." },
  { pet: "Bella", owner: "Emily T." },
  { pet: "Rocky", owner: "James K." },
  { pet: "Daisy", owner: "Lisa W." },
];

const sentInvoices = [
  { id: "INV-2025-001", client: "John D.", pet: "Max", amount: 185, date: "May 15, 2025", status: "Paid" },
  { id: "INV-2025-002", client: "Sarah M.", pet: "Luna", amount: 95, date: "May 10, 2025", status: "Sent" },
  { id: "INV-2025-003", client: "Mike R.", pet: "Cooper", amount: 350, date: "May 5, 2025", status: "Overdue" },
];

export default function AdminInvoices() {
  const [step, setStep] = useState<"create" | "sent">("sent");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedPet, setSelectedPet] = useState("");
  const [items, setItems] = useState<LineItem[]>([{ id: 1, service: "", description: "", qty: 1, rate: 0 }]);
  const [searchService, setSearchService] = useState("");
  const [showCatalog, setShowCatalog] = useState<number | null>(null);
  const [sent, setSent] = useState(false);

  const addItem = () => {
    setItems(prev => [...prev, { id: Date.now(), service: "", description: "", qty: 1, rate: 0 }]);
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateItem = (id: number, field: keyof LineItem, value: any) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const selectService = (itemId: number, svc: typeof serviceCatalog[0]) => {
    updateItem(itemId, "service", svc.service);
    updateItem(itemId, "rate", svc.rate);
    updateItem(itemId, "description", svc.service);
    setShowCatalog(null);
  };

  const total = items.reduce((sum, i) => sum + (i.qty * i.rate), 0);

  const handleSendInvoice = () => {
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const filteredServices = serviceCatalog.filter(s => 
    s.service.toLowerCase().includes(searchService.toLowerCase())
  );

  return (
    <>
      <div className="bg-white border-b border-sage-200 px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-sage-900">Invoicing</h1>
          <p className="text-sm text-sage-500 mt-1">Create invoices for services provided — auto-added to client portal</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setStep("sent")} className={`px-4 py-2 rounded-xl text-sm ${step === "sent" ? "bg-primary-500 text-white" : "bg-sage-100 text-sage-600"}`}>
            Sent Invoices
          </button>
          <button onClick={() => setStep("create")} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm ${step === "create" ? "bg-primary-500 text-white" : "bg-sage-100 text-sage-600"}`}>
            <Plus className="w-4 h-4" /> New Invoice
          </button>
        </div>
      </div>

      <div className="p-8">
        {step === "sent" ? (
          <div className="bg-white rounded-2xl border border-sage-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-sage-50 text-left">
                  <th className="px-6 py-3 font-medium text-sage-600">Invoice #</th>
                  <th className="px-6 py-3 font-medium text-sage-600">Client</th>
                  <th className="px-6 py-3 font-medium text-sage-600">Pet</th>
                  <th className="px-6 py-3 font-medium text-sage-600">Amount</th>
                  <th className="px-6 py-3 font-medium text-sage-600">Date</th>
                  <th className="px-6 py-3 font-medium text-sage-600">Status</th>
                  <th className="px-6 py-3 font-medium text-sage-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-50">
                {sentInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-sage-50/50">
                    <td className="px-6 py-4 font-medium text-sage-900">{inv.id}</td>
                    <td className="px-6 py-4 text-sage-600">{inv.client}</td>
                    <td className="px-6 py-4 text-sage-600">{inv.pet}</td>
                    <td className="px-6 py-4 font-medium text-sage-900">${inv.amount}</td>
                    <td className="px-6 py-4 text-sage-600">{inv.date}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        inv.status === "Paid" ? "bg-green-50 text-green-600" :
                        inv.status === "Sent" ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"
                      }`}>{inv.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        <button className="p-1.5 text-sage-500 hover:bg-sage-100 rounded"><Printer className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 text-sage-500 hover:bg-sage-100 rounded"><Send className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="max-w-4xl space-y-6">
            {/* Client Selection */}
            <div className="bg-white rounded-2xl border border-sage-100 p-6">
              <h2 className="font-semibold text-sage-900 mb-4">Bill To</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select value={selectedClient} onChange={e => {
                  setSelectedClient(e.target.value);
                  const c = clients.find(c => c.owner === e.target.value);
                  if (c) setSelectedPet(c.pet);
                }} className="px-4 py-2.5 border border-sage-200 rounded-xl text-sm">
                  <option value="">Select client...</option>
                  {clients.map(c => <option key={c.owner} value={c.owner}>{c.owner} ({c.pet})</option>)}
                </select>
                <input value={selectedPet} onChange={e => setSelectedPet(e.target.value)} placeholder="Pet name" className="px-4 py-2.5 border border-sage-200 rounded-xl text-sm" />
              </div>
            </div>

            {/* Line Items */}
            <div className="bg-white rounded-2xl border border-sage-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-sage-900">Services Provided</h2>
                <button onClick={addItem} className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700">
                  <Plus className="w-4 h-4" /> Add Service
                </button>
              </div>

              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div key={item.id} className="flex items-start gap-2 bg-sage-50 rounded-xl p-3">
                    <span className="text-xs text-sage-400 mt-3 w-5">{idx + 1}.</span>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2">
                      <div className="relative">
                        <input value={item.service} onChange={e => {
                          updateItem(item.id, "service", e.target.value);
                          setSearchService(e.target.value);
                          setShowCatalog(item.id);
                        }}
                          placeholder="Search service..."
                          className="w-full px-3 py-2 border border-sage-200 rounded-lg text-sm"
                        />
                        {showCatalog === item.id && (
                          <div className="absolute z-10 top-full left-0 mt-1 bg-white border border-sage-200 rounded-xl shadow-lg w-full max-h-48 overflow-y-auto">
                            {filteredServices.slice(0, 8).map(s => (
                              <button key={s.service} onClick={() => selectService(item.id, s)}
                                className="block w-full text-left px-3 py-2 text-xs hover:bg-primary-50 text-sage-700 border-b border-sage-50 last:border-0">
                                <span className="font-medium">{s.service}</span>
                                <span className="text-sage-400 ml-2">${s.rate}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <input value={item.description} onChange={e => updateItem(item.id, "description", e.target.value)}
                        placeholder="Description" className="px-3 py-2 border border-sage-200 rounded-lg text-sm" />
                      <input type="number" value={item.qty} onChange={e => updateItem(item.id, "qty", parseInt(e.target.value) || 1)}
                        min={1} className="w-20 px-3 py-2 border border-sage-200 rounded-lg text-sm" />
                      <div className="flex items-center gap-2">
                        <input type="number" value={item.rate} onChange={e => updateItem(item.id, "rate", parseFloat(e.target.value) || 0)}
                          className="flex-1 px-3 py-2 border border-sage-200 rounded-lg text-sm" />
                        <span className="text-sm font-medium text-sage-900 w-16 text-right">${(item.qty * item.rate).toFixed(2)}</span>
                        {items.length > 1 && (
                          <button onClick={() => removeItem(item.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-6 pt-4 border-t border-sage-100 flex justify-end">
                <div className="text-right">
                  <div className="flex items-center gap-6">
                    <span className="text-sm text-sage-600">Subtotal:</span>
                    <span className="text-sm font-medium text-sage-900">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm text-sage-600">Tax (6%):</span>
                    <span className="text-sm font-medium text-sage-900">${(total * 0.06).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-6 text-lg">
                    <span className="font-semibold text-sage-900">Total:</span>
                    <span className="font-bold text-primary-600">${(total * 1.06).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button className="px-6 py-3 border border-sage-200 rounded-xl text-sm">Save as Draft</button>
                <button onClick={handleSendInvoice}
                  className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600">
                  {sent ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                  {sent ? "Sent to Client Portal!" : "Send Invoice to Client"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}