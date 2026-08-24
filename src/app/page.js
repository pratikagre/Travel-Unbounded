import Link from "next/link";
import { ArrowRight, Globe, Map, ShieldCheck, Compass } from "lucide-react";
import { destinations } from "@/data/destinations";
import DestinationCard from "@/components/DestinationCard";

export default function Home() {
  const indiaDestinations = destinations.filter((dest) => dest.category === "india");
  const internationalDestinations = destinations.filter((dest) => dest.category === "international");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative h-[85vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out scale-105"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/70 via-gray-900/50 to-gray-950/70" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-teal-500/20 backdrop-blur-md rounded-full text-teal-300 text-xs sm:text-sm font-bold tracking-wider uppercase border border-teal-500/30">
            <Compass className="h-4 w-4 animate-spin-slow" />
            <span>India's Most Trusted Experiential Travel Experts</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Crafting Journeys That <br />
            <span className="text-teal-400 bg-clip-text">Write Real Stories</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-200 leading-relaxed font-light">
            We don't sell from a catalogue. We design bespoke, personally-vetted travel experiences that connect you with local culture, comfort, and raw nature.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-full shadow-lg hover:shadow-teal-500/20 transition-all hover:-translate-y-0.5 duration-200"
            >
              <span>Plan Your Trip</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-full border border-white/20 transition-all duration-200"
            >
              Discover Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4 p-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-teal-50 text-teal-600 shrink-0">
                <Map className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Custom Itineraries</h3>
                <p className="mt-1 text-sm text-gray-500">Every route and lodge is tailored specifically to your speed, interest, and budget.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-teal-50 text-teal-600 shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Personally Vetted</h3>
                <p className="mt-1 text-sm text-gray-500">We never recommend a resort, tour, or activity that our team hasn't personally experienced.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-teal-50 text-teal-600 shrink-0">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">24x7 Expert Support</h3>
                <p className="mt-1 text-sm text-gray-500">From airport transfers to midnight queries, our local travel experts are with you 24x7.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* India Destinations Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-end md:justify-between mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Explore Domestic Wonders
              </h2>
              <p className="mt-4 text-base text-gray-500">
                Immerse yourself in India's rich heritage, sun-soaked beaches, mountain trails, and lush green backwaters.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-flex items-center text-sm font-semibold text-teal-600">
                India Packages
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {indiaDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </div>
      </section>

      {/* International Destinations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-end md:justify-between mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Discover Global Horizons
              </h2>
              <p className="mt-4 text-base text-gray-500">
                Journey beyond borders to experience magnificent African safaris, majestic bays, hot geysers, and tea estates.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-flex items-center text-sm font-semibold text-teal-600">
                International Packages
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {internationalDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-teal-900 py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Plan Your Experiential Getaway?
          </h2>
          <p className="text-teal-100 text-lg font-light leading-relaxed max-w-xl mx-auto">
            Connect with a Travel Unbounded destination specialist and let us design a customized journey that fits you perfectly.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold rounded-full shadow-lg hover:shadow-amber-500/20 transition-all hover:-translate-y-0.5 duration-200"
            >
              Start Planning Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
