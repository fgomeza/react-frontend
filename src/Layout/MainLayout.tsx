import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { getUser } from "../utils/Auth";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getUser()) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="h-screen flex">
      <div className="card w-40 overflow-auto">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full overflow-auto">
        <div className="relative card">
          <Header />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
