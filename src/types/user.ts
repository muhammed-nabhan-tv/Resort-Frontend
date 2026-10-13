export type UserRole = "customer" | "owner" | "admin";
export type UserStatus = "active" | "suspended" | "pending_verification";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  joinedDate: string;
  status: UserStatus;
  // Specific to building owners
  propertiesCount?: number;
  totalEarnings?: number;
  businessName?: string;
  isVerified?: boolean;
}
