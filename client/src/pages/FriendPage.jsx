import React, { useContext, useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import { UserContext } from "../context/UserContext";
import { addFriend, getAllFriend, getAllUser, getUserById } from "../api";

function FriendPage() {
  const [user] = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [strangers, setStrangers] = useState([]);
  const [adding, setAdding] = useState(false);

  const handleAddFriend = async (id) => {
    setAdding(true);
    try {
      await addFriend(user._id, id).then(() =>
        console.log("Add friend success.")
      );
    } catch (error) {
      console.log(error);
    }
    setAdding(false);
  };
  useEffect(() => {
    async function fetchData() {
      const _friends = await getAllFriend(user._id).then((res) => res.data);
      const _users = await getAllUser().then((res) => res.data);
      setFriends(_friends);
      setStrangers(
        _users.filter((u) => {
          const isFriend = _friends.some((f) => f.id === u._id);
          const isSelf = u._id === user._id;
          return !isFriend && !isSelf;
        })
      );
    }
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <h2>Friends</h2>
        <ul className="grid grid-cols-4 gap-12">
          {friends.map((friend) => (
            <li>
              <UserCard
                isFriend={true}
                user={friend}
                key={friend.id}
              ></UserCard>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Suggest friends</h2>
        <ul className="grid grid-cols-4 gap-12">
          {strangers.map((u) => (
            <li>
              <UserCard
                isFriend={false}
                user={u}
                key={u._id}
                onClick={async () => {
                  handleAddFriend(u._id);
                }}
              ></UserCard>
            </li>
          ))}
        </ul>
        {adding ? <p>Adding...</p> : ""}
      </div>
    </div>
  );
}

export default FriendPage;
