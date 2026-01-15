import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Custom Glassmorphism Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#0a0a0a]/90 border border-white/10 backdrop-blur-md p-3 rounded-lg shadow-xl min-w-[150px]">
        <p className="text-slate-400 text-xs mb-2">{label}</p>
        <p className="text-white font-bold text-sm mb-1">{data.title}</p>
        <p className="text-rose-400 font-semibold text-sm">
          - ₹{payload[0].value.toLocaleString('en-IN')}
        </p>
      </div>
    );
  }
  return null;
};

const ExpenseTrend = ({ expenses }) => {
  if (!expenses || expenses.length === 0) return (
    <div className="flex items-center justify-center h-full text-slate-500 text-sm">
      No trend data available
    </div>
  );

  const data = expenses
    .filter((e) => e.type === "expense")
    .map((e) => ({
      time: new Date(e.createdAt).getTime(),
      title: e.title,
      amount: e.type === "expense" ? e.amount : 0,
    }))
    .sort((a, b) => a.time - b.time); // Ensure chronological order

  return (
    <div className="w-full h-full min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          
          {/* SVG Filter for "Glow" effect */}
          <defs>
            <filter id="glow" height="300%" width="300%" x="-75%" y="-75%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.3} vertical={false} />
          
          <XAxis
            dataKey="time"
            type="number"
            domain={["dataMin", "dataMax"]}
            tickFormatter={(time) => new Date(time).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
            stroke="#64748b" // slate-500
            tick={{ fill: '#64748b', fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            dy={10}
          />

          <YAxis 
            stroke="#64748b"
            tick={{ fill: '#64748b', fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => `₹${val}`}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />

          <Line
            type="monotone" // Smooth curve
            dataKey="amount"
            stroke="#f43f5e" // Rose-500
            strokeWidth={3}
            dot={{ r: 3, fill: '#0a0a0a', stroke: '#f43f5e', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: '#f43f5e', stroke: '#fff', strokeWidth: 2 }}
            filter="url(#glow)" // Applies the glow
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseTrend;