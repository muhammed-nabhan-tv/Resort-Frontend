import { User } from "@/types/user";

export const MOCK_USERS: User[] = [
  {
    id: "usr-01",
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 392-8190",
    role: "customer",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    joinedDate: "2023-08-14",
    status: "active",
  },
];

// Current logged in demo context (pure user)
export const CURRENT_MOCK_USER = MOCK_USERS[0]; // Alex Morgan (Customer)
