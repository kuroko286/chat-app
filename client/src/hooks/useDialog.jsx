import { useContext, useEffect, useState } from "react";
import { getAllMessage } from "../api";
import { UserContext } from "../context/UserContext";

const useDialog = (currentFriendId) => {
  const [user, setUser] = useContext(UserContext);
  const [dialog, setDialog] = useState([]);

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
  return [dialog, setDialog];
};

export default useDialog;
