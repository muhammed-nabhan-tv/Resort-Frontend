"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  CalendarDays,
  Users,
  Compass,
  ChevronDown,
  Plus,
  Minus,
  Navigation,
} from "lucide-react";

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const POPULAR_DESTINATIONS = [
  "Bali, Indonesia",
  "Maldives, North Atoll",
  "Swiss Alps, Switzerland",
  "Dubai, UAE",
  "Goa, India",
  "Santorini, Greece",
  "Phuket, Thailand",
  "London, UK",
];

export function StickySearchNavbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"destination" | "calendar" | "rooms" | null>(null);

  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("2026-10-13");
  const [checkOut, setCheckOut] = useState("2026-10-14");
  const [dateSelectionPhase, setDateSelectionPhase] = useState<"checkIn" | "checkOut">("checkIn");
  const [roomList, setRoomList] = useState<{ id: number; guests: number }[]>([
    { id: 1, guests: 2 },
  ]);

  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Listen to scroll to dock navbar
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 280) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalGuests = roomList.reduce((sum, r) => sum + r.guests, 0);
  const totalRooms = roomList.length;

  const handleDateClick = (dateStr: string) => {
    if (dateSelectionPhase === "checkIn" || (checkIn && checkOut)) {
      setCheckIn(dateStr);
      setCheckOut("");
      setDateSelectionPhase("checkOut");
    } else {
      if (dateStr > checkIn) {
        setCheckOut(dateStr);
        setDateSelectionPhase("checkIn");
      } else {
        setCheckIn(dateStr);
        setCheckOut("");
        setDateSelectionPhase("checkOut");
      }
    }
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (destination.trim()) params.set("destination", destination.trim());
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("guests", totalGuests.toString());
    params.set("rooms", totalRooms.toString());

    setOpenDropdown(null);
    router.push(`/home?${params.toString()}`);
  };

  const handleAddRoom = () => {
    if (roomList.length < 8) {
      setRoomList([...roomList, { id: roomList.length + 1, guests: 1 }]);
    }
  };

  const handleDeleteRoom = () => {
    if (roomList.length > 1) {
      setRoomList(roomList.slice(0, -1));
    }
  };

  const updateGuests = (index: number, delta: number) => {
    setRoomList((prev) =>
      prev.map((r, i) =>
        i === index ? { ...r, guests: Math.max(1, Math.min(6, r.guests + delta)) } : r
      )
    );
  };

  const formatDateDisplay = (inDate: string, outDate: string) => {
    if (!inDate) return "Select Dates";
    try {
      const d1 = new Date(inDate);
      const f1 = d1.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" });
      if (!outDate) return `${f1}  -  Select check-out`;
      const d2 = new Date(outDate);
      const f2 = d2.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" });
      return `${f1}  -  ${f2}`;
    } catch {
      return `${inDate} - ${outDate}`;
    }
  };

  if (!isScrolled) return null;

  return (
    <div
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-lg transition-all duration-300 transform translate-y-0"
    >
      <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-12 py-2.5">
        <form
          onSubmit={handleSearch}
          className="flex items-center justify-between gap-3 flex-wrap lg:flex-nowrap"
        >
          {/* Brand mark */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-[#0a2560] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-[#ff4b38]" />
            </div>
            <span className="text-xl font-black tracking-tight text-[#0a2560] hidden sm:inline">
              Stay<span className="text-[#ff4b38]">Up</span>
            </span>
          </Link>

          {/* Stretchy Selection Bar */}
          <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-2xl p-1 divide-x divide-slate-200 shadow-inner">
            {/* 1. Destination Input */}
            <div
              className="flex-1 min-w-[150px] px-3.5 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-white rounded-xl transition-colors relative"
              onClick={() => setOpenDropdown(openDropdown === "destination" ? null : "destination")}
            >
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Where to?
                </span>
                <input
                  type="text"
                  placeholder="Anywhere (Bali, Dubai, Goa)"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setOpenDropdown("destination");
                  }}
                  className="w-full bg-transparent text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-hidden truncate"
                />
              </div>

              {/* Destination Dropdown */}
              {openDropdown === "destination" && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-full left-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 text-left"
                >
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Popular Destinations
                  </p>
                  <div className="space-y-1">
                    {POPULAR_DESTINATIONS.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => {
                          setDestination(loc);
                          setOpenDropdown(null);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-[#0a2560] rounded-lg transition-colors flex items-center justify-between"
                      >
                        <span>{loc}</span>
                        <span className="text-[10px] text-slate-400">Resorts</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 2. Selecting Date Navbar (Calendar matching Screenshot 2) */}
            <div
              className="flex-1 min-w-[200px] px-3.5 py-1.5 flex items-center justify-between cursor-pointer hover:bg-white rounded-xl transition-colors relative"
              onClick={() => setOpenDropdown(openDropdown === "calendar" ? null : "calendar")}
            >
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Check-in / Check-out
                </span>
                <span className="block text-sm font-black text-slate-900 truncate">
                  {formatDateDisplay(checkIn, checkOut)}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-500 transition-transform ml-1 ${
                  openDropdown === "calendar" ? "rotate-180" : ""
                }`}
              />

              {/* DUAL-MONTH CALENDAR POPOVER */}
              {openDropdown === "calendar" && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[92vw] sm:w-[620px] bg-white rounded-3xl shadow-2xl border border-slate-200 p-5 z-50 text-slate-900"
                >
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                    <span className="text-sm font-black text-slate-800">
                      Select Check-in & Check-out Dates
                    </span>
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(null)}
                      className="text-xs font-bold text-[#ff4b38] hover:underline"
                    >
                      Done
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Month 1: October 2026 */}
                    <div>
                      <div className="text-center font-black text-sm text-slate-900 mb-2">
                        October 2026
                      </div>
                      <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400 mb-1.5">
                        {DAYS_OF_WEEK.map((d) => (
                          <span key={d}>{d}</span>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 text-center text-xs gap-y-1 font-semibold">
                        <span /><span /><span />
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map(
                          (day) => {
                            const dateStr = `2026-10-${day < 10 ? `0${day}` : day}`;
                            const isStart = dateStr === checkIn;
                            const isEnd = dateStr === checkOut;
                            const isInRange = Boolean(checkIn && checkOut && dateStr > checkIn && dateStr < checkOut);
                            return (
                              <button
                                key={day}
                                type="button"
                                onClick={() => handleDateClick(dateStr)}
                                className={`h-8 w-8 mx-auto flex items-center justify-center rounded-full text-xs font-bold transition-all cursor-pointer ${
                                  isStart || isEnd
                                    ? "bg-[#1d64e8] text-white shadow-md shadow-blue-500/40 ring-2 ring-blue-300"
                                    : isInRange
                                    ? "bg-blue-100 text-[#0a2560] font-black rounded-lg"
                                    : "text-slate-700 hover:bg-blue-50"
                                }`}
                              >
                                {day}
                              </button>
                            );
                          }
                        )}
                      </div>
                    </div>

                    {/* Month 2: November 2026 */}
                    <div>
                      <div className="text-center font-black text-sm text-slate-900 mb-2">
                        November 2026
                      </div>
                      <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400 mb-1.5">
                        {DAYS_OF_WEEK.map((d) => (
                          <span key={d}>{d}</span>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 text-center text-xs gap-y-1 font-semibold">
                        <span /><span /><span /><span /><span /><span />
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(
                          (day) => {
                            const dateStr = `2026-11-${day < 10 ? `0${day}` : day}`;
                            const isStart = dateStr === checkIn;
                            const isEnd = dateStr === checkOut;
                            const isInRange = Boolean(checkIn && checkOut && dateStr > checkIn && dateStr < checkOut);
                            return (
                              <button
                                key={day}
                                type="button"
                                onClick={() => handleDateClick(dateStr)}
                                className={`h-8 w-8 mx-auto flex items-center justify-center rounded-full text-xs font-bold transition-all cursor-pointer ${
                                  isStart || isEnd
                                    ? "bg-[#1d64e8] text-white shadow-md shadow-blue-500/40 ring-2 ring-blue-300"
                                    : isInRange
                                    ? "bg-blue-100 text-[#0a2560] font-black rounded-lg"
                                    : "text-slate-700 hover:bg-blue-50"
                                }`}
                              >
                                {day}
                              </button>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>{checkIn || "Select check-in"} → {checkOut || "Select check-out"}</span>
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(null)}
                      className="px-4 py-1.5 bg-[#0a2560] text-white font-bold rounded-lg cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Rooms & Guests Selector (Popover matching Screenshot 3) */}
            <div
              className="flex-1 min-w-[160px] px-3.5 py-1.5 flex items-center justify-between cursor-pointer hover:bg-white rounded-xl transition-colors relative"
              onClick={() => setOpenDropdown(openDropdown === "rooms" ? null : "rooms")}
            >
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Rooms & Guests
                </span>
                <span className="block text-sm font-black text-slate-900 truncate">
                  {totalRooms} Room{totalRooms > 1 ? "s" : ""}, {totalGuests} Guest{totalGuests > 1 ? "s" : ""}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-500 transition-transform ml-1 ${
                  openDropdown === "rooms" ? "rotate-180" : ""
                }`}
              />

              {/* ROOM & GUEST POPOVER */}
              {openDropdown === "rooms" && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-full right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 p-5 z-50 text-slate-900"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider pb-2.5 border-b border-slate-100">
                    <span>Rooms</span>
                    <span>Guests</span>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto py-2">
                    {roomList.map((room, idx) => (
                      <div key={room.id} className="py-2.5 flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-800">Room {idx + 1}</span>

                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => updateGuests(idx, -1)}
                            disabled={room.guests <= 1}
                            className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 disabled:opacity-30 hover:bg-slate-100"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-5 text-center font-bold text-sm text-slate-900">
                            {room.guests}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateGuests(idx, 1)}
                            disabled={room.guests >= 6}
                            className="w-7 h-7 rounded-full border border-blue-400 flex items-center justify-center text-blue-600 hover:bg-blue-50 font-bold"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    <button
                      type="button"
                      onClick={handleDeleteRoom}
                      disabled={roomList.length <= 1}
                      className="text-slate-400 hover:text-red-600 disabled:opacity-30 cursor-pointer"
                    >
                      Delete Room
                    </button>
                    <button
                      type="button"
                      onClick={handleAddRoom}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      + Add Room
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#e52823] hover:bg-[#cc201b] text-white font-extrabold text-sm tracking-wide shadow-md shadow-red-600/30 transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer active:scale-98"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  );
}
