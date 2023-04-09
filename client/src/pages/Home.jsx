import React, { useEffect, useState } from "react";
import ChatForm from "../components/ChatForm";
import Auth from "./Auth";
import { Navigate } from "react-router-dom";

function Home() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState("");
  if (!isAuth) {
    return <Auth setIsAuth={setIsAuth} setUser={setUser}></Auth>;
  } else {
    return (
      <div className="flex flex-col gap-8 justify-start items-center w-2/3 shadow-2xl m-auto border-2 rounded-2xl mt-8 py-8 px-[5%]">
        <h1 className="text-3xl font-bold underline italic">Hello world!</h1>
        <ChatForm user={user}></ChatForm>
      </div>
    );
  }
}

export default Home;
