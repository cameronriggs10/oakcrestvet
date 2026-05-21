"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, PawPrint, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Team", href: "/team" },
      { label: "About Us", href: "/about" },
    ],
  },
  { label: "New Clients", href: "/new-clients" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-sage-100 shadow-sm">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-colors">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-xl font-bold text-primary-800">
                Oak Crest
              </span>
              <span className="block text-xs text-sage-500 -mt-1">
                Veterinary Services
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setDropdownOpen(item.label)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <Link
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-sage-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors flex items-center gap-1"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </Link>
                {item.children && dropdownOpen === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-sage-100 py-2 animate-fade-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-sage-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link href="/portal/dashboard">
              <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                Client Portal
              </Button>
            </Link>
            <Link href="/booking">
              <Button size="sm">
                Book Appointment
              </Button>
            </Link>
            <button
              className="lg:hidden p-2 text-sage-700 hover:text-primary-600"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-sage-100 bg-white animate-fade-in">
          <div className="container-wide py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block px-3 py-2.5 text-sm font-medium text-sage-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block pl-8 pr-3 py-2 text-sm text-sage-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="pt-2">
              <Link href="/portal/dashboard">
                <Button variant="outline" className="w-full">
                  Client Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}