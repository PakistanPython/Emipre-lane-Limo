import React from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <GoogleOAuthProvider clientId="190978031330-5r8ilt7gd9pde0gi6t0sk9d6184b5ofp.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
