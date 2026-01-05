import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PagePublic } from "./screens/PagePublic";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <PagePublic />
  </StrictMode>,
);
