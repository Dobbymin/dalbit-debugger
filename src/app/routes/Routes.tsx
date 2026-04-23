import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DebuggerPage, ExamplesPage, MainPage, NotFound } from "@/pages";
import { ROUTE_PATHS } from "@/shared";
import { RootLayout } from "@/widgets";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path={ROUTE_PATHS.MAIN} element={<MainPage />} />
          <Route path={ROUTE_PATHS.DEBUGGER} element={<DebuggerPage />} />
          <Route path={ROUTE_PATHS.EXAMPLES} element={<ExamplesPage />} />
          <Route path={ROUTE_PATHS.NOT_FOUND} element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
