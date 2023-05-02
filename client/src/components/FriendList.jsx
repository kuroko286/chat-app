import React from "react";
import FriendItem from "./FriendItem";

function FriendList({ friends, onlineFriends, currentFriendId, changeFriend }) {
  return (
    <ul className="flex flex-col gap-2">
      {friends.map((friend) => (
        <FriendItem
          key={friend.id}
          username={friend.username}
          online={onlineFriends.some((of) => of.id === friend.id)}
          onchat={friend.id === currentFriendId}
          handleClick={() => changeFriend(friend)}
        ></FriendItem>
      ))}
    </ul>
  );
}

export default FriendList;
