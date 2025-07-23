import React from "react";
import { assets } from "../../assets/assets";
import { Outlet } from "react-router";
import Sidebar from "../../Components/Sidebar";
import { useAppContext } from "../../context/AppContext";
import Error from "../../Components/Error";
import AdminError from "./AdminError";

const Layout = () => {
  const { token } = useAppContext();
  if (!token) {
    return <AdminError />;
  }
  return (
    <>
      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
