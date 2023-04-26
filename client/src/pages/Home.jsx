import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Home() {
  const handleLogout = () => {
    setUser(null);
  };
  const [user] = useContext(UserContext);

  return (
    <div className="flex flex-col gap-8 justify-start items-center w-2/3 shadow-2xl m-auto border-2 rounded-2xl mt-8 py-8 px-[5%]">
      <h2 className="text-2xl font-semibold">Home page</h2>
      <Link to={"/chat"}>Join chat room</Link>
    </div>
  );
}

export default Home;
