import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Clock, MapPin, Phone, Mail, Heart, Award, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-50 to-warm-50 py-16 md:py-20">
        <div className="container-wide text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-sage-900 mb-4">
            About Oak Crest
          </h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            A legacy of compassionate veterinary care since 2005.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/images/about-clinic.jpg"
                alt="Oak Crest Veterinary Clinic interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-4">
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="font-display text-3xl font-bold text-sage-900">A Passion for Pets</h2>
              <p className="text-sage-600 leading-relaxed">
                Oak Crest Veterinary Services was founded in 2005 by Dr. Sarah Johnson with a simple
                mission: to provide exceptional veterinary care with genuine compassion. What started
                as a small clinic has grown into a full-service animal hospital serving thousands of
                pets and their families.
              </p>
              <p className="text-sage-600 leading-relaxed">
                Our team of dedicated veterinarians, technicians, and support staff share a deep
                love for animals and a commitment to staying at the forefront of veterinary medicine.
                We believe in treating every pet as if they were our own.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-4 bg-primary-50 rounded-xl">
                  <p className="text-2xl font-bold text-primary-600">15+</p>
                  <p className="text-xs text-sage-600">Years Experience</p>
                </div>
                <div className="text-center p-4 bg-primary-50 rounded-xl">
                  <p className="text-2xl font-bold text-primary-600">10K+</p>
                  <p className="text-xs text-sage-600">Happy Pets</p>
                </div>
                <div className="text-center p-4 bg-primary-50 rounded-xl">
                  <p className="text-2xl font-bold text-primary-600">5</p>
                  <p className="text-xs text-sage-600">Veterinarians</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-sage-50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-sage-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: "Compassion", desc: "Every pet deserves to be treated with kindness, respect, and genuine care." },
              { icon: Award, title: "Excellence", desc: "We pursue the highest standards of veterinary medicine through continuous learning." },
              { icon: Users, title: "Community", desc: "We build lasting relationships with our clients and contribute to our local community." },
            ].map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-white rounded-2xl p-6 border border-sage-100 text-center">
                  <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-sage-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-sage-600">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hours & Location */}
      <section className="py-16 md:py-20">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border border-sage-100 rounded-2xl p-8">
              <h2 className="font-display text-2xl font-bold text-sage-900 mb-6">Clinic Hours</h2>
              <div className="space-y-3">
                {[
                  { day: "Monday - Friday", hours: "8:00 AM - 5:00 PM" },
                  { day: "Saturday (Walk-in)", hours: "9:00 AM - 1:00 PM" },
                  { day: "Every Other Saturday", hours: "9:00 AM - 1:00 PM" },
                  { day: "Sunday", hours: "Closed" },
                ].map((item) => (
                  <div key={item.day} className="flex items-center justify-between py-2 border-b border-sage-50 last:border-0">
                    <span className="text-sage-800 font-medium">{item.day}</span>
                    <span className={`text-sm ${item.hours === "Closed" ? "text-red-500" : "text-sage-600"}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-amber-50 rounded-xl text-sm text-amber-800">
                💡 Walk-in hours available Saturdays 9 AM - 1 PM. Call ahead to confirm which Saturdays we're open.
              </div>
              <div className="mt-6 pt-6 border-t border-sage-100">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-sage-800">After-Hours Emergency</p>
                    <p className="text-sm text-sage-600">For after-hours emergencies, please call (555) 123-4567 for our triage line.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-sage-100 rounded-2xl p-8">
              <h2 className="font-display text-2xl font-bold text-sage-900 mb-6">Our Location</h2>
              <div className="bg-sage-50 rounded-xl aspect-video mb-6 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-sage-300" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary-500 shrink-0" />
                  <p className="text-sage-700">123 Main Street, Suite 100, Anytown, ST 12345</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary-500 shrink-0" />
                  <a href="tel:+13017739909" className="text-sage-700 hover:text-primary-600">(301) 773-9909</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                  <a href="mailto:Oakcrestvet@gmail.com" className="text-sage-700 hover:text-primary-600">Oakcrestvet@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}