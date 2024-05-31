import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    { name: "Tasks", path: "/tasks" },
    { name: "Users", path: "/users" },
    { name: "Counter", path: "/counter" },
    { name: "Cotizaciones", path: "/quotes" },
  ];

  return (
    <div className="tw-mt-8">
      <ul className="tw-list-disc tw-pl-8">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) => {
                return isActive ? "tw-text-cyan-600" : "";
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
