---
name: Logic & Lumen
colors:
  surface: '#f7f9ff'
  surface-dim: '#c7dcf4'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#edf4ff'
  surface-container: '#e2efff'
  surface-container-high: '#d8eaff'
  surface-container-highest: '#d0e5fc'
  on-surface: '#071d2e'
  on-surface-variant: '#434751'
  inverse-surface: '#1e3244'
  inverse-on-surface: '#e8f2ff'
  outline: '#737782'
  outline-variant: '#c3c6d2'
  surface-tint: '#345da4'
  primary: '#003473'
  on-primary: '#ffffff'
  primary-container: '#1e4b91'
  on-primary-container: '#9fbeff'
  inverse-primary: '#adc6ff'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2270e4'
  on-secondary-container: '#fefcff'
  tertiary: '#343637'
  on-tertiary: '#ffffff'
  tertiary-container: '#4b4d4e'
  on-tertiary-container: '#bdbebf'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#15458b'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#aec6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#e2e2e3'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1d'
  on-tertiary-fixed-variant: '#454748'
  background: '#f7f9ff'
  on-background: '#071d2e'
  surface-variant: '#d0e5fc'
typography:
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  code-md:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin: 24px
  panel-padding: 12px
  stack-gap: 8px
---

## Brand & Style

The design system is engineered for the modern developer-educator. It balances the rigor of a professional Integrated Development Environment (IDE) with the approachability of an educational platform. The aesthetic is rooted in **Corporate Modernism**, characterized by a highly structured layout, purposeful whitespace, and a sophisticated blue-chip color palette.

The emotional response should be one of "calm productivity." By stripping away unnecessary ornamentation and focusing on typographic hierarchy, this design system ensures that the code remains the hero, while the surrounding UI provides a silent, reliable framework for debugging and architectural thought.

## Colors

The palette is anchored by deep, authoritative blues to instill a sense of reliability. 

- **Primary (#1E4B91):** Used for core navigation elements, primary branding, and structural headers. It provides a grounded foundation for the IDE shell.
- **Secondary (#3C82F6):** A vibrant "Action Blue" reserved for interactive states, progress indicators, and syntax highlighting accents. It directs the eye to the most critical information.
- **Neutral (#213547):** A high-contrast slate used for primary body text and terminal backgrounds to ensure maximum legibility without the harshness of pure black.
- **Surface (#F6F6F7):** A soft, neutral gray used for panel backgrounds (sidebar, console, gutter). This reduces eye strain during long programming sessions compared to a stark white background.

## Typography

Typography is the primary driver of the interface hierarchy. 

- **Manrope** is used for the UI chrome—headers, titles, and navigation—providing a balanced and professional feel.
- **Work Sans** handles instructional content and documentation. Its optimized kerning ensures high readability in dense paragraphs.
- **Space Grotesk** serves as the "technical" font. While the primary code editor should use a dedicated monospaced font, Space Grotesk is used for labels, metadata, and the debugging console to give the tool a modern, engineered look.

Maintain a strict adherence to line-height ratios to ensure that code blocks and debugging tables do not feel cramped.

## Layout & Spacing

This design system utilizes a **Fluid Grid** model with a "Panels and Slots" philosophy. The interface is divided into functional zones: a fixed-width navigation sidebar, a flexible main editor, and collapsible utility panels (console, debugger, file tree).

The spacing rhythm is based on a 4px baseline grid. Use 16px (4 units) for standard component gutters and 24px (6 units) for page margins. In the editor and debugging panels, density is prioritized; use 8px or 12px padding to keep the data structured but compact.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows.

- **Level 0 (Base):** The main background (`#FFFFFF`) for the primary workspace.
- **Level 1 (Submerged):** Sidebars and utility panels use the Surface color (`#F6F6F7`) to appear recessed.
- **Level 2 (Floating):** Modals, dropdowns, and tooltips use a white background with a very soft, diffused shadow (0px 4px 20px rgba(33, 53, 71, 0.08)).
- **Separators:** Use 1px solid borders in a light gray for panel definitions to maintain a crisp, architectural feel without adding visual weight.

## Shapes

The design system employs a **Soft** shape language. A consistent 0.25rem (4px) radius is applied to buttons, input fields, and panel corners. This creates a professional, precise appearance that aligns with the structured nature of programming tools while remaining modern and approachable for learners.

Larger components like cards or modal containers should use 0.5rem (8px) to provide a clearer distinction from the surrounding UI frame.

## Components

### Buttons
- **Primary:** Solid `#1E4B91` with white text. Square-ish with 4px radius.
- **Ghost:** Transparent background with `#3C82F6` text and border for secondary IDE actions (e.g., "Run," "Debug").

### Input Fields & Editor
- Code inputs must have a subtle background tint (`#F6F6F7`) to distinguish them from standard text fields. 
- Use a 2px left-border accent in Primary Blue to indicate the active line or focused state.

### Chips & Badges
- Use for status indicators (e.g., "Success," "Error," "Running"). 
- High-saturation backgrounds with low opacity (e.g., 10%) and dark text for a "soft" indicator style.

### Debugging Panels
- Use alternating row stripes (Zebra striping) in the console for readability. 
- Icons for warnings and errors should be simplified glyphs to avoid cluttering the technical data.

### Progress & Loading
- Use a slim, linear progress bar at the very top of the editor panel rather than a circular spinner to minimize distraction during execution.