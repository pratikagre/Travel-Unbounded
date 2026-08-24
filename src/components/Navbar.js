"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Compass } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Plan Trip", href: "/contact" },
    { name: "Admin Dashboard", href: "/admin" },
  ];

  const isActive = (path) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-teal-600 transition-colors hover:text-teal-700">
              <Compass className="h-8 w-8 animate-spin-slow" />
              <span className="text-xl font-bold tracking-tight text-gray-900">
                TRAVEL <span className="text-teal-600 font-extrabold">UNBOUNDED</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-teal-600 border-b-2 border-teal-600 py-1"
                    : "text-gray-600 hover:text-teal-600 py-1"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-all hover:shadow hover:-translate-y-0.5 duration-150"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-teal-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden animate-fade-in bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-base font-semibold tracking-wide ${
                  isActive(link.href)
                    ? "bg-teal-50 text-teal-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-teal-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-gray-100 px-3">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-4 py-3 border border-transparent text-base font-medium rounded-full text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
