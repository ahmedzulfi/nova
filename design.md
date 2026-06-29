# Nova Paw Festival — Design System

## Design Read
Consumer festival/event landing page for pet lovers and families.
Vibe: energetic, warm, premium-consumer but approachable.
Mode: **Light mode** — consistent throughout all sections.
Design family: Split-screen hero, asymmetric layouts, editorial headers.

## Dials
- `DESIGN_VARIANCE: 8`
- `MOTION_INTENSITY: 6`
- `VISUAL_DENSITY: 4`

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `primary` (orange) | `#FC7911` / `#fc7810` | Primary CTA buttons, accents, hover states |
| `secondary` (gold) | `#FBC84F` / `#e99f3d` | Hero card background, badges, highlights |
| `slate-blue` | `#465067` | Secondary buttons, nav text, date badges |
| `white` | `#ffffff` | Page background, cards |
| `off-white` | `#FFF2E5` | Hero section warm background |
| `black` | `#000000` / `#37352F` | Body text, headings |
| `muted` | `#666666` | Subtext, secondary text |
| `border` | `#E6E6E6` | Dividers, card borders |

### Brand Colors (CSS Variables)
- `--color-primary: #e99f3d` (gold/amber)
- `--color-secondary: #68461d` (dark brown)
- `--color-accent: #4ba0b1` (teal)

---

## Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Display/Headings | `font-display` (Archivo) | 700-900 | clamp based |
| Body | `font-sans` (Inter) | 400-600 | 16-18px |
| Arabic | `font-arabic` (Cairo) | 400-700 | — |

- Headlines: `tracking-tighter`, `leading-[0.9]` to `leading-[1.1]`
- Body: `leading-relaxed`, `max-w-[65ch]`
- Eyebrow labels: `text-[11px] uppercase tracking-[0.2em]` — MAX 1 per 3 sections

---

## Layout Principles

- Container: `max-w-[1330px] mx-auto px-6`
- Viewport height: ALWAYS `min-h-[100dvh]` — never `h-screen`
- Hero top padding: MAX `pt-24`
- Navigation height: 70px mobile, 89px desktop — single line only
- Corner radius: sharp `rounded-sm` (4px) for buttons/badges, `rounded-[33px]` for main cards
- Shape consistency: Buttons = `rounded-sm`, Cards = `rounded-sm`, Hero card = `rounded-[33px]`

---

## Hero Section
- **Layout:** Full-bleed video background with a simplified bottom-centered button row (displaying only the two main Action Buttons). All typography (headline, description, date/location metadata) is moved to the subsequent section (`AboutUsGrid`) as an editorial intro block.
- **Video:** `/vectors/WIDE VERSION.mp4` with poster image
- **CTA:** Two buttons — primary orange + secondary/white-bordered button, centered horizontally
- **Mode:** Light — `bg-[#FFF2E5]` warm white base

---

## Navigation
- **Style:** Fixed top, `bg-white/90 backdrop-blur-md`, single-line desktop
- **Logo:** Dynamic EN/AR logo based on locale
- **Links:** Uppercase tracking, slate-blue text, orange hover underline
- **CTAs:** Language toggle + Login + Tickets button (orange)
- **Mobile:** Full-screen slide-in overlay from right

---

## Button System

| Variant | Style |
|---|---|
| Primary | `bg-[#FC7810] text-white rounded-sm hover:bg-black` |
| Secondary | `bg-[#465067] text-white rounded-sm hover:bg-[#FC7911]` |
| Ghost | `border border-black/10 text-[#465067] rounded-sm` |
| Pill | `bg-primary text-white rounded-full` |

---

## Motion Guidelines
- Entry transitions: `opacity-0 → 1`, `translateY(20px) → 0` with `ease-out`
- Hover: `hover:scale-105 active:scale-95` on CTAs
- Scroll reveal: use `framer-motion` `motion` components
- No infinite loops unless purposeful (marquees max 1 per page)
- Reduced motion: respect `prefers-reduced-motion`

---

## Sections Color Consistency (LOCKED)
All sections are LIGHT MODE. No dark sections mixed in unless explicitly a "color block" device.
- White sections: `bg-white`
- Warm-tinted sections: `bg-[#FFF2E5]` or `bg-[#FFF8F0]`
- Accent sections: CTA banners with full-bleed image + dark overlay (exception for dramatic effect)
