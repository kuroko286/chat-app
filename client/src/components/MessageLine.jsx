import React from "react";

function MessageLine({ username, message, self }) {
  return (
    <div className={`w-full rounded-xl  ${self ? " flex justify-end" : ""}`}>
      <div
        className={`w-[60%] flex flex-col gap-2 px-4 py-2 rounded-3xl ${
          self ? "text-right bg-cyan-300" : "bg-gray-200"
        }`}
      >
        <label className="font-semibold">{username}</label>
        <p className="break-words">{message}</p>
      </div>
    </div>
  );
}

export default MessageLine;
