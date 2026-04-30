---
name: Cinema Noir
colors:
  surface: '#200e0c'
  surface-dim: '#200e0c'
  surface-bright: '#4a3330'
  surface-container-lowest: '#1a0908'
  surface-container-low: '#2a1614'
  surface-container: '#2e1a18'
  surface-container-high: '#3a2522'
  surface-container-highest: '#462f2c'
  on-surface: '#ffdad5'
  on-surface-variant: '#e9bcb6'
  inverse-surface: '#ffdad5'
  inverse-on-surface: '#412b28'
  outline: '#af8782'
  outline-variant: '#5e3f3b'
  surface-tint: '#ffb4aa'
  primary: '#ffb4aa'
  on-primary: '#690003'
  primary-container: '#e50914'
  on-primary-container: '#fff7f6'
  inverse-primary: '#c0000c'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#a7c8ff'
  on-tertiary: '#003061'
  tertiary-container: '#0072d7'
  on-tertiary-container: '#f8f9ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4aa'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930007'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1b1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#d5e3ff'
  tertiary-fixed-dim: '#a7c8ff'
  on-tertiary-fixed: '#001b3c'
  on-tertiary-fixed-variant: '#004689'
  background: '#200e0c'
  on-background: '#ffdad5'
  surface-variant: '#462f2c'
typography:
  h1:
    fontFamily: Be Vietnam Pro
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  h2:
    fontFamily: Be Vietnam Pro
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  h3:
    fontFamily: Be Vietnam Pro
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  button:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  container_margin: 20px
  gutter: 12px
---

## Brand & Style
The design system is engineered to evoke the immersive, high-stakes atmosphere of a premium cinema lobby. It targets movie enthusiasts who value a frictionless, high-end booking experience. The aesthetic merges **Minimalism** with **Glassmorphism** to create a sense of depth and luxury. By utilizing a "Dark Mode First" approach, the UI recedes into the background, allowing high-fidelity movie posters and cinematic imagery to become the focal point. The emotional response is one of exclusivity, excitement, and modern sophistication.

## Colors
The palette is rooted in a high-contrast cinematic theme. **Deep Black** serves as the infinite canvas, ensuring perfect black levels on OLED displays. **Cinema Red** is reserved strictly for primary calls-to-action (CTAs), seat selections, and critical status indicators, providing a punchy, energetic contrast. **Dark Gray** is used to define container surfaces and card backgrounds, while **Soft White** ensures optimal legibility without the harshness of pure white text. Overlays utilize a semi-transparent version of the secondary color to maintain context through glassmorphism.

## Typography
The typography strategy employs a dual-font approach. **Be Vietnam Pro** is used for headlines to provide a contemporary, slightly geometric flair that feels cinematic and expressive. **Inter** is used for body copy and labels to ensure maximum readability in dense information areas like showtime listings and ticket details. Tracking is tightened slightly for headlines and loosened for uppercase labels to maintain a premium editorial feel.

## Layout & Spacing
This design system utilizes a fluid grid with a 4px baseline rhythm. For mobile interfaces, a 20px side margin is maintained to prevent content from touching the edges of the display. Component spacing follows a geometric progression (8, 12, 16, 24, 32) to create a clear visual hierarchy. Card layouts for movie posters should utilize a 12px gutter to allow the high-quality imagery to breathe while maintaining high information density.

## Elevation & Depth
Depth is achieved through a combination of **Tonal Layering** and **Glassmorphism**.
- **Level 0 (Base):** Deep Black (#0D0D0D) for the main application background.
- **Level 1 (Cards):** Dark Gray (#1C1C1C) with no shadow, relying on subtle 1px border strokes (rgba(255,255,255,0.05)) for definition.
- **Level 2 (Overlays):** Semi-transparent Dark Gray with a 20px background blur (Backdrop Filter) and a subtle 15% opacity drop shadow to lift elements like seat selection panels or modal alerts.
- **Level 3 (Sticky Nav):** The Bottom Tab Bar uses a frosted glass effect to allow movie posters to scroll beneath it, maintaining a sense of spatial continuity.

## Shapes
The shape language is consistently "Rounded" to soften the high-contrast color palette. Primary containers and movie poster cards utilize a **16px (rounded-xl)** corner radius. Small interactive elements like chips, buttons, and input fields utilize a **12px (rounded-lg)** radius. This consistency ensures the app feels friendly yet structured, avoiding the clinical feel of sharp corners or the overly playful feel of full pills.

## Components

### Buttons
- **Primary:** Solid Cinema Red with Soft White text. 16px height-adjusted padding.
- **Secondary:** Ghost style with a 1px Soft White border at 20% opacity.
- **State Changes:** On press, primary buttons scale down slightly (0.98) and darken by 10%.

### Cards & Movie Posters
- **Movie Cards:** Vertical 2:3 aspect ratio with 16px rounded corners. Titles are placed below the image or as a glassmorphism overlay on the bottom third.
- **Info Cards:** Dark Gray background, used for booking summaries and profile sections.

### Navigation
- **Bottom Tab Bar:** 4 items (Home, Search, Bookings, Profile). Active state uses Cinema Red for the icon and a small 4px dot indicator below.
- **Status Chips:** Small 12px rounded tags for genres or ratings (e.g., "IMAX", "4K"), using a Dark Gray fill with Soft White text.

### Inputs & Selection
- **Text Fields:** Dark Gray fill, 12px rounded corners, with a 1px Red border only appearing on focus.
- **Seat Selection:** Unselected seats are Dark Gray outlines; selected seats are solid Cinema Red; occupied seats are low-opacity Gray.

### Glassmorphism Overlays
- Used for "Filter" drawers and "Ticket Confirmation" modals. Requires a background-blur of at least 15px and a subtle inner-glow stroke to define the edges against dark backgrounds.