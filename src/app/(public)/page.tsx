"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wifi,
  Wind,
  Sparkles,
  Coffee,
  UserCheck,
  Globe2,
  ArrowRight,
  ShieldCheck,
  Star,
  Award,
  Users,
  Palmtree,
  Mountain,
  Trees,
  Castle,
  Key,
  Smartphone,
  CheckCircle2,
} from "lucide-react";
import { SearchBar } from "@/components/resorts/SearchBar";
import { ResortCard } from "@/components/resorts/ResortCard";
import { MOCK_RESORTS } from "@/data/resorts";

const DESTINATION_CARDS = [
  {
    name: "Bali",
    country: "Indonesia",
    subtitle: "Beach Paradise & Wellness Retreats",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    slug: "Bali",
  },
  {
    name: "Dubai",
    country: "UAE",
    subtitle: "Luxury Getaways & Vibrant Skyline",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    slug: "Dubai",
  },
  {
    name: "London",
    country: "UK",
    subtitle: "Rich History & Vibrant City Life",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
    slug: "Swiss Alps",
  },
  {
    name: "New York",
    country: "USA",
    subtitle: "Iconic Sights & Central Park",
    image:
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=800&q=80",
    slug: "Swiss Alps",
  },
  {
    name: "Bangkok",
    country: "Thailand",
    subtitle: "Vibrant Nightlife & Shopping Hub",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
    slug: "Phuket",
  },
];

const COUNTRY_FLAGS = [
  { name: "All", flag: "🌐" },
  { name: "Indonesia", flag: "🇮🇩" },
  { name: "Maldives", flag: "🇲🇻" },
  { name: "Thailand", flag: "🇹🇭" },
  { name: "UAE", flag: "🇦🇪" },
  { name: "Switzerland", flag: "🇨🇭" },
  { name: "India", flag: "🇮🇳" },
  { name: "Greece", flag: "🇬🇷" },
  { name: "UK", flag: "🇬🇧" },
  { name: "USA", flag: "🇺🇸" },
];

