const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
      <div className={`${color} text-white p-3 rounded-lg`}>{icon}</div>
    </div>
  );
};
export default StatCard;