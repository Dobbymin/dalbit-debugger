import { Link } from "react-router-dom";

import { ICON_STYLE, PanelIcon, PlayIcon, StepIcon, VariableIcon } from "@/shared";

import { css } from "../../../styled-system/css";

export default function MainPage() {
  const featureCards = [
    {
      Icon: StepIcon,
      title: "단계별 실행",
      description:
        "코드를 한 줄씩 실행하며 프로그램 상태 변화를 정밀하게 추적합니다. 논리 오류를 빠르게 찾아내는 데 최적화되어 있습니다.",
    },
    {
      Icon: VariableIcon,
      title: "실시간 변수 추적",
      description:
        "현재 스코프의 변수 값을 실행 단계와 함께 갱신해 보여줍니다. 데이터 구조 변화가 눈에 보이도록 설계했습니다.",
    },
    {
      Icon: PanelIcon,
      title: "학습 친화적 UI",
      description:
        "교육자와 학습자 모두를 위한 패널 중심 화면입니다. 코드와 상태를 같은 시야에서 읽어 이해 속도를 높입니다.",
    },
  ] as const;

  const editorLines = [
    { no: 1, code: "나이 : 20", isActive: false, indent: 0 },
    { no: 2, code: "만약 나이 >= 18 이면", isActive: true, indent: 0 },
    { no: 3, code: '"성인입니다" 보여주기', isActive: false, indent: 1 },
    { no: 4, code: "아니면", isActive: false, indent: 0 },
    { no: 5, code: '"미성년자입니다" 보여주기', isActive: false, indent: 1 },
  ] as const;

  return (
    <div
      className={css({
        minHeight: "100dvh",
        background:
          "radial-gradient(1200px 600px at 50% -10%, var(--colors-surface-container-high) 0%, var(--colors-surface) 55%, var(--colors-surface-container-lowest) 100%)",
        color: "onBackground",
        fontFamily: "body",
      })}
    >
      <main
        className={css({
          maxWidth: "1200px",
          marginX: "auto",
          paddingX: "margin",
          paddingTop: "72px",
          paddingBottom: "56px",
          display: "flex",
          flexDirection: "column",
          gap: "64px",
        })}
      >
        <section
          className={css({
            textAlign: "center",
            maxWidth: "900px",
            marginX: "auto",
          })}
        >
          <p
            className={css({
              display: "inline-flex",
              marginBottom: "16px",
              paddingX: "10px",
              paddingY: "4px",
              borderRadius: "full",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "outlineVariant",
              backgroundColor: "rgba(216, 234, 255, 0.6)",
              color: "onPrimaryFixedVariant",
              fontFamily: "code",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            })}
          >
            Logic &amp; Lumen
          </p>

          <h1
            className={css({
              margin: 0,
              marginBottom: "14px",
              textStyle: "headlineLg",
              fontSize: { base: "40px", md: "56px" },
              lineHeight: 1.12,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "primary",
            })}
          >
            달빛약속 스텝 디버거
          </h1>

          <p
            className={css({
              margin: 0,
              marginX: "auto",
              marginBottom: "30px",
              maxWidth: "720px",
              fontSize: { base: "18px", md: "24px" },
              lineHeight: 1.5,
              color: "onSurfaceVariant",
            })}
          >
            코드의 실행 흐름을 단계별로 시각화해 복잡한 로직을 차분하게 이해하세요. 코드 라인, 변수 상태, 출력 로그를 한
            화면에서 이어서 읽을 수 있습니다.
          </p>

          <div
            className={css({
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "10px",
            })}
          >
            <Link
              to="/debugger"
              className={css({
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                minWidth: "190px",
                paddingX: "18px",
                paddingY: "14px",
                borderRadius: "lg",
                backgroundColor: "primaryContainer",
                color: "onPrimary",
                textDecoration: "none",
                fontFamily: "headline",
                fontSize: "18px",
                fontWeight: 600,
                transition: "all 180ms ease",
                _hover: {
                  backgroundColor: "primary",
                  transform: "translateY(-1px)",
                },
              })}
            >
              <PlayIcon className={css(ICON_STYLE.cta)} />
              <span>디버깅 시작하기</span>
            </Link>

            <Link
              to="/examples"
              className={css({
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "190px",
                paddingX: "18px",
                paddingY: "14px",
                borderRadius: "lg",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "primaryContainer",
                backgroundColor: "transparent",
                color: "primaryContainer",
                textDecoration: "none",
                fontFamily: "headline",
                fontSize: "18px",
                fontWeight: 600,
                transition: "all 180ms ease",
                _hover: { backgroundColor: "surfaceContainerLow" },
              })}
            >
              예제 보기
            </Link>
          </div>
        </section>

        <section
          className={css({
            display: "grid",
            gridTemplateColumns: { base: "1fr", md: "repeat(3, minmax(0, 1fr))" },
            gap: "16px",
          })}
        >
          {featureCards.map((feature) => (
            <article
              key={feature.title}
              className={css({
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "outlineVariant",
                borderRadius: "xl",
                backgroundColor: "surfaceContainerLowest",
                padding: "margin",
                minHeight: "230px",
                boxShadow: "floating",
                transition: "transform 180ms ease",
                _hover: { transform: "translateY(-4px)" },
              })}
            >
              <div
                className={css({
                  width: "48px",
                  height: "48px",
                  borderRadius: "lg",
                  backgroundColor: "surfaceContainer",
                  color: "primaryContainer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  fontFamily: "code",
                  fontWeight: 600,
                })}
              >
                <feature.Icon className={css(ICON_STYLE.feature)} />
              </div>
              <h2
                className={css({
                  margin: 0,
                  marginBottom: "10px",
                  textStyle: "headlineLg",
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "onSurface",
                  lineHeight: 1.3,
                })}
              >
                {feature.title}
              </h2>
              <p
                className={css({
                  margin: 0,
                  color: "onSurfaceVariant",
                  fontSize: "16px",
                  lineHeight: 1.65,
                })}
              >
                {feature.description}
              </p>
            </article>
          ))}
        </section>

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
                  {editorLines.map((line) => (
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
      </main>

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
    </div>
  );
}
