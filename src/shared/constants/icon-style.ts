export const ICON_SIZE = {
  xs: "10px",
  sm: "11px",
  md: "12px",
  lg: "14px",
  xl: "15px",
  card: "18px",
  hero: "64px",
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
  action: {
    width: ICON_SIZE.md,
    height: ICON_SIZE.md,
    ...ICON_WEIGHT.medium,
    transition: ICON_MOTION.transition.iconTransform,
  },
  nav: {
    width: ICON_SIZE.md,
    height: ICON_SIZE.md,
    ...ICON_WEIGHT.regular,
    transition: ICON_MOTION.transition.iconTransform,
  },
  control: {
    width: ICON_SIZE.sm,
    height: ICON_SIZE.sm,
    ...ICON_WEIGHT.boldFeel,
    transition: ICON_MOTION.transition.iconTransform,
  },
  feature: {
    width: ICON_SIZE.card,
    height: ICON_SIZE.card,
    ...ICON_WEIGHT.medium,
    transition: ICON_MOTION.transition.iconTransform,
  },
  cta: {
    width: ICON_SIZE.xl,
    height: ICON_SIZE.xl,
    ...ICON_WEIGHT.medium,
    transition: ICON_MOTION.transition.iconTransform,
  },
  inline: {
    width: ICON_SIZE.xs,
    height: ICON_SIZE.xs,
    ...ICON_WEIGHT.medium,
    transition: ICON_MOTION.transition.iconTransform,
  },
  hero: {
    width: ICON_SIZE.hero,
    height: ICON_SIZE.hero,
    ...ICON_WEIGHT.regular,
    transition: ICON_MOTION.transition.iconTransform,
  },
} as const;
