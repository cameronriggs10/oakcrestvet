"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Check, PawPrint } from "lucide-react";

interface FormData {
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  petName: string;
  petSpecies: string;
  petBreed: string;
  petAge: string;
  petWeight: string;
  reason: string;
  medicalHistory: string;
  referral: string;
  signature: string;
}

export default function NewClientsPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    petName: "",
    petSpecies: "",
    petBreed: "",
    petAge: "",
    petWeight: "",
    reason: "",
    medicalHistory: "",
    referral: "",
    signature: "",
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-16 md:py-24">
        <div className="container-wide max-w-lg text-center">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary-600" />
          </div>
          <h1 className="font-display text-3xl font-bold text-sage-900 mb-3">Thank You!</h1>
          <p className="text-sage-600 mb-6">
            Your intake paperwork has been submitted successfully. A member of our team will review
            it and reach out to confirm your first appointment.
          </p>
          <Button onClick={() => { setSubmitted(false); setStep(1); }}>
            Submit Another Form
          </Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary-50 to-warm-50 py-16 md:py-20">
        <div className="container-wide text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-sage-900 mb-4">
            New Pet Parents
          </h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Welcome to the Oak Crest family! Complete the form below and we&apos;ll have everything ready
            for your first visit.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-wide max-w-3xl">
          {/* Steps Progress */}
          <div className="flex items-center justify-center mb-12">
            {[
              { num: 1, label: "Your Info" },
              { num: 2, label: "Pet Details" },
              { num: 3, label: "Medical History" },
              { num: 4, label: "Review & Sign" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step >= s.num
                        ? "bg-primary-500 text-white"
                        : "bg-sage-100 text-sage-400"
                    }`}
                  >
                    {s.num}
                  </div>
                  <span className="text-xs mt-1 text-sage-500">{s.label}</span>
                </div>
                {i < 3 && (
                  <div className={`w-12 md:w-20 h-0.5 mx-2 ${step > s.num ? "bg-primary-500" : "bg-sage-200"}`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Owner Info */}
            {step === 1 && (
              <div className="bg-white border border-sage-100 rounded-2xl p-6 md:p-8 space-y-5 animate-fade-in">
                <h2 className="font-display text-xl font-bold text-sage-900">Your Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-sage-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.ownerName}
                      onChange={(e) => updateField("ownerName", e.target.value)}
                      className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-sage-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => updateField("address", e.target.value)}
                      className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Pet Info */}
            {step === 2 && (
              <div className="bg-white border border-sage-100 rounded-2xl p-6 md:p-8 space-y-5 animate-fade-in">
                <h2 className="font-display text-xl font-bold text-sage-900">Pet Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Pet&apos;s Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.petName}
                      onChange={(e) => updateField("petName", e.target.value)}
                      className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Species *</label>
                    <select
                      required
                      value={formData.petSpecies}
                      onChange={(e) => updateField("petSpecies", e.target.value)}
                      className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white"
                    >
                      <option value="">Select species</option>
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Breed</label>
                    <input
                      type="text"
                      value={formData.petBreed}
                      onChange={(e) => updateField("petBreed", e.target.value)}
                      className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Age</label>
                    <input
                      type="text"
                      value={formData.petAge}
                      onChange={(e) => updateField("petAge", e.target.value)}
                      placeholder="e.g. 3 years"
                      className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Weight (lbs)</label>
                    <input
                      type="text"
                      value={formData.petWeight}
                      onChange={(e) => updateField("petWeight", e.target.value)}
                      className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Reason for Visit *</label>
                    <input
                      type="text"
                      required
                      value={formData.reason}
                      onChange={(e) => updateField("reason", e.target.value)}
                      placeholder="e.g. Annual checkup, sick visit, vaccinations"
                      className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Medical History */}
            {step === 3 && (
              <div className="bg-white border border-sage-100 rounded-2xl p-6 md:p-8 space-y-5 animate-fade-in">
                <h2 className="font-display text-xl font-bold text-sage-900">Medical History</h2>
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">
                    Previous Medical History
                  </label>
                  <textarea
                    rows={4}
                    value={formData.medicalHistory}
                    onChange={(e) => updateField("medicalHistory", e.target.value)}
                    placeholder="Please list any previous medical conditions, surgeries, or ongoing treatments..."
                    className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">
                    How did you hear about us?
                  </label>
                  <select
                    value={formData.referral}
                    onChange={(e) => updateField("referral", e.target.value)}
                    className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white"
                  >
                    <option value="">Select...</option>
                    <option value="Google">Google Search</option>
                    <option value="Friend">Friend/Family</option>
                    <option value="Social">Social Media</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 4: Review & Sign */}
            {step === 4 && (
              <div className="bg-white border border-sage-100 rounded-2xl p-6 md:p-8 space-y-5 animate-fade-in">
                <h2 className="font-display text-xl font-bold text-sage-900">Review & Sign</h2>
                <div className="bg-sage-50 rounded-xl p-4 space-y-2 text-sm">
                  <p><strong>Owner:</strong> {formData.ownerName}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Pet:</strong> {formData.petName} ({formData.petSpecies})</p>
                  <p><strong>Reason:</strong> {formData.reason}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">Digital Signature *</label>
                  <input
                    type="text"
                    required
                    value={formData.signature}
                    onChange={(e) => updateField("signature", e.target.value)}
                    placeholder="Type your full name as signature"
                    className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 font-signature"
                  />
                  <p className="text-xs text-sage-400 mt-1">
                    By typing your name, you agree that the information provided is accurate.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                  Previous Step
                </Button>
              ) : (
                <div />
              )}
              {step < 4 ? (
                <Button type="button" onClick={() => setStep(step + 1)}>
                  Next Step
                </Button>
              ) : (
                <Button type="submit">
                  Submit Intake Form
                </Button>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}