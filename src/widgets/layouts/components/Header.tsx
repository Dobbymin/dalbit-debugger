import { Link } from "react-router-dom";

import { ROUTE_PATHS } from "@/shared";

import { css } from "../../../../styled-system/css";

type ActiveTab = "Debugger" | "Library";

const NAV_TABS: { label: ActiveTab; path: string }[] = [
  { label: "Debugger", path: ROUTE_PATHS.DEBUGGER },
  { label: "Library", path: ROUTE_PATHS.EXAMPLES },
];

type Props = {
  activeTab?: ActiveTab;
  sticky?: boolean;
};

export const Header = ({ activeTab, sticky = false }: Props) => {
  const headerContent = (
    <>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: { base: "12px", md: "24px" },
          minWidth: 0,
        })}
      >
        <Link
          to={ROUTE_PATHS.MAIN}
          className={css({
            fontFamily: "headline",
            fontWeight: 800,
            fontSize: "18px",
            color: "primaryContainer",
            textDecoration: "none",
            whiteSpace: "nowrap",
          })}
        >
          Dalbit Debugger
        </Link>

        <nav
          className={css({
            display: { base: "none", md: "flex" },
            gap: "16px",
            alignItems: "center",
          })}
        >
          {NAV_TABS.map((tab) => (
            <Link
              key={tab.label}
              to={tab.path}
              className={css({
                borderBottomWidth: "2px",
                borderBottomStyle: "solid",
                borderBottomColor: tab.label === activeTab ? "primaryContainer" : "transparent",
                color: tab.label === activeTab ? "primaryContainer" : "onSurfaceVariant",
                fontFamily: "code",
                fontSize: "12px",
                paddingBottom: "4px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "color 180ms ease, border-color 180ms ease",
                _hover: { color: "primaryContainer", borderBottomColor: "primaryContainer" },
              })}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );

  if (sticky) {
    return (
      <header
        className={css({
          position: "sticky",
          top: 0,
          zIndex: 10,
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255, 255, 255, 0.88)",
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor: "outlineVariant",
        })}
      >
        <div
          className={css({
            maxWidth: "1200px",
            marginX: "auto",
            height: "64px",
            paddingX: "margin",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "gutter",
          })}
        >
          {headerContent}
        </div>
      </header>
    );
  }

  return (
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
      {headerContent}
    </header>
  );
};
