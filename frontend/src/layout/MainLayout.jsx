import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

const MainLayout = () => {
  return (
    <div className="flex h-screen w-full bg-black overflow-hidden">
    
      <div className="shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col h-full relative">
        <Navbar />

        <main className="flex-1 overflow-y-auto bg-black p-6 md:p-8">
          <Outlet />
          <div className="h-10"></div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;