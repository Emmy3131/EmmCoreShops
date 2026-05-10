import { Link } from "react-router-dom";

const MenuLink = ({ title, to, icon }) => (
  <Link to={to} className="px-3 py-2  hover:bg-gray-100">
    <div className="flex ">
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </div>
  </Link>
);
export default MenuLink;
