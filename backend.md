# Nova Paw Festival — Backend Architecture & Implementation Guide

> Master blueprint derived from a complete audit of every frontend flow, data model, and interaction in the codebase. Every field listed here maps 1:1 to what the UI already renders or expects.

---

## 1. Technology Stack

| Layer            | Technology                      | Purpose                                            |
| :---             | :---                            | :---                                               |
| Framework        | Next.js 15+ (App Router)        | SSR, API Routes, Server Actions                    |
| **Hosting**      | **Hostinger VPS**               | **Production hosting for the Next.js App**         |
| **Database**     | **Supabase (PostgreSQL)**       | **Persistent storage & managed DB**                |
| **File Storage** | **Supabase Storage**            | **Pet passport & vaccination PDFs**                |
| ORM              | Drizzle ORM                     | Type-safe schema & migrations                      |
| Auth (Admin)     | NextAuth.js v5 / Custom         | Admin portal login (email + password)              |
| Auth (User)      | OTP-based (custom)              | User verification during checkout (phone/email)    |
| Validation       | Zod                             | Request/form schema validation                     |
| Payments         | Stripe (or regional gateway)    | Checkout payment processing                        |
| Email            | Resend                          | Confirmation emails, receipts                      |

---

## 2. Database Schema

### 2.1 `users` — Admin Accounts

Only used for admin portal access. Regular ticket buyers are **not** users — they are stored as `orders`.

| Column       | Type                     | Constraints            | Notes                        |
| :---         | :---                     | :---                   | :---                         |
| `id`         | `uuid`                   | PK, default `gen_random_uuid()` |                       |
| `email`      | `varchar(255)`           | Unique, Not Null       | Admin login email            |
| `password`   | `varchar(255)`           | Not Null               | Hashed password              |
| `role`       | `enum('ADMIN')`          | Default: `ADMIN`       | Only admins exist as users   |
| `created_at` | `timestamp`              | Default: `now()`       |                              |

> **Why no user accounts for buyers?** The frontend checkout collects name/email/phone and stores it directly on the order. Buyers access their dashboard via their Order ID + OTP verification, not via a persistent account.

---

### 2.2 `orders` — Ticket Purchases (Core Table)

Maps directly to the `RegistrationData` interface in `dashboard/page.tsx` and the checkout wizard in `checkout.tsx`.

| Column            | Type                                       | Constraints                | Frontend Source                                      |
| :---              | :---                                       | :---                       | :---                                                 |
| `id`              | `varchar(20)`                              | PK                         | `orderId` — e.g. `#NPV-2026-X8Y1`                   |
| `full_name`       | `varchar(255)`                             | Not Null                   | `ownerData.fullName` (checkout step 1)               |
| `email`           | `varchar(255)`                             | Not Null                   | `ownerData.email` (checkout step 1)                  |
| `phone`           | `varchar(50)`                              | Not Null                   | `ownerData.phone` (checkout step 1)                  |
| `tier`            | `enum('adult','dog-owner','cat-owner')`    | Not Null                   | `selectedTier` (checkout)                            |
| `adult_qty`       | `integer`                                  | Not Null, Default: 1       | `adultQty` (checkout step 3)                         |
| `kids_qty`        | `integer`                                  | Not Null, Default: 0       | `kidsQty` (checkout step 3)                          |
| `pet_qty`         | `integer`                                  | Not Null, Default: 0       | `petQty` (checkout step 3, 0 for adult tier)         |
| `pet_name`        | `varchar(255)`                             | Nullable                   | `petName` (checkout step 3, only for pet tiers)      |
| `total`           | `decimal(10,2)`                            | Not Null                   | Calculated: `adults×45 + kids×15 + pets×45`          |
| `status`          | `enum('PENDING','PAID','USED','CANCELLED')`| Default: `PENDING`         | Admin tickets page shows Active/Used                 |
| `payment_method`  | `varchar(100)`                             | Nullable                   | Receipt tab shows "Visa •••• 4242"                   |
| `checked_in`      | `boolean`                                  | Default: `false`           | Scanner sets this to true on entry                   |
| `checked_in_at`   | `timestamp`                                | Nullable                   | Scanner records check-in time                        |
| `created_at`      | `timestamp`                                | Default: `now()`           | `entryDate` in dashboard, receipt issue date         |

