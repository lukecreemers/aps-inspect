import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./app/providers/UserProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
