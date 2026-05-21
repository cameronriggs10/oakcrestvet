"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PawPrint, Plus, Syringe, Calendar, FileText, ChevronRight } from "lucide-react";

const pets = [
  {
    name: "Max",
    species: "Dog",
    breed: "Golden Retriever",
    age: 3,
    weight: "72 lbs",
    color: "Golden",
    microchip: "985112345678901",
    vaccinations: [
      { name: "Rabies", date: "2025-01-15", due: "2026-01-15" },
      { name: "DHPP", date: "2025-01-15", due: "2026-01-15" },
      { name: "Bordetella", date: "2025-03-01", due: "2025-09-01" },
    ],
    lastVisit: "2025-01-15",
  },
  {
    name: "Luna",
    species: "Cat",
    breed: "Domestic Shorthair",
    age: 5,
    weight: "9 lbs",
    color: "Gray Tabby",
    microchip: "985112345678902",
    vaccinations: [
      { name: "Rabies", date: "2024-06-10", due: "2025-06-10" },
      { name: "FVRCP", date: "2024-06-10", due: "2025-06-10" },
    ],
    lastVisit: "2024-06-10",
  },
];

export default function PortalPetsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-12">
        <div className="container-wide">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-white">My Pets</h1>
              <p className="text-primary-100 text-sm mt-1">Manage your pet profiles and health records</p>
            </div>
            <Button className="bg-white text-primary-700 hover:bg-primary-50">
              <Plus className="w-4 h-4" /> Add Pet
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container-wide">
          <div className="space-y-6">
            {pets.map((pet) => (
              <div key={pet.name} className="bg-white border border-sage-100 rounded-2xl overflow-hidden">
                {/* Pet Header */}
                <div className="p-6 flex items-start gap-4 border-b border-sage-50">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
                    <PawPrint className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-sage-900">{pet.name}</h2>
                    <p className="text-sm text-sage-500">{pet.breed} • {pet.age} years • {pet.weight}</p>
                    <p className="text-xs text-sage-400">Color: {pet.color} • Microchip: {pet.microchip}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="xs">Edit</Button>
                    <Link href={`/portal/records?pet=${pet.name.toLowerCase()}`}><Button variant="ghost" size="xs">Records</Button></Link>
                  </div>
                </div>

                {/* Vaccination Schedule */}
                <div className="p-6">
                  <h3 className="font-semibold text-sage-900 mb-3 flex items-center gap-2">
                    <Syringe className="w-4 h-4 text-primary-500" /> Vaccinations
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-sage-500 border-b border-sage-100">
                          <th className="pb-2 font-medium">Vaccine</th>
                          <th className="pb-2 font-medium">Last Given</th>
                          <th className="pb-2 font-medium">Next Due</th>
                          <th className="pb-2 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pet.vaccinations.map((vax) => (
                          <tr key={vax.name} className="border-b border-sage-50">
                            <td className="py-2.5 text-sage-900">{vax.name}</td>
                            <td className="py-2.5 text-sage-600">{vax.date}</td>
                            <td className="py-2.5 text-sage-600">{vax.due}</td>
                            <td className="py-2.5">
                              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                new Date(vax.due) > new Date() 
                                  ? "bg-green-50 text-green-600"
                                  : "bg-red-50 text-red-600"
                              }`}>
                                {new Date(vax.due) > new Date() ? "Up to Date" : "Due Soon"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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