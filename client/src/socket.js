import socketIOClient from "socket.io-client";

const SERVER_URL = "http://localhost:8000";

const createConnection = () => {
  return socketIOClient.connect(SERVER_URL);
};

export default createConnection;
