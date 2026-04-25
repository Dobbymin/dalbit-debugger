import { icon } from "../../../styled-system/recipes";

export const ICON_SIZE = {
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "20px",
  xl: "24px",
  card: "32px",
  hero: "80px",
} as const;

export const ICON_WEIGHT = {
  regular: { transform: "scale(1)" },
  medium: { transform: "scale(1.01)" },
  boldFeel: { transform: "scale(1.03)" },
} as const;

export const ICON_MOTION = {
  duration: {
    fast: "140ms",
    normal: "180ms",
    slow: "220ms",
  },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    emphasized: "cubic-bezier(0.2, 0.8, 0.2, 1)",
  },
  transition: {
    iconTransform: "transform 180ms cubic-bezier(0.2, 0, 0, 1)",
    interactive:
      "color 180ms cubic-bezier(0.2, 0, 0, 1), background-color 180ms cubic-bezier(0.2, 0, 0, 1), border-color 180ms cubic-bezier(0.2, 0, 0, 1)",
  },
} as const;

export const ICON_HOVER_TOKENS = {
  ghost: {
    color: "primaryContainer",
    backgroundColor: "surfaceContainerHigh",
  },
  subtle: {
    color: "primaryContainer",
    backgroundColor: "surfaceContainerLow",
  },
} as const;

export const ICON_STYLE = {
  action: icon.raw({ usage: "action" }),
  nav: icon.raw({ usage: "nav" }),
  control: icon.raw({ usage: "control" }),
  feature: icon.raw({ usage: "feature" }),
  cta: icon.raw({ usage: "cta" }),
  inline: icon.raw({ usage: "inline" }),
  hero: icon.raw({ usage: "hero" }),
} as const;
