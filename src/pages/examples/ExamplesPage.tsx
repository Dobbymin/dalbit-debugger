import { useNavigate } from "react-router-dom";

import { ExampleSection } from "@/features";
import { ROUTE_PATHS } from "@/shared";

import { css } from "../../../styled-system/css";

export default function ExamplesPage() {
  const navigate = useNavigate();

  const handleOpenInDebugger = (code: string) => {
    navigate(ROUTE_PATHS.DEBUGGER, { state: { code } });
  };

  return (
    <main
      className={css({
        flex: 1,
        overflowY: "auto",
        backgroundColor: "#f7f9ff",
        color: "#1d2a3a",
        fontFamily: "body",
        padding: { base: "14px", md: "24px" },
      })}
    >
      <div
        className={css({
          maxWidth: "1120px",
          marginX: "auto",
        })}
      >
        <header
          className={css({
            marginBottom: "18px",
          })}
        >
          <h1
            className={css({
              margin: 0,
              fontFamily: "headline",
              fontSize: { base: "28px", md: "34px" },
              lineHeight: "1.2",
              color: "#17293f",
            })}
          >
            Example Library
          </h1>
          <p
            className={css({
              margin: 0,
              marginTop: "6px",
              color: "#64748b",
              fontSize: "14px",
            })}
          >
            Explore categorized Dalbit Yaksok snippets to practice stepping through code.
          </p>
        </header>

        <ExampleSection onOpenExample={handleOpenInDebugger} />
      </div>
    </main>
  );
}
