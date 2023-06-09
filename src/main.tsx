import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "app/app";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
    <div id="portal-root" className="relative z-10" />
  </StrictMode>
);
