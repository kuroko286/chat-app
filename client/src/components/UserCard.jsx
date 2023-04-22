import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { addFriend } from "../api";

function UserCard(props) {
  const { user, isFriend, onClick } = props;
  const [_user, setUser] = useContext(UserContext);
  const handleAddFriend = async () => {
    try {
      await addFriend(_user._id, user._id);
      setUser(_user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <img src="/user.svg" alt="user" className="w-16 h-16"></img>
      <p>{props.user.username}</p>
      {isFriend ? (
        <button>Friend</button>
      ) : (
        <button onClick={handleAddFriend}>Add friend</button>
      )}
    </div>
  );
}

export default UserCard;
