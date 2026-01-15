import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

import Dashboard from "../pages/Dashboard";
import Expenses from "../pages/Expenses";
import SplitExpenses from "../pages/SplitExpenses";
import Group from "../pages/Group";
import Settings from "../pages/Settings";
import AddExpense from "../pages/AddExpense";
import Register from "../pages/Register";

function AppRoutes() {
  return (
    <Routes>
      {/* 1. PUBLIC ROUTES (Full Screen, No Sidebar, No Gap) */}
      <Route path="/register" element={<Register />} />
      {/* If you have a login page, add it here too */}
      {/* <Route path="/login" element={<Login />} /> */}

      {/* 2. PROTECTED ROUTES (Inside MainLayout with Sidebar & Padding) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/split" element={<SplitExpenses />} />
        <Route path="/groups" element={<Group />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/add-expense" element={<AddExpense />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;