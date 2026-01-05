import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PageService } from "./screens/PageService";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <PageService />
  </StrictMode>,
);
