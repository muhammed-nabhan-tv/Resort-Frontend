import { Resort, RoomType, SearchFilterParams } from "@/types/resort";
import { Booking, BookingFormData } from "@/types/booking";
import { User } from "@/types/user";
import { Review } from "@/types/review";
import { MOCK_RESORTS } from "@/data/resorts";
import { MOCK_ROOMS } from "@/data/rooms";
import { MOCK_USERS, CURRENT_MOCK_USER } from "@/data/users";
import { MOCK_BOOKINGS } from "@/data/bookings";
import { MOCK_REVIEWS } from "@/data/reviews";
import { calculateNights } from "./utils";

// Local state caches (in-memory per session)
let resortsStore: Resort[] = [...MOCK_RESORTS];
let roomsStore: RoomType[] = [...MOCK_ROOMS];
let bookingsStore: Booking[] = [...MOCK_BOOKINGS];
let usersStore: User[] = [...MOCK_USERS];
let reviewsStore: Review[] = [...MOCK_REVIEWS];

export const mockApi = {
  // Public & Search
  async getResorts(filters?: SearchFilterParams): Promise<Resort[]> {
    let results = [...resortsStore];

    if (!filters) return results;

    if (filters.destination && filters.destination.trim() !== "" && filters.destination.toLowerCase() !== "all") {
      const q = filters.destination.toLowerCase().trim();
      results = results.filter(
        (r) =>
          r.destination.toLowerCase().includes(q) ||
          r.city.toLowerCase().includes(q) ||
          r.country.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q)
      );
    }

    if (filters.category && filters.category !== "all") {
      results = results.filter((r) => r.category === filters.category);
    }

    if (filters.minPrice !== undefined) {
      results = results.filter((r) => r.pricePerNight >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      results = results.filter((r) => r.pricePerNight <= filters.maxPrice!);
    }

    if (filters.minRating !== undefined) {
      results = results.filter((r) => r.rating >= filters.minRating!);
    }

    if (filters.amenities && filters.amenities.length > 0) {
      results = results.filter((r) =>
        filters.amenities!.every((reqAmenity) =>
          r.amenities.some((a) => a.toLowerCase().includes(reqAmenity.toLowerCase()))
        )
      );
    }

    if (filters.sortBy) {
      if (filters.sortBy === "price-low") {
        results.sort((a, b) => a.pricePerNight - b.pricePerNight);
      } else if (filters.sortBy === "price-high") {
        results.sort((a, b) => b.pricePerNight - a.pricePerNight);
      } else if (filters.sortBy === "rating") {
        results.sort((a, b) => b.rating - a.rating);
      }
    }

    return results;
  },

  async getFeaturedResorts(): Promise<Resort[]> {
    return resortsStore.filter((r) => r.isFeatured && r.status === "active");
  },

  async getResortById(id: string): Promise<Resort | null> {
    const resort = resortsStore.find((r) => r.id === id);
    return resort || null;
  },

  async getRoomsByResortId(resortId: string): Promise<RoomType[]> {
    return roomsStore.filter((rm) => rm.resortId === resortId);
  },

  async getRoomById(id: string): Promise<RoomType | null> {
    return roomsStore.find((rm) => rm.id === id) || null;
  },

  async getResortReviews(resortId: string): Promise<Review[]> {
    return reviewsStore.filter((rev) => rev.resortId === resortId);
  },

  // Customer Bookings
  async getUserBookings(userId: string = CURRENT_MOCK_USER.id): Promise<Booking[]> {
    return bookingsStore.filter((b) => b.userId === userId);
  },

  async getBookingById(id: string): Promise<Booking | null> {
    return bookingsStore.find((b) => b.id === id) || null;
  },

  async createBooking(data: BookingFormData): Promise<Booking> {
    const resort = resortsStore.find((r) => r.id === data.resortId);
    const room = roomsStore.find((rm) => rm.id === data.roomId);

    const nights = calculateNights(data.checkIn, data.checkOut);
    const rate = room ? room.pricePerNight : resort ? resort.pricePerNight : 250;
    const subtotal = rate * nights * (data.rooms || 1);
    const taxesAndFees = Math.round(subtotal * 0.15);
    const discount = 50;
    const totalAmount = subtotal + taxesAndFees - discount;

    const newBooking: Booking = {
      id: `bk-${Date.now().toString().slice(-4)}`,
      bookingReference: `AUR-${Math.floor(10000 + Math.random() * 90000)}`,
      resortId: data.resortId,
      resortName: resort ? resort.name : "Featured Resort",
      resortImage:
        resort?.featuredImage ||
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80",
      resortLocation: resort ? `${resort.city}, ${resort.country}` : "Tropical Island",
      roomId: data.roomId,
      roomName: room ? room.name : "Selected Suite",
      userId: CURRENT_MOCK_USER.id,
      guestName: data.guestName || CURRENT_MOCK_USER.name,
      guestEmail: data.guestEmail || CURRENT_MOCK_USER.email,
      guestPhone: data.guestPhone || CURRENT_MOCK_USER.phone,
      guestCount: data.guests || 2,
      roomCount: data.rooms || 1,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      nights,
      pricePerNight: rate,
      subtotal,
      taxesAndFees,
      discount,
      totalAmount,
      currency: "$",
      status: "confirmed",
      paymentStatus: "paid",
      specialRequests: data.specialRequests,
      createdAt: new Date().toISOString().split("T")[0],
    };

    bookingsStore = [newBooking, ...bookingsStore];
    return newBooking;
  },

  async cancelBooking(id: string): Promise<Booking | null> {
    const idx = bookingsStore.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    bookingsStore[idx] = {
      ...bookingsStore[idx],
      status: "cancelled",
      paymentStatus: "refunded",
    };
    return bookingsStore[idx];
  },
};
