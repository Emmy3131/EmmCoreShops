import MenuItem from "./MenuItem";
import { FaStore, FaBox } from "react-icons/fa";

const VendorMenu = () => {
  return (
    <>
      <MenuItem to="/vendor/dashboard" title="Dashboard" icon={<FaStore />} />
      <MenuItem to="/vendor/products" title="Products" icon={<FaBox />} />
    </>
  );
};

export default VendorMenu;