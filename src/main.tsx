import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ApolloApp from "./ApolloApp";
import "./index.css";
import MainLayout from "./layout/MainLayout";
import Counter from "./pages/Counter";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Tasks from "./pages/Tasks";
import User from "./pages/User";
import Users from "./pages/Users";
import { store } from "./state/store";
import PrintQuote from "./pages/PrintQuote";
import Quotes from "./pages/Quotes";

const router = createBrowserRouter([
  {
    element: <ApolloApp />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/quotes/printQuote",
        element: <PrintQuote />,
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
          {
            path: "/counter",
            element: <Counter />,
          },
          {
            path: "/quotes",
            element: <Quotes />,
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
    <ReduxProvider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </ReduxProvider>
  </React.StrictMode>,
);
