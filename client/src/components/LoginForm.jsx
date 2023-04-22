import React, { useContext, useState } from "react";
import { getUserById, login } from "../api";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [cookies, setCookie] = useCookies(["token"]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // code to submit login form
    const response = await login({ username, password });
    const { token, userId } = response.data;
    const user = (await getUserById(userId)).data;
    setUser(user);
    setCookie("token", token);
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="username"
      >
        Username:
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="password"
      >
        Password:
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
      <div className="text-center mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="underline">
          Register
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
