"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  CalendarDays,
  User as UserIcon,
  Phone,
  Menu,
  X,
  MapPin,
  Sparkles,
  Home,
} from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";

const DESTINATION_LINKS = [
  { name: "Maldives", href: "/resorts?destination=Maldives" },
  { name: "Bali", href: "/resorts?destination=Bali" },
  { name: "Swiss Alps", href: "/resorts?destination=Swiss+Alps" },
  { name: "Dubai", href: "/resorts?destination=Dubai" },
  { name: "Goa", href: "/resorts?destination=Goa" },
  { name: "Santorini", href: "/resorts?destination=Santorini" },
  { name: "Phuket", href: "/resorts?destination=Phuket" },
  { name: "All Destinations", href: "/resorts" },
];

function PublicHeaderContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs w-full">
        {/* Destination Quick Bar */}
        <div className="bg-[#0a2560] text-slate-100 hidden md:block w-full">
          <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex items-center justify-between text-xs sm:text-sm py-2 overflow-x-auto gap-4">
              <div className="flex items-center gap-1.5 text-slate-300 font-bold shrink-0">
                <MapPin className="w-4 h-4 text-[#ff4b38]" />
                <span>Top Destinations:</span>
              </div>
              <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
                {DESTINATION_LINKS.map((dest) => (
                  <Link
                    key={dest.name}
                    href={dest.href}
                    className="whitespace-nowrap text-slate-200 hover:text-[#ff4b38] transition-colors font-semibold text-xs sm:text-sm"
                  >
                    {dest.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Brand & Navigation Ribbon */}
        <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* StayUp Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-[#0a2560] flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform">
                <Compass className="w-7 h-7 text-[#ff4b38]" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-black tracking-tight text-[#0a2560] leading-none">
                  Stay<span className="text-[#ff4b38]">Up</span>
                </span>
                <span className="text-xs tracking-widest uppercase font-black text-slate-500 mt-1">
                  Resorts & Stays
                </span>
              </div>
            </Link>

            {/* Desktop Utility Nav */}
            <div className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
              {/* Home */}
              <Link
                href="/"
                className={`flex items-center gap-2 transition-colors ${
                  pathname === "/" ? "text-[#0a2560] font-black" : "hover:text-[#0a2560]"
                }`}
              >
                <Home className="w-5 h-5 text-slate-400" />
                <span className="text-base font-bold">Home</span>
              </Link>

              <div className="h-8 w-px bg-slate-200" />

              {/* Explore Resorts */}
              <Link
                href="/resorts"
                className={`flex items-center gap-2 transition-colors ${
                  pathname === "/resorts" ? "text-[#0a2560] font-black" : "hover:text-[#0a2560]"
                }`}
              >
                <Compass className="w-5 h-5 text-slate-400" />
                <span className="text-base font-bold">Explore Resorts</span>
              </Link>

              <div className="h-8 w-px bg-slate-200" />

              {/* Special Offers */}
              <Link
                href="/resorts?category=villas"
                className="flex items-center gap-2 hover:text-[#0a2560] transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#ff4b38]" />
                <span className="text-base font-bold">Villas & Deals</span>
              </Link>

              <div className="h-8 w-px bg-slate-200" />

              {/* Phone support */}
              <div className="flex items-center gap-2.5 text-slate-600">
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-[#0a2560]">
                  <Phone className="w-4 h-4 text-[#0a2560]" />
                </div>
                <div className="text-left">
                  <span className="block text-base font-black text-slate-900 leading-tight">
                    0124-6201611
                  </span>
                  <span className="block text-xs text-slate-500 font-medium">24/7 Helpline</span>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200" />

              {/* My Bookings Pill */}
              <Link
                href="/bookings"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  pathname === "/bookings"
                    ? "bg-blue-50 text-[#0a2560] border border-blue-200 font-black"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <CalendarDays className="w-4 h-4 text-[#ff4b38]" />
                <span>My Bookings</span>
              </Link>

              {/* Login / Profile Button */}
              <Link
                href="/profile"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0a2560] hover:bg-[#1444a8] text-white font-black text-sm shadow-sm transition-all"
              >
                <UserIcon className="w-4 h-4 text-[#ff4b38]" />
                <span>Profile</span>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-3 lg:hidden">
              <Link
                href="/profile"
                className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                <UserIcon className="w-5 h-5" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-6 pt-4 pb-6 space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm font-semibold">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-slate-100 text-[#0a2560] rounded-xl flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link
                href="/resorts"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-blue-50 text-[#0a2560] rounded-xl flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Stays</span>
              </Link>
              <Link
                href="/bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-red-50 text-[#ff4b38] rounded-xl flex items-center gap-2"
              >
                <CalendarDays className="w-4 h-4" />
                <span>My Bookings</span>
              </Link>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-slate-100 text-slate-800 rounded-xl flex items-center gap-2"
              >
                <UserIcon className="w-4 h-4" />
                <span>My Profile</span>
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="col-span-2 p-3 bg-[#0a2560] text-white rounded-xl flex items-center justify-center gap-2 text-center"
              >
                <UserIcon className="w-4 h-4" />
                <span>Sign In / Demo Login</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Interactive Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}

export function PublicHeader() {
  return (
    <Suspense
      fallback={
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs h-20 w-full" />
      }
    >
      <PublicHeaderContent />
    </Suspense>
  );
}
