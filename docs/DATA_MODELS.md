# Aura Resorts — Proposed Data Models & Entity Relationships

> **Architectural Specification for Future Backend Team**: This document provides the proposed conceptual and relational data schemas designed during the frontend engineering phase.

---

## 1. Entity Relationship Diagram (Conceptual)

```
                    ┌──────────────────┐
                    │      User        │
                    │ (Customer/Admin) │
                    └─────────┬────────┘
                              │
                    ┌─────────▼────────┐
                    │   OwnerProfile   │
                    └─────────┬────────┘
                              │ 1 : N
                    ┌─────────▼────────┐           1 : N        ┌──────────────────┐
                    │      Resort      ├───────────────────────►│  PropertyImage   │
                    └─────────┬────────┘                        └──────────────────┘
                              │ 1 : N
                    ┌─────────▼────────┐           1 : N        ┌──────────────────┐
                    │     RoomType     ├───────────────────────►│  RoomInventory   │
                    └─────────┬────────┘                        └──────────────────┘
                              │
                              │ 1 : N
                    ┌─────────▼────────┐           1 : 1        ┌──────────────────┐
                    │     Booking      ├───────────────────────►│     Payment      │
                    └─────────┬────────┘                        └──────────────────┘
                              │
                    ┌─────────▼────────┐
                    │      Review      │
                    └──────────────────┘
```

---

## 2. Entity Definitions

### 2.1 User
Represents all system actors across the three portals.
* **Fields**:
  * `id`: UUID / Primary Key
  * `name`: String
  * `email`: String (Unique, Indexed)
  * `passwordHash`: String (Argon2 / bcrypt)
  * `phone`: String
  * `role`: Enum (`customer`, `owner`, `admin`)
  * `avatarUrl`: String
  * `status`: Enum (`active`, `suspended`, `pending_verification`)
  * `createdAt`: Timestamp
  * `updatedAt`: Timestamp

---

### 2.2 OwnerProfile
Extends the `User` entity when `role == 'owner'`.
* **Fields**:
  * `id`: UUID / Primary Key
  * `userId`: UUID (Foreign Key -> `User.id`, 1:1)
  * `businessName`: String (e.g. "Azure Hospitality Group")
  * `taxId`: String (TIN / VAT number)
  * `bankIban`: String (Encrypted bank payout account)
  * `isVerified`: Boolean (Verified by platform administrators)
  * `totalEarnings`: Decimal (Calculated summary of settled bookings)
  * `createdAt`: Timestamp

---

### 2.3 Resort
Represents a physical resort property listed on the platform.
* **Fields**:
  * `id`: UUID / Primary Key
  * `ownerId`: UUID (Foreign Key -> `OwnerProfile.id`, N:1)
  * `name`: String
  * `slug`: String (Unique, Indexed for SEO URLs)
  * `tagline`: String
  * `description`: Text
  * `destination`: String (e.g. "Bali", "Maldives", "Dubai", "Swiss Alps")
  * `country`: String
  * `city`: String
  * `address`: String
  * `latitude`: Decimal (optional GPS coordinate)
  * `longitude`: Decimal (optional GPS coordinate)
  * `category`: Enum (`beachfront`, `villas`, `mountain`, `forest`, `heritage`, `wellness`)
  * `basePricePerNight`: Decimal
  * `originalPrice`: Decimal
  * `currency`: String (Default: "$")
  * `status`: Enum (`active`, `pending`, `suspended`, `rejected`)
  * `checkInTime`: String (e.g. "14:00")
  * `checkOutTime`: String (e.g. "11:00")
  * `rules`: Array of Strings
  * `cancellationPolicy`: Text
  * `isFeatured`: Boolean
  * `rating`: Decimal (Cached average rating, e.g. 4.95)
  * `reviewCount`: Integer (Cached review count)
  * `totalRooms`: Integer
  * `createdAt`: Timestamp

---

### 2.4 PropertyImage
Stores gallery and showcase photography for a resort.
* **Fields**:
  * `id`: UUID / Primary Key
  * `resortId`: UUID (Foreign Key -> `Resort.id`, N:1)
  * `url`: String (CDN URL)
  * `altText`: String
  * `isPrimary`: Boolean
  * `sortOrder`: Integer

