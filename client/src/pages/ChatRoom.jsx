import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";
import { UserContext } from "../context/UserContext";
import { useCookies } from "react-cookie";
import socketIOClient from "socket.io-client";
import { getAllMessage, sendMessage } from "../api";
import FriendList from "../components/FriendList";

function ChatRoom() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [currentFriendId, setCurrentFriendId] = useState(user.friends[0].id);
  const [dialog, setDialog] = useState([]);
  const [message, setMessage] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const socketRef = useRef();

  useEffect(() => {
    setCurrentFriendId(user.friends[0].id);
  }, []);
  useEffect(() => {
    currentFriendId &&
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
  useEffect(() => {
    socketRef.current = socketIOClient.connect("http://localhost:8000");
    socketRef.current.emit("user-connected", user);
    socketRef.current.on("getUsers", (users) => {
      setOnlineFriends(
        user.friends.filter((f) => users.some((u) => u.userId === f.id))
      );
    });

    socketRef.current.on("get-message", ({ text, fromUser, toUser }) => {
      if (currentFriendId === fromUser.userId) {
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
      socketRef.current.off("getUsers");
      socketRef.current.off("get-message");
      socketRef.current.disconnect();
    };
  }, []);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const changeCurrentFriend = (id) => {
    setCurrentFriendId(id);
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
      {user.friends.length === 0 ? (
        <h4>You have no friend @_@</h4>
      ) : (
        <>
          <div className="flex gap-4 w-full">
            <div>
              <h5>Current friends</h5>
              <FriendList
                friends={user.friends}
                onlineFriends={onlineFriends}
                currentFriendId={currentFriendId}
                changeFriend={changeCurrentFriend}
              ></FriendList>
            </div>
            <ChatContainer dialog={dialog}></ChatContainer>
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
