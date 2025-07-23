import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router";

const Sidebar = () => {
  return (
    <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">
      <div className="flex items-center justify-center gap-2 sm:px-4 rounded-l w-full mb-4">
        <button
          className="flex items-center justify-center cursor-pointer gap-2 px-2 sm:px-4 py-2 rounded-lg bg-primary/20 hover:bg-gray-100 transition-all duration-300"
          onClick={() => window.history.back()}
        >
          <i className="fa-solid fa-arrow-left"></i> <span className="hidden sm:inline-block">Back</span>
        </button>
      </div>
      <NavLink
        end
        to="/admin"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          } `
        }
      >
        <img src={assets.home_icon} alt="" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">DashBoard</p>
      </NavLink>
      <NavLink
        to="/admin/addBlog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          } `
        }
      >
        <img src={assets.add_icon} alt="" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Add Blog</p>
      </NavLink>
      <NavLink
        end
        to="/admin/listBlog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          } `
        }
      >
        <img src={assets.list_icon} alt="" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Blog Lists</p>
      </NavLink>
      <NavLink
        end
        to="/admin/comments"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          } `
        }
      >
        <img src={assets.comment_icon} alt="" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
