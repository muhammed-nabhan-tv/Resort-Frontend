import Link from "next/link";
import { Star, MapPin, Sparkles, Check, ArrowRight } from "lucide-react";
import { Resort } from "@/types/resort";
import { formatCurrency } from "@/lib/utils";

interface ResortCardProps {
  resort: Resort;
  checkIn?: string;
  checkOut?: string;
}

export function ResortCard({ resort, checkIn, checkOut }: ResortCardProps) {
  const queryParams = new URLSearchParams();
  if (checkIn) queryParams.set("checkIn", checkIn);
  if (checkOut) queryParams.set("checkOut", checkOut);
  const detailUrl = `/home/${resort.id}${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
  const bookingUrl = `/booking/${resort.id}${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Property Image Container */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resort.featuredImage}
          alt={resort.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient shadow for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-xs text-xs font-semibold px-2.5 py-1 rounded-full text-[#0a2560] shadow-sm">
            <Sparkles className="w-3 h-3 text-[#ff4b38]" />
            <span className="capitalize">{resort.category}</span>
          </span>

          <div className="inline-flex items-center gap-1 bg-[#0a2560]/95 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{resort.rating.toFixed(1)}</span>
            <span className="text-slate-300 text-[10px] font-normal">({resort.reviewCount})</span>
          </div>
        </div>

        {/* Bottom image overlay info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1 font-medium drop-shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#ff4b38]" />
            <span className="truncate">{resort.destination}, {resort.country}</span>
          </div>
          <span className="bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-sm text-[11px]">
            {resort.totalRooms} rooms
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <Link href={detailUrl} className="block group/title">
            <h3 className="font-black text-slate-900 text-xl sm:text-2xl leading-snug group-hover/title:text-[#0a2560] transition-colors line-clamp-1">
              {resort.name}
            </h3>
          </Link>

          <p className="text-sm font-medium text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
            {resort.tagline}
          </p>

          {/* Key Amenities pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {resort.amenities.slice(0, 3).map((amenity, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg"
              >
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="truncate max-w-[140px]">{amenity}</span>
              </span>
            ))}
            {resort.amenities.length > 3 && (
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                +{resort.amenities.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Pricing and Action Footer */}
        <div className="mt-6 pt-4.5 border-t border-slate-100 flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-400 line-through">
                {formatCurrency(resort.originalPrice, resort.currency)}
              </span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                Save 20%
              </span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl sm:text-3xl font-black text-[#0a2560]">
                {formatCurrency(resort.pricePerNight, resort.currency)}
              </span>
              <span className="text-sm text-slate-500 font-semibold">/ night</span>
            </div>
            <span className="block text-xs font-medium text-slate-500 mt-0.5">
              Includes breakfast & taxes
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href={detailUrl}
              className="inline-flex items-center justify-center text-sm font-bold px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
            >
              Details
            </Link>
            <Link
              href={bookingUrl}
              className="inline-flex items-center justify-center gap-1.5 text-sm font-black px-5 py-2.5 rounded-xl bg-[#e52823] hover:bg-[#cc201b] text-white shadow-md shadow-red-600/30 transition-all cursor-pointer active:scale-98"
            >
              <span>Book</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
