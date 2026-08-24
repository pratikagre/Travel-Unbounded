import Link from "next/link";
import { Compass, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 text-teal-400">
              <Compass className="h-7 w-7" />
              <span className="text-lg font-bold tracking-tight text-white">
                TRAVEL <span className="text-teal-400 font-extrabold">UNBOUNDED</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              India's most trusted experiential travel experts. We design trips that blend comfort, culture, and raw nature.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal-400 transition-colors">Plan Trip / Enquiry</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-teal-400 transition-colors">Admin Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-teal-400" />
                <span className="hover:text-teal-400">enquiry@travelunbounded.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-teal-400" />
                <span className="hover:text-teal-400">+91 98765 43210</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-teal-400 mt-1 shrink-0" />
                <span className="text-gray-400">
                  541, 7th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru – 560008, India
                </span>
              </li>
            </ul>
          </div>

          {/* Office Locations Shortlist */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Our Offices</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <strong className="text-gray-300">Bengaluru (HQ):</strong> Indiranagar, Karnataka
              </li>
              <li>
                <strong className="text-gray-300">Kochi:</strong> Palavivatton, Kerala
              </li>
              <li>
                <strong className="text-gray-300">Nairobi:</strong> Muthithi Road, Kenya
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and Credits */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Travel Unbounded. All rights reserved. Built with Next.js & MongoDB.</p>
        </div>
      </div>
    </footer>
  );
}
