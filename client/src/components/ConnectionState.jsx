import React from "react";

function ConnectionState({ connected }) {
  return (
    <h5
      className={`font-semibold text-xl ${
        connected ? "text-green-700" : "text-red-700"
      }`}
    >
      {connected ? "Connected!" : "Not connect."}
    </h5>
  );
}

export default ConnectionState;
