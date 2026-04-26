import { Link, useLocation } from "react-router-dom";

import { CodeIcon, DebuggerIcon, HomeIcon, ICON_MOTION, ROUTE_PATHS } from "@/shared";

import { css } from "../../../../styled-system/css";
import { icon } from "../../../../styled-system/recipes";

const NAV_ITEMS = [
  { label: "Home", Icon: HomeIcon, path: ROUTE_PATHS.MAIN },
  { label: "Debugger", Icon: DebuggerIcon, path: ROUTE_PATHS.DEBUGGER },
  { label: "Examples", Icon: CodeIcon, path: ROUTE_PATHS.EXAMPLES },
] as const;

export const Sidebar = () => {
  const { pathname } = useLocation();

  return (
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
      {NAV_ITEMS.map((item) => {
        const isActive = item.path === pathname;
        return (
          <Link
            key={item.label}
            to={item.path}
            className={css({
              borderRadius: "DEFAULT",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingX: "10px",
              fontFamily: "code",
              fontSize: "12px",
              textDecoration: "none",
              color: isActive ? "primaryContainer" : "onSurfaceVariant",
              backgroundColor: isActive ? "surfaceContainerLowest" : "transparent",
              boxShadow: isActive ? "0 1px 2px rgba(0, 0, 0, 0.08)" : "none",
              transition: ICON_MOTION.transition.interactive,
              _hover: {
                color: "primaryContainer",
                backgroundColor: isActive ? "surfaceContainerLowest" : "surfaceContainerLow",
              },
            })}
          >
            <span className={css({ marginRight: "8px", display: "inline-flex" })}>
              <item.Icon className={icon({ usage: "nav" })} />
            </span>
            {item.label}
          </Link>
        );
      })}
    </aside>
  );
};
