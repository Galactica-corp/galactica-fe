import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "app/app";

console.log(import.meta.env.VITE_EXAMPLE_ENV);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
    <div id="portal-root" />
  </StrictMode>
);
