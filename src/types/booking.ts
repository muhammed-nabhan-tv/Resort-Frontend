export type BookingStatus =
  | "confirmed"
  | "completed"
  | "cancelled"
  | "pending";

export type PaymentStatus = "paid" | "pending" | "refunded";

export interface Booking {
  id: string;
  bookingReference: string;
  resortId: string;
  resortName: string;
  resortImage: string;
  resortLocation: string;
  roomId: string;
  roomName: string;
  userId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestCount: number;
  roomCount: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  pricePerNight: number;
  subtotal: number;
  taxesAndFees: number;
  discount: number;
  totalAmount: number;
  currency: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  specialRequests?: string;
  createdAt: string;
}

export interface BookingFormData {
  resortId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  paymentMethod?: string;
}
