import React from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Receipt, 
  Split, 
  Users, 
  Settings, 
  Sparkles,
  LogOut 
} from "lucide-react";

const Sidebar = () => {
  // Configuration for navigation items
  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/expenses", label: "Expenses", icon: Receipt },
    { path: "/split", label: "Split Expenses", icon: Split },
    { path: "/groups", label: "Groups", icon: Users },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  // Dynamic Class Logic
  const getLinkClass = ({ isActive }) => {
    const baseClass = "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden";
    
    // Active State: Glowing Indigo Background + White Text
    const activeClass = "bg-gradient-to-r from-indigo-500/20 to-transparent text-white shadow-[inset_1px_0_0_0_#6366f1]";
    
    // Inactive State: Slate Text + Subtle Hover
    const inactiveClass = "text-slate-500 hover:text-slate-200 hover:bg-white/5";

    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  };

  return (
    // CONTAINER: Dark background with subtle right border
    <aside className="w-72 min-h-screen bg-[#050505] border-r border-white/10 flex flex-col relative z-20">
      
      {/* 1. BRAND HEADER */}
      <div className="p-6 pb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight leading-none">
              FINANCE-MANAGER
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Premium Edition
            </p>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION MENU */}
      <nav className="flex-1 px-4 space-y-2">
        <p className="px-4 text-xs font-semibold text-slate-600 uppercase tracking-widest mb-2">
          Menu
        </p>

        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            end={item.path === "/"} // Only exact match for Dashboard
            className={getLinkClass}
          >
            {({ isActive }) => (
              <>
                {/* Icon Wrapper */}
                <item.icon 
                  size={20} 
                  strokeWidth={2}
                  className={`transition-colors duration-300 ${isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"}`} 
                />
                
                {/* Label */}
                <span className="font-medium text-sm tracking-wide">
                  {item.label}
                </span>

                {/* Active Indicator (Glow Dot) - Optional cool detail */}
                {isActive && (
                  <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_10px_#6366f1]"></div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* 3. FOOTER / USER PROFILE */}
      <div className="p-4 mt-auto">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group hover:border-white/20 transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10 flex items-center justify-center">
              <span className="text-xs font-bold text-white">JD</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">John Doe</span>
              <span className="text-xs text-slate-500">Pro Plan</span>
            </div>
          </div>
          <LogOut size={18} className="text-slate-500 group-hover:text-white transition-colors" />
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;