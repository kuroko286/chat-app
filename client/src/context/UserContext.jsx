import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useRef,
} from "react";
import { getUserById, getUserIdByToken } from "../api";
import { useCookies } from "react-cookie";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState();

  const [ready, setReady] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const token = cookies.token;
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getUserIdByToken(token);
        const userId = response.data.userId;
        const res = await getUserById(userId);

        setUser(res.data);
        setReady(true);
      } catch (error) {
        setUser(null);
        setReady(true);
      }
    }
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={[user, setUser]}>
      {ready ? children : null}
    </UserContext.Provider>
  );
}
