import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";
import { UserContext } from "../context/UserContext";
import { useCookies } from "react-cookie";
import { getAllFriend } from "../api";
import socketIOClient from "socket.io-client";
import { getAllMessage, sendMessage } from "../api";
import FriendList from "../components/FriendList";

const useFriends = () => {
  const [user, setUser] = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    getAllFriend(user._id)
      .then((res) => setFriends(res.data))
      .catch((err) => console.log(err));
  }, []);
  return [friends, setFriends];
};

export default useFriends;
