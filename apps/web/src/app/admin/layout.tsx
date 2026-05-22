"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, PawPrint, FileText, Bell, Settings, ChevronLeft, MessageSquare, DollarSign, ClipboardList, Users } from "lucide-react";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/clients", label: "Clients & Pets", icon: Users },
  { href: "/admin/appointments", label: "Appointments", icon: Calendar },
  { href: "/admin/pets", label: "Pet Records", icon: PawPrint },
  { href: "/admin/communications", label: "Communications", icon: MessageSquare },
  { href: "/admin/forms", label: "Patient Forms", icon: ClipboardList },
  { href: "/admin/invoices", label: "Invoicing", icon: DollarSign },
  { href: "/admin/alerts", label: "Send Alerts", icon: Bell },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sage-900 text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-sage-800">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-display font-bold text-sm">Oak Crest</p>
              <p className="text-xs text-sage-400 -mt-0.5">Admin Portal</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active ? "bg-primary-600 text-white" : "text-sage-300 hover:bg-sage-800 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-sage-800">
          <Link href="/" className="flex items-center gap-2 text-xs text-sage-400 hover:text-white transition-colors">
            <ChevronLeft className="w-3 h-3" />
            Back to Website
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-sage-50 overflow-auto">
        {children}
      </main>
    </div>
  );
}