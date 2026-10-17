"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Clock,
  ArrowRight,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Calendar,
  Compass,
} from "lucide-react";
import { Booking } from "@/types/booking";
import { mockApi } from "@/lib/mock-api";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function CustomerBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "confirmed" | "completed" | "cancelled">("all");
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    mockApi.getUserBookings().then(setBookings);
  }, []);

  const handleCancelBooking = async (id: string) => {
    const updated = await mockApi.cancelBooking(id);
    if (updated) {
      setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
      setCancellingBookingId(null);
      setFeedbackMessage(`Booking ${updated.bookingReference} has been cancelled in mock state.`);
      setTimeout(() => setFeedbackMessage(null), 4000);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "all") return true;
    return b.status === activeTab;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">My Reservations</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your luxury resort getaways, view booking vouchers, or modify dates.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-bold transition-colors shadow-xs"
        >
          <Compass className="w-4 h-4 text-[#f97316]" />
          <span>Find A Resort</span>
        </Link>
      </div>

      {feedbackMessage && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-center justify-between">
          <span>{feedbackMessage}</span>
          <button onClick={() => setFeedbackMessage(null)} className="text-amber-700 font-bold ml-4">
            Dismiss
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto">
        {[
          { id: "all", label: "All Stays" },
          { id: "confirmed", label: "Upcoming Stays" },
          { id: "completed", label: "Completed" },
          { id: "cancelled", label: "Cancelled" },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`pb-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? "border-[#0a2560] text-[#0a2560]"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((bk) => (
            <div
              key={bk.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6"
            >
              {/* Resort Image */}
              <div className="w-full md:w-56 h-44 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={bk.resortImage}
                  alt={bk.resortName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Booking Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-black text-[#0a2560] bg-blue-50 px-2.5 py-0.5 rounded-md">
                      Ref: {bk.bookingReference}
                    </span>

                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full capitalize ${
                        bk.status === "confirmed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : bk.status === "completed"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-red-50 text-red-600 border border-red-200"
                      }`}
                    >
                      {bk.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {bk.resortName}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#ff4b38]" />
                    <span>{bk.resortLocation}</span>
                  </div>

                  <div className="mt-3.5 grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Suite</span>
                      <span className="font-semibold text-slate-800 truncate block">{bk.roomName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Stay Dates</span>
                      <span className="font-semibold text-slate-800">{bk.checkIn} → {bk.checkOut}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Guests</span>
                      <span className="font-semibold text-slate-800">{bk.guestCount} Guests ({bk.nights} nights)</span>
                    </div>
                  </div>
                </div>

                {/* Footer and Actions */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Total Amount</span>
                    <span className="text-base font-black text-[#0a2560]">
                      {formatCurrency(bk.totalAmount)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/home/${bk.resortId}`}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                    >
                      Resort Details
                    </Link>

                    {bk.status === "confirmed" && (
                      <button
                        onClick={() => setCancellingBookingId(bk.id)}
                        className="px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-xs space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 text-[#0ea5e9] flex items-center justify-center mx-auto mb-2 shadow-2xs">
              <Calendar className="w-8 h-8 text-[#0ea5e9]" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No Reservations Found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto font-medium">
              You do not have any {activeTab === "all" ? "" : activeTab} bookings recorded yet. New bookings will appear here after confirmation.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-bold transition-all shadow-md shadow-sky-500/20"
              >
                <span>Find Your Next Stay</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {cancellingBookingId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-900">Cancel Reservation?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to cancel this booking? Since this stay qualifies for our free
                cancellation policy, full mock refund will be processed.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => setCancellingBookingId(null)}
                className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Keep Stay
              </button>
              <button
                type="button"
                onClick={() => handleCancelBooking(cancellingBookingId)}
                className="w-1/2 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
