"use client";
import { useState } from "react";
import { DollarSign, FileText, Download, CreditCard, CheckCircle, AlertCircle, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";

const invoices = [
  { id: "INV-2025-001", date: "May 15, 2025", pet: "Max", description: "Annual Wellness Exam + Vaccinations", amount: 185, status: "Paid", paidOn: "May 16, 2025" },
  { id: "INV-2025-002", date: "May 10, 2025", pet: "Luna", description: "Vaccination Follow-up + Fecal Exam", amount: 95, status: "Pending", paidOn: null },
  { id: "INV-2025-003", date: "Mar 15, 2025", pet: "Max", description: "Dental Cleaning", amount: 200, status: "Paid", paidOn: "Mar 16, 2025" },
  { id: "INV-2025-004", date: "Jan 15, 2025", pet: "Max", description: "Wellness Exam + Heartworm Test", amount: 130, status: "Paid", paidOn: "Jan 20, 2025" },
];

export default function PortalInvoicesPage() {
  const [paying, setPaying] = useState<string | null>(null);

  const totalDue = invoices.filter(i => i.status === "Pending").reduce((s, i) => s + i.amount, 0);
  const totalPaid = invoices.filter(i => i.status === "Paid").reduce((s, i) => s + i.amount, 0);

  return (
    <>
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-12">
        <div className="container-wide">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white">Billing & Invoices</h1>
          <p className="text-primary-100 text-sm mt-1">View and pay your invoices</p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container-wide space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-sage-100">
              <p className="text-sm text-sage-500 mb-1">Total Due</p>
              <p className="text-3xl font-bold text-accent-600">${totalDue.toFixed(2)}</p>
              {totalDue > 0 && <Button size="sm" className="mt-3">Pay Now</Button>}
            </div>
            <div className="bg-white rounded-2xl p-5 border border-sage-100">
              <p className="text-sm text-sage-500 mb-1">Total Paid</p>
              <p className="text-3xl font-bold text-green-600">${totalPaid.toFixed(2)}</p>
              <p className="text-xs text-sage-400 mt-1">{invoices.filter(i => i.status === "Paid").length} invoices paid</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-sage-100">
              <p className="text-sm text-sage-500 mb-1">Payment Method</p>
              <div className="flex items-center gap-2 mt-1">
                <CreditCard className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-medium text-sage-900">Visa •••• 4242</span>
              </div>
              <p className="text-xs text-sage-400 mt-1">Default payment method</p>
            </div>
          </div>

          {/* Invoice List */}
          <div className="bg-white rounded-2xl border border-sage-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-sage-100">
              <h2 className="font-semibold text-sage-900">Invoice History</h2>
            </div>
            <div className="divide-y divide-sage-50">
              {invoices.map((inv) => (
                <div key={inv.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${inv.status === "Paid" ? "bg-green-50" : "bg-amber-50"}`}>
                        {inv.status === "Paid" ? <CheckCircle className="w-5 h-5 text-green-600" /> : <Clock className="w-5 h-5 text-amber-600" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sage-900">{inv.id}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${inv.status === "Paid" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}>
                            {inv.status}
                          </span>
                        </div>
                        <p className="text-sm text-sage-600">{inv.description}</p>
                        <p className="text-xs text-sage-400">{inv.date} • Pet: {inv.pet} {inv.paidOn ? `• Paid: ${inv.paidOn}` : ''}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-sage-900">${inv.amount.toFixed(2)}</p>
                      <div className="flex gap-1 mt-1 justify-end">
                        <button className="text-xs text-primary-600 hover:underline flex items-center gap-1">
                          <Eye className="w-3 h-3" /> View
                        </button>
                        {inv.status === "Pending" && (
                          <button className="text-xs bg-primary-500 text-white px-3 py-1 rounded-lg hover:bg-primary-600">
                            Pay Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}