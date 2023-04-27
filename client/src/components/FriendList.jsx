import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import useFriends from "../hooks/useFriends";
import FriendItem from "./FriendItem";
import { SocketContext } from "../context/SocketContext";

function FriendList({ currentFriendId, changeFriend, socket }) {
  const [friends, setFriends] = useFriends();
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [user] = useContext(UserContext);
  // const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("getUsers", (users) => {
      setOnlineFriends(
        user.friends.filter((f) => users.some((u) => u.userId === f.id))
      );
    });
    return () => {
      socket.off("getUsers");
    };
  }, []);
  return (
    <ul className="flex flex-col gap-2">
      {friends.map((friend) => (
        <FriendItem
          key={friend.id}
          username={friend.username}
          online={onlineFriends.some((of) => of.id === friend.id)}
          onchat={friend.id === currentFriendId}
          handleClick={() => changeFriend(friend.id)}
        ></FriendItem>
      ))}
    </ul>
  );
}

export default FriendList;
