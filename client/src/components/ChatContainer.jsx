import React, { useContext, useEffect, useRef, useState } from "react";
import MessageLine from "./MessageLine";
import { sendMessage } from "../api";
import useDialog from "../hooks/useDialog";

import { UserContext } from "../context/UserContext";
import { v4 as uuidv4 } from "uuid";
import { SocketContext } from "../context/SocketContext";

function ChatContainer({ currentFriendId, socket }) {
  const bottomRef = useRef();
  const [message, setMessage] = useState("");
  const [dialog, setDialog] = useDialog(currentFriendId);
  const [user] = useContext(UserContext);
  // const socket = useContext(SocketContext);

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
    socket.emit("send-message", {
      fromId: user._id,
      toId: currentFriendId,
      text: message,
    });
  };

  useEffect(() => {
    socket.on("get-message", ({ text, fromUser, toUser }) => {
      console.log({ text, fromUser, toUser });
      if (currentFriendId === toUser.userId) {
        setDialog((dialog) => [
          ...dialog,
          {
            fromId: fromUser.userId,
            message: text,
            fromUsername: fromUser.username,
          },
        ]);
      }
    });

    return () => {
      socket.off("get-message");
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [dialog]);

  return currentFriendId ? (
    <div className="w-full">
      <ul className="flex flex-col gap-6 w-full max-h-[450px] overflow-y-auto px-4 py-6 border-2 rounded-2xl min-h-[300px]">
        {dialog.map((item) => (
          <li className="w-full" key={uuidv4()}>
            <MessageLine
              fromId={item.fromId}
              message={item.message}
              fromUsername={item.fromUsername}
            ></MessageLine>
          </li>
        ))}
        <div ref={bottomRef} className="end-message"></div>
      </ul>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col
       gap-8 justify-start items-center w-full"
      >
        <div className="flex md:gap-6 w-full ">
          <input
            type="text"
            placeholder="Enter something..."
            onChange={handleChange}
            value={message}
            className="grow outline-none rounded-3xl px-4 py-2 border-2"
          ></input>
          <button onClick={handleSubmit} className="rounded-3xl">
            Send
          </button>
        </div>
      </form>
    </div>
  ) : (
    <h4>Choose a friend to start send chat.</h4>
  );
}

export default ChatContainer;
