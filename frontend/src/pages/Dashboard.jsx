import React, { useEffect, useState } from "react";
import Card from "../Components/Card"; // The new premium card
import IncomeExpensePie from "../Components/charts/IncomeExpensePie";
import ExpenseTrend from "../Components/charts/ExpenseTrend";
import { fetchDashboardData } from "../services/dashboardService";
import { fetchExpenses } from "../services/ExpenseService";
import { RefreshCw, TrendingUp, TrendingDown, Wallet } from "lucide-react";

const Dashboard = () => {
  const [data, setData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadDashboardData = async () => {
    try {
      setIsRefreshing(true);
      const dashboardData = await fetchDashboardData();
      const expenseData = await fetchExpenses();
      setData(dashboardData);
      setExpenses(expenseData);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoading(false);
      setTimeout(() => setIsRefreshing(false), 500); // Visual delay for smoothness
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Helper for premium currency formatting
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] text-indigo-500">
      <RefreshCw className="animate-spin" size={32} />
    </div>
  );

  return (
    // MASTER LAYOUT: Dark Obsidian Theme
    <div className="relative min-h-screen w-full bg-[#050505] text-slate-200 font-sans p-6 md:p-8 overflow-hidden">
      
      {/* Background Ambience (Fixed) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-white tracking-tight">Financial Overview</h1>
            <p className="text-slate-500 text-sm mt-1">Real-time metrics and performance tracking.</p>
          </div>
          
          <button
            onClick={loadDashboardData}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-sm font-medium transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
            {isRefreshing ? "Syncing..." : "Refresh Data"}
          </button>
        </div>

        {/* CARDS GRID */}
        {/* We pass specific 'type' props to trigger the correct gradients */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            title="Total Income" 
            value={formatCurrency(data.totalIncome)} 
            type="income"
            icon={TrendingUp}
          />

          <Card 
            title="Total Expense" 
            value={formatCurrency(data.totalExpense)} 
            type="expense"
            icon={TrendingDown}
          />

          <Card 
            title="Current Balance" 
            value={formatCurrency(data.balance)} 
            type="balance"
            icon={Wallet}
          />
        </div>

        {/* CHARTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Chart Container 1 */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm relative">
            <h2 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
              Income vs Expense
            </h2>
            <div className="h-[300px] w-full flex items-center justify-center">
              <IncomeExpensePie summary={data} />
            </div>
          </div>

          {/* Chart Container 2 */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm relative">
            <h2 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-rose-500 rounded-full"></span>
              Recent Trends
            </h2>
            <div className="h-[300px] w-full flex items-center justify-center">
              <ExpenseTrend expenses={expenses} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;