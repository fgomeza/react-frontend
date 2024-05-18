import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    { name: "Tasks", path: "/tasks" },
    { name: "Users", path: "/users" },
  ];

  return (
    <div className="mt-8">
      <ul className="list-disc p-8">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) => {
                return isActive ? "text-cyan-600" : "";
              }}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