**Pricing constants** (from `checkout.tsx`):
- `ADULT_PRICE = 45 QAR`
- `KID_PRICE = 15 QAR`
- `PET_FEE = 45 QAR`

---

### 2.3 `pet_registrations` — Competition Entries

Maps to the 6-step registration wizard in `register-pet/page.tsx` and the admin registrations pages.

| Column               | Type                                                                                            | Constraints              | Frontend Source                                         |
| :---                 | :---                                                                                            | :---                     | :---                                                    |
| `id`                 | `varchar(20)`                                                                                   | PK                       | e.g. `REG-001`                                          |
| `order_id`           | `varchar(20)`                                                                                   | FK → `orders.id`         | Links registration to a paid ticket                     |
| `competition_type`   | `enum('dog-grooming','dog-fashion-show','cat-fashion-show','dog-best-in-show','cat-best-show','cat-drawing-battle')` | Not Null | `selectedEventId` (register-pet step 1)      |
| `competition_name`   | `varchar(255)`                                                                                  | Not Null                 | `selectedEventName` — display label from i18n           |
| `owner_name`         | `varchar(255)`                                                                                  | Not Null                 | `formData.fullName` (register-pet step 2)               |
| `owner_phone`        | `varchar(50)`                                                                                   | Not Null                 | `formData.phone` (register-pet step 2)                  |
| `owner_email`        | `varchar(255)`                                                                                  | Nullable                 | `formData.email` (register-pet step 2)                  |
| `owner_address`      | `text`                                                                                          | Nullable                 | `formData.address` (register-pet step 2)                |
| `pet_name`           | `varchar(255)`                                                                                  | Not Null                 | `formData.petName` (register-pet step 3)                |
| `pet_breed`          | `varchar(255)`                                                                                  | Not Null                 | `formData.breed` (register-pet step 3)                  |
| `pet_gender`         | `enum('Male','Female')`                                                                         | Not Null                 | `formData.gender` (register-pet step 3)                 |
| `experience_level`   | `enum('Beginner','Intermediate','Professional')`                                                | Not Null                 | `formData.experienceLevel` (register-pet step 3)        |
| `previous_titles`    | `text`                                                                                          | Nullable                 | `formData.previousTitles` (register-pet step 3)         |
| `drawing_materials`  | `text`                                                                                          | Nullable                 | `formData.drawingMaterials` (for Drawing Cat Battle)    |
| `outfit_description` | `text`                                                                                          | Nullable                 | `formData.outfitDescription` (for Fashion Shows)        |
| `passport_url`       | `text`                                                                                          | Nullable                 | Uploaded file: pet passport PDF (register-pet step 4)   |
| `vaccination_url`    | `text`                                                                                          | Nullable                 | Uploaded file: vaccination record PDF (register-pet step 4) |
| `status`             | `enum('Pending','Completed')`                                                                   | Default: `Pending`       | Admin registration list/detail page                     |
| `submitted_at`       | `timestamp`                                                                                     | Default: `now()`         | Admin shows submission date                             |

---

### 2.4 `check_in_logs` — Gate Scan History

Maps to the Entry History timeline shown on the admin ticket detail page (`/admin/tickets/[id]`).

| Column       | Type          | Constraints          | Notes                                    |
| :---         | :---          | :---                 | :---                                     |
| `id`         | `uuid`        | PK                   |                                          |
| `order_id`   | `varchar(20)` | FK → `orders.id`     | Which ticket was scanned                 |
| `scanned_by` | `uuid`        | FK → `users.id`      | Which admin/staff performed the scan     |
| `gate`       | `varchar(50)` | Nullable             | e.g. "Main Gate"                         |
| `scanned_at` | `timestamp`   | Default: `now()`     | Timestamp shown in entry history         |

