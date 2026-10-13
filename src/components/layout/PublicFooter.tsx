"use client";

import Link from "next/link";
import { Compass, ShieldCheck, Heart, Mail, Phone, MapPin } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="bg-[#071840] text-slate-300 mt-auto border-t border-slate-800">
      {/* Trust & Guarantee ribbon */}
      <div className="border-b border-slate-800/80 bg-[#051333] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-950/70 border border-blue-700/50 flex items-center justify-center text-[#ff4b38] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">100% Verified Resorts</h4>
              <p className="text-xs text-slate-400">Inspected for safety, hygiene & comfort</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-950/70 border border-blue-700/50 flex items-center justify-center text-[#ff4b38] shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Flexible Cancellation</h4>
              <p className="text-xs text-slate-400">Free changes & refunds up to 48 hours</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-950/70 border border-blue-700/50 flex items-center justify-center text-[#ff4b38] shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">24/7 Dedicated Concierge</h4>
              <p className="text-xs text-slate-400">Direct assistance before & during your stay</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1680px] mx-auto px-6 sm:px-8 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#1444a8] to-[#2563eb] flex items-center justify-center text-white shadow-md">
                <Compass className="w-7 h-7 text-[#ff4b38]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Stay<span className="text-[#ff4b38]">Up</span>
              </span>
            </div>
            <p className="text-base text-slate-300 max-w-md leading-relaxed">
              Discover top rated value stays, luxury resorts, private pool villas, and mountain chalets handpicked
              for authentic comfort and memorable travel experiences worldwide.
            </p>
            <div className="space-y-2.5 text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#ff4b38] shrink-0" />
                <span>Global Headquarters: Marina Coastal Walk, Tower 2</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#ff4b38] shrink-0" />
                <span>24/7 Helpline: 0124-6201611 • +1 (800) 428-7200</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#ff4b38] shrink-0" />
                <span>support@stayup.com</span>
              </div>
            </div>
          </div>

          {/* Top destinations */}
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4">
              Top Destinations
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <Link href="/resorts?destination=Maldives" className="hover:text-white transition-colors">
                  Maldives Overwater Stays
                </Link>
              </li>
              <li>
                <Link href="/resorts?destination=Bali" className="hover:text-white transition-colors">
                  Bali Rainforest & Villas
                </Link>
              </li>
              <li>
                <Link href="/resorts?destination=Swiss+Alps" className="hover:text-white transition-colors">
                  Swiss Alps Mountain Chalets
                </Link>
              </li>
              <li>
                <Link href="/resorts?destination=Dubai" className="hover:text-white transition-colors">
                  Dubai Palm Luxury Stays
                </Link>
              </li>
              <li>
                <Link href="/resorts?destination=Goa" className="hover:text-white transition-colors">
                  Goa Heritage Estates
                </Link>
              </li>
              <li>
                <Link href="/resorts?destination=Santorini" className="hover:text-white transition-colors">
                  Santorini Caldera Suites
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Navigation (User-side Only) */}
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4">
              Quick Navigation
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors font-bold text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/resorts" className="hover:text-white transition-colors">
                  Browse Stays & Resorts
                </Link>
              </li>
              <li>
                <Link href="/resorts?category=beachfront" className="hover:text-white transition-colors">
                  Beachfront Villas
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="hover:text-white transition-colors">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-white transition-colors">
                  Guest Profile
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Sign In / Demo Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Info */}
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4">
              Booking Trust
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <span className="text-slate-300">Best Rate Guarantee</span>
              </li>
              <li>
                <span className="text-slate-300">Verified Guest Reviews</span>
              </li>
              <li>
                <span className="text-slate-300">Sanitized Room Standards</span>
              </li>
              <li>
                <span className="text-slate-300">Complimentary Breakfast Plans</span>
              </li>
              <li>
                <span className="text-slate-300">Eco-Sustainable Stays</span>
              </li>
              <li>
                <span className="text-slate-300">Host Protection Program</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and project disclaimer */}
        <div className="mt-14 pt-8 border-t border-slate-800 text-sm text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 StayUp. Developed for Group Project Frontend Showcase.</p>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span>Frontend-Only Mock Implementation</span>
            <span>•</span>
            <span>Next.js App Router & TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
