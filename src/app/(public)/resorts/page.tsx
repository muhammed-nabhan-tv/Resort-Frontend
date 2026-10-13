"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/resorts/SearchBar";
import { ResortCard } from "@/components/resorts/ResortCard";
import { FilterSidebar } from "@/components/resorts/FilterSidebar";
import { MOCK_RESORTS } from "@/data/resorts";
import { SearchFilterParams, Resort } from "@/types/resort";
import { Compass, Filter, RefreshCw } from "lucide-react";

function ResortsSearchContent() {
  const searchParams = useSearchParams();

  const destinationParam = searchParams.get("destination") || "";
  const categoryParam = searchParams.get("category") || "";
  const checkInParam = searchParams.get("checkIn") || "2026-11-15";
  const checkOutParam = searchParams.get("checkOut") || "2026-11-20";
  const guestsParam = searchParams.get("guests") ? Number(searchParams.get("guests")) : 2;
  const roomsParam = searchParams.get("rooms") ? Number(searchParams.get("rooms")) : 1;

  const [filters, setFilters] = useState<SearchFilterParams>({
    destination: destinationParam,
    category: categoryParam,
    checkIn: checkInParam,
    checkOut: checkOutParam,
    guests: guestsParam,
    rooms: roomsParam,
    sortBy: "recommended",
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync searchParams with local state if URL changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      destination: searchParams.get("destination") || "",
      category: searchParams.get("category") || "",
      checkIn: searchParams.get("checkIn") || "2026-11-15",
      checkOut: searchParams.get("checkOut") || "2026-11-20",
    }));
  }, [searchParams]);

  // Client-side filtering & sorting of mock data
  const filteredResorts = useMemo(() => {
    let list = [...MOCK_RESORTS].filter((r) => r.status === "active");

    if (filters.destination && filters.destination.trim() !== "" && filters.destination.toLowerCase() !== "all") {
      const q = filters.destination.toLowerCase().trim();
      list = list.filter(
        (r) =>
          r.destination.toLowerCase().includes(q) ||
          r.city.toLowerCase().includes(q) ||
          r.country.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q)
      );
    }

    if (filters.category && filters.category !== "all") {
      list = list.filter((r) => r.category === filters.category);
    }

    if (filters.minPrice !== undefined) {
      list = list.filter((r) => r.pricePerNight >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      list = list.filter((r) => r.pricePerNight <= filters.maxPrice!);
    }

    if (filters.minRating !== undefined) {
      list = list.filter((r) => r.rating >= filters.minRating!);
    }

    if (filters.amenities && filters.amenities.length > 0) {
      list = list.filter((r) =>
        filters.amenities!.every((reqAmenity) =>
          r.amenities.some((a) => a.toLowerCase().includes(reqAmenity.toLowerCase()))
        )
      );
    }

    if (filters.sortBy === "price-low") {
      list.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (filters.sortBy === "price-high") {
      list.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (filters.sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      destination: "",
      category: "",
      checkIn: "2026-11-15",
      checkOut: "2026-11-20",
      guests: 2,
      rooms: 1,
      sortBy: "recommended",
    });
  };

  return (
    <div className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-10 space-y-10">
      {/* Search Bar Banner */}
      <div className="bg-gradient-to-r from-[#0a2560] to-[#1444a8] p-6 sm:p-8 rounded-3xl text-white shadow-xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
            Find Your Next Resort Getaway
          </h1>
          <p className="text-sm sm:text-base text-blue-100 mt-1.5 font-medium">
            Browse verified luxury stays, overwater villas, and mountain chalets with instant confirmation
          </p>
        </div>
        <div className="max-w-[1500px] mx-auto">
          <SearchBar
            initialDestination={filters.destination}
            initialCheckIn={filters.checkIn}
            initialCheckOut={filters.checkOut}
            initialGuests={filters.guests}
            initialRooms={filters.rooms}
            isCompact
          />
        </div>
      </div>

      {/* Results Header and Mobile Filter Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {filters.destination ? (
              <>
                Resorts in <span className="text-[#0a2560]">{filters.destination}</span>
              </>
            ) : (
              "All Available Resorts"
            )}
          </h2>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Showing <strong className="text-slate-900 font-bold">{filteredResorts.length}</strong> {filteredResorts.length === 1 ? "stay" : "stays"} • Dates:{" "}
            <span className="font-bold text-slate-800">{filters.checkIn} → {filters.checkOut}</span> •{" "}
            <span className="font-bold text-slate-800">{filters.guests} Guests, {filters.rooms} Room</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-xs"
          >
            <Filter className="w-4 h-4 text-[#0a2560]" />
            <span>Filters ({filters.amenities?.length || (filters.category ? 1 : 0)})</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar + Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-3">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
          />
        </div>

        {/* Mobile Filter Drawer / Toggle */}
        {showMobileFilters && (
          <div className="lg:hidden col-span-1">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
            />
          </div>
        )}

        {/* Resort Cards Results (Stretchy lg:col-span-9 with 3-column layout) */}
        <div className="lg:col-span-9">
          {filteredResorts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredResorts.map((resort) => (
                <ResortCard
                  key={resort.id}
                  resort={resort}
                  checkIn={filters.checkIn}
                  checkOut={filters.checkOut}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0a2560] flex items-center justify-center mx-auto">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No Resorts Found</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We couldn&apos;t find any properties matching your current filter criteria or destination. Try
                loosening your price filters or searching for Bali, Maldives, Dubai, or Swiss Alps.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0a2560] text-white text-xs font-bold hover:bg-blue-900 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResortsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="w-10 h-10 border-4 border-[#0a2560] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-semibold text-slate-600">Loading resorts...</p>
        </div>
      }
    >
      <ResortsSearchContent />
    </Suspense>
  );
}
