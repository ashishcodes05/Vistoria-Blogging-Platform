import React from "react";
import { assets } from "../../assets/assets";
import { Outlet } from "react-router";
import Sidebar from "../../Components/Sidebar";

const Layout = () => {
  return (
    <>
      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet/>
      </div>
    </>
  );
};

export default Layout;
