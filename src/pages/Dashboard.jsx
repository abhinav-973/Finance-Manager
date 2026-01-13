import Card from "../Components/Card";
// import StatisticsCard from "../Components/StatisticsCard";
// import OverviewCard from "../Components/OverviewCard";

import { useEffect, useState } from "react";
import { fetchDashboardData } from "../services/dashboardService";

const Dashboard = () => {
  const [data, setData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await fetchDashboardData();
        setData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        
          <Card title="Total Income" value={`₹${data.totalIncome}`} />
       

        
          <Card title="Total Expense" value={`₹${data.totalExpense}`} />
       

      
         <Card title="Balance" value={`₹${data.balance}`} />
        
      </div>
    </div>
  );
};

export default Dashboard;
