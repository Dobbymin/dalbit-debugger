---
name: icon-workflow
description: Manages SVG icon assets for the project. Use this skill when adding, removing, or using icons — it covers placing SVG files, running the generation script, and consuming the resulting React components with PandaCSS.
---

# Icon Workflow

This skill covers the full lifecycle of SVG icons in this project: from placing a raw `.svg` file to using the generated React component with PandaCSS.

## Overview

Icons are **not** imported directly as SVGs. Instead, a generation script reads raw `.svg` files and produces typed React TSX components. This avoids the need for `vite-plugin-svgr` and ensures every icon accepts `className` (compatible with PandaCSS `css()` output).

## Directory Structure

```
src/shared/_assets/icon/
├── *.svg                    ← raw SVG source files (place new icons here)
├── index.ts                 ← auto-generated, do not edit
└── components/
    ├── *.tsx                ← auto-generated React components, do not edit
    └── index.ts             ← auto-generated barrel export, do not edit
```

## Step-by-Step Process

### 1. Add or Remove SVG Files

Place the `.svg` file in:

```
src/shared/_assets/icon/<icon-name>.svg
```

**Naming convention**: kebab-case only.

```
arrow-right.svg
chevron-down.svg
close.svg
play-circle.svg
```

To remove an icon, delete the corresponding `.svg` file.

### 2. Run the Generation Script

```bash
pnpm run generate:icons
```

This script (`script/generate-icons.mjs`) will:

1. Read all `.svg` files from `src/shared/_assets/icon/`
2. Extract `viewBox` and inner SVG content from each file
3. Generate a TSX React component per icon in `components/`
4. Write `components/index.ts` and `icon/index.ts` barrel exports

**Generated component shape** (example for `arrow-right.svg`):

```tsx
// components/ArrowRightIcon.tsx  — do not edit manually
import { type SVGProps } from 'react';

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {/* inner SVG paths */}
    </svg>
  );
}
```

### 3. Use the Icon with PandaCSS

Import from the shared layer entry point:

```tsx
import { ArrowRightIcon } from '@/shared';
import { css } from '../../../styled-system/css';

// Pass PandaCSS css() result directly via className
<ArrowRightIcon className={css({ color: 'primary', width: '6', height: '6' })} />

// Or use css() with cva() for variant-driven sizing
const iconStyle = css({ color: 'onSurface', flexShrink: 0 });
<ArrowRightIcon className={iconStyle} width={20} height={20} />
```

All standard `SVGProps<SVGSVGElement>` are forwarded, so `width`, `height`, `style`, `onClick`, `className`, etc. all work.

## Naming Convention

| SVG filename         | Generated component name |
|----------------------|--------------------------|
| `arrow-right.svg`    | `ArrowRightIcon`         |
| `chevron-down.svg`   | `ChevronDownIcon`        |
| `play-circle.svg`    | `PlayCircleIcon`         |
| `close.svg`          | `CloseIcon`              |

Rule: kebab-case filename → PascalCase + `Icon` suffix.

## Rules

- **Never edit** files inside `components/` or the generated `index.ts` — they are overwritten on every script run.
- **Always re-run** `pnpm run generate:icons` after adding or removing `.svg` files.
- SVG files should not include `width` or `height` attributes — use `viewBox` only. Size is controlled at usage via props or PandaCSS tokens.
- Do not use inline `fill` or `stroke` colors in SVG paths; prefer `fill="currentColor"` so the icon inherits color from PandaCSS tokens.

## Checklist

- [ ] `.svg` file placed in `src/shared/_assets/icon/` with kebab-case name
- [ ] `pnpm run generate:icons` executed successfully
- [ ] Icon imported from `@/shared` (not from `@/shared/_assets/icon` or `components/` directly)
- [ ] Icon sized and colored via PandaCSS `css()` or token props
