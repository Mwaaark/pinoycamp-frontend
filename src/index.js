import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/auth-context";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./stars.css";

ReactDOM.render(
  // <React.StrictMode>
  <AuthContextProvider>
    <Router>
      <App />
    </Router>
  </AuthContextProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
