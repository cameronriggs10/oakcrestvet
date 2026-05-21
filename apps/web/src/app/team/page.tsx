import { Button } from "@/components/ui/Button";
import { Mail, Award, GraduationCap } from "lucide-react";

const teamMembers = [
  {
    name: "Dr. Sarah Johnson",
    role: "Lead Veterinarian & Founder",
    bio: "Dr. Johnson founded Oak Crest in 2005 with a vision of compassionate, community-focused veterinary care. She specializes in internal medicine and surgery.",
    education: "DVM, Cornell University College of Veterinary Medicine",
    speciality: "Internal Medicine & Surgery",
  },
  {
    name: "Dr. Michael Chen",
    role: "Associate Veterinarian",
    bio: "Dr. Chen brings 10 years of experience in emergency and critical care. He has a special interest in dental procedures and pain management.",
    education: "DVM, University of California, Davis",
    speciality: "Emergency Care & Dentistry",
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Associate Veterinarian",
    bio: "Dr. Rodriguez is passionate about preventive care and client education. She loves helping new pet parents navigate their pet's health journey.",
    education: "DVM, Texas A&M University",
    speciality: "Preventive Care & Nutrition",
  },
  {
    name: "Dr. James Wilson",
    role: "Associate Veterinarian",
    bio: "Dr. Wilson has extensive experience in orthopedic surgery and sports medicine for active pets. He also works with local rescue organizations.",
    education: "DVM, University of Florida",
    speciality: "Orthopedics & Rehabilitation",
  },
  {
    name: "Dr. Lisa Park",
    role: "Associate Veterinarian",
    bio: "Dr. Park specializes in dermatology and allergy management. She's known for her gentle approach with anxious pets.",
    education: "DVM, Michigan State University",
    speciality: "Dermatology & Allergy Care",
  },
  {
    name: "Sarah Mitchell",
    role: "Practice Manager",
    bio: "Sarah ensures our clinic runs smoothly and that every client has an exceptional experience. She's been with Oak Crest for 8 years.",
    education: "BS, Business Administration",
    speciality: "Practice Management",
  },
];

export default function TeamPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-50 to-warm-50 py-16 md:py-20">
        <div className="container-wide text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-sage-900 mb-4">
            Our Team
          </h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Meet the dedicated professionals who make Oak Crest a place of healing and compassion.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white border border-sage-100 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-2xl font-bold text-primary-600">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-sage-900 text-center">{member.name}</h3>
                <p className="text-sm text-primary-600 font-medium text-center mb-3">{member.role}</p>
                <p className="text-sm text-sage-600 text-center leading-relaxed mb-4">{member.bio}</p>
                <div className="space-y-2 pt-4 border-t border-sage-100">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 text-sage-400 mt-0.5 shrink-0" />
                    <span className="text-xs text-sage-500">{member.education}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-sage-400 mt-0.5 shrink-0" />
                    <span className="text-xs text-sage-500">{member.speciality}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}