import { Outlet, useLocation } from "react-router-dom";

import { ROUTE_PATHS } from "@/shared";

import { Header } from "../components";

type ActiveTab = "Debugger" | "Library" | "Documentation";

const ROUTE_HEADER_CONFIG: Record<string, { activeTab?: ActiveTab; sticky?: boolean; showSearch?: boolean }> = {
  [ROUTE_PATHS.MAIN]: { activeTab: "Debugger", sticky: true },
  [ROUTE_PATHS.DEBUGGER]: { activeTab: "Debugger" },
  [ROUTE_PATHS.EXAMPLES]: { activeTab: "Library", showSearch: true },
};

export const RootLayout = () => {
  const { pathname } = useLocation();
  const headerProps = ROUTE_HEADER_CONFIG[pathname] ?? {};

  return (
    <div>
      <Header {...headerProps} />
      <Outlet />
    </div>
  );
};
