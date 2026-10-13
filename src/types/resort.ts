export type ResortCategory =
  | "beachfront"
  | "mountain"
  | "villas"
  | "forest"
  | "heritage"
  | "wellness";

export type ListingStatus = "active" | "pending" | "suspended" | "rejected";

export interface Resort {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  ownerId: string;
  ownerName: string;
  destination: string;
  country: string;
  city: string;
  address: string;
  category: ResortCategory;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  originalPrice: number;
  currency: string;
  images: string[];
  featuredImage: string;
  amenities: string[];
  status: ListingStatus;
  checkInTime: string;
  checkOutTime: string;
  rules: string[];
  cancellationPolicy: string;
  isFeatured: boolean;
  totalRooms: number;
  createdAt: string;
}

export interface RoomType {
  id: string;
  resortId: string;
  name: string;
  type: string;
  description: string;
  pricePerNight: number;
  originalPrice: number;
  maxGuests: number;
  bedType: string;
  sizeSqFt: number;
  images: string[];
  amenities: string[];
  availableCount: number;
  totalCount: number;
  isAvailable: boolean;
}

export interface SearchFilterParams {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  rooms?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  amenities?: string[];
  sortBy?: "recommended" | "price-low" | "price-high" | "rating";
}
