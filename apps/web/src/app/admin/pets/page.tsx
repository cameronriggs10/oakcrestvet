"use client";
import { useState } from "react";
import { PawPrint, Search, Syringe, Calendar, ChevronRight, FileText, Upload } from "lucide-react";

const pets = [
  { name: "Max", species: "Dog", breed: "Golden Retriever", age: 3, owner: "John D.", lastVisit: "2025-01-15", records: 2 },
  { name: "Luna", species: "Cat", breed: "Domestic Shorthair", age: 5, owner: "Sarah M.", lastVisit: "2024-06-10", records: 1 },
  { name: "Cooper", species: "Dog", breed: "Beagle", age: 2, owner: "Mike R.", lastVisit: "2025-03-01", records: 3 },
  { name: "Bella", species: "Cat", breed: "Siamese", age: 4, owner: "Emily T.", lastVisit: "2025-04-20", records: 4 },
  { name: "Rocky", species: "Dog", breed: "German Shepherd", age: 6, owner: "James K.", lastVisit: "2025-02-10", records: 6 },
  { name: "Daisy", species: "Dog", breed: "Poodle", age: 1, owner: "Lisa W.", lastVisit: "2025-05-01", records: 1 },
];

export default function AdminPets() {
  const [search, setSearch] = useState("");
  const filtered = pets.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.owner.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="bg-white border-b border-sage-200 px-8 py-6">
        <h1 className="font-display text-2xl font-bold text-sage-900">Pet Records</h1>
        <p className="text-sm text-sage-500 mt-1">View and manage all pet profiles in the clinic database</p>
      </div>

      <div className="p-8 space-y-6">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by pet name or owner..."
            className="w-full pl-10 pr-4 py-2.5 border border-sage-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-xl p-4 border border-sage-100">
            <p className="text-2xl font-bold text-primary-600">{pets.length}</p>
            <p className="text-xs text-sage-500">Total Pets</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-sage-100">
            <p className="text-2xl font-bold text-primary-600">{pets.reduce((a, p) => a + p.records, 0)}</p>
            <p className="text-xs text-sage-500">Total Records</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-sage-100">
            <p className="text-2xl font-bold text-primary-600">3</p>
            <p className="text-xs text-sage-500">Due for Visit</p>
          </div>
        </div>

        {/* Pet List */}
        <div className="bg-white rounded-2xl border border-sage-100 divide-y divide-sage-50">
          {filtered.map((pet) => (
            <div key={pet.name} className="p-5 flex items-center justify-between hover:bg-sage-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
                  <PawPrint className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sage-900">{pet.name}</h3>
                  <p className="text-xs text-sage-500">{pet.breed} • {pet.age} yrs • Owner: {pet.owner}</p>
                  <p className="text-xs text-sage-400">Last visit: {pet.lastVisit} • {pet.records} records</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">{pet.species}</span>
                <ChevronRight className="w-4 h-4 text-sage-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl border border-sage-100 p-6">
          <h2 className="font-semibold text-sage-900 mb-4 flex items-center gap-2">
            <Upload className="w-4 h-4 text-primary-500" /> Upload New Record
          </h2>
          <div className="border-2 border-dashed border-sage-200 rounded-xl p-8 text-center hover:border-primary-300 transition-colors cursor-pointer">
            <FileText className="w-10 h-10 text-sage-300 mx-auto mb-2" />
            <p className="text-sm text-sage-600">Drop a file here or click to browse</p>
            <p className="text-xs text-sage-400 mt-1">Supports PDF, images, and documents</p>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <select className="px-3 py-2 border border-sage-200 rounded-lg text-sm">
              <option>Select pet...</option>
              {pets.map(p => <option key={p.name}>{p.name}</option>)}
            </select>
            <input placeholder="Record description (e.g., Lab Results)" className="px-3 py-2 border border-sage-200 rounded-lg text-sm" />
            <button className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600">Upload</button>
          </div>
        </div>
      </div>
    </>
  );
}