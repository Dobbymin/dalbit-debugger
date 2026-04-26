import { BackspaceIcon, ICON_HOVER_TOKENS, ICON_MOTION } from "@/shared";

import { css } from "../../../../styled-system/css";
import { icon } from "../../../../styled-system/recipes";
import type { LogEntry } from "../_stores";

type DebuggerOutputPanelProps = {
  output: LogEntry[];
  onClearOutput: () => void;
};

export function DebuggerOutputPanel({ output, onClearOutput }: DebuggerOutputPanelProps) {
  return (
    <section
      className={css({
        height: { base: "150px", md: "200px" },
        borderTopWidth: "1px",
        borderTopStyle: "solid",
        borderTopColor: "outlineVariant",
        backgroundColor: "surfaceContainerLowest",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      })}
    >
      <div
        className={css({
          height: "36px",
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor: "outlineVariant",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingX: "12px",
          fontFamily: "code",
          fontSize: "12px",
          color: "onSurfaceVariant",
          backgroundColor: "surface",
        })}
      >
        <span>출력 로그</span>
        <button
          type="button"
          onClick={onClearOutput}
          className={css({
            display: "inline-flex",
            alignItems: "center",
            border: "none",
            backgroundColor: "transparent",
            color: "outline",
            cursor: "pointer",
            transition: ICON_MOTION.transition.interactive,
            _hover: ICON_HOVER_TOKENS.subtle,
          })}
        >
          <BackspaceIcon className={icon({ usage: "control" })} />
        </button>
      </div>

      <div
        className={css({
          padding: { base: "8px", md: "12px" },
          fontFamily: "code",
          fontSize: "12px",
          color: "onSurface",
          overflowY: "auto",
          flex: 1,
        })}
      >
        {output.length === 0 ? (
          <div className={css({ color: "outline" })}>로그가 없습니다.</div>
        ) : (
          output.map((log, index) => (
            <div key={`${log.timestamp}-${index}`} className={css({ marginBottom: "4px" })}>
              <span className={css({ color: "outline", marginRight: "8px" })}>[{log.timestamp}]</span>
              <span>{log.message}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
