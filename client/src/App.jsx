import { useContext, useEffect, useRef } from "react";
import { UserContext } from "./context/UserContext";
import AppRoutes from "./route/AppRoutes";

function App() {
  return (
    <div className="App">
      <AppRoutes></AppRoutes>
    </div>
  );
}

export default App;
