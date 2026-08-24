"use client";

import { useEffect } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

export default function Toast({ message, type = "success", onClose, duration = 5000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const isSuccess = type === "success";

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex items-center p-4 space-x-3 w-full max-w-sm rounded-xl shadow-lg border transition-all duration-300 transform translate-y-0 scale-100 ${
        isSuccess
          ? "bg-emerald-50 border-emerald-100 text-emerald-800"
          : "bg-rose-50 border-rose-100 text-rose-800"
      }`}
      role="alert"
    >
      <div className="shrink-0">
        {isSuccess ? (
          <CheckCircle className="h-6 w-6 text-emerald-600" />
        ) : (
          <AlertCircle className="h-6 w-6 text-rose-600" />
        )}
      </div>
      <div className="flex-1 text-sm font-semibold tracking-wide">{message}</div>
      <button
        onClick={onClose}
        className={`inline-flex shrink-0 p-1.5 rounded-lg focus:outline-none transition-colors ${
          isSuccess
            ? "text-emerald-500 hover:bg-emerald-100 hover:text-emerald-700"
            : "text-rose-500 hover:bg-rose-100 hover:text-rose-700"
        }`}
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
