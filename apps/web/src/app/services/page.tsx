import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Stethoscope, Syringe, Scissors, Heart, Shield, PawPrint, Bone, Eye, Ear, Activity, Ambulance, Microscope } from "lucide-react";

const servicesList = [
  {
    icon: Stethoscope,
    title: "Wellness & Preventive Care",
    description: "Comprehensive annual exams, vaccinations, and health screenings to keep your pet in optimal health.",
    price: "From $65",
    items: ["Annual wellness exams", "Vaccination programs", "Parasite prevention", "Nutritional counseling", "Weight management"],
  },
  {
    icon: Heart,
    title: "Diagnostic Services",
    description: "Advanced diagnostic tools to accurately identify and treat your pet's health concerns.",
    price: "Varies",
    items: ["Digital X-rays", "Ultrasound", "Blood work & lab tests", "Urinalysis", "Allergy testing"],
  },
  {
    icon: Scissors,
    title: "Surgery",
    description: "Safe, modern surgical procedures performed by our experienced veterinary team.",
    price: "From $200",
    items: ["Spay & neuter", "Soft tissue surgery", "Orthopedic surgery", "Dental surgery", "Lump removal"],
  },
  {
    icon: Bone,
    title: "Dental Care",
    description: "Professional dental cleaning and oral health services for your pet.",
    price: "From $200",
    items: ["Professional cleaning", "Dental X-rays", "Extractions", "Oral exams", "Home care guidance"],
  },
  {
    icon: Syringe,
    title: "Vaccinations",
    description: "Essential and lifestyle vaccines to protect your pet from preventable diseases.",
    price: "$25 - $45 each",
    items: ["Rabies", "DHPP (Distemper/Parvo)", "FVRCP (Feline)", "Bordetella", "Leptospirosis"],
  },
  {
    icon: Eye,
    title: "Ophthalmology",
    description: "Specialized eye care including exams, treatment, and surgery for pet eye conditions.",
    price: "Varies",
    items: ["Eye exams", "Cataract evaluation", "Glaucoma treatment", "Eye infection care", "Surgical options"],
  },
  {
    icon: Ear,
    title: "Ear & Skin Care",
    description: "Treatment for ear infections, allergies, and dermatological conditions.",
    price: "From $45",
    items: ["Ear infection treatment", "Allergy management", "Skin condition diagnosis", "Dermatology care", "Ear cleaning"],
  },
  {
    icon: Activity,
    title: "Senior Pet Care",
    description: "Specialized geriatric care to help your senior pet live their best life.",
    price: "From $75",
    items: ["Senior wellness exams", "Pain management", "Arthritis care", "Blood work panels", "Quality of life assessments"],
  },
  {
    icon: Ambulance,
    title: "Emergency Care",
    description: "Urgent medical attention for critical situations and unexpected illnesses.",
    price: "Varies",
    items: ["Emergency exams", "Injury treatment", "Poisoning care", "Critical care monitoring", "After-hours support"],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-50 to-warm-50 py-16 md:py-20">
        <div className="container-wide text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-sage-900 mb-4">
            Our Services
          </h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Comprehensive veterinary care tailored to your pet&apos;s unique needs.
            From routine checkups to advanced procedures, we&apos;re here for every stage of life.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-20">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {servicesList.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-white border border-sage-100 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                      {service.price}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-sage-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-sage-600 mb-4">{service.description}</p>
                  <ul className="space-y-1.5">
                    {service.items.map((item) => (
                      <li key={item} className="text-xs text-sage-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-sage-50">
        <div className="container-wide text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-sage-900 mb-3">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-sage-600 mb-6">
            Our team is happy to help you find the right care for your pet.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/booking">
              <Button>Book a Consultation</Button>
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