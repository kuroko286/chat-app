import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

function RequiredAuth() {
  const [user, setUser] = useContext(UserContext);
  if (!user) {
    return <Navigate to={"/login"} replace state={{}}></Navigate>;
  }
  return <Outlet></Outlet>;
}

export default RequiredAuth;
