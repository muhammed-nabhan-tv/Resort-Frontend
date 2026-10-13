"use client";

import { SlidersHorizontal, RotateCcw, Star, Check } from "lucide-react";
import { SearchFilterParams } from "@/types/resort";

interface FilterSidebarProps {
  filters: SearchFilterParams;
  onChange: (newFilters: SearchFilterParams) => void;
  onReset: () => void;
}

const CATEGORIES = [
  { id: "all", label: "All Categories" },
  { id: "beachfront", label: "Beachfront & Atoll" },
  { id: "villas", label: "Private Pool Villas" },
  { id: "mountain", label: "Mountain & Alpine" },
  { id: "forest", label: "Rainforest & Eco Lodges" },
  { id: "heritage", label: "Heritage Palaces" },
  { id: "wellness", label: "Wellness & Spa" },
];

const AMENITY_OPTIONS = [
  "Free High-Speed Wi-Fi",
  "Private Infinity Pool",
  "Full Spa & Wellness",
  "Free Gourmet Breakfast",
  "Oceanfront Dining",
  "Airport Seaplane Transfer",
  "Ski-in / Ski-out Access",
  "Pet Friendly Stays",
];

export function FilterSidebar({
  filters,
  onChange,
  onReset,
}: FilterSidebarProps) {
  const toggleAmenity = (amenity: string) => {
    const current = filters.amenities || [];
    const updated = current.includes(amenity)
      ? current.filter((a) => a !== amenity)
      : [...current, amenity];
    onChange({ ...filters, amenities: updated });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-7">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 font-black text-slate-900 text-lg">
          <SlidersHorizontal className="w-5 h-5 text-[#0a2560]" />
          <span>Filter Stays</span>
        </div>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 hover:text-[#ff4b38] font-bold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy || "recommended"}
          onChange={(e) =>
            onChange({
              ...filters,
              sortBy: e.target.value as SearchFilterParams["sortBy"],
            })
          }
          className="w-full text-sm font-bold p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#0a2560] text-slate-800"
        >
          <option value="recommended">Recommended & Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Guest Rating: Highest First</option>
        </select>
      </div>

      {/* Category Radio / Pills */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Resort Category
        </label>
        <div className="space-y-1.5">
          {CATEGORIES.map((cat) => {
            const isSelected =
              (!filters.category && cat.id === "all") ||
              filters.category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() =>
                  onChange({
                    ...filters,
                    category: cat.id === "all" ? undefined : cat.id,
                  })
                }
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? "bg-[#0a2560] text-white shadow-xs"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>{cat.label}</span>
                {isSelected && <Check className="w-4 h-4 text-[#ff4b38]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Price Range / Night
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <span className="text-xs text-slate-500 font-medium block mb-1">Min Price</span>
            <input
              type="number"
              placeholder="$0"
              value={filters.minPrice || ""}
              onChange={(e) =>
                onChange({
                  ...filters,
                  minPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="w-full text-sm font-bold p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#0a2560]"
            />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block mb-1">Max Price</span>
            <input
              type="number"
              placeholder="$1000"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                onChange({
                  ...filters,
                  maxPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="w-full text-sm font-bold p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#0a2560]"
            />
          </div>
        </div>
      </div>

      {/* Guest Rating */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Minimum Guest Rating
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Any", val: undefined },
            { label: "4.5+", val: 4.5 },
            { label: "4.8+", val: 4.8 },
            { label: "4.9+", val: 4.9 },
          ].map((item, idx) => {
            const isSelected = filters.minRating === item.val;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onChange({ ...filters, minRating: item.val })}
                className={`py-2.5 px-1 text-xs font-black rounded-xl border flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#0a2560] text-white border-[#0a2560] shadow-xs"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.val && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Amenities Checkboxes */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Resort Amenities
        </label>
        <div className="space-y-2.5">
          {AMENITY_OPTIONS.map((amenity) => {
            const isChecked = filters.amenities?.includes(amenity) || false;
            return (
              <label
                key={amenity}
                className="flex items-center gap-3 text-sm font-medium text-slate-700 hover:text-slate-900 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleAmenity(amenity)}
                  className="rounded text-[#0a2560] focus:ring-0 w-4 h-4 border-slate-300 cursor-pointer"
                />
                <span>{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
