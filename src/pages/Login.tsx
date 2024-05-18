import { useMutation } from "@apollo/client";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BackgroundImage from "../assets/login-background.jpg";
import { CREATE_USER_MUTATION, LOGIN_MUTATION } from "../queries/userQueries";
import { getUser, saveUser } from "../utils/AuthHelper";

export default function Login() {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState("login");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    if (getUser()) {
      navigate("/");
    }
  }, []);
  const [callCreateUser] = useMutation(CREATE_USER_MUTATION, {
    variables: {
      user: {
        email: newEmail,
        password: newPassword,
      },
    },
  });
  const [callLogin] = useMutation(LOGIN_MUTATION, {
    variables: {
      email,
      password,
    },
  });

  function submitSignupForm() {
    if (
      newEmail &&
      newPassword &&
      confirmPassword &&
      newPassword === confirmPassword
    ) {
      callCreateUser();
    }
  }

  async function handleSubmitLogin(event: FormEvent) {
    event.preventDefault();
    if (email && password) {
      const { data } = await callLogin();
      const user = data?.login;
      if (user) {
        saveUser(user);
        navigate("/");
      }
    }
  }

  return (
    <div
      className="h-screen grid grid-cols-1 gap-4"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="place-self-center card">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item grow text-center hover:cursor-pointer">
              <a
                className={`nav-link ${activeCard === "login" && "active"}`}
                onClick={() => setActiveCard("login")}
              >
                Login
              </a>
            </li>
            <li className="nav-item grow text-center hover:cursor-pointer">
              <a
                className={`nav-link ${activeCard === "signup" && "active"}`}
                onClick={() => setActiveCard("signup")}
              >
                Signup
              </a>
            </li>
          </ul>
        </div>
        {activeCard === "login" ? (
          <div className="card-body">
            <form onSubmit={handleSubmitLogin}>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="form-control mb-2"
                tabIndex={1}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // onKeyUp={(e) => e.key === "Enter" && handleSubmitLogin()}
              />
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control mb-2"
                tabIndex={2}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // onKeyUp={(e) => e.key === "Enter" && handleSubmitLogin()}
              />
              <div className="mt-3 flex justify-between">
                <a href="#" className="lh-lg">
                  Forgot Password?
                </a>
                <button
                  type="submit"
                  className="btn btn-primary"
                  tabIndex={3}
                  // onClick={handleSubmitLogin}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="card-body">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="form-control mb-2"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && submitSignupForm()}
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control mb-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && submitSignupForm()}
            />
            <label htmlFor="password2" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="password2"
              className="form-control mb-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && submitSignupForm()}
            />
            <div className="mt-3 flex">
              <button
                type="submit"
                className="btn btn-primary grow"
                onClick={submitSignupForm}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
