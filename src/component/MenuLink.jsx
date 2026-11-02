import { Link } from "react-router-dom";

const MenuLink = ({ icon, title, desc, to }) => {
  return (
    <Link
      to={to}
      className="flex gap-3 items-start hover:bg-gray-50 p-2 rounded"
    >
      <div className="text-gray-600 mt-1">{icon}</div>

      <div>
        <p className="font-semibold text-sm">{title}</p>
        {desc && (
          <p className="text-xs text-gray-400">{desc}</p>
        )}
      </div>
    </Link>
  );
};

export default MenuLink;