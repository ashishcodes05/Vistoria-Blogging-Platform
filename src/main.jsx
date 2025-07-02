import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Pages/Home.jsx";
import Blog from "./Pages/Blog.jsx";
import Layout from "./Pages/Admin/Layout.jsx";
import Dashboard from "./Pages/Admin/Dashboard.jsx";
import ListBlog from "./Pages/Admin/ListBlog.jsx";
import Comments from "./Pages/Admin/Comments.jsx";
import AddBlog from "./Pages/Admin/AddBlog.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      }, 
      {
        path: "/blog/:id",
        element: <Blog />,
      },
      {
        path: "/admin",
        element: <Layout />,
        children: [
          {
            path: "/admin/addBlog",
            element: <AddBlog />,
          },
          {
            path: "/admin",
            element: <Dashboard />,
          },
          {
            path: "/admin/listblog",
            element: <ListBlog />,
          },
          {
            path: "/admin/comments",
            element: <Comments />,
          }
        ]
      }
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
