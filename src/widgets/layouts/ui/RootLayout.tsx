import { Outlet, useLocation } from "react-router-dom";

import { ROUTE_PATHS } from "@/shared";

import { css } from "../../../../styled-system/css";
import { Header } from "../components";

type ActiveTab = "Debugger" | "Library";

const ROUTE_HEADER_CONFIG: Record<string, { activeTab?: ActiveTab; sticky?: boolean }> = {
  [ROUTE_PATHS.MAIN]: { sticky: true },
  [ROUTE_PATHS.DEBUGGER]: { activeTab: "Debugger" },
  [ROUTE_PATHS.EXAMPLES]: { activeTab: "Library" },
};

export const RootLayout = () => {
  const { pathname } = useLocation();
  const headerProps = ROUTE_HEADER_CONFIG[pathname] ?? {};

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
      })}
    >
      <Header {...headerProps} />
      <div
        className={css({
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
        })}
      >
        <Outlet />
      </div>
    </div>
  );
};
