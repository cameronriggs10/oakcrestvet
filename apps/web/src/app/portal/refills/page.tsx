"use client";
import { useState } from "react";
import { Pill, Clock, Info, Send, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Medication {
  id: number;
  name: string;
  pet: string;
  dosage: string;
  frequency: string;
  prescribed: string;
  nextFill: string;
  refillsLeft: number;
  info: string;
  sideEffects: string;
}

const medications: Medication[] = [
  { id: 1, name: "Heartgard Plus", pet: "Max", dosage: "1 chewable monthly", frequency: "Monthly", prescribed: "Jan 15, 2025", nextFill: "Jun 15, 2025", refillsLeft: 2, info: "Heartworm prevention for dogs up to 100 lbs. Ivermectin-based.", sideEffects: "Mild GI upset in rare cases" },
  { id: 2, name: "NexGard", pet: "Max", dosage: "1 chewable monthly", frequency: "Monthly", prescribed: "Jan 15, 2025", nextFill: "Jun 15, 2025", refillsLeft: 2, info: "Flea and tick prevention. Afoxolaner-based. Fast-acting.", sideEffects: "Vomiting, itching, or diarrhea (rare)" },
  { id: 3, name: "Revolution Plus", pet: "Luna", dosage: "1 topical monthly", frequency: "Monthly", prescribed: "Jun 10, 2024", nextFill: "Jun 10, 2025", refillsLeft: 0, info: "Flea, tick, heartworm, and intestinal parasite prevention for cats.", sideEffects: "Temporary hair loss at application site" },
  { id: 4, name: "Carprofen (Rimadyl)", pet: "Max", dosage: "75mg twice daily", frequency: "As needed", prescribed: "Mar 15, 2025", nextFill: "N/A", refillsLeft: 1, info: "NSAID for pain/inflammation. Used post-dental procedure.", sideEffects: "GI upset, liver enzyme elevation with prolonged use" },
];

export default function PortalRefillsPage() {
  const [requests, setRequests] = useState<number[]>([]);
  const [requestNote, setRequestNote] = useState("");
  const [showForm, setShowForm] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const requestRefill = (id: number) => {
    setRequests(prev => [...prev, id]);
    setShowForm(null);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-12">
        <div className="container-wide">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white">Medication Refills</h1>
          <p className="text-primary-100 text-sm mt-1">Request refills for your pet's medications</p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container-wide space-y-4">
          {submitted && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-700">Refill request submitted! The clinic will review and notify you.</p>
            </div>
          )}

          {medications.map((med) => {
            const requested = requests.includes(med.id);
            const isOverdue = med.nextFill !== "N/A" && new Date(med.nextFill) < new Date();
            return (
              <div key={med.id} className="bg-white border border-sage-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                        <Pill className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sage-900">{med.name}</h3>
                        <p className="text-xs text-sage-500">{med.pet} • {med.dosage} • {med.frequency}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-sage-400">
                          <span>Prescribed: {med.prescribed}</span>
                          <span>Refills left: {med.refillsLeft}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs font-medium ${isOverdue ? 'text-red-600' : 'text-amber-600'}`}>
                        {isOverdue ? '⏰ Overdue' : 'Next fill:'} {med.nextFill}
                      </p>
                      {requested ? (
                        <span className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full mt-2 inline-block">✓ Requested</span>
                      ) : showForm === med.id ? (
                        <Button size="xs" onClick={() => requestRefill(med.id)}>Submit Request</Button>
                      ) : med.refillsLeft > 0 ? (
                        <Button size="xs" variant="outline" onClick={() => setShowForm(med.id)}>Request Refill</Button>
                      ) : (
                        <span className="text-xs text-red-500 mt-2 block">No refills left — call clinic</span>
                      )}
                    </div>
                  </div>

                  {/* Info & Request Form */}
                  {showForm === med.id && (
                    <div className="mt-4 pt-4 border-t border-sage-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-xl p-3">
                          <p className="text-xs font-medium text-blue-800 flex items-center gap-1"><Info className="w-3 h-3" /> About</p>
                          <p className="text-xs text-blue-700 mt-1">{med.info}</p>
                          <p className="text-xs text-blue-600 mt-1">Side effects: {med.sideEffects}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-sage-700 mb-1 block">Notes (optional)</label>
                          <textarea value={requestNote} onChange={e => setRequestNote(e.target.value)}
                            placeholder="e.g., Need by next Friday"
                            className="w-full px-3 py-2 border border-sage-200 rounded-lg text-xs mb-2" rows={2}
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => requestRefill(med.id)}>
                              <Send className="w-3 h-3 mr-1" /> Send Request
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setShowForm(null)}>Cancel</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}