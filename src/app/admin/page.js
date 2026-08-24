"use client";

import { useState, useEffect } from "react";
import { Users, Calendar, Home, RefreshCw, Search, Mail, Phone, User, Compass, HelpCircle, Loader2 } from "lucide-react";
import Toast from "@/components/Toast";

export default function AdminPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [hotelFilter, setHotelFilter] = useState("All");
  const [toast, setToast] = useState(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/enquiry");
      const data = await response.json();
      if (response.ok && data.success) {
        setEnquiries(data.data);
        setFilteredEnquiries(data.data);
      } else {
        setToast({
          message: "Failed to load enquiries: " + (data.errors ? data.errors.join(" ") : "Unknown error"),
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
      setToast({ message: "Network error fetching enquiries.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = enquiries;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (e) =>
          e.fullName.toLowerCase().includes(query) ||
          e.email.toLowerCase().includes(query) ||
          e.contactNumber.includes(query) ||
          (e.destination && e.destination.toLowerCase().includes(query))
      );
    }

    if (hotelFilter !== "All") {
      result = result.filter((e) => e.hotelCategory === hotelFilter);
    }

    if (categoryFilter !== "All") {
      const domesticList = ["Kerala", "Himachal Pradesh", "Ladakh", "Andaman", "Goa"];
      const internationalList = ["Kenya", "Vietnam", "Tanzania", "Iceland", "Sri Lanka"];

      if (categoryFilter === "India") {
        result = result.filter((e) => domesticList.includes(e.destination));
      } else if (categoryFilter === "International") {
        result = result.filter((e) => internationalList.includes(e.destination));
      } else if (categoryFilter === "General") {
        result = result.filter((e) => e.destination === "General Enquiry" || !e.destination);
      }
    }

    setFilteredEnquiries(result);
  }, [searchQuery, hotelFilter, categoryFilter, enquiries]);

  // Statistics calculation
  const totalLeads = enquiries.length;
  const totalTravelers = enquiries.reduce(
    (sum, e) => sum + (e.numberOfPeople || 0) + (e.numberOfChildren || 0),
    0
  );

  const hotelStats = enquiries.reduce(
    (acc, e) => {
      acc[e.hotelCategory] = (acc[e.hotelCategory] || 0) + 1;
      return acc;
    },
    { Standard: 0, Deluxe: 0, Luxury: 0 }
  );

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-5 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Enquiries Dashboard</h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage, search, and analyze customer booking leads in real time.
            </p>
          </div>
          <div>
            <button
              onClick={fetchEnquiries}
              disabled={loading}
              className="inline-flex items-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              <span>{loading ? "Refreshing..." : "Refresh Leads"}</span>
            </button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Total Enquiries */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Leads</div>
              <div className="text-2xl font-extrabold text-gray-900 mt-0.5">{totalLeads}</div>
            </div>
          </div>

          {/* Card 2: Total Travelers */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Travelers</div>
              <div className="text-2xl font-extrabold text-gray-900 mt-0.5">{totalTravelers}</div>
            </div>
          </div>

          {/* Card 3: Hotel Breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4 col-span-1 sm:col-span-2">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
              <Home className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Hotel Selection</div>
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-gray-700">
                <div className="bg-gray-50 px-2 py-1.5 rounded-lg text-center">
                  Standard: <span className="text-indigo-600 font-bold">{hotelStats.Standard}</span>
                </div>
                <div className="bg-gray-50 px-2 py-1.5 rounded-lg text-center">
                  Deluxe: <span className="text-indigo-600 font-bold">{hotelStats.Deluxe}</span>
                </div>
                <div className="bg-gray-50 px-2 py-1.5 rounded-lg text-center">
                  Luxury: <span className="text-indigo-600 font-bold">{hotelStats.Luxury}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-gray-900">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, destination..."
                className="block w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-gray-50/50"
              />
            </div>

            {/* Destination Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="block w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-gray-50/50 cursor-pointer"
            >
              <option value="All">All Destinations</option>
              <option value="India">India Packages</option>
              <option value="International">International Packages</option>
              <option value="General">General Enquiries Only</option>
            </select>

            {/* Hotel Filter */}
            <select
              value={hotelFilter}
              onChange={(e) => setHotelFilter(e.target.value)}
              className="block w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-gray-50/50 cursor-pointer"
            >
              <option value="All">All Hotel Categories</option>
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
              <p className="text-sm font-semibold text-gray-500">Loading enquiries from database...</p>
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <HelpCircle className="h-10 w-10 text-gray-300 mx-auto" />
              <h3 className="text-lg font-bold text-gray-900">No leads found</h3>
              <p className="text-sm text-gray-500 max-w-xs mx-auto">
                {enquiries.length === 0
                  ? "No enquiries have been submitted yet. Go to the Plan Trip page to submit."
                  : "No submissions match your active filters. Try adjusting search terms."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
                <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th scope="col" className="px-6 py-4">Received</th>
                    <th scope="col" className="px-6 py-4">Client Details</th>
                    <th scope="col" className="px-6 py-4">Destination</th>
                    <th scope="col" className="px-6 py-4">Travel Date</th>
                    <th scope="col" className="px-6 py-4 text-center">Group Size</th>
                    <th scope="col" className="px-6 py-4">Hotel Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
                  {filteredEnquiries.map((enquiry) => (
                    <tr key={enquiry._id} className="hover:bg-gray-50/50 transition-colors">
                      {/* Received Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400 font-semibold">
                        {formatDate(enquiry.createdAt)}
                      </td>
                      {/* Client Details */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <span className="font-bold text-gray-900 flex items-center space-x-1.5">
                            <User className="h-3.5 w-3.5 text-teal-600" />
                            <span>{enquiry.fullName}</span>
                          </span>
                          <span className="text-xs text-gray-500 flex items-center space-x-1.5">
                            <Mail className="h-3 w-3 text-gray-400" />
                            <span>{enquiry.email}</span>
                          </span>
                          <span className="text-xs text-gray-500 flex items-center space-x-1.5">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span>{enquiry.countryCode} {enquiry.contactNumber}</span>
                          </span>
                        </div>
                      </td>
                      {/* Destination */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-teal-50 text-teal-700 border border-teal-100 rounded-full text-xs font-bold">
                          <Compass className="h-3.5 w-3.5" />
                          <span>{enquiry.destination || "General Enquiry"}</span>
                        </span>
                      </td>
                      {/* Travel Date */}
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {formatDate(enquiry.dateOfTravel)}
                      </td>
                      {/* Group Size */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-sm font-bold text-gray-900">{enquiry.numberOfPeople}</span>
                          {(enquiry.numberOfChildren > 0) && (
                            <span className="text-[10px] text-amber-600 font-bold bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded mt-0.5">
                              +{enquiry.numberOfChildren} Child{enquiry.numberOfChildren > 1 ? "ren" : ""}
                            </span>
                          )}
                        </div>
                      </td>
                      {/* Hotel Category */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold border ${
                            enquiry.hotelCategory === "Luxury"
                              ? "bg-amber-50 text-amber-700 border-amber-100"
                              : enquiry.hotelCategory === "Deluxe"
                              ? "bg-blue-50 text-blue-700 border-blue-100"
                              : "bg-gray-50 text-gray-700 border-gray-100"
                          }`}
                        >
                          {enquiry.hotelCategory}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
