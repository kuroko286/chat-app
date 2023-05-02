import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useReducer,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";
import { UserContext } from "../context/UserContext";
import { useCookies } from "react-cookie";
import { getAllMessage, sendMessage } from "../api";
import FriendList from "../components/FriendList";
import socket from "../../socket";
import ChatInput from "../components/ChatInput";
import messageReducer from "../reducer/messageReducer";

function ChatRoom() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [currentFriend, setCurrentFriend] = useState(user.friends[0]);
  const [dialog, dispatch] = useReducer(messageReducer, []);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isTyping, setIsTyping] = useState(false); // notice other user are typing.

  useEffect(() => {
    currentFriend &&
      getAllMessage(user._id, currentFriend.id)
        .then((res) =>
          dispatch({
            type: "LOAD_MESSAGE_SUCCESS",
            payload: res.data,
          })
        )
        .catch((err) =>
          dispatch({
            type: "LOAD_MESSAGE_ERROR",
            payload: err,
          })
        );
  }, [currentFriend]);

  useEffect(() => {
    socket.connect();
    socket.emit("user-connected", user);
    socket.on("getUsers", (users) => {
      setOnlineFriends(
        user.friends.filter((f) => users.some((u) => u.userId === f.id))
      );
    });

    socket.on("get-message", ({ text, fromUser, toId }) => {
      if (currentFriend.id === fromUser.userId || currentFriend.id === toId) {
        dispatch({
          type: "SEND_MESSAGE",
          payload: { message: text, fromUser },
        });
      }
    });
    socket.on("typing", () => {
      setIsTyping(true);
    });

    socket.on("stop typing", () => {
      setIsTyping(false);
    });

    return () => {
      socket.emit("disconn");
      socket.off("get-message");
      socket.off("getUsers");
      socket.off("typing");
      socket.off("stop typing");
    };
  }, []);

  const changeCurrentFriend = (friend) => {
    setCurrentFriend(friend);
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
        Hello world {user?.username || "Guest"}!
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
                currentFriendId={currentFriend.id}
                changeFriend={changeCurrentFriend}
              ></FriendList>
            </div>
            <ChatContainer
              dialog={dialog}
              isTyping={isTyping}
              fromUser={currentFriend}
            ></ChatContainer>
          </div>
          <ChatInput
            currentFriend={currentFriend}
            dispatch={dispatch}
          ></ChatInput>
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
