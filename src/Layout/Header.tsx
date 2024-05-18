import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getName, logout } from "../utils/Auth";

export default function Header() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  useEffect(() => {
    setUsername(getName());
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <>
      <div className="m-1">
        <div className="ml-auto flex">
          <span className="my-auto mr-2">{username}</span>
          <div className="dropdown">
            <i
              className="bi bi-person-circle text-4xl dropdown-toggle after:hidden"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            ></i>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
