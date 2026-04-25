import {
  AccountCircleIcon,
  BackspaceIcon,
  DebuggerIcon,
  HelpCircleIcon,
  HomeIcon,
  ICON_HOVER_TOKENS,
  ICON_MOTION,
  ICON_STYLE,
  PauseIcon,
  PlayIcon,
  SettingsIcon,
  SparkIcon,
  StopIcon,
} from "@/shared";

import { css } from "../../../styled-system/css";

type DebugLine = {
  line: number;
  code: string;
  active?: boolean;
};

type VariableRow = {
  name: string;
  value: string;
  kind: string;
  tone: "primary" | "secondary";
};

export default function DebuggerPage() {
  const leftMenus = [
    { label: "Home", Icon: HomeIcon },
    { label: "Debugger", Icon: DebuggerIcon },
    { label: "Snippets", Icon: DebuggerIcon },
    { label: "Settings", Icon: SettingsIcon },
  ] as const;

  const controls = [
    { label: "단계 실행", active: true, Icon: PlayIcon },
    { label: "일시정지", active: false, Icon: PauseIcon },
    { label: "정지", active: false, Icon: StopIcon },
  ] as const;

  const codeLines: DebugLine[] = [
    { line: 1, code: "let age = 20;" },
    { line: 2, code: "let name = '철수';" },
    { line: 3, code: "" },
    { line: 4, code: "if (age >= 18) {", active: true },
    { line: 5, code: "  console.log(name + '는 성인입니다.');" },
    { line: 6, code: "}" },
  ];

  const vars: VariableRow[] = [
    { name: "age", value: "20", kind: "number", tone: "primary" },
    { name: "name", value: '"철수"', kind: "string", tone: "secondary" },
  ];

  return (
    <div
      className={css({
        minHeight: "100dvh",
        backgroundColor: "background",
        color: "onBackground",
        display: "flex",
        flexDirection: "column",
        fontFamily: "body",
      })}
    >
      <header
        className={css({
          height: "64px",
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor: "outlineVariant",
          backgroundColor: "surfaceContainerLowest",
          paddingX: { base: "10px", md: "24px" },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexShrink: 0,
        })}
      >
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            gap: { base: "12px", md: "24px" },
            minWidth: 0,
          })}
        >
          <strong
            className={css({
              color: "primaryContainer",
              fontFamily: "headline",
              fontWeight: 800,
              fontSize: "16px",
              whiteSpace: "nowrap",
            })}
          >
            Dalbit Debugger
          </strong>

          <nav
            className={css({
              display: { base: "none", md: "flex" },
              gap: "16px",
              alignItems: "center",
            })}
          >
            {[
              { label: "Debugger", active: true },
              { label: "Library", active: false },
              { label: "Documentation", active: false },
            ].map((tab) => (
              <button
                key={tab.label}
                type="button"
                className={css({
                  border: "none",
                  borderBottomWidth: tab.active ? "2px" : "0",
                  borderBottomStyle: "solid",
                  borderBottomColor: "primaryContainer",
                  backgroundColor: "transparent",
                  color: tab.active ? "primaryContainer" : "onSurfaceVariant",
                  fontFamily: "code",
                  fontSize: "12px",
                  paddingBottom: "4px",
                  cursor: "pointer",
                })}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div
          className={css({
            display: "flex",
            alignItems: "center",
            gap: "8px",
          })}
        >
          <button
            type="button"
            className={css({
              border: "none",
              borderRadius: "DEFAULT",
              backgroundColor: "primaryContainer",
              color: "onPrimary",
              height: "32px",
              paddingX: "10px",
              fontFamily: "code",
              fontSize: "11px",
              whiteSpace: "nowrap",
              cursor: "pointer",
            })}
          >
            Start Debugging
          </button>

          {[
            { label: "설정", Icon: SettingsIcon },
            { label: "도움말", Icon: HelpCircleIcon },
            { label: "계정", Icon: AccountCircleIcon },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              aria-label={item.label}
              className={css({
                width: "28px",
                height: "28px",
                border: "none",
                borderRadius: "full",
                backgroundColor: "transparent",
                color: "primary",
                cursor: "pointer",
                transition: ICON_MOTION.transition.interactive,
                _hover: ICON_HOVER_TOKENS.ghost,
              })}
            >
              <item.Icon className={css(ICON_STYLE.action)} />
            </button>
          ))}
        </div>
      </header>

      <div
        className={css({
          display: "flex",
          minHeight: "0",
          flex: 1,
        })}
      >
        <aside
          className={css({
            width: "220px",
            display: { base: "none", md: "flex" },
            flexDirection: "column",
            borderRightWidth: "1px",
            borderRightStyle: "solid",
            borderRightColor: "outlineVariant",
            backgroundColor: "#f6f6f7",
            padding: "12px",
            gap: "6px",
            flexShrink: 0,
          })}
        >
          {leftMenus.map((menu) => {
            const isActive = menu.label === "Debugger";

            return (
              <button
                key={menu.label}
                type="button"
                className={css({
                  border: "none",
                  borderRadius: "DEFAULT",
                  height: "34px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  paddingX: "10px",
                  fontFamily: "code",
                  fontSize: "12px",
                  color: isActive ? "primaryContainer" : "onSurfaceVariant",
                  backgroundColor: isActive ? "surfaceContainerLowest" : "transparent",
                  boxShadow: isActive ? "0 1px 2px rgba(0, 0, 0, 0.08)" : "none",
                  cursor: "pointer",
                  transition: ICON_MOTION.transition.interactive,
                })}
              >
                <span className={css({ marginRight: "8px", display: "inline-flex" })}>
                  <menu.Icon className={css(ICON_STYLE.nav)} />
                </span>
                {menu.label}
              </button>
            );
          })}
        </aside>

        <main
          className={css({
            flex: 1,
            minWidth: "0",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "surfaceContainerLowest",
          })}
        >
          <div
            className={css({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
              borderBottomColor: "outlineVariant",
              paddingX: { base: "8px", md: "24px" },
              paddingY: "8px",
              gap: "10px",
              overflowX: "auto",
              backgroundColor: "surfaceBright",
            })}
          >
            <div className={css({ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 })}>
              {controls.map((control) => (
                <button
                  key={control.label}
                  type="button"
                  className={css({
                    borderWidth: control.active ? "1px" : "0",
                    borderStyle: "solid",
                    borderColor: "primary",
                    borderRadius: "DEFAULT",
                    height: "30px",
                    paddingX: "10px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: control.active ? "surfaceContainerLowest" : "transparent",
                    color: control.label === "정지" ? "error" : "onSurface",
                    fontFamily: "code",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    transition: ICON_MOTION.transition.interactive,
                  })}
                >
                  <control.Icon className={css(ICON_STYLE.control)} />
                  <span>{control.label}</span>
                </button>
              ))}

              <label
                className={css({
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  height: "30px",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "outline",
                  borderRadius: "DEFAULT",
                  paddingX: "8px",
                  color: "onSurface",
                  fontFamily: "code",
                  fontSize: "12px",
                })}
              >
                <span>자동 실행</span>
                <input defaultValue={5} type="range" min={1} max={10} />
              </label>
            </div>
          </div>

          <div
            className={css({
              display: "flex",
              flex: 1,
              minHeight: "0",
              flexDirection: { base: "column", lg: "row" },
            })}
          >
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
              <div className={css({ height: "4px", backgroundColor: "surfaceContainerHigh" })}>
                <div
                  className={css({
                    width: "36%",
                    height: "100%",
                    backgroundColor: "primaryContainer",
                  })}
                />
              </div>

              <div
                className={css({
                  display: "grid",
                  gridTemplateColumns: "44px 1fr",
                  gap: "10px",
                  padding: "12px",
                  overflow: "auto",
                  fontFamily: "code",
                  fontSize: "14px",
                  lineHeight: 1.5,
                })}
              >
                <div
                  className={css({
                    color: "outline",
                    textAlign: "right",
                    userSelect: "none",
                    borderRightWidth: "1px",
                    borderRightStyle: "solid",
                    borderRightColor: "outlineVariant",
                    paddingRight: "10px",
                  })}
                >
                  {codeLines.map((item) => (
                    <div
                      key={`line-no-${item.line}`}
                      className={css({
                        height: "24px",
                        color: item.active ? "primaryContainer" : "outline",
                        fontWeight: item.active ? 700 : 400,
                      })}
                    >
                      {item.line}
                    </div>
                  ))}
                </div>

                <div>
                  {codeLines.map((item) => (
                    <div
                      key={`line-${item.line}`}
                      className={css({
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        paddingX: item.active ? "8px" : "0",
                        marginLeft: item.active ? "-8px" : "0",
                        borderLeftWidth: item.active ? "2px" : "0",
                        borderLeftStyle: "solid",
                        borderLeftColor: "primaryContainer",
                        backgroundColor: item.active ? "surfaceContainerHigh" : "transparent",
                        color: "onSurface",
                        whiteSpace: "pre",
                      })}
                    >
                      {item.code}
                    </div>
                  ))}
                </div>
              </div>
            </section>

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
                <SparkIcon className={css(ICON_STYLE.control)} />
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
                {vars.map((item) => (
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
                      <strong className={css({ color: item.tone === "primary" ? "primary" : "secondary" })}>
                        {item.value}
                      </strong>
                      <span className={css({ color: "outline" })}>({item.kind})</span>
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <section
            className={css({
              height: { base: "180px", md: "200px" },
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
                <BackspaceIcon className={css(ICON_STYLE.control)} />
              </button>
            </div>

            <div
              className={css({
                padding: "12px",
                fontFamily: "code",
                fontSize: "12px",
                color: "onSurface",
              })}
            >
              <span className={css({ color: "outline", marginRight: "8px" })}>[09:41:22]</span>
              <span>실행 시작됨...</span>
            </div>
          </section>
        </main>
      </div>

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
    </div>
  );
}
