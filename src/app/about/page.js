import { MapPin, CheckCircle, Compass, Users, Map, Shield } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us | Travel Unbounded",
  description: "Learn about Travel Unbounded - India's most trusted experiential travel experts. Personally vetted tours, offices in Bengaluru, Kochi, and Nairobi.",
};

export default function AboutPage() {
  const offices = [
    {
      city: "Bengaluru",
      role: "Headquarters",
      address: [
        "541, 7th Main Rd, HAL 2nd Stage",
        "Indiranagar, Bengaluru – 560008",
        "India",
      ],
      mapLink: "https://maps.google.com/?q=541,+7th+Main+Rd,+HAL+2nd+Stage,+Indiranagar,+Bengaluru",
    },
    {
      city: "Kochi",
      role: "Kerala Office",
      address: [
        "LR Towers, S Janatha Road",
        "Palavivatton, Kochi – 682025",
        "India",
      ],
      mapLink: "https://maps.google.com/?q=LR+Towers,+S+Janatha+Road,+Palavivatton,+Kochi",
    },
    {
      city: "Nairobi",
      role: "Kenya Office",
      address: [
        "Westpark Towers, Muthithi Road",
        "Nairobi, P.O. Box 6950",
        "Postal Code 00100",
        "Kenya",
      ],
      mapLink: "https://maps.google.com/?q=Westpark+Towers,+Muthithi+Road,+Nairobi",
    },
  ];

  const values = [
    {
      title: "Personally-Vetted Experiences",
      description: "We never recommend a destination, resort, or guide that our team has not personally experienced and approved.",
      icon: Shield,
    },
    {
      title: "Local Expert Guides",
      description: "Our handpicked local guides know their home turf intimately, taking you past tourist traps into true local stories.",
      icon: Users,
    },
    {
      title: "Bespoke Custom Itineraries",
      description: "Every trip is designed from scratch, custom-built around your personal interests, pacing, and comfort style.",
      icon: Map,
    },
    {
      title: "24/7 Ground Support",
      description: "Our dedicated team is on call at all times on the ground to handle updates, changes, and local requirements.",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="bg-teal-900 py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80')]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-300">Our Story</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            India's Most Trusted Experiential Travel Experts
          </h1>
          <p className="text-teal-100 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Travel Unbounded was born from a simple belief — that the best journeys aren't sold from a catalogue. They're built around the people taking them.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Who We Are & What We Believe
              </h2>
              <div className="text-base text-gray-600 leading-relaxed space-y-4">
                <p>
                  Headquartered in Bangalore with offices in Kerala and Nairobi, we design trips that blend comfort, culture, and raw nature. Every destination, resort, and activity we recommend has been personally experienced by our team.
                </p>
                <p>
                  From spotting the Big Five at dawn in the Masai Mara to cruising Ha Long Bay at sunset — we go where real stories are written, and we bring you along.
                </p>
                <p>
                  Our founders and destination managers are travel zealots. We believe that true travel is not about ticking off boxes on an itinerary; it is about local immersion, slow exploration, and creating stories you will recount for a lifetime.
                </p>
              </div>
            </div>

            {/* Collage/Image */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80"
                  alt="Travelers in wild safari"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-teal-600 text-white p-6 rounded-2xl shadow-xl hidden sm:flex items-center space-x-3 max-w-[240px]">
                <Compass className="h-10 w-10 shrink-0 text-teal-200 animate-spin-slow" />
                <div>
                  <div className="text-xl font-bold">100%</div>
                  <div className="text-xs text-teal-100 font-medium">Personally Vetted Lodges</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Values Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Travel Unbounded
            </h2>
            <p className="text-base text-gray-500">
              We focus on detail and design so you can focus on absorbing the magic of your destination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-teal-50 text-teal-600">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{val.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{val.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Office Locations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Our Offices
            </h2>
            <p className="text-base text-gray-500">
              Walk in for a chat or contact our destination specialists across our local hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col justify-between hover:border-teal-100 hover:bg-teal-50/5 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-200/60 pb-4">
                    <h3 className="text-xl font-extrabold text-gray-900">{office.city}</h3>
                    <span className="inline-flex px-2.5 py-1 text-xs font-bold bg-teal-50 text-teal-700 rounded-md border border-teal-100">
                      {office.role}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed font-medium space-y-1">
                    {office.address.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-200/40">
                  <a
                    href={office.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-sm font-bold text-teal-600 hover:text-teal-700"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>View on Google Maps</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About CTA */}
      <section className="bg-gray-950 py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl font-bold sm:text-3xl">Let's craft your next travel milestone</h2>
          <p className="text-gray-400 text-base max-w-md mx-auto">
            Contact us today and speak with our destination specialists in Bangalore, Kerala, or Nairobi.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-full shadow-lg transition-colors"
            >
              Start Planning
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