---

## 3. Frontend → Backend Flow Mapping

### 3.1 Ticket Checkout Flow (`/tickets`)

**Current state:** `checkout.tsx` → `handleFinish()` → saves to `localStorage` → redirects to `/dashboard`

**Target state:**
```
Step 1: Owner Info (name, email, phone) → client-side state
Step 2: OTP Verification → POST /api/auth/send-otp → POST /api/auth/verify-otp
Step 3: Ticket Selection (adults, kids, pets, petName) → client-side state
Step 4: Safety Terms → client-side state (checkboxes)
Step 5: Summary → POST /api/checkout → creates PENDING order → redirects to payment
Payment Success Webhook → POST /api/webhooks/payment → marks order PAID → redirects to /dashboard
```

### 3.2 User Dashboard (`/dashboard`)

**Current state:** Reads `localStorage.getItem('nova_registration')` → renders tabs

**Target state:**
```
Page Load → GET /api/user/order?id=<orderId> (orderId from URL param or session cookie)
Overview Tab → order data (QR code generated from order ID)
Receipt Tab → order data + billing details
Schedule Tab → static from i18n translations (no backend needed)
Competition blocks → GET linked pet_registrations WHERE order_id = <orderId>
```

### 3.3 Competition Registration (`/dashboard/register-pet`)

**Current state:** 6-step wizard → no persistence (only UI flow, no save)

**Target state:**
```
Step 1: Select competition → client-side state
Step 2: Owner info (pre-filled from order) → client-side state
Step 3: Pet info (name, breed, gender, experience) → client-side state
Step 4: Upload documents → POST /api/uploads (pet passport + vaccination PDFs → S3/Supabase Storage)
Step 5: Review + Terms → POST /api/registrations (creates pet_registration record)
Step 6: Success → redirect to /dashboard
```

### 3.4 Pet Owner Dashboard (`/dashboard/pet-owner`)

**Current state:** Hardcoded mock registration with timeline steps

**Target state:**
```
Page Load → GET /api/user/registrations?orderId=<orderId>
Returns: array of pet_registrations with status timeline
```

### 3.5 Admin Login (`/admin/login`)

**Current state:** Mock auth → `router.push('/admin')`

**Target state:**
```
POST /api/auth/admin-login (email + password)
→ NextAuth session created
→ Middleware protects all /admin/* routes
```

### 3.6 Admin Overview (`/admin`)

**Current state:** Hardcoded stats, hardcoded activity feed, hardcoded chart

**Target state:**
```
GET /api/admin/stats →
  - Total Registrations: COUNT(pet_registrations)
  - Tickets Sold: COUNT(orders WHERE status = 'PAID')
  - Total Attendees: SUM(adult_qty + kids_qty) FROM orders WHERE status = 'PAID'
  - Revenue: SUM(total) FROM orders WHERE status = 'PAID'

GET /api/admin/activity →
  - Recent orders + registrations, ordered by created_at DESC, LIMIT 10

GET /api/admin/chart →
  - Orders grouped by day for the last 7 days
```

### 3.7 Admin Guest Ledger / Tickets (`/admin/tickets`)

**Current state:** Hardcoded ticket list

**Target state:**
```
GET /api/admin/orders?search=<term>&tier=<tier>&status=<status>&page=<n>
Returns: paginated orders with all fields

Table columns map to:
  - Order ID → orders.id
  - Guest Info → orders.full_name + orders.email
  - Ticket Tier → orders.tier (Adult / Dog Owner / Cat Owner)
  - Breakdown → orders.adult_qty, kids_qty, pet_qty
  - Total Paid → orders.total
  - Status → orders.status (Active = PAID, Used = USED)
```

### 3.8 Admin Ticket Detail (`/admin/tickets/[id]`)

**Current state:** `mockGetTicketDetails(id)` returns hardcoded data

