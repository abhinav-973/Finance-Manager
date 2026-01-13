import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

import Dashboard from "../pages/Dashboard";
import Expenses from "../pages/Expenses";
import SplitExpenses from "../pages/SplitExpenses";
import Group from "../pages/Group";
import Settings from "../pages/Settings";
import AddExpense from "../pages/AddExpense";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/split" element={<SplitExpenses />} />
        <Route path="/groups" element={<Group />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/add-expense" element={<AddExpense />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
