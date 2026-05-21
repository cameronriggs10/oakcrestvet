import { Button } from "@/components/ui/Button";
import { Mail, Award, GraduationCap } from "lucide-react";

const teamMembers = [
  {
    name: "Dr. Jim Tibbs",
    role: "Lead Veterinarian & Founder",
    bio: "Dr. Tibbs is a native Washingtonian and graduate of Archbishop Carroll. He earned his degrees in Animal Science and Veterinary Medicine from Tuskegee Institute in 1976. With decades of experience, he has served on committees of the American Veterinary Medical Association and held office with his Alumni Association. Locally, he has served as President of the Maryland Veterinary Medical Association and the Prince George's County Veterinary Medical Association. He is licensed in DC, Maryland, and Virginia.",
    education: "DVM, Tuskegee Institute",
    speciality: "Internal Medicine & Surgery",
  },
  {
    name: "Associate Veterinarian",
    role: "Veterinary Team",
    bio: "Our veterinary team brings together years of experience in emergency care, dentistry, preventive medicine, and orthopedic surgery. Every member of our staff shares Dr. Tibbs' commitment to compassionate, community-focused veterinary care.",
    education: "Licensed in MD, DC & VA",
    speciality: "Full-Service Veterinary Care",
  },
  {
    name: "Support Staff",
    role: "Veterinary Technicians & Assistants",
    bio: "Our dedicated technicians and assistants ensure every visit is comfortable for both pets and their owners. From greeting you at the door to assisting in surgeries, they are the heart of Oak Crest.",
    education: "Certified Veterinary Technicians",
    speciality: "Patient Care & Client Support",
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