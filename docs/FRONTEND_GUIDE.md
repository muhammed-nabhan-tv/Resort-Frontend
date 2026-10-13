# Aura Resorts — Frontend Architecture & Developer Guide

## 1. Project Overview

**Aura Resorts** is a modern resort and luxury stay booking platform built for our group project. Inspired by the streamlined discovery, transparent pricing, and intuitive booking ergonomics of OYO, the platform delivers a specialized luxury and nature resort experience with an **"Ocean & Coral"** visual aesthetic.

The platform provides dedicated experiences for three distinct roles:
1. **Customer / Traveler**: Discovers resorts, filters by destination and amenities, views room options, completes frontend reservations, manages booking vouchers, and modifies profiles.
2. **Building Owner (Host)**: Manages properties, configures suite types and inventory, tracks bookings, reviews guest comments, and views settlement earnings.
3. **Admin (Platform Operations)**: Oversees system-wide listings, moderates property submissions, reviews financial transactions, manages user permissions, and configures platform fee parameters.

---

## 2. Technology Stack

* **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack, React 19)
* **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing, zero `any` usage)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom CSS tokens for the Ocean & Coral palette
* **Icons**: [Lucide React](https://lucide.dev/) (modern semantic SVG iconography)
* **State & Simulation**: In-memory typed mock service layer (`src/lib/mock-api.ts`)

---

## 3. Design System: Ocean & Coral Theme

The visual design is grounded in the **"1. Ocean & Coral"** palette:

| Token | Hex Value | Semantic Role |
| :--- | :--- | :--- |
| **Deep Ocean Navy** | `#0a2560` / `#081d4d` | Primary brand identity, hero gradients, headers, key headings |
| **Ocean Cobalt** | `#1444a8` / `#1d58cc` | Active states, hover links, secondary accents |
| **Sunset Coral Red** | `#ff4b38` (Hover: `#e63827`) | Primary Call-to-Action (Search, Book, Reserve, Badges) |
| **Coral Tint** | `#ffe8e5` / `#fff4f2` | Badge backgrounds, promotional highlights |
| **Pure White** | `#ffffff` | Elevated cards, search pill containers, clean modals |
| **Slate Neutrals** | `#0f172a` (Charcoal) / `#64748b` | High contrast readable typography |
| **Cool Canvas** | `#f8fafc` | Clean neutral page backdrop |

---

## 4. Application Folder Structure

```
Resort-Frontend/
├── docs/                               # Comprehensive project documentation
│   ├── FRONTEND_GUIDE.md              # This architecture guide
│   ├── API_REQUIREMENTS.md            # Proposed REST contracts for backend team
│   ├── DATA_MODELS.md                 # Entity relationship & model specifications
│   └── IMPLEMENTATION_STATUS.md       # Progress audit & completed deliverables
├── src/
│   ├── app/
│   │   ├── (public)/                  # Customer-Facing Website (Shared Public Header/Footer)
│   │   │   ├── layout.tsx             # Public Layout + Role Switcher Bar
│   │   │   ├── page.tsx               # Homepage with OYO-style hero & destination explorer
│   │   │   ├── resorts/
│   │   │   │   ├── page.tsx           # Search results & filter sidebar
│   │   │   │   └── [id]/page.tsx      # Resort details, suite picker, reviews & sticky summary
│   │   │   ├── booking/
│   │   │   │   └── [id]/page.tsx      # Reservation flow, price breakdown, mock confirmation
│   │   │   ├── bookings/
│   │   │   │   └── page.tsx           # Customer bookings & cancellation workflow
│   │   │   └── profile/
│   │   │       └── page.tsx           # Customer profile & preferences
│   │   ├── (owner)/
│   │   │   └── owner/                 # Building Owner Portal (Dedicated Sidebar Layout)
│   │   │       ├── layout.tsx         # Owner sidebar navigation + Host header
│   │   │       ├── dashboard/page.tsx # Host KPI metrics & recent activity
│   │   │       ├── properties/page.tsx# Add/Edit property modal & photo preview
│   │   │       ├── rooms/page.tsx     # Room types, occupancy & inventory counts
│   │   │       ├── bookings/page.tsx  # Guest booking table & voucher details
│   │   │       ├── earnings/page.tsx  # Revenue metrics & monthly bar graph
│   │   │       ├── reviews/page.tsx   # Guest review inspection & host replies
│   │   │       └── settings/page.tsx  # Host legal entity & payout bank details
│   │   ├── (admin)/
│   │   │   └── admin/                 # Admin Operations Console (Dark Sidebar Layout)
│   │   │       ├── layout.tsx         # Admin sidebar navigation + SuperAdmin badge
│   │   │       ├── dashboard/page.tsx # System metrics & submission approvals
│   │   │       ├── resorts/page.tsx   # Property listing moderation (Approve/Suspend)
│   │   │       ├── bookings/page.tsx  # Global booking audit & customer orders
│   │   │       ├── users/page.tsx     # User directory & account status toggles
│   │   │       ├── owners/page.tsx    # Host directory, verification & portfolios
│   │   │       ├── reviews/page.tsx   # Review moderation & safety flags
│   │   │       └── settings/page.tsx  # Platform commission % and tax configuration
│   │   ├── globals.css                # Tailwind imports & Ocean & Coral CSS tokens
│   │   └── layout.tsx                 # Root HTML & Inter font configuration
│   ├── components/
│   │   ├── layout/
│   │   │   ├── PublicHeader.tsx       # Navigation bar with destination ribbon & role links
│   │   │   └── PublicFooter.tsx       # Comprehensive footer with guarantees & shortcuts
│   │   ├── resorts/
│   │   │   ├── SearchBar.tsx          # OYO-style search pill with date/guest popovers
│   │   │   ├── ResortCard.tsx         # Property card with badges, price tags, and actions
│   │   │   └── FilterSidebar.tsx      # Price, rating, category, and amenity filters
│   │   └── ui/
│   │       └── RoleSwitcherBar.tsx    # Universal top switcher between Customer, Owner & Admin
│   ├── data/                          # Realistic local mock datasets
│   │   ├── resorts.ts                 # 9 global resorts across Bali, Maldives, Dubai, Swiss Alps, etc.
│   │   ├── rooms.ts                   # Suite variations with pricing, square footage, bed types
│   │   ├── users.ts                   # Customer, Owner, and Admin mock profiles
│   │   ├── bookings.ts                # Confirmed, completed, and cancelled reservations
│   │   └── reviews.ts                 # Guest reviews with ratings and host replies
│   ├── lib/
│   │   ├── mock-api.ts                # Asynchronous typed simulation layer
│   │   └── utils.ts                   # Formatting helpers (Currency, Dates, Nights, CSS cn)
│   └── types/                         # Shared TypeScript interfaces
│       ├── resort.ts                  # Resort, RoomType, and SearchFilterParams
│       ├── booking.ts                 # Booking, BookingFormData, Statuses
│       ├── user.ts                    # User, UserRole, Building Owner profiles
│       ├── review.ts                  # Review, ReviewStatus
│       └── index.ts                   # Barrel export file
```

---

## 5. How to Run the Application

### Prerequisites
* **Node.js**: v18.18+ or v20+ recommended (Current tested runtime: v24.13.0)
* **npm**: v9+ (Current tested runtime: v11.6.2)

### Installation
From the `Resort-Frontend` root folder:
```bash
npm install
```

### Running Locally (Development Server)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
```
Starts Turbopack static optimization and verifies all TypeScript routes.

---

## 6. Three Portals Overview & Testing

To facilitate team evaluation and grading, every page displays the universal **Role Switcher Bar** at the top:

1. **Customer Portal (`/`)**:
   * Search for destinations (e.g. typing "Bali", "Maldives", or selecting "Nearby").
   * Filter stays on `/resorts` by price slider, minimum rating (e.g. 4.8+), and categories.
   * View resort details at `/resorts/res-01`, select different suites, inspect amenities.
   * Proceed to `/booking/res-01` to test the client-side validation, price calculation (subtotal + 15% taxes - $50 discount), and mock confirmation voucher.
   * Check `/bookings` to inspect confirmed stays and test the interactive cancellation modal.
   * Visit `/profile` to test updating contact information.

2. **Building Owner Portal (`/owner/dashboard`)**:
   * Review properties on `/owner/properties` and click **"Add New Resort"** to test the form with live browser photo preview.
   * View and edit room inventories on `/owner/rooms`.
   * Inspect guest vouchers on `/owner/bookings`.
   * Check monthly revenue trends on `/owner/earnings`.
   * Reply to guest comments on `/owner/reviews`.

3. **Admin Portal (`/admin/dashboard`)**:
   * Review pending resort submissions (e.g. *Serena Dunes Desert Palace*) and approve them with one click.
   * Filter and inspect bookings across the entire platform on `/admin/bookings`.
   * Suspend or activate user accounts on `/admin/users`.
   * Audit partner building owners on `/admin/owners`.
   * Moderate guest reviews on `/admin/reviews`.
   * Adjust platform commission and tax percentages on `/admin/settings`.

---

## 7. Future Backend Integration Points

All frontend interactions currently route through `src/lib/mock-api.ts`. When the backend team delivers the REST endpoints specified in `docs/API_REQUIREMENTS.md`, the integration will occur seamlessly by replacing the in-memory array manipulation in `src/lib/mock-api.ts` with standard `fetch()` or `axios` calls:

* **Authentication**: Replace `CURRENT_MOCK_USER` with an `AuthProvider` consuming JWT tokens.
* **Resorts & Search**: Update `mockApi.getResorts(params)` to call `GET /api/resorts?destination=...`
* **Bookings**: Update `mockApi.createBooking(data)` to call `POST /api/bookings`.
* **Owner Endpoints**: Connect `/owner/*` pages to `/api/owner/*` authenticated routes.
* **Admin Endpoints**: Connect `/admin/*` pages to `/api/admin/*` protected routes.
