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
  - Interaction: Mandatory verification steps (OTP), premium upload zones, and animated step transitions.
