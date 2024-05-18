import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getUserId, getUserName, logout } from "../utils/AuthHelper";

export default function Header() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  useEffect(() => {
    setUsername(getUserName());
    setUserId(getUserId());
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <>
      <div className="m-1">
        <div className="flex justify-between">
          <div></div>
          <div className="flex">
            <span className="my-auto mr-2">{username}</span>
            <div className="dropdown">
              <i
                className="bi bi-person-circle text-4xl dropdown-toggle cursor-pointer after:hidden"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></i>
              <div className="dropdown-menu">
                <div className="grid grid-cols-1">
                  <span className="mx-auto">{username}</span>
                  <button
                    type="button"
                    className="btn btn-outline-primary mx-2"
                  >
                    <Link to={`/users/${userId}`}>View Profile</Link>
                  </button>
                </div>
                <div className="dropdown-divider"></div>
                <ul>
                  <li>
                    <a
                      className="dropdown-item cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
