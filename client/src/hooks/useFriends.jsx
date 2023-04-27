import { useContext, useEffect, useState } from "react";
import { getAllFriend } from "../api";
import { UserContext } from "../context/UserContext";

const useFriends = () => {
  const [user, setUser] = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    async function fetchFriends() {
      try {
        const res = await getAllFriend(user._id);
        setFriends(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFriends();
  }, []);
  return [friends, setFriends];
};

export default useFriends;
