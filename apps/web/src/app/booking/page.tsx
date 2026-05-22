"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Calendar, Clock, Check, ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  { id: "wellness", name: "Wellness Exam", duration: "30 min", price: "$65", slots: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM"] },
  { id: "vaccination", name: "Vaccination Visit", duration: "15 min", price: "$25 - $45", slots: ["9:00 AM", "9:15 AM", "9:30 AM", "9:45 AM", "10:00 AM", "10:15 AM", "10:30 AM", "11:00 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"] },
  { id: "dental", name: "Dental Cleaning", duration: "60 min", price: "From $200", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"] },
  { id: "sick", name: "Sick Visit", duration: "30 min", price: "$85", slots: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"] },
  { id: "surgery", name: "Surgery Consultation", duration: "45 min", price: "Varies", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM"] },
  { id: "followup", name: "Follow-up Visit", duration: "15 min", price: "$45", slots: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"] },
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM",
  "11:30 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number>(15);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(0);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysInMonth = 30;

  if (confirmed) {
    return (
      <section className="py-16 md:py-24">
        <div className="container-wide max-w-lg text-center">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary-600" />
          </div>
          <h1 className="font-display text-3xl font-bold text-sage-900 mb-3">Appointment Booked!</h1>
          <p className="text-sage-600 mb-2">
            Your appointment has been confirmed. We&apos;ve sent a confirmation to your email.
          </p>
          <div className="bg-sage-50 rounded-xl p-4 text-sm text-sage-700 mt-4">
            <p>A confirmation email has been sent with details and reminders.</p>
          </div>
        </div>
      </section>
    );
  }

  const renderCalendar = () => {
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dayOfWeek = daysOfWeek[(i + currentMonth * 30) % 7];
      days.push(
        <button
          key={i}
          onClick={() => setSelectedDate(i)}
          className={`p-2 rounded-lg text-sm transition-colors ${
            selectedDate === i
              ? "bg-primary-500 text-white"
              : "hover:bg-primary-50 text-sage-700"
          }`}
        >
          <span className="block text-xs text-sage-400">{dayOfWeek}</span>
          <span className="block font-medium">{i}</span>
        </button>
      );
    }
    return days;
  };

  return (
    <>
      <section className="bg-gradient-to-br from-primary-50 to-warm-50 py-16 md:py-20">
        <div className="container-wide text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-sage-900 mb-4">
            Book an Appointment
          </h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Schedule your visit in just a few clicks. We&apos;ll confirm your booking right away.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-wide max-w-4xl">
          {/* Steps */}
          <div className="flex items-center justify-center mb-12">
            {[
              { num: 1, label: "Service" },
              { num: 2, label: "Date & Time" },
              { num: 3, label: "Confirm" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step >= s.num ? "bg-primary-500 text-white" : "bg-sage-100 text-sage-400"
                  }`}>
                    {s.num}
                  </div>
                  <span className="text-xs mt-1 text-sage-500">{s.label}</span>
                </div>
                {i < 2 && <div className={`w-12 md:w-24 h-0.5 mx-2 ${step > s.num ? "bg-primary-500" : "bg-sage-200"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Select Service */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="font-display text-xl font-bold text-sage-900 mb-6">Select a Service</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`text-left p-5 border rounded-2xl transition-all ${
                      selectedService === service.id
                        ? "border-primary-500 bg-primary-50 ring-2 ring-primary-200"
                        : "border-sage-100 hover:border-primary-200 hover:bg-sage-50"
                    }`}
                  >
                    <h3 className="font-semibold text-sage-900">{service.name}</h3>
                    <div className="flex items-center gap-3 mt-2 text-sm text-sage-500">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{service.duration}</span>
                      <span>{service.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <div>
                  <h3 className="font-semibold text-sage-900 mb-4">Select Date</h3>
                  <div className="bg-white border border-sage-100 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <button className="p-1 hover:bg-sage-50 rounded-lg" onClick={() => setCurrentMonth(prev => Math.max(0, prev - 1))}>
                        <ChevronLeft className="w-5 h-5 text-sage-600" />
                      </button>
                      <span className="font-medium text-sage-900">{monthNames[currentMonth]} 2025</span>
                      <button className="p-1 hover:bg-sage-50 rounded-lg" onClick={() => setCurrentMonth(prev => Math.min(11, prev + 1))}>
                        <ChevronRight className="w-5 h-5 text-sage-600" />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {renderCalendar()}
                    </div>
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <h3 className="font-semibold text-sage-900 mb-4">Select Time</h3>
                  <div className="bg-white border border-sage-100 rounded-2xl p-4">
                    {selectedService ? (
                      <>
                        <p className="text-xs text-sage-500 mb-3">Available times for <strong>{services.find(s => s.id === selectedService)?.name}</strong></p>
                        <div className="grid grid-cols-2 gap-2">
                          {(services.find(s => s.id === selectedService)?.slots || timeSlots).map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                          className={`py-2.5 px-3 text-sm rounded-xl border transition-all ${
                            selectedTime === time
                              ? "border-primary-500 bg-primary-50 text-primary-700 font-medium"
                              : "border-sage-200 text-sage-600 hover:border-primary-200 hover:bg-sage-50"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    </>
                  ) : (
                    <p className="text-sm text-sage-400 text-center py-4">Please select a service first</p>
                  )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div className="animate-fade-in">
              <div className="bg-white border border-sage-100 rounded-2xl p-6 md:p-8 space-y-6">
                <h2 className="font-display text-xl font-bold text-sage-900">Confirm Appointment</h2>
                <div className="bg-sage-50 rounded-xl p-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-sage-500">Service:</span>
                    <span className="font-medium text-sage-900">{services.find(s => s.id === selectedService)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage-500">Date:</span>
                    <span className="font-medium text-sage-900">{monthNames[currentMonth]} {selectedDate}, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage-500">Time:</span>
                    <span className="font-medium text-sage-900">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage-500">Duration:</span>
                    <span className="font-medium text-sage-900">{services.find(s => s.id === selectedService)?.duration}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Your Name *</label>
                    <input type="text" required className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Email *</label>
                    <input type="email" required className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Phone *</label>
                    <input type="tel" required className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Pet&apos;s Name *</label>
                    <input type="text" required className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Notes (optional)</label>
                    <textarea rows={3} className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            ) : (
              <div />
            )}
            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !selectedService || step === 2 && (!selectedDate || !selectedTime)}
              >
                Continue
              </Button>
            ) : (
              <Button onClick={() => setConfirmed(true)}>
                Confirm Booking
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}