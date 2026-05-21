"use client";

import { useState } from "react";
import { FileText, Download, Eye, Calendar, Syringe, Activity } from "lucide-react";

interface Record {
  id: number;
  date: string;
  type: string;
  description: string;
  doctor: string;
  pet: string;
  files: string[];
}

const records: Record[] = [
  {
    id: 1, date: "2025-01-15", type: "Annual Wellness Exam",
    description: "Comprehensive wellness exam. All vitals normal. Vaccinations updated.",
    doctor: "Dr. Jim Tibbs", pet: "Max",
    files: ["Exam_Summary_Max_Jan2025.txt"],
  },
  {
    id: 2, date: "2025-03-15", type: "Dental Cleaning",
    description: "Professional dental cleaning performed. Grade 1 tartar removed. No extractions needed.",
    doctor: "Dr. Jim Tibbs", pet: "Max",
    files: ["Dental_Report_Max_Mar2025.txt"],
  },
  {
    id: 3, date: "2024-06-10", type: "Wellness Exam",
    description: "Annual wellness exam. Vaccinations updated. Healthy weight maintained.",
    doctor: "Dr. Jim Tibbs", pet: "Luna",
    files: ["Exam_Summary_Luna_Jun2024.txt"],
  },
];

export default function PortalRecordsPage() {
  const [selectedPet, setSelectedPet] = useState<string>("All");

  const filtered = selectedPet === "All" ? records : records.filter(r => r.pet === selectedPet);

  return (
    <>
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-12">
        <div className="container-wide">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white">Medical Records</h1>
          <p className="text-primary-100 text-sm mt-1">Access your pet&apos;s complete medical history</p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container-wide">
          {/* Filter */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-sage-500">Filter by pet:</span>
            {["All", "Max", "Luna"].map((pet) => (
              <button
                key={pet}
                onClick={() => setSelectedPet(pet)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  selectedPet === pet
                    ? "bg-primary-500 text-white"
                    : "bg-sage-100 text-sage-600 hover:bg-sage-200"
                }`}
              >
                {pet}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            {filtered.map((record) => (
              <div key={record.id} className="bg-white border border-sage-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                      {record.type.includes("Dental") ? (
                        <Activity className="w-6 h-6 text-primary-600" />
                      ) : (
                        <Syringe className="w-6 h-6 text-primary-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sage-900">{record.type}</h3>
                        <span className="text-xs bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full">{record.pet}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-sage-500 mb-2">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{record.date}</span>
                        <span>{record.doctor}</span>
                      </div>
                      <p className="text-sm text-sage-700">{record.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {record.files.map((file) => (
                      <div key={file} className="flex gap-1">
                        <a
                          href={`/records/${file}`}
                          target="_blank"
                          className="p-2 text-sage-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors inline-flex" title={`View ${file}`}
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <a
                          href={`/records/${file}`}
                          download
                          className="p-2 text-sage-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors inline-flex" title={`Download ${file}`}
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
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