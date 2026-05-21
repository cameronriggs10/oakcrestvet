import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Check, Shield, Info } from "lucide-react";

const pricingItems = [
  {
    category: "Wellness & Exams",
    items: [
      { service: "Wellness Exam (Annual)", price: "$65" },
      { service: "Puppy/Kitten Wellness Package", price: "$199" },
      { service: "Senior Wellness Exam", price: "$75" },
      { service: "Sick Visit Exam", price: "$85" },
      { service: "Follow-up Visit", price: "$45" },
    ],
  },
  {
    category: "Vaccinations",
    items: [
      { service: "Rabies Vaccine", price: "$25" },
      { service: "DHPP (Distemper/Parvo)", price: "$35" },
      { service: "Bordetella (Kennel Cough)", price: "$30" },
      { service: "Leptospirosis", price: "$35" },
      { service: "FVRCP (Feline)", price: "$35" },
      { service: "Feline Leukemia", price: "$40" },
    ],
  },
  {
    category: "Dental Care",
    items: [
      { service: "Dental Cleaning (Basic)", price: "$200" },
      { service: "Dental Cleaning with X-rays", price: "$350" },
      { service: "Extraction (per tooth)", price: "$50 - $150" },
      { service: "Oral Exam", price: "$45" },
    ],
  },
  {
    category: "Surgery",
    items: [
      { service: "Spay (Dog)", price: "$350 - $550" },
      { service: "Neuter (Dog)", price: "$250 - $400" },
      { service: "Spay (Cat)", price: "$200 - $350" },
      { service: "Neuter (Cat)", price: "$150 - $250" },
      { service: "Lump Removal", price: "$200 - $800" },
    ],
  },
  {
    category: "Diagnostics",
    items: [
      { service: "Digital X-rays (per view)", price: "$120" },
      { service: "Blood Work (Basic Panel)", price: "$150" },
      { service: "Blood Work (Senior Panel)", price: "$250" },
      { service: "Urinalysis", price: "$45" },
      { service: "Fecal Exam", price: "$35" },
    ],
  },
  {
    category: "Preventive & Additional",
    items: [
      { service: "Heartworm Test", price: "$45" },
      { service: "Flea/Tick Prevention (per month)", price: "$20 - $50" },
      { service: "Heartworm Prevention (per month)", price: "$15 - $35" },
      { service: "Microchip Implant", price: "$55" },
      { service: "Nail Trim", price: "$20" },
    ],
  },
];

const insuranceProviders = [
  "Trupanion", "Healthy Paws", "Nationwide", "Embrace",
  "Petplan", "Figo", "ASPCA Pet Insurance", "Many Others",
];

export default function PricingPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-50 to-warm-50 py-16 md:py-20">
        <div className="container-wide text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-sage-900 mb-4">
            Pricing & Insurance
          </h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Transparent pricing for all our services. We accept most major pet insurance plans.
          </p>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="py-16 md:py-20">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {pricingItems.map((category) => (
              <div key={category.category} className="bg-white border border-sage-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-primary-50 px-6 py-4 border-b border-sage-100">
                  <h3 className="font-semibold text-sage-900">{category.category}</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {category.items.map((item) => (
                      <li key={item.service} className="flex items-center justify-between text-sm">
                        <span className="text-sage-700">{item.service}</span>
                        <span className="font-medium text-primary-600">{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-sage-50 rounded-2xl p-6 text-center">
            <p className="text-sm text-sage-600">
              *Prices are estimates and may vary based on your pet&apos;s specific needs.
              Please call (555) 123-4567 for a detailed quote.
            </p>
          </div>
        </div>
      </section>

      {/* Pet Insurance */}
      <section className="py-16 md:py-20 bg-sage-50">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Pet Insurance</span>
              <h2 className="font-display text-3xl font-bold text-sage-900 mt-2 mb-4">
                We Work With Most Major Providers
              </h2>
              <p className="text-sage-600 mb-6">
                Pet insurance helps you provide the best care for your pet without worrying about
                unexpected costs. We work directly with most insurance providers to process claims
                and help you maximize your coverage.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {insuranceProviders.map((provider) => (
                  <div key={provider} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary-500 shrink-0" />
                    <span className="text-sm text-sage-700">{provider}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-sage-100 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-primary-500" />
                <h3 className="font-semibold text-lg text-sage-900">Insurance Tips</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-sage-600">
                  <Info className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                  Get pet insurance early before pre-existing conditions develop
                </li>
                <li className="flex items-start gap-2 text-sm text-sage-600">
                  <Info className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                  We can help you file claims directly with your provider
                </li>
                <li className="flex items-start gap-2 text-sm text-sage-600">
                  <Info className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                  Ask us about wellness plans that complement your insurance
                </li>
                <li className="flex items-start gap-2 text-sm text-sage-600">
                  <Info className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                  We accept all major credit cards and offer payment plans
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-wide text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-sage-900 mb-4">
            Have Questions About Pricing?
          </h2>
          <p className="text-sage-600 mb-6">
            We&apos;re happy to provide a detailed estimate for your pet&apos;s specific needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/booking">
              <Button>Book an Appointment</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}