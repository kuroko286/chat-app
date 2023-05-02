import React, { useContext, useEffect, useState, useRef } from "react";
import { getAllMessage, sendMessage } from "../api";
import socket from "../../socket";
import { UserContext } from "../context/UserContext";

function ChatInput({ currentFriend, dispatch }) {
  const [message, setMessage] = useState("");
  const typingRef = useRef(false); // notice current user typing.
  const timerRef = useRef();
  const [user, setUser] = useContext(UserContext);
  const handleChange = (event) => {
    setMessage(event.target.value);
    clearTimeout(timerRef.current);
    if (!typingRef.current) {
      typingRef.current = true;
      socket.emit("user typing", {
        toId: currentFriend.id,
      });
    }
    const lastTypingTime = Date.now();
    const limitStopTypingTime = 3000;
    timerRef.current = setTimeout(() => {
      const now = Date.now();
      const exceedStopTime = now - lastTypingTime >= limitStopTypingTime;
      if (exceedStopTime && typingRef.current) {
        typingRef.current = false;
        socket.emit("user stop typing", {
          toId: currentFriend.id,
        });
      }
    }, limitStopTypingTime);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: "SEND_MESSAGE",
      payload: { message, fromUser: user },
    });

    sendMessage(user._id, currentFriend.id, message);
    setMessage("");
    socket.emit("send-message", {
      fromId: user._id,
      toId: currentFriend.id,
      text: message,
    });
  };
  return (
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
  );
}

export default ChatInput;
