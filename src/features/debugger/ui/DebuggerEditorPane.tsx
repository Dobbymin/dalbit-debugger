import { CodeEditor } from "@/entities";

import { css } from "../../../../styled-system/css";

type DebuggerEditorPaneProps = {
  code: string;
  currentLine: number | null;
  progressWidth: string;
  onCodeChange: (code: string) => void;
};

export function DebuggerEditorPane({ code, currentLine, progressWidth, onCodeChange }: DebuggerEditorPaneProps) {
  return (
    <section
      className={css({
        flex: 1,
        minWidth: "0",
        backgroundColor: "surface",
        borderRightWidth: { base: "0", lg: "1px" },
        borderRightStyle: "solid",
        borderRightColor: "outlineVariant",
        display: "flex",
        flexDirection: "column",
        minHeight: { base: "260px", lg: "0" },
      })}
    >
      <div
        className={css({
          height: "4px",
          backgroundColor: "surfaceContainerHigh",
        })}
      >
        <div
          className={css({
            width: progressWidth,
            height: "100%",
            backgroundColor: "primaryContainer",
            transition: "width 0.3s ease",
          })}
        />
      </div>

      <div
        className={css({
          flex: 1,
          minHeight: 0,
        })}
      >
        <CodeEditor value={code} onChange={onCodeChange} currentLine={currentLine} />
      </div>
    </section>
  );
}
