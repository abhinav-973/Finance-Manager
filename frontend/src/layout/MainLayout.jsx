import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

const MainLayout = () => {
  return (
    // 1. OUTER WRAPPER: Locked to screen height (h-screen), no scroll on the body itself
    <div className="flex h-screen w-full bg-black overflow-hidden">
      
      {/* 2. SIDEBAR: It inherits h-screen from parent and stays fixed */}
      {/* Make sure Sidebar.jsx itself has 'h-screen' (I checked your code, it does) */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* 3. RIGHT SIDE: Flex column for Navbar + Scrollable Content */}
      <div className="flex-1 flex flex-col h-full relative">
        
        {/* Navbar: Stays at the top */}
        <Navbar />

        {/* 4. SCROLLABLE AREA: This is the ONLY thing that scrolls */}
        {/* overflow-y-auto enables scrolling for this section only */}
        <main className="flex-1 overflow-y-auto bg-black p-6 md:p-8">
          <Outlet />
          
          {/* Bottom spacer to prevent content from hitting the floor */}
          <div className="h-10"></div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;