import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Layout from "../layout/Layout";

function AppRoutes() {
  return (
    <Routes path="/" element={<Layout></Layout>}>
      <Route index element={<Home></Home>}></Route>
    </Routes>
  );
}

export default AppRoutes;
