# Nova Paw Festival - Design System & UI Guidelines

## 📐 Global Scale Factor

- **Scale Reduction:** The entire website (including the landing pages, dashboards, navigation, forms, and custom pixel-based spacing) is uniformly scaled down by **30%** using a global `zoom: 0.7` rule on the `html` element. This guarantees consistent typographic hierarchy, margins, and padding proportions across the entire website layout.

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
  - Hover: `scale-[1.01]` or ` shadow-sm `
- **Buttons:**
  - Primary: Black background, white text, `rounded-sm`, `h-16`.
  - Alternative: Primary yellow (`#FACC15`) background for active/selected states and primary dashboard actions, `rounded-sm`.
- **Inputs:**
  - `rounded-sm`, border-black/5, focus-primary.
- **Bento Grid:** Used for the Festival Zones section (3x3 grid).

## ✨ Animations

- **Floating Moments:** Used in the About Hero for staggered image reveal.
- **Hover Reveal:** Subtle scaling and opacity transitions on cards and buttons.
- **Motion:** Framer Motion for list reveals and tab switching.

## 🧭 Navigation & Layout

- **Navbar:** Sticky, backdrop-blur, white background.
- **Logo:** Automatically switches between `Logo New ARABIC final.svg` (for Arabic locale) and `Logo New Final English.svg` (for English locale) to guarantee pixel-perfect brand identity alignment in both Navigation and Footer.
- **Footer:** Deep black background, high-contrast white/primary text.
- **Shared CTA:** High-fidelity image background banner with cinematic gradient.
- **2-Step Checkout Wizard Pattern:**
  - Layout: `Shell` component with persistent 2-step indicator (No OTP).
  - Background: `#F5F5F0` (Bone/Off-white) for the section, `#FFFFFF` for the card.
  - Progress: Monochromatic path with Primary (Yellow) highlights for completed steps.
  - Typography: Large `font-display` headers, `9px` bold uppercase labels for inputs.
## 🏢 Unified Dashboard System (Notion Style)

Both User and Admin dashboards share a consistent **Notion-inspired minimalist architecture**, focused on focus, block-based content, and premium tactile interactions.

- **Workspace Shell:**
  - **Sidebar:** `#F7F6F3` background, `1px solid #E9E9E7` right border. Fixed height, collapsible.
  - **Workspace Header:** Small `rounded-sm` initial/emoji icon, bold `14px` workspace name.
  - **Sidebar Typography:** `14px` Medium, text `#37352F`. Hover state: `bg-[#EBEBE9]`.
  - **Layout:** Persistent left sidebar on desktop, sticky glassmorphism header with thin breadcrumbs. Main page container set to `max-w-7xl` (1280px) to maximize screen space for grids and ledgers.
- **Page Content:**
  - **Typography:** Main Heading `40px` Bold, tracking-tight, `#37352F`. Decorative page-top emojis have been removed for a cleaner workspace.
  - **Analytical Cards:** Simple grid-based cards focusing on raw data. Removed top icons and percentage indicators to minimize visual noise.
  - **Blocks:** Content organized into cards with `rounded-sm` corners and `#E9E9E7` borders.
  - **Tables:** Minimalist, border-only, `#F7F6F3` headers, hover rows using `--ease-emil-out`.
  - **Callouts:** `#F1F1EF` background, `rounded-sm`.
- **Primary Accents:**
  - **Workspace Icon:** Primary yellow (`#FACC15`) background with black text.
  - **Active Navigation:** Primary yellow (`#FACC15`) background for active links in sidebars and active tab highlights.
  - **Action Buttons:** Use primary yellow for high-impact buttons (e.g., "Generate Report", "Approve Entry").
- **Emil Kowalski Design Engineering:**
  - **Easing:** Physics-based easing variables (`--ease-emil-out`, `--ease-emil-in-out`) for all state changes.
  - **Tactile Feedback:** Buttons and interactive rows use `active:scale-[0.97]` or `active:scale-[0.98]` with `duration-150`.
  - **Animations:** Subtle `animate-in fade-in duration-700` for page entries.
- **Interactive States:**
  - **Tabs:** Minimalist underline style. Border-bottom 2px `#37352F` for active state, zero background color.
  - **Inputs:** `bg-[#F7F6F3]`, `border-none`, `rounded-sm`. focus-ring `1px #E9E9E7`.

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

## 📐 Global UI Scaling Guidelines

To achieve a compact, highly-precise, and premium aesthetic, the website uses a global scaling model:
- **Root Scale:** Root `html` is scaled to `zoom: 0.9` (10% smaller overall website layout, fonts, and paddings) for optimal readability and layout density.
- **Layout Containers:** Standard layout containers use `max-w-[1280px]` (1.5rem padding), while dashboard interfaces use `max-w-7xl` (1280px) to maximize workspace area for tabular data and ledger stats.

## 🎟️ Digital Admission Ticket Pattern (Vertical Stub)

For the user dashboard overview, the digital admission pass uses a physical vertical ticket metaphor:
- **Dimensions:** Compact vertical structure (`max-w-md`) resembling a physical gate pass.
- **Notched Perforation:** Absolute-positioned circles (`w-7 h-7 bg-white`) on the left and right borders aligning with a dashed border line (`border-t border-dashed`) to simulate a tearable stub.
- **Header Stub:** Includes the event branding, order details, event venue, dates, and active verification status.
- **Footer Stub:** Contains the unique validation QR code box and a simulated high-fidelity CSS barcode row (`opacity-30`) to enhance visual authenticity.
