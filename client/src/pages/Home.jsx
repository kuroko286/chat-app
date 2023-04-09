import React, { useEffect, useState } from "react";
import ConnectionState from "../components/ConnectionState";
import ConnectionManager from "../components/ConnectionManager";
import ChatForm from "../components/ChatForm";

function Home() {
  // const [connected, setConnected] = useState(false);

  // useEffect(() => {
  //   // some auth process here before connected.
  //   setConnected(true);
  //   socket.connect();
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);
  // const handleConnect = () => {
  //   setConnected(true);
  //   socket.connect();
  // };
  // const handleDisconnect = () => {
  //   setConnected(false);
  //   socket.disconnect();
  // };
  return (
    <div className="flex flex-col gap-8 justify-start items-center">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      {/* <ConnectionState connected={connected}></ConnectionState>
      <ConnectionManager
        handleConnect={handleConnect}
        handleDisconnect={handleDisconnect}
      ></ConnectionManager> */}
      <ChatForm></ChatForm>
    </div>
  );
}

export default Home;
