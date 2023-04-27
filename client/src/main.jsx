import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/UserContext";
import { CookiesProvider } from "react-cookie";
import SocketProvider from "./context/SocketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <UserProvider>
        {/* <SocketProvider> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
        {/* </SocketProvider> */}
      </UserProvider>
    </CookiesProvider>
  </React.StrictMode>
);
