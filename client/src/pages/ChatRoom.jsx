import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChatForm from "../components/ChatForm";
import { UserContext } from "../context/UserContext";
import { useCookies } from "react-cookie";
import { getAllFriend } from "../api";
import socketIOClient from "socket.io-client";
import { getAllMessage, sendMessage } from "../api";

function ChatRoom() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [currentFriendId, setCurrentFriendId] = useState("");
  const [dialog, setDialog] = useState([]);
  const [message, setMessage] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect("http://localhost:8000");
    socketRef.current.emit("user-connected", user);
    socketRef.current.on("getUsers", (users) => {
      console.log(users);
    });
    socketRef.current.on("get-message", ({ text, fromUser, toUser }) => {
      setDialog([
        ...dialog,
        {
          fromId: fromUser.userId,
          message: text,
          fromUsername: fromUser.username,
        },
      ]);
      console.log({ fromUser, text, toUser });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  useEffect(() => {
    getAllFriend(user._id)
      .then((res) => {
        setFriends(res.data);
        setCurrentFriendId(res.data[0].id);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    getAllMessage(user._id, currentFriendId)
      .then((res) =>
        res.data.map((mess) => {
          return {
            message: mess.text,
            fromId: mess.from,
            fromUsername: mess.fromUsername,
          };
        })
      )
      .then((res) => setDialog(res))
      .catch((err) => console.log(err));
  }, [currentFriendId]);

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
  const handleLogout = () => {
    setUser(null);
    removeCookie("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-8 justify-start items-center w-2/3 shadow-2xl m-auto border-2 rounded-2xl mt-8 py-8 px-[5%]">
      <button>
        <Link to={"/friends"}>Add friend now</Link>
      </button>
      <h1 className="text-3xl font-bold underline italic">
        Hello {user?.username || "Guest"}!
      </h1>
      {friends.length === 0 ? (
        <h4>You have no friend @_@</h4>
      ) : (
        <>
          <div className="flex gap-4 w-full">
            <div>
              <h5>Current friends</h5>
              <ul className="flex flex-col gap-2">
                {friends.map((friend) => (
                  <li>
                    <button
                      onClick={() => {
                        setCurrentFriendId(friend.id);
                      }}
                    >
                      {friend.username}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <ChatForm dialog={dialog}></ChatForm>
          </div>
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
        </>
      )}

      {!!user || (
        <div>
          <button>
            <Link to={"/login"}>Login</Link>
          </button>
          <button>
            <Link to={"/register"}>Sign in</Link>
          </button>
        </div>
      )}
      {!!user && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
}

export default ChatRoom;