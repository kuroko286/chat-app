import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col gap-8 justify-start items-center">
      <Outlet></Outlet>
    </div>
  );
}

export default Layout;
