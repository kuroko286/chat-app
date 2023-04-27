import socketIOClient from "socket.io-client";

export const getSocket = () => {
  return socketIOClient.connect("http://localhost:8000");
};
