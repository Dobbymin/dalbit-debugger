import { css } from "../../../styled-system/css";

export default function DebuggerPage() {
  const headerTabs = ["Debugger", "Library", "Documentation"] as const;

  const menuItems = [
    { label: "Home", icon: "⌂", active: false },
    { label: "Debugger", icon: ">_", active: false },
    { label: "Snippets", icon: "#", active: true },
    { label: "Settings", icon: "⚙", active: false },
  ] as const;

  const sections = [
    {
      title: "변수와 조건문",
      count: 3,
      cards: [
        {
          title: "짝수 홀수 판별기",
          description: "입력된 숫자가 짝수인지 홀수인지 판별하는 기본적인 조건문 예제입니다.",
          code: ["num = 7", "if num % 2 == 0:", '    print("짝수")', "else:", '    print("홀수")'],
          badge: null,
        },
        {
          title: "학점 계산기",
          description: "점수에 따라 A, B, C, D, F 학점을 부여하는 다중 조건문 예제입니다.",
          code: ["score = 85", "if score >= 90:", "    grade = 'A'", "elif score >= 80:", "    grade = 'B'"],
          badge: null,
        },
      ],
    },
    {
      title: "반복문",
      count: 2,
      cards: [
        {
          title: "1부터 5까지 합계 구하기",
          description: "for 루프를 사용하여 누적 합을 계산하는 과정을 단계별로 확인합니다.",
          code: ["total = 0", "for i in range(1, 6):", "    total += i", "print(total)"],
          badge: "POPULAR",
        },
        {
          title: "구구단 출력",
          description: "중첩 for 루프의 동작 방식을 이해하기 위한 기본 예제입니다.",
          code: ["for i in range(2, 4):", "    for j in range(1, 4):", "        print(f'{i} * {j}')"],
          badge: null,
        },
      ],
    },
    {
      title: "함수",
      count: 1,
      cards: [
        {
          title: "두 수 더하기 함수",
          description: "함수 선언과 호출 흐름을 스텝별로 확인할 수 있는 입문 예제입니다.",
          code: ["def add(a, b):", "    return a + b", "result = add(3, 4)", "print(result)"],
          badge: null,
        },
      ],
    },
  ] as const;

  return (
    <div
      className={css({
        minHeight: "100dvh",
        backgroundColor: "#f7f9ff",
        color: "#1d2a3a",
        fontFamily: "body",
      })}
    >
      <header
        className={css({
          height: "64px",
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor: "#dbe4f0",
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingX: { base: "12px", md: "24px" },
          gap: "16px",
        })}
      >
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            gap: { base: "14px", md: "24px" },
            minWidth: 0,
          })}
        >
          <div
            className={css({
              color: "#1e4b91",
              fontFamily: "headline",
              fontSize: "18px",
              fontWeight: 800,
              whiteSpace: "nowrap",
            })}
          >
            Dalbit Debugger
          </div>

          <nav
            className={css({
              display: { base: "none", md: "flex" },
              alignItems: "center",
              gap: "20px",
            })}
          >
            {headerTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={css({
                  border: "none",
                  background: "transparent",
                  fontSize: "12px",
                  fontFamily: "code",
                  color: tab === "Library" ? "#1e4b91" : "#6a778a",
                  borderBottomWidth: tab === "Library" ? "2px" : "0",
                  borderBottomStyle: "solid",
                  borderBottomColor: "#1e4b91",
                  paddingBottom: "4px",
                  cursor: "pointer",
                })}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div
          className={css({
            display: "flex",
            alignItems: "center",
            gap: "10px",
            minWidth: 0,
          })}
        >
          <div
            className={css({
              display: { base: "none", lg: "flex" },
              alignItems: "center",
              gap: "6px",
              height: "34px",
              width: "220px",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#d3dbe7",
              borderRadius: "DEFAULT",
              paddingX: "10px",
              backgroundColor: "#f8fbff",
              color: "#6f7a8b",
              fontFamily: "code",
              fontSize: "12px",
            })}
          >
            <span>⌕</span>
            <span>Search examples...</span>
          </div>

          {[
            { label: "settings", icon: "⚙" },
            { label: "help", icon: "?" },
            { label: "account", icon: "◉" },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              aria-label={item.label}
              className={css({
                width: "30px",
                height: "30px",
                border: "none",
                borderRadius: "DEFAULT",
                backgroundColor: "transparent",
                color: "#657389",
                cursor: "pointer",
                _hover: { backgroundColor: "#eef3fb", color: "#1e4b91" },
              })}
            >
              {item.icon}
            </button>
          ))}

          <button
            type="button"
            className={css({
              height: "30px",
              border: "none",
              borderRadius: "DEFAULT",
              backgroundColor: "#1e4b91",
              color: "#fff",
              fontFamily: "code",
              fontSize: "11px",
              paddingX: "10px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              _hover: { opacity: 0.92 },
            })}
          >
            Start Debugging
          </button>
        </div>
      </header>

      <div
        className={css({
          display: "flex",
          minHeight: "calc(100dvh - 64px)",
        })}
      >
        <aside
          className={css({
            display: { base: "none", md: "flex" },
            width: "256px",
            borderRightWidth: "1px",
            borderRightStyle: "solid",
            borderRightColor: "#dbe4f0",
            backgroundColor: "#f6f6f7",
            padding: "16px",
            flexDirection: "column",
            gap: "10px",
          })}
        >
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "8px",
            })}
          >
            <div
              className={css({
                width: "28px",
                height: "28px",
                borderRadius: "DEFAULT",
                backgroundColor: "#1e4b91",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: 700,
              })}
            >
              D
            </div>
            <div>
              <p
                className={css({
                  margin: 0,
                  color: "#1e4b91",
                  fontFamily: "headline",
                  fontSize: "18px",
                  fontWeight: 800,
                })}
              >
                Dalbit
              </p>
              <p
                className={css({
                  margin: 0,
                  marginTop: "-2px",
                  fontSize: "10px",
                  color: "#76829a",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: "code",
                })}
              >
                Step Debugger
              </p>
            </div>
          </div>

          <button
            type="button"
            className={css({
              border: "none",
              borderRadius: "DEFAULT",
              height: "36px",
              backgroundColor: "#1e4b91",
              color: "#fff",
              fontFamily: "code",
              fontSize: "12px",
              cursor: "pointer",
              marginBottom: "6px",
              _hover: { opacity: 0.92 },
            })}
          >
            + New Session
          </button>

          <nav
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            })}
          >
            {menuItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={css({
                  height: "38px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  paddingX: "10px",
                  borderRadius: "lg",
                  border: item.active ? "1px solid #d8e1ef" : "1px solid transparent",
                  backgroundColor: item.active ? "#ffffff" : "transparent",
                  color: item.active ? "#1e4b91" : "#5d6b81",
                  fontFamily: "code",
                  fontSize: "12px",
                  textAlign: "left",
                  cursor: "pointer",
                  _hover: {
                    backgroundColor: item.active ? "#ffffff" : "#eaf0fa",
                  },
                })}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main
          className={css({
            flex: 1,
            overflowY: "auto",
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
                Explore categorized Python snippets to practice stepping through code.
              </p>
            </header>

            <div
              className={css({
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              })}
            >
              {sections.map((section) => (
                <section key={section.title}>
                  <div
                    className={css({
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingBottom: "8px",
                      marginBottom: "12px",
                      borderBottomWidth: "1px",
                      borderBottomStyle: "solid",
                      borderBottomColor: "#d7dfec",
                    })}
                  >
                    <h2
                      className={css({
                        margin: 0,
                        color: "#1e4b91",
                        fontFamily: "headline",
                        fontSize: { base: "20px", md: "24px" },
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      })}
                    >
                      <span className={css({ fontFamily: "code", fontSize: "15px" })}>{"</>"}</span>
                      {section.title}
                    </h2>
                    <span
                      className={css({
                        fontFamily: "code",
                        fontSize: "11px",
                        color: "#738199",
                        backgroundColor: "#e8f0fd",
                        borderRadius: "DEFAULT",
                        paddingX: "8px",
                        paddingY: "4px",
                      })}
                    >
                      {section.count} Examples
                    </span>
                  </div>

                  <div
                    className={css({
                      display: "grid",
                      gridTemplateColumns: {
                        base: "1fr",
                        md: "repeat(2, minmax(0, 1fr))",
                        xl: "repeat(3, minmax(0, 1fr))",
                      },
                      gap: "12px",
                    })}
                  >
                    {section.cards.map((card) => (
                      <article
                        key={card.title}
                        className={css({
                          minHeight: "250px",
                          display: "flex",
                          flexDirection: "column",
                          borderWidth: "1px",
                          borderStyle: "solid",
                          borderColor: "#d5ddeb",
                          borderRadius: "xl",
                          backgroundColor: "#fff",
                          padding: "12px",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                          transition: "border-color 160ms ease",
                          _hover: {
                            borderColor: "#1e4b91",
                          },
                        })}
                      >
                        <div>
                          <div
                            className={css({
                              display: "flex",
                              alignItems: "flex-start",
                              justifyContent: "space-between",
                              gap: "8px",
                            })}
                          >
                            <h3
                              className={css({
                                margin: 0,
                                fontFamily: "headline",
                                fontSize: "17px",
                                lineHeight: "1.3",
                                color: "#162a43",
                              })}
                            >
                              {card.title}
                            </h3>
                            {card.badge ? (
                              <span
                                className={css({
                                  borderRadius: "DEFAULT",
                                  paddingX: "6px",
                                  paddingY: "2px",
                                  fontSize: "10px",
                                  fontFamily: "code",
                                  backgroundColor: "#ffdcd7",
                                  color: "#8e1610",
                                  whiteSpace: "nowrap",
                                })}
                              >
                                {card.badge}
                              </span>
                            ) : null}
                          </div>

                          <p
                            className={css({
                              margin: 0,
                              marginTop: "6px",
                              fontSize: "13px",
                              color: "#6b778d",
                              lineHeight: "1.45",
                            })}
                          >
                            {card.description}
                          </p>
                        </div>

                        <div
                          className={css({
                            marginTop: "10px",
                            backgroundColor: "#f6f9ff",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "#dce5f5",
                            borderRadius: "lg",
                            padding: "10px",
                            position: "relative",
                            overflow: "hidden",
                          })}
                        >
                          <div
                            className={css({
                              position: "absolute",
                              left: 0,
                              top: 0,
                              bottom: 0,
                              width: "2px",
                              backgroundColor: "#1e4b91",
                            })}
                          />
                          <pre
                            className={css({
                              margin: 0,
                              paddingLeft: "8px",
                              fontFamily: "code",
                              fontSize: "12px",
                              color: "#334155",
                              lineHeight: "1.4",
                            })}
                          >
                            {card.code.join("\n")}
                          </pre>
                        </div>

                        <div
                          className={css({
                            marginTop: "auto",
                            paddingTop: "10px",
                            display: "flex",
                            justifyContent: "flex-end",
                          })}
                        >
                          <button
                            type="button"
                            className={css({
                              height: "30px",
                              borderWidth: "1px",
                              borderStyle: "solid",
                              borderColor: "#1e4b91",
                              borderRadius: "DEFAULT",
                              paddingX: "10px",
                              backgroundColor: "#fff",
                              color: "#1e4b91",
                              fontFamily: "code",
                              fontSize: "11px",
                              cursor: "pointer",
                              _hover: {
                                backgroundColor: "#eef4ff",
                              },
                            })}
                          >
                            ▶ 디버거에서 열기
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
