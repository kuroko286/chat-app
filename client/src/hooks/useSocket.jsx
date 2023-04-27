import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import socketIOClient from "socket.io-client";

function useSocket() {
  const socketRef = useRef(socketIOClient.connect("http://localhost:8000"));
  const [user] = useContext(UserContext);
  useEffect(() => {
    try {
      socketRef.current.emit("user-connected", user);
    } catch (error) {
      console.log(error);
    }
    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  return { socketRef };
}

export default useSocket;