**Target state:**
```
GET /api/admin/orders/<id>
Returns:
  - Order: all fields from orders table
  - Linked Registrations: pet_registrations WHERE order_id = <id>
  - Check-in History: check_in_logs WHERE order_id = <id> ORDER BY scanned_at DESC

Actions:
  - POST /api/admin/orders/<id>/resend-email → sends confirmation via Resend
  - PATCH /api/admin/orders/<id>/mark-used → sets status = 'USED'
```

### 3.9 Admin Registrations (`/admin/registrations`)

**Current state:** Hardcoded registration list

**Target state:**
```
GET /api/admin/registrations?search=<term>&category=<cat>&status=<status>&page=<n>
Returns: paginated pet_registrations joined with orders for owner info

Table columns map to:
  - ID → pet_registrations.id
  - Owner Info → pet_registrations.owner_name + owner_email (or joined from orders)
  - Pet Details → pet_registrations.pet_name + competition_name
  - Reg. Date → pet_registrations.submitted_at
  - Status → pet_registrations.status (Pending / Completed)
```

### 3.10 Admin Registration Detail (`/admin/registrations/[id]`)

**Current state:** `mockGetRegistrationDetails(id)` returns hardcoded data

**Target state:**
```
GET /api/admin/registrations/<id>
Returns:
  - Registration: all fields from pet_registrations
  - Linked Order: orders WHERE id = registration.order_id
  - Documents: passport_url + vaccination_url

Actions:
  - PATCH /api/admin/registrations/<id>/approve → sets status = 'Completed'
  - PATCH /api/admin/registrations/<id>/decline → sets status = 'Rejected' (add to enum)
```

### 3.11 Admin Attendees (`/admin/attendees`)

**Current state:** Hardcoded attendee list

**Target state:**
```
GET /api/admin/attendees?search=<term>&page=<n>
Returns: SELECT DISTINCT full_name, email, phone, COUNT(id) as ticket_count,
         MIN(created_at) as first_purchase FROM orders GROUP BY full_name, email, phone
```

> Note: Attendees are derived from orders since there are no user accounts for buyers.

### 3.12 Admin QR Scanner (`/admin/scanner`)

**Current state:** `mockGetGuestData(id)` simulates scan result

**Target state:**
```
POST /api/admin/scan { orderId: string }
→ Lookup order by ID
→ Verify status is PAID and checked_in is false
→ Return: order data + linked pet_registrations

POST /api/admin/check-in { orderId: string }
→ Set orders.checked_in = true, checked_in_at = now()
→ Insert check_in_logs record
→ Return success
```

### 3.13 Admin CSV Export

**Current state:** Toast "Exporting..." with no real export

**Target state:**
```
GET /api/admin/export/orders → CSV download of all orders
GET /api/admin/export/registrations → CSV download of all pet_registrations
```

---

## 4. Pricing Logic (from `checkout.tsx`)

```
ADULT_PRICE = 45 QAR
KID_PRICE   = 15 QAR
PET_FEE     = 45 QAR

total = (adultQty × ADULT_PRICE) + (kidsQty × KID_PRICE) + (petQty × PET_FEE)
```

**Tier-specific constraints:**
- `adult` tier → `petQty` is always 0
- `dog-owner` tier → `petQty` min 1, max = `adultQty`
- `cat-owner` tier → `petQty` min 1, max 2

---

## 5. Competition Types (from `register-pet/page.tsx`)

| ID                   | Display Name (EN)          | Pet Type |
| :---                 | :---                       | :---     |
| `dog-grooming`       | Grooming Competition       | Dog      |
| `dog-fashion-show`   | Dog Fashion Show           | Dog      |
| `cat-fashion-show`   | Cat Fashion Show           | Cat      |
| `dog-best-in-show`   | Best Looking Dog Show      | Dog      |
| `cat-best-show`      | Best Looking Cat Show      | Cat      |
| `cat-drawing-battle` | Drawing Cat Battle         | Cat      |

