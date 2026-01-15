const SummaryCard = ({ title, value, color, textColor }) => {
  return (
    <div className="bg-white rounded-xl p-5 border shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
        <span className={`text-lg font-semibold ${textColor}`}>₹</span>
      </div>

      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-xl font-semibold text-gray-800">{value}</h2>
      </div>
    </div>
  );
};

export default SummaryCard;

