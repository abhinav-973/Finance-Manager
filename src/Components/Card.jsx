const Card = ({ title, value }) => {
  return (
    <div className="bg-white p-4 rounded-3xl shadow-lg">
      <p className="text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
};

export default Card;
