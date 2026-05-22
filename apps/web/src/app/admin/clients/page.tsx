"use client";
import { useState } from "react";
import { Users, Search, Phone, Mail, PawPrint, Calendar, ChevronRight, FileText, MessageSquare, Syringe, Clock, Filter, Download } from "lucide-react";
import Link from "next/link";

const clients = [
  { id: 1, owner: "John D.", email: "john@email.com", phone: "(555) 111-2222", address: "123 Oak St", pets: [{ name: "Max", species: "Dog", breed: "Golden Retriever", age: 3, lastVisit: "Jan 15, 2025" }], lastVisit: "Jan 15, 2025", status: "Active", memberSince: "Jan 2022", totalVisits: 12, totalSpent: 2140 },
  { id: 2, owner: "Sarah M.", email: "sarah@email.com", phone: "(555) 222-3333", address: "456 Elm St", pets: [{ name: "Luna", species: "Cat", breed: "Domestic Shorthair", age: 5, lastVisit: "Jun 10, 2024" }], lastVisit: "Jun 10, 2024", status: "Due Visit", memberSince: "Mar 2023", totalVisits: 8, totalSpent: 950 },
  { id: 3, owner: "Mike R.", email: "mike@email.com", phone: "(555) 333-4444", address: "789 Pine St", pets: [{ name: "Cooper", species: "Dog", breed: "Beagle", age: 2, lastVisit: "Mar 1, 2025" }], lastVisit: "Mar 1, 2025", status: "Active", memberSince: "Aug 2024", totalVisits: 5, totalSpent: 680 },
  { id: 4, owner: "Emily T.", email: "emily@email.com", phone: "(555) 444-5555", address: "321 Birch St", pets: [{ name: "Bella", species: "Cat", breed: "Siamese", age: 4, lastVisit: "Apr 20, 2025" }], lastVisit: "Apr 20, 2025", status: "Active", memberSince: "Feb 2024", totalVisits: 9, totalSpent: 1340 },
  { id: 5, owner: "James K.", email: "james@email.com", phone: "(555) 555-6666", address: "654 Cedar St", pets: [{ name: "Rocky", species: "Dog", breed: "German Shepherd", age: 6, lastVisit: "Feb 10, 2025" }], lastVisit: "Feb 10, 2025", status: "Active", memberSince: "Jun 2021", totalVisits: 22, totalSpent: 4100 },
  { id: 6, owner: "Lisa W.", email: "lisa@email.com", phone: "(555) 666-7777", address: "987 Walnut St", pets: [{ name: "Daisy", species: "Dog", breed: "Poodle", age: 1, lastVisit: "May 1, 2025" }], lastVisit: "May 1, 2025", status: "New", memberSince: "May 2025", totalVisits: 2, totalSpent: 150 },
  { id: 7, owner: "Rob P.", email: "rob@email.com", phone: "(555) 777-8888", address: "246 Maple St", pets: [{ name: "Charlie", species: "Dog", breed: "Beagle", age: 4, lastVisit: "Mar 20, 2025" }, { name: "Max", species: "Dog", breed: "Labrador", age: 7, lastVisit: "Mar 20, 2025" }], lastVisit: "Mar 20, 2025", status: "Active", memberSince: "Mar 2020", totalVisits: 28, totalSpent: 5200 },
];

