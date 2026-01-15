import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import renderLabel from "./renderPieLabel";

const COLORS = ["#10b981", "#f43f5e"]; // Emerald (Income) & Rose (Expense)

// Custom Glassmorphism Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0a0a0a]/90 border border-white/10 backdrop-blur-md p-3 rounded-lg shadow-xl">
        <p className="text-slate-200 text-xs font-medium mb-1">{payload[0].name}</p>
        <p className="text-white font-bold text-sm">
          ₹{payload[0].value.toLocaleString('en-IN')}
        </p>
      </div>
    );
  }
  return null;
};

const IncomeExpensePie = ({ summary }) => {
  if (!summary) return null;

  const data = [
    { name: "Income", value: summary.totalIncome },
    { name: "Expense", value: summary.totalExpense },
  ];

  return (
    // No background wrapper here (parent handles it)
    <div className="w-full h-full min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60} // Donut chart looks more premium
            outerRadius={90}
            paddingAngle={5} // Adds gap between slices
            label={renderLabel}
            labelLine={false}
            stroke="none" // Removes the ugly white border
          >
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index]} 
                className="hover:opacity-80 transition-opacity duration-300"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            formatter={(value) => <span className="text-slate-400 text-xs font-medium ml-1">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpensePie;