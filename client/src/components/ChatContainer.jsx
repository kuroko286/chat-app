import React, { useRef, useState, useEffect, useContext } from "react";
import MessageLine from "./MessageLine";
import { getAllMessage, sendMessage } from "../api";

function ChatContainer({ dialog }) {
  const bottomRef = useRef();
  const [message, setMessage] = useState("");
  const [dialog, setDialog] = useState([]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setDialog([
      ...dialog,
      {
        message: message,
        fromId: user._id,
        fromUsername: user.username,
      },
    ]);
    sendMessage(user._id, currentFriendId, message);
    setMessage("");
    socketRef.current.emit("send-message", {
      fromId: user._id,
      toId: currentFriendId,
      text: message,
    });
  };

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

export default ChatContainer;
