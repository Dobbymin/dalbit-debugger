import { CodeIcon } from "@/shared";

import { css } from "../../../../styled-system/css";
import { icon } from "../../../../styled-system/recipes";
import { ExampleCard } from "../components";
import { EXAMPLE_SECTIONS } from "../constants";

type Props = {
  onOpenExample: (code: string) => void;
};

export const ExampleSection = ({ onOpenExample }: Props) => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      })}
    >
      {EXAMPLE_SECTIONS.map((example) => (
        <section key={example.title}>
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "8px",
              marginBottom: "12px",
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
              borderBottomColor: "#d7dfec",
            })}
          >
            <h2
              className={css({
                margin: 0,
                color: "#1e4b91",
                fontFamily: "headline",
                fontSize: { base: "20px", md: "24px" },
                display: "flex",
                alignItems: "center",
                gap: "8px",
              })}
            >
              <CodeIcon className={icon({ usage: "action" })} />
              {example.title}
            </h2>
            <span
              className={css({
                fontFamily: "code",
                fontSize: "11px",
                color: "#738199",
                backgroundColor: "#e8f0fd",
                borderRadius: "DEFAULT",
                paddingX: "8px",
                paddingY: "4px",
              })}
            >
              {example.count} Examples
            </span>
          </div>

          <div
            className={css({
              display: "grid",
              gridTemplateColumns: {
                base: "1fr",
                md: "repeat(2, minmax(0, 1fr))",
                xl: "repeat(3, minmax(0, 1fr))",
              },
              gap: "12px",
            })}
          >
            {example.cards.map((card) => (
              <ExampleCard
                key={card.title}
                title={card.title}
                description={card.description}
                code={card.code}
                badge={card.badge}
                onOpen={onOpenExample}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