export default function HomePage() {
  const [selectedCountry, setSelectedCountry] = useState("All");

  const featuredResorts = MOCK_RESORTS.filter((r) => r.isFeatured);

  return (
    <div className="w-full space-y-20 pb-24">
      {/* 1. HERO SECTION - Immersive Bay Landscape matching Screenshot 1 */}
      <section className="relative w-full min-h-[560px] md:min-h-[620px] flex flex-col justify-between overflow-hidden">
        {/* Background Image: Ha Long Bay / Tropical Landscape from user screenshot 1 */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85')",
          }}
        >
          {/* Subtle gradient overlay to make text and search bar pop */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/80" />
        </div>

        {/* Hero Content (Stretchy & expansive) */}
        <div className="relative z-10 w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-20 md:pt-28 pb-12 text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight max-w-6xl mx-auto drop-shadow-md leading-tight">
            Top rated value stays across <span className="text-[#ff4b38]">35+ countries</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-slate-100 max-w-3xl mx-auto font-medium drop-shadow-sm">
            Handpicked resorts, overwater villas & nature stays with transparent pricing.
          </p>

          {/* Floating Search Pill Bar - Stretchy layout filling wide screen */}
          <div className="mt-10 md:mt-14 max-w-[1500px] w-full mx-auto">
            <SearchBar />
          </div>
        </div>

        {/* 2. TRUST STATS STRIP - Authentic Luxury Resort Highlights */}
        <div className="relative z-10 w-full bg-white/95 backdrop-blur-md border-t border-slate-200 py-4.5 shadow-sm">
          <div className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="flex flex-wrap items-center justify-around gap-6 text-slate-800 text-sm sm:text-base font-extrabold">
              <div className="flex items-center gap-2.5">
                <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                <span>4.95 / 5 Guest Rating</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe2 className="w-5 h-5 text-blue-600" />
                <span>35+ Exotic Destinations</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>100% Verified Luxury Stays</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#ff4b38]" />
                <span>Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span>Best Rate Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CURATED RESORT EXPERIENCE */}
      <section className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
            <div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#e52823] tracking-tight">
                  StayUp
                </span>
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  Curated Resort Experience
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-8 text-sm sm:text-base text-slate-700 font-bold mt-3">
                <span className="flex items-center gap-2 text-slate-800">
                  <ShieldCheck className="w-5 h-5 text-[#e52823]" /> 100% Verified Quality
                </span>
                <span className="flex items-center gap-2 text-slate-800">
                  <Award className="w-5 h-5 text-[#e52823]" /> Handpicked Luxury Stays
                </span>
                <span className="flex items-center gap-2 text-slate-800">
                  <Sparkles className="w-5 h-5 text-[#e52823]" /> Best Price Guarantee
                </span>
              </div>
            </div>
          </div>

          {/* 5 Amenity Cards with Modern 3D / Rich Aesthetic */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
            {/* Free Wi-Fi */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 hover:border-[#0a2560] hover:shadow-xl transition-all flex flex-col items-center text-center group cursor-pointer">
              <div className="w-18 h-18 rounded-2xl bg-blue-50 text-[#0a2560] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
                <Wifi className="w-9 h-9 text-[#0a2560]" />
              </div>
              <h4 className="font-black text-slate-900 text-base sm:text-lg">Free Wi-Fi</h4>
              <p className="text-sm text-slate-500 mt-1 font-medium">High-speed connectivity</p>
            </div>

            {/* AC Rooms */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 hover:border-[#0a2560] hover:shadow-xl transition-all flex flex-col items-center text-center group cursor-pointer">
              <div className="w-18 h-18 rounded-2xl bg-blue-50 text-[#0a2560] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
                <Wind className="w-9 h-9 text-[#0a2560]" />
              </div>
              <h4 className="font-black text-slate-900 text-base sm:text-lg">AC rooms</h4>
              <p className="text-sm text-slate-500 mt-1 font-medium">Climate controlled suites</p>
            </div>

            {/* Clean Rooms */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 hover:border-[#0a2560] hover:shadow-xl transition-all flex flex-col items-center text-center group cursor-pointer">
              <div className="w-18 h-18 rounded-2xl bg-blue-50 text-[#0a2560] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
                <Sparkles className="w-9 h-9 text-[#0a2560]" />
              </div>
              <h4 className="font-black text-slate-900 text-base sm:text-lg">Clean rooms</h4>
              <p className="text-sm text-slate-500 mt-1 font-medium">Sanitized linen & stays</p>
            </div>

            {/* Essential Toiletries */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 hover:border-[#0a2560] hover:shadow-xl transition-all flex flex-col items-center text-center group cursor-pointer">
              <div className="w-18 h-18 rounded-2xl bg-blue-50 text-[#0a2560] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
                <Coffee className="w-9 h-9 text-[#0a2560]" />
              </div>
              <h4 className="font-black text-slate-900 text-base sm:text-lg">Essential toiletries</h4>
              <p className="text-sm text-slate-500 mt-1 font-medium">Fresh kit provided</p>
            </div>

            {/* Helpful Staff */}
            <div className="col-span-2 sm:col-span-1 p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 hover:border-[#0a2560] hover:shadow-xl transition-all flex flex-col items-center text-center group cursor-pointer">
              <div className="w-18 h-18 rounded-2xl bg-blue-50 text-[#e52823] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
                <UserCheck className="w-9 h-9 text-[#e52823]" />
              </div>
              <h4 className="font-black text-slate-900 text-base sm:text-lg">Helpful staff</h4>
              <p className="text-sm text-slate-500 mt-1 font-medium">24/7 dedicated service</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRAVEL THE WORLD. SPEND LESS. - Matching Screenshot 1, 2, 3 */}
      <section className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              <span className="text-[#e52823]">Travel</span> the world. Spend less.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-2 font-medium">
              Handpicked resort escapes with guaranteed best rates across top international destinations.
            </p>
          </div>

          <Link
            href="/resorts"
            className="inline-flex items-center gap-2 text-base font-extrabold text-[#0a2560] hover:text-[#e52823] transition-colors"
          >
            <span>Explore all global stays</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Country Flag Selector (Exact recreation from user screenshots) */}
        <div className="flex items-center gap-3.5 overflow-x-auto pb-4 no-scrollbar">
          {COUNTRY_FLAGS.map((c) => {
            const isSelected = selectedCountry === c.name;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedCountry(c.name)}
                className={`px-5 py-2.5 rounded-full text-sm sm:text-base font-bold whitespace-nowrap transition-all flex items-center gap-2.5 cursor-pointer ${
                  isSelected
                    ? "bg-[#0a2560] text-white shadow-lg shadow-blue-900/25 scale-105"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span className="text-lg">{c.flag}</span>
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>

        {/* Destination Cards Row (Wide & Stretchy layout matching user screenshots) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-4">
          {DESTINATION_CARDS.map((dest) => (
            <Link
              key={dest.name}
              href={`/resorts?destination=${encodeURIComponent(dest.slug)}`}
              className="group relative rounded-3xl overflow-hidden aspect-3/4 shadow-md hover:shadow-2xl transition-all duration-300"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/25 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-bold text-blue-200 uppercase tracking-wider block">
                  {dest.country}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
                  {dest.name}
                </h3>
                <p className="text-sm text-slate-200 line-clamp-1 mt-1 font-medium">
                  {dest.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. FEATURED LUXURY RESORTS GRID */}
      <section className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-sm font-black text-[#e52823] uppercase tracking-wider block">
              Handpicked Collections
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-1">
              Top Resort Stays & Villas
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-2 font-medium">
              Verified luxury accommodations with instant confirmation and flexible cancellation.
            </p>
          </div>

          <Link
            href="/resorts"
            className="inline-flex items-center gap-2 text-base font-extrabold text-[#0a2560] hover:text-[#e52823] transition-colors"
          >
            <span>View All Resorts</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredResorts.map((resort) => (
            <ResortCard key={resort.id} resort={resort} />
          ))}
        </div>
      </section>

      {/* 6. TRAVELER REWARDS & ESCAPES CTA (Zero owner/admin references) */}
      <section className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="bg-gradient-to-r from-[#0a2560] to-[#1444a8] rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl relative z-10 space-y-5">
            <span className="bg-[#e52823] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Exclusive Member Benefits
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
              Ready for your next dream getaway?
            </h3>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              Explore thousands of handpicked villas, beachfront bungalows, and alpine chalets with transparent
              pricing, zero hidden fees, and instant reservation confirmation.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/resorts"
                className="bg-[#e52823] hover:bg-[#cc201b] text-white font-extrabold text-base px-9 py-4 rounded-full transition-colors shadow-lg shadow-red-600/35 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Explore All Stays</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/login"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-base px-8 py-4 rounded-full transition-colors backdrop-blur-md border border-white/20 cursor-pointer"
              >
                <span>Quick Demo Access</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
