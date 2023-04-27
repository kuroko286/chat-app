import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";
import { UserContext } from "../context/UserContext";
import { useCookies } from "react-cookie";
import FriendList from "../components/FriendList";
import socketIOClient from "socket.io-client";

function ChatRoom() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [currentFriendId, setCurrentFriendId] = useState("");
  const socketRef = useRef();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    socketRef.current = socketIOClient.connect("http://localhost:8000");
    socketRef.current.emit("user-connected", user);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  const changeCurrentFriend = (id) => {
    setCurrentFriendId(id);
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

      <>
        <div className="flex gap-4 w-full">
          <div>
            <h5>Current friends</h5>
            <FriendList
              currentFriendId={currentFriendId}
              changeFriend={changeCurrentFriend}
              socket={socketRef.current}
            ></FriendList>
          </div>
          <ChatContainer
            currentFriendId={currentFriendId}
            socket={socketRef.current}
          ></ChatContainer>
        </div>
      </>

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
