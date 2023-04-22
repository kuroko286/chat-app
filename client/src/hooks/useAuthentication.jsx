import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { getUserById, getUserIdByToken } from "../api";
import { useCookies } from "react-cookie";

// not use.
function useAuthentication() {
  const [user, setUser] = useContext(UserContext);

  return [user, setUser];
}

export default useAuthentication;
