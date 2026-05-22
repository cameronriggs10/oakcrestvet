import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { PawPrint, Heart, Shield, Stethoscope, Syringe, Scissors, Star, Calendar, UserPlus, FileText, Clock, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "Wellness Exams",
    description: "Comprehensive annual checkups to keep your pet healthy and catch issues early.",
  },
  {
    icon: Syringe,
    title: "Vaccinations",
    description: "Essential vaccines tailored to your pet's age, lifestyle, and health needs.",
  },
  {
    icon: Scissors,
    title: "Surgery & Dental",
    description: "Advanced surgical procedures and professional dental cleaning services.",
  },
  {
    icon: Heart,
    title: "Emergency Care",
    description: "Urgent medical attention for injuries, poisonings, and sudden illnesses.",
  },
  {
    icon: Shield,
    title: "Preventive Care",
    description: "Parasite prevention, nutritional counseling, and wellness planning.",
  },
  {
    icon: PawPrint,
    title: "Senior Pet Care",
    description: "Geriatric wellness programs for your aging companion's comfort and health.",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    text: "Dr. Johnson and her team are absolutely wonderful! They took such great care of my golden retriever, Max. The compassion they showed was incredible.",
    rating: 5,
    pet: "Max, Golden Retriever",
  },
  {
    name: "Michael T.",
    text: "I've been bringing my cats here for years. The staff is always friendly, knowledgeable, and genuinely cares about my pets' wellbeing.",
    rating: 5,
    pet: "Whiskers & Mittens",
  },
  {
    name: "Emily R.",
    text: "As a first-time pet parent, I was nervous. Oak Crest made the whole experience stress-free. They explained everything and answered all my questions.",
    rating: 5,
    pet: "Buddy, Beagle Mix",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-warm-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzZDkzNjgiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container-wide relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 py-16 md:py-24 lg:py-32">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium animate-fade-in">
                <Heart className="w-4 h-4" />
                <span>Compassionate Care Since 2005</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-sage-900 leading-tight animate-fade-in-up">
                Caring for Your
                <span className="text-primary-500"> Pets </span>
                Like Family
              </h1>
              <p className="text-lg md:text-xl text-sage-600 max-w-xl mx-auto lg:mx-0 animate-fade-in-up stagger-1">
                At Oak Crest Veterinary Services, we provide compassionate,
                high-quality veterinary care in a warm and welcoming environment.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start animate-fade-in-up stagger-2">
                <Link href="/booking">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Calendar className="w-5 h-5" />
                    Book an Appointment
                  </Button>
                </Link>
                <Link href="/new-clients">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <UserPlus className="w-5 h-5" />
                    New Patient?
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 justify-center lg:justify-start text-sm text-sage-500 animate-fade-in-up stagger-3">
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  4.9 Rating
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-primary-500" />
                  10K+ Happy Pets
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-primary-500" />
                  Licensed & Insured
                </span>
              </div>
            </div>

            {/* Right Image - Hero Banner */}
            <div className="flex-1 w-full max-w-lg">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero-banner.png"
                  alt="Oak Crest Veterinary Services - Compassionate pet care"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-sage-900 mt-2">
              Comprehensive Pet Care
            </h2>
            <p className="text-sage-600 mt-3 max-w-2xl mx-auto">
              From routine checkups to advanced procedures, we offer a full range of veterinary services
              to keep your pets healthy and happy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group bg-white border border-sage-100 rounded-2xl p-6 hover:shadow-lg hover:border-primary-100 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-sage-900 mb-2">{service.title}</h3>
                  <p className="text-sage-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link href="/services">
              <Button variant="outline">
                View All Services
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-sage-50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-sage-900 mt-2">
              What Pet Parents Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-sage-100 shadow-sm">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sage-700 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <PawPrint className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-sage-900">{t.name}</p>
                    <p className="text-xs text-sage-500">{t.pet}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container-wide text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Give Your Pet the Best Care?
          </h2>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
            Join our family of happy pet parents. Book your appointment today and experience
            the Oak Crest difference.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/booking">
              <Button size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                <Calendar className="w-5 h-5" />
                Book Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}