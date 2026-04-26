import { Link } from "react-router-dom";

import { BugReportIcon, HomeIcon, ICON_MOTION, ROUTE_PATHS } from "@/shared";

import { css, cx } from "../../../styled-system/css";
import { icon } from "../../../styled-system/recipes";

type Props = {
  error?: Error | null;
};

export default function ErrorPage({ error }: Props) {
  return (
    <div
      className={css({
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        background:
          "radial-gradient(circle at 30% 20%, rgba(173, 198, 255, 0.35), rgba(247, 249, 255, 0) 45%), linear-gradient(180deg, #f7f9ff 0%, #edf4ff 100%)",
        color: "onBackground",
        fontFamily: "body",
      })}
    >
      <main
        className={css({
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { base: "16px", md: "24px" },
          py: { base: "24px", md: "40px" },
        })}
      >
        <section
          className={css({
            width: "full",
            maxWidth: "640px",
            textAlign: "center",
          })}
        >
          <div className={css({ display: "flex", justifyContent: "center", mb: "20px" })}>
            <BugReportIcon
              className={cx(
                icon({ usage: "hero" }),
                css({
                  color: "error",
                }),
              )}
            />
          </div>

          <h1
            className={css({
              fontFamily: "headline",
              fontSize: { base: "36px", md: "42px" },
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "error",
              lineHeight: 1,
              mb: "8px",
            })}
          >
            오류 발생
          </h1>

          <p
            className={css({
              fontFamily: "headline",
              fontSize: { base: "20px", md: "24px" },
              fontWeight: 700,
              color: "onSurface",
              mb: "10px",
            })}
          >
            예기치 않은 오류가 발생했습니다
          </p>

          <p
            className={css({
              fontSize: "14px",
              color: "onSurfaceVariant",
              maxWidth: "420px",
              mx: "auto",
              mb: "24px",
            })}
          >
            죄송합니다. 문제가 발생했습니다. 홈으로 돌아가거나 디버거를 다시 시도해주세요.
          </p>

          <div
            className={css({
              display: "flex",
              flexDirection: { base: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            })}
          >
            <Link
              to={ROUTE_PATHS.MAIN}
              className={css({
                height: "40px",
                minWidth: { base: "220px", sm: "160px" },
                px: "16px",
                borderRadius: "DEFAULT",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                bg: "primary",
                color: "onPrimary",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "primary",
                fontFamily: "code",
                fontSize: "12px",
                textDecoration: "none",
                transition: ICON_MOTION.transition.interactive,
                _hover: { bg: "primaryContainer", borderColor: "primaryContainer" },
              })}
            >
              <HomeIcon className={icon({ usage: "nav" })} />
              <span>홈으로 돌아가기</span>
            </Link>

            <Link
              to={ROUTE_PATHS.DEBUGGER}
              className={css({
                height: "40px",
                minWidth: { base: "220px", sm: "160px" },
                px: "16px",
                borderRadius: "DEFAULT",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                bg: "transparent",
                color: "secondary",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "secondary",
                fontFamily: "code",
                fontSize: "12px",
                textDecoration: "none",
                transition: ICON_MOTION.transition.interactive,
                _hover: { bg: "surfaceVariant" },
              })}
            >
              <BugReportIcon className={icon({ usage: "nav" })} />
              <span>디버거로 이동</span>
            </Link>
          </div>

          {error && (
            <div className={css({ mt: "30px", display: "flex", justifyContent: "center" })}>
              <div
                className={css({
                  width: "full",
                  maxWidth: "360px",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "outlineVariant",
                  borderRadius: "8px",
                  backgroundColor: "surfaceContainerLowest",
                  p: "12px",
                  textAlign: "left",
                })}
              >
                <div
                  className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                    borderBottomColor: "outlineVariant",
                    pb: "8px",
                    mb: "8px",
                  })}
                >
                  <span className={css({ width: "8px", height: "8px", borderRadius: "full", bg: "error" })} />
                  <span
                    className={css({
                      width: "8px",
                      height: "8px",
                      borderRadius: "full",
                      backgroundColor: "tertiaryFixedDim",
                    })}
                  />
                  <span
                    className={css({
                      width: "8px",
                      height: "8px",
                      borderRadius: "full",
                      backgroundColor: "tertiaryFixedDim",
                    })}
                  />
                  <span
                    className={css({
                      ml: "6px",
                      fontFamily: "code",
                      fontSize: "10px",
                      color: "outline",
                    })}
                  >
                    error.log
                  </span>
                </div>

                <pre
                  className={css({
                    margin: 0,
                    fontFamily: "code",
                    fontSize: "12px",
                    color: "onSurfaceVariant",
                    lineHeight: 1.5,
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                  })}
                >
                  <span className={css({ color: "error" })}>Error:</span> {error.message}
                </pre>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer
        className={css({
          borderTopWidth: "1px",
          borderTopStyle: "solid",
          borderTopColor: "outlineVariant",
          backgroundColor: "surfaceContainerLowest",
          px: { base: "16px", md: "24px" },
          py: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
          fontFamily: "code",
          fontSize: "11px",
          color: "outline",
        })}
      >
        <span>© 2026 Dalbit Debugger. Engineered for clarity.</span>
        <div className={css({ display: "flex", gap: "10px", flexWrap: "wrap" })}>
          <span>Privacy</span>
          <span>Terms</span>
          <span>API Status</span>
          <span>Contact Support</span>
        </div>
      </footer>
    </div>
  );
}
