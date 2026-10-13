# Aura Resorts — Proposed API Requirements Specification

> **Note for Development Team**: This document contains the proposed REST API specification designed for the future backend engineering phase. **No backend endpoints or database controllers are implemented in the current frontend phase.**

---

## Table of Contents
1. [Authentication & Authorization](#1-authentication--authorization)
2. [Customer Profile](#2-customer-profile)
3. [Resort Search & Discovery](#3-resort-search--discovery)
4. [Resort Details](#4-resort-details)
5. [Room Availability](#5-room-availability)
6. [Booking Management](#6-booking-management)
7. [Customer Booking History](#7-customer-booking-history)
8. [Reviews & Ratings](#8-reviews--ratings)
9. [Admin Dashboard](#9-admin-dashboard)
10. [Admin Resort Management](#10-admin-resort-management)
11. [Admin User Management](#11-admin-user-management)
12. [Admin Owner Management](#12-admin-owner-management)
13. [Admin Booking Management](#13-admin-booking-management)
14. [Owner Dashboard](#14-owner-dashboard)
15. [Owner Property Management](#15-owner-property-management)
16. [Owner Room Management](#16-owner-room-management)
17. [Owner Booking Management](#17-owner-booking-management)
18. [Owner Earnings & Settlements](#18-owner-earnings--settlements)
19. [Image & Media Uploads](#19-image--media-uploads)
20. [Notifications & Alerts](#20-notifications--alerts)

---

## 1. Authentication & Authorization

### 1.1 POST `/api/auth/register`
* **Purpose**: Register a new user account (Customer or Building Owner).
* **Required Role**: Public (Unauthenticated).
* **Request Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "SecurePassword123!",
  "phone": "+15551234567",
  "role": "customer" // "customer" | "owner"
}
```
* **Validation Rules**: `email` must be valid and unique; `password` minimum 8 characters with at least one number and uppercase letter; `role` restricted to `customer` or `owner` (admin accounts cannot be self-registered).
* **Response (201 Created)**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "usr-101",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "role": "customer"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```
* **Error Responses**: `400 Bad Request` (Validation failure), `409 Conflict` (Email already registered).

---

### 1.2 POST `/api/auth/login`
* **Purpose**: Authenticate an existing user and issue a session JWT or cookie.
* **Required Role**: Public.
* **Request Body**:
```json
{
  "email": "jane@example.com",
  "password": "SecurePassword123!"
}
```
* **Response (200 OK)**: Returns JWT access token and user metadata.
* **Error Responses**: `401 Unauthorized` (Invalid credentials), `403 Forbidden` (Account suspended).

---

### 1.3 GET `/api/auth/me`
* **Purpose**: Fetch the authenticated profile of the currently logged-in user.
* **Required Role**: Authenticated (`customer`, `owner`, `admin`).
* **Response (200 OK)**:
```json
{
  "id": "usr-01",
  "name": "Alex Morgan",
  "email": "alex.morgan@example.com",
  "phone": "+1 (555) 392-8190",
  "role": "customer",
  "status": "active"
}
```

---

## 2. Customer Profile

### 2.1 PUT `/api/profile`
* **Purpose**: Update current customer's profile details.
* **Required Role**: `customer`.
* **Request Body**:
```json
{
  "name": "Alex Morgan",
  "phone": "+1 (555) 392-8190",
  "preferences": {
    "currency": "USD",
    "language": "en-US",
    "emailAlerts": true
  }
}
```
* **Response (200 OK)**: Returns updated user profile object.
* **Error Responses**: `400 Bad Request` (Invalid phone format).

---

## 3. Resort Search & Discovery

### 3.1 GET `/api/resorts`
* **Purpose**: Query, filter, and paginate published resort listings.
* **Required Role**: Public.
* **Query Parameters**:
  * `destination` (string, optional) — Filter by city, country, or destination keyword.
  * `category` (string, optional) — `beachfront`, `mountain`, `villas`, `forest`, `heritage`, `wellness`.
  * `checkIn` (ISO string, e.g. `2026-11-15`) — Filter stays with rooms available during this window.
  * `checkOut` (ISO string, e.g. `2026-11-20`).
  * `guests` (integer, default: `2`).
  * `minPrice` (number, optional).
  * `maxPrice` (number, optional).
  * `minRating` (number, optional, e.g. `4.5`).
  * `amenities` (string[], comma-separated, e.g. `wifi,pool,spa`).
  * `sortBy` (string, optional) — `recommended`, `price-low`, `price-high`, `rating`.
  * `page` (integer, default: `1`).
  * `limit` (integer, default: `12`).
* **Response (200 OK)**:
```json
{
  "total": 48,
  "page": 1,
  "limit": 12,
  "totalPages": 4,
  "data": [
    {
      "id": "res-01",
      "name": "The Azure Horizon Atoll Resort & Villas",
      "slug": "azure-horizon-atoll-maldives",
      "destination": "Maldives",
      "country": "Maldives",
      "category": "beachfront",
      "rating": 4.95,
      "reviewCount": 428,
      "pricePerNight": 480,
      "originalPrice": 620,
      "currency": "$",
      "featuredImage": "https://images.unsplash.com/...",
      "amenities": ["Free High-Speed Wi-Fi", "Private Infinity Pool", "Full Spa & Wellness"],
      "isFeatured": true
    }
  ]
}
```

---

## 4. Resort Details

### 4.1 GET `/api/resorts/:id`
* **Purpose**: Fetch detailed public view for a single resort.
* **Required Role**: Public.
* **URL Param**: `id` — Unique resort ID or slug.
* **Response (200 OK)**: Full resort model with photo gallery, owner metadata, house rules, check-in/out policies, and available suite types.
* **Error Responses**: `404 Not Found` (Resort does not exist or is not approved).

---

## 5. Room Availability

### 5.1 GET `/api/resorts/:id/rooms`
* **Purpose**: List room types associated with a resort with live occupancy status.
* **Required Role**: Public.
* **Query Parameters**: `checkIn` (date), `checkOut` (date), `guests` (integer).
* **Response (200 OK)**:
```json
{
  "resortId": "res-01",
  "rooms": [
    {
      "id": "rm-101",
      "name": "Overwater Lagoon Sunrise Villa",
      "type": "Ocean Villa",
      "pricePerNight": 480,
      "maxGuests": 2,
      "bedType": "1 King Bed",
      "availableCount": 4,
      "isAvailable": true
    }
  ]
}
```

---

## 6. Booking Management

### 6.1 POST `/api/bookings`
* **Purpose**: Reserve a room and calculate pricing totals.
* **Required Role**: `customer`.
* **Request Body**:
```json
{
  "resortId": "res-01",
  "roomId": "rm-101",
  "checkIn": "2026-11-15",
  "checkOut": "2026-11-20",
  "guests": 2,
  "rooms": 1,
  "guestName": "Alex Morgan",
  "guestEmail": "alex.morgan@example.com",
  "guestPhone": "+1 (555) 392-8190",
  "specialRequests": "Late check-in requested",
  "paymentMethod": "credit_card"
}
```
* **Validation Rules**:
  * Backend must verify dates (`checkOut > checkIn`).
  * Backend must query room inventory to ensure `availableCount >= rooms` for the given dates before confirming.
  * Price must be re-calculated server-side (never trust frontend-submitted totals).
* **Response (201 Created)**:
```json
{
  "success": true,
  "booking": {
    "id": "bk-9942",
    "bookingReference": "AUR-89421",
    "status": "confirmed",
    "paymentStatus": "paid",
    "totalAmount": 2660,
    "currency": "$"
  }
}
```
* **Error Responses**: `400 Bad Request` (Invalid dates), `409 Conflict` (Room sold out for selected dates).

---

### 6.2 POST `/api/bookings/:id/cancel`
* **Purpose**: Request cancellation of an existing booking.
* **Required Role**: `customer` (owner of booking) or `admin`.
* **Validation Rules**: Backend checks if within free cancellation policy window (e.g. > 48h before checkIn).
* **Response (200 OK)**:
```json
{
  "success": true,
  "bookingId": "bk-9942",
  "status": "cancelled",
  "refundAmount": 2660,
  "message": "Booking successfully cancelled. Refund initiated."
}
```

---

## 7. Customer Booking History

### 7.1 GET `/api/bookings/my-bookings`
* **Purpose**: List all reservations made by the authenticated customer.
* **Required Role**: `customer`.
* **Query Parameters**: `status` (`confirmed`, `completed`, `cancelled`, or `all`).
* **Response (200 OK)**: Array of customer booking records.

---

## 8. Reviews & Ratings

### 8.1 GET `/api/resorts/:id/reviews`
* **Purpose**: Public review list for a resort.
* **Required Role**: Public.
* **Response (200 OK)**: Array of reviews including rating, author, date, comment, and host reply.

### 8.2 POST `/api/resorts/:id/reviews`
* **Purpose**: Submit guest review for a completed stay.
* **Required Role**: `customer` (Must have completed a booking at this resort).
* **Request Body**:
```json
{
  "rating": 5,
  "title": "Unforgettable atoll stay",
  "comment": "Crystal lagoons, wonderful concierge staff, and exceptional breakfast."
}
```
* **Validation Rules**: Rating must be between 1 and 5. Review placed into `pending` moderation or auto-approved based on platform config.

---

## 9. Admin Dashboard

### 9.1 GET `/api/admin/dashboard`
* **Purpose**: Provide high-level operational statistics for platform admins.
* **Required Role**: `admin`.
* **Response (200 OK)**:
```json
{
  "totalUsers": 1420,
  "totalResorts": 178,
  "totalBookings": 8940,
  "pendingApprovals": 3,
  "totalGrossVolume": 3840200,
  "monthlyRevenue": 460824
}
```

---

## 10. Admin Resort Management

### 10.1 GET `/api/admin/resorts`
* **Purpose**: Search and filter all listings regardless of approval status.
* **Required Role**: `admin`.

### 10.2 PATCH `/api/admin/resorts/:id/status`
* **Purpose**: Moderate a resort submission.
* **Required Role**: `admin`.
* **Request Body**:
```json
{
  "status": "active" // "active" | "rejected" | "suspended"
}
```
* **Response (200 OK)**: Returns updated resort record.

---

## 11. Admin User Management

### 11.1 GET `/api/admin/users`
* **Purpose**: List, search, and paginate all platform users.
* **Required Role**: `admin`.

### 11.2 PATCH `/api/admin/users/:id/status`
* **Purpose**: Suspend or activate a user account.
* **Required Role**: `admin`.
* **Request Body**: `{ "status": "suspended" }`

---

## 12. Admin Owner Management

### 12.1 GET `/api/admin/owners`
* **Purpose**: List registered building owners, property counts, and verification statuses.
* **Required Role**: `admin`.

---

## 13. Admin Booking Management

### 13.1 GET `/api/admin/bookings`
* **Purpose**: Global booking registry with search, status filtering, and audit log.
* **Required Role**: `admin`.

---

## 14. Owner Dashboard

### 14.1 GET `/api/owner/dashboard`
* **Purpose**: Overview statistics for the authenticated property owner.
* **Required Role**: `owner`.
* **Response (200 OK)**:
```json
{
  "totalProperties": 3,
  "totalRooms": 26,
  "activeBookings": 8,
  "occupancyRate": 84,
  "totalEarnings": 142500
}
```

---

## 15. Owner Property Management

### 15.1 GET `/api/owner/properties`
* **Purpose**: List all properties owned by the authenticated host.
* **Required Role**: `owner`.

### 15.2 POST `/api/owner/properties`
* **Purpose**: Submit a new resort listing.
* **Required Role**: `owner`.
* **Request Body**: Complete resort parameters (name, destination, category, pricing, description, photos, check-in rules).
* **Validation Rules**: Newly created properties receive status `pending` until approved by an administrator.

### 15.3 PUT `/api/owner/properties/:id`
* **Purpose**: Update an existing resort listing.
* **Required Role**: `owner` (Must be the creator/owner of the property).

### 15.4 DELETE `/api/owner/properties/:id`
* **Purpose**: Soft delete or archive an existing resort listing.
* **Required Role**: `owner` or `admin`.

---

## 16. Owner Room Management

### 16.1 GET `/api/owner/rooms`
* **Purpose**: List all room suites across owner's properties.
* **Required Role**: `owner`.

### 16.2 POST `/api/owner/rooms`
* **Purpose**: Add a new suite type with inventory count and price.
* **Required Role**: `owner`.

### 16.3 PUT `/api/owner/rooms/:id`
* **Purpose**: Update suite details or adjust nightly pricing.
* **Required Role**: `owner`.

### 16.4 DELETE `/api/owner/rooms/:id`
* **Purpose**: Remove suite type from inventory.
* **Required Role**: `owner`.

---

## 17. Owner Booking Management

### 17.1 GET `/api/owner/bookings`
* **Purpose**: List bookings made across the owner's properties.
* **Required Role**: `owner`.

---

## 18. Owner Earnings & Settlements

### 18.1 GET `/api/owner/earnings`
* **Purpose**: Fetch owner revenue reports, settlement batches, and monthly payouts.
* **Required Role**: `owner`.

---

## 19. Image & Media Uploads

### 19.1 POST `/api/upload`
* **Purpose**: Upload property and room photographs to cloud object storage (e.g. AWS S3, Cloudinary).
* **Required Role**: `owner` or `admin`.
* **Request**: `multipart/form-data` containing image files (`image/jpeg`, `image/png`, `image/webp`, max 10MB each).
* **Response (200 OK)**:
```json
{
  "urls": [
    "https://storage.auraresorts.com/resorts/res-01/exterior.webp"
  ]
}
```

---

## 20. Notifications & Alerts

### 20.1 GET `/api/notifications`
* **Purpose**: Fetch pending notifications (e.g. booking confirmations, cancellation alerts, submission approvals).
* **Required Role**: Authenticated.
