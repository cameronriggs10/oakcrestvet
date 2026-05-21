"use client";
import { useState } from "react";
import { PawPrint, Search, Syringe, Calendar, ChevronRight, FileText, Upload, X, Download, Heart, Activity, Pill, User, Clock } from "lucide-react";

const petsData = [
  { name: "Max", species: "Dog", breed: "Golden Retriever", age: 3, owner: "John D.", ownerEmail: "john@email.com", phone: "(555) 111-2222", lastVisit: "2025-01-15", records: 2, color: "Golden", weight: "72 lbs", microchip: "985112345678901", vaccinations: [{ name: "Rabies", date: "Jan 2025", due: "Jan 2026" }, { name: "DHPP", date: "Jan 2025", due: "Jan 2026" }, { name: "Bordetella", date: "Mar 2025", due: "Sep 2025" }] },
  { name: "Luna", species: "Cat", breed: "Domestic Shorthair", age: 5, owner: "Sarah M.", ownerEmail: "sarah@email.com", phone: "(555) 222-3333", lastVisit: "2024-06-10", records: 1, color: "Gray Tabby", weight: "9 lbs", microchip: "985112345678902", vaccinations: [{ name: "Rabies", date: "Jun 2024", due: "Jun 2025" }, { name: "FVRCP", date: "Jun 2024", due: "Jun 2025" }] },
  { name: "Cooper", species: "Dog", breed: "Beagle", age: 2, owner: "Mike R.", ownerEmail: "mike@email.com", phone: "(555) 333-4444", lastVisit: "2025-03-01", records: 3, color: "Tricolor", weight: "28 lbs", microchip: "985112345678903", vaccinations: [{ name: "Rabies", date: "Mar 2025", due: "Mar 2026" }, { name: "DHPP", date: "Mar 2025", due: "Mar 2026" }, { name: "Bordetella", date: "Mar 2025", due: "Sep 2025" }, { name: "Lepto", date: "Mar 2025", due: "Mar 2026" }] },
  { name: "Bella", species: "Cat", breed: "Siamese", age: 4, owner: "Emily T.", ownerEmail: "emily@email.com", phone: "(555) 444-5555", lastVisit: "2025-04-20", records: 4, color: "Cream", weight: "8 lbs", microchip: "985112345678904", vaccinations: [{ name: "Rabies", date: "Apr 2025", due: "Apr 2026" }, { name: "FVRCP", date: "Apr 2025", due: "Apr 2026" }] },
  { name: "Rocky", species: "Dog", breed: "German Shepherd", age: 6, owner: "James K.", ownerEmail: "james@email.com", phone: "(555) 555-6666", lastVisit: "2025-02-10", records: 6, color: "Black/Tan", weight: "85 lbs", microchip: "985112345678905", vaccinations: [{ name: "Rabies", date: "Feb 2025", due: "Feb 2026" }, { name: "DHPP", date: "Feb 2025", due: "Feb 2026" }, { name: "Bordetella", date: "Feb 2025", due: "Aug 2025" }] },
  { name: "Daisy", species: "Dog", breed: "Poodle", age: 1, owner: "Lisa W.", ownerEmail: "lisa@email.com", phone: "(555) 666-7777", lastVisit: "2025-05-01", records: 1, color: "White", weight: "12 lbs", microchip: "985112345678906", vaccinations: [{ name: "Rabies", date: "May 2025", due: "May 2026" }, { name: "DHPP", date: "May 2025", due: "May 2026" }, { name: "Bordetella", date: "May 2025", due: "Nov 2025" }] },
];

const uploadedFiles: string[] = [];

