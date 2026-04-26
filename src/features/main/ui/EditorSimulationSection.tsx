import { css } from "../../../../styled-system/css";
import { EDITOR_LINES } from "../_constants";

export const EditorSimulationSection = () => {
  return (
    <section
      className={css({
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "outlineVariant",
        borderRadius: "xl",
        overflow: "hidden",
        backgroundColor: "surfaceContainerLowest",
        boxShadow: "floating",
      })}
    >
      <div
        className={css({
          height: "40px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          paddingX: "panelPadding",
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor: "outlineVariant",
          backgroundColor: "surface",
        })}
      >
        <span
          className={css({
            width: "10px",
            height: "10px",
            borderRadius: "full",
            backgroundColor: "error",
          })}
        />
        <span
          className={css({
            width: "10px",
            height: "10px",
            borderRadius: "full",
            backgroundColor: "surfaceVariant",
          })}
        />
        <span
          className={css({
            width: "10px",
            height: "10px",
            borderRadius: "full",
            backgroundColor: "surfaceVariant",
          })}
        />
        <p
          className={css({
            margin: 0,
            marginLeft: "8px",
            fontFamily: "code",
            fontSize: "12px",
            letterSpacing: "0.05em",
            color: "onSurfaceVariant",
          })}
        >
          main.dalbit - step-debugger
        </p>
      </div>

      <div
        className={css({
          display: "grid",
          gridTemplateColumns: { base: "1fr", lg: "minmax(0, 1fr) 280px" },
          minHeight: "360px",
        })}
      >
        <div
          className={css({
            borderRightWidth: { base: "0px", lg: "1px" },
            borderRightStyle: { base: "solid", lg: "solid" },
            borderRightColor: { base: "transparent", lg: "outlineVariant" },
            borderBottomWidth: { base: "1px", lg: "0px" },
            borderBottomStyle: "solid",
            borderBottomColor: "outlineVariant",
            backgroundColor: "surface",
            padding: "panelPadding",
          })}
        >
          <div
            className={css({
              height: "100%",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "surfaceVariant",
              borderRadius: "lg",
              backgroundColor: "surfaceContainerLowest",
              overflow: "hidden",
            })}
          >
            <div
              className={css({
                height: "6px",
                background:
                  "linear-gradient(90deg, var(--colors-primary-container) 0%, var(--colors-secondary-container) 40%, rgba(34, 112, 228, 0.2) 100%)",
              })}
            />

            <div className={css({ padding: "panelPadding" })}>
              {EDITOR_LINES.map((line) => (
                <div
                  key={line.no}
                  className={css({
                    display: "grid",
                    gridTemplateColumns: "28px minmax(0, 1fr)",
                    alignItems: "center",
                    minHeight: "36px",
                    marginBottom: "2px",
                    backgroundColor: line.isActive ? "surfaceContainerLow" : "transparent",
                    borderLeftWidth: "2px",
                    borderLeftStyle: "solid",
                    borderLeftColor: line.isActive ? "primaryContainer" : "transparent",
                  })}
                >
                  <span
                    className={css({
                      textAlign: "right",
                      paddingRight: "8px",
                      color: "onTertiaryContainer",
                      fontFamily: "code",
                      fontSize: "13px",
                    })}
                  >
                    {line.no}
                  </span>
                  <span
                    className={css({
                      paddingLeft: `${line.indent * 20 + 8}px`,
                      color: line.isActive ? "primaryContainer" : "onSurface",
                      fontFamily: '"JetBrains Mono", "SFMono-Regular", "Menlo", "Consolas", monospace',
                      fontSize: "14px",
                      lineHeight: 1.5,
                    })}
                  >
                    {line.code}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside
          className={css({
            padding: "panelPadding",
            backgroundColor: "surfaceContainerLowest",
          })}
        >
          <h3
            className={css({
              margin: 0,
              marginBottom: "12px",
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

          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            })}
          >
            <div
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
              <span className={css({ color: "onSurface", fontSize: "14px" })}>나이</span>
              <strong className={css({ color: "secondary", fontSize: "14px" })}>20</strong>
            </div>
            <div
              className={css({
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                borderRadius: "DEFAULT",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "outlineVariant",
                backgroundColor: "surfaceContainerLowest",
              })}
            >
              <span className={css({ color: "onSurface", fontSize: "14px" })}>결과</span>
              <span
                className={css({
                  color: "onTertiaryContainer",
                  fontStyle: "italic",
                  fontSize: "14px",
                })}
              >
                undefined
              </span>
            </div>
          </div>

          <div
            className={css({
              marginTop: "16px",
              borderTopWidth: "1px",
              borderTopStyle: "solid",
              borderTopColor: "outlineVariant",
              paddingTop: "12px",
            })}
          >
            <p
              className={css({
                margin: 0,
                marginBottom: "8px",
                fontFamily: "code",
                fontSize: "12px",
                fontWeight: 500,
                color: "onSurfaceVariant",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              })}
            >
              Output
            </p>
            <div
              className={css({
                borderRadius: "DEFAULT",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "outlineVariant",
                backgroundColor: "surface",
                padding: "10px",
                fontFamily: '"JetBrains Mono", "SFMono-Regular", "Menlo", "Consolas", monospace',
                fontSize: "13px",
                color: "onSurface",
                lineHeight: 1.5,
                minHeight: "92px",
              })}
            >
              <div>&gt; 실행 대기 중...</div>
              <div>&gt; 현재 단계: 2 / 5</div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};
