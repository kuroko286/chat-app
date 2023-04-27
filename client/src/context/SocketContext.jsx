import React, {
  useEffect,
  useState,
  createContext,
  useRef,
  useContext,
} from "react";
import socketIOClient from "socket.io-client";
import { UserContext } from "./UserContext";
export const SocketContext = createContext();

export default function SocketProvider({ children }) {
  const [user] = useContext(UserContext);
  const [socket, setSocket] = useState();
  useEffect(() => {
    if (user) {
      const s = socketIOClient.connect("http://localhost:8000");
      setSocket(s);
      s.emit("user-connected", user);
    }
    return () => {
      socket?.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
