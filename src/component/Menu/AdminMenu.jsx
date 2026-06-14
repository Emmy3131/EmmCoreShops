import MenuItem from "./MenuItem";
import { FaUsers, FaLink, FaChartBar } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <>
      <MenuItem to="/admin/dashboard" title="Dashboard" icon={<FaChartBar />} />
      <MenuItem to="/admin/users" title="Manage Users" icon={<FaUsers />} />
      <MenuItem to="/admin/orders" title="Orders" icon={<FaLink />} />
      <MenuItem to="/admin/products" title="Products" icon={<FaLink />} />
      <MenuItem to="/admin/category" title="Category" icon={<FaLink />} />
      <MenuItem to="/admin/reviews" title="Reviews" icon={<FaLink />} />
      <MenuItem to="/admin/payments" title="Payments" icon={<FaLink />} />
      <MenuItem to="/admin/report" title="Report" icon={<FaLink />} />
      <MenuItem to="/admin/vendors" title="Vendors" icon={<FaLink />} />
      <MenuItem to="/admin/newsletter" title="Newsletter" icon={<FaLink />} />
      <MenuItem to="/admin/profile" title="Settings" icon={<FaLink />} />
      <MenuItem to="/admin/hero-banners" title="Hero Banners" icon={<FaLink />} />
      <MenuItem to="/admin/cms-pages" title="CMS Pages" icon={<FaLink />} />
    </>
  );
};

export default AdminMenu;
