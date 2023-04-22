import React, { useState } from "react";
import { register } from "../api";
import { Link, useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // handle form submission logic here.
    const response = await register({
      username,
      email,
      password,
    });
    if (response.status === 200) {
      console.log("200");
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-md">
      <label className="block mb-2">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-400 p-2 rounded-md w-full"
        />
      </label>
      <label className="block mb-2">
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-400 p-2 rounded-md w-full"
        />
      </label>
      <label className="block mb-2">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-400 p-2 rounded-md w-full"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Register
      </button>
      <div className="text-center mt-4">
        Have an account?{" "}
        <Link to="/login" className="underline">
          Login
        </Link>
      </div>
    </form>
  );
}

export default RegisterForm;
