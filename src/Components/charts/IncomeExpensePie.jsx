import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import renderLabel from "./renderPieLabel";
const COLORS = ["#22c55e", "#ef4444"];

const IncomeExpensePie = ({ summary }) => {
  if (!summary) return null;

  const data = [
    { name: "Income", value: summary.totalIncome },
    { name: "Expense", value: summary.totalExpense },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Income vs Expense</h2>

      <div className="flex justify-center">
        <PieChart width={300} height={250}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={renderLabel}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default IncomeExpensePie;
