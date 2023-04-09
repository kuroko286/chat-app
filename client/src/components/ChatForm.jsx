import React, { useRef, useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

function ChatForm() {
  const socketRef = useRef();
  const [message, setMessage] = useState("");
  const [dialog, setDialog] = useState([]);

  useEffect(() => {
    socketRef.current = socketIOClient.connect("http://localhost:8000");
    socketRef.current.on("chat", (message) => {
      setDialog((dialog) => [...dialog, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDialog((dialog) => [...dialog, message]);
    setMessage("");
    socketRef.current.emit("send-chat", message);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col
       gap-8 justify-start items-center"
    >
      <textarea
        placeholder="Enter something..."
        onChange={handleChange}
        value={message}
      ></textarea>
      <button onClick={handleSubmit}>Send</button>
      <ul>
        {dialog.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </form>
  );
}

export default ChatForm;
