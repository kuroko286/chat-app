import React, { useState } from "react";
import { authUser } from "../api";
function Auth({ setIsAuth, setUser }) {
  const [username, setUsername] = useState("");

  function handleInputChange(event) {
    setUsername(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // Do something with the input value
    const authResult = await authUser(username);
    setIsAuth(authResult.data.isValid);
    setUser(username);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={handleInputChange}
        placeholder="Enter username"
        className="border-2"
      />
      <button type="submit" className="text-black bg-slate-300">
        Submit
      </button>
    </form>
  );
}

export default Auth;
