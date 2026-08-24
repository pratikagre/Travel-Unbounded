"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, Users, Mail, Phone, User, Home, Baby, Loader2, CheckCircle2, Compass } from "lucide-react";
import Toast from "./Toast";

export default function BookingForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    fullName: "",
    countryCode: "+91",
    contactNumber: "",
    email: "",
    dateOfTravel: "",
    numberOfPeople: "1",
    hotelCategory: "Standard",
    numberOfChildren: "0",
    destination: "General Enquiry",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  // Pre-fill destination from query parameters
  useEffect(() => {
    const destParam = searchParams.get("destination");
    if (destParam) {
      setFormData((prev) => ({ ...prev, destination: destParam }));
    }
  }, [searchParams]);

  const countryCodes = [
    { code: "+91", country: "India" },
    { code: "+1", country: "USA/Canada" },
    { code: "+44", country: "UK" },
    { code: "+254", country: "Kenya" },
    { code: "+84", country: "Vietnam" },
    { code: "+255", country: "Tanzania" },
    { code: "+354", country: "Iceland" },
    { code: "+94", country: "Sri Lanka" },
    { code: "+61", country: "Australia" },
    { code: "+971", country: "UAE" },
    { code: "+65", country: "Singapore" },
  ];

  const destinationsList = [
    "General Enquiry",
    "Kerala",
    "Himachal Pradesh",
    "Ladakh",
    "Andaman",
    "Goa",
    "Kenya",
    "Vietnam",
    "Tanzania",
    "Iceland",
    "Sri Lanka",
  ];

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email.trim().toLowerCase())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Contact number validation
    const phoneRegex = /^\d{7,15}$/;
    const cleanPhone = formData.contactNumber.replace(/[\s-]/g, "");
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Phone number is required.";
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.contactNumber = "Phone number must be between 7 and 15 digits.";
    }

    // Travel Date validation (Must be future)
    if (!formData.dateOfTravel) {
      newErrors.dateOfTravel = "Travel date is required.";
    } else {
      const selectedDate = new Date(formData.dateOfTravel);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.dateOfTravel = "Date of travel cannot be in the past.";
      }
    }

    // Number of people validation
    const people = parseInt(formData.numberOfPeople, 10);
    if (!formData.numberOfPeople || isNaN(people) || people < 1) {
      newErrors.numberOfPeople = "Must be at least 1 traveler.";
    }

    // Children validation (optional but if filled, must be non-negative)
    if (formData.numberOfChildren !== "") {
      const children = parseInt(formData.numberOfChildren, 10);
      if (isNaN(children) || children < 0) {
        newErrors.numberOfChildren = "Cannot be negative.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setToast({ message: "Please correct the errors in the form.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmittedSuccessfully(true);
        setToast({
          message: "Enquiry submitted successfully! Our expert will contact you within 24 hours.",
          type: "success",
        });
        // Reset form
        setFormData({
          fullName: "",
          countryCode: "+91",
          contactNumber: "",
          email: "",
          dateOfTravel: "",
          numberOfPeople: "1",
          hotelCategory: "Standard",
          numberOfChildren: "0",
          destination: "General Enquiry",
        });
      } else {
        const errorMsg = data.errors ? data.errors.join(" ") : "Submission failed.";
        setToast({ message: errorMsg, type: "error" });
      }
    } catch (err) {
      console.error(err);
      setToast({
        message: "Network error. Please check your internet connection and try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Get tomorrow's date string for input min attribute
  const getTomorrowString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  if (submittedSuccessfully) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-12 text-center space-y-6 max-w-xl mx-auto my-12 animate-fade-in">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Enquiry Received!</h3>
        <p className="text-base text-gray-500 leading-relaxed max-w-sm mx-auto">
          Thank you for choosing Travel Unbounded. Our experienced travel specialist will reach out to you within the next 24 hours to design your custom itinerary.
        </p>
        <div className="pt-4">
          <button
            onClick={() => setSubmittedSuccessfully(false)}
            className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-full transition-colors"
          >
            Submit Another Enquiry
          </button>
        </div>
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-10 max-w-2xl mx-auto my-6 relative">
      <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">Book Your Next Adventure</h3>
      <p className="text-sm text-gray-500 mb-8">
        Fill out the details below and let us customize a bespoke itinerary that fits your requirements.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div className="space-y-1">
          <label htmlFor="fullName" className="text-sm font-bold text-gray-700 block">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <User className="h-5 w-5" />
            </div>
            <input
              type="text"
              name="fullName"
              id="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className={`block w-full pl-11 pr-4 py-3 rounded-xl border bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm ${
                errors.fullName
                  ? "border-rose-300 focus:ring-rose-500 focus:border-rose-500"
                  : "border-gray-200 focus:ring-teal-500 focus:border-teal-500"
              }`}
            />
          </div>
          {errors.fullName && <p className="text-xs font-semibold text-rose-600">{errors.fullName}</p>}
        </div>

        {/* Email and Travel Destination Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-bold text-gray-700 block">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={`block w-full pl-11 pr-4 py-3 rounded-xl border bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm ${
                  errors.email
                    ? "border-rose-300 focus:ring-rose-500 focus:border-rose-500"
                    : "border-gray-200 focus:ring-teal-500 focus:border-teal-500"
                }`}
              />
            </div>
            {errors.email && <p className="text-xs font-semibold text-rose-600">{errors.email}</p>}
          </div>

          {/* Destination */}
          <div className="space-y-1">
            <label htmlFor="destination" className="text-sm font-bold text-gray-700 block">
              Destination of Interest
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Compass className="h-5 w-5" />
              </div>
              <select
                name="destination"
                id="destination"
                value={formData.destination}
                onChange={handleChange}
                className="block w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all text-sm appearance-none cursor-pointer"
              >
                {destinationsList.map((dest) => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Contact Number with Country Code */}
        <div className="space-y-1">
          <label htmlFor="contactNumber" className="text-sm font-bold text-gray-700 block">
            Contact Number <span className="text-rose-500">*</span>
          </label>
          <div className="flex shadow-sm rounded-xl overflow-hidden border border-gray-200 bg-gray-50/50">
            {/* Country Code Dropdown */}
            <div className="relative shrink-0 border-r border-gray-200">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="h-full pl-3.5 pr-8 py-3 rounded-l-xl bg-transparent text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm cursor-pointer appearance-none"
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.country})
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-400">
                <span className="text-xs">▼</span>
              </div>
            </div>
            {/* Phone Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                <Phone className="h-4 w-4" />
              </div>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                required
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="9876543210"
                className={`block w-full pl-9 pr-4 py-3 rounded-r-xl border-0 bg-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset text-sm ${
                  errors.contactNumber ? "focus:ring-rose-500" : ""
                }`}
              />
            </div>
          </div>
          {errors.contactNumber && (
            <p className="text-xs font-semibold text-rose-600">{errors.contactNumber}</p>
          )}
        </div>

        {/* Date of Travel and Travelers Count Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date of Travel */}
          <div className="space-y-1">
            <label htmlFor="dateOfTravel" className="text-sm font-bold text-gray-700 block">
              Date of Travel <span className="text-rose-500">*</span>
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Calendar className="h-5 w-5" />
              </div>
              <input
                type="date"
                name="dateOfTravel"
                id="dateOfTravel"
                required
                min={getTomorrowString()}
                value={formData.dateOfTravel}
                onChange={handleChange}
                className={`block w-full pl-11 pr-4 py-3 rounded-xl border bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm ${
                  errors.dateOfTravel
                    ? "border-rose-300 focus:ring-rose-500 focus:border-rose-500"
                    : "border-gray-200 focus:ring-teal-500 focus:border-teal-500"
                }`}
              />
            </div>
            {errors.dateOfTravel && (
              <p className="text-xs font-semibold text-rose-600">{errors.dateOfTravel}</p>
            )}
          </div>

          {/* Number of People */}
          <div className="space-y-1">
            <label htmlFor="numberOfPeople" className="text-sm font-bold text-gray-700 block">
              Number of People <span className="text-rose-500">*</span>
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Users className="h-5 w-5" />
              </div>
              <input
                type="number"
                name="numberOfPeople"
                id="numberOfPeople"
                required
                min="1"
                value={formData.numberOfPeople}
                onChange={handleChange}
                placeholder="1"
                className={`block w-full pl-11 pr-4 py-3 rounded-xl border bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm ${
                  errors.numberOfPeople
                    ? "border-rose-300 focus:ring-rose-500 focus:border-rose-500"
                    : "border-gray-200 focus:ring-teal-500 focus:border-teal-500"
                }`}
              />
            </div>
            {errors.numberOfPeople && (
              <p className="text-xs font-semibold text-rose-600">{errors.numberOfPeople}</p>
            )}
          </div>
        </div>

        {/* Hotel Category and Children Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hotel Category */}
          <div className="space-y-1">
            <label htmlFor="hotelCategory" className="text-sm font-bold text-gray-700 block">
              Hotel Category <span className="text-rose-500">*</span>
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Home className="h-5 w-5" />
              </div>
              <select
                name="hotelCategory"
                id="hotelCategory"
                required
                value={formData.hotelCategory}
                onChange={handleChange}
                className="block w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all text-sm appearance-none cursor-pointer"
              >
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>
          </div>

          {/* Number of Children */}
          <div className="space-y-1">
            <label htmlFor="numberOfChildren" className="text-sm font-bold text-gray-700 block">
              Number of Children (optional)
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Baby className="h-5 w-5" />
              </div>
              <input
                type="number"
                name="numberOfChildren"
                id="numberOfChildren"
                min="0"
                value={formData.numberOfChildren}
                onChange={handleChange}
                placeholder="0"
                className={`block w-full pl-11 pr-4 py-3 rounded-xl border bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm ${
                  errors.numberOfChildren
                    ? "border-rose-300 focus:ring-rose-500 focus:border-rose-500"
                    : "border-gray-200 focus:ring-teal-500 focus:border-teal-500"
                }`}
              />
            </div>
            {errors.numberOfChildren && (
              <p className="text-xs font-semibold text-rose-600">{errors.numberOfChildren}</p>
            )}
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-teal-600 hover:bg-teal-700 shadow-md hover:shadow-teal-600/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-75 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                <span>Submitting Enquiry...</span>
              </>
            ) : (
              <span>Submit Enquiry</span>
            )}
          </button>
        </div>
      </form>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
