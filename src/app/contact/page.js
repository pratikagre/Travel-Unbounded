import { Suspense } from "react";
import { Compass, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Plan Your Trip | Travel Unbounded",
  description: "Plan your trip with Travel Unbounded. Submit your booking enquiry and let our travel specialists customize a bespoke experience for you.",
};

function FormFallback() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-10 max-w-2xl mx-auto my-6 flex flex-col items-center justify-center min-h-[400px]">
      <Loader2 className="h-10 w-10 text-teal-600 animate-spin" />
      <p className="mt-4 text-sm text-gray-500 font-medium">Loading booking form...</p>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="bg-teal-900 py-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80')]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-300">Plan Your Journey</span>
          <h1 className="text-4xl font-extrabold tracking-tight">Connect With Our Travel Experts</h1>
          <p className="text-teal-100 text-base max-w-xl mx-auto font-light leading-relaxed">
            Tell us about your dream destination, pacing, and preferences, and our destination specialists will handle the rest.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact Cards and Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Let's build something unforgettable</h2>
                <p className="text-base text-gray-500 leading-relaxed">
                  Have questions about custom routes, guides, or hotel categories? Reach out to our regional offices directly or use the form to request a callback.
                </p>
              </div>

              {/* Office Details */}
              <div className="space-y-4">
                {/* Bangalore HQ */}
                <div className="flex items-start space-x-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-center h-10 w-10 bg-teal-50 rounded-lg text-teal-600 shrink-0 mt-0.5">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Bengaluru Headquarters</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      541, 7th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru – 560008, India
                    </p>
                    <p className="text-xs font-bold text-teal-600 mt-2 flex items-center space-x-1">
                      <Phone className="h-3 w-3 inline" /> <span>+91 80 4958 2901</span>
                    </p>
                  </div>
                </div>

                {/* Kochi Office */}
                <div className="flex items-start space-x-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-center h-10 w-10 bg-teal-50 rounded-lg text-teal-600 shrink-0 mt-0.5">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Kochi Regional Office</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      LR Towers, S Janatha Road, Palavivatton, Kochi – 682025, India
                    </p>
                    <p className="text-xs font-bold text-teal-600 mt-2 flex items-center space-x-1">
                      <Phone className="h-3 w-3 inline" /> <span>+91 484 2948 502</span>
                    </p>
                  </div>
                </div>

                {/* Nairobi Office */}
                <div className="flex items-start space-x-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-center h-10 w-10 bg-teal-50 rounded-lg text-teal-600 shrink-0 mt-0.5">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Nairobi Safari Office</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Westpark Towers, Muthithi Road, Nairobi, Kenya
                    </p>
                    <p className="text-xs font-bold text-teal-600 mt-2 flex items-center space-x-1">
                      <Phone className="h-3 w-3 inline" /> <span>+254 20 5948 102</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* General Enquiry Box */}
              <div className="p-6 bg-teal-50 rounded-2xl border border-teal-100/60 text-teal-900">
                <h4 className="text-sm font-bold flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-teal-600" />
                  <span>General Enquiries</span>
                </h4>
                <p className="text-xs text-teal-800 mt-2 leading-relaxed">
                  For corporate retreats, destination weddings, or general inquiries, email us at: <br />
                  <a href="mailto:enquiry@travelunbounded.com" className="font-bold underline text-teal-900 hover:text-teal-950">
                    enquiry@travelunbounded.com
                  </a>
                </p>
              </div>
            </div>

            {/* Right Column: Booking Form Container */}
            <div className="lg:col-span-7">
              <Suspense fallback={<FormFallback />}>
                <BookingForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
