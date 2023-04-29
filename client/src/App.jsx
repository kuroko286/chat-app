import { createContext, useContext, useEffect, useState } from "react";

import Home from "./pages/Home";
import AppRoutes from "./route/AppRoutes";
import { UserContext } from "./context/UserContext";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:8000");
export const SocketContext = createContext();

function App() {
  const [user] = useContext(UserContext);

  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <AppRoutes></AppRoutes>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
