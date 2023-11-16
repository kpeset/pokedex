import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ExportContext from "./contexts/Context";
import "./styles/app.css";
import "./styles/nav.css";
import "./styles/footer.css";
import "./styles/pokedex.css";
import "./styles/card.css";
import "./styles/search_bar.css";
import "./styles/backoffice.css";
import "./styles/register.css";
import "./styles/messages.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ExportContext.Provider>
        <App />
      </ExportContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
