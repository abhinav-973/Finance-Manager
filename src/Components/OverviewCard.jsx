const OverviewCard = () => {
  return (
    <div className="bg-white rounded-xl p-6 border shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Overview</h3>
        <select className="text-sm border rounded-lg px-2 py-1">
          <option>Month</option>
          <option>Year</option>
        </select>
      </div>

      {/* Fake chart placeholder */}
      <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">Line chart goes here</p>
      </div>
    </div>
  );
};

export default OverviewCard;
