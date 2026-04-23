import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        fonts: {
          headline: {
            value: '"Manrope", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
          },
          body: {
            value: '"Work Sans", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
          },
          code: {
            value: '"Space Grotesk", "JetBrains Mono", "SFMono-Regular", "Menlo", "Consolas", monospace',
          },
        },
        radii: {
          sm: { value: "0.125rem" },
          DEFAULT: { value: "0.25rem" },
          md: { value: "0.375rem" },
          lg: { value: "0.5rem" },
          xl: { value: "0.75rem" },
          full: { value: "9999px" },
        },
        spacing: {
          unit: { value: "4px" },
          gutter: { value: "16px" },
          margin: { value: "24px" },
          panelPadding: { value: "12px" },
          stackGap: { value: "8px" },
        },
        shadows: {
          floating: { value: "0 4px 20px rgba(33, 53, 71, 0.08)" },
        },
      },
      semanticTokens: {
        colors: {
          surface: { value: { base: "#f7f9ff" } },
          surfaceDim: { value: { base: "#c7dcf4" } },
          surfaceBright: { value: { base: "#f7f9ff" } },
          surfaceContainerLowest: { value: { base: "#ffffff" } },
          surfaceContainerLow: { value: { base: "#edf4ff" } },
          surfaceContainer: { value: { base: "#e2efff" } },
          surfaceContainerHigh: { value: { base: "#d8eaff" } },
          surfaceContainerHighest: { value: { base: "#d0e5fc" } },
          surfaceVariant: { value: { base: "#d0e5fc" } },
          surfaceTint: { value: { base: "#345da4" } },

          background: { value: { base: "#f7f9ff" } },
          onBackground: { value: { base: "#071d2e" } },
          onSurface: { value: { base: "#071d2e" } },
          onSurfaceVariant: { value: { base: "#434751" } },
          inverseSurface: { value: { base: "#1e3244" } },
          inverseOnSurface: { value: { base: "#e8f2ff" } },

          outline: { value: { base: "#737782" } },
          outlineVariant: { value: { base: "#c3c6d2" } },

          primary: { value: { base: "#003473" } },
          onPrimary: { value: { base: "#ffffff" } },
          primaryContainer: { value: { base: "#1e4b91" } },
          onPrimaryContainer: { value: { base: "#9fbeff" } },
          inversePrimary: { value: { base: "#adc6ff" } },
          primaryFixed: { value: { base: "#d8e2ff" } },
          primaryFixedDim: { value: { base: "#adc6ff" } },
          onPrimaryFixed: { value: { base: "#001a41" } },
          onPrimaryFixedVariant: { value: { base: "#15458b" } },

          secondary: { value: { base: "#0058be" } },
          onSecondary: { value: { base: "#ffffff" } },
          secondaryContainer: { value: { base: "#2270e4" } },
          onSecondaryContainer: { value: { base: "#fefcff" } },
          secondaryFixed: { value: { base: "#d8e2ff" } },
          secondaryFixedDim: { value: { base: "#aec6ff" } },
          onSecondaryFixed: { value: { base: "#001a42" } },
          onSecondaryFixedVariant: { value: { base: "#004395" } },

          tertiary: { value: { base: "#343637" } },
          onTertiary: { value: { base: "#ffffff" } },
          tertiaryContainer: { value: { base: "#4b4d4e" } },
          onTertiaryContainer: { value: { base: "#bdbebf" } },
          tertiaryFixed: { value: { base: "#e2e2e3" } },
          tertiaryFixedDim: { value: { base: "#c6c6c7" } },
          onTertiaryFixed: { value: { base: "#1a1c1d" } },
          onTertiaryFixedVariant: { value: { base: "#454748" } },

          error: { value: { base: "#ba1a1a" } },
          onError: { value: { base: "#ffffff" } },
          errorContainer: { value: { base: "#ffdad6" } },
          onErrorContainer: { value: { base: "#93000a" } },
        },
      },
      textStyles: {
        headlineLg: {
          value: {
            fontFamily: "headline",
            fontSize: "32px",
            fontWeight: "700",
            lineHeight: "1.2",
          },
        },
        headlineMd: {
          value: {
            fontFamily: "headline",
            fontSize: "24px",
            fontWeight: "600",
            lineHeight: "1.3",
          },
        },
        bodyMd: {
          value: {
            fontFamily: "body",
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "1.6",
          },
        },
        codeMd: {
          value: {
            fontFamily: "code",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "1.5",
          },
        },
        labelSm: {
          value: {
            fontFamily: "code",
            fontSize: "12px",
            fontWeight: "500",
            lineHeight: "1.2",
            letterSpacing: "0.05em",
          },
        },
      },
    },
  },

  globalCss: {
    "html, body": {
      backgroundColor: "background",
      color: "onBackground",
      fontFamily: "body",
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
