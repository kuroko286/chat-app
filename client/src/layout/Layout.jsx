import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col gap-8 justify-start items-center">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Outlet></Outlet>
    </div>
  );
}

export default Layout;
