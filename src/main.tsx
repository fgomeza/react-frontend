import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ApolloApp from "./ApolloApp";
import MainLayout from "./Layout/MainLayout";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Tasks from "./pages/Tasks";
import User from "./pages/User";
import Users from "./pages/Users";

const router = createBrowserRouter([
  {
    element: <ApolloApp />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        element: <MainLayout />,
        children: [
          {
            path: "/tasks",
            element: <Tasks />,
          },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/users/:userId",
            element: <User />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
);