---

### 2.5 RoomType
Represents an accommodation category within a resort (e.g. "Ocean Sunset Villa", "Alpine Suite").
* **Fields**:
  * `id`: UUID / Primary Key
  * `resortId`: UUID (Foreign Key -> `Resort.id`, N:1)
  * `name`: String
  * `type`: Enum (`Deluxe Suite`, `Ocean Villa`, `Pool Villa`, `Presidential Suite`, `Chalet`, `Cottage`)
  * `description`: Text
  * `pricePerNight`: Decimal
  * `maxGuests`: Integer
  * `bedType`: String (e.g. "1 King Bed")
  * `sizeSqFt`: Integer
  * `amenities`: Array of Strings
  * `totalInventory`: Integer (Total units built on physical property)
  * `images`: Array of Strings
  * `createdAt`: Timestamp

---

### 2.6 RoomInventory / Availability
Tracks daily room availability to guarantee no overbooking occurs across overlapping dates.
* **Fields**:
  * `id`: UUID / Primary Key
  * `roomTypeId`: UUID (Foreign Key -> `RoomType.id`, N:1)
  * `date`: Date (YYYY-MM-DD)
  * `availableUnits`: Integer
  * `isBlocked`: Boolean (e.g. Maintenance or host blackout)

---

### 2.7 Booking
Records a guest reservation.
* **Fields**:
  * `id`: UUID / Primary Key
  * `bookingReference`: String (Unique, Indexed, e.g. "AUR-89421")
  * `userId`: UUID (Foreign Key -> `User.id`, N:1)
  * `resortId`: UUID (Foreign Key -> `Resort.id`, N:1)
  * `roomTypeId`: UUID (Foreign Key -> `RoomType.id`, N:1)
  * `guestName`: String
  * `guestEmail`: String
  * `guestPhone`: String
  * `guestCount`: Integer
  * `roomCount`: Integer
  * `checkIn`: Date
  * `checkOut`: Date
  * `nights`: Integer
  * `pricePerNight`: Decimal
  * `subtotal`: Decimal
  * `taxesAndFees`: Decimal
  * `discount`: Decimal
  * `totalAmount`: Decimal
  * `status`: Enum (`confirmed`, `completed`, `cancelled`, `pending`)
  * `paymentStatus`: Enum (`paid`, `pending`, `refunded`)
  * `specialRequests`: Text
  * `createdAt`: Timestamp

---

### 2.8 Payment
Logs the financial transaction linked to a reservation.
* **Fields**:
  * `id`: UUID / Primary Key
  * `bookingId`: UUID (Foreign Key -> `Booking.id`, 1:1)
  * `amount`: Decimal
  * `currency`: String
  * `gateway`: Enum (`stripe`, `paypal`, `pay_at_checkin`)
  * `transactionReference`: String
  * `status`: Enum (`succeeded`, `failed`, `refunded`)
  * `paidAt`: Timestamp

---

### 2.9 Review
Captures guest ratings and host responses.
* **Fields**:
  * `id`: UUID / Primary Key
  * `resortId`: UUID (Foreign Key -> `Resort.id`, N:1)
  * `userId`: UUID (Foreign Key -> `User.id`, N:1)
  * `bookingId`: UUID (Foreign Key -> `Booking.id`, 1:1)
  * `rating`: Integer (1 to 5)
  * `title`: String
  * `comment`: Text
  * `status`: Enum (`approved`, `pending`, `flagged`)
  * `ownerReplyText`: Text
  * `ownerReplyDate`: Date
  * `createdAt`: Timestamp

---

### 2.10 Notification
Informs users of booking status changes and approvals.
* **Fields**:
  * `id`: UUID / Primary Key
  * `userId`: UUID (Foreign Key -> `User.id`, N:1)
  * `title`: String
  * `message`: Text
  * `type`: Enum (`booking_confirmed`, `booking_cancelled`, `property_approved`, `payout_sent`)
  * `isRead`: Boolean
  * `createdAt`: Timestamp
