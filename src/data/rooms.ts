import { RoomType } from "@/types/resort";

export const MOCK_ROOMS: RoomType[] = [
  // Rooms for res-01 (Azure Horizon Maldives)
  {
    id: "rm-101",
    resortId: "res-01",
    name: "Overwater Lagoon Sunrise Villa",
    type: "Ocean Villa",
    description:
      "Hovering above turquoise shallows with glass floor viewing panels, direct swim ladder into the house reef, king canopy bed, and private timber sun deck with hammock nets.",
    pricePerNight: 480,
    originalPrice: 620,
    maxGuests: 2,
    bedType: "1 King Bed",
    sizeSqFt: 1150,
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    ],
    amenities: [
      "Ocean Deck",
      "Overwater Hammock",
      "Free High-Speed Wi-Fi",
      "Mini Bar Restocked Daily",
      "Rain Shower & Soaking Tub",
      "Nespresso Coffee Machine",
    ],
    availableCount: 4,
    totalCount: 12,
    isAvailable: true,
  },
  {
    id: "rm-102",
    resortId: "res-01",
    name: "Grand Sunset Infinity Pool Villa",
    type: "Pool Villa",
    description:
      "Expansive overwater haven with an oversized 8-meter freshwater infinity plunge pool, panoramic sunset views, private cabana, and outdoor rain shower.",
    pricePerNight: 690,
    originalPrice: 850,
    maxGuests: 4,
    bedType: "1 King Bed + 1 Daybed",
    sizeSqFt: 1650,
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80",
    ],
    amenities: [
      "8m Private Infinity Pool",
      "Sunset Facing",
      "Free Champagne on Arrival",
      "Butler Call Button",
      "Luxury Bvlgari Toiletries",
    ],
    availableCount: 2,
    totalCount: 8,
    isAvailable: true,
  },
  {
    id: "rm-103",
    resortId: "res-01",
    name: "Presidential Two-Bedroom Water Residence",
    type: "Presidential Suite",
    description:
      "The pinnacle of atoll luxury with twin master suites, glass-enclosed living salon, private chef kitchen, outdoor dining deck, and bi-level infinity pool.",
    pricePerNight: 1250,
    originalPrice: 1550,
    maxGuests: 6,
    bedType: "2 King Beds",
    sizeSqFt: 2800,
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
    ],
    amenities: [
      "Bi-Level Private Pool",
      "Private Chef on Request",
      "Direct Reef Ladder",
      "Full Dining Salon",
      "Complimentary Seaplane",
    ],
    availableCount: 1,
    totalCount: 2,
    isAvailable: true,
  },

  // Rooms for res-02 (Ubud Sanctuary Bali)
  {
    id: "rm-201",
    resortId: "res-02",
    name: "Ayung River Valley Timber Suite",
    type: "Deluxe Suite",
    description:
      "Handcrafted bamboo and reclaimed teak suite facing the rushing Ayung River ravine. Semi-open marble bath with sunken stone tub and aromatic frangipani garden.",
    pricePerNight: 240,
    originalPrice: 310,
    maxGuests: 2,
    bedType: "1 Four-Poster King Bed",
    sizeSqFt: 880,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
    ],
    amenities: [
      "Rainforest Balcony",
      "Sunken Stone Bath",
      "Organic Tea & Herbal Infusions",
      "Yoga Mats Provided",
      "Complimentary Breakfast",
    ],
    availableCount: 5,
    totalCount: 14,
    isAvailable: true,
  },
  {
    id: "rm-202",
    resortId: "res-02",
    name: "Jungle Sanctuary Private Pool Villa",
    type: "Pool Villa",
    description:
      "Detached private compound with private swimming pool surrounded by tropical banana palms, outdoor sun loungers, and traditional thatched bale pavilion.",
    pricePerNight: 390,
    originalPrice: 480,
    maxGuests: 3,
    bedType: "1 King Bed + 1 Rollaway",
    sizeSqFt: 1400,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
    ],
    amenities: [
      "Private Plunge Pool",
      "Outdoor Bale Gazebo",
      "Espresso Bar",
      "Floating Breakfast Option",
      "Sound System",
    ],
    availableCount: 3,
    totalCount: 8,
    isAvailable: true,
  },

  // Rooms for res-03 (Alpenblume Swiss Alps)
  {
    id: "rm-301",
    resortId: "res-03",
    name: "Matterhorn View Alpine Pine Suite",
    type: "Deluxe Suite",
    description:
      "Scented Swiss stone pine paneling, open stone wood-burning fireplace, king plush bedding, and private balcony with direct views of the iconic Matterhorn peak.",
    pricePerNight: 510,
    originalPrice: 650,
    maxGuests: 2,
    bedType: "1 King Bed",
    sizeSqFt: 750,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1000&q=80",
    ],
    amenities: [
      "Working Fireplace",
      "Balcony Peak View",
      "Heated Bathroom Floors",
      "Ski Boot Warmer in Room",
      "Swiss Chocolate Welcome",
    ],
    availableCount: 3,
    totalCount: 16,
    isAvailable: true,
  },

  // Rooms for res-04 (Royal Mirage Dubai)
  {
    id: "rm-401",
    resortId: "res-04",
    name: "Arabian Gulf Sea View Deluxe Room",
    type: "Deluxe Suite",
    description:
      "Opulent Arabian interiors with carved arches, plush velvet furnishings, private sea-facing terrace, and freestanding soaking tub with ocean views.",
    pricePerNight: 420,
    originalPrice: 550,
    maxGuests: 3,
    bedType: "1 King or 2 Queen Beds",
    sizeSqFt: 850,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    ],
    amenities: [
      "Private Balcony",
      "Marble Bathroom",
      "High-Speed Wi-Fi",
      "Hermès Bath Amenities",
      "24-Hour In-Room Dining",
    ],
    availableCount: 7,
    totalCount: 30,
    isAvailable: true,
  },

  // Rooms for res-05 (Coastal Haven Goa)
  {
    id: "rm-501",
    resortId: "res-05",
    name: "Portuguese Heritage Courtyard Room",
    type: "Garden Cottage",
    description:
      "High terracotta ceilings, antique four-poster rosewood bed, Azulejo tile decor, and wide french doors opening onto coconut palm gardens.",
    pricePerNight: 165,
    originalPrice: 220,
    maxGuests: 2,
    bedType: "1 Heritage Four-Poster Bed",
    sizeSqFt: 620,
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
    ],
    amenities: [
      "Garden Veranda",
      "Traditional Cane Armchairs",
      "AC & Ceiling Fans",
      "Artisan Bath Salts",
      "Free Breakfast",
    ],
    availableCount: 4,
    totalCount: 10,
    isAvailable: true,
  },

  // Rooms for res-06 (Caldera Cliff Santorini)
  {
    id: "rm-601",
    resortId: "res-06",
    name: "Honeymoon Cave Suite with Infinity Jacuzzi",
    type: "Pool Villa",
    description:
      "Iconic sculptured volcanic cave suite featuring a private heated whirlpool jutting out over the cliff edge, open champagne bar, and unobstructed sunset vistas.",
    pricePerNight: 520,
    originalPrice: 680,
    maxGuests: 2,
    bedType: "1 Built-in King Bed",
    sizeSqFt: 720,
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
    ],
    amenities: [
      "Cliffside Heated Jacuzzi",
      "Complimentary Champagne",
      "Greek Breakfast on Terrace",
      "Walk-in Rain Cave Shower",
    ],
    availableCount: 2,
    totalCount: 6,
    isAvailable: true,
  },
];
