import React from "react";

function ConnectionManager({ handleConnect, handleDisconnect }) {
  return (
    <div className="flex gap-8">
      <button onClick={handleConnect}>Connect</button>
      <button onClick={handleDisconnect}>Disconnect</button>
    </div>
  );
}

export default ConnectionManager;
