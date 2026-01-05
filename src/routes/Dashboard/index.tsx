import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Dashbord } from "./screens/Dashbord";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Dashbord />
  </StrictMode>,
);
