import { SparkIcon } from "@/shared";

import { css } from "../../../../styled-system/css";
import { icon } from "../../../../styled-system/recipes";
import type { VariableRow } from "../_stores";

type DebuggerVariablesPanelProps = {
  variables: VariableRow[];
};

export function DebuggerVariablesPanel({ variables }: DebuggerVariablesPanelProps) {
  return (
    <aside
      className={css({
        width: { base: "100%", lg: "320px" },
        borderTopWidth: { base: "1px", lg: "0" },
        borderTopStyle: "solid",
        borderTopColor: "outlineVariant",
        flexShrink: 0,
        backgroundColor: "surfaceBright",
        display: "flex",
        flexDirection: "column",
        minHeight: { base: "180px", lg: "0" },
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
        })}
      >
        <span>변수 상태</span>
        <SparkIcon className={icon({ usage: "control" })} />
      </div>

      <div
        className={css({
          padding: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          overflow: "auto",
          fontFamily: "code",
        })}
      >
        {variables.length === 0 ? (
          <div
            className={css({
              padding: "20px",
              textAlign: "center",
              color: "outline",
              fontSize: "12px",
            })}
          >
            활성 변수 없음
          </div>
        ) : (
          variables.map((item) => (
            <div
              key={item.name}
              className={css({
                height: "34px",
                borderRadius: "DEFAULT",
                paddingX: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                _hover: { backgroundColor: "surfaceContainer" },
              })}
            >
              <span>{item.name}</span>
              <span
                className={css({
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                })}
              >
                <strong
                  className={css({
                    color: item.tone === "primary" ? "primary" : "secondary",
                  })}
                >
                  {item.value}
                </strong>
                <span className={css({ color: "outline" })}>({item.kind})</span>
              </span>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
