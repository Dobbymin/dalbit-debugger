import { EditorSimulationSection, FeatureCardSection, HeroSection, MainFooter } from "@/features";

import { css } from "../../../styled-system/css";

export default function MainPage() {
  return (
    <div
      className={css({
        minHeight: "100dvh",
        background:
          "radial-gradient(1200px 600px at 50% -10%, var(--colors-surface-container-high) 0%, var(--colors-surface) 55%, var(--colors-surface-container-lowest) 100%)",
        color: "onBackground",
        fontFamily: "body",
      })}
    >
      <main
        className={css({
          maxWidth: "1200px",
          marginX: "auto",
          paddingX: "margin",
          paddingTop: "72px",
          paddingBottom: "56px",
          display: "flex",
          flexDirection: "column",
          gap: "64px",
        })}
      >
        <HeroSection />
        <FeatureCardSection />
        <EditorSimulationSection />
      </main>

      <MainFooter />
    </div>
  );
}
