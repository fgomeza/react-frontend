import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { getUser } from "../utils/AuthHelper";
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
    <div className="tw-h-screen tw-flex">
      <div className="card tw-w-44 overflow-auto">
        <Sidebar />
      </div>
      <div className="tw-flex tw-flex-col tw-w-full overflow-auto">
        <div className="tw-relative card">
          <Header />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
