export type ReviewStatus = "approved" | "pending" | "flagged";

export interface Review {
  id: string;
  resortId: string;
  resortName: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  status: ReviewStatus;
  ownerReply?: {
    text: string;
    date: string;
  };
}
