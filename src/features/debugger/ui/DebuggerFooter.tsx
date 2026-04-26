import { css } from "../../../../styled-system/css";

export function DebuggerFooter() {
  return (
    <footer
      className={css({
        borderTopWidth: "1px",
        borderTopStyle: "solid",
        borderTopColor: "outlineVariant",
        backgroundColor: "surfaceContainerLowest",
        color: "outline",
        fontFamily: "code",
        fontSize: "11px",
        paddingX: { base: "12px", md: "24px" },
        paddingY: "10px",
        display: "flex",
        gap: "12px",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      })}
    >
      <span>© 2026 Dalbit Debugger. Education through Architecture.</span>
      <div className={css({ display: "flex", gap: "10px", flexWrap: "wrap" })}>
        <span>Documentation</span>
        <span>Privacy Policy</span>
        <span>Open Source</span>
        <span>Support</span>
      </div>
    </footer>
  );
}
