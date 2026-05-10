const MenuItem = ({ title }) => (
  <div className="flex gap-3">
    <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center">
      ⭐
    </div>
    <p className="font-semibold">{title}</p>
  </div>
);
export default MenuItem;