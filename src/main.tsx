import { createRoot } from "react-dom/client";

import "../styled-system/styles.css";

import App from "./App.tsx";
import { ApplicationProvider } from "./app/provider/ApplicationProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ApplicationProvider>
    <App />
  </ApplicationProvider>,
);
