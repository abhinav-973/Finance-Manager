import Card from "../Components/Card";
// import StatisticsCard from "../Components/StatisticsCard";
// import OverviewCard from "../Components/OverviewCard";

import { useEffect, useState } from "react";
import { fetchDashboardData } from "../services/dashboardService";
import IncomeExpensePie from "../Components/charts/IncomeExpensePie";
import ExpenseTrend from "../Components/charts/ExpenseTrend";
import { fetchExpenses } from "../services/ExpenseService";

const Dashboard = () => {
  const [data, setData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
      try {
        const data = await fetchDashboardData();
        const expenseData = await fetchExpenses();
        setData(data);
        setExpenses(expenseData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="relative p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <button
      onClick={loadDashboardData}
      disabled={loading}
      className="absolute top-6 right-6 flex items-center gap-2 
                 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg 
                 disabled:opacity-50 shadow"
    >
      🔄 Refresh
    </button>

      <div className="grid grid-cols-3 gap-4">
        <Card title="Total Income" value={`₹${data.totalIncome}`} />

        <Card title="Total Expense" value={`₹${data.totalExpense}`} />

        <Card title="Balance" value={`₹${data.balance}`} />
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <IncomeExpensePie summary={data} />
        <ExpenseTrend expenses={expenses} />
      </div>
    </div>
  );
};

export default Dashboard;
