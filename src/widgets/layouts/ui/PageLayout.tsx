import { Outlet } from "react-router-dom";

import { css } from "../../../../styled-system/css";
import { Sidebar } from "../components";

export const PageLayout = () => {
  return (
    <div
      className={css({
        display: "flex",
        flex: 1,
        minHeight: 0,
      })}
    >
      <Sidebar />
      <Outlet />
    </div>
  );
};
