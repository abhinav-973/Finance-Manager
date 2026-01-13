import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm transition 
     ${isActive 
       ? "bg-indigo-100 text-indigo-700 font-medium" 
       : "text-gray-600 hover:bg-gray-100"}`;

  return (
    <aside className="w-60 h-screen bg-white border-r px-5 py-6">
      <h2 className="text-xl font-semibold mb-8 text-gray-900">
        Finance Manager
      </h2>

      <nav className="flex flex-col gap-3">
        <NavLink to="/" end className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/expenses" className={linkClass}>
          Expenses
        </NavLink>

        <NavLink to="/split" className={linkClass}>
          Split Expenses
        </NavLink>

        <NavLink to="/groups" className={linkClass}>
          Groups
        </NavLink>

        <NavLink to="/settings" className={linkClass}>
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
