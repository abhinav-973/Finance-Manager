import React from "react";
import { useLocation } from "react-router-dom";
import { Search, Bell } from "lucide-react";

const pageTitleMap = {
  "/": "Dashboard Overview",
  "/expenses": "Expense Tracker",
  "/split": "Split Bills",
  "/groups": "Group Management",
  "/settings": "Account Settings",
};

const Navbar = () => {
  const location = useLocation();
  const title = pageTitleMap[location.pathname] || "Finance Manager";

  return (
    <header className="sticky top-0 z-30 h-20 w-full bg-black border-b border-zinc-900 flex items-center justify-between px-6 md:px-8">
      
      <h1 className="text-xl font-bold text-white tracking-tight">
        {title}
      </h1>

      <div className="flex items-center gap-6">
        
        {/* Search Input - Pitch Black Style */}
        <div className="hidden md:flex items-center relative group">
          <Search 
            size={16} 
            className="absolute left-3 text-zinc-600 group-focus-within:text-white transition-colors" 
          />
          <input
            type="text"
            placeholder="Search..."
            className="
              pl-10 pr-4 py-2 w-64 rounded-lg 
              bg-zinc-950 border border-zinc-800 
              text-sm text-white placeholder-zinc-700
              focus:outline-none focus:border-zinc-600
              transition-all duration-200
            "
          />
        </div>

        <div className="flex items-center gap-4 pl-6 border-l border-zinc-900">
          <button className="relative group p-2 hover:bg-zinc-900 rounded-lg transition-colors">
            <Bell size={18} className="text-zinc-500 group-hover:text-white transition-colors" />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-600 rounded-full"></span>
          </button>

          <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center cursor-pointer hover:border-zinc-600 transition-colors">
             <span className="text-xs font-bold text-white">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;