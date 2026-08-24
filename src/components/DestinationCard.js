import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function DestinationCard({ destination }) {
  const { name, country, image, description, price } = destination;

  // Format price with comma separation for Indian currency format (e.g., ₹25,000)
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Image Area */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={`${name}, ${country}`}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category Tag */}
        <div className="absolute top-4 left-4 inline-flex items-center space-x-1 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-teal-700 shadow-sm">
          <Compass className="h-3 w-3" />
          <span>{country}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-teal-600 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        <div className="mt-6 pt-5 border-t border-gray-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-semibold tracking-wider uppercase">Starting From</span>
            <span className="text-lg font-extrabold text-teal-600">{formattedPrice}</span>
          </div>
          <Link
            href={`/contact?destination=${encodeURIComponent(name)}`}
            className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 border border-teal-600 text-sm font-semibold rounded-full text-teal-600 hover:bg-teal-600 hover:text-white transition-all duration-200"
          >
            <span>Enquire</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
