import { Review } from "@/types/review";

export const MOCK_REVIEWS: Review[] = [
  {
    id: "rev-101",
    resortId: "res-01",
    resortName: "The Azure Horizon Atoll Resort & Villas",
    userId: "usr-01",
    userName: "Alex Morgan",
    userAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "2026-09-15",
    title: "An unforgettable turquoise paradise!",
    comment:
      "The overwater sunrise villa exceeded every expectation. The house reef is teeming with baby reef sharks and eagle rays right below the deck. The staff and culinary pavilions are world-class.",
    status: "approved",
    ownerReply: {
      text: "Thank you Alex! It was an absolute delight hosting you. We hope to welcome you back for another Maldivian sunset.",
      date: "2026-09-16",
    },
  },
  {
    id: "rev-102",
    resortId: "res-01",
    resortName: "The Azure Horizon Atoll Resort & Villas",
    userId: "usr-06",
    userName: "Jessica Chen",
    userAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "2026-08-28",
    title: "Pure bliss and impeccable service",
    comment:
      "From the seaplane arrival greeting to the private sandbank picnic, everything was seamless. High-speed Wi-Fi worked flawlessly even overwater.",
    status: "approved",
  },
  {
    id: "rev-103",
    resortId: "res-02",
    resortName: "Ubud Sanctuary Rainforest & River Retreat",
    userId: "usr-07",
    userName: "David Miller",
    userAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "2026-09-02",
    title: "Magical rainforest escape in Ubud",
    comment:
      "Waking up to the mist over the Ayung river valley while having tropical dragonfruit breakfast on the terrace was pure poetry. The plunge pool is divine.",
    status: "approved",
    ownerReply: {
      text: "Suksma David! We cherish that you connected deeply with Ubud's natural river energy.",
      date: "2026-09-04",
    },
  },
  {
    id: "rev-104",
    resortId: "res-03",
    resortName: "Alpenblume Grand Mountain & Spa Chalet",
    userId: "usr-08",
    userName: "Sofia Rossi",
    userAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    rating: 4,
    date: "2026-07-19",
    title: "Incredible Matterhorn views and thermal spa",
    comment:
      "The ski-in ski-out convenience and cedar sauna are exceptional. Fireplace lounge in the evening was cozy. Restaurant fondue was delicious.",
    status: "approved",
  },
  {
    id: "rev-105",
    resortId: "res-09",
    resortName: "Serena Dunes Desert Palace & Bedouin Camp",
    userId: "usr-09",
    userName: "Tariq Al-Mansoor",
    userAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "2026-08-11",
    title: "Stunning desert oasis under the stars",
    comment:
      "The private dune plunge pool contrasting with the warm golden desert sands is breathtaking. The falconry and barbecue dinner were top tier.",
    status: "pending",
  },
];
