import { App } from "./App.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement).render(
  // TODO: remove StrictMode
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
