import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../layout/Layout";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import ChatRoom from "../pages/ChatRoom";
import RequiredAuth from "../components/RequiredAuth";
import FriendPage from "../pages/FriendPage";

function AppRoutes() {
  return (
    <Routes path="/" element={<Layout></Layout>}>
      <Route index element={<Home></Home>}></Route>
      <Route path="/register" element={<RegisterForm></RegisterForm>}></Route>
      <Route path="/login" element={<LoginForm></LoginForm>}></Route>
      <Route path="/" element={<RequiredAuth></RequiredAuth>}>
        <Route path="/chat" element={<ChatRoom></ChatRoom>}></Route>
        <Route path="/friends" element={<FriendPage></FriendPage>}></Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
