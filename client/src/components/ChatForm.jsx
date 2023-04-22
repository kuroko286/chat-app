import React, { useRef, useState, useEffect, useContext } from "react";
import MessageLine from "./MessageLine";

function ChatForm({ dialog }) {
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [dialog]);

  return (
    <ul className=" flex flex-col gap-6 w-full max-h-[450px] overflow-y-auto px-4 py-6 border-2 rounded-2xl">
      {dialog.map((item) => (
        <li className="w-full">
          <MessageLine
            fromId={item.fromId}
            message={item.message}
            fromUsername={item.fromUsername}
          ></MessageLine>
        </li>
      ))}
      <div ref={bottomRef} className="end-message"></div>
    </ul>
  );
}

export default ChatForm;
