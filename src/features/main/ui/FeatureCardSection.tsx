import { css } from "../../../../styled-system/css";
import { icon } from "../../../../styled-system/recipes";
import { FEATURE_CARDS } from "../_constants";

export const FeatureCardSection = () => {
  return (
    <section
      className={css({
        display: "grid",
        gridTemplateColumns: { base: "1fr", md: "repeat(3, minmax(0, 1fr))" },
        gap: "16px",
      })}
    >
      {FEATURE_CARDS.map((feature) => (
        <article
          key={feature.title}
          className={css({
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "outlineVariant",
            borderRadius: "xl",
            backgroundColor: "surfaceContainerLowest",
            padding: "margin",
            minHeight: "230px",
            boxShadow: "floating",
            transition: "transform 180ms ease",
            _hover: { transform: "translateY(-4px)" },
          })}
        >
          <div
            className={css({
              width: "48px",
              height: "48px",
              borderRadius: "lg",
              backgroundColor: "surfaceContainer",
              color: "primaryContainer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
              fontFamily: "code",
              fontWeight: 600,
            })}
          >
            <feature.Icon className={icon({ usage: "feature" })} />
          </div>
          <h2
            className={css({
              margin: 0,
              marginBottom: "10px",
              textStyle: "headlineLg",
              fontSize: "24px",
              fontWeight: 600,
              color: "onSurface",
              lineHeight: 1.3,
            })}
          >
            {feature.title}
          </h2>
          <p
            className={css({
              margin: 0,
              color: "onSurfaceVariant",
              fontSize: "16px",
              lineHeight: 1.65,
            })}
          >
            {feature.description}
          </p>
        </article>
      ))}
    </section>
  );
};
