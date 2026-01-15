const categories = [
  { name: "Online shopping", value: "1,132.50", color: "bg-indigo-500" },
  { name: "Entertainment", value: "2,302.00", color: "bg-purple-400" },
  { name: "Car services", value: "1,090.70", color: "bg-blue-400" },
  { name: "Shopping", value: "2,007.30", color: "bg-indigo-300" },
];

const StatisticsCard = () => {
  return (
    <div className="bg-white rounded-xl p-6 border shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Statistics</h3>
        <select className="text-sm border rounded-lg px-2 py-1">
          <option>Days</option>
          <option>Month</option>
        </select>
      </div>

      <div className="flex gap-6">
        {/* Fake donut placeholder */}
        <div className="w-40 h-40 rounded-full border-8 border-indigo-400 flex items-center justify-center text-center">
          <div>
            <p className="text-xl font-semibold">6870</p>
            <p className="text-sm text-gray-500">Total</p>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {categories.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${item.color}`} />
              <p className="text-sm text-gray-600">
                {item.name} <br />
                <span className="font-medium text-gray-800">
                  {item.value}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
