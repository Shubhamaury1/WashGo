const StatsCard = ({ title, value, color }) => {
  return (
    <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition">
      <p className="text-gray-500 text-lg">{title}</p>

      <h1 className={`text-4xl font-bold mt-4 ${color}`}>{value}</h1>
    </div>
  );
};

export default StatsCard;
