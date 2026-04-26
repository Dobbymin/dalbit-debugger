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
        borderLeftWidth: { base: "0", lg: "1px" },
        borderLeftStyle: "solid",
        borderLeftColor: "outlineVariant",
        borderTopWidth: { base: "1px", lg: "0" },
        borderTopStyle: "solid",
        borderTopColor: "outlineVariant",
        flexShrink: 0,
        backgroundColor: "surfaceContainerLowest",
        display: "flex",
        flexDirection: "column",
        minHeight: { base: "180px", lg: "0" },
      })}
    >
      <div
        className={css({
          height: "40px",
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor: "outlineVariant",
          backgroundColor: "surface",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingX: "panelPadding",
        })}
      >
        <h3
          className={css({
            margin: 0,
            fontFamily: "code",
            fontSize: "12px",
            fontWeight: 500,
            color: "onSurfaceVariant",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          })}
        >
          Variables (Scope)
        </h3>
        <SparkIcon className={icon({ usage: "control" })} />
      </div>

      <div
        className={css({
          padding: "panelPadding",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          overflow: "auto",
        })}
      >
        {variables.length === 0 ? (
          <div
            className={css({
              padding: "20px",
              textAlign: "center",
              color: "outline",
              fontSize: "12px",
              fontFamily: "code",
              borderWidth: "1px",
              borderStyle: "dashed",
              borderColor: "outlineVariant",
              borderRadius: "DEFAULT",
              backgroundColor: "surface",
            })}
          >
            활성 변수 없음
          </div>
        ) : (
          variables.map((item) => (
            <div
              key={item.name}
              className={css({
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                borderRadius: "DEFAULT",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "outlineVariant",
                backgroundColor: "surface",
              })}
            >
              <span
                className={css({
                  color: "onSurface",
                  fontSize: "14px",
                  fontFamily: "code",
                })}
              >
                {item.name}
              </span>
              <div
                className={css({
                  display: "flex",
                  alignItems: "baseline",
                  gap: "6px",
                })}
              >
                <strong
                  className={css({
                    color: item.tone === "primary" ? "primary" : "secondary",
                    fontSize: "14px",
                    fontFamily: "code",
                  })}
                >
                  {item.value}
                </strong>
                <span
                  className={css({
                    color: "outline",
                    fontSize: "11px",
                    fontFamily: "code",
                    fontStyle: "italic",
                  })}
                >
                  {item.kind}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