---

## 6. File Uploads Required

| Upload             | Source Page             | File Type | Storage Path                      |
| :---               | :---                    | :---      | :---                              |
| Pet Passport       | `/dashboard/register-pet` (step 4) | PDF       | `/uploads/passports/<reg_id>.pdf` |
| Vaccination Record | `/dashboard/register-pet` (step 4) | PDF       | `/uploads/vaccinations/<reg_id>.pdf` |

---

## 7. Migration Strategy (Step-by-Step)

### Phase 1: Database & Auth
1. Install `drizzle-orm`, `drizzle-kit`, `pg` (or `@neondatabase/serverless`)
2. Create `src/db/schema.ts` with all 4 tables from Section 2
3. Run `drizzle-kit push` to create tables
4. Install `next-auth@5`, create admin auth config
5. Protect `/admin/*` routes with middleware
6. Wire up `/admin/login` to real NextAuth sign-in

### Phase 2: Orders & Checkout
1. Create `POST /api/checkout` — validates data, creates PENDING order
2. Create `POST /api/webhooks/payment` — marks order PAID on payment success
3. Replace `localStorage.setItem` in `checkout.tsx` with API call
4. Replace `localStorage.getItem` in `dashboard/page.tsx` with Server Action fetch
5. Generate QR codes from real order IDs

### Phase 3: Competition Registrations
1. Create `POST /api/uploads` — handles pet passport + vaccination PDFs
2. Create `POST /api/registrations` — creates pet_registration record
3. Wire up `register-pet/page.tsx` step 5 submit to API
4. Create `GET /api/user/registrations` for pet-owner dashboard

### Phase 4: Admin Panel
1. Create `GET /api/admin/stats` for overview KPIs
2. Create `GET /api/admin/orders` for guest ledger (paginated, filterable)
3. Create `GET /api/admin/registrations` for competition entries (paginated, filterable)
4. Create `GET /api/admin/orders/[id]` and `GET /api/admin/registrations/[id]` for detail pages
5. Create `PATCH` endpoints for approve/decline/mark-used actions
6. Create `POST /api/admin/scan` and `POST /api/admin/check-in` for scanner
7. Create `GET /api/admin/export/*` for CSV downloads

### Phase 5: Polish
1. Email confirmations via Resend (order confirmation, registration submitted)
2. Real-time activity feed on admin overview
3. PDF receipt generation (replace `window.print()`)

---

## 8. Environment Variables Required

```env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/nova_paw

# Auth
NEXTAUTH_SECRET=<random-secret>
NEXTAUTH_URL=http://localhost:3000

# File Storage
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=<key>
SUPABASE_SERVICE_KEY=<key>

# Payments
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Email
RESEND_API_KEY=re_xxx
```

---

## 9. File Structure (Proposed)

```
src/
├── db/
│   ├── schema.ts          # Drizzle schema (all 4 tables)
│   ├── index.ts           # Database connection
│   └── migrations/        # Generated by drizzle-kit
├── app/
│   └── api/
│       ├── auth/
│       │   ├── send-otp/route.ts
│       │   ├── verify-otp/route.ts
│       │   └── admin-login/route.ts
│       ├── checkout/route.ts
│       ├── uploads/route.ts
│       ├── registrations/route.ts
│       ├── user/
│       │   ├── order/route.ts
│       │   └── registrations/route.ts
│       ├── admin/
│       │   ├── stats/route.ts
│       │   ├── orders/route.ts
│       │   ├── orders/[id]/route.ts
│       │   ├── registrations/route.ts
│       │   ├── registrations/[id]/route.ts
│       │   ├── scan/route.ts
│       │   ├── check-in/route.ts
│       │   ├── attendees/route.ts
│       │   └── export/
│       │       ├── orders/route.ts
│       │       └── registrations/route.ts
│       └── webhooks/
│           └── payment/route.ts
└── lib/
    ├── auth.ts            # NextAuth config
    └── validations.ts     # Zod schemas
```
