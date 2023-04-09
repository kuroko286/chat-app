import React, { useRef, useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import MessageLine from "./MessageLine";

function ChatForm({ user }) {
  const socketRef = useRef();
  const [message, setMessage] = useState("");
  const [dialog, setDialog] = useState([]);

  useEffect(() => {
    socketRef.current = socketIOClient.connect("http://localhost:8000");
    socketRef.current.emit("new-user", user);
    socketRef.current.on("chat", (message, user) => {
      setDialog((dialog) => [
        ...dialog,
        { message: message, self: false, user: user },
      ]);
    });

    return () => {
      socketRef.current.disconnect(user);
    };
  }, []);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDialog((dialog) => [
      ...dialog,
      { message: message, self: true, user: "You" },
    ]);
    setMessage("");
    socketRef.current.emit("send-chat", message, user);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col
       gap-8 justify-start items-center w-full"
    >
      <ul className=" flex flex-col gap-6 w-full max-h-[450px] overflow-y-auto px-4 py-6 border-2 rounded-2xl">
        {dialog.map((item) => (
          <li className="w-full">
            <MessageLine
              username={item.user}
              message={item.message}
              self={item.self}
            ></MessageLine>
          </li>
        ))}
      </ul>
      <div className="flex gap-6 w-full">
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

export default ChatForm;
