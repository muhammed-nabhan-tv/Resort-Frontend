"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Navigation,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";

interface SearchBarProps {
  initialDestination?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  initialRooms?: number;
  isCompact?: boolean;
}

const POPULAR_DESTINATIONS = [
  "Bali, Indonesia",
  "Maldives, North Atoll",
  "Swiss Alps, Switzerland",
  "Dubai, UAE",
  "Goa, India",
  "Santorini, Greece",
  "Phuket, Thailand",
  "Bangkok, Thailand",
  "Paris, France",
  "London, UK",
];

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function SearchBar({
  initialDestination = "",
  initialCheckIn = "2026-10-13",
  initialCheckOut = "2026-10-14",
  initialGuests = 1,
  initialRooms = 1,
  isCompact = false,
}: SearchBarProps) {
  const router = useRouter();

  const [destination, setDestination] = useState(initialDestination);
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [dateSelectionPhase, setDateSelectionPhase] = useState<"checkIn" | "checkOut">("checkIn");

  // Rooms state with individual guest counters matching screenshot 3
  const [roomList, setRoomList] = useState<{ id: number; guests: number }[]>([
    { id: 1, guests: initialGuests },
  ]);

  const [openDropdown, setOpenDropdown] = useState<"destination" | "calendar" | "rooms" | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close popovers when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    router.push(`/resorts?${params.toString()}`);
  };

  const handleNearby = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDestination("Bali, Indonesia");
    setOpenDropdown(null);
  };

  // Add room
  const handleAddRoom = () => {
    if (roomList.length < 8) {
      setRoomList([...roomList, { id: roomList.length + 1, guests: 1 }]);
    }
  };

  // Delete last room
  const handleDeleteRoom = () => {
    if (roomList.length > 1) {
      setRoomList(roomList.slice(0, -1));
    }
  };

  // Update guests in a specific room
  const updateGuests = (index: number, delta: number) => {
    setRoomList((prev) =>
      prev.map((r, i) =>
        i === index ? { ...r, guests: Math.max(1, Math.min(6, r.guests + delta)) } : r
      )
    );
  };

  // Format date display: "Tue, 13 Oct - Wed, 14 Oct"
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
      return `${inDate} - ${outDate || "Select check-out"}`;
    }
  };

  return (
    <div ref={containerRef} className="w-full relative z-50">
      <div className="bg-white rounded-2xl md:rounded-3xl p-2 md:p-2.5 shadow-2xl border border-slate-200">
        <form
          onSubmit={handleSearch}
          className="flex flex-col lg:flex-row items-stretch lg:items-center divide-y lg:divide-y-0 lg:divide-x divide-slate-200"
        >
          {/* 1. Destination Input (Stretchy flex-[1.4]) */}
          <div
            className="w-full lg:flex-[1.4] min-w-[220px] px-5 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-50/80 rounded-2xl transition-colors relative"
            onClick={() => setOpenDropdown(openDropdown === "destination" ? null : "destination")}
          >
            <Search className="w-6 h-6 text-slate-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Destination
              </span>
              <input
                type="text"
                placeholder="Where to? (e.g. Bali, Dubai, Goa)"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setOpenDropdown("destination");
                }}
                className="w-full bg-transparent text-base md:text-lg lg:text-xl font-bold text-slate-900 placeholder-slate-400 focus:outline-hidden truncate"
              />
            </div>

            {/* Nearby button */}
            <button
              type="button"
              onClick={handleNearby}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-1.5 rounded-full shrink-0 border border-slate-300 transition-colors shadow-2xs"
            >
              <Navigation className="w-3.5 h-3.5 text-[#f97316]" />
              <span>Nearby</span>
            </button>

            {/* Destination Dropdown */}
            {openDropdown === "destination" && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full left-0 mt-3 w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 text-left"
              >
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Popular Travel Destinations
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
                      className="w-full text-left px-3.5 py-2.5 text-sm md:text-base font-bold text-slate-800 hover:bg-blue-50 hover:text-[#0a2560] rounded-xl transition-colors flex items-center justify-between"
                    >
                      <span>{loc}</span>
                      <span className="text-xs text-slate-400 font-normal">Resorts</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 2. Dates Picker (Stretchy flex-[1.3] - Triggers Dual-Month Calendar Popover matching Screenshot 2) */}
          <div
            className="w-full lg:flex-[1.3] min-w-[240px] px-5 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50/80 rounded-2xl transition-colors relative"
            onClick={() => setOpenDropdown(openDropdown === "calendar" ? null : "calendar")}
          >
            <div className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Select Dates
              </span>
              <span className="block text-base md:text-lg font-black text-slate-900 truncate">
                {formatDateDisplay(checkIn, checkOut)}
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-slate-500 transition-transform shrink-0 ml-2 ${
                openDropdown === "calendar" ? "rotate-180" : ""
              }`}
            />

            {/* DUAL-MONTH CALENDAR POPOVER (Exact recreation from user screenshot 2) */}
            {openDropdown === "calendar" && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full left-1/2 -translate-x-1/2 lg:translate-x-0 lg:-left-20 mt-3 w-[92vw] sm:w-[640px] bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 z-50 text-slate-900"
              >
                {/* Header Month Nav */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                  <span className="text-base font-black text-slate-800">
                    Select Check-in & Check-out Dates
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(null)}
                    className="text-xs sm:text-sm font-bold text-[#0ea5e9] hover:underline"
                  >
                    Done
                  </button>
                </div>

                {/* Dual Month Side-by-Side Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Month 1: October 2026 */}
                  <div>
                    <div className="text-center font-black text-base text-slate-900 mb-3">
                      October 2026
                    </div>
                    {/* Weekday headers */}
                    <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 mb-2">
                      {DAYS_OF_WEEK.map((d) => (
                        <span key={d}>{d}</span>
                      ))}
                    </div>
                    {/* Days grid: Oct 1 starts on Thursday (index 3) */}
                    <div className="grid grid-cols-7 text-center text-sm gap-y-1 font-semibold">
                      {/* Blank spaces for Mon-Wed */}
                      <span />
                      <span />
                      <span />
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
                              className={`h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-bold transition-all cursor-pointer ${
                                isStart || isEnd
                                  ? "bg-[#0ea5e9] text-white shadow-md shadow-sky-500/40 ring-2 ring-sky-300 scale-105"
                                  : isInRange
                                  ? "bg-sky-100 text-[#0284c7] font-black rounded-lg"
                                  : "text-slate-700 hover:bg-sky-50 hover:text-[#0284c7]"
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
                    <div className="text-center font-black text-base text-slate-900 mb-3">
                      November 2026
                    </div>
                    {/* Weekday headers */}
                    <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 mb-2">
                      {DAYS_OF_WEEK.map((d) => (
                        <span key={d}>{d}</span>
                      ))}
                    </div>
                    {/* Days grid: Nov 1 starts on Sunday (index 6) */}
                    <div className="grid grid-cols-7 text-center text-sm gap-y-1 font-semibold">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
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
                              className={`h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-bold transition-all cursor-pointer ${
                                isStart || isEnd
                                  ? "bg-[#0ea5e9] text-white shadow-md shadow-sky-500/40 ring-2 ring-sky-300 scale-105"
                                  : isInRange
                                  ? "bg-sky-100 text-[#0284c7] font-black rounded-lg"
                                  : "text-slate-700 hover:bg-sky-50 hover:text-[#0284c7]"
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

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-500">
                  <span>
                    Selected:{" "}
                    <strong className="text-slate-900">
                      {checkIn || "Select check-in"} → {checkOut || "Select check-out"}
                    </strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(null)}
                    className="px-6 py-2.5 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-extrabold rounded-xl shadow-md cursor-pointer transition-colors"
                  >
                    Apply Dates
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3. Rooms & Guests Picker (Stretchy flex-[1] - Triggers Popover matching Screenshot 3) */}
          <div
            className="w-full lg:flex-[1] min-w-[200px] px-5 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50/80 rounded-2xl transition-colors relative"
            onClick={() => setOpenDropdown(openDropdown === "rooms" ? null : "rooms")}
          >
            <div className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Rooms & Guests
              </span>
              <span className="block text-base md:text-lg font-black text-slate-900 truncate">
                {totalRooms} Room{totalRooms > 1 ? "s" : ""}, {totalGuests} Guest{totalGuests > 1 ? "s" : ""}
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-slate-500 transition-transform shrink-0 ml-2 ${
                openDropdown === "rooms" ? "rotate-180" : ""
              }`}
            />

            {/* ROOM & GUEST POPOVER (Exact recreation from user screenshot 3) */}
            {openDropdown === "rooms" && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full right-0 mt-3 w-88 bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 z-50 text-slate-900"
              >
                {/* Table Header: Rooms on left, Guests on right */}
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider pb-3 border-b border-slate-100">
                  <span>Rooms</span>
                  <span>Guests</span>
                </div>

                {/* Room List with - / + counters */}
                <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto py-2">
                  {roomList.map((room, idx) => (
                    <div key={room.id} className="py-3.5 flex items-center justify-between">
                      <span className="font-bold text-base text-slate-800">Room {idx + 1}</span>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => updateGuests(idx, -1)}
                          disabled={room.guests <= 1}
                          className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 disabled:opacity-30 hover:bg-slate-100 font-bold"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center font-black text-base text-slate-900">
                          {room.guests}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateGuests(idx, 1)}
                          disabled={room.guests >= 6}
                          className="w-8 h-8 rounded-full border border-sky-400 flex items-center justify-center text-[#0ea5e9] hover:bg-sky-50 font-black text-base"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions: Delete Room on left, Add Room on right */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-sm font-bold">
                  <button
                    type="button"
                    onClick={handleDeleteRoom}
                    disabled={roomList.length <= 1}
                    className="text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                  >
                    Delete Room
                  </button>

                  <button
                    type="button"
                    onClick={handleAddRoom}
                    className="text-[#0ea5e9] hover:text-[#0284c7] cursor-pointer text-sm font-bold"
                  >
                    + Add Room
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 4. StayUp Brand Light Blue Primary Search Button */}
          <div className="w-full lg:w-auto p-1.5 shrink-0">
            <button
              type="submit"
              className="w-full lg:w-auto px-10 py-4 rounded-xl lg:rounded-2xl bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-black text-lg md:text-xl tracking-wide shadow-xl shadow-sky-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Search</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
