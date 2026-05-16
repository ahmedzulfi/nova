# Nova Paw Festival - Backend Architecture & Implementation Guide

This document serves as the master blueprint for the backend architecture, database schema, and API structure of the Nova Paw Festival platform. It details the transition from the frontend UI (using mock `localStorage` data) to a fully functional, production-ready system.

---

## 1. Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **Database**: PostgreSQL (Hosted on Neon or Supabase)
- **ORM (Object-Relational Mapping)**: Drizzle ORM
- **Authentication**: NextAuth.js (v5) (Magic Links or Email/Password)
- **Validation**: Zod (for type-safe schema validation on API routes and Server Actions)
- **Payments**: Stripe (or regional Qatari payment gateway integration)
- **API Architecture**: Next.js Server Actions for mutations (forms), API Routes (`/api/*`) for webhooks and external data fetching.

---

## 2. Database Schema (Drizzle ORM)

The database consists of three primary tables to handle authenticated users, ticket purchases (orders), and competition registrations.

### 2.1 Users Table (`users`)
Handles authentication and authorization (Admins vs. Standard Users).

| Column Name  | Type                   | Constraints                  | Description                               |
| :---         | :---                   | :---                         | :---                                      |
| `id`         | `uuid`                 | Primary Key                  | Unique user identifier.                   |
| `email`      | `varchar(255)`         | Unique, Not Null             | User's email address.                     |
| `role`       | `enum('USER','ADMIN')` | Default: `USER`              | Determines access to the `/admin` portal. |
| `created_at` | `timestamp`            | Default: `now()`             | Account creation timestamp.               |

### 2.2 Orders Table (`orders`)
Stores all ticket purchases. This acts as the primary receipt and entrance pass.

| Column Name    | Type                                   | Constraints                  | Description                                      |
| :---           | :---                                   | :---                         | :---                                             |
| `id`           | `uuid`                                 | Primary Key                  | Order ID (e.g., used for QR code generation).    |
| `user_id`      | `uuid`                                 | Foreign Key (`users.id`)     | Link to the purchasing user.                     |
| `full_name`    | `varchar(255)`                         | Not Null                     | Legal name of the primary attendee.              |
| `phone`        | `varchar(50)`                          | Not Null                     | Contact phone number.                            |
| `tier`         | `enum('ADULT','DOG_OWNER','CAT_OWNER')`| Not Null                     | Ticket tier purchased.                           |
| `adult_qty`    | `integer`                              | Default: 1                   | Number of adult tickets in this order.           |
| `kids_qty`     | `integer`                              | Default: 0                   | Number of kids tickets in this order.            |
| `total_amount` | `decimal(10,2)`                        | Not Null                     | Total transaction cost (e.g., in QAR).           |
| `status`       | `enum('PENDING','PAID','CANCELLED')`   | Default: `PENDING`           | Payment status.                                  |
| `created_at`   | `timestamp`                            | Default: `now()`             | Date the order was placed.                       |

### 2.3 Pet Registrations Table (`pet_registrations`)
Stores competition applications for users holding pet-owner tickets.

| Column Name        | Type                                   | Constraints                  | Description                                      |
| :---               | :---                                   | :---                         | :---                                             |
| `id`               | `uuid`                                 | Primary Key                  | Registration ID.                                 |
| `order_id`         | `uuid`                                 | Foreign Key (`orders.id`)    | Link to the specific paid ticket.                |
| `pet_name`         | `varchar(255)`                         | Not Null                     | Name of the competing pet.                       |
| `pet_type`         | `enum('DOG','CAT')`                    | Not Null                     | Type of pet.                                     |
| `competition_name` | `varchar(255)`                         | Not Null                     | E.g., "Dog Fashion Star".                        |
| `status`           | `enum('PENDING','APPROVED','REJECTED')`| Default: `PENDING`           | Judging/Approval status from the admin panel.    |
| `submitted_at`     | `timestamp`                            | Default: `now()`             | Submission timestamp.                            |

---

## 3. Core API Routes & Server Actions

### 3.1 Client-Facing (Checkout & Dashboard)

- **Checkout Flow (`/api/checkout`)**:
  - **Method**: `POST`
  - **Body**: Zod validated payload (tier, quantities, user details).
  - **Action**: Creates a `PENDING` order in the database, calculates totals, and returns a Stripe/Payment Gateway session URL.

- **Payment Webhook (`/api/webhooks/payment`)**:
  - **Method**: `POST`
  - **Action**: Listens for successful payment events. Updates the corresponding `orders` record `status` to `PAID`. Sends confirmation email (e.g., via Resend).

- **Dashboard Data (`/actions/get-user-dashboard`)**:
  - **Type**: Server Action
  - **Action**: Verifies user session. Fetches the user's `PAID` orders and any associated `pet_registrations`. Replaces the current `localStorage.getItem('nova_registration')` logic.

- **Submit Competition (`/actions/register-pet`)**:
  - **Type**: Server Action
  - **Body**: `{ orderId, petName, petType, competitionName }`
  - **Action**: Validates the order has a valid pet tier (`DOG_OWNER` or `CAT_OWNER`) and creates a new `pet_registrations` record with `PENDING` status.

### 3.2 Admin-Facing (`/admin`)

- **Admin Metrics (`/actions/get-admin-stats`)**:
  - **Type**: Server Action
  - **Action**: Aggregates total revenue from `PAID` orders, counts total attendees, and counts `PENDING` pet registrations for the admin overview.

- **Update Registration Status (`/actions/update-registration`)**:
  - **Type**: Server Action
  - **Body**: `{ registrationId, status }`
  - **Action**: Updates a `pet_registrations` status to `APPROVED` or `REJECTED`.

- **QR Code Scanner API (`/api/admin/scan`)**:
  - **Method**: `POST`
  - **Body**: `{ orderId }`
  - **Action**: Verifies that the order exists, is `PAID`, and hasn't been scanned already. Returns valid/invalid status to the scanner UI.

---

## 4. Migration Strategy

1. **Database Setup**: Initialize a PostgreSQL database and install `drizzle-orm` and `drizzle-kit`.
2. **Schema Definition**: Write the schema in `src/db/schema.ts` based on Section 2 and run the first migration.
3. **Authentication Setup**: Install NextAuth.js, wrap the application in a Session Provider, and protect the `/dashboard` and `/admin` routes.
4. **Replace Mocks**: Gradually replace `localStorage` calls in the dashboard components with Server Actions fetching live data.
5. **Payment Integration**: Wire up the checkout wizard to trigger the `/api/checkout` flow instead of immediately redirecting to the dashboard.
