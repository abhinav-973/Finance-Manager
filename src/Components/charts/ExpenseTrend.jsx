import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const ExpenseTrend = ({ expenses }) => {
  if (!expenses || expenses.length === 0) return null;

  const data = expenses
    .filter((e) => e.type === "expense")
    .map((e) => ({
      time: new Date(e.createdAt).getTime(), // 👈 unique numeric X
      dateLabel: new Date(e.createdAt).toLocaleString(), // readable
      title: e.title,
      amount: e.type === "expense" ? e.amount : 0,
    }));
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Expense Trend</h2>

      <LineChart width={500} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          type="number"
          domain={["dataMin", "dataMax"]}
          tickFormatter={(time) => new Date(time).toLocaleDateString()}
        />

        <YAxis />
        <Tooltip
          shared={false}
          labelFormatter={(time) => new Date(time).toLocaleString()}
          formatter={(value, name, props) => {
            const { title } = props.payload;
            return [`₹${value} (${title})`, "Amount"];
          }}
        />

        <Line
          type="linear"
          dataKey="amount"
          stroke="#ef4444"
          dot={{ r: 4 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </div>
  );
};

export default ExpenseTrend;
