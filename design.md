# Nova Paw Festival - Design System & UI Guidelines

## 🎨 Color Palette

- **Primary (Yellow):** `#FACC15` (bg-primary) - Used for primary actions, accents, and highlights.
- **Accent (Teal/Blue):** Used for specific tags and categories.
- **Backgrounds:**
  - Primary Background: `#FFFFFF`
  - Card/Section Background: `#F9F9F9`
  - Border/Divider: `#F0F0F0`
- **Text:**
  - Headings: `#000000`
  - Body: `#666666` or `#000000` at lower opacity.

## ✍️ Typography

- **Display Font:** Bold, high-impact sans-serif for headings (tracking-tighter).
- **Body Font:** Clean, readable sans-serif for descriptions and lists.
- **Arabic Locale Font:** Specialized stack using `Archivo Black` for Latin/Numbers and `Cairo` for Arabic characters to maintain high-impact visuals.
- **Hero Headings:** Up to `84px` or `72px` for maximum impact.
- **Section Titles:** `48px` to `64px`.

## 🍱 Component Styles

- **Cards:**
  - Background: `#F9F9F9`
  - Border: `1px solid #F0F0F0`
  - Corners: `rounded-sm` (Sharp Minimalist)
  - Hover: `scale-[1.01]` or `shadow-md`
- **Buttons:**
  - Primary: Black background, white text, `rounded-sm`, `h-16`.
  - Alternative: Primary yellow background for active/selected states, `rounded-sm`.
- **Inputs:**
  - `rounded-sm`, border-black/5, focus-primary.
- **Bento Grid:** Used for the Festival Zones section (3x3 grid).

## ✨ Animations

- **Floating Moments:** Used in the About Hero for staggered image reveal.
- **Hover Reveal:** Subtle scaling and opacity transitions on cards and buttons.
- **Motion:** Framer Motion for list reveals and tab switching.

## 🧭 Navigation & Layout

- **Navbar:** Sticky, backdrop-blur, white background.
- **Footer:** Deep black background, high-contrast white/primary text.
- **Shared CTA:** High-fidelity image background banner with cinematic gradient.
- **7-Step Wizard Pattern:**
  - Layout: `Shell` component with persistent step indicator.
  - Background: `#F5F5F0` (Bone/Off-white) for the section, `#FFFFFF` for the card.
  - Progress: Monochromatic path with Primary (Yellow) highlights for completed steps.
  - Typography: Large `font-display` headers, `9px` bold uppercase labels for inputs.
## 🏢 Dashboard (Notion Style)

- **Workspace Shell:**
  - Sidebar: `#F7F6F3` background, `1px solid #E9E9E7` right border.
  - Sidebar Typography: `14px` Medium, text `#37352F`.
  - Layout: Persistent left sidebar on desktop, clean workspace-style header with emoji page icons.
- **Content Blocks:**
  - Background: `#FFFFFF` main page.
  - Callouts: `#F1F1EF` background, `rounded-sm`, with large emojis.
  - Section Dividers: `1px solid #E9E9E7` with uppercase bold labels (`#91918E`).
  - Cards: High-contrast white cards, subtle shadow/border, minimalist icons (Lucide).
- **Interactive States:**
  - Hover: Subtle background change to `#F7F6F3`.
  - Tabs: Minimalist bottom border (`#37352F`) for active state.
- **Typography:**
  - Main Heading: `40px` Bold, tracking-tight, `#37352F`.
  - Subheaders: `18px` Semibold.
  - Body: `14px` to `16px` for optimal readability in productivity views.

## 🛠️ Tech Stack & Infrastructure

### Frontend (Modern & Immersive)
- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 + CSS Modules
- **Animations:** Framer Motion, Motion, Lenis (Smooth Scroll)
- **3D/Graphics:** Three.js, React Three Fiber, Drei, Cobe (Globe)
- **UI Components:** Radix UI (Headless), Lucide/Tabler Icons
- **I18n:** `next-intl` (Internationalization)

### Backend (Scalable & Secure)
- **Database:** Turso (libSQL) - Distributed Edge Database
- **ORM:** Drizzle ORM - Type-safe database operations
- **Authentication:** Better Auth - Secure session & social auth
- **Payments:** Stripe - Ticket sales & merchant processing
- **File Storage:** Uploadthing - High-performance asset uploads
- **Emails:** Resend - Transactional & event notifications

### Deployment & DevOps
- **Platform:** Vercel (Edge Functions & Optimized Hosting)
- **Monitoring:** Sentry (Error tracking)
- **CI/CD:** GitHub Actions integration
