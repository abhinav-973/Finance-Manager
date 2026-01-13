import { useLocation } from "react-router-dom";

const pageTitleMap = {
  "/": "Dashboard",
  "/expenses": "Expenses",
  "/split": "Split Expenses",
  "/groups": "Groups",
  "/settings": "Settings",
};

const Navbar = () => {
  const location = useLocation();
  const title = pageTitleMap[location.pathname] || "Finance Manager";

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-800">
        {title}
      </h1>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium">
          A
        </div>
      </div>
    </header>
  );
};

export default Navbar;
