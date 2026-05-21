"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="bg-gradient-to-br from-primary-50 to-warm-50 py-16 md:py-20">
        <div className="container-wide text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-sage-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            We&apos;d love to hear from you! Reach out with questions or stop by our clinic.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              <div className="bg-white border border-sage-100 rounded-2xl p-6">
                <Phone className="w-6 h-6 text-primary-500 mb-3" />
                <h3 className="font-semibold text-sage-900 mb-1">Phone</h3>
                <a href="tel:+15551234567" className="text-sage-600 hover:text-primary-600 text-sm">(555) 123-4567</a>
              </div>
              <div className="bg-white border border-sage-100 rounded-2xl p-6">
                <Mail className="w-6 h-6 text-primary-500 mb-3" />
                <h3 className="font-semibold text-sage-900 mb-1">Email</h3>
                <a href="mailto:info@oakcrestvet.com" className="text-sage-600 hover:text-primary-600 text-sm break-all">info@oakcrestvet.com</a>
              </div>
              <div className="bg-white border border-sage-100 rounded-2xl p-6">
                <MapPin className="w-6 h-6 text-primary-500 mb-3" />
                <h3 className="font-semibold text-sage-900 mb-1">Address</h3>
                <p className="text-sage-600 text-sm">123 Main Street, Suite 100<br />Anytown, ST 12345</p>
              </div>
              <div className="bg-white border border-sage-100 rounded-2xl p-6">
                <Clock className="w-6 h-6 text-primary-500 mb-3" />
                <h3 className="font-semibold text-sage-900 mb-1">Hours</h3>
                <div className="text-sm text-sage-600 space-y-1">
                  <p>Mon-Fri: 8AM - 6PM</p>
                  <p>Sat: 9AM - 3PM</p>
                  <p>Sun: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white border border-sage-100 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-primary-600" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-sage-900 mb-2">Message Sent!</h2>
                  <p className="text-sage-600">We&apos;ll get back to you within 24 hours. Thank you for reaching out!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border border-sage-100 rounded-2xl p-6 md:p-8 space-y-5">
                  <h2 className="font-display text-2xl font-bold text-sage-900">Send Us a Message</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-sage-700 mb-1">Name *</label>
                      <input type="text" required className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-sage-700 mb-1">Email *</label>
                      <input type="email" required className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Phone</label>
                    <input type="tel" className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Subject *</label>
                    <input type="text" required className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Message *</label>
                    <textarea rows={5} required className="w-full px-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none" />
                  </div>
                  <Button type="submit" className="w-full md:w-auto">
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}