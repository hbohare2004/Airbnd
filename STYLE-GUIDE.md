# Nivasa — Style Guide v3.0 — "Warm Hearth"

> **Theme:** Calm, peaceful, homely, relaxing, trustworthy

---

## Color Palette — "Warm Hearth"

| Token | Hex | Swatch | Usage |
|---|---|---|---|
| Primary | `#E07A5F` | 🟠 Soft Coral | Buttons, links, CTA, brand |
| Primary Light | `#F2A589` | 🍑 Warm Peach | Hover states, hero gradient |
| Primary Dark | `#C4603F` | 🔶 Deep Coral | Pressed states, headings |
| Secondary | `#81B29A` | 🌿 Sage Green | Success, edit button, accents |
| Secondary Light | `#A7C4B5` | 🌱 Muted Teal | Supporting elements |
| Secondary Dark | `#5F9A7E` | 🍃 Deep Sage | Button hover |
| Accent Sand | `#D4C5A9` | 🏖️ Light Sand | Decorative, warm accents |
| Accent Blue | `#A8C5D6` | 🌊 Pastel Blue | Info, light highlights |
| Background | `#FAF7F4` | ☁️ Warm Cream | Page background |
| Background Alt | `#F5F0EB` | 🧶 Light Linen | Alternate sections |
| Surface | `#FFFFFF` | ⬜ White | Cards, forms, modals |
| Border | `#E8E4DF` | 🔲 Warm Border | Card & input borders |
| Border Light | `#F0ECE7` | ▫️ Faint Cream | Subtle dividers |
| Text | `#3D3D3D` | ⬛ Soft Dark Gray | Body copy (not pure black) |
| Text Secondary | `#7A7370` | 🩶 Warm Medium | Captions, labels, dates |
| Text Muted | `#B0ACA6` | 🔘 Warm Light | Placeholders, disabled |
| Danger | `#D96B6B` | 🔴 Soft Red | Delete, errors |
| Warning/Star | `#E8B85E` | ⭐ Warm Gold | Star ratings |

---

## Typography

| Token | Value | Usage |
|---|---|---|
| `--font-family` | `'Nunito', 'Segoe UI', system-ui` | Body text — warm & rounded |
| `--font-display` | `'Quicksand', 'Nunito'` | Headings, hero, brand — friendly |

> Fonts loaded via `@import` in `style.css` from Google Fonts.

### Size Scale

| Token | Size | px |
|---|---|---|
| `--fs-xs` | `0.75rem` | 12px |
| `--fs-sm` | `0.875rem` | 14px |
| `--fs-base` | `1rem` | 16px |
| `--fs-md` | `1.125rem` | 18px |
| `--fs-lg` | `1.25rem` | 20px |
| `--fs-xl` | `1.5rem` | 24px |
| `--fs-2xl` | `2rem` | 32px |
| `--fs-3xl` | `2.5rem` | 40px |
| `--fs-4xl` | `3rem` | 48px |

### Weight Scale

| Token | Value |
|---|---|
| `--fw-regular` | 400 |
| `--fw-medium` | 500 |
| `--fw-semibold` | 600 |
| `--fw-bold` | 700 |
| `--fw-extrabold` | 800 |

### Line Height

| Token | Value | Usage |
|---|---|---|
| `--lh-tight` | 1.25 | Headings |
| `--lh-normal` | 1.6 | Body text (relaxed reading) |
| `--lh-relaxed` | 1.8 | Descriptions, hero subtext |

---

## Spacing Scale (4px base unit)

| Token | Value | px |
|---|---|---|
| `--space-1` | `0.25rem` | 4 |
| `--space-2` | `0.5rem` | 8 |
| `--space-3` | `0.75rem` | 12 |
| `--space-4` | `1rem` | 16 |
| `--space-5` | `1.25rem` | 20 |
| `--space-6` | `1.5rem` | 24 |
| `--space-8` | `2rem` | 32 |
| `--space-10` | `2.5rem` | 40 |
| `--space-12` | `3rem` | 48 |
| `--space-16` | `4rem` | 64 |
| `--space-20` | `5rem` | 80 |

