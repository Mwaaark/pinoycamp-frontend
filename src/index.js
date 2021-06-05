import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/auth-context";
import "bootstrap/dist/css/bootstrap.min.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import "./stars.css";
import App from "./App";

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