export default function AdminClients() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = clients.filter(c => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return c.owner.toLowerCase().includes(q) || 
             c.email.toLowerCase().includes(q) || 
             c.phone.includes(q) ||
             c.pets.some(p => p.name.toLowerCase().includes(q));
    }
    return true;
  });

  const client = clients.find(c => c.id === selected);

  if (selected && client) {
    return (
      <>
        <div className="bg-white border-b border-sage-200 px-8 py-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelected(null)} className="text-sage-400 hover:text-sage-600"><ChevronRight className="w-5 h-5 rotate-180" /></button>
            <div>
              <h1 className="font-display text-2xl font-bold text-sage-900">{client.owner}</h1>
              <p className="text-sm text-sage-500">Member since {client.memberSince} • {client.totalVisits} visits • ${client.totalSpent} total spent</p>
            </div>
          </div>
        </div>
        <div className="p-8 space-y-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-sage-100">
              <p className="text-xs text-sage-500 mb-1">Contact</p>
              <p className="font-semibold text-sage-900">{client.email}</p>
              <p className="text-sm text-sage-600">{client.phone}</p>
              <p className="text-xs text-sage-400">{client.address}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-sage-100">
              <p className="text-xs text-sage-500 mb-1">Status</p>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${client.status === "Active" ? "bg-green-50 text-green-600" : client.status === "New" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}>{client.status}</span>
              <p className="text-xs text-sage-400 mt-2">Last visit: {client.lastVisit}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-sage-100">
              <p className="text-xs text-sage-500 mb-1">Quick Actions</p>
              <div className="flex gap-1 mt-1">
                <Link href={`/admin/communications`} className="px-3 py-1.5 text-xs bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 flex items-center gap-1"><MessageSquare className="w-3 h-3" /> Message</Link>
                <Link href={`/admin/invoices`} className="px-3 py-1.5 text-xs bg-green-50 text-green-600 rounded-lg hover:bg-green-100 flex items-center gap-1"><FileText className="w-3 h-3" /> Invoice</Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-sage-100 p-5">
            <h2 className="font-semibold text-sage-900 mb-4 flex items-center gap-2"><PawPrint className="w-4 h-4 text-primary-500" /> Pets</h2>
            <div className="space-y-3">
              {client.pets.map((pet) => (
                <div key={pet.name} className="flex items-center justify-between bg-sage-50 rounded-xl p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center"><PawPrint className="w-5 h-5 text-primary-600" /></div>
                    <div>
                      <p className="font-medium text-sage-900">{pet.name}</p>
                      <p className="text-xs text-sage-500">{pet.breed} • {pet.age} yrs • {pet.species}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/admin/pets" className="text-xs text-primary-600 hover:underline">Records</Link>
                    <span className="text-xs text-sage-400">Last: {pet.lastVisit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-white border-b border-sage-200 px-8 py-6">
        <h1 className="font-display text-2xl font-bold text-sage-900">Clients & Pets</h1>
        <p className="text-sm text-sage-500 mt-1">Search, view, and manage all clients and their pets</p>
      </div>

      <div className="p-8 space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by owner, pet, email, phone..." className="w-full pl-10 pr-4 py-2.5 border border-sage-200 rounded-xl text-sm" />
          </div>
          {["all", "Active", "New", "Due Visit"].map(s => (
            <button key={s} onClick={() => setStatusFilter(s === "all" ? "all" : s)}
              className={`px-3 py-1.5 text-xs rounded-full ${statusFilter === s ? "bg-primary-500 text-white" : "bg-sage-100 text-sage-600 hover:bg-sage-200"}`}
            >{s === "all" ? "All" : s}</button>
          ))}
          <span className="text-xs text-sage-400 ml-auto">{filtered.length} of {clients.length} clients</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {filtered.map((client) => (
            <button key={client.id} onClick={() => setSelected(client.id)}
              className="bg-white rounded-2xl border border-sage-100 p-4 text-left hover:shadow-md hover:border-primary-200 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sage-900">{client.owner}</h3>
                    <div className="flex items-center gap-3 text-xs text-sage-500 mt-0.5">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {client.email}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {client.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {client.pets.map(p => (
                        <span key={p.name} className="text-xs bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <PawPrint className="w-2.5 h-2.5" /> {p.name}
                        </span>
                      ))}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        client.status === "Active" ? "bg-green-50 text-green-600" :
                        client.status === "New" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                      }`}>{client.status}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right text-xs text-sage-400">
                  <p>Last visit: {client.lastVisit}</p>
                  <p>{client.totalVisits} visits • ${client.totalSpent}</p>
                  <ChevronRight className="w-4 h-4 ml-auto mt-1 text-sage-300 group-hover:text-primary-500 transition-colors" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}