---

## Border Radius (rounder for calm feel)

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `8px` | Badges, delete buttons |
| `--radius-md` | `12px` | Inputs, buttons, filters |
| `--radius-lg` | `16px` | Cards |
| `--radius-xl` | `22px` | Form containers, auth |
| `--radius-2xl` | `28px` | Hero section bottom |
| `--radius-full` | `9999px` | Pills, search bar, avatars |

---

## Shadows (softer, warm-toned)

| Token | Usage |
|---|---|
| `--shadow-xs` | Navbar at rest |
| `--shadow-sm` | Cards at rest, alerts |
| `--shadow-md` | Navbar on scroll |
| `--shadow-lg` | Forms, show-page cards, auth |
| `--shadow-xl` | Hover-elevated cards |
| `--shadow-primary` | Coral button hover glow |
| `--shadow-warm` | Sand-toned warm glow |

---

## Transitions (gentle & smooth)

| Token | Duration | Usage |
|---|---|---|
| `--transition-fast` | 180ms | Color, opacity |
| `--transition-base` | 300ms | Most hover effects |
| `--transition-slow` | 450ms | Image scale, page fade |
| `--transition-spring` | 450ms (cubic-bezier) | Bouncy icon effects |

---

## Components

### Navbar
- Sticky top with `--shadow-xs` (very subtle)
- Adds `.scrolled` class on scroll → `--shadow-md` + backdrop blur
- Brand uses **`--color-primary` (Soft Coral)** — warm, welcoming
- Nav links: soft underline indicator on hover, warm bg tint

### Hero Section
- Warm gradient: `Peach → Coral → Deep Coral`
- Display font (`Quicksand`) at `--fs-4xl` — friendly rounded
- CTA button: white pill with coral text
- Decorative radial gradient overlays for depth

### Cards (Listings)
- `--radius-lg` (16px) rounded corners
- Subtle `--shadow-sm` at rest → `--shadow-lg` on hover
- Gentle lift (`translateY(-5px)`) + image scales to 1.03×
- Title transitions to coral on hover

### Forms
- Wrapped in `.form-container` / `.edit-container`
- `--radius-xl` container with `--shadow-lg`
- Warm cream (`--color-bg`) input backgrounds
- Focus ring in coral `--color-primary-50`
- Edit button uses **sage green** for visual distinction

### Auth Pages
- Centered `.auth-container` (max-width 460px)
- Heading with coral underline decoration
- Links between login ↔ signup

### Footer
- Dark background (`#3D3D3D` — soft dark, not harsh black)
- 3px gradient top-border: `Coral → Sand → Sage`
- Social icons with spring-bounce hover to peach

### Flash Messages
- Left-border accent (4px)
- Success: sage green tint; Danger: soft red tint
- Slide-down animation on mount

### Star Ratings
- Inactive: `#E8E4DF` (warm gray)
- Active: `#E8B85E` (warm gold)
- Hover: `#F0C97A` (light gold)

### Error Page
- Centered `.error-container` with warning icon
- Soft red heading, "Back to Listings" CTA

---

## Design Principles

1. **Warm, not hot** — Soft coral and sage, never harsh or loud
2. **Rounded everything** — 12-16px radius on most elements
3. **Soft shadows** — Barely-there at rest, gentle lift on hover
4. **Breathable spacing** — Generous padding, relaxed line heights
5. **Friendly type** — Nunito & Quicksand feel approachable
6. **No pure black** — `#3D3D3D` for text, warmer grays elsewhere

---

## Accessibility

- Focus-visible outlines on interactive elements
- `prefers-reduced-motion` support disables all animations
- ARIA labels on icon-only buttons
- Print styles hide nav, footer, and interactive controls
