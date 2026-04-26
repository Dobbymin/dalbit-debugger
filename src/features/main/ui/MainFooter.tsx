import { css } from "../../../../styled-system/css";

export const MainFooter = () => {
  return (
    <footer
      className={css({
        borderTopWidth: "1px",
        borderTopStyle: "solid",
        borderTopColor: "outlineVariant",
        backgroundColor: "surfaceContainerLowest",
      })}
    >
      <div
        className={css({
          maxWidth: "1200px",
          marginX: "auto",
          paddingX: "margin",
          paddingY: "20px",
          display: "flex",
          flexDirection: { base: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { base: "flex-start", md: "center" },
          gap: "8px",
          color: "onSurfaceVariant",
          fontFamily: "code",
          fontSize: "12px",
          letterSpacing: "0.03em",
        })}
      >
        <p className={css({ margin: 0 })}>© 2026 Dalbit Debugger. Education through Architecture.</p>
        <div
          className={css({
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          })}
        >
          <a
            href="https://dalbit-yaksok.postica.app"
            target="_blank"
            rel="noreferrer"
            className={css({
              color: "onSurfaceVariant",
              textDecoration: "none",
              _hover: { color: "primaryContainer" },
            })}
          >
            Documentation
          </a>
          <a
            href="https://jsr.io/@dalbit-yaksok/core"
            target="_blank"
            rel="noreferrer"
            className={css({
              color: "onSurfaceVariant",
              textDecoration: "none",
              _hover: { color: "primaryContainer" },
            })}
          >
            Runtime
          </a>
        </div>
      </div>
    </footer>
  );
};
