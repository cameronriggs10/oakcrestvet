import Link from "next/link";
import { PawPrint, Phone, Mail, MapPin, Clock, Globe, Camera, Video } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-sage-900 text-sage-200">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-display text-lg font-bold text-white">
                  Oak Crest
                </span>
                <span className="block text-xs text-sage-400 -mt-0.5">
                  Veterinary Services
                </span>
              </div>
            </Link>
            <p className="text-sm text-sage-300 leading-relaxed">
              Providing compassionate, high-quality veterinary care for your beloved pets.
              Your pet&apos;s health and happiness are our top priority.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Services", href: "/services" },
                { label: "About Us", href: "/about" },
                { label: "New Clients", href: "/new-clients" },
                { label: "Pricing & Insurance", href: "/pricing" },
                { label: "Pet Health Blog", href: "/blog" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-sage-300 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-400 shrink-0" />
                <span className="text-sm text-sage-300">
                  123 Main Street, Suite 100<br />
                  Anytown, ST 12345
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                <a href="tel:+15551234567" className="text-sm text-sage-300 hover:text-primary-400 transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                <a href="mailto:info@oakcrestvet.com" className="text-sm text-sage-300 hover:text-primary-400 transition-colors">
                  info@oakcrestvet.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 text-primary-400 shrink-0" />
                <div className="text-sm text-sage-300">
                  <p>Mon-Fri: 8am - 6pm</p>
                  <p>Sat: 9am - 3pm</p>
                  <p>Sun: Closed</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display text-white font-semibold mb-4">Stay Connected</h3>
            <p className="text-sm text-sage-300 mb-4">
              Subscribe to our newsletter for pet health tips and clinic updates.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2.5 text-sm bg-sage-800 border border-sage-700 rounded-lg text-white placeholder:text-sage-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 text-sm font-medium bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="w-9 h-9 bg-sage-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors" aria-label="Facebook">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-sage-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors" aria-label="Instagram">
                <Camera className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-sage-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors" aria-label="YouTube">
                <Video className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sage-800">
        <div className="container-wide py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-sage-400">
            &copy; {new Date().getFullYear()} Oak Crest Veterinary Services. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-sage-400 hover:text-primary-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-sage-400 hover:text-primary-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}