export default function AdminPets() {
  const [search, setSearch] = useState("");
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const filtered = petsData.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.owner.toLowerCase().includes(search.toLowerCase())
  );

  const pet = petsData.find(p => p.name === selectedPet);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    const names = droppedFiles.map(f => f.name);
    setFiles(prev => [...prev, ...names]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const names = Array.from(e.target.files).map(f => f.name);
      setFiles(prev => [...prev, ...names]);
    }
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
    setFiles([]);
    setNote("");
  };

  if (selectedPet && pet) {
    return (
      <>
        <div className="bg-white border-b border-sage-200 px-8 py-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedPet(null)} className="text-sage-400 hover:text-sage-600">
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <div>
              <h1 className="font-display text-2xl font-bold text-sage-900">{pet.name}</h1>
              <p className="text-sm text-sage-500">{pet.breed} • {pet.age} years • {pet.species}</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6 max-w-4xl">
          {/* Pet Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-sage-100">
              <p className="text-xs text-sage-500 mb-1">Owner</p>
              <p className="font-semibold text-sage-900">{pet.owner}</p>
              <p className="text-xs text-sage-400">{pet.ownerEmail} • {pet.phone}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-sage-100">
              <p className="text-xs text-sage-500 mb-1">Details</p>
              <p className="font-semibold text-sage-900">{pet.color} • {pet.weight}</p>
              <p className="text-xs text-sage-400">Microchip: {pet.microchip}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-sage-100">
              <p className="text-xs text-sage-500 mb-1">Last Visit</p>
              <p className="font-semibold text-sage-900">{pet.lastVisit}</p>
              <p className="text-xs text-sage-400">{pet.records} medical records</p>
            </div>
          </div>

          {/* Vaccinations */}
          <div className="bg-white rounded-2xl border border-sage-100 p-5">
            <h2 className="font-semibold text-sage-900 mb-3 flex items-center gap-2"><Syringe className="w-4 h-4 text-primary-500" /> Vaccinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {pet.vaccinations.map((v) => (
                <div key={v.name} className="flex items-center justify-between bg-sage-50 rounded-xl px-4 py-2.5">
                  <div>
                    <p className="text-sm font-medium text-sage-900">{v.name}</p>
                    <p className="text-xs text-sage-500">Given: {v.date}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${new Date(v.due) < new Date() ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {new Date(v.due) < new Date() ? 'OVERDUE' : `Due ${v.due}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Records Section */}
          <div className="bg-white rounded-2xl border border-sage-100 p-5">
            <h2 className="font-semibold text-sage-900 mb-4 flex items-center gap-2"><Upload className="w-4 h-4 text-primary-500" /> Upload Medical Records</h2>
            
            {uploadSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-700 mb-4">✅ Records uploaded successfully!</div>
            )}

            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${dragOver ? 'border-primary-500 bg-primary-50' : 'border-sage-200 hover:border-primary-300'}`}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <input id="fileInput" type="file" multiple onChange={handleFileInput} className="hidden" />
              <Upload className={`w-10 h-10 mx-auto mb-2 ${dragOver ? 'text-primary-500' : 'text-sage-300'}`} />
              <p className="text-sm text-sage-600">Drag & drop files here or click to browse</p>
              <p className="text-xs text-sage-400 mt-1">Supports PDF, images (.jpg, .png), and documents</p>
            </div>

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-sage-700">Files to upload ({files.length})</p>
                {files.map((f, i) => (
                  <div key={i} className="flex items-center justify-between bg-sage-50 rounded-lg px-3 py-2">
                    <span className="text-sm text-sage-700 flex items-center gap-2"><FileText className="w-4 h-4 text-primary-500" /> {f}</span>
                    <button onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))} className="text-sage-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                  </div>
                ))}
                <input value={note} onChange={e => setNote(e.target.value)} placeholder="Add a note about this upload (e.g., Lab results from May visit)" className="w-full px-3 py-2 border border-sage-200 rounded-lg text-sm" />
                <button onClick={handleUpload} className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 flex items-center gap-2">
                  <Upload className="w-4 h-4" /> Upload {files.length} file{files.length > 1 ? 's' : ''}
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-white border-b border-sage-200 px-8 py-6">
        <h1 className="font-display text-2xl font-bold text-sage-900">Pet Records</h1>
        <p className="text-sm text-sage-500 mt-1">Click a pet to view details, records, and upload documents</p>
      </div>

      <div className="p-8 space-y-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by pet name or owner..." className="w-full pl-10 pr-4 py-2.5 border border-sage-200 rounded-xl text-sm" />
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-xl p-4 border border-sage-100"><p className="text-2xl font-bold text-primary-600">{petsData.length}</p><p className="text-xs text-sage-500">Total Pets</p></div>
          <div className="bg-white rounded-xl p-4 border border-sage-100"><p className="text-2xl font-bold text-primary-600">{petsData.reduce((a, p) => a + p.records, 0)}</p><p className="text-xs text-sage-500">Total Records</p></div>
          <div className="bg-white rounded-xl p-4 border border-sage-100"><p className="text-2xl font-bold text-primary-600">{petsData.filter(p => new Date(p.vaccinations[0]?.due) < new Date()).length}</p><p className="text-xs text-sage-500">Due for Visit</p></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((pet) => (
            <button key={pet.name} onClick={() => setSelectedPet(pet.name)}
              className="bg-white rounded-2xl border border-sage-100 p-5 text-left hover:shadow-md hover:border-primary-200 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                  <PawPrint className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sage-900">{pet.name}</h3>
                  <p className="text-xs text-sage-500">{pet.breed} • {pet.age} yrs • Owner: {pet.owner}</p>
                  <p className="text-xs text-sage-400">Last visit: {pet.lastVisit} • {pet.records} records</p>
                </div>
                <ChevronRight className="w-5 h-5 text-sage-300 group-hover:text-primary-500 